---
slug: chester-x5
title: CHESTER-X5 (2-ch isol 50V input)
---
import Image from '@theme/IdealImage';

# CHESTER-X5

This article describes the CHESTER-X5 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x5-top.png')} alt="Top view of the CHESTER-X5 module with two AMC3301 isolated amplifiers and an ADS122C ADC"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

CHESTER-X5 implements two **isolated** voltage inputs. Each can measure voltage from **-50 V** to **+ 50 V**.

## CHESTER Pin Configuration Diagram

![Terminal block pins 1–8: INP1 on pin 2, INM1 on pin 3, INM2 on pin 6, INP2 on pin 7, others not connected](images/tb-chester-x5.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description           |
| -------- | ----------- | ---------------------------- |
| 1        | DNC         | Reserved                     |
| 2        | INP1        | Channel 1 **positive** input |
| 3        | INM1        | Channel 1 **negative** input |
| 4        | DNC         | Reserved                     |
| 5        | DNC         | Reserved                     |
| 6        | INM2        | Channel 2 **negative** input |
| 7        | INP2        | Channel 2 **positive** input |
| 8        | DNC         | Reserved                     |

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x5-r2.1.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x5-r2.1.html)

![CHESTER-X5 R2.1 schematic: two AMC3330 isolated input channels, TPS22917 load switches, and ADS122C04 ADC](images/hio-chester-x5-r2.1-1.png)

## Module Drawing

![CHESTER-X5 placement drawing with slot signals on top and isolated input terminals INP1–INP2 on bottom](images/pc-chester-x5.png)
