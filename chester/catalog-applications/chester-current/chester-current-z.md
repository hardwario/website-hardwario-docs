---
title: CHESTER Current Z
description: "CHESTER Current Z adds the CHESTER-Z1 backup module to CHESTER Current, so the device keeps measuring and reports when external power fails."
---

# CHESTER Current Z

**CHESTER Current Z** is [**CHESTER Current**](index.md) with the **CHESTER-Z1** backup module.

:::info Firmware

This variant runs the **[CHESTER Current Z firmware](../../firmware/chester-current/chester-current-z.md)**.

:::

## Differences from CHESTER Current

- Keeps running on the backup battery when external power fails.
- Sends the battery voltage and the external DC voltage in every report.
- Reports immediately when external power fails and when it returns.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-K1-1C-2C-3C-4C`: 4x Diff. Input + 5 V Boost
* `CHESTER-Z1`: Backup module
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.
