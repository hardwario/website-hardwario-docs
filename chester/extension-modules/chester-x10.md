---
slug: chester-x10
title: CHESTER-X10 (Li-Po charger)
---
import Image from '@theme/IdealImage';

# CHESTER-X10
This article describes the CHESTER-10 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x10-top.png')} alt="CHESTER-X10 module, a red PCB dominated by the step-down converter inductor and charger circuitry" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

CHESTER-X10 is a backup power supply module for CHESTER. The primary power input is an external 6-28 VDC line (VIN). The module provides also charging the single cell Li-Pol battery. Charging current is set to 450 mA. The module comes with protected single cell Li-Pol battery 3.7V 2000 mAh. Integrated ADC convertor allows to measure the input voltage (VIN / GND) and the battery voltage (BAT+ / BAT-).

## Electrical Specification

* Input voltage range (VIN): 5-28 V
* Nominal battery voltage: 3.7 V
* Battery charging current: 450 mA
* Minimum recommended battery capacity: 1000 mAh.

## Included Battery Specification
* Model: LP103454-PCM-LD
* 3.7V 2000mAh single cell Li-Po battery
* Integrated protection circuit
* Dimension: 56.0 x 34.5 x 10.3 mm

## CHESTER Pin Configuration Diagram

![CHESTER-X10 terminal block pinout, pins 1-8: GND, BAT-, BAT-, BAT+, BAT+, GND, GND, VIN](images/tb-chester-x10.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description                    |
| -------- | ----------- | ------------------------------------- |
| 1        | GND         | System ground signal                  |
| 2        | BAT-        | Battery - (*)                         |
| 3        | BAT-        | Battery - (*)                         |
| 4        | BAT+        | Battery + (*)                         |
| 5        | BAT+        | Battery + (*)                         |
| 6        | GND         | System ground signal                  |
| 7        | GND         | System ground signal                  |
| 8        | VIN         | DC power supply voltage input (5-28V) |

*Note: Use only a single cell 3.7V Li-Pol (or Li-Ion) battery with integrated protection circuit. Do not short circuit the battery!

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x10-r1.1.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x10-r1.1.html)

![CHESTER-X10 schematic sheet 1: TPS62933 step-down converter and MCP73833 Li-Ion charger set to 450 mA](images/hio-chester-x10-r1.1-1.png)
![CHESTER-X10 schematic sheet 2: TLA2024 ADC with dividers for measuring VIN and battery voltage](images/hio-chester-x10-r1.1-2.png)

## Module Drawing

![CHESTER-X10 board outline with edge signals: +V, GP0-GP3, SDA, SCL, VDD, GND on top; VIN, GND, BAT+, BAT- on bottom](images/pc-chester-x10.png)
