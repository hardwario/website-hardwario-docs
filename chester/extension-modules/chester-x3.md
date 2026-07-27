---
slug: chester-x3
title: CHESTER-X3 (Precision ADC)
---
import Image from '@theme/IdealImage';

# CHESTER-X3

This article describes the CHESTER-X3A, CHESTER-X3B and CHESTER-X3C extension modules.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x3-top.png')} alt="Top view of the CHESTER-X3 module with two ADS122C precision ADCs"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## CHESTER-X3A Module Overview

CHESTER-X3A provides 2 inputs for RTD (resistive temperature devices) sensors, such as Pt 100 and Pt 1000. Each input supports 4 wire sensor connection to improve the accuracy.

## CHESTER-X3B Module Overview

CHESTER-X3B allows connecting 2 type-K thermocouples (types B/C/E/J/N/R/S/T support on request) using 2 wire sensor connection.

First sensor connects to **CH1A(-)** and **CH1B(+)**.
If X3B is in the **slot A**, then you have to use terminals **A2(-)** and **A3(+)**.

The second sensor connects to **CH2A(-)** and **CH2B(+)**.
If X3B is in the **slot A**, then you have to use terminals **A6(-)** and **A7(+)**.

## CHESTER-X3C Module Overview

CHESTER-X3C provides 2 inputs for load-cell (strain gauge) that can be used for weight measurements. Each channel use 4 wire connection.

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8 mapped to signals CH1P, CH1A, CH1B, CH1M, CH2P, CH2A, CH2B, CH2M](images/tb-chester-x3.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description                |
| -------- | ----------- | --------------------------------- |
| 1        | CH1P        | Channel 1: sensor positive supply |
| 2        | CH1A        | Channel 1: sensor input A         |
| 3        | CH1B        | Channel 1: sensor input B         |
| 4        | CH1M        | Channel 1: sensor negative supply |
| 5        | CH2P        | Channel 2: sensor positive supply |
| 6        | CH2A        | Channel 2: sensor input A         |
| 7        | CH2B        | Channel 2: sensor input B         |
| 8        | CH2M        | Channel 2: sensor negative supply |

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x3-r3.2.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x3-r3.2.html)

![CHESTER-X3 R3.2 schematic: two ADS122C04 ADC channels with input filtering and I2C interface](images/hio-chester-x3-r3.2-1.png)

## Module Drawing

![CHESTER-X3 placement drawing with slot signals on top and channel terminals CH1P–CH2M on bottom](images/pc-chester-x3.png)
