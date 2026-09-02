---
slug: about-barometer-tag
title: O modulu Barometer Tag
description: "Modul Barometer Tag umožňuje měřit absolutní tlak v rozsahu od 20 kPa do 110 kPa, případně nadmořskou výšku v metrech. Využívá nízkopříkonový I²C senzor MPL3115A2 s absolutní přesností ±0,4 kPa. Vyznačuje se velmi nízkým proudem v aktivním i…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/barometer-tag.png')} alt="Barometer Tag, deska velikosti mince se snímačem tlaku MPL3115A2" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>Barometer Tag</b> umožňuje měřit absolutní tlak v rozsahu od <b>20 kPa</b> do <b>110 kPa</b>, případně nadmořskou výšku v metrech. Využívá <b>nízkopříkonový I²C senzor MPL3115A2</b> s absolutní přesností ±0,4 kPa. Vyznačuje se velmi nízkým proudem v aktivním i pohotovostním režimu.
      </p>
      <p>
        Sledování absolutního tlaku je užitečné pro <b>předpověď počasí</b> a je také důležitým parametrem v biometeorologii, protože absolutní tlak <b>může ovlivňovat naše zdraví.</b>
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Senzor absolutního tlaku **MPL3115A2 (NXP)**
- Senzor vyžaduje pouze sběrnici I²C
- Rozsah tlaku: od 20 kPa do 110 kPa
- Rozsah nadmořské výšky: od -698 do 11 775 m
- Absolutní přesnost: ±0,4 kPa
- Volitelný přerušovací výstup
- Spotřeba:
  - 40 µA průměrný proud (vzorkovací frekvence 1 Hz)
  - 2 µA pohotovostní proud
- Rozsah napájecího napětí: 2,0 V až 3,6 V
- Rozsah provozních teplot: -40 až 85 °C
- Mechanické rozměry: 16 x 16 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/barometer-tag)
- [**Schéma**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-barometer)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__tag__barometer)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/inc/twr_tag_barometer.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/src/twr_tag_barometer.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=108578)
