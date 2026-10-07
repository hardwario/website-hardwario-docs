---
slug: chester-x7
title: CHESTER-X7 (1kanálový diferenciální vstup)
description: "Rozšiřující modul pro CHESTER s analogovými vstupy: diferenciální vstup pro proudové sondy, nesymetrický vstup 0–28 V a spínané napájení sond 5 V."
keywords: [CHESTER-X7, diferenciální vstup, analogový vstup, proudová sonda, měření proudu, napěťový vstup, 0-28V, OPA4387, TPS61099, průmyslový senzor, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X7 {#chester-x7}

**CHESTER-X7** je **analogový vstupní** rozšiřující modul platformy CHESTER. Má jeden diferenciální vstup, jeden nesymetrický napěťový vstup a výstup 5 V pro napájení externích sond.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x7-top.png')} alt="Pohled na desku CHESTER-X7 shora se vstupním zesilovačem OPA4387 a obvody zvyšujícího měniče a LDO"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

Modul CHESTER-X7 má **diferenciální vstup** (INP/INM) pro proudové sondy a další průmyslové senzory a nesymetrický **napěťový vstup** (VIN) pro signály 0–28 V. Diferenciální vstup oddělují přesné stupně operačních zesilovačů s nulovým driftem (**OPA4387**) a vede na analogové vstupy zařízení CHESTER (INP → A0, INM → A1). Napětí ze vstupu VIN zmenšuje přesný odporový dělič a čte se na A2. Modul nemá rozhraní I²C ani SPI: všechny tři signály čte přímo převodník ADC základní desky CHESTER.

Modul také vytváří stabilizovaný **výstup 5,0 V** (VOUT) pro napájení připojených sond. Vytváří ho z větve +V zvyšující měnič (**TPS61099**), za kterým následuje nízkošumový stabilizátor LDO (**TPS7A2050**). Zapíná se z firmwaru pinem **GP3/A3** slotu, takže napájení sond lze mezi měřeními vypnout a ušetřit energii.

## Klíčové vlastnosti {#key-features}

* **Diferenciální vstup:** Jeden diferenciální vstup (INP/INM) pro proudové sondy a průmyslové senzory, oddělený přesnými stupni OPA4387.
* **Napěťový vstup:** Jeden nesymetrický vstup 0–28 V (VIN), přesně dělený pro ADC zařízení CHESTER.
* **Analogové rozhraní:** Signály se čtou přímo na analogových vstupech CHESTER (A0/A1/A2), I²C ani SPI není potřeba.
* **Spínané napájení sond:** Stabilizovaný výstup 5,0 V (VOUT) pro napájení sond, zapínaný přes GP3/A3.
* **Přesná analogová část:** Operační zesilovač OPA4387 s nulovým driftem a rezistory 0,1 % pro přesné měření s malým driftem.

## Typické aplikace {#typical-applications}

* **Měření proudu:** Čtení proudových sond, proudových transformátorů (CT) a senzorů proudu se shuntem.
* **Připojení průmyslových senzorů:** Diferenciální senzory a snímače, které potřebují napájený a oddělený vstupní stupeň.
* **Monitorování napětí:** Měření stejnosměrných napětí do 28 V: bateriové banky, napájecí větve a průmyslové signály.
* **Monitorování procesů a energií:** Sledování zatížení, výkonu a spotřeby v průmyslu a v budovách.
* **Sběr analogových signálů:** Univerzální sběr nízkoúrovňových diferenciálních i nesymetrických signálů.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | Vstupní analogový stupeň (diferenciální + napěťový) |
| **Diferenciální vstup** | INP/INM, oddělený OPA4387, čtený na A0/A1 |
| **Napěťový vstup (VIN)** | 0–28 V nesymetricky, přesně dělený, čtený na A2 |
| **Výstup napájení sond (VOUT)** | Stabilizovaných 5,0 V (zvyšující měnič + LDO), zapínaný přes GP3/A3 |
| **Rozhraní k hostu** | Analogové (ADC zařízení CHESTER na A0/A1/A2); bez I²C a SPI |
| **Řízení** | GP3/A3 zapíná výstup napájení sond 5,0 V |
| **Napájení logiky (VDD)** | 3,0 V |
| **Rozhraní desky** | Půlené prokovené otvory (castellated) na dvou protilehlých hranách, deska je připájená k základní desce CHESTER |
| **Revize hardwaru** | R2.1 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Zvyšující měnič** | TPS61099YFF | Vytváří z +V mezilehlou větev 5,5 V |
| **Regulátor LDO** | TPS7A2050PDBVR | Nízkošumový LDO 5,0 V vytvářející napájení sond VOUT |
| **Přesný operační zesilovač** | OPA4387PW | Čtyřnásobný operační zesilovač s nulovým driftem, odděluje diferenciální vstup |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X7 {#chester-x7-connector-pinout}

![Zapojení svorkovnice CHESTER-X7: +V, GND, VDD, VIN, GND, INP, INM, VOUT na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x7.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | +V | Napájení | Systémová kladná větev (napětí závisí na variantě napájení zařízení CHESTER); napájí také zvyšující měnič |
| 2 | GND | Zem | Systémová zem |
| 3 | VDD | Napájení | Napájení logiky 3,0 V ze základní desky CHESTER |
| 4 | VIN | Analogový vstup | Nesymetrický napěťový vstup (0–28 V) |
| 5 | GND | Zem | Systémová zem |
| 6 | INP | Analogový vstup | Kladný diferenciální vstup |
| 7 | INM | Analogový vstup | Záporný diferenciální vstup |
| 8 | VOUT | Napájecí výstup | Stabilizovaný výstup napájení sond 5,0 V |

:::info
`VDD` je větev napájení logiky 3,0 V a `+V` systémová kladná větev (její napětí závisí na variantě napájení zařízení CHESTER; napájí také zvyšující měnič na desce). `VOUT` dodává stabilizovaných **5,0 V** pro napájení připojených sond a zapíná se z firmwaru přes **GP3/A3**.
:::

### Vedení signálů (analogové) {#signal-routing-analog}

Modul CHESTER-X7 nemá žádné zařízení na I²C ani SPI. Měřené hodnoty se čtou přímo na analogových vstupech zařízení CHESTER a jeden pin GP spíná napájení sond. Piny slotu se používají takto:

| Pin CHESTER-X | Směr | Funkce |
| :--- | :--- | :--- |
| GP0 / A0 | Analogový vstup | Oddělený kladný diferenciální vstup (INP) |
| GP1 / A1 | Analogový vstup | Oddělený záporný diferenciální vstup (INM) |
| GP2 / A2 | Analogový vstup | Zmenšený napěťový vstup (VIN, 0–28 V) |
| GP3 / A3 | Digitální výstup | Zapíná výstup napájení sond 5,0 V (VOUT) |

Každou větev diferenciálního vstupu (INP, INM) odděluje vlastní přesný stupeň OPA4387 a čte se na A0, resp. A1; jejich rozdíl spočítá firmware. Napětí ze vstupu VIN dělí přesná odporová síť a čte se na A2. Sběrnice I²C slotu (SDA/SCL) se nepoužívá.

## Připojení vstupů a výstupu {#input-and-output-connection}

- **Proudová sonda / diferenciální senzor:** diferenciální výstup sondy připojte na **INP** (pin 6) a **INM** (pin 7). Pokud sonda potřebuje napájení, vezměte ho z **VOUT** (pin 8, 5,0 V) a **GND**.
- **Napěťový vstup:** zdroj 0–28 V připojte na **VIN** (pin 4) a **GND**.

Všechna externě připojená zařízení musí mít s modulem společnou zem **GND**. Před měřením zapněte z firmwaru (GP3/A3) napájení sond 5,0 V.

### Průchod krabičkou {#enclosure-feed-through}

Kabeláž lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Panelový konektor (na vyžádání):** uživatel kabel jen zapojí do konektoru ve stěně krabičky a uvnitř nezůstane žádná volná kabeláž. Dodáváme na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X7 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x7-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x7-c4.png)

</div>
</div>
</div>

## Použití s CHESTER SDK {#chester-sdk-usage}

V CHESTER SDK se modul CHESTER-X7 používá přes shieldy `ctr_x7_a` a `ctr_x7_b`, nebo přes funkce `hardware-chester-x7-a` a `hardware-chester-x7-b` nástroje [Project Generator](/chester/firmware-sdk/how-to-project-generator).

- [Ukázka použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x7)

## Schémata {#schematic-diagrams}

Kompletní schéma (napájení sond ze zvyšujícího měniče a LDO a vstupní stupeň pro diferenciální a napěťový vstup) je k dispozici jako PDF:

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x7-r2.1.pdf)
- [Interaktivní prohlížeč CHESTER-X7](pathname:///download/ibom/hio-chester-x7-r2.1.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X7 R2.1 se signály slotu nahoře a svorkovnicí VOUT/INM/INP/VIN dole](../../../../../chester/extension-modules/images/pc-chester-x7.png)

</div>
