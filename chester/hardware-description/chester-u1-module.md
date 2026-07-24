---
slug: chester-u1-module
title: CHESTER-U1 Module
---
import Image from '@theme/IdealImage';

# CHESTER-U1 Module

**CHESTER-U1** is a cost-optimized **CHESTER-M** mainboard compressed to the **small 38x38mm module**.

Instead of using **CHESTER-M** and putting extension modules in it, you design a two-layer carrier board and put **CHESTER-U1** in it.

**CHESTER-U1** has these properties:

- Electrically identical to **CHESTER-M** (the same firmware binary can run without any changes)
- Cost-optimized
- Carrier board can be just a **two-layer board**
- Contains the same **Application MCU** (APP/BLE nRF52840) and **LTE** (nRF9160)
- Could be designed into **smaller enclosures**
- Can be connected to [**CHESTER-X extension**](../extension-modules/index.md) modules the same way as CHESTER-M
- Contains a **nano SIM card holder** onboard
- Connect just a **battery** and **u.Fl antenna**

![CHESTER-U1 layout](images/chester-u1-description.png)

## E-CAD Library

HARDWARIO can provide ECAD footprints for your integration.

- [**KiCad symbol, footprint, 3D model**](pathname:///download/kicad-hardwario-lib.zip)
- Eagle CAD

## Layout

![CHESTER-U1 layout](images/chester-u1-layout.png)

## Schematics

- [Schematic R1.1 (PDF)](hio-chester-u1-r1.1.pdf)

[comment]: # (PDF to PNG convert command: pdftoppm hio-chester-u1-r1.1.pdf hio-chester-u1-r1.1 -png)

### Interface

In this view, the signals are placed exactly as you look at the module from the top side. Signal placement has been optimized so you can easily route your wires on a two-layer printed circuit board.

![Schematic 1/4: CHESTER-U1 interface pinout with signals JP1–JP38 placed as seen from the module top](images/hio-chester-u1-r1.1-1.png)

### MCU
![Schematic 2/4: MDBT50Q MCU/BLE, temperature and tilt sensors, NOR flash, 1-Wire master, and LED drivers](images/hio-chester-u1-r1.1-2.png)

### LTE
![Schematic 3/4: nRF9160 LTE modem, SIM interfaces, antenna connectors, and GPS load switch](images/hio-chester-u1-r1.1-3.png)

### Power
![Schematic 4/4: TPS61023 boost converter, LDO, power LED, load switching, and TLA2021 ADC](images/hio-chester-u1-r1.1-4.png)

## CHESTER-C4 Carrier Board

We have carrier boards that can be used directly in your product with **CHESTER-U1** or you can base your own design on them. **Get in touch with us, we can provide you with more information.**

One of the carrier boards is **CHESTER-C4**, it contains a slot for two [**extension modules**](../extension-modules/index.md) and can have multiple battery or external power options.

### Bottom Side

![CHESTER-C4 bottom](images/chester-c4-bottom.png)

### Top Side

With "D" cell option.

![CHESTER-C4 top](images/chester-c4-d-top-white.png)
