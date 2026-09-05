---
slug: changelog
title: STICKER Changelog
toc_min_heading_level: 2
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# STICKER Changelog

This page tracks all notable changes across the STICKER platform, including **firmware** and **catalog applications**. Use the tabs below to filter by change category.

:::info

Firmware source: [hardwario/sticker-firmware](https://github.com/hardwario/sticker-firmware) on GitHub.

:::

---

## General Platform Updates

:::info Upcoming Platform Updates

The following features and hardware extensions are currently in active development for upcoming releases:

- **[FW] LoRa P2P Communication Mode**: Direct peer-to-peer radio communication support for standalone node-to-node or gateway links without requiring a LoRaWAN Network Server
- **[FW/HW] Acoustic Buzzer Module**: Hardware expansion support for STICKER Clime and STICKER Input variants (installed in place of the PIR sensor slot; incompatible with STICKER Motion)
- **[Apps] STICKER Input 0–24 V Analog Support**: Measurement and telemetry support for 0–24 V DC industrial analog voltage signals
- **[HW/FW] Analog Probe Converter**: Expansion interface module for STICKER Input enabling readout of Pt100, Pt1000, and thermocouple probes

:::

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

### 2026-08-26 – v1.4.0

- **[FW] Remote control over LoRaWAN**: Full configuration, status querying, and control commands over fPort 85 (`set_param`, `get_param`, `get_config`, `get_info`, reset/rejoin) without physical or NFC access
- **[FW] Device Info on Join**: Automatic diagnostic telemetry uplink (serial, FW version, reset cause, claim token, radio mode, battery voltage) transmitted on every network Join and clock sync
- **[FW] Real-time clock (RTC)**: Wall-clock tracking with network time synchronization (`DeviceTimeReq`), readable/settable via NFC, LoRaWAN downlinks, or shell (`clock`)
- **[FW] Sensor history (Store-and-forward)**: Samples buffered in a dedicated 32 KB flash ring partition during network outages, with replay on request over LoRaWAN (`req_history`) or NFC (`req_history_page`)
- **[FW] Alarm engine & fPort 3 alerts**: Dynamic multi-slot rules (threshold, state, rate) with integrated `dwell` noise filtering, low-battery alerts, and no-data watchdog reporting on fPort 3
- **[FW] Encrypted NFC access**: Secured local communication using AES-CCM encryption (`hio.stck:cmd` / `hio.stck:rsp`) and anti-replay nonce protection
- **[FW] Write-once Claim Token**: Immutable 128-bit claim token (`config claim-token`) for instant cloud onboarding prior to network Join
- **[FW] Factory default Radio-Silent mode**: Transceiver disabled out of the box (`radio-mode off`) to protect battery life during shipping; activated via NFC
- **[FW] Unified LED signalling scheme**: Severity-ordered heartbeat patterns (join state, degraded link, active alarms, radio status) and dedicated NFC/input action blinks
- **[FW] Diagnostic CLI suite (`ats`)**: Renamed diagnostic tool family `tester` $\rightarrow$ `ats`; added `ats lrw reset`, `ats lrw compose`, `ats lrw lc`, and raw protobuf frame injection (`ats cmd lrw|nfc`)
- **[FW] Immutable firmware security model**: Deliberately removed DFU update capabilities (`enter_dfu`) to ensure zero remote attack surface (firmware flashable strictly via SWD pads)

### 2026-05-25 – v1.3.4

- **[FW]** Unified alarm/event delivery: immediate LoRaWAN send and centralized LED handling
- **[FW]** Fixed US915/AU915 sub-band selection and NFC `sub_band` field ingestion
- **[FW]** Fixed LoRaWAN 1.0.x OTAA, AppKey is now correctly fed into the NwkKey slot
- **[FW]** App sensor sample timer now starts even on partial sensor init failure

### 2026-05-15 – v1.3.2 / v1.3.3

- **[FW]** LoRaWAN sync word switches to private only when explicitly configured
- **[FW]** Calibration mode forces public LoRaWAN network
- **[FW]** Added ChirpStack v3 decoder compatibility wrapper (`ttn.js`)

### 2026-05-14 – v1.3.1

- **[FW]** Fixed calibration mode: activates when `config calibration true` is set via shell or NFC, not only on dual-magnet detection at boot
- **[FW]** Calibration flag cleared at start of calibration init, so the run is one-shot (2h deadline or earlier reset returns device to normal OTAA)

### 2026-05-04 – v1.3.0

- **[FW]** Calibration mode with dual-magnet Hall sensor detection (see 2026-04-21)
- **[FW]** Comprehensive bug fix release: LoRaWAN state machine, DS28E17, sensor init, NFC config ingestion (see 2026-02-17 and 2026-04-01 for full details)

### 2026-04-21

- **[FW]** Added calibration mode with Hall sensor activation

### 2026-04-01

- **[FW]** Fixed DS28E17 machine probe initialization reliability: retries `write_config` and reads back echoed register for verification
- **[FW]** Fixed atomic state read in machine probe scan

### 2026-02-17

- **[FW]** Reduced PYQ1648 (PIR) IRQ latency from 2.5 ms to 100 µs for faster motion response
- **[FW]** Added analog pinctrl for I2C1 sleep state: reduces idle current leakage
- **[FW]** Added NVS config version check: resets defaults on schema mismatch after firmware update
- **[FW]** Fixed GPIO pin conflict: skips input init when PIR is enabled
- **[FW]** Added delay after SI7210 ONEBURST trigger to avoid stale hall-effect readings
- **[FW]** Added `reset_counts` shell commands for hall and input counters
- **[FW]** Fixed LoRaWAN state machine counters (changed from `uint8_t` to `int` to prevent overflow)
- **[FW]** Atomically snapshot and clear notify flags in compose, which prevents race conditions
- **[FW]** Split LED message queue to reduce blink caller stack usage
- **[FW]** Added intermediate watchdog feeds during boot init sequence
- **[FW]** Added CRC16 verification on DS28E17 read data

### 2026-01-30 – v1.2.0

- **[FW]** Fixed LED debug mode sequence: green blink now correctly precedes yellow

### 2025-12-15 – v1.1.0

- **[FW]** Implemented LoRaWAN JOIN retry mechanism: device retries joining the network after failed attempts

### 2025-11-23 – v1.0.0

- **[FW]** Initial public release of STICKER firmware
- **[FW]** LoRaWAN connectivity (Class A)
- **[FW]** MIFARE/NFC tag support via DS28E17
- **[Apps]** **STICKER Clime**: initial release (temperature, humidity)
- **[Apps]** **STICKER Input**: initial release (digital inputs, pulse counting)
- **[Apps]** **STICKER Motion**: initial release (PIR motion detection)

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

:::info

No hardware revisions have been logged yet. Hardware updates will appear here when new STICKER board revisions are released.

:::

{/* separator */}
</TabItem>
</Tabs>

---

## Catalog Application Changelogs

| Application | Changelog | Last Updated |
|---|---|---|
| STICKER Clime | [Changelog](catalog-applications/sticker-clime#changelog) | 2026-08-26 |
| STICKER Input | [Changelog](catalog-applications/sticker-input#changelog) | 2026-08-26 |
| STICKER Motion | [Changelog](catalog-applications/sticker-motion#changelog) | 2026-08-26 |