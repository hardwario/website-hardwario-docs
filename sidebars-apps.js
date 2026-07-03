// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
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
