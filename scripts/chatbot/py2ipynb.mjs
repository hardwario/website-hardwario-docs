// Generates two artifacts from build_index.py:
//
//   build-index.ipynb  every cell — the Colab notebook, self-contained
//   crawl.py           the [crawl] cells — standalone, no ML dependencies
//
// The .py is the source of truth: it diffs cleanly in review, and a stray edit
// to a generated .ipynb (huge single-line JSON, no readable diff) is the
// classic way notebook tooling loses work. Run after every change to the .py:
//
//     npm run chatbot:notebook
//
// Two artifacts rather than two hand-maintained copies, because the crawl and
// the notebook must agree on the URL filters and the chunking exactly. Copies
// drift, and the drift would only show up as a subtly different index.
//
// Cell markers:
//     # %% [markdown]   prose        -> notebook only
//     # %% [colab]      code         -> notebook only (pip install, download)
//     # %% [crawl]      code         -> notebook AND crawl.py
//     # %% [embed]      code         -> notebook only (needs a GPU / torch)

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, 'build_index.py');
const NOTEBOOK = join(here, 'build-index.ipynb');
const CRAWLER = join(here, 'crawl.py');

const source = readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

// Everything before the first marker is the file's own header comment — it
// explains the generation workflow to a reader of the repo, not to whoever
// opens the notebook, so it does not belong in either output.
const marker = /^# %%(?:[ \t]+\[(\w+)\])?[ \t]*$/gm;
const cells = [];
let match;
let cursor = null;

while ((match = marker.exec(source)) !== null) {
  if (cursor) cells.push({ ...cursor, body: source.slice(cursor.start, match.index) });
  cursor = { kind: match[1] ?? 'code', start: match.index + match[0].length + 1 };
}
if (cursor) cells.push({ ...cursor, body: source.slice(cursor.start) });

const KNOWN = new Set(['markdown', 'colab', 'crawl', 'embed', 'code']);
const unknown = cells.filter((c) => !KNOWN.has(c.kind));
if (unknown.length) {
  console.error(`unknown cell tags: ${[...new Set(unknown.map((c) => c.kind))].join(', ')}`);
  process.exit(1);
}
if (!cells.some((c) => c.kind === 'crawl')) {
  console.error('no [crawl] cells — crawl.py would be empty');
  process.exit(1);
}

const trim = (text) => text.replace(/\s+$/, '');

// nbformat stores source as an array of lines, each keeping its trailing "\n"
// except the last. Splitting any other way produces a notebook that renders
// but shows every cell as one unbroken line once re-saved by Jupyter.
const toLines = (text) => {
  const body = trim(text);
  if (!body) return [];
  return body.split('\n').map((line, i, all) => (i === all.length - 1 ? line : line + '\n'));
};

const notebook = {
  nbformat: 4,
  nbformat_minor: 0,
  metadata: {
    colab: { provenance: [], toc_visible: true },
    kernelspec: { name: 'python3', display_name: 'Python 3' },
    language_info: { name: 'python' },
    accelerator: 'GPU',
  },
  cells: cells.map(({ kind, body }) =>
    kind === 'markdown'
      ? {
          cell_type: 'markdown',
          metadata: {},
          // "# heading" in markdown cells would otherwise be eaten as a comment
          // prefix, so strip exactly one leading "# " or "#".
          source: toLines(body.replace(/^#[ ]?/gm, '')),
        }
      : {
          cell_type: 'code',
          metadata: {},
          execution_count: null,
          outputs: [],
          source: toLines(body),
        },
  ),
};

writeFileSync(NOTEBOOK, JSON.stringify(notebook, null, 1) + '\n', 'utf8');

const crawler = [
  '# GENERATED from build_index.py — do not edit. Regenerate with:',
  '#     npm run chatbot:notebook',
  '#',
  '# Crawls the three HARDWARIO sites and writes chunks.jsonl: plain text, no',
  '# vectors, no ML dependencies, no GPU. That file is the input to whichever',
  '# embedding model is chosen — swapping models never means crawling again.',
  '#',
  '#     pip install requests trafilatura lxml tqdm',
  '#     python scripts/chatbot/crawl.py',
  '',
  '# Corporate TLS interception makes Python reject certificates that browsers',
  '# and curl accept. truststore uses the OS certificate store instead, which',
  '# is where the intercepting root actually lives. Optional: absent, this is a',
  '# no-op and normal verification applies.',
  'try:',
  '    import truststore',
  '',
  '    truststore.inject_into_ssl()',
  'except ImportError:',
  '    pass',
  '',
  ...cells.filter((c) => c.kind === 'crawl').map(({ body }) => trim(body) + '\n'),
].join('\n');

writeFileSync(CRAWLER, crawler, 'utf8');

const counts = cells.reduce((acc, c) => ({ ...acc, [c.kind]: (acc[c.kind] ?? 0) + 1 }), {});
console.log(`build-index.ipynb: ${notebook.cells.length} cells ${JSON.stringify(counts)}`);
console.log(`crawl.py: ${cells.filter((c) => c.kind === 'crawl').length} cells, no ML deps`);
