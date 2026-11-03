---
title: CHESTER Meteo P
description: "CHESTER Meteo P firmware: what it changes against the main CHESTER Meteo firmware for a pyranometer on the analog inputs of slot B."
---

# CHESTER Meteo P

**CHESTER Meteo P** is the CHESTER Meteo firmware built for a **pyranometer**, a sensor of solar irradiance (build option `CONFIG_APP_PYRANOMETER=y`). Everything this page does not mention works as described for [**CHESTER Meteo**](index.md).

## Differences from CHESTER Meteo

### Hardware

- Adds a pyranometer with a voltage output, read on analog inputs B0 and B1 of expansion slot B. Output B3 of the same slot is switched on for each reading.

### Behavior

- At every sample, the firmware switches on output B3, waits 100 ms, measures the voltage on analog inputs B0 and B1 and switches B3 off again.
- The voltages are aggregated like the other sensors: minimum, maximum, average and median for every aggregation interval.

### Configuration Parameters

All parameters are the same.

### Data

The report adds a `pyranometer` structure with `irradiance_1` (input B0) and `irradiance_2` (input B1). Each has `measurements` with a timestamp and the `min`, `max`, `avg` and `mdn` voltage in mV; the firmware does not convert the voltage to irradiance. In LoRaWAN mode, the pyranometer values are not sent.

## Firmware Build

- **Firmware:** [hio-chester-meteo-p:v4.0.1](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `8ae50ff5d08b436f8caf0926a994bc70`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70/hex), SHA256 `7ce9b1afb2f99ec07b0aa78d12e14b458a0b729e3b4d87879a33181afb81b948`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70/bin), SHA256 `68d850e4873db8c1725d3fc97f6571dff42c1665b7b91bbccc2f4d14595a06d4`
- **Build from the SDK:** `west chester-update meteo --variant "CHESTER Meteo P"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
