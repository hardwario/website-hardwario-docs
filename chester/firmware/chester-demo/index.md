---
title: CHESTER Demo
description: "CHESTER Demo firmware: a minimal NB-IoT/LTE application that reports temperature, acceleration and battery values and switches the LEDs by downlink."
---

# CHESTER Demo

The **CHESTER Demo** firmware is a minimal application for HARDWARIO Cloud. It reads the thermometer, the accelerometer and the battery of CHESTER, sends the values over NB-IoT/LTE and sets the LEDs from a downlink message. It has no catalog application page; its source code is in the CHESTER SDK, in [`applications/demo`](https://github.com/hardwario/chester-sdk/tree/v4.0.1/applications/demo).

The LED, the button and the shell commands work as described in [**Common Functionality**](../../catalog-applications/common-functionality.md).

## Supported Hardware

The firmware needs only the **CHESTER-M** mainboard with the NB-IoT/LTE modem (see [**CHESTER-M**](../../ordering-codes.md#chester-m)). It uses the thermometer and the accelerometer on the mainboard and, on request, the GNSS module (mainboard option `G`).

## Measurement and Behavior

- The thermometer and the accelerometer are **sampled** every sample interval (parameter `interval-sample`). The report carries the latest sample; the firmware does not aggregate.
- The battery voltage at rest and under load and the load current are measured 60 seconds after start and then every 12 hours.
- A report is sent every report interval (parameter `interval-report`), shifted by the random [**report interval jitter**](../../catalog-applications/common-functionality.md#report-interval-jitter).
- The device asks HARDWARIO Cloud for downlink messages every 60 seconds by default (parameter `interval-poll`).
- The command `gnss start` starts the GNSS receiver. The firmware writes each position update to the log; it does not send the position.

### Downlink

A [**data downlink**](/cloud/downlink/data) from HARDWARIO Cloud switches the LEDs. Each key is optional; `1` switches the LED on and `0` off:

| Key | LED |
| :--- | :--- |
| `led_r` | Red LED |
| `led_g` | Green LED |
| `led_y` | Yellow LED |
| `led_load` | Load LED |

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds; firmware v4.0.1 stores the value but does not use it |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `60` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |

The network mode (`app config mode`) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration). CHESTER Demo offers only `none` and `lte` and starts in `lte`.

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the sensors now |
| `send` | Send the data now |
| `gnss start` | Start the GNSS receiver |
| `gnss stop` | Stop the GNSS receiver |
| `gnss state` | Print whether the receiver runs and the last position |

## Firmware Build

- **Firmware:** [hio-chester-demo:v4.0.1](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `fe66508fdb6a4d78b90b6e4a07d1e929`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929/hex), SHA256 `01469baa20763745f15fd2eff6442e0b02c85810c82c38168e751ef296c8ec0d`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929/bin), SHA256 `f7f28e16b99898a3a9de3682312fe6bca7fcba99c3d6e237b4ab97667d04d75a`
- **Build from the SDK:** `west chester-update demo --variant "CHESTER Demo"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Data

Each report holds:

- `message`: version, sequence number and timestamp of the message
- `system`: uptime in seconds, battery voltage at rest and under load in V (`voltage_rest`, `voltage_load`) and load current in mA (`current_load`)
- `attribute`: vendor and product name, hardware variant and revision, firmware version and serial number
- `network`: parameters of the cellular connection (`eest`, `ecl`, `rsrp`, `rsrq`, `snr`, `plmn`, `cid`, `band`, `earfcn`)
- `thermometer`: `temperature` from the thermometer in °C
- `accelerometer`: acceleration on the X, Y and Z axes in m/s² (`acceleration_x`, `acceleration_y`, `acceleration_z`) and the `orientation`
