---
slug: changelog
title: STICKER Changelog
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "This page tracks all notable changes across the STICKER platform, including firmware and catalog applications."
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

- **[FW/HW] Acoustic Buzzer Module**: Hardware expansion support for STICKER Clime and STICKER Input variants (installed in place of the PIR sensor slot; incompatible with STICKER Motion)
- **[HW/FW] Analog Probe Converter**: Expansion interface module for STICKER Input enabling readout of Pt100, Pt1000, and thermocouple probes

:::

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

### 2026-10-19 – v2.0.0

- **[FW] Breaking release; action required when upgrading from v1.4.x**: update HARDWARIO Manager together with the firmware, switch to the v2.0.0 `ttn.js` decoder (in a mixed fleet pick the decoder by the firmware version in Info), re-provision alarm rules and the history channel selection, re-set `cap-gpio-*` and `radio-link-check-*`, and wipe the old NFC NDEF records once. Stored history starts empty after the upgrade and there is no supported downgrade · [Release notes](https://github.com/hardwario/sticker-firmware/blob/v2.0.0/doc/version%202.0.md) · [GitHub Release](https://github.com/hardwario/sticker-firmware/releases/tag/v2.0.0)
- **[FW] LoRa P2P radio mode**: `radio-mode p2p` links STICKER to a HARDWARIO FIBER modem / ProXimos Hub over the HARDWARIO TOWER radio protocol (AES-CCM, gateway-acknowledged sends, on-air pairing) with no LoRaWAN network; telemetry, alarms, commands, history and network time work as over LoRaWAN. One firmware image does both radios
- **[FW] One-tap NFC on Android and iOS**: all phone commands run through the ST25DV fast-transfer mailbox in a single hold; the tag carries no NDEF record, so NFC now needs a powered device (battery-less configuration and Android tap-to-launch were removed)
- **[FW] Safer claiming**: the claim token is readable only from a powered device while the claim window is open; `claim_done` / `claim_active` close and re-open it
- **[FW] Configuration announce**: after every boot/join, and every `interval-announce` hours (default 24 h), the device sends its Info plus a settings summary; `get_settings` requests it on demand
- **[FW] Radio diagnostics and paged answers**: new `get_radio_state` command (link state, SF/DR, TX power, RSSI/SNR, duty cycle); answers and telemetry that do not fit one frame arrive as numbered pages
- **[FW] LoRaWAN improvements**: AS923 region, fixed data rate with ADR off (`lrw-datarate`), link-loss recovery in about 4–5 h instead of 9–10 h, duty-cycle-aware sending, `DevStatusAns` answered
- **[FW] Sensor channel model**: every sensor value is a (slot, channel) that can be alarmed and recorded; `history-channels` replaces `history-sensors`; a 1-Wire slot expects a sensor type and raises `sensor_mismatch` otherwise
- **[FW] Alarm engine updates**: `alarms_replace` rewrites the whole rule table in one message; threshold `dwell` is now a hysteresis in the channel's units; rate rules count within `dwell` seconds; motion-started/ended and stillness rules; alarm state in every telemetry frame; optional confirmed alarms (`radio-alarm-ack`) and buzzer melodies (`alarm-buzzer-mode`)
- **[FW] GP pins and inputs**: `cap-gpio-mode` and `cap-gpio-input-a/-b` replace the old input/PIR/buzzer capability flags; inputs can be digital, 0–24 V analog or an S0 pulse counter; `cap-sht` turns the onboard temperature/humidity sensor off
- **[FW] Robustness**: below 1.8 V at boot the device blinks red and switches off instead of boot-looping; a CPU fault reboots at once and is reported in the next Info; history timestamps follow the RTC; a missing reading decodes as `null`; `factory_reset` now also clears pulse counters and history
- **[FW] Renamed shell parameters**: `lrw-deveui` / `lrw-appkey` → `radio-deveui` / `radio-appkey` (values kept); `lrw-link-check-*` → `radio-link-check-*` (reset to defaults); `ats lrw` → `ats radio`
- **[FW] Provisioning firmware image**: each release now also ships `hio-sticker-<version>-provisioning.hex`
- **[Apps] STICKER Input**: 0–24 V analog inputs and S0 pulse counting
- **[Apps] STICKER Motion**: motion-started/ended and stillness alarm rules
- **[Apps] STICKER Clime**: all onboard values (incl. barometer temperature) can be alarmed and recorded; the onboard SHT4x can be switched off

### 2026-08-18 – v1.4.0

- **[FW] Remote control over LoRaWAN**: Full configuration, status querying, and control commands over fPort 85 (`set_param`, `get_param`, `get_config`, `get_info`, reset/rejoin) without physical or NFC access
- **[FW] Device Info on Join**: Automatic diagnostic telemetry uplink (serial, FW version, reset cause, claim token, radio mode, battery voltage) transmitted on every network Join and clock sync
- **[FW] Real-time clock (RTC)**: Wall-clock tracking with network time synchronization (`DeviceTimeReq`), readable/settable via NFC, LoRaWAN downlinks, or shell (`clock`)
- **[FW] Sensor history (Store-and-forward)**: Samples buffered in a dedicated 32 KB flash ring partition during network outages, with replay on request over LoRaWAN (`req_history`) or NFC (`req_history_page`)
- **[FW] Alarm engine & fPort 3 alerts**: Dynamic multi-slot rules (threshold, state, rate) with integrated `dwell` noise filtering, low-battery alerts, and no-data watchdog reporting on fPort 3
- **[FW] Encrypted NFC access**: Secured local communication using AES-CCM encryption (`hio.stck:cmd` / `hio.stck:rsp`) and anti-replay nonce protection
- **[FW] Write-once Claim Token**: Immutable 128-bit claim token (`config claim-token`) for instant cloud onboarding prior to network Join
- **[FW] Factory default Radio-Silent mode**: Transceiver disabled out of the box (`radio-mode off`) to protect battery life during shipping; activated via NFC
- **[FW] Unified LED signalling scheme**: Severity-ordered heartbeat patterns (join state, degraded link, active alarms, radio status) and dedicated NFC/input action blinks
- **[FW] Diagnostic CLI suite (`ats`)**: Renamed diagnostic tool family `tester` → `ats`; added `ats lrw reset`, `ats lrw compose`, `ats lrw lc`, and raw protobuf frame injection (`ats cmd lrw|nfc`)
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
| STICKER Clime | [Changelog](/sticker/catalog-applications/sticker-clime/#changelog) | 2026-10-21 |
| STICKER Input | [Changelog](/sticker/catalog-applications/sticker-input/#changelog) | 2026-10-21 |
| STICKER Motion | [Changelog](/sticker/catalog-applications/sticker-motion/#changelog) | 2026-10-21 |