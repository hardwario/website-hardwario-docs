---
slug: changelog
title: TOWER Changelog
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "This page tracks all notable changes across the TOWER platform, including firmware / SDK and hardware modules."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TOWER Changelog

This page tracks all notable changes across the TOWER platform, including **firmware / SDK** and **hardware modules**. Use the tabs below to filter by change category.

:::info

TOWER is currently in **maintenance mode**, receiving only bugfixes and minor improvements. Active development continues on [twr-zephyr](https://github.com/hardwario/twr-zephyr), an experimental Zephyr RTOS port for the Core Module.

- SDK source: [hardwario/twr-sdk](https://github.com/hardwario/twr-sdk)
- Hardware schematics: [hardwario/twr-hardware](https://github.com/hardwario/twr-hardware)
- Zephyr port (experimental): [hardwario/twr-zephyr](https://github.com/hardwario/twr-zephyr)
- `tower` command-line tool and Rust firmware: [hardwario/tower](https://github.com/hardwario/tower)
- TOWER Bridge desktop app: [hardwario/tower-bridge](https://github.com/hardwario/tower-bridge)

:::

---

## General Platform Updates

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

### 2026-10-23

- **[App]** `tower-bridge` [v1.1.0](https://github.com/hardwario/tower-bridge/releases/tag/v1.1.0): TOWER Bridge now tells you when a newer version is out. Once a day it asks GitHub for the newest release (nothing else is sent) and shows **Update Available** in the tray menu, a banner on the Dashboard and one notification per version. It does not install anything itself; the check can be switched off in *Settings → About*. To update from 1.0.x, quit the app and put the new file in place of the old one; settings and history are kept

### 2026-10-19

- **[App]** `tower-bridge` [v1.0.1](https://github.com/hardwario/tower-bridge/releases/tag/v1.0.1): Fix release for macOS. Notifications work again on current macOS (in 1.0.0 nothing appeared, not even the permission request), and on macOS 13 and newer **Open at Login** registers TOWER Bridge as a login item under its own name instead of a background item listed as "HARDWARIO a.s.". macOS users of 1.0.0 should update
- **[App]** `tower-bridge` [v1.0.0](https://github.com/hardwario/tower-bridge/releases/tag/v1.0.0): First release of TOWER Bridge, a tray app and command-line tool (`tower-bridge-cli`) for the TOWER Bridge Module on Windows, macOS and Linux, continuing the `enmon` tool. It reads the Climate Module, CO2 Module, GPS Module, Relay Module and the Humidity, Temperature, Lux Meter, Barometer, VOC-LP and NFC Tags; shows a dashboard with history, a data table with CSV and XLSX export, and alerts with notifications; and publishes the readings over MQTT and an optional local REST API, Prometheus metrics and MCP server. The Windows and macOS builds are signed

### 2026-10-18

- **[CLI]** `tower` [cli-v1.1.0](https://github.com/hardwario/tower/releases/tag/cli-v1.1.0): Second release of the command-line tool, the same day as 1.0.0, with matching firmware images. See the [full commit log](https://github.com/hardwario/tower/compare/cli-v1.0.0...cli-v1.1.0)
- **[CLI]** `tower` [cli-v1.0.0](https://github.com/hardwario/tower/releases/tag/cli-v1.0.0): First release of `tower`, the command-line and terminal tool for the new Rust-based TOWER stack. It decodes the console link of the TOWER firmware (logs, events, shell), flashes, erases, resets and identifies boards over the STM32 UART bootloader, and bridges the radio network to MQTT (`tower gateway`). Builds for Linux (x86_64, ARM64, Raspberry Pi), macOS and Windows. `tower` only talks to firmware built from the same sources: flash the images shipped with the release (`radio_push_button.bin`, `radio_dongle_gateway.bin`, `blinky.bin`) or build from the tag

### 2025-09-10

- **[FW/SDK]** `twr-zephyr`: Added README and LICENSE, so the Zephyr RTOS port for Core Module is now documented

### 2025-03-03

- **[FW/SDK]** `twr-zephyr`: Added push button application sample

### 2025-02-11

- **[FW/SDK]** `twr-zephyr`: Active low power timer for Core Module board

### 2025-02-08

- **[FW/SDK]** `twr-zephyr`: Implemented radio subsystem (`twr_radio`) over Spirit1

### 2023-10-31

- **[FW/SDK]** `twr-sdk`: Added option for third flood detector on Sensor Module

### 2023-02-20

- **[FW/SDK]** `twr-sdk`: Replaced newlib nano with picolibc, which fixes `%llx` formatting issues

### 2023-01-23

- **[FW/SDK]** `twr-sdk`: Fixed LIS2DH12 alarm threshold calculation for all measurement scales

### 2022-12-28

- **[FW/SDK]** `twr-sdk`: Added parameter validation in scheduler functions; added `invalid parameter` error type

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

### 2025-04-15

- Added Eagle component library (`hardwario.lbr`) to hardware repository

### 2023-10-13

- **Serial Dongle R1.0**: schematics added

### 2022-04-04

- **Mini Battery Module**: solar panel connector information added to schematics

### 2020-07-14

- **Battery Module**: updated schematics with 3-pin solar connector

### 2020-05-19

- **Maxi Base Module R1.0**: schematic drawing added

### 2019-12-09

- **Ethernet Module** and **RS-485 Module**: schematics added

### 2019-08-05

- **GPS Module 1.2**: schematic added

### 2019-05-13

- **LoRa Module R1.4**: schematic added

### 2018-07-11

- **Core Module 2.1**: schematic drawing added

{/* separator */}
</TabItem>
</Tabs>
