# GENERATED from build_index.py — do not edit. Regenerate with:
#     npm run chatbot:notebook
#
# Crawls the three HARDWARIO sites and writes chunks.jsonl: plain text, no
# vectors, no ML dependencies, no GPU. That file is the input to whichever
# embedding model is chosen — swapping models never means crawling again.
#
#     pip install requests trafilatura lxml tqdm
#     python scripts/chatbot/crawl.py

# Corporate TLS interception makes Python reject certificates that browsers
# and curl accept. truststore uses the OS certificate store instead, which
# is where the intercepting root actually lives. Optional: absent, this is a
# no-op and normal verification applies.
try:
    import truststore

    truststore.inject_into_ssl()
except ImportError:
    pass

# 2 — Configuration.

import re

CHUNK_SIZE = 1000       # characters per chunk
CHUNK_OVERLAP = 150     # characters repeated between neighbouring chunks
MIN_CHUNK = 120         # drop fragments shorter than this
MIN_PAGE = 200          # a page yielding less than this counts as failed extraction

# The only output: plain text, no vectors. Deliberately model-agnostic, so
# changing the embedding model costs minutes of embedding rather than another
# full crawl. scripts/chatbot/embed.mjs turns this into the index.
CHUNKS_FILE = "chunks.jsonl"
UA = "HARDWARIO-index-builder/1.0 (+https://docs.hardwario.com)"
WORKERS = 6             # parallel fetches — polite towards our own servers

# All three sites serve their locales as separate URLs under a two-letter first
# path segment (/cs/, /de/, /cz/, /gl/, /ch/, ...). Indexing those would
# multiply the corpus ~5x with translations of pages we already have, so they
# are dropped. No real content path on any of the three sites is two characters
# long — products live under /p/, manufacturers under /m/.
LOCALE_PREFIX = re.compile(r"^/[a-z]{2}/")

SOURCES = {
    # 504 pages, all wanted.
    "docs": ["https://docs.hardwario.com/sitemap.xml"],
    # 640 URLs, of which 512 are cs/sk/pl/de translations -> 128 kept.
    "www": ["https://www.hardwario.com/sitemap-0.xml"],
    # sitemap-categories.xml.gz is deliberately absent. It holds 5 640 faceted
    # navigation URLs (e.g. /milesight/p-detection-sensitivity/0-5-mm) — filter
    # permutations, not content. Indexing them would bury the real pages under
    # thousands of near-identical listings that match every query weakly.
    # sitemap-advisors is a JS quiz with no extractable prose.
    "store": [
        "https://www.hardwario.store/sitemap-{}.xml.gz".format(s)
        for s in ("products", "manufacturers", "others", "news")
    ],
}

# What step 3 should report. Order-of-magnitude drift means a sitemap changed
# shape and the filters above need revisiting before the run is trustworthy.
EXPECTED = {"docs": 504, "www": 128, "store": 380}

# 3 — Collect the URL list from the sitemaps.
#
# Two traps, both confirmed against the live sites:
#   * the store's .xml.gz files are served already decompressed via
#     Content-Encoding, so gzip.decompress() raises on them -> fall back to raw
#   * www's sitemap-0.xml is one single line, so it must be XML-parsed rather
#     than read line by line

import gzip
import requests
import lxml.etree as ET
from urllib.parse import urlparse

SITEMAP_NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def sitemap_urls(url):
    r = requests.get(url, headers={"User-Agent": UA}, timeout=60)
    r.raise_for_status()
    raw = r.content
    try:
        raw = gzip.decompress(raw)
    except (OSError, gzip.BadGzipFile):
        pass  # already decompressed by the transport layer
    root = ET.fromstring(raw)
    return [e.text.strip() for e in root.findall(".//s:loc", SITEMAP_NS) if e.text]


targets, report = [], {}
for site, sitemaps in SOURCES.items():
    found = {u for sm in sitemaps for u in sitemap_urls(sm)}
    kept = sorted(u for u in found if not LOCALE_PREFIX.match(urlparse(u).path))
    report[site] = (len(found), len(kept))
    targets += [(site, u) for u in kept]

