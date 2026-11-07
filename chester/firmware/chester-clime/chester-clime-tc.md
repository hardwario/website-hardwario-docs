---
title: CHESTER Clime TC
description: "CHESTER Clime TC firmware: what it changes against the main CHESTER Clime firmware for two type K thermocouples on the CHESTER-X3B module."
---

# CHESTER Clime TC

**CHESTER Clime TC** is the CHESTER Clime firmware built for two **type K** thermocouples on the **CHESTER-X3B** module. Everything this page does not mention works as described for [**CHESTER Clime**](index.md).

## Differences from CHESTER Clime

### Hardware

- Adds **CHESTER-X3B** in slot A: an interface for two type K thermocouples (see [**CHESTER-X3B**](../../ordering-codes.md#chester-x3b)).
- Does not support the **CHESTER-S2** hygrometer.

### Configuration Parameters

The `hygro-t-alarm-*` parameters are not available. All other parameters are the same.

### Data

The fields of `tc_thermometer`, with their units, ranges and resolutions, are described on the catalog page under [**Thermocouples**](../../catalog-applications/chester-clime/index.md#tc-thermometer).

The report adds a `tc_thermometer` structure with one entry for each thermocouple: `channel` and `measurements`, where each measurement has a timestamp and the `min`, `max`, `avg` and `mdn` temperature in °C. There is no `hygrometer` structure. Over LoRaWAN the two temperatures come as `tc_thermometers`.

## Firmware Build

- **Firmware:** [hio-chester-clime-tc:v4.0.1](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `94d596f453d24ac3bef6fc8195b80028`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028/hex), SHA256 `553f13f3ccd952dbfc8c85e0a209aca2e21030f11b8d5eef7d3e40a5912a29f9`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028/bin), SHA256 `3d8845fd91093e30ba3d561f45c8f8e86fb41298c87c1cf4b8234f9bdf54abe9`
- **Build from the SDK:** `west chester-update clime --variant "CHESTER Clime TC"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
