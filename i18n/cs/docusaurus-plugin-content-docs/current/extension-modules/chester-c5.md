---
slug: chester-c5
title: CHESTER-C5 (koncentrátor 1-Wire)
---
import Image from '@theme/IdealImage';

# CHESTER-C5 {#chester-c5}
Tento článek popisuje nosnou desku **CHESTER-C5**.

## Přehled modulu {#module-overview}

**CHESTER-C5** je zakázková nosná deska pro modul **CHESTER-U1**, navržená jako brána **NB-IoT / LTE-M** pro připojení většího počtu **senzorů 1-Wire** (např. DS18B20). Má záložní baterii Li-Ion a snižující měnič DC/DC, který ji napájí z externí linky 6-28 VDC (VIN) nebo z 12V solárního panelu. Deska měří vstupní stejnosměrné napětí a přes rozhraní QWIIC k ní lze připojit displej OLED.

Obvod Maxim DS2482S-800+ na desce poskytuje 8 nezávislých kanálů 1-Wire ve slotu CHESTER-X A. Do slotu B lze osadit modul CHESTER-X1 s dalšími 8 kanály 1-Wire nebo jakýkoli jiný modul CHESTER-X.

Deska **CHESTER-C5** pasuje do krabičky Polycase WH-04-02.

## Technická specifikace {#technical-specification}

* Rozsah vstupního stejnosměrného napětí (VIN): **6-28 VDC**, vhodné také pro **solární panely 12-18 V\***
* Jmenovité napětí baterie: **3,7 V**
* Nabíjecí proud baterie: **200 mA**
* Klidový odběr z baterie **&lt;10 μA** (bez desky CHESTER-M)
* Doporučený typ baterie pro venkovní použití: Samsung ICR18650-22P**
* Provozní teplota: **-40 až +70 °C** (bez baterie Li-Ion)
* Skladovací teplota: **-40 až +85 °C** (bez baterie Li-Ion)

_\*Optimální fotovoltaický panel pro zařízení CHESTER: 12 V / 10 W_

_\**Vhodná pro napájení ze solárního panelu; rozsah teplot pro nabíjení -20 až +45 °C, pro vybíjení -20 až +70 °C_

## Nabíječka baterie a ochranný obvod {#battery-charger-and-protection-circuit}
Deska **CHESTER-C5** má nabíjecí obvod MCP73833 a ochranný obvod AP9101C, který baterii chrání: hlídá přepětí při nabíjení, podpětí při vybíjení a nadměrný nabíjecí i vybíjecí proud.

:::caution

Chcete-li zařízení poprvé spustit z baterie bez stejnosměrného napájení, je nutné **dlouze stisknout tlačítko Bypass (BYPASS)**.

:::

## Výkres modulu: horní strana {#module-drawing-top}

![Výkres horní strany CHESTER-C5: držák baterie 18650 BT1, dva konektory RJ-45 pro 1-Wire, tlačítka a řady svorek A1-A8/B1-B8](../../../../../chester/extension-modules/images/chester-c5-top.png)

## Výkres modulu: spodní strana {#module-drawing-bottom}

![Výkres spodní strany CHESTER-C5 s pájecími sloty CHESTER-X A2/A3 a napájecími obvody](../../../../../chester/extension-modules/images/chester-c5-bot.png)

## Popis výkresu modulu {#module-drawing-description}

