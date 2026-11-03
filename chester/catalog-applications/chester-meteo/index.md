---
title: CHESTER Meteo
description: "CHESTER Meteo is the catalog application for weather monitoring: what it measures, its hardware, its variants and its firmware."
---

# CHESTER Meteo

![CHESTER Meteo with the external hygrometer and four cable glands](/img/chester/catalog-applications/chester-meteo.webp)

**CHESTER Meteo** is a wind and environmental sensor: it measures wind speed and direction, rainfall, atmospheric pressure, temperature and humidity. It samples the measured variables, aggregates them for every interval and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Meteo firmware](../../firmware/chester-meteo/index.md)** page.

:::

## What It Can Do

- Measures wind speed (m/s), wind direction (0–360°) and rainfall (mm) with weather sensors connected to the **CHESTER-X0B** input module.
- Measures atmospheric pressure (Pa) with an external barometer.
- Measures temperature (°C) and humidity (%RH) with the external **CHESTER-S2** hygrometer.
- Reads **DS18B20** 1-Wire temperature probes and 1-Wire soil sensors.
- Reports a temperature alarm when a configured threshold is crossed.
- Collects readings from Bluetooth sensor tags.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X0B:A`: Input module (4 channels)
* `CHESTER-S2`: External hygrometer
* External barometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Variants

| Variant | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Meteo Z**](chester-meteo-z.md) | Backup module CHESTER-Z1 | [CHESTER Meteo Z](../../firmware/chester-meteo/chester-meteo-z.md) |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
