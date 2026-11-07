---
title: CHESTER Scale
description: "CHESTER Scale measures weight with up to four load cells: its hardware, the Z variant, the settings you change and the exact data it sends."
---

# CHESTER Scale

![CHESTER Scale enclosure with two cable glands](/img/chester/catalog-applications/chester-scale.webp)

**CHESTER Scale** is designed for wireless weight measurement using load cells. It measures up to four load cell channels and sends the readings to HARDWARIO Cloud over NB-IoT/LTE-M or LoRaWAN.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Scale firmware](../../firmware/chester-scale/index.md)** page.

:::

## What It Can Do

- Measures weight with up to four load cells, two on each **CHESTER-X3C** module.
- Works with one or two CHESTER-X3C modules: the firmware detects the module in slot B at startup.
- Enables or disables each channel separately.
- Sends raw load cell readings, which your application converts to weight.
- Collects temperature and humidity from Bluetooth sensor tags (Teltonika EYE Sensor).
- Keeps running on the **CHESTER-Z1** backup module when external power fails, and reports the power change (variant **CHESTER Scale Z**).

## Use Cases

The device is ideal for:
- **Industrial storage tank monitoring**: Track fill levels of tanks, silos, or containers
- **Pallet and goods tracking**: Monitor weight changes in logistics and warehousing
- **Livestock weight monitoring**: Optimize feeding schedules and track animal health
- **Agricultural applications**: Beehive monitoring, feed storage, etc.

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Scale**](#model-chester-scale) | Base model | [CHESTER Scale](../../firmware/chester-scale/index.md) |
| [**CHESTER Scale Z**](#chester-scale-z) | Backup module CHESTER-Z1 | [CHESTER Scale Z](../../firmware/chester-scale/chester-scale-z.md) |

## CHESTER Scale {#model-chester-scale}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3C:A` or `CHESTER-X3C:B`: Load cell interface (2 channels per module)
* `CHESTER-E5-LP`: Enclosure with two cable glands and SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Scale. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The full list is in [**Configuration Parameters**](../../firmware/chester-scale/index.md#configuration-parameters) on the firmware page.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `weight-measurement-interval` | Weight measurement interval | `<30-86400>` | `60` | Weight measurement interval in seconds |
| `interval-report` | Report interval | `<30-86400>` | `900` | Report interval in seconds; each interval varies randomly by up to ±20 % |
| `channel-a1-active` | Channel a1 active | `true`, `false` | `true` | Measure and report channel A1 |
| `channel-a2-active` | Channel a2 active | `true`, `false` | `true` | Measure and report channel A2 |
| `channel-b1-active` | Channel b1 active | `true`, `false` | `true` | Measure and report channel B1; needs a CHESTER-X3C module in slot B |
| `channel-b2-active` | Channel b2 active | `true`, `false` | `true` | Measure and report channel B2; needs a CHESTER-X3C module in slot B |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval of the Bluetooth tags, the internal thermometer and the accelerometer in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag samples in seconds |

### Data over LTE {#data-over-lte}

CHESTER Scale sends a report every `interval-report` seconds, 900 s by default; each interval varies randomly by up to ±20 %. CHESTER Scale Z also reports a failure or return of external power (parameters `backup-report-disconnected` and `backup-report-connected`).

A report carries every weight measurement since the previous report, one every `weight-measurement-interval` seconds, each with its own timestamp. With the default settings, that is about 15 measurements; the buffer holds the first 128 measurements until the next report. The Bluetooth tags send aggregated values: each entry of a `measurements` list has a `timestamp` (Unix time in seconds) and the `min`, `max`, `avg` and `mdn` (median) of the samples taken in one aggregation interval (`interval-aggreg`), at most 16 entries for each tag. A failed reading is sent as `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Scale sends `message.version` `1`.

In addition to the common data, CHESTER Scale sends:

- [`attribute`](#device-attributes): identification of the device as text
- [`weight`](#weight): raw load cell readings of every weight measurement since the previous report
- [`ble_tags`](#ble-tags): temperature, humidity and battery voltage of the enrolled Bluetooth tags

CHESTER Scale Z also sends [`backup`](#backup) with the state of external power.

#### Device Attributes {#device-attributes}

`attribute`: text values sent in every report.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `attribute.vendor_name` | Vendor name, `HARDWARIO` | | | |
| `attribute.product_name` | Product name, for example `CHESTER-M` | | | |
| `attribute.hw_variant` | Hardware variant, for example `CGLS` | | | |
| `attribute.hw_revision` | Hardware revision, for example `R3.4` | | | |
| `attribute.fw_version` | Firmware version, for example `v4.0.1` | | | |
| `attribute.serial_number` | Serial number of the device | | | |

#### Weight {#weight}

`weight`: sent when at least one channel is active; one entry for each weight measurement since the previous report.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `weight[].timestamp` | Time of the measurement (Unix time) | s | | 1 s |
| `weight[].raw_result_a1`, `raw_result_a2`, `raw_result_b1`, `raw_result_b2` | Raw reading of channel A1, A2, B1 or B2: the output code of the 24-bit converter on CHESTER-X3C (TI ADS122C04), the average of the middle 16 of 32 readings; `null` when the channel is off, its module is missing or the measurement failed | | −8388608 to 8388607 | 1 |

The readings are raw converter counts. With the converter settings of firmware v4.0.1 (gain 1, internal 2.048 V reference), one count is about 0.244 µV of load cell signal; the weight follows from a reading at zero load and a reading with a known weight. A reading that still changes by 100 counts or more after five measurements is sent with bit 30 inverted as an error flag: a positive reading then comes 1073741824 higher (1073741824 to 1082130431) and a negative one 1073741824 lower (−1082130432 to −1073741825). Inverting bit 30 again (XOR with 1073741824) gives the reading back.

#### Bluetooth Tags {#ble-tags}

`ble_tags`: one entry for each enrolled tag, up to 8 (see [**BLE Tags**](../ble-tags.md)).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetooth address of the tag, 12 hexadecimal digits | | | |
| `ble_tags[].rssi` | Signal strength of the tag | dBm | −128 to −1 | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag | V | 2.00–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[]` | Temperature: `min`, `max`, `avg`, `mdn` | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[]` | Relative humidity: `min`, `max`, `avg`, `mdn`; the tag reports whole percent | % | 0–100 | 0.01 % |

### Data over LoRaWAN {#data-over-lorawan}

Every uplink carries the common LoRaWAN fields described in [**Common Functionality**](../common-functionality.md#common-data-lorawan) and the fields in the table below.

In LoRaWAN mode, the device sends a 26-byte binary uplink every `interval-report` seconds with the last weight measurement. The ChirpStack/TTN decoder (`codec/cs-decoder.js` of the application in the CHESTER SDK) outputs the common fields and these:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `scale.channel_a1_active`, `channel_a2_active`, `channel_b1_active`, `channel_b2_active` | Whether the channel is switched on (parameters `channel-a1-active` to `channel-b2-active`) | | `true`, `false` | |
| `scale.raw_a1`, `raw_a2`, `raw_b1`, `raw_b2` | Raw reading of the channel from the last weight measurement, with the same error flag in bit 30; `null` when the channel is off, its module is missing, the measurement failed or no measurement was taken since the previous report | | −8388608 to 8388607 | 1 |

## CHESTER Scale Z {#chester-scale-z}

**CHESTER Scale Z** is CHESTER Scale with the **CHESTER-Z1** backup module for continuous operation:

- Keeps running on the backup battery when external power fails.
- Sends the battery voltage and the external DC voltage in every LTE report.
- Reports immediately when external power fails and when it returns.

This variant runs the **[CHESTER Scale Z firmware](../../firmware/chester-scale/chester-scale-z.md)**.

### Hardware {#chester-scale-z-hardware}

The hardware of this variant consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-Z1`: Backup module
* `CHESTER-X3C:A` or `CHESTER-X3C:B`: Load cell interface (2 channels per module)
* `CHESTER-E5-LP`: Enclosure with two cable glands and SMA pigtail

### Settings {#chester-scale-z-settings}

CHESTER Scale Z uses the settings of [CHESTER Scale](#settings), with the same defaults, and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |

An extra report for a power change goes out `event-report-delay` seconds after the change (default 1), at most `event-report-rate` times per hour (default 30; firmware v4.0.1 sends up to one more).

### Data {#chester-scale-z-data}

CHESTER Scale Z sends the data of [CHESTER Scale](#data-over-lte) and the [`backup`](#backup) structure in every LTE report. A failure or return of external power sends an extra report (parameters `backup-report-disconnected` and `backup-report-connected`).

#### Backup Module {#backup}

`backup`: sent in every LTE report. These voltages are in mV (the battery voltages in `system` are in V).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage of the external DC input: 6–26 V with external power connected, near 0 when it is disconnected | mV | 0–26000 | 1 mV |
| `backup.batt_voltage` | Voltage of the backup battery (Li-Ion, nominal 3.7 V) | mV | 3200–4200 | 1 mV |
| `backup.state` | `connected` while external power is present, otherwise `disconnected` | | `connected`, `disconnected` | |
| `backup.events[].timestamp` | Time of a power change since the previous report (Unix time), up to 32 changes | s | | 1 s |
| `backup.events[].type` | Kind of the power change | | `connected`, `disconnected` | |

#### Over LoRaWAN {#chester-scale-z-data-lorawan}

The uplink carries the fields of [CHESTER Scale](#data-over-lorawan).

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
