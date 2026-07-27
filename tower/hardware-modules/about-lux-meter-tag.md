---
slug: about-lux-meter-tag
title: About Lux Meter Tag
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/lux-meter-tag.png')} alt="Lux Meter Tag, a coin-sized board with the OPT3001 light-intensity sensor" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Lux Meter Tag</b> uses a high dynamic range <b>light intensity sensor OPT3001</b> that can measure illuminance from 0.01 to 83,000 lux. This sensor is digital and calibrated. It communicates using an I²C bus and features a very low power operation and shutdown mode.
      </p>
    </div>
  </div>
</div>

:::tip

You can use the sensor to **detect day and night** or it could be used as auxiliary information about someone’s presence.

:::

## Features
- Digital ambient **light sensor OPT3001 (TI)**
- Communication using the **I²C bus**
- Measures in the range from **0.01 to 83,000 lux**
- 23-bit effective dynamic range
- Optional interrupt output
- Power consumption:
  - Active current: 1.8 µA
  - Shutdown current: 0.3 µA
- Operating voltage range: 1.6 V to 3.6 V
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 16 x 16 mm

## References
- [**Store**](https://www.hardwario.store/p/lux-meter-tag)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-lux-meter)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__tag__lux__meter)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_lux_meter.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_lux_meter.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=80227)
