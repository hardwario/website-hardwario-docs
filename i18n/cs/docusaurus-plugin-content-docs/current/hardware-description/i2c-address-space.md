--- 
slug: i2c-address-space
title: Adresní prostor I²C
---
import Image from '@theme/IdealImage';

# Adresní prostor I²C {#ic-address-space}

Tento článek poskytuje přehled o přidělení 7bitových adres na sběrnici I²C.

Ke zjištění všech I²C adres senzorů na vašem zařízení CHESTER můžete použít shell příkaz [I²C scan](../firmware-sdk/how-to-i2c-bus.md#i2c-scan).

:::info

Při práci s **CHESTER SDK** obvykle nebudete muset I²C adresy vyhledávat. Vše je předdefinováno ve specifikacích **DeviceTree**. Kontrola případné kolize bude ale potřeba, pokud budete integrovat novou I²C periferii.

:::

## Tabulka přidělení {#allocation-table}

| Blok           | Adresa  | Zařízení        | Poznámka                           |
| :------------- | :-----: | :-------------- | :--------------------------------- |
| CHESTER-Z1     | `0x10`  | STM32L0         |                                    |
| CHESTER-S1     | `0x11`  | STM32L0         |                                    |
| CHESTER-M      | `0x18`  | DS2484          |                                    |
| CHESTER-M      | `0x19`  | LIS2DH12        |                                    |
| CHESTER-X8     | `0x1d`  | ADXL355         |                                    |
| CHESTER-C5     | `0x1e`  | DS2482S-800+    |                                    |
| CHESTER-X0     | `0x20`  | PCAL6416A       | Adresa ve slotu A                  |
| CHESTER-X0     | `0x21`  | PCAL6416A       | Adresa ve slotu B                  |
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
| CHESTER-X5     | `0x40`  | ADS122C04       | Adresa ve slotu A                  |
| CHESTER-X5     | `0x41`  | ADS122C04       | Adresa ve slotu B                  |
| CHESTER-M      | `0x42`  | CAM-M8Q         |                                    |
| CHESTER-M      | `0x44`  | SHT30           | Ve výchozím stavu neosazeno        |
| CHESTER-S1     | `0x44`  | SHT40-AD1B      |                                    |
| CHESTER-S2     | `0x45`  | SHT30           | Externí senzor                     |
| CHESTER-G1     | `0x45`  | OPT3001         |                                    |
| CHESTER-X3     | `0x46`  | ADS122C04 - CH1 | Adresa ve slotu A                  |
| CHESTER-X3     | `0x47`  | ADS122C04 - CH2 | Adresa ve slotu A                  |
| CHESTER-M      | `0x48`  | TMP112          |                                    |
| CHESTER-X4     | `0x49`  | TLA2021         |                                    |
| CHESTER-X10    | `0x49`  | TLA2024         |                                    |
| CHESTER-X12    | `0x49`  | TLA2021         |                                    |
| CHESTER-X99    | `0x49`  | TLA2021         |                                    |
| CHESTER-C5     | `0x49`  | TLA2024         |                                    |
| CHESTER-C6     | `0x49`  | TLA2021         |                                    |
| CHESTER-X3     | `0x4a`  | ADS122C04 - CH1 | Adresa ve slotu B                  |
| CHESTER-M      | `0x4b`  | TLA2021         |                                    |
| CHESTER-V1     | `0x4c`  | SC16IS740       |                                    |
| CHESTER-X6     | `0x4d`  | SC16IS740       |                                    |
| CHESTER-B1     | `0x4e`  | SC16IS740       |                                    |
| CHESTER-X3     | `0x4f`  | ADS122C04 - CH2 | Adresa ve slotu B                  |
| CHESTER-X2     | `0x50`  | SC16IS740       | Adresa ve slotu A                  |
| CHESTER-X2     | `0x51`  | SC16IS740       | Adresa ve slotu B                  |
| CHESTER-X12    | `0x54`  | SC16IS740IPW    |                                    |
| CHESTER-X12    | `0x55`  | SC16IS740IPW    |                                    |
| CHESTER-S1     | `0x60`  | MPL3115A2       |                                    |
| CHESTER-M      | `0x64`  | ATSHA204A       | Odstraněno v CHESTER-M R3.3        |
| CHESTER-S1     | `0x68`  | SENSEAIR-SUNRISE |                                   |
| People Counter | `0x7f`  | People Counter  | Proprietární modul Adastra Labs    |
