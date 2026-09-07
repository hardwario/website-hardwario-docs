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

const frontMatter = (text) => {
  if (!text.startsWith('---')) return '';
  const end = text.indexOf('\n---', 3);
  return end < 0 ? '' : text.slice(3, end);
};

const frontMatterKey = (text, key) => {
  const m = frontMatter(text).match(new RegExp(`^${key}:[ \t]*(.+)$`, 'm'));
  if (!m) return undefined;
  return m[1].trim().replace(/^"([\s\S]*)"$/, '$1').replace(/^'([\s\S]*)'$/, '$1');
};

/**
 * `description` and `title_meta` never appear in the page body, so shape()
 * cannot see them: it counts markers, and front matter holds none. They do end
 * up in the page's <meta> tags, which is what Google and link previews show —
 * which is how 179 Czech pages once shipped a description cut mid-sentence
 * while this script reported no drift at all.
 */
const META_KEYS = ['description', 'title_meta'];
const META_MAX = 160;

// title_meta is a title, not a sentence: it is checked for parity only. The
// prose rules below belong to description, which is the one that becomes the
// snippet under a search result.
const PROSE_META = 'description';

function metaProblems(en, cs, locale) {
  const out = [];
  for (const key of META_KEYS) {
    const a = frontMatterKey(en, key);
    const b = frontMatterKey(cs, key);
    if (a && !b) {
      out.push(`${key}: the source has one, ${locale} does not`);
      continue;
    }
    // A description only the translation has cannot be checked against
    // anything, and drifts the moment the English page is rewritten. A
    // title_meta is different: Czech routinely collapses two distinct English
    // titles into one ("Alarm rules" and "Alarm Rules" both become "Pravidla
    // alarmů"), and a locale-only title_meta is how that is disambiguated.
    if (!a && b) {
      if (key === PROSE_META) {
        out.push(`${key}: ${locale} invents a value the source does not have`);
      } else {
        const title = frontMatterKey(cs, 'title');
        const inner = (b.match(/\(([^)]*)\)\s*$/) || [])[1];
        if (title && inner && inner.toLowerCase() === title.toLowerCase()) {
          out.push(`${key}: disambiguates the title with itself: ${JSON.stringify(b)}`);
        }
      }
      continue;
    }
    if (!a || !b) continue;
    if (key !== PROSE_META) continue;
    if (a === b && b.split(/\s+/).length >= 4) {
      out.push(`${key}: still byte-identical to the English`);
    }
    if (/(?:…|\.\.\.)$/.test(b)) {
      out.push(`${key}: ends in an ellipsis, so it was cut`);
    } else if (!/[.!?]$/.test(b)) {
      out.push(`${key}: does not end a sentence: "…${b.slice(-28)}"`);
    }
    if (b.length > META_MAX) {
      out.push(`${key}: ${b.length} characters, past the ${META_MAX} a meta description shows`);
    }
  }
  return out;
}

/**
 * scripts/i18n-glossary.md writes product names with no Czech endings, and
 * fixes the spelling of a handful of technical terms. Only what the
 * translation adds over its source is reported: the English pages carry a few
 * of these themselves (a 1-WIRE silkscreen label, say), and echoing those
 * would bury the signal.
 */
const NEVER_DECLINE = [
  'HARDWARIO', 'CHESTER', 'STICKER', 'TOWER', 'EMBER', 'FIBER', 'GAUGER',
  'GLIDER', 'TAPPER', 'Milesight', 'RAKwireless', 'OnLogic', 'Nexelec',
  'ChirpStack', 'ThingsBoard', 'Zephyr', 'MikroTik', 'Playground',
];

// Czech case endings only, so the English plural in "Saved STICKERs" — a label
// the app itself shows in English — is not mistaken for a declension.
const CZECH_ENDING = '(?:u|em|y|ech|ům|ám|ách|ovi|ovy|ě|ou|í|ích|imi|a|e)';

const SPELLINGS = [
  ['wM-Bus', /\b(?:wM-BUS|WM-Bus|WM-BUS|wmbus)\b/g],
  ['LoRaWAN', /\b(?:Lorawan|LORAWAN|LoraWAN)\b/g],
  ['NB-IoT', /\b(?:NB-IOT|nbiot|NBIoT)\b/g],
  ['LTE-M', /\bLTE M\b/g],
  ['Wi-Fi', /\bWiFi\b/g],
  ['M-Bus', /\bMBus\b/g],
  ['Modbus RTU', /\bMODBUS RTU\b/g],
  ['RS-485', /\bRS485\b/g],
  ['1-Wire', /\b1-WIRE\b/g],
];

