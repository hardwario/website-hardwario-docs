---
title: CHESTER Clime
description: "Firmware katalogové aplikace CHESTER Clime: co měří a odesílá, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Clime {#chester-clime}

Firmware **CHESTER Clime** udělá ze zařízení CHESTER senzor prostředí. Připojené senzory vzorkuje, vzorky agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Tato stránka popisuje hlavní firmware. Varianty sestavené pro jiné senzory mají vlastní stránky, které uvádějí jen to, co mění: [**CHESTER Clime IAQ**](chester-clime-iaq.md), [**CHESTER Clime RTD**](chester-clime-rtd.md), [**CHESTER Clime TC**](chester-clime-tc.md), [**CHESTER Clime SPS30**](chester-clime-sps30.md) a [**CHESTER Clime Radon**](chester-clime-radon.md).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Clime**](../../catalog-applications/chester-clime/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- externí vlhkoměr **CHESTER-S2** (teplota a vlhkost)
- teploměry **DS18B20** 1-Wire, až 10 na jedné sběrnici
- **půdní senzory** 1-Wire (vlhkost a teplota půdy), nejvýše 10
- záložní modul **CHESTER-Z**, který firmware rozpozná za běhu, takže stejný firmware funguje s modulem i bez něj
- bluetoothové senzorové tagy, nejvýše 8 (viz [**Tagy BLE**](../../catalog-applications/ble-tags.md))

## Měření a chování {#measurement-and-behavior}

- Všechny senzory se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu: z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`).

:::caution

Zařízení CHESTER Clime ve výchozí konfiguraci odesílá přibližně 500 bajtů dat. Pokud prodloužíte interval hlášení a nezvýšíte zároveň interval agregace,
může být datový buffer větší než MTU protokolu UDP a paket se neodešle. Zařízení se pak tváří, jako by neodesílalo nic nebo jen část paketů.

:::

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `send-timeout` | Send timeout | `<1-3600>` | `120` | Časový limit odeslání v sekundách; firmware v4.0.1 hodnotu uloží, ale nepoužívá ji |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Prodleva mezi událostí a hlášením v sekundách (teplotní alarm, změna záložního napájení) |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); pravidelná hlášení se do limitu nepočítají |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |
| `hygro-t-alarm-hi-report` | Hygro t alarm hi report | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru překročí horní prahovou hodnotu |
| `hygro-t-alarm-hi-thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | Horní prahová hodnota teploty v °C |
| `hygro-t-alarm-hi-hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | Hystereze horní prahové hodnoty v °C |
| `hygro-t-alarm-lo-report` | Hygro t alarm lo report | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru klesne pod dolní prahovou hodnotu |
| `hygro-t-alarm-lo-thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Dolní prahová hodnota teploty v °C |
| `hygro-t-alarm-lo-hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Hystereze dolní prahové hodnoty v °C |

Parametry událostí, záložního napájení a vlhkoměru se uplatní jen s hardwarem, ke kterému patří: `backup-report-*` s modulem CHESTER-Z, `hygro-t-alarm-*` s modulem CHESTER-S2 a `event-report-*` s kterýmkoli z nich.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje senzory |
| `aggreg` | Okamžitě agreguje vzorky |
| `send` | Okamžitě odešle data |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime:v4.0.1](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `59489e4e91d741da930ab15b1ab9e31f`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f/hex), SHA256 `f31a0d2850e091c19afb2e3b54487ee9497c4bdedaeb3af8d0006d49c7f28e6a`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f/bin), SHA256 `4fdd46914a7ad4c77df3c48271f255cb014b4be676e99548b7046cf8675faa29`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Všechna pole s jednotkami, rozsahy a rozlišením popisuje stránka katalogové aplikace v části [**Data**](../../catalog-applications/chester-clime/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení, které hlavní firmware odeslal 1 s poté, co teplota na vlhkoměru překročila horní prahovou hodnotu alarmu 25,0 °C. Zařízení má vlhkoměr CHESTER-S2, jednu sondu DS18B20, záložní modul CHESTER-Z a jeden bluetoothový tag, půdní senzor nemá:

- `backup`: napětí na vstupu externího napájení a napětí záložní baterie, stav napájení a jeho události
- `hygrometer`: teplota a vlhkost z modulu CHESTER-S2 s událostmi alarmu
- `w1_thermometers`: jedna položka pro každou sondu DS18B20
- `soil_sensors`: jedna položka pro každý půdní senzor, zde prázdný seznam
- `ble_tags`: hodnoty ze zaregistrovaných bluetoothových tagů

**Události** záložního napájení:
* `connected`
* `disconnected`

**Události** vlhkoměru:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

Ukázka je zkrácená na dvě agregované hodnoty na senzor; ve výchozí konfiguraci jich hlášení nese přibližně šest. Každá agregovaná hodnota má svou časovou značku a hodnoty `min`, `max`, `avg` a `mdn` ze vzorků.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 2,
    "sequence": 37,
    "timestamp": 1793953302
  },
  "system": {
    "uptime": 67324,
    "voltage_rest": 3.61,
    "voltage_load": 3.52,
    "current_load": 35
  },
  "backup": {
    "line_voltage": 23.98,
    "batt_voltage": 4.12,
    "state": "connected",
    "events": []
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -90,
      "rsrq": -8,
      "snr": 9,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 24.31
  },
  "accelerometer": {
    "accel_x": 0.07,
    "accel_y": -0.16,
    "accel_z": 9.65,
    "orientation": 2
  },
  "hygrometer": {
    "temperature": {
      "events": [
        {
          "timestamp": 1793953301,
          "type": "alarm_hi_activated",
          "value": 25.04
        }
      ],
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 24.58,
          "max": 24.77,
          "avg": 24.66,
          "mdn": 24.65
        },
        {
          "timestamp": 1793953200,
          "min": 24.79,
          "max": 24.97,
          "avg": 24.88,
          "mdn": 24.89
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 41.22,
          "max": 42.05,
          "avg": 41.63,
          "mdn": 41.6
        },
        {
          "timestamp": 1793953200,
          "min": 40.87,
          "max": 41.41,
          "avg": 41.12,
          "mdn": 41.09
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 170787196,
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 4.12,
          "max": 4.31,
          "avg": 4.2,
          "mdn": 4.18
        },
        {
          "timestamp": 1793953200,
          "min": 4.06,
          "max": 4.25,
          "avg": 4.15,
          "mdn": 4.12
        }
      ]
    }
  ],
  "soil_sensors": [],
  "ble_tags": [
    {
      "addr": "7cd9f413e360",
      "rssi": -76,
      "voltage": 3.01,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1793952900,
            "min": 21.75,
            "max": 21.94,
            "avg": 21.84,
            "mdn": 21.81
          },
          {
            "timestamp": 1793953200,
            "min": 21.81,
            "max": 22.06,
            "avg": 21.93,
            "mdn": 21.94
          }
        ]
      },
      "humidity": {
        "measurements": [
          {
            "timestamp": 1793952900,
            "min": 47,
            "max": 48,
            "avg": 47.6,
            "mdn": 48
          },
          {
            "timestamp": 1793953200,
            "min": 47,
            "max": 48,
            "avg": 47.4,
            "mdn": 47
          }
        ]
      }
    }
  ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Uplink nese poslední vzorek každého senzoru stejného zařízení. `w1_thermometers`, `ble_tags` a `soil_sensors` jsou seznamy s jednou hodnotou nebo položkou pro každou sondu, tag či senzor.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage_rest": 3.612,
  "voltage_load": 3.524,
  "current_load": 35,
  "orientation": 2,
  "therm_temperature": 24.31,
  "hygro_temperature": 25.04,
  "hygro_humidity": 40.5,
  "w1_thermometers": [
    4.12
  ],
  "ble_tags": [
    {
      "temperature": 21.94,
      "humidity": 47
    }
  ],
  "soil_sensors": []
}
```

</details>

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v3.5.4 – 2026-04-14 {#v354--2026-04-14}

- **Změněno**: Detekce modulu CHESTER-Z za běhu, jeden firmware tak nyní funguje s modulem CHESTER-Z i bez něj; samostatná varianta **CHESTER Clime Z** byla odstraněna
- **Opraveno**: Selhání sestavení varianty IAQ při současně zapnutých funkcích CHESTER-Z a CHESTER-X10

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Nové varianty: **CHESTER Clime SPS30** (prachové částice: PM1/PM2.5/PM10) a **CHESTER Clime Radon** (koncentrace radonu)
- **Přidáno**: Nová varianta: **CHESTER Clime TC** pro dva externí termočlánky typu K (přes CHESTER-X3B)
- **Vylepšeno**: Podpora teploměrů DS18B20 1-Wire, vyšší spolehlivost a čistší obsluha více senzorů
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); varianty pro Cloud Legacy zůstávají dostupné v samostatné tabulce firmwaru
- **Změněno**: Jediný společný binární soubor firmwaru pro LTE i LoRaWAN; síť se volí příkazem `app config mode lte` / `app config mode lrw`
- **Odstraněno**: Varianty Clime 1W a Clime 1WH byly vypuštěny ze sestavení firmwaru pro HARDWARIO Cloud (pro Cloud Legacy zůstávají dostupné)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
