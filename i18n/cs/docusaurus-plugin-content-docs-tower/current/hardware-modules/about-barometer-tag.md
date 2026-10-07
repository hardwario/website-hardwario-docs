---
slug: about-barometer-tag
title: O tagu Barometer Tag
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/barometer-tag.png')} alt="Barometer Tag, deska velikosti mince se senzorem tlaku MPL3115A2" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Barometer Tag</b> měří absolutní tlak v rozsahu od <b>20 kPa</b> do <b>110 kPa</b>, případně nadmořskou výšku v metrech. Používá <b>senzor MPL3115A2 s nízkou spotřebou a rozhraním I²C</b>, jehož absolutní přesnost je ±0,4 kPa. Má velmi nízký proud v aktivním i pohotovostním režimu.
      </p>
      <p>
        Sledování absolutního tlaku je užitečné pro <b>předpověď počasí</b> a je také důležitým parametrem v biometeorologii, protože absolutní tlak <b>může ovlivňovat naše zdraví.</b>
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Senzor absolutního tlaku **MPL3115A2 (NXP)**
- Senzor potřebuje jen sběrnici I²C
- Rozsah tlaku: od 20 kPa do 110 kPa
- Rozsah nadmořské výšky: od -698 do 11 775 m
- Absolutní přesnost: ±0,4 kPa
- Volitelný výstup přerušení
- Spotřeba:
  - 40 µA průměrný proud (vzorkovací frekvence 1 Hz)
  - 2 µA pohotovostní proud
- Rozsah provozního napětí: 2,0 V až 3,6 V
- Rozsah provozních teplot: -40 až 85 °C
- Mechanické rozměry: 16 x 16 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/barometer-tag)
- [**Schéma**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-barometer)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__tag__barometer)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/inc/twr_tag_barometer.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/src/twr_tag_barometer.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=108578)
