// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
      'introduction',
      'first-steps',
      {
        type: 'category',
        label: 'Installation',
        link: {
          type: 'doc',
          id: 'installation',
        },
        collapsed: true,
        items: [
          'installation/flash',
          'installation/update-system',
          'installation/configure-hardware',
          'installation/chirpstack',
          'installation/concentratord',
          'installation/mqtt-forwarder',
          'installation/register-device',
          'installation/node-red',
          'installation/influxdb',
          'installation/grafana',
          'installation/dashboard',
          'installation/firewall',
          'installation/ports-and-credentials',
        ],
      },
      {
        type: 'category',
        label: 'FIBER Lite',
        items: [
          'fiber-lite/introduction',
          {
            type: 'category',
            label: 'Troubleshooting',
            link: {
              type: 'generated-index',
            },
            collapsed: true,
            items: [
              'fiber-lite/troubleshooting/ssh-connection-refused',
              'fiber-lite/troubleshooting/ssh-permission-denied',
              'fiber-lite/troubleshooting/rtc-remoteio-error',
              'fiber-lite/troubleshooting/concentratord-spi-not-detected',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'FIBER Hardware Guides',
        link: {
          type: 'generated-index',
          description: 'Guides for the hardware only FIBER (CM4) has: the display and 1-Wire sensors.',
        },
        collapsed: true,
        items: [
          'fiber-hardware-guides/one-wire-node-red-grafana',
          'fiber-hardware-guides/using-the-display',
        ],
      },
      {
        type: 'category',
        label: 'Hardware Description',
        link: {
          type: 'generated-index',
          description: 'FIBER processing platform, sensor interfaces, connectivity, and technical specifications.',
        },
        collapsed: true,
        items: [
          'hardware-description/processing-platform',
          'hardware-description/sensor-interfaces',
          'hardware-description/acoustic-visual-signaling',
          'hardware-description/power-system',
          'hardware-description/connectivity',
          'hardware-description/user-interface',
          'hardware-description/technical-specifications',
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
  
