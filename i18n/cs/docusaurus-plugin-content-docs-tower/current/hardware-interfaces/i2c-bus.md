---
slug: i2c-bus
title: "Sběrnice I²C"
---
import Image from '@theme/IdealImage';

**I²C** (**I**nter-**I**ntegrated **C**ircuit) je synchronní sběrnice typu multi-controller/multi-target, která slouží ke komunikaci mezi senzory, čipy apod.

TOWER přes sběrnici I²C komunikuje s mnoha senzory. Níže najdete seznam adres I²C, které TOWER používá.

:::note

Většina senzorů má vlastní moduly SDK, takže na funkce pro I²C nejspíš narazíte, jen pokud budete vyvíjet ovladač pro nový senzor nebo čip.

:::

:::info

Práci s [**modulem SDK pro I²C**](../firmware-sdk/how-to/i2c-bus.md) popisuje samostatná kapitola.

:::

Příklady použití sběrnice I²C na platformě TOWER:
- [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)
- [**Humidity Tag**](../hardware-modules/about-humidity-tag.md)
- [**Climate Module**](../hardware-modules/about-climate-module.md)

## Sběrnice I²C na modulu Core Module {#ic-buses-on-the-core-module}
Modul **Core Module** má dvě sběrnice:

- `TWR_I2C_I2C0`: používá piny `SDA0` a `SCL0` (17, 18) v **pravém dolním rohu** modulu Core Module
- `TWR_I2C_I2C1`: používá piny `SDA1` a `SCL1` (27, 28) v **pravém horním rohu** modulu Core Module

## Adresní prostor I²C platformy TOWER {#tower-ic-address-space}

Tabulka uvádí adresy I²C používané na platformě TOWER.

:::note

  Všechny adresy jsou uvedeny v 7bitovém formátu.

:::

:::info

Adresy **0x00-0x07** a **0x78-0x7F** jsou **vyhrazené adresy** I²C a nelze je použít.

:::

| Adresa  | Čip       | Produkt TOWER                                                                                                                               | Poznámka                                |
| :------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- |
| 0x08    | NT3H2011  | **NFC Tag**                                                                                                                                 | Změněná z výchozí kvůli kolizi          |
| 0x19    | LIS2DH12  | [**Core Module**](../hardware-modules/about-core-module.md)                                                                                 | Kanál I2C0                              |
| 0x20    | TCA9534   | **IQRF Module**                                                                                                                             |                                         |
| 0x21    | TCA9534   | [**GPS Module**](../hardware-modules/about-gps-module.md)                                                                                   |                                         |
| 0x22    | TCA9534   | **RFID Module**                                                                                                                             |                                         |
| 0x23    | TCA9534   | **Infragrid Module**                                                                                                                        |                                         |
| 0x24    | TCA9534   | **Ethernet Module**                                                                                                                         |                                         |
| 0x25    | TCA9534   | **Audio Module**                                                                                                                            |                                         |
| 0x26    | TCA9534   |                                                                                                                                             | Vyhrazeno                               |
| 0x27    | TCA9534   |                                                                                                                                             | Vyhrazeno                               |
| 0x38    | TCA9534A  | [**CO2 Module**](../hardware-modules/about-co2-module.md)                                                                                   |                                         |
| 0x39    | TCA9534A  |                                                                                                                                             | Vyhrazeno                               |
| 0x3a    | TCA9534A  |                                                                                                                                             | Vyhrazeno                               |
| 0x3b    | TCA9534A  | [**Relay Module**](../hardware-modules/about-relay-module.md)                                                                               | Výchozí adresa                          |
| 0x3c    | TCA9534A  | [**LCD Module**](../hardware-modules/about-lcd-module.md)                                                                                   |                                         |
| 0x3d    | TCA9534A  |                                                                                                                                             | Vyhrazeno                               |
| 0x3e    | TCA9534A  | [**Sensor Module**](../hardware-modules/about-sensor-module.md)                                                                             | Výchozí adresa                          |
| 0x3f    | TCA9534A  | [**Relay Module**](../hardware-modules/about-relay-module.md)                                                                               | Alternativní adresa                     |
| 0x40    | SHT20     | [**Humidity Tag (R3.x+)**](../hardware-modules/about-humidity-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md) |                                         |
| 0x40    | HDC2080   | [**Humidity Tag (R2.x)**](../hardware-modules/about-humidity-tag.md)                                                                        | Výchozí adresa                          |
| 0x41    | HDC2080   | [**Humidity Tag (R2.x)**](../hardware-modules/about-humidity-tag.md)                                                                        | Alternativní adresa                     |
| 0x44    | OPT3001   | [**Lux Meter Tag**](../hardware-modules/about-lux-meter-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md)       | Výchozí adresa                          |
| 0x45    | OPT3001   | [**Lux Meter Tag**](../hardware-modules/about-lux-meter-tag.md)                                                                             | Alternativní adresa                     |
| 0x48    | TMP112    | [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md)   | Výchozí adresa                          |
| 0x49    | TMP112    | [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)                                                                         | Alternativní adresa                     |
| 0x49    | TMP112    | [**Core Module**](../hardware-modules/about-core-module.md)                                                                                 | Kanál I2C0                              |
| 0x4b    | TLA2021   | **RS-485 Module ADC**                                                                                                                       | Kanál I2C0                              |
| 0x4d    | SC16IS740 | [**CO2 Module**](../hardware-modules/about-co2-module.md)<br/>**I2C to UART bridge**                                                        | Kanál I2C0                              |
| 0x4e    | SC16IS750 | **RS-485 Module I2C to UART bridge**                                                                                                        | Kanál I2C0                              |
| 0x4f    | SC16IS750 | **RS-232 Module I2C to UART bridge**                                                                                                        | Kanál I2C0                              |
| 0x58    | SGP30     | **VOC Tag**                                                                                                                                 | Výchozí adresa                          |
| 0x5f    | HTS221    | [**Humidity Tag (R1.x)**](../hardware-modules/about-humidity-tag.md)                                                                        |                                         |
| 0x60    | MPL3115A2 | [**Barometer Tag**](../hardware-modules/about-barometer-tag.md)<br/>[**Climate Module**](../hardware-modules/about-climate-module.md)       |                                         |
| 0x64    | ATSHA204A | [**Radio Dongle**](../hardware-modules/about-radio-dongle.md)                                                                               | Kanál I2C0                              |
| 0x64    | ATSHA204A | [**Radio Dongle**](../hardware-modules/about-radio-dongle.md)                                                                               | Kanál I2C1                              |
