---
slug: about-temperature-tag
title: O modulu Temperature Tag
description: "Modul Temperature Tag využívá vysoce přesný teplotní senzor TMP112 s typickou přesností ±0,1 °C při 25 °C. Tento senzor je digitální a kalibrovaný. Komunikuje po sběrnici I²C a vyznačuje se velmi nízkou spotřebou a režimem vypnutí."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/temperature-tag.png')} alt="Temperature Tag, deska o velikosti monety s teplotním senzorem TMP112" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>Temperature Tag</b> využívá vysoce přesný teplotní senzor <b>TMP112</b> s typickou přesností <b>±0,1 °C při 25 °C</b>. Tento senzor je digitální a kalibrovaný. Komunikuje po <b>sběrnici I²C</b> a vyznačuje se velmi nízkou spotřebou a režimem vypnutí.
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Integrovaný teplotní senzor **TMP112 (TI)**
- Komunikace po **sběrnici I²C**
- **Přesnost měření teploty (typické hodnoty):**
  - ±0,1 °C při 25 °C
  - ±0,25 °C v rozsahu od 0 °C do 65 °C
- ±0,5 °C v rozsahu od -40 °C do 125 °C
- **12bitové rozlišení (0,0625 °C)**
- Volitelný přerušovací výstup
- **Spotřeba:**
  - 7 µA aktivní proud (vzorkovací frekvence 4 Hz)
  - 0,5 µA proud v režimu vypnutí
- Rozsah napájecího napětí: 1,4 V až 3,6 V
- Rozsah provozních teplot: -40 až 125 °C
- Mechanické rozměry: 16 x 16 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/temperature-tag)
- [**Schéma**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-temperature)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__tag__temperature)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_temperature.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_temperature.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=108577)
