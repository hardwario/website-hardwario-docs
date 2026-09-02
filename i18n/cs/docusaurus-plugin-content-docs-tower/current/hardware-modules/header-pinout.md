---
slug: header-pinout
title: Pinout konektorů
description: "TOWER Kit klade důraz na hardwarovou modularitu a znovupoužitelnost. Aby toho bylo možné dosáhnout, musí se použít vhodný systém propojení."
---
import Image from '@theme/IdealImage';

TOWER Kit klade důraz na hardwarovou **modularitu** a **znovupoužitelnost**. Aby toho bylo možné dosáhnout, musí se použít vhodný systém propojení.

:::info

TOWER se drží dobře známého a široce přijímaného standardu – takzvaných konektorů (headerů) s roztečí 2,54 mm (0,1 palce).

:::

## Pinout modulu Core Module {#core-module-pinout}

:::tip

Více informací najdete v samostatné kapitole [**O modulu Core Module**](./about-core-module.md).

:::

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/hardware-modules/images/core-module-pinout.png')} alt="Schéma pinoutu modulu Core Module s piny 1–28 barevně rozlišenými jako GND, napájení, řízení, GPIO, ADC, sériová linka a DAC" /></div>
    </div>
    <div class="col col--0">
    </div>
  </div>
</div>

## Knihovna footprintů pro Eagle {#eagle-footprint-library}

Můžete si stáhnout [**knihovnu TOWER pro software Eagle EDA**](https://github.com/hardwario/twr-hardware/tree/master/lbr), která obsahuje formáty **Standard Module** a **Cloony**.

## Výkres a pinout modulu {#module-drawing-and-pinout}

### Formát Module {#module-format}

Formát **Module** definuje

- Rozteč a signály mezi dvěma řadami 14pinových **konektorů**
- Polohu čtyř montážních otvorů a jejich průměr
- Polohu mechanického klíče (zaplněný otvor v konektoru), který brání otočenému zasunutí
- Polohu **zásuvek** při pohledu shora
- Polohu **pinů** při pohledu zespodu
- Doporučenou výšku PCB 55 mm
- Doporučenou tloušťku PCB 1,5 mm
- Poloměr zaoblených rohů 3,8 mm

### Standard Module {#standard-module}

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/standard-module-drawing.png')} alt="Výkres modulu Standard Module: obrys 33 x 55 mm, dvě řady 14pinových konektorů a polohy montážních otvorů" /></div>
    </div>
  </div>
</div>

### Large Module {#large-module}

<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('../../../../../tower/hardware-modules/images/large-module-drawing.png')} alt="Výkres modulu Large Module: obrys 88 x 55 mm, dvě řady 14pinových konektorů a polohy montážních otvorů" /></div>
    </div>
  </div>
</div>

### Signály modulu {#module-signals}

Toto je přehled základních periferií dostupných na konektoru modulu

- 18x [**GPIO kanálů**](../firmware-sdk/how-to/gpio-pins.md) (General Purpose Input/Output)
- 6x [**ADC kanálů**](../firmware-sdk/how-to/analog-digital-converter.md) (Analog-to-Digital Converter)
- 2x [**DAC kanály**](../firmware-sdk/how-to/digital-analog-converter.md) (Digital-to-Analog Converter)
- 3x [**UART kanály**](../firmware-sdk/how-to/uart-interface.md) (Universal Asynchronous Receiver Transmitter)
- 2x [**I²C sběrnice**](../firmware-sdk/how-to/i2c-bus.md) (Inter-Integrated Circuit)
- 1x [**SPI sběrnice**](../firmware-sdk/how-to/spi-bus.md) (Serial Peripheral Interface)

Následující tabulka definuje přiřazení signálů na konektoru modulu


