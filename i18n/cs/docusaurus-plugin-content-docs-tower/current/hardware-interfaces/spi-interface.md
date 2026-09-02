---
slug: spi-interface
title: Rozhraní SPI
description: "Serial Peripheral Bus (SPI) je synchronní sériová sběrnice. Používá se pro rychlé propojení periferií uvnitř zařízení. TOWER využívá SPI například v LCD Module."
---
import Image from '@theme/IdealImage';

Serial Peripheral Bus (**SPI**) je synchronní sériová sběrnice. Používá se pro rychlé propojení periferií uvnitř zařízení. TOWER využívá SPI například v [**LCD Module**](../hardware-modules/about-lcd-module.md).

SPI používá tyto signály:

- **SCK - Serial Clock (P14 Core Module)** - přenosy po SPI jsou synchronní a potřebují hodinový signál
- **MOSI - Master Out, Slave In (P13 Core Module)** - toto je sériový výstup **z MCU do periferie**
- **MISO - Master In, Slave Out (P12 Core Module)** - toto je sériový vstup pro data **z periferie do MCU**
- **NSS - Negative Slave Select (P15 Core Module)** - tento signál aktivuje zařízení slave. Je **aktivní v nízké úrovni**, proto to slovo negative. Pokud máte více zařízení slave, máte **více signálů NSS**. Někdy se také označuje jako **Chip Select CS**.

:::note

Můžete si přečíst [**více informací o SPI**](https://www.circuitbasics.com/basics-of-the-spi-communication-protocol/).

:::


:::info

Jak TOWER používá SPI, se dozvíte v článku [**How To: SPI Bus**](../firmware-sdk/how-to/spi-bus.md).

:::
