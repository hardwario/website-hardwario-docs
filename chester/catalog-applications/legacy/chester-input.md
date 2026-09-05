---
slug: chester-input
title: CHESTER Input
---
import Image from '@theme/IdealImage';

# CHESTER Input

:::warning

CHESTER Counter is replaced by [**CHESTER Control**](https://docs.hardwario.com/chester/catalog-applications/chester-control) which offers the same functionality.

:::

This article describes the core functionality, hardware description, default configuration, and example **JSON** messages for the catalog application **CHESTER Input**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](https://docs.hardwario.com/chester/catalog-applications/common-functionality) to know how LED, button and network configuration works.
- [**Platform Management**](https://docs.hardwario.com/chester/category/platform-connectivity) on how to work with the interactive console.

:::


## Application Overview

The application **CHESTER Input** is used to measure and observe analog and digital inputs. The sampled analog values are aggregated, the aggregate measurements are buffered, and scheduled for later data transfer in the form of buffered data altogether with the timestamp annotations. Also, the changes on digital input (type **trigger**) can be tracked with the type of change and timestamp. The buffering strategy allows a higher number of events to be recorded while conserving data bandwidth and power required for data transfer.

**CHESTER Input** has these four inputs:

| **Type** | **Channel** | **Terminal** | **Input type**    | **Input range** | **Typical use-case**                  |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digital (NPN/PNP) | 0 to 28 V       | Switch, button, relay, PLC sensor     |
| Counter  | CH2         | A4           | Digital (NPN/PNP) | 0 to 28 V       | Energy meter pulse outputs (e.g., S0) |
| Voltage  | CH3         | A5           | Analog (voltage)  | 0 to 28 V       | Various voltage transmitters          |
| Current  | CH4         | A7           | Analog (current)  | 0 to 24 mA      | Various current transmitters          |

All these inputs and their options are explained in more detail in the article [**Input Parameters and Behavior**](#input-parameters-and-behavior).

## Application Variants

**CHESTER Input** can be ordered in one of these variants:

### CHESTER Input {#chester-input}

The catalog **CHESTER Input** hardware consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build shield options: `ctr_ds18b20 ctr_lte ctr_x0_a`

### CHESTER Input Z

The catalog **CHESTER Input Z** hardware consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-Z1`: Backup module

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build shield options: `ctr_ds18b20 ctr_lte ctr_x0_a ctr_z`

### CHESTER Input ZH

**CHESTER Input ZH** with external temperature and hygrometer.

* `CHESTER-M-CGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-Z1`: Backup module

* `CHESTER-S2`: External hygrometer

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build shield options: `ctr_ds18b20 ctr_lte ctr_x0_a ctr_z ctr_s2`

## Input Parameters and Behavior

For the wiring diagram to **CHESTER Input**, please follow the [**terminal block description**](https://docs.hardwario.com/chester/extension-modules/chester-x0) of the **CHESTER-X0** extension module.
The extension module **CHESTER-X0** is installed in the left slot **A**, so you have to use the corresponding terminals **A1** to **A8**.

### Trigger

The **trigger** input can be connected to a PLC/sensor output (NPN/PNP), push button, switch, relay, etc. The behavior of the **trigger** input is configurable.

* When the input changes, the timestamp of the change event is stored altogether with the **active**/**inactive** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report (parameter `interval-report`).

* Optionally, input changes to the **active** (parameter `trigger-report-active`) or **inactive** (parameter `trigger-report-inactive`) states can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`) to allow capturing multiple consequent input changes.

* Both **NPN** and **PNP** input logic types are supported (parameter `trigger-input-type`).

* The minimum level duration is configured separately for **active** (parameter `trigger-active-duration`) and **inactive** (parameter `trigger-inactive-duration`) states.

* The maximum number of reports per hour is configurable (parameter `event-report-rate`). The event throttling limits communication bandwidth and preserves the battery lifespan.

### Counter

The **counter** input can be connected to a PLC/sensor output (NPN/PNP), push button, switch, relay, etc. This input counts the total number of pulses in time.

* The counter value is aggregated periodically (parameter `counter-interval-aggreg`), and the buffer of aggregated measurements is reported in a configurable interval (parameter `interval-report`).

* Both **NPN** and **PNP** type of input logic is supported (parameter `counter-input-type`).

* The minimum level duration is configured separately for **active** (parameter `counter-active-duration`) and **inactive** (parameter `counter-inactive-duration`) states.

### Voltage

The **voltage** input measures the voltage in the range from **0-28 V** (overlaps the **0-10 V** standard).

* The voltage readings are sampled periodically (parameter `analog-interval-sample`). These readings are stored as a **buffer of samples**.

* The collected samples are **aggregated** periodically (parameter `analog-interval-aggreg`). The minimum, maximum, average, and median aggregates are computed from the buffered samples. These aggregated results are referred to as **measurements**.

* Each **measurement** has an associated timestamp. The buffer **measurements** are transferred as time-series data regularly (parameter `interval-report`).

### Current

This input measures the analog current in the range from **0-24 mA** (overlaps the **4-20 mA** standard).

* The current readings are sampled periodically (parameter `analog-interval-sample`). These readings are stored as a **buffer of samples**.

* The collected samples are **aggregated** periodically (parameter `analog-interval-aggreg`). The minimum, maximum, average, and median aggregates are computed from the buffered samples. These aggregated results are referred to as **measurements**.

* Each **measurement** has an associated timestamp. The buffer **measurements** are transferred as time-series data regularly (parameter `interval-report`).

### Backup

**CHESTER Input Z** (equipped with **CHESTER-Z1**) can also report information on the backup battery and external DC power state.

* The current **battery voltage** and **external DC voltage** are sent in every report.

* When the DC power input changes, the timestamp of the change event is stored altogether with the **connected**/**disconnected** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report (parameter `interval-report`).

* Optionally, DC power input changes to the **connected** (parameter `backup-report-connected`) or **disconnected** (parameter `backup-report-disconnected`) states can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`) to allow capturing multiple consequent input changes.

* The maximum number of reports per hour is configurable (parameter `event-report-rate`). The event throttling limits communication bandwidth and preserves the battery lifespan.

### Hygrometer

The optional hygrometer in the **CHESTER Input** application represents an external temperature and humidity sensor.

* The readings are sampled regularly (parameter `hygro-interval-sample`). These readings are stored as a **buffer of samples**.

* The collected samples are **aggregated** periodically (parameter `hygro-interval-aggreg`). The minimum, maximum, average, and median aggregates are computed from the buffered samples. These aggregated results are referred to as **measurements**.

* Each **measurement** has an associated timestamp. The buffer **measurements** are transferred as time-series data regularly (parameter `interval-report`).

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-report 1800
app config event-report-delay 5
app config event-report-rate 30
app config backup-report-connected false
app config backup-report-disconnected false
app config trigger-input-type npn
app config trigger-active-duration 100
app config trigger-inactive-duration 100
app config trigger-cooldown-time 10
app config trigger-report-active false
app config trigger-report-inactive false
app config counter-interval-aggreg 300
app config counter-input-type npn
app config counter-active-duration 2
app config counter-inactive-duration 2
app config counter-cooldown-time 10
app config analog-interval-sample 60
app config analog-interval-aggreg 300
app config hygro-interval-sample 60
app config hygro-interval-aggreg 300
```

## Specific Commands

:::info

You can easily explore the whole command tree structure. Start with the `help` command.

:::

Use this command to set **report interval** (in seconds):

```
app config interval-report <value>
```

Use this command to configure a short delay (in seconds) between the **trigger** or **backup** event and its reporting:

```
app config event-report-delay <value>
```

:::tip

This feature is useful in systems where another change may arrive shortly after the first one.

:::

Use this command to limit the number of asynchronous **trigger** or **backup** event reports in a one-hour window:

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

Use these commands to set the input type for **trigger** and **counter** inputs. The valid values are `npn` or `pnp`:

```
app config trigger-input-type <npn/pnp>
app config counter-input-type <npn/pnp>
```

Use these commands to enable/disable **trigger** input to immediately report a change to **active** or **inactive** levels:

```
app config trigger-report-active <true/false>
app config trigger-report-inactive <true/false>
```

Use these commands to set the **active** and **inactive** time duration (in milliseconds) for the **trigger** and **counter** digital inputs:

```
app config trigger-active-duration <value>
app config trigger-inactive-duration <value>
app config trigger-cooldown-time <value>

app config counter-active-duration <value>
app config counter-inactive-duration <value>
app config counter-cooldown-time <value>
```

:::info

- The parameter `active-duration` sets the millisecond delay between the input signal changes to an active level (based on `npn` or `pnp` configuration) and when CHESTER reacts to this change. This could be used to filter (debounce) input signal in case the input signal is connected to a "electrically noisy" mechanical switch or relay. It could also be used if the CHESTER has to react to longer pulses than the set duration.
- The parameter `inactive-duration` is the same as for the `active-duration` above, except it sets the time for the opposite edge.
- The parameter `cooldown-time` is a delay protecting CHESTER from too many incoming interrupt events. If a too-fast signal (>10 kHz) is connected, the interrupt handler could consume all the processor time, stopping the execution of other threads. This parameter sets a small delay between executing the interrupt handler again. A default value of 10 ms could be used here.


:::

Use these commands to set the **sample** and **aggregate** intervals (in seconds) for **voltage** / **current** measurements:

```
app config analog-interval-sample <value>
app config analog-interval-aggreg <value>
```

Use these commands to set the **sample** and **aggregate** intervals (in seconds) for the optional **hygrometer** (the accessory **CHESTER-S2**):

```
app config hygro-interval-sample <value>
app config hygro-interval-aggreg <value>
```

## Firmware

The latest firmware is available in Catalog Applications [Firmware chapter](https://docs.hardwario.com/chester/catalog-applications/catalog-applications#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
```json
{
  "message": {
    "version": 1,
    "sequence": 7,
    "timestamp": 1670580791
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Input",
    "fw_version": "v1.0.0",
    "serial_number": "2159018247"
  },
  "system": {
    "uptime": 2058,
    "voltage_rest": 3.74,
    "voltage_load": 3.65,
    "current_load": 36
  },
  "backup": {
    "line_voltage": 24.21,
    "batt_voltage": 3.41,
    "state": "connected",
    "events": [
      {
        "timestamp": 1670580549,
        "type": "disconnected"
      },
      {
        "timestamp": 1670580552,
        "type": "connected"
      }
    ]
  },
  "network": {
    "imei": 351358815178303,
    "imsi": 901288003957939,
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
    "temperature": 23.06
  },
  "accelerometer": {
    "acceleration_x": 0.07,
    "acceleration_y": 0.38,
    "acceleration_z": 9.88,
    "orientation": 2
  },
  "trigger": {
    "state": "inactive",
    "events": [
      {
        "timestamp": 1670580550,
        "type": "activated"
      },
      {
        "timestamp": 1670580553,
        "type": "deactivated"
      },
      {
        "timestamp": 1670580631,
        "type": "activated"
      },
      {
        "timestamp": 1670580634,
        "type": "deactivated"
      }
    ]
  },
  "counter": {
    "value": 12586,
    "measurements": [
      {
        "timestamp": 1670580548,
        "value": 12526
      },
      {
        "timestamp": 1670580698,
        "value": 12583
      }
    ]
  },
  "voltage": {
    "measurements": [
      {
        "timestamp": 1670580548,
        "min": 11.27,
        "max": 11.35,
        "avg": 11.31,
        "mdn": 11.35
      },
      {
        "timestamp": 1670580698,
        "min": 11.26,
        "max": 11.35,
        "avg": 11.29,
        "mdn": 11.27
      }
    ]
  },
  "current": {
    "measurements": [
      {
        "timestamp": 1670580548,
        "min": 10.55,
        "max": 10.91,
        "avg": 10.73,
        "mdn": 10.91
      },
      {
        "timestamp": 1670580698,
        "min": 10.51,
        "max": 10.91,
        "avg": 10.66,
        "mdn": 10.55
      }
    ]
  },
  "hygrometer": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1670580548,
          "min": 22.99,
          "max": 23.02,
          "avg": 23.01,
          "mdn": 23.02
        },
        {
          "timestamp": 1670580698,
          "min": 23.02,
          "max": 23.08,
          "avg": 23.05,
          "mdn": 23.06
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1670580548,
          "min": 49.66,
          "max": 49.74,
          "avg": 49.7,
          "mdn": 49.74
        },
        {
          "timestamp": 1670580698,
          "min": 49.62,
          "max": 50.07,
          "avg": 49.84,
          "mdn": 49.82
        }
      ]
    }
  }
}
```

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

```json
{
  "voltage": 3.6,
  "channels": [
    {
      "id": 0,
      "state": true,
      "count": 100
    },
    {
      "id": 1,
      "state": false,
      "count": 5
    }
  ]
}
```
    
  </TabItem>
</Tabs>

