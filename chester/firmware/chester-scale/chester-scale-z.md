---
title: CHESTER Scale Z
description: "CHESTER Scale Z firmware: what it changes against the main CHESTER Scale firmware to support the CHESTER-Z1 backup module."
---

# CHESTER Scale Z

**CHESTER Scale Z** is the CHESTER Scale firmware built for the **CHESTER-Z1** backup module. Everything this page does not mention works as described for [**CHESTER Scale**](index.md).

## Differences from CHESTER Scale

### Hardware

- Adds **CHESTER-Z1**: a backup battery and monitoring of the external DC input (see [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).
- Unlike CHESTER Clime, the CHESTER Scale firmware does not detect the module at runtime, so the backup functions need this build.

### Behavior

* The current **battery voltage** and **external DC voltage** are sent in every report.
* When the DC power input changes, the timestamp of the change event is stored together with the **connected**/**disconnected** state. The events are buffered (up to 32) and sent at the latest with the regular report (parameter `interval-report`).
* Optionally, DC power input changes to the **connected** (parameter `backup-report-connected`) or **disconnected** (parameter `backup-report-disconnected`) states can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`), so that further changes arriving shortly after the first one go into the same report.
* The maximum number of event reports per hour is configurable (parameter `event-report-rate`). The regular reports set by `interval-report` do not count toward it.

### Configuration Parameters

Added parameters for the backup module:

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `event-report-delay` | `<1-86400>` | `1` | Delay between a power change and its report in seconds |
| `event-report-rate` | `<1-3600>` | `30` | Event reports per hour at most; periodic reports do not count toward this limit |
| `backup-report-connected` | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | `true`, `false` | `true` | Report immediately when external power fails |

All other parameters are the same.

### Data

The report adds a `backup` structure with the voltages of the external DC input (`line_voltage`) and of the backup battery (`batt_voltage`) in mV, the `state` (`connected` or `disconnected`) and the `events` since the last report, each with `timestamp` and `type` (`connected`, `disconnected`). LoRaWAN uplinks carry no backup data.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "backup": {
    "line_voltage": 24010,
    "batt_voltage": 4090,
    "state": "connected",
    "events": []
  }
}
```

</details>

## Firmware Build

- **Firmware:** [hio-chester-scale-z:v4.0.1](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `41adb245a2c74438a2baaf300b815abb`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb/hex), SHA256 `cc407b752ec75a0071cf9d02f568f1dc6a15f937f0efa1fe43ddd7909e9c4e17`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb/bin), SHA256 `146094947aefabb9ced2d7969e46a6c5eb84e0c7bb7bbec70ed105fa7120c74e`
- **Build from the SDK:** `west chester-update scale --variant "CHESTER Scale Z"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
