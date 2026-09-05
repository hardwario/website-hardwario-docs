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

:::

---

## General Platform Updates

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

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
