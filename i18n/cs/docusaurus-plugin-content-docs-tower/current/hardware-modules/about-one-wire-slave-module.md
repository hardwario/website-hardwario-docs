---
slug: about-one-wire-slave-module
title: O modulu 1-Wire Slave
description: "Modul 1-Wire Slave umožňuje připojit zařízení I²C na vzdálenost několika metrů. Protokol I²C je zapouzdřen v protokolu 1-Wire. Data jsou chráněna pomocí 16bitového CRC. Pro vytvoření mastera sběrnice 1-Wire můžete použít Sensor Module."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/1-wire-module.png')} alt="Modul 1-Wire Slave se zelenou svorkovnicí pro sběrnici 1-Wire a dvěma dutinkovými lištami" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>1-Wire Slave</b> umožňuje připojit zařízení I²C na vzdálenost několika metrů. Protokol I²C je zapouzdřen v protokolu 1-Wire. Data jsou chráněna pomocí <b>16bitového CRC</b>. Pro vytvoření mastera sběrnice 1-Wire můžete použít <b>Sensor Module</b>.
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Integrovaný most 1-Wire na I²C master DS28E17 (Maxim)
- Rozsah provozního napětí: 2.5 V až 3.6 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-1-wire)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__onewire)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_onewire.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_onewire.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73837)
