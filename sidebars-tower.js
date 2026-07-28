// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        description: 'Start with the HARDWARIO TOWER architecture, design principles, programming, and resources.',
      },
      collapsed: true,
      items: [
        'getting-started/system-basics',
        'getting-started/design-principles',
        'getting-started/desktop-programming',
        'getting-started/server-raspberry-pi',
        'getting-started/useful-resources',
      ],
    },
    {
      type: 'category',
      label: 'Desktop Programming',
      link: {
        type: 'generated-index',
        description: 'Install and use HARDWARIO Playground for radio, MQTT, Node-RED, dashboards, and firmware flashing.',
      },
      collapsed: true,
      items: [
        'desktop-programming/about-playground',
        'desktop-programming/playground-installation',
        'desktop-programming/radio-network-management',
        'desktop-programming/mqtt-messages-management',
        'desktop-programming/node-red-programming',
        'desktop-programming/data-visualization',
        'desktop-programming/hardwario-blockly',
        'desktop-programming/firmware-flashing',
      ],
    },
    {
      type: 'category',
      label: 'Server on Raspberry Pi',
      link: {
        type: 'doc',
        id: 'server-raspberry-pi/index',
      },
      collapsed: true,
      items: [
        'server-raspberry-pi/installation-clean-os',
        'server-raspberry-pi/installation-os',
        'server-raspberry-pi/login-guide'
      ],
    },
    {
      type: 'category',
      label: 'Command Line Tools',
      link: {
        type: 'doc',
        id: 'command-line-tools/index',
      },
      collapsed: true,
      items: [
        'command-line-tools/firmware-tool',
        'command-line-tools/gateway-service',
        'command-line-tools/host-management',
        'command-line-tools/mqtt-to-influx-db'
      ],
    },
    {
      type: 'category',
      label: 'Firmware Development',
      link: {
        type: 'doc',
        id: 'firmware-development/index',
      },
      collapsed: true,
      items: [
        'firmware-development/about-hardwario-code',
        'firmware-development/tower-vscode-extension',
        'firmware-development/hardwario-extension-tutorial',
        'firmware-development/hardwario-tower-console',
        'firmware-development/firmware-quick-start',
        'firmware-development/firmware-debugging',
        'firmware-development/advanced-debugging',
        'firmware-development/development-with-cli-tools',
      ],
    },
    {
      type: 'category',
      label: 'Firmware SDK',
      link: {
        type: 'doc',
        id: 'firmware-sdk/index',
      },
      collapsed: true,
      items: [
        'firmware-sdk/event-driven-programming',
        'firmware-sdk/task-scheduler',
        'firmware-sdk/power-management',
        'firmware-sdk/how-to/one-wire-relay',
        'firmware-sdk/how-to/accelerometer',
        'firmware-sdk/how-to/analog-digital-converter',
        'firmware-sdk/how-to/battery-module',
        'firmware-sdk/how-to/co2-module',
        'firmware-sdk/how-to/digital-analog-converter',
        'firmware-sdk/how-to/eeprom',
        'firmware-sdk/how-to/configuration',
        'firmware-sdk/how-to/graphics-library',
        'firmware-sdk/how-to/gpio-pins',
        'firmware-sdk/how-to/gps-module',
        'firmware-sdk/how-to/i2c-bus',
        'firmware-sdk/how-to/lcd-module',
        'firmware-sdk/how-to/led-control',
        'firmware-sdk/how-to/lora-module',
        'firmware-sdk/how-to/pir-module',
        'firmware-sdk/how-to/power-module',
        'firmware-sdk/how-to/push-button',
        'firmware-sdk/how-to/pwm',
        'firmware-sdk/how-to/relay-module',
        'firmware-sdk/how-to/rtc-clock',
        'firmware-sdk/how-to/smart-led-strip',
        'firmware-sdk/how-to/soil-sensor',
        'firmware-sdk/how-to/spi-bus',
        'firmware-sdk/how-to/temperature-sensor',
        'firmware-sdk/how-to/uart-interface',
      ],
    },
    {
      type: 'category',
      label: 'Radio Communication',
      link: {
        type: 'doc',
        id: 'radio-communication/index',
      },
      collapsed: true,
      items: [
        'radio-communication/sub-ghz-radio',
        'radio-communication/lora-wan-radio',
        'radio-communication/lora-at-commands'
      ],
    },
    {
      type: 'category',
      label: 'MQTT Protocol',
      link: {
        type: 'doc',
        id: 'mqtt-protocol/index',
      },
      collapsed: true,
      items: [
        'mqtt-protocol/topics-reference'
      ],
    },
    {
      type: 'category',
      label: 'Platform Integrations',
      link: {
        type: 'generated-index',
        description: 'Connect HARDWARIO TOWER with visualization, automation, and third-party IoT services.',
      },
      collapsed: true,
      items: [
        'platform-integrations/grafana-visualization',
        'platform-integrations/blynk-app',
        'platform-integrations/ubidots-dashboards',
        'platform-integrations/homekit-and-siri'
      ],
    },
    {
      type: 'link',
      label: 'Step-by-Step Projects',
      href: 'https://www.hackster.io/hardwario/projects',
    },
    {
      type: 'category',
      label: 'Hardware Modules',
      link: {
        type: 'doc',
        id: 'hardware-modules/index',
      },
      collapsed: true,
      items: [
        'hardware-modules/header-pinout',
        'hardware-modules/about-one-wire-slave-module',
        'hardware-modules/about-barometer-tag',
        'hardware-modules/about-base-module',
        'hardware-modules/about-battery-module',
        'hardware-modules/about-breadboard-module',
        'hardware-modules/about-bridge-module',
        'hardware-modules/about-button-module',
        'hardware-modules/about-climate-module',
        'hardware-modules/about-co2-module',
        'hardware-modules/about-compact-split-module',
        'hardware-modules/about-core-module',
        'hardware-modules/about-cover-module',
        'hardware-modules/about-encoder-module',
        'hardware-modules/about-gps-module',
        'hardware-modules/about-humidity-tag',
        'hardware-modules/about-lcd-module',
        'hardware-modules/about-lora-module',
        'hardware-modules/about-lux-meter-tag',
        'hardware-modules/about-maxi-base-module',
        'hardware-modules/about-mini-battery-module',
        'hardware-modules/about-mini-cover-module',
        'hardware-modules/about-pir-module',
        'hardware-modules/about-power-module',
        'hardware-modules/about-radio-dongle',
        'hardware-modules/about-relay-module',
        'hardware-modules/about-sensor-module',
        'hardware-modules/about-soil-sensor',
        'hardware-modules/about-split-module',
        'hardware-modules/about-tag-module',
        'hardware-modules/about-temperature-tag',
      ],
    },
    {
      type: 'category',
      label: 'Hardware Interfaces',
      link: {
        type: 'generated-index',
        description: 'Electrical and software interfaces available on HARDWARIO TOWER modules.',
      },
      collapsed: true,
      items: [
        'hardware-interfaces/i2c-bus',
        'hardware-interfaces/spi-interface',
        'hardware-interfaces/uart-interface',
        'hardware-interfaces/usb-interface',
        'hardware-interfaces/one-wire-bus'
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
