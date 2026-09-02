---
slug: chester-c5
title: CHESTER-C5 (1-Wire kolektor)
description: "Tento článek popisuje nosnou desku CHESTER-C5."
---
import Image from '@theme/IdealImage';

# CHESTER-C5 {#chester-c5}
Tento článek popisuje nosnou desku **CHESTER-C5**.

## Přehled modulu {#module-overview}

**CHESTER-C5** je zakázková nosná deska pro **CHESTER-U1** navržená jako brána **NB-IoT / LTE-M** pro připojení polí **1-Wire senzorů** (např. DS18B20), vybavená záložní lithium-iontovou baterií, obsahuje snižující DC/DC převodník zajišťující napájení z externí linky 6-28 VDC (VIN) nebo z 12V solárního panelu. Umožňuje měřit vstupní stejnosměrné napětí, rozhraní QWIIC lze použít pro připojení OLED displeje.

Deska obsahuje obvod Maxim DS2482S-800+ poskytující 8 nezávislých kanálů 1-Wire na slotu CHESTER-X A. Slot B lze rozšířit modulem CHESTER-X1 poskytujícím dalších 8 kanálů 1-Wire nebo jakýmkoli jiným modulem CHESTER-X.

**CHESTER-C5** je určen pro krabičku Polycase WH-04-02.

## Technická specifikace {#technical-specification}

* Rozsah vstupního stejnosměrného napětí (VIN): **6-28 VDC**, vhodné také pro **solární panely 12-18 V\***
* Nominální napětí baterie: **3.7 V**
* Nabíjecí proud baterie: **200 mA**
* Klidová spotřeba proudu z baterie **&lt;10 μA** (bez CHESTER-M)
* Doporučený typ baterie pro venkovní použití: Samsung ICR18650-22P**
* Provozní teplota: **-40 až +70°C** (bez Li-Ion baterie)
* Skladovací teplota: **-40 až +85°C** (bez Li-Ion baterie)

_\*Optimální fotovoltaický solární panel pro CHESTER: 12 V / 10 W_

_\**Vhodné pro aplikaci se solárním panelem, teplotní rozsah nabíjení -20 až +45°C, vybíjení -20 až +70°C_

## Nabíječ baterie a ochranný obvod {#battery-charger-and-protection-circuit}
**CHESTER-C5** obsahuje nabíjecí obvod MCP73833 a ochranný obvod AP9101C, který chrání baterii detekcí přepětí při nabíjení, podpětí při vybíjení a nadměrného nabíjecího/vybíjecího proudu.

:::caution

Pro první spuštění při napájení z baterie bez stejnosměrného vstupního napájení** je nutné dlouze stisknout tlačítko Bypass (BYPASS)**.

:::

## Výkres modulu: horní strana {#module-drawing-top}

![CHESTER-C5 výkres horní strany: držák baterie 18650 BT1, dva 1-Wire konektory RJ-45, tlačítka a řady svorek A1-A8/B1-B8](../../../../../chester/extension-modules/images/chester-c5-top.png)

## Výkres modulu: spodní strana {#module-drawing-bottom}

![CHESTER-C5 výkres spodní strany se pájecími slotmi CHESTER-X A2/A3 a napájecími obvody](../../../../../chester/extension-modules/images/chester-c5-bot.png)

## Popis výkresu modulu {#module-drawing-description}

