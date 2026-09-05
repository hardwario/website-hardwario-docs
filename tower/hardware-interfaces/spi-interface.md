---
slug: spi-interface
title: SPI Interface
---
import Image from '@theme/IdealImage';

A Serial Peripheral Bus (**SPI**) is a synchronous serial bus. It’s used for fast interconnection of the peripherals inside the device. TOWER uses SPI for example in the [**LCD Module**](../hardware-modules/about-lcd-module.md).

The SPI uses these signals:

- **SCK (Serial Clock, P14 Core Module)**: SPI transfers are synchronous and need the clock signal
- **MOSI (Master Out, Slave In, P13 Core Module)**: This is serial output **from MCU to the peripheral**
- **MISO (Master In, Slave Out, P12 Core Module)**: This is serial input for data **from peripheral to MCU**
- **NSS (Negative Slave Select, P15 Core Module)**: This signal activates the slave device. It’s **active low**, that’s why the word negative. If you have multiple slave devices you have **multiple NSS signals**. It’s sometimes also called the **Chip Select CS**.

:::note

You can read [**more information about SPI**](https://www.circuitbasics.com/basics-of-the-spi-communication-protocol/).

:::


:::info

To see how the TOWER uses SPI, you can read the [**How To: SPI Bus**](../firmware-sdk/how-to/spi-bus.md).

:::
