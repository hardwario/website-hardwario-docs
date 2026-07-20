---
slug: /
sidebar_position: 1
title: Introduction
---
import Image from '@theme/IdealImage';

# FIBER Lite

**FIBER Lite** is a compact, all-in-one appliance built on the **Raspberry Pi 5** for quickly
bringing up and testing **LoRaWAN** devices — in particular **HARDWARIO STICKER** and **HARDWARIO
CHESTER** — without needing to stand up a separate LoRaWAN network server, database, and
visualization stack for every bench test.

Unlike the industrial **FIBER** (built on the Compute Module 4, with an integrated LCD, 1-Wire
sensor hub, and buzzer — see [FIBER](/fiber/)), **FIBER Lite** is a pure software appliance: a
Raspberry Pi 5, a LoRaWAN concentrator card, and a DIN-rail enclosure, running the complete
LoRaWAN data pipeline out of the box.

## Data Flow

<div style={{ width: '600px', margin: '0 auto' }}>

<Image img={require('./images/data-flow.png')} />

</div>

ChirpStack, Node-RED, InfluxDB, and Grafana all run **on the Raspberry Pi 5 itself** — no
separate servers or cloud services required.

A landing page on port 80 links to every service and shows live system stats (CPU, memory, disk,
temperature, uptime), so the device is usable without memorizing ports or IP-to-service mappings.

## Quick Links

* [**Installation**](installation) – Bootstrap the Raspberry Pi 5 and install the full software stack.

## Bill of Materials

| Component | Notes |
|---|---|
| Raspberry Pi 5 | Main compute unit |
| RAK WisLink RAK5146 | LoRaWAN concentrator card (SX1302), SPI |
| RAK2287 Pi HAT | SPI adapter for RAK5146 → Raspberry Pi 5 GPIO header |
| DIN-rail enclosure | For cabinet/rack mounting |
| microSD card, 32 GB, high-endurance | OS + logs + time-series database (write-heavy workload) |
| Standoffs | Mechanical mounting |

## Key Features

| Feature | Description |
|---|---|
| **Raspberry Pi 5 platform** | Standard Raspberry Pi OS, full root Linux access. |
| **Built-in real-time clock** | Pi 5 has a native RTC — no external RTC chip/battery needed. |
| **Complete LoRaWAN stack** | ChirpStack v4, Node-RED, InfluxDB 2.x, and Grafana pre-integrated. |
| **Branded landing page** | Single entry point with service links, live system stats, and an SSH quick-copy. |
| **LAN or Wi-Fi** | DHCP on Ethernet, Wi-Fi as fallback. |
| **USB-C powered** | No PoE injector required. |

## Typical Use Cases

- Bench-testing new STICKER or CHESTER firmware builds before field deployment
- Quick LoRaWAN network demonstrations without cloud dependencies
- A portable, self-contained ChirpStack instance for training or workshops
