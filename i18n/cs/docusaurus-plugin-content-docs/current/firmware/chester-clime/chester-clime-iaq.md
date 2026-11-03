---
title: CHESTER Clime IAQ
description: "Firmware CHESTER Clime IAQ: čím se liší od hlavního firmwaru CHESTER Clime při použití multisenzoru CHESTER-S1 a napájecího vstupu CHESTER-X10."
---

# CHESTER Clime IAQ {#chester-clime-iaq}

**CHESTER Clime IAQ** je firmware CHESTER Clime sestavený pro multisenzor kvality vnitřního ovzduší **CHESTER-S1** a vstup externího napájení **CHESTER-X10**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává modul **CHESTER-S1**, který měří teplotu, vlhkost, osvětlenost, koncentraci CO₂ a atmosférický tlak, senzorem PIR detekuje pohyb a má tlačítko se zvukovým bzučákem.
- Přidává modul **CHESTER-X10**: externí napájení 6–28 V se záložní baterií Li-Ion.
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Chování {#behavior}

- Po stisku tlačítka se na sekundu rozsvítí modrá LED a bzučák pípne.
- Barva tlačítka ukazuje úroveň CO₂: **zelená** (hodnoty jsou v pořádku), **oranžová** (varování) a **červená** (alarm). Při napájení z baterie tlačítko každých 5 sekund krátce blikne, při externím napájení přes modul CHESTER-X10 svítí trvale.

:::caution

Varianta CHESTER Clime IAQ ve výchozí konfiguraci odesílá přibližně 800 bajtů dat. Pokud prodloužíte interval hlášení a nezvýšíte zároveň interval agregace,
může být datový buffer větší než MTU protokolu UDP a paket se neodešle. Zařízení se pak tváří, jako by neodesílalo nic nebo jen část paketů.

:::

### Konfigurační parametry {#configuration-parameters}

Přidané parametry pro LED v tlačítku:

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `iaq-led-thr-warning` | `<-40.0..5000.0>` | `800.0` | Koncentrace CO₂ v ppm, při které tlačítko zoranžoví |
| `iaq-led-thr-alarm` | `<-40.0..5000.0>` | `1600.0` | Koncentrace CO₂ v ppm, při které tlačítko zčervená |
| `iaq-led-hst` | `<-40.0..125.0>` | `50.0` | Hystereze obou prahových hodnot v ppm |

Parametry `hygro-t-alarm-*` nejsou k dispozici. Parametry `event-report-*` a `backup-report-*` platí i pro externí napájení přes modul CHESTER-X10.

### Data {#data}

Hlášení obsahuje strukturu `iaq_sensor` s hodnotami z modulu CHESTER-S1 (teplota, vlhkost, osvětlenost, nadmořská výška, tlak, koncentrace CO₂, počet pohybů a počet stisků tlačítka) a nemá strukturu `hygrometer`.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "iaq_sensor": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.5,
          "max": 22.54,
          "avg": 22.51,
          "mdn": 22.52
        },
        {
          "timestamp": 1668858042,
          "min": 22.49,
          "max": 22.5,
          "avg": 22.49,
          "mdn": 22.49
        },
        {
          "timestamp": 1668858342,
          "min": 22.47,
          "max": 22.48,
          "avg": 22.47,
          "mdn": 22.47
        },
        {
          "timestamp": 1668858642,
          "min": 22.47,
          "max": 22.49,
          "avg": 22.48,
          "mdn": 22.48
        },
        {
          "timestamp": 1668858942,
          "min": 22.46,
          "max": 22.5,
          "avg": 22.48,
          "mdn": 22.48
        },
        {
          "timestamp": 1668859242,
          "min": 22.45,
          "max": 22.47,
          "avg": 22.46,
          "mdn": 22.47
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 55.19,
          "max": 55.91,
          "avg": 55.52,
          "mdn": 55.53
        },
        {
          "timestamp": 1668858042,
          "min": 55.84,
          "max": 56.5,
          "avg": 56.14,
          "mdn": 56.07
        },
        {
          "timestamp": 1668858342,
          "min": 56.01,
          "max": 56.2,
          "avg": 56.09,
          "mdn": 56.07
        },
        {
          "timestamp": 1668858642,
          "min": 55.55,
          "max": 56.1,
          "avg": 55.79,
          "mdn": 55.74
        },
        {
          "timestamp": 1668858942,
          "min": 55.39,
          "max": 55.86,
          "avg": 55.6,
          "mdn": 55.59
        },
        {
          "timestamp": 1668859242,
          "min": 55.1,
          "max": 56.29,
          "avg": 55.69,
          "mdn": 55.61
        }
      ]
    },
    "illuminance": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 4,
          "max": 5,
          "avg": 4,
          "mdn": 4
        },
        {
          "timestamp": 1668858042,
          "min": 4,
          "max": 6,
          "avg": 4,
          "mdn": 5
        },
        {
          "timestamp": 1668858342,
          "min": 5,
          "max": 5,
          "avg": 5,
          "mdn": 5
        },
        {
          "timestamp": 1668858642,
          "min": 4,
          "max": 6,
          "avg": 5,
          "mdn": 5
        },
        {
          "timestamp": 1668858942,
          "min": 5,
          "max": 7,
          "avg": 5,
          "mdn": 6
        },
        {
          "timestamp": 1668859242,
          "min": 4,
          "max": 5,
          "avg": 4,
          "mdn": 5
        }
      ]
    },
    "altitude": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668858042,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        },
        {
          "timestamp": 1668858342,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        },
        {
          "timestamp": 1668858642,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668858942,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668859242,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        }
      ]
    },
    "pressure": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 98419,
          "max": 98425,
          "avg": 98422,
          "mdn": 98423
        },
        {
          "timestamp": 1668858042,
          "min": 98415,
          "max": 98418,
          "avg": 98416,
          "mdn": 98416
        },
        {
          "timestamp": 1668858342,
          "min": 98412,
          "max": 98417,
          "avg": 98414,
          "mdn": 98415
        },
        {
          "timestamp": 1668858642,
          "min": 98417,
          "max": 98422,
          "avg": 98419,
          "mdn": 98418
        },
        {
          "timestamp": 1668858942,
          "min": 98416,
          "max": 98421,
          "avg": 98419,
          "mdn": 98421
        },
        {
          "timestamp": 1668859242,
          "min": 98416,
          "max": 98422,
          "avg": 98419,
          "mdn": 98420
        }
      ]
    },
    "co2_conc": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 400
        },
        {
          "timestamp": 1668858042,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        },
        {
          "timestamp": 1668858342,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 400
        },
        {
          "timestamp": 1668858642,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        },
        {
          "timestamp": 1668858942,
          "min": 398,
          "max": 399,
          "avg": 398,
          "mdn": 399
        },
        {
          "timestamp": 1668859242,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        }
      ]
    },
    "motion_count": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "value": 0
        },
        {
          "timestamp": 1668858042,
          "value": 0
        },
        {
          "timestamp": 1668858342,
          "value": 0
        },
        {
          "timestamp": 1668858642,
          "value": 0
        },
        {
          "timestamp": 1668858942,
          "value": 0
        },
        {
          "timestamp": 1668859242,
          "value": 0
        }
      ]
    },
    "press_count": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "value": 0
        },
        {
          "timestamp": 1668858042,
          "value": 0
        },
        {
          "timestamp": 1668858342,
          "value": 0
        },
        {
          "timestamp": 1668858642,
          "value": 0
        },
        {
          "timestamp": 1668858942,
          "value": 0
        },
        {
          "timestamp": 1668859242,
          "value": 0
        }
      ]
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
