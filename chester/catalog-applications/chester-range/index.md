---
title: CHESTER Range
description: "CHESTER Range is the catalog application for ultrasonic distance measurement: what it measures, its hardware, wiring, variants and firmware."
---

# CHESTER Range

![CHESTER Range enclosure with one cable gland, angled view](/img/chester/catalog-applications/chester-range.webp)

**CHESTER Range** measures distance using the [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor) ultrasonic sensor. It computes the minimum, maximum, average and median for every interval and sends the results to HARDWARIO Cloud over NB-IoT/LTE.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Range firmware](../../firmware/chester-range/index.md)** page.

:::

## What It Can Do

- Measures distance with the MaxBotix MB7066 ultrasonic sensor.
- Measures temperature with **DS18B20** 1-Wire probes.
- Collects readings from Bluetooth sensor tags.
- With the **CHESTER-Z1** backup module (CHESTER Range Z), keeps running when external power fails and reports the power change.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard

* `CHESTER-X0A:A`: Input module (4 channels)

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Terminal Blocks

Connect the sensor to the **left terminal block A**:

| [**CHESTER-X0**](../../extension-modules/chester-x0.md) in left slot A | Maxbotix cable color | Signal |
| ------------------------------------------------------------------- | -------------------- | ------ |
| A2 (CH1)                                                            | red                  | Power  |
| A3 (GND)                                                            | black                | GND    |
| A4 (CH2)                                                            | yellow               | Pulse  |

![CHESTER-X0 terminal block pinout: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../extension-modules/images/tb-chester-x0.png)

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Range Z**](chester-range-z.md) | Backup module CHESTER-Z1 | [CHESTER Range Z](../../firmware/chester-range/chester-range-z.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
