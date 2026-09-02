# Where this stands

Updated 2026-09-01. **Not deployed.** The live chatbot on docs.hardwario.com is
still the old web-search version.

## What it does now

Pure Anthropic. No embedding model, no vector store, no Google, no Cloudflare,
no GPU. One supplier, plus wherever the backend is hosted.

```
question
  -> Claude Haiku:  rewrite into English keywords, and name the      ~$0.0006
                    language it was asked in
  -> BM25:          over chunks.jsonl, in-process, ~1 ms
  -> answer from the top 8 passages:
                    English   Claude Haiku 4.5                       ~$0.0045
                    otherwise Claude Sonnet 5                        ~$0.009
```

Non-English questions go to the stronger model because Haiku's Czech has case
and preposition errors a reader notices — "LED přejde na zelené", "s baterii",
"demonstrują", and once "Antes than updating" mid-paragraph. English questions,
the majority, are unchanged. `CHAT_MODEL_NON_ENGLISH` turns it off.

Two repos:

| | |
|---|---|
| `Dokumentace/docs` | widget, and the crawl that builds `chunks.jsonl` |
| `Hardwario/docs-chatbot` | the backend — retrieval, prompt, tests |

`chunks.jsonl` (2 946 chunks over 880 pages, 2.8 MB) is copied into
`docs-chatbot` and committed. Each chunk carries the heading of the section it
came from and, where the page gave the heading an explicit id, that anchor — so
an answer can link `…/catalog-applications#available-application-firmware-builds`
and land the reader on the table rather than the top of a long page.

## Measured, not assumed

**Retrieval — recall@8** over 38 labelled questions (19 English, and the same 19
in Czech: identical target pages, identical precise/vague labels, so the pair
differs in exactly one variable). Run it with `npm run measure`.

| approach | English | Czech | third parties |
|---|---|---|---|
| raw BM25 | 13/19 | 5/19 | none |
| BM25 + Claude rewrite (until 2026-08-27) | 13/19 | 12/19 | none |
| embeddings, multilingual-e5-small | 18/19 | 14/19 | a model to host, or Gemini, or Cloudflare |
| **+ headings, anchors, field weights** *(shipped)* | **18/19** | **17/19** | **none** |

**The trade-off this document used to describe is gone.** Keyword retrieval now
matches the embedding path in English and beats it in Czech, still with no
supplier beyond Anthropic. Four changes did it, in order of how much they were
worth:

1. **`include_formatting=True` in `trafilatura.extract()`.** Without it the
   markdown heading markers were stripped, so step 6's "split on headings" —
   there precisely so a chunk does not straddle two topics — **never fired**:
   15 chunks out of 2 648 contained a heading line, and the corpus was really
   just 1 000-character slices. 2 197 of 2 946 chunks now carry a heading.
2. **Field weights** in `retrieval.js`: title, heading and slug count 3×, body
   1×, with document length left unweighted so BM25's normalisation does not
   cancel the boost. A word in a heading says what a passage is *about*; the
   same word in the middle of a thousand characters says only that it came up.
3. **Heading depth h4, not h3.** Reference tables live at h4 — "Available
   Application Firmware Builds" is one, and at h3 its rows inherited a heading
   two levels up. Measured on its own: Czech 15/19 -> 16/19.
4. **The rewrite understands "where do I find".** It now adds list, table,
   builds, downloads, catalog, available. What someone is looking for usually
   sits in a table, and tables are named with those words rather than with the
   verb in the question.

The worked example: *"Kde najdu nejnovější firmware CHESTERU?"* used to return
eight pages, none of them the one holding the build table — the table's rows are
product names, versions and hashes, and the word "firmware" appears only in the
heading above them, which the crawl was discarding. It now leads with
`#available-application-firmware-builds`.

**Model comparison**, if the embedding path is ever revisited. The measurement
harness is in `bench/`; vectors are cached, so re-running against new questions
costs seconds.

| model | dim | MB | English | Czech |
|---|---|---|---|---|
| gte-multilingual-base (CLS pooling) | 768 | 340 | 16/19 | 12/19 |
| multilingual-e5-base | 768 | 279 | 14/19 | 13/19 |
| multilingual-e5-small | 384 | 118 | **18/19** | **14/19** |

The smallest won on every axis, which contradicts the expectation that 384
dimensions would cost real quality. Dimensional capacity binds on large dense
corpora; 2 648 chunks is not one.

## Things that were wrong and are now right

Each of these was found by running the thing, not by reading it.

