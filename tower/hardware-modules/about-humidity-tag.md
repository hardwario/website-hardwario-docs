---
slug: about-humidity-tag
title: About Humidity Tag
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/humidity-tag.png')} alt="Humidity Tag, a coin-sized board with the SHT20 humidity sensor" /></div>
    </div>
    <div class="col col--6">
      <p>
        The Humidity Tag uses a high-accuracy humidity sensor SHT20 with a typical accuracy of ±3 % from 20 % to 80 %. This sensor is digital and calibrated. It communicates using an I²C bus and features a very low power operation and shutdown mode.
      </p>
    </div>
  </div>
</div>

:::tip

Relative humidity is the **essential attribute** of the environment we live in. The recommended indoor range is between **30 % and 60 %**.

Values below this range (**dry air**) can lead to various **health issues**. On the other hand, the values above this range may result in **trouble with moisture**.

:::

## Features
- Integrated humidity sensor **SHT20 (Sensirion)**
- Communication using the **I²C bus**
- Measurement range: 0 % to 100 %
- Measurement accuracy: ±2 %
- Optional interrupt output
- Operating current: 10 µA
- Operating voltage range: 1.8 V to 3.3 V
- Operating temperature range: -40 to 125 °C
- Mechanical dimensions: 16 x 16 mm

## References
- [**Store**](https://www.hardwario.store/p/humidity-tag)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-humidity)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__tag__humidity)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_tag_humidity.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_tag_humidity.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=108576)
