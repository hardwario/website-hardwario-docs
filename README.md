# HARDWARIO Documentation

Technical documentation for HARDWARIO products and services —
[docs.hardwario.com](https://docs.hardwario.com). Built with
[Docusaurus 3](https://docusaurus.io). A multi-instance site: each product has its
own doc set served under `/<product>/`.

## Tech stack

- **Docusaurus 3** — React + MDX static site generator
- **Multi-instance docs** — one `@docusaurus/plugin-content-docs` instance per product
- **Local search** — offline site-wide search via `@easyops-cn/docusaurus-search-local`
- **Cloudflare Workers** — hosting (static assets, auto-deploy via Workers Builds)

## Develop

```bash
npm install        # first time / after dependency changes (Node 18+)
npm start          # dev server → http://localhost:3000, hot reload
npm run build      # production build → build/ (fails on broken links)
npm run serve      # serve the production build locally
npm run clear      # clear the Docusaurus cache
```

## Project structure

```
docusaurus.config.js     # site config: presets, plugin instances, navbar, footer, search, theme
sidebars-<product>.js    # one sidebar per product instance
<product>/               # one content folder per product, served at /<product>/:
                         #   chester, sticker, ember, fiber, gauger, tapper, tower,
                         #   cloud, cloud-new, apps, milesight, glider, rakwireless
src/
  pages/index.js         # custom homepage
  css/custom.css         # global styles / CSS variables
static/                  # assets; reference images by absolute path (/img/…)
                         #   incl. static/_redirects (same-domain slug redirects)
wrangler.jsonc           # Cloudflare Worker config — serves build/ as static assets
```

The main preset is the `chester` instance; the others are configured in the
`plugins` array of `docusaurus.config.js`. See the `docusaurus-sites` skill in the
website-admin repo for the multi-instance details.

## Content

- Docs are **Markdown/MDX** inside the relevant `<product>/` directory — identify
  the right folder first, then preserve frontmatter.
- Add new pages to the matching `sidebars-<product>.js`.
- Internal links are relative within a product; cross-product links use absolute
  paths (e.g. `/cloud/api`). **Broken internal links fail the build**
  (`onBrokenLinks: 'throw'`).
- Images live in `static/`, referenced as `/img/…`; the ideal-image and
  image-zoom plugins handle optimization and click-to-zoom.
- Match the existing technical, concise style and consistent product terminology.

### Adding a new product doc set
1. Create `<newproduct>/` at the repo root.
2. Create `sidebars-<newproduct>.js` from an existing one.
3. Add a `@docusaurus/plugin-content-docs` instance in `docusaurus.config.js`.
4. Add a navbar entry under `themeConfig.navbar.items`.
5. Add `introduction.md` as the entry point.

## Search

Offline/local search via the `@easyops-cn/docusaurus-search-local` theme,
configured in `docusaurus.config.js` (the `themes` array). The index is built at
`npm run build`; contextual search is disabled, so search spans all products.

## Deployment

Hosted on **Cloudflare Workers** (static assets) — **pushing to `main` auto-deploys**
(Workers Builds runs `npm run build` then `npx wrangler deploy`, serving `build/`).
After a push, confirm the live URL returns 200.
`editUrl` in `docusaurus.config.js` points "Edit this page" links at this repo.

---

Part of the [HARDWARIO websites](https://github.com/hardwario/website-admin) —
managed from the **website-admin** control repo (shared Claude Code commands,
skills, and environment). Content licensed under [CC BY-SA 4.0](LICENSE).
