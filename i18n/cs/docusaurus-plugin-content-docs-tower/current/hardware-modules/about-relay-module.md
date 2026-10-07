---
slug: about-relay-module
title: O modulu Relay Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/relay-module.png')} alt="Relay Module s bistabilním relé a třípólovou svorkovnicí" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Relay Module</b> se hodí ke spínání <b>spotřebičů s malým příkonem</b>, např. LED pásku, chladicího ventilátoru, sirény, bzučáku nebo pohonu garážových vrat. Má <b>bistabilní relé</b> (latching), a proto je vhodný pro zařízení na baterie: relé si jednoduše <b>pamatuje svůj stav</b>.
      </p>
      <p>
        Energii relé spotřebuje jen při přepnutí. Jakmile se nový stav nastaví, <b>cívku relé už není nutné napájet</b>. Přepnutí signalizuje <b>zelená LED</b> (v softwaru stav <b>TRUE</b>), nebo <b>červená LED</b> (v softwaru stav <b>FALSE</b>).
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- **Bistabilní (latching) relé** pro spínání zátěží do 60 W:
  - **12 V DC / 5 A**
  - **24 V DC / 2,5 A**
- Řízení pomocí **sběrnice I²C**
- Vhodný pro **zařízení na baterie**
- Cívka potřebuje energii jen při přepínání
- **Červená a zelená** LED indikují napájení cívky
- Rozsah provozního napětí: 3,0 až 3,6 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 33 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/relay-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-relay)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__relay)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_relay.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_relay.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73841)
