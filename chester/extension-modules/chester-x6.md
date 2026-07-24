---
slug: chester-x6
title: CHESTER-X6 (S-Wire bus)
---
import Image from '@theme/IdealImage';

# CHESTER-X6

This article describes the CHESTER-X6 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x6-top.png')} alt="Top view of the CHESTER-X6 module with SC16IS740 UART bridge and TCA9534A expander"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview
The CHESTER-X6 provides interface for HARDWARIO S-Wire protocol targeting low-power peripherals using 3 wire connection (+5V, GND, DATA). It implements also 5V boost converter and 5V power supply output.

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8 mapped to +V, +5V, GND, DATA, DATA, GND, +5V, +V](images/tb-chester-x6.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description        |
| -------- | ----------- | ------------------------- |
| 1        | +V          | System positive rail (*)  |
| 2        | +5V         | 5.0 V power supply output |
| 3        | GND         | System ground signal      |
| 4        | DATA        | Data                      |
| 5        | DATA        | Data                      |
| 6        | GND         | System ground signal      |
| 7        | +5V         | 5.0 V power supply output |
| 8        | +V          | System positive rail (*)  |

*Note: The system positive rail voltage depends on CHESTER power supply option.

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x6-r1.0.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x6-r1.0.html)

![CHESTER-X6 R1.0 schematic: SC16IS740 I2C-UART bridge, TCA9534A expander, S-Wire line driver, and 5V boost converter](images/hio-chester-x6-r1.0-1.png)

## Module Drawing

![CHESTER-X6 placement drawing with slot signals on top and S-Wire power and DATA terminals on bottom](images/pc-chester-x6.png)
