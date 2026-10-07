---
slug: chester-input
title: CHESTER Input
---
import Image from '@theme/IdealImage';

# CHESTER Input {#chester-input}

:::warning

Aplikaci CHESTER Input nahradila aplikace [**CHESTER Control**](/chester/catalog-applications/chester-control) se stejnými funkcemi.

:::

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Input**, její hardware, výchozí konfiguraci a ukázkové zprávy **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](/chester/catalog-applications/common-functionality): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

Aplikace **CHESTER Input** měří a sleduje analogové a digitální vstupy. Navzorkované analogové hodnoty agreguje, agregovaná měření ukládá do bufferu a později je odešle najednou i s časovými značkami. Na digitálním vstupu (typ **trigger**) navíc zaznamenává změny, jejich typ a časovou značku. Díky bufferování zaznamená více událostí a přitom šetří přenosové pásmo i energii potřebnou k přenosu dat.

Zařízení **CHESTER Input** má tyto čtyři vstupy:

| **Typ**  | **Kanál**   | **Svorka**   | **Typ vstupu**    | **Rozsah vstupu** | **Typické použití**                      |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digitální (NPN/PNP) | 0 až 28 V     | Spínač, tlačítko, relé, senzor PLC     |
| Counter  | CH2         | A4           | Digitální (NPN/PNP) | 0 až 28 V     | Impulzní výstupy elektroměrů (např. S0) |
| Voltage  | CH3         | A5           | Analogový (napětí)  | 0 až 28 V     | Různé napěťové převodníky              |
| Current  | CH4         | A7           | Analogový (proud)   | 0 až 24 mA    | Různé proudové převodníky              |

