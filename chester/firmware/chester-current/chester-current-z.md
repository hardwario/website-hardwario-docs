---
title: CHESTER Current Z
description: "CHESTER Current Z firmware: what it changes against the main CHESTER Current firmware to support the CHESTER-Z1 backup module."
---

# CHESTER Current Z

**CHESTER Current Z** is the CHESTER Current firmware built for the **CHESTER-Z1** backup module. Everything this page does not mention works as described for [**CHESTER Current**](index.md).

## Differences from CHESTER Current

### Hardware

- Adds **CHESTER-Z1**: a backup battery and monitoring of the external DC input (see [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).
- Unlike CHESTER Clime, the CHESTER Current firmware does not detect the module at runtime, so the backup functions need this build.

### Behavior

- The current **battery voltage** and **external DC voltage** are sent in every report.
- When the DC power input changes, the timestamp of the change event is stored together with the **connected**/**disconnected** state. The events are buffered (up to 32) and sent at the latest with the regular report (parameter `interval-report`).
- Optionally, DC power input changes to the **connected** (parameter `backup-report-connected`) or **disconnected** (parameter `backup-report-disconnected`) states can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`), so that further changes arriving shortly after the first one go into the same report.
- The maximum number of event reports per hour is configurable (parameter `event-report-rate`). The limit saves the battery and the amount of transferred data; the regular reports set by `interval-report` do not count toward it.

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

The report adds a `backup` structure:

| Key | Value |
| :--- | :--- |
| `line_voltage` | Voltage of the external DC input in V |
| `batt_voltage` | Voltage of the backup battery in V |
| `state` | `connected` when external power is present, otherwise `disconnected` |
| `events` | Power changes since the last report, each with `timestamp` and `type` (`connected`, `disconnected`) |

In LoRaWAN mode, the header has the BACKUP flag (bit 4) set, and the payload adds the external voltage and the battery voltage in mV (2 bytes each) and the state (1 byte) between the 1-Wire thermometers and the channels.

## Firmware Build

- **Firmware:** [hio-chester-current-z:v4.0.1](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `bd7bf21e742f4172ae48378ae55a3d6a`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a/hex), SHA256 `65878e40ce529daeec834db185af0d0aeb5fdb4a0baba46e7993cb163ae8986a`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a/bin), SHA256 `f93fffbd5059872dce0af106a91fed55b3c16a07621f92a9165f0e6972e7951e`
- **Build from the SDK:** `west chester-update current --variant "CHESTER Current Z"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
