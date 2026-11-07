---
title: CHESTER Meteo
description: "Firmware katalogové aplikace CHESTER Meteo: co měří a odesílá, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Meteo {#chester-meteo}

Firmware **CHESTER Meteo** udělá ze zařízení CHESTER meteostanici. Vzorkuje rychlost a směr větru, srážky, atmosférický tlak, teplotu a vlhkost, vzorky agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Tato stránka popisuje hlavní firmware. Varianty sestavené pro jiný hardware mají vlastní stránky, které uvádějí jen to, co mění: [**CHESTER Meteo Z**](chester-meteo-z.md), [**CHESTER Meteo P**](chester-meteo-p.md) a [**CHESTER Meteo M**](chester-meteo-m.md).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Meteo**](../../catalog-applications/chester-meteo/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- vstupní modul **CHESTER-X0** ve slotu A s analogovým srážkoměrem, anemometrem a směrovkou větru (viz tabulka níže)
- externí **barometr** se snímačem NXP MPL3115A2 (atmosférický tlak)
- externí vlhkoměr **CHESTER-S2** (teplota a vlhkost)
- teploměry **DS18B20** 1-Wire, nejvýše 10
- **půdní senzory** 1-Wire (teplota a vlhkost půdy), nejvýše 10
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../../catalog-applications/ble-tags.md))

Meteorologické senzory se připojují ke kanálům modulu CHESTER-X0:

| Kanál | Senzor | Měření |
| :--- | :--- | :--- |
| 1 | Srážkoměr s impulzním výstupem | Každý impulz přičte 0,2794 mm srážek |
| 2 | Anemometr s impulzním výstupem | Jeden impulz za sekundu odpovídá 2,4 km/h |
| 3 | Směrovka větru | 16 směrů po 22,5° |
| 4 | Napájení směrovky větru | Zapíná se jen při čtení směru |

## Měření a chování {#measurement-and-behavior}

- Všechny senzory se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu: z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`). Ve firmwaru v4.0.1 se doba mezi dvěma hlášeními náhodně mění až o ±20 %.

Firmware uchová nejvýše 32 vzorků za interval agregace a 32 agregovaných hodnot za hlášení (u bluetoothových tagů 16), hodnoty nad tyto limity zahodí. Poměr `interval-aggreg` k `interval-sample` a `interval-report` k `interval-aggreg` proto držte v těchto mezích.

### Rychlost větru {#wind-speed}

Rychlost větru se měří nepřetržitě i v době mezi vzorky (`interval-sample`). Každý vzorek je průměrná rychlost větru za dobu od předchozího vzorku. Při každé agregaci (`interval-aggreg`) se tyto vzorky agregují a z uložených vzorků se spočítá minimum, maximum, průměr a medián.

Díky nepřetržitému měření dává každá agregace přesnou minimální, maximální a průměrnou rychlost větru.

### Směr větru {#wind-direction}

Směr větru se čte při každém vzorku. Každá agregovaná hodnota je vektorový průměr vzorků z intervalu agregace ve stupních od severu (90° je východ), takže hlášení má za každý interval jedinou hodnotu `value` místo `min`, `max`, `avg` a `mdn`. Pokud se během intervalu nepodařilo směr přečíst, firmware v4.0.1 pošle místo `null` hodnotu `0`.

### Srážky {#rainfall}

Firmware čítá impulzy srážkoměru nepřetržitě. Při každé agregaci uloží srážky od předchozí agregace v milimetrech a začne čítat znovu od nuly, takže každá hodnota `value` udává srážky za jeden interval agregace.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Prodleva mezi událostí a hlášením v sekundách (teplotní alarm) |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); pravidelná hlášení se do limitu nepočítají |
| `hygro_t_alarm_hi_report` | Hygro t alarm hi report | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru překročí horní prahovou hodnotu |
| `hygro_t_alarm_hi_thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | Horní prahová hodnota teploty v °C |
| `hygro_t_alarm_hi_hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | Hystereze horní prahové hodnoty v °C |
| `hygro_t_alarm_lo_report` | Hygro t alarm lo report | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru klesne pod dolní prahovou hodnotu |
| `hygro_t_alarm_lo_thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Dolní prahová hodnota teploty v °C |
| `hygro_t_alarm_lo_hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Hystereze dolní prahové hodnoty v °C |
| `meteo-type` | Meteo type | `none`, `lambrecht`, `sensecap-s1000`, `sensecap-s500` | `none` | CHESTER Meteo M: typ meteostanice na sběrnici Modbus |
| `meteo-addr` | Meteo addr | `<1-247>` | `1` | CHESTER Meteo M: adresa meteostanice na sběrnici Modbus |
| `pm-type` | Pm type | `none`, `cubic-6303` | `none` | CHESTER Meteo M: typ senzoru prachových částic na sběrnici Modbus |
| `pm-addr` | Pm addr | `<1-247>` | `1` | CHESTER Meteo M: adresa senzoru prachových částic na sběrnici Modbus |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `9600` | CHESTER Meteo M: přenosová rychlost sběrnice Modbus |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even`, `mark`, `space` | `none` | CHESTER Meteo M: parita sběrnice Modbus |
| `modbus-stop-bits` | Modbus stop bits | `0_5`, `1`, `1_5`, `2` | `1` | CHESTER Meteo M: počet stop bitů sběrnice Modbus |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | CHESTER Meteo M: firmware v4.0.1 ho nepoužívá |

