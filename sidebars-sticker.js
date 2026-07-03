// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'first-steps',
    'configuration',
    {
      type: 'category',
      label: 'NFC Configurator APP',
      collapsed: true,
      items: [
        'nfc-configurator-app/setup',
        'nfc-configurator-app/config',
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
      ],
    },
    'developer-mode',
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
