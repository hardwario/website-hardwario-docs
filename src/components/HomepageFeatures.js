import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './HomepageFeatures.module.css';

// Product names are never translated (see scripts/i18n-glossary.md), so only
// the subtitle and the description of each card go through translate(). The ids
// are explicit and stable: a card's wording can be reworded without silently
// orphaning its Czech translation, which is what happens when the id is
// generated from the English text.

const OurProducts = [
  {
    title: 'CHESTER',
    subtitle: translate({ id: 'home.chester.subtitle', message: 'Configurable IoT Platform' }),
    link: '/chester/',
    src: '/img/chester.webp',
    description: translate({
      id: 'home.chester.description',
      message: 'Extensible IoT platform with NB-IoT, LTE-M, LoRaWAN, BLE, and GNSS radio technologies.',
    }),
  },
  {
    title: 'STICKER',
    subtitle: translate({ id: 'home.sticker.subtitle', message: 'LoRaWAN Sensor Platform' }),
    link: '/sticker/',
    src: '/img/sticker.webp',
    description: translate({
      id: 'home.sticker.description',
      message: 'STM32WL-based compact, low-power LoRaWAN module for long-lifetime sensor applications.',
    }),
  },
  {
    title: 'EMBER',
    subtitle: translate({ id: 'home.ember.subtitle', message: 'LoRaWAN IoT Hotspot' }),
    link: '/ember/',
    src: '/img/ember.webp',
    description: translate({
      id: 'home.ember.description',
      message: 'Industrial waterproof LoRaWAN gateway with integrated LTE for sensors and actuators.',
    }),
  },
  {
    title: 'FIBER',
    subtitle: translate({ id: 'home.fiber.subtitle', message: 'Sensor IoT Monitor' }),
    link: '/fiber/',
    src: '/img/fiber.webp',
    description: translate({
      id: 'home.fiber.description',
      message: 'Industrial temperature monitoring with 1-Wire and 868/915 MHz wireless sensors; Ethernet, WiFi, or optional LTE.',
    }),
  },
  {
    title: 'GAUGER',
    subtitle: translate({ id: 'home.gauger.subtitle', message: 'Wi-Fi/LAN Input Module' }),
    link: '/gauger/',
    src: '/img/gauger.webp',
    description: translate({
      id: 'home.gauger.description',
      message: 'Industrial WiFi/Ethernet device counting pulses from production lines; counters readable via Modbus TCP and HTTP API.',
    }),
  },
  {
    title: 'GLIDER',
    subtitle: translate({ id: 'home.glider.subtitle', message: 'Cellular IoT Sensor Logger' }),
    link: '/glider/',
    src: '/img/glider.webp',
    description: translate({
      id: 'home.glider.description',
      message: 'Compact LTE-M/NB-IoT logger for temperature, pulse, and Modbus RTU monitoring.',
    }),
  },
  {
    title: 'TAPPER',
    subtitle: translate({ id: 'home.tapper.subtitle', message: 'NFC Tag Reader' }),
    link: '/tapper/',
    src: '/img/tapper.webp',
    description: translate({
      id: 'home.tapper.description',
      message: 'NFC tag reader using Raspberry Pi Zero 2 W and PN532 for secure tag verification over MQTT.',
    }),
  },
  {
    title: 'TOWER',
    subtitle: translate({ id: 'home.tower.subtitle', message: 'Pluggable IoT Platform' }),
    link: '/tower/',
    src: '/img/tower.webp',
    description: translate({
      id: 'home.tower.description',
      message: 'Open-source IoT platform for rapid deployment with sub-GHz radio and ultra-low power consumption.',
    }),
  },
];

