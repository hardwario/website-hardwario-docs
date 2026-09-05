---
slug: chester-meteo
title: CHESTER Meteo
---
import Image from '@theme/IdealImage';

# CHESTER Meteo

This article describes the core functionality, hardware description, and example **JSON** message of the catalog application **CHESTER Meteo**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](/chester/category/platform-connectivity/) on how to work with the interactive console.

:::


## Application Overview

**CHESTER Meteo** is a wind and environmental sensor that samples, aggregates, and sends measured variables.

The catalog application **CHESTER Meteo** measures:
- Wind speed (m/s)
- Wind direction (0-360°)
- Rainfall (mm)
- Atmospheric pressure (Pa)
- Temperature (°C)
- Humidity (%RH)

## Application Variants

**CHESTER Meteo** can be ordered in one of these variants:

### CHESTER Meteo {#chester-meteo}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X0B:A`: Input module (4 channels)
* `CHESTER-S2`: External hygrometer
* External barometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update meteo --variant "CHESTER Meteo"`

### CHESTER Meteo Z

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X0B:A`: Input module (4 channels)
* `CHESTER-Z1`: Backup module
* `CHESTER-S2`: External hygrometer
* External barometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

Firmware build variant: `west chester-update meteo --variant "CHESTER Meteo Z"`

## Measurement and Behavior

- All sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval. Minimum, maximum, average, and median are computed from buffered samples for each sensor (parameter `interval-aggreg`).
- Each aggregated values have its timestamps and are sent in a batch in a report interval period (parameter `interval-report`).

### Wind speed

Wind speed is measured continuously between samples (`interval-sample`). Every wind speed sample is an average wind speed between two samples. On every aggregation (`interval-aggreg`) these samples are aggregated, and minimum, maximum, average, and median are computed from buffered samples.

With this continuous measurement, you can accurately get minimal, maximal, and average wind speed from every aggregation.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
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

Command to read **current values** for **testing purposes**:

```
meteo read ctr_meteo_a
```

## Firmware

