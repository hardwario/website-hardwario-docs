// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    'hardware-description',
    {
      type: 'category',
      label: 'Detailed Description',
      link: {
        type: 'generated-index'
      },
      collapsed: true,
      items: [
        'detailed-description/connector-description',
        'detailed-description/device-states',
        'detailed-description/dhcp-behavior',
        'detailed-description/http-api',
        'detailed-description/modbus-registers',
        'detailed-description/power-supply',
      ],
    },
    {
      type: 'category',
      label: 'Operation Instructions',
      link: {
        type: 'generated-index'
      },
      collapsed: true,
      items: [
        'operation-instructions/initial-configuration',
        'operation-instructions/configuration-reset',
        'operation-instructions/device-discovery',
        'operation-instructions/firmware-management',
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
