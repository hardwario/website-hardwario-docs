// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  milesight: [
    'introduction',
    {
      type: 'category',
      label: 'Sensors',
      link: {
        type: 'doc',
        id: 'sensors/index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'AM300',
          collapsed: true,
          items: [
            'sensors/milesight-am300/milesight-am319',
            'sensors/milesight-am300/milesight-am307',
            'sensors/milesight-am300/milesight-am308',
          ],
        },
        'sensors/milesight-em400',
        'sensors/milesight-em500',
        'sensors/milesight-gs601',
        'sensors/milesight-vs135',
        'sensors/milesight-vs373',
        'sensors/milesight-ws101',
        'sensors/milesight-ws201',
        'sensors/milesight-ws303',
        'sensors/milesight-ws523',
        'sensors/milesight-wt101',
      ],
    },
    {
      type: 'category',
      label: 'Gateways',
      link: {
        type: 'doc',
        id: 'gateways/index',
      },
      collapsed: true,
      items: [
        'gateways/milesight-ug63',
        'gateways/milesight-ug65',
      ],
    },
      {
      type: 'category',
      label: 'Utility',
      link: {
        type: 'doc',
        id: 'utility/index',
      },
      collapsed: true,
      items: [
        'utility/milesight-ft101',
      ],

    },
    {
      type: 'category',
      label: 'Video tutorials',
      collapsed: true,
      items: [
        'videos-milesight/general-configuration',
      ],
      
    },
  ],
};

module.exports = sidebars;
