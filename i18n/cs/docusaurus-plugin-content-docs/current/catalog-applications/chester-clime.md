---
slug: chester-clime
title: CHESTER Clime
description: "Tento článek popisuje základní funkce, hardware a ukázkovou JSON zprávu katalogové aplikace CHESTER Clime."
---
import Image from '@theme/IdealImage';

# CHESTER Clime {#chester-clime}

Tento článek popisuje základní funkce, hardware a ukázkovou **JSON** zprávu katalogové aplikace **CHESTER Clime**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps) – jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](common-functionality.md) – jak funguje LED, tlačítko a konfigurace sítě.
- [**Správa platformy**](../category/platform-connectivity) – jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

**CHESTER Clime** je environmentální senzor, který vzorkuje, agreguje a odesílá naměřené veličiny.

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Clime** lze objednat v jedné z těchto variant:

### CHESTER Clime {#chester-clime}

Katalogová aplikace **CHESTER Clime** měří:
- Teplotu
- Vlhkost

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-S2` - Externí vlhkoměr
* `CHESTER-E1-LP` - Krabička se SMA pigtailem

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"`

### CHESTER Clime Z {#chester-clime-z}

Katalogová aplikace **CHESTER Clime Z** měří:
- Teplotu
- Vlhkost

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-Z1` - Zálohovací modul
* `CHESTER-S2` - Externí vlhkoměr
* `CHESTER-E1-LP` - Krabička se SMA pigtailem

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"` (podpora zálohování CHESTER-Z je součástí základního firmwaru **CHESTER Clime**)

### CHESTER Clime IAQ {#chester-clime-iaq}

Katalogová aplikace **CHESTER Clime IAQ** měří:
- Teplotu
- Vlhkost
- Osvětlení
- Koncentraci CO₂
- Atmosférický tlak
- Detekci pohybu pomocí PIR senzoru

Aplikace také hlásí **události stisku tlačítka** a poskytuje **akustickou** a **optickou zpětnou vazbu**.
Barva **LED v tlačítku** navíc **signalizuje úrovně koncentrace CO₂**.

:::caution

CHESTER IAQ ve výchozí konfiguraci odesílá přibližně 800 bajtů dat. Pokud zvýšíte interval reportování, aniž byste zvýšili i interval agregace,
může být datový buffer větší než UDP MTU a paket nebude odeslán. Zařízení pak vypadá, že neodesílá nebo odesílá jen zlomek paketů.

:::

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-S1-BCMP` - Integrovaný multisenzor
* `CHESTER-X10` - Externí napájení 6-28V s Li-Ion baterií
* `CHESTER-E7-LP` - Krabička se SMA pigtailem

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime IAQ"`



### CHESTER Clime 1W {#chester-clime-1w}

Katalogová aplikace **CHESTER Clime 1W** podporuje více externích teplotních senzorů DS18B20 1-Wire.

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-E8-LP` - Krabička s 8 kabelovými průchodkami (RM8L-4S)

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"` (podpora DS18B20 1-Wire je součástí základního firmwaru **CHESTER Clime**)

### CHESTER Clime 1WH {#chester-clime-1wh}

Katalogová aplikace **CHESTER Clime 1WH** podporuje **CHESTER-S2** + více externích teplotních senzorů DS18B20 1-Wire.

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-S2` - Externí vlhkoměr
* `CHESTER-E8-LP` - Krabička s 8 kabelovými průchodkami (RM8L-4S)

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime"` (podpora DS18B20 1-Wire a CHESTER-S2 je součástí základního firmwaru **CHESTER Clime**)

### CHESTER Clime RTD {#chester-clime-rtd}

Katalogová aplikace **CHESTER Clime RTD** podporuje dva externí čtyřvodičové teplotní senzory Pt1000.

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-X3A:A` - Rozhraní pro 2x Pt100/Pt1000
* `CHESTER-E13-LP` - Krabička se SMA pigtailem a 2 kabelovými průchodkami PG7

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime RTD"`

### CHESTER Clime TC {#chester-clime-tc}

Katalogová aplikace **CHESTER Clime TC** podporuje dva externí termočlánkové senzory **typu K**.

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska
* `CHESTER-X3B:A` - Rozhraní pro 2x termočlánek typu K
* `CHESTER-E13-LP` - Krabička se SMA pigtailem a 2 kabelovými průchodkami PG7

