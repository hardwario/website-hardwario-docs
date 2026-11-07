---
title: CHESTER Range
description: "Firmware of the CHESTER Range catalog application: ultrasonic distance measurement, every configuration parameter with its default, and the data format."
---

# CHESTER Range

The **CHESTER Range** firmware measures distance with the [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor) ultrasonic sensor. It also measures temperature with DS18B20 1-Wire thermometers and reads Bluetooth sensor tags. It samples the sensors, aggregates the samples and sends the results to HARDWARIO Cloud over NB-IoT/LTE.

This page describes the main firmware. The variant [**CHESTER Range Z**](chester-range-z.md) for the CHESTER-Z backup module has its own page, which lists only what it changes.

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER Range**](../../catalog-applications/chester-range/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **MaxBotix MB7066** ultrasonic sensor on the **CHESTER-X0** module in slot A: power on channel 1, pulse output on channel 2 (wiring on the [**CHESTER Range**](../../catalog-applications/chester-range/index.md#terminal-blocks) catalog page)
- **DS18B20** 1-Wire thermometers, up to ten
- Bluetooth sensor tags (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

Reporting from the **CHESTER-Z** backup module needs [**CHESTER Range Z**](chester-range-z.md). The source code also supports the **CHESTER-S2** hygrometer with temperature alarms (the `hygro-t-alarm-*` parameters), but no v4.0.1 build includes it.

## Measurement and Behavior

- All sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval. Minimum, maximum, average, and median are computed from buffered samples for each sensor (parameter `interval-aggreg`).
- Each aggregated value has its timestamp; the values are sent in a batch every report interval (parameter `interval-report`).
- The ultrasonic sensor keeps up to 32 samples in one aggregation interval and up to 32 aggregated values between two reports; anything beyond that is dropped.
- The firmware communicates over NB-IoT/LTE only and starts in the `lte` mode.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |

The main firmware has no hardware-dependent parameters; the backup parameters come with [**CHESTER Range Z**](chester-range-z.md#configuration-parameters).

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the sensors now |
| `aggreg` | Aggregate the samples now |
| `send` | Send the data now |

## Firmware Build

- **Firmware:** [hio-chester-range:v4.0.1](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `ace9410d06b24f6da06a15ca70587094`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094/hex), SHA256 `46c55bd4489b31032be043f2751186babaf415cf703d2a7d5fe53a71197c024b`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094/bin), SHA256 `b21f65a037115785437ae94929933d0568bc3ac73193bca62c262f065cc8c18d`
- **Build from the SDK:** `west chester-update range --variant "CHESTER Range"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-range/index.md#data-over-lte).

The example shows a report with the ultrasonic sensor and two DS18B20 thermometers. `interval-report` is set to 600 seconds, so every `measurements` list holds two aggregation intervals of 300 seconds, each with the minimum, maximum, average and median value:

- `ultrasonic_ranger`: the distance in meters
- `w1_thermometers`: one entry for each DS18B20 thermometer
- `ble_tags`: an empty list, because no Bluetooth tag is paired

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 2,
    "sequence": 47,
    "timestamp": 1793945251
  },
  "system": {
    "uptime": 28233,
    "voltage_load": 3.56,
    "voltage_rest": 3.62,
    "current_load": 35
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -9,
      "snr": 6,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 11.81
  },
  "accelerometer": {
    "accel_x": -0.08,
    "accel_y": 0.04,
    "accel_z": 9.77,
    "orientation": 2
  },
  "w1_thermometers": [
    {
      "serial_number": 222768959,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 9.81,
          "max": 9.87,
          "avg": 9.84,
          "mdn": 9.81
        },
        {
          "timestamp": 1793945100,
          "min": 9.75,
          "max": 9.87,
          "avg": 9.82,
          "mdn": 9.81
        }
      ]
    },
    {
      "serial_number": 222690915,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 10.5,
          "max": 10.62,
          "avg": 10.55,
          "mdn": 10.56
        },
        {
          "timestamp": 1793945100,
          "min": 10.43,
          "max": 10.56,
          "avg": 10.5,
          "mdn": 10.5
        }
      ]
    }
  ],
  "ultrasonic_ranger": {
    "measurements": [
      {
        "timestamp": 1793944800,
        "min": 1.92,
        "max": 1.95,
        "avg": 1.93,
        "mdn": 1.93
      },
      {
        "timestamp": 1793945100,
        "min": 1.91,
        "max": 1.94,
        "avg": 1.92,
        "mdn": 1.92
      }
    ]
  },
  "ble_tags": []
}
```

</details>

## Changelog

### v3.5.0 – 2025-12-03

- **Added**: New variant: **CHESTER Range Z** with CHESTER-Z1 backup module support
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); previous Cloud Legacy firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
