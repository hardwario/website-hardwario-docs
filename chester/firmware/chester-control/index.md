---
title: CHESTER Control
description: "Firmware of the CHESTER Control catalog application: input channel modes, output control, every configuration parameter with its default, and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Control

The **CHESTER Control** firmware measures and observes analog and digital inputs. It aggregates the sampled analog values, counts pulses, records every change of a trigger input with its type and timestamp, buffers the results and sends them with their timestamps to HARDWARIO Cloud over NB-IoT/LTE. Over LoRaWAN, it sends only the latest values, without the buffered history. Buffering lets the device record many events while it saves data bandwidth and the power needed for data transfer. On request from HARDWARIO Cloud, the firmware also switches four outputs.

This page describes the main firmware. Variants built for other hardware have their own pages, which list only what they change: [**CHESTER Control Z**](chester-control-z.md) and [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../common-functionality.md). The hardware and the product variants are on the [**CHESTER Control**](../../catalog-applications/chester-control/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-X0** input module in slot A: four input channels, each set to one of the modes described below (see [**CHESTER-X0**](../../extension-modules/chester-x0.md))
- the **CHESTER-X4** module in slot B: four outputs switched from HARDWARIO Cloud (see [**CHESTER-X4**](../../extension-modules/chester-x4.md))
- **DS18B20** 1-Wire thermometers, up to five
- 1-Wire soil sensors that measure temperature and moisture, up to three
- Bluetooth sensor tags (see [**BLE Tags**](../ble-tags.md))

Reporting from the **CHESTER-Z** backup module needs [**CHESTER Control Z**](chester-control-z.md) or [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md). The source code also supports the **CHESTER-S2** hygrometer with its own sampling and aggregation intervals (`hygro-interval-sample`, `hygro-interval-aggreg`), but no v4.0.1 build includes it.

## Measurement and Behavior

- Each of the four channels of CHESTER-X0 is set to one mode with the parameters `channel-mode-1` to `channel-mode-4`: `trigger`, `counter`, `voltage` or `current`. All channels are `disabled` by default, so set the mode of every channel you use, for example `app config channel-mode-1 trigger`.
- The data of all channels is buffered and sent in a batch every report interval (parameter `interval-report`).
- Between two reports, each trigger channel keeps up to 128 events and each counter, voltage and current channel up to 64 aggregated values; anything beyond that is dropped until the next report.
- DS18B20 thermometers and soil sensors are sampled and aggregated with the parameters `w1-therm-interval-sample` and `w1-therm-interval-aggreg`, Bluetooth tags with `analog-interval-sample` and `analog-interval-aggreg`.
- The yellow LED flashes briefly on every change of a trigger input and on every counted pulse, at most five times per second. It flashes for 30 minutes after the first change, then stops and starts again with the first change that follows 30 minutes without any input activity. This helps to check the wiring during installation.
- The button works as described in [**Common Functionality**](../common-functionality.md#button-behaviour) with two differences: two presses ask HARDWARIO Cloud for downlink messages instead of sampling, and six presses switch on all four outputs of CHESTER-X4.

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

The **voltage** input measures the voltage in the range **0–28 V** (covers the **0–10 V** standard).

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

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-report` | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `event-report-delay` | `<1-86400>` | `5` | Delay between a trigger event and its report in seconds; changes that follow within the delay go into the same report |
| `event-report-rate` | `<1-3600>` | `30` | Event reports per hour at most; periodic reports do not count toward this limit |
| `channel-mode-1` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 1 (CHESTER-X0 in slot A, terminal A2) |
| `channel-mode-2` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 2 (terminal A4) |
| `channel-mode-3` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 3 (terminal A5) |
| `channel-mode-4` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 4 (terminal A7) |
| `trigger-input-type` | `npn`, `pnp` | `npn` | Input logic of the trigger channels |
| `counter-input-type` | `npn`, `pnp` | `npn` | Input logic of the counter channels |
| `trigger-duration-active` | `<0-60000>` | `100` | Minimum duration of the active level on a trigger input in milliseconds |
| `trigger-duration-inactive` | `<0-60000>` | `100` | Minimum duration of the inactive level on a trigger input in milliseconds |
| `trigger-cooldown-time` | `<0-60000>` | `10` | Pause after a trigger input interrupt in milliseconds |
| `trigger-report-active` | `true`, `false` | `false` | Report immediately when a trigger input becomes active |
| `trigger-report-inactive` | `true`, `false` | `false` | Report immediately when a trigger input becomes inactive |
| `counter-interval-aggreg` | `<1-86400>` | `300` | Aggregation interval of the counter channels in seconds |
| `counter-duration-active` | `<0-60000>` | `2` | Minimum duration of the active level on a counter input in milliseconds |
| `counter-duration-inactive` | `<0-60000>` | `2` | Minimum duration of the inactive level on a counter input in milliseconds |
| `counter-cooldown-time` | `<0-60000>` | `10` | Pause after a counter input interrupt in milliseconds |
| `analog-interval-sample` | `<1-86400>` | `60` | Sampling interval of the voltage and current channels and of the Bluetooth tags in seconds |
| `analog-interval-aggreg` | `<1-86400>` | `300` | Aggregation interval of the voltage and current channels and of the Bluetooth tags in seconds |
| `w1-therm-interval-sample` | `<1-86400>` | `60` | Sampling interval of the DS18B20 thermometers and soil sensors in seconds |
| `w1-therm-interval-aggreg` | `<1-86400>` | `300` | Aggregation interval of the DS18B20 thermometers and soil sensors in seconds |

The trigger, counter and analog parameters take effect only for channels set to the matching mode. [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md) adds `channel-mode-5` to `channel-mode-8` for a second CHESTER-X0 in slot B. The `w1-therm-*` parameters take effect only with DS18B20 thermometers or soil sensors connected.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

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

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report with one channel in each mode:

- `trigger`: the channel, its current `state` and the input `events` (`activated`, `deactivated`) with their timestamps
- `counter`: the channel, the total pulse count `value`, the pulses since the last report `delta` and the aggregated `measurements` with the `value` and `delta` of each aggregation interval
- `voltage` and `current`: the channel and the aggregated `measurements` with the `min`, `max`, `avg` and `mdn` values in V and mA

DS18B20 thermometers, soil sensors and Bluetooth tags add the `w1_thermometers`, `soil_sensors` and `ble_tags` structures.

Firmware v4.0.1 differs from the example in two points: every report also carries the `system` structure with the uptime, the battery voltage at rest and under load and the load current, and `network` holds the LTE connection parameters in `parameter` instead of `imei` and `imsi`.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
    "accelerometer": {
        "accel_x": 0,
        "accel_y": 0,
        "accel_z": 9.57,
        "orientation": 2
    },
    "counter": [
        {
            "channel": 2,
            "delta": 5,
            "measurements": [
                {
                    "timestamp": 1705328041,
                    "value": 4,
                    "delta": 2
                },
                {
                    "timestamp": 1705328341,
                    "value": 7,
                    "delta": 3
                }
            ],
            "value": 7
        }
    ],
    "current": [
        {
            "channel": 4,
            "measurements": [
                {
                    "avg": 2,
                    "max": 5.03,
                    "mdn": 0,
                    "min": 0,
                    "timestamp": 1705328341
                }
            ]
        }
    ],
    "message": {
        "sequence": 1,
        "timestamp": 1705328341,
        "version": 1
    },
    "network": {
        "imei": 351358816128174,
        "imsi": 901288910100358
    },
    "thermometer": {
        "temperature": 22.75
    },
    "trigger": [
        {
            "channel": 1,
            "events": [
                {
                    "timestamp": 1705328233,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328235,
                    "type": "deactivated"
                }
            ],
            "state": "inactive"
        }
    ],
    "voltage": [
        {
            "channel": 3,
            "measurements": [
                {
                    "avg": 0.27,
                    "max": 1.35,
                    "mdn": 0,
                    "min": 0,
                    "timestamp": 1705328341
                }
            ]
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
  "current_load": 20,
  "orientation": 2,
  "therm_temperature": 23.5,
  "w1_thermometers": [22.1, 22.3],
  "ble_tags": [
    {
      "temperature": 21.5,
      "humidity": 55.0
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
