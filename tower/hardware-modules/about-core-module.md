---
slug: about-core-module
title: About Core Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/core-module.png')} alt="Core Module with STM32 microcontroller, sub-GHz radio, micro-USB connector, and two socket headers" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>Core Module</b> is the key element of every <b>TOWER device</b>. It has a 32-bit ARM microcontroller with 192 kB of flash memory and 20 kB of RAM. Besides the integrated <b>sub-GHz radio for the 868/915 MHz</b> band, it also features a digital temperature sensor, 3D accelerometer, and security chip.
      </p>
    </div>
  </div>
</div>

:::caution

The maximum current for a **single pin is 16 mA**.

The maximum current for all **GPIOs combined is 90 mA**.

:::

| Pin  | Signal     | MCU Pin   | 5 V Tolerant |
| :--- | :--------- | :-------- | :----------- |
| 1    | P0/A0/TXD0 | PA0 (10)  |              |
| 2    | P1/A1/RXD0 | PA1 (11)  | Yes          |
| 3    | P2/A2/TXD1 | PA3 (13)  | Yes          |
| 4    | P3/A3/RXD0 | PA2 (12)  | Yes          |
| 5    | P4/A4/DAC0 | PA4 (14)  |              |
| 6    | P5/A5/DAC1 | PA5 (15)  |              |
| 7    | P6/RTS1    | PB1 (19)  | Yes          |
| 8    | P7/CTS1    | PA6 (16)  | Yes          |
| 9    | P8         | PB0 (18)  | Yes          |
| 10   | P9         | PB2 (20)  | Yes          |
| 21   | P10/RXD2   | PA10 (31) | Yes          |
| 22   | P11/TXD2   | PA9 (30)  | Yes          |
| 23   | P12/MISO   | PB14 (27) | Yes          |
| 24   | P13/MOSI   | PB15 (28) | Yes          |
| 25   | P14/SCLK   | PB13 (26) | Yes          |
| 26   | P15/CS     | PB12 (25) | Yes          |
| 27   | P16/SCL1   | PB8 (45)  | Yes          |
| 28   | P17/SDA1   | PB9 (46)  | Yes          |

<div class="container">
  <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/core-module-pinout.png')} alt="Core Module pinout diagram with pins 1-28 color-coded as GND, power, control, GPIO, ADC, serial, and DAC" /></div>
    </div>
    <div class="col col--0">
    </div>
  </div>
</div>

## Features
- ARM Cortex M0+ 32-bit MCU STM32L083CZ (ST)
- 192 kB Flash / 20 kB RAM
- Radio module (868/915 MHz) based on SPIRIT1 (ST)
- Security chip ATSHA204A (Microchip)
- Digital temperature sensor TMP112 (TI)
- 3-axis accelerometer LIS2DH12 (ST)
- Red color LED
- Push button RESET and BOOT (BOOT is available to MCU)
- Easily programmable via USB (DFU bootloader)
- 10-pin SWD connector for debugging
- Micro-USB for host communication and/or power
- 18x GPIO (completely free for application)
- 3x UART, 2x I²C, 1x SPI, 5x ADC, 2x DAC
- Deep sleep mode: < 5 µA
- Operating voltage range: 2.0 V to 3.6 V
- Operating temperature range: -20 to 70 °C
- Mechanical dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/core-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-core)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=73681)
