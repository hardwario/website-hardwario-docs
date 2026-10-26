// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'User Guide',
      className: 'sidebar-section',
      collapsible: false,
      items: [
        'hardware',
        'installation',
        'usage',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'sidebar-section',
      collapsible: false,
      items: [
        'security',
        'tls-setup',
        'api-spec',
      ],
    },
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    },
  ],
};

module.exports = sidebars;
