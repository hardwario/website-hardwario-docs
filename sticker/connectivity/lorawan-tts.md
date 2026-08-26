---
slug: lorawan-tts
title: The Things Stack
---
import Image from '@theme/IdealImage';

# The Things Stack

**The Things Stack (TTS)** is a managed LoRaWAN Network Server provided by The Things Industries, available as a public cloud service (TTS Cloud / Community Edition) or as a private enterprise deployment.

:::info Prerequisites
1. Ensure access to an active **The Things Stack** instance with an operational LoRaWAN gateway within range.
2. Use [**HARDWARIO Manager**](../hardwario-manager) to extract your device credentials via NFC before creating end-device profiles in TTS.
:::

---

## Device Credentials & NFC Extraction

Before registering a STICKER unit in The Things Stack, extract its factory keys and provision radio settings over NFC:

1. Open [**HARDWARIO Manager**](../hardwario-manager) on an NFC-enabled smartphone.
2. Tap the phone against the STICKER enclosure to read device details.
3. Record the **DevEUI**, **JoinEUI (AppEUI)**, and **AppKey** (for OTAA) or static session keys (for ABP).
4. Verify that **`radio-mode`** is enabled so the device initiates a Join attempt upon provisioning.

---

## Select Activation Method

| Activation Mode | Description | Required Credentials |
|---|---|---|
| **[OTAA – Over-The-Air Activation](./tts-otaa.md)** *(Recommended)* | Dynamic session key negotiation on Join. Ensures maximum security. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP – Activation by Personalization](./tts-abp.md)** | Pre-assigned static session keys. Skips the Join procedure entirely. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Payload Formatter & Downlink Configuration

When registering your STICKER end device in TTS:

- **Uplink Formatter:** Assign the official STICKER payload decoder script (`ttn.js`) under **Payload Formatters → Uplink**. This decodes standard sensor data on fPort 2 and system/alarm alerts on fPort 3.
- **Downlink Formatter:** Assign `ttn.js` under **Payload Formatters → Downlink** to enable JSON payload encoding for remote management on **fPort 85** (see [**Downlink Commands**](downlink-commands.md)).

---

## Useful Links

- [HARDWARIO Manager Setup Guide](../hardwario-manager)
- [TTS End Devices Documentation](https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices)
- [STICKER Payload Decoder (`ttn.js`) on GitHub](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)