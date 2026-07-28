---
slug: header-pinout
title: Header Pinout
---
import Image from '@theme/IdealImage';

The TOWER Kit emphasizes hardware **modularity** and **reusability**. To achieve such a goal, the proper interconnection system has to be used.

:::info

TOWER sticks to a well-known and widely accepted standard - the so-called headers with a 2.54 mm (0.1 inches) pitch.

:::

## Core Module pinout

:::tip

You can visit the separate chapter to learn more [**About Core Module**](./about-core-module.md).

:::

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/core-module-pinout.png')} alt="Core Module pinout diagram with pins 1-28 color-coded as GND, power, control, GPIO, ADC, serial, and DAC" /></div>
    </div>
    <div class="col col--0">
    </div>
  </div>
</div>

## Eagle Footprint Library

You can download the [**TOWER library for Eagle EDA**](https://github.com/hardwario/twr-hardware/tree/master/lbr) software which contains **Standard Module** and **Cloony** format.

## Module Drawing And Pinout

### Module Format

Format **Module** defines

- Spacing and signals between two rows of 14-pin **headers**
- Four mounting hole positions and their diameter
- Position of mechanical key (filled hole in the header) preventing reverse insertion
- Position of **sockets** from the top view
- Position of **pins** from the bottom view
- Recommended PCB height 55 mm
- Recommended PCB thickness 1.5 mm
- The radius of rounded corners 3.8 mm

### Standard Module

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/standard-module-drawing.png')} alt="Standard Module drawing: 33 x 55 mm outline, two 14-pin header rows, and mounting hole positions" /></div>
    </div>
  </div>
</div>

### Large Module

<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('./images/large-module-drawing.png')} alt="Large Module drawing: 88 x 55 mm outline, two 14-pin header rows, and mounting hole positions" /></div>
    </div>
  </div>
</div>

### Module Signals

This is a summary of basic peripherals available on the module header

- 18x [**GPIO channels**](../firmware-sdk/how-to/gpio-pins.md) (General Purpose Input/Output)
- 6x [**ADC channels**](../firmware-sdk/how-to/analog-digital-converter.md) (Analog-to-Digital Converter)
- 2x [**DAC channels**](../firmware-sdk/how-to/digital-analog-converter.md) (Digital-to-Analog Converter)
- 3x [**UART channels**](../firmware-sdk/how-to/uart-interface.md) (Universal Asynchronous Receiver Transmitter)
- 2x [**I²C bus**](../firmware-sdk/how-to/i2c-bus.md) (Inter-Integrated Circuit)
- 1x [**SPI bus**](../firmware-sdk/how-to/spi-bus.md) (Serial Peripheral Interface)

The following table defines signal assignment on the module header


| Pin  | Signal                                             | Description                                                                                  | STM32 GPIO |
| :--- | :------------------------------------------------- | :------------------------------------------------------------------------------------------- | :--------- |
| 1    | P0<br/>A0<br/>TXD0                                 | GPIO channel 0<br/>ADC channel 0<br/>UART channel 0 - TXD signal                             | PA0        |
| 2    | P1<br/>A1<br/>RXD0                                 | GPIO channel 1<br/>ADC channel 1<br/>UART channel 0 - RXD signal                             | PA1        |
| 3    | P2<br/>A2<br/>TXD1                                 | GPIO channel 2<br/>ADC channel 2<br/>UART channel 1 - TXD signal                             | PA2        |
| 4    | P3<br/>A3<br/>RXD1                                 | GPIO channel 3<br/>ADC channel 3<br/>UART channel 1 - RXD signal                             | PA3        |
| 5    | P4<br/>A4<br/>DAC0<br/>A                           | GPIO channel 4<br/>ADC channel 4<br/>DAC channel 0<br/>Sensor Module Channel A               | PA4        |
| 6    | P5<br/>A5<br/>DAC1<br/>B                           | GPIO channel 5<br/>ADC channel 5<br/>DAC channel 1<br/>Sensor Module Channel B               | PA5        |
| 7    | P6<br/>RST1                                        | GPIO channel 6<br/>UART channel 1 - RTS signal                                               | PB1        |
| 8    | P7<br/>A6<br/>CTS1<br/>C                           | GPIO channel 7<br/>ADC channel 6<br/>UART channel 1 - CTS signal<br/>Sensor Module Channel C | PA6        |
| 9    | P8                                                 | GPIO channel 8                                                                               | PB0        |
| 10   | P9                                                 | GPIO channel 9                                                                               | PB2        |
| 11   | RESET                                              | System reset                                                                                 | NRST       |
| 12   | BOOT                                               | Boot mode                                                                                    | BOOT0      |
| 13   | [**VDD_OFF**](../firmware-sdk/power-management.md) | From top side: **VDD_OFF_OUT**<br/>From bottom side: **VDD_OFF_IN**                          |            |
| 14   | [**BAT_OFF**](../firmware-sdk/power-management.md) | Battery disconnect signal                                                                    |            |
| 15   | GND                                                | System GND (ground)                                                                          |            |
| 16   | VDD                                                | System VDD (positive rail)                                                                   |            |
| 17   | SCL0                                               | I²C bus 0 - SCL signal                                                                       | PB10       |
| 18   | SDA0                                               | I²C bus 0 - SDA signal                                                                       | PB11       |
| 19   | INT                                                | System interrupt signal                                                                      | PC13       |
| 20   |                                                    | Key - no signal                                                                              |            |
| 21   | P10<br/>RXD2                                       | UART channel 2 - RXD signal                                                                  | PA10       |
| 22   | P11<br/>TXD2                                       | UART channel 2 - TXD signal                                                                  | PA9        |
| 23   | P12<br/>MISO                                       | SPI bus - MISO signal                                                                        | PB14       |
| 24   | P13<br/>MOSI                                       | SPI bus - MOSI signal                                                                        | PB15       |
| 25   | P14<br/>SCLK                                       | SPI bus - SCLK signal                                                                        | PB13       |
| 26   | P15<br/>CS                                         | SPI bus - CS signal                                                                          | PB12       |
| 27   | P16<br/>SCL1                                       | I²C bus 1 - SCL signal                                                                       | PB8        |
| 28   | P17<br/>SDA1                                       | I²C bus 1 - SDA signal                                                                       | PB9        |

:::caution

Do not connect anything on the **VDD_OFF** and **BAT_OFF** signals unless you are sure what you are doing.

:::

## Tag Drawing And Pinout

### Tag Format

The primary purpose of **tag format** is to provide signal break-out for [**I²C peripheral**](../hardware-interfaces/i2c-bus.md) in a compact form factor.
It can be anything I²C-related - e.g. **sensors**, **memories**, **RTCs**, etc.

Format **Tag** defines

- Signals on a **5-pin header** (see table below)
- Letter “D”-shaped PCB outline
- Mechanical dimensions 16 x 16 mm
- Recommended PCB thickness 1.5 mm
- The radius of rounded corners 3.8 mm

<div class="container">
  <div class="row">
    <div class="col col--3">
      <div><Image img={require('./images/tag-pinout.png')} alt="Tag pinout drawing: 16 x 16 mm outline with the 5-pin header (GND, VDD, SCL, SDA, INT)" /></div>
    </div>
  </div>
</div>

### Tag Signals

The following table defines signal assignment on the tag header:

| Pin  | Signal | Description                |
| :--- | :----- | :------------------------- |
| 1    | GND    | System GND (ground)        |
| 2    | VDD    | System VDD (positive rail) |
| 3    | SCL    | I²C bus - SCL signal       |
| 4    | SDA    | I²C bus - SDA signal       |
| 5    | INT    | System interrupt signal    |
