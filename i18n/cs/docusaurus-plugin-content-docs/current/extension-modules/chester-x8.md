---
slug: chester-x8
title: CHESTER-X8 (Precizní akcelerometr)
description: "Tento článek popisuje rozšiřující modul CHESTER-X8."
---
import Image from '@theme/IdealImage';

# CHESTER-X8 {#chester-x8}
Tento článek popisuje rozšiřující modul CHESTER-X8.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x8-top.png')} alt="Pohled na modul CHESTER-X8 zeshora s 3osým akcelerometrem ADXL355"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}
CHESTER-X8 obsahuje precizní 3osý akcelerometr ADXL355 s nízkým offsetem při nulovém g, který poskytuje rozlišení až 3,9 μg/LSB a měřicí rozsahy ±2g, ±4g, ±8g.

## Schéma zapojení pinů CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k VDD, GND, DIO1, SCL, SDA, DIO2, GND, +V](../../../../../chester/extension-modules/images/tb-chester-x8.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                  |
| -------- | ----------- | ------------------------------ |
| 1        | VDD         | Systémová větev VDD 3,0 V      |
| 2        | GND         | Systémový signál zemi          |
| 3        | DIO1        | Uživatelský digitální vstup / výstup č. 1 |
| 4        | SCL         | I2C / SCL                      |
| 5        | SDA         | I2C / SDA                      |
| 6        | DIO2        | Uživatelský digitální vstup / výstup č. 2 |
| 7        | GND         | Systémový signál zemi          |
| 8        | +V          | Systémová kladná větev (*)     |

*Poznámka: Napětí systémové kladné větve závisí na variantě napájení zařízení CHESTER.

## Schéma zapojení {#schematic-diagram}

Schéma zapojení je užitečné, pokud programujete nízkoúrovňový kód pracující s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x8-r1.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x8-r1.0.html)

![Schéma CHESTER-X8 R1.0: akcelerometr ADXL355 na sběrnici I2C s výstupy přerušení vedenými na GP0/GP1](../../../../../chester/extension-modules/images/hio-chester-x8-r1.0-1.png)

## Výkres modulu {#module-drawing}

![Výkres osazení CHESTER-X8 se signály slotu nahoře a svorkami I2C a DIO dole](../../../../../chester/extension-modules/images/pc-chester-x8.png)
