---
title: CHESTER Push
description: "CHESTER Push is the catalog application for push-button alerting: its hardware, the enclosure template, the settings you change and the exact data it sends."
---

# CHESTER Push

![CHESTER Push with four push buttons on colored labels (Production, Warning, Failure, Help), top view](/img/chester/catalog-applications/chester-push.webp)

**CHESTER Push** is a push-button terminal. When any of its buttons is pressed, it sends a report to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Push firmware](../../firmware/chester-push/index.md)** page.

:::

## What It Can Do

- Sends data immediately when any of the push buttons is pressed.
- Tells a short press from a long press and counts both for each button.
- Confirms each press with the button LED and a beep.
- Runs from its Li-Ion battery and reports at once when external power fails or returns, so it can also monitor power outages.
- Reports temperature and device orientation in every message.
- Comes with two firmware builds: the main one suits battery operation, [**CHESTER Push FM**](../../firmware/chester-push/chester-push-fm.md) keeps the last pressed button lit.

## Push Buttons

**CHESTER Push** has push buttons on the enclosure. For bulk orders, the number of buttons can be configured. An off-the-shelf configuration provides four push buttons on the left side. Alternatively, we can deliver a single push-button version (in the enclosure center). Also, upon a customer's request, we can customize the enclosure printing, and provide various text labels (or symbols) next to each of the push buttons.

Each button is also equipped with an **LED indicator** so the operator can see that the press was recognized. Also, the **beep sound** is played from the integrated acoustic buzzer for audible confirmation of the push button press.

## Power Supply

The **CHESTER Push** application integrates a **CHESTER-Z1-F** extension module with a rechargeable **Li-Ion** battery and DC/DC power supply (input voltage range of 6 VDC to 26 VDC) that can charge the battery and provide a steady power supply for the application. The reported message also provides information about the external power presence, external DC line voltage, and battery voltage. With that extra information, **CHESTER Push** could also be used to monitor power outages. The module is described on the [**CHESTER-Z1**](../../extension-modules/chester-z1.md) page.

## Enclosure Template

You can use a [**front cover template**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf) for your custom enclosure design.

## Models {#variants}

