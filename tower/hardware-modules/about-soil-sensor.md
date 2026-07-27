---
slug: about-soil-sensor
title: About Soil Sensor
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/soil-sensor.png')} alt="Soil Moisture Sensor probe with a printed depth scale and a long cable ending in three ferruled wires" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Soil Moisture Sensor</b> is a modern, completely sealed capacitive moisture sensor with a temperature sensor. It is using 1-Wire communication protocol and has 3 wire cable that is 2 meters long. Many sensors can be connected to a single 1-Wire Master. The temperature sensor is located in the top part above the soil. The electronics are completely potted in a sealing compound to withstand all kinds of weather.
      </p>
      <p>
        The sensor returns soil moisture humidity using relative values. The sensor is very sensitive and you can get a range from 6500 when the sensor is dry and 13000 when the sensor is fully submerged in the water. Measuring is done by two copper strips inside the inner layers of the 4-layer PCB. This way the contacts are not exposed to direct humidity and do not oxidize.
      </p>
    </div>
  </div>
</div>
<br />

:::note

It is also possible to use the sensor to **measure water level**.

:::

:::info

[**Arduino Library for Soil Sensor**](https://github.com/hardwario/SoilSensor) is also available (you will also need the [**DS28E17 library**](https://github.com/hardwario/arduino-DS28E17)).

:::

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/soil-sensor-connection.png')} alt="Wiring guide: black GND, red VDD, and yellow data wires of the soil sensor on Sensor Module R1.1 and R1.0" /></div>
    </div>
    <div class="col col--6">
      <p>
      </p>
    </div>
  </div>
</div>
<br />

:::tip

We **do not recommend** putting the top part of the sensor under the ground. Ground planes in this area could affect the measurement electrodes and precision.

:::

## Features
- Soil moisture sensor
- Fully digital design
- **1-Wire bus** communication
- Possibility to connect multiple sensors in parallel
- Capacitance-to-digital converter **ZSSC3123**
- Digital **temperature sensor TMP112**
- Operating voltage range: 2.8 V to 5.5 V
- Operating temperature range: -40 to +85 °C
- Protection marking IP 68

## References
- [**Store**](https://www.hardwario.store/p/soil-sensor-set)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-soil-sensor)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__soil__sensor.html)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_soil_sensor.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_soil_sensor.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=117389)
