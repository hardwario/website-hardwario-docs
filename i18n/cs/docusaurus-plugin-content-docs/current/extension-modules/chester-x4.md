---
slug: chester-x4
title: CHESTER-X4 (step-down, 4 kanály)
---
import Image from '@theme/IdealImage';

# CHESTER-X4 {#chester-x4}

Tento článek popisuje rozšiřující modul CHESTER-X4.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x4-top.png')} alt="Pohled shora na modul CHESTER-X4 se snižujícím měničem TPS62175"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}
Modul CHESTER-X4 obsahuje snižující (step-down) měnič DC/DC, který zařízení napájí z externí linky 6-28 VDC (VIN), a měří také vstupní napětí. Navíc má 4 spínače P-MOS, kterými lze ze vstupu VIN napájet nezávislé zátěže.

## Ochrana výstupů {#output-protection}
Každý ze čtyř výstupů chrání vratná pojistka PTC (femtoSMDC005F). Výstup **spolehlivě dodá trvalý proud 50 mA**, pojistka vybavuje přibližně při 150 mA.

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../../../../chester/extension-modules/images/tb-chester-x4.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                         |
| -------- | ----------- | ------------------------------------- |
| 1        | GND         | Systémová zem                         |
| 2        | CH1         | Spínač napěťového výstupu kanálu 1    |
| 3        | CH2         | Spínač napěťového výstupu kanálu 2    |
| 4        | CH3         | Spínač napěťového výstupu kanálu 3    |
| 5        | CH4         | Spínač napěťového výstupu kanálu 4    |
| 6        | GND         | Systémová zem                         |
| 7        | GND         | Systémová zem                         |
| 8        | VIN         | Vstup stejnosměrného napájecího napětí (6-28 V) |

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x4-r3.1.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x4-r3.1.html)

![Schéma CHESTER-X4 R3.1: snižující měnič TPS62175, ADC TLA2021 a čtyři jištěné výstupní spínače P-MOS](../../../../../chester/extension-modules/images/hio-chester-x4-r3.1-1.png)

## Výkres modulu {#module-drawing}

![Osazovací výkres CHESTER-X4 se signály slotu nahoře a svorkami VIN, GND a CH1–CH4 dole](../../../../../chester/extension-modules/images/pc-chester-x4.png)
