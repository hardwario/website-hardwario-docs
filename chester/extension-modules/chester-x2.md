---
slug: chester-x2
title: CHESTER-X2 (Serial comm)
---
import Image from '@theme/IdealImage';

# CHESTER-X2

This article describes the CHESTER-X2 extension module.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/chester-x2-top.png')} alt="Top view of the red CHESTER-X2 R3.0 extension module board" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

CHESTER-X2 provides TTL/UART interface and RS-485 interface (e.g., for Modbus communication).

## CHESTER Pin Configuration Diagram

![CHESTER-X2 terminal block pinout: GND, VDD, RX, TX, EN, B, A, +V on pins 1-8](images/tb-chester-x2.png)

## Pin Configuration and Functions

| Position | Signal Name | Signal Description       |
| -------- | ----------- | ------------------------ |
| 1        | GND         | System ground signal     |
| 2        | VDD         | System VDD rail 3.0 V    |
| 3        | RX          | UART receiver input      |
| 4        | TX          | UART transmitter output  |
| 5        | EN          | Enable input             |
| 6        | B           | Bus input/output         |
| 7        | A           | Bus input/output         |
| 8        | +V          | System positive rail (*) |

*Note: The system positive rail voltage depends on CHESTER power supply option.

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-x2-r3.0.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x2-r3.0.html)

![Schematic of CHESTER-X2 with SC16IS740 UART bridge and THVD1450 RS-485 transceiver](images/hio-chester-x2-r3.0-1.png)

## Module Drawing

![CHESTER-X2 R3.0 board layout drawing with component placement and edge pin labels](images/pc-chester-x2.png)
