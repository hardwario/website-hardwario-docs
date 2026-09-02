---
slug: about-humidity-tag
title: O modulu Humidity Tag
description: "Modul Humidity Tag používá velmi přesný senzor vlhkosti SHT20 s typickou přesností ±3 % v rozsahu od 20 % do 80 %. Tento senzor je digitální a kalibrovaný. Komunikuje pomocí sběrnice I²C a nabízí velmi nízkou spotřebu a režim vypnutí."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/humidity-tag.png')} alt="Humidity Tag, deska velikosti monety se senzorem vlhkosti SHT20" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul Humidity Tag používá velmi přesný senzor vlhkosti SHT20 s typickou přesností ±3 % v rozsahu od 20 % do 80 %. Tento senzor je digitální a kalibrovaný. Komunikuje pomocí sběrnice I²C a nabízí velmi nízkou spotřebu a režim vypnutí.
      </p>
    </div>
  </div>
</div>

:::tip

Relativní vlhkost je **klíčovou vlastností** prostředí, ve kterém žijeme. Doporučený rozsah v interiéru je mezi **30 % a 60 %**.

Hodnoty pod tímto rozsahem (**suchý vzduch**) mohou vést k různým **zdravotním potížím**. Naopak hodnoty nad tímto rozsahem mohou způsobit **problémy s vlhkostí**.

:::

## Vlastnosti {#features}
- Integrovaný senzor vlhkosti **SHT20 (Sensirion)**
- Komunikace pomocí **sběrnice I²C**
- Rozsah měření: 0 % až 100 %
- Přesnost měření: ±2 %
- Volitelný přerušovací výstup
- Provozní proud: 10 µA
- Rozsah provozního napětí: 1,8 V až 3,3 V
- Rozsah provozní teploty: -40 až 125 °C
- Mechanické rozměry: 16 x 16 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/humidity-tag)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-humidity)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__tag__humidity)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_humidity.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_humidity.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=108576)
