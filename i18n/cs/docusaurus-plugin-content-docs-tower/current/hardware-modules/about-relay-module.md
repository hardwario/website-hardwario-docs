---
slug: about-relay-module
title: O modulu Relay Module
description: "Modul Relay Module je vhodný pro spínání málo výkonných spotřebičů – např. LED pásku, chladicího ventilátoru, sirény, bzučáku, pohonu garážových dveří atd. Obsahuje bistabilní (latching) relé, což jej předurčuje pro bateriové aplikace – relé si totiž…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/relay-module.png')} alt="Relay Module s bistabilním relé a třípólovou svorkovnicí" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul <b>Relay Module</b> je vhodný pro spínání <b>málo výkonných spotřebičů</b> – např. LED pásku, chladicího ventilátoru, sirény, bzučáku, pohonu garážových dveří atd. Obsahuje <b>bistabilní (latching) relé</b>, což jej předurčuje pro bateriové aplikace – relé si totiž jednoduše <b>pamatuje svůj stav</b>.
      </p>
      <p>
        Energie je potřeba pouze během přechodového stavu. Jakmile je nastaven nový stav, <b>již není nutné napájet cívku relé</b>. Okamžik přepnutí je indikován <b>zelenou LED</b> (v softwaru označováno jako stav <b>TRUE</b>), nebo <b>červenou LED</b> (v softwaru označováno jako stav <b>FALSE</b>).
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- **Bistabilní (latching) relé** pro spínání zátěží do 60 W:
  - **12 V DC / 5 A**
  - **24 V DC / 2.5 A**
- Řízení pomocí **sběrnice I²C**
- Vhodné pro **bateriové aplikace**
- Energie pro cívku je potřeba pouze během přechodových stavů
- **Červená a zelená** LED indikují napájení cívky
- Rozsah provozního napětí: 3.0 až 3.6 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/relay-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-relay)
- [**SDK knihovna**](https://sdk.hardwario.com/group__twr__module__relay)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_relay.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_relay.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73841)
