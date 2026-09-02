---
slug: about-encoder-module
title: O modulu Encoder
description: "Modul Encoder může být užitečný pro ovládání vašich aplikací. Modul je vybaven vysoce kvalitním rotačním enkodérem od výrobce Bourns a vyznačuje se vysokou spolehlivostí a dlouhou životností. Rotační enkodér je také vybaven tlačítkovým spínačem."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/encoder-module.png')} alt="Modul Encoder s knoflíkem rotačního enkodéru a třemi konektory TAG I2C0" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>Encoder</b> může být užitečný pro ovládání vašich aplikací. Modul je vybaven vysoce kvalitním rotačním enkodérem od výrobce <b>Bourns</b> a vyznačuje se vysokou spolehlivostí a dlouhou životností. Rotační enkodér je také vybaven <b>tlačítkovým spínačem</b>.
      </p>
      <p>
        Rotační enkodér má <b>12 pozic na otáčku</b>. Rozsah otáčení není omezen jako u potenciometru a lze jej otáčet v obou směrech o libovolný počet otáček.
      </p>
      <p>
        Modul byl navržen především jako doplněk k <a href="../about-lcd-module"><b>modulu LCD</b></a>. Typickou aplikací je bezdrátový termostat pro nastavení teploty otáčením enkodéru nebo jej lze použít jako pohodlné navigační ovládání v grafickém menu.
      </p>
    </div>
  </div>
</div>

:::info

Aluminiový knoflík na fotografii není součástí modulu a prodává se jako [**volitelné příslušenství samostatně**](https://www.hardwario.store/p/encoder-knob-small-black).

:::

## Vlastnosti {#features}
- Rotační enkodér **PEC12R (Bourns)**
- 12 pozic na otáčku
- Integrovaný **tlačítkový spínač**
- 3x konektor pro TOWER Tags
- Rozsah provozních teplot: -20 až 70 °C
- Minimální životnost: **30 000 cyklů otáčení**
- Rozměry: 88 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/encoder-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-encoder)
- [**SDK knihovna**](https://sdk.hardwario.com/group__twr__module__encoder)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_encoder.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_encoder.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=738388)
