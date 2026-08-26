// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'first-steps',
    //'features',
    // One page in the STICKER docs that explains how the app fits in and links
    // out from its body. The app itself is documented in full under APPS
    // (/apps/hardwario-manager) — deliberately not mirrored into this sidebar.
    'hardwario-manager',
    {
      type: 'category',
      label: 'STICKER Variants',
      link: {
        type: 'doc',
        id: 'catalog-applications/index',
      },
      collapsed: true,
      items: [
        'catalog-applications/sticker-clime',
        {
          type: 'category',
          label: 'STICKER Input',
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
      label: 'Connectivity',
      link: {
        type: 'doc',
        id: 'connectivity/index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'LoRaWAN',
          items: [
            {
              type: 'category',
              label: 'ChirpStack',
              link: {
                type: 'doc',
                id: 'connectivity/lorawan-chirpstack',
              },
              collapsed: true,
              items: [
                'connectivity/chirpstack-otaa',
                'connectivity/chirpstack-abp',
              ],
            },
            {
              type: 'category',
              label: 'The Things Stack',
              link: {
                type: 'doc',
                id: 'connectivity/lorawan-tts',
              },
              collapsed: true,
              items: [
                'connectivity/tts-otaa',
                'connectivity/tts-abp',
              ],
            },
            'connectivity/downlink-commands-generator',
            'connectivity/downlink-commands',
          ],
        },
        'connectivity/lora-p2p',
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
    {
      type: 'category',
      label: 'Hardware Description',
      link: {
        type: 'doc',
        id: 'hardware-description',
      },
      collapsed: true,
      items: [
        'power-management',
      ],
    },
    'ordering-codes',
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    },
  ],
};

module.exports = sidebars;