// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HARDWARIO Documentation',
  tagline: 'Technical Resources for Products and Services',
  url: 'https://docs.hardwario.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',

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
          editUrl: 'https://github.com/hardwario/docs/edit/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
        docsRouteBasePath: ['chester', 'ember', 'fiber', 'tapper', 'tower', 'cloud', 'gauger', 'glider', 'apps', 'sticker', 'smart-devices'],
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
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'fiber',
        path: 'fiber',
        routeBasePath: 'fiber',
        sidebarPath: require.resolve('./sidebars-fiber.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'tapper',
        path: 'tapper',
        routeBasePath: 'tapper',
        sidebarPath: require.resolve('./sidebars-tapper.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'tower',
        path: 'tower',
        routeBasePath: 'tower',
        sidebarPath: require.resolve('./sidebars-tower.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'cloud',
        path: 'cloud',
        routeBasePath: 'cloud',
        sidebarPath: require.resolve('./sidebars-cloud.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'cloud-new',
        path: 'cloud-new',
        routeBasePath: 'cloud-new',
        sidebarPath: require.resolve('./sidebars-cloud-new.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'gauger',
        path: 'gauger',
        routeBasePath: 'gauger',
        sidebarPath: require.resolve('./sidebars-gauger.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'glider',
        path: 'glider',
        routeBasePath: 'glider',
        sidebarPath: require.resolve('./sidebars-glider.js'),
        editUrl: 'https://github.com/hardwario/docs/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'apps',
        path: 'apps',
        routeBasePath: 'apps',
        sidebarPath: require.resolve('./sidebars-apps.js'),
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      ({
        id: 'sticker',
        path: 'sticker',
        routeBasePath: 'sticker',
        sidebarPath: require.resolve('./sidebars-sticker.js'),
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
        editUrl: 'https://github.com/hardwario/docs/edit/main',
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
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/chester/first-step',
            to: '/chester/first-steps',
          },
          {
            from: '/sticker/first-step',
            to: '/sticker/first-steps',
          },
          {
            from: '/glider/first-step',
            to: '/glider/first-steps',
          },
          {
            from: '/ember/first-step',
            to: '/ember/first-steps',
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'HARDWARIO Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
        },
        items: [
          // 1) PRODUCTS (podmenu)
          {
            label: 'PRODUCTS',
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
            label: 'SMART DEVICES',
            position: 'left',
            items: [
              { to: '/smart-devices/milesight', label: 'MILESIGHT', activeBaseRegex: `/smart-devices/milesight` },
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
            label: 'CLOUD',
            position: 'left',
            activeBaseRegex: `/cloud/`,
          },
          // 4) APPS (podmenu)
          {
            label: 'APPS',
            position: 'left',
            items: [
              // { to: '/apps/ubidots/index', label: 'UBIDOTS', activeBaseRegex: `/apps/ubidots/index` },
              { to: '/apps/thingsboard/index', label: 'THINGSBOARD', activeBaseRegex: `/apps/thingsboard/index` },
              { to: '/apps/chirpstack/index', label: 'CHIRPSTACK', activeBaseRegex: `/apps/chirpstack/index` },
              { to: '/apps/the-things-stack/index', label: 'THE THINGS STACK', activeBaseRegex: `/apps/the-things-stack/index` },
              { to: '/apps/videos-apps/videos-apps', label: 'VIDEO TUTORIALS', activeBaseRegex: `/apps/videos-apps/videos-apps` },
            ],
          },
          {
            href: 'https://github.com/hardwario/docs',
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
        selector: '.markdown :not(em) > img:not([data-zoomable="false"])',
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
              { label: 'HARDWARIO a.s. — Czech Republic', href: 'https://hardwario.com' },
              { label: 'HARDWARIO LLC — United States', href: 'https://hardwario.com' },
              { label: 'HARDWARIO LTD — United Kingdom', href: 'https://hardwario.com' },
            ],
          },
          {
            title: 'Navigation',
            items: [
              { label: 'Products', href: 'https://hardwario.com/products/' },
              { label: 'Solutions', href: 'https://hardwario.com/solutions/' },
              { label: 'Customers', href: 'https://hardwario.com/customers/' },
              { label: 'Resources', href: 'https://hardwario.com/resources/' },
              { label: 'Online Store', href: 'https://hardwario.store/' },
            ],
          },
          {
            title: 'Connect',
            items: [
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hardwario' },
              { label: 'Twitter / X', href: 'https://twitter.com/hardwario_en' },
              { label: 'Instagram', href: 'https://www.instagram.com/hardwario/' },
              { label: 'YouTube', href: 'https://www.youtube.com/@hardwario' },
              { label: 'GitHub', href: 'https://github.com/hardwario' },
              { label: 'Forum', href: 'https://forum.hardwario.com' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'Support', href: 'https://hardwario.com/support/' },
              { label: 'Contact', href: 'https://hardwario.com/contact/' },
              { label: 'About', href: 'https://hardwario.com/about/' },
              { label: 'Partners', href: 'https://hardwario.com/partners/' },
              { label: 'Investors', href: 'https://hardwario.com/investors/' },
              { label: 'Newsroom', href: 'https://hardwario.com/newsroom/' },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacy Policy', href: 'https://hardwario.com/privacy-policy/' },
              { label: 'Terms of Service', href: 'https://hardwario.com/terms-of-service/' },
              { label: 'Cookie Policy', href: 'https://hardwario.com/cookie-policy/' },
              { label: 'Recycling', href: 'https://hardwario.com/recycling/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} HARDWARIO a.s. | Created by a passionate team from all over the world.`,
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