- **4.1% of chunks had broken encoding.** `requests` falls back to ISO-8859-1
  when the Content-Type header omits a charset, and all three sites declare
  UTF-8 in a `<meta>` tag instead. Silent. `crawl.py` now decodes per document
  and **fails loudly** if the mojibake signature reappears.
- **URL slugs were not searchable.** `/chester/first-steps` is titled "Quick
  Start Guide" and never writes "first steps" in its text, so asking for
  CHESTER's first steps found nothing — on the page named after exactly that.
  Slugs are now indexed alongside title and body.
- **The query rewrite leaked prose into the index query.** Asked "How do I
  connect it?", the model replied with a paragraph about the question being
  vague, and every word became a search term. Keywords now come from a
  `KEYWORDS:` marker, capped at 25 words; no marker means fall back to the raw
  question.
- **The site filter was far too loose.** It matched "solution", "blog" and
  "about", which the rewrite sprinkles over almost anything — a question about
  battery life came back full of store pages. Now only unambiguous commerce
  words widen the search.
- **Tests called the real Anthropic API.** The SDK captures `globalThis.fetch`
  when the client is constructed, which happens at module scope, so a stub
  installed in `beforeEach` arrived too late. The stub is now installed before
  the import, and the default throws on any unstubbed network call.

## Open, and worth deciding before it goes out

1. ~~**`support@hardwario.com` is unconfirmed.**~~ Settled: the address is
   **`ask@hardwario.com`**, which is what the rest of the site already uses
   (`static/llms.txt`, the Blockly page, the legal pages). It is the
   `SUPPORT_EMAIL` default, still overridable without a deploy.
2. **Store prices are not in the index.** `trafilatura` strips the price block
   as UI furniture — it sits next to the buy button, not in the prose. So
   "what does X cost" can never be answered, which was part of why the store was
   indexed at all. Fix is targeted extraction of price and stock in `crawl.py`,
   plus a re-crawl (~10 min).
3. **The build table's rows still rank ~20th, not top 8.** The answer reaches
   the right page through the heading and the rewrite, but the table's own rows
   remain weak matches — they are hashes and version numbers. Fine today; worth
   watching if firmware questions get more specific ("which version for Clime
   1WH").

*Resolved since the last revision:* Haiku's Czech (non-English questions now go
to Sonnet 5) and the retrieval gap against embeddings (closed — see above). The
Cloudflare escape hatch is therefore no longer needed; `worker/index.mjs`,
`wrangler.jsonc` and `check-parity.mjs` are kept, unused, in case the corpus
grows enough to change the picture.

## Trying it locally

```bash
# terminal 1 — backend
cd Hardwario/docs-chatbot
ANTHROPIC_API_KEY=... npm run dev            # http://localhost:3001

# terminal 2 — docs with the widget wired to it
cd Dokumentace/docs
CHAT_API_URL=http://localhost:3001/api/chat npm start -- --port 3002
```

Port 3000 is often already taken by a docs server pointing at **production**,
which is the old chatbot — check the port before concluding anything.

`npm test` (50 tests), `npm run smoke` (real answers, ~1 cent),
`npm run measure` (recall@8, ~2 cents).

The crawl needs `truststore` installed (corporate TLS interception makes Python
reject certificates browsers accept) and `PYTHONUTF8=1` on a Windows console,
which otherwise dies with `UnicodeEncodeError` on the first accented character.
`crawl.py` caches the fetched pages to `pages.json`, so re-chunking at a
different heading depth costs seconds rather than another full crawl.

## Refreshing the corpus, monthly

```bash
cd Dokumentace/docs
npm run chatbot:crawl                        # ~10 min -> chunks.jsonl
cp chunks.jsonl ../../docs-chatbot/
cd ../../docs-chatbot && npm test && npm run measure
```

`crawl.py` stops and says so if a sitemap changed shape, if extraction
collapsed, or if the text came back with broken encoding. Read its step 3 and
step 5 output — all three have happened at least once.

## When Czech documentation goes live

`docusaurus.config.js` declares `locales: ['en', 'cs']` and `npm run build`
already emits `build/cs/`. Not yet deployed: the live sitemap still lists 504
URLs, none Czech.

When it is, the crawler will not merely filter the Czech pages — **it will never
see them.** Docusaurus emits a separate sitemap per locale: the English one at
`/sitemap.xml` never grows, and `/cs/sitemap.xml` (505 URLs) is not fetched. So
nothing will look wrong. The fix is one line in `SOURCES`, plus letting that
source through `LOCALE_PREFIX`.

Indexing the Czech pages is also the real fix for Czech retrieval: only 65 of
2 648 chunks currently contain any Czech, which is why a Czech question has to
be translated before it can match anything.