Více informací najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update clime --variant "CHESTER Clime TC"`

## Měření a chování {#measurement-and-behavior}

- Všechny senzory jsou **vzorkovány** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky jsou následně **agregovány** v nastavitelném intervalu. Z uložených vzorků se pro každý senzor počítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku a odesílá se v dávce v intervalu reportování (parametr `interval-report`).

:::caution

CHESTER Clime ve výchozí konfiguraci odesílá přibližně 500 bajtů dat. Pokud zvýšíte interval reportování, aniž byste zvýšili i interval agregace,
může být datový buffer větší než UDP MTU a paket nebude odeslán. Zařízení pak vypadá, že neodesílá nebo odesílá jen zlomek paketů.

:::

Pokud je zařízení osazeno modulem **CHESTER-S1**, má také tlačítko. Při stisku tlačítka se na sekundu rozsvítí modrá LED. Zároveň se z integrovaného akustického bzučáku přehraje **pípnutí** jako zvukové potvrzení stisku tlačítka.

Tlačítko na volitelném modulu **CHESTER-S1** navíc svou barvou hlásí stav CO₂ prahy **zelená** (hodnoty jsou v pořádku), **oranžová** (varování) a **červená** (alarm). Při napájení z baterie tlačítko krátce blikne každých 5 sekund a při připojeném externím napájení na X10 svítí trvale. **Úrovně** prahů a **hystereze** jsou **konfigurovatelné**.

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

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

Při osazení modulem **zálohování** (CHESTER-Z1) nebo **vlhkoměrem** (CHESTER-S2):

```
app config event-report-delay 1
app config event-report-rate 30
```

Při osazení modulem **IAQ** (CHESTER-S1) můžete změnit prahy CO₂ a hysterezi, které jsou signalizovány barvou LED v tlačítku:

```
app config iaq-led-thr-warning 800.0
app config iaq-led-thr-alarm 1600.0
app config iaq-led-hst 50.0
```

Při osazení modulem **zálohování** (CHESTER-Z1) nebo **externího napájení** (CHESTER-X10) můžete okamžitě hlásit změny událostí externího napájení:

```
app config backup-report-connected true
app config backup-report-disconnected true
```

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu stromu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

:::caution

Pro použití nové konfigurace je potřeba zavolat `config save`, což aplikuje nové konfigurační parametry a restartuje zařízení.

:::

Příkaz pro nastavení **intervalu vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Příkaz pro nastavení **intervalu agregace** v sekundách:

```
app config interval-aggreg <1-86400>
```

Příkaz pro nastavení **intervalu reportování** v sekundách:

```
app config interval-report <30-86400>
```

Příkaz pro zapnutí **hlášení alarmů** vysoké/nízké teploty vlhkoměru:

```
app config hygro-t-alarm-hi-report false
app config hygro-t-alarm-lo-report false
```

Příkaz pro nastavení **prahů** vysoké/nízké teploty vlhkoměru ve **°C**:

```
app config hygro-t-alarm-hi-thr <-40.0..125.0>
app config hygro-t-alarm-lo-thr <-40.0..125.0>
```

Příkaz pro nastavení **hystereze** vysoké/nízké teploty vlhkoměru ve **°C**:

```
app config hygro-t-alarm-hi-hst <0.0..100.0>
app config hygro-t-alarm-lo-hst <0.0..100.0>
```

Příkaz pro nastavení **prodlevy mezi událostí a hlášením** v sekundách (teplotní alarm, změna stavu zálohování):

```
app config event-report-delay <1-86400>
```

Příkaz pro nastavení **četnosti hlášení** v počtu hlášení za hodinu (platí jen pro hlášení událostí, periodická hlášení se do tohoto limitu nepočítají):

```
app config event-report-rate <1-3600>
```

## Firmware {#firmware}

Nejnovější firmware je k dispozici v kapitole [Firmware](index.md#application-firmware) katalogových aplikací.

## Ukázková JSON zpráva {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    V tomto ukázkovém **JSON** vidíte data ze všech tří variant

- **CHESTER Clime** má vlastní strukturu `hygrometer`.
- **CHESTER Clime IAQ** má vlastní strukturu `iaq_sensor`.
- **CHESTER Clime 1W** má vlastní strukturu `w1_thermometers`.
- **CHESTER Clime RTD** má vlastní strukturu `rtd_thermometers`.
- **CHESTER Clime** s volitelným **zálohováním** (CHESTER-Z1 nebo CHESTER-X10) má strukturu `backup` s externím a interním napětím, stavem a událostmi.

**Události** zálohování jsou:
* `connected`
* `disconnected`

**Události** vlhkoměru jsou:
* `alarm_hi_activated`
* `alarm_hi_deactivated`
* `alarm_lo_activated`
* `alarm_lo_deactivated`

V každé struktuře je při aktuální konfiguraci šest agregovaných hodnot. Každá agregovaná hodnota má svou časovou značku a je vypočtena z několika vzorků; počítají se hodnoty `min`, `max`, `avg` a `mdn`.

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

### v3.5.4 — 2026-04-14 {#v354--2026-04-14}

- **Změněno**: Detekce modulu CHESTER-Z za běhu — jeden firmware nyní funguje s modulem CHESTER-Z i bez něj; samostatná varianta **CHESTER Clime Z** byla odstraněna
- **Opraveno**: Selhání sestavení varianty IAQ při současně zapnutých funkcích CHESTER-Z a CHESTER-X10

### v3.5.1 — 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Nové varianty — **CHESTER Clime SPS30** (prachové částice: PM1/PM2.5/PM10) a **CHESTER Clime Radon** (koncentrace radonu)
- **Přidáno**: Nová varianta — **CHESTER Clime TC** pro dva externí termočlánkové senzory typu K (přes CHESTER-X3B)
- **Vylepšeno**: Podpora teploměrů DS18B20 1-Wire — vyšší spolehlivost a čistší obsluha více senzorů
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové API endpointy); varianty pro Cloud v1 zůstávají dostupné v samostatné tabulce firmwaru
- **Změněno**: Jediný společný binární firmware pro LTE i LoRaWAN; síť se volí pomocí `app config mode lte` / `app config mode lrw`
- **Odstraněno**: Varianty Clime 1W a Clime 1WH byly vypuštěny ze sestavení firmwaru pro Cloud v2 (zůstávají dostupné pod Cloud v1)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
