---
title: Introduction
description: "FIBER Lite is the Raspberry Pi 5 based variant of FIBER for quickly bringing up and testing LoRaWAN devices such as HARDWARIO STICKER."
---

# FIBER Lite

**FIBER Lite** is a Raspberry Pi 5 based variant of [**FIBER**](/fiber/) for quickly bringing up
and testing **LoRaWAN** devices (in particular **HARDWARIO STICKER** and **HARDWARIO
CHESTER**) bench-side, without needing to stand up a separate LoRaWAN network server, database,
and visualization stack for every test.

Setup is the **same procedure as FIBER**, see [**Installation**](/fiber/installation) (or the
[**Quick Start Guide**](/fiber/first-steps)), with tabs at the few points where it genuinely
diverges. There's no separate FIBER Lite install flow: ChirpStack, Node-RED, InfluxDB, Grafana,
and the branded Dashboard are all part of the one shared stack, available on both variants. This
page (and the Troubleshooting section below it) covers only what's actually **different** about
the Lite variant, which comes down to hardware. See [**Introduction**](/fiber/) and
[**Hardware Description**](/fiber/category/hardware-description) for everything else FIBER
already covers.

## What's Different

| | FIBER (CM4) | FIBER Lite (Pi 5) |
|---|---|---|
| Platform | Raspberry Pi Compute Module 4 | Raspberry Pi 5 |
| Storage | eMMC (on-module, 8/16/32 GB) | microSD card, 32 GB, high-endurance |
| Power | PoE (802.3af) + Li-Ion backup battery | USB-C, no PoE injector, no backup battery |
| RTC | External PCF85063A I2C chip | Native built-in RTC (`rtc0`), no overlay needed |
| Enclosure | Custom FIBER enclosure, 175×120×35 mm | DIN-rail enclosure |
| 1-Wire hub, LCD, buzzer | Present | Not present |
| BLE, LTE | Present | Not present (LAN or Wi-Fi only) |
| LoRaWAN concentrator | RAK5146, **USB**-connected | RAK5146 on a RAK2287 HAT, **SPI**-connected |

See [Data Flow](/fiber/installation#data-flow) on the Installation landing page for how the
shared software stack fits together. It's identical on both variants.

## Bill of Materials (FIBER Lite specific)

| Component | Notes |
|---|---|
| Raspberry Pi 5 | Main compute unit |
| RAK WisLink RAK5146 | LoRaWAN concentrator card (SX1302), SPI |
| RAK2287 Pi HAT | SPI adapter for RAK5146 → Raspberry Pi 5 GPIO header |
| DIN-rail enclosure | For cabinet/rack mounting |
| microSD card, 32 GB, high-endurance | OS + logs + time-series database (write-heavy workload) |
| Standoffs | Mechanical mounting |
