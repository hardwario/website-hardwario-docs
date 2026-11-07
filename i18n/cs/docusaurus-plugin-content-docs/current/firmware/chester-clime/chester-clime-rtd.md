---
title: CHESTER Clime RTD
description: "Firmware CHESTER Clime RTD: čím se liší od hlavního firmwaru CHESTER Clime při měření dvěma sondami Pt1000 na modulu CHESTER-X3A."
---

# CHESTER Clime RTD {#chester-clime-rtd}

**CHESTER Clime RTD** je firmware CHESTER Clime sestavený pro dva odporové teploměry Pt1000 na modulu **CHESTER-X3A**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává modul **CHESTER-X3A** ve slotu A: rozhraní pro dvě sondy Pt100/Pt1000, z nichž firmware v4.0.1 čte jen Pt1000 (viz [**CHESTER-X3A**](../../ordering-codes.md#chester-x3a)).
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Konfigurační parametry {#configuration-parameters}

Parametry `hygro-t-alarm-*` nejsou k dispozici. Ostatní parametry jsou stejné.

### Data {#data}

Pole struktury `rtd_thermometer` s jednotkami, rozsahy a rozlišením popisuje stránka katalogové aplikace v části [**Odporové teploměry**](../../catalog-applications/chester-clime/index.md#rtd-thermometer).

Hlášení navíc obsahuje strukturu `rtd_thermometer` s jednou položkou pro každý vstup modulu CHESTER-X3A (`channel` 1 a 2) a nemá strukturu `hygrometer`. Přes LoRaWAN přicházejí obě teploty jako `rtd_thermometers`.

Ukázka je zkrácená na dvě agregované hodnoty:

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

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

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime-rtd:v4.0.1](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `f1cd7285ec574e159eb16ec9447163b6`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6/hex), SHA256 `3a561da26cb73418a095018b96ae1e16ca68a51ef317831eae05fe48f0493073`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6/bin), SHA256 `2d7230d6d2f2cd0ab7167819c893aa55396d184af625b97de57f75b8877f3993`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime RTD"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
