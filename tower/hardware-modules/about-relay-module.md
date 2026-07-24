---
slug: about-relay-module
title: About Relay Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/relay-module.png')} alt="Relay Module with a bistable relay and a three-pole terminal block" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Relay Module</b> is suitable for switching <b>small power appliances</b> - e.g. LED strip, cooling fan, siren, buzzer, garage door opener, etc. It features a <b>bistable (or latching) relay</b> and that makes it suitable for battery-operated applications - the relay simply <b>remembers its state</b>.
      </p>
      <p>
        The energy is needed only during the transition state. Once the new state has been set, it is <b>not necessary to energize the relay’s coil anymore</b>. The switching period is indicated using the <b>green LED</b> (in software referred to as <b>TRUE</b> state), or <b>red LED</b> (in software referred to as <b>FALSE</b> state).
      </p>
    </div>
  </div>
</div>

## Features
- **Bistable (latching) relay** for switching loads up to 60 W:
  - **12 V DC / 5 A**
  - **24 V DC / 2.5 A**
- Control using **I²C bus**
- Suitable for **battery-operated applications**
- Energy for the coil is needed only during the transition states
- **Red and green** LEDs indicate the coil energizing
- Operating voltage range: 3.0 to 3.6 V
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/relay-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-relay)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__relay)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_relay.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_relay.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73841)
