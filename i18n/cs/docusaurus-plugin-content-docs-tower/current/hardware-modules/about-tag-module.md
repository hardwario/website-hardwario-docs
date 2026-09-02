---
slug: about-tag-module
title: O modulu Tag Module
description: "Modul Tag Module umožňuje připojit až šest tagů HARDWARIO."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/tag-module.png')} alt="Tag Module se zásuvkovými lištami a třemi pozicemi pro tagy na každé z obou I2C sběrnic" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>Tag Module</b> umožňuje připojit až <b>šest tagů HARDWARIO</b>.
        K dispozici jsou dvě nezávislé sběrnice I²C (<b>I2C0</b> a <b>I2C1</b>) - na každé straně jedna.
      </p>
    </div>
  </div>
</div>

:::info

Dvě nezávislé sběrnice I²C umožňují připojit **dva tagy se stejnou I²C adresou** k **jednomu uzlu HARDWARIO TOWER**. Bez modulu **Tag Module** to není možné.

Modul má také pull-up rezistory na signálech **SDA/SCL** sběrnice **I2C1**.

:::

## Vlastnosti {#features}
- 6x **pozice pro 5pinovou zásuvkovou lištu** pro tagy HARDWARIO TOWER
- 3x pozice pro tagy jsou připojeny k **I2C0 (pravá strana)**
- 3x pozice pro tagy jsou připojeny k **I2C1 (levá strana)**
- Integrované pull-up rezistory na **signálech SDA/SCL sběrnice I2C1**
- Rozsah pracovních teplot: -20 až 70 °C
- Mechanické rozměry: 44 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/tag-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-barometer)
- [**SDK knihovna**](https://sdk.hardwario.com/group__twr__tag__barometer)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/inc/twr_tag_barometer.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/src/twr_tag_barometer.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=108578)
