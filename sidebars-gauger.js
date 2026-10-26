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
        {
          type: 'category',
          label: 'Operation Instructions',
          link: {
            type: 'generated-index',
            description: 'Instructions for configuring, resetting, updating, and operating GAUGER.',
          },
          collapsed: true,
          items: [
            'operation-instructions/initial-configuration',
            'operation-instructions/configuration-reset',
            'operation-instructions/device-discovery',
            'operation-instructions/firmware-management',
          ],
        },
        'detailed-description/connector-description',
        'detailed-description/device-states',
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
          label: 'Detailed Description',
          link: {
            type: 'generated-index',
            description: 'Detailed GAUGER connector, operating-state, communication, and power documentation.',
          },
          collapsed: true,
          items: [
            'detailed-description/dhcp-behavior',
            'detailed-description/http-api',
            'detailed-description/modbus-registers',
            'detailed-description/power-supply',
          ],
        },
        'hardware-description',
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
