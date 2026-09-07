# Monthly changelog update

Once a month the product changelogs in this repo are checked against what has
actually shipped. This file is the procedure: where each changelog's truth
lives, how an entry is written, and what to verify before pushing.

Run it on the first working day of the month, or whenever a release lands that
someone will look for in the docs.

## Where the truth lives

Each changelog has exactly one authoritative source. Do not write an entry from
a commit log or a Slack message when the source below exists.

| Changelog page | Product | Source of truth |
|---|---|---|
| `chester/catalog-applications/changelog.md` | CHESTER SDK and catalog applications | [`hardwario/chester-sdk`](https://github.com/hardwario/chester-sdk) — releases and tags |
| `chester/changelog.md` | CHESTER platform, firmware and hardware | Curated. SDK releases above, plus hardware revisions, which have no repo — ask the hardware team |
| `sticker/changelog.md` | STICKER firmware | [`hardwario/sticker-firmware`](https://github.com/hardwario/sticker-firmware) — **the per-version doc in the repo**, see the warning below |
| `tapper/changelog.md` | TAPPER | [`hardwario/tapper`](https://github.com/hardwario/tapper) — releases |
| `fiber/changelog.md` | FIBER | **No usable source.** See the note below |
| `gauger/changelog.md` | GAUGER, the Wi-Fi/Ethernet counter | `gitlab.hardwario.com/softli/collector/firmware` — tags. **Not** `gitlab.hardwario.com/gauger/firmware`, which is the LTE device |
| `tower/changelog.md` | TOWER | Legacy [`hardwario/twr-sdk`](https://github.com/hardwario/twr-sdk) (dormant since 2023) and the current Rust stack: `tower`, `tower-firmware`, `tower-cli` |
| `ember/changelog.md` | EMBER | External — EMBER runs MikroTik RouterOS, see the [MikroTik changelog](https://mikrotik.com/download/changelogs). Only HARDWARIO-side changes belong here |

Two traps worth stating plainly:

- **STICKER: GitHub Releases lag.** The real per-version notes are a Markdown
  file inside the firmware repo, one per version, at the version tag:
  `https://raw.githubusercontent.com/hardwario/sticker-firmware/v1.4.0/doc/version%201.4.md`
  Note the space in the filename. Releases once listed v1.3.4 as newest while
  v1.4.0 was tagged and shipped. If the raw URL resolves, the tag exists.
- **GAUGER is two different devices.** The documented one is the Wi-Fi/Ethernet
  counter, whose firmware is `softli/collector` — the name comes from the
  `"name": "softli-collector-…"` in the `/api/v1/meta` example on the HTTP API
  page. `gauger/firmware` on GitLab is the nRF9151 LTE variant, which the docs
  do not cover at all.

### No source, no entry

If a release carries no human-written notes, leave the page alone. Do not
reconstruct an entry from a commit log — a changelog is a promise about what
changed, and a commit list is not that promise.

Two sources look usable and are not:

- **FIBER.** `hardwario/fiber-agent` on GitHub only mirrors an internal build:
  every release body reads "Mirror of GitLab release vX. Built from internal
  source at gitlab.hardwario.com/fiber-v2/application". That project (which
  redirects to `proximos/application`, id 499) publishes 60 releases, mostly
  `v5.0.0-dev.N` from the semantic-release `dev` channel, and the stable ones
  are either a generated commit list ("Test new ci flow") or the single line
  "Auto-built aarch64 binary with --features dev-platform". None of that is
  release notes. Leave `fiber/changelog.md` empty until someone writes real
  ones.
- **TOWER's Rust rewrite.** `tower`, `tower-firmware` and `tower-cli` are a
  separate, current stack; only `tower-cli` has a release (v1.0.0, 2026-07-02)
  and it does carry real notes. Whether it belongs in `tower/changelog.md`,
  which documents the legacy twr-sdk platform, is a product decision — ask
  before writing it up.

### Reading the internal GitLab

`git` on the maintainer machine has stored credentials for
`gitlab.hardwario.com`, and the same token works against the API:

```bash
GLTOK=$(git credential fill <<<$'protocol=https\nhost=gitlab.hardwario.com\n' \
        | sed -n 's/^password=//p')
curl -s -H "PRIVATE-TOKEN: $GLTOK" \
  "https://gitlab.hardwario.com/api/v4/projects/softli%2Fcollector%2Ffirmware/releases?per_page=50"
```

A project path that 301-redirects has been renamed; follow the redirect and use
the numeric project id it gives you.

GLIDER has no changelog page yet, and `gitlab.hardwario.com/glider/firmware`
carries no tags. Add the page when the firmware starts tagging releases.

## The check

For each product, compare the newest entry in the docs page against the newest
release at its source:

```bash
# newest entry currently documented, per page
for f in chester/changelog.md chester/catalog-applications/changelog.md \
         sticker/changelog.md tapper/changelog.md fiber/changelog.md \
         gauger/changelog.md tower/changelog.md ember/changelog.md; do
  printf '%-46s %s\n' "$f" "$(grep -oE '20[0-9]{2}-[0-9]{2}-[0-9]{2}' "$f" | sort -r | head -1)"
done

# newest release on GitHub
gh release list --repo hardwario/chester-sdk --limit 3
# ... or without gh:
curl -s https://api.github.com/repos/hardwario/chester-sdk/releases?per_page=3 \
  | grep '"tag_name"'

# newest tag on GitLab (uses your stored git credentials)
git ls-remote --tags --sort=-v:refname https://gitlab.hardwario.com/softli/collector/firmware | head
```

Anything released since the newest documented entry needs writing up.

## Writing an entry

Follow the shape already in `chester/catalog-applications/changelog.md`; the
v4.0.1 entry is the reference:

```markdown
## v4.0.1 (2026-09-07)

**NCS:** 3.4.1 · **Zephyr:** 4.4.2 · [Full commit log](https://github.com/hardwario/chester-sdk/compare/v4.0.0...v4.0.1) · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.1)

One paragraph saying who is affected and whether they must act.

### SDK / Common

- What changed, in the past tense, one line each
```

Rules that hold across all the pages:

- Newest first, directly under the `---` that follows the intro admonition.
- Heading is `## v<version> (<YYYY-MM-DD>)`, the date of the release, not of
  writing.
- Update the **Latest Release** tip at the top of the page in the same edit.
- Say who is affected and whether action is required. A reader scanning a
  changelog is asking "does this concern me?"
- Describe the effect, not the commit. "an off-by-one in the channel mapping
  made every channel sample its neighbouring pin", not "fix adc index".
- Leave the toolchain versions (NCS, Zephyr) in the pages that carry them; they
  come from the release, not from guesswork.
- If a release also changes firmware identifiers shown elsewhere — the build
  tables in `chester/catalog-applications/index.md`, for instance — update those
  in the same commit.

## The Czech mirror

Every changelog has a Czech counterpart under `i18n/cs/…/current/`. It is
translated by hand, in the same edit, never in a follow-up. Read
`scripts/i18n-glossary.md` first; the parts that bite most often here:

- Product names take no Czech endings.
- Headings carry the `{#english-heading-id}` anchor of their English source. A
  new heading above an existing one **renumbers the duplicates below it**:
  adding a second "SDK / Common" turns the older `{#sdk--common-3}` into
  `{#sdk--common-4}`. Check every anchor below your insertion point.
- On the dated pages the anchor keeps the hyphens of the date and drops the dots
  of the version: `### 2025-08-12 – v1.2.1` becomes `{#2025-08-12--v121}`. The
  double hyphen is the en dash being stripped. Copy the pattern from an existing
  entry rather than deriving it; `tapper/changelog.md` and its mirror are the
  reference pair.
- Decimal comma in prose and technical parameters, dot inside code and version
  numbers.

## Before pushing

```bash
npm run verify:i18n     # structure, front matter, glossary, translation JSON
npm run clear
npm run build           # both locales; the real gate — it fails on bad anchors
```

Commit message: `<product>: Add <version> release`, with a body saying what the
release does and that both EN and CS were updated.

## State as of 2026-09-07

Checked against the sources above:

| Page | Documented | Released | Gap |
|---|---|---|---|
| `chester/catalog-applications/` | v4.0.1 (2026-09-07) | v4.0.1 | current |
| `sticker/` | v1.4.0 | v1.4.0 (2026-08-18) | current |
| `tapper/` | v1.2.1 (2025-08-12) | 1.2.1 (2025-08-12) | current |
| `chester/` platform | 2026-06-24 | — | needs a pass, nothing logged since June |
| `tower/` | 2025-09-10 | tower-cli v1.0.0 (2026-07-02) | a year stale; the Rust rewrite is not mentioned at all |
| `fiber/` | nothing logged | — | left empty on purpose, no real notes exist |
| `gauger/` | v1.6.0 (2025-12-15) | v1.6.0 | filled 2026-09-07 from the GitLab releases, all nine versions |
| `ember/` | nothing logged | — | correct; RouterOS is MikroTik's changelog |