/** Everything outside fenced blocks and inline code — prose the glossary governs. */
function prose(text) {
  return text
    .split('\n')
    .filter((line, i, lines) => {
      let open = false;
      for (let j = 0; j < i; j += 1) {
        if (/^\s*(?:`{3,}|~{3,})/.test(lines[j])) open = !open;
      }
      return !open && !/^\s*(?:`{3,}|~{3,})/.test(line);
    })
    .join('\n')
    .replace(/`[^`\n]*`/g, ' ');
}

function glossaryProblems(en, cs) {
  const out = [];
  const [pe, pc] = [prose(en), prose(cs)];

  for (const name of NEVER_DECLINE) {
    const re = new RegExp(`\\b${name}${CZECH_ENDING}\\b`, 'g');
    const hits = [...new Set(pc.match(re) || [])];
    if (hits.length) out.push(`declined product name: ${hits.slice(0, 3).join(', ')}`);
  }

  for (const [correct, wrong] of SPELLINGS) {
    const inCs = (pc.match(wrong) || []).length;
    const inEn = (pe.match(wrong) || []).length;
    if (inCs > inEn) out.push(`spelling: ${inCs - inEn} more "${correct}" violation(s) than the source`);
  }

  const openers = (pc.match(/\u201e/g) || []).length;
  const closers = (pc.match(/\u201c/g) || []).length;
  if (openers > closers) out.push(`${openers - closers} quotation(s) opened with „ and never closed with “`);

  return out;
}

/**
 * The theme strings and the sidebar labels live in JSON, which the page-by-page
 * comparison never opens — so ~30 English messages and 15 English category
 * descriptions once rendered on the Czech site while this script was green.
 *
 * Detecting "still the English default" without a write-translations run means
 * a heuristic: a message built from English function words that a Czech string
 * would not contain. It is deliberately narrow, to stay quiet on names and
 * product terms that legitimately stay English.
 */
const ENGLISH_TELL = new RegExp(
  '\\b(?:the|this|that|these|your|you|our|and|not|will|only|with|for|from|'
  + 'into|about|have|has|been|are|was|can|click|press|toggle|word|wrap|tab|'
  + 'loading|error|found|page|pages|item|items|doc|docs|post|posts|author|'
  + 'authors|archive|versions|language|languages|sidebar|dropdown|category|'
  + 'again|draft|unlisted|visible|written|reload|crashed|scroll|expand|'
  + 'collapse|navigation|breadcrumbs|guides|tutorials|settings|overview)\\b',
  'i',
);

/**
 * A message whose every word is capitalised is a name, not a sentence — "The
 * Things Stack", "Reference API" — and those stay as they are in every locale.
 */
function looksLikeAName(message) {
  const words = message.trim().split(/\s+/);
  return words.length >= 2 && words.every((w) => /^[A-Z0-9(«"']/.test(w));
}

function jsonProblems(locale) {
  const out = [];
  const base = path.join(ROOT, 'i18n', locale);
  if (!fs.existsSync(base)) return out;

  const files = [];
  const codeJson = path.join(base, 'code.json');
  if (fs.existsSync(codeJson)) files.push(codeJson);
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const current = path.join(base, entry.name, 'current.json');
    if (fs.existsSync(current)) files.push(current);
  }

  for (const file of files) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      out.push({ source: path.relative(ROOT, file), found: [`invalid JSON: ${err.message}`] });
      continue;
    }
    const found = [];
    for (const [key, value] of Object.entries(data)) {
      if (!value || typeof value !== 'object') continue;
      const message = value.message;
      if (typeof message !== 'string' || !message.trim()) continue;
      // A message carrying Czech diacritics has plainly been through a
      // translator, whatever English product names it also mentions.
      if (/[ěščřžýáíéúůňťďĚŠČŘŽÝÁÍÉÚŮŇŤĎ]/.test(message)) continue;
      if (looksLikeAName(message)) continue;
      if (ENGLISH_TELL.test(message)) found.push(`${key}: ${JSON.stringify(message)}`);
    }
    if (found.length) out.push({ source: path.relative(ROOT, file), found });
  }
  return out;
}

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

      found.push(...metaProblems(en, cs, locale));
      found.push(...glossaryProblems(en, cs));

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

  const jsonIssues = jsonProblems(locale);
  problems.push(...jsonIssues);

  for (const { source, found } of problems) {
    console.error(`PROBLEM  ${source}`);
    for (const line of found) console.error(`         ${line}`);
  }

  console.log(
    `\n${checked} translated page(s) checked, ${problems.length - jsonIssues.length} with drift, `
      + `${missing} not translated yet, ${jsonIssues.length} translation JSON file(s) with English left in them.`,
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
