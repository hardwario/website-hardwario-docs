---
slug: chester-clime
title: CHESTER Clime
---
import Image from '@theme/IdealImage';

# CHESTER Clime

This article describes the core functionality, hardware description, and example **JSON** message of the catalog application **CHESTER Clime**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](/chester/category/platform-connectivity/) on how to work with the interactive console.

:::

## Application Overview

**CHESTER Clime** is an environmental sensor that samples, aggregates, and sends measured variables.

## Application Variants

**CHESTER Clime** can be ordered in one of these variants:

### CHESTER Clime {#chester-clime}

The catalog application **CHESTER Clime** measures:
- Temperature
- Humidity

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S2`: External hygrometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime"`

### CHESTER Clime Z

The catalog application **CHESTER Clime Z** measures:
- Temperature
- Humidity

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-Z1`: Backup module
* `CHESTER-S2`: External hygrometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime"` (CHESTER-Z backup support is built into the base **CHESTER Clime** firmware)

### CHESTER Clime IAQ

The catalog application **CHESTER Clime IAQ** measures:
- Temperature
- Humidity
- Illuminance
- CO₂ concentration
- Atmospheric pressure
- Motion detection with PIR sensor

Also, the application reports **push-button events** and provides **acoustic** and **optical feedback**.
The **button LED** color also **signalizes CO₂ concentration levels**.

:::caution

CHESTER IAQ sends in default the configuration about 800 bytes of data. If you increase the report interval without increasing also aggregation interval,
the data buffer might be bigger than the UDP MTU and the packet will not be sent. Device then appears like it is not sending or sends only a fraction of packets.

:::

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S1-BCMP`: Integrated multi-sensor
* `CHESTER-X10`: External power 6-28V with Li-Ion battery
* `CHESTER-E7-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime IAQ"`



### CHESTER Clime 1W

The catalog application **CHESTER Clime 1W** supports multiple external DS18B20 1-Wire temperature sensors.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-E8-LP`: Enclosure with 8 cable glands (RM8L-4S)

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime"` (DS18B20 1-Wire support is built into the base **CHESTER Clime** firmware)

### CHESTER Clime 1WH

The catalog application **CHESTER Clime 1WH** supports **CHESTER-S2** + multiple external DS18B20 1-Wire temperature sensors.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S2`: External hygrometer
* `CHESTER-E8-LP`: Enclosure with 8 cable glands (RM8L-4S)

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime"` (DS18B20 1-Wire and CHESTER-S2 support is built into the base **CHESTER Clime** firmware)

### CHESTER Clime RTD

The catalog application **CHESTER Clime RTD** supports two external Pt1000 4-wire temperature sensors.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3A:A`: 2x Pt100/Pt1000 interface
* `CHESTER-E13-LP`: Enclosure with SMA pigtail and 2 cable PG7 glands

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime RTD"`

### CHESTER Clime TC

The catalog application **CHESTER Clime TC** supports two external **type K** thermocouple sensors.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3B:A`: 2x Type K thermocouple interface
* `CHESTER-E13-LP`: Enclosure with SMA pigtail and 2 cable PG7 glands

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update clime --variant "CHESTER Clime TC"`

## Measurement and Behavior

- All sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval. Minimum, maximum, average, and median are computed from buffered samples for each sensor (parameter `interval-aggreg`).
- Each aggregated values have its timestamps and are sent in a batch in a report interval period (parameter `interval-report`).

:::caution

CHESTER Clime sends in default the configuration about 500 bytes of data. If you increase the report interval without increasing also aggregation interval,
the data buffer might be bigger than the UDP MTU and the packet will not be sent. Device then appears like it is not sending or sends only a fraction of packets.

:::

When equipped with **CHESTER-S1**. The device also has a push button. When the button is pressed, the blue LED turns on for a second. Also, the **beep sound** is played from the integrated acoustic buzzer for audible confirmation of the push button press.

Also, the button on the optional **CHESTER-S1** by its color reports the state of the CO₂ by **green** (levels are ok), **orange** (warning) and **red** (alarm) thresholds. The button blinks shortly every 5 seconds when powered from a battery and it is permanently on when external power on X10 is applied. Threshold **levels** and **hysteresis** are **configurable**.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

Default configuration for hygrometer alarms:

```
app config hygro-t-alarm-hi-report false
app config hygro-t-alarm-lo-report false
app config hygro-t-alarm-hi-thr 0.0
app config hygro-t-alarm-hi-hst 0.0
app config hygro-t-alarm-lo-thr 0.0
app config hygro-t-alarm-lo-hst 0.0
```

