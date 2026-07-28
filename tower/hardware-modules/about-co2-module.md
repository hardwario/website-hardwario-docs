---
slug: about-co2-module
title: About CO₂ Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/co2-module.png')} alt="CO2 Module with the SenseAir NDIR carbon-dioxide sensor and a backup supercapacitor" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>CO₂ Module</b> is a gas sensor for measuring the <b>carbon dioxide (CO₂) concentration</b>. This module achieves ±50 ppm accuracy. It uses a <a href="https://en.wikipedia.org/wiki/Carbon_dioxide_sensor"><b>non-dispersive infrared (NDIR) sensor</b></a> manufactured in Sweden. Thanks to its <b>low-power operation</b> it can be powered by batteries for years.
      </p>
      <p>
        We have equipped the <b>LP8 sensor</b> with additional circuitry for efficient power management and <b>I²C-only interfacing</b>. This module also features three 5-pin sockets allowing you to <b>connect HARDWARIO tags</b>.
      </p>
    </div>
  </div>
</div>

:::info

Carbon dioxide (or CO₂) is a colorless and odorless gas that is vital to life on Earth. Its nominal concentration is about **400 ppm (0.04 %)**. There are many occurrences of CO₂ in nature. For example, **humans produce CO₂ when exhaling**.

:::

## Features
- Carbon dioxide (CO₂) **sensor LP8 (SenseAir)**
- [**Non-dispersive infrared (NDIR) technology**](https://en.wikipedia.org/wiki/Carbon_dioxide_sensor)
- Measurement range of CO₂: **0 to 10 000 ppm**
- Measurement accuracy: ±50 ppm CO₂ ±3 % of reading (Note 1)
- I²C-only interface (integrated UART bridge and I/O expander)
- Constant current source for 470 mF supercap
- 3 sockets for a HARDWARIO TOWER tag
- Low power consumption:
  - **6 µA (6 measurements per hour)**
  - **61 µA (1 measurement per minute)**
- Operating voltage range: 3 V to 3.6 V
- Operating temperature range: 0 to 50 °C
- Mechanical dimensions: 88 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/co2-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-co2)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__co2)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_co2.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_co2.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73699)