print("{:8} {:>11} {:>7} {:>9}".format("source", "in sitemap", "kept", "expected"))
for site, (found, kept) in report.items():
    exp = EXPECTED[site]
    flag = "" if 0.5 * exp <= kept <= 2 * exp else "   <-- CHECK THIS"
    print("{:8} {:11} {:7} {:9}{}".format(site, found, kept, exp, flag))
print("\ntotal pages to fetch: {}".format(len(targets)))
print("\nIf any row is flagged, a sitemap changed shape. Stop and investigate")
print("before running the rest — the index would be built on wrong input.")

# 4 — Fetch and extract readable text. The slow step, ~3-5 minutes.
#
# trafilatura strips navigation, menus and footers. That is not optional here:
# the store's <main> contains the entire category menu, and without removing it
# every product chunk would open with the same 400 characters of boilerplate
# and therefore look alike to the embedding model.

import threading
import time
import trafilatura
from concurrent.futures import ThreadPoolExecutor
from tqdm.auto import tqdm

# One Session per worker thread. Sessions are not guaranteed thread-safe, and
# sharing one across the pool produces occasional, hard-to-place connection
# errors rather than an obvious failure. Per-thread keeps connection reuse
# (which is most of the speed here) without the shared mutable state.
_local = threading.local()


def get_session():
    if not hasattr(_local, "session"):
        _local.session = requests.Session()
        _local.session.headers.update({"User-Agent": UA})
    return _local.session


def decode(response):
    """Decode the response using the charset the document itself declares.

    requests falls back to ISO-8859-1 whenever the Content-Type header carries
    no charset (RFC 2616), and all three sites declare UTF-8 in a <meta> tag
    instead — which requests never reads. Left to itself it mangles every
    accented character, every typographic quote and every emoji, silently:
    no error, no warning, just a measured 4% of chunks quietly corrupted and
    an index that retrieves slightly worse for reasons nobody can trace.
    """
    ctype = (response.headers.get("Content-Type") or "").lower()
    if "charset=" in ctype:
        return response.text
    m = re.search(rb"""charset=["']?([\w-]+)""", response.content[:2048], re.I)
    enc = m.group(1).decode("ascii", "ignore") if m else "utf-8"
    try:
        return response.content.decode(enc, errors="replace")
    except LookupError:
        return response.content.decode("utf-8", errors="replace")


# Docusaurus injects a zero-width non-joiner into every heading anchor. It is
# invisible, but it lands mid-word in the extracted text and becomes part of
# the token stream the embedding model sees.
ZERO_WIDTH = re.compile("[\u200b-\u200f\ufeff]")


def extract_text(html):
    """Precision first, then a greedier pass for sparse pages.

    include_formatting keeps the heading markers. Without it trafilatura
    returns headings as ordinary lines, and the consequences were not obvious:
    step 6 splits on headings so a chunk does not straddle two topics, and with
    no "##" anywhere in the text that split silently never fired — 15 chunks
    out of 2 648 contained a heading line, so the corpus was really just
    1 000-character slices. The measured symptom: asked where the newest
    CHESTER firmware is, retrieval never returned the page holding the build
    table, because those rows sat in a chunk that opened "app config mode lte"
    and never said "firmware".
    """
    for kwargs in ({"favor_precision": True}, {"favor_recall": True}):
        text = trafilatura.extract(
            html,
            include_comments=False,
            include_tables=True,
            include_formatting=True,
            **kwargs
        )
        if text and len(text) >= MIN_PAGE:
            return ZERO_WIDTH.sub("", text)
    return None


# <h2 class="anchor" id="application-firmware">Available Application Firmware
# Builds<a class="hash-link" href="#application-firmware">​</a></h2>
HEADING_TAG = re.compile(r"(?is)<h([1-6])[^>]*\sid=\"([^\"]+)\"[^>]*>(.*?)</h\1>")
TAGS = re.compile(r"(?s)<[^>]+>")


def heading_anchors(html):
    """Map each heading's text to the anchor Docusaurus gave it.

    The anchor cannot be derived from the heading text: "Available Application
    Firmware Builds" is published at #application-firmware, because the page
    sets an explicit id. Slugifying the words would produce a link that scrolls
    nowhere, so the ids are read from the HTML instead.
    """
    anchors = {}
    for _level, anchor, inner in HEADING_TAG.findall(html):
        text = ZERO_WIDTH.sub("", TAGS.sub("", inner))
        text = re.sub(r"\s+", " ", text).strip()
        if text and text not in anchors:
            anchors[text] = anchor
    return anchors


