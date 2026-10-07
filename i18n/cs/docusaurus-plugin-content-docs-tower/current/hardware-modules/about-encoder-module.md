---
slug: about-encoder-module
title: O modulu Encoder Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/encoder-module.png')} alt="Encoder Module s knoflíkem rotačního enkodéru a třemi paticemi TAG I2C0" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Encoder Module</b> se hodí k ovládání vašich aplikací. Má kvalitní rotační enkodér od výrobce <b>Bourns</b> s vysokou spolehlivostí a dlouhou životností. Enkodér má i <b>tlačítkový spínač</b>.
      </p>
      <p>
        Rotační enkodér má <b>12 pozic na otáčku</b>. Na rozdíl od potenciometru nemá omezený rozsah, takže jím můžete otáčet oběma směry o libovolný počet otáček.
      </p>
      <p>
        Modul vznikl hlavně jako doplněk k modulu <a href="../about-lcd-module"><b>LCD Module</b></a>. Typicky slouží k nastavení teploty na bezdrátovém termostatu nebo jako pohodlné ovládání grafického menu.
      </p>
    </div>
  </div>
</div>

:::info

Hliníkový knoflík na fotografii není součástí modulu a prodává se samostatně jako [**volitelné příslušenství**](https://www.hardwario.store/p/encoder-knob-small-black).

:::

## Vlastnosti {#features}
- Rotační enkodér **PEC12R (Bourns)**
- 12 pozic na otáčku
- Integrovaný **tlačítkový spínač**
- 3x patice pro tagy TOWER
- Rozsah provozních teplot: -20 až 70 °C
- Minimální životnost: **30 000 cyklů otáčení**
- Rozměry: 88 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/encoder-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-encoder)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__encoder)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_encoder.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_encoder.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=738388)
