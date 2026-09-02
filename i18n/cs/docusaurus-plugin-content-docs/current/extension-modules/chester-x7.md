---
slug: chester-x7
title: CHESTER-X7 (1kanálový diferenciální vstup)
description: "Tento článek popisuje rozšiřující modul CHESTER-X7."
---
import Image from '@theme/IdealImage';

# CHESTER-X7 {#chester-x7}

Tento článek popisuje rozšiřující modul CHESTER-X7.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x7-top.png')} alt="Pohled shora na modul CHESTER-X7 s obvody vstupního zesilovače a zvyšujícího měniče"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}
Modul CHESTER-X7 poskytuje jeden diferenciální vstup pro proudové sondy nebo jiné průmyslové senzory a jeden nesymetrický napěťový vstup do 28 V. Modul obsahuje také 5V zvyšující měnič, který umožňuje napájet proudové sondy.

## Schéma zapojení pinů CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k +V, GND, VDD, VIN, GND, INP, INM, VOUT](../../../../../chester/extension-modules/images/tb-chester-x7.png)

## Konfigurace a funkce pinů {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                     |
| -------- | ----------- | --------------------------- |
| 1        | +V          | Kladná systémová větev (*)  |
| 2        | GND         | Systémový signál zemi        |
| 3        | VDD         | Systémová větev VDD 3,0 V   |
| 4        | VIN         | Napěťový vstup (0 - 28V)    |
| 5        | GND         | Systémový signál zemi        |
| 6        | INP         | Kladný diferenciální vstup  |
| 7        | INM         | Záporný diferenciální vstup |
| 8        | VOUT        | Výstup napájení 5,0 V       |

*Poznámka: Napětí kladné systémové větve závisí na zvolené variantě napájení zařízení CHESTER.

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód závislý na hardwaru nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x7-r2.1.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-x7-r2.1.html)

![Schéma CHESTER-X7 R2.1, strana 1: zvyšující měnič TPS61099 5 V a LDO napájející sondu přes VOUT](../../../../../chester/extension-modules/images/hio-chester-x7-r2.1-1.png)
![Schéma CHESTER-X7 R2.1, strana 2: diferenciální vstupní buffery OPA4387 a dělič napěťového vstupu 0–28 V](../../../../../chester/extension-modules/images/hio-chester-x7-r2.1-2.png)

## Výkres modulu {#module-drawing}

![Osazovací výkres CHESTER-X7 se signály slotu nahoře a svorkami VOUT, INM, INP, VIN dole](../../../../../chester/extension-modules/images/pc-chester-x7.png)
