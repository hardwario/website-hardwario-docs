---
slug: about-gps-module
title: About GPS Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/gps-module.png')} alt="GPS Module with the u-blox SAM-M8Q receiver under a square patch antenna" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>GPS Module</b> allows you to know the <b>exact position</b> of your device. It is using the <b>SAM-M8Q</b> module from ublox. It understands 3 global positioning standards GPS, Galileo and GLONASS. The <b>2.5m position accuracy</b> is possible thanks to combining positions from all three standards together.
      </p>
    </div>
  </div>
</div>

## Features
- Supports **GPS, Galileo, GLONASS**
- Position accuracy 2.5m CEP
- Communication over **I²C bus**
- Embedded antenna
- Current consumption 26mA in operation
- Integrated power switch for **low power operation**
- Cold start 26s, Aided start 2s
- Operating voltage range: 2.7V to 3.6V
- Operating temperature range: -40 to 85 °C

## References
- [**Store**](https://www.hardwario.store/p/gps-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-gps)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__gps.html)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_gps.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_gps.c)