Parametry `event-report-*` a `hygro_t_alarm_*` se uplatní jen s vlhkoměrem CHESTER-S2. Parametry `meteo-type`, `meteo-addr`, `pm-type`, `pm-addr` a `modbus-*` obsahuje každé sestavení firmwaru CHESTER Meteo, rozhraní Modbus, které je používá, má ale jen varianta [**CHESTER Meteo M**](chester-meteo-m.md); vysvětluje je její stránka.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje senzory |
| `aggreg` | Okamžitě agreguje vzorky |
| `send` | Okamžitě odešle data |
| `sensors_read` | Přečte barometr, meteorologické senzory a vlhkoměr a vypíše hodnoty |
| `meteo read ctr_meteo_a` | Přečte srážkoměr, anemometr a směrovku větru a vypíše hodnoty, pro účely testování |

:::caution

Příkazy `sensors_read` a `meteo read` vynulují čítače srážkoměru a anemometru. Srážky změřené do té doby v příštím hlášení chybí a příští vzorek rychlosti větru pokryje jen dobu od zadání příkazu.

:::

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-meteo:v4.0.1](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `60a5b9b6cddf40659d47cf125e123f86`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86/hex), SHA256 `ffcf25780f04c6fc6bfe399cf68a8ee7f16e903d5616b762d9389af9e2718963`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86/bin), SHA256 `19c925516556e3a50c18f0b6461bdd891c2118f8ed813cca7551fa0038f13a76`
- **Sestavení ze SDK:** `west chester-update meteo --variant "CHESTER Meteo"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Každé pole s jednotkou, rozsahem a rozlišením popisuje katalogová stránka v části [**Data**](../../catalog-applications/chester-meteo/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení hlavního firmwaru v4.0.1 tak, jak ho dekóduje HARDWARIO Cloud, s meteorologickými senzory, barometrem, vlhkoměrem CHESTER-S2, jedním teploměrem DS18B20, jedním půdním senzorem a bez bluetoothového tagu:

- `weather_station`: rychlost větru v m/s, směr větru ve stupních a srážky v mm
- `barometer`: atmosférický tlak v Pa
- `hygrometer`: teplota a vlhkost z modulu CHESTER-S2 s událostmi alarmu od předchozího hlášení
- `w1_thermometers`: jedna položka pro každý teploměr DS18B20
- `soil_sensors`: jedna položka pro každý půdní senzor, s teplotou v °C a vlhkostí jako surovou hodnotou senzoru
- `ble_tags`: jedna položka pro každý spárovaný bluetoothový tag, v ukázce prázdný seznam

**Události** vlhkoměru:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

V ukázce je `interval-report` nastavený na `600`, takže každý seznam `measurements` má dvě položky; s výchozí hodnotou `1800` jich má šest. Každá položka má svou časovou značku a hodnoty `min`, `max`, `avg` a `mdn` ze vzorků; směr větru a srážky mají za každý interval agregace jedinou hodnotu `value`.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 36,
    "timestamp": 1793606459
  },
  "system": {
    "uptime": 21731,
    "voltage_rest": 3.61,
    "voltage_load": 3.57,
    "current_load": 35
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "BCGLS",
    "hw_revision": "R3.4",
    "fw_version": "v4.0.1",
    "serial_number": "2159018267"
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -83,
      "rsrq": -4,
      "snr": 14,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 18.37
  },
  "accelerometer": {
    "acceleration_x": -0.23,
    "acceleration_y": 0.07,
    "acceleration_z": 9.49,
    "orientation": 2
  },
  "w1_thermometers": [
    {
      "serial_number": 170694685,
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 17.12,
          "max": 17.31,
          "avg": 17.22,
          "mdn": 17.25
        },
        {
          "timestamp": 1793606412,
          "min": 17.25,
          "max": 17.43,
          "avg": 17.33,
          "mdn": 17.31
        }
      ]
    }
  ],
  "barometer": {
    "pressure": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 98071,
          "max": 98078,
          "avg": 98074,
          "mdn": 98074
        },
        {
          "timestamp": 1793606412,
          "min": 98066,
          "max": 98073,
          "avg": 98069,
          "mdn": 98070
        }
      ]
    }
  },
  "hygrometer": {
    "temperature": {
      "events": [],
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 18.04,
          "max": 18.21,
          "avg": 18.12,
          "mdn": 18.11
        },
        {
          "timestamp": 1793606412,
          "min": 18.15,
          "max": 18.33,
          "avg": 18.24,
          "mdn": 18.23
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 71.12,
          "max": 71.86,
          "avg": 71.45,
          "mdn": 71.41
        },
        {
          "timestamp": 1793606412,
          "min": 70.65,
          "max": 71.24,
          "avg": 70.98,
          "mdn": 71.02
        }
      ]
    }
  },
  "soil_sensors": [
    {
      "serial_number": 203181,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1793606112,
            "min": 15.43,
            "max": 15.5,
            "avg": 15.47,
            "mdn": 15.5
          },
          {
            "timestamp": 1793606412,
            "min": 15.5,
            "max": 15.56,
            "avg": 15.52,
            "mdn": 15.5
          }
        ]
      },
      "moisture": {
        "measurements": [
          {
            "timestamp": 1793606112,
            "min": 9472,
            "max": 9488,
            "avg": 9480,
            "mdn": 9480
          },
          {
            "timestamp": 1793606412,
            "min": 9464,
            "max": 9488,
            "avg": 9475,
            "mdn": 9472
          }
        ]
      }
    }
  ],
  "ble_tags": [],
  "weather_station": {
    "wind_speed": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "min": 1.33,
          "max": 3.11,
          "avg": 2.18,
          "mdn": 2.07
        },
        {
          "timestamp": 1793606412,
          "min": 1.56,
          "max": 3.44,
          "avg": 2.41,
          "mdn": 2.33
        }
      ]
    },
    "wind_direction": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "value": 202
        },
        {
          "timestamp": 1793606412,
          "value": 197
        }
      ]
    },
    "rainfall": {
      "measurements": [
        {
          "timestamp": 1793606112,
          "value": 0
        },
        {
          "timestamp": 1793606412,
          "value": 0.27
        }
      ]
    }
  }
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Dekodér LoRaWAN aplikace převede zprávu téhož zařízení na tato pole. Každá hodnota je poslední vzorek a tlak je v kPa.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage_rest": 3.61,
  "voltage_load": 3.57,
  "current_load": 35,
  "orientation": 2,
  "therm_temperature": 18.37,
  "wind_speed": 2.33,
  "wind_direction": 202,
  "rainfall": 0.27,
  "hygro_temperature": 18.23,
  "hygro_humidity": 71,
  "w1_thermometers": [17.37],
  "ble_tags": [],
  "barometer": 98.071,
  "soil_sensors": [
    {
      "temperature": 15.5,
      "moisture": 9480
    }
  ]
}
```

</details>

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v4.0.1 – 2026-09-07 {#v401--2026-09-07}

- **Opraveno**: Analogové vstupy CHESTER-X0 ve verzi v4.0.0 četly sousední kanál (chyba o jedničku v mapování kanálů); konfiguraci není potřeba měnit

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Nová varianta: **CHESTER Meteo M** (Modbus RTU, podporuje senzory Lambrecht a Sensecap/OPM; typ senzoru se volí parametrem `meteo-type`)
- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Vylepšeno**: Podpora pyranometru (intenzita slunečního záření)

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora půdních senzorů: měření vlhkosti a teploty půdními sondami 1-Wire (`soil_sensors` ve výstupu JSON)
- **Přidáno**: Nová varianta: **CHESTER Meteo P** se vstupem pro pyranometr k měření intenzity slunečního záření
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud Legacy zůstává dostupný samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
