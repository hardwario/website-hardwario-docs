/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  smartDevicesSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },

    // ─── Milesight ───────────────────────────────────────────
    {
      type: 'category',
      label: 'Milesight',
      collapsed: true,
      link: { type: 'doc', id: 'milesight/introduction' },
      items: [
        {
          type: 'category',
          label: 'Sensors',
          link: { type: 'doc', id: 'milesight/sensors/index' },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'AM300',
              collapsed: true,
              items: [
                'milesight/sensors/milesight-am300/milesight-am319',
                'milesight/sensors/milesight-am300/milesight-am307',
                'milesight/sensors/milesight-am300/milesight-am308',
              ],
            },
            'milesight/sensors/milesight-em400',
            'milesight/sensors/milesight-em500',
            'milesight/sensors/milesight-gs601',
            'milesight/sensors/milesight-vs135',
            'milesight/sensors/milesight-vs373',
            'milesight/sensors/milesight-ws101',
            'milesight/sensors/milesight-ws201',
            'milesight/sensors/milesight-ws303',
            'milesight/sensors/milesight-ws523',
            'milesight/sensors/milesight-wt101',
          ],
        },
        {
          type: 'category',
          label: 'Gateways',
          link: { type: 'doc', id: 'milesight/gateways/index' },
          collapsed: true,
          items: [
            'milesight/gateways/milesight-ug63',
            'milesight/gateways/milesight-ug65',
          ],
        },
        {
          type: 'category',
          label: 'Utility',
          link: { type: 'doc', id: 'milesight/utility/index' },
          collapsed: true,
          items: [
            'milesight/utility/milesight-ft101',
          ],
        },
        {
          type: 'category',
          label: 'Video Tutorials',
          collapsed: true,
          items: [
            'milesight/videos-milesight/general-configuration',
          ],
        },
      ],
    },

    // ─── RAKwireless ─────────────────────────────────────────
    {
      type: 'category',
      label: 'RAKwireless',
      collapsed: true,
      link: { type: 'doc', id: 'rakwireless/introduction' },
      items: [
        {
          type: 'category',
          label: 'Gateways',
          link: { type: 'doc', id: 'rakwireless/gateways/index' },
          collapsed: true,
          items: [
            'rakwireless/gateways/rak-RAK7268V2',
            'rakwireless/gateways/rak-RAK7289V2',
          ],
        },
      ],
    },

    // ─── OnLogic ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'OnLogic',
      collapsed: true,
      link: { type: 'doc', id: 'onlogic/introduction' },
      items: [
        'onlogic/cl210g-10',
      ],
    },

    // ─── Raspberry Pi ─────────────────────────────────────────
    {
      type: 'category',
      label: 'Raspberry Pi',
      collapsed: true,
      link: { type: 'doc', id: 'raspberry-pi/introduction' },
      items: [
        'raspberry-pi/cm4',
      ],
    },

    // ─── MikroTik ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'MikroTik',
      collapsed: true,
      link: { type: 'doc', id: 'mikrotik/introduction' },
      items: [
        'mikrotik/routerboard-lora',
      ],
    },

    // ─── Carlo Gavazzi ───────────────────────────────────────
    {
      type: 'category',
      label: 'Carlo Gavazzi',
      collapsed: true,
      link: { type: 'doc', id: 'carlo-gavazzi/introduction' },
      items: [
        'carlo-gavazzi/em111',
        'carlo-gavazzi/em530',
        'carlo-gavazzi/em540',
      ],
    },

    // ─── Nexelec ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Nexelec',
      collapsed: true,
      link: { type: 'doc', id: 'nexelec/introduction' },
      items: [
        'nexelec/origin-plus',
      ],
    },
  ],
};
module.exports = sidebars;
