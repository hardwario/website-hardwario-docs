---
slug: extension-modules
title: Extension Modules
description: "The CHESTER mainboard interfaces and the CHESTER-X extension modules that add sensor inputs, I/O, power and connectivity options."
---
import Image from '@theme/IdealImage';

# Extension Modules

The CHESTER mainboard (CHESTER-M) includes these integrated interfaces and peripherals:

* I<sup>2</sup>C bus (also featuring Sparkfun Qwiic Connect System)
* 1-Wire bus (using hardware bus driver with strong pull-up capability)
* Digital I<sup>2</sup>C thermometer
* 3-axis MEMS accelerometer
* 8 MB NOR flash memory
* 3-color RGY LED
* Push-button

The core feature of the CHESTER system is its hardware flexibility provided by the wide range of extension modules. These modules are either soldered from the bottom of the mainboard (two slots A+B are available) or connected via system I2C bus (e.g., for modules installed in the enclosure top cover).

:::tip

On the CHESTER DevKit variant, it is possible to install extension modules designated for the backside of the mainboard via spring connectors. That will allow you to quickly swap the interfaces during the development cycle. However, for the real device deployment, it is strongly recommended to have the modules soldered directly to the mainboard (HARDWARIO does the soldering).

:::

## Backside Modules

Backside modules (red modules in the picture below) further extend CHESTER functionality with more interfaces.
This extension is modular also in CHESTER-SDK development where each module has its own ZephyrRTOS driver for easy integration.

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/explode-view.png')} alt="Exploded view of CHESTER: enclosure covers, mainboard with battery, and two red extension modules on the back"/></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

Placing **X** module in the left **"A"** slot connects its signals to the two left terminal blocks **TB1** and **TB2** (see the blue square in the picture below).
Both left terminal blocks **TB1** and **TB2** are wired together in parallel so you can more easily connect multiple sensors to the same signal/power.

The same applies to the right **"B"** slot and terminals **TB5** and **TB6** (see the green square in the picture below).

When CHESTER is mounted in the enclosure, you can check the module **"X_"** number and hardware revision **"R1.0"** through the small holes when the battery is removed (see the two orange circles in the image below).

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/documentation-top.png')} alt="CHESTER-M drawing: slot A terminals TB1/TB2 in blue, slot B terminals TB5/TB6 in green, inspection holes in orange"/></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

| Module Name                       | Module Description                                                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**CHESTER-X0A**](chester-x0.md)  | Up to 4 digital and analog inputs and outputs, 4-20 mA current loop channels, 0-10 V voltage inputs, dry contact, NPN or PNP input, including 5V boost converter. |
| [**CHESTER-X0B**](chester-x0.md)  | Up to 4 digital and analog inputs and outputs, 4-20 mA current loop channels, 0-10 V voltage inputs, dry contact, NPN or PNP input, without 5V boost converter.   |
| [**CHESTER-X1**](chester-x1.md)   | Up to eight 1-Wire channels (e.g. for Dallas DS18B20 digital temperature sensors)                                                                                 |
| [**CHESTER-X2**](chester-x2.md)   | Both TTL/UART and RS-485 interface (e.g., for Modbus communication)                                                                                               |
| [**CHESTER-X3A**](chester-x3.md)  | Up to 2 RTD (resistive temperature devices) sensors, such as Pt 100 and Pt 1000                                                                                   |
| [**CHESTER-X3B**](chester-x3.md)  | Up to 2 thermocouple channels (type B/C/E/J/K/N/R/S/T)                                                                                                            |
| [**CHESTER-X3C**](chester-x3.md)  | Up to 2 load-cell (strain gauge) channels that can be used for weight measurements                                                                                |
| [**CHESTER-X4**](chester-x4.md)   | DC/DC converter providing power from an external 6-28 VDC line (features input voltage measurement)                                                               |
| [**CHESTER-X5**](chester-x5.md)   | Two channel isolated analog inputs for +/- 50 V voltage measurement                                                                                               |
| [**CHESTER-X6**](chester-x6.md)   | Interface module for our in-house S-Wire protocol targetting low-power peripherals                                                                                |
| [**CHESTER-X7**](chester-x7.md)   | 1-channel differential input converter with software-controlled 5V boost converter for current probes and other industrial sensors                                |
| [**CHESTER-X8**](chester-x8.md)   | Ultra-precise accelerometer                                                                                                                                       |
| [**CHESTER-X9**](chester-x9.md)   | 4-channel output module with smart protected switch for controlling relays and solenoids                                                                          |
| [**CHESTER-X10**](chester-x10.md) | DC/DC converter + Li-Po charger providing power from an external 6-30 VDC line (features input voltage measurement)                                               |
| [**CHESTER-X12**](chester-x12.md) | RS-232 serial interface with a dedicated 5-28 VDC power input for industrial serial devices and legacy equipment                                                  |
| [**CHESTER-X13**](chester-x13.md) | CAN Bus interface with CAN FD support and a built-in step-down converter (up to 28 V)                                                                             |
| [**CHESTER-X14**](chester-x14.md) | 10/100 Ethernet connectivity with a built-in step-down converter (up to 28 V)                                                                                     |
| [**CHESTER-K1**](chester-k1.md)   | 4-channel differential input converter with software-controlled 5V boost converter for current probes and other industrial sensors                                |

## Cover Modules

| Module Name                       | Module Description                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHESTER-A1                        | AC/DC converter for 110/230 V power supply                                                                                                                          |
| CHESTER-A1A                       | AC/DC converter for 110/230 V power supply with two 230V/16A power relays                                                                                           |
| CHESTER-G1                        | 8-channel galvanically isolated input module with isolated DC/DC power supply                                                                                       |
| CHESTER-S1                        | Environmental monitoring module with temperature, humidity, carbon dioxide (CO2), light intensity, atmospheric pressure, acoustic noise, and PIR sensors            |
| [**CHESTER-Z1**](chester-z1.md)   | Li-Ion battery backup module with DC/DC converter and charger, 6-28 VDC line or 12V solar panel input                                                               |
| [**CHESTER-Z1-F**](chester-z1.md) | Li-Ion battery backup module with DC/DC converter and charger, 6-28 VDC line or 12V solar panel input + up to 4 RGB illuminated push-buttons with acoustic feedback |

## Carrier Boards

:::info

These carrier boards require a larger enclosure.

:::

| Module Name                     | Module Description                                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHESTER-B1                      | Battery holders for up to either 6x D-cell or 8x C-cell sized batteries + off-mainboard LED                                                                                     |
| CHESTER-B1-W                    | Battery holders for up to either 6x D-cell or 8x C-cell sized batteries + off-mainboard LED + wireless M-Bus (wM-Bus)                                                           |
| [**CHESTER-C1**](chester-c1.md) | Interface board with DC/DC converter, 2x power relay, 1-Wire terminals, 4x digital/analog inputs, and RS-485 interfaces + battery holder for 4x C-cell sized batteries          |
| [**CHESTER-C5**](chester-c5.md) | Custom carrier board for the CHESTER-U1 with up to 16-ch 1-Wire, Li-Ion battery backup, DC/DC converter and charger, 6-28 VDC line or 12V solar panel input, QWIIC OLED support |

:::caution

If you did not find the relevant module for your project, contact HARDWARIO. The hardware extension development roadmap is driven by specific project needs.

:::
