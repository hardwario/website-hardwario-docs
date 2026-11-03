---
title: CHESTER Push
description: "CHESTER Push is the catalog application for push-button alerting: what it does, its hardware, the enclosure template and its firmware."
---

# CHESTER Push

![CHESTER Push with four push buttons on colored labels (Production, Warning, Failure, Help), top view](/img/chester/catalog-applications/chester-push.webp)

**CHESTER Push** is a push-button terminal. When any of its buttons is pressed, it sends a report to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Push firmware](../../firmware/chester-push/index.md)** page.

:::

## What It Can Do

- Sends data immediately when any of the push buttons is pressed.
- Tells a short press from a long press and counts both for each button.
- Confirms each press with the button LED and a beep.
- Runs from its Li-Ion battery and reports at once when external power fails or returns, so it can also monitor power outages.
- Reports temperature and device orientation in every message.
- Comes with two firmware builds: the main one suits battery operation, [**CHESTER Push FM**](../../firmware/chester-push/chester-push-fm.md) keeps the last pressed button lit.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: CHESTER mainboard
* `CHESTER-Z1-F`: Four push buttons (see [**Ordering Codes**](../../ordering-codes.md#chester-z) for more variants)
* `CHESTER-E2-LP`: Enclosure with light pipe and SMA antenna pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Push Buttons

**CHESTER Push** has push buttons on the enclosure. For bulk orders, the number of buttons can be configured. An off-the-shelf configuration provides four push buttons on the left side. Alternatively, we can deliver a single push-button version (in the enclosure center). Also, upon a customer's request, we can customize the enclosure printing, and provide various text labels (or symbols) next to each of the push buttons.

Each button is also equipped with an **LED indicator** so the operator can see that the press was recognized. Also, the **beep sound** is played from the integrated acoustic buzzer for audible confirmation of the push button press.

## Power Supply

The **CHESTER Push** application integrates a **CHESTER-Z1-F** extension module with a rechargeable **Li-Ion** battery and DC/DC power supply (input voltage range of 6 VDC to 26 VDC) that can charge the battery and provide a steady power supply for the application. The reported message also provides information about the external power presence, external DC line voltage, and battery voltage. With that extra information, **CHESTER Push** could also be used to monitor power outages. The module is described on the [**CHESTER-Z1**](../../extension-modules/chester-z1.md) page.

## Enclosure Template

You can use a [**front cover template**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf) for your custom enclosure design.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
