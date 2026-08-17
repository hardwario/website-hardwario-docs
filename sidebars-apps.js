// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'HARDWARIO Manager',
      link: {
        type: 'doc',
        id: 'hardwario-manager/index',
      },
      collapsed: true,
      items: [
        'hardwario-manager/first-steps',
        'hardwario-manager/install',
        'hardwario-manager/settings',
        'hardwario-manager/atelos',
        {
          type: 'category',
          label: 'STICKER',
          link: {
            type: 'doc',
            id: 'hardwario-manager/sticker/index',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Saved STICKERs',
              link: {
                type: 'doc',
                id: 'hardwario-manager/sticker/saved-stickers',
              },
              collapsed: true,
              items: [
                'hardwario-manager/sticker/tags',
                'hardwario-manager/sticker/change-log',
              ],
            },
            'hardwario-manager/sticker/device-info',
            {
              type: 'category',
              label: 'Configuration',
              link: {
                type: 'doc',
                id: 'hardwario-manager/sticker/configuration',
              },
              collapsed: true,
              items: [
                'hardwario-manager/sticker/alarms',
                'hardwario-manager/sticker/offline-configuration',
                'hardwario-manager/sticker/batch-export',
              ],
            },
            {
              type: 'category',
              label: 'Templates',
              link: {
                type: 'doc',
                id: 'hardwario-manager/sticker/templates',
              },
              collapsed: true,
              items: [
                'hardwario-manager/sticker/template-generator',
              ],
            },
            {
              type: 'category',
              label: 'Tools',
              link: {
                type: 'doc',
                id: 'hardwario-manager/sticker/tools',
              },
              collapsed: true,
              items: [
                'hardwario-manager/sticker/one-wire-sensors',
                'hardwario-manager/sticker/sample-data',
                'hardwario-manager/sticker/sensor-history',
                'hardwario-manager/sticker/reset',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'CHESTER',
          link: {
            type: 'doc',
            id: 'hardwario-manager/chester/index',
          },
          collapsed: true,
          items: [
            'hardwario-manager/chester/connect',
            'hardwario-manager/chester/device-info',
            'hardwario-manager/chester/configuration',
            {
              type: 'category',
              label: 'Terminal',
              link: {
                type: 'doc',
                id: 'hardwario-manager/chester/terminal',
              },
              collapsed: true,
              items: [
                'hardwario-manager/chester/shared-sessions',
              ],
            },
            {
              type: 'category',
              label: 'Tools',
              link: {
                type: 'doc',
                id: 'hardwario-manager/chester/tools',
              },
              collapsed: true,
              items: [
                'hardwario-manager/chester/firmware-update',
              ],
            },
            'hardwario-manager/chester/ble-tags',
            'hardwario-manager/chester/troubleshooting',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Ubidots',
      link: {
        type: 'doc',
        id: 'ubidots/index',
      },
      collapsed: true,
      items: [
        'ubidots/creating-device',
        'ubidots/cloud-connection',
        {
          type: 'category',
          label: 'Creating Dashboard',
          collapsed: true,
          items: [
            'ubidots/creating-dashboard/metric',
            'ubidots/creating-dashboard/line-chart',
            'ubidots/creating-dashboard/html-canvas',
            'ubidots/creating-dashboard/boolean',
            'ubidots/creating-dashboard/synthetic-variable',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'ThingsBoard',
      link: {
        type: 'doc',
        id: 'thingsboard/index',
      },
      collapsed: true,
      items: [
        'thingsboard/users',
        'thingsboard/cloud-connection',
        'thingsboard/creating-dashboard',
        'thingsboard/creating-device',
        'thingsboard/public-link',
        'thingsboard/users-managing',
        {
          type: 'category',
          label: 'Features',
          link: {
            type: 'doc',
            id: 'thingsboard/features',
          },
          collapsed: true,
          items: [
            'thingsboard/assets',
            'thingsboard/notifications-manager',
            'thingsboard/email-notification',
            'thingsboard/email-reports',
            'thingsboard/rule-engine',
            'thingsboard/embedding-dashboards',
          ],
        },
        {
          type: 'category',
          label: 'Integrations',
          link: {
            type: 'doc',
            id: 'thingsboard/integrations',
          },
          collapsed: true,
          items: [
            'thingsboard/chirpstack-integration',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'ChirpStack',
      link: {
        type: 'doc',
        id: 'chirpstack/index',
      },
      collapsed: true,
      items: [
        'chirpstack/chirpstack-installation',
        {
      type: 'category',
      label: 'Configuration',
      collapsed: true,
      items: [
        'chirpstack/chirpstack-configuration/chirpstack-gateways',
        'chirpstack/chirpstack-configuration/chirpstack-end-devices',
        'chirpstack/chirpstack-configuration/chirpstack-decoding',
      ],
    },
        'chirpstack/chirpstack-integrations',
      ],
    },
    {
      type: 'category',
      label: 'The Things Stack',
      link: {
        type: 'doc',
        id: 'the-things-stack/index',
      },
      collapsed: true,
      items: [
         {
      type: 'category',
      label: 'Configuration',
      collapsed: true,
      items: [
        'the-things-stack/tts-configuration/tts-gateways',
        'the-things-stack/tts-configuration/tts-end-devices',
      ],
    },
      ],
    },
    {
      type: 'category',
      label: 'Video Tutorials',
      link: {
        type: 'doc',
        id: 'videos-apps/index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Ubidots',
          collapsed: true,
          items: [
            'videos-apps/ubidots-new-device',
            'videos-apps/ubidots-cloud-connection',
            'videos-apps/ubidots-dashboard',
          ],
        },
        {
          type: 'category',
          label: 'ThingsBoard',
          collapsed: true,
          items: [
            'videos-apps/thingsboard-new-device',
            'videos-apps/thingsboard-cloud-connection',
            'videos-apps/thingsboard-dashboard',
          ],
        },
        {
          type: 'category',
          label: 'ChirpStack v4',
          collapsed: true,
          items: [
            'videos-apps/chirpstack-configuration',
            'videos-apps/chirpstack-ember',
            'videos-apps/chirpstack-devices',
            'videos-apps/chirpstack-decoding',
          ],
        },
        {
          type: 'category',
          label: 'The Things Stack',
          collapsed: true,
          items: [
            'videos-apps/tts-gateways',
            'videos-apps/tts-end-devices',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
