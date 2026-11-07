---
title: CHESTER Meteo
description: "Firmware of the CHESTER Meteo catalog application: what it measures and sends, every configuration parameter with its default, and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Meteo

The **CHESTER Meteo** firmware turns CHESTER into a weather station. It samples wind speed and direction, rainfall, atmospheric pressure, temperature and humidity, aggregates the samples and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. Variants built for other hardware have their own pages, which list only what they change: [**CHESTER Meteo Z**](chester-meteo-z.md), [**CHESTER Meteo P**](chester-meteo-p.md) and [**CHESTER Meteo M**](chester-meteo-m.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER Meteo**](../../catalog-applications/chester-meteo/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-X0** input module in slot A with an analog rain gauge, anemometer and wind vane (see the table below)
- an external **barometer** with the NXP MPL3115A2 sensor (atmospheric pressure)
- the **CHESTER-S2** external hygrometer (temperature and humidity)
- **DS18B20** 1-Wire thermometers, up to 10
- 1-Wire **soil sensors** (temperature and moisture), up to 10
- Bluetooth sensor tags (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

The weather sensors connect to the channels of CHESTER-X0:

| Channel | Sensor | Measurement |
| :--- | :--- | :--- |
| 1 | Rain gauge with a pulse output | Each pulse adds 0.2794 mm of rain |
| 2 | Anemometer with a pulse output | One pulse per second equals 2.4 km/h |
| 3 | Wind vane | 16 directions in steps of 22.5° |
| 4 | Wind vane supply | Switched on only while the direction is read |

## Measurement and Behavior

- All sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval. Minimum, maximum, average, and median are computed from buffered samples for each sensor (parameter `interval-aggreg`).
- Each aggregated value has its timestamp; the values are sent in a batch every report interval (parameter `interval-report`). In firmware v4.0.1 the time between two reports varies at random by up to ±20 %.

The firmware keeps at most 32 samples per aggregation interval and 32 aggregated values per report (16 for Bluetooth tags) and drops readings over these limits. Keep the ratio of `interval-aggreg` to `interval-sample` and of `interval-report` to `interval-aggreg` within them.

### Wind Speed

Wind speed is measured continuously between samples (`interval-sample`). Every wind speed sample is an average wind speed between two samples. On every aggregation (`interval-aggreg`) these samples are aggregated, and minimum, maximum, average, and median are computed from buffered samples.

With this continuous measurement, you can accurately get minimal, maximal, and average wind speed from every aggregation.

### Wind Direction

The wind direction is read at every sample. Each aggregated value is the vector average of the samples in the aggregation interval, in degrees from north (90° is east), so the report has one `value` per interval instead of `min`, `max`, `avg` and `mdn`. If no direction could be read during the interval, firmware v4.0.1 sends `0` instead of `null`.

### Rainfall

The firmware counts the rain gauge pulses continuously. At every aggregation, it stores the rainfall since the previous aggregation in millimeters and starts counting again from zero, so each `value` is the rainfall of one aggregation interval.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Delay between an event and its report in seconds (temperature alarm) |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Event reports per hour at most (firmware v4.0.1 sends up to one more); periodic reports do not count toward this limit |
| `hygro_t_alarm_hi_report` | Hygro t alarm hi report | `true`, `false` | `false` | Report when the hygrometer temperature crosses the high threshold |
| `hygro_t_alarm_hi_thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | High temperature threshold in °C |
| `hygro_t_alarm_hi_hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | High temperature hysteresis in °C |
| `hygro_t_alarm_lo_report` | Hygro t alarm lo report | `true`, `false` | `false` | Report when the hygrometer temperature crosses the low threshold |
| `hygro_t_alarm_lo_thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Low temperature threshold in °C |
| `hygro_t_alarm_lo_hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Low temperature hysteresis in °C |
| `meteo-type` | Meteo type | `none`, `lambrecht`, `sensecap-s1000`, `sensecap-s500` | `none` | CHESTER Meteo M: type of the Modbus weather station |
| `meteo-addr` | Meteo addr | `<1-247>` | `1` | CHESTER Meteo M: Modbus address of the weather station |
| `pm-type` | Pm type | `none`, `cubic-6303` | `none` | CHESTER Meteo M: type of the Modbus particulate matter sensor |
| `pm-addr` | Pm addr | `<1-247>` | `1` | CHESTER Meteo M: Modbus address of the particulate matter sensor |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `9600` | CHESTER Meteo M: Modbus baud rate |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even`, `mark`, `space` | `none` | CHESTER Meteo M: Modbus parity |
| `modbus-stop-bits` | Modbus stop bits | `0_5`, `1`, `1_5`, `2` | `1` | CHESTER Meteo M: Modbus stop bits |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | CHESTER Meteo M: not used by firmware v4.0.1 |

The `event-report-*` and `hygro_t_alarm_*` parameters take effect only with the CHESTER-S2 hygrometer. The `meteo-type`, `meteo-addr`, `pm-type`, `pm-addr` and `modbus-*` parameters exist in every CHESTER Meteo build, but only [**CHESTER Meteo M**](chester-meteo-m.md) has the Modbus interface that uses them; its page explains them.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the sensors now |
| `aggreg` | Aggregate the samples now |
| `send` | Send the data now |
| `sensors_read` | Read the barometer, the weather sensors and the hygrometer and print the values |
| `meteo read ctr_meteo_a` | Read the rain gauge, the anemometer and the wind vane and print the values, for testing |

:::caution

`sensors_read` and `meteo read` reset the counters of the rain gauge and the anemometer. The rain counted until then is missing from the next report, and the next wind speed sample covers only the time since the command.

:::

## Firmware Build

- **Firmware:** [hio-chester-meteo:v4.0.1](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `60a5b9b6cddf40659d47cf125e123f86`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86/hex), SHA256 `ffcf25780f04c6fc6bfe399cf68a8ee7f16e903d5616b762d9389af9e2718963`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86/bin), SHA256 `19c925516556e3a50c18f0b6461bdd891c2118f8ed813cca7551fa0038f13a76`
- **Build from the SDK:** `west chester-update meteo --variant "CHESTER Meteo"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-meteo/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report of the main firmware v4.0.1 as HARDWARIO Cloud decodes it, with the weather sensors, the barometer, a CHESTER-S2 hygrometer, one DS18B20 thermometer, one soil sensor and no Bluetooth tag:

- `weather_station`: wind speed in m/s, wind direction in degrees and rainfall in mm
- `barometer`: atmospheric pressure in Pa
- `hygrometer`: temperature and humidity from CHESTER-S2, with the alarm events since the previous report
- `w1_thermometers`: one entry for each DS18B20 thermometer
- `soil_sensors`: one entry for each soil sensor, with the temperature in °C and the moisture as a raw value of the sensor
- `ble_tags`: one entry for each paired Bluetooth tag, an empty list here

Hygrometer **events** are:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

In the example, `interval-report` is set to `600`, so each `measurements` list has two entries; with the default `1800` it has six. Each entry has its timestamp and the `min`, `max`, `avg` and `mdn` of the samples; wind direction and rainfall have a single `value` for each aggregation interval.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 36,
    "timestamp": 1793606459
  },
  "system": {
    "uptime": 21731,
    "voltage_rest": 3.61,
    "voltage_load": 3.57,
    "current_load": 35
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "BCGLS",
    "hw_revision": "R3.4",
    "fw_version": "v4.0.1",
    "serial_number": "2159018267"
  },
  "network": {
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
    "temperature": 18.37
  },
  "accelerometer": {
    "acceleration_x": -0.23,
    "acceleration_y": 0.07,
    "acceleration_z": 9.49,
    "orientation": 2
  },
  "w1_thermometers": [
    {
      "serial_number": 170694685,
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 17.12,
          "max": 17.31,
          "avg": 17.22,
          "mdn": 17.25
        },
        {
          "timestamp": 1793606412,
          "min": 17.25,
          "max": 17.43,
          "avg": 17.33,
          "mdn": 17.31
        }
      ]
    }
  ],
  "barometer": {
    "pressure": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 98071,
          "max": 98078,
          "avg": 98074,
          "mdn": 98074
        },
        {
          "timestamp": 1793606412,
          "min": 98066,
          "max": 98073,
          "avg": 98069,
          "mdn": 98070
        }
      ]
    }
  },
  "hygrometer": {
    "temperature": {
      "events": [],
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 18.04,
          "max": 18.21,
          "avg": 18.12,
          "mdn": 18.11
        },
        {
          "timestamp": 1793606412,
          "min": 18.15,
          "max": 18.33,
          "avg": 18.24,
          "mdn": 18.23
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 71.12,
          "max": 71.86,
          "avg": 71.45,
          "mdn": 71.41
        },
        {
          "timestamp": 1793606412,
          "min": 70.65,
          "max": 71.24,
          "avg": 70.98,
          "mdn": 71.02
        }
      ]
    }
  },
  "soil_sensors": [
    {
      "serial_number": 203181,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1793606112,
            "min": 15.43,
            "max": 15.5,
            "avg": 15.47,
            "mdn": 15.5
          },
          {
            "timestamp": 1793606412,
            "min": 15.5,
            "max": 15.56,
            "avg": 15.52,
            "mdn": 15.5
          }
        ]
      },
      "moisture": {
        "measurements": [
          {
            "timestamp": 1793606112,
            "min": 9472,
            "max": 9488,
            "avg": 9480,
            "mdn": 9480
          },
          {
            "timestamp": 1793606412,
            "min": 9464,
            "max": 9488,
            "avg": 9475,
            "mdn": 9472
          }
        ]
      }
    }
  ],
  "ble_tags": [],
  "weather_station": {
    "wind_speed": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 1.33,
          "max": 3.11,
          "avg": 2.18,
          "mdn": 2.07
        },
        {
          "timestamp": 1793606412,
          "min": 1.56,
          "max": 3.44,
          "avg": 2.41,
          "mdn": 2.33
        }
      ]
    },
    "wind_direction": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "value": 202
        },
        {
          "timestamp": 1793606412,
          "value": 197
        }
      ]
    },
    "rainfall": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "value": 0
        },
        {
          "timestamp": 1793606412,
          "value": 0.27
        }
      ]
    }
  }
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

