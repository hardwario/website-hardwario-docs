#!/usr/bin/env node
/**
 * Checks that every inline <script> in the build is allowed by a hash in the
 * Content-Security-Policy(-Report-Only) of build/_headers (the `/*` rule).
 *
 * The policy has no 'unsafe-inline' for scripts, so an inline script without a
 * hash would be reported (and, once the policy is enforced, blocked). Docusaurus
 * writes a few of them itself (the colour-mode bootstrap, the base-URL banner),
 * and an upgrade can change their content. Run after `npm run build`:
 *
 *   npm run verify:csp        # lists missing hashes, exit 1 if any
 *
 * Pages under a rule that detaches the policy (`! Content-Security-Policy…`) are
 * skipped, so are JSON-LD and other non-JavaScript script blocks.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, 'build');
const HEADER = /^\s*Content-Security-Policy(?:-Report-Only)?:\s*(.+)$/i;

function parseHeaders(text) {
  const rules = [];
  let current = null;
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      current = { pattern: line.trim(), lines: [] };
      rules.push(current);
    } else if (current) current.lines.push(line.trim());
  }
  return rules;
}

const toRegex = (pattern) =>
  new RegExp('^' + pattern.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$');

function main() {
  const rules = parseHeaders(fs.readFileSync(path.join(BUILD, '_headers'), 'utf8'));
  const site = rules.find((r) => r.pattern === '/*');
  const csp = site && site.lines.map((l) => l.match(HEADER)).find(Boolean);
  if (!csp) {
    console.error('No Content-Security-Policy on the /* rule of build/_headers.');
    process.exit(1);
  }
  const scriptSrc = (csp[1].split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src ')) || '').split(/\s+/);
  const allowed = new Set(scriptSrc.filter((t) => t.startsWith("'sha256-")).map((t) => t.slice(1, -1)));
  const detached = rules
    .filter((r) => r.lines.some((l) => /^!\s*Content-Security-Policy/i.test(l)))
    .map((r) => toRegex(r.pattern));

  const missing = new Map();
  let pages = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html')) {
        const url = '/' + path.relative(BUILD, full).split(path.sep).join('/');
        if (detached.some((re) => re.test(url))) continue;
        pages += 1;
        const html = fs.readFileSync(full, 'utf8');
        for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
          const type = (m[1].match(/\btype=["']?([^"'\s>]+)/) || [])[1];
          if (type && !/^(?:text|application)\/(?:java|ecma)script$|^module$/i.test(type)) continue;
          const hash = 'sha256-' + crypto.createHash('sha256').update(m[2], 'utf8').digest('base64');
          if (!allowed.has(hash)) {
            if (!missing.has(hash)) missing.set(hash, []);
            missing.get(hash).push(url);
          }
        }
      }
    }
  };
  walk(BUILD);
  for (const [hash, urls] of missing) {
    console.error(`MISSING  '${hash}'  on ${urls.length} page(s), e.g. ${urls[0]}`);
  }
  console.log(`${pages} page(s) checked, ${missing.size} inline script hash(es) missing from script-src.`);
  if (missing.size) process.exitCode = 1;
}

main();
