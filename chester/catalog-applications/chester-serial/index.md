---
title: CHESTER Serial
description: "CHESTER Serial is the catalog application that connects meters and sensors with RS-485 or RS-232 to the cloud: its features, hardware, variants and firmware."
---

# CHESTER Serial

**CHESTER Serial** is a universal application for industrial serial communications. It works as a flexible gateway for integrating industrial devices (sensors, energy meters) into the cloud via LTE-M/NB-IoT or LoRaWAN.

:::info Firmware

Configuration parameters, the supported devices, the data format and firmware downloads are described on the **[CHESTER Serial firmware](../../firmware/chester-serial/index.md)** page.

:::

## What It Can Do

- Reads up to 8 Modbus RTU slave devices on an RS-485 multi-drop bus through the [**CHESTER-X2**](../../extension-modules/chester-x2.md) module.
- Connects a single device point to point over RS-232 through the [**CHESTER-X12**](../../extension-modules/chester-x12.md) module.
- Has drivers for energy meters (Carlo Gavazzi, ORNO, Schneider), a SolaX hybrid inverter, a FlowT ultrasonic flowmeter, a Piketronic radon probe, a MicroSENS CO₂ sensor and a Promag RFID card reader.
- Sends the data over LTE (CBOR encoding) or LoRaWAN (compact binary encoding).
- Collects readings from Bluetooth sensor tags.

## Hardware

Both variants use the same mainboard and enclosure and differ in the interface module:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-E2-LP`: Enclosure with SMA pigtail
* `CHESTER-X2` (RS-485 interface module) or `CHESTER-X12` (RS-232 interface module), see [Variants](#variants)

See [**Ordering Codes**](../../ordering-codes.md) for more details.

:::caution

**CHESTER Serial** requires an external power supply (5–28 V DC) for continuous operation. Sensors and the serial interface are powered continuously.

:::

## Technical Specifications

| Feature | Value |
| :--- | :--- |
| **Operating System** | Zephyr RTOS |
| **Physical Interface** | RS-232 (Module X12), RS-485 (Module X2) |
| **Application Protocols** | Transparent (RAW), Modbus RTU |
| **Cloud Formats** | CBOR (LTE), Optimized Binary (LoRaWAN) |
| **Power Supply** | External source (5–28 V DC) required |

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Serial RS-485**](chester-serial-rs485.md) | RS-485 interface CHESTER-X2, up to 8 Modbus RTU devices | [CHESTER Serial RS-485](../../firmware/chester-serial/chester-serial-rs485.md) |
| [**CHESTER Serial RS-232**](chester-serial-rs232.md) | RS-232 interface CHESTER-X12, 1 device | [CHESTER Serial RS-232](../../firmware/chester-serial/chester-serial-rs232.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