Vstupy a jejich možnosti podrobně popisuje kapitola [**Parametry a chování vstupů**](#input-parameters-and-behavior).

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Input** lze objednat v jedné z těchto variant:

### CHESTER Input {#chester-input}

Hardware katalogové aplikace **CHESTER Input** tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Shieldy pro sestavení firmwaru: `ctr_ds18b20 ctr_lte ctr_x0_a`

### CHESTER Input Z {#chester-input-z}

Hardware katalogové aplikace **CHESTER Input Z** tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Záložní modul

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Shieldy pro sestavení firmwaru: `ctr_ds18b20 ctr_lte ctr_x0_a ctr_z`

### CHESTER Input ZH {#chester-input-zh}

**CHESTER Input ZH** s externím teploměrem a vlhkoměrem.

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Záložní modul

* `CHESTER-S2`: Externí vlhkoměr

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Shieldy pro sestavení firmwaru: `ctr_ds18b20 ctr_lte ctr_x0_a ctr_z ctr_s2`

## Parametry a chování vstupů {#input-parameters-and-behavior}

Schéma zapojení zařízení **CHESTER Input** najdete v [**popisu svorkovnice**](/chester/extension-modules/chester-x0) rozšiřujícího modulu **CHESTER-X0**.
Rozšiřující modul **CHESTER-X0** je osazený v levém slotu **A**, takže použijte odpovídající svorky **A1** až **A8**.

### Trigger {#trigger}

Vstup **trigger** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Chování vstupu **trigger** lze nastavit.

* Při změně vstupu se do bufferu uloží časová značka změny spolu se stavem **active**/**inactive** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Změny vstupu do stavu **active** (parametr `trigger-report-active`) nebo **inactive** (parametr `trigger-report-inactive`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `trigger-input-type`).

* Minimální doba trvání úrovně se nastavuje zvlášť pro stav **active** (parametr `trigger-active-duration`) a **inactive** (parametr `trigger-inactive-duration`).

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

### Counter {#counter}

Vstup **counter** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Vstup průběžně počítá celkový počet impulzů.

* Hodnota čítače se pravidelně agreguje (parametr `counter-interval-aggreg`) a buffer agregovaných měření se odesílá v nastavitelném intervalu (parametr `interval-report`).

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `counter-input-type`).

* Minimální doba trvání úrovně se nastavuje zvlášť pro stav **active** (parametr `counter-active-duration`) a **inactive** (parametr `counter-inactive-duration`).

### Voltage {#voltage}

Vstup **voltage** měří napětí v rozsahu **0–28 V** (pokrývá standard **0–10 V**).

* Napětí se pravidelně vzorkuje (parametr `analog-interval-sample`) a naměřené hodnoty se ukládají do **bufferu vzorků**.

* Nasbírané vzorky se pravidelně **agregují** (parametr `analog-interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.

* Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

### Current {#current}

Tento vstup měří analogový proud v rozsahu **0–24 mA** (pokrývá standard **4–20 mA**).

* Proud se pravidelně vzorkuje (parametr `analog-interval-sample`) a naměřené hodnoty se ukládají do **bufferu vzorků**.

* Nasbírané vzorky se pravidelně **agregují** (parametr `analog-interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.

* Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

### Záložní napájení {#backup}

Zařízení **CHESTER Input Z** (s modulem **CHESTER-Z1**) navíc hlásí stav záložní baterie a externího napájení DC.

* Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.

* Při změně na napájecím vstupu DC se do bufferu uloží časová značka změny spolu se stavem **connected**/**disconnected** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Změny napájecího vstupu DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

### Vlhkoměr {#hygrometer}

Volitelný vlhkoměr je v aplikaci **CHESTER Input** externí senzor teploty a vlhkosti.

* Hodnoty se pravidelně vzorkují (parametr `hygro-interval-sample`) a ukládají do **bufferu vzorků**.

* Nasbírané vzorky se pravidelně **agregují** (parametr `hygro-interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.

* Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-report 1800
app config event-report-delay 5
app config event-report-rate 30
app config backup-report-connected false
app config backup-report-disconnected false
app config trigger-input-type npn
app config trigger-active-duration 100
app config trigger-inactive-duration 100
app config trigger-cooldown-time 10
app config trigger-report-active false
app config trigger-report-inactive false
app config counter-interval-aggreg 300
app config counter-input-type npn
app config counter-active-duration 2
app config counter-inactive-duration 2
app config counter-cooldown-time 10
app config analog-interval-sample 60
app config analog-interval-aggreg 300
app config hygro-interval-sample 60
app config hygro-interval-aggreg 300
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

Tímto příkazem nastavíte **interval hlášení** (v sekundách):

```
app config interval-report <value>
```

Tímto příkazem nastavíte krátké zpoždění (v sekundách) mezi událostí **trigger** nebo **backup** a jejím nahlášením:

```
app config event-report-delay <value>
```

:::tip

Tato funkce je užitečná v systémech, kde může krátce po první změně přijít další.

:::

Tímto příkazem omezíte počet asynchronních hlášení událostí **trigger** nebo **backup** za hodinu:

```
app config event-report-rate <value>
```

:::tip

Limit šetří baterii zařízení a snižuje objem přenášených dat. Pravidelná hlášení podle parametru `interval-report` se do něj nepočítají.

:::

Těmito příkazy zapnete nebo vypnete hlášení připojení a odpojení napájení na vstupu záložního modulu:

```
app config backup-report-connected false
app config backup-report-disconnected false
```

Těmito příkazy nastavíte typ vstupů **trigger** a **counter**. Platné hodnoty jsou `npn` a `pnp`:

```
app config trigger-input-type <npn/pnp>
app config counter-input-type <npn/pnp>
```

Těmito příkazy zapnete nebo vypnete okamžité hlášení změny vstupu **trigger** na úroveň **active** nebo **inactive**:

```
app config trigger-report-active <true/false>
app config trigger-report-inactive <true/false>
```

Těmito příkazy nastavíte dobu trvání stavů **active** a **inactive** (v milisekundách) pro digitální vstupy **trigger** a **counter**:

```
app config trigger-active-duration <value>
app config trigger-inactive-duration <value>
app config trigger-cooldown-time <value>

app config counter-active-duration <value>
app config counter-inactive-duration <value>
app config counter-cooldown-time <value>
```

:::info

- Parametr `active-duration` nastavuje zpoždění v milisekundách mezi změnou vstupního signálu na aktivní úroveň (podle konfigurace `npn` nebo `pnp`) a okamžikem, kdy na tuto změnu zařízení CHESTER zareaguje. Hodí se k odfiltrování zákmitů (debounce), když je na vstup připojený „elektricky rušivý“ mechanický spínač nebo relé. Využijete ho i tehdy, když má zařízení CHESTER reagovat jen na impulzy delší než nastavená doba.
- Parametr `inactive-duration` funguje stejně jako `active-duration` výše, jen nastavuje čas pro opačnou hranu.
- Parametr `cooldown-time` je zpoždění, které chrání zařízení CHESTER před záplavou přerušení. Kdyby byl připojený příliš rychlý signál (>10 kHz), obsluha přerušení by mohla spotřebovat veškerý čas procesoru a zastavit běh ostatních vláken. Parametr proto vkládá krátkou prodlevu před dalším spuštěním obsluhy přerušení. Lze ponechat výchozí hodnotu 10 ms.


:::

Těmito příkazy nastavíte intervaly **vzorkování** a **agregace** (v sekundách) pro měření **napětí** / **proudu**:

```
app config analog-interval-sample <value>
app config analog-interval-aggreg <value>
```

Těmito příkazy nastavíte intervaly **vzorkování** a **agregace** (v sekundách) pro volitelný **vlhkoměr** (příslušenství **CHESTER-S2**):

```
app config hygro-interval-sample <value>
app config hygro-interval-aggreg <value>
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](/chester/catalog-applications/catalog-applications#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
```json
{
  "message": {
    "version": 1,
    "sequence": 7,
    "timestamp": 1670580791
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Input",
    "fw_version": "v1.0.0",
    "serial_number": "2159018247"
  },
  "system": {
    "uptime": 2058,
    "voltage_rest": 3.74,
    "voltage_load": 3.65,
    "current_load": 36
  },
  "backup": {
    "line_voltage": 24.21,
    "batt_voltage": 3.41,
    "state": "connected",
    "events": [
      {
        "timestamp": 1670580549,
        "type": "disconnected"
      },
      {
        "timestamp": 1670580552,
        "type": "connected"
      }
    ]
  },
  "network": {
    "imei": 351358815178303,
    "imsi": 901288003957939,
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
    "temperature": 23.06
  },
  "accelerometer": {
    "acceleration_x": 0.07,
    "acceleration_y": 0.38,
    "acceleration_z": 9.88,
    "orientation": 2
  },
  "trigger": {
    "state": "inactive",
    "events": [
      {
        "timestamp": 1670580550,
        "type": "activated"
      },
      {
        "timestamp": 1670580553,
        "type": "deactivated"
      },
      {
        "timestamp": 1670580631,
        "type": "activated"
      },
      {
        "timestamp": 1670580634,
        "type": "deactivated"
      }
    ]
  },
  "counter": {
    "value": 12586,
    "measurements": [
      {
        "timestamp": 1670580548,
        "value": 12526
      },
      {
        "timestamp": 1670580698,
        "value": 12583
      }
    ]
  },
  "voltage": {
    "measurements": [
      {
        "timestamp": 1670580548,
        "min": 11.27,
        "max": 11.35,
        "avg": 11.31,
        "mdn": 11.35
      },
      {
        "timestamp": 1670580698,
        "min": 11.26,
        "max": 11.35,
        "avg": 11.29,
        "mdn": 11.27
      }
    ]
  },
  "current": {
    "measurements": [
      {
        "timestamp": 1670580548,
        "min": 10.55,
        "max": 10.91,
        "avg": 10.73,
        "mdn": 10.91
      },
      {
        "timestamp": 1670580698,
        "min": 10.51,
        "max": 10.91,
        "avg": 10.66,
        "mdn": 10.55
      }
    ]
  },
  "hygrometer": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1670580548,
          "min": 22.99,
          "max": 23.02,
          "avg": 23.01,
          "mdn": 23.02
        },
        {
          "timestamp": 1670580698,
          "min": 23.02,
          "max": 23.08,
          "avg": 23.05,
          "mdn": 23.06
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1670580548,
          "min": 49.66,
          "max": 49.74,
          "avg": 49.7,
          "mdn": 49.74
        },
        {
          "timestamp": 1670580698,
          "min": 49.62,
          "max": 50.07,
          "avg": 49.84,
          "mdn": 49.82
        }
      ]
    }
  }
}
```

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

```json
{
  "voltage": 3.6,
  "channels": [
    {
      "id": 0,
      "state": true,
      "count": 100
    },
    {
      "id": 1,
      "state": false,
      "count": 5
    }
  ]
}
```
    
  </TabItem>
</Tabs>
