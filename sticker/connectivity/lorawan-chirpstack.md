---
slug: lorawan-chirpstack
title: ChirpStack v4
---
import Image from '@theme/IdealImage';

# ChirpStack v4

**ChirpStack v4** is an open-source LoRaWAN Network Server for self-hosted, private network deployments.

:::info Prerequisites
1. Ensure **ChirpStack v4** is installed and operational. See the [ChirpStack Installation Guide](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation).
2. Use [**HARDWARIO Manager**](../hardwario-manager) to extract your device credentials via NFC before creating end-device profiles in ChirpStack.
:::

---

## Device Credentials & NFC Extraction

Before registering a STICKER unit in ChirpStack v4, extract its factory keys and provision radio settings over NFC:

1. Open [**HARDWARIO Manager**](../hardwario-manager) on an NFC-enabled smartphone.
2. Tap the phone against the STICKER enclosure to read device information.
3. Record the **DevEUI**, **JoinEUI/AppEUI**, and **AppKey** (for OTAA) or static session keys (for ABP).
4. Verify that **`radio-mode`** is enabled so the device initiates a Join attempt upon provisioning.

---

## Select Activation Method

| Activation Mode | Description | Required Credentials |
|---|---|---|
| **[OTAA – Over-The-Air Activation](./chirpstack-otaa.md)** *(Recommended)* | Dynamic session key negotiation on Join. Ensures highest security. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP – Activation by Personalization](./chirpstack-abp.md)** | Pre-assigned static session keys. Bypasses the Join procedure. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Device Profile & Payload Codec Setup

When configuring your STICKER **Device Profile** in ChirpStack v4:

- **Codec Driver:** Select **JavaScript** codec and paste the official STICKER decoder script (`ttn.js`).
- **Bidirectional Capabilities:** The codec automatically parses telemetry uplinks on fPort 2, alarm alerts on fPort 3, and formats remote JSON downlinks on **fPort 85** (see [**Downlink Commands**](downlink-commands.md)).

---

## Useful Links

- [HARDWARIO Manager Setup Guide](../hardwario-manager)
- [ChirpStack v4 Installation Guide](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation)
- [ChirpStack End Devices Documentation](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices)
- [ChirpStack Payload Decoders Guide](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding)
- [STICKER Payload Decoder (`ttn.js`) on GitHub](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)