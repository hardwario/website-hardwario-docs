---
slug: chester-x6
title: CHESTER-X6 (sběrnice S-Wire)
description: "Tento článek popisuje rozšiřující modul CHESTER-X6."
---
import Image from '@theme/IdealImage';

# CHESTER-X6 {#chester-x6}

Tento článek popisuje rozšiřující modul CHESTER-X6.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x6-top.png')} alt="Pohled na modul CHESTER-X6 zvrchu s UART převodníkem SC16IS740 a expandérem TCA9534A"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}
Modul CHESTER-X6 poskytuje rozhraní pro protokol HARDWARIO S-Wire určený pro nízkopříkonové periferie s třívodičovým připojením (+5V, GND, DATA). Obsahuje také zvyšující převodník na 5 V a výstup napájení 5 V.

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k +V, +5V, GND, DATA, DATA, GND, +5V, +V](../../../../../chester/extension-modules/images/tb-chester-x6.png)

## Konfigurace pinů a funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu             |
| -------- | ----------- | ------------------------- |
| 1        | +V          | Kladná systémová větev (*) |
| 2        | +5V         | Výstup napájení 5,0 V     |
| 3        | GND         | Signál systémové země     |
| 4        | DATA        | Data                      |
| 5        | DATA        | Data                      |
| 6        | GND         | Signál systémové země     |
| 7        | +5V         | Výstup napájení 5,0 V     |
| 8        | +V          | Kladná systémová větev (*) |

*Poznámka: Napětí kladné systémové větve závisí na variantě napájení zařízení CHESTER.

## Schéma {#schematic-diagram}

Schéma je užitečné, pokud programujete nízkoúrovňový kód pracující s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x6-r1.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x6-r1.0.html)

![Schéma CHESTER-X6 R1.0: převodník I2C-UART SC16IS740, expandér TCA9534A, budič linky S-Wire a zvyšující převodník na 5 V](../../../../../chester/extension-modules/images/hio-chester-x6-r1.0-1.png)

## Výkres modulu {#module-drawing}

![Osazovací výkres CHESTER-X6 se signály slotu nahoře a svorkami napájení a DATA sběrnice S-Wire dole](../../../../../chester/extension-modules/images/pc-chester-x6.png)
