---
title: CHESTER Clime RTD
description: "CHESTER Clime RTD firmware: what it changes against the main CHESTER Clime firmware for two Pt1000 probes on the CHESTER-X3A module."
---

# CHESTER Clime RTD

**CHESTER Clime RTD** is the CHESTER Clime firmware built for two Pt1000 resistance thermometers on the **CHESTER-X3A** module. Everything this page does not mention works as described for [**CHESTER Clime**](index.md).

## Differences from CHESTER Clime

### Hardware

- Adds **CHESTER-X3A** in slot A: an interface for two Pt100/Pt1000 probes, of which firmware v4.0.1 reads Pt1000 only (see [**CHESTER-X3A**](../../ordering-codes.md#chester-x3a)).
- Does not support the **CHESTER-S2** hygrometer.

### Configuration Parameters

The `hygro-t-alarm-*` parameters are not available. All other parameters are the same.

### Data

The fields of `rtd_thermometer`, with their units, ranges and resolutions, are described on the catalog page under [**RTD Thermometers**](../../catalog-applications/chester-clime/index.md#rtd-thermometer).

The report adds an `rtd_thermometer` structure with one entry for each input of CHESTER-X3A (`channel` 1 and 2), and has no `hygrometer` structure. Over LoRaWAN the two temperatures come as `rtd_thermometers`.

The example is shortened to two aggregated values:

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "rtd_thermometer": [
    {
      "channel": 1,
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 63.42,
          "max": 63.81,
          "avg": 63.6,
          "mdn": 63.58
        },
        {
          "timestamp": 1793953200,
          "min": 63.37,
          "max": 63.76,
          "avg": 63.55,
          "mdn": 63.54
        }
      ]
    },
    {
      "channel": 2,
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 18.12,
          "max": 18.2,
          "avg": 18.16,
          "mdn": 18.16
        },
        {
          "timestamp": 1793953200,
          "min": 18.09,
          "max": 18.17,
          "avg": 18.13,
          "mdn": 18.13
        }
      ]
    }
  ]
}
```

</details>

## Firmware Build

- **Firmware:** [hio-chester-clime-rtd:v4.0.1](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `f1cd7285ec574e159eb16ec9447163b6`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6/hex), SHA256 `3a561da26cb73418a095018b96ae1e16ca68a51ef317831eae05fe48f0493073`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6/bin), SHA256 `2d7230d6d2f2cd0ab7167819c893aa55396d184af625b97de57f75b8877f3993`
- **Build from the SDK:** `west chester-update clime --variant "CHESTER Clime RTD"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
