---
slug: chester-control
title: CHESTER Control
description: "Tento článek popisuje základní funkcionalitu, hardware a ukázkovou JSON zprávu katalogové aplikace CHESTER Control."
---
import Image from '@theme/IdealImage';

# CHESTER Control {#chester-control}

Tento článek popisuje základní funkcionalitu, hardware a ukázkovou **JSON** zprávu katalogové aplikace **CHESTER Control**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](common-functionality.md): jak funguje LED, tlačítko a konfigurace sítě.
- [**Správa platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Aplikace **CHESTER Control** slouží k měření a sledování analogových a digitálních vstupů. Vzorkované analogové hodnoty se agregují, agregovaná měření se ukládají do bufferu a plánují k pozdějšímu přenosu v podobě bufferovaných dat společně s časovými značkami. Rovněž lze sledovat změny na digitálním vstupu (typ **trigger**) včetně typu změny a časové značky. Strategie bufferování umožňuje zaznamenat vyšší počet událostí při současné úspoře přenosového pásma a energie potřebné k přenosu dat.

**CHESTER Control** má tyto čtyři vstupy:

| **Typ**  | **Kanál**   | **Svorka**   | **Typ vstupu**    | **Rozsah vstupu** | **Typické použití**                   |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digitální – NPN/PNP | 0 až 28 V      | Přepínač, tlačítko, relé, PLC senzor  |
| Counter  | CH2         | A4           | Digitální – NPN/PNP | 0 až 28 V      | Pulzní výstupy měřičů energie (např. S0) |
| Voltage  | CH3         | A5           | Analogový – napětí | 0 až 28 V       | Různé napěťové převodníky             |
| Current  | CH4         | A7           | Analogový – proud | 0 až 24 mA      | Různé proudové převodníky             |

Všechny tyto vstupy a jejich možnosti jsou podrobněji vysvětleny v článku [**Parametry a chování vstupů**](#input-parameters-and-behavior).

Navíc **CHESTER Control** umožňuje vzdálené řízení 4 digitálních výstupů (6–28 V).

## Varianty aplikace {#application-variants}

**CHESTER Control** lze objednat v jedné z těchto variant:

### CHESTER Control {#chester-control}

Katalogový hardware **CHESTER Control** se skládá z těchto objednacích kódů:

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down + výstupy (4 kanály)

Více podrobností najdete v [**Objednacích kódech**](../ordering-codes.md).

### CHESTER Control Z {#chester-control-z}

Katalogový hardware **CHESTER Control Z** se skládá z těchto objednacích kódů:

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down + výstupy (4 kanály)

* `CHESTER-Z1`: Záložní modul

Více podrobností najdete v [**Objednacích kódech**](../ordering-codes.md).

## Svorkovnice {#terminal-blocks}

| CHESTER-X0B v levém slotu A – signály A1 – A8 | CHESTER-X4 v pravém slotu B – signály B1 – B8                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Použijte vstupy **CH1** až **CH4** a **GND** | Použijte **VIN** a **GND** pro připojení externího napájení.                                 |
|                                             | Použijte výstupy **CH1** až **CH4**, které při zapnutí výstupu přivádějí napětí z **VIN**    |
| ![Pinout svorkovnice CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../chester/catalog-applications/../extension-modules/images/tb-chester-x0.png) | ![Pinout svorkovnice CHESTER-X4: GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../../../../chester/catalog-applications/../extension-modules/images/tb-chester-x4.png)                                                  |

## Parametry a chování vstupů {#input-parameters-and-behavior}

Schéma zapojení **CHESTER Control** najdete v [**popisu svorkovnice**](../extension-modules/chester-x0.md) rozšiřujícího modulu **CHESTER-X0**.
Rozšiřující modul **CHESTER-X0** je nainstalován v levém slotu **A**, takže musíte použít odpovídající svorky **A1** až **A8**.

### Trigger {#trigger}

Vstup **trigger** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, přepínači, relé apod. Chování vstupu **trigger** je konfigurovatelné.

* Při změně vstupu se uloží časová značka události změny společně se stavem **active**/**inactive**, tato informace se uloží do bufferu a buffer událostí se odešle (nejpozději) s pravidelným reportem (parametr `interval-report`).

* Volitelně lze změny vstupu do stavu **active** (parametr `trigger-report-active`) nebo **inactive** (parametr `trigger-report-inactive`) reportovat **okamžitě** nebo s konfigurovatelným **zpožděním** (parametr `event-report-delay`), aby bylo možné zachytit více následných změn vstupu.

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `trigger-input-type`).

* Minimální trvání úrovně se konfiguruje zvlášť pro stav **active** (parametr `trigger-duration-active`) a **inactive** (parametr `trigger-duration-inactive`).

* Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`). Omezení počtu událostí limituje využití komunikačního pásma a prodlužuje životnost baterie.

### Counter {#counter}

Vstup **counter** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, přepínači, relé apod. Tento vstup počítá celkový počet pulzů v čase.

* Hodnota počítadla se periodicky agreguje (parametr `counter-interval-aggreg`) a buffer agregovaných měření se reportuje v konfigurovatelném intervalu (parametr `interval-report`).

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `counter-input-type`).

* Minimální trvání úrovně se konfiguruje zvlášť pro stav **active** (parametr `counter-duration-active`) a **inactive** (parametr `counter-duration-inactive`).

### Voltage {#voltage}

Vstup **voltage** měří napětí v rozsahu **0–28 V** (pokrývá standard **0–10 V**).

* Hodnoty napětí se vzorkují periodicky (parametr `analog-interval-sample`). Tyto hodnoty se ukládají jako **buffer vzorků**.

* Nasbírané vzorky se periodicky **agregují** (parametr `analog-interval-aggreg`). Z bufferovaných vzorků se počítá minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.

* Každé **měření** má přiřazenou časovou značku. Bufferovaná **měření** se pravidelně přenášejí jako časové řady (parametr `interval-report`).

### Current {#current}

Tento vstup měří analogový proud v rozsahu **0–24 mA** (pokrývá standard **4–20 mA**).

* Hodnoty proudu se vzorkují periodicky (parametr `analog-interval-sample`). Tyto hodnoty se ukládají jako **buffer vzorků**.

* Nasbírané vzorky se periodicky **agregují** (parametr `analog-interval-aggreg`). Z bufferovaných vzorků se počítá minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.

* Každé **měření** má přiřazenou časovou značku. Bufferovaná **měření** se pravidelně přenášejí jako časové řady (parametr `interval-report`).

## Backup {#backup}

**CHESTER Control Z** (vybavený modulem **CHESTER-Z1**) může navíc reportovat informace o záložní baterii a stavu externího DC napájení.

* Aktuální **napětí baterie** a **externí DC napětí** se posílají v každém reportu.

* Při změně DC napájecího vstupu se uloží časová značka události změny společně se stavem **connected**/**disconnected**, tato informace se uloží do bufferu a buffer událostí se odešle (nejpozději) s pravidelným reportem (parametr `interval-report`).

* Volitelně lze změny DC napájecího vstupu do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) reportovat **okamžitě** nebo s konfigurovatelným **zpožděním** (parametr `event-report-delay`), aby bylo možné zachytit více následných změn vstupu.

* Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`). Omezení počtu událostí limituje využití komunikačního pásma a prodlužuje životnost baterie.

## Hygrometr {#hygrometer}

Volitelný hygrometr v aplikaci **CHESTER Control** představuje externí senzor teploty a vlhkosti.

* Hodnoty se pravidelně vzorkují (parametr `hygro-interval-sample`). Tyto hodnoty se ukládají jako **buffer vzorků**.

* Nasbírané vzorky se periodicky **agregují** (parametr `hygro-interval-aggreg`). Z bufferovaných vzorků se počítá minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.

* Každé **měření** má přiřazenou časovou značku. Bufferovaná **měření** se pravidelně přenášejí jako časové řady (parametr `interval-report`).

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

```
app config interval-report 1800
app config interval-poll 0
app config downlink-wdg-interval 129600
app config event-report-delay 5
app config event-report-rate 30
app config channel-mode-1 "trigger"
app config channel-mode-2 "counter"
app config channel-mode-3 "voltage"
app config channel-mode-4 "current"
app config trigger-input-type "npn"
app config counter-input-type "npn"
app config trigger-duration-active 100
app config trigger-duration-inactive 100
app config trigger-cooldown-time 10
app config trigger-report-active false
app config trigger-report-inactive false
app config counter-interval-aggreg 300
app config counter-duration-active 2
app config counter-duration-inactive 2
app config counter-cooldown-time 10
app config analog-interval-sample 60
app config analog-interval-aggreg 300
app config w1-therm-interval-sample 60
app config w1-therm-interval-aggreg 300
app config mode "lte"
```

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

Tímto příkazem nastavíte **interval reportu** (v sekundách):

```
app config interval-report <value>
```

Tímto příkazem nastavíte krátké zpoždění (v sekundách) mezi událostí **trigger** nebo **backup** a jejím reportováním:

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

Těmito příkazy zapnete/vypnete reportování událostí připojení/odpojení napájecího vstupu záložního modulu:

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

Těmito příkazy nastavíte dobu trvání stavu **active** a **inactive** (v milisekundách) pro digitální vstupy **trigger** a **counter**:

```
app config trigger-duration-active <value>
app config trigger-duration-inactive <value>
app config trigger-cooldown-time <value>

app config counter-duration-active <value>
app config counter-duration-inactive <value>
app config counter-cooldown-time <value>
```

:::info

- Parametr `duration-active` nastavuje zpoždění v milisekundách mezi změnou vstupního signálu na aktivní úroveň (podle konfigurace `npn` nebo `pnp`) a okamžikem, kdy na tuto změnu zařízení CHESTER zareaguje. Lze to použít k filtrování (debounce) vstupního signálu v případě, že je vstupní signál připojen k „elektricky rušivému" mechanickému přepínači nebo relé. Lze to využít i tehdy, když má zařízení CHESTER reagovat na pulzy delší než nastavená doba.
- Parametr `duration-inactive` funguje stejně jako `duration-active` výše, jen nastavuje čas pro opačnou hranu.
- Parametr `cooldown-time` je zpoždění chránící zařízení CHESTER před příliš velkým počtem příchozích přerušení. Pokud je připojen příliš rychlý signál (>10 kHz), mohla by obsluha přerušení spotřebovat veškerý procesorový čas a zastavit běh ostatních vláken. Tento parametr nastavuje malé zpoždění mezi opětovným spuštěním obsluhy přerušení. Zde lze použít výchozí hodnotu 10 ms.


:::

Těmito příkazy nastavíte intervaly **vzorkování** a **agregace** (v sekundách) pro měření **voltage** / **current**:

```
app config analog-interval-sample <value>
app config analog-interval-aggreg <value>
```

Těmito příkazy nastavíte intervaly **vzorkování** a **agregace** (v sekundách) pro volitelný **hygrometr** (příslušenství **CHESTER-S2**):

```
app config hygro-interval-sample <value>
app config hygro-interval-aggreg <value>
```

## Řízení výstupů {#output-control}

Podívejte se prosím do dokumentace Cloudu, konkrétně na [Downlink data](/cloud/downlink) a [API příklady](/cloud/downlink).

Výstupy řídíte odesláním tohoto JSON na API endpoint Cloudu (`https://api.prod.hardwario.cloud/v2/messages`) nebo v HARDWARIO Cloud, kde přejdete na zprávy zařízení a kliknete na „Create new downlink message"

```
{
  "output_1_state": 1,
  "output_2_state": 1,
  "output_3_state": 0,
  "output_4_state": 0
}
```

JSON nemusí obsahovat stav všech čtyř výstupů. Posíláte pouze `output_X_state` pro výstupy, které se mají změnit.

Zařízení se dotazuje Cloudu v intervalu nastaveném parametrem `interval-poll`, a pokud je ve frontě Cloudu nová řídicí downlink zpráva, je odeslána do zařízení a výstup nebo více výstupů se změní.


## Ukázková JSON zpráva {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
    "accelerometer": {
        "accel_x": 0,
        "accel_y": 0,
        "accel_z": 9.57,
        "orientation": 2
    },
    "counter": [
        {
            "channel": 2,
            "delta": 6,
            "measurements": [
                {
                    "timestamp": 1705328041,
                    "value": 4,
                    "delta": 2
                },
                {
                    "timestamp": 1705328341,
                    "value": 7,
                    "delta": 3
                }
            ],
            "value": 7
        }
    ],
    "current": [
        {
            "channel": 4,
            "measurements": [
                {
                    "avg": 2,
                    "max": 5.03,
                    "mdn": 0,
                    "min": 0,
                    "timestamp": 1705328341
                }
            ]
        }
    ],
    "message": {
        "sequence": 1,
        "timestamp": 1705328341,
        "version": 1
    },
    "network": {
        "imei": 351358816128174,
        "imsi": 901288910100358
    },
    "thermometer": {
        "temperature": 22.75
    },
    "trigger": [
        {
            "channel": 1,
            "events": [
                {
                    "timestamp": 1705328233,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328235,
                    "type": "deactivated"
                }
            ],
            "state": "inactive"
        }
    ],
    "voltage": [
        {
            "channel": 3,
            "measurements": [
                {
                    "avg": 0.27,
                    "max": 1.35,
                    "mdn": 0,
                    "min": 0,
                    "timestamp": 1705328341
                }
            ]
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
  "voltage_rest": 3.7,
  "voltage_load": 3.65,
  "current_load": 20,
  "orientation": 2,
  "therm_temperature": 23.5,
  "hygro_temperature": 23.2,
  "hygro_humidity": 48.5,
  "w1_thermometers": [22.1, 22.3],
  "ble_tags": [
    {
      "temperature": 21.5,
      "humidity": 55.0
    }
  ],
  "inputs_a": [
    {
      "type": "trigger",
      "state": true,
      "trigger_active": 5,
      "trigger_inactive": 3
    },
    {
      "type": "counter",
      "count": 1234,
      "delta": 12
    },
    {
      "type": "voltage",
      "voltage": 12.5
    },
    {
      "type": "current",
      "current": 4.2
    }
  ]
}
```

</p>
</details>

  </TabItem>
</Tabs>

---

## Seznam změn {#changelog}

### v4.0.0 – 2026-08-10 {#v400--2026-08-10}

- **Změněno**: Snížena maximální kapacita termometrů 1-Wire (10 → 5) a kapacita půdních senzorů (10 → 3) pro snížení využití RAM

### v3.5.5 – 2026-06-22 {#v355--2026-06-22}

- **Změněno**: Zmenšena paměťová náročnost: data půdních senzorů a termometrů se nyní alokují dynamicky

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: jediný firmware binárka pro LTE i LoRaWAN; režim se volí pomocí `app config mode lte` / `app config mode lrw`
- **Přidáno**: Interval downlink watchdogu (`downlink-wdg-interval`) pro detekci ztráty komunikace s cloudem
- **Přidáno**: Konfigurovatelný interval dotazování (`interval-poll`) pro frekvenci dotazování cloudu
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové API endpointy); předchozí firmware pro Cloud v1 zůstává samostatně dostupný
- **Změněno**: Režimy kanálů jsou nyní explicitně konfigurovatelné pro každý kanál (`channel-mode-1` až `channel-mode-4`)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
