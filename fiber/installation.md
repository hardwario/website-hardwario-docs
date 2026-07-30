---
slug: installation
title: Installation
---

# Installation

This section covers bootstrap and configuration of the Linux system and LoRaWAN software stack
for both FIBER hardware variants:

- **FIBER** — the industrial version, based on **Compute Module 4**.
- **FIBER Lite** — a Raspberry Pi 5 based bench-test appliance that additionally ships a
  complete pre-integrated data pipeline (InfluxDB, Grafana, a branded dashboard) — see
  [**FIBER Lite**](fiber-lite/introduction) in the sidebar for its exclusive install steps.

Most of the procedure is identical between the two — where it genuinely diverges (flashing, the
concentrator's hardware path), the page itself has tabs for each variant.

In this guide, we use two terms:

- **HOST:** The computer from which you will perform the setup.
- **TARGET:** The actual FIBER device you are setting up.

Follow the pages below in order:

1. [**Flash Raspberry Pi OS**](installation/flash)
1. [**Update System**](installation/update-system)
1. [**Configure Hardware**](installation/configure-hardware) - I2C bus + RTC
1. [**Install ChirpStack**](installation/chirpstack)
1. [**Install ChirpStack Concentratord**](installation/concentratord)
1. [**Install ChirpStack MQTT Forwarder**](installation/mqtt-forwarder)
1. [**Register a Gateway and a Device**](installation/register-device)
1. [**Install Node-RED**](installation/node-red)
1. [**Firewall**](installation/firewall)
1. [**Ports & Default Credentials**](installation/ports-and-credentials)

Running a **FIBER Lite**? Once you reach the end of this list, continue with its additional
services under [**FIBER Lite**](fiber-lite/introduction) in the sidebar — Install Docker,
Install InfluxDB, Install Grafana, and the branded Dashboard.