When equipped with **backup** (CHESTER-Z1) or **hygrometer** (CHESTER-S2):

```
app config event-report-delay 1
app config event-report-rate 30
```

When equipped with **IAQ** (CHESTER-S1) you can change CO₂ thresholds and hysteresis which are signalized by button LED color:

```
app config iaq-led-thr-warning 800.0
app config iaq-led-thr-alarm 1600.0
app config iaq-led-hst 50.0
```

When equipped with **backup** (CHESTER-Z1) or **external power** (CHESTER-X10), you can immediately report changes of the external power events:

```
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

Command to set **sample interval** in seconds:

```
app config interval-sample <1-86400>
```

Command to set **aggregate interval** in seconds:

```
app config interval-aggreg <1-86400>
```

Command to set **report interval** in seconds:

```
app config interval-report <30-86400>
```

Command to enable hygrometer high/low temperature **alarm reports**:

```
app config hygro-t-alarm-hi-report false
app config hygro-t-alarm-lo-report false
```

Command to set hygrometer high/low temperature **thresholds** in **°C**:

```
app config hygro-t-alarm-hi-thr <-40.0..125.0>
app config hygro-t-alarm-lo-thr <-40.0..125.0>
```

Command to set hygrometer high/low temperature **hysteresis** in **°C**:

```
app config hygro-t-alarm-hi-hst <0.0..100.0>
app config hygro-t-alarm-lo-hst <0.0..100.0>
```

Command to set the **delay between the event and report** in seconds (temperature alarm, backup state change):

```
app config event-report-delay <1-86400>
```

Command to set the **report rate** in reports per hour (just for event reports, periodic reports are not counter to this limit):

```
app config event-report-rate <1-3600>
```

## Firmware

The latest firmware is available in the Catalog Applications [Firmware chapter](index.md#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    In this example **JSON** you can see data from all three variants

- **CHESTER Clime** has its own `hygrometer` structure.
- **CHESTER Clime IAQ**  has its own `iaq_sensor` structure.
- **CHESTER Clime 1W** has its own `w1_thermometers` structure.
- **CHESTER Clime RTD** has its own `rtd_thermometers` structure.
- **CHESTER Clime** with **backup** option (CHESTER-Z1 or CHESTER-X10) has `backup` with external and internal voltages, state and events.

Backup **events** are:
* `connected`
* `disconnected`

Hygrometer **events** are:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

In each structure with the current configuration, there are six aggregated values. Each aggregated value has its timestamp and is computed from multiple samples, and `min`, `max`, `avg`, and `mdn` values are calculated.

<details>
<summary><b>Show JSON Example</b></summary>
<p>

```json
{
  "message": {
    "version": 1,
    "sequence": 0,
    "timestamp": 1668859482
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Clime",
    "fw_version": "v1.4.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 680967,
    "voltage_rest": 3.7,
    "voltage_load": 3.66,
    "current_load": 36
  },
  "backup": {
      "line_voltage": 24.01,
      "batt_voltage": 4.09,
      "state": "connected",
      "events": [
          {
              "timestamp": 1668858942,
              "type": "connected"
          }
      ]
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
    "acceleration_x": 0.07,
    "acceleration_y": -0.16,
    "acceleration_z": 9.65,
    "orientation": 2
  },
  "iaq_sensor": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.5,
          "max": 22.54,
          "avg": 22.51,
          "mdn": 22.52
        },
        {
          "timestamp": 1668858042,
          "min": 22.49,
          "max": 22.5,
          "avg": 22.49,
          "mdn": 22.49
        },
        {
          "timestamp": 1668858342,
          "min": 22.47,
          "max": 22.48,
          "avg": 22.47,
          "mdn": 22.47
        },
        {
          "timestamp": 1668858642,
          "min": 22.47,
          "max": 22.49,
          "avg": 22.48,
          "mdn": 22.48
        },
        {
          "timestamp": 1668858942,
          "min": 22.46,
          "max": 22.5,
          "avg": 22.48,
          "mdn": 22.48
        },
        {
          "timestamp": 1668859242,
          "min": 22.45,
          "max": 22.47,
          "avg": 22.46,
          "mdn": 22.47
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 55.19,
          "max": 55.91,
          "avg": 55.52,
          "mdn": 55.53
        },
        {
          "timestamp": 1668858042,
          "min": 55.84,
          "max": 56.5,
          "avg": 56.14,
          "mdn": 56.07
        },
        {
          "timestamp": 1668858342,
          "min": 56.01,
          "max": 56.2,
          "avg": 56.09,
          "mdn": 56.07
        },
        {
          "timestamp": 1668858642,
          "min": 55.55,
          "max": 56.1,
          "avg": 55.79,
          "mdn": 55.74
        },
        {
          "timestamp": 1668858942,
          "min": 55.39,
          "max": 55.86,
          "avg": 55.6,
          "mdn": 55.59
        },
        {
          "timestamp": 1668859242,
          "min": 55.1,
          "max": 56.29,
          "avg": 55.69,
          "mdn": 55.61
        }
      ]
    },
    "illuminance": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 4,
          "max": 5,
          "avg": 4,
          "mdn": 4
        },
        {
          "timestamp": 1668858042,
          "min": 4,
          "max": 6,
          "avg": 4,
          "mdn": 5
        },
        {
          "timestamp": 1668858342,
          "min": 5,
          "max": 5,
          "avg": 5,
          "mdn": 5
        },
        {
          "timestamp": 1668858642,
          "min": 4,
          "max": 6,
          "avg": 5,
          "mdn": 5
        },
        {
          "timestamp": 1668858942,
          "min": 5,
          "max": 7,
          "avg": 5,
          "mdn": 6
        },
        {
          "timestamp": 1668859242,
          "min": 4,
          "max": 5,
          "avg": 4,
          "mdn": 5
        }
      ]
    },
    "altitude": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668858042,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        },
        {
          "timestamp": 1668858342,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        },
        {
          "timestamp": 1668858642,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668858942,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668859242,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        }
      ]
    },
    "pressure": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 98419,
          "max": 98425,
          "avg": 98422,
          "mdn": 98423
        },
        {
          "timestamp": 1668858042,
          "min": 98415,
          "max": 98418,
          "avg": 98416,
          "mdn": 98416
        },
        {
          "timestamp": 1668858342,
          "min": 98412,
          "max": 98417,
          "avg": 98414,
          "mdn": 98415
        },
        {
          "timestamp": 1668858642,
          "min": 98417,
          "max": 98422,
          "avg": 98419,
          "mdn": 98418
        },
        {
          "timestamp": 1668858942,
          "min": 98416,
          "max": 98421,
          "avg": 98419,
          "mdn": 98421
        },
        {
          "timestamp": 1668859242,
          "min": 98416,
          "max": 98422,
          "avg": 98419,
          "mdn": 98420
        }
      ]
    },
    "co2_conc": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 400
        },
        {
          "timestamp": 1668858042,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        },
        {
          "timestamp": 1668858342,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 400
        },
        {
          "timestamp": 1668858642,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        },
        {
          "timestamp": 1668858942,
          "min": 398,
          "max": 399,
          "avg": 398,
          "mdn": 399
        },
        {
          "timestamp": 1668859242,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        }
      ]
    },
    "motion_count": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "value": 0
        },
        {
          "timestamp": 1668858042,
          "value": 0
        },
        {
          "timestamp": 1668858342,
          "value": 0
        },
        {
          "timestamp": 1668858642,
          "value": 0
        },
        {
          "timestamp": 1668858942,
          "value": 0
        },
        {
          "timestamp": 1668859242,
          "value": 0
        }
      ]
    },
    "press_count": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "value": 0
        },
        {
          "timestamp": 1668858042,
          "value": 0
        },
        {
          "timestamp": 1668858342,
          "value": 0
        },
        {
          "timestamp": 1668858642,
          "value": 0
        },
        {
          "timestamp": 1668858942,
          "value": 0
        },
        {
          "timestamp": 1668859242,
          "value": 0
        }
      ]
    }
  },
  "hygrometer": {
    "temperature": {
      "events": [
        {
          "timestamp": 1668858343,
          "type": "alarm_lo_deactivated",
          "value": 20.94
        }
      ],
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.07,
          "max": 22.25,
          "avg": 22.17,
          "mdn": 22.16
        },
        {
          "timestamp": 1668858042,
          "min": 22.05,
          "max": 22.23,
          "avg": 22.15,
          "mdn": 22.15
        },
        {
          "timestamp": 1668858342,
          "min": 22.04,
          "max": 22.16,
          "avg": 22.09,
          "mdn": 22.07
        },
        {
          "timestamp": 1668858642,
          "min": 22.08,
          "max": 22.19,
          "avg": 22.11,
          "mdn": 22.09
        },
        {
          "timestamp": 1668858942,
          "min": 22.07,
          "max": 22.16,
          "avg": 22.12,
          "mdn": 22.12
        },
        {
          "timestamp": 1668859242,
          "min": 22.07,
          "max": 22.15,
          "avg": 22.12,
          "mdn": 22.14
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 54.78,
          "max": 55.31,
          "avg": 55.1,
          "mdn": 55.12
        },
        {
          "timestamp": 1668858042,
          "min": 55.12,
          "max": 56.16,
          "avg": 55.55,
          "mdn": 55.52
        },
        {
          "timestamp": 1668858342,
          "min": 55.24,
          "max": 55.56,
          "avg": 55.41,
          "mdn": 55.4
        },
        {
          "timestamp": 1668858642,
          "min": 54.89,
          "max": 56.03,
          "avg": 55.33,
          "mdn": 55.2
        },
        {
          "timestamp": 1668858942,
          "min": 54.75,
          "max": 56.73,
          "avg": 55.39,
          "mdn": 54.98
        },
        {
          "timestamp": 1668859242,
          "min": 54.91,
          "max": 55.83,
          "avg": 55.26,
          "mdn": 55.18
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 170787196,
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.18,
          "max": 22.25,
          "avg": 22.23,
          "mdn": 22.25
        },
        {
          "timestamp": 1668858042,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858342,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858642,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.17,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858942,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668859242,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        }
      ]
    }
  ],
  "rtd_thermometers": [
    {
      "channel": 1,
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.18,
          "max": 22.25,
          "avg": 22.23,
          "mdn": 22.25
        },
        {
          "timestamp": 1668858042,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858342,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858642,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.17,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858942,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668859242,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        }
      ]
    },
    {
      "channel": 2,
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.18,
          "max": 22.25,
          "avg": 22.23,
          "mdn": 22.25
        },
        {
          "timestamp": 1668858042,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858342,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858642,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.17,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858942,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668859242,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        }
      ]
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
            "timestamp": 1668857742,
            "min": 54.78,
            "max": 55.31,
            "avg": 55.1,
            "mdn": 55.12
          },
          {
            "timestamp": 1668858042,
            "min": 55.12,
            "max": 56.16,
            "avg": 55.55,
            "mdn": 55.52
          }
        ]
      },
      "temperature": {
        "measurements": [
          {
            "timestamp": 1668857742,
            "min": 22.18,
            "max": 22.25,
            "avg": 22.23,
            "mdn": 22.25
          },
          {
            "timestamp": 1668858042,
            "min": 22.18,
            "max": 22.18,
            "avg": 22.18,
            "mdn": 22.18
          }
        ]
      }
    },
    {
      "addr": "BA0987654321",
      "rssi": -77,
      "voltage": 3.11,
      "humidity": {
        "measurements": [
          {
            "timestamp": 1668857742,
            "min": 54.78,
            "max": 55.31,
            "avg": 55.1,
            "mdn": 55.12
          },
          {
            "timestamp": 1668858042,
            "min": 55.12,
            "max": 56.16,
            "avg": 55.55,
            "mdn": 55.52
          }
        ]
      },
      "temperature": {
        "measurements": [
          {
            "timestamp": 1668857742,
            "min": 22.18,
            "max": 22.25,
            "avg": 22.23,
            "mdn": 22.25
          },
          {
            "timestamp": 1668858042,
            "min": 22.18,
            "max": 22.18,
            "avg": 22.18,
            "mdn": 22.18
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
  "hygro_temperature": 22.3,
  "hygro_humidity": 45.1
}
```

</p>
</details>

  </TabItem>
</Tabs>

---

## Changelog

### v3.5.4 – 2026-04-14

- **Changed**: Runtime CHESTER-Z detection, so a single firmware now works with or without the CHESTER-Z module; separate **CHESTER Clime Z** variant removed
- **Fixed**: Build failure for IAQ variant when both CHESTER-Z and CHESTER-X10 features are enabled simultaneously

### v3.5.1 – 2025-12-08

- **Added**: New variants: **CHESTER Clime SPS30** (particulate matter: PM1/PM2.5/PM10) and **CHESTER Clime Radon** (radon gas concentration)
- **Added**: New variant: **CHESTER Clime TC** for two external Type K thermocouple sensors (via CHESTER-X3B)
- **Improved**: DS18B20 1-Wire thermometer support, with improved reliability and cleaner multi-sensor handling
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); Cloud v1 variants remain available in a separate firmware table
- **Changed**: Single combined firmware binary for both LTE and LoRaWAN; network selected via `app config mode lte` / `app config mode lrw`
- **Removed**: Clime 1W and Clime 1WH variants dropped from Cloud v2 firmware builds (remain available under Cloud v1)

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