| Pin  | Signál                                             | Popis                                                                                  | STM32 GPIO |
| :--- | :------------------------------------------------- | :------------------------------------------------------------------------------------------- | :--------- |
| 1    | P0<br/>A0<br/>TXD0                                 | GPIO kanál 0<br/>ADC kanál 0<br/>UART kanál 0 – signál TXD                             | PA0        |
| 2    | P1<br/>A1<br/>RXD0                                 | GPIO kanál 1<br/>ADC kanál 1<br/>UART kanál 0 – signál RXD                             | PA1        |
| 3    | P2<br/>A2<br/>TXD1                                 | GPIO kanál 2<br/>ADC kanál 2<br/>UART kanál 1 – signál TXD                             | PA2        |
| 4    | P3<br/>A3<br/>RXD1                                 | GPIO kanál 3<br/>ADC kanál 3<br/>UART kanál 1 – signál RXD                             | PA3        |
| 5    | P4<br/>A4<br/>DAC0<br/>A                           | GPIO kanál 4<br/>ADC kanál 4<br/>DAC kanál 0<br/>Sensor Module kanál A               | PA4        |
| 6    | P5<br/>A5<br/>DAC1<br/>B                           | GPIO kanál 5<br/>ADC kanál 5<br/>DAC kanál 1<br/>Sensor Module kanál B               | PA5        |
| 7    | P6<br/>RST1                                        | GPIO kanál 6<br/>UART kanál 1 – signál RTS                                               | PB1        |
| 8    | P7<br/>A6<br/>CTS1<br/>C                           | GPIO kanál 7<br/>ADC kanál 6<br/>UART kanál 1 – signál CTS<br/>Sensor Module kanál C | PA6        |
| 9    | P8                                                 | GPIO kanál 8                                                                               | PB0        |
| 10   | P9                                                 | GPIO kanál 9                                                                               | PB2        |
| 11   | RESET                                              | Reset systému                                                                                 | NRST       |
| 12   | BOOT                                               | Režim bootování                                                                                    | BOOT0      |
| 13   | [**VDD_OFF**](../firmware-sdk/power-management.md) | Z horní strany: **VDD_OFF_OUT**<br/>Ze spodní strany: **VDD_OFF_IN**                          |            |
| 14   | [**BAT_OFF**](../firmware-sdk/power-management.md) | Signál odpojení baterie                                                                    |            |
| 15   | GND                                                | Systémová GND (zem)                                                                          |            |
| 16   | VDD                                                | Systémové VDD (kladná větev)                                                                   |            |
| 17   | SCL0                                               | I²C sběrnice 0 – signál SCL                                                                       | PB10       |
| 18   | SDA0                                               | I²C sběrnice 0 – signál SDA                                                                       | PB11       |
| 19   | INT                                                | Systémový signál přerušení                                                                      | PC13       |
| 20   |                                                    | Klíč – bez signálu                                                                              |            |
| 21   | P10<br/>RXD2                                       | UART kanál 2 – signál RXD                                                                  | PA10       |
| 22   | P11<br/>TXD2                                       | UART kanál 2 – signál TXD                                                                  | PA9        |
| 23   | P12<br/>MISO                                       | SPI sběrnice – signál MISO                                                                        | PB14       |
| 24   | P13<br/>MOSI                                       | SPI sběrnice – signál MOSI                                                                        | PB15       |
| 25   | P14<br/>SCLK                                       | SPI sběrnice – signál SCLK                                                                        | PB13       |
| 26   | P15<br/>CS                                         | SPI sběrnice – signál CS                                                                          | PB12       |
| 27   | P16<br/>SCL1                                       | I²C sběrnice 1 – signál SCL                                                                       | PB8        |
| 28   | P17<br/>SDA1                                       | I²C sběrnice 1 – signál SDA                                                                       | PB9        |

:::caution

Na signály **VDD_OFF** a **BAT_OFF** nic nepřipojujte, pokud si nejste jisti, co děláte.

:::

## Výkres a pinout formátu Tag {#tag-drawing-and-pinout}

### Formát Tag {#tag-format}

Hlavním účelem **formátu Tag** je vyvedení signálů [**I²C periferie**](../hardware-interfaces/i2c-bus.md) v kompaktním provedení.
Může jít o cokoli souvisejícího s I²C – např. **senzory**, **paměti**, **RTC** atd.

Formát **Tag** definuje

- Signály na **5pinovém konektoru** (viz tabulka níže)
- Obrys PCB ve tvaru písmene „D“
- Mechanické rozměry 16 x 16 mm
- Doporučenou tloušťku PCB 1,5 mm
- Poloměr zaoblených rohů 3,8 mm

<div class="container">
  <div class="row">
    <div class="col col--3">
      <div><Image img={require('../../../../../tower/hardware-modules/images/tag-pinout.png')} alt="Výkres pinoutu formátu Tag: obrys 16 x 16 mm s 5pinovým konektorem (GND, VDD, SCL, SDA, INT)" /></div>
    </div>
  </div>
</div>

### Signály formátu Tag {#tag-signals}

Následující tabulka definuje přiřazení signálů na konektoru Tag:

| Pin  | Signál | Popis                      |
| :--- | :----- | :------------------------- |
| 1    | GND    | Systémová GND (zem)        |
| 2    | VDD    | Systémové VDD (kladná větev) |
| 3    | SCL    | I²C sběrnice – signál SCL  |
| 4    | SDA    | I²C sběrnice – signál SDA  |
| 5    | INT    | Systémový signál přerušení |
