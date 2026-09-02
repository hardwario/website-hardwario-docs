#!/usr/bin/env node
/**
 * Post-processes hand-written Czech pages so they behave like their English
 * sources. No API, no network — pure text fixes that are tedious and easy to
 * get wrong by hand:
 *
 *   1. Heading anchors. Translating a heading changes the id Docusaurus derives
 *      from it, which silently breaks every `page.md#anchor` pointing at it. So
 *      the English ids are carried over: the nth heading of the translation gets
 *      `{#<english id>}`. Headings keep their order through translation, so
 *      matching by index is safe — and when the counts disagree the file is
 *      left alone and reported, rather than annotated wrongly.
 *
 *   2. Relative asset paths. `images/x.png` resolves against the English page's
 *      directory; the Czech page sits five levels deeper under i18n/, so the
 *      same link has to be rewritten to point back at the original file. The
 *      images themselves are never duplicated.
 *
 * Idempotent: run it as often as you like. A heading that already carries an id
 * and a path that already points at an existing file are both left untouched.
 *
 *   node scripts/i18n-postprocess.mjs                # fix every cs page
 *   node scripts/i18n-postprocess.mjs --dry-run      # report, change nothing
 *   node scripts/i18n-postprocess.mjs --only chester # one product
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import GithubSlugger from 'github-slugger';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const INSTANCES = {
  chester: 'docusaurus-plugin-content-docs',
  ember: 'docusaurus-plugin-content-docs-ember',
  fiber: 'docusaurus-plugin-content-docs-fiber',
  tapper: 'docusaurus-plugin-content-docs-tapper',
  tower: 'docusaurus-plugin-content-docs-tower',
  cloud: 'docusaurus-plugin-content-docs-cloud',
  gauger: 'docusaurus-plugin-content-docs-gauger',
  glider: 'docusaurus-plugin-content-docs-glider',
  apps: 'docusaurus-plugin-content-docs-apps',
  sticker: 'docusaurus-plugin-content-docs-sticker',
  'smart-devices': 'docusaurus-plugin-content-docs-smart-devices',
};

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const only = args[args.indexOf('--only') + 1];
const locale = 'cs';

const targetPath = (rel) => {
  const [dir, ...rest] = rel.split('/');
  return path.join(ROOT, 'i18n', locale, INSTANCES[dir], 'current', ...rest);
};

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

function sourcePages() {
  const pages = [];
  for (const dir of Object.keys(INSTANCES)) {
    if (only && dir !== only) continue;
    for (const file of walk(path.join(ROOT, dir))) {
      pages.push(path.relative(ROOT, file).split(path.sep).join('/'));
    }
  }
  return pages.sort();
}

/** Heading lines, skipping anything inside a fenced code block. */
function headingLines(md) {
  const found = [];
  let inFence = false;
  let marker = '';
  md.split('\n').forEach((line, i) => {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        marker = fence[1][0];
      } else if (fence[1][0] === marker) {
        inFence = false;
      }
      return;
    }
    if (inFence) return;
    if (/^#{1,6}\s+\S/.test(line)) found.push({ i, line });
  });
  return found;
}

const headingText = (line) =>
  line.replace(/^#{1,6}\s+/, '').replace(/\s*\{#[^}]*\}\s*$/, '').trim();

/** The ids Docusaurus derives from the English headings, in order. */
function englishIds(md) {
  const slugger = new GithubSlugger();
  return headingLines(md).map(({ line }) => {
    const explicit = line.match(/\{#([^}]+)\}\s*$/);
    return explicit ? explicit[1] : slugger.slug(headingText(line));
  });
}

function applyHeadingIds(cs, ids, rel, problems) {
  const heads = headingLines(cs);
  if (heads.length !== ids.length) {
    problems.push(
      `${rel}: ${heads.length} headings in cs vs ${ids.length} in en — anchors left alone`,
    );
    return cs;
  }
  const lines = cs.split('\n');
  heads.forEach(({ i, line }, n) => {
    if (/\{#[^}]+\}\s*$/.test(line)) return; // already carries one
    lines[i] = `${line.replace(/\s+$/, '')} {#${ids[n]}}`;
  });
  return lines.join('\n');
}

/**
 * Rewrites a relative link so it keeps pointing at the file the English page
 * meant. Absolute paths, URLs, anchors and Docusaurus's `pathname://` escape
 * hatch are left as they are.
 */
function rewriteRelativeAssets(cs, enFile, csFile) {
  const enDir = path.dirname(enFile);
  const csDir = path.dirname(csFile);

  // Only real files get rewritten, and only these kinds. A link to another page
  // — `../../cloud/downlink`, `./reset.md` — must be left exactly as written:
  // Docusaurus resolves those against the *document*, not the file on disk, and
  // rewriting one turns a working link into a 404. An earlier version of this
  // script checked only for an .md suffix and duly broke the extension-less
  // page links in chester/catalog-applications.
  const ASSET = /\.(png|jpe?g|gif|svg|webp|avif|pdf|zip|csv|json|mp4|webm|ipynb|txt)$/i;

  const fix = (target) => {
    if (!target) return target;
    if (/^(https?:|mailto:|pathname:|#|\/)/.test(target)) return target;
    const [pathPart, suffix = ''] = target.split(/(?=[?#])/);
    if (!pathPart || !ASSET.test(pathPart)) return target;
    const abs = path.resolve(enDir, pathPart);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return target;
    const rel = path.relative(csDir, abs).split(path.sep).join('/');
    return rel + suffix;
  };

  // ![alt](target) and [text](target)
  let out = cs.replace(/(!?\[[^\]]*\]\()([^)\s]+)(\))/g, (m, open, target, close) =>
    open + fix(target) + close,
  );
  // require('./images/x.png') inside JSX
  out = out.replace(/require\((['"])([^'"]+)\1\)/g, (m, q, target) => {
    const fixed = fix(target.replace(/^\.\//, ''));
    return `require(${q}${fixed.startsWith('.') ? fixed : './' + fixed}${q})`;
  });
  return out;
}

const problems = [];
let changed = 0;
let missing = 0;

for (const rel of sourcePages()) {
  const target = targetPath(rel);
  if (!fs.existsSync(target)) {
    missing += 1;
    continue;
  }
  const en = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\r\n').join('\n');
  const before = fs.readFileSync(target, 'utf8').split('\r\n').join('\n');

  let after = applyHeadingIds(before, englishIds(en), rel, problems);
  after = rewriteRelativeAssets(after, path.join(ROOT, rel), target);
  if (!after.endsWith('\n')) after += '\n';

  if (after !== before) {
    if (!dryRun) fs.writeFileSync(target, after, 'utf8');
    changed += 1;
    console.log(`${dryRun ? 'would fix' : 'fixed'}   ${rel}`);
  }
}

if (problems.length) {
  console.log(`\n${problems.length} page(s) need a look:`);
  for (const p of problems) console.log(`  ${p}`);
}
console.log(
  `\n${changed} file(s) ${dryRun ? 'would change' : 'changed'}; ${missing} page(s) not translated yet.`,
);
