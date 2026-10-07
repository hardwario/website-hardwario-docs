---
slug: about-humidity-tag
title: O tagu Humidity Tag
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/humidity-tag.png')} alt="Humidity Tag, deska velikosti mince se senzorem vlhkosti SHT20" /></div>
    </div>
    <div class="col col--6">
      <p>
        Humidity Tag používá vysoce přesný senzor vlhkosti SHT20 s typickou přesností ±3 % v rozsahu od 20 % do 80 %. Senzor je digitální a kalibrovaný, komunikuje po sběrnici I²C a má velmi nízkou spotřebu a režim vypnutí.
      </p>
    </div>
  </div>
</div>

:::tip

Relativní vlhkost je **klíčový parametr** prostředí, ve kterém žijeme. Doporučený rozsah v interiéru je mezi **30 % a 60 %**.

Hodnoty pod tímto rozsahem (**suchý vzduch**) mohou vést k různým **zdravotním potížím**. Naopak vyšší hodnoty mohou způsobit **problémy s vlhkostí**.

:::

## Vlastnosti {#features}
- Integrovaný senzor vlhkosti **SHT20 (Sensirion)**
- Komunikace po **sběrnici I²C**
- Rozsah měření: 0 % až 100 %
- Přesnost měření: ±2 %
- Volitelný výstup přerušení
- Provozní proud: 10 µA
- Rozsah provozního napětí: 1,8 V až 3,3 V
- Rozsah provozních teplot: -40 až 125 °C
- Mechanické rozměry: 16 x 16 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/humidity-tag)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-humidity)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__tag__humidity)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_humidity.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_humidity.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=108576)
