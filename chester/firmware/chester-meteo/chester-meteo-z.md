---
title: CHESTER Meteo Z
description: "CHESTER Meteo Z firmware: what it changes against the main CHESTER Meteo firmware for the CHESTER-Z1 backup module."
---

# CHESTER Meteo Z

**CHESTER Meteo Z** is the CHESTER Meteo firmware built for the **CHESTER-Z1** backup module. Everything this page does not mention works as described for [**CHESTER Meteo**](index.md).

## Differences from CHESTER Meteo

### Hardware

- Adds **CHESTER-Z1**, the backup module with a backup battery (see [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).
- The main CHESTER Meteo firmware has no support for the backup module, so a device with CHESTER-Z1 needs this build.

### Behavior

- Monitors external power and the voltage of the backup battery.
- Reports immediately when external power fails and when it returns. The `event-report-delay` and `event-report-rate` parameters apply to these reports.

### Configuration Parameters

Added parameters for the backup module:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |

All other parameters are the same.

### Data

The report adds a `backup` structure with the voltage of the DC input (`line_voltage`) and of the backup battery (`batt_voltage`) in mV, the `state` of external power (`connected` or `disconnected`) and its `events` since the previous report (`connected`, `disconnected`). In LoRaWAN mode, the backup values are not sent. Every field, with its unit, range and resolution, is described on the catalog page under [**CHESTER Meteo Z**](../../catalog-applications/chester-meteo/index.md#chester-meteo-z).

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "backup": {
    "line_voltage": 24209,
    "batt_voltage": 4090,
    "state": "connected",
    "events": [
      {
        "timestamp": 1793606224,
        "type": "disconnected"
      },
      {
        "timestamp": 1793606403,
        "type": "connected"
      }
    ]
  }
}
```

</details>

## Firmware Build

- **Firmware:** [hio-chester-meteo-z:v4.0.1](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `f3ce30b40ad6404b9ef3e661330d2f24`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24/hex), SHA256 `05511cda9fdc6f31f3c8bc660738421b835f1f2609e4361ceb3cfd561071f10d`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24/bin), SHA256 `c4838d74fffb6b12074b7cf241494b3576dcf75f55c8e1f2f8e84bf016775646`
- **Build from the SDK:** `west chester-update meteo --variant "CHESTER Meteo Z"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
