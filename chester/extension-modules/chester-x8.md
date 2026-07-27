---
slug: chester-x8
title: CHESTER-X8 (Precision accel)
---
import Image from '@theme/IdealImage';

# CHESTER-X8
This article describes the CHESTER-X8 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x8-top.png')} alt="Top view of the CHESTER-X8 module with the ADXL355 3-axis accelerometer"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview
CHESTER-X8 implements precise low zero g offset 3-axis accelerometer ADXL355 providing the resolution up to 3.9 μg/LSB and measurement range ±2g, ±4g, ±8g.

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8 mapped to VDD, GND, DIO1, SCL, SDA, DIO2, GND, +V](images/tb-chester-x8.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description             |
| -------- | ----------- | ------------------------------ |
| 1        | VDD         | System VDD rail 3.0 V          |
| 2        | GND         | System ground signal           |
| 3        | DIO1        | User digital input / output #1 |
| 4        | SCL         | I2C / SCL                      |
| 5        | SDA         | I2C / SDA                      |
| 6        | DIO2        | User digital input / output #2 |
| 7        | GND         | System ground signal           |
| 8        | +V          | System positive rail (*)       |

*Note: The system positive rail voltage depends on CHESTER power supply option.

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x8-r1.0.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x8-r1.0.html)

![CHESTER-X8 R1.0 schematic: ADXL355 accelerometer on the I2C bus with interrupt outputs routed to GP0/GP1](images/hio-chester-x8-r1.0-1.png)

## Module Drawing

![CHESTER-X8 placement drawing with slot signals on top and I2C and DIO terminals on bottom](images/pc-chester-x8.png)
