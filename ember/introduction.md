---
slug: /
title: EMBER
sidebar_label: Introduction
---
import Image from '@theme/IdealImage';

# EMBER

**EMBER** is an industrial LoRaWAN platform that transmits and processes measured sensor values and controls actuators across industrial sites. Each site combines an outdoor **EMBER Hotspot** gateway with LoRaWAN devices such as **CHESTER**, **LTE** backhaul via **Onomondo**, and a **LoRaWAN Network Server** (**ChirpStack** or **The Things Stack**, either self-hosted by the customer or operated by **HARDWARIO** as a managed service) with **Node-RED** for low-code REST integrations, so data can be visualized and processed either in the cloud or on-premise.

:::tip
### To get your EMBER running, read the [**Quick Start Guide**](getting-started.md).
:::

<img src="/img/ember-top.webp" data-zoom-src="/img/ember-top.webp" width="540" alt="EMBER" />

## Quick Links

* [**Quick Start Guide**](getting-started.md): Step-by-step setup guide.
* [**Hotspot Configuration**](hotspot-configuration.md): System concept, RouterOS configuration, IP addresses, and VPN tunnels.
* [**Managed Network Server**](cloud-service.md): ChirpStack and Node-RED operated by HARDWARIO as a managed service.
* [**Hardware Description**](hardware-description.md): Main parts and parameters of the EMBER Hotspot.
* [**Ordering Codes**](ordering-codes.md): Complete reference of product ordering codes.
* [**Changelog**](changelog): Latest firmware and platform changes.
* [**Video Tutorials**](category/video-tutorials): Short videos on ChirpStack and MikroTik setup.

## Typical Use Cases

- Industrial IoT deployments across factories and campuses
- Commercial environments needing reliable LoRaWAN coverage
- Home automation systems
- Reliable LoRaWAN infrastructure management at scale

## Key Features

| Feature | Description |
|---|---|
| **Industrial LoRaWAN Hotspot** | Waterproof outdoor gateway built on the MikroTik RBM33G platform. |
| **LTE Backhaul** | Integrated cellular connectivity via Onomondo. |
| **LoRaWAN Network Server** | ChirpStack or The Things Stack. Self-hosted or operated by HARDWARIO as a managed service, with Node-RED, remote configuration, and monitoring. |
| **Optional HARDWARIO Services** | SIM card with connectivity for the LTE backhaul, managed network server, and secure remote access via OpenVPN. |
| **Redundant Deployments** | Site configurations for high-availability coverage. |
| **Secure VPN Tunnels** | Independent tunnels for LoRaWAN data and remote management. |
