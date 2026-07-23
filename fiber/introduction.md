---
slug: /
sidebar_position: 1
title: Introduction
---
import Image from '@theme/IdealImage';

# FIBER

**FIBER** is a robust industrial IoT device built on an **embedded Linux** platform and designed for **Industrial IoT applications**. It integrates both **wireless 868/915 MHz radio** and **8-channel 1-Wire sensor/actuator** hub.

Thanks to its modular and open architecture, **FIBER** supports standard **Raspberry Pi OS** distributions as well as **custom Linux images built with Yocto**, making it usable as a preconfigured measurement appliance or as a development platform. Designed for deployment in industrial and commercial environments, the device provides wireless and wired communication channels for reliable sensor acquisition, local visualization on its integrated display, and robust network connectivity through **Ethernet**, **WiFi**, or optional **LTE**.

<img src="/img/fiber.webp" data-zoom-src="/img/fiber.webp" width="540" alt="FIBER" />

## Quick Links

* [**Installation**](installation) – Bootstrap and configure the Linux system on FIBER.
* [**Hardware Description**](hardware-description) – Processing platform, sensor interfaces, connectivity, and full technical specifications.
* [**Changelog**](changelog) – Latest firmware and platform changes.

## Typical Use Cases

- Hospital environmental monitoring across wards, pharmacies, and storage
- Pharmaceutical cold-chain monitoring with logged temperature history and excursion alerts
- Retail refrigeration monitoring to prevent spoilage
- Laboratory environments requiring precision temperature control
- Energy infrastructure temperature monitoring (transformers, switchgear)
- Manufacturing: multi-point process temperature monitoring across production lines

## Key Features

| Feature | Description |
|---|---|
| **Embedded Linux Platform** | Compatible with Raspberry Pi OS or custom Yocto-based images. |
| **Hybrid Sensor Integration** | Wireless sensors at 868 MHz ISM band plus 8 fully independent 1-Wire ports for wired sensors. |
| **Industrial-Grade Design** | –20 °C to +60 °C operating range, built around the Compute Module 4 for long-term reliability. |
| **Flexible Connectivity** | Ethernet, WiFi, BLE, or optional LTE Cat 4 module. |
| **Local Visualization & Diagnostics** | Backlit LCD, per-channel status LEDs, and an integrated acoustic buzzer. |
| **Power-over-Ethernet** | PoE powered, with an onboard Li-Ion backup battery. |
| **Full Root Linux Access** | Docker support for custom firmware and application development. |
| **Secure MQTT** | MQTT protocol with TLS encryption for secure data transmission. |
| **Cloud Integration** | Compatible with HARDWARIO Cloud and the ProXimos visualization system. |