CHESTER Push comes as the base model and a separate firmware build, CHESTER Push FM (see its firmware page). Each model has its own section below.

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Push**](#model-chester-push) | Base model | [CHESTER Push](../../firmware/chester-push/index.md) |
| [**CHESTER Push FM**](#chester-push-fm) | Separate firmware build: the LED of the last pressed button stays lit | [CHESTER Push FM](../../firmware/chester-push/chester-push-fm.md) |

## CHESTER Push {#model-chester-push}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: CHESTER mainboard
* `CHESTER-Z1-F`: Four push buttons (see [**Ordering Codes**](../../ordering-codes.md#chester-z) for more variants)
* `CHESTER-E4-FP`: Enclosure with the top cover for the push buttons, Weipu power connector, SMA antenna pigtail and light pipe

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Push. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The full list is on the [**CHESTER Push firmware**](../../firmware/chester-push/index.md#configuration-parameters) page.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval of the periodic report in seconds |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Delay between a button press or a change of external power and its report in seconds; presses within the delay go into one report |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Event reports per hour at most (firmware v4.0.1 sends up to one more); events over the limit wait for the next periodic report |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval of the Bluetooth tags in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag samples in seconds |

### Data over LTE {#data-over-lte}

The device sends a periodic report every `interval-report` seconds and an extra report `event-report-delay` seconds after a button press or, when the matching `backup-report-*` setting is on, after a failure or return of external power, at most `event-report-rate` extra reports per hour (firmware v4.0.1 sends up to one more). Every report carries the counters of all five button positions and the button events since the previous report. The Bluetooth tag values are aggregated: each entry in `measurements` has a `timestamp` and the `min`, `max`, `avg` (average) and `mdn` (median) of the samples taken every `interval-sample` seconds during one `interval-aggreg` interval. When a reading fails, the value is `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Push sends `message.version` `1`.

In addition to the common data, CHESTER Push sends:

- [`backup`](#backup): DC input and Li-Ion battery of CHESTER-Z1
- [`buttons`](#buttons): press counters and events of the five button positions
- [`ble_tags`](#ble-tags): Bluetooth tags

#### Backup Module {#backup}

`backup` describes the power input of CHESTER-Z1 and is in every report. `events` lists the failures and returns of external power since the previous report, at most 32.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage on the DC input of CHESTER-Z1: 6–26 V with external power connected, near 0 when disconnected | mV | 0–26000 | 1 mV |
| `backup.batt_voltage` | Voltage of the Li-Ion battery in CHESTER-Z1 | mV | 3200–4200 | 1 mV |
| `backup.state` | External power: `connected` or `disconnected` | | | |
| `backup.events[].timestamp` | Time of the change (Unix time) | s | | 1 s |
| `backup.events[].type` | `connected` (power returned) or `disconnected` (power failed) | | | |

#### Buttons {#buttons}

`buttons` has five entries in every report, one for each of the five button positions of CHESTER-Z1: `button_x` (the center button) and `button_1` to `button_4`. `events` appears for each button pressed since the previous report; between two reports the firmware lists and counts up to 8 presses of each button.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `buttons[].button` | Button the entry belongs to: `button_x`, `button_1`, `button_2`, `button_3` or `button_4` | | | |
| `buttons[].count_click` | Short presses since the device started | | 0–2147483647 | 1 |
| `buttons[].count_hold` | Long presses since the device started | | 0–2147483647 | 1 |
| `buttons[].events[].timestamp` | Time of the press (Unix time) | s | | 1 s |
| `buttons[].events[].type` | `clicked` (short press) or `held` (long press) | | | |

#### Bluetooth Tags {#ble-tags}

`ble_tags` has one entry for each paired Bluetooth tag (Teltonika EYE Sensor), at most 8; see [**BLE Tags**](../ble-tags.md).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | MAC address of the tag, 12 hexadecimal digits | | | |
| `ble_tags[].rssi` | Signal strength of the tag at the last sample | dBm | −128 to −1 | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag at the last sample | V | 2.00–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[]` | Temperature (min, max, avg, mdn) | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[]` | Relative humidity (min, max, avg, mdn) | % | 0–100 | 0.01 % |

### Data over LoRaWAN {#data-over-lorawan}

Every uplink carries the common LoRaWAN fields described in [**Common Functionality**](../common-functionality.md#common-data-lorawan) and the fields in the table below.

In LoRaWAN mode, a message carries the power values, the button counters and, for each button, whether it was pressed since the previous message. The decoder outputs these fields:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage on the DC input of CHESTER-Z1: 6–26 V with external power connected, near 0 when disconnected | V | 0–26 | 0.001 V |
| `backup.battery_voltage` | Voltage of the Li-Ion battery in CHESTER-Z1 | V | 3.2–4.2 | 0.001 V |
| `backup.backup_state` | External power: `connected` or `disconnected` | | | |
| `button_x.press_count` to `button_4.press_count` | Short presses of the button since the device started; after 65535 the count starts again from 0 | | 0–65535 | 1 |
| `button_x.hold_count` to `button_4.hold_count` | Long presses of the button since the device started; after 65535 the count starts again from 0 | | 0–65535 | 1 |
| `button_x.press_event` to `button_4.press_event` | `true` when the button was pressed briefly since the previous message, otherwise `false` | | | |
| `button_x.hold_event` to `button_4.hold_event` | `true` when the button was held since the previous message, otherwise `false` | | | |

## CHESTER Push FM {#chester-push-fm}

**CHESTER Push FM** is a separate firmware build of CHESTER Push that keeps the LED of the last pressed button lit (see its [firmware page](../../firmware/chester-push/chester-push-fm.md)).

### Data {#data-chester-push-fm}

The [**CHESTER Push FM**](../../firmware/chester-push/chester-push-fm.md) firmware sends the data of [CHESTER Push](#data-over-lte) with this change:

- Every press counts as a short press: in `buttons`, `count_click` grows, every event is `clicked` and `count_hold` stays `0`.

#### Over LoRaWAN {#chester-push-fm-data-lorawan}

`press_count` grows, `hold_count` stays `0` and `hold_event` is always `false`.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
