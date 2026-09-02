---
slug: chester-x1
title: CHESTER-X1 (8kanálový 1-Wire)
description: "Tento článek popisuje rozšiřující modul CHESTER-X1."
---
import Image from '@theme/IdealImage';

# CHESTER-X1 {#chester-x1}

Tento článek popisuje rozšiřující modul CHESTER-X1.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x1-top.png')} alt="Modul CHESTER-X1, červená deska s obvodem 1-Wire masteru DS2482-800 a kanály CH1-CH8 označenými podél spodní hrany" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

CHESTER-X1 poskytuje 8 nezávislých kanálů 1-Wire, které umožňují připojit digitální senzory (např. Dallas DS18B20) nebo jakékoli jiné periferie 1-Wire. Modul využívá rozhraní Maxim DS2482S-800+ a také 5V boost převodník pro podporu 5V periferií 1-Wire.

## Schéma zapojení pinů CHESTER {#chester-pin-configuration-diagram}

![Osazení svorkovnice CHESTER-X1: piny 1-8 odpovídají kanálům 1-Wire CH1-CH8](../../../../../chester/extension-modules/images/tb-chester-x1.png)

## Konfigurace pinů a funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu      |
| -------- | ----------- | ------------------ |
| 1        | CH1         | Kanál 1            |
| 2        | CH2         | Kanál 2            |
| 3        | CH3         | Kanál 3            |
| 4        | CH4         | Kanál 4            |
| 5        | CH5         | Kanál 5            |
| 6        | CH6         | Kanál 6            |
| 7        | CH7         | Kanál 7            |
| 8        | CH8         | Kanál 8            |

## Parazitní napájení 1-Wire {#1-wire-parasitic-power-connection}

CHESTER-X1 podporuje připojení metodou parazitního napájení. V takovém případě jsou potřeba pouze 2 vodiče. V parazitním režimu se používá napájení 5,0 V. Standardní třívodičové zapojení s napájením z VDD podporuje pouze 3,0V periferie. Tento obrázek ukazuje parazitní a standardní způsob napájení:

![Porovnání zapojení: dvouvodičové parazitní napájení s VDD senzoru spojeným s GND versus třívodičové standardní napájení z VDD](../../../../../chester/extension-modules/images/sc-chester-x1.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení je užitečné, pokud programujete nízkoúrovňový kód pracující s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x1-r3.2.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x1-r3.2.html)

![Schéma CHESTER-X1, list 1: 1-Wire master DS2482S-800 s propojením IO0-IO7 pájecími můstky na kanály CH1-CH8](../../../../../chester/extension-modules/images/hio-chester-x1-r3.2-1.png)
![Schéma CHESTER-X1, list 2: boost převodník 5,76 V, LDO 5,0 V a převodníky úrovní I2C](../../../../../chester/extension-modules/images/hio-chester-x1-r3.2-2.png)

## Nákres modulu {#module-drawing}

![Obrys desky CHESTER-X1 se signály na hranách: +V, GP0/A0, SDA, SCL, VDD, GND na horní straně a CH8-CH1 na spodní](../../../../../chester/extension-modules/images/pc-chester-x1.png)
