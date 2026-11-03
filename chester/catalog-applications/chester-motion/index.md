---
title: CHESTER Motion
description: "CHESTER Motion is the catalog application that counts passing people and their direction with two PIR sensors: its features, hardware and firmware."
---

# CHESTER Motion

![CHESTER Motion seen from the right, with the two PIR sensor windows on the lid](/img/chester/catalog-applications/chester-motion.webp)

**CHESTER Motion** is a directional motion detection device that uses dual PIR sensors to detect and track movement direction (left-to-right and right-to-left). The application counts motion events with direction information and sends them via LTE to HARDWARIO Cloud.

:::info Firmware

Configuration parameters, the data format and firmware downloads are described on the **[CHESTER Motion firmware](../../firmware/chester-motion/index.md)** page.

:::

## What It Can Do

- Detects motion with two PIR sensors and tells left-to-right from right-to-left passage.
- Counts the detections on each side and the passages in each direction, per sampling interval and in total.
- Lets you choose the detection sensitivity from three presets or set it parameter by parameter.
- In service mode, flashes the LED on every detection, which helps with installation and testing.

## Hardware

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: CHESTER mainboard with C battery holder
* `CHESTER-E23-LP`: Enclosure with two PIR sensor holes, SMA antenna pigtail and light pipe
* `CHESTER-S3`: Extension board with two PIR sensors
* `Battery SAFT LS26500`

See [**Ordering Codes**](../../ordering-codes.md) for more details.

## Technical Specification

| Parameter | Value |
| :--- | :--- |
| Enclosure material | ASA |
| Dimensions | 130×175×45 mm |
| Operating temperature | -20 to +60 °C |
| Storage temperature | -30 to +70 °C |
| Enclosure protection | IP67 |
| Nominal battery voltage | 3.6 V |
| Nominal battery capacity | 7700 mAh |
| Idle power consumption | < 180 µA |
| Peak power consumption | < 250 mA |

### PIR Sensor (CHESTER-S3)

| Parameter | Value |
| :--- | :--- |
| Detection range | Up to 3 meters |
| Measurement angle | Max 80° |

## Typical Use Cases

**CHESTER Motion** is equipped with two PIR sensors to monitor the passage of individuals around the device, making it ideal for tracking foot traffic in factories, train stations, or retail environments. With wireless connectivity and long battery life, the device can be easily installed anywhere, including remote locations for monitoring protected natural areas.

- Monitor foot traffic in factory aisles, train stations, or retail spaces
- Track the movement of individuals in protected natural areas
- Enhance security and optimize operations by monitoring human presence in various environments
- Facilitate easy installation in remote or difficult-to-access locations due to its wireless design and battery longevity

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../../firmware/common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
