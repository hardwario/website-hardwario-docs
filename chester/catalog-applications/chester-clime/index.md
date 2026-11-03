---
title: CHESTER Clime
description: "CHESTER Clime is the catalog application for temperature and humidity monitoring: what it measures, its hardware, its variants and its firmware."
---

# CHESTER Clime

![CHESTER Clime with the external hygrometer gland](/img/chester/catalog-applications/chester-clime.webp)

**CHESTER Clime** is an environmental sensor. It measures temperature and humidity, computes the minimum, maximum, average and median for every interval and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Clime firmware](../../firmware/chester-clime/index.md)** page.

:::

## What It Can Do

- Measures temperature and humidity with the external **CHESTER-S2** hygrometer.
- Reads several **DS18B20** 1-Wire temperature probes.
- Reports a temperature alarm when a configured threshold is crossed.
- Keeps running on the **CHESTER-Z** backup module when external power fails, and reports the power change.
- Collects readings from Bluetooth sensor tags.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S2`: External hygrometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Clime Z**](chester-clime-z.md) | Backup module CHESTER-Z1 | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime IAQ**](chester-clime-iaq.md) | Indoor air quality: CO₂, pressure, illuminance, motion | [CHESTER Clime IAQ](../../firmware/chester-clime/chester-clime-iaq.md) |
| [**CHESTER Clime 1W**](chester-clime-1w.md) | DS18B20 probes instead of the hygrometer | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime 1WH**](chester-clime-1wh.md) | DS18B20 probes and the hygrometer | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime RTD**](chester-clime-rtd.md) | Two Pt1000 probes | [CHESTER Clime RTD](../../firmware/chester-clime/chester-clime-rtd.md) |
| [**CHESTER Clime TC**](chester-clime-tc.md) | Two type K thermocouples | [CHESTER Clime TC](../../firmware/chester-clime/chester-clime-tc.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
