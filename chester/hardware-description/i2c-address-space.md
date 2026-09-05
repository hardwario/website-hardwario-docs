---
slug: i2c-address-space
title: I²C Address Space
---
import Image from '@theme/IdealImage';

# I²C Address Space

This article provides an overview of the 7-bit address allocation on the I²C bus.

To check all the I²C addresses of sensors on your CHESTER, you can use the [I²C scan](../firmware-sdk/how-to-i2c-bus.md#i2c-scan) shell command.

:::info

Typically, you will not need to search for the I²C addresses while working with the **CHESTER SDK**. Everything is pre-defined in the **DeviceTree** specifications. However, you will need to check for the potential collision if you need to integrate a new I²C peripheral.

:::

## Allocation Table

| Block          | Address | Device          | Remark                             |
| :------------- | :-----: | :-------------- | :--------------------------------- |
| CHESTER-Z1     | `0x10`  | STM32L0         |                                    |
| CHESTER-S1     | `0x11`  | STM32L0         |                                    |
| CHESTER-M      | `0x18`  | DS2484          |                                    |
| CHESTER-M      | `0x19`  | LIS2DH12        |                                    |
| CHESTER-X8     | `0x1d`  | ADXL355         |                                    |
| CHESTER-C5     | `0x1e`  | DS2482S-800+    |                                    |
| CHESTER-X0     | `0x20`  | PCAL6416A       | Address in slot A                  |
| CHESTER-X0     | `0x21`  | PCAL6416A       | Address in slot B                  |
| CHESTER-Z1     | `0x32`  | LP55231SQ       |                                    |
| CHESTER-Z1     | `0x33`  | LP55231SQ       |                                    |
| CHESTER-S1     | `0x33`  | MLX90640        |                                    |
| CHESTER-R1     | `0x38`  | TCA9534A        |                                    |
| CHESTER-X6     | `0x39`  | TCA9534A        |                                    |
| CHESTER-A      | `0x3a`  | TCA9534A        |                                    |
| CHESTER-G      | `0x3b`  | TCA9534A        |                                    |
| CHESTER-G      | `0x3c`  | TCA9534A        |                                    |
| CHESTER-S1     | `0x3c`  | TCA9534A        |                                    |
| CHESTER-K1     | `0x3d`  | TCA9534A        |                                    |
| CHESTER-S1     | `0x3d`  | TCA9534A        |                                    |
| CHESTER-C1     | `0x3e`  | TCA9534A        |                                    |
| CHESTER-B1     | `0x3e`  | TCA9534A        |                                    |
| CHESTER-C5     | `0x3e`  | TCA9534A        |                                    |
| CHESTER-B1     | `0x3f`  | TCA9534A        |                                    |
| CHESTER-X5     | `0x40`  | ADS122C04       | Address in slot A                  |
| CHESTER-X5     | `0x41`  | ADS122C04       | Address in slot B                  |
| CHESTER-M      | `0x42`  | CAM-M8Q         |                                    |
| CHESTER-M      | `0x44`  | SHT30           | Not populated by default           |
| CHESTER-S1     | `0x44`  | SHT40-AD1B      |                                    |
| CHESTER-S2     | `0x45`  | SHT30           | External sensor                    |
| CHESTER-G1     | `0x45`  | OPT3001         |                                    |
| CHESTER-X3     | `0x46`  | ADS122C04 (CH1) | Address in slot A                  |
| CHESTER-X3     | `0x47`  | ADS122C04 (CH2) | Address in slot A                  |
| CHESTER-M      | `0x48`  | TMP112          |                                    |
| CHESTER-X4     | `0x49`  | TLA2021         |                                    |
| CHESTER-X10    | `0x49`  | TLA2024         |                                    |
| CHESTER-X12    | `0x49`  | TLA2021         |                                    |
| CHESTER-X99    | `0x49`  | TLA2021         |                                    |
| CHESTER-C5     | `0x49`  | TLA2024         |                                    |
| CHESTER-C6     | `0x49`  | TLA2021         |                                    |
| CHESTER-X3     | `0x4a`  | ADS122C04 (CH1) | Address in slot B                  |
| CHESTER-M      | `0x4b`  | TLA2021         |                                    |
| CHESTER-V1     | `0x4c`  | SC16IS740       |                                    |
| CHESTER-X6     | `0x4d`  | SC16IS740       |                                    |
| CHESTER-B1     | `0x4e`  | SC16IS740       |                                    |
| CHESTER-X3     | `0x4f`  | ADS122C04 (CH2) | Address in slot B                  |
| CHESTER-X2     | `0x50`  | SC16IS740       | Address in slot A                  |
| CHESTER-X2     | `0x51`  | SC16IS740       | Address in slot B                  |
| CHESTER-X12    | `0x54`  | SC16IS740IPW    |                                    |
| CHESTER-X12    | `0x55`  | SC16IS740IPW    |                                    |
| CHESTER-S1     | `0x60`  | MPL3115A2       |                                    |
| CHESTER-M      | `0x64`  | ATSHA204A       | Removed in CHESTER-M R3.3          |
| CHESTER-S1     | `0x68`  | SENSEAIR-SUNRISE |                                   |
| People Counter | `0x7f`  | People Counter  | Proprietary module of Adastra Labs |
