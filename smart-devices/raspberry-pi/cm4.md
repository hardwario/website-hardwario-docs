---
slug: cm4
title: "Compute Module 4"
description: Raspberry Pi Compute Module 4, a compact system-on-module for IoT gateways, edge computing and embedded product development.
---

# Raspberry Pi Compute Module 4

![Raspberry Pi Compute Module 4](/img/smart-devices/raspberry-pi-cm4.webp)

The **Compute Module 4 (CM4)** is a compact, industrial-grade system-on-module from [Raspberry Pi](https://www.raspberrypi.com/). Unlike the standard Raspberry Pi boards, the CM4 is designed for integration into custom carrier boards and embedded products.

## Key Specifications

| Parameter | Value |
|---|---|
| SoC | Broadcom BCM2711, quad-core Cortex-A72 @ 1.5 GHz |
| RAM | 1 / 2 / 4 / 8 GB LPDDR4-3200 SDRAM |
| Flash | 0 / 8 / 16 / 32 GB eMMC (or eMMC-less for SD card) |
| Wireless | 802.11b/g/n/ac Wi-Fi, Bluetooth 5.0 (on wireless variants) |
| Interfaces | PCIe Gen 2 × 1, USB 2.0, HDMI 2.0 × 2, CSI, DSI, 28× GPIO |
| Form Factor | 55 × 31 mm, dual 100-pin high-density connectors |
| Operating Temp. | 0 °C to 85 °C |

### CM4108016

The variant sold in the HARDWARIO Store is the **CM4108016**, with 8 GB RAM, 16 GB eMMC, Wi-Fi and Bluetooth.

## HARDWARIO Integration

The CM4 is used in HARDWARIO ecosystems for:

- **TAPPER NFC Platform**: The [TAPPER](/tapper/) device uses Raspberry Pi Zero 2 W as its computing core for NFC tag reading and MQTT communication.
- **Gateway software host**: Running HARDWARIO Cloud Connector, Node-RED, or custom integrations on a lightweight compute module.
- **Local HMI/dashboard**: Hosting a local monitoring interface for HARDWARIO sensor networks.
- **LoRaWAN server**: Running ChirpStack or The Things Stack alongside CHESTER or EMBER devices.

## Resources

- [Raspberry Pi CM4 product page](https://www.raspberrypi.com/products/compute-module-4/)
- [Raspberry Pi in HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [TAPPER documentation](/tapper/)
