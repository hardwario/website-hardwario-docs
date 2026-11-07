---
title: CHESTER Clime Radon
description: "CHESTER Clime Radon firmware: what it changes against the main CHESTER Clime firmware for the Piketronic RPP-R radon probe on RS-485 Modbus."
---

# CHESTER Clime Radon

**CHESTER Clime Radon** is the CHESTER Clime firmware built for the [**Piketronic RPP-R**](../../supported-devices/modbus/piketronic-rpp-r.md) radon probe, connected over RS-485 Modbus. Everything this page does not mention works as described for [**CHESTER Clime**](index.md). The same probe can also be read by the [**CHESTER Serial RS-485**](../chester-serial/chester-serial-rs485.md) firmware with its `piketronic` driver, which the probe page describes.

## Differences from CHESTER Clime

### Hardware

- Adds **CHESTER-X2** in slot A, the RS-485 interface for the radon probe.
- Does not support the **CHESTER-S2** hygrometer.

### Configuration Parameters

The `hygro-t-alarm-*` parameters are not available. The Modbus connection of the probe has its own settings, under the `radon config` command:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `19200` | Baud rate |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | Modbus address of the probe |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even` | `even` | Parity |
| `modbus-stop-bits` | Modbus stop bits | `1`, `2` | `1` | Stop bits |

Example: `radon config modbus-addr 2`, then `config save`.

### Commands

| Command | Action |
| :--- | :--- |
| `radon read` | Read the probe now and print the values |

### Data

The fields of `radon_probe`, with their units, ranges and resolutions, are described on the catalog page under [**Radon Probe**](../../catalog-applications/chester-clime/index.md#radon-probe).

The report adds a `radon_probe` structure, and there is no `hygrometer` structure:

| Key | Value | Unit |
| :--- | :--- | :--- |
| `concentration_hourly` | Radon concentration, moving average over the last hour; each `measurements` entry has `timestamp` and `value` | Bq/m³ |
| `concentration_daily` | Radon concentration, moving average over the last day; each `measurements` entry has `timestamp` and `value` | Bq/m³ |
| `chamber_temperature` | Temperature in the measurement chamber (`min`, `max`, `avg`, `mdn`) | °C |
| `chamber_humidity` | Humidity in the measurement chamber (`min`, `max`, `avg`, `mdn`) | % |

The concentrations are read from the probe at the end of each aggregation interval. Over LoRaWAN the firmware sends no radon values.

## Firmware Build

- **Firmware:** [hio-chester-clime-radon:v4.0.1](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `14682da830f04ce6bf1f48e3f165c288`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288/hex), SHA256 `f36a31b04c4e15e6e11d67c5254198e03636fba3d7758b683ae0d256414a26ed`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288/bin), SHA256 `9d4ebb8b9176229311a0f833f54420c2a7bee672399c1c150c7c4fae5d633ca9`
- **Build from the SDK:** `west chester-update clime --variant "CHESTER Clime Radon"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
