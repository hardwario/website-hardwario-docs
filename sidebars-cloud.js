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
            {
              type: 'category',
              label: 'Downlink',
              link: { type: 'doc', id: 'downlink/index' },
              items: [
                'downlink/data',
                'downlink/config',
                'downlink/shell',
              ],
            },
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
        {
          type: 'category',
          label: 'REST API',
          link: { type: 'doc', id: 'api/index' },
          items: [
            'api/authentication',
            'api/reading-data',
            'api/devices',
            'api/tags',
            'api/variables',
            'api/downlinks',
            'api/examples',
          ],
        },
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
