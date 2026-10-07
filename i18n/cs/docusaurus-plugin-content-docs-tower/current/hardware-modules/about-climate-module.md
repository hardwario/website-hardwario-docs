---
slug: about-climate-module
title: O modulu Climate Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/climate-module.png')} alt="Climate Module, černá deska s ventilačními otvory nad integrovanými senzory prostředí" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Climate Module</b> obsahuje <b>4 senzory prostředí: teploty, vlhkosti, intenzity osvětlení a atmosférického tlaku</b>. Všechny senzory jsou digitální, mají úsporné provozní režimy a jsou připojené přes <b>sběrnici I²C</b>. Modul se výborně hodí pro <b>monitorování prostředí, meteorologické stanice</b> apod.
      </p>
      <p>
      </p>
    </div>
  </div>
</div>

:::tip

  Spolu s moduly [**Mini Battery Module**](./about-mini-battery-module.md) a [**Core Module**](./about-core-module.md) postavíte z modulu **Climate Module** velmi kompaktní bezdrátový senzor prostředí.

:::

## Vlastnosti {#features}
- Integrované **4 senzory prostředí**: teplota, vlhkost, intenzita osvětlení a atmosférický tlak
- Všechny senzory jsou **digitální** a připojené přes **sběrnici I²C**
- Senzory mají **úsporné provozní režimy**
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 33 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/climate-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-climate)
- [**SDK – teplota (TMP112)**](https://sdk.hardwario.com/group__twr__tmp112)
- [**SDK – vlhkost a teplota (HDC2080)**](https://sdk.hardwario.com/group__twr__hdc2080)
- [**SDK – osvětlenost (OPT3001)**](https://sdk.hardwario.com/group__twr__opt3001)
- [**SDK – tlak (MPL3115A2)**](https://sdk.hardwario.com/group__twr__mpl3115a2)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73735)