| Pozice   | Název       | Popis signálu                             |
| -------- | ----------- | ----------------------------------------- |
| A1       | CHESTER-U1  | Pájecí slot CHESTER-U1                    |
| A2       | CHESTER-X A | Pájecí slot CHESTER-X A*                  |
| A2       | CHESTER-X B | Pájecí slot CHESTER-X B                   |
| A3       | CHESTER-U1  | Pájecí slot CHESTER-U1                    |
| BT1      | BATTERY     | Držák Li-Ion baterie 18650                |
| JP1      | APP SWD     | SWD / debug konektor aplikačního MCU      |
| JP2      | NET SWD     | SWD / debug konektor LTE modemu           |
| JP3      | 1-Wire A    | Svorkovnice integrovaného 8kanálového rozhraní 1-Wire |
| JP4      | I2C         | Svorkovnice rozhraní I2C                  |
| JP5      | VIN         | Svorkovnice vstupního napájení 6-28 V DC  |
| JP6      | SYSTEM      | Konektor JST CHESTER SYSTEM               |
| JP7      | QWIIC       | Konektor QWIIC (např. pro OLED)           |
| JP8      | X slot B    | Svorkovnice slotu CHESTER-X B             |
| JP9      | BT/LED      | Konektor JST pro externí tlačítko + LED   |
| JP10     | X slot B    | Konektor JST slotu CHESTER-X B            |
| JP11     | TAMPER      | Vstup tamper (běžně rozepnutý)            |
| JP12     | A1-A4       | Konektor RJ-45 1-Wire A1-A4 + 4xGND       |
| JP13     | A5-A8       | Konektor RJ-45 1-Wire A1-A4 + 4xGND       |
| JP14     | GND         | Svorkovnice s 8xGND                       |
| JP15     | GND         | Svorkovnice s 8xGND                       |
| JP16     | BATT        | Vstup externí baterie nebo PPK            |
| JP17     | VIN         | Konektor JST vstupního napájení 6-28 V DC |
| JP19     | 1-Wire A    | Konektor JST integrovaného 8kanálového rozhraní 1-Wire |
| LED      | RGY LED     | Indikace RGY LED                          |
| S1       | BUTTON      | Tlačítko CHESTER                          |
| S53      | BYPASS      | Tlačítko pro obejití ochrany baterie**    |

_\* SLOT CHESTER-X A je ve výchozím stavu obsazen integrovaným modulem CHESTER-X1_

_\** Tlačítko BYPASS použijte pro spuštění z baterie bez stejnosměrného vstupního napájení_

## Popis pinoutu {#pinout-description}

### Konektor BT/LED {#btled-connector}

![Pinout konektoru BT/LED, piny 1-4: VDD, LED EXT, GND, BTN EXT](../../../../../chester/extension-modules/images/btn-ext.png)

### Konektor SYSTEM {#system-connector}

![Pinout konektoru SYSTEM, piny 1-7: NC, +V, GND, VDD, SCL, SDA, INT](../../../../../chester/extension-modules/images/system.png)

### Konektor BATTERY {#battery-connector}

![Pinout konektoru BATTERY, piny 1-2: +BATT EXT, GND](../../../../../chester/extension-modules/images/batt.png)

### Konektory 1-Wire RJ-45 {#1-wire-rj-45-connectors}

![Pinouty RJ-45: JP12 vede kanály 1-Wire A1-A4, JP13 vede A5-A8, vždy prostřídané s GND](../../../../../chester/extension-modules/images/rj-45.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení je užitečné, pokud programujete nízkoúrovňový kód související s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-c5-r1.1.pdf)

<!--
- [TODO Interactive PCB connector, part, testpoint and signal browser]
-->

![CHESTER-C5 schéma list 1: modul CHESTER-U1, dva sloty CHESTER-X a debug hlavice APP/NET SWD](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-1.png)
![CHESTER-C5 schéma list 2: svorkovnice bloků A/B, konektory 1-Wire RJ-45, I2C, QWIIC, tlačítka, tamper a RGY LED](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-2.png)
![CHESTER-C5 schéma list 3: vstup externí baterie, vstup 6-28 V DC a snižující převodník TPS62933](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-3.png)
![CHESTER-C5 schéma list 4: nabíječ MCP73833, ochrana baterie AP9101C s tlačítkem bypass, GPIO expandér a ADC](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-4.png)
![CHESTER-C5 schéma list 5: napájecí větve 6 V boost a 5.5 V LDO plus 8kanálový 1-Wire master DS2482S-800](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-5.png)
