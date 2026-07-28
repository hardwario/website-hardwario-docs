---
slug: about-sensor-module
title: About Sensor Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/sensor-module.png')} alt="Sensor Module with a five-pole pluggable terminal block for the universal inputs and outputs" /></div>
    </div>
    <div class="col col--6">
      <p>
        The Sensor Module features up to four universal inputs or outputs on a pluggable terminal block with 1-Wire bus master support. The terminals can be used as both analog and digital input/output. For example, you can connect various external digital, analog or resistive sensors. Also, you can communicate with other devices on a 1-Wire bus.
      </p>
      <p>
        The terminals are connected to the HARDWARIO TOWER header signals. A - P4/A4/DAC0, B - P5/A5/DAC1 and C - P7/A6.
      </p>
    </div>
  </div>
</div>

:::tip

The VCC middle pin is possible to control by software. You can enable 3 V on this pin.

:::

## Features
- Configurable terminal modes:
  - Analog input or output
  - Digital input or output
  - Pull-up resistor none/4.7 kΩ/56 Ω
- Examples interfaces:
  - Digital temperature sensor on a 1-Wire bus (DS18B20)
  - Resistance temperature sensor (Pt 100, Pt 1000, etc.)
  - Analog temperature sensor (LM35, TMP37, etc.)
  - NTC temperature sensor
  - Control of digital 1-Wire relay block
  - Button or any type of switch
  - Voltage measurement
- Plug-in 4-pin screw terminal block
- Operating voltage range: 1.65 V to 5.5 V
- Operating temperature range: -20 to 70 °C
- Dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/sensor-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-sensor)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__sensor)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_sensor.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_sensor.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73750)
