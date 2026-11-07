---
title: CHESTER Control
description: "Firmware of the CHESTER Control catalog application: input channel modes, output control, every configuration parameter with its default, and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Control

The **CHESTER Control** firmware measures and observes analog and digital inputs. It aggregates the sampled analog values, counts pulses, records every change of a trigger input with its type and timestamp, buffers the results and sends them with their timestamps to HARDWARIO Cloud over NB-IoT/LTE. Over LoRaWAN, it sends only the latest values, without the buffered history. Buffering lets the device record many events while it saves data bandwidth and the power needed for data transfer. On request from HARDWARIO Cloud, the firmware also switches four outputs.

This page describes the main firmware. Variants built for other hardware have their own pages, which list only what they change: [**CHESTER Control Z**](chester-control-z.md) and [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER Control**](../../catalog-applications/chester-control/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-X0** input module in slot A: four input channels, each set to one of the modes described below (see [**CHESTER-X0**](../../extension-modules/chester-x0.md))
- the **CHESTER-X4** module in slot B: four outputs switched from HARDWARIO Cloud (see [**CHESTER-X4**](../../extension-modules/chester-x4.md))
- **DS18B20** 1-Wire thermometers, up to five
- 1-Wire soil sensors that measure temperature and moisture, up to three
- Bluetooth sensor tags (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

Reporting from the **CHESTER-Z** backup module needs [**CHESTER Control Z**](chester-control-z.md) or [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md). The source code also supports the **CHESTER-S2** hygrometer with its own sampling and aggregation intervals (`hygro-interval-sample`, `hygro-interval-aggreg`), but no v4.0.1 build includes it.

## Measurement and Behavior

- Each of the four channels of CHESTER-X0 is set to one mode with the parameters `channel-mode-1` to `channel-mode-4`: `trigger`, `counter`, `voltage` or `current`. All channels are `disabled` by default, so set the mode of every channel you use, for example `app config channel-mode-1 trigger`.
- The data of all channels is buffered and sent in a batch every report interval (parameter `interval-report`).
- Between two reports, each trigger channel keeps up to 128 events and each counter, voltage and current channel up to 64 aggregated values; anything beyond that is dropped until the next report.
- DS18B20 thermometers and soil sensors are sampled and aggregated with the parameters `w1-therm-interval-sample` and `w1-therm-interval-aggreg`, Bluetooth tags with `analog-interval-sample` and `analog-interval-aggreg`.
- The yellow LED flashes briefly on every change of a trigger input and on every counted pulse, at most five times per second. It flashes for 30 minutes after the first change, then stops and starts again with the first change that follows 30 minutes without any input activity. This helps to check the wiring during installation.
- The button works as described in [**Common Functionality**](../../catalog-applications/common-functionality.md#button-behaviour) with two differences: two presses ask HARDWARIO Cloud for downlink messages instead of sampling, and six presses switch on all four outputs of CHESTER-X4.

### Trigger

The **trigger** input can be connected to a PLC/sensor output (NPN/PNP), push button, switch, relay, etc. The behavior of the **trigger** input is configurable.

* When the input changes, the timestamp of the change event is stored together with the **active**/**inactive** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report (parameter `interval-report`).

* Optionally, a change to the **active** (parameter `trigger-report-active`) or **inactive** (parameter `trigger-report-inactive`) state can start a report of its own. The report follows after the **delay** set by `event-report-delay`, so that subsequent input changes go into the same report.

* Both **NPN** and **PNP** input logic types are supported (parameter `trigger-input-type`).

* The minimum level duration is configured separately for **active** (parameter `trigger-duration-active`) and **inactive** (parameter `trigger-duration-inactive`) states.

* The maximum number of reports per hour is configurable (parameter `event-report-rate`). The event throttling limits communication bandwidth and preserves the battery lifespan.

### Counter

The **counter** input can be connected to a PLC/sensor output (NPN/PNP), push button, switch, relay, etc. This input counts the total number of pulses in time.

* The counter value is aggregated periodically (parameter `counter-interval-aggreg`): each measurement holds the total count and the number of pulses since the previous measurement. The buffer of aggregated measurements is reported in a configurable interval (parameter `interval-report`).

* Both **NPN** and **PNP** types of input logic are supported (parameter `counter-input-type`).

* The minimum level duration is configured separately for **active** (parameter `counter-duration-active`) and **inactive** (parameter `counter-duration-inactive`) states.

The timing parameters work the same way for both digital modes:

:::info

- The parameter `duration-active` sets the millisecond delay between the input signal changes to an active level (based on `npn` or `pnp` configuration) and when CHESTER reacts to this change. This can be used to filter (debounce) the input signal when it comes from an "electrically noisy" mechanical switch or relay. It can also be used when CHESTER has to react only to pulses longer than the set duration.
- The parameter `duration-inactive` is the same as `duration-active` above, except it sets the time for the opposite edge.
- The parameter `cooldown-time` is a delay protecting CHESTER from too many incoming interrupt events. If a too-fast signal (>10 kHz) is connected, the interrupt handler could consume all the processor time, stopping the execution of other threads. This parameter sets a small delay before the interrupt handler runs again. The default value of 10 ms can be kept.

:::

### Voltage

The **voltage** input measures the voltage in the range **0–26 V** (covers the **0–10 V** standard).

* The voltage readings are sampled periodically (parameter `analog-interval-sample`). These readings are stored as a **buffer of samples**.

* The collected samples are **aggregated** periodically (parameter `analog-interval-aggreg`). The minimum, maximum, average, and median aggregates are computed from the buffered samples. These aggregated results are referred to as **measurements**.

* Each **measurement** has an associated timestamp. The buffered **measurements** are transferred as time-series data regularly (parameter `interval-report`).

### Current

This input measures the analog current in the range **0–24 mA** (covers the **4–20 mA** standard).

* The current readings are sampled periodically (parameter `analog-interval-sample`). These readings are stored as a **buffer of samples**.

* The collected samples are **aggregated** periodically (parameter `analog-interval-aggreg`). The minimum, maximum, average, and median aggregates are computed from the buffered samples. These aggregated results are referred to as **measurements**.

* Each **measurement** has an associated timestamp. The buffered **measurements** are transferred as time-series data regularly (parameter `interval-report`).

## Output Control

With the **CHESTER-X4** module in slot B, the firmware switches four outputs, which supply voltage from **VIN** when they are on.

You control the outputs with a data downlink that carries this JSON. Schedule it in HARDWARIO Cloud from the device's messages (see [**Data**](/cloud/downlink/data)) or send it to the device's `downlinks` endpoint of the HARDWARIO Cloud API (see [**Sending Downlinks**](/cloud/api/downlinks)):

```
{
  "output_1_state": 1,
  "output_2_state": 1,
  "output_3_state": 0,
  "output_4_state": 0
}
```

The JSON doesn't have to contain the output state of all four outputs. You send only `output_X_state` for outputs to be changed: `1` switches the output on, `0` switches it off.

The device asks HARDWARIO Cloud for downlink messages every `interval-poll` seconds and also picks up a waiting message when it sends a report. If a new downlink control message is in the Cloud queue, it is sent to the device and one or more outputs are changed. Outputs are switched in the LTE mode only; the firmware does not process LoRaWAN downlink messages.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `event-report-delay` | Event report delay | `<1-86400>` | `5` | Delay between a trigger event and its report in seconds; changes that follow within the delay go into the same report |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Event reports per hour at most (firmware v4.0.1 sends up to one more); periodic reports do not count toward this limit |
| `channel-mode-1` | Channel mode 1 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 1 (CHESTER-X0 in slot A, terminal A2) |
| `channel-mode-2` | Channel mode 2 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 2 (terminal A4) |
| `channel-mode-3` | Channel mode 3 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 3 (terminal A5) |
| `channel-mode-4` | Channel mode 4 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 4 (terminal A7) |
| `trigger-input-type` | Trigger input type | `npn`, `pnp` | `npn` | Input logic of the trigger channels |
| `counter-input-type` | Counter input type | `npn`, `pnp` | `npn` | Input logic of the counter channels |
| `trigger-duration-active` | Trigger duration active | `<0-60000>` | `100` | Minimum duration of the active level on a trigger input in milliseconds |
| `trigger-duration-inactive` | Trigger duration inactive | `<0-60000>` | `100` | Minimum duration of the inactive level on a trigger input in milliseconds |
| `trigger-cooldown-time` | Trigger cooldown time | `<0-60000>` | `10` | Pause after a trigger input interrupt in milliseconds |
| `trigger-report-active` | Trigger report active | `true`, `false` | `false` | Report immediately when a trigger input becomes active |
| `trigger-report-inactive` | Trigger report inactive | `true`, `false` | `false` | Report immediately when a trigger input becomes inactive |
| `counter-interval-aggreg` | Counter interval aggreg | `<1-86400>` | `300` | Aggregation interval of the counter channels in seconds |
| `counter-duration-active` | Counter duration active | `<0-60000>` | `2` | Minimum duration of the active level on a counter input in milliseconds |
| `counter-duration-inactive` | Counter duration inactive | `<0-60000>` | `2` | Minimum duration of the inactive level on a counter input in milliseconds |
| `counter-cooldown-time` | Counter cooldown time | `<0-60000>` | `10` | Pause after a counter input interrupt in milliseconds |
| `analog-interval-sample` | Analog interval sample | `<1-86400>` | `60` | Sampling interval of the voltage and current channels and of the Bluetooth tags in seconds |
| `analog-interval-aggreg` | Analog interval aggreg | `<1-86400>` | `300` | Aggregation interval of the voltage and current channels and of the Bluetooth tags in seconds |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Sampling interval of the DS18B20 thermometers and soil sensors in seconds |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Aggregation interval of the DS18B20 thermometers and soil sensors in seconds |

The trigger, counter and analog parameters take effect only for channels set to the matching mode. The parameters `channel-mode-5` to `channel-mode-8` exist in every CHESTER Control build, but take effect only in [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md), with its second CHESTER-X0 in slot B. The `w1-therm-*` parameters take effect only with DS18B20 thermometers or soil sensors connected.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the inputs and sensors now |
| `send` | Send the data now |
| `poll` | Ask HARDWARIO Cloud for downlink messages now |
| `channel show [<channel>...]` | Print the mode and the current state of all channels or of the listed ones |
| `channel read <channel> [<seconds>]` | Print the value of a channel every second for the given time, 10 seconds by default |
| `channel reset [<channel>]` | Clear the buffered data of one channel or of all channels, the counter value included |

## Firmware Build

- **Firmware:** [hio-chester-control:v4.0.1](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `d3c2bf66783643f6be3431d32adb11ac`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac/hex), SHA256 `94e30eec60f88aa6acafdb699579eb19493280505e4a6fb472166b13bd091837`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac/bin), SHA256 `9444a6d1acec43a0f9a22eded8329c959158a2c86ef419d628a9d7daaf25f529`
- **Build from the SDK:** `west chester-update control --variant "CHESTER Control"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-control/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report with one channel in each mode, one DS18B20 thermometer, one soil sensor and one Bluetooth tag. `interval-report` is set to 600 seconds, so every `measurements` list holds two aggregation intervals of 300 seconds:

- `trigger`: the channel, its current `state` and the input `events` (`activated`, `deactivated`) with their timestamps
- `counter`: the channel, the total pulse count `value`, the pulses since the last report `delta` and the aggregated `measurements` with the `value` and `delta` of each aggregation interval
- `voltage` and `current`: the channel and the aggregated `measurements` with the `min`, `max`, `avg` and `mdn` values in V and mA

The lists `w1_thermometers`, `soil_sensors` and `ble_tags` are in every report; without such sensors, they are empty.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 47,
    "timestamp": 1793945251
  },
  "system": {
    "uptime": 28233,
    "voltage_rest": 3.61,
    "voltage_load": 3.55,
    "current_load": 35
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -9,
      "snr": 6,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 22.75
  },
  "accelerometer": {
    "accel_x": 0.04,
    "accel_y": -0.12,
    "accel_z": 9.79,
    "orientation": 2
  },
  "trigger": [
    {
      "channel": 1,
      "state": "inactive",
      "events": [
        {
          "timestamp": 1793944905,
          "type": "activated"
        },
        {
          "timestamp": 1793944968,
          "type": "deactivated"
        }
      ]
    }
  ],
  "counter": [
    {
      "channel": 2,
      "value": 1250,
      "delta": 37,
      "measurements": [
        {
          "timestamp": 1793944800,
          "value": 1228,
          "delta": 15
        },
        {
          "timestamp": 1793945100,
          "value": 1246,
          "delta": 18
        }
      ]
    }
  ],
  "voltage": [
    {
      "channel": 3,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 4.81,
          "max": 4.95,
          "avg": 4.88,
          "mdn": 4.87
        },
        {
          "timestamp": 1793945100,
          "min": 4.84,
          "max": 5.02,
          "avg": 4.93,
          "mdn": 4.92
        }
      ]
    }
  ],
  "current": [
    {
      "channel": 4,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 12.04,
          "max": 12.31,
          "avg": 12.18,
          "mdn": 12.17
        },
        {
          "timestamp": 1793945100,
          "min": 12.1,
          "max": 12.42,
          "avg": 12.25,
          "mdn": 12.24
        }
      ]
    }
  ],
  "w1_thermometers": [
    {
      "serial_number": 222768959,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 18.25,
          "max": 18.37,
          "avg": 18.31,
          "mdn": 18.31
        },
        {
          "timestamp": 1793945100,
          "min": 18.31,
          "max": 18.5,
          "avg": 18.42,
          "mdn": 18.43
        }
      ]
    }
  ],
  "soil_sensors": [
    {
      "serial_number": 205416739,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1793944800,
            "min": 14.62,
            "max": 14.75,
            "avg": 14.69,
            "mdn": 14.68
          },
          {
            "timestamp": 1793945100,
            "min": 14.68,
            "max": 14.81,
            "avg": 14.74,
            "mdn": 14.75
          }
        ]
      },
      "moisture": {
        "measurements": [
          {
            "timestamp": 1793944800,
            "min": 9612,
            "max": 9640,
            "avg": 9625,
            "mdn": 9624
          },
          {
            "timestamp": 1793945100,
            "min": 9608,
            "max": 9633,
            "avg": 9619,
            "mdn": 9618
          }
        ]
      }
    }
  ],
  "ble_tags": [
    {
      "addr": "c4f312a85b7e",
      "rssi": -71,
      "voltage": 2.98,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1793944800,
            "min": 21.35,
            "max": 21.6,
            "avg": 21.47,
            "mdn": 21.46
          },
          {
            "timestamp": 1793945100,
            "min": 21.41,
            "max": 21.68,
            "avg": 21.55,
            "mdn": 21.54
          }
        ]
      },
      "humidity": {
        "measurements": [
          {
            "timestamp": 1793944800,
            "min": 41,
            "max": 43,
            "avg": 42.2,
            "mdn": 42
          },
          {
            "timestamp": 1793945100,
            "min": 42,
            "max": 43,
            "avg": 42.6,
            "mdn": 43
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

A LoRaWAN message carries only the latest values, without timestamps:

- `voltage_rest`, `voltage_load` and `current_load`: the battery voltage at rest and under load in V and the load current in mA
- `orientation` and `therm_temperature`: the orientation from the accelerometer and the internal temperature in °C
- `w1_thermometers` and `ble_tags`: the latest temperature of each DS18B20 thermometer and the latest temperature and humidity of each Bluetooth tag
- `inputs_a`: one entry for each channel, by its `type`: `trigger` with the current `state` and whether the first change since the previous report was an activation (`trigger_active`) or a deactivation (`trigger_inactive`), `counter` with the total `count` and the pulses since the previous report (`delta`), `voltage` in V or `current` in mA with the latest sample, or `disabled`

Soil sensors are not sent over LoRaWAN.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "voltage_rest": 3.7,
  "voltage_load": 3.65,
  "current_load": 36,
  "orientation": 2,
  "therm_temperature": 23.5,
  "w1_thermometers": [22.06, 22.31],
  "ble_tags": [
    {
      "temperature": 21.5,
      "humidity": 55
    }
  ],
  "inputs_a": [
    {
      "type": "trigger",
      "state": true,
      "trigger_active": true,
      "trigger_inactive": false
    },
    {
      "type": "counter",
      "count": 1234,
      "delta": 12
    },
    {
      "type": "voltage",
      "voltage": 12.5
    },
    {
      "type": "current",
      "current": 4.2
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

### v4.0.0 – 2026-08-10

- **Changed**: Lowered maximum 1-Wire thermometer capacity (10 → 5) and soil sensor capacity (10 → 3) to reduce RAM usage

### v3.5.5 – 2026-06-22

- **Changed**: Reduced memory footprint: soil sensor and thermometer data are now dynamically allocated

### v3.5.0 – 2025-12-03

- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Added**: Downlink watchdog interval (`downlink-wdg-interval`) to detect loss of cloud communication
- **Added**: Configurable poll interval (`interval-poll`) for cloud polling frequency
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); previous Cloud Legacy firmware remains separately available
- **Changed**: Channel modes now explicitly configurable per channel (`channel-mode-1` through `channel-mode-4`)

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
