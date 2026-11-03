---
title: CHESTER wM-Bus
description: "CHESTER wM-Bus is the catalog application for reading Wireless M-Bus meters: what it does, its hardware, its variants and its firmware."
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus

![CHESTER wM-Bus in a white enclosure, angled view](/img/chester/catalog-applications/chester-wm-bus.webp)

**CHESTER wM-Bus** is a **Wireless M-Bus** gateway. It listens for the configured wM-Bus meters in scheduled scans, collects the raw received packets and sends them over the **NB-IoT/LTE-M** network.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER wM-Bus firmware](../../firmware/chester-wm-bus/index.md)** page.

:::

## What It Can Do

- Supports all wM-Bus meters of the T1 and C1 classes, regardless of manufacturer.
- Measures the consumption of **heat**, **gas**, **electricity** and **water** in homes and apartments, and reads **other wM-Bus devices**.
- Scans **periodically**, **daily**, **weekly** or **monthly**.
- Switches between **two antennas** during reception to achieve ideal reception in **both polarizations**.
- Operates from batteries for 7+ years at a daily readout thanks to its low power consumption; a version with an external power supply can also be ordered.
- Supports the newer **LTEv2** stack and the current **HARDWARIO Cloud**.

## Hardware

Battery powered with 6 pcs alkaline "D" cells.

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CES`: Standard mainboard w/o supercapacitors
* `CHESTER-B1-DLW`: B1 board with six D cell holders for lithium cells and the wM-Bus module

See [**Ordering Codes**](../../ordering-codes.md) for more details.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../images/chester-wm-bus.png')} width={376} height={376} alt="CHESTER wM-Bus gateway in a white wall-mount enclosure with two external antennas" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

## Supported wM-Bus Sensors

**CHESTER wM-Bus receives packets from any wM-Bus meter transmitting in the T1 or C1 mode, regardless of manufacturer.** There is no compatibility list to check your meters against.

The device works as a **pass-thru gateway**: it forwards the received wM-Bus telegrams to the Cloud, and the **decoding into meaningful units happens in the end IoT application**. Optionally, the telegrams can be decrypted on the Cloud side using the [decryption keys](../../firmware/chester-wm-bus/index.md#hardwario-cloud--decryption-keys) stored per device.

CHESTER wM-Bus only receives raw hexadecimal wM-Bus telegrams. Unless cloud decoding is turned on, neither the device nor HARDWARIO Cloud interprets the meter data. Each wM-Bus meter has its own representation of the encoded data, and the telegrams may also be encrypted. Decoding the raw hexadecimal values into meaningful units is up to the customer or integrator.

The meters listed below are the ones we have tested in-house and documented, including **water meters**, **heat meters** and **heat cost allocators** from **BMeters** and **Zenner**. They are a starting point, not a limitation.

➡️ [Tested wM-Bus Sensors](../../supported-devices/wm-bus.md)

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER wM-Bus DC**](chester-wm-bus-dc.md) | External 230 V adapter instead of the D-cell batteries | [CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
