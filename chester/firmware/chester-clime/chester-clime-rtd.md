---
title: CHESTER Clime RTD
description: "CHESTER Clime RTD firmware: what it changes against the main CHESTER Clime firmware for two Pt100 or Pt1000 probes on the CHESTER-X3A module."
---

# CHESTER Clime RTD

**CHESTER Clime RTD** is the CHESTER Clime firmware built for two resistance thermometers (Pt100 or Pt1000) on the **CHESTER-X3A** module. Everything this page does not mention works as described for [**CHESTER Clime**](index.md).

## Differences from CHESTER Clime

### Hardware

- Adds **CHESTER-X3A** in slot A: an interface for two Pt100/Pt1000 probes (see [**CHESTER-X3A**](../../ordering-codes.md#chester-x3a)).
- Does not support the **CHESTER-S2** hygrometer.

### Configuration Parameters

The `hygro-t-alarm-*` parameters are not available. All other parameters are the same.

### Data

The report adds the readings of both probes, one entry for each channel, and has no `hygrometer` structure.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "rtd_thermometers": [
    {
      "channel": 1,
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.18,
          "max": 22.25,
          "avg": 22.23,
          "mdn": 22.25
        },
        {
          "timestamp": 1668858042,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858342,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858642,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.17,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858942,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668859242,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        }
      ]
    },
    {
      "channel": 2,
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.18,
          "max": 22.25,
          "avg": 22.23,
          "mdn": 22.25
        },
        {
          "timestamp": 1668858042,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858342,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858642,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.17,
          "mdn": 22.18
        },
        {
          "timestamp": 1668858942,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
        },
        {
          "timestamp": 1668859242,
          "min": 22.18,
          "max": 22.18,
          "avg": 22.18,
          "mdn": 22.18
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
