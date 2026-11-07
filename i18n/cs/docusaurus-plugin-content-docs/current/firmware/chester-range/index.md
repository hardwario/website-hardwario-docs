---
title: CHESTER Range
description: "Firmware katalogové aplikace CHESTER Range: ultrazvukové měření vzdálenosti, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---

# CHESTER Range {#chester-range}

Firmware **CHESTER Range** měří vzdálenost ultrazvukovým senzorem [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor). Měří také teplotu teploměry DS18B20 na sběrnici 1-Wire a čte bluetoothové senzorové tagy. Senzory vzorkuje, vzorky agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE.

Tato stránka popisuje hlavní firmware. Varianta [**CHESTER Range Z**](chester-range-z.md) pro záložní modul CHESTER-Z má vlastní stránku, která uvádí jen to, co mění.

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Range**](../../catalog-applications/chester-range/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- ultrazvukový senzor **MaxBotix MB7066** na modulu **CHESTER-X0** ve slotu A: napájení na kanálu 1, impulzní výstup na kanálu 2 (zapojení najdete na stránce katalogové aplikace [**CHESTER Range**](../../catalog-applications/chester-range/index.md#terminal-blocks))
- teploměry **DS18B20** 1-Wire, nejvýše deset
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../../catalog-applications/ble-tags.md))

Hlášení ze záložního modulu **CHESTER-Z** vyžaduje firmware [**CHESTER Range Z**](chester-range-z.md). Zdrojový kód obsahuje i podporu vlhkoměru **CHESTER-S2** s teplotními alarmy (parametry `hygro-t-alarm-*`), žádné sestavení v4.0.1 ji ale nezahrnuje.

## Měření a chování {#measurement-and-behavior}

- Všechny senzory se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu: z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`).
- Ultrazvukový senzor si v jednom intervalu agregace uchová nejvýše 32 vzorků a mezi dvěma hlášeními nejvýše 32 agregovaných hodnot; další se zahazují.
- Firmware komunikuje jen přes NB-IoT/LTE a startuje v režimu `lte`.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |

Hlavní firmware nemá parametry závislé na hardwaru; parametry záložního napájení přidává firmware [**CHESTER Range Z**](chester-range-z.md#configuration-parameters).

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration).

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

Každé pole s jednotkou, rozsahem a rozlišením popisuje stránka katalogové aplikace v části [**Data**](../../catalog-applications/chester-range/index.md#data-over-lte).

Ukázka zachycuje hlášení s ultrazvukovým senzorem a dvěma teploměry DS18B20. Parametr `interval-report` je nastavený na 600 sekund, takže každý seznam `measurements` obsahuje dva intervaly agregace po 300 sekundách, každý s minimem, maximem, průměrem a mediánem:

- `ultrasonic_ranger`: vzdálenost v metrech
- `w1_thermometers`: jedna položka pro každý teploměr DS18B20
- `ble_tags`: prázdný seznam, protože není spárovaný žádný bluetoothový tag

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 2,
    "sequence": 47,
    "timestamp": 1793945251
  },
  "system": {
    "uptime": 28233,
    "voltage_load": 3.56,
    "voltage_rest": 3.62,
    "current_load": 35
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -9,
      "snr": 6,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 11.81
  },
  "accelerometer": {
    "accel_x": -0.08,
    "accel_y": 0.04,
    "accel_z": 9.77,
    "orientation": 2
  },
  "w1_thermometers": [
    {
      "serial_number": 222768959,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 9.81,
          "max": 9.87,
          "avg": 9.84,
          "mdn": 9.81
        },
        {
          "timestamp": 1793945100,
          "min": 9.75,
          "max": 9.87,
          "avg": 9.82,
          "mdn": 9.81
        }
      ]
    },
    {
      "serial_number": 222690915,
      "measurements": [
        {
          "timestamp": 1793944800,
          "min": 10.5,
          "max": 10.62,
          "avg": 10.55,
          "mdn": 10.56
        },
        {
          "timestamp": 1793945100,
          "min": 10.43,
          "max": 10.56,
          "avg": 10.5,
          "mdn": 10.5
        }
      ]
    }
  ],
  "ultrasonic_ranger": {
    "measurements": [
      {
        "timestamp": 1793944800,
        "min": 1.92,
        "max": 1.95,
        "avg": 1.93,
        "mdn": 1.93
      },
      {
        "timestamp": 1793945100,
        "min": 1.91,
        "max": 1.94,
        "avg": 1.92,
        "mdn": 1.92
      }
    ]
  },
  "ble_tags": []
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
