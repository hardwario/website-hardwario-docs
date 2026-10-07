---
slug: chester-x2
title: CHESTER-X2 (sériová komunikace)
---
import Image from '@theme/IdealImage';

# CHESTER-X2 {#chester-x2}

Tento článek popisuje rozšiřující modul CHESTER-X2.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x2-top.png')} alt="Pohled zvrchu na červenou desku rozšiřujícího modulu CHESTER-X2 R3.0" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

Modul CHESTER-X2 nabízí rozhraní TTL/UART a RS-485 (např. pro komunikaci Modbus).

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Rozložení pinů svorkovnice CHESTER-X2: GND, VDD, RX, TX, EN, B, A, +V na pinech 1–8](../../../../../chester/extension-modules/images/tb-chester-x2.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu            |
| -------- | ----------- | ------------------------ |
| 1        | GND         | Systémová zem            |
| 2        | VDD         | Systémová větev VDD 3,0 V |
| 3        | RX          | Vstup přijímače UART     |
| 4        | TX          | Výstup vysílače UART     |
| 5        | EN          | Povolovací vstup         |
| 6        | B           | Vstup/výstup sběrnice    |
| 7        | A           | Vstup/výstup sběrnice    |
| 8        | +V          | Systémová kladná větev (*) |

*Poznámka: Napětí systémové kladné větve závisí na variantě napájení zařízení CHESTER.

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x2-r3.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x2-r3.0.html)

![Schéma modulu CHESTER-X2 s převodníkem UART SC16IS740 a transceiverem RS-485 THVD1450](../../../../../chester/extension-modules/images/hio-chester-x2-r3.0-1.png)

## Výkres modulu {#module-drawing}

![Výkres rozložení desky CHESTER-X2 R3.0 s rozmístěním součástek a popisky pinů na okraji](../../../../../chester/extension-modules/images/pc-chester-x2.png)
