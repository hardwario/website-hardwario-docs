---
slug: chester-x9
title: CHESTER-X9 (4kanálový low-side switch)
description: Výstupní modul se čtyřmi low-side switchi pro platformu CHESTER, založený na čtyřech samočinně chráněných přepínačích NCV8412ASTT1G s omezením proudu na každém kanálu.
keywords: [CHESTER-X9, low-side switch, výstupní modul, NCV8412, NCV8412ASTT1G, omezení proudu, GPIO, budič relé, solenoid, přepínání zátěže, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X9 {#chester-x9}

**CHESTER-X9** je výstupní modul se **čtyřmi low-side switchi** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x9-top.png')} alt="Pohled na desku CHESTER-X9 shora se čtyřmi obvody low-side switchů NCV8412ASTT1G"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X9 přepíná až čtyři externí zátěže na zem. Každý kanál je samočinně chráněný low-side switch **NCV8412ASTT1G** (U1–U4): výstup kanálu je při zapnutí stažený na **GND** a při vypnutí zůstává rozpojený (ve vysoké impedanci). Každý kanál má **omezení proudu**, takže se přetížení nebo zkrat udrží pod kontrolou a modul se nepoškodí.

Každý přepínač je řízený **přímo jedním z pinů GPIO CHESTER-X** (GP0–GP3). CHESTER-X9 nemá vlastní řadič I²C ani SPI. Zátěž i její napájení jsou zcela externí: zátěž se zapojí mezi externí stejnosměrný zdroj (3–28 V) a výstup kanálu a zem externího zdroje se spojí se zemí modulu. Modul nenapájí ani zátěž, ani základní desku CHESTER.

## Klíčové vlastnosti {#key-features}

* **4 nezávislé kanály:** Čtyři low-side switche (CH1–CH4), každý řízený samostatně.
* **Samočinně chráněné přepínače:** NCV8412ASTT1G s omezením proudu na každém kanálu, tepelnou ochranou a ochranou proti ESD.
* **Integrovaná ochrana proti indukčním špičkám:** Vestavěná aktivní ochrana drain-gate pohltí vypínací energii středně velkých indukčních zátěží.
* **Široký rozsah napětí zátěže:** Externí napájení zátěže od 3 do 28 V DC.
* **Přímé řízení přes GPIO:** Každý kanál je řízený přímo z pinu GP CHESTER-X, I²C ani SPI není potřeba.
* **Vysoký proud:** 2 A trvale a omezení proudu až 5 A na kanál.

## Typické aplikace {#typical-applications}

* **Řízení aktorů a relé:** Přepínání relé, stykačů, solenoidů a ventilů.
* **Signalizace:** Ovládání světel, výstražných majáků a bzučáků.
* **Zapínání zátěže a napájení:** Zapínání a vypínání externích stejnosměrných zátěží z firmwaru.
* **Obecné digitální výstupy:** Jakýkoli low-side výstup zapnuto/vypnuto v rámci napěťových a proudových limitů.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | Výstup se čtyřmi low-side switchi |
| **Kanály** | 4 (CH1–CH4), řízené nezávisle |
| **Přepínací prvek** | NCV8412ASTT1G (jeden na kanál) |
| **Typ přepínání** | Low-side (výstup kanálu se přepíná na GND) |
| **Napájecí napětí zátěže** | 3–28 V DC (externí), na kanál |
| **Trvalý proud zátěže** | 2 A na kanál |
| **Špičkové omezení proudu** | 5 A na kanál |
| **Řízení** | Přímo přes GPIO (GP0–GP3) |
| **Rozhraní k hostu** | Žádné (bez zařízení I²C/SPI; přímé řízení přes GPIO) |
| **Rozhraní desky** | Castellated otvory na dvou protilehlých hranách, připájené k základní desce CHESTER |
| **Revize hardwaru** | R1.0 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Low-side switch (×4)** | NCV8412ASTT1G | Samočinně chráněný low-side switch s omezením proudu, tepelnou ochranou, integrovanou ochranou proti indukčním špičkám a ochranou proti ESD; jeden na kanál |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X9 {#chester-x9-connector-pinout}

![Zapojení svorkovnice CHESTER-X9: GND, CH1, GND, CH2, GND, CH3, GND, CH4 na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x9.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | GND | Zem | Systémová zem / návrat externího zdroje |
| 2 | CH1 | Výstup přepínače | Výstup low-side switche kanálu 1 |
| 3 | GND | Zem | Systémová zem / návrat externího zdroje |
| 4 | CH2 | Výstup přepínače | Výstup low-side switche kanálu 2 |
| 5 | GND | Zem | Systémová zem / návrat externího zdroje |
| 6 | CH3 | Výstup přepínače | Výstup low-side switche kanálu 3 |
| 7 | GND | Zem | Systémová zem / návrat externího zdroje |
| 8 | CH4 | Výstup přepínače | Výstup low-side switche kanálu 4 |

:::info
CHESTER-X9 nenapájí zátěž ani základní desku CHESTER. Každý kanál pouze přepíná svůj výstup na **GND**; zátěž se napájí z externího zdroje **3–28 V DC** (viz [Zapojení přepínače a zátěže](#switch-and-load-connection) níže).
:::

### Řízení kanálů (GPIO) {#channel-control-gpio}

Na rozdíl od většiny modulů CHESTER-X (které používají **I²C** nebo **SPI**) se CHESTER-X9 řídí **přímo přes piny GPIO slotu modulu**. Každý pin GP budí hradlo jednoho low-side switche, takže nastavením pinu GP se kanál zapne (jeho výstup se spojí s GND):

| Pin CHESTER-X | Kanál | Přepínač | Síť ve schématu |
| :--- | :--- | :--- | :--- |
| GP0 / A0 | CH1 | U1 | OUT0 |
| GP1 / A1 | CH2 | U2 | OUT1 |
| GP2 / A2 | CH3 | U3 | OUT2 |
| GP3 / A3 | CH4 | U4 | OUT3 |

Slot vede i sběrnici I²C (SDA/SCL), ale CHESTER-X9 žádné zařízení I²C nepoužívá. Všechny čtyři kanály přepínají samotné piny GP.

## Zapojení přepínače a zátěže {#switch-and-load-connection}

Každá zátěž se zapojí mezi **kladný pól externího stejnosměrného zdroje** a **výstup kanálu** (CH1–CH4); low-side switch daného kanálu pak po zapnutí uzavře obvod na **GND**. Zem externího zdroje **musí** být připojená k některé ze svorek **GND** modulu, aby modul a externí zdroj měly společnou zemní referenci.

![Schéma zapojení: zátěž připojená mezi externí zdroj 3-28 V a výstup přepínače kanálu CHESTER-X9](../../../../../chester/extension-modules/images/sc-chester-x9.png)

:::note Ovládání indukčních zátěží
CHESTER-X9 **nemá externí nulovou (flyback) diodu**. Obvod NCV8412ASTT1G má integrovanou aktivní ochranu drain-gate, která pohltí vypínací energii **středně velkých** indukčních zátěží (malá relé, solenoidy, ventily), takže je lze přepínat přímo. U **velkých indukčností, vysokých proudů nebo rychlého opakovaného přepínání** přidejte přes zátěž externí nulovou diodu, aby přepínač zůstal v mezích své ochrany.
:::

### Průchod krabičkou {#enclosure-feed-through}

Kabel k zátěži lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče zátěže protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Konektor do panelu (na vyžádání):** externí konektor ve stěně krabičky umožní uživateli kabel zátěže zapojit, bez volné kabeláže vevnitř. Na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X9 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x9-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x9-c4.png)

</div>
</div>
</div>

## Použití s CHESTER SDK {#chester-sdk-usage}

CHESTER-X9 lze v rámci CHESTER SDK použít přes shieldy `ctr_x9_a` a `ctr_x9_b`, případně přes funkce [Project Generatoru](/chester/firmware-sdk/how-to-project-generator) `hardware-chester-x9-a` a `hardware-chester-x9-b`.

- [Ukázka použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x9)

## Schémata {#schematic-diagrams}

Kompletní schéma (čtyři low-side switche NCV8412ASTT1G a mapování konektoru) je k dispozici jako PDF:

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x9-r1.0.pdf)
- [Interaktivní prohlížeč CHESTER-X9](pathname:///download/ibom/hio-chester-x9-r1.0.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X9 R1.0 se signály slotu nahoře a svorkami GND/CH1–CH4 na svorkovnici](../../../../../chester/extension-modules/images/pc-chester-x9.png)

</div>