def page_title(html, url):
    try:
        meta = trafilatura.extract_metadata(html)
        if meta and meta.title:
            return meta.title.strip()
    except Exception:
        pass
    m = re.search(r"(?is)<title[^>]*>(.*?)</title>", html)
    if m:
        return re.sub(r"\s+", " ", m.group(1)).strip()
    return urlparse(url).path.rstrip("/").rsplit("/", 1)[-1] or url


def fetch(item):
    site, url = item
    for attempt in range(3):
        try:
            r = get_session().get(url, timeout=45)
            if r.status_code >= 500:
                raise requests.HTTPError(str(r.status_code))
            r.raise_for_status()
            html = decode(r)
            text = extract_text(html)
            if not text:
                return ("empty", site, url, None)
            return ("ok", site, url, {
                "site": site,
                "url": url,
                "title": ZERO_WIDTH.sub("", page_title(html, url)),
                "text": text,
                "anchors": heading_anchors(html),
            })
        except Exception as exc:
            if attempt == 2:
                return ("error: " + type(exc).__name__, site, url, None)
            time.sleep(1.5 * (attempt + 1))


with ThreadPoolExecutor(max_workers=WORKERS) as ex:
    results = list(tqdm(ex.map(fetch, targets), total=len(targets), desc="fetching"))

pages = [r[3] for r in results if r[0] == "ok"]
failures = [r for r in results if r[0] != "ok"]
print("\nextracted {} pages, {} failed".format(len(pages), len(failures)))

# 5 — CHECK THE EXTRACTION.
#
# The safety brake. Everything from step 6 on costs real time, and a botched
# extraction is far cheaper to spot here than after the file has been shipped
# and loaded into the index.

import json
from collections import Counter

per_site = Counter(p["site"] for p in pages)
print("pages per source:", dict(per_site))
for site, exp in EXPECTED.items():
    got = per_site.get(site, 0)
    if got < 0.7 * exp:
        print("  !! {}: {} pages, expected ~{}".format(site, got, exp))

if failures:
    print("\nfailures ({}), first 10:".format(len(failures)))
    for status, site, url, _ in failures[:10]:
        print("  [{}] {} {}".format(status, site, url))

chars = sum(len(p["text"]) for p in pages)
print("\ntotal extracted text: {:.2f} MB".format(chars / 1e6))

# Mojibake check. UTF-8 read as ISO-8859-1 leaves a recognisable signature, and
# nothing else in these sites produces it. This is here because it already
# happened once: requests defaults to ISO-8859-1 when the Content-Type header
# omits a charset, and it corrupted 4% of chunks without raising anything.
# A wrong-but-plausible index is worse than a failed run, so this is loud.
MOJIBAKE = re.compile(r"â€|Ã[©¡­¨¼½©]|Å[¾¡ˆ]|Ä[›Ť]|ð")
mojibake = [p for p in pages if MOJIBAKE.search(p["text"]) or MOJIBAKE.search(p["title"])]
if mojibake:
    print("\n!! ENCODING BROKEN on {} of {} pages ({:.1f}%).".format(
        len(mojibake), len(pages), 100 * len(mojibake) / len(pages)))
    print("!! Text was decoded with the wrong charset — accented characters,")
    print("!! typographic quotes and emoji are corrupted. Do NOT build an index")
    print("!! from this. Check decode() in step 4.")
    for p in mojibake[:3]:
        print("!!   {}".format(p["url"]))
        print("!!     {}".format(MOJIBAKE.search(p["text"] + p["title"]).group(0)))
else:
    print("encoding: clean (no mojibake signature found)")

print("\nShortest five extractions — these must be real page content.")
print("If a store page opens with the category menu ('MILESIGHT SMART DEVICES")
print("TOWER CHESTER ...'), boilerplate removal failed and the run should stop.")
for p in sorted(pages, key=lambda x: len(x["text"]))[:5]:
    print("\n  [{} chars] {}".format(len(p["text"]), p["url"]))
    print("    {}".format(p["text"][:180]))

