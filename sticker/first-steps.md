---
slug: first-steps
title: Quick Start Guide
---
import Image from '@theme/IdealImage';

# STICKER Quick Start Guide

Welcome! This page helps you **power up (revive)** your STICKER and choose what to do next:
- connect it to **ChirpStack**,
- connect it to **The Things Stack (TTS)**,
- or use **your own LoRaWAN network**
---

## Before you start

#### What STICKER is

**STICKER** is an open IoT platform based on STM32WL with integrated LoRaWAN connectivity and a software-selectable proprietary **LoRa P2P** mode that enables direct links to **HARDWARIO FIBER**. It is a compact, battery-powered device with long lifetime and ready-to-use applications such as STICKER Clime, Input, and Motion, making it ideal for flexible sensor deployments.

For detailed technical specifications of the hardware, please refer to the [**Hardware Description**](https://docs.hardwario.com/sticker/hardware-description/) page.

#### You will need
- **STICKER device** (Clime / Input / Motion)
- **2× AA batteries**
- A **LoRaWAN gateway** within range (your own or a public network gateway)
- A **LoRaWAN Network Server** (ChirpStack / TTS / other)

#### Useful links
- STICKER overview: https://docs.hardwario.com/sticker/
- STICKER product page: https://www.hardwario.com/products/sticker/
- STICKER store page: https://www.hardwario.store/sticker
- STICKER **Decoder**: https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js
- HARDWARIO datasheets hub (includes STICKER datasheet link): https://www.hardwario.com/resources/datasheets

---

## Step 1: Identify your STICKER variant

STICKER ships with a ready-to-use “catalog application”:

- **STICKER Clime** — temperature & humidity monitoring  
  https://docs.hardwario.com/sticker/catalog-applications/sticker-clime/

- **STICKER Input** — external sensors + analog/digital inputs (1‑Wire, dry contact, 0–24 V analog)  
  https://docs.hardwario.com/sticker/catalog-applications/sticker-input/

- **STICKER Motion** — ultra‑low‑power PIR motion detection  
  https://docs.hardwario.com/sticker/catalog-applications/sticker-motion/

Catalog overview:  
https://docs.hardwario.com/sticker/catalog-applications/catalog-applications/

---

## Step 2: Set up your STICKER

1. **Open the enclosure** and access the battery holder.
2. **Insert two AA cells** (check polarity).
3. STICKER will boot and the **status LED** indicates activity.
4. For the first test, place the device **close to your LoRaWAN gateway** (best RF conditions).
5. Wait for the first uplink (the timing depends on the installed catalog app and reporting interval).

#### NFC note (optional, but useful)
STICKER is **NFC-ready** and can be configured even when batteries are not inserted (NFC energy harvesting). Use the [**HARDWARIO Manager**](nfc-configurator-app/setup.md) to write LoRaWAN settings (DevEUI, AppEUI/JoinEUI, AppKey) before installation:
- STICKER Power Management: https://docs.hardwario.com/sticker/power-management/


---

## Step 3: Choose your LoRaWAN backend

Before registering the device, find your STICKER's **DevEUI**, **AppEUI/JoinEUI** and **AppKey** using the [**HARDWARIO Manager**](nfc-configurator-app/setup.md).

### ChirpStack v4
Best if you want a private LoRaWAN network you control.

Start here (HARDWARIO guide):
- **https://docs.hardwario.com/sticker/lorawan-network-server/lorawan-chirpstack**

Step-by-step sections:
- Installation: https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
- Gateways: https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-gateways
- End devices: https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices
- Payload decoding: https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding
- STICKER **Decoder**: https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js

---

### The Things Stack
Best if you want to use TTS (managed or self-hosted), including TTN/TTI workflows.

Start here (HARDWARIO guide):
- **https://docs.hardwario.com/sticker/lorawan-network-server/lorawan-tts**

Step-by-step sections:
- Gateways: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-gateways
- End devices: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices
- STICKER **Decoder**: https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js

---

## Step 4: Configure the device (optional)

STICKER can be configured to adjust reporting intervals, set alarm thresholds, or change LoRaWAN keys.

Configuration is available via two methods:
- **NFC** — configure with a smartphone using the [**HARDWARIO Manager**](nfc-configurator-app/setup.md), no tools needed
- **Shell (RTT terminal)** — for developers via a debug connection

For a full list of all configuration parameters and commands, see:

**[Developer Access →](developer-mode)**

---

## Step 5: Next steps (after first successful uplink)

At this point, your STICKER is connected, data is arriving, and dashboards are working.

Typical next steps:

- **Install the device in its final location** and verify long-term LoRaWAN coverage.
- **Observe data for several hours or days** to confirm stability and expected update intervals.
- **Adjust reporting behavior**, see [**Developer Access**](https://docs.hardwario.com/sticker/developer-mode/) to tune sample and report intervals.
- **Set alerts or thresholds** in your dashboard platform or using STICKER's built-in alarm feature.

:::info
#### STICKER Input wiring (Input variant only)

If you are using **STICKER Input**, refer to the wiring and DIP switch configuration guide:
- https://docs.hardwario.com/sticker/sticker-input-wiring/sticker-input-wiring/
:::


---

## Developer / customization path (optional)
If you want to modify behavior or build custom firmware:
- Developer Access (Debug Mode): https://docs.hardwario.com/sticker/developer-mode/
- Open firmware repository: https://github.com/hardwario/sticker-firmware/

---

## Troubleshooting checklist
- **No uplinks?**
  - Check battery polarity / replace batteries
  - Move closer to a gateway (RF coverage)
  - Verify frequency plan and device profile in your NS
  - Verify keys / activation method required by your firmware
  - Check payload decoder settings
