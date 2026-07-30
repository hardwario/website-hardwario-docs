---
title: Introduction
---
import Image from '@theme/IdealImage';

# FIBER Lite

**FIBER Lite** is a Raspberry Pi 5 based variant of [**FIBER**](/fiber/) for quickly bringing up
and testing **LoRaWAN** devices — in particular **HARDWARIO STICKER** and **HARDWARIO
CHESTER** — bench-side, without needing to stand up a separate LoRaWAN network server, database,
and visualization stack for every test.

Setting it up is two steps: first [**Installation**](/fiber/installation) (or the
[**Quick Start Guide**](/fiber/first-steps)) — the **same core procedure as FIBER**, with tabs at
the few points where it diverges — then the additional, Lite-only pages further down in this
**FIBER Lite** section of the sidebar (Install Docker, InfluxDB, Grafana, and the Dashboard).
You're not done until you've done both. See [**Introduction**](/fiber/) and
[**Hardware Description**](/fiber/category/hardware-description) for everything FIBER already
covers — general setup, HOST/TARGET terminology, the ChirpStack/Node-RED software it already
runs.

## What's Different

| | FIBER (CM4) | FIBER Lite (Pi 5) |
|---|---|---|
| Platform | Raspberry Pi Compute Module 4 | Raspberry Pi 5 |
| Storage | eMMC (on-module, 8/16/32 GB) | microSD card, 32 GB, high-endurance |
| Power | PoE (802.3af) + Li-Ion backup battery | USB-C, no PoE injector, no backup battery |
| RTC | External PCF85063A I2C chip | Native built-in RTC (`rtc0`) — no overlay needed |
| Enclosure | Custom FIBER enclosure, 175×120×35 mm | DIN-rail enclosure |
| 1-Wire hub, LCD, buzzer | Present | Not present |
| BLE, LTE | Present | Not present (LAN or Wi-Fi only) |
| LoRaWAN concentrator | RAK5146, **USB**-connected | RAK5146 on a RAK2287 HAT, **SPI**-connected (not yet verified on real hardware) |
| Software stack | ChirpStack + Node-RED | ChirpStack + Node-RED **plus** InfluxDB, Grafana, and a branded dashboard — a complete pre-integrated pipeline |

## Data Flow

FIBER Lite's additional software stack is real, FIBER-Lite-only content — the full pipeline it
adds on top of FIBER's own ChirpStack/Node-RED install:

<div style={{ width: '600px', margin: '0 auto' }}>

<Image img={require('./images/data-flow.png')} />

</div>

ChirpStack, Node-RED, InfluxDB, and Grafana all run **on the Raspberry Pi 5 itself** — no
separate servers or cloud services required. A landing page on port 80 links to every service
and shows live system stats, so the device is usable without memorizing ports or
IP-to-service mappings.

## Bill of Materials (FIBER Lite specific)

| Component | Notes |
|---|---|
| Raspberry Pi 5 | Main compute unit |
| RAK WisLink RAK5146 | LoRaWAN concentrator card (SX1302), SPI |
| RAK2287 Pi HAT | SPI adapter for RAK5146 → Raspberry Pi 5 GPIO header |
| DIN-rail enclosure | For cabinet/rack mounting |
| microSD card, 32 GB, high-endurance | OS + logs + time-series database (write-heavy workload) |
| Standoffs | Mechanical mounting |
