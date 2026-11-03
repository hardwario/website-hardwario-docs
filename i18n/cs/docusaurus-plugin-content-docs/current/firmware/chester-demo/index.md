---
title: CHESTER Demo
description: "Firmware CHESTER Demo: minimální aplikace pro NB-IoT/LTE, která hlásí teplotu, zrychlení a stav baterie a podle zprávy downlink přepíná LED."
---

# CHESTER Demo {#chester-demo}

Firmware **CHESTER Demo** je minimální aplikace pro HARDWARIO Cloud. Čte teploměr, akcelerometr a baterii zařízení CHESTER, hodnoty odesílá přes NB-IoT/LTE a podle zprávy downlink přepíná LED. Stránku katalogové aplikace nemá; jeho zdrojový kód najdete v CHESTER SDK v adresáři [`applications/demo`](https://github.com/hardwario/chester-sdk/tree/v4.0.1/applications/demo).

LED, tlačítko a příkazy konzole fungují tak, jak popisuje článek [**Společné funkce**](../common-functionality.md).

## Podporovaný hardware {#supported-hardware}

Firmwaru stačí základní deska **CHESTER-M** s modemem NB-IoT/LTE (viz [**CHESTER-M**](../../ordering-codes.md#chester-m)). Používá teploměr a akcelerometr na základní desce a na požádání modul GNSS (volba `G` základní desky).

## Měření a chování {#measurement-and-behavior}

- Teploměr a akcelerometr se **vzorkují** v intervalu vzorkování (parametr `interval-sample`). Hlášení obsahuje poslední vzorek; firmware neagreguje.
- Napětí baterie v klidu a pod zátěží a zátěžový proud se měří 60 sekund po startu a potom každých 12 hodin.
- Hlášení se odesílá v intervalu hlášení (parametr `interval-report`) s náhodným [**rozptylem intervalu hlášení**](../common-functionality.md#report-interval-jitter).
- Zařízení se ve výchozím nastavení ptá HARDWARIO Cloud na zprávy downlink každých 60 sekund (parametr `interval-poll`).
- Příkaz `gnss start` spustí přijímač GNSS. Firmware každou aktualizaci polohy zapíše do logu, polohu ale neodesílá.

### Downlink {#downlink}

[**Datový downlink**](/cloud/downlink/data) z HARDWARIO Cloud přepíná LED. Každý klíč je nepovinný; `1` LED rozsvítí, `0` ji zhasne:

| Klíč | LED |
| :--- | :--- |
| `led_r` | Červená LED |
| `led_g` | Zelená LED |
| `led_y` | Žlutá LED |
| `led_load` | Zátěžová LED |

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | `<1-86400>` | `300` | Interval agregace v sekundách; firmware v4.0.1 hodnotu uloží, ale nepoužívá ji |
| `interval-report` | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | `<0-86400>` | `60` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |

Síťový režim (`app config mode`) popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration). Firmware CHESTER Demo nabízí jen režimy `none` a `lte` a startuje v režimu `lte`.

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje senzory |
| `send` | Okamžitě odešle data |
| `gnss start` | Spustí přijímač GNSS |
| `gnss stop` | Zastaví přijímač GNSS |
| `gnss state` | Vypíše, zda přijímač běží, a poslední polohu |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-demo:v4.0.1](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `fe66508fdb6a4d78b90b6e4a07d1e929`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929/hex), SHA256 `01469baa20763745f15fd2eff6442e0b02c85810c82c38168e751ef296c8ec0d`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929/bin), SHA256 `f7f28e16b99898a3a9de3682312fe6bca7fcba99c3d6e237b4ab97667d04d75a`
- **Sestavení ze SDK:** `west chester-update demo --variant "CHESTER Demo"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Data {#data}

Každé hlášení obsahuje:

- `message`: verze, pořadové číslo a časová značka zprávy
- `system`: doba běhu v sekundách, napětí baterie v klidu a pod zátěží ve V (`voltage_rest`, `voltage_load`) a zátěžový proud v mA (`current_load`)
- `attribute`: název výrobce a produktu, varianta a revize hardwaru, verze firmwaru a sériové číslo
- `network`: parametry mobilního připojení (`eest`, `ecl`, `rsrp`, `rsrq`, `snr`, `plmn`, `cid`, `band`, `earfcn`)
- `thermometer`: teplota `temperature` z teploměru v °C
- `accelerometer`: zrychlení v osách X, Y a Z v m/s² (`acceleration_x`, `acceleration_y`, `acceleration_z`) a orientace `orientation`
