---
slug: chester-x3
title: CHESTER-X3 (Precizní ADC)
description: "Tento článek popisuje rozšiřující moduly CHESTER-X3A, CHESTER-X3B a CHESTER-X3C."
---
import Image from '@theme/IdealImage';

# CHESTER-X3 {#chester-x3}

Tento článek popisuje rozšiřující moduly CHESTER-X3A, CHESTER-X3B a CHESTER-X3C.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x3-top.png')} alt="Pohled na modul CHESTER-X3 shora se dvěma precizními ADC ADS122C"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu CHESTER-X3A {#chester-x3a-module-overview}

CHESTER-X3A poskytuje 2 vstupy pro senzory RTD (odporové teplotní senzory), například Pt 100 a Pt 1000. Každý vstup podporuje čtyřvodičové připojení senzoru pro vyšší přesnost.

## Přehled modulu CHESTER-X3B {#chester-x3b-module-overview}

CHESTER-X3B umožňuje připojit 2 termočlánky typu K (typy B/C/E/J/N/R/S/T na vyžádání) pomocí dvouvodičového připojení senzoru.

První senzor se připojuje na **CH1A(-)** a **CH1B(+)**.
Pokud je X3B ve **slotu A**, musíte použít svorky **A2(-)** a **A3(+)**.

Druhý senzor se připojuje na **CH2A(-)** a **CH2B(+)**.
Pokud je X3B ve **slotu A**, musíte použít svorky **A6(-)** a **A7(+)**.

## Přehled modulu CHESTER-X3C {#chester-x3c-module-overview}

CHESTER-X3C poskytuje 2 vstupy pro tenzometrické snímače (load-cell), které lze použít pro měření hmotnosti. Každý kanál používá čtyřvodičové připojení.

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k signálům CH1P, CH1A, CH1B, CH1M, CH2P, CH2A, CH2B, CH2M](../../../../../chester/extension-modules/images/tb-chester-x3.png)

## Konfigurace pinů a funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                     |
| -------- | ----------- | --------------------------------- |
| 1        | CH1P        | Kanál 1: pozitivní napájení senzoru |
| 2        | CH1A        | Kanál 1: vstup senzoru A          |
| 3        | CH1B        | Kanál 1: vstup senzoru B          |
| 4        | CH1M        | Kanál 1: negativní napájení senzoru |
| 5        | CH2P        | Kanál 2: pozitivní napájení senzoru |
| 6        | CH2A        | Kanál 2: vstup senzoru A          |
| 7        | CH2B        | Kanál 2: vstup senzoru B          |
| 8        | CH2M        | Kanál 2: negativní napájení senzoru |

## Schéma {#schematic-diagram}

Schéma je užitečné, pokud programujete nízkoúrovňový kód související s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x3-r3.2.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x3-r3.2.html)

![Schéma CHESTER-X3 R3.2: dva kanály ADC ADS122C04 s filtrací vstupů a rozhraním I2C](../../../../../chester/extension-modules/images/hio-chester-x3-r3.2-1.png)

## Výkres modulu {#module-drawing}

![Výkres rozmístění CHESTER-X3 se signály slotu nahoře a svorkami kanálů CH1P–CH2M dole](../../../../../chester/extension-modules/images/pc-chester-x3.png)
