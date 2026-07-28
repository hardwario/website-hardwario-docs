---
slug: /hardware
title: Hardware Description
---

import Image from '@theme/IdealImage';

# TAPPER Hardware Description

In this article, you will find the details about the TAPPER hardware configuration.

## Basic Parameters

| **Electrical**                       |                           |
| :----------------------------------- | ------------------------: |
| Minimal supply voltage               |                      10 V |
| Maximum supply voltage               |                      30 V |
| Typical power consumption            |                     1.4 W |
| Maximum power consumption            |                     2.5 W |
| **Inputs**                           |                           |
| Terminal block nominal cross section |        1.5 mm<sup>2</sup> |
| DC power Jack                        |               1.35x3.5 mm |
| **Outputs**                          |                           |
| RGB LED                              | 355 mcd, 710 mcd, 140 mcd |
| Buzzer                               |          80 dBA / 2.7 kHz |
| **Physical**                         |                           |
| Enclosure dimensions                 |            155x84x21.3 mm |
| Enclosure material                   |        ASA+PC (UL 94 V-0) |
| Enclosure protection class           |                      IP40 |
| Enclosure colour                     |    traffic white RAL 9016 |
| Operation temperature                |          -20 °C to +60 °C |

## Schematic Diagram

- [Schematic R1.1 (PDF)](media/hio-tapper-r1.1-schematic.pdf)

### Power

![TAPPER R1.1 power schematic: 10-30 V input via terminal block or DC jack, L6981CDR buck converter producing 5 V](images/hio-tapper-r1.1-schematic-1.png)

### Raspberry Pi + PN532 Breakout Board

![TAPPER R1.1 schematic: Raspberry Pi Zero 2 W GPIO wiring to the PN532 breakout board over SPI](images/hio-tapper-r1.1-schematic-2.png)

### Peripherals

![TAPPER R1.1 peripherals schematic: transistor-driven RGB LED and buzzer, plus the tamper switch input](images/hio-tapper-r1.1-schematic-3.png)
