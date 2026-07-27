---
slug: about-one-wire-slave-module
title: About 1-Wire Slave Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/1-wire-module.png')} alt="1-Wire Slave Module with a green terminal block for the 1-Wire bus and two socket headers" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>1-Wire Slave Module</b> allows you to connect I²C devices over a distance of several meters. The I²C protocol is encapsulated in a 1-Wire protocol. The data are protected using <b>16-bit CRC</b>. You can use the <b>Sensor Module</b> to create a 1-Wire bus master.
      </p>
    </div>
  </div>
</div>

## Features
- Integrated 1-Wire to I²C master bridge DS28E17 (Maxim)
- Operating voltage range: 2.5 V to 3.6 V
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 33 x 55 mm

## References
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-1-wire)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__onewire)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_onewire.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_onewire.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73837)

