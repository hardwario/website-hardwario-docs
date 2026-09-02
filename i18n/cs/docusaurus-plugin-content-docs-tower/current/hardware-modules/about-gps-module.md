---
slug: about-gps-module
title: O modulu GPS
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/gps-module.png')} alt="GPS Module s přijímačem u-blox SAM-M8Q pod čtvercovou patch anténou" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>GPS Module</b> umožňuje zjistit <b>přesnou pozici</b> vašeho zařízení. Používá modul <b>SAM-M8Q</b> od firmy ublox. Rozumí 3 globálním polohovým standardům GPS, Galileo a GLONASS. <b>Přesnost pozice 2,5 m</b> je možná díky kombinaci pozic ze všech tří standardů dohromady.
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Podporuje **GPS, Galileo, GLONASS**
- Přesnost pozice 2.5m CEP
- Komunikace přes **sběrnici I²C**
- Vestavěná anténa
- Spotřeba proudu 26mA za provozu
- Integrovaný spínač napájení pro **provoz s nízkou spotřebou**
- Studený start 26s, asistovaný start 2s
- Rozsah napájecího napětí: 2.7V až 3.6V
- Rozsah provozních teplot: -40 až 85 °C

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/gps-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-gps)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__gps.html)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_gps.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_gps.c)
