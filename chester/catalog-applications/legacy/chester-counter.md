---
slug: chester-counter
title: CHESTER Counter
---
import Image from '@theme/IdealImage';

# CHESTER Counter

:::warning

CHESTER Counter is replaced by [**CHESTER Control**](https://docs.hardwario.com/chester/catalog-applications/chester-control) which offers the same functionality.

:::

This article describes the core functionality, hardware description, default configuration, and example **JSON** messages for the catalog application **CHESTER Counter**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](https://docs.hardwario.com/chester/catalog-applications/common-functionality) to know how LED, button and network configuration works.
- [**Platform Management**](https://docs.hardwario.com/chester/category/platform-connectivity) on how to work with the interactive console.

:::

## Application Overview

The application **CHESTER Counter** is used to count pulses on eight digital inputs. They can be connected to a PLC/sensor output (NPN/PNP), push button, switch, relay, etc. The application counts the total number of pulses and also the number of pulses since the last report (configurable using the `interval-report` parameter).

## Application Variants

**CHESTER Counter** can be ordered in one of these variants:

### CHESTER Counter {#chester-counter}

The catalog **CHESTER Counter** hardware consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build shield options: `ctr_lte ctr_x0_a`

### CHESTER Counter Z

The catalog **CHESTER Counter Z** hardware consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-Z1`: Backup module

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build shield options: `ctr_lte ctr_x0_a ctr_z`

## Backup

**CHESTER Counter Z** (equipped with **CHESTER-Z1**) can also report information on the backup battery and external DC power state.

* The current **battery voltage** and **external DC voltage** are sent in every report.

* When the DC power input changes, the timestamp of the change event is stored altogether with the **connected**/**disconnected** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report (parameter `interval-report`).

* Optionally, DC power input changes to the **connected** (parameter `backup-report-connected`) or **disconnected** (parameter `backup-report-disconnected`) states can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`) to allow capturing multiple consequent input changes.

* The maximum number of reports per hour is configurable (parameter `event-report-rate`). The event throttling limits communication bandwidth and preserves the battery lifespan.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-sample 60
app config interval-report 1800
```

## Firmware

The latest firmware is available in Catalog Applications [Firmware chapter](https://docs.hardwario.com/chester/catalog-applications/catalog-applications#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
This example message was sent by a **CHESTER** with an **X0** module only in the A slot. The message was sent because of a tamper event.

```json
{
  "frame": {
    "protocol": 1,
    "sequence": 2,
    "timestamp": 1688127148
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.4",
    "fw_version": "(unset)",
    "serial_number": "2159019054"
  },
  "state": {
    "uptime": 68
  },
  "battery": {
    "voltage_rest": null,
    "voltage_load": null,
    "current_load": null
  },
  "network": {
    "imei": 426556893,
    "imsi": 2907855241,
    "parameter": {
      "eest": 8,
      "ecl": 0,
      "rsrp": -75,
      "rsrq": -7,
      "snr": 16,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 24.31
  },
  "accelerometer": {
    "accel_x": -0.77,
    "accel_y": 3.37,
    "accel_z": 9.03,
    "orientation": 2
  },
  "counter": {
    "channel_1_total": 5,
    "channel_1_delta": 2,
    "channel_2_total": 5,
    "channel_2_delta": 3,
    "channel_3_total": 5,
    "channel_3_delta": 0,
    "channel_4_total": 7,
    "channel_4_delta": 0,
    "channel_5_total": null,
    "channel_5_delta": null,
    "channel_6_total": null,
    "channel_6_delta": null,
    "channel_7_total": null,
    "channel_7_delta": null,
    "channel_8_total": null,
    "channel_8_delta": null
  },
  "tamper": {
    "state": "active",
    "events": [
      {
        "timestamp": 1688127147,
        "type": "activated"
      }
    ]
  },
  "backup": {
    "line_voltage": 15,
    "batt_voltage": 2,
    "backup_state": 0,
    "events": []
  }
}
```


  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

```json
{
  "system": {
    "uptime": 86400,
    "voltage_rest": 3.6
  },
  "counter": {
    "channels": [
      {
        "id": 0,
        "count": 5020
      },
      {
        "id": 1,
        "count": 120
      }
    ]
  }
}
```
    
  </TabItem>
</Tabs>

