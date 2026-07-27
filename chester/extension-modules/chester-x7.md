---
slug: chester-x7
title: CHESTER-X7 (1-ch diff input)
---
import Image from '@theme/IdealImage';

# CHESTER-X7

This article describes the CHESTER-X7 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x7-top.png')} alt="Top view of the CHESTER-X7 module with its input amplifier and boost converter circuitry"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview
The CHESTER-X7 provides one differential input for current probes or other industrial sensors and one single ended voltage input up to 28 V. The module implements also 5V boost converter allows powering the current probes.

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8 mapped to +V, GND, VDD, VIN, GND, INP, INM, VOUT](images/tb-chester-x7.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description          |
| -------- | ----------- | --------------------------- |
| 1        | +V          | System positive rail (*)    |
| 2        | GND         | System ground signal        |
| 3        | VDD         | System VDD rail 3.0 V       |
| 4        | VIN         | Voltage input (0 - 28V)     |
| 5        | GND         | System ground signal        |
| 6        | INP         | Positive differential input |
| 7        | INM         | Negative differential input |
| 8        | VOUT        | 5.0 V power supply output   |

*Note: The system positive rail voltage depends on CHESTER power supply option.

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x7-r2.1.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x7-r2.1.html)

![CHESTER-X7 R2.1 schematic page 1: TPS61099 5V step-up converter and LDO supplying the VOUT probe power](images/hio-chester-x7-r2.1-1.png)
![CHESTER-X7 R2.1 schematic page 2: OPA4387 differential input buffers and 0-28 V voltage input divider](images/hio-chester-x7-r2.1-2.png)

## Module Drawing

![CHESTER-X7 placement drawing with slot signals on top and VOUT, INM, INP, VIN terminals on bottom](images/pc-chester-x7.png)
