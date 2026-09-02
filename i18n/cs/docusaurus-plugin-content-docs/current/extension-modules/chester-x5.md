---
slug: chester-x5
title: CHESTER-X5 (2kanálový izolovaný vstup 50 V)
description: "Tento článek popisuje rozšiřující modul CHESTER-X5."
---
import Image from '@theme/IdealImage';

# CHESTER-X5 {#chester-x5}

Tento článek popisuje rozšiřující modul CHESTER-X5.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x5-top.png')} alt="Pohled shora na modul CHESTER-X5 se dvěma izolovanými zesilovači AMC3301 a ADC ADS122C"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

CHESTER-X5 implementuje dva **izolované** napěťové vstupy. Každý z nich může měřit napětí od **-50 V** do **+ 50 V**.

## Schéma zapojení pinů CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8: INP1 na pinu 2, INM1 na pinu 3, INM2 na pinu 6, INP2 na pinu 7, ostatní nezapojeny](../../../../../chester/extension-modules/images/tb-chester-x5.png)

## Konfigurace pinů a funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                |
| -------- | ----------- | ---------------------------- |
| 1        | DNC         | Rezervováno                  |
| 2        | INP1        | **Kladný** vstup kanálu 1    |
| 3        | INM1        | **Záporný** vstup kanálu 1   |
| 4        | DNC         | Rezervováno                  |
| 5        | DNC         | Rezervováno                  |
| 6        | INM2        | **Záporný** vstup kanálu 2   |
| 7        | INP2        | **Kladný** vstup kanálu 2    |
| 8        | DNC         | Rezervováno                  |

## Schéma {#schematic-diagram}

Schéma je užitečné, pokud programujete nízkoúrovňový kód související s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x5-r2.1.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na DPS](pathname:///download/ibom/hio-chester-x5-r2.1.html)

![Schéma CHESTER-X5 R2.1: dva izolované vstupní kanály AMC3330, zátěžové spínače TPS22917 a ADC ADS122C04](../../../../../chester/extension-modules/images/hio-chester-x5-r2.1-1.png)

## Výkres modulu {#module-drawing}

![Osazovací výkres CHESTER-X5 se signály slotu nahoře a izolovanými vstupními svorkami INP1–INP2 dole](../../../../../chester/extension-modules/images/pc-chester-x5.png)
