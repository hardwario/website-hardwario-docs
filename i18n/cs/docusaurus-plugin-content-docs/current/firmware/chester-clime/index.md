---
title: CHESTER Clime
description: "Firmware katalogové aplikace CHESTER Clime: co měří a odesílá, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Clime {#chester-clime}

Firmware **CHESTER Clime** udělá ze zařízení CHESTER senzor prostředí. Připojené senzory vzorkuje, vzorky agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Tato stránka popisuje hlavní firmware. Varianty sestavené pro jiné senzory mají vlastní stránky, které uvádějí jen to, co mění: [**CHESTER Clime IAQ**](chester-clime-iaq.md), [**CHESTER Clime RTD**](chester-clime-rtd.md), [**CHESTER Clime TC**](chester-clime-tc.md), [**CHESTER Clime SPS30**](chester-clime-sps30.md) a [**CHESTER Clime Radon**](chester-clime-radon.md).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Clime**](../../catalog-applications/chester-clime/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- externí vlhkoměr **CHESTER-S2** (teplota a vlhkost)
- teploměry **DS18B20** 1-Wire, i několik na jedné sběrnici
- záložní modul **CHESTER-Z**, který firmware rozpozná za běhu, takže stejný firmware funguje s modulem i bez něj
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../ble-tags.md))

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

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `send-timeout` | `<1-3600>` | `120` | Časový limit odeslání v sekundách; firmware v4.0.1 hodnotu uloží, ale nepoužívá ji |
| `event-report-delay` | `<1-86400>` | `1` | Prodleva mezi událostí a hlášením v sekundách (teplotní alarm, změna záložního napájení) |
| `event-report-rate` | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu; pravidelná hlášení se do limitu nepočítají |
| `backup-report-connected` | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |
| `hygro-t-alarm-hi-report` | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru překročí horní prahovou hodnotu |
| `hygro-t-alarm-hi-thr` | `<-40.0..125.0>` | `0.0` | Horní prahová hodnota teploty v °C |
| `hygro-t-alarm-hi-hst` | `<0.0..100.0>` | `0.0` | Hystereze horní prahové hodnoty v °C |
| `hygro-t-alarm-lo-report` | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru klesne pod dolní prahovou hodnotu |
| `hygro-t-alarm-lo-thr` | `<-40.0..125.0>` | `0.0` | Dolní prahová hodnota teploty v °C |
| `hygro-t-alarm-lo-hst` | `<0.0..100.0>` | `0.0` | Hystereze dolní prahové hodnoty v °C |

Parametry událostí, záložního napájení a vlhkoměru se uplatní jen s hardwarem, ke kterému patří: `backup-report-*` s modulem CHESTER-Z, `hygro-t-alarm-*` s modulem CHESTER-S2 a `event-report-*` s kterýmkoli z nich.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration).

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

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení hlavního firmwaru s vlhkoměrem CHESTER-S2, teploměry DS18B20 a záložním modulem CHESTER-Z:

- `hygrometer`: teplota a vlhkost z modulu CHESTER-S2
- `w1_thermometers`: jedna položka pro každý teploměr DS18B20
- `backup`: externí a vnitřní napětí, stav a události záložního modulu
- `ble_tags`: hodnoty ze spárovaných bluetoothových tagů

**Události** záložního napájení:
* `connected`
* `disconnected`

**Události** vlhkoměru:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

Při této konfiguraci obsahuje každá struktura šest agregovaných hodnot. Každá z nich má svou časovou značku a hodnoty `min`, `max`, `avg` a `mdn` vypočtené z několika vzorků.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 0,
    "timestamp": 1668859482
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Clime",
    "fw_version": "v1.4.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 680967,
    "voltage_rest": 3.7,
    "voltage_load": 3.66,
    "current_load": 36
  },
  "backup": {
      "line_voltage": 24.01,
      "batt_voltage": 4.09,
      "state": "connected",
      "events": [
          {
              "timestamp": 1668858942,
              "type": "connected"
          }
      ]
  },
  "network": {
    "imei": 351358815180770,
    "imsi": 901288910018982,
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
    "temperature": 22.18
  },
  "accelerometer": {
    "acceleration_x": 0.07,
    "acceleration_y": -0.16,
    "acceleration_z": 9.65,
    "orientation": 2
  },
  "hygrometer": {
    "temperature": {
      "events": [
        {
          "timestamp": 1668858343,
          "type": "alarm_lo_deactivated",
          "value": 20.94
        }
      ],
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.07,
          "max": 22.25,
          "avg": 22.17,
          "mdn": 22.16
        },
        {
          "timestamp": 1668858042,
          "min": 22.05,
          "max": 22.23,
          "avg": 22.15,
          "mdn": 22.15
        },
        {
          "timestamp": 1668858342,
          "min": 22.04,
          "max": 22.16,
          "avg": 22.09,
          "mdn": 22.07
        },
        {
          "timestamp": 1668858642,
          "min": 22.08,
          "max": 22.19,
          "avg": 22.11,
          "mdn": 22.09
        },
        {
          "timestamp": 1668858942,
          "min": 22.07,
          "max": 22.16,
          "avg": 22.12,
          "mdn": 22.12
        },
        {
          "timestamp": 1668859242,
          "min": 22.07,
          "max": 22.15,
          "avg": 22.12,
          "mdn": 22.14
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 54.78,
          "max": 55.31,
          "avg": 55.1,
          "mdn": 55.12
        },
        {
          "timestamp": 1668858042,
          "min": 55.12,
          "max": 56.16,
          "avg": 55.55,
          "mdn": 55.52
        },
        {
          "timestamp": 1668858342,
          "min": 55.24,
          "max": 55.56,
          "avg": 55.41,
          "mdn": 55.4
        },
        {
          "timestamp": 1668858642,
          "min": 54.89,
          "max": 56.03,
          "avg": 55.33,
          "mdn": 55.2
        },
        {
          "timestamp": 1668858942,
          "min": 54.75,
          "max": 56.73,
          "avg": 55.39,
          "mdn": 54.98
        },
        {
          "timestamp": 1668859242,
          "min": 54.91,
          "max": 55.83,
          "avg": 55.26,
          "mdn": 55.18
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 170787196,
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
  ],
  "ble_tags": [
    {
      "addr": "1234567890AB",
      "rssi": -81,
      "voltage": 3.11,
      "humidity": {
        "measurements": [
          {
            "timestamp": 1668857742,
            "min": 54.78,
            "max": 55.31,
            "avg": 55.1,
            "mdn": 55.12
          },
          {
            "timestamp": 1668858042,
            "min": 55.12,
            "max": 56.16,
            "avg": 55.55,
            "mdn": 55.52
          }
        ]
      },
      "temperature": {
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
          }
        ]
      }
    },
    {
      "addr": "BA0987654321",
      "rssi": -77,
      "voltage": 3.11,
      "humidity": {
        "measurements": [
          {
            "timestamp": 1668857742,
            "min": 54.78,
            "max": 55.31,
            "avg": 55.1,
            "mdn": 55.12
          },
          {
            "timestamp": 1668858042,
            "min": 55.12,
            "max": 56.16,
            "avg": 55.55,
            "mdn": 55.52
          }
        ]
      },
      "temperature": {
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

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage_rest": 3.65,
  "voltage_load": 3.6,
  "current_load": 15,
  "orientation": 2,
  "therm_temperature": 22.4,
  "hygro_temperature": 22.3,
  "hygro_humidity": 45.1
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
