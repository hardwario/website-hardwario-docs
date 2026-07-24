---
slug: about-battery-module
title: About Battery Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/battery-module.png')} alt="Battery Module top view with labeled headers; holders for four AAA cells sit on the underside" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Battery Module</b> is designed as a power supply source for the battery-operated units. The integrated low-power buck converter provides excellent efficiency from the <b>four AAA 1.5 V Alkaline cells</b>. It also features an extra <b>5-pin socket where you can connect a HARDWARIO TOWER tag</b>.
      </p>
      <p>
        If the AAA batteries are not suitable for your application, you can use the <b>external voltage input</b>, which can handle up to 10 V. You can find the external input on the two pins in the middle. These pins are compatible with the popular <b>JST connector used for Lithium batteries</b>.
      </p>
    </div>
  </div>
</div>

:::tip

If you want your device to have a smaller footprint, you can use [**Mini Battery Module**](about-mini-battery-module.md).
It will of course last less time because of just **2 batteries**.

:::

## Features
- High-efficiency buck converter **TPS62745 (TI)**
- Ultra-low quiescent current: 400 nA
- Recommended battery types:
  - **4x AAA 1.5 V Alkaline**
  - **4x AAA Eneloop NiMH**
- Output supply voltage: 3.1 V
- Battery disconnect circuit
- Battery voltage measurement using an ADC input
- <b>Prototyping area for soldering</b> custom circuits
- One extra **position for the HARDWARIO** tag****
- Operating voltage range: 3.3 to 10 V
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 88 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/battery-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-battery)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__battery)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_battery.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_battery.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73734)
