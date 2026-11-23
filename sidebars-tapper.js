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
      ],
    },
    {
      type: 'category',
      label: 'Development',
      className: 'sidebar-section',
      collapsible: false,
      items: [
        'tls-setup',
        'api-spec',
      ],
    },
    {
      type: 'category',
      label: 'Other',
      className: 'sidebar-section',
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'changelog',
          label: 'Changelog',
        },
      ],
    },
  ],
};

module.exports = sidebars;
