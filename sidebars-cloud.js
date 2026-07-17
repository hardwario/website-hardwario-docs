// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',
    'first-steps',
    'spaces',
    {
      type: 'category',
      label: 'Devices',
      collapsed: true,
      items: [
        { type: 'doc', id: 'devices', label: 'Device Management' },
        'bulk-actions',
        {
          type: 'category',
          label: 'Messages',
          collapsed: true,
          items: [
            { type: 'doc', id: 'messages', label: 'Overview' },
            'uplink',
            'downlink',
          ],
        },
        'tags',
        'variables',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: true,
      items: [
        'connectors',
        'fota',
        'api',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      collapsed: true,
      items: [
        'users',
      ],
    },
    {
      type: 'category',
      label: 'Video Tutorials',
      link: {
        type: 'doc',
        id: 'videos-cloud/index',
      },
      collapsed: true,
      items: [
        'videos-cloud/cloud-chester-add',
      ],
    },
  ],
};

module.exports = sidebars;