| Pozice   | Název       | Popis signálu                             |
| -------- | ----------- | ----------------------------------------- |
| A1       | CHESTER-U1  | Pájecí slot CHESTER-U1                    |
| A2       | CHESTER-X A | Pájecí slot CHESTER-X A*                  |
| A2       | CHESTER-X B | Pájecí slot CHESTER-X B                   |
| A3       | CHESTER-U1  | Pájecí slot CHESTER-U1                    |
| BT1      | BATTERY     | Držák baterie Li-Ion 18650                |
| JP1      | APP SWD     | Ladicí konektor SWD aplikačního MCU       |
| JP2      | NET SWD     | Ladicí konektor SWD modemu LTE            |
| JP3      | 1-Wire A    | Svorkovnice integrovaného 8kanálového rozhraní 1-Wire |
| JP4      | I2C         | Svorkovnice rozhraní I2C                  |
| JP5      | VIN         | Svorkovnice vstupního napájení 6-28 V DC  |
| JP6      | SYSTEM      | Konektor JST CHESTER SYSTEM               |
| JP7      | QWIIC       | Konektor QWIIC (např. pro OLED)           |
| JP8      | X slot B    | Svorkovnice slotu CHESTER-X B             |
| JP9      | BT/LED      | Konektor JST pro externí tlačítko + LED   |
| JP10     | X slot B    | Konektor JST slotu CHESTER-X B            |
| JP11     | TAMPER      | Vstup tamper (v klidu rozepnutý)          |
| JP12     | A1-A4       | Konektor RJ-45 1-Wire A1-A4 + 4xGND       |
| JP13     | A5-A8       | Konektor RJ-45 1-Wire A5-A8 + 4xGND       |
| JP14     | GND         | Svorkovnice s 8xGND                       |
| JP15     | GND         | Svorkovnice s 8xGND                       |
| JP16     | BATT        | Vstup externí baterie nebo PPK            |
| JP17     | VIN         | Konektor JST vstupního napájení 6-28 V DC |
| JP19     | 1-Wire A    | Konektor JST integrovaného 8kanálového rozhraní 1-Wire |
| LED      | RGY LED     | Indikační LED RGY                         |
| S1       | BUTTON      | Tlačítko CHESTER                          |
| S53      | BYPASS      | Tlačítko pro obejití ochrany baterie**    |

_\* SLOT CHESTER-X A je ve výchozím stavu obsazený integrovaným modulem CHESTER-X1_

_\** Tlačítkem BYPASS spustíte zařízení z baterie, i když není připojené stejnosměrné napájení_

## Zapojení konektorů {#pinout-description}

### Konektor BT/LED {#btled-connector}

![Zapojení konektoru BT/LED, piny 1-4: VDD, LED EXT, GND, BTN EXT](../../../../../chester/extension-modules/images/btn-ext.png)

### Konektor SYSTEM {#system-connector}

![Zapojení konektoru SYSTEM, piny 1-7: NC, +V, GND, VDD, SCL, SDA, INT](../../../../../chester/extension-modules/images/system.png)

### Konektor BATTERY {#battery-connector}

![Zapojení konektoru BATTERY, piny 1-2: +BATT EXT, GND](../../../../../chester/extension-modules/images/batt.png)

### Konektory 1-Wire RJ-45 {#1-wire-rj-45-connectors}

![Zapojení konektorů RJ-45: JP12 vede kanály 1-Wire A1-A4, JP13 kanály A5-A8, vždy střídavě s GND](../../../../../chester/extension-modules/images/rj-45.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-c5-r1.1.pdf)

<!--
- [TODO Interactive PCB connector, part, testpoint and signal browser]
-->

![Schéma CHESTER-C5, list 1: modul CHESTER-U1, dva sloty CHESTER-X a ladicí konektory APP/NET SWD](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-1.png)
![Schéma CHESTER-C5, list 2: svorkovnice bloků A/B, konektory 1-Wire RJ-45, I2C, QWIIC, tlačítka, tamper a RGY LED](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-2.png)
![Schéma CHESTER-C5, list 3: vstup externí baterie, vstup 6-28 V DC a snižující měnič TPS62933](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-3.png)
![Schéma CHESTER-C5, list 4: nabíječka MCP73833, ochrana baterie AP9101C s tlačítkem bypass, expandér GPIO a ADC](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-4.png)
![Schéma CHESTER-C5, list 5: napájecí větve 6 V (zvyšující měnič) a 5,5 V (LDO) a 8kanálový master 1-Wire DS2482S-800](../../../../../chester/extension-modules/images/hio-chester-c5-r1.1-5.png)
