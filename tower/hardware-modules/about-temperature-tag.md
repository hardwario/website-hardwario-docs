---
slug: about-temperature-tag
title: About Temperature Tag
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/temperature-tag.png')} alt="Temperature Tag, a coin-sized board with the TMP112 temperature sensor" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Temperature Tag</b> uses a high-accuracy temperature sensor <b>TMP112</b> with a typical accuracy of <b>±0.1 °C at 25 °C</b>. This sensor is digital and calibrated. It communicates using an <b>I²C bus</b> and features a very low power operation and shutdown mode.
      </p>
    </div>
  </div>
</div>

## Features
- Integrated temperature sensor **TMP112 (TI)**
- Communication using the **I²C bus**
- **Temperature accuracy (typical values):**
  - ±0.1 °C at 25 °C
  - ±0.25 °C in the range from 0 °C to 65 °C
- ±0.5 °C in the range from -40 °C to 125 °C
- **12-bit resolution (0.0625 °C)**
- Optional interrupt output
- **Power consumption:**
  - 7 µA active current (4 Hz sample rate)
  - 0.5 µA shutdown current
- Operating voltage range: 1.4 V to 3.6 V
- Operating temperature range: -40 to 125 °C
- Mechanical dimensions: 16 x 16 mm

## References
- [**Store**](https://www.hardwario.store/p/temperature-tag)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-temperature)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__tag__temperature)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_temperature.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_temperature.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=108577)
