#!/usr/bin/env node
/**
 * Compares every translated page against its English source and fails on
 * structural drift.
 *
 * `npm run build` only catches broken links. It will happily ship a page that
 * lost a table row, dropped an image or had a code block translated — this
 * catches those.
 *
 *   node scripts/verify-i18n.mjs                 # check the cs locale
 *   node scripts/verify-i18n.mjs --locale cs -v  # list every page, not just failures
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const FENCE = '`'.repeat(3);

/**
 * git core.autocrlf hands CRLF to the working tree on Windows while the
 * translation script writes LF, so normalise before comparing anything.
 */
const normalise = (text) => text.split('\r\n').join('\n');

/** Counts that must survive translation unchanged. */
function shape(text) {
  return {
    'code fences': text.split(FENCE).length - 1,
    imports: (text.match(/^import /gm) || []).length,
    headings: (text.match(/^#{1,6} /gm) || []).length,
    images: (text.match(/!\[[^\]]*\]\(/g) || []).length,
    'table rows': (text.match(/^\s*\|/gm) || []).length,
    'admonition markers': (text.match(/^:::/gm) || []).length,
    'jsx tags': (text.match(/<\/?[A-Z][A-Za-z]*/g) || []).length,
    'html tags': (text.match(/<\/?(?:div|details|summary|br|img|a|p|span|table|tr|td|th)\b/gi) || []).length,
  };
}

/**
 * Link targets, with relative asset paths resolved to the file they point at.
 *
 * The translation script rewrites relative image/asset paths so they reach back
 * into the English source tree, so the raw strings legitimately differ between
 * the two files — what has to match is which file each one lands on.
 */
function linkTargets(text, fileDir) {
  return (text.match(/\]\(([^)\s]+)/g) || [])
    .map((m) => m.slice(2))
    .map((url) => {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/|#|@site)/i.test(url)) return url;
      const bare = url.split(/[?#]/)[0];
      if (/\.mdx?$/i.test(bare) || !/\.[a-z0-9]{2,5}$/i.test(bare)) return url;
      return path.resolve(fileDir, bare);
    })
    .sort();
}

const frontMatterSlug = (text) => (text.match(/^slug:\s*(.+)$/m) || [])[1];

/** Fenced code content must come through byte for byte. */
function codeBlocks(text) {
  const out = [];
  const lines = text.split('\n');
  let open = false;
  let buffer = [];
  for (const line of lines) {
    if (/^\s*(?:`{3,}|~{3,})/.test(line)) {
      if (open) {
        out.push(buffer.join('\n'));
        buffer = [];
      }
      open = !open;
      continue;
    }
    if (open) buffer.push(line);
  }
  return out;
}

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

function main() {
  const argv = process.argv.slice(2);
  const locale = argv.includes('--locale') ? argv[argv.indexOf('--locale') + 1] : 'cs';
  const verbose = argv.includes('-v') || argv.includes('--verbose');

  let checked = 0;
  let missing = 0;
  const problems = [];
  const perSection = new Map();

  for (const [dir, instance] of Object.entries(INSTANCES)) {
    const section = { total: 0, done: 0 };
    perSection.set(dir, section);
    for (const abs of walk(path.join(ROOT, dir))) {
      section.total += 1;
      {
        const rel = path.relative(path.join(ROOT, dir), abs).split(path.sep).join('/');
        if (fs.existsSync(path.join(ROOT, 'i18n', locale, instance, 'current', rel))) {
          section.done += 1;
        }
      }
      const rel = path.relative(path.join(ROOT, dir), abs).split(path.sep).join('/');
      const source = `${dir}/${rel}`;
      const target = path.join(ROOT, 'i18n', locale, instance, 'current', rel);

      if (!fs.existsSync(target)) {
        missing += 1;
        continue;
      }
      checked += 1;

      const en = normalise(fs.readFileSync(abs, 'utf8'));
      const cs = normalise(fs.readFileSync(target, 'utf8'));
      const found = [];

      const [sa, sb] = [shape(en), shape(cs)];
      for (const key of Object.keys(sa)) {
        if (sa[key] !== sb[key]) found.push(`${key}: en=${sa[key]} cs=${sb[key]}`);
      }

      const slugEn = frontMatterSlug(en);
      const slugCs = frontMatterSlug(cs);
      if (slugEn !== slugCs) found.push(`slug changed: "${slugEn}" -> "${slugCs}"`);

      const [la, lb] = [
        linkTargets(en, path.dirname(abs)),
        linkTargets(cs, path.dirname(target)),
      ];
      const lost = la.filter((l) => !lb.includes(l));
      if (lost.length) found.push(`link targets changed: ${lost.slice(0, 3).join(', ')}`);

      const [ca, cb] = [codeBlocks(en), codeBlocks(cs)];
      if (ca.length === cb.length) {
        const touched = ca.filter((block, i) => block !== cb[i]).length;
        if (touched) found.push(`${touched} code block(s) modified`);
      }

      if (found.length) problems.push({ source, found });
      else if (verbose) console.log(`ok       ${source}`);
    }
  }

  for (const { source, found } of problems) {
    console.error(`PROBLEM  ${source}`);
    for (const line of found) console.error(`         ${line}`);
  }

  console.log(
    `\n${checked} translated page(s) checked, ${problems.length} with drift, ${missing} not translated yet.`,
  );

  // Informational only. Half-translated sections build fine, but they are worth
  // seeing: a section is easier to review and sign off in one piece.
  const partial = [...perSection.entries()].filter(
    ([, s]) => s.done > 0 && s.done < s.total,
  );
  if (partial.length) {
    console.log('\nPartially translated section(s):');
    for (const [dir, s] of partial) {
      console.log(`  ${dir}: ${s.done}/${s.total} pages`);
    }
  }

  if (problems.length) process.exitCode = 1;
}

main();
