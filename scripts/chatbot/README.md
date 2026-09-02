# Chatbot index

The docs chatbot answers from its own index instead of searching the web. This
directory builds that index. The backend that serves it lives in the
`docs-chatbot` repo.

Current state, open decisions and measured numbers: **[STATUS.md](STATUS.md)**.

| file | what it is |
|---|---|
| `build_index.py` | source of truth for the crawl — **edit this one** |
| `crawl.py` | *generated* — the crawler, standalone, no ML dependencies |
| `build-index.ipynb` | *generated* — the same crawl as a Colab notebook |
| `py2ipynb.mjs` | regenerates both from `build_index.py` |
| `embed.mjs` | turns `chunks.jsonl` into the index — needs `npm i @huggingface/transformers` first |
| `bench/` | measures candidate embedding models against the real corpus |
| `worker.test.mjs`, `check-parity.mjs` | for the Cloudflare path — see STATUS.md |

```bash
npm run chatbot:notebook   # after every change to build_index.py
```

Never edit `crawl.py` or `build-index.ipynb` directly. Both are generated, the
notebook diffs as one unreadable line, and the next regeneration silently
discards whatever was changed there. Cells are tagged `[markdown]`, `[colab]`,
`[crawl]` or `[embed]`; only `[crawl]` cells reach `crawl.py`.

## Two stages, and why they are separate

**Crawling and embedding are independent, and only one of them is committed to a
model.**

```
sitemaps -> fetch 1 011 pages -> extract -> chunk   ->  chunks.jsonl   2.7 MB, plain text
                                                             |
                                        embed with the chosen model
                                                             v
                                          index.bin + index.meta.json
```

`chunks.jsonl` holds no vectors, so it survives a change of embedding model.
That mattered in practice: the model was chosen *after* the corpus was
collected, and comparing three candidates cost minutes of embedding each rather
than three full crawls.

```bash
npm run chatbot:crawl   # ~10 min  -> chunks.jsonl
npm run chatbot:embed   # ~5 min   -> ../../docs-chatbot/index.{bin,meta.json}
```

`crawl.py` needs no GPU and no ML dependency:

```bash
pip install requests trafilatura lxml tqdm truststore
```

`truststore` is optional but worth having behind a corporate proxy: TLS
interception makes Python reject certificates that browsers and `curl` accept,
and without it the crawl dies at the first request with
`CERTIFICATE_VERIFY_FAILED`. The script uses it when present.

The notebook is the fallback for a machine that cannot run Python locally. It
performs the crawl only — embedding deliberately has one implementation.

## Sources

1 011 pages, measured against the live sitemaps:

| source | in sitemap | indexed | dropped |
|---|---|---|---|
| docs.hardwario.com | 504 | 504 | — |
| www.hardwario.com | 640 | 128 | 512 `cs/sk/pl/de` translations |
| www.hardwario.store | 1 895 | 379 | translations; **plus 5 640 faceted category URLs, never fetched** |

Those 5 640 store URLs are filter permutations — `/milesight/p-detection-
sensitivity/0-5-mm` and thousands like it. Indexing them would bury real pages
under near-identical listings that match every query weakly and none well.

The locale filter is one rule: drop any URL whose first path segment is two
characters. No content path on any of the three sites is two characters long
(products are `/p/`, manufacturers `/m/`), so it needs no per-site list and does
not rot when a locale is added. **It does mean Czech pages are excluded** — see
STATUS.md, which measures what that costs.

## The rules that must not be broken

**One embedding implementation.** `embed.mjs` and the backend run the same ONNX
model through the same runtime, so index vectors and query vectors are
comparable by construction. Two runtimes would make it an assumption instead —
and a mismatch raises nothing, it just returns confident nonsense.

**Pooling and prefixes are per model, and getting them wrong is silent.**
gte-multilingual-base wants CLS pooling and scores materially worse under mean;
e5 wants `query:` / `passage:` markers and degrades without them. Both live in
`RECIPES` in `embed.mjs`, and both travel into `index.meta.json` so the backend
reproduces the query side without a second place to configure. Adding a model
means adding its recipe — `embed.mjs` refuses to guess.

**The chunk title is embedded, but only on the index side.** "Add to Cart,
47,90 EUR" matches nothing useful; "CHESTER-C4 / Add to Cart, 47,90 EUR"
matches a question about what a CHESTER-C4 costs. The query gets no such
framing. That asymmetry is deliberate.

## Choosing a model

```bash
cd scripts/chatbot/bench
npm i @huggingface/transformers   # not in package.json: ~0.5 GB of ONNX runtime
                                  # that the site build never touches
node bench.mjs ../../../chunks.jsonl questions.json questions-cs.json
```

Reports recall@8 — did the correct page reach the top 8 Claude is shown — split
by precise and vague questions, in English and Czech. Vectors are cached under
`bench/vectors/`, so re-running against a new question set costs seconds rather
than re-embedding the corpus.

Results and what they changed: STATUS.md.
