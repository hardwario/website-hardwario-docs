---
slug: chester-x0
title: CHESTER-X0 (4kanálový vstup)
description: "Tento článek popisuje čtyřkanálový I/O rozšiřující modul CHESTER-X0. Dostupné jsou dvě varianty:"
---
import Image from '@theme/IdealImage';

# CHESTER-X0 {#chester-x0}

Tento článek popisuje čtyřkanálový I/O rozšiřující modul CHESTER-X0. Dostupné jsou dvě varianty:
* CHESTER-X0**A** včetně 5,0V zvyšujícího měniče

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x0a-top.png')} alt="Modul CHESTER-X0A, červená deska s osazeným zvyšujícím měničem v levém horním rohu" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

* CHESTER-X0**B** bez 5,0V zvyšujícího měniče

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x0b-top.png')} alt="Modul CHESTER-X0B, červená deska s neosazenou pozicí zvyšujícího měniče a s pájenými propojkami" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

Každý kanál lze použít pro tyto aplikace:

* Digitální vstup a výstup
* Analogový vstup a výstup
* Napěťový vstup 0–26 V**\***
* Proudová smyčka 4–20 mA
* Vstup pro bezpotenciálový kontakt
* Vstup NPN a PNP
* Napájecí výstup
  * **X0A** se zvyšujícím měničem: 5 V
  * **X0B** bez zvyšujícího měniče: standardní 3,0 V (pájená propojka VDD) nebo na vyžádání bateriová větev V+ (pájená propojka V+)

_\* Hlavní deska CHESTER-M má na svorkovnicových pinech Ax a Bx ochranu TVS, která začíná chránit GPIO nad 28 V. Teoreticky lze měřit vyšší napětí než 26 V, ale ochrana zkresluje měření, případně je nutné tyto TVS vyžádat neosazené nebo odstranit._

## Elektrická specifikace {#electrical-specification}

* Trvalý výstupní proud: 50 mA
* Limit špičkového výstupního proudu: 150 mA

## Schéma zapojení kanálu {#channel-schematic-diagram}

V závislosti na aplikaci jsou pro každý kanál dostupné tyto možnosti konfigurace:

* Zapnutí pull-up rezistoru 330 kΩ (PUX)
* Zapnutí pull-down rezistoru 249 Ω (PDX)
* Zapnutí napěťového děliče (zesílení 1/11) (100 kΩ, 10 kΩ) (CLX)
* Zapnutí 5V zvyšujícího měniče (pouze CHESTER-X0A) (ONX)

Tento obrázek ukazuje elektrický obvod každého kanálu:

![Obvod jednoho kanálu: vstup CHX s varistorem, pull-up PUX, pull-down PDX, dělič CLX a 5V přepínač ONX na GPX/AX](../../../../../chester/extension-modules/images/sc-chester-x0.png)

## Konfigurační tabulka {#configuration-table}

Konfigurace závisí na aplikaci.

Signály PUx, CLx, PDx, ONx odkazují na schéma výše. Zelená fajfka ✅ znamená, že I2C GPIO expander nebo X0 posílá na tento konfigurační signál logickou jedničku.
To slouží pouze pro pochopení režimů. Stačí vědět, který režim je nastaven ve sloupci tabulky `ctr_x0_set_mode`.

| Aplikace             | PUx | CLx | PDx | ONx | SDK `ctr_x0_set_mode`    |
| -------------------- | --- | --- | --- | --- | ------------------------ |
| Analogový vstup 0–26 V |     |     | ✅   |     | `CTR_X0_MODE_AI_INPUT`   |
| Bezpotenciálový kontakt | ✅   |     |     |     | `CTR_X0_MODE_DEFAULT`    |
| Vstup NPN            | ✅   |     |     |     | `CTR_X0_MODE_NPN_INPUT`  |
| Vstup PNP            |     |     | ✅   |     | `CTR_X0_MODE_PNP_INPUT`  |
| Proudová smyčka 4–20 mA |     | ✅   | ✅   |     | `CTR_X0_MODE_CL_INPUT`   |
| Zdroj napájení       |     |     |     | ✅   | `CTR_X0_MODE_PWR_SOURCE` |
| Analogový výstup 0-VDD |     |     |     |     | `CTR_X0_MODE_DEFAULT`    |
| Digitální vstup      |     |     |     |     | `CTR_X0_MODE_DEFAULT`    |
| Digitální výstup     |     |     |     |     | `CTR_X0_MODE_DEFAULT`    |

## Schéma zapojení pinů CHESTER {#chester-pin-configuration-diagram}

![Pinout svorkovnice CHESTER-X0, piny 1–8: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../chester/extension-modules/images/tb-chester-x0.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu            |
| -------- | ----------- | ------------------------ |
| 1        | VDD         | Systémová větev VDD 3,0 V |
| 2        | CH1         | Kanál 1                  |
| 3        | GND         | Systémový signál země    |
| 4        | CH2         | Kanál 2                  |
| 5        | CH3         | Kanál 3                  |
| 6        | GND         | Systémový signál země    |
| 7        | CH4         | Kanál 4                  |
| 8        | +V          | Systémová kladná větev (*) |

*Poznámka: Napětí systémové kladné větve závisí na variantě napájení zařízení CHESTER.

## Schéma zapojení {#schematic-diagram}

Schéma zapojení je užitečné, pokud programujete nízkoúrovňový kód související s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x0-r2.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-x0-r2.0.html)

![Schéma CHESTER-X0, list 1: GPIO expander PCAL6416A a zvyšující měnič TPS61099 s pinovými lištami modulu](../../../../../chester/extension-modules/images/hio-chester-x0-r2.0-1.png)
![Schéma CHESTER-X0, list 2: konfigurační přepínací obvody pro kanály 1 a 2](../../../../../chester/extension-modules/images/hio-chester-x0-r2.0-2.png)
![Schéma CHESTER-X0, list 3: konfigurační přepínací obvody pro kanály 3 a 4](../../../../../chester/extension-modules/images/hio-chester-x0-r2.0-3.png)

## Výkres modulu {#module-drawing}
![Obrys desky CHESTER-X0 se signály na hranách: +V, GP0-GP3, SDA, SCL, VDD, GND nahoře; +V, CH1-CH4, GND, VDD dole](../../../../../chester/extension-modules/images/pc-chester-x0.png)

## CHESTER SDK {#chester-sdk}

### Odkazy {#references}

* [samples/chester_x0](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x0)
* [samples/ctr_edge_x0](https://github.com/hardwario/chester-sdk/tree/main/samples/ctr_edge_x0)
* [applications/input](https://github.com/hardwario/chester-sdk/tree/main/applications/input)
