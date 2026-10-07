---
slug: chester-x0
title: CHESTER-X0 (4kanálový vstup)
---
import Image from '@theme/IdealImage';

# CHESTER-X0 {#chester-x0}

Tento článek popisuje rozšiřující modul CHESTER-X0 se čtyřmi vstupně-výstupními kanály. Modul se dodává ve dvou variantách:
* CHESTER-X0**A** se zvyšujícím měničem 5,0 V

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

* CHESTER-X0**B** bez zvyšujícího měniče 5,0 V

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x0b-top.png')} alt="Modul CHESTER-X0B, červená deska s neosazenou pozicí zvyšujícího měniče, místo něj s pájenými propojkami" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

Každý kanál může sloužit jako:

* Digitální vstup a výstup
* Analogový vstup a výstup
* Napěťový vstup 0–26 V**\***
* Proudová smyčka 4–20 mA
* Vstup pro bezpotenciálový kontakt
* Vstup NPN a PNP
* Napájecí výstup
  * **X0A** se zvyšujícím měničem: 5 V
  * **X0B** bez zvyšujícího měniče: standardní 3,0 V (pájená propojka VDD) nebo na vyžádání bateriová větev V+ (pájená propojka V+)

_\* Základní deska CHESTER-M má na pinech svorkovnic Ax a Bx ochranné diody TVS, které začínají chránit GPIO nad 28 V. Teoreticky lze měřit i napětí vyšší než 26 V, ochrana ale měření zkresluje; jinak je nutné si diody TVS vyžádat neosazené, nebo je odstranit._

## Elektrická specifikace {#electrical-specification}

* Trvalý výstupní proud: 50 mA
* Omezení špičkového výstupního proudu: 150 mA

## Schéma zapojení kanálu {#channel-schematic-diagram}

Podle použití můžete u každého kanálu zapnout:

* Pull-up rezistor 330 kΩ (PUX)
* Pull-down rezistor 249 Ω (PDX)
* Napěťový dělič (zesílení 1/11) (100 kΩ, 10 kΩ) (CLX)
* Zvyšující měnič 5 V (pouze CHESTER-X0A) (ONX)

Zapojení jednoho kanálu ukazuje tento obrázek:

![Obvod jednoho kanálu: vstup CHX s varistorem, pull-up PUX, pull-down PDX, dělič CLX a spínač 5 V ONX na GPX/AX](../../../../../chester/extension-modules/images/sc-chester-x0.png)

## Konfigurační tabulka {#configuration-table}

Konfigurace závisí na způsobu použití.

Signály PUx, CLx, PDx a ONx odpovídají schématu výše. Zelené zaškrtnutí ✅ znamená, že expandér GPIO na sběrnici I2C nebo modul X0 nastaví tento konfigurační signál na logickou jedničku.
Tabulka ale slouží jen k pochopení režimů. Stačí znát režim uvedený ve sloupci `ctr_x0_set_mode`.

| Použití              | PUx | CLx | PDx | ONx | SDK `ctr_x0_set_mode`    |
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

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

![Rozložení pinů svorkovnice CHESTER-X0, piny 1–8: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../chester/extension-modules/images/tb-chester-x0.png)

## Zapojení pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu            |
| -------- | ----------- | ------------------------ |
| 1        | VDD         | Systémová větev VDD 3,0 V |
| 2        | CH1         | Kanál 1                  |
| 3        | GND         | Systémová zem            |
| 4        | CH2         | Kanál 2                  |
| 5        | CH3         | Kanál 3                  |
| 6        | GND         | Systémová zem            |
| 7        | CH4         | Kanál 4                  |
| 8        | +V          | Systémová kladná větev (*) |

*Poznámka: Napětí systémové kladné větve závisí na variantě napájení zařízení CHESTER.

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-x0-r2.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x0-r2.0.html)

![Schéma CHESTER-X0, list 1: expandér GPIO PCAL6416A a zvyšující měnič TPS61099 s pinovými lištami modulu](../../../../../chester/extension-modules/images/hio-chester-x0-r2.0-1.png)
![Schéma CHESTER-X0, list 2: spínací obvody konfigurace kanálů 1 a 2](../../../../../chester/extension-modules/images/hio-chester-x0-r2.0-2.png)
![Schéma CHESTER-X0, list 3: spínací obvody konfigurace kanálů 3 a 4](../../../../../chester/extension-modules/images/hio-chester-x0-r2.0-3.png)

## Výkres modulu {#module-drawing}
![Obrys desky CHESTER-X0 se signály na hranách: +V, GP0-GP3, SDA, SCL, VDD, GND nahoře; +V, CH1-CH4, GND, VDD dole](../../../../../chester/extension-modules/images/pc-chester-x0.png)

## CHESTER SDK {#chester-sdk}

### Odkazy {#references}

* [samples/chester_x0](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x0)
* [samples/ctr_edge_x0](https://github.com/hardwario/chester-sdk/tree/main/samples/ctr_edge_x0)
* [applications/input](https://github.com/hardwario/chester-sdk/tree/main/applications/input)
