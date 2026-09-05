---
slug: chester-input
title: CHESTER Input
description: "CHESTER Counter je nahrazen aplikací CHESTER Control, která nabízí stejnou funkcionalitu."
---
import Image from '@theme/IdealImage';

# CHESTER Input {#chester-input}

:::warning

CHESTER Counter je nahrazen aplikací [**CHESTER Control**](https://docs.hardwario.com/chester/catalog-applications/chester-control), která nabízí stejnou funkcionalitu.

:::

Tento článek popisuje základní funkcionalitu, popis hardwaru, výchozí konfiguraci a ukázkové **JSON** zprávy pro katalogovou aplikaci **CHESTER Input**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do cloudu.
- [**Společná funkcionalita**](https://docs.hardwario.com/chester/catalog-applications/common-functionality): jak funguje LED, tlačítko a konfigurace sítě.
- [**Platform Management**](https://docs.hardwario.com/chester/category/platform-connectivity): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

Aplikace **CHESTER Input** slouží k měření a sledování analogových a digitálních vstupů. Naměřené analogové hodnoty jsou agregovány, agregovaná měření jsou ukládána do bufferu a naplánována pro pozdější přenos dat v podobě bufferovaných dat společně s časovými značkami. Rovněž lze sledovat změny na digitálním vstupu (typ **trigger**) včetně typu změny a časové značky. Strategie bufferování umožňuje zaznamenat vyšší počet událostí při zachování šířky pásma a energie potřebné pro přenos dat.

**CHESTER Input** má tyto čtyři vstupy:

| **Typ**  | **Kanál**   | **Svorka**   | **Typ vstupu**    | **Rozsah vstupu** | **Typické použití**                      |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digitální – NPN/PNP | 0 až 28 V     | Spínač, tlačítko, relé, senzor PLC     |
| Counter  | CH2         | A4           | Digitální – NPN/PNP | 0 až 28 V     | Pulzní výstupy elektroměrů (např. S0) |
| Voltage  | CH3         | A5           | Analogový – napětí  | 0 až 28 V     | Různé napěťové převodníky              |
| Current  | CH4         | A7           | Analogový – proud   | 0 až 24 mA    | Různé proudové převodníky              |

Všechny tyto vstupy a jejich možnosti jsou podrobněji vysvětleny v článku [**Parametry a chování vstupů**](#input-parameters-and-behavior).

## Varianty aplikace {#application-variants}

**CHESTER Input** lze objednat v jedné z těchto variant:

### CHESTER Input {#chester-input}

Hardware katalogové aplikace **CHESTER Input** se skládá z těchto objednacích kódů:

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

Více podrobností najdete v [**Objednacích kódech**](https://docs.hardwario.com/chester/ordering-codes).

Volby shieldů při sestavení firmwaru: `ctr_ds18b20 ctr_lte ctr_x0_a`

### CHESTER Input Z {#chester-input-z}

Hardware katalogové aplikace **CHESTER Input Z** se skládá z těchto objednacích kódů:

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Zálohovací modul

Více podrobností najdete v [**Objednacích kódech**](https://docs.hardwario.com/chester/ordering-codes).

Volby shieldů při sestavení firmwaru: `ctr_ds18b20 ctr_lte ctr_x0_a ctr_z`

### CHESTER Input ZH {#chester-input-zh}

**CHESTER Input ZH** s externím teploměrem a vlhkoměrem.

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Zálohovací modul

* `CHESTER-S2`: Externí vlhkoměr

Více podrobností najdete v [**Objednacích kódech**](https://docs.hardwario.com/chester/ordering-codes).

Volby shieldů při sestavení firmwaru: `ctr_ds18b20 ctr_lte ctr_x0_a ctr_z ctr_s2`

## Parametry a chování vstupů {#input-parameters-and-behavior}

Schéma zapojení pro **CHESTER Input** najdete v [**popisu svorkovnice**](https://docs.hardwario.com/chester/extension-modules/chester-x0) rozšiřujícího modulu **CHESTER-X0**.
Rozšiřující modul **CHESTER-X0** je nainstalován v levém slotu **A**, takže je nutné použít odpovídající svorky **A1** až **A8**.

### Trigger {#trigger}

Vstup **trigger** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Chování vstupu **trigger** je konfigurovatelné.

* Při změně vstupu je uložena časová značka události změny společně se stavem **active**/**inactive**, tato informace je bufferována a buffer událostí je odeslán (nejpozději) s pravidelným reportem (parametr `interval-report`).

* Volitelně lze změny vstupu do stavu **active** (parametr `trigger-report-active`) nebo **inactive** (parametr `trigger-report-inactive`) reportovat **okamžitě** nebo s konfigurovatelným **zpožděním** (parametr `event-report-delay`), aby bylo možné zachytit více po sobě jdoucích změn vstupu.

* Podporovány jsou oba typy vstupní logiky **NPN** i **PNP** (parametr `trigger-input-type`).

* Minimální doba trvání úrovně se konfiguruje zvlášť pro stav **active** (parametr `trigger-active-duration`) a **inactive** (parametr `trigger-inactive-duration`).

* Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`). Omezení počtu událostí limituje šířku komunikačního pásma a šetří životnost baterie.

### Counter {#counter}

Vstup **counter** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Tento vstup počítá celkový počet pulzů v čase.

* Hodnota čítače je pravidelně agregována (parametr `counter-interval-aggreg`) a buffer agregovaných měření je reportován v konfigurovatelném intervalu (parametr `interval-report`).

* Podporovány jsou oba typy vstupní logiky **NPN** i **PNP** (parametr `counter-input-type`).

* Minimální doba trvání úrovně se konfiguruje zvlášť pro stav **active** (parametr `counter-active-duration`) a **inactive** (parametr `counter-inactive-duration`).

### Voltage {#voltage}

Vstup **voltage** měří napětí v rozsahu **0–28 V** (překrývá standard **0–10 V**).

* Hodnoty napětí jsou vzorkovány pravidelně (parametr `analog-interval-sample`). Tyto hodnoty jsou uloženy jako **buffer vzorků**.

* Nasbírané vzorky jsou pravidelně **agregovány** (parametr `analog-interval-aggreg`). Z bufferovaných vzorků se počítají agregáty minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.

* Každé **měření** má přiřazenou časovou značku. Bufferovaná **měření** jsou pravidelně přenášena jako časová řada (parametr `interval-report`).

### Current {#current}

Tento vstup měří analogový proud v rozsahu **0–24 mA** (překrývá standard **4–20 mA**).

* Hodnoty proudu jsou vzorkovány pravidelně (parametr `analog-interval-sample`). Tyto hodnoty jsou uloženy jako **buffer vzorků**.

* Nasbírané vzorky jsou pravidelně **agregovány** (parametr `analog-interval-aggreg`). Z bufferovaných vzorků se počítají agregáty minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.

* Každé **měření** má přiřazenou časovou značku. Bufferovaná **měření** jsou pravidelně přenášena jako časová řada (parametr `interval-report`).

### Backup {#backup}

**CHESTER Input Z** (osazený modulem **CHESTER-Z1**) může také reportovat informace o záložní baterii a stavu externího DC napájení.

* Aktuální **napětí baterie** a **externí DC napětí** jsou odesílány v každém reportu.

* Při změně DC napájecího vstupu je uložena časová značka události změny společně se stavem **connected**/**disconnected**, tato informace je bufferována a buffer událostí je odeslán (nejpozději) s pravidelným reportem (parametr `interval-report`).

* Volitelně lze změny DC napájecího vstupu do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) reportovat **okamžitě** nebo s konfigurovatelným **zpožděním** (parametr `event-report-delay`), aby bylo možné zachytit více po sobě jdoucích změn vstupu.

* Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`). Omezení počtu událostí limituje šířku komunikačního pásma a šetří životnost baterie.

### Hygrometer {#hygrometer}

Volitelný vlhkoměr v aplikaci **CHESTER Input** představuje externí senzor teploty a vlhkosti.

* Hodnoty jsou vzorkovány pravidelně (parametr `hygro-interval-sample`). Tyto hodnoty jsou uloženy jako **buffer vzorků**.

* Nasbírané vzorky jsou pravidelně **agregovány** (parametr `hygro-interval-aggreg`). Z bufferovaných vzorků se počítají agregáty minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.

* Každé **měření** má přiřazenou časovou značku. Bufferovaná **měření** jsou pravidelně přenášena jako časová řada (parametr `interval-report`).

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

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

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu stromu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

Tímto příkazem nastavíte **interval reportu** (v sekundách):

```
app config interval-report <value>
```

Tímto příkazem nakonfigurujete krátké zpoždění (v sekundách) mezi událostí **trigger** nebo **backup** a jejím reportováním:

```
app config event-report-delay <value>
```

:::tip

Tato funkce je užitečná v systémech, kde může krátce po první změně přijít další.

:::

Tímto příkazem omezíte počet asynchronních reportů událostí **trigger** nebo **backup** v jednohodinovém okně:

```
app config event-report-rate <value>
```

:::tip

Tato funkce pomáhá šetřit energii u zařízení napájeného z baterie a optimalizuje množství přenášených dat. Pravidelné (periodické) reporty nastavené parametrem `interval-report` se do tohoto limitu nepočítají.

:::

Těmito příkazy zapnete/vypnete reportování událostí připojení/odpojení napájecího vstupu zálohovacího modulu:

```
app config backup-report-connected false
app config backup-report-disconnected false
```

Těmito příkazy nastavíte typ vstupu pro vstupy **trigger** a **counter**. Platné hodnoty jsou `npn` nebo `pnp`:

```
app config trigger-input-type <npn/pnp>
app config counter-input-type <npn/pnp>
```

Těmito příkazy zapnete/vypnete okamžité reportování změny vstupu **trigger** na úroveň **active** nebo **inactive**:

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

- Parametr `active-duration` nastavuje zpoždění v milisekundách mezi změnou vstupního signálu na aktivní úroveň (podle konfigurace `npn` nebo `pnp`) a okamžikem, kdy na tuto změnu zařízení CHESTER zareaguje. Lze to použít k filtrování (debounce) vstupního signálu v případě, že je vstupní signál připojen k „elektricky zarušenému“ mechanickému spínači nebo relé. Lze to využít i tehdy, má-li zařízení CHESTER reagovat na pulzy delší než nastavená doba.
- Parametr `inactive-duration` funguje stejně jako `active-duration` výše, pouze nastavuje čas pro opačnou hranu.
- Parametr `cooldown-time` je zpoždění chránící zařízení CHESTER před příliš velkým počtem příchozích přerušení. Pokud je připojen příliš rychlý signál (>10 kHz), mohla by obsluha přerušení spotřebovat veškerý procesorový čas a zastavit vykonávání ostatních vláken. Tento parametr nastavuje malou prodlevu mezi opětovným spuštěním obsluhy přerušení. Zde lze použít výchozí hodnotu 10 ms.


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

Nejnovější firmware je k dispozici v [kapitole Firmware](https://docs.hardwario.com/chester/catalog-applications/catalog-applications#application-firmware) katalogových aplikací.

## Ukázková JSON zpráva {#example-json-message}

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
