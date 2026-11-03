---
title: CHESTER Current 1W
description: "CHESTER Current 1W adds several external DS18B20 1-Wire temperature probes to the current measurement of CHESTER Current."
---

# CHESTER Current 1W

**CHESTER Current 1W** is the variant of [**CHESTER Current**](index.md) for multiple external **DS18B20** 1-Wire temperature probes.

:::info Firmware

This variant runs the main **[CHESTER Current firmware](../../firmware/chester-current/index.md)**, which has DS18B20 1-Wire support built in. A separate CHESTER Current 1W build exists only for Cloud Legacy, in [**Application Firmware for Cloud Legacy**](../../firmware/index.md#application-firmware-cloud-v1).

:::

## Differences from CHESTER Current

- Measures temperature with several DS18B20 1-Wire probes in addition to the current.
- The probes have their own sampling and aggregation intervals (parameters `w1-therm-interval-sample` and `w1-therm-interval-aggreg`).

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-K1-1C-2C-3C-4C`: 4x Diff. Input + 5 V Boost
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.
