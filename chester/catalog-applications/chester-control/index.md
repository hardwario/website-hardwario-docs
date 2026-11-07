---
title: CHESTER Control
description: "CHESTER Control monitors inputs and switches outputs: its hardware, wiring, variant, the settings you usually change and the exact data it sends."
---

# CHESTER Control

![CHESTER Control, front view with the antenna connector on top and four cable glands at the bottom](/img/chester/catalog-applications/chester-control.webp)

**CHESTER Control** monitors digital and analog inputs and switches outputs on request from HARDWARIO Cloud. It records input changes, counts pulses, measures voltage and current, and sends the data over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Control firmware](../../firmware/chester-control/index.md)** page.

:::

## What It Can Do

- Reads the four inputs of the **CHESTER-X0** module, each set up as a trigger, counter, voltage or current input.
- Records every change of a digital input with its timestamp and can report it immediately.
- Counts pulses, for example from the S0 output of an energy meter.
- Measures voltage 0–26 V and current 0–24 mA, which covers 4–20 mA current loops.
- Switches the four outputs of the **CHESTER-X4** module remotely from HARDWARIO Cloud; the outputs supply voltage from VIN.
- Reads **DS18B20** 1-Wire temperature probes, 1-Wire soil sensors and Bluetooth sensor tags.
- With the **CHESTER-Z1** backup module (CHESTER Control Z), keeps running when external power fails and reports the power change.

## Inputs and Outputs

**CHESTER Control** has these four inputs:

| **Type** | **Channel** | **Terminal** | **Input type**    | **Input range** | **Typical use-case**                  |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digital (NPN/PNP) | 0 to 28 V       | Switch, button, relay, PLC sensor     |
| Counter  | CH2         | A4           | Digital (NPN/PNP) | 0 to 28 V       | Energy meter pulse outputs (e.g., S0) |
| Voltage  | CH3         | A5           | Analog (voltage)  | 0 to 26 V       | Various voltage transmitters          |
| Current  | CH4         | A7           | Analog (current)  | 0 to 24 mA      | Various current transmitters          |

