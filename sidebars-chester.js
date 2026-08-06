// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'first-steps',
    'features',
   {
          type: 'category',
          label: 'Video Tutorials',
          link: {
            type: 'doc',
            id: 'videos-chester/index',
          },
          collapsed: true,
          items: [
            'videos-chester/chester-connect-phone',
            'videos-chester/chester-update-phone',
            'videos-chester/chester-pair-tag',
            'videos-chester/chester-cloud',
          ],
        },
    {
  type: 'category',
  label: 'Platform Connectivity',
  link: {
    type: 'generated-index',
    description: 'CHESTER connectivity, device-management, cellular, satellite, and networking documentation.',
  },
  collapsed: true,
  items: [
    'platform-connectivity/hardwario-manager',
    'platform-connectivity/hardwario-monitor',
    'platform-connectivity/hardwario-terminal',
    'platform-connectivity/cellular-networks',

    {
      type: 'category',
      label: 'LoRaWAN Radio',
       link: {
        type: 'doc',
        id: 'platform-connectivity/lorawan-radio',
      },
      collapsed: true,
      items: [
        
        'platform-connectivity/lorawan-chirpstack',
        'platform-connectivity/lorawan-tts',
      ],
    },

    'platform-connectivity/bluetooth-low-energy',
    'platform-connectivity/satellite-connectivity',
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
        {
          type: 'category',
          label: 'Common Functionality',
          link: {
            type: 'doc',
            id: 'catalog-applications/common-functionality',
          },
          collapsed: true,
          items: [
            'catalog-applications/ble-tags',
            'catalog-applications/changelog',
          ],
        },
        'catalog-applications/chester-clime',
        'catalog-applications/chester-control',
        'catalog-applications/chester-current',
        'catalog-applications/chester-meteo',
        'catalog-applications/chester-motion',
        'catalog-applications/chester-push',
        'catalog-applications/chester-range',
        'catalog-applications/chester-scale',
        'catalog-applications/chester-serial',
        'catalog-applications/chester-wm-bus',
        
        {
          type: 'category',
          label: 'Legacy',
          collapsed: true,
          items: [
            'catalog-applications/legacy/chester-input',
            'catalog-applications/legacy/chester-counter',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Extension Modules',
      link: {
        type: 'doc',
        id: 'extension-modules/index',
      },
      collapsed: true,
      items: [
        'extension-modules/chester-x0',
        'extension-modules/chester-x1',
        'extension-modules/chester-x2',
        'extension-modules/chester-x3',
        'extension-modules/chester-x4',
        'extension-modules/chester-x5',
        'extension-modules/chester-x6',
        'extension-modules/chester-x7',
        'extension-modules/chester-x8',
        'extension-modules/chester-x9',
        'extension-modules/chester-x10',
        'extension-modules/chester-x12',
        'extension-modules/chester-x13',
        'extension-modules/chester-x14',
        'extension-modules/chester-k1',
        'extension-modules/chester-c1',
        'extension-modules/chester-c5',
        'extension-modules/chester-z1',
      ],
    },
    {
      type: 'category',
      label: 'Supported Sensors',
      link: {
        type: 'doc',
        id: 'supported-devices/index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'M-Bus Devices',
          link: {
            type: 'doc',
            id: 'supported-devices/m-bus',
          },
          collapsed: true,
          items: []
        },
        {
          type: 'category',
          label: 'Modbus Devices',
          link: {
            type: 'doc',
            id: 'supported-devices/modbus',
          },
          collapsed: true,
          items: [
            'supported-devices/modbus/carlo-gavazzi-em1xx-series',
            'supported-devices/modbus/carlo-gavazzi-em5xx-series',
            'supported-devices/modbus/orno-or-we-504',
            'supported-devices/modbus/orno-or-we-516',
            'supported-devices/modbus/piketronic-rpp-r',
            'supported-devices/modbus/schneider-electric-iem3xxx-series',
          ]
        },
        {
          type: 'category',
          label: 'wM-Bus Devices',
          link: {
            type: 'doc',
            id: 'supported-devices/wm-bus',
          },
          collapsed: true,
          items: [
            'supported-devices/wm-bus/bmeters-rfm-tx1.1',
            'supported-devices/wm-bus/bmeters_iwm-tx3',
            'supported-devices/wm-bus/bmeters_iwm-tx5',
            'supported-devices/wm-bus/bmeters-hydrocal-m4',
            'supported-devices/wm-bus/bmeters-hydroclima-2',
            'supported-devices/wm-bus/zenner-c5-isf',
            'supported-devices/wm-bus/zenner-caltos-e',
            'supported-devices/wm-bus/zenner-minomess',
          ]
        },
        {
          type: 'category',
          label: 'Serial Devices',
          link: {
            type: 'doc',
            id: 'supported-devices/serial',
          },
          collapsed: true,
          items: [
            'supported-devices/serial-devices/promag-mf7s',
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Hardware Description',
      link: {
        type: 'generated-index',
        description: 'CHESTER hardware, enclosure, connector, bus, and extension-module documentation.',
      },
      collapsed: true,
      items: [
        'hardware-description/chester-u1-module',
        'hardware-description/chester-m',
        'hardware-description/enclosures',
        'hardware-description/i2c-address-space',
      ],
    },
    'power-management',
    {
      type: 'category',
      label: 'Firmware Flashing',
      link: {
        type: 'doc',
        id: 'firmware-flashing/index',
      },
      collapsed: true,
      items: [
        'firmware-flashing/application-over-j-link',
        'firmware-flashing/application-over-bluetooth',
        'firmware-flashing/lte-modem-over-j-link',
        'firmware-flashing/lorawan-modem-over-j-link',
        'firmware-flashing/chester-z-over-j-link',
      ],
    },
    {
      type: 'category',
      label: 'Developer Tools',
      link: {
        type: 'generated-index',
        description: 'Tools for configuring, flashing, profiling, and developing with CHESTER.',
      },
      collapsed: true,
      items: [
        'developer-tools/command-line-tools',
        'developer-tools/segger-j-link',
        'developer-tools/power-profiler-kit-ii'
      ],
    },
    {
      type: 'category',
      label: 'Firmware SDK',
      link: {
        type: 'generated-index',
        description: 'Set up the CHESTER firmware SDK and build customer applications.',
      },
      collapsed: true,
      items: [
        'firmware-sdk/requirements',
        'firmware-sdk/j-link-installation',
        'firmware-sdk/installation-on-ubuntu',
        'firmware-sdk/installation-on-macos',
        'firmware-sdk/installation-on-windows',
        'firmware-sdk/build-and-deploy',
        'firmware-sdk/debug',
        'firmware-sdk/applications',
        'firmware-sdk/samples',
        'firmware-sdk/application-customization',
        'firmware-sdk/how-to-i2c-bus',
        'firmware-sdk/how-to-kconfig',
        'firmware-sdk/how-to-cbor',
        'firmware-sdk/how-to-lte-v2',
        'firmware-sdk/how-to-project-generator',
        {
          type: 'link',
          label: 'Git Repository',
          href: 'https://github.com/hardwario/chester-sdk'
        },
        {
          type: 'link',
          label: 'API Reference',
          href: 'https://hardwario.github.io/chester-sdk'
        },
        'firmware-sdk/licenses',
      ],
    },
    {
      type: 'category',
      label: 'Platform Security',
      link: {
        type: 'doc',
        id: 'platform-security/index',
      },
      collapsed: true,
      items: [],
    },

    'ordering-codes',
    'product-certification',
    'cloud-v2-migration-guide',
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    },

  ],
};

module.exports = sidebars;