The latest firmware is available in Catalog Applications [Firmware chapter](index.md#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
In each structure with the current configuration, there are six aggregated values. Each aggregated value has its timestamp and is computed from multiple samples, and `min`, `max`, `avg`, and `mdn` values are calculated.

Wind speed is in **meters per second**.

Pressure is in **pascals**.

<details>
<summary><b>Show JSON Example</b></summary>
<p>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1675784614
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Meteo",
    "fw_version": "v2.0.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 361,
    "voltage_rest": 3.6,
    "voltage_load": 3.56,
    "current_load": 35
  },
  "backup": {
    "line_voltage": 24.21,
    "batt_voltage": 3.41,
    "state": "connected",
    "events": [
      {
        "timestamp": 1675784338,
        "type": "disconnected"
      },
      {
        "timestamp": 1675784518,
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
      "rsrp": -83,
      "rsrq": -4,
      "snr": 14,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 21.37
  },
  "accelerometer": {
    "acceleration_x": -0.23,
    "acceleration_y": 0.07,
    "acceleration_z": 9.49,
    "orientation": 2
  },
  "weather_station": {
    "wind_speed": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 0,
          "max": 4,
          "avg": 2.78,
          "mdn": 2.8
        },
        {
          "timestamp": 1675784398,
          "min": 3.91,
          "max": 4.13,
          "avg": 4,
          "mdn": 4
        },
        {
          "timestamp": 1675784458,
          "min": 3.86,
          "max": 4.13,
          "avg": 4.03,
          "mdn": 4
        },
        {
          "timestamp": 1675784518,
          "min": 3.86,
          "max": 4.13,
          "avg": 4.03,
          "mdn": 4
        },
        {
          "timestamp": 1675784578,
          "min": 4,
          "max": 4.26,
          "avg": 4.13,
          "mdn": 4.13
        }
      ]
    },
    "wind_direction": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "value": 0
        },
        {
          "timestamp": 1675784398,
          "value": 0
        },
        {
          "timestamp": 1675784458,
          "value": 0
        },
        {
          "timestamp": 1675784518,
          "value": 7
        },
        {
          "timestamp": 1675784578,
          "value": 45
        }
      ]
    },
    "rainfall": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "value": 0
        },
        {
          "timestamp": 1675784398,
          "value": 0
        },
        {
          "timestamp": 1675784458,
          "value": 0
        },
        {
          "timestamp": 1675784518,
          "value": 2.79
        },
        {
          "timestamp": 1675784578,
          "value": 2.79
        }
      ]
    }
  },
  "barometer": {
    "pressure": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 98070,
          "max": 98075,
          "avg": 98072,
          "mdn": 98073
        },
        {
          "timestamp": 1675784398,
          "min": 98071,
          "max": 98078,
          "avg": 98072,
          "mdn": 98074
        },
        {
          "timestamp": 1675784458,
          "min": 98070,
          "max": 98070,
          "avg": 98070,
          "mdn": 98070
        },
        {
          "timestamp": 1675784518,
          "min": 98071,
          "max": 98078,
          "avg": 98072,
          "mdn": 98074
        },
        {
          "timestamp": 1675784578,
          "min": 98070,
          "max": 98075,
          "avg": 98072,
          "mdn": 98073
        }
      ]
    },
  },
  "hygrometer": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 21.53,
          "max": 21.67,
          "avg": 21.59,
          "mdn": 21.6
        },
        {
          "timestamp": 1675784398,
          "min": 21.44,
          "max": 21.56,
          "avg": 21.51,
          "mdn": 21.53
        },
        {
          "timestamp": 1675784458,
          "min": 21.47,
          "max": 21.67,
          "avg": 21.53,
          "mdn": 21.52
        },
        {
          "timestamp": 1675784518,
          "min": 21.43,
          "max": 21.58,
          "avg": 21.49,
          "mdn": 21.5
        },
        {
          "timestamp": 1675784578,
          "min": 21.39,
          "max": 21.57,
          "avg": 21.47,
          "mdn": 21.44
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 38.86,
          "max": 39.04,
          "avg": 38.95,
          "mdn": 38.95
        },
        {
          "timestamp": 1675784398,
          "min": 38.93,
          "max": 39.14,
          "avg": 39.04,
          "mdn": 39.07
        },
        {
          "timestamp": 1675784458,
          "min": 38.85,
          "max": 39.15,
          "avg": 39.02,
          "mdn": 39.02
        },
        {
          "timestamp": 1675784518,
          "min": 38.89,
          "max": 39.15,
          "avg": 39.08,
          "mdn": 39.08
        },
        {
          "timestamp": 1675784578,
          "min": 38.88,
          "max": 39.11,
          "avg": 39.02,
          "mdn": 39.03
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 170694685,
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 21.93,
          "max": 22.06,
          "avg": 22,
          "mdn": 22
        },
        {
          "timestamp": 1675784398,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.13,
          "mdn": 22.12
        },
        {
          "timestamp": 1675784458,
          "min": 22.12,
          "max": 22.12,
          "avg": 22.12,
          "mdn": 22.12
        },
        {
          "timestamp": 1675784518,
          "min": 22.12,
          "max": 22.12,
          "avg": 22.12,
          "mdn": 22.12
        },
        {
          "timestamp": 1675784578,
          "min": 22.12,
          "max": 22.12,
          "avg": 22.12,
          "mdn": 22.12
        }
      ]
    }
  ],
  "soil_sensors": [
    {
      "serial_number": 203181,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1675784338,
            "min": 22,
            "max": 22.06,
            "avg": 22.03,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784398,
            "min": 22.06,
            "max": 22.12,
            "avg": 22.07,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784458,
            "min": 22.06,
            "max": 22.12,
            "avg": 22.07,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784518,
            "min": 22,
            "max": 22.06,
            "avg": 22.03,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784578,
            "min": 22,
            "max": 22.06,
            "avg": 22.03,
            "mdn": 22.06
          }
        ]
      },
      "moisture": {
        "measurements": [
          {
            "timestamp": 1675784338,
            "min": 6256,
            "max": 6288,
            "avg": 6272,
            "mdn": 6272
          },
          {
            "timestamp": 1675784398,
            "min": 6272,
            "max": 6288,
            "avg": 6278,
            "mdn": 6272
          },
          {
            "timestamp": 1675784458,
            "min": 6272,
            "max": 6304,
            "avg": 6280,
            "mdn": 6272
          },
          {
            "timestamp": 1675784518,
            "min": 6256,
            "max": 6304,
            "avg": 6268,
            "mdn": 6272
          },
          {
            "timestamp": 1675784578,
            "min": 6256,
            "max": 6304,
            "avg": 6268,
            "mdn": 6272
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
  "voltage_rest": 3.7,
  "voltage_load": 3.65,
  "current_load": 18,
  "orientation": 2,
  "therm_temperature": 19.5,
  "hygro_temperature": 19.2,
  "hygro_humidity": 60.5,
  "wind_speed": 2.5,
  "wind_direction": 180,
  "rainfall": 2.0,
  "barometer": 101325,
  "w1_thermometers": [18.5, 19.0],
  "ble_tags": [
    {
      "temperature": 20.0,
      "humidity": 58.0
    }
  ],
  "soil_sensors": [
    {
      "temperature": 15.5,
      "moisture": 450
    }
  ]
}
```

</p>
</details>

  </TabItem>
</Tabs>

---

## Changelog

### v3.5.1 – 2025-12-08

- **Added**: New variant: **CHESTER Meteo M** (Modbus RTU, supports Lambrecht and Sensecap/OPM sensors; sensor type selectable via `meteo-type`)
- **Added**: Soil sensor support: moisture and temperature via Modbus soil probes
- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Improved**: Pyranometer (solar irradiance) support

### v3.5.0 – 2025-12-03

- **Added**: Soil sensor support: moisture and temperature measurement via 1-Wire soil probes (`soil_sensors` in JSON output)
- **Added**: New variant: **CHESTER Meteo P** with pyranometer input for solar irradiance measurement
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); previous Cloud v1 firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
