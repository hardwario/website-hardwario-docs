---
title: CHESTER Scale
description: "CHESTER Scale is the catalog application for wireless weight measurement with load cells: what it can do, its hardware, its variants and its firmware."
---

# CHESTER Scale

![CHESTER Scale enclosure with two cable glands](/img/chester/catalog-applications/chester-scale.webp)

**CHESTER Scale** is designed for wireless weight measurement using load cells. It measures up to four load cell channels and sends the readings to HARDWARIO Cloud over NB-IoT/LTE-M or LoRaWAN.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Scale firmware](../../firmware/chester-scale/index.md)** page.

:::

## What It Can Do

- Measures weight with up to four load cells, two on each **CHESTER-X3C** module.
- Works with one or two CHESTER-X3C modules: the firmware detects the module in slot B at startup.
- Enables or disables each channel separately.
- Collects temperature and humidity from Bluetooth sensor tags (Teltonika EYE Sensor).
- Keeps running on the **CHESTER-Z1** backup module when external power fails, and reports the power change (variant **CHESTER Scale Z**).

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3C:A` or `CHESTER-X3C:B`: Load cell interface (2 channels per module)
* `CHESTER-E5-P`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Use Cases

The device is ideal for:
- **Industrial storage tank monitoring**: Track fill levels of tanks, silos, or containers
- **Pallet and goods tracking**: Monitor weight changes in logistics and warehousing
- **Livestock weight monitoring**: Optimize feeding schedules and track animal health
- **Agricultural applications**: Beehive monitoring, feed storage, etc.

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Scale Z**](chester-scale-z.md) | Backup module CHESTER-Z1 | [CHESTER Scale Z](../../firmware/chester-scale/chester-scale-z.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
