---
title: CHESTER Range Z
description: "CHESTER Range Z firmware: what it changes against the main CHESTER Range firmware for the CHESTER-Z backup module."
---

# CHESTER Range Z

**CHESTER Range Z** is the CHESTER Range firmware built for the **CHESTER-Z** backup module. Everything this page does not mention works as described for [**CHESTER Range**](index.md).

## Differences from CHESTER Range

### Hardware

- Adds **CHESTER-Z**: a backup battery and an external power input with voltage monitoring (see [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).

### Behavior

- The external power voltage and the backup battery voltage are sent in every report.
- Every change of the external power is stored with its timestamp as a **connected** or **disconnected** event and sent with the next report at the latest.
- A power failure and the return of power can be reported immediately (parameters `backup-report-disconnected` and `backup-report-connected`); the report follows after the delay set by `event-report-delay`, and `event-report-rate` limits the number of such reports per hour.

### Configuration Parameters

Added parameters:

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `event-report-delay` | `<1-86400>` | `1` | Delay between a power change and its report in seconds |
| `event-report-rate` | `<1-3600>` | `30` | Event reports per hour at most; periodic reports do not count toward this limit |
| `backup-report-connected` | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | `true`, `false` | `true` | Report immediately when external power fails |

All other parameters are the same.

### Data

The report adds a `backup` structure with the external line voltage (`line_voltage`), the backup battery voltage (`batt_voltage`), the power `state` (`connected` or `disconnected`) and the power events.

## Firmware Build

- **Firmware:** [hio-chester-range-z:v4.0.1](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `a7fe82069e234fcdae96a69d798a807b`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b/hex), SHA256 `4f57170e580b197a7d63ef268ece8457fa4c6a5ce1f2939cc97de03e3b7a5c5c`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b/bin), SHA256 `a0ff1024deba933b02c776a0d001fb1b6d7ffa15fa2aef8dd1a0b0d49bd16ba2`
- **Build from the SDK:** `west chester-update range --variant "CHESTER Range Z"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
