---
title: CHESTER Range
description: "CHESTER Range measures distance with an ultrasonic sensor: its hardware, wiring, variant, the settings you usually change and the exact data it sends."
---

# CHESTER Range

![CHESTER Range enclosure with one cable gland, angled view](/img/chester/catalog-applications/chester-range.webp)

**CHESTER Range** measures distance using the [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor) ultrasonic sensor. It computes the minimum, maximum, average and median for every interval and sends the results to HARDWARIO Cloud over NB-IoT/LTE.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Range firmware](../../firmware/chester-range/index.md)** page.

:::

## What It Can Do

- Measures distances from 0.20 m to 10.68 m with the MaxBotix MB7066 ultrasonic sensor.
- Measures temperature with **DS18B20** 1-Wire probes.
- Collects readings from Bluetooth sensor tags.
- With the **CHESTER-Z1** backup module (CHESTER Range Z), keeps running when external power fails and reports the power change.

## Terminal Blocks

Connect the sensor to the **left terminal block A**:

| [**CHESTER-X0**](../../extension-modules/chester-x0.md) in left slot A | Maxbotix cable color | Signal |
| ------------------------------------------------------------------- | -------------------- | ------ |
| A2 (CH1)                                                            | red                  | Power  |
| A3 (GND)                                                            | black                | GND    |
| A4 (CH2)                                                            | yellow               | Pulse  |

![CHESTER-X0 terminal block pinout: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../extension-modules/images/tb-chester-x0.png)

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Range**](#model-chester-range) | Base model | [CHESTER Range](../../firmware/chester-range/index.md) |
| [**CHESTER Range Z**](#chester-range-z) | Backup module CHESTER-Z1 | [CHESTER Range Z](../../firmware/chester-range/chester-range-z.md) |

## CHESTER Range {#model-chester-range}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard

* `CHESTER-X0A:A`: Input module (4 channels)

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Range. Set a parameter with `app config <parameter> <value>` and apply the changes with `config save`, which stores the configuration and restarts the device. The full list is in the [**configuration parameters**](../../firmware/chester-range/index.md#configuration-parameters) of the firmware.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval of all sensors in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |

The firmware starts in the `lte` mode, ready to send over NB-IoT/LTE.

Choose the intervals so that the buffers suffice. Between two aggregations, each sensor keeps up to 32 samples and each Bluetooth tag 16; between two reports, each sensor keeps up to 32 aggregated values and each Bluetooth tag 16. Values beyond that are dropped.

### Data over LTE {#data-over-lte}

CHESTER Range sends a report over NB-IoT/LTE every `interval-report` seconds, shifted at random by up to ±20 % of the interval (see [**Report Interval Jitter**](../common-functionality.md#report-interval-jitter)); CHESTER Range Z also reports a change of external power. A report carries everything the device collected since the previous one. CHESTER Range sends its data over NB-IoT/LTE.

The sensors are sampled every `interval-sample` seconds. Each entry of a `measurements` list covers one aggregation interval of `interval-aggreg` seconds: `timestamp` is the end of the interval (Unix time) and `min`, `max`, `avg` and `mdn` are the minimum, maximum, average and median of the samples taken in it. The `thermometer` and `accelerometer` values are the latest sample; the battery values in `system` come from a battery test that runs every 12 hours. When a reading fails, its value is `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Range sends `message.version` `2`.

In addition to the common data, CHESTER Range sends:

- [`ultrasonic_ranger`](#ultrasonic-ranger): distance from the MaxBotix MB7066 sensor
- [`w1_thermometers`](#w1-thermometers): DS18B20 1-Wire thermometers
- [`ble_tags`](#ble-tags): Bluetooth tags

#### Ultrasonic Ranger {#ultrasonic-ranger}

`ultrasonic_ranger` holds the distance from the MaxBotix MB7066 sensor to the nearest target:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ultrasonic_ranger.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `ultrasonic_ranger.measurements[].min`, `max`, `avg`, `mdn` | Distance to the nearest target; a target closer than 0.20 m reads as 0.20 m, and a free path reads as 10.68 m | m | 0.20–10.68 | 0.01 m |

The range follows the MB7066 datasheet: the sensor reports 20–1068 cm in steps of 1 cm.

#### 1-Wire Thermometers {#w1-thermometers}

`w1_thermometers` has one entry for each DS18B20 thermometer found at startup, at most ten. The list is in every report and fills once the device finds a thermometer at startup.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Serial number of the thermometer (48 bits of its 1-Wire ROM code) | | | |
| `w1_thermometers[].measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `w1_thermometers[].measurements[].min`, `max`, `avg`, `mdn` | Temperature | °C | −55 to 125 | 0.01 °C |

#### Bluetooth Tags {#ble-tags}

`ble_tags` has one entry for each paired [**Bluetooth tag**](../ble-tags.md), at most eight. The list is in every report and fills once a tag is paired.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetooth address of the tag, 12 hexadecimal digits | | | |
| `ble_tags[].rssi` | Signal strength of the tag | dBm | −127 to −1 | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag | V | 2.0–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `ble_tags[].temperature.measurements[].min`, `max`, `avg`, `mdn` | Temperature | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `ble_tags[].humidity.measurements[].min`, `max`, `avg`, `mdn` | Relative humidity | % | 0–100 | 0.01 % |

## CHESTER Range Z {#chester-range-z}

**CHESTER Range Z** is CHESTER Range with the **CHESTER-Z1** backup module:

- Keeps running on the backup battery when external power fails.
- Reports the external power voltage and the backup battery voltage, and reports immediately when external power fails and when it returns.

This variant runs the [**CHESTER Range Z firmware**](../../firmware/chester-range/chester-range-z.md).

### Hardware {#chester-range-z-hardware}

The hardware of this variant consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard

* `CHESTER-X0A:A`: Input module (4 channels)

* `CHESTER-Z1`: Backup module

### Settings {#chester-range-z-settings}

CHESTER Range Z uses the settings of [CHESTER Range](#settings) and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Delay between a change of external power and its report in seconds; changes within the delay go into the same report |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Event reports per hour at most (firmware v4.0.1 sends up to one more); the limit counts event reports only |

### Data {#chester-range-z-data}

CHESTER Range Z sends the data of [CHESTER Range](#data-over-lte) and the [`backup`](#backup) structure.

#### Backup Module {#backup}

CHESTER Range Z adds the `backup` structure:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage on the VIN input of CHESTER-Z1: 6–26 V with external power connected, near 0 when it is disconnected | V | 0–26 | 0.01 V |
| `backup.batt_voltage` | Voltage of the backup battery; the cell protection cuts off below 3.2 V and the charger charges it to 4.2 V | V | 3.2–4.2 | 0.01 V |
| `backup.state` | State of the external power | | `disconnected`, `connected` | |
| `backup.events[].timestamp` | Time of a change of the external power (Unix time); the list holds the changes since the previous report, at most 32 | s | | 1 s |
| `backup.events[].type` | Direction of the change | | `disconnected`, `connected` | |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
