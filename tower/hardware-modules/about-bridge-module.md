---
slug: about-bridge-module
title: About Bridge Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/bridge-module.png')} alt="Bridge Module with micro-USB connector and USB-UART converter for connecting modules to a USB host" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Bridge Module</b> provides an easy path to connect some of the TOWER modules and/or tags to the USB host like Raspberry Pi or any desktop/laptop computer.
      </p>
      <p>
        MicroUSB connector not only <b>provides communication link</b> but also <b>delivers power</b> for Bridge Module and peripherals connected to it.
      </p>
    </div>
  </div>
</div>

## Features
- Integrated USB HID to I2C/UART converter FT260
- Micro-USB connector
- Two independent I2C buses provided by I2C multiplexer TCA9543
- Red color LED (driven from FT260 GPIO pin)
- Operating voltage range: 3.0 to 3.6 V or from the USB host
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/bridge-module)
- [**Schematics**](https://github.com/hardwario/twr-hardware/tree/master/out/bc-module-bridge)
