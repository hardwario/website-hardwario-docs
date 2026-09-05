---
slug: about-power-module
title: About Power Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/power-module.png')} alt="Power Module with high-current relay, DC barrel jack, and terminal block for a digital LED strip" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Power Module</b> allows you to connect a 5 V DC power adapter via a standard 2.1 mm power jack socket. It features a <b>high-current relay</b> (230 V AC / 16 A) to control your appliances. Also you can drive a <b>digital LED strip</b> with it (compatible with WS2812B).
      </p>
      <p>
        This module can power a HARDWARIO TOWER Industrial IoT Kit node thanks to its integrated LDO regulator. The LDO generates 3.3 V output from the 5 V input.
      </p>
      <p>
        Reliability is important, and that’s why we have implemented a smart over-voltage, under-voltage and reverse polarity protection on the power jack input. This feature guarantees the input voltage range to always stay within the proper limits.
      </p>
    </div>
  </div>
</div>

:::caution

The maximum allowed current is **6 A**.

:::


## Features
- 5 V DC power adapter input (2.1 mm jack)
- Input voltage range: 4.2 V to 5.8 V
- **High-current relay output** (230 V AC / 16 A)
- Integrated LDO with 3.3 V output voltage
- **Addressable/digital RGB(W) LED strip output**
- Integrated voltage translator (3.3 V to 5 V)
- 2x position for a HARDWARIO TOWER tag
- **Over-voltage**, **under-voltage** and reverse polarity protection
- Pluggable 3-pin terminal block for relay output
- Pluggable 3-pin terminal block for digital LED strip
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 88 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/power-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-power)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__power)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_power.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_power.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73717)
