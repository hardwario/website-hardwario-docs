// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'first-steps',
    'cloud-setup',
    {
      type: 'category',
      label: 'Console Access',
      link: {
        type: 'generated-index',
        description: 'Access the GLIDER console over USB or RTT with J-Link.',
      },
      collapsed: true,
      items: [
        'console/usb-at',
        'console/rtt-jlink',
      ],
    },
    {
      type: 'category',
      label: 'External Sensors',
      link: {
        type: 'doc',
        id: 'external-sensors/index',
      },
      collapsed: true,
      items: [
        'external-sensors/temperature',
      ],
    },
    'configuration',
    {
      type: 'category',
      label: 'Commands',
      link: {
        type: 'generated-index',
        description: 'AT-command and shell-command reference for GLIDER.',
      },
      collapsed: true,
      items: [
        'commands/at-commands',
        'commands/shell-commands',
      ],
    },
    'payload',
    'hardware-description',
    {
      type: 'category',
      label: 'Firmware Flashing',
      link: {
        type: 'doc',
        id: 'firmware-flashing/index',
      },
      collapsed: true,
      items: [
        'firmware-flashing/application-over-at',
        'firmware-flashing/application-over-j-link',
      ],
    },
  ],
};

module.exports = sidebars;
