---
title: CHESTER Current 1W
description: "CHESTER Current 1W doplňuje měření proudu aplikace CHESTER Current o několik externích teplotních sond DS18B20 1-Wire."
---

# CHESTER Current 1W {#chester-current-1w}

**CHESTER Current 1W** je varianta aplikace [**CHESTER Current**](index.md) pro více externích teplotních sond **DS18B20** 1-Wire.

:::info Firmware

Tato varianta používá hlavní **[firmware CHESTER Current](../../firmware/chester-current/index.md)**, který podporu sond DS18B20 1-Wire obsahuje. Samostatné sestavení CHESTER Current 1W existuje jen pro Cloud Legacy, v části [**Firmware aplikací pro Cloud Legacy**](../../firmware/index.md#application-firmware-cloud-v1).

:::

## Rozdíly oproti aplikaci CHESTER Current {#differences-from-chester-current}

- Kromě proudu měří teplotu několika sondami DS18B20 1-Wire.
- Sondy mají vlastní interval vzorkování a agregace (parametry `w1-therm-interval-sample` a `w1-therm-interval-aggreg`).

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-K1-1C-2C-3C-4C`: 4x diferenciální vstup + 5 V boost
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).
