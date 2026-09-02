// Checks static/_redirects against the limits the deploy enforces.
//
// Cloudflare allows 2,000 static and 100 dynamic redirect rules — but it does
// not classify them one by one. **Every rule from the first dynamic rule
// onwards counts as dynamic**, whether it contains a splat or not, so a single
// splat placed in the middle of the file reclassifies everything below it and
// the deploy is rejected:
//
//     Invalid _redirects configuration:
//     Line 295: Maximum number of dynamic _redirects rules limit of 100
//     exceeded [code: 100324]
//
// That is a deploy-time failure, not a build-time one: `npm run build` passes,
// `wrangler versions upload` is what refuses, so nothing local catches it. It
// took five failed deploys to find, which is what this script exists to
// prevent. Run it before pushing anything that touches the file:
//
//     npm run verify:redirects
//
// Keeping the splats last also keeps precedence right — for a path matched by
// both a static rule and a splat, the first listed rule wins.
import fs from 'node:fs';
import path from 'node:path';

const FILE = path.join('static', '_redirects');
const STATIC_LIMIT = 2000;
const DYNAMIC_LIMIT = 100;

const isDynamic = (from) => from.includes('*') || /(^|\/):[A-Za-z]/.test(from);

const rules = [];
fs.readFileSync(FILE, 'utf8')
  .split(/\r?\n/)
  .forEach((line, i) => {
    const text = line.trim();
    if (!text || text.startsWith('#')) return;
    const [from, to, code] = text.split(/\s+/);
    rules.push({ line: i + 1, from, to, code, dynamic: isDynamic(from) });
  });

const firstDynamic = rules.find((r) => r.dynamic);
const counted = firstDynamic ? rules.filter((r) => r.line >= firstDynamic.line) : [];
const staticRules = rules.length - counted.length;
const problems = [];

if (counted.length > DYNAMIC_LIMIT) {
  const offender = counted[DYNAMIC_LIMIT];
  problems.push(
    `${counted.length} rules fall on or after the first dynamic rule (line ${firstDynamic.line}: ` +
      `${firstDynamic.from}), and Cloudflare counts all of them as dynamic — the limit is ` +
      `${DYNAMIC_LIMIT}. The deploy will fail at line ${offender.line}.`,
  );
}

// The cause, rather than the symptom: a static rule sitting below a splat.
const strays = counted.filter((r) => !r.dynamic);
if (strays.length) {
  problems.push(
    `${strays.length} static rule(s) are listed after the first dynamic rule. Move the dynamic ` +
      `rules to the end of the file instead — first stray is line ${strays[0].line}: ${strays[0].from}`,
  );
}

if (staticRules > STATIC_LIMIT) {
  problems.push(`${staticRules} static rules, limit is ${STATIC_LIMIT}.`);
}

for (const r of rules) {
  if (!r.to) problems.push(`line ${r.line}: no destination — "${r.from}"`);
  else if (r.code && !/^(30[1-3]|30[78]|200)$/.test(r.code))
    problems.push(`line ${r.line}: status ${r.code} is not one Cloudflare accepts here`);
}

if (problems.length) {
  console.error(`${FILE} would be rejected by the deploy:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(
  `${FILE}: ${rules.length} rules — ${staticRules} static (limit ${STATIC_LIMIT}), ` +
    `${counted.length} counted as dynamic (limit ${DYNAMIC_LIMIT}). OK.`,
);
