---
slug: spi-interface
title: Rozhraní SPI
---
import Image from '@theme/IdealImage';

Serial Peripheral Bus (**SPI**) je synchronní sériová sběrnice. Slouží k rychlému propojení periferií uvnitř zařízení. TOWER ji používá například v modulu [**LCD Module**](../hardware-modules/about-lcd-module.md).

SPI používá tyto signály:

- **SCK (Serial Clock, P14 Core Module)**: přenosy po SPI jsou synchronní a potřebují hodinový signál
- **MOSI (Master Out, Slave In, P13 Core Module)**: sériový výstup **z MCU do periferie**
- **MISO (Master In, Slave Out, P12 Core Module)**: sériový vstup pro data **z periferie do MCU**
- **NSS (Negative Slave Select, P15 Core Module)**: aktivuje podřízené zařízení (slave). Je **aktivní v nízké úrovni**, odtud slovo negative. Pokud máte víc podřízených zařízení, máte i **víc signálů NSS**. Někdy se mu říká také **Chip Select CS**.

:::note

Přečtěte si [**více informací o SPI**](https://www.circuitbasics.com/basics-of-the-spi-communication-protocol/).

:::


:::info

Jak TOWER používá SPI, popisuje kapitola [**Jak na: Sběrnice SPI**](../firmware-sdk/how-to/spi-bus.md).

:::
