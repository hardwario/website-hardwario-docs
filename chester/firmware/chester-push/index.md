---
title: CHESTER Push
description: "Firmware of the CHESTER Push catalog application: button reports and LED feedback, every configuration parameter with its default, and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Push

The **CHESTER Push** firmware turns CHESTER into a push-button terminal. It reports every button press at once, tells a short press from a long press and sends the data to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. The [**CHESTER Push FM**](chester-push-fm.md) build changes only how the button LEDs light up, and its page lists only that.

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../common-functionality.md). The hardware and the enclosure template are on the [**CHESTER Push**](../../catalog-applications/chester-push/index.md) catalog page.

## Supported Hardware

The firmware works with:

- the [**CHESTER-Z1**](../../extension-modules/chester-z1.md) module, which the firmware needs: up to five push buttons with LEDs, the acoustic buzzer, the DC input and the Li-Ion backup battery
- the thermometer and the accelerometer on the mainboard
- Bluetooth sensor tags (see [**BLE Tags**](../ble-tags.md)); their readings go only into LTE reports

In the data, the buttons are `button_x` (the center button) and `button_1` to `button_4`. Which of them are fitted depends on the CHESTER-Z1 ordering code (see [**Ordering Codes**](../../ordering-codes.md#chester-z)).

## Measurement and Behavior

- A button press is **reported at once**: the device waits `event-report-delay` seconds, so that presses close together go into one report, and then sends the report.
- At most `event-report-rate` event reports go out per hour. The limit saves the battery and the amount of transferred data; events over it wait for the next periodic report, and periodic reports do not count toward it.
- The firmware tells a **short press** (`clicked`) from a **long press** (`held`). Every report carries, for each button, the counters of short and long presses since the device started and the button events since the previous report with their timestamps.
- A report lists at most 8 events per button. Further presses of that button before the next report are not counted.
- The thermometer, the accelerometer and the voltages on CHESTER-Z1 are sampled every minute, the mainboard supply voltage every 12 hours. Bluetooth tags are sampled every `interval-sample` seconds and aggregated every `interval-aggreg` seconds.
- The periodic report goes out every `interval-report` seconds, without the random jitter described in [**Common Functionality**](../common-functionality.md#report-interval-jitter).
- When external power on CHESTER-Z1 fails or returns, the device reports it at once (parameters `backup-report-*`), so CHESTER Push can also monitor power outages.

### LED Behavior

Each button has its own LED, and the buzzer confirms every press:

- **Short press:** the green LED of the button flashes once and the buzzer beeps once.
- **Long press:** the red LED of the button flashes twice and the buzzer beeps twice.

:::tip

This behavior is suitable for low-power operation (months from the integrated **Li-Ion** battery).

:::

The [**CHESTER Push FM**](chester-push-fm.md) build lights the LEDs differently.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Sampling interval of the Bluetooth tags in seconds |
| `interval-aggreg` | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag samples in seconds |
| `interval-report` | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `event-report-delay` | `<1-86400>` | `1` | Delay between an event and its report in seconds (button press, backup power change) |
| `event-report-rate` | `<1-3600>` | `30` | Event reports per hour at most; periodic reports do not count toward this limit |
| `backup-report-connected` | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | `true`, `false` | `true` | Report immediately when external power fails |

The `interval-sample` and `interval-aggreg` parameters take effect only with Bluetooth tags; the thermometer and the accelerometer are sampled every minute regardless of them.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the sensors now |
| `send` | Send the data now |

## Firmware Build

- **Firmware:** [hio-chester-push:v4.0.1](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `a218e5f6eeea4fefaa3656ada720d163`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163/hex), SHA256 `e4a111d6731186ec3d5d52b6290ea7f95721dacff0a39cb9285dbdd24a315cfd`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163/bin), SHA256 `fa8e4fdbe285bcbcd9a8b73aaa869b35c57992441c98f5485fd31d004be7fd21`
- **Build from the SDK:** `west chester-update push --variant "CHESTER Push"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report of the main firmware:

- `backup`: DC input voltage, battery voltage, state and events of the CHESTER-Z1 power input
- `button_x` and `button_1` to `button_4`: for each button, the counters of short (`count_click`) and long (`count_hold`) presses and the events since the previous report

Button **events** are:
* `clicked`
* `held`

Backup **events** are:
* `connected`
* `disconnected`

<details>
<summary><b>Show JSON Example</b></summary>

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

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Show JSON Example</b></summary>

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

</details>

  </TabItem>
</Tabs>

## Changelog

### v3.5.0 – 2025-12-03

- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Changed**: Refactored to new `app_lrw` LoRaWAN framework with unit test coverage
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); previous Cloud Legacy firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
