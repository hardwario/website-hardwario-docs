---
slug: chester-x0
title: CHESTER-X0 (4-ch input)
---
import Image from '@theme/IdealImage';

# CHESTER-X0

This article describes the CHESTER-X0 four-channel I/O extension module. Two variants are available:
* CHESTER-X0**A** including 5.0V boost converter

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x0a-top.png')} alt="CHESTER-X0A module, a red PCB with boost converter fitted in the top-left corner" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

* CHESTER-X0**B** without 5.0V boost converter

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x0b-top.png')} alt="CHESTER-X0B module, a red PCB with the boost-converter position unpopulated and solder bridges instead" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

Each channel can be used for these applications:

* Digital input and output
* Analog input and output
* Voltage input 0–26 V**\***
* Current loop 4–20 mA
* Dry contact input
* NPN and PNP input
* Power output
  * **X0A** with boost converter: 5 V
  * **X0B** w/o boost converter: standard 3.0 V (VDD solder bridge) or on request V+ battery rail (V+ solder bridge)

_\* CHESTER-M main board has on Ax and Bx terminal block pins TVS protection that starts to protect GPIO above 28 V. Theoretically you can measure higher voltage than 26 V but the protection distorts measurements or you need to request or remove these TVS._

## Electrical Specification

* Continues output current: 50 mA
* Peak output current limit: 150 mA

## Channel Schematic Diagram

Depending on the application these configuration options are available for each channel:

* Enable pull-up resistor 330 kΩ (PUX)
* Enable pull-down resistor 249 Ω (PDX)
* Enable voltage divider (gain 1/11) (100 kΩ, 10 kΩ) (CLX)
* Enable 5V boost converter (CHESTER-X0A only) (ONX)

This picture show the electric circuit of each channel:

![Single-channel circuit: CHX input with varistor, PUX pull-up, PDX pull-down, CLX divider, and ONX 5V switch to GPX/AX](images/sc-chester-x0.png)

## Configuration Table

The configuration depends on the application.

Signals PUx, CLx, PDx, ONx refers to the schematic above. Green tick ✅ means that the I2C GPIO expander or X0 sends a logic high signal to this configuration signal.
However, this is just to understand the modes. You only need to know which mode is set in the `ctr_x0_set_mode` table column.

| Application          | PUx | CLx | PDx | ONx | SDK `ctr_x0_set_mode`    |
| -------------------- | --- | --- | --- | --- | ------------------------ |
| Analog input 0-26 V  |     |     | ✅   |     | `CTR_X0_MODE_AI_INPUT`   |
| Dry contact          | ✅   |     |     |     | `CTR_X0_MODE_DEFAULT`    |
| NPN input            | ✅   |     |     |     | `CTR_X0_MODE_NPN_INPUT`  |
| PNP input            |     |     | ✅   |     | `CTR_X0_MODE_PNP_INPUT`  |
| Current loop 4-20 mA |     | ✅   | ✅   |     | `CTR_X0_MODE_CL_INPUT`   |
| Power source         |     |     |     | ✅   | `CTR_X0_MODE_PWR_SOURCE` |
| Analog output 0-VDD  |     |     |     |     | `CTR_X0_MODE_DEFAULT`    |
| Digital input        |     |     |     |     | `CTR_X0_MODE_DEFAULT`    |
| Digital output       |     |     |     |     | `CTR_X0_MODE_DEFAULT`    |

## CHESTER Pin Configuration Diagram

![CHESTER-X0 terminal block pinout, pins 1-8: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](images/tb-chester-x0.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description       |
| -------- | ----------- | ------------------------ |
| 1        | VDD         | System VDD rail 3.0 V    |
| 2        | CH1         | Channel 1                |
| 3        | GND         | System ground signal     |
| 4        | CH2         | Channel 2                |
| 5        | CH3         | Channel 3                |
| 6        | GND         | System ground signal     |
| 7        | CH4         | Channel 4                |
| 8        | +V          | System positive rail (*) |

*Note: The system positive rail voltage depends on CHESTER power supply option.

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x0-r2.0.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x0-r2.0.html)

![CHESTER-X0 schematic sheet 1: PCAL6416A GPIO expander and TPS61099 boost converter with module pin headers](images/hio-chester-x0-r2.0-1.png)
![CHESTER-X0 schematic sheet 2: configuration switch circuits for channels 1 and 2](images/hio-chester-x0-r2.0-2.png)
![CHESTER-X0 schematic sheet 3: configuration switch circuits for channels 3 and 4](images/hio-chester-x0-r2.0-3.png)

## Module Drawing
![CHESTER-X0 board outline with edge signals: +V, GP0-GP3, SDA, SCL, VDD, GND on top; +V, CH1-CH4, GND, VDD on bottom](images/pc-chester-x0.png)

## CHESTER SDK

### References

* [samples/chester_x0](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x0)
* [samples/ctr_edge_x0](https://github.com/hardwario/chester-sdk/tree/main/samples/ctr_edge_x0)
* [applications/input](https://github.com/hardwario/chester-sdk/tree/main/applications/input)
