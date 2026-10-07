---
slug: chester-x3
title: CHESTER-X3 (přesný ADC)
---
import Image from '@theme/IdealImage';

# CHESTER-X3 {#chester-x3}

Tento článek popisuje rozšiřující moduly CHESTER-X3A, CHESTER-X3B a CHESTER-X3C.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x3-top.png')} alt="Modul CHESTER-X3 shora se dvěma přesnými převodníky ADC ADS122C"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu CHESTER-X3A {#chester-x3a-module-overview}

Modul CHESTER-X3A má 2 vstupy pro odporové teplotní senzory RTD, například Pt 100 a Pt 1000. Každý vstup podporuje čtyřvodičové připojení senzoru, které zvyšuje přesnost.

## Přehled modulu CHESTER-X3B {#chester-x3b-module-overview}

K modulu CHESTER-X3B připojíte dvouvodičově 2 termočlánky typu K (typy B/C/E/J/N/R/S/T na vyžádání).

První senzor se připojuje na **CH1A(-)** a **CH1B(+)**.
Je-li modul X3B ve **slotu A**, použijte svorky **A2(-)** a **A3(+)**.

Druhý senzor se připojuje na **CH2A(-)** a **CH2B(+)**.
Je-li modul X3B ve **slotu A**, použijte svorky **A6(-)** a **A7(+)**.

## Přehled modulu CHESTER-X3C {#chester-x3c-module-overview}

Modul CHESTER-X3C má 2 vstupy pro tenzometrické snímače (load cell) k měření hmotnosti. Každý kanál se připojuje čtyřvodičově.

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 přiřazené k signálům CH1P, CH1A, CH1B, CH1M, CH2P, CH2A, CH2B, CH2M](../../../../../chester/extension-modules/images/tb-chester-x3.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu                     |
| -------- | ----------- | --------------------------------- |
| 1        | CH1P        | Kanál 1: kladné napájení senzoru  |
| 2        | CH1A        | Kanál 1: vstup senzoru A          |
| 3        | CH1B        | Kanál 1: vstup senzoru B          |
| 4        | CH1M        | Kanál 1: záporné napájení senzoru |
| 5        | CH2P        | Kanál 2: kladné napájení senzoru  |
| 6        | CH2A        | Kanál 2: vstup senzoru A          |
| 7        | CH2B        | Kanál 2: vstup senzoru B          |
| 8        | CH2M        | Kanál 2: záporné napájení senzoru |

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x3-r3.2.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x3-r3.2.html)

![Schéma CHESTER-X3 R3.2: dva kanály ADC ADS122C04 s filtrací vstupů a rozhraním I2C](../../../../../chester/extension-modules/images/hio-chester-x3-r3.2-1.png)

## Výkres modulu {#module-drawing}

![Výkres rozmístění CHESTER-X3 se signály slotu nahoře a svorkami kanálů CH1P–CH2M dole](../../../../../chester/extension-modules/images/pc-chester-x3.png)
