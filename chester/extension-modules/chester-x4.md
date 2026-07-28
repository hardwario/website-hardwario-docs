---
slug: chester-x4
title: CHESTER-X4 (Step-down 4-ch)
---
import Image from '@theme/IdealImage';

# CHESTER-X4

This article describes the CHESTER-X4 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x4-top.png')} alt="Top view of the CHESTER-X4 module with the TPS62175 step-down converter"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview
CHESTER-X4 implements a step-down DC/DC converter providing power from an external 6-28 VDC line (VIN). It allows also the input voltage measurement. This module has also 4 P-MOS switches allowing to supply of independent loads from VIN voltage input.

## Output Protection
Each of the four outputs has a resetable PTC fuse protection (femtoSMDC005F). Each output can **reliably supply 50 mA of constant current**. The trip current is around 150 mA.

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8 mapped to GND, CH1, CH2, CH3, CH4, GND, GND, VIN](images/tb-chester-x4.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description                    |
| -------- | ----------- | ------------------------------------- |
| 1        | GND         | System ground signal                  |
| 2        | CH1         | Channel 1 voltage output switch       |
| 3        | CH2         | Channel 2 voltage output switch       |
| 4        | CH3         | Channel 3 voltage output switch       |
| 5        | CH4         | Channel 3 voltage output switch       |
| 6        | GND         | System ground signal                  |
| 7        | GND         | System ground signal                  |
| 8        | VIN         | DC power supply voltage input (6-28V) |

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x4-r3.1.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x4-r3.1.html)

![CHESTER-X4 R3.1 schematic: TPS62175 step-down converter, TLA2021 ADC, and four fused P-MOS output switches](images/hio-chester-x4-r3.1-1.png)

## Module Drawing

![CHESTER-X4 placement drawing with slot signals on top and VIN, GND, and CH1–CH4 terminals on bottom](images/pc-chester-x4.png)
