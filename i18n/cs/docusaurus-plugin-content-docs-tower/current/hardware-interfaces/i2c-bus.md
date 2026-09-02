---
slug: i2c-bus
title: "I²C Bus"
description: "TOWER využívá sběrnici I²C pro velkou část komunikace se senzory. Níže najdete seznam I²C adres, které TOWER používá."
---
import Image from '@theme/IdealImage';

**I²C** (**I**nter-**I**ntegrated **C**ircuit) je synchronní sběrnice typu multi-controller/multi-target používaná pro komunikaci mezi senzory, čipy atd.

TOWER využívá sběrnici I²C pro velkou část komunikace se senzory. Níže najdete seznam I²C adres, které TOWER používá.

:::note

Většina senzorů pracuje se svými specifickými SDK moduly, takže se s funkcemi specifickými pro I²C nejspíš nesetkáte, pokud nevyvíjíte ovladač pro nový senzor nebo čip.

:::

:::info

Práci s [**I²C SDK modulem**](../firmware-sdk/how-to/i2c-bus.md) popisuje samostatná kapitola.

:::

Příklady použití sběrnice I²C v TOWER:
- [**Temperature Tag**](../hardware-modules/about-temperature-tag.md)
- [**Humidity Tag**](../hardware-modules/about-humidity-tag.md)
- [**Climate Module**](../hardware-modules/about-climate-module.md)

## Sběrnice I²C na Core Module {#ic-buses-on-the-core-module}
Na **Core Module** jsou dvě sběrnice. Jmenují se:

- `TWR_I2C_I2C0` – používá piny `SDA0` a `SCL0` (17, 18) v **pravém dolním rohu** Core Module
- `TWR_I2C_I2C1` – používá piny `SDA1` a `SCL1` (27, 28) v **pravém horním rohu** Core Module

## Adresní prostor I²C v TOWER {#tower-ic-address-space}

Následující tabulka uvádí I²C adresy používané v rámci TOWER.

:::note

  Všechny adresy jsou uvedeny v 7bitovém formátu.

:::

:::info

Adresy **0x00-0x07** a **0x78-0x7F** jsou I²C **vyhrazené adresy** a nelze je použít.

:::

| Adresa  | Čip       | Produkt TOWER                                                                                                                               | Poznámka                                |
| :------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- |
| 0x08    | NT3H2011  | **NFC Tag**                                                                                                                                 | Změněno z výchozí kvůli kolizi          |
| 0x19    | LIS2DH12  | [**Core Module**](../hardware-modules/about-core-module.md)                                                                                 | Kanál I2C0                              |
| 0x20    | TCA9534   | **IQRF Module**                                                                                                                             |                                         |
| 0x21    | TCA9534   | [**GPS Module**](../hardware-modules/about-gps-module.md)                                                                                   |                                         |
| 0x22    | TCA9534   | **RFID Module**                                                                                                                             |                                         |
| 0x23    | TCA9534   | **Infragrid Module**                                                                                                                        |                                         |
| 0x24    | TCA9534   | **Ethernet Module**                                                                                                                         |                                         |
| 0x25    | TCA9534   | **Audio Module**                                                                                                                            |                                         |
| 0x26    | TCA9534   |                                                                                                                                             | Rezervováno                             |
| 0x27    | TCA9534   |                                                                                                                                             | Rezervováno                             |
| 0x38    | TCA9534A  | [**CO2 Module**](../hardware-modules/about-co2-module.md)                                                                                   |                                         |
| 0x39    | TCA9534A  |                                                                                                                                             | Rezervováno                             |
| 0x3a    | TCA9534A  |                                                                                                                                             | Rezervováno                             |
| 0x3b    | TCA9534A  | [**Relay Module**](../hardware-modules/about-relay-module.md)                                                                               | Výchozí adresa                          |
| 0x3c    | TCA9534A  | [**LCD Module**](../hardware-modules/about-lcd-module.md)                                                                                   |                                         |
| 0x3d    | TCA9534A  |                                                                                                                                             | Rezervováno                             |
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
