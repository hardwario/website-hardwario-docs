---
slug: chester-clime
title: CHESTER Clime
---
import Image from '@theme/IdealImage';

# CHESTER Clime {#chester-clime}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Clime**, její hardware a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Zařízení **CHESTER Clime** měří podmínky prostředí: naměřené veličiny vzorkuje, agreguje a odesílá.

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Clime** lze objednat v jedné z těchto variant:

### CHESTER Clime {#chester-clime}

Katalogová aplikace **CHESTER Clime** měří:
- Teplotu
- Vlhkost

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"`

### CHESTER Clime Z {#chester-clime-z}

Katalogová aplikace **CHESTER Clime Z** měří:
- Teplotu
- Vlhkost

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-Z1`: Záložní modul
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"` (podpora záložního modulu CHESTER-Z je součástí základního firmwaru **CHESTER Clime**)

### CHESTER Clime IAQ {#chester-clime-iaq}

Katalogová aplikace **CHESTER Clime IAQ** měří:
- Teplotu
- Vlhkost
- Osvětlenost
- Koncentraci CO₂
- Atmosférický tlak
- Detekci pohybu senzorem PIR

Aplikace také hlásí **stisky tlačítka** a dává **zvukovou** a **světelnou odezvu**.
Barva **LED v tlačítku** navíc **signalizuje úrovně koncentrace CO₂**.

:::caution

Varianta IAQ ve výchozí konfiguraci odesílá přibližně 800 bajtů dat. Pokud prodloužíte interval hlášení a nezvýšíte zároveň interval agregace,
může být datový buffer větší než MTU protokolu UDP a paket se neodešle. Zařízení se pak tváří, jako by neodesílalo nic nebo jen část paketů.

:::

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S1-BCMP`: Integrovaný multisenzor
* `CHESTER-X10`: Externí napájení 6–28 V s baterií Li-Ion
* `CHESTER-E7-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime IAQ"`



### CHESTER Clime 1W {#chester-clime-1w}

Katalogová aplikace **CHESTER Clime 1W** podporuje více externích teplotních senzorů DS18B20 1-Wire.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-E8-LP`: Krabička s 8 kabelovými průchodkami (RM8L-4S)

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"` (podpora senzorů DS18B20 1-Wire je součástí základního firmwaru **CHESTER Clime**)

### CHESTER Clime 1WH {#chester-clime-1wh}

Katalogová aplikace **CHESTER Clime 1WH** podporuje modul **CHESTER-S2** a více externích teplotních senzorů DS18B20 1-Wire.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E8-LP`: Krabička s 8 kabelovými průchodkami (RM8L-4S)

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"` (podpora senzorů DS18B20 1-Wire a modulu CHESTER-S2 je součástí základního firmwaru **CHESTER Clime**)

### CHESTER Clime RTD {#chester-clime-rtd}

Katalogová aplikace **CHESTER Clime RTD** podporuje dva externí čtyřvodičové teplotní senzory Pt1000.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X3A:A`: Rozhraní pro 2x Pt100/Pt1000
* `CHESTER-E13-LP`: Krabička s pigtailem SMA a 2 kabelovými průchodkami PG7

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime RTD"`

### CHESTER Clime TC {#chester-clime-tc}

Katalogová aplikace **CHESTER Clime TC** podporuje dva externí termočlánky **typu K**.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X3B:A`: Rozhraní pro 2x termočlánek typu K
* `CHESTER-E13-LP`: Krabička s pigtailem SMA a 2 kabelovými průchodkami PG7

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime TC"`

## Měření a chování {#measurement-and-behavior}

- Všechny senzory se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu: z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`).

:::caution

Zařízení CHESTER Clime ve výchozí konfiguraci odesílá přibližně 500 bajtů dat. Pokud prodloužíte interval hlášení a nezvýšíte zároveň interval agregace,
může být datový buffer větší než MTU protokolu UDP a paket se neodešle. Zařízení se pak tváří, jako by neodesílalo nic nebo jen část paketů.

:::

Pokud je zařízení osazeno modulem **CHESTER-S1**, má také tlačítko. Po stisku tlačítka se na sekundu rozsvítí modrá LED a stisk zvukově potvrdí **pípnutí** z vestavěného bzučáku.

Tlačítko na volitelném modulu **CHESTER-S1** navíc barvou ukazuje stav koncentrace CO₂ vůči prahovým hodnotám: **zelená** (hodnoty jsou v pořádku), **oranžová** (varování) a **červená** (alarm). Při napájení z baterie tlačítko každých 5 sekund krátce blikne, při externím napájení přes modul X10 svítí trvale. **Prahové hodnoty** i **hysterezi** lze **nastavit**.

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

Výchozí konfigurace pro alarmy vlhkoměru:

```
app config hygro-t-alarm-hi-report false
app config hygro-t-alarm-lo-report false
app config hygro-t-alarm-hi-thr 0.0
app config hygro-t-alarm-hi-hst 0.0
app config hygro-t-alarm-lo-thr 0.0
app config hygro-t-alarm-lo-hst 0.0
```

Se **záložním modulem** (CHESTER-Z1) nebo **vlhkoměrem** (CHESTER-S2):

```
app config event-report-delay 1
app config event-report-rate 30
```

S modulem **IAQ** (CHESTER-S1) můžete změnit prahové hodnoty CO₂ a hysterezi, podle kterých se mění barva LED v tlačítku:

```
app config iaq-led-thr-warning 800.0
app config iaq-led-thr-alarm 1600.0
app config iaq-led-hst 50.0
```

Se **záložním modulem** (CHESTER-Z1) nebo modulem **externího napájení** (CHESTER-X10) může zařízení okamžitě hlásit změny externího napájení:

```
app config backup-report-connected true
app config backup-report-disconnected true
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

