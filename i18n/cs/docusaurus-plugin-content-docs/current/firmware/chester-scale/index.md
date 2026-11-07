---
title: CHESTER Scale
description: "Firmware katalogové aplikace CHESTER Scale: jak měří tenzometrické snímače, všechny konfigurační parametry, příkazy a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Scale {#chester-scale}

Firmware **CHESTER Scale** udělá ze zařízení CHESTER bezdrátovou váhu. Měří až čtyři tenzometrické snímače na modulech **CHESTER-X3C** a naměřené hodnoty odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Tato stránka popisuje hlavní firmware. Varianta sestavená pro záložní modul CHESTER-Z1 má vlastní stránku, která uvádí jen to, co mění: [**CHESTER Scale Z**](chester-scale-z.md).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Scale**](../../catalog-applications/chester-scale/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- rozhraní pro tenzometrické snímače **CHESTER-X3C** ve slotu A (kanály A1 a A2) a druhé ve slotu B (kanály B1 a B2), které firmware rozpozná při startu (viz [**CHESTER-X3C**](../../ordering-codes.md#chester-x3c))
- bluetoothové senzorové tagy (Teltonika EYE Sensor) pro bezdrátové měření teploty a vlhkosti (viz [**Tagy BLE**](../../catalog-applications/ble-tags.md))

Záložní modul **CHESTER-Z1** hlavní firmware nepodporuje; s ním použijte sestavení [**CHESTER Scale Z**](chester-scale-z.md).

## Měření a chování {#measurement-and-behavior}

### Měření hmotnosti {#weight-measurement}

- Každých `weight-measurement-interval` sekund firmware změří všechny aktivní kanály. Napájení každého tenzometrického snímače zapíná jen na dobu měření, provede 32 odečtů a zprůměruje jejich prostřední polovinu, takže nejvyšší a nejnižší čtvrtina odečtů se zahodí.
- Když se výsledek liší od předchozího výsledku kanálu o 100 jednotek převodníku nebo víc, firmware kanál měří znovu, celkem nejvýše pětkrát, a skončí, jakmile se dva po sobě jdoucí výsledky liší o méně než 100 jednotek. Výsledek, který se neustálí, se odešle s invertovaným bitem 30 jako příznakem chyby.
- Firmware odesílá surové hodnoty z rozhraní tenzometrických snímačů; na jednotky hmotnosti je nepřevádí.
- Každé měření má svou časovou značku; měření se odesílají v dávkách v intervalu hlášení (parametr `interval-report`). Buffer pojme 128 měření, další měření se až do příštího hlášení zahazují.
- Interval hlášení se náhodně mění až o ±20 % (viz [**Rozptyl intervalu hlášení**](../../catalog-applications/common-functionality.md#report-interval-jitter)).

Hmotnost se neagreguje: `interval-sample` určuje, jak často se čte vnitřní teploměr, akcelerometr a bluetoothové tagy, a `interval-aggreg`, jak často se agregují vzorky z bluetoothových tagů.

### Konfigurace kanálů {#channel-configuration}

Aplikace podporuje až 4 kanály měření hmotnosti:
- **Kanál A1** a **kanál A2** ve slotu A
- **Kanál B1** a **kanál B2** ve slotu B

Každý kanál lze zapnout nebo vypnout samostatně. Za vypnutý kanál a za kanál, jehož měření selhalo, obsahuje hlášení `null`.

:::info

Od verze **v3.5.5** rozpozná firmware sestavený s `ctr_x3_b` modul CHESTER-X3 ve slotu B za běhu. Stejný firmware tak funguje s jedním osazeným slotem (jen A) i se dvěma (A+B). Když ve slotu B modul není, kanály B1/B2 se automaticky vynechají.

:::

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-report` | Report interval | `<30-86400>` | `900` | Interval hlášení v sekundách |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval čtení vnitřního teploměru, akcelerometru a bluetoothových tagů v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace vzorků z bluetoothových tagů v sekundách |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `channel-a1-active` | Channel a1 active | `true`, `false` | `true` | Měřit a hlásit kanál A1 |
| `channel-a2-active` | Channel a2 active | `true`, `false` | `true` | Měřit a hlásit kanál A2 |
| `channel-b1-active` | Channel b1 active | `true`, `false` | `true` | Měřit a hlásit kanál B1 |
| `channel-b2-active` | Channel b2 active | `true`, `false` | `true` | Měřit a hlásit kanál B2 |
| `weight-measurement-interval` | Weight measurement interval | `<30-86400>` | `60` | Interval měření hmotnosti v sekundách |

Parametry `channel-b1-active` a `channel-b2-active` se uplatní jen s modulem CHESTER-X3C ve slotu B. Parametry záložního modulu přidává sestavení [**CHESTER Scale Z**](chester-scale-z.md).

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `measure` | Okamžitě změří hmotnost a výsledek uloží |
| `test` | Okamžitě změří všechny kanály, aktivní i neaktivní, a surové hodnoty vypíše, aniž by je uložil |
| `sample` | Okamžitě přečte vnitřní teploměr, akcelerometr a bluetoothové tagy |
| `aggreg` | Okamžitě agreguje vzorky z bluetoothových tagů |
| `send` | Okamžitě odešle data |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-scale:v4.0.1](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `bd797484aa61413b82c3cbd041339d48`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48/hex), SHA256 `0446fc51e825af1679856375d1298e092ed20774cdac789f14c59dc998d0a61b`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48/bin), SHA256 `503b3ff85113af19b282e5fe889773efff1d777033a577b9a5f1296fe666a175`
- **Sestavení ze SDK:** `west chester-update scale --variant "CHESTER Scale"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Každé pole včetně jednotky, rozsahu a rozlišení popisuje katalogová stránka v části [**Data**](../../catalog-applications/chester-scale/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení hlavního firmwaru s výchozími intervaly, dvěma moduly CHESTER-X3C se všemi čtyřmi aktivními kanály a jedním bluetoothovým tagem:

- `weight`: surové hodnoty kanálů A1, A2, B1 a B2, jedna položka pro každé měření hmotnosti od předchozího hlášení, každá s časovou značkou
- `ble_tags`: hodnoty ze zaregistrovaných bluetoothových tagů, agregované každých `interval-aggreg` sekund

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 96,
    "timestamp": 1793961013
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "BCGLS",
    "hw_revision": "R3.4",
    "fw_version": "v4.0.1",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 86413,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 34
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -90,
      "rsrq": -8,
      "snr": 9,
      "plmn": 23003,
      "cid": 26853412,
      "band": 20,
      "earfcn": 6300
    }
  },
  "accelerometer": {
    "accel_x": 0.07,
    "accel_y": -0.16,
    "accel_z": 9.65,
    "orientation": 2
  },
  "thermometer": {
    "temperature": 22.18
  },
  "weight": [
    { "timestamp": 1793960160, "raw_result_a1": 18432, "raw_result_a2": 17905, "raw_result_b1": 18214, "raw_result_b2": 17644 },
    { "timestamp": 1793960220, "raw_result_a1": 18435, "raw_result_a2": 17902, "raw_result_b1": 18211, "raw_result_b2": 17647 },
    { "timestamp": 1793960280, "raw_result_a1": 18429, "raw_result_a2": 17908, "raw_result_b1": 18216, "raw_result_b2": 17641 },
    { "timestamp": 1793960340, "raw_result_a1": 18431, "raw_result_a2": 17904, "raw_result_b1": 18213, "raw_result_b2": 17645 },
    { "timestamp": 1793960400, "raw_result_a1": 18436, "raw_result_a2": 17906, "raw_result_b1": 18210, "raw_result_b2": 17643 },
    { "timestamp": 1793960460, "raw_result_a1": 18433, "raw_result_a2": 17901, "raw_result_b1": 18215, "raw_result_b2": 17648 },
    { "timestamp": 1793960520, "raw_result_a1": 18430, "raw_result_a2": 17907, "raw_result_b1": 18212, "raw_result_b2": 17642 },
    { "timestamp": 1793960580, "raw_result_a1": 18428, "raw_result_a2": 17905, "raw_result_b1": 18217, "raw_result_b2": 17646 },
    { "timestamp": 1793960640, "raw_result_a1": 18434, "raw_result_a2": 17903, "raw_result_b1": 18213, "raw_result_b2": 17644 },
    { "timestamp": 1793960700, "raw_result_a1": 18437, "raw_result_a2": 17909, "raw_result_b1": 18211, "raw_result_b2": 17641 },
    { "timestamp": 1793960760, "raw_result_a1": 18432, "raw_result_a2": 17904, "raw_result_b1": 18214, "raw_result_b2": 17647 },
    { "timestamp": 1793960820, "raw_result_a1": 18430, "raw_result_a2": 17906, "raw_result_b1": 18216, "raw_result_b2": 17643 },
    { "timestamp": 1793960880, "raw_result_a1": 18435, "raw_result_a2": 17902, "raw_result_b1": 18212, "raw_result_b2": 17645 },
    { "timestamp": 1793960940, "raw_result_a1": 18433, "raw_result_a2": 17905, "raw_result_b1": 18215, "raw_result_b2": 17642 },
    { "timestamp": 1793961000, "raw_result_a1": 18431, "raw_result_a2": 17907, "raw_result_b1": 18213, "raw_result_b2": 17646 }
  ],
  "ble_tags": [
    {
      "addr": "7cd9f413e360",
      "rssi": -81,
      "voltage": 3.03,
      "temperature": {
        "measurements": [
          { "timestamp": 1793960400, "min": 21.92, "max": 22.05, "avg": 21.98, "mdn": 21.97 },
          { "timestamp": 1793960700, "min": 22.01, "max": 22.12, "avg": 22.06, "mdn": 22.06 },
          { "timestamp": 1793961000, "min": 22.08, "max": 22.19, "avg": 22.13, "mdn": 22.12 }
        ]
      },
      "humidity": {
        "measurements": [
          { "timestamp": 1793960400, "min": 54, "max": 55, "avg": 54.4, "mdn": 54 },
          { "timestamp": 1793960700, "min": 54, "max": 55, "avg": 54.8, "mdn": 55 },
          { "timestamp": 1793961000, "min": 55, "max": 56, "avg": 55.2, "mdn": 55 }
        ]
      }
    }
  ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Uplink LoRaWAN nese jen poslední měření hmotnosti. Ukázka zachycuje výstup dekodéru pro ChirpStack a TTN (soubor `codec/cs-decoder.js` aplikace v CHESTER SDK) pro stejné zařízení.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage_rest": 3.653,
  "voltage_load": 3.418,
  "current_load": 34,
  "orientation": 2,
  "therm_temperature": 22.18,
  "scale": {
    "channel_a1_active": true,
    "channel_a2_active": true,
    "channel_b1_active": true,
    "channel_b2_active": true,
    "raw_a1": 18431,
    "raw_a2": 17907,
    "raw_b1": 18213,
    "raw_b2": 17646
  }
}
```

</details>

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v3.5.5 – 2026-06-22 {#v355--2026-06-22}

- **Přidáno**: Detekce modulu CHESTER-X3 ve slotu B za běhu

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nová varianta: **CHESTER Scale Z** s podporou záložního modulu CHESTER-Z1
- **Přidáno**: Integrace subsystému BLE tagů: bezdrátové měření teploty a vlhkosti tagy Teltonika EYE Sensor
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud Legacy zůstává dostupný samostatně
- **Změněno**: Jediný společný binární soubor firmwaru pro LTE i LoRaWAN; podpora LoRaWAN se dokončuje (plánována pro příští vydání)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
