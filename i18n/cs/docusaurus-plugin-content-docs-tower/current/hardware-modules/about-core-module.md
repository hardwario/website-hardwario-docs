---
slug: about-core-module
title: O modulu Core Module
description: "Maximální proud pro jeden pin je 16 mA."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/core-module.png')} alt="Core Module s mikrokontrolérem STM32, sub-GHz rádiem, konektorem micro-USB a dvěma řadami zdířek" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Core Module</b> je klíčovým prvkem každého <b>zařízení TOWER</b>. Obsahuje 32bitový mikrokontrolér ARM s 192 kB flash paměti a 20 kB RAM. Kromě integrovaného <b>sub-GHz rádia pro pásmo 868/915 MHz</b> je vybaven také digitálním teplotním senzorem, 3D akcelerometrem a bezpečnostním čipem.
      </p>
    </div>
  </div>
</div>

:::caution

Maximální proud pro **jeden pin je 16 mA**.

Maximální proud pro **všechny GPIO dohromady je 90 mA**.

:::

| Pin  | Signál     | Pin MCU   | Tolerance 5 V |
| :--- | :--------- | :-------- | :------------ |
| 1    | P0/A0/TXD0 | PA0 (10)  |               |
| 2    | P1/A1/RXD0 | PA1 (11)  | Ano           |
| 3    | P2/A2/TXD1 | PA3 (13)  | Ano           |
| 4    | P3/A3/RXD0 | PA2 (12)  | Ano           |
| 5    | P4/A4/DAC0 | PA4 (14)  |               |
| 6    | P5/A5/DAC1 | PA5 (15)  |               |
| 7    | P6/RTS1    | PB1 (19)  | Ano           |
| 8    | P7/CTS1    | PA6 (16)  | Ano           |
| 9    | P8         | PB0 (18)  | Ano           |
| 10   | P9         | PB2 (20)  | Ano           |
| 21   | P10/RXD2   | PA10 (31) | Ano           |
| 22   | P11/TXD2   | PA9 (30)  | Ano           |
| 23   | P12/MISO   | PB14 (27) | Ano           |
| 24   | P13/MOSI   | PB15 (28) | Ano           |
| 25   | P14/SCLK   | PB13 (26) | Ano           |
| 26   | P15/CS     | PB12 (25) | Ano           |
| 27   | P16/SCL1   | PB8 (45)  | Ano           |
| 28   | P17/SDA1   | PB9 (46)  | Ano           |

<div class="container">
  <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../tower/hardware-modules/images/core-module-pinout.png')} alt="Schéma vývodů modulu Core Module s piny 1–28 barevně rozlišenými jako GND, napájení, řízení, GPIO, ADC, sériová linka a DAC" /></div>
    </div>
    <div class="col col--0">
    </div>
  </div>
</div>

## Vlastnosti {#features}
- 32bitový MCU ARM Cortex M0+ STM32L083CZ (ST)
- 192 kB Flash / 20 kB RAM
- Rádiový modul (868/915 MHz) založený na SPIRIT1 (ST)
- Bezpečnostní čip ATSHA204A (Microchip)
- Digitální teplotní senzor TMP112 (TI)
- 3osý akcelerometr LIS2DH12 (ST)
- LED červené barvy
- Tlačítka RESET a BOOT (BOOT je dostupné pro MCU)
- Snadné programování přes USB (bootloader DFU)
- 10pinový konektor SWD pro debugování
- Micro-USB pro komunikaci s hostitelem a/nebo napájení
- 18x GPIO (kompletně volné pro aplikaci)
- 3x UART, 2x I²C, 1x SPI, 5x ADC, 2x DAC
- Režim hlubokého spánku: < 5 µA
- Rozsah provozního napětí: 2,0 V až 3,6 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/core-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-core)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73681)
