---
title: CHESTER Control
description: "CHESTER Control is the catalog application for monitoring inputs and switching outputs: what it can do, its hardware, wiring, variants and firmware."
---

# CHESTER Control

![CHESTER Control, front view with the antenna connector on top and four cable glands at the bottom](/img/chester/catalog-applications/chester-control.webp)

**CHESTER Control** monitors digital and analog inputs and switches outputs on request from HARDWARIO Cloud. It records input changes, counts pulses, measures voltage and current, and sends the data over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Control firmware](../../firmware/chester-control/index.md)** page.

:::

## What It Can Do

- Reads the four inputs of the **CHESTER-X0** module, each set up as a trigger, counter, voltage or current input.
- Records every change of a digital input with its timestamp and can report it immediately.
- Counts pulses, for example from the S0 output of an energy meter.
- Measures voltage 0–28 V and current 0–24 mA from transmitters.
- Switches the four outputs of the **CHESTER-X4** module remotely from HARDWARIO Cloud; the outputs supply voltage from VIN.
- Reads **DS18B20** 1-Wire temperature probes and Bluetooth sensor tags.
- With the **CHESTER-Z1** backup module (CHESTER Control Z), keeps running when external power fails and reports the power change.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard

* `CHESTER-X0B:A`: Input module (4 channels)

* `CHESTER-X4:B`: Step-down + outputs (4 channels)

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Inputs and Outputs

**CHESTER Control** has these four inputs:

| **Type** | **Channel** | **Terminal** | **Input type**    | **Input range** | **Typical use-case**                  |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digital (NPN/PNP) | 0 to 28 V       | Switch, button, relay, PLC sensor     |
| Counter  | CH2         | A4           | Digital (NPN/PNP) | 0 to 28 V       | Energy meter pulse outputs (e.g., S0) |
| Voltage  | CH3         | A5           | Analog (voltage)  | 0 to 28 V       | Various voltage transmitters          |
| Current  | CH4         | A7           | Analog (current)  | 0 to 24 mA      | Various current transmitters          |

Each channel can be set to any of the four types in the firmware configuration; the table shows a typical assignment. All these inputs and their options are explained in more detail on the [**CHESTER Control firmware**](../../firmware/chester-control/index.md#measurement-and-behavior) page.

Additionally, **CHESTER Control** allows remote control of 4 digital (6–28 V) outputs.

## Terminal Blocks

| CHESTER-X0B in left slot A (signals A1–A8) | CHESTER-X4 in right slot B (signals B1–B8)                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Use inputs **CH1** to **CH4** and **GND**   | Use **VIN** and **GND** to supply external power.                                            |
|                                             | Use **CH1** to **CH4** outputs, which supply voltage from **VIN** when the output is enabled |
| ![CHESTER-X0 terminal block pinout: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../extension-modules/images/tb-chester-x0.png) | ![CHESTER-X4 terminal block pinout: GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../extension-modules/images/tb-chester-x4.png)                                                  |

For the wiring diagram of **CHESTER Control**, please follow the [**terminal block description**](../../extension-modules/chester-x0.md) of the **CHESTER-X0** extension module.
The extension module **CHESTER-X0** is installed in the left slot **A**, so you have to use the corresponding terminals **A1** to **A8**.

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Control Z**](chester-control-z.md) | Backup module CHESTER-Z1 | [CHESTER Control Z](../../firmware/chester-control/chester-control-z.md) |

The [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) firmware reads eight inputs, with a second CHESTER-X0 module in slot B instead of CHESTER-X4, and supports the CHESTER-Z backup module.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
