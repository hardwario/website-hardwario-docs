---
title: CHESTER Range
description: "Firmware of the CHESTER Range catalog application: ultrasonic distance measurement, every configuration parameter with its default, and the data format."
---

# CHESTER Range

The **CHESTER Range** firmware measures distance with the [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor) ultrasonic sensor. It also measures temperature with DS18B20 1-Wire thermometers and reads Bluetooth sensor tags. It samples the sensors, aggregates the samples and sends the results to HARDWARIO Cloud over NB-IoT/LTE.

This page describes the main firmware. The variant [**CHESTER Range Z**](chester-range-z.md) for the CHESTER-Z backup module has its own page, which lists only what it changes.

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../common-functionality.md). The hardware and the product variants are on the [**CHESTER Range**](../../catalog-applications/chester-range/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **MaxBotix MB7066** ultrasonic sensor on the **CHESTER-X0** module in slot A: power on channel 1, pulse output on channel 2 (wiring on the [**CHESTER Range**](../../catalog-applications/chester-range/index.md#terminal-blocks) catalog page)
- **DS18B20** 1-Wire thermometers, up to ten
- Bluetooth sensor tags (see [**BLE Tags**](../ble-tags.md))

Reporting from the **CHESTER-Z** backup module needs [**CHESTER Range Z**](chester-range-z.md). The source code also supports the **CHESTER-S2** hygrometer with temperature alarms (the `hygro-t-alarm-*` parameters), but no v4.0.1 build includes it.

## Measurement and Behavior

- All sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval. Minimum, maximum, average, and median are computed from buffered samples for each sensor (parameter `interval-aggreg`).
- Each aggregated value has its timestamp; the values are sent in a batch every report interval (parameter `interval-report`).
- The ultrasonic sensor keeps up to 32 samples in one aggregation interval and up to 32 aggregated values between two reports; anything beyond that is dropped.
- The firmware communicates over NB-IoT/LTE only and starts in the `lte` mode.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |

The main firmware has no hardware-dependent parameters; the backup parameters come with [**CHESTER Range Z**](chester-range-z.md#configuration-parameters).

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

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

The example shows a report with the ultrasonic sensor and two DS18B20 thermometers. Every available sensor has one aggregated measurement, which contains the minimum, maximum, average and median value:

- `ultrasonic_ranger`: the distance in meters
- `w1_thermometers`: one entry for each DS18B20 thermometer

The example comes from an earlier firmware. Firmware v4.0.1 sends the distance measurements directly in `ultrasonic_ranger`, without the `distance` level, and it sends no `hygrometer` structure, because none of its builds supports CHESTER-S2.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1685093572
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.4",
    "fw_name": "(unset)",
    "fw_version": "(unset)",
    "serial_number": "2159019054"
  },
  "system": {
    "uptime": 49,
    "voltage_rest": null,
    "voltage_load": null,
    "current_load": null
  },
  "network": {
    "imei": 351358816140765,
    "imsi": 901288910018953,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -78,
      "rsrq": -5,
      "snr": 8,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 24.93
  },
  "accelerometer": {
    "acceleration_x": 0,
    "acceleration_y": -0.23,
    "acceleration_z": 9.65,
    "orientation": 2
  },
  "ultrasonic_ranger": {
    "distance": {
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 2.004,
          "max": 2.009,
          "avg": 2.008,
          "mdn": 2.008
        }
      ]
    }
  },
  "hygrometer": {
    "temperature": {
      "events": [],
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 24.9,
          "max": 25.03,
          "avg": 24.99,
          "mdn": 25.01
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 35.18,
          "max": 35.81,
          "avg": 35.45,
          "mdn": 35.36
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 222768959,
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 24.31,
          "max": 24.31,
          "avg": 24.31,
          "mdn": 24.31
        }
      ]
    },
    {
      "serial_number": 222690915,
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 27,
          "max": 27.43,
          "avg": 27.22,
          "mdn": 27.25
        }
      ]
    }
  ]
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
