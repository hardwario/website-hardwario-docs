---
slug: installation
title: Installation
---
import Image from '@theme/IdealImage';

# Installation

This section covers bootstrap and configuration of the Linux system and the full LoRaWAN +
monitoring software stack, **one shared procedure for both FIBER hardware variants**:

- **FIBER**: the industrial version, based on **Compute Module 4**.
- **FIBER Lite**: a Raspberry Pi 5 based bench-test appliance.

The two variants only diverge at the hardware level (flashing, RTC, the LoRaWAN concentrator's
USB vs. SPI connection). The page itself has tabs at those few points. Everything else,
including InfluxDB, Grafana, and the branded Dashboard, is identical and installed on both.

:::warning Which device is this for?

**A FIBER you received is already set up. There is nothing on these pages for you to run.** It
ships as a finished appliance: the operating system, ChirpStack, the concentrator and the rest of
the stack are all part of its image, and it updates as a whole rather than package by package. Go
straight to [Register a Gateway and a Device](/fiber/installation/register-device/), and to
[**FIBER Hardware Guides**](/fiber/category/fiber-hardware-guides/) for the display and 1-Wire sensors.

These pages are the **build procedure**: how that image is put together, and how to bring up a
**FIBER Lite** unit from a blank microSD card. Follow them for FIBER Lite, or when building a
FIBER image from scratch.

:::

:::info

See [**FIBER Lite**](/fiber/fiber-lite/introduction/) in the sidebar for FIBER Lite's hardware
differences (no display, no 1-Wire sensors), and [**FIBER Hardware Guides**](/fiber/category/fiber-hardware-guides/)
for what to do with the display/1-Wire hardware that only FIBER has.

:::

In this guide, we use two terms:

- **HOST:** The computer from which you will perform the setup.
- **TARGET:** The actual FIBER device you are setting up.

Follow the pages below in order:

1. [**Flash Raspberry Pi OS**](/fiber/installation/flash/)
1. [**Update System**](/fiber/installation/update-system/)
1. [**Configure Hardware**](/fiber/installation/configure-hardware/): I2C bus + RTC
1. [**Install ChirpStack**](/fiber/installation/chirpstack/)
1. [**Install ChirpStack Concentratord**](/fiber/installation/concentratord/)
1. [**Install ChirpStack MQTT Forwarder**](/fiber/installation/mqtt-forwarder/)
1. [**Register a Gateway and a Device**](/fiber/installation/register-device/)
1. [**Install Node-RED**](/fiber/installation/node-red/)
1. [**Install InfluxDB**](/fiber/installation/influxdb/)
1. [**Install Grafana**](/fiber/installation/grafana/)
1. [**Dashboard**](/fiber/installation/dashboard/)
1. [**Firewall**](/fiber/installation/firewall/)
1. [**Ports & Default Credentials**](/fiber/installation/ports-and-credentials/)

## Data Flow

ChirpStack, Node-RED, InfluxDB, and Grafana all run **on the device itself**, with no separate
servers or cloud services required:

<div style={{ width: '600px', margin: '0 auto' }}>

<Image img={require('./fiber-lite/images/data-flow.png')} />

</div>

A landing page on port 80 links to every service and shows live system stats, so the device is
usable without memorizing ports or IP-to-service mappings.
