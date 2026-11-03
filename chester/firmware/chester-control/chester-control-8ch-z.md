---
title: CHESTER Control 8Ch Z
description: "CHESTER Control 8Ch Z firmware: what it changes against the main CHESTER Control firmware for eight input channels and the CHESTER-Z backup module."
---

# CHESTER Control 8Ch Z

**CHESTER Control 8Ch Z** is the CHESTER Control firmware built for eight input channels, with a second **CHESTER-X0** module in slot B, and for the **CHESTER-Z** backup module. Everything this page does not mention works as described for [**CHESTER Control**](index.md).

## Differences from CHESTER Control

### Hardware

- Adds a second **CHESTER-X0** in slot B, with channels 5 to 8 on the terminals B2, B4, B5 and B7.
- Adds **CHESTER-Z**: a backup battery and an external power input, as in [**CHESTER Control Z**](chester-control-z.md). Like that firmware, it does not run without the module.
- Does not support the outputs of **CHESTER-X4**, because both slots hold a CHESTER-X0: downlink messages with `output_X_state` and six button presses have no effect.

### Behavior

- Channels 5 to 8 work like channels 1 to 4. The trigger, counter and analog parameters are shared by all eight channels.
- When the second CHESTER-X0 is not detected at startup, the firmware works with channels 1 to 4 only.
- The backup power is reported as described for [**CHESTER Control Z**](chester-control-z.md#behavior).

### Configuration Parameters

Added parameters for channels 5 to 8:

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `channel-mode-5` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 5 (CHESTER-X0 in slot B, terminal B2) |
| `channel-mode-6` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 6 (terminal B4) |
| `channel-mode-7` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 7 (terminal B5) |
| `channel-mode-8` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Mode of channel 8 (terminal B7) |

The backup module adds the parameters `backup-report-connected` and `backup-report-disconnected`, as in [**CHESTER Control Z**](chester-control-z.md#configuration-parameters). All other parameters are the same.

### Commands

The `channel` commands accept the channels 1 to 8.

### Data

- The `trigger`, `counter`, `voltage` and `current` structures also hold channels 5 to 8 (`channel` 5 to 8).
- The report adds the `backup` structure described for [**CHESTER Control Z**](chester-control-z.md#data).
- LoRaWAN messages add `inputs_b` with the state of channels 5 to 8, in the same format as `inputs_a`.

## Firmware Build

- **Firmware:** [hio-chester-control-8ch-z:v4.0.1](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `1e29c5be1d604788908a1a728ae38415`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415/hex), SHA256 `c42fdbdad6e7ffc33f7c9be40b6460af3b79fe30cc9a555daafa6a7e819fc71d`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415/bin), SHA256 `29cf65eb704d01af14f2f6f8474ea227abb2243eb02417db7b8830c86efb912a`
- **Build from the SDK:** `west chester-update control --variant "CHESTER Control 8Ch Z"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
