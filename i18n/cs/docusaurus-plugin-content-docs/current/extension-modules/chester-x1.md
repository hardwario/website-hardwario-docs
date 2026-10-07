---
slug: chester-x1
title: CHESTER-X1 (8kanálový 1-Wire)
---
import Image from '@theme/IdealImage';

# CHESTER-X1 {#chester-x1}

Tento článek popisuje rozšiřující modul CHESTER-X1.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x1-top.png')} alt="Modul CHESTER-X1, červená deska s obvodem DS2482-800 (master 1-Wire) a kanály CH1-CH8 označenými podél spodní hrany" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

Modul CHESTER-X1 má 8 nezávislých kanálů 1-Wire, ke kterým připojíte digitální senzory (např. Dallas DS18B20) nebo jakékoli jiné periferie 1-Wire. Rozhraní obstarává obvod Maxim DS2482S-800+ a zvyšující měnič 5 V, takže modul podporuje i 5V periferie 1-Wire.

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Rozložení pinů svorkovnice CHESTER-X1: piny 1-8 odpovídají kanálům 1-Wire CH1-CH8](../../../../../chester/extension-modules/images/tb-chester-x1.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

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

Modul CHESTER-X1 podporuje i parazitní napájení. Pak stačí jen 2 vodiče a periferie se napájí z 5,0 V. Standardní třívodičové zapojení s napájením z VDD podporuje pouze periferie pro 3,0 V. Oba způsoby napájení ukazuje tento obrázek:

![Porovnání zapojení: dvouvodičové parazitní napájení s VDD senzoru spojeným s GND oproti standardnímu třívodičovému napájení z VDD](../../../../../chester/extension-modules/images/sc-chester-x1.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x1-r3.2.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x1-r3.2.html)

![Schéma CHESTER-X1, list 1: master 1-Wire DS2482S-800, jehož IO0-IO7 vedou přes pájecí můstky na kanály CH1-CH8](../../../../../chester/extension-modules/images/hio-chester-x1-r3.2-1.png)
![Schéma CHESTER-X1, list 2: zvyšující měnič 5,76 V, LDO 5,0 V a převodníky úrovní I2C](../../../../../chester/extension-modules/images/hio-chester-x1-r3.2-2.png)

## Výkres modulu {#module-drawing}

![Obrys desky CHESTER-X1 se signály na hranách: +V, GP0/A0, SDA, SCL, VDD, GND na horní straně a CH8-CH1 na spodní](../../../../../chester/extension-modules/images/pc-chester-x1.png)
