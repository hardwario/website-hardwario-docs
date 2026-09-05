---
slug: chester-scale
title: CHESTER Scale
---
import Image from '@theme/IdealImage';

# CHESTER Scale

This article describes the core functionality, hardware description, and example **JSON** message of the catalog application **CHESTER Scale**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](../category/platform-connectivity) on how to work with the interactive console.

:::

## Application Overview

**CHESTER Scale** is designed for wireless weight measurement using load cells. The application supports connecting multiple weight probes (up to 4 channels) and provides real-time weight data transmission via NB-IoT/LTE-M or LoRaWAN networks.

The device is ideal for:
- **Industrial storage tank monitoring**: Track fill levels of tanks, silos, or containers
- **Pallet and goods tracking**: Monitor weight changes in logistics and warehousing
- **Livestock weight monitoring**: Optimize feeding schedules and track animal health
- **Agricultural applications**: Beehive monitoring, feed storage, etc.

## Application Variants

**CHESTER Scale** can be ordered in one of these variants:

### CHESTER Scale {#chester-scale}

The catalog application **CHESTER Scale** measures weight from up to 4 load cell channels.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3C:A` or `CHESTER-X3C:B`: Load cell interface (2 channels per module)
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update scale --variant "CHESTER Scale"`

:::info
Since **v3.5.5**, the firmware built with `ctr_x3_b` detects the CHESTER-X3 module in slot B at runtime. A single firmware therefore covers both single-slot (A only) and dual-slot (A+B) hardware. Channels B1/B2 are skipped automatically when the slot B module is not installed.
:::

### CHESTER Scale Z {#chester-scale-z}

The catalog application **CHESTER Scale Z** includes backup battery support for uninterrupted operation.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-Z1`: Backup module
* `CHESTER-X3C:A` or `CHESTER-X3C:B`: Load cell interface (2 channels per module)
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update scale --variant "CHESTER Scale Z"`

## Measurement and Behavior

### Weight Measurement

- Weight sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval (parameter `interval-aggreg`). Minimum, maximum, average, and median are computed from buffered samples for each channel.
- Each aggregated value has its timestamp and are sent in a batch in a report interval period (parameter `interval-report`).
- The `weight-measurement-interval` parameter controls how often the weight measurement cycle runs.

### Channel Configuration

The application supports up to 4 weight measurement channels:
- **Channel A1** and **Channel A2** on slot A
- **Channel B1** and **Channel B2** on slot B

Each channel can be individually enabled or disabled.

### Backup (CHESTER Scale Z)

**CHESTER Scale Z** (equipped with **CHESTER-Z1**) can also report information on the backup battery and external DC power state.

* The current **battery voltage** and **external DC voltage** are sent in every report.
* When the DC power input changes, the timestamp of the change event is stored altogether with the **connected**/**disconnected** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report.
* Optionally, DC power input changes can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`).
* The maximum number of reports per hour is configurable (parameter `event-report-rate`).

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-report 900
app config interval-sample 60
app config interval-aggreg 300
app config weight-measurement-interval 60
app config channel-a1-active true
app config channel-a2-active true
app config channel-b1-active true
app config channel-b2-active true
```

When equipped with **backup** (CHESTER-Z1):

```
app config event-report-delay 1
app config event-report-rate 30
app config backup-report-connected true
app config backup-report-disconnected true
```

## Specific Commands

:::info

You can easily explore the whole command tree structure. Start with the `help` command.

:::

:::caution

To apply a new configuration, you need to call `config save`, which applies the new configuration parameters and reboots the device.

:::

### Reporting

Command to set **report interval** in seconds:

```
app config interval-report <30-86400>
```

### Sampling and Aggregation

Command to set **sample interval** in seconds:

```
app config interval-sample <1-86400>
```

Command to set **aggregate interval** in seconds:

```
app config interval-aggreg <1-86400>
```

Command to set **weight measurement interval** in seconds:

```
app config weight-measurement-interval <30-86400>
```

### Channel Activation

Command to **enable/disable** channel A1:

```
app config channel-a1-active <true/false>
```

Command to **enable/disable** channel A2:

```
app config channel-a2-active <true/false>
```

Command to **enable/disable** channel B1:

```
app config channel-b1-active <true/false>
```

Command to **enable/disable** channel B2:

```
app config channel-b2-active <true/false>
```

### Backup (CHESTER-Z1)

Command to set **event report delay** in seconds:

```
app config event-report-delay <1-86400>
```

Command to set **event report rate** in reports per hour:

```
app config event-report-rate <1-3600>
```

Command to enable/disable reporting when backup is **connected**:

```
app config backup-report-connected <true/false>
```

Command to enable/disable reporting when backup is **disconnected**:

```
app config backup-report-disconnected <true/false>
```

## Firmware

The latest firmware is available in the Catalog Applications [Firmware chapter](index.md#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">

<details>
<summary><b>Show JSON Example</b></summary>
<p>

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
    "fw_name": "CHESTER Scale",
    "fw_version": "v3.0.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 3600,
    "voltage_rest": 3.7,
    "voltage_load": 3.65,
    "current_load": 36
  },
  "backup": {
    "line_voltage": 24.01,
    "batt_voltage": 4.09,
    "state": "connected",
    "events": []
  },
  "network": {
    "imei": 351358815180770,
    "imsi": 901288910018982,
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
  "weight": {
    "measurements": [
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
    ]
  },
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

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Show JSON Example</b></summary>
<p>

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

</p>
</details>

  </TabItem>
</Tabs>

## BLE Tag Subsystem

:::info
**CHESTER Scale** also supports integration with **Bluetooth tags** (Teltonika EYE Sensor subsystem) for wireless temperature and humidity monitoring.
Learn how to activate and configure this feature in the [**CHESTER BLE Tag Subsystem** documentation](ble-tags.md).
:::

---

## Changelog

### v3.5.5 – 2026-06-22

- **Added**: Runtime detection of CHESTER-X3 module in slot B

### v3.5.0 – 2025-12-03

- **Added**: New variant: **CHESTER Scale Z** with CHESTER-Z1 backup module support
- **Added**: BLE tag subsystem integration: wireless temperature and humidity from Teltonika EYE Sensor tags
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); previous Cloud v1 firmware remains separately available
- **Changed**: Single combined firmware binary for both LTE and LoRaWAN; LoRaWAN support in progress (planned for next release)

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::

