// Verifies that Workers AI produces the same embeddings the index was built
// with. This is the one assumption the whole design rests on and the one that
// fails silently: the Worker embeds questions with @cf/baai/bge-m3, the
// notebook embedded passages with BAAI/bge-m3, and if those ever diverge there
// is no error — just a chatbot returning confidently irrelevant passages.
//
// Run it once after building an index, and again after any Workers AI model
// change.
//
//   CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… \
//     node scripts/chatbot/check-parity.mjs hardwario-index.ndjson.gz
//
// The token needs the "Workers AI: Read" permission and nothing else.

import { createReadStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { createInterface } from 'node:readline';

const MODEL = '@cf/baai/bge-m3';
const SAMPLES = 5;
// Below this the two models are not interchangeable and retrieval is unsound.
// Identical weights served by different runtimes differ only in float noise,
// which lands far above this.
const THRESHOLD = 0.99;

const [file] = process.argv.slice(2);
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

if (!file || !accountId || !apiToken) {
  console.error(
    'usage: CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… \\\n' +
      '         node scripts/chatbot/check-parity.mjs <index.ndjson[.gz]>',
  );
  process.exit(2);
}

// Spread the sample across the file rather than taking the first N: records are
// written grouped by source, so the head is all docs and would never exercise
// the store's shorter, noisier text.
async function sampleRecords(path, count) {
  const stream = path.endsWith('.gz')
    ? createReadStream(path).pipe(createGunzip())
    : createReadStream(path);

  const picked = [];
  let seen = 0;
  for await (const line of createInterface({ input: stream, crlfDelay: Infinity })) {
    if (!line.trim()) continue;
    seen += 1;
    // Reservoir sampling with a fixed seed would be nicer, but a plain stride
    // keeps this deterministic and is enough to hit every source.
    if (picked.length < count) picked.push(JSON.parse(line));
    else if (seen % 97 === 0) picked[seen % count] = JSON.parse(line);
  }
  return { picked, total: seen };
}

async function embed(texts) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texts }),
    },
  );

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(`Workers AI ${res.status}: ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.result.data;
}

function cosine(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

const { picked, total } = await sampleRecords(file, SAMPLES);
console.log(`${file}: ${total} records, comparing ${picked.length}\n`);

// The notebook embeds "title\n\ntext", not the bare chunk, so the same string
// has to be rebuilt here. Comparing against the chunk alone would fail this
// check even when everything is correct.
const inputs = picked.map((r) => `${r.metadata.title}\n\n${r.metadata.text}`);
const remote = await embed(inputs);

let worst = 1;
for (const [i, record] of picked.entries()) {
  const score = cosine(record.values, remote[i]);
  worst = Math.min(worst, score);
  const dims = record.values.length === remote[i].length ? '' : '  !! DIMENSION MISMATCH';
  console.log(
    `  ${score.toFixed(5)}  ${record.id.padEnd(12)} ${record.metadata.url.slice(0, 64)}${dims}`,
  );
}

console.log(`\nlowest similarity: ${worst.toFixed(5)} (threshold ${THRESHOLD})`);

if (worst < THRESHOLD) {
  console.error(
    '\nFAIL — the two sides are not computing the same vectors.\n' +
      'Retrieval built on this index would be unsound. Either embed the index\n' +
      'through the Workers AI REST API as well (same runtime on both sides), or\n' +
      'find out which of the two models actually changed before deploying.',
  );
  process.exit(1);
}

console.log('PASS — index and query embeddings are interchangeable.');
