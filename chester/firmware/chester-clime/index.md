---
title: CHESTER Clime
description: "Firmware of the CHESTER Clime catalog application: what it measures and sends, every configuration parameter with its default, and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Clime

The **CHESTER Clime** firmware turns CHESTER into an environmental sensor. It samples the connected sensors, aggregates the samples and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. Variants built for other sensors have their own pages, which list only what they change: [**CHESTER Clime IAQ**](chester-clime-iaq.md), [**CHESTER Clime RTD**](chester-clime-rtd.md), [**CHESTER Clime TC**](chester-clime-tc.md), [**CHESTER Clime SPS30**](chester-clime-sps30.md) and [**CHESTER Clime Radon**](chester-clime-radon.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER Clime**](../../catalog-applications/chester-clime/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-S2** external hygrometer (temperature and humidity)
- **DS18B20** 1-Wire thermometers, up to 10 on one bus
- 1-Wire **soil sensors** (soil moisture and temperature), up to 10
- the **CHESTER-Z** backup module, detected at runtime, so the same firmware runs with or without it
- Bluetooth sensor tags, up to 8 (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

## Measurement and Behavior

- All sensors are **sampled** with a configurable period (parameter `interval-sample`).
- Samples are then **aggregated** in the configurable interval. Minimum, maximum, average, and median are computed from buffered samples for each sensor (parameter `interval-aggreg`).
- Each aggregated value has its timestamp; the values are sent in a batch every report interval (parameter `interval-report`).

:::caution

CHESTER Clime sends about 500 bytes of data in the default configuration. If you increase the report interval without also increasing the aggregation interval,
the data buffer might be bigger than the UDP MTU and the packet will not be sent. The device then appears not to send at all or to send only a fraction of packets.

:::

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `send-timeout` | Send timeout | `<1-3600>` | `120` | Send timeout in seconds; firmware v4.0.1 stores the value but does not use it |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Delay between an event and its report in seconds (temperature alarm, backup power change) |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Event reports per hour at most (firmware v4.0.1 sends up to one more); periodic reports do not count toward this limit |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |
| `hygro-t-alarm-hi-report` | Hygro t alarm hi report | `true`, `false` | `false` | Report when the hygrometer temperature crosses the high threshold |
| `hygro-t-alarm-hi-thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | High temperature threshold in °C |
| `hygro-t-alarm-hi-hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | High temperature hysteresis in °C |
| `hygro-t-alarm-lo-report` | Hygro t alarm lo report | `true`, `false` | `false` | Report when the hygrometer temperature crosses the low threshold |
| `hygro-t-alarm-lo-thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Low temperature threshold in °C |
| `hygro-t-alarm-lo-hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Low temperature hysteresis in °C |

The event, backup and hygrometer parameters take effect only with the hardware they belong to: `backup-report-*` with CHESTER-Z, `hygro-t-alarm-*` with CHESTER-S2, `event-report-*` with either of them.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the sensors now |
| `aggreg` | Aggregate the samples now |
| `send` | Send the data now |

## Firmware Build

- **Firmware:** [hio-chester-clime:v4.0.1](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `59489e4e91d741da930ab15b1ab9e31f`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f/hex), SHA256 `f31a0d2850e091c19afb2e3b54487ee9497c4bdedaeb3af8d0006d49c7f28e6a`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f/bin), SHA256 `4fdd46914a7ad4c77df3c48271f255cb014b4be676e99548b7046cf8675faa29`
- **Build from the SDK:** `west chester-update clime --variant "CHESTER Clime"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-clime/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows the report that the main firmware sent 1 s after the hygrometer temperature rose above the high alarm threshold of 25.0 °C. The device has a CHESTER-S2 hygrometer, one DS18B20 probe, the CHESTER-Z backup module and one Bluetooth tag, and no soil sensor:

- `backup`: voltage of the external power input and of the backup battery, the power state and its events
- `hygrometer`: temperature and humidity from CHESTER-S2, with the alarm events
- `w1_thermometers`: one entry for each DS18B20 probe
- `soil_sensors`: one entry for each soil sensor, empty here
- `ble_tags`: readings of the enrolled Bluetooth tags

Backup **events** are:
* `connected`
* `disconnected`

Hygrometer **events** are:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

The example is shortened to two aggregated values per sensor; with the default configuration a report carries about six. Each aggregated value has its timestamp and the `min`, `max`, `avg` and `mdn` of the samples.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 2,
    "sequence": 37,
    "timestamp": 1793953302
  },
  "system": {
    "uptime": 67324,
    "voltage_rest": 3.61,
    "voltage_load": 3.52,
    "current_load": 35
  },
  "backup": {
    "line_voltage": 23.98,
    "batt_voltage": 4.12,
    "state": "connected",
    "events": []
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
    "temperature": 24.31
  },
  "accelerometer": {
    "accel_x": 0.07,
    "accel_y": -0.16,
    "accel_z": 9.65,
    "orientation": 2
  },
  "hygrometer": {
    "temperature": {
      "events": [
        {
          "timestamp": 1793953301,
          "type": "alarm_hi_activated",
          "value": 25.04
        }
      ],
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 24.58,
          "max": 24.77,
          "avg": 24.66,
          "mdn": 24.65
        },
        {
          "timestamp": 1793953200,
          "min": 24.79,
          "max": 24.97,
          "avg": 24.88,
          "mdn": 24.89
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 41.22,
          "max": 42.05,
          "avg": 41.63,
          "mdn": 41.6
        },
        {
          "timestamp": 1793953200,
          "min": 40.87,
          "max": 41.41,
          "avg": 41.12,
          "mdn": 41.09
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 170787196,
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 4.12,
          "max": 4.31,
          "avg": 4.2,
          "mdn": 4.18
        },
        {
          "timestamp": 1793953200,
          "min": 4.06,
          "max": 4.25,
          "avg": 4.15,
          "mdn": 4.12
        }
      ]
    }
  ],
  "soil_sensors": [],
  "ble_tags": [
    {
      "addr": "7cd9f413e360",
      "rssi": -76,
      "voltage": 3.01,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1793952900,
            "min": 21.75,
            "max": 21.94,
            "avg": 21.84,
            "mdn": 21.81
          },
          {
            "timestamp": 1793953200,
            "min": 21.81,
            "max": 22.06,
            "avg": 21.93,
            "mdn": 21.94
          }
        ]
      },
      "humidity": {
        "measurements": [
          {
            "timestamp": 1793952900,
            "min": 47,
            "max": 48,
            "avg": 47.6,
            "mdn": 48
          },
          {
            "timestamp": 1793953200,
            "min": 47,
            "max": 48,
            "avg": 47.4,
            "mdn": 47
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

The uplink carries the latest sample of each sensor of the same device. `w1_thermometers`, `ble_tags` and `soil_sensors` are lists with one value or entry for each probe, tag or sensor.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "voltage_rest": 3.612,
  "voltage_load": 3.524,
  "current_load": 35,
  "orientation": 2,
  "therm_temperature": 24.31,
  "hygro_temperature": 25.04,
  "hygro_humidity": 40.5,
  "w1_thermometers": [
    4.12
  ],
  "ble_tags": [
    {
      "temperature": 21.94,
      "humidity": 47
    }
  ],
  "soil_sensors": []
}
```

</details>

  </TabItem>
</Tabs>

## Changelog

### v3.5.4 – 2026-04-14

- **Changed**: Runtime CHESTER-Z detection, so a single firmware now works with or without the CHESTER-Z module; separate **CHESTER Clime Z** variant removed
- **Fixed**: Build failure for IAQ variant when both CHESTER-Z and CHESTER-X10 features are enabled simultaneously

### v3.5.1 – 2025-12-08

- **Added**: New variants: **CHESTER Clime SPS30** (particulate matter: PM1/PM2.5/PM10) and **CHESTER Clime Radon** (radon gas concentration)
- **Added**: New variant: **CHESTER Clime TC** for two external Type K thermocouple sensors (via CHESTER-X3B)
- **Improved**: DS18B20 1-Wire thermometer support, with improved reliability and cleaner multi-sensor handling
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); Cloud Legacy variants remain available in a separate firmware table
- **Changed**: Single combined firmware binary for both LTE and LoRaWAN; network selected via `app config mode lte` / `app config mode lrw`
- **Removed**: Clime 1W and Clime 1WH variants dropped from HARDWARIO Cloud firmware builds (remain available under Cloud Legacy)

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
