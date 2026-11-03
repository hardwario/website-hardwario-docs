---
title: CHESTER Range
description: "Firmware katalogové aplikace CHESTER Range: ultrazvukové měření vzdálenosti, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---

# CHESTER Range {#chester-range}

Firmware **CHESTER Range** měří vzdálenost ultrazvukovým senzorem [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor). Měří také teplotu teploměry DS18B20 na sběrnici 1-Wire a čte bluetoothové senzorové tagy. Senzory vzorkuje, vzorky agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE.

Tato stránka popisuje hlavní firmware. Varianta [**CHESTER Range Z**](chester-range-z.md) pro záložní modul CHESTER-Z má vlastní stránku, která uvádí jen to, co mění.

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Range**](../../catalog-applications/chester-range/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- ultrazvukový senzor **MaxBotix MB7066** na modulu **CHESTER-X0** ve slotu A: napájení na kanálu 1, impulzní výstup na kanálu 2 (zapojení najdete na stránce katalogové aplikace [**CHESTER Range**](../../catalog-applications/chester-range/index.md#terminal-blocks))
- teploměry **DS18B20** 1-Wire, nejvýše deset
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../ble-tags.md))

Hlášení ze záložního modulu **CHESTER-Z** vyžaduje firmware [**CHESTER Range Z**](chester-range-z.md). Zdrojový kód obsahuje i podporu vlhkoměru **CHESTER-S2** s teplotními alarmy (parametry `hygro-t-alarm-*`), žádné sestavení v4.0.1 ji ale nezahrnuje.

## Měření a chování {#measurement-and-behavior}

- Všechny senzory se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu: z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`).
- Ultrazvukový senzor si v jednom intervalu agregace uchová nejvýše 32 vzorků a mezi dvěma hlášeními nejvýše 32 agregovaných hodnot; další se zahazují.
- Firmware komunikuje jen přes NB-IoT/LTE a startuje v režimu `lte`.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |

Hlavní firmware nemá parametry závislé na hardwaru; parametry záložního napájení přidává firmware [**CHESTER Range Z**](chester-range-z.md#configuration-parameters).

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje senzory |
| `aggreg` | Okamžitě agreguje vzorky |
| `send` | Okamžitě odešle data |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-range:v4.0.1](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `ace9410d06b24f6da06a15ca70587094`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094/hex), SHA256 `46c55bd4489b31032be043f2751186babaf415cf703d2a7d5fe53a71197c024b`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094/bin), SHA256 `b21f65a037115785437ae94929933d0568bc3ac73193bca62c262f065cc8c18d`
- **Sestavení ze SDK:** `west chester-update range --variant "CHESTER Range"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Ukázka zachycuje hlášení s ultrazvukovým senzorem a dvěma teploměry DS18B20. Každý dostupný senzor má jedno agregované měření s minimem, maximem, průměrem a mediánem:

- `ultrasonic_ranger`: vzdálenost v metrech
- `w1_thermometers`: jedna položka pro každý teploměr DS18B20

Ukázka pochází ze staršího firmwaru. Firmware v4.0.1 posílá měření vzdálenosti přímo ve struktuře `ultrasonic_ranger` bez úrovně `distance` a strukturu `hygrometer` neposílá, protože modul CHESTER-S2 nepodporuje žádné jeho sestavení.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1685093572
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.4",
    "fw_name": "(unset)",
    "fw_version": "(unset)",
    "serial_number": "2159019054"
  },
  "system": {
    "uptime": 49,
    "voltage_rest": null,
    "voltage_load": null,
    "current_load": null
  },
  "network": {
    "imei": 351358816140765,
    "imsi": 901288910018953,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -78,
      "rsrq": -5,
      "snr": 8,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 24.93
  },
  "accelerometer": {
    "acceleration_x": 0,
    "acceleration_y": -0.23,
    "acceleration_z": 9.65,
    "orientation": 2
  },
  "ultrasonic_ranger": {
    "distance": {
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 2.004,
          "max": 2.009,
          "avg": 2.008,
          "mdn": 2.008
        }
      ]
    }
  },
  "hygrometer": {
    "temperature": {
      "events": [],
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 24.9,
          "max": 25.03,
          "avg": 24.99,
          "mdn": 25.01
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 35.18,
          "max": 35.81,
          "avg": 35.45,
          "mdn": 35.36
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 222768959,
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 24.31,
          "max": 24.31,
          "avg": 24.31,
          "mdn": 24.31
        }
      ]
    },
    {
      "serial_number": 222690915,
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 27,
          "max": 27.43,
          "avg": 27.22,
          "mdn": 27.25
        }
      ]
    }
  ]
}
```

</details>

## Seznam změn {#changelog}

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nová varianta: **CHESTER Range Z** s podporou záložního modulu CHESTER-Z1
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud Legacy zůstává dostupný samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
