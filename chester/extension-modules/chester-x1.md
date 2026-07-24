---
slug: chester-x1
title: CHESTER-X1 (8-ch 1-Wire)
---
import Image from '@theme/IdealImage';

# CHESTER-X1

This article describes the CHESTER-X1 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x1-top.png')} alt="CHESTER-X1 module, a red PCB with the DS2482-800 1-Wire master IC and channels CH1-CH8 marked along the bottom" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

CHESTER-X1 provides 8 independent 1-Wire channels allowing to connect digital  sensors ( e.g. Dallas DS18B20) or any other 1-Wire peripheries. The module implements Maxim DS2482S-800+ interface and also 5V boost converter to support 5V 1-Wire peripheries.

## CHESTER Pin Configuration Diagram

![CHESTER-X1 terminal block pinout: pins 1-8 map to 1-Wire channels CH1-CH8](images/tb-chester-x1.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description |
| -------- | ----------- | ------------------ |
| 1        | CH1         | Channel 1          |
| 2        | CH2         | Channel 2          |
| 3        | CH3         | Channel 3          |
| 4        | CH4         | Channel 4          |
| 5        | CH5         | Channel 5          |
| 6        | CH6         | Channel 6          |
| 7        | CH7         | Channel 7          |
| 8        | CH8         | Channel 8          |

## 1-Wire Parasitic Power Connection

CHESTER-X1 supports connection using parasitic powering method. In that case only 2 wires are necessary. In the parasitic mode 5.0V power supply is used. Standard 3 wire connection powering from VDD supports only 3.0V peripheries. This figure shows parasitic and standard powering method:

![Wiring comparison: 2-wire parasitic power with sensor VDD tied to GND versus 3-wire standard power from VDD](images/sc-chester-x1.png)

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x1-r3.2.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x1-r3.2.html)

![CHESTER-X1 schematic sheet 1: DS2482S-800 1-Wire master with solder-bridge routing of IO0-IO7 to channels CH1-CH8](images/hio-chester-x1-r3.2-1.png)
![CHESTER-X1 schematic sheet 2: 5.76 V boost converter, 5.0 V LDO, and I2C level shifters](images/hio-chester-x1-r3.2-2.png)

## Module Drawing

![CHESTER-X1 board outline with edge signals: +V, GP0/A0, SDA, SCL, VDD, GND on top and CH8-CH1 on bottom](images/pc-chester-x1.png)
