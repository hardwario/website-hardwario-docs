---
slug: about-bridge-module
title: O modulu Bridge
description: "Konektor microUSB nejen zajišťuje komunikační linku, ale také dodává napájení pro modul Bridge a periferie k němu připojené."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/bridge-module.png')} alt="Modul Bridge s konektorem micro-USB a převodníkem USB-UART pro připojení modulů k USB hostu" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Modul Bridge</b> nabízí snadnou cestu, jak připojit některé z modulů či tagů TOWER k USB hostu, například k zařízení Raspberry Pi nebo k jakémukoli stolnímu či přenosnému počítači.
      </p>
      <p>
        Konektor microUSB nejen <b>zajišťuje komunikační linku</b>, ale také <b>dodává napájení</b> pro modul Bridge a periferie k němu připojené.
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Integrovaný převodník USB HID na I2C/UART FT260
- Konektor micro-USB
- Dvě nezávislé sběrnice I2C zajištěné multiplexerem I2C TCA9543
- LED červené barvy (řízená z GPIO pinu FT260)
- Rozsah provozního napětí: 3.0 až 3.6 V nebo z USB hostu
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/bridge-module)
- [**Schémata**](https://github.com/hardwario/twr-hardware/tree/master/out/bc-module-bridge)
