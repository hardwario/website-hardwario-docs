---
title: CHESTER Control Z
description: "CHESTER Control Z adds the CHESTER-Z1 backup module to CHESTER Control, so the device keeps running and reports when external power fails."
---

# CHESTER Control Z

**CHESTER Control Z** is [**CHESTER Control**](index.md) with the **CHESTER-Z1** backup module.

:::info Firmware

This variant runs the **[CHESTER Control Z firmware](../../firmware/chester-control/chester-control-z.md)**.

:::

## Differences from CHESTER Control

- Keeps running on the backup battery when external power fails.
- Reports the external power voltage and the backup battery voltage, and reports immediately when external power fails and when it returns.
- The firmware v4.0.1 of this variant is built without CHESTER-X4 support, so it does not switch the outputs.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-X4:B`: Step-down + outputs (4 channels)

* `CHESTER-Z1`: Backup module

See [**Ordering Codes**](../../ordering-codes.md) for more details.
