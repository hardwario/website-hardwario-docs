---
slug: about-lcd-module
title: About LCD Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/lcd-module.png')} alt="LCD Module with the 1.28-inch Sharp memory display and two push buttons" /></div>
    </div>
    <div class="col col--6">
      <p>
        The LCD Module uses a unique technology - the so-called memory display developed by Sharp. It provides a resolution of 128 x 128 pixels in a 1.28-inch size. It implements an ultra-low-power display controller, so you can have an active graphical display with a long service time from batteries.
      </p>
      <p>
        You can control your application using the two buttons located below the LCD screen. The module is also equipped with a gesture sensor (Avago APDS-9960). This circuit, composed of the infrared transmitter and four directional photodiodes responding to different wavelengths, can also be used to measure the light intensity and color or as a proximity sensor.
      </p>
      <p>
        The LCD Module also includes six RGB LEDs that can be used to indicate the status or as a light alarm.
      </p>
    </div>
  </div>
</div>

:::tip

An example use-case for the **LCD Module** is a wireless thermostat, or it can directly **display values from various sensors** located both indoors and outdoors.

:::

## Features
- Memory LCD **LS013B7DH03 (Sharp)**
- Display resolution: **128 x 128 pixels**
- Display size: 1.28 inch
- Two **push buttons**
- Gesture sensor **APDS-9960 (Avago)**
  - Movement
  - Light intensity
  - Proximity
- 6x **miniature RGB LED**
- Typical consumption < 16 μA
- Operating voltage range: 2.7 V to 3.3 V
- Operating temperature range: -20 to 70 °C
- Dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/lcd-module-bg)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-lcd)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__module__lcd)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_lcd.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_lcd.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73740)
