---
title: CHESTER Clime RTD
description: "Firmware CHESTER Clime RTD: čím se liší od hlavního firmwaru CHESTER Clime při měření dvěma sondami Pt100 nebo Pt1000 na modulu CHESTER-X3A."
---

# CHESTER Clime RTD {#chester-clime-rtd}

**CHESTER Clime RTD** je firmware CHESTER Clime sestavený pro dva odporové teploměry (Pt100 nebo Pt1000) na modulu **CHESTER-X3A**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává modul **CHESTER-X3A** ve slotu A: rozhraní pro dvě sondy Pt100/Pt1000 (viz [**CHESTER-X3A**](../../ordering-codes.md#chester-x3a)).
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Konfigurační parametry {#configuration-parameters}

Parametry `hygro-t-alarm-*` nejsou k dispozici. Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje hodnoty z obou sond, jednu položku pro každý kanál, a nemá strukturu `hygrometer`.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

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

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime-rtd:v4.0.1](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `f1cd7285ec574e159eb16ec9447163b6`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6/hex), SHA256 `3a561da26cb73418a095018b96ae1e16ca68a51ef317831eae05fe48f0493073`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6/bin), SHA256 `2d7230d6d2f2cd0ab7167819c893aa55396d184af625b97de57f75b8877f3993`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime RTD"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