:::caution

Novou konfiguraci uplatníte příkazem `config save`, který uloží nové parametry a restartuje zařízení.

:::

Tímto příkazem nastavíte **interval vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Tímto příkazem nastavíte **interval agregace** v sekundách:

```
app config interval-aggreg <1-86400>
```

Tímto příkazem nastavíte **interval hlášení** v sekundách:

```
app config interval-report <30-86400>
```

Tímto příkazem zapnete **hlášení alarmů** při vysoké a nízké teplotě na vlhkoměru:

```
app config hygro-t-alarm-hi-report false
app config hygro-t-alarm-lo-report false
```

Tímto příkazem nastavíte **prahové hodnoty** vysoké a nízké teploty na vlhkoměru v **°C**:

```
app config hygro-t-alarm-hi-thr <-40.0..125.0>
app config hygro-t-alarm-lo-thr <-40.0..125.0>
```

Tímto příkazem nastavíte **hysterezi** vysoké a nízké teploty na vlhkoměru v **°C**:

```
app config hygro-t-alarm-hi-hst <0.0..100.0>
app config hygro-t-alarm-lo-hst <0.0..100.0>
```

Tímto příkazem nastavíte **prodlevu mezi událostí a hlášením** v sekundách (teplotní alarm, změna stavu záložního napájení):

```
app config event-report-delay <1-86400>
```

Tímto příkazem nastavíte **četnost hlášení** jako počet hlášení za hodinu (platí jen pro hlášení událostí, pravidelná hlášení se do limitu nepočítají):

```
app config event-report-rate <1-3600>
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](index.md#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    Tato ukázka **JSON** obsahuje data ze všech tří variant

- **CHESTER Clime** má vlastní strukturu `hygrometer`.
- **CHESTER Clime IAQ** má vlastní strukturu `iaq_sensor`.
- **CHESTER Clime 1W** má vlastní strukturu `w1_thermometers`.
- **CHESTER Clime RTD** má vlastní strukturu `rtd_thermometers`.
- **CHESTER Clime** s volitelným **záložním napájením** (CHESTER-Z1 nebo CHESTER-X10) má strukturu `backup` s externím a vnitřním napětím, stavem a událostmi.

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
<p>

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
  "rtd_thermometers": [
    {
      "channel": 1,
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
    },
    {
      "channel": 2,
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

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

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

</p>
</details>

  </TabItem>
</Tabs>

---

## Seznam změn {#changelog}

### v3.5.4 – 2026-04-14 {#v354--2026-04-14}

- **Změněno**: Detekce modulu CHESTER-Z za běhu, jeden firmware tak nyní funguje s modulem CHESTER-Z i bez něj; samostatná varianta **CHESTER Clime Z** byla odstraněna
- **Opraveno**: Selhání sestavení varianty IAQ při současně zapnutých funkcích CHESTER-Z a CHESTER-X10

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Nové varianty: **CHESTER Clime SPS30** (prachové částice: PM1/PM2.5/PM10) a **CHESTER Clime Radon** (koncentrace radonu)
- **Přidáno**: Nová varianta: **CHESTER Clime TC** pro dva externí termočlánky typu K (přes CHESTER-X3B)
- **Vylepšeno**: Podpora teploměrů DS18B20 1-Wire, vyšší spolehlivost a čistší obsluha více senzorů
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); varianty pro Cloud v1 zůstávají dostupné v samostatné tabulce firmwaru
- **Změněno**: Jediný společný binární soubor firmwaru pro LTE i LoRaWAN; síť se volí příkazem `app config mode lte` / `app config mode lrw`
- **Odstraněno**: Varianty Clime 1W a Clime 1WH byly vypuštěny ze sestavení firmwaru pro Cloud v2 (pro Cloud v1 zůstávají dostupné)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
