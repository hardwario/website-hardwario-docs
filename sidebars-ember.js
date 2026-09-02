// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'getting-started',
    'hardware-description',
    {
      type: 'category',
      label: 'LoRaWAN Network Server',
      collapsed: true,
      items: [
        'lorawan-network-server/lorawan-chirpstack',
        'chirpstack/chirpstack-ember',
        'lorawan-network-server/lorawan-tts',
      ],
    },
    {
      type: 'category',
      label: 'MikroTik',
      collapsed: true,
      items: [
        'mikrotik/gateway-update',
        'mikrotik/antenna-gain',
        'mikrotik/winbox-setup',
      ],
    },
    'hotspot-configuration',
    'cloud-service',
    'ordering-codes',
  {
  type: 'category',
  label: 'Video Tutorials',
  link: {
    type: 'generated-index',
    description: 'Video guides for configuring and using EMBER.',
  },
  collapsed: true,
  items: [
    {
      type: 'category',
      label: 'ChirpStack v4',
      collapsed: true,
      items: [
        'videos-ember/chirpstack-ember',
      ],
    },
    {
      type: 'category',
      label: 'MikroTik',
      // Disambiguates the i18n translation key from the top-level MikroTik
      // category above; two identical labels in one sidebar collide.
      key: 'mikrotik-videos',
      collapsed: true,
      items: [
        'videos-ember/mikrotik-update',
        'videos-ember/mikrotik-configuration',
      ],
    },
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
