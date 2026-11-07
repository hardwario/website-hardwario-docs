---
title: CHESTER Scale
description: "Firmware of the CHESTER Scale catalog application: how it measures the load cells, every configuration parameter, its commands and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Scale

The **CHESTER Scale** firmware turns CHESTER into a wireless scale. It measures up to four load cells on **CHESTER-X3C** modules and sends the readings to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. The variant built for the CHESTER-Z1 backup module has its own page, which lists only what it changes: [**CHESTER Scale Z**](chester-scale-z.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER Scale**](../../catalog-applications/chester-scale/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-X3C** load cell interface in slot A (channels A1 and A2) and a second one in slot B (channels B1 and B2), which the firmware detects at startup (see [**CHESTER-X3C**](../../ordering-codes.md#chester-x3c))
- Bluetooth sensor tags (Teltonika EYE Sensor) for wireless temperature and humidity monitoring (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

The main firmware does not support the **CHESTER-Z1** backup module; use the [**CHESTER Scale Z**](chester-scale-z.md) build with it.

## Measurement and Behavior

### Weight Measurement

- Every `weight-measurement-interval` seconds, the firmware measures all active channels. It powers each load cell only for the measurement, takes 32 readings and averages the middle half of them, so the highest and the lowest quarter are discarded.
- When a result differs from the previous result of the channel by 100 counts or more, the firmware measures the channel again, five times at most in total, and stops as soon as two consecutive results differ by less than 100 counts. A result that does not settle is sent with bit 30 inverted as an error flag.
- The firmware sends the raw readings of the load cell interface; it does not convert them to weight units.
- Each measurement has its timestamp; the measurements are sent in a batch every report interval (parameter `interval-report`). The buffer holds 128 measurements, and further measurements are dropped until the next report.
- The report interval varies randomly by up to ±20 % (see [**Report Interval Jitter**](../../catalog-applications/common-functionality.md#report-interval-jitter)).

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

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-report` | Report interval | `<30-86400>` | `900` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval of the internal thermometer, the accelerometer and the Bluetooth tags in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag samples in seconds |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `channel-a1-active` | Channel a1 active | `true`, `false` | `true` | Measure and report channel A1 |
| `channel-a2-active` | Channel a2 active | `true`, `false` | `true` | Measure and report channel A2 |
| `channel-b1-active` | Channel b1 active | `true`, `false` | `true` | Measure and report channel B1 |
| `channel-b2-active` | Channel b2 active | `true`, `false` | `true` | Measure and report channel B2 |
| `weight-measurement-interval` | Weight measurement interval | `<30-86400>` | `60` | Weight measurement interval in seconds |

The `channel-b1-active` and `channel-b2-active` parameters take effect only with a CHESTER-X3C module in slot B. The backup module parameters are added by the [**CHESTER Scale Z**](chester-scale-z.md) build.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

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

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-scale/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report of the main firmware with the default intervals, two CHESTER-X3C modules with all four channels active, and one Bluetooth tag:

- `weight`: the raw readings of channels A1, A2, B1 and B2, one entry for each weight measurement since the previous report, each with its timestamp
- `ble_tags`: readings of the enrolled Bluetooth tags, aggregated every `interval-aggreg` seconds

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 96,
    "timestamp": 1793961013
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "BCGLS",
    "hw_revision": "R3.4",
    "fw_version": "v4.0.1",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 86413,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 34
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -90,
      "rsrq": -8,
      "snr": 9,
      "plmn": 23003,
      "cid": 26853412,
      "band": 20,
      "earfcn": 6300
    }
  },
  "accelerometer": {
    "accel_x": 0.07,
    "accel_y": -0.16,
    "accel_z": 9.65,
    "orientation": 2
  },
  "thermometer": {
    "temperature": 22.18
  },
  "weight": [
    { "timestamp": 1793960160, "raw_result_a1": 18432, "raw_result_a2": 17905, "raw_result_b1": 18214, "raw_result_b2": 17644 },
    { "timestamp": 1793960220, "raw_result_a1": 18435, "raw_result_a2": 17902, "raw_result_b1": 18211, "raw_result_b2": 17647 },
    { "timestamp": 1793960280, "raw_result_a1": 18429, "raw_result_a2": 17908, "raw_result_b1": 18216, "raw_result_b2": 17641 },
    { "timestamp": 1793960340, "raw_result_a1": 18431, "raw_result_a2": 17904, "raw_result_b1": 18213, "raw_result_b2": 17645 },
    { "timestamp": 1793960400, "raw_result_a1": 18436, "raw_result_a2": 17906, "raw_result_b1": 18210, "raw_result_b2": 17643 },
    { "timestamp": 1793960460, "raw_result_a1": 18433, "raw_result_a2": 17901, "raw_result_b1": 18215, "raw_result_b2": 17648 },
    { "timestamp": 1793960520, "raw_result_a1": 18430, "raw_result_a2": 17907, "raw_result_b1": 18212, "raw_result_b2": 17642 },
    { "timestamp": 1793960580, "raw_result_a1": 18428, "raw_result_a2": 17905, "raw_result_b1": 18217, "raw_result_b2": 17646 },
    { "timestamp": 1793960640, "raw_result_a1": 18434, "raw_result_a2": 17903, "raw_result_b1": 18213, "raw_result_b2": 17644 },
    { "timestamp": 1793960700, "raw_result_a1": 18437, "raw_result_a2": 17909, "raw_result_b1": 18211, "raw_result_b2": 17641 },
    { "timestamp": 1793960760, "raw_result_a1": 18432, "raw_result_a2": 17904, "raw_result_b1": 18214, "raw_result_b2": 17647 },
    { "timestamp": 1793960820, "raw_result_a1": 18430, "raw_result_a2": 17906, "raw_result_b1": 18216, "raw_result_b2": 17643 },
    { "timestamp": 1793960880, "raw_result_a1": 18435, "raw_result_a2": 17902, "raw_result_b1": 18212, "raw_result_b2": 17645 },
    { "timestamp": 1793960940, "raw_result_a1": 18433, "raw_result_a2": 17905, "raw_result_b1": 18215, "raw_result_b2": 17642 },
    { "timestamp": 1793961000, "raw_result_a1": 18431, "raw_result_a2": 17907, "raw_result_b1": 18213, "raw_result_b2": 17646 }
  ],
  "ble_tags": [
    {
      "addr": "7cd9f413e360",
      "rssi": -81,
      "voltage": 3.03,
      "temperature": {
        "measurements": [
          { "timestamp": 1793960400, "min": 21.92, "max": 22.05, "avg": 21.98, "mdn": 21.97 },
          { "timestamp": 1793960700, "min": 22.01, "max": 22.12, "avg": 22.06, "mdn": 22.06 },
          { "timestamp": 1793961000, "min": 22.08, "max": 22.19, "avg": 22.13, "mdn": 22.12 }
        ]
      },
      "humidity": {
        "measurements": [
          { "timestamp": 1793960400, "min": 54, "max": 55, "avg": 54.4, "mdn": 54 },
          { "timestamp": 1793960700, "min": 54, "max": 55, "avg": 54.8, "mdn": 55 },
          { "timestamp": 1793961000, "min": 55, "max": 56, "avg": 55.2, "mdn": 55 }
        ]
      }
    }
  ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

A LoRaWAN uplink carries only the last weight measurement. The example shows the output of the ChirpStack/TTN decoder (`codec/cs-decoder.js` of the application in the CHESTER SDK) for the same device.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "voltage_rest": 3.653,
  "voltage_load": 3.418,
  "current_load": 34,
  "orientation": 2,
  "therm_temperature": 22.18,
  "scale": {
    "channel_a1_active": true,
    "channel_a2_active": true,
    "channel_b1_active": true,
    "channel_b2_active": true,
    "raw_a1": 18431,
    "raw_a2": 17907,
    "raw_b1": 18213,
    "raw_b2": 17646
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
