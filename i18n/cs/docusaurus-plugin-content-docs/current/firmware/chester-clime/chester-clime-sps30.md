---
title: CHESTER Clime SPS30
description: "Firmware CHESTER Clime SPS30: čím se liší od hlavního firmwaru CHESTER Clime při měření prachových částic senzorem Sensirion SPS30."
---

# CHESTER Clime SPS30 {#chester-clime-sps30}

**CHESTER Clime SPS30** je firmware CHESTER Clime sestavený pro senzor prachových částic **Sensirion SPS30**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává senzor prachových částic **Sensirion SPS30**.
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Konfigurační parametry {#configuration-parameters}

Parametry `hygro-t-alarm-*` nejsou k dispozici. Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `sps30` a nemá strukturu `hygrometer`. Každá hodnota v ní má `measurements` s časovou značkou a hodnotami `min`, `max`, `avg` a `mdn`:

| Klíč | Hodnota | Jednotka |
| :--- | :--- | :--- |
| `pm1`, `pm2_5`, `pm4`, `pm10` | Hmotnostní koncentrace částic do 1; 2,5; 4 a 10 µm | µg/m³ |
| `num_pm0_5`, `num_pm1`, `num_pm2_5`, `num_pm4`, `num_pm10` | Početní koncentrace částic do 0,5; 1; 2,5; 4 a 10 µm | #/cm³ |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime-sps30:v4.0.1](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `2d964ba3d4db4ea8902c9ce01d1838b0`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0/hex), SHA256 `c2998e68a1f4d06800762c4e1a87e093c00c538ab211072b21116f5e1e84267d`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0/bin), SHA256 `625b901de90f4a8ec6dacc53db791b6539adc5c006357b3bc7e93fe4bf5d8c93`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime SPS30"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
