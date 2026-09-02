---
slug: about-lux-meter-tag
title: O modulu Lux Meter Tag
description: "Modul Lux Meter Tag využívá senzor intenzity světla OPT3001 s vysokým dynamickým rozsahem, který umí měřit osvětlení od 0,01 do 83 000 lux. Tento senzor je digitální a kalibrovaný. Komunikuje po sběrnici I²C a nabízí velmi nízkou spotřebu a režim…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/lux-meter-tag.png')} alt="Lux Meter Tag, deska velikosti monety se senzorem intenzity světla OPT3001" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>Lux Meter Tag</b> využívá <b>senzor intenzity světla OPT3001</b> s vysokým dynamickým rozsahem, který umí měřit osvětlení od 0,01 do 83 000 lux. Tento senzor je digitální a kalibrovaný. Komunikuje po sběrnici I²C a nabízí velmi nízkou spotřebu a režim vypnutí.
      </p>
    </div>
  </div>
</div>

:::tip

Senzor můžete použít k **detekci dne a noci** nebo jako doplňkovou informaci o něčí přítomnosti.

:::

## Vlastnosti {#features}
- Digitální senzor okolního **světla OPT3001 (TI)**
- Komunikace po sběrnici **I²C**
- Měří v rozsahu od **0,01 do 83 000 lux**
- Efektivní dynamický rozsah 23 bitů
- Volitelný výstup přerušení
- Spotřeba:
  - Proud v aktivním režimu: 1.8 µA
  - Proud ve vypnutém režimu: 0.3 µA
- Rozsah napájecího napětí: 1.6 V až 3.6 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 16 x 16 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/lux-meter-tag)
- [**Schéma**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-lux-meter)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__tag__lux__meter)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_lux_meter.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_lux_meter.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=80227)