# Crawling is the expensive part — cache it so a mistake further down does not
# mean fetching a thousand pages all over again.
with open("pages.json", "w", encoding="utf-8") as f:
    json.dump(pages, f, ensure_ascii=False)
print("\n(raw pages cached to pages.json)")

# 6 — Split into chunks and drop duplicates.
#
# Split on headings first so a chunk rarely straddles two topics, then hard-wrap
# whatever is still too long. Dedup catches text that legitimately repeats
# across pages — shared footers, and store product descriptions, which render
# twice on the same page (verified on /p/chester-c4).

import hashlib

# Down to h4, measured against h3 on the 38 labelled questions: recall@8 went
# from Czech 15/19 to 16/19, English unchanged at 17/19. h4 is where reference
# tables live — "Available Application Firmware Builds" is an h4, and at h3 its
# rows inherited the section heading two levels up instead.
HEADING = re.compile(r"\n(?=#{1,4}\s)")
HEADING_LINE = re.compile(r"^#{1,4}\s+(.+?)\s*$", re.M)


def heading_of(block):
    """The section a block belongs to: the first heading line in it, if any."""
    m = HEADING_LINE.search(block)
    return m.group(1).strip() if m else ""


def split(text):
    """Chunks, each carrying the heading of the section it came from.

    A chunk keeps its heading even when it is the third slice of a long section
    and the heading itself is a thousand characters back. That is what the
    firmware build table needed: its rows are just product names, versions and
    hashes, and the only place the word "firmware" appears is the heading above
    them. Without it those rows match no question anyone would think to ask.
    """
    blocks, buf, buf_heading = [], "", ""
    for block in HEADING.split(text):
        if buf and len(buf) + len(block) > CHUNK_SIZE:
            blocks.append((buf_heading, buf.strip()))
            buf, buf_heading = block, heading_of(block)
        else:
            if not buf:
                buf_heading = heading_of(block)
            buf = buf + "\n" + block if buf else block
    if buf.strip():
        blocks.append((buf_heading, buf.strip()))

    out = []
    for heading, b in blocks:
        if len(b) <= CHUNK_SIZE:
            if len(b) >= MIN_CHUNK:
                out.append((heading, b))
            continue
        for i in range(0, len(b), CHUNK_SIZE - CHUNK_OVERLAP):
            piece = b[i:i + CHUNK_SIZE].strip()
            if len(piece) >= MIN_CHUNK:
                out.append((heading, piece))
    return out


def fingerprint(s):
    return hashlib.md5(re.sub(r"\W+", "", s.lower()).encode()).hexdigest()


chunks, seen = [], set()
for p in pages:
    for heading, c in split(p["text"]):
        h = fingerprint(c)
        if h in seen:
            continue
        seen.add(h)
        chunk = {
            "url": p["url"],
            "title": p["title"],
            "site": p["site"],
            "text": c,
        }
        # Both optional: a page's opening paragraphs sit under no heading, and
        # a heading without an explicit id has no anchor to link to.
        if heading:
            chunk["heading"] = heading
        anchor = p.get("anchors", {}).get(heading)
        if anchor:
            chunk["anchor"] = anchor
        chunks.append(chunk)

print("{} chunks from {} pages".format(len(chunks), len(pages)))
print("per source:", dict(Counter(c["site"] for c in chunks)))

# How large the finished index will be. It ships inside the backend's bundle
# and is read into memory on startup, so the size is worth knowing before the
# embedding step rather than after: int8 at these counts stays in single-digit
# megabytes, which is what keeps it quick to load and reviewable in git.
for d in (384, 768):
    print("  {} dims -> {:.1f} MB int8, {:.1f} MB float32".format(
        d, len(chunks) * d / 1e6, len(chunks) * d * 4 / 1e6))

# The crawl stage ends here, and its output is deliberately model-agnostic:
# chunks.jsonl is plain text, so it stays valid whichever embedding model is
# chosen later. Re-crawling a thousand pages to change models would be pure
# waste. scripts/chatbot/crawl.py is generated from these same cells and writes
# exactly this file without needing a GPU or any ML dependency.
with open(CHUNKS_FILE, "w", encoding="utf-8") as f:
    for c in chunks:
        f.write(json.dumps(c, ensure_ascii=False) + "\n")
print("\nwrote {} ({} chunks)".format(CHUNKS_FILE, len(chunks)))
