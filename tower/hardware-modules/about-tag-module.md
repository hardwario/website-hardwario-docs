---
slug: about-tag-module
title: About Tag Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/tag-module.png')} alt="Tag Module with socket headers and three tag sockets on each of the two I2C buses" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Tag Module</b> makes it possible to connect up to <b>six HARDWARIO tags</b>.
        There are two independent I²C buses (<b>I2C0</b> and <b>I2C1</b>) - one on each side.
      </p>
    </div>
  </div>
</div>

:::info

Two independent I²C buses allow the connection of **two tags with the same I²C address** to a **single HARDWARIO TOWER node**. This is impossible without the **Tag Module**.

It also features pull-up resistors on **SDA/SCL** signals of the **I2C1 bus**.

:::

## Features
- 6x **5-pin socket position** for HARDWARIO TOWER tags
- 3x tag positions are connected to **I2C0 (right side)**
- 3x tag positions are connected to **I2C1 (left side)**
- Integrated pull-up resistors on **SDA/SCL signals of I2C1 bus**
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 44 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/tag-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-barometer)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__tag__barometer)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/inc/twr_tag_barometer.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/src/twr_tag_barometer.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=108578)

