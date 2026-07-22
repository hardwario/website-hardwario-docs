// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'first-steps',
    'features',
    {
      type: 'category',
      label: 'Hardwario Manager',
      collapsed: true,
      items: [
        'nfc-configurator-app/setup',
        'nfc-configurator-app/features',
        'nfc-configurator-app/config',
        'nfc-configurator-app/template-generator',
        {
          type: 'category',
          label: 'Guides',
          collapsed: true,
          items: [
            'nfc-configurator-app/guides/read-info-and-keys',
            'nfc-configurator-app/guides/scan-multiple',
            'nfc-configurator-app/guides/templates',
            'nfc-configurator-app/guides/one-wire-sensors',
            'nfc-configurator-app/guides/sample-data',
            'nfc-configurator-app/guides/sensor-history',
            'nfc-configurator-app/guides/resets',
            'nfc-configurator-app/guides/manage-tags',
            'nfc-configurator-app/guides/change-log',
          ],
        },
      ],
    },
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
            'sticker-input-wiring/external-sensors',
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
