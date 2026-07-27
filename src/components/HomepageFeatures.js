import React from 'react';
import Link from '@docusaurus/Link';
import styles from './HomepageFeatures.module.css';

const OurProducts = [
  {
    title: 'CHESTER',
    subtitle: 'Configurable IoT Platform',
    link: '/chester/',
    src: '/img/chester.webp',
    description: 'Extensible IoT platform with NB-IoT, LTE-M, LoRaWAN, BLE, and GNSS radio technologies.',
  },
  {
    title: 'STICKER',
    subtitle: 'LoRaWAN Sensor Platform',
    link: '/sticker/',
    src: '/img/sticker.webp',
    description: 'STM32WL-based compact, low-power LoRaWAN module for long-lifetime sensor applications.',
  },
  {
    title: 'EMBER',
    subtitle: 'LoRaWAN IoT Hotspot',
    link: '/ember/',
    src: '/img/ember.webp',
    description: 'Industrial waterproof LoRaWAN gateway with integrated LTE for sensors and actuators.',
  },
  {
    title: 'FIBER',
    subtitle: 'Sensor IoT Monitor',
    link: '/fiber/',
    src: '/img/fiber.webp',
    description: 'Industrial temperature monitoring with 1-Wire and 868/915 MHz wireless sensors; Ethernet, WiFi, or optional LTE.',
  },
  {
    title: 'FIBER Lite',
    subtitle: 'LoRaWAN Test Appliance',
    link: '/fiber-lite/',
    src: '/img/raspberry-pi.png', // TODO: replace with a real FIBER Lite product photo once available
    description: 'Raspberry Pi 5 based all-in-one appliance for quickly bringing up and testing LoRaWAN devices.',
  },
  {
    title: 'GAUGER',
    subtitle: 'Wi-Fi/LAN Input Module',
    link: '/gauger/',
    src: '/img/gauger.webp',
    description: 'Industrial WiFi/Ethernet device counting pulses from production lines; counters readable via Modbus TCP and HTTP API.',
  },
  {
    title: 'GLIDER',
    subtitle: 'Cellular IoT Sensor Logger',
    link: '/glider/',
    src: '/img/glider.webp',
    description: 'Compact LTE-M/NB-IoT logger for temperature, pulse, and Modbus RTU monitoring.',
  },
  {
    title: 'TAPPER',
    subtitle: 'NFC Tag Reader',
    link: '/tapper/',
    src: '/img/tapper.webp',
    description: 'NFC tag reader using Raspberry Pi Zero 2 W and PN532 for secure tag verification over MQTT.',
  },
  {
    title: 'TOWER',
    subtitle: 'Pluggable IoT Platform',
    link: '/tower/',
    src: '/img/tower.webp',
    description: 'Open-source IoT platform for rapid deployment with sub-GHz radio and ultra-low power consumption.',
  },
];

const SmartDevices = [
  {
    title: 'Milesight',
    subtitle: 'LoRaWAN Sensors & Gateways',
    link: '/smart-devices/milesight',
    src: '/img/milesight.png',
    description: 'Wide range of LoRaWAN sensors and gateways for industrial and smart-building deployments.',
  },
  {
    title: 'RAKwireless',
    subtitle: 'LoRaWAN Gateways',
    link: '/smart-devices/rakwireless',
    src: '/img/rakwireless.svg',
    description: 'Industrial LoRaWAN gateways and modules for building robust, scalable IoT networks.',
  },
  {
    title: 'OnLogic',
    subtitle: 'Industrial Computers',
    link: '/smart-devices/onlogic',
    src: '/img/onlogic.png',
    description: 'Fanless industrial computers engineered for edge computing in harsh environments.',
  },
  {
    title: 'Raspberry Pi',
    subtitle: 'Computing Modules',
    link: '/smart-devices/raspberry-pi',
    src: '/img/raspberry-pi.png',
    description: 'Compact computing modules for IoT gateways, edge processing, and custom hardware.',
  },
  {
    title: 'MikroTik',
    subtitle: 'LoRaWAN Networking',
    link: '/smart-devices/mikrotik',
    src: '/img/mikrotik.png',
    description: 'RouterBOARD-based LoRaWAN gateways and networking equipment for IoT infrastructure.',
  },
  {
    title: 'Carlo Gavazzi',
    subtitle: 'Energy Meters',
    link: '/smart-devices/carlo-gavazzi',
    src: '/img/carlo-gavazzi.svg',
    description: 'Certified single-phase and three-phase energy meters with Modbus RTU for industrial metering.',
  },
  {
    title: 'Nexelec',
    subtitle: 'IoT Safety Sensors',
    link: '/smart-devices/nexelec',
    src: '/img/nexelec.svg',
    description: 'LoRaWAN-connected fire and CO detection sensors compliant with European safety standards.',
  },
];

const CloudAndApps = [
  {
    title: 'CLOUD',
    subtitle: 'Middleware IoT Service',
    link: '/cloud/',
    src: '/img/cloud.png',
    description: 'Device and data management platform with REST API, webhook connectors, and firmware updates over the air.',
  },
  {
    title: 'ThingsBoard',
    subtitle: 'Data Visualization Platform',
    link: '/apps/thingsboard/index',
    src: '/img/thingsboard.svg',
    imageWide: true,
    description: 'Open-source IoT platform for data collection, processing, visualization, and device management.',
  },
  {
    title: 'ChirpStack',
    subtitle: 'LoRaWAN Network Server',
    link: '/apps/chirpstack/index',
    src: '/img/chirpstack.png',
    description: 'Open-source LoRaWAN Network Server for connecting and managing LoRaWAN devices.',
  },
  {
    title: 'The Things Stack',
    subtitle: 'LoRaWAN Network Solution',
    link: '/apps/the-things-stack/index',
    src: '/img/the-things-stack.svg',
    description: 'Enterprise LoRaWAN network server for connecting IoT devices at scale.',
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
        <Section label="Products" items={OurProducts} />
        <Section label="Smart Devices" items={SmartDevices} smallImages />
        <Section label="Cloud &amp; Applications" items={CloudAndApps} gridClass={styles.gridWide} smallImages />
      </div>
    </div>
  );
}