const SmartDevices = [
  {
    title: 'Milesight',
    subtitle: translate({ id: 'home.milesight.subtitle', message: 'LoRaWAN Sensors & Gateways' }),
    link: '/smart-devices/milesight',
    src: '/img/milesight.png',
    description: translate({
      id: 'home.milesight.description',
      message: 'Wide range of LoRaWAN sensors and gateways for industrial and smart-building deployments.',
    }),
  },
  {
    title: 'RAKwireless',
    subtitle: translate({ id: 'home.rakwireless.subtitle', message: 'LoRaWAN Gateways' }),
    link: '/smart-devices/rakwireless',
    src: '/img/rakwireless.svg',
    description: translate({
      id: 'home.rakwireless.description',
      message: 'Industrial LoRaWAN gateways and modules for building robust, scalable IoT networks.',
    }),
  },
  {
    title: 'OnLogic',
    subtitle: translate({ id: 'home.onlogic.subtitle', message: 'Industrial Computers' }),
    link: '/smart-devices/onlogic',
    src: '/img/onlogic.png',
    description: translate({
      id: 'home.onlogic.description',
      message: 'Fanless industrial computers engineered for edge computing in harsh environments.',
    }),
  },
  {
    title: 'Raspberry Pi',
    subtitle: translate({ id: 'home.raspberrypi.subtitle', message: 'Computing Modules' }),
    link: '/smart-devices/raspberry-pi',
    src: '/img/raspberry-pi.png',
    description: translate({
      id: 'home.raspberrypi.description',
      message: 'Compact computing modules for IoT gateways, edge processing, and custom hardware.',
    }),
  },
  {
    title: 'MikroTik',
    subtitle: translate({ id: 'home.mikrotik.subtitle', message: 'LoRaWAN Networking' }),
    link: '/smart-devices/mikrotik',
    src: '/img/mikrotik.png',
    description: translate({
      id: 'home.mikrotik.description',
      message: 'RouterBOARD-based LoRaWAN gateways and networking equipment for IoT infrastructure.',
    }),
  },
  {
    title: 'Carlo Gavazzi',
    subtitle: translate({ id: 'home.carlogavazzi.subtitle', message: 'Energy Meters' }),
    link: '/smart-devices/carlo-gavazzi',
    src: '/img/carlo-gavazzi.svg',
    description: translate({
      id: 'home.carlogavazzi.description',
      message: 'Certified single-phase and three-phase energy meters with Modbus RTU for industrial metering.',
    }),
  },
  {
    title: 'Nexelec',
    subtitle: translate({ id: 'home.nexelec.subtitle', message: 'IoT Safety Sensors' }),
    link: '/smart-devices/nexelec',
    src: '/img/nexelec.svg',
    description: translate({
      id: 'home.nexelec.description',
      message: 'LoRaWAN-connected fire and CO detection sensors compliant with European safety standards.',
    }),
  },
];

const CloudAndApps = [
  {
    title: 'CLOUD',
    subtitle: translate({ id: 'home.cloud.subtitle', message: 'Middleware IoT Service' }),
    link: '/cloud/',
    src: '/img/cloud.png',
    description: translate({
      id: 'home.cloud.description',
      message: 'Device and data management platform with REST API, webhook connectors, and firmware updates over the air.',
    }),
  },
  {
    title: 'HARDWARIO Manager',
    subtitle: translate({ id: 'home.manager.subtitle', message: 'NFC & Bluetooth Setup App' }),
    link: '/apps/hardwario-manager',
    src: '/img/hardwario-mark.svg',
    description: translate({
      id: 'home.manager.description',
      message: 'Mobile app for Android and iOS: configure STICKER over NFC and CHESTER over Bluetooth, with saved device keys, templates, terminal, and firmware updates.',
    }),
  },
  {
    title: 'ThingsBoard',
    subtitle: translate({ id: 'home.thingsboard.subtitle', message: 'Data Visualization Platform' }),
    link: '/apps/thingsboard/index',
    src: '/img/thingsboard.svg',
    imageWide: true,
    description: translate({
      id: 'home.thingsboard.description',
      message: 'Open-source IoT platform for data collection, processing, visualization, and device management.',
    }),
  },
  {
    title: 'ChirpStack',
    subtitle: translate({ id: 'home.chirpstack.subtitle', message: 'LoRaWAN Network Server' }),
    link: '/apps/chirpstack/index',
    src: '/img/chirpstack.png',
    description: translate({
      id: 'home.chirpstack.description',
      message: 'Open-source LoRaWAN Network Server for connecting and managing LoRaWAN devices.',
    }),
  },
  {
    title: 'The Things Stack',
    subtitle: translate({ id: 'home.tts.subtitle', message: 'LoRaWAN Network Solution' }),
    link: '/apps/the-things-stack/index',
    src: '/img/the-things-stack.svg',
    description: translate({
      id: 'home.tts.description',
      message: 'Enterprise LoRaWAN network server for connecting IoT devices at scale.',
    }),
  },
];

function ProductCard({ title, subtitle, link, src, imageWide, small, description }) {
  return (
    <Link to={link} className={styles.card}>
      <div className={`${styles.cardImageWrapper}${small ? ' ' + styles.cardImageWrapperSmall : ''}`}>
        <img src={src} alt={title} className={[styles.cardImage, imageWide ? styles.cardImageWide : '', small ? styles.cardImageSmall : ''].filter(Boolean).join(' ')} />
      </div>
      <div className={styles.cardName}>{title}</div>
      <div className={styles.cardSubtitle}>{subtitle}</div>
      <p className={styles.cardDescription}>{description}</p>
    </Link>
  );
}

function Section({ label, items, gridClass, smallImages }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>{label}</span>
      </div>
      <div className={`${styles.grid} ${gridClass || ''}`}>
        {items.map((item, idx) => (
          <ProductCard key={idx} {...item} small={smallImages} />
        ))}
      </div>
    </section>
  );
}

export default function HomepageFeatures() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Section
          label={translate({ id: 'home.section.products', message: 'Products' })}
          items={OurProducts}
        />
        <Section
          label={translate({ id: 'home.section.smartDevices', message: 'Smart Devices' })}
          items={SmartDevices}
          smallImages
        />
        <Section
          label={translate({ id: 'home.section.cloudAndApps', message: 'Cloud & Applications' })}
          items={CloudAndApps}
          gridClass={styles.gridWide}
          smallImages
        />
      </div>
    </div>
  );
}
