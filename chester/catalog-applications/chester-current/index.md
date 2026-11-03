---
title: CHESTER Current
description: "CHESTER Current is the catalog application for non-invasive AC and DC current measurement: what it measures, its hardware, probes, variants and firmware."
---

# CHESTER Current

![CHESTER Current with two clamp-on current probes](/img/chester/catalog-applications/chester-current.webp)

**CHESTER Current** measures AC and DC current without breaking the circuit: up to four clamp-on current probes connect to the **CHESTER-K1** module. The device sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Configuration parameters, channel calibration, the data format and firmware downloads are described on the **[CHESTER Current firmware](../../firmware/chester-current/index.md)** page.

:::

## What It Can Do

- Measures AC and DC current on up to four channels with clamp-on current probes.
- Measures voltage on channels set to the single-ended mode; current and voltage channels together are never more than four.
- Runs from a battery: the probes get power only during the measurement.
- Converts the readings to amperes or other units with a two-point calibration of each channel.
- Reads several **DS18B20** 1-Wire temperature probes.
- Collects readings from Bluetooth sensor tags.
- Keeps running on the **CHESTER-Z1** backup module when external power fails, and reports the power change (variant **CHESTER Current Z**).

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-K1-1C-2C-3C-4C`: 4x Diff. Input + 5 V Boost
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Measurement Principle

The application primarily targets non-invasive current measuring using the so-called **DC Current "Transformer"** (DCCT). It can measure up to 4 channels of both AC and DC currents. The current probes are clips around the measured line, which convert the magnetic flux (proportional to the electrical current) to a differential output voltage.

:::tip

The current probes require a 5 V power supply (generated using the boost converter on **CHESTER-K1**) during the measurement cycle. The boost converter and the power rails to each channel are software-controlled, so **CHESTER Current** can operate as a low-power device powered by the battery. The measurement interval has a major effect on battery life.

:::

Apart from the current measurements, the device can be configured (on demand) to measure up to 4 voltage channels (in single-ended mode). It can combine both current and voltage measurements (the total number of channels never exceeds 4).

## Current Probes

You can choose up to 4 current probes with the following current ranges:

- Maximum current **10 A**
- Maximum current **100 A**
- Maximum current **300 A**
- Maximum current **1,000 A**
- Maximum current **1,500 A**

:::caution

The current range is specified for the DC. If you design your system for the AC, you have to multiply the maximum expected AC by the coefficient of `1.42` (square root of two) to see if the current probe fits within the limit.

:::

## Wiring

For the wiring diagram of **CHESTER Current**, please follow the [**terminal block description**](../../extension-modules/chester-k1.md) of the **CHESTER-K1** extension module. The extension module **CHESTER-K1** uses both slots **A** and **B**, so you use the corresponding terminals **A1** to **A8** and **B1** to **B8**.

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Current Z**](chester-current-z.md) | Backup module CHESTER-Z1 | [CHESTER Current Z](../../firmware/chester-current/chester-current-z.md) |
| [**CHESTER Current 1W**](chester-current-1w.md) | DS18B20 1-Wire temperature probes | [CHESTER Current](../../firmware/chester-current/index.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
