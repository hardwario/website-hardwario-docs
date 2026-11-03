---
title: CHESTER Clime
description: "Firmware of the CHESTER Clime catalog application: what it measures and sends, every configuration parameter with its default, and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Clime

The **CHESTER Clime** firmware turns CHESTER into an environmental sensor. It samples the connected sensors, aggregates the samples and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. Variants built for other sensors have their own pages, which list only what they change: [**CHESTER Clime IAQ**](chester-clime-iaq.md), [**CHESTER Clime RTD**](chester-clime-rtd.md), [**CHESTER Clime TC**](chester-clime-tc.md), [**CHESTER Clime SPS30**](chester-clime-sps30.md) and [**CHESTER Clime Radon**](chester-clime-radon.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../common-functionality.md). The hardware and the product variants are on the [**CHESTER Clime**](../../catalog-applications/chester-clime/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-S2** external hygrometer (temperature and humidity)
- **DS18B20** 1-Wire thermometers, several of them on one bus
- the **CHESTER-Z** backup module, detected at runtime, so the same firmware runs with or without it
- Bluetooth sensor tags (see [**BLE Tags**](../ble-tags.md))

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

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `send-timeout` | `<1-3600>` | `120` | Send timeout in seconds; firmware v4.0.1 stores the value but does not use it |
| `event-report-delay` | `<1-86400>` | `1` | Delay between an event and its report in seconds (temperature alarm, backup power change) |
| `event-report-rate` | `<1-3600>` | `30` | Event reports per hour at most; periodic reports do not count toward this limit |
| `backup-report-connected` | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | `true`, `false` | `true` | Report immediately when external power fails |
| `hygro-t-alarm-hi-report` | `true`, `false` | `false` | Report when the hygrometer temperature crosses the high threshold |
| `hygro-t-alarm-hi-thr` | `<-40.0..125.0>` | `0.0` | High temperature threshold in °C |
| `hygro-t-alarm-hi-hst` | `<0.0..100.0>` | `0.0` | High temperature hysteresis in °C |
| `hygro-t-alarm-lo-report` | `true`, `false` | `false` | Report when the hygrometer temperature crosses the low threshold |
| `hygro-t-alarm-lo-thr` | `<-40.0..125.0>` | `0.0` | Low temperature threshold in °C |
| `hygro-t-alarm-lo-hst` | `<0.0..100.0>` | `0.0` | Low temperature hysteresis in °C |

The event, backup and hygrometer parameters take effect only with the hardware they belong to: `backup-report-*` with CHESTER-Z, `hygro-t-alarm-*` with CHESTER-S2, `event-report-*` with either of them.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

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

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report of the main firmware with a CHESTER-S2 hygrometer, DS18B20 thermometers and the CHESTER-Z backup module:

- `hygrometer`: temperature and humidity from CHESTER-S2
- `w1_thermometers`: one entry for each DS18B20 thermometer
- `backup`: external and internal voltages, state and events of the backup module
- `ble_tags`: readings of the paired Bluetooth tags

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

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Show JSON Example</b></summary>

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
