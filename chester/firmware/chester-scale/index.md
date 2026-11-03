---
title: CHESTER Scale
description: "Firmware of the CHESTER Scale catalog application: how it measures the load cells, every configuration parameter, its commands and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Scale

The **CHESTER Scale** firmware turns CHESTER into a wireless scale. It measures up to four load cells on **CHESTER-X3C** modules and sends the readings to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. The variant built for the CHESTER-Z1 backup module has its own page, which lists only what it changes: [**CHESTER Scale Z**](chester-scale-z.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../common-functionality.md). The hardware and the product variants are on the [**CHESTER Scale**](../../catalog-applications/chester-scale/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-X3C** load cell interface in slot A (channels A1 and A2) and a second one in slot B (channels B1 and B2), which the firmware detects at startup (see [**CHESTER-X3C**](../../ordering-codes.md#chester-x3c))
- Bluetooth sensor tags (Teltonika EYE Sensor) for wireless temperature and humidity monitoring (see [**BLE Tags**](../ble-tags.md))

The main firmware does not support the **CHESTER-Z1** backup module; use the [**CHESTER Scale Z**](chester-scale-z.md) build with it.

## Measurement and Behavior

### Weight Measurement

- Every `weight-measurement-interval` seconds, the firmware measures all active channels. It powers each load cell only for the measurement, takes 32 readings and averages the middle half of them, so the highest and the lowest quarter are discarded.
- When a result differs from the previous result of the channel by 100 counts or more, the firmware measures the channel again, five times at most in total, and stops as soon as two consecutive results differ by less than 100 counts. A result that does not settle is sent with bit 30 inverted as an error flag.
- The firmware sends the raw readings of the load cell interface; it does not convert them to weight units.
- Each measurement has its timestamp; the measurements are sent in a batch every report interval (parameter `interval-report`). The buffer holds 128 measurements, and further measurements are dropped until the next report.
- The report interval varies randomly by up to ±20 % (see [**Report Interval Jitter**](../common-functionality.md#report-interval-jitter)).

The weight is not aggregated: `interval-sample` sets how often the internal thermometer, the accelerometer and the Bluetooth tags are read, and `interval-aggreg` how often the Bluetooth tag samples are aggregated.

### Channel Configuration

The application supports up to 4 weight measurement channels:
- **Channel A1** and **Channel A2** on slot A
- **Channel B1** and **Channel B2** on slot B

Each channel can be individually enabled or disabled. The report has `null` for a disabled channel and for a channel whose measurement failed.

:::info

Since **v3.5.5**, the firmware built with `ctr_x3_b` detects the CHESTER-X3 module in slot B at runtime. A single firmware therefore covers both single-slot (A only) and dual-slot (A+B) hardware. Channels B1/B2 are skipped automatically when the slot B module is not installed.

:::

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-report` | `<30-86400>` | `900` | Report interval in seconds |
| `interval-poll` | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `interval-sample` | `<1-86400>` | `60` | Sampling interval of the internal thermometer, the accelerometer and the Bluetooth tags in seconds |
| `interval-aggreg` | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag samples in seconds |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `channel-a1-active` | `true`, `false` | `true` | Measure and report channel A1 |
| `channel-a2-active` | `true`, `false` | `true` | Measure and report channel A2 |
| `channel-b1-active` | `true`, `false` | `true` | Measure and report channel B1 |
| `channel-b2-active` | `true`, `false` | `true` | Measure and report channel B2 |
| `weight-measurement-interval` | `<30-86400>` | `60` | Weight measurement interval in seconds |

The `channel-b1-active` and `channel-b2-active` parameters take effect only with a CHESTER-X3C module in slot B. The backup module parameters are added by the [**CHESTER Scale Z**](chester-scale-z.md) build.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `measure` | Measure the weight now and store the result |
| `test` | Measure all channels now, active or not, and print the raw readings without storing them |
| `sample` | Read the internal thermometer, the accelerometer and the Bluetooth tags now |
| `aggreg` | Aggregate the Bluetooth tag samples now |
| `send` | Send the data now |

## Firmware Build

- **Firmware:** [hio-chester-scale:v4.0.1](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `bd797484aa61413b82c3cbd041339d48`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48/hex), SHA256 `0446fc51e825af1679856375d1298e092ed20774cdac789f14c59dc998d0a61b`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48/bin), SHA256 `503b3ff85113af19b282e5fe889773efff1d777033a577b9a5f1296fe666a175`
- **Build from the SDK:** `west chester-update scale --variant "CHESTER Scale"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report of the main firmware with all four channels active and one Bluetooth tag:

- `weight`: the raw readings of channels A1, A2, B1 and B2, each measurement with its timestamp
- `ble_tags`: readings of the enrolled Bluetooth tags

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1673272805
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.4",
    "fw_version": "v4.0.1",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 3600,
    "voltage_rest": 3.7,
    "voltage_load": 3.65,
    "current_load": 36
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -90,
      "rsrq": -8,
      "snr": 9,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 22.18
  },
  "accelerometer": {
    "accel_x": 0.07,
    "accel_y": -0.16,
    "accel_z": 9.65,
    "orientation": 2
  },
  "weight": [
    {
      "timestamp": 1673272500,
      "raw_result_a1": 125430,
      "raw_result_a2": 98210,
      "raw_result_b1": 112340,
      "raw_result_b2": 87650
    },
    {
      "timestamp": 1673272560,
      "raw_result_a1": 125445,
      "raw_result_a2": 98225,
      "raw_result_b1": 112355,
      "raw_result_b2": 87660
    },
    {
      "timestamp": 1673272620,
      "raw_result_a1": 125420,
      "raw_result_a2": 98200,
      "raw_result_b1": 112330,
      "raw_result_b2": 87640
    }
  ],
  "ble_tags": [
    {
      "addr": "1234567890AB",
      "rssi": -81,
      "voltage": 3.11,
      "humidity": {
        "measurements": [
          {
            "timestamp": 1673272500,
            "min": 54.78,
            "max": 55.31,
            "avg": 55.1,
            "mdn": 55.12
          }
        ]
      },
      "temperature": {
        "measurements": [
          {
            "timestamp": 1673272500,
            "min": 22.18,
            "max": 22.25,
            "avg": 22.23,
            "mdn": 22.25
          }
        ]
      }
    }
  ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

A LoRaWAN uplink carries only the last weight measurement.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "voltage_rest": 3.65,
  "voltage_load": 3.6,
  "current_load": 15,
  "orientation": 2,
  "therm_temperature": 22.4,
  "scale": {
    "channel_a1_active": true,
    "channel_a2_active": true,
    "channel_b1_active": true,
    "channel_b2_active": true,
    "raw_a1": 125430,
    "raw_a2": 98210,
    "raw_b1": 112340,
    "raw_b2": 87650
  }
}
```

</details>

  </TabItem>
</Tabs>

## Changelog

### v3.5.5 – 2026-06-22

- **Added**: Runtime detection of CHESTER-X3 module in slot B

### v3.5.0 – 2025-12-03

- **Added**: New variant: **CHESTER Scale Z** with CHESTER-Z1 backup module support
- **Added**: BLE tag subsystem integration: wireless temperature and humidity from Teltonika EYE Sensor tags
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); previous Cloud Legacy firmware remains separately available
- **Changed**: Single combined firmware binary for both LTE and LoRaWAN; LoRaWAN support in progress (planned for next release)

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
