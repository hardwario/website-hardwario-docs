---
slug: chester-x9
title: CHESTER-X9 (4kanálový spínač low-side)
description: "Výstupní modul pro CHESTER se čtyřmi samočinně chráněnými spínači low-side NCV8412ASTT1G a omezením proudu v každém kanálu."
keywords: [CHESTER-X9, low-side switch, výstupní modul, NCV8412, NCV8412ASTT1G, omezení proudu, GPIO, budič relé, solenoid, spínání zátěže, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X9 {#chester-x9}

**CHESTER-X9** je výstupní modul se **čtyřmi spínači typu low-side** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x9-top.png')} alt="Pohled na desku CHESTER-X9 shora se čtyřmi spínači low-side NCV8412ASTT1G"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

Modul CHESTER-X9 spíná až čtyři externí zátěže proti zemi. Každý kanál tvoří samočinně chráněný spínač low-side **NCV8412ASTT1G** (U1–U4): zapnutý kanál stáhne výstup na **GND**, vypnutý ho nechá rozpojený (ve stavu vysoké impedance). Každý kanál má **omezení proudu**, takže přetížení ani zkrat modul nepoškodí.

Každý spínač je řízený **přímo jedním z pinů GPIO CHESTER-X** (GP0–GP3). Modul nemá vlastní řadič I²C ani SPI. Zátěž i její napájení jsou zcela externí: zátěž se zapojí mezi externí stejnosměrný zdroj (3–28 V) a výstup kanálu a zem externího zdroje se spojí se zemí modulu. Modul nenapájí ani zátěž, ani základní desku CHESTER.

## Klíčové vlastnosti {#key-features}

* **4 nezávislé kanály:** Čtyři spínače low-side (CH1–CH4), každý se ovládá samostatně.
* **Samočinně chráněné spínače:** NCV8412ASTT1G s omezením proudu na každém kanálu, tepelnou ochranou a ochranou proti ESD.
* **Integrované omezení indukčních špiček:** Vestavěné aktivní omezení (clamp) mezi drainem a gatem pohltí energii, kterou při vypnutí uvolní středně velké indukční zátěže.
* **Široký rozsah napětí zátěže:** Externí napájení zátěže od 3 do 28 V DC.
* **Přímé řízení přes GPIO:** Každý kanál se ovládá přímo pinem GP slotu CHESTER-X, I²C ani SPI není potřeba.
* **Vysoký proud:** 2 A trvale a omezení proudu až 5 A na kanál.

## Typické aplikace {#typical-applications}

* **Řízení akčních členů a relé:** Spínání relé, stykačů, solenoidů a ventilů.
* **Signalizace:** Spínání světel, výstražných majáků a bzučáků.
* **Zapínání zátěží a odpojování napájení:** Zapínání a vypínání externích stejnosměrných zátěží z firmwaru.
* **Obecné digitální výstupy:** Jakýkoli dvoustavový výstup typu low-side v mezích napětí a proudu.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | Výstup se čtyřmi spínači low-side |
| **Kanály** | 4 (CH1–CH4), řízené nezávisle |
| **Spínací prvek** | NCV8412ASTT1G (jeden na kanál) |
| **Typ spínání** | Low-side (výstup kanálu se spíná na GND) |
| **Napájecí napětí zátěže** | 3–28 V DC (externí), na kanál |
| **Trvalý proud zátěže** | 2 A na kanál |
| **Špičkové omezení proudu** | 5 A na kanál |
| **Řízení** | Přímo přes GPIO (GP0–GP3) |
| **Rozhraní k hostu** | Žádné (bez zařízení I²C/SPI; přímé řízení přes GPIO) |
| **Rozhraní desky** | Půlené prokovené otvory (castellated) na dvou protilehlých hranách, deska je připájená k základní desce CHESTER |
| **Revize hardwaru** | R1.0 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Spínač low-side (×4)** | NCV8412ASTT1G | Samočinně chráněný spínač low-side s omezením proudu, tepelnou ochranou, integrovaným omezením indukčních špiček a ochranou proti ESD; jeden na kanál |

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
| 2 | CH1 | Výstup spínače | Výstup spínače low-side kanálu 1 |
| 3 | GND | Zem | Systémová zem / návrat externího zdroje |
| 4 | CH2 | Výstup spínače | Výstup spínače low-side kanálu 2 |
| 5 | GND | Zem | Systémová zem / návrat externího zdroje |
| 6 | CH3 | Výstup spínače | Výstup spínače low-side kanálu 3 |
| 7 | GND | Zem | Systémová zem / návrat externího zdroje |
| 8 | CH4 | Výstup spínače | Výstup spínače low-side kanálu 4 |

:::info
Modul CHESTER-X9 nenapájí zátěž ani základní desku CHESTER. Každý kanál pouze spíná svůj výstup na **GND**; zátěž se napájí z externího zdroje **3–28 V DC** (viz [Zapojení spínače a zátěže](#switch-and-load-connection) níže).
:::

### Řízení kanálů (GPIO) {#channel-control-gpio}

Na rozdíl od většiny modulů CHESTER-X (které používají **I²C** nebo **SPI**) se CHESTER-X9 řídí **přímo přes piny GPIO slotu modulu**. Každý pin GP budí hradlo jednoho spínače, takže aktivací pinu GP se příslušný kanál zapne (jeho výstup se spojí s GND):

| Pin CHESTER-X | Kanál | Spínač | Síť ve schématu |
| :--- | :--- | :--- | :--- |
| GP0 / A0 | CH1 | U1 | OUT0 |
| GP1 / A1 | CH2 | U2 | OUT1 |
| GP2 / A2 | CH3 | U3 | OUT2 |
| GP3 / A3 | CH4 | U4 | OUT3 |

Slot vede i sběrnici I²C (SDA/SCL), modul CHESTER-X9 ale žádné zařízení I²C nemá. Všechny čtyři kanály se spínají jen piny GP.

## Zapojení spínače a zátěže {#switch-and-load-connection}

Každá zátěž se zapojí mezi **kladný pól externího stejnosměrného zdroje** a **výstup kanálu** (CH1–CH4); spínač daného kanálu pak po zapnutí uzavře obvod na **GND**. Zem externího zdroje **musí** být připojená k některé ze svorek **GND** modulu, aby modul a externí zdroj měly společnou zem.

![Schéma zapojení: zátěž připojená mezi externí zdroj 3-28 V a výstup spínače kanálu CHESTER-X9](../../../../../chester/extension-modules/images/sc-chester-x9.png)

:::note Ovládání indukčních zátěží
Modul CHESTER-X9 **nemá externí nulovou (flyback) diodu**. Obvod NCV8412ASTT1G má integrované aktivní omezení (clamp) mezi drainem a gatem, které pohltí energii uvolněnou při vypnutí **středně velkých** indukčních zátěží (malá relé, solenoidy, ventily), takže je lze spínat přímo. U **velkých indukčností, vysokých proudů nebo rychlého opakovaného spínání** připojte paralelně k zátěži externí nulovou diodu, aby energie pohlcená spínačem nepřekročila jeho dovolenou mez.
:::

### Průchod krabičkou {#enclosure-feed-through}

Kabel k zátěži lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče zátěže protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Panelový konektor (na vyžádání):** uživatel kabel zátěže jen zapojí do konektoru ve stěně krabičky a uvnitř nezůstane žádná volná kabeláž. Dodáváme na vyžádání.

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

V CHESTER SDK se modul CHESTER-X9 používá přes shieldy `ctr_x9_a` a `ctr_x9_b`, nebo přes funkce `hardware-chester-x9-a` a `hardware-chester-x9-b` nástroje [Project Generator](/chester/firmware-sdk/how-to-project-generator).

- [Ukázka použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x9)

## Schémata {#schematic-diagrams}

Kompletní schéma se čtyřmi spínači low-side NCV8412ASTT1G a přiřazením vývodů konektoru je k dispozici jako PDF:

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x9-r1.0.pdf)
- [Interaktivní prohlížeč CHESTER-X9](pathname:///download/ibom/hio-chester-x9-r1.0.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X9 R1.0 se signály slotu nahoře a svorkami GND/CH1–CH4 na svorkovnici](../../../../../chester/extension-modules/images/pc-chester-x9.png)

</div>
