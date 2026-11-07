---
title: CHESTER Clime TC
description: "Firmware CHESTER Clime TC: čím se liší od hlavního firmwaru CHESTER Clime při měření dvěma termočlánky typu K na modulu CHESTER-X3B."
---

# CHESTER Clime TC {#chester-clime-tc}

**CHESTER Clime TC** je firmware CHESTER Clime sestavený pro dva termočlánky **typu K** na modulu **CHESTER-X3B**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává modul **CHESTER-X3B** ve slotu A: rozhraní pro dva termočlánky typu K (viz [**CHESTER-X3B**](../../ordering-codes.md#chester-x3b)).
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Konfigurační parametry {#configuration-parameters}

Parametry `hygro-t-alarm-*` nejsou k dispozici. Ostatní parametry jsou stejné.

### Data {#data}

Pole struktury `tc_thermometer` s jednotkami, rozsahy a rozlišením popisuje stránka katalogové aplikace v části [**Termočlánky**](../../catalog-applications/chester-clime/index.md#tc-thermometer).

Hlášení navíc obsahuje strukturu `tc_thermometer` s jednou položkou pro každý termočlánek: `channel` a `measurements`, kde každé měření má časovou značku a teplotu `min`, `max`, `avg` a `mdn` v °C. Struktura `hygrometer` v hlášení není. Přes LoRaWAN přicházejí obě teploty jako `tc_thermometers`.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime-tc:v4.0.1](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `94d596f453d24ac3bef6fc8195b80028`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028/hex), SHA256 `553f13f3ccd952dbfc8c85e0a209aca2e21030f11b8d5eef7d3e40a5912a29f9`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028/bin), SHA256 `3d8845fd91093e30ba3d561f45c8f8e86fb41298c87c1cf4b8234f9bdf54abe9`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime TC"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
