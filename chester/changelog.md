---
slug: changelog
title: CHESTER Changelog
toc_min_heading_level: 2
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Changelog

This page tracks all notable changes across the CHESTER platform, including **firmware**, **hardware**, and **catalog applications**. Use the tabs below to filter by change category.

:::info

This page tracks platform-level changes by **date**. For versioned SDK release notes and per-application changelogs, see the [**Catalog Application Changelog**](catalog-applications/changelog.md).

:::

---

## General Platform Updates

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

### 2026-06-22

- **[SDK v3.5.5]** SDK **v3.5.5** released: [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v3.5.5) · [Detailed Changelog](catalog-applications/changelog.md#v355-2026-06-22)
- **[FW/SDK]** Added RTC sync status API (`ctr_rtc_is_synced`, `ctr_rtc_get_ts_ms`, `ctr_rtc_set_event_cb`)
- **[FW/SDK]** Fixed power consumption regression on CHESTER board (vbatt removed)
- **[FW/SDK]** Added TMP112 shutdown and one-shot power modes
- **[FW/SDK]** Switched to git tag-based versioning

### 2026-04-27

- **[FW/SDK]** LED blink changed to non-blocking, rate-limited approach: prevents blocking during blink sequences
- **[FW/SDK]** LoRaWAN payload for 8-channel variant split into two messages to comply with payload size limits

### 2026-04-14

- **[FW/SDK]** Fixed build for IAQ variant combining CHESTER-Z and CHESTER-X10 features
- **[FW/SDK]** Added CLI argument support and completed application list in shell interface

### 2026-04-02

- **[FW/SDK]** Added dual CHESTER-X0 module variant with CHESTER-Z support
- **[FW/SDK]** Added shell command for 1-Wire (W1) bus device scanning
- **[FW/SDK]** Added runtime CHESTER-Z hardware detection

### 2026-03-31

- **[FW/SDK]** GNSS M8 initialization priority is now configurable via Kconfig (`CONFIG_CTR_GNSS_M8_INIT_PRIORITY`)

### 2026-03-11

- **[Apps]** CHESTER Counter and CHESTER Signal moved to `_legacy`, no longer actively maintained

### 2026-03-10

- **[FW/SDK]** Default LTE mode changed from `lte-m` to `lte-m,nb-iot` (automatic NB-IoT fallback enabled by default)

### 2026-03-06

- **[Apps]** **CHESTER Serial** added as a new catalog application, which supports RS-485 (CHESTER-X2) and RS-232 (CHESTER-X12)

### 2026-02-11

- **[Apps]** **CHESTER Motion** added as a new catalog application, PIR-based motion detection with configurable sensitivity

### 2026-02-04

- **[Apps]** **CHESTER Meteo M** variant added: Modbus RTU sensor integration for meteorological data

### 2026-01-30

- **[Apps]** **CHESTER Scale** now supports LoRaWAN connectivity

### 2026-01-19

- **[FW/SDK]** Soft timeout support added for cloud send/downlink operations

### 2026-01-02

- **[FW/SDK]** Metrics API added for cloud subsystem: exposes internal counters and diagnostics

### 2025-12-08

- **[Apps]** **CHESTER Clime** v3.5.1: new variants SPS30 (particulate matter), Radon, TC (thermocouple); Cloud v2 protocol adopted

### 2025-12-03

- **[Apps]** **CHESTER Serial** v3.5.0: LoRaWAN support with binary encoding; RS-232 variant added; Cloud v2 protocol

### 2025-11-28

- **[Apps]** **CHESTER Meteo**: soil sensor support added

### 2025-10-30

- **[FW/SDK]** Common aggregation data structure (`ctr_data_aggreg`) introduced, unified across all catalog apps

### 2025-10-27

- **[FW/SDK]** Configurable LTE attach policy added: allows fine-grained control over modem attach behavior

### 2025-10-24

- **[Apps]** **CHESTER Control**: LoRaWAN support added

### 2025-10-15

- **[Apps]** **CHESTER wM-Bus**: enroll/teach mode added; scan-all, shell send, manufacturer field, LED and cloud watchdog

### 2025-08-21

- **[Apps]** **CHESTER Clime Radon** variant merged into the main CHESTER Clime application

### 2025-07-14

- **[Apps]** **CHESTER wM-Bus**: initial release

### 2025-02-14

- **[Apps]** **CHESTER Meteo**: LoRaWAN support added

### 2025-01-31

- **[FW/SDK]** Nordic Connect SDK (NCS) updated to **v2.9**, the underlying platform upgrade for all CHESTER firmware

### 2025-01-20

- **[Apps]** **CHESTER Clime**: SPS30 particulate matter sensor subsystem added

### 2025-01-16

- **[Apps]** Multiple catalog apps: downlink watchdog added

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

### CHESTER-M R3.4 *(current)*

- Current production revision of the CHESTER-M mainboard
- Schematic: [R3.4 (PDF)](hardware-description/hio-chester-m-r3.4.pdf)
- Interactive PCB browser: [iBOM R3.4](pathname:///download/ibom/chester-m-r3.4.html)

### CHESTER-M R3.3

- **Removed**: ATSHA204A crypto chip (I²C address `0x64`), no longer populated
- **Changed**: J-Link/SWD connector label renamed from `BLE` to `APP`

### CHESTER-M R3.2

- J-Link/SWD connector labeled `BLE` (renamed in R3.3)
- ATSHA204A crypto chip present at I²C `0x64`

---

### CHESTER-U1 R1.1 *(current)*

- Compact 38×38 mm module: electrically identical to CHESTER-M
- Same firmware binary runs on both CHESTER-M and CHESTER-U1 without changes
- Schematic: [R1.1 (PDF)](hardware-description/hio-chester-u1-r1.1.pdf)

{/* separator */}
</TabItem>
</Tabs>

---

## Catalog Application Changelogs

The table below links directly to the changelog section of each catalog application. The **Last Updated** column reflects when the changelog was last reviewed and updated in this documentation.

| Application | Changelog | Last Updated |
|---|---|---|
| CHESTER Clime | [Changelog](catalog-applications/chester-clime#changelog) | 2026-06-24 |
| CHESTER Control | [Changelog](catalog-applications/chester-control#changelog) | 2026-06-22 |
| CHESTER Current | [Changelog](catalog-applications/chester-current#changelog) | 2026-06-24 |
| CHESTER Meteo | [Changelog](catalog-applications/chester-meteo#changelog) | 2026-06-24 |
| CHESTER Motion | [Changelog](catalog-applications/chester-motion#changelog) | 2026-04-01 |
| CHESTER Push | [Changelog](catalog-applications/chester-push#changelog) | 2026-04-01 |
| CHESTER Range | [Changelog](catalog-applications/chester-range#changelog) | 2026-04-01 |
| CHESTER Scale | [Changelog](catalog-applications/chester-scale#changelog) | 2026-06-22 |
| CHESTER Serial | [Changelog](catalog-applications/chester-serial#changelog) | 2026-04-01 |
| CHESTER wM-Bus | [Changelog](catalog-applications/chester-wm-bus#changelog) | 2026-06-24 |
