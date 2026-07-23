// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer');
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HARDWARIO Documentation',
  tagline: 'Technical Resources for Products and Services',
  url: 'https://docs.hardwario.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',

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
          'https://www.linkedin.com/company/13187032',
          'https://twitter.com/hardwario_en',
          'https://www.youtube.com/c/hardwario',
          'https://github.com/hardwario',
        ],
      }),
    },
  ],

  // ✅ Přesunuto z kořene: onBrokenMarkdownLinks → markdown.hooks.onBrokenMarkdownLinks
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
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
          ignorePatterns: ['/search'],
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
        docsDir: ['chester', 'ember', 'fiber', 'fiber-lite', 'tapper', 'tower', 'cloud', 'gauger', 'glider', 'apps', 'sticker', 'smart-devices'],
        docsRouteBasePath: ['chester', 'ember', 'fiber', 'fiber-lite', 'tapper', 'tower', 'cloud', 'gauger', 'glider', 'apps', 'sticker', 'smart-devices'],
      },
    ],
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
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'fiber-lite',
        path: 'fiber-lite',
        routeBasePath: 'fiber-lite',
        sidebarPath: require.resolve('./sidebars-fiber-lite.js'),
        editUrl: 'https://github.com/hardwario/website-hardwario-docs/edit/main',
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
              { to: '/fiber-lite/', label: 'FIBER Lite', activeBaseRegex: `/fiber-lite/` },
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
              // { to: '/apps/ubidots/index', label: 'Ubidots', activeBaseRegex: `/apps/ubidots/index` },
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
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        selector: '.markdown :not(em) > img:not([data-zoomable="false"]), .markdown > img:not([data-zoomable="false"])',
        config: {
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
              { label: 'HARDWARIO a.s. — Czech Republic', href: 'https://maps.app.goo.gl/uwNsT2fuUmTaoXc48' },
              { label: 'HARDWARIO LLC — United States', href: 'https://maps.app.goo.gl/YyUsBivFKc6yYVTr8' },
              { label: 'HARDWARIO LTD — United Kingdom', href: 'https://maps.app.goo.gl/BPVS4T61Ao1h5HVJ9' },
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
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/13187032' },
              { label: 'X', href: 'https://x.com/hardwario_en' },
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
            items: [
              { label: 'Privacy Policy', href: 'https://www.hardwario.com/legal/privacy/' },
              { label: 'Terms of Service', href: 'https://www.hardwario.com/legal/terms/' },
              { label: 'Cookie Policy', href: 'https://www.hardwario.com/legal/cookies/' },
              { label: 'Recycling', href: 'https://www.hardwario.com/downloads/legal/take-back-electrical-equipment-en.pdf' },
            ],
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

module.exports = config;
