---
slug: about-gps-module
title: O modulu GPS Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/gps-module.png')} alt="GPS Module s přijímačem u-blox SAM-M8Q pod čtvercovou patch anténou" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>GPS Module</b> určí <b>přesnou polohu</b> vašeho zařízení. Používá modul <b>SAM-M8Q</b> od firmy u-blox a podporuje 3 globální polohové systémy: GPS, Galileo a GLONASS. <b>Přesnost polohy 2,5 m</b> umožňuje kombinace údajů ze všech tří systémů.
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Podporuje **GPS, Galileo, GLONASS**
- Přesnost polohy 2,5 m CEP
- Komunikace přes **sběrnici I²C**
- Vestavěná anténa
- Odběr proudu za provozu 26 mA
- Integrovaný spínač napájení pro **provoz s nízkou spotřebou**
- Studený start 26 s, asistovaný start 2 s
- Rozsah provozního napětí: 2,7 V až 3,6 V
- Rozsah provozních teplot: -40 až 85 °C

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/gps-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-gps)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__gps.html)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_gps.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_gps.c)