The LoRaWAN decoder of the application turns a message of the same device into these fields. Each value is the last sample, and the pressure is in kPa.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "voltage_rest": 3.61,
  "voltage_load": 3.57,
  "current_load": 35,
  "orientation": 2,
  "therm_temperature": 18.37,
  "wind_speed": 2.33,
  "wind_direction": 202,
  "rainfall": 0.27,
  "hygro_temperature": 18.23,
  "hygro_humidity": 71,
  "w1_thermometers": [17.37],
  "ble_tags": [],
  "barometer": 98.071,
  "soil_sensors": [
    {
      "temperature": 15.5,
      "moisture": 9480
    }
  ]
}
```

</details>

  </TabItem>
</Tabs>

## Changelog

### v4.0.1 – 2026-09-07

- **Fixed**: CHESTER-X0 analog inputs read the neighbouring channel in v4.0.0 (off-by-one in the channel mapping); no configuration change needed

### v3.5.1 – 2025-12-08

- **Added**: New variant: **CHESTER Meteo M** (Modbus RTU, supports Lambrecht and Sensecap/OPM sensors; sensor type selectable via `meteo-type`)
- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Improved**: Pyranometer (solar irradiance) support

### v3.5.0 – 2025-12-03

- **Added**: Soil sensor support: moisture and temperature measurement via 1-Wire soil probes (`soil_sensors` in JSON output)
- **Added**: New variant: **CHESTER Meteo P** with pyranometer input for solar irradiance measurement
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); previous Cloud Legacy firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
