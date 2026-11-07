---
title: CHESTER Clime IAQ
description: "Firmware CHESTER Clime IAQ: čím se liší od hlavního firmwaru CHESTER Clime při použití multisenzoru CHESTER-S1 a napájecího vstupu CHESTER-X10."
---

# CHESTER Clime IAQ {#chester-clime-iaq}

**CHESTER Clime IAQ** je firmware CHESTER Clime sestavený pro multisenzor kvality vnitřního ovzduší **CHESTER-S1** a vstup externího napájení **CHESTER-X10**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává modul **CHESTER-S1**, který měří teplotu, vlhkost, osvětlenost, koncentraci CO₂ a atmosférický tlak, senzorem PIR detekuje pohyb a má tlačítko se zvukovým bzučákem.
- Přidává modul **CHESTER-X10**: externí napájení 6–28 V se záložní baterií Li-Ion. Firmware v4.0.1 z něj čte jen to, zda je připojeno externí napájení, a podle toho tlačítko ukazuje úroveň CO₂.
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Chování {#behavior}

- Po stisku tlačítka se na sekundu rozsvítí modrá LED, bzučák pípne a zařízení okamžitě odešle hlášení.
- Barva tlačítka ukazuje úroveň CO₂: **zelená** (hodnoty jsou v pořádku), **oranžová** (varování) a **červená** (alarm). Při napájení z baterie tlačítko každých 5 sekund krátce blikne, při externím napájení přes modul CHESTER-X10 svítí trvale.

:::caution

Varianta CHESTER Clime IAQ ve výchozí konfiguraci odesílá přibližně 800 bajtů dat. Pokud prodloužíte interval hlášení a nezvýšíte zároveň interval agregace,
může být datový buffer větší než MTU protokolu UDP a paket se neodešle. Zařízení se pak tváří, jako by neodesílalo nic nebo jen část paketů.

:::

### Konfigurační parametry {#configuration-parameters}

Přidané parametry pro LED v tlačítku:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `iaq-led-thr-warning` | IAQ LED threshold warning | `<-40.0..5000.0>` | `800.0` | Koncentrace CO₂ v ppm, při které tlačítko zoranžoví |
| `iaq-led-thr-alarm` | IAQ LED threshold alarm | `<-40.0..5000.0>` | `1600.0` | Koncentrace CO₂ v ppm, při které tlačítko zčervená |
| `iaq-led-hst` | IAQ LED hysteresis | `<-40.0..125.0>` | `50.0` | Hystereze obou prahových hodnot v ppm |

Parametry `hygro-t-alarm-*` nejsou k dispozici. Parametry `event-report-*` a `backup-report-*` se uplatní jen se záložním modulem CHESTER-Z: firmware v4.0.1 změny externího napájení na modulu CHESTER-X10 nehlásí.

### Data {#data}

Pole struktur `iaq_sensor` a `backup` s jednotkami, rozsahy a rozlišením popisuje stránka katalogové aplikace v části [**CHESTER Clime IAQ**](../../catalog-applications/chester-clime/index.md#chester-clime-iaq).

Oproti hlavnímu firmwaru obsahuje hlášení strukturu `iaq_sensor` s hodnotami z modulu CHESTER-S1 (teplota, vlhkost, osvětlenost, nadmořská výška, tlak, koncentrace CO₂, počet pohybů a počet stisků tlačítka) a nemá strukturu `hygrometer`. Struktura `backup` je v každém hlášení; firmware v4.0.1 ji plní jen ze záložního modulu CHESTER-Z, takže bez něj ukazuje 0 V a `disconnected`. Hodnoty `motion_count` a `press_count` se počítají od startu zařízení a `press_count` dostane položku jen při stisku tlačítka. Přes LoRaWAN firmware neodesílá žádné hodnoty z modulu CHESTER-S1, jen hodnoty ze základní desky, sond 1-Wire, půdních senzorů a bluetoothových tagů.

Ukázka obsahuje jen tyto dvě struktury z pravidelného hlášení bez stisku tlačítka, zkrácené na dvě agregované hodnoty:

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "backup": {
    "line_voltage": 0,
    "batt_voltage": 0,
    "state": "disconnected",
    "events": []
  },
  "iaq_sensor": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 22.47,
          "max": 22.54,
          "avg": 22.5,
          "mdn": 22.5
        },
        {
          "timestamp": 1793953200,
          "min": 22.45,
          "max": 22.51,
          "avg": 22.48,
          "mdn": 22.48
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 55.19,
          "max": 55.91,
          "avg": 55.52,
          "mdn": 55.53
        },
        {
          "timestamp": 1793953200,
          "min": 55.84,
          "max": 56.5,
          "avg": 56.14,
          "mdn": 56.07
        }
      ]
    },
    "illuminance": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 312,
          "max": 348,
          "avg": 331,
          "mdn": 333
        },
        {
          "timestamp": 1793953200,
          "min": 305,
          "max": 341,
          "avg": 322,
          "mdn": 320
        }
      ]
    },
    "altitude": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1793953200,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        }
      ]
    },
    "pressure": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 98419,
          "max": 98425,
          "avg": 98422,
          "mdn": 98423
        },
        {
          "timestamp": 1793953200,
          "min": 98415,
          "max": 98418,
          "avg": 98416,
          "mdn": 98416
        }
      ]
    },
    "co2_conc": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 612,
          "max": 655,
          "avg": 634,
          "mdn": 636
        },
        {
          "timestamp": 1793953200,
          "min": 648,
          "max": 701,
          "avg": 672,
          "mdn": 669
        }
      ]
    },
    "motion_count": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "value": 1287
        },
        {
          "timestamp": 1793953200,
          "value": 1293
        }
      ]
    },
    "press_count": {
      "measurements": []
    }
  }
}
```

</details>

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime-iaq:v4.0.1](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `5dc54c6153974e879f5499d2483433c9`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9/hex), SHA256 `9dda0b0c7c625b6d66599d5ccb614fc73de5cd7968fd458c558b9971c51b2b46`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9/bin), SHA256 `38a047c8e7864e46737766a86ff7e3e9fed703b2346c5d34b3cbcf8a7455dda1`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime IAQ"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
