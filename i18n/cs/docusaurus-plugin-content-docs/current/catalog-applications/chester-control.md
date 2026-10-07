---
slug: chester-control
title: CHESTER Control
---
import Image from '@theme/IdealImage';

# CHESTER Control {#chester-control}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Control**, její hardware a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Aplikace **CHESTER Control** měří a sleduje analogové a digitální vstupy. Navzorkované analogové hodnoty agreguje, agregovaná měření ukládá do bufferu a později je odešle najednou i s časovými značkami. Na digitálním vstupu (typ **trigger**) navíc zaznamenává změny, jejich typ a časovou značku. Díky bufferování zaznamená více událostí a přitom šetří přenosové pásmo i energii potřebnou k přenosu dat.

Zařízení **CHESTER Control** má tyto čtyři vstupy:

| **Typ**  | **Kanál**   | **Svorka**   | **Typ vstupu**    | **Rozsah vstupu** | **Typické použití**                   |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digitální (NPN/PNP) | 0 až 28 V      | Spínač, tlačítko, relé, senzor PLC    |
| Counter  | CH2         | A4           | Digitální (NPN/PNP) | 0 až 28 V      | Impulzní výstupy měřičů energie (např. S0) |
| Voltage  | CH3         | A5           | Analogový (napětí) | 0 až 28 V       | Různé napěťové převodníky             |
| Current  | CH4         | A7           | Analogový (proud) | 0 až 24 mA      | Různé proudové převodníky             |

