---
slug: about-radio-dongle
title: O zařízení Radio Dongle
description: "Radio Dongle je hlavním prvkem radiové sítě HARDWARIO. Tento produkt funguje jako brána pro uzly HARDWARIO. Vypadá jako USB stick. Můžete jej zapojit do stolního počítače, zařízení Raspberry Pi nebo Turris Omnia. Můžete se na něj také dívat jako na…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/radio-dongle.png')} alt="Radio Dongle, černý USB stick s červeným logem HARDWARIO" /></div>
    </div>
    <div class="col col--6">
      <p>
        Radio Dongle je hlavním prvkem radiové sítě HARDWARIO. Tento produkt funguje jako brána pro uzly HARDWARIO. Vypadá jako USB stick. Můžete jej zapojit do stolního počítače, zařízení Raspberry Pi nebo Turris Omnia. Můžete se na něj také dívat jako na přístupový bod pro až 32 uzlů HARDWARIO TOWER.
      </p>
      <p>
        Tato položka je plně kompatibilní s modulem Core Module. Obsahuje 32bitový mikrokontrolér ARM se 192 kB flash paměti a 20 kB RAM. Kromě integrovaného sub-GHz radia pro pásmo 868/915 MHz obsahuje také dva bezpečnostní čipy – aby bylo dost místa pro až 32 uzlů HARDWARIO TOWER.
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- 32bitový MCU ARM Cortex M0+ STM32L083CZ (ST)
- 192 kB Flash / 20 kB RAM
- Radiový modul (868/915 MHz) založený na SPIRIT1 (ST)
- Dvojitý bezpečnostní čip ATSHA204A (Microchip)
- Převodník USB na UART FT231X (FTDI)
- LED červené barvy
- 10pinový konektor SWD pro debugování (**neosazeno**)
- Konektor USB-A pro komunikaci s hostem a/nebo napájení
- Rozsah provozního napětí: 4,5 V až 5,5 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 25 x 60 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/radio-dongle)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-usb-dongle)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73696)
