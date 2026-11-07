---
title: CHESTER Current
description: "CHESTER Current measures AC and DC current with clamp-on probes: its hardware, variants, the settings you change and the exact data it sends."
---

# CHESTER Current

![CHESTER Current with two clamp-on current probes](/img/chester/catalog-applications/chester-current.webp)

**CHESTER Current** measures AC and DC current with clamp-on probes placed around the conductor: up to four of them connect to the **CHESTER-K1** module. The device sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Current firmware](../../firmware/chester-current/index.md)** page.

:::

## What It Can Do

- Measures AC and DC current on up to four channels with clamp-on current probes.
- Measures voltage on channels set to the single-ended mode; current and voltage channels together number up to four.
- Runs from a battery: the probes get power only during the measurement.
- Converts the readings to amperes or other units with a two-point calibration of each channel.
- Reads several **DS18B20** 1-Wire temperature probes.
- Collects readings from Bluetooth sensor tags.
- Keeps running on the **CHESTER-Z1** backup module when external power fails, and reports the power change (variant **CHESTER Current Z**).

## Measurement Principle

The application primarily targets non-invasive current measuring using the so-called **DC Current "Transformer"** (DCCT). It can measure up to 4 channels of both AC and DC currents. The current probes are clips around the measured line, which convert the magnetic flux (proportional to the electrical current) to a differential output voltage.

:::tip

The current probes require a 5 V power supply (generated using the boost converter on **CHESTER-K1**) during the measurement cycle. The boost converter and the power rails to each channel are software-controlled, so **CHESTER Current** can operate as a low-power device powered by the battery. The measurement interval has a major effect on battery life.

:::

Apart from the current measurements, the device can be configured (on demand) to measure up to 4 voltage channels (in single-ended mode). It can combine both current and voltage measurements (up to 4 channels in total).

## Current Probes

You can choose up to 4 current probes with the following current ranges:

- Maximum current **10 A**
- Maximum current **100 A**
- Maximum current **300 A**
- Maximum current **1,000 A**
- Maximum current **1,500 A**

:::caution

The current range is specified for the DC. If you design your system for the AC, you have to multiply the maximum expected AC by the coefficient of `1.414` (square root of two) to see if the current probe fits within the limit.

:::

## Wiring

