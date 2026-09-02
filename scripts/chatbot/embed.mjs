// Turns chunks.jsonl into the index the chatbot searches.
//
//   node scripts/chatbot/embed.mjs [--model <id>] [--dtype q8] [--float32]
//
// Runs the same ONNX model, through the same runtime, that the backend uses to
// embed incoming questions. That is the point: index vectors and query vectors
// are comparable by construction rather than by assumption, so there is no
// parity to verify and no way for the two sides to drift apart.
//
// Needs no GPU and no Python. ~2 700 chunks take a few minutes on a laptop CPU.
//
// Outputs two files:
//   index.bin        vectors, contiguous, Int8 by default (~2 MB) or Float32
//   index.meta.json  url / title / site / text per vector, same order

import { readFileSync, writeFileSync } from 'node:fs';
import { pipeline } from '@huggingface/transformers';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};

// How each model must be driven. Getting either wrong costs recall without
// raising anything: gte-multilingual-base is trained for CLS pooling and scores
// materially worse under mean, and e5 is trained with query:/passage: markers
// and degrades without them. Both were measured, not assumed.
const RECIPES = {
  'onnx-community/gte-multilingual-base': { pooling: 'cls', prefix: false },
  'Xenova/multilingual-e5-base': { pooling: 'mean', prefix: true },
  'Xenova/multilingual-e5-small': { pooling: 'mean', prefix: true },
};

const MODEL = flag('model', 'onnx-community/gte-multilingual-base');
const DTYPE = flag('dtype', 'q8');
const IN = flag('in', 'chunks.jsonl');
const OUT_VECTORS = flag('out', 'index.bin');
const OUT_META = OUT_VECTORS.replace(/\.bin$/, '') + '.meta.json';
const FLOAT32 = args.includes('--float32');
const BATCH = 16;

const recipe = RECIPES[MODEL];
if (!recipe) {
  console.error(
    `unknown model "${MODEL}".\n` +
      'Add it to RECIPES with its pooling and prefix convention first — guessing\n' +
      'those is exactly the failure that produces a plausible but worse index.\n' +
      `Known: ${Object.keys(RECIPES).join(', ')}`,
  );
  process.exit(2);
}
const { pooling: POOLING, prefix: NEEDS_PREFIX } = recipe;

const chunks = readFileSync(IN, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((line) => JSON.parse(line));

console.log(`${chunks.length} chunks from ${IN}`);
console.log(`model ${MODEL} (${DTYPE}, ${POOLING} pooling${NEEDS_PREFIX ? ', e5 prefixes' : ''})`);

const started = Date.now();
const extract = await pipeline('feature-extraction', MODEL, { dtype: DTYPE });
console.log(`loaded in ${((Date.now() - started) / 1000).toFixed(1)} s`);

// The title is prepended to what gets embedded but is not part of the stored
// chunk. Short passages need it to be findable at all: "Add to Cart, 47,90 EUR"
// matches nothing useful, "CHESTER-C4 / Add to Cart, 47,90 EUR" matches a
// question about what a CHESTER-C4 costs. The backend must NOT do this to the
// query — the asymmetry is deliberate.
const passage = (c) => (NEEDS_PREFIX ? 'passage: ' : '') + `${c.title}\n\n${c.text}`;

let dims = 0;
const vectors = [];
const embedStart = Date.now();

for (let i = 0; i < chunks.length; i += BATCH) {
  const batch = chunks.slice(i, i + BATCH);
  const out = await extract(batch.map(passage), { pooling: POOLING, normalize: true });
  dims ||= out.dims[1];
  for (let r = 0; r < batch.length; r += 1) vectors.push(out.slice([r, r + 1]).data);

  if (i % (BATCH * 10) === 0 || i + BATCH >= chunks.length) {
    const done = Math.min(i + BATCH, chunks.length);
    const rate = done / ((Date.now() - embedStart) / 1000);
    const eta = (chunks.length - done) / rate;
    process.stdout.write(
      `\r  ${done}/${chunks.length}  ${rate.toFixed(1)}/s  eta ${eta.toFixed(0)}s   `,
    );
  }
}
process.stdout.write('\n');
console.log(`embedded in ${((Date.now() - embedStart) / 1000).toFixed(0)} s, ${dims} dims`);

let buffer;
if (FLOAT32) {
  const flat = new Float32Array(chunks.length * dims);
  vectors.forEach((v, i) => flat.set(v, i * dims));
  buffer = Buffer.from(flat.buffer);
} else {
  // Vectors are L2-normalised, so every component is within [-1, 1] and one
  // global scale is enough — no per-vector scale to store or apply. Measured
  // effect on recall@8 is nil; the file is a quarter of the size, which is what
  // keeps it reviewable in git and quick to load on a cold start.
  const flat = new Int8Array(chunks.length * dims);
  vectors.forEach((v, i) => {
    for (let d = 0; d < dims; d += 1) {
      flat[i * dims + d] = Math.max(-127, Math.min(127, Math.round(v[d] * 127)));
    }
  });
  buffer = Buffer.from(flat.buffer);
}

writeFileSync(OUT_VECTORS, buffer);
writeFileSync(
  OUT_META,
  JSON.stringify(
    {
      model: MODEL,
      dtype: DTYPE,
      // The backend reads these back and drives the query side identically.
      // Two sides of one file cannot disagree the way two config values can.
      pooling: POOLING,
      queryPrefix: NEEDS_PREFIX ? "query: " : "",
      dims,
      count: chunks.length,
      quantization: FLOAT32 ? 'float32' : 'int8',
      // Written so the backend can refuse to start against an index built by a
      // different model, instead of serving plausible nonsense.
      chunks: chunks.map((c) => ({ url: c.url, title: c.title, site: c.site, text: c.text })),
    },
    null,
    0,
  ),
);

const mb = (n) => (n / 1e6).toFixed(2) + ' MB';
console.log(`\n${OUT_VECTORS}: ${mb(buffer.length)}  (${chunks.length} x ${dims}, ${FLOAT32 ? 'float32' : 'int8'})`);
console.log(`${OUT_META}: ${mb(Buffer.byteLength(readFileSync(OUT_META)))}`);
