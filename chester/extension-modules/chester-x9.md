---
slug: chester-x9
title: CHESTER-X9 (4-ch output)
---
import Image from '@theme/IdealImage';

# CHESTER-X9

This article describes the CHESTER-X9 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x9-top.png')} alt="Top view of the CHESTER-X9 module with four low-side switch ICs"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

CHESTER-X9 provides 4 low side switches witch current limit capable to control the load from an external voltage source.

## Electrical Specification

* Maximal voltage: 28 V
* Continues load current: 2 A
* Peak current limit: 5 A

## Switch Load Connection Diagram

The load have to be connected between external voltage source and the low side switch output (channel 1-4) according to the diagram:

![Wiring diagram: load connected between the external 3-28 V source and a CHESTER-X9 channel switch output](images/sc-chester-x9.png)

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8 alternating GND with switch outputs CH1, CH2, CH3, CH4](images/tb-chester-x9.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description      |
| -------- | ----------- | ----------------------- |
| 1        | GND         | System ground signal    |
| 2        | CH1         | Channel 1 switch output |
| 3        | GND         | System ground signal    |
| 4        | CH2         | Channel 1 switch output |
| 5        | GND         | System ground signal    |
| 6        | CH3         | Channel 1 switch output |
| 7        | GND         | System ground signal    |
| 8        | CH4         | Channel 1 switch output |

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x9-r1.0.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x9-r1.0.html)

![CHESTER-X9 R1.0 schematic: four NCV8412 low-side switches driven by GP0–GP3 signals](images/hio-chester-x9-r1.0-1.png)

## Module Drawing

![CHESTER-X9 placement drawing with slot signals on top and GND/CH1–CH4 terminals on bottom](images/pc-chester-x9.png)
