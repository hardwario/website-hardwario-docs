// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'first-steps',
    'features',
    // One page in the STICKER docs that explains how the app fits in and links
    // out from its body. The app itself is documented in full under APPS
    // (/apps/hardwario-manager) — deliberately not mirrored into this sidebar.
    'hardwario-manager',
    {
      type: 'category',
      label: 'Catalog Applications',
      link: {
        type: 'doc',
        id: 'catalog-applications/index',
      },
      collapsed: true,
      items: [
        'catalog-applications/sticker-clime',
        {
          type: 'category',
          label: 'Sticker Input',
          link: {
            type: 'doc',
            id: 'catalog-applications/sticker-input',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Wiring',
              link: {
                type: 'doc',
                id: 'sticker-input-wiring/index',
              },
              collapsed: true,
              items: []
            },
            {
              type: 'category',
              label: 'External Sensor Support',
              link: {
                type: 'doc',
                id: 'sticker-input-wiring/external-sensors',
              },
              collapsed: true,
              items: [
                'sticker-input-wiring/machine-probe',
                'sticker-input-wiring/one-wire-dallas',
                'sticker-input-wiring/s0-interface',
              ],
            },
          ]
        },
        'catalog-applications/sticker-motion',
      ],
    },
     {
      type: 'category',
      label: 'LoRaWAN Network Server',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'ChirpStack',
          link: {
            type: 'doc',
            id: 'lorawan-network-server/lorawan-chirpstack',
          },
          collapsed: true,
          items: [
            'lorawan-network-server/chirpstack-otaa',
            'lorawan-network-server/chirpstack-abp',
          ],
        },
        {
          type: 'category',
          label: 'The Things Stack',
          link: {
            type: 'doc',
            id: 'lorawan-network-server/lorawan-tts',
          },
          collapsed: true,
          items: [
            'lorawan-network-server/tts-otaa',
            'lorawan-network-server/tts-abp',
          ],
        },
        'lorawan-network-server/downlink-commands-generator',
        'lorawan-network-server/downlink-commands',
      ],
    },
    {
      type: 'category',
      label: 'Developer Access',
      link: {
        type: 'doc',
        id: 'developer-mode',
      },
      collapsed: true,
      items: [
        'developer-access/firmware-setup',
        'developer-access/configuration',
        'developer-access/alarm-rules',
        'developer-access/sensor-history',
        'developer-access/clock',
        'developer-access/maintenance',
        'developer-access/diagnostics',
      ],
    },
    'hardware-description',
    'power-management',
    'ordering-codes',
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    },
  ],
};

module.exports = sidebars;
