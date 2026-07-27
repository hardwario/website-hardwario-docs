---
slug: chester-c1
title: CHESTER-C1 (I/O board w/ relay)
---
import Image from '@theme/IdealImage';

# CHESTER-C1
This article describes the **CHESTER-C1** carrier board.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/chester-c1-top.png')} alt="CHESTER-C1 carrier board with two power relays, C-cell battery holder, and green terminal blocks along the bottom" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Module Overview

**CHESTER-C1** is a carrier board for **CHESTER-M** implementing:
- 4x digital/analog inputs terminal
- 2x power relay
- RS-485 interfaces terminal
- Two 1-Wire terminals
- DC/DC converter
- Battery holder for 4x C-cell sized 3.6V batteries

**CHESTER-C1** fits with the Takachi WP20-28-5Cx enclosure.

## Technical Specification

* Input DC voltage range (VIN): **8-36 V**
* Supported C size battery: 1 x **Saft LSH14** or 1 x **Saft LS26500\***
* Up to 4 x C size or 3 x D size battery on request (Saft LSH20 or LS33000)
* Nominal battery voltage: **3.6 V**
* Battery idle current consumption **&lt;2 μA** (without **CHESTER-M**)

_\* Saft LS26500 cannot be used with CHESTER-M-E variant (without supercapacitors)._

For more details see [**Ordering Codes**](../ordering-codes.md#chester-m).

## Module drawing

![CHESTER-C1 board drawing with battery positions BT1-BT4, relays K1/K2, and terminal connectors JP16 to JP5](images/chester-c1.png)

## Inputs and outputs overview

| Position | Name      | Signal Description                      |
| -------- | --------- | --------------------------------------- |
| JP16     | VIN POWER | DC power supply input (VIN 8-36 V)      |
| JP8      | RELAY 1   | Relay 1 power output                    |
| JP9      | RELAY 2   | Relay 2 power output                    |
| JP11     | 1-WIRE    | 1-Wire 3-pin terminal                   |
| JP10     | 1-WIRE    | 1-Wire 3-pin terminal                   |
| JP4      | DIGITAL   | 2 x digital I/O                         |
| JP3      | ANALOG    | 2 x analog I/O + 2 x VIN                |
| JP12     | NA        | Not used                                |
| BT1-BT4  | BATTERY   | 4 x C size holder for 3.6 primary cell* |
| BT5-BT7  | BATTERY   | 3 x D size holder for 3.6 primary cell* |


_\* CHESTER-X SLOT A is by default occupied with integrated module CHESTER-X1_

_\** Use the BYPASS BUTTON to initiate start from the battery without DC input power supply_

## Pinout Description

### Block A Connectors

![Block A connector pinout, pins 1-8: +V, A, B, EN, TX, RX, VDD, GND](images/block-a.png)

### 1-Wire Connectors

![1-Wire connector pinout, pins 1-3: VDD, DQ, GND](images/1-wire.png)

### I2C Connector

![I2C connector pinout, pins 1-5: INT, SDA, SCL, VDD, GND](images/i2c.png)

### SYSTEM Connector

![SYSTEM connector pinout, pins 1-7: NC, +V, GND, VDD, SCL, SDA, INT](images/system.png)

### Block B Connectors

![Block B connector pinout, pins 1-8: +V, DI2, GND, DI1, AI2, GND, AI1, VDD](images/block-b.png)

## Schematic Diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-c1-r1.1.pdf)

<!--
- [TODO Interactive PCB connector, part, testpoint and signal browser]
-->

![CHESTER-C1 schematic sheet 1: X0 and X2 mainboard connectors, 1-Wire, SYSTEM, RS-485, relays, M-Bus, and I2C](images/hio-chester-c1-r1.1-1.png)
![CHESTER-C1 schematic sheet 2: TCA9534A GPIO expander, RGY LED, and relay driver circuits](images/hio-chester-c1-r1.1-2.png)
![CHESTER-C1 schematic sheet 3: battery C-cell/D-cell wiring, power input, and 5V step-down converter](images/hio-chester-c1-r1.1-3.png)


