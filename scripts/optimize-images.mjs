#!/usr/bin/env node
/**
 * Re-encodes heavy PNG images of the docs and updates every reference to them, in the English
 * pages and in the Czech mirror under i18n/ (which points at the same files).
 *
 * Why: a PNG photograph is many times larger than it needs to be, and the ideal-image plugin
 * keeps the source format, so <Image img={require('./images/photo.png')} /> shipped PNG variants
 * of 1 to 4 MB. Markdown images (![alt](path)) are served as the file is.
 *
 * What it does with a PNG outside static/:
 *
 *   Shown through <Image> (IdealImage), when its largest PNG variant would reach --ideal-min-kb:
 *     - an opaque photograph becomes a JPEG of the same pixel size. IdealImage then emits JPEG
 *       variants (640 and 1200 px, quality from docusaurus.config.js);
 *     - an image with real transparency, or a flat screenshot or diagram, becomes a WebP, which
 *       src/theme/IdealImage renders as a lazy <img> (one file, no variants). A flat graphic is
 *       kept lossless at its own size; a photograph is lossy and at most 1200 px wide, the
 *       widest variant IdealImage would emit.
 *
 *   Shown through Markdown syntax, when the file reaches --md-min-kb:
 *     - a WebP of the same pixel size, lossless where that is no larger than lossy, else lossy.
 *
 *   "Real transparency" is tested on the pixels: an alpha channel that is opaque everywhere
 *   does not count. The PNG is removed only when nothing in the repository mentions it any more.
 *   Files under static/ are public URLs and are never touched.
 *
 * Usage:
 *   node scripts/optimize-images.mjs                 dry run: prints the plan, changes nothing
 *   node scripts/optimize-images.mjs --write         convert, rewrite references, remove the PNGs
 *   node scripts/optimize-images.mjs --json out.json also write the plan as JSON
 *   --ideal-min-kb 150   --md-min-kb 280             thresholds (defaults shown)
 *
 * New pages: save a photograph as JPEG and a transparent cut-out as WebP in the first place, or
 * run this script; a dry run that lists nothing means no image is over the thresholds.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
// sharp is not a direct dependency of the site: use the copy the ideal-image plugin runs on.
const sharp = require(
  require.resolve('sharp', {
    paths: [require.resolve('@docusaurus/plugin-ideal-image/package.json')],
  }),
);

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const WRITE = flag('--write');
const JSON_OUT = option('--json', null);
const IDEAL_MIN = Number(option('--ideal-min-kb', 150)) * 1024;
const MD_MIN = Number(option('--md-min-kb', 280)) * 1024;

// The widths the ideal-image plugin emits (min, max and steps in docusaurus.config.js).
const IDEAL_WIDTHS = [640, 1200];
// A lossless WebP is kept when it is cheap in absolute terms and not far above the lossy
// file, which is how a flat graphic differs from a photograph (lossless is 5 to 15 times the
// lossy size for a photo). The opaque limit is wider because the lossy alternative there is
// JPEG, which is hard on small text.
const LOSSLESS_MAX = 160 * 1024;
const LOSSLESS_RATIO_ALPHA = 1.5;
const LOSSLESS_RATIO_OPAQUE = 2.5;
const LOSSLESS_RATIO_MD = 1.1;
// A conversion must save at least this share of the bytes a visitor downloads.
const MIN_SAVING = 0.3;

const WEBP_LOSSLESS = { lossless: true, effort: 6 };
const WEBP_PHOTO = { quality: 82, alphaQuality: 100, smartSubsample: true, effort: 6 };
const WEBP_MD = { quality: 85, alphaQuality: 100, smartSubsample: true, effort: 6 };
const JPEG_SOURCE = { quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true };
const JPEG_VARIANT = { quality: 70 };

const SKIP_DIRS = new Set(['node_modules', '.git', 'build', '.docusaurus', '.wrangler']);
const TEXT = /\.(mdx?|jsx?|tsx?|mjs|cjs|json|jsonc|css|html|ya?ml|txt)$/i;
const rel = (file) => path.relative(ROOT, file);
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else files.push(file);
  }
  return files;
}

const allFiles = walk(ROOT);
const textFiles = allFiles.filter((f) => TEXT.test(f) && path.basename(f) !== 'package-lock.json');
const texts = new Map(textFiles.map((f) => [f, fs.readFileSync(f, 'utf8')]));

// --- references -----------------------------------------------------------------------------

const IDEAL_REF = /<Image\s+img=\{\s*require\(\s*(['"])([^'"]+\.png)\1\s*\)\s*\}/g;
const MD_REF = /!\[[^\]]*\]\(\s*<?([^)\s>]+\.png)>?(?:\s+"[^"]*")?\s*\)/g;

/** image path -> [{file, kind, raw}] for the two reference forms the script rewrites. */
const refs = new Map();
function addRef(image, ref) {
  if (!refs.has(image)) refs.set(image, []);
  refs.get(image).push(ref);
}
for (const [file, text] of texts) {
  if (!/\.mdx?$/i.test(file)) continue;
  const dir = path.dirname(file);
  for (const m of text.matchAll(IDEAL_REF)) {
    const image = path.resolve(dir, m[2]);
    if (fs.existsSync(image)) addRef(image, { file, kind: 'ideal', raw: m[2] });
  }
  for (const m of text.matchAll(MD_REF)) {
    if (/^(?:[a-z]+:)?\/\//i.test(m[1]) || m[1].startsWith('/')) continue;
    const image = path.resolve(dir, decodeURIComponent(m[1]));
    if (fs.existsSync(image)) addRef(image, { file, kind: 'md', raw: m[1] });
  }
}

/** The path-like token that ends with the file name found at `at`. */
function pathToken(text, at, length) {
  let start = at;
  while (start > 0 && !/[\s'"()<>{}[\]=,;`]/.test(text[start - 1])) start -= 1;
  return text.slice(start, at + length);
}

function resolveToken(file, token) {
  let decoded = token;
  try {
    decoded = decodeURIComponent(token);
  } catch {
    // not URL-encoded
  }
  return path.resolve(path.dirname(file), decoded);
}

/**
 * Every mention of the image's file name in a text file that is not one of the references
 * above: the image is then used in a way this script does not rewrite, so it is left alone.
 * A mention that resolves to another file of the same name is not a mention of this one.
 */
function otherMentions(image) {
  const name = path.basename(image);
  const known = new Set((refs.get(image) || []).map((r) => `${r.file}\n${r.raw}`));
  const found = [];
  for (const [file, text] of texts) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(name, from);
      if (at === -1) break;
      from = at + name.length;
      const token = pathToken(text, at, name.length);
      if (known.has(`${file}\n${token}`)) continue;
      const target = resolveToken(file, token);
      if (target !== image && fs.existsSync(target)) continue;
      found.push(`${rel(file)}: ${token}`);
    }
  }
  return found;
}

// --- planning -------------------------------------------------------------------------------

async function hasTransparency(file, meta) {
  if (!meta.hasAlpha) return false;
  const alpha = await sharp(file).ensureAlpha().extractChannel(3).raw().toBuffer();
  for (let i = 0; i < alpha.length; i += 1) if (alpha[i] < 255) return true;
  return false;
}

const size = async (pipeline) => (await pipeline.toBuffer()).length;

async function plan(image) {
  const list = refs.get(image);
  const kinds = new Set(list.map((r) => r.kind));
  const bytes = fs.statSync(image).size;
  const item = { image, bytes, refs: list };
  if (kinds.size !== 1) return { ...item, skip: 'used both through <Image> and Markdown syntax' };
  const kind = [...kinds][0];
  if (kind === 'md' && bytes < MD_MIN) return null;

  const meta = await sharp(image).metadata();
  const { width, height } = meta;
  const capped = Math.min(width, IDEAL_WIDTHS[IDEAL_WIDTHS.length - 1]);
  let before; // what a visitor downloads today, at most
  if (kind === 'ideal') {
    // The loader re-encodes each width as PNG with sharp's defaults.
    const variants = await Promise.all(
      [...new Set(IDEAL_WIDTHS.map((w) => Math.min(width, w)))].map((w) => size(sharp(image).resize(w, null).png())),
    );
    before = Math.max(...variants);
    if (before < IDEAL_MIN) return null;
  } else {
    before = bytes;
  }

  const mentions = otherMentions(image);
  if (mentions.length) return { ...item, skip: `also mentioned in ${mentions.join(', ')}` };

  const alpha = await hasTransparency(image, meta);
  let choice;
  if (meta.format === 'jpeg') {
    // A JPEG saved under a .png name: IdealImage goes by the name and emits PNG variants.
    if (kind === 'md') return null;
    const variant = await size(sharp(image).resize(capped, null).jpeg(JPEG_VARIANT));
    choice = { ext: 'jpg', how: 'JPEG, renamed (it already is one)', copy: true, after: variant };
  }
  const lossless = choice ? 0 : await size(sharp(image).webp(WEBP_LOSSLESS));
  if (choice) {
    // decided above
  } else if (kind === 'md') {
    const lossy = await size(sharp(image).webp(WEBP_MD));
    choice =
      lossless <= lossy * LOSSLESS_RATIO_MD
        ? { ext: 'webp', how: 'WebP lossless', encode: () => sharp(image).webp(WEBP_LOSSLESS), after: lossless }
        : { ext: 'webp', how: 'WebP quality 85', encode: () => sharp(image).webp(WEBP_MD), after: lossy };
  } else {
    const lossy = await size(sharp(image).resize(capped, null).webp(WEBP_PHOTO));
    const ratio = alpha ? LOSSLESS_RATIO_ALPHA : LOSSLESS_RATIO_OPAQUE;
    if (lossless <= LOSSLESS_MAX && lossless <= lossy * ratio) {
      choice = { ext: 'webp', how: 'WebP lossless', encode: () => sharp(image).webp(WEBP_LOSSLESS), after: lossless };
    } else if (alpha) {
      choice = {
        ext: 'webp',
        how: `WebP quality 82${capped < width ? `, ${capped} px wide` : ''}`,
        encode: () => sharp(image).resize(capped, null).webp(WEBP_PHOTO),
        after: lossy,
      };
    } else {
      // The largest JPEG variant IdealImage will emit from the new source.
      const variant = await size(sharp(image).resize(capped, null).jpeg(JPEG_VARIANT));
      choice = { ext: 'jpg', how: 'JPEG source', encode: () => sharp(image).jpeg(JPEG_SOURCE), after: variant };
    }
  }

  const target = image.replace(/\.png$/i, `.${choice.ext}`);
  if (fs.existsSync(target)) return { ...item, skip: `${rel(target)} already exists` };
  if (choice.after > before * (1 - MIN_SAVING)) return { ...item, skip: `saves too little (${kb(before)} to ${kb(choice.after)})` };
  return { ...item, kind, width, height, alpha, before, target, ...choice };
}

async function pool(items, worker, limit = Math.max(2, Math.min(6, os.cpus().length - 2))) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next;
        next += 1;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

const candidates = [...refs.keys()].filter((image) => !rel(image).startsWith(`static${path.sep}`)).sort();
const planned = (await pool(candidates, plan)).filter(Boolean);
const todo = planned.filter((p) => !p.skip);
const skipped = planned.filter((p) => p.skip);

// --- report ---------------------------------------------------------------------------------

const sum = (list, key) => list.reduce((total, p) => total + p[key], 0);
for (const p of todo) {
  console.log(
    `${p.kind === 'ideal' ? 'Image' : 'md   '}  ${kb(p.before).padStart(8)} -> ${kb(p.after).padStart(7)}  ${p.how.padEnd(30)} ${rel(p.target)}  (${p.refs.length} refs)`,
  );
}
for (const p of skipped) console.log(`skip   ${rel(p.image)}: ${p.skip}`);
const groups = {};
for (const p of todo) {
  const key = `${p.kind === 'ideal' ? '<Image>' : 'Markdown'}, ${p.how.replace(/, \d+ px wide$/, '')}`;
  groups[key] ||= [];
  groups[key].push(p);
}
console.log('');
for (const [key, list] of Object.entries(groups).sort()) {
  console.log(
    `${key}: ${list.length} files, ${list.reduce((n, p) => n + p.refs.length, 0)} references, PNG sources ${kb(sum(list, 'bytes'))}, largest download per image ${kb(sum(list, 'before'))} -> ${kb(sum(list, 'after'))}`,
  );
}
console.log(`${todo.length} files to convert, ${skipped.length} skipped.${WRITE ? '' : ' Dry run: pass --write to apply.'}`);

if (JSON_OUT) {
  const plain = (p) => ({
    image: rel(p.image),
    target: p.target && rel(p.target),
    kind: p.kind,
    how: p.how,
    skip: p.skip,
    width: p.width,
    height: p.height,
    alpha: p.alpha,
    sourceBytes: p.bytes,
    before: p.before,
    after: p.after,
    refs: p.refs.map((r) => ({ file: rel(r.file), kind: r.kind, raw: r.raw })),
  });
  fs.writeFileSync(JSON_OUT, `${JSON.stringify({ converted: todo.map(plain), skipped: skipped.map(plain) }, null, 1)}\n`);
}

if (!WRITE) process.exit(0);

// --- apply ----------------------------------------------------------------------------------

await pool(todo, async (p) => {
  if (p.copy) fs.copyFileSync(p.image, p.target);
  else await p.encode().toFile(p.target);
  p.written = fs.statSync(p.target).size;
});

const edits = new Map(); // file -> [[from, to]]
for (const p of todo) {
  for (const r of p.refs) {
    if (!edits.has(r.file)) edits.set(r.file, []);
    edits.get(r.file).push([r.raw, r.raw.replace(/\.png$/i, `.${p.ext}`)]);
  }
}
let replaced = 0;
for (const [file, list] of edits) {
  let text = texts.get(file);
  for (const [from, to] of new Map(list)) {
    // The path as a whole token: './images/a.png' must not match inside './images/aa.png'.
    const parts = text.split(from);
    let out = parts[0];
    for (let i = 1; i < parts.length; i += 1) {
      const before = out.slice(-1);
      const isToken = before === '' || /[\s'"(<]/.test(before);
      out += (isToken ? to : from) + parts[i];
      if (isToken) replaced += 1;
    }
    text = out;
  }
  texts.set(file, text);
  fs.writeFileSync(file, text);
}

let removed = 0;
const kept = [];
for (const p of todo) {
  const name = path.basename(p.image);
  // After the rewrite nothing may point at the PNG any more.
  const left = [];
  for (const [file, text] of texts) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(name, from);
      if (at === -1) break;
      from = at + name.length;
      const token = pathToken(text, at, name.length);
      const target = resolveToken(file, token);
      if (target !== p.image && fs.existsSync(target)) continue;
      left.push(`${rel(file)}: ${token}`);
    }
  }
  if (left.length) {
    kept.push(`${rel(p.image)} (${left.join(', ')})`);
  } else {
    fs.unlinkSync(p.image);
    removed += 1;
  }
}

console.log(
  `Wrote ${todo.length} files (${kb(sum(todo, 'written'))}), rewrote ${replaced} references in ${edits.size} files, removed ${removed} PNG files (${kb(sum(todo, 'bytes'))} before).`,
);
for (const line of kept) console.log(`kept   ${line}`);
