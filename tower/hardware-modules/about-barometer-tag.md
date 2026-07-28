---
slug: about-barometer-tag
title: About Barometer Tag
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/barometer-tag.png')} alt="Barometer Tag, a coin-sized board with the MPL3115A2 pressure sensor" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Barometer Tag</b> allows you to measure absolute pressure in the range from <b>20 kPa</b> to <b>110 kPa</b>, or altitude above sea level in meters. It uses a <b>low-power I²C sensor MPL3115A2</b> with an absolute accuracy of ±0.4 kPa. It features a very low active and standby current.
      </p>
      <p>
        Monitoring of absolute pressure is useful for <b>weather forecast</b> and it is also an important parameter in biometeorology because absolute pressure <b>can affect our health.</b>
      </p>
    </div>
  </div>
</div>

## Features
- Absolute pressure sensor **MPL3115A2 (NXP)**
- The sensor only needs an I²C bus
- Pressure range: from 20 kPa to 110 kPa
- Altitude range: from -698 to 11,775 m
- Absolute accuracy: ±0.4 kPa
- Optional interrupt output
- Power consumption:
  - 40 µA average current (1 Hz sample rate)
  - 2 µA standby current
- Operating voltage range: 2.0 V to 3.6 V
- Operating temperature range: -40 to 85 °C
- Mechanical dimensions: 16 x 16 mm

## References
- [**Store**](https://www.hardwario.store/p/barometer-tag)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-tag-barometer)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__tag__barometer)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/inc/twr_tag_barometer.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/HEAD/twr/src/twr_tag_barometer.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=108578)
