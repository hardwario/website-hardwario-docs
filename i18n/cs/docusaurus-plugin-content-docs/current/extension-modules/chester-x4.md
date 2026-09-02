---
slug: chester-x4
title: CHESTER-X4 (Step-down 4kanálový)
description: "Tento článek popisuje rozšiřující modul CHESTER-X4."
---
import Image from '@theme/IdealImage';

# CHESTER-X4 {#chester-x4}

Tento článek popisuje rozšiřující modul CHESTER-X4.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x4-top.png')} alt="Pohled shora na modul CHESTER-X4 se step-down měničem TPS62175"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}
CHESTER-X4 obsahuje step-down DC/DC měnič, který zajišťuje napájení z externí linky 6-28 VDC (VIN). Umožňuje také měření vstupního napětí. Tento modul má rovněž 4 P-MOS spínače umožňující napájení nezávislých zátěží ze vstupního napětí VIN.

## Ochrana výstupů {#output-protection}
Každý ze čtyř výstupů má ochranu vratnou PTC pojistkou (femtoSMDC005F). Každý výstup dokáže **spolehlivě dodat 50 mA konstantního proudu**. Vybavovací proud je přibližně 150 mA.

## Schéma zapojení pinů CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../../../../chester/extension-modules/images/tb-chester-x4.png)

## Konfigurace pinů a funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                         |
| -------- | ----------- | ------------------------------------- |
| 1        | GND         | Systémový zemnící signál              |
| 2        | CH1         | Spínač napěťového výstupu kanálu 1    |
| 3        | CH2         | Spínač napěťového výstupu kanálu 2    |
| 4        | CH3         | Spínač napěťového výstupu kanálu 3    |
| 5        | CH4         | Spínač napěťového výstupu kanálu 3    |
| 6        | GND         | Systémový zemnící signál              |
| 7        | GND         | Systémový zemnící signál              |
| 8        | VIN         | Vstup napájecího stejnosměrného napětí (6-28 V) |

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód pracující s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x4-r3.1.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-x4-r3.1.html)

![Schéma CHESTER-X4 R3.1: step-down měnič TPS62175, ADC TLA2021 a čtyři jištěné P-MOS výstupní spínače](../../../../../chester/extension-modules/images/hio-chester-x4-r3.1-1.png)

## Výkres modulu {#module-drawing}

![Osazovací výkres CHESTER-X4 se signály slotu nahoře a svorkami VIN, GND a CH1–CH4 dole](../../../../../chester/extension-modules/images/pc-chester-x4.png)
