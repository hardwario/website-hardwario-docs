---
title: CHESTER Clime SPS30
description: "CHESTER Clime SPS30 firmware: what it changes against the main CHESTER Clime firmware for the Sensirion SPS30 particulate matter sensor."
---

# CHESTER Clime SPS30

**CHESTER Clime SPS30** is the CHESTER Clime firmware built for the **Sensirion SPS30** particulate matter sensor. Everything this page does not mention works as described for [**CHESTER Clime**](index.md).

## Differences from CHESTER Clime

### Hardware

- Adds the **Sensirion SPS30** particulate matter sensor.
- Does not support the **CHESTER-S2** hygrometer.

### Configuration Parameters

The `hygro-t-alarm-*` parameters are not available. All other parameters are the same.

### Data

The fields of `sps30`, with their units, ranges and resolutions, are described on the catalog page under [**Particulate Matter Sensor**](../../catalog-applications/chester-clime/index.md#sps30).

The report adds an `sps30` structure, and there is no `hygrometer` structure. Each value in it has `measurements` with a timestamp and the `min`, `max`, `avg` and `mdn` values:

| Key | Value | Unit |
| :--- | :--- | :--- |
| `pm1`, `pm2_5`, `pm4`, `pm10` | Mass concentration of particles up to 1, 2.5, 4 and 10 µm | µg/m³ |
| `num_pm0_5`, `num_pm1`, `num_pm2_5`, `num_pm4`, `num_pm10` | Number concentration of particles up to 0.5, 1, 2.5, 4 and 10 µm | #/cm³ |

Over LoRaWAN the firmware sends no SPS30 values.

## Firmware Build

- **Firmware:** [hio-chester-clime-sps30:v4.0.1](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `2d964ba3d4db4ea8902c9ce01d1838b0`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0/hex), SHA256 `c2998e68a1f4d06800762c4e1a87e093c00c538ab211072b21116f5e1e84267d`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0/bin), SHA256 `625b901de90f4a8ec6dacc53db791b6539adc5c006357b3bc7e93fe4bf5d8c93`
- **Build from the SDK:** `west chester-update clime --variant "CHESTER Clime SPS30"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
