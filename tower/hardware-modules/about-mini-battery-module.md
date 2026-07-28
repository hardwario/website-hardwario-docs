---
slug: about-mini-battery-module
title: About Mini Battery Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/mini-battery-module.png')} alt="Mini Battery Module top view marked for two 1.5 V AAA alkaline cells; holders sit on the underside" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Mini Battery Module</b> is designed as a power supply source for <b>battery-operated units</b>. The integrated low-power boost converter provides excellent efficiency <b>from the two AAA 1.5 V Alkaline cells</b>. It features a bottom-entry socket, so the overall profile of the unit you build remains low.
      </p>
      <p>
        The load disconnect circuit can <b>disconnect the batteries if any other power supply source is connected</b> to the system (e.g. AC adapter or USB cable). The battery voltage can be measured on one of the analog inputs of the standardized header (<b>P0/A0/TXD0</b>).
      </p>
    </div>
  </div>
</div>

:::tip

If you want your device to last even longer and don't care about the footprint, you can use [**Standard Battery Module**](about-battery-module.md).

:::

## Features
- Highly efficient **DC/DC converter TPS61099 (TI)**
- Very low quiescent current &lt;5 μA
- Efficiency up to 93% at 10 mA
- Recommended types of batteries:
  - **2x AAA 1.5 V Alkaline**
  - **2x AAA Eneloop NiMH**
- Rated output voltage 3.1 V
- Circuit for disconnecting the battery
- Reverse polarity protection
- Input voltage measurement via ADC input
- Operating temperature range: -20 to 70 °C
- Dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/mini-battery-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-battery-mini)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__battery)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_battery.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_battery.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73682)
