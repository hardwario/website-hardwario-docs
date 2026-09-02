// Compares candidate embedding models on the real corpus.
//
//   node bench.mjs <chunks.jsonl> <questions.json> [more-questions.json ...]
//
// What matters for answer quality is not ranking precision but whether the
// right passage lands in the top K handed to Claude. A model that ranks the
// correct chunk 6th is as good as one that ranks it 1st; a model that pushes it
// to 12th is not. So the metric is recall@K, K = the backend's TOP_K.
//
// Vectors are cached per model on disk. Embedding the corpus takes minutes;
// evaluating a question set takes seconds. Without the cache, adding one
// question means paying for the whole corpus again — which is how benchmarks
// end up being run once and never questioned.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { pipeline } from '@huggingface/transformers';

const TOP_K = 8;
const BATCH = 16;
const CACHE = 'vectors';

// pooling is not a detail: gte-multilingual-base is trained for CLS pooling and
// scores materially worse under mean, while e5 is the reverse. Getting it wrong
// does not error — it just quietly makes the model look bad.
// prefix: e5 was trained with query:/passage: markers and degrades without them.
const MODELS = [
  { id: 'onnx-community/gte-multilingual-base', dtype: 'q8', dims: 768, mb: 340, pooling: 'cls' },
  { id: 'Xenova/multilingual-e5-base', dtype: 'q8', dims: 768, mb: 279, pooling: 'mean', prefix: true },
  { id: 'Xenova/multilingual-e5-small', dtype: 'q8', dims: 384, mb: 118, pooling: 'mean', prefix: true },
];

const [chunksPath, ...questionPaths] = process.argv.slice(2);
const chunks = readFileSync(chunksPath, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l));
const sets = questionPaths.map((p) => ({
  name: p.replace(/^.*[\\/]/, '').replace(/\.json$/, ''),
  questions: JSON.parse(readFileSync(p, 'utf8')),
}));

if (!existsSync(CACHE)) mkdirSync(CACHE);
console.log(`${chunks.length} chunks | sets: ${sets.map((s) => s.name).join(', ')} | recall@${TOP_K}\n`);

const asPassage = (m, t) => (m.prefix ? `passage: ${t}` : t);
const asQuery = (m, t) => (m.prefix ? `query: ${t}` : t);
// The index embeds title + chunk so short passages stay findable. The benchmark
// must reproduce that, or it measures a different index than the one shipped.
const passageText = (c) => `${c.title}\n\n${c.text}`;
const slug = (m) => `${m.id.replace(/[^\w]+/g, '_')}-${m.dtype}-${m.pooling}`;

function topK(flat, dims, query, k) {
  const n = flat.length / dims;
  const scores = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    let dot = 0;
    const off = i * dims;
    for (let d = 0; d < dims; d += 1) dot += flat[off + d] * query[d];
    scores[i] = dot;
  }
  return Array.from(scores.keys())
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, k);
}

const results = [];

for (const model of MODELS) {
  const cachePath = `${CACHE}/${slug(model)}.f32`;
  console.log(`${model.id}  (${model.dtype}, ${model.pooling} pooling, ${model.mb} MB)`);

  const loadStart = Date.now();
  const extract = await pipeline('feature-extraction', model.id, { dtype: model.dtype });
  const loadMs = Date.now() - loadStart;
  console.log(`  loaded in ${(loadMs / 1000).toFixed(1)} s`);

  let flat;
  let dims;
  if (existsSync(cachePath)) {
    const buf = readFileSync(cachePath);
    flat = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
    dims = flat.length / chunks.length;
    console.log(`  vectors from cache (${dims} dims)`);
  } else {
    const collected = [];
    const embedStart = Date.now();
    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH).map((c) => asPassage(model, passageText(c)));
      const out = await extract(batch, { pooling: model.pooling, normalize: true });
      dims ||= out.dims[1];
      for (let r = 0; r < batch.length; r += 1) collected.push(out.slice([r, r + 1]).data);
      if (i % (BATCH * 20) === 0) process.stdout.write('.');
    }
    flat = new Float32Array(chunks.length * dims);
    collected.forEach((v, i) => flat.set(v, i * dims));
    writeFileSync(cachePath, Buffer.from(flat.buffer));
    console.log(`\n  embedded ${chunks.length} chunks in ${((Date.now() - embedStart) / 1000).toFixed(0)} s`);
  }

  const perSet = {};
  for (const set of sets) {
    let hits = 0;
    const ranks = [];
    const byKind = {};
    const misses = [];
    const qStart = Date.now();

    for (const q of set.questions) {
      const out = await extract([asQuery(model, q.question)], {
        pooling: model.pooling,
        normalize: true,
      });
      const top = topK(flat, dims, out.data, TOP_K);
      const re = new RegExp(q.expect, 'i');
      const rank = top.findIndex((i) => re.test(chunks[i].url));

      byKind[q.kind] ??= { hit: 0, n: 0 };
      byKind[q.kind].n += 1;
      if (rank >= 0) {
        hits += 1;
        ranks.push(rank + 1);
        byKind[q.kind].hit += 1;
      } else {
        misses.push(`${q.question}  [${q.kind}/${q.site}]`);
      }
    }

    const median = ranks.length
      ? ranks.slice().sort((a, b) => a - b)[Math.floor(ranks.length / 2)]
      : null;
    perSet[set.name] = {
      hits,
      total: set.questions.length,
      byKind,
      median,
      misses,
      queryMs: (Date.now() - qStart) / set.questions.length,
    };

    const kinds = Object.entries(byKind).map(([k, v]) => `${k} ${v.hit}/${v.n}`).join('  ');
    console.log(
      `  ${set.name.padEnd(14)} ${hits}/${set.questions.length}  (${kinds})  ` +
        `median rank ${median}  ${perSet[set.name].queryMs.toFixed(0)} ms/query`,
    );
  }

  results.push({ model, dims, perSet });
  console.log();
}

const W = 46 + sets.length * 26;
console.log('='.repeat(W));
let header = 'model'.padEnd(38) + 'dim'.padStart(5) + 'MB'.padStart(6);
for (const s of sets) header += `  ${s.name}`.padEnd(26);
console.log(header);
for (const r of results) {
  let row = r.model.id.padEnd(38) + String(r.dims).padStart(5) + String(r.model.mb).padStart(6);
  for (const s of sets) {
    const v = r.perSet[s.name];
    const k = (n) => (v.byKind[n] ? `${v.byKind[n].hit}/${v.byKind[n].n}` : '-');
    row += `  ${v.hits}/${v.total} (p ${k('precise')} v ${k('vague')})`.padEnd(26);
  }
  console.log(row);
}
console.log('='.repeat(W));
console.log('recall@8 = correct page reached the top 8 Claude is shown. p = precise, v = vague.');

for (const r of results) {
  for (const s of sets) {
    const m = r.perSet[s.name].misses;
    if (m.length) {
      console.log(`\n${r.model.id} — ${s.name} missed:`);
      for (const x of m) console.log(`  - ${x}`);
    }
  }
}
