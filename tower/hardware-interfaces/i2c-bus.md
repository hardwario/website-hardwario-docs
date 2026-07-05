---
slug: i2c-bus
title: "I²C Bus"
---
import Image from '@theme/IdealImage';

**I²C** (**I**nter-**I**ntegrated **C**ircuit) is a synchronous, multi-controller/multi-target bus used for communication between sensors, chips, etc.

TOWER uses I²C Bus for a lot of sensor communication. Down below, you can find a list of I²C addresses that TOWER uses.

:::note

Most of the sensors work with their specific SDK modules so you will most likely not encounter I²C-specific functions if you don't develop some driver for a new sensor or a chip.

:::

:::info

There is a separate chapter on how to work with [**I²C SDK Module**](../firmware-sdk/how-to/i2c-bus.md)

:::

Examples of I²C bus usage in TOWER:
- [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)
- [**Humidity Tag**](../hardware-modules/about-humidity-tag.md)
- [**Climate Module**](../hardware-modules/about-climate-module.md)

## I²C Buses on the Core Module
There are two buses on the **Core Module**. They are called:

- `TWR_I2C_I2C0` - Using `SDA0` and `SCL0` (17, 18) pins in the **bottom right corner** of the Core Module
- `TWR_I2C_I2C1` - Using `SDA1` and `SCL1` (27, 28) pins in the **top right corner** of the Core Module

## TOWER I²C Address Space

The following table lists the I²C addresses used across the TOWER

:::note

  All addresses are provided in a 7-bit format.

:::

:::info

Addresses **0x00-0x07** and **0x78-0x7F** are I²C **reserved addresses** and cannot be used.

:::

| Address | Chip      | TOWER product                                                                                                                               | Remark                                  |
| :------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- |
| 0x08    | NT3H2011  | **NFC Tag**                                                                                                                                 | Changed from default to avoid collision |
| 0x19    | LIS2DH12  | [**Core Module**](../hardware-modules/about-core-module.md)                                                                                 | Channel I2C0                            |
| 0x20    | TCA9534   | **IQRF Module**                                                                                                                             |                                         |
| 0x21    | TCA9534   | [**GPS Module**](../hardware-modules/about-gps-module.md)                                                                                   |                                         |
| 0x22    | TCA9534   | **RFID Module**                                                                                                                             |                                         |
| 0x23    | TCA9534   | **Infragrid Module**                                                                                                                        |                                         |
| 0x24    | TCA9534   | **Ethernet Module**                                                                                                                         |                                         |
| 0x25    | TCA9534   | **Audio Module**                                                                                                                            |                                         |
| 0x26    | TCA9534   |                                                                                                                                             | Reserved                                |
| 0x27    | TCA9534   |                                                                                                                                             | Reserved                                |
| 0x38    | TCA9534A  | [**CO2 Module**](../hardware-modules/about-co2-module.md)                                                                                   |                                         |
| 0x39    | TCA9534A  |                                                                                                                                             | Reserved                                |
| 0x3a    | TCA9534A  |                                                                                                                                             | Reserved                                |
| 0x3b    | TCA9534A  | [**Relay Module**](../hardware-modules/about-relay-module.md)                                                                               | Default address                         |
| 0x3c    | TCA9534A  | [**LCD Module**](../hardware-modules/about-lcd-module.md)                                                                                   |                                         |
| 0x3d    | TCA9534A  |                                                                                                                                             | Reserved                                |
| 0x3e    | TCA9534A  | [**Sensor Module**](../hardware-modules/about-sensor-module.md)                                                                             | Default address                         |
| 0x3f    | TCA9534A  | [**Relay Module**](../hardware-modules/about-relay-module.md)                                                                               | Alternate address                       |
| 0x40    | SHT20     | [**Humidity Tag (R3.x+)**](../hardware-modules/about-humidity-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md) |                                         |
| 0x40    | HDC2080   | [**Humidity Tag (R2.x)**](../hardware-modules/about-humidity-tag.md)                                                                        | Default address                         |
| 0x41    | HDC2080   | [**Humidity Tag (R2.x)**](../hardware-modules/about-humidity-tag.md)                                                                        | Alternate address                       |
| 0x44    | OPT3001   | [**Lux Meter Tag**](../hardware-modules/about-lux-meter-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md)       | Default address                         |
| 0x45    | OPT3001   | [**Lux Meter Tag**](../hardware-modules/about-lux-meter-tag.md)                                                                             | Alternate address                       |
| 0x48    | TMP112    | [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md)   | Default address                         |
| 0x49    | TMP112    | [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)                                                                         | Alternate address                       |
| 0x49    | TMP112    | [**Core Module**](../hardware-modules/about-core-module.md)                                                                                 | Channel I2C0                            |
| 0x4b    | TLA2021   | **RS-485 Module ADC**                                                                                                                       | Channel I2C0                            |
| 0x4d    | SC16IS740 | [**CO2 Module**](../hardware-modules/about-co2-module.md)<br/>**I2C to UART bridge**                                                        | Channel I2C0                            |
| 0x4e    | SC16IS750 | **RS-485 Module I2C to UART bridge**                                                                                                        | Channel I2C0                            |
| 0x4f    | SC16IS750 | **RS-232 Module I2C to UART bridge**                                                                                                        | Channel I2C0                            |
| 0x58    | SGP30     | **VOC Tag**                                                                                                                                 | Default address                         |
| 0x5f    | HTS221    | [**Humidity Tag (R1.x)**](../hardware-modules/about-humidity-tag.md)                                                                        |                                         |
| 0x60    | MPL3115A2 | [**Barometer Tag**](../hardware-modules/about-barometer-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md)       |                                         |
| 0x64    | ATSHA204A | [**Radio Dongle**](../hardware-modules/about-radio-dongle.md)                                                                               | Channel I2C0                            |
| 0x64    | ATSHA204A | [**Radio Dongle**](../hardware-modules/about-radio-dongle.md)                                                                               | Channel I2C1                            |