Vstupy a jejich možnosti podrobně popisuje kapitola [**Parametry a chování vstupů**](#input-parameters-and-behavior).

Zařízení **CHESTER Control** navíc umí na dálku ovládat 4 digitální výstupy (6–28 V).

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Control** lze objednat v jedné z těchto variant:

### CHESTER Control {#chester-control}

Hardware katalogové aplikace **CHESTER Control** tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down měnič a výstupy (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

### CHESTER Control Z {#chester-control-z}

Hardware katalogové aplikace **CHESTER Control Z** tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down měnič a výstupy (4 kanály)

* `CHESTER-Z1`: Záložní modul

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

## Svorkovnice {#terminal-blocks}

| CHESTER-X0B v levém slotu A (signály A1–A8) | CHESTER-X4 v pravém slotu B (signály B1–B8)                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Použijte vstupy **CH1** až **CH4** a **GND** | Externí napájení připojte na **VIN** a **GND**.                                              |
|                                             | Použijte výstupy **CH1** až **CH4**; zapnutý výstup přivádí napětí z **VIN**                 |
| ![Rozložení svorek CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../chester/catalog-applications/../extension-modules/images/tb-chester-x0.png) | ![Rozložení svorek CHESTER-X4: GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../../../../chester/catalog-applications/../extension-modules/images/tb-chester-x4.png)                                                  |

## Parametry a chování vstupů {#input-parameters-and-behavior}

Schéma zapojení zařízení **CHESTER Control** najdete v [**popisu svorkovnice**](../extension-modules/chester-x0.md) rozšiřujícího modulu **CHESTER-X0**.
Rozšiřující modul **CHESTER-X0** je osazený v levém slotu **A**, takže použijte odpovídající svorky **A1** až **A8**.

### Trigger {#trigger}

Vstup **trigger** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Chování vstupu **trigger** lze nastavit.

* Při změně vstupu se do bufferu uloží časová značka změny spolu se stavem **active**/**inactive** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Změny vstupu do stavu **active** (parametr `trigger-report-active`) nebo **inactive** (parametr `trigger-report-inactive`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `trigger-input-type`).

* Minimální trvání úrovně se nastavuje zvlášť pro stav **active** (parametr `trigger-duration-active`) a **inactive** (parametr `trigger-duration-inactive`).

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

### Counter {#counter}

Vstup **counter** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Vstup průběžně počítá celkový počet impulzů.

* Hodnota čítače se pravidelně agreguje (parametr `counter-interval-aggreg`) a buffer agregovaných měření se odesílá v nastavitelném intervalu (parametr `interval-report`).

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `counter-input-type`).

* Minimální trvání úrovně se nastavuje zvlášť pro stav **active** (parametr `counter-duration-active`) a **inactive** (parametr `counter-duration-inactive`).

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

## Záložní napájení {#backup}

Zařízení **CHESTER Control Z** (s modulem **CHESTER-Z1**) navíc hlásí stav záložní baterie a externího napájení DC.

* Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.

* Při změně na napájecím vstupu DC se do bufferu uloží časová značka změny spolu se stavem **connected**/**disconnected** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Změny napájecího vstupu DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

## Vlhkoměr {#hygrometer}

Volitelný vlhkoměr je v aplikaci **CHESTER Control** externí senzor teploty a vlhkosti.

* Hodnoty se pravidelně vzorkují (parametr `hygro-interval-sample`) a ukládají do **bufferu vzorků**.

* Nasbírané vzorky se pravidelně **agregují** (parametr `hygro-interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.

* Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

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

- Parametr `duration-active` nastavuje zpoždění v milisekundách mezi změnou vstupního signálu na aktivní úroveň (podle konfigurace `npn` nebo `pnp`) a okamžikem, kdy na tuto změnu zařízení CHESTER zareaguje. Hodí se k odfiltrování zákmitů (debounce), když je na vstup připojený „elektricky rušivý“ mechanický spínač nebo relé. Využijete ho i tehdy, když má zařízení CHESTER reagovat jen na impulzy delší než nastavená doba.
- Parametr `duration-inactive` funguje stejně jako `duration-active` výše, jen nastavuje čas pro opačnou hranu.
- Parametr `cooldown-time` je zpoždění, které chrání zařízení CHESTER před záplavou přerušení. Kdyby byl připojený příliš rychlý signál (>10 kHz), obsluha přerušení by mohla spotřebovat veškerý čas procesoru a zastavit běh ostatních vláken. Parametr proto vkládá krátkou prodlevu před dalším spuštěním obsluhy přerušení. Lze ponechat výchozí hodnotu 10 ms.


:::

Těmito příkazy nastavíte intervaly **vzorkování** a **agregace** (v sekundách) pro měření **voltage** / **current**:

```
app config analog-interval-sample <value>
app config analog-interval-aggreg <value>
```

Těmito příkazy nastavíte intervaly **vzorkování** a **agregace** (v sekundách) pro volitelný **vlhkoměr** (příslušenství **CHESTER-S2**):

```
app config hygro-interval-sample <value>
app config hygro-interval-aggreg <value>
```

## Řízení výstupů {#output-control}

Podrobnosti najdete v dokumentaci HARDWARIO Cloud, konkrétně v kapitolách o [datech v downlinku](/cloud/downlink) a [příkladech API](/cloud/downlink).

Výstupy ovládáte tak, že tento JSON odešlete na endpoint API cloudu (`https://api.prod.hardwario.cloud/v2/messages`), nebo v HARDWARIO Cloud otevřete zprávy zařízení a kliknete na „Create new downlink message“.

```
{
  "output_1_state": 1,
  "output_2_state": 1,
  "output_3_state": 0,
  "output_4_state": 0
}
```

JSON nemusí obsahovat stav všech čtyř výstupů, stačí poslat `output_X_state` jen pro výstupy, které chcete změnit.

Zařízení se v intervalu daném parametrem `interval-poll` dotazuje cloudu. Pokud ve frontě čeká nová řídicí zpráva downlink, cloud ji předá zařízení, které podle ní přepne jeden nebo více výstupů.


## Ukázková zpráva JSON {#example-json-message}

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

- **Změněno**: Snížen maximální počet teploměrů 1-Wire (10 → 5) a půdních senzorů (10 → 3) kvůli nižšímu využití RAM

### v3.5.5 – 2026-06-22 {#v355--2026-06-22}

- **Změněno**: Snížena paměťová náročnost: data půdních senzorů a teploměrů se nyní alokují dynamicky

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Přidáno**: Interval downlink watchdogu (`downlink-wdg-interval`) pro detekci ztráty komunikace s cloudem
- **Přidáno**: Nastavitelný interval dotazování cloudu (`interval-poll`)
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud v1 zůstává samostatně dostupný
- **Změněno**: Režim lze nyní nastavit zvlášť pro každý kanál (`channel-mode-1` až `channel-mode-4`)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