Each channel can be set to any of the four types in the firmware configuration; the table shows a typical assignment. All these inputs and their options are explained in more detail on the [**CHESTER Control firmware**](../../firmware/chester-control/index.md#measurement-and-behavior) page.

Additionally, **CHESTER Control** allows remote control of 4 digital (6–28 V) outputs.

## Terminal Blocks

| CHESTER-X0B in left slot A (signals A1–A8) | CHESTER-X4 in right slot B (signals B1–B8)                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Use inputs **CH1** to **CH4** and **GND**   | Use **VIN** and **GND** to supply external power.                                            |
|                                             | Use **CH1** to **CH4** outputs, which supply voltage from **VIN** when the output is enabled |
| ![CHESTER-X0 terminal block pinout: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../extension-modules/images/tb-chester-x0.png) | ![CHESTER-X4 terminal block pinout: GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../extension-modules/images/tb-chester-x4.png)                                                  |

For the wiring diagram of **CHESTER Control**, please follow the [**terminal block description**](../../extension-modules/chester-x0.md) of the **CHESTER-X0** extension module.
The extension module **CHESTER-X0** is installed in the left slot **A**, so you have to use the corresponding terminals **A1** to **A8**.

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Control**](#model-chester-control) | Base model | [CHESTER Control](../../firmware/chester-control/index.md) |
| [**CHESTER Control Z**](#chester-control-z) | Backup module CHESTER-Z1 | [CHESTER Control Z](../../firmware/chester-control/chester-control-z.md) |
| [**CHESTER Control 8Ch Z**](#chester-control-8ch-z) | CHESTER-X0 in slots A and B, backup module CHESTER-Z; a separate firmware build (see its firmware page) | [CHESTER Control 8Ch Z](../../firmware/chester-control/chester-control-8ch-z.md) |

## CHESTER Control {#model-chester-control}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-X4:B`: Step-down + outputs (4 channels)

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Control. Set a parameter with `app config <parameter> <value>` and apply the changes with `config save`, which stores the configuration and restarts the device. The full list is in the [**configuration parameters**](../../firmware/chester-control/index.md#configuration-parameters) of the firmware.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | Mode | `none`, `lte`, `lrw` | `none` | Network: `lte` for NB-IoT/LTE, `lrw` for LoRaWAN, `none` keeps the radio off; set it first |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `channel-mode-1` | Channel mode 1 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 1 (terminal A2) |
| `channel-mode-2` | Channel mode 2 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 2 (terminal A4) |
| `channel-mode-3` | Channel mode 3 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 3 (terminal A5) |
| `channel-mode-4` | Channel mode 4 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 4 (terminal A7) |
| `trigger-input-type` | Trigger input type | `npn`, `pnp` | `npn` | Input logic of the trigger channels |
| `trigger-duration-active` | Trigger duration active | `<0-60000>` | `100` | Minimum duration of the active level on a trigger input in milliseconds |
| `trigger-duration-inactive` | Trigger duration inactive | `<0-60000>` | `100` | Minimum duration of the inactive level on a trigger input in milliseconds |
| `trigger-report-active` | Trigger report active | `true`, `false` | `false` | Report immediately when a trigger input becomes active |
| `trigger-report-inactive` | Trigger report inactive | `true`, `false` | `false` | Report immediately when a trigger input becomes inactive |
| `event-report-delay` | Event report delay | `<1-86400>` | `5` | Delay between an event and its report in seconds; changes within the delay go into the same report |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Event reports per hour at most (firmware v4.0.1 sends up to one more); the limit counts event reports only |
| `counter-input-type` | Counter input type | `npn`, `pnp` | `npn` | Input logic of the counter channels |
| `counter-duration-active` | Counter duration active | `<0-60000>` | `2` | Minimum duration of the active level on a counter input in milliseconds |
| `counter-duration-inactive` | Counter duration inactive | `<0-60000>` | `2` | Minimum duration of the inactive level on a counter input in milliseconds |
| `counter-interval-aggreg` | Counter interval aggreg | `<1-86400>` | `300` | Aggregation interval of the counter channels in seconds |
| `analog-interval-sample` | Analog interval sample | `<1-86400>` | `60` | Sampling interval of the voltage and current channels and of the Bluetooth tags in seconds |
| `analog-interval-aggreg` | Analog interval aggreg | `<1-86400>` | `300` | Aggregation interval of the voltage and current channels and of the Bluetooth tags in seconds |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Sampling interval of the DS18B20 thermometers and soil sensors in seconds |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Aggregation interval of the DS18B20 thermometers and soil sensors in seconds |

The trigger, counter and analog parameters apply to the channels set to the matching mode. The network mode is described in [**Network Mode Configuration**](../common-functionality.md#network-mode-configuration).

Choose the intervals so that the buffers suffice. Between two aggregations, each voltage or current channel keeps up to 64 samples, each 1-Wire sensor 32 and each Bluetooth tag 16. Between two reports, each counter, voltage and current channel and each DS18B20 thermometer keeps up to 64 aggregated values, each soil sensor 32, each Bluetooth tag 16 and each trigger channel 128 events. Values beyond that are dropped.

### Data over LTE {#data-over-lte}

CHESTER Control sends a report every `interval-report` seconds, shifted at random by up to ±20 % of the interval. A change of a trigger input adds a report of its own when `trigger-report-active` or `trigger-report-inactive` is on, and CHESTER Control Z also reports a change of external power. Over NB-IoT/LTE, a report carries everything the device collected since the previous one; over LoRaWAN, only the latest values.

Each entry of a `measurements` list covers one aggregation interval: `timestamp` is the end of the interval (Unix time) and `min`, `max`, `avg` and `mdn` are the minimum, maximum, average and median of the samples taken in it. The `thermometer` and `accelerometer` values are the latest sample, taken every 60 seconds; the battery values in `system` come from a battery test that runs every 12 hours. When a reading fails, its value is `null`. The CHESTER-X4 outputs follow the downlinks described in [**Output Control**](../../firmware/chester-control/index.md#output-control).

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Control sends `message.version` `1`.

In addition to the common data, CHESTER Control sends:

- [`trigger`](#trigger): channels in the trigger mode
- [`counter`](#counter): channels in the counter mode
- [`voltage`](#voltage): channels in the voltage mode
- [`current`](#current): channels in the current mode
- [`w1_thermometers`](#w1-thermometers): DS18B20 1-Wire thermometers
- [`soil_sensors`](#soil-sensors): 1-Wire soil sensors
- [`ble_tags`](#ble-tags): Bluetooth tags

Each input channel appears in the list of its mode: `trigger`, `counter`, `voltage` or `current`. All four lists are in every report; a list fills once a channel is set to its mode.

#### Trigger Channels {#trigger}

Channels in the `trigger` mode:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `trigger[].channel` | Channel number (1 = terminal A2, 2 = A4, 3 = A5, 4 = A7) | | 1–4 | |
| `trigger[].state` | State of the input at the time of the report | | `inactive`, `active` | |
| `trigger[].events[].timestamp` | Time of an input change (Unix time); the list holds the changes since the previous report, at most 128 | s | | 1 s |
| `trigger[].events[].type` | Direction of the change | | `deactivated`, `activated` | |

#### Counter Channels {#counter}

Channels in the `counter` mode; an entry of `measurements` is added every `counter-interval-aggreg` seconds:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `counter[].channel` | Channel number | | 1–4 | |
| `counter[].value` | Pulses counted since the device started | | 0–18446744073709551615 | 1 |
| `counter[].delta` | Pulses since the previous report | | 0–18446744073709551615 | 1 |
| `counter[].measurements[].timestamp` | Time of the measurement (Unix time) | s | | 1 s |
| `counter[].measurements[].value` | Pulses counted since the device started, at the time of the measurement | | 0–18446744073709551615 | 1 |
| `counter[].measurements[].delta` | Pulses since the previous measurement | | 0–18446744073709551615 | 1 |

#### Voltage Channels {#voltage}

Channels in the `voltage` mode, aggregated over `analog-interval-aggreg`:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `voltage[].channel` | Channel number | | 1–4 | |
| `voltage[].measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `voltage[].measurements[].min`, `max`, `avg`, `mdn` | Voltage on the input | V | 0–26 | 0.01 V |

#### Current Channels {#current}

Channels in the `current` mode, aggregated over `analog-interval-aggreg`:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `current[].channel` | Channel number | | 1–4 | |
| `current[].measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `current[].measurements[].min`, `max`, `avg`, `mdn` | Current in the current loop | mA | 0–24 | 0.01 mA |

The voltage range is that of the [**CHESTER-X0**](../../extension-modules/chester-x0.md) module. The current input measures 0–24 mA, which covers the 4–20 mA current loop; a reading near 0 mA means a broken loop.

#### 1-Wire Thermometers {#w1-thermometers}

`w1_thermometers` has one entry for each DS18B20 thermometer found at startup, at most five; the values are aggregated over `w1-therm-interval-aggreg`. The list is in every report and fills once the device finds a thermometer at startup.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Serial number of the thermometer (48 bits of its 1-Wire ROM code) | | | |
| `w1_thermometers[].measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `w1_thermometers[].measurements[].min`, `max`, `avg`, `mdn` | Temperature | °C | −55 to 125 | 0.01 °C |

#### Soil Sensors {#soil-sensors}

`soil_sensors` has one entry for each [**Soil Moisture Sensor**](/tower/hardware-modules/about-soil-sensor) found at startup, at most three; the values are aggregated over `w1-therm-interval-aggreg`. The list is in every report and fills once the device finds a soil sensor at startup.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `soil_sensors[].serial_number` | Serial number of the sensor (48 bits of its 1-Wire ROM code) | | | |
| `soil_sensors[].temperature.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `soil_sensors[].temperature.measurements[].min`, `max`, `avg`, `mdn` | Temperature in the top part of the sensor, above the soil | °C | −40 to 85 | 0.01 °C |
| `soil_sensors[].moisture.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `soil_sensors[].moisture.measurements[].min`, `max`, `avg`, `mdn` | Soil moisture as a relative value: about 6500 in dry soil, about 13000 in water | | 0–16383 | 1 |

#### Bluetooth Tags {#ble-tags}

`ble_tags` has one entry for each paired [**Bluetooth tag**](../ble-tags.md), at most eight; the values are aggregated over `analog-interval-aggreg`. The list is in every report and fills once a tag is paired.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetooth address of the tag, 12 hexadecimal digits | | | |
| `ble_tags[].rssi` | Signal strength of the tag | dBm | −127 to −1 | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag | V | 2.0–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `ble_tags[].temperature.measurements[].min`, `max`, `avg`, `mdn` | Temperature | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[].timestamp` | End of the aggregation interval (Unix time) | s | | 1 s |
| `ble_tags[].humidity.measurements[].min`, `max`, `avg`, `mdn` | Relative humidity | % | 0–100 | 0.01 % |

### Data over LoRaWAN {#data-over-lorawan}

In the `lrw` mode, every report is one LoRaWAN message with the latest values. The fields below are the output of the ChirpStack decoder [**cs-decoder.js**](https://github.com/hardwario/chester-sdk/blob/v4.0.1/applications/control/codec/cs-decoder.js) of CHESTER SDK v4.0.1. When a reading fails, its value is `null`.

Every uplink carries the common LoRaWAN fields described in [**Common Functionality**](../common-functionality.md#common-data-lorawan) and the fields in the table below.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[]` | Latest temperature of each DS18B20 thermometer | °C | −55 to 125 | 0.01 °C |
| `ble_tags[].temperature` | Latest temperature of each paired Bluetooth tag | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity` | Latest relative humidity of each paired Bluetooth tag | % | 0–100 | 0.5 % |
| `inputs_a[].type` | Mode of the channel; one entry for each of the channels 1 to 4, in this order | | `trigger`, `counter`, `voltage`, `current`, `disabled` | |
| `inputs_a[].state` | Trigger: state of the input at the time of the report, `true` when active | | `true`, `false` | |
| `inputs_a[].trigger_active` | Trigger: the first change since the previous report was an activation | | `true`, `false` | |
| `inputs_a[].trigger_inactive` | Trigger: the first change since the previous report was a deactivation | | `true`, `false` | |
| `inputs_a[].count` | Counter: pulses counted since the device started; a higher count is sent as the maximum | | 0–4294967295 | 1 |
| `inputs_a[].delta` | Counter: pulses since the previous report; a higher count is sent as the maximum | | 0–65535 | 1 |
| `inputs_a[].voltage` | Voltage: latest sample | V | 0–26 | 0.01 V |
| `inputs_a[].current` | Current: latest sample | mA | 0–24 | 0.01 mA |

A LoRaWAN message holds at most 51 bytes: 11 bytes of fixed fields, 2 bytes for each DS18B20 thermometer, 3 bytes for each Bluetooth tag and, for each channel, 2 bytes (trigger), 7 bytes (counter), 3 bytes (voltage, current) or 1 byte (disabled). The device sends a LoRaWAN message only when all its fields fit into these 51 bytes.

## CHESTER Control Z {#chester-control-z}

**CHESTER Control Z** is CHESTER Control with the **CHESTER-Z1** backup module:

- Keeps running on the backup battery when external power fails.
- Reports the external power voltage and the backup battery voltage, and reports immediately when external power fails and when it returns.
- Output switching on CHESTER-X4:B, with `output_X_state` downlinks and six button presses, is part of the [**CHESTER Control firmware**](../../firmware/chester-control/index.md#output-control); the v4.0.1 firmware of this variant reads the inputs and reports the backup power.

This variant runs the [**CHESTER Control Z firmware**](../../firmware/chester-control/chester-control-z.md).

### Hardware {#chester-control-z-hardware}

The hardware of this variant consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-X4:B`: Step-down + outputs (4 channels)

* `CHESTER-Z1`: Backup module

### Settings {#chester-control-z-settings}

CHESTER Control Z uses the settings of [CHESTER Control](#settings) and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |

`event-report-delay` and `event-report-rate` also apply to the backup power events.

### Data {#chester-control-z-data}

CHESTER Control Z sends the data of [CHESTER Control](#data-over-lte) and the [`backup`](#backup) structure.

#### Backup Module {#backup}

CHESTER Control Z adds the `backup` structure:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage on the VIN input of CHESTER-Z1: 6–26 V with external power connected, near 0 when it is disconnected | V | 0–26 | 0.01 V |
| `backup.batt_voltage` | Voltage of the backup battery; the cell protection cuts off below 3.2 V and the charger charges it to 4.2 V | V | 3.2–4.2 | 0.01 V |
| `backup.state` | State of the external power | | `disconnected`, `connected` | |
| `backup.events` | Changes of the external power since the previous report, at most 64, as a list of numbers | | | |

The CHESTER Control decoder passes `backup.events` on as a plain list of numbers: the Unix time of the first change, then two numbers for each change, its offset from that time in seconds and `1` for connected or `0` for disconnected. For example, `[1705328233, 0, 0, 95, 1]` means that external power failed at 1705328233 and returned 95 seconds later.

#### Over LoRaWAN {#chester-control-z-data-lorawan}

The uplink carries the fields of [CHESTER Control](#data-over-lorawan): the common LoRaWAN fields, `w1_thermometers`, `ble_tags` and `inputs_a`.

## CHESTER Control 8Ch Z {#chester-control-8ch-z}

The [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) firmware reads eight inputs on two CHESTER-X0 modules, in slots A and B, and supports the CHESTER-Z backup module. It is a separate firmware build, described on its firmware page.

### Settings {#settings-chester-control-8ch-z}

The [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) firmware uses the settings of [CHESTER Control](#settings) and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `channel-mode-5` | Channel mode 5 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 5 (CHESTER-X0 in slot B, terminal B2) |
| `channel-mode-6` | Channel mode 6 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 6 (terminal B4) |
| `channel-mode-7` | Channel mode 7 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 7 (terminal B5) |
| `channel-mode-8` | Channel mode 8 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 8 (terminal B7) |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |

The trigger, counter and analog parameters apply to all eight channels, and `event-report-delay` and `event-report-rate` also apply to the backup power events.

### Data {#data-chester-control-8ch-z}

The [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) firmware, for two CHESTER-X0 modules and the CHESTER-Z backup module, sends the data of [CHESTER Control](#data-over-lte) with these additions:

- The `trigger`, `counter`, `voltage` and `current` lists also hold channels 5 to 8: `channel` is 1–8, and channels 5 to 8 are the terminals B2, B4, B5 and B7.
- It adds the `backup` structure described under [**Backup Module**](#backup).

#### Over LoRaWAN {#chester-control-8ch-z-data-lorawan}

The uplink carries the fields of [CHESTER Control](#data-over-lorawan) and `inputs_b` with channels 5 to 8, in the same format as `inputs_a`. The eight channels count toward the 51-byte limit, so six channels in the `counter` mode already exceed it.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
