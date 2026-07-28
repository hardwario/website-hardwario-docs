// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
      'introduction',
      'installation',
      {
        type: 'category',
        label: 'Troubleshooting',
        link: {
          type: 'generated-index',
          description: 'Common FIBER Lite installation and runtime problems, with step-by-step fixes.',
        },
        collapsed: true,
        items: [
          'troubleshooting/ssh-connection-refused',
          'troubleshooting/ssh-permission-denied',
          'troubleshooting/docker-compose-plugin-not-found',
          'troubleshooting/nodered-installer-404',
          'troubleshooting/rtc-remoteio-error',
        ],
      },
    ],
  };

  module.exports = sidebars;
