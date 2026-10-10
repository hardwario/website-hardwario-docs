// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer');
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;
const absoluteDocsLinks = require('./src/remark/absolute-docs-links');
// Every YouTube embed becomes a click-to-play poster (no Google request before
// the click); see the file.
const youtubeFacade = require('./src/remark/youtube-facade');

// The site title ends every <title> and og:title, and code.json cannot reach
// it, so it is picked per locale below. Docusaurus sets the variable for each
// locale it builds (and for `start --locale`).
const SITE_TEXT = {
  en: {
    title: 'HARDWARIO Documentation',
    tagline: 'Technical Resources for Products and Services',
  },
  cs: {
    title: 'Dokumentace HARDWARIO',
    tagline: 'Technické podklady k produktům a službám',
  },
};

// The Legal footer column points at www.hardwario.com in the visitor's
// language, always at a document's own address /<lang>/legal/<name>/ (a PDF
// document redirects to its current file). Labels stay English here; the cs
// footer.json translates them.
function legalLinks(locale) {
  const www = locale === 'cs' ? 'https://www.hardwario.com/cs' : 'https://www.hardwario.com';
  return [
    { label: 'Privacy Notice', href: `${www}/legal/privacy/` },
    { label: 'Terms of Sale', href: `${www}/legal/terms-of-sale/` },
    { label: 'Cookie Policy', href: `${www}/legal/cookies/` },
    { label: 'Recycling', href: `${www}/legal/take-back/` },
    { label: 'All Legal Documents', href: `${www}/legal/` },
  ];
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...SITE_TEXT.en,
  url: 'https://docs.hardwario.com',
  baseUrl: '/',
  // Workers static assets serve `x/index.html` at `/x/` and 307 `/x` to it, so
  // emit trailing-slash URLs everywhere (links, canonical, hreflang, sitemap)
  // to avoid a redirect hop on every first navigation and sitemap entry.
  trailingSlash: true,
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',

  // Docusaurus Faster (@docusaurus/faster): Rspack bundler, SWC JS loader and
  // minifier, Lightning CSS, SSG worker threads. The worker threads need the v4
  // flag that drops the legacy postBuild({head}) API, which no plugin here uses;
  // the other v4 flags (CSS cascade layers, storage namespacing) would change
  // the site and stay off. Two faster options stay off on purpose:
  // - swcHtmlMinimizer: some pages put a raw <p> inside the <b> of a <details>
  //   summary or around a code block (invalid HTML). The SWC HTML minifier then
  //   omits a </p> the browser parser needs, which changed the DOM of 72 built
  //   pages; the default minifier leaves the markup as written.
  // - gitEagerVcs: in a submodule checkout it lost <lastmod> for 481 of 497
  //   sitemap URLs. The default per-file git strategy keeps them.
  future: {
    v4: { removeLegacyPostBuildHeadAttribute: true },
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: false,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      ssgWorkerThreads: true,
      gitEagerVcs: false,
    },
  },

  customFields: {
    // Backend for the docs chat widget. Cross-origin: the backend is a Vercel
    // function (it retrieves passages from a shipped snapshot of the corpus),
    // not part of this deployment — so /api/chat here would hit the docs site's
    // own static assets and 404. Override with CHAT_API_URL to point a local
    // build at a preview deployment.
    chatApiUrl: process.env.CHAT_API_URL || 'https://docs-chatbot-beta.vercel.app/api/chat',
    // Where the chat's 👍 / 👎 ratings go: the Google Form "CHATBOT - Reviews",
    // whose responses are linked to a sheet. Public by nature, since the
    // browser posts to it directly. The entry ids are the form's question ids;
    // if a question is ever deleted and re-added, read the new ones from the
    // FB_PUBLIC_LOAD_DATA_ blob in the form's viewform page. Remove this to
    // hide the rating buttons.
    feedbackForm: {
      url: 'https://docs.google.com/forms/d/e/1FAIpQLScSNygjUGgiHQYKgqaKaT3XUU8gGsVEuktoLf6SJaIDjfQS5A/formResponse',
      fields: {
        id: 'entry.1430143637',
        rating: 'entry.1603480026',
        comment: 'entry.230237756',
        question: 'entry.1941598886',
        answer: 'entry.1428581215',
        sources: 'entry.1229661556',
        page: 'entry.1911132568',
        locale: 'entry.232482553',
      },
    },
  },

  // Organization structured data (schema.org JSON-LD) — consistent across HARDWARIO sites
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HARDWARIO',
        legalName: 'HARDWARIO a.s.',
        url: 'https://www.hardwario.com',
        logo: 'https://docs.hardwario.com/img/logo.svg',
        description:
          'Czech manufacturer of industrial / wireless IoT (LPWAN) hardware and software.',
        address: { '@type': 'PostalAddress', addressCountry: 'CZ' },
        areaServed: 'Europe',
        sameAs: [
          'https://www.linkedin.com/company/hardwario/',
          'https://twitter.com/hardwario_en',
          'https://www.youtube.com/c/hardwario',
          'https://github.com/hardwario',
        ],
      }),
    },
  ],

  // ✅ Přesunuto z kořene: onBrokenMarkdownLinks → markdown.hooks.onBrokenMarkdownLinks
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cs'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en-US' },
      cs: { label: 'Čeština', htmlLang: 'cs-CZ' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'chester',
          path: 'chester',
          sidebarPath: require.resolve('./sidebars-chester.js'),
          editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
          remarkPlugins: [absoluteDocsLinks, youtubeFacade],
        },
        // This property has no blog content. Disabling the preset's default
        // blog prevents an empty /blog page from being built and indexed.
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          // Emit <lastmod> so crawlers can prioritize fresh pages, and keep the
          // visitor-only /search UI out of the sitemap.
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          // Both spellings: the site emits trailing-slash URLs, so the crawlable path is /search/.
          ignorePatterns: ['/search', '/search/', '/search/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: false,
        docsDir: ['chester', 'ember', 'fiber', 'tapper', 'tower', 'cloud', 'gauger', 'glider', 'apps', 'sticker', 'smart-devices'],
        docsRouteBasePath: ['chester', 'ember', 'fiber', 'tapper', 'tower', 'cloud', 'gauger', 'glider', 'apps', 'sticker', 'smart-devices'],
      },
    ],
    '@docusaurus/theme-mermaid',
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'ember',
        path: 'ember',
        routeBasePath: 'ember',
        sidebarPath: require.resolve('./sidebars-ember.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'fiber',
        path: 'fiber',
        routeBasePath: 'fiber',
        sidebarPath: require.resolve('./sidebars-fiber.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'tapper',
        path: 'tapper',
        routeBasePath: 'tapper',
        sidebarPath: require.resolve('./sidebars-tapper.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'tower',
        path: 'tower',
        routeBasePath: 'tower',
        sidebarPath: require.resolve('./sidebars-tower.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'cloud',
        path: 'cloud',
        routeBasePath: 'cloud',
        sidebarPath: require.resolve('./sidebars-cloud.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'gauger',
        path: 'gauger',
        routeBasePath: 'gauger',
        sidebarPath: require.resolve('./sidebars-gauger.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'glider',
        path: 'glider',
        routeBasePath: 'glider',
        sidebarPath: require.resolve('./sidebars-glider.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'apps',
        path: 'apps',
        routeBasePath: 'apps',
        sidebarPath: require.resolve('./sidebars-apps.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'sticker',
        path: 'sticker',
        routeBasePath: 'sticker',
        sidebarPath: require.resolve('./sidebars-sticker.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    // ➜ Smart Devices (Milesight, RAKwireless, OnLogic, RPi, MikroTik, Carlo Gavazzi, Nexelec)
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'smart-devices',
        path: 'smart-devices',
        routeBasePath: 'smart-devices',
        sidebarPath: require.resolve('./sidebars-smart-devices.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
        remarkPlugins: [absoluteDocsLinks, youtubeFacade],
      }),
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1200,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      mermaid: {
        theme: { light: 'base', dark: 'base' },
        options: {
          themeVariables: {
            fontFamily: 'inherit',
            primaryColor: '#e8f4ff',
            primaryBorderColor: '#009cfa',
            primaryTextColor: '#252532',
            secondaryColor: '#eef0f3',
            tertiaryColor: '#ffffff',
            lineColor: '#6b6a6a',
            edgeLabelBackground: '#eef0f3',
          },
        },
      },
      navbar: {
        logo: {
          alt: 'HARDWARIO Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
        },
        items: [
          // 1) PRODUCTS (podmenu)
          {
            label: 'Products',
            position: 'left',
            items: [
              { to: '/chester/', label: 'CHESTER', activeBaseRegex: `/chester/` },
              { to: '/sticker/', label: 'STICKER', activeBaseRegex: `/sticker/` },
              { to: '/ember/',   label: 'EMBER',   activeBaseRegex: `/ember/` },
              { to: '/fiber/',   label: 'FIBER',   activeBaseRegex: `/fiber/` },
              { to: '/gauger/',  label: 'GAUGER',  activeBaseRegex: `/gauger/` },
              { to: '/glider/',  label: 'GLIDER',  activeBaseRegex: `/glider/` },
              { to: '/tapper/',  label: 'TAPPER',  activeBaseRegex: `/tapper/` },
              { to: '/tower/',   label: 'TOWER',   activeBaseRegex: `/tower/` },
            ],
          },
          // 2) SMART DEVICES (podmenu)
          {
            label: 'Smart Devices',
            position: 'left',
            items: [
              { to: '/smart-devices/milesight', label: 'Milesight', activeBaseRegex: `/smart-devices/milesight` },
              { to: '/smart-devices/rakwireless', label: 'RAKwireless', activeBaseRegex: `/smart-devices/rakwireless` },
              { to: '/smart-devices/onlogic', label: 'OnLogic', activeBaseRegex: `/smart-devices/onlogic` },
              { to: '/smart-devices/raspberry-pi', label: 'Raspberry Pi', activeBaseRegex: `/smart-devices/raspberry-pi` },
              { to: '/smart-devices/mikrotik', label: 'MikroTik', activeBaseRegex: `/smart-devices/mikrotik` },
              { to: '/smart-devices/carlo-gavazzi', label: 'Carlo Gavazzi', activeBaseRegex: `/smart-devices/carlo-gavazzi` },
              { to: '/smart-devices/nexelec', label: 'Nexelec', activeBaseRegex: `/smart-devices/nexelec` },
            ],
          },
          // 3) CLOUD (bez podmenu)
          {
            to: '/cloud/',
            label: 'Cloud',
            position: 'left',
            activeBaseRegex: `/cloud/`,
          },
          // 4) APPS (podmenu)
          {
            label: 'Apps',
            position: 'left',
            items: [
              { to: '/apps/hardwario-manager', label: 'HARDWARIO Manager', activeBaseRegex: `/apps/hardwario-manager` },
              { to: '/apps/thingsboard/index', label: 'ThingsBoard', activeBaseRegex: `/apps/thingsboard/index` },
              { to: '/apps/chirpstack/index', label: 'ChirpStack', activeBaseRegex: `/apps/chirpstack/index` },
              { to: '/apps/the-things-stack/index', label: 'The Things Stack', activeBaseRegex: `/apps/the-things-stack/index` },
              { to: '/apps/videos-apps/videos-apps', label: 'Video Tutorials', activeBaseRegex: `/apps/videos-apps/videos-apps` },
            ],
          },
          {
            href: 'https://github.com/hardwario/website-hardwario-docs',
            label: 'GitHub',
            position: 'right',
          },
          // Rendered between the color-mode toggle and the search bar by the
          // ejected src/theme/Navbar/Content component.
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        selector: '.markdown :not(em) > img:not([data-zoomable="false"]), .markdown > img:not([data-zoomable="false"])',
        config: {
          // Gap (px) kept between the zoomed image and the viewport edges, so
          // even tall/large images (covers, CGLS renders, schematics, module
          // drawings) stay fully inside the screen with their edges visible
          // instead of filling it edge-to-edge (medium-zoom default is 0).
          margin: 48,
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)',
          },
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Branches',
            items: [
              { label: 'HARDWARIO a.s. – Czech Republic', href: 'https://maps.app.goo.gl/uwNsT2fuUmTaoXc48' },
              { label: 'HARDWARIO LLC – United States', href: 'https://www.google.com/maps/search/?api=1&query=440+N+Wolfe+Rd%2C+Sunnyvale%2C+CA+94085' },
              { label: 'HARDWARIO LTD – United Kingdom', href: 'https://maps.app.goo.gl/BPVS4T61Ao1h5HVJ9' },
            ],
          },
          {
            title: 'Navigation',
            items: [
              { label: 'Products', href: 'https://www.hardwario.com/products/' },
              { label: 'Solutions', href: 'https://www.hardwario.com/solutions/' },
              { label: 'Customers', href: 'https://www.hardwario.com/customers/' },
              { label: 'Resources', href: 'https://www.hardwario.com/resources/' },
              { label: 'Online Store', href: 'https://www.hardwario.store/' },
            ],
          },
          {
            title: 'Connect',
            items: [
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hardwario/' },
              { label: 'X (Twitter)', href: 'https://x.com/hardwario_en' },
              { label: 'Instagram', href: 'https://www.instagram.com/hardwario/' },
              { label: 'YouTube', href: 'https://www.youtube.com/c/hardwario' },
              { label: 'GitHub', href: 'https://github.com/hardwario' },
              { label: 'Forum', href: 'https://forum.hardwario.com' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'Support', href: 'https://www.hardwario.com/support/' },
              { label: 'Contact', href: 'https://www.hardwario.com/contact/' },
              { label: 'About', href: 'https://www.hardwario.com/company/' },
              { label: 'Partners', href: 'https://www.hardwario.com/partners/' },
              { label: 'Investors', href: 'https://www.hardwario.com/investors/' },
              { label: 'Blog', href: 'https://www.hardwario.com/blog/' },
            ],
          },
          {
            title: 'Legal',
            // The www legal pages in the locale being built: legalLinks() in
            // module.exports below swaps these items per locale.
            items: legalLinks('en'),
          },
        ],
        copyright: `<nav aria-label="Other HARDWARIO websites" style="margin-bottom:8px"><span class="footer-sites-label">Other HARDWARIO websites:</span> <a href="https://www.hardwario.com/" target="_blank" rel="noopener noreferrer">HARDWARIO.com</a> · <a href="https://hardwario.engineering/" target="_blank" rel="noopener noreferrer">Engineering</a> · <a href="https://hardwario.studio/" target="_blank" rel="noopener noreferrer">Studio</a> · <a href="https://hardwario.academy/" target="_blank" rel="noopener noreferrer">Academy</a></nav>Copyright © ${new Date().getFullYear()} HARDWARIO a.s. | Designed and built in Europe.`,
      },
      docs: {
        sidebar: { hideable: true },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
      },
    }),
};

// A function, not the object: the build loads this module once but calls the
// function for every locale, so the title follows the locale being built.
module.exports = () => {
  const locale = process.env.DOCUSAURUS_CURRENT_LOCALE === 'cs' ? 'cs' : 'en';
  const footer = config.themeConfig.footer;
  return {
    ...config,
    ...SITE_TEXT[locale],
    themeConfig: {
      ...config.themeConfig,
      footer: {
        ...footer,
        links: footer.links.map((column) => (column.title === 'Legal' ? { ...column, items: legalLinks(locale) } : column)),
      },
    },
  };
};
