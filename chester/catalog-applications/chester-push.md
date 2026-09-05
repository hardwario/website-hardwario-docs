---
slug: chester-push
title: CHESTER Push
---
import Image from '@theme/IdealImage';

# CHESTER Push

This article describes the core functionality, hardware description, and example **JSON** message of the catalog application **CHESTER Push**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](/chester/category/platform-connectivity/) on how to work with the interactive console.

:::


## Application Overview

**CHESTER Push** has push buttons on the enclosure. The application immediately sends data when any of the push buttons are pressed. For bulk orders, the number of buttons can be configured. An off-the-shelf configuration provides four push buttons on the left side. Alternatively, we can deliver a single push-button version (in the enclosure center). Also, upon a customer's request, we can customize the enclosure printing, and provide various text labels (or symbols) next to each of the push buttons.

The application can differentiate between a short press and a long press. In each message, there is an event distinguishing which of the push buttons triggered the sending. Every message also contains counters of each push button for short and long presses.

Each button is also equipped with an **LED indicator** so the operator can see that the press was recognized. Also, the **beep sound** is played from the integrated acoustic buzzer for audible confirmation of the push button press.

The **CHESTER Push** application integrates a **CHESTER-Z1-F** extension module with a rechargeable **Li-Ion** battery and DC/DC power supply (input voltage range of 6 VDC to 26 VDC) that can charge the battery and provide a steady power supply for the application. The reported message also provides information about the external power presence, external DC line voltage, and battery voltage. With that extra information, **CHESTER Push** could also be used to monitor power outages.

**CHESTER Push** also reports temperature and device orientation (using the built-in accelerometer). All these values are provided in every message sent from the device.

### LED Behaviour

The application signals push-button events on LEDs in two different ways and customers can specify which firmware variant better suits their needs.

- Standard **CHESTER Push** implementation:

  The LED on the pressed push button is active for 2 seconds (green for short press, red for long press).

  :::tip

  This variant makes it suitable for low-power operation (months from the integrated **Li-Ion** battery).

  :::

- Alternate **CHESTER Push FM** (stands for **Flip Mode**) implementation:

  The LED on the pressed push button flips (with red color) to the push button that has been pressed (the previous push button is switched off).

  :::caution

  This variant makes is not suitable for low-power operation as the constantly activated LED quickly discharges the battery.

  :::

## Hardware Description {#chester-push}

The catalog application **CHESTER Push** hardware consists of the following ordering codes:

* `CHESTER-M-CGLS`: CHESTER mainboard
* `CHESTER-Z1-F`: Four push buttons (see [**Ordering Codes**](../ordering-codes.md#chester-z) for more variants)
* `CHESTER-E2-LP`: Enclosure with light pipe and SMA antenna pigtail

## Enclosure Template

You can use a [**front cover template**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf) for your custom enclosure design.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-report 1800
app config event-report-delay 1
app config event-report-rate 60
app config backup-report-connected false
app config backup-report-disconnected false
```

## Specific Commands

:::info

You can easily explore the whole command tree structure. Start with the `help` command.

:::

Use this command to set **report interval** (in seconds):

```
app config interval-report <value>
```

Use this command to configure a short delay (in seconds) between the **button** or **backup** event and its reporting:

```
app config event-report-delay <value>
```

Use this command to limit the number of asynchronous **button** or **backup** event reports in a one-hour window:

```
app config event-report-rate <value>
```

:::tip

This feature helps to conserve power in the battery-operated device and optimizes the amount of transferred data. The regular (periodic) reports set by the parameter `interval-report` are not counted to this limit.

:::

Use these commands to enable/disable reporting of the backup module power input connect/disconnect events:

```
app config backup-report-connected false
app config backup-report-disconnected false
```

## Firmware

The latest firmware is available in Catalog Applications [Firmware chapter](index.md#application-firmware).

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
    "timestamp": 1672910024
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Push",
    "fw_version": "v1.4.0",
    "serial_number": "2159018247"
  },
  "system": {
    "uptime": 173,
    "voltage_rest": 3.96,
    "voltage_load": 3.86,
    "current_load": 38
  },
  "backup": {
    "line_voltage": 0.01,
    "batt_voltage": 3.43,
    "state": "disconnected",
    "events": [
      {
        "timestamp": 1672910010,
        "type": "disconnected"
      }
    ]
  },
  "network": {
    "imei": 351358815178303,
    "imsi": 901288003957939,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -87,
      "rsrq": -6,
      "snr": 13,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 21.56
  },
  "accelerometer": {
    "acceleration_x": -0.31,
    "acceleration_y": 0.15,
    "acceleration_z": 9.88,
    "orientation": 2
  },
  "button_x": {
    "count_click": 0,
    "count_hold": 0,
    "events": []
  },
  "button_1": {
    "count_click": 3,
    "count_hold": 1,
    "events": [
      {
        "timestamp": 1672910020,
        "type": "held"
      }
    ]
  },
  "button_2": {
    "count_click": 12,
    "count_hold": 0,
    "events": [
      {
        "timestamp": 1672910023,
        "type": "clicked"
      }
    ]
  },
  "button_3": {
    "count_click": 0,
    "count_hold": 0,
    "events": []
  },
  "button_4": {
    "count_click": 0,
    "count_hold": 0,
    "events": []
  }
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
  "voltage_rest": 3.8,
  "voltage_load": 3.75,
  "current_load": 15,
  "orientation": 1,
  "therm_temperature": 22.5,
  "backup": {
    "line_voltage": 24.0,
    "battery_voltage": 4.1,
    "backup_state": true
  },
  "button_x": {
    "press_count": 42,
    "hold_count": 3,
    "press_event": true,
    "hold_event": false
  },
  "button_1": {
    "press_count": 10,
    "hold_count": 1,
    "press_event": false,
    "hold_event": false
  }
}
```

</p>
</details>

  </TabItem>
</Tabs>

---

## Changelog

### v3.5.0 – 2025-12-03

- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Changed**: Refactored to new `app_lrw` LoRaWAN framework with unit test coverage
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); previous Cloud v1 firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
