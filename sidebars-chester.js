// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'User Guide',
      className: 'sidebar-section',
      collapsible: false,
      items: [
        'first-steps',
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
              label: 'CHESTER Clime',
              key: 'catalog-chester-clime',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-clime/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-clime/chester-clime-z',
                'catalog-applications/chester-clime/chester-clime-iaq',
                'catalog-applications/chester-clime/chester-clime-1w',
                'catalog-applications/chester-clime/chester-clime-1wh',
                'catalog-applications/chester-clime/chester-clime-rtd',
                'catalog-applications/chester-clime/chester-clime-tc',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Control',
              key: 'catalog-chester-control',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-control/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-control/chester-control-z',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Current',
              key: 'catalog-chester-current',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-current/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-current/chester-current-z',
                'catalog-applications/chester-current/chester-current-1w',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Meteo',
              key: 'catalog-chester-meteo',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-meteo/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-meteo/chester-meteo-z',
              ],
            },
            'catalog-applications/chester-motion/index',
            'catalog-applications/chester-push/index',
            {
              type: 'category',
              label: 'CHESTER Range',
              key: 'catalog-chester-range',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-range/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-range/chester-range-z',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Scale',
              key: 'catalog-chester-scale',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-scale/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-scale/chester-scale-z',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Serial',
              key: 'catalog-chester-serial',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-serial/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-serial/chester-serial-rs485',
                'catalog-applications/chester-serial/chester-serial-rs232',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER wM-Bus',
              key: 'catalog-chester-wm-bus',
              link: {
                type: 'doc',
                id: 'catalog-applications/chester-wm-bus/index',
              },
              collapsed: true,
              items: [
                'catalog-applications/chester-wm-bus/chester-wm-bus-dc',
              ],
            },
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
            {
              type: 'category',
              label: 'Mobile Networks',
              link: {
                type: 'doc',
                id: 'platform-connectivity/cellular-networks/index',
              },
              collapsed: true,
              items: [
                'platform-connectivity/cellular-networks/sim-card-setup',
                'platform-connectivity/cellular-networks/configuration-parameters',
                'platform-connectivity/cellular-networks/network-requirements',
                'platform-connectivity/cellular-networks/vodafone-coverage',
                'platform-connectivity/cellular-networks/diagnostics',
              ],
            },
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
              type: 'doc',
              id: 'supported-devices/m-bus',
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
              ],
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
              ],
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
              ],
            },
          ],
        },
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
        'cloud-v2-migration-guide',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'sidebar-section',
      collapsible: false,
      items: [
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
        'platform-connectivity/satellite-connectivity',
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
            'developer-tools/power-profiler-kit-ii',
          ],
        },
        {
          type: 'category',
          label: 'Firmware',
          link: {
            type: 'doc',
            id: 'firmware/index',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Common Functionality',
              link: {
                type: 'doc',
                id: 'firmware/common-functionality',
              },
              collapsed: true,
              items: [
                'firmware/ble-tags',
                'firmware/changelog',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Clime',
              key: 'firmware-chester-clime',
              link: {
                type: 'doc',
                id: 'firmware/chester-clime/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-clime/chester-clime-iaq',
                'firmware/chester-clime/chester-clime-rtd',
                'firmware/chester-clime/chester-clime-tc',
                'firmware/chester-clime/chester-clime-sps30',
                'firmware/chester-clime/chester-clime-radon',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Control',
              key: 'firmware-chester-control',
              link: {
                type: 'doc',
                id: 'firmware/chester-control/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-control/chester-control-z',
                'firmware/chester-control/chester-control-8ch-z',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Current',
              key: 'firmware-chester-current',
              link: {
                type: 'doc',
                id: 'firmware/chester-current/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-current/chester-current-z',
              ],
            },
            'firmware/chester-demo/index',
            {
              type: 'category',
              label: 'CHESTER Meteo',
              key: 'firmware-chester-meteo',
              link: {
                type: 'doc',
                id: 'firmware/chester-meteo/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-meteo/chester-meteo-z',
                'firmware/chester-meteo/chester-meteo-p',
                'firmware/chester-meteo/chester-meteo-m',
              ],
            },
            'firmware/chester-motion/index',
            {
              type: 'category',
              label: 'CHESTER Push',
              key: 'firmware-chester-push',
              link: {
                type: 'doc',
                id: 'firmware/chester-push/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-push/chester-push-fm',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Range',
              key: 'firmware-chester-range',
              link: {
                type: 'doc',
                id: 'firmware/chester-range/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-range/chester-range-z',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Scale',
              key: 'firmware-chester-scale',
              link: {
                type: 'doc',
                id: 'firmware/chester-scale/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-scale/chester-scale-z',
              ],
            },
            {
              type: 'category',
              label: 'CHESTER Serial',
              key: 'firmware-chester-serial',
              link: {
                type: 'doc',
                id: 'firmware/chester-serial/index',
              },
              collapsed: true,
              items: [
                'firmware/chester-serial/chester-serial-rs485',
                'firmware/chester-serial/chester-serial-rs232',
              ],
            },
            'firmware/chester-wm-bus/index',
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
              href: 'https://github.com/hardwario/chester-sdk',
            },
            {
              type: 'link',
              label: 'API Reference',
              href: 'https://hardwario.github.io/chester-sdk',
            },
            'firmware-sdk/licenses',
          ],
        },
        {
          type: 'doc',
          id: 'platform-security/index',
        },
        'product-certification',
        'ordering-codes',
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
