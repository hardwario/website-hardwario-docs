---
title: CHESTER Control Z
description: "CHESTER Control Z firmware: what it changes against the main CHESTER Control firmware for the CHESTER-Z backup module."
---

# CHESTER Control Z

**CHESTER Control Z** is the CHESTER Control firmware built for the **CHESTER-Z** backup module. Everything this page does not mention works as described for [**CHESTER Control**](index.md).

## Differences from CHESTER Control

### Hardware

- Adds **CHESTER-Z**: a backup battery and an external power input with voltage monitoring (see [**CHESTER-Z1**](../../ordering-codes.md#chester-z)). The firmware needs the module: without it, the initialization fails and the watchdog restarts the device after about two minutes.
- Does not support the outputs of **CHESTER-X4**: the firmware does not switch them, so downlink messages with `output_X_state` and six button presses have no effect.

### Behavior

The backup module reports the state of the backup battery and of the external DC power:

* The current **backup battery voltage** and **external DC voltage** are sent in every report over NB-IoT/LTE.

* When the DC power input changes, the timestamp of the change event is stored together with the **connected**/**disconnected** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report (parameter `interval-report`).

* By default, a change to the **connected** (parameter `backup-report-connected`) or **disconnected** (parameter `backup-report-disconnected`) state also starts a report of its own. The report follows after the **delay** set by `event-report-delay`, so that subsequent changes go into the same report.

* The maximum number of reports per hour is configurable (parameter `event-report-rate`). The event throttling limits communication bandwidth and preserves the battery lifespan.

### Configuration Parameters

Added parameters for the backup module:

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `backup-report-connected` | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | `true`, `false` | `true` | Report immediately when external power fails |

The `event-report-delay` and `event-report-rate` parameters also apply to the backup power events. All other parameters are the same.

### Data

The report adds a `backup` structure with the external line voltage (`line_voltage`), the backup battery voltage (`batt_voltage`), the power `state` (`connected` or `disconnected`) and the power `events`. LoRaWAN messages do not carry the backup data.

## Firmware Build

- **Firmware:** [hio-chester-control-z:v4.0.1](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `9d8514b702144c2d956640ee31f65cb0`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0/hex), SHA256 `41a07a19d6835fa676ac9a3502b0b3310a8b8669503da2414dcd4201c31584b1`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0/bin), SHA256 `87026795bb07ddf4b3ea7e7653cd484b273f140a20e883b62a7f958585145e5b`
- **Build from the SDK:** `west chester-update control --variant "CHESTER Control Z"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