For the wiring diagram of **CHESTER Current**, please follow the [**terminal block description**](../../extension-modules/chester-k1.md) of the **CHESTER-K1** extension module. The extension module **CHESTER-K1** uses both slots **A** and **B**, so you use the corresponding terminals **A1** to **A8** and **B1** to **B8**.

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Current**](#model-chester-current) | Base model | [CHESTER Current](../../firmware/chester-current/index.md) |
| [**CHESTER Current Z**](#chester-current-z) | Backup module CHESTER-Z1 | [CHESTER Current Z](../../firmware/chester-current/chester-current-z.md) |
| [**CHESTER Current 1W**](#chester-current-1w) | DS18B20 1-Wire temperature probes | [CHESTER Current](../../firmware/chester-current/index.md) |

## CHESTER Current {#model-chester-current}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-K1-1C-2C-3C-4C`: 4x Diff. Input + 5 V Boost
* `CHESTER-E3-LP`: Enclosure with four cable glands, Weipu power connector, SMA pigtail and light pipe

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Current. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The full list is in [**Configuration Parameters**](../../firmware/chester-current/index.md#configuration-parameters) on the firmware page.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval of the analog channels and the Bluetooth tags in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the analog channels and the Bluetooth tags in seconds |
| `interval-report` | Report interval | `<30-86400>` | `900` | Report interval in seconds |
| `channel-active-1` to `channel-active-4` | Channel active 1 to Channel active 4 | `true`, `false` | `false` | Measure and report the channel |
| `channel-differential-1` to `channel-differential-4` | Channel differential 1 to Channel differential 4 | `true`, `false` | `false` | Measure the channel in the differential mode (current probe, `C` in the CHESTER-K1 ordering code) instead of the single-ended mode (voltage, `V`) |
| `channel-calib-mode-1` to `channel-calib-mode-4` | Channel calib mode 1 to Channel calib mode 4 | `mean`, `rms` | `rms` | Raw value the calibration converts: `rms` for AC, `mean` for DC |
| `channel-calib-x0-1` to `channel-calib-x0-4` | Channel calib x0 1 to Channel calib x0 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 0: raw value in mV |
| `channel-calib-y0-1` to `channel-calib-y0-4` | Channel calib y0 1 to Channel calib y0 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 0: real value (for example in A) |
| `channel-calib-x1-1` to `channel-calib-x1-4` | Channel calib x1 1 to Channel calib x1 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 1: raw value in mV |
| `channel-calib-y1-1` to `channel-calib-y1-4` | Channel calib y1 1 to Channel calib y1 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 1: real value |

A channel has a calibrated value once `channel-calib-x0-<n>` and `channel-calib-x1-<n>` differ; with the defaults (both `0.0`) the calibrated value is `null`. The `current channel-<n> calib` commands capture the calibration points from a live reading and store them at once while the device keeps running; see [**Channel Calibration**](../../firmware/chester-current/index.md#channel-calibration).

### Data over LTE {#data-over-lte}

CHESTER Current sends a report every `interval-report` seconds, 900 s by default, at a fixed period. CHESTER Current Z also reports a failure or return of external power (parameters `backup-report-disconnected` and `backup-report-connected`).

The analog channels, the DS18B20 thermometers and the Bluetooth tags send aggregated values. Each entry of a `measurements` list has a `timestamp` (Unix time in seconds) and the `min`, `max`, `avg` and `mdn` (median) of the samples taken in one aggregation interval: `interval-aggreg`, for the thermometers `w1-therm-interval-aggreg`. With the default settings, a report carries about three entries; it holds at most 32 for each channel and thermometer and 16 for each Bluetooth tag. A failed reading is sent as `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Current sends `message.version` `1`.

In addition to the common data, CHESTER Current sends:

- [`analog_channels`](#analog-channels): current or voltage of each active channel, raw and calibrated
- [`w1_thermometers`](#w1-thermometers): temperature of each connected DS18B20 thermometer
- [`ble_tags`](#ble-tags): temperature, humidity and battery voltage of the enrolled Bluetooth tags

CHESTER Current Z also sends [`backup`](#backup) with the state of external power.

#### Analog Channels {#analog-channels}

`analog_channels`: one entry for each active channel (`channel-active-<n>`).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `analog_channels[].channel` | Channel number | | 1–4 | 1 |
| `analog_channels[].raw_rms.measurements[]` | RMS voltage of the channel before calibration: `min`, `max`, `avg`, `mdn` | mV | 0–3600 | 0.01 mV |
| `analog_channels[].raw_mean.measurements[]` | Mean voltage of the channel before calibration: `min`, `max`, `avg`, `mdn` | mV | 0–3600 single-ended, −3600 to 3600 differential | 0.01 mV |
| `analog_channels[].calibration.mode` | Raw value the calibration converts (`channel-calib-mode-<n>`; `avg` stands for `mean`) | | `avg`, `rms` | |
| `analog_channels[].calibration.measurements[]` | Value after the two-point calibration of the channel: `min`, `max`, `avg`, `mdn`; `null` while the channel has no calibration | unit of the calibration, for example A | up to the probe maximum: 10, 100, 300, 1000 or 1500 A | 0.01 |

The raw ranges are the full scale of the analog-to-digital converter that reads the CHESTER-K1 channels (12 bits, 3600 mV). The calibrated value has the unit of the calibration points `channel-calib-y0-<n>` and `channel-calib-y1-<n>`; for a current probe it stays within the probe range in [**Current Probes**](#current-probes).

#### 1-Wire Thermometers {#w1-thermometers}

`w1_thermometers`: one entry for each DS18B20 thermometer found on the bus, up to 10.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Serial number of the thermometer, from its 1-Wire ROM code | | | |
| `w1_thermometers[].measurements[]` | Temperature: `min`, `max`, `avg`, `mdn` | °C | −55 to 125 | 0.01 °C |

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

In LoRaWAN mode, the device sends a binary uplink every `interval-report` seconds with the last sample of each value. The ChirpStack/TTN decoder (`codec/cs-decoder.js` of the application in the CHESTER SDK) outputs the common fields and these:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers` | Temperature of each DS18B20 thermometer | °C | −55 to 125 | 0.01 °C |
| `analog_channels[].channel` | Channel number, one entry for each active channel | | 1–4 | 1 |
| `analog_channels[].raw_rms` | RMS voltage of the channel before calibration | mV | 0–3600 | float16 |
| `analog_channels[].raw_mean` | Mean voltage of the channel before calibration | mV | 0–3600 single-ended, −3600 to 3600 differential | float16 |
| `analog_channels[].calibrated` | Value after the calibration of the channel; `null` while the channel has no calibration | unit of the calibration, for example A | up to the probe maximum: 10, 100, 300, 1000 or 1500 A | float16 |

The float16 values are half-precision floating-point numbers with 11 significant bits: the step is 0.05 to 0.1 % of the value, for example 2 mV at 3600 mV. The firmware cuts off the remaining bits, so a value can read up to one step low, and 65504 is the largest value an uplink carries.

An uplink holds at most 51 bytes: 11 bytes of system values and the thermometer count, 2 bytes for each DS18B20 thermometer and 6 bytes for each active channel. Firmware v4.0.1 sends the report as an uplink when it fits in these 51 bytes; with all four channels active, that is up to eight thermometers.

## CHESTER Current Z {#chester-current-z}

**CHESTER Current Z** is CHESTER Current with the **CHESTER-Z1** backup module:

- Keeps running on the backup battery when external power fails.
- Sends the battery voltage and the external DC voltage in every report.
- Reports immediately when external power fails and when it returns.

This variant runs the **[CHESTER Current Z firmware](../../firmware/chester-current/chester-current-z.md)**.

### Hardware {#chester-current-z-hardware}

The hardware of this variant consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-K1-1C-2C-3C-4C`: 4x Diff. Input + 5 V Boost
* `CHESTER-Z1`: Backup module
* `CHESTER-E3-LP`: Enclosure with four cable glands, Weipu power connector, SMA pigtail and light pipe

### Settings {#chester-current-z-settings}

CHESTER Current Z uses the settings of [CHESTER Current](#settings), with the same defaults, and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |

An extra report for a power change goes out `event-report-delay` seconds after the change (default 1), at most `event-report-rate` times per hour (default 30; firmware v4.0.1 sends up to one more).

### Data {#chester-current-z-data}

CHESTER Current Z sends the data of [CHESTER Current](#data-over-lte) and the [`backup`](#backup) structure in every report. A failure or return of external power sends an extra report (parameters `backup-report-disconnected` and `backup-report-connected`).

#### Backup Module {#backup}

`backup`: sent in every report.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage of the external DC input: 6–26 V with external power connected, near 0 when it is disconnected | V | 0–26 | 0.01 V |
| `backup.batt_voltage` | Voltage of the backup battery (Li-Ion, nominal 3.7 V) | V | 3.2–4.2 | 0.01 V |
| `backup.state` | `connected` while external power is present, otherwise `disconnected` | | `connected`, `disconnected` | |
| `backup.events[].timestamp` | Time of a power change since the previous report (Unix time), up to 32 changes | s | | 1 s |
| `backup.events[].type` | Kind of the power change | | `connected`, `disconnected` | |

#### Over LoRaWAN {#chester-current-z-data-lorawan}

The header has the BACKUP flag (bit 4) set, and the uplink adds 5 bytes of backup values between the thermometers and the channels, so with all four channels active at most five DS18B20 thermometers fit. The decoder adds these fields:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage of the external DC input: 6–26 V with external power connected, near 0 when it is disconnected | V | 0–26 | 0.001 V |
| `backup.battery_voltage` | Voltage of the backup battery | V | 3.2–4.2 | 0.001 V |
| `backup.backup_state` | State of external power | | `connected`, `disconnected` | |

## CHESTER Current 1W {#chester-current-1w}

**CHESTER Current 1W** measures temperature with several external **DS18B20** 1-Wire probes in addition to the current. The probes have their own sampling and aggregation intervals (parameters `w1-therm-interval-sample` and `w1-therm-interval-aggreg`).

This variant runs the main **[CHESTER Current firmware](../../firmware/chester-current/index.md)**, which has DS18B20 1-Wire support built in. A separate CHESTER Current 1W build exists only for Cloud Legacy, in [**Application Firmware for Cloud Legacy**](../../firmware/index.md#application-firmware-cloud-v1).

### Hardware {#chester-current-1w-hardware}

The hardware of this variant consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-K1-1C-2C-3C-4C`: 4x Diff. Input + 5 V Boost
* `CHESTER-E3-LP`: Enclosure with four cable glands, Weipu power connector, SMA pigtail and light pipe

### Settings {#chester-current-1w-settings}

CHESTER Current 1W uses the settings of [CHESTER Current](#settings), with the same defaults, and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Sampling interval of the DS18B20 thermometers in seconds |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Aggregation interval of the DS18B20 thermometers in seconds |

The main firmware has these two parameters on every CHESTER Current; they take effect when DS18B20 probes are connected.

### Data {#chester-current-1w-data}

CHESTER Current 1W sends the data of [CHESTER Current](#data-over-lte), and its `w1_thermometers` list has one entry for each connected DS18B20 probe, up to 10 (see [1-Wire Thermometers](#w1-thermometers)).

#### Over LoRaWAN {#chester-current-1w-data-lorawan}

The `w1_thermometers` list carries the temperature of each probe, 2 bytes each; the 51-byte limit of an uplink is under [Data over LoRaWAN](#data-over-lorawan).

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
