---
slug: lorawan-chirpstack
title: ChirpStack v4
title_meta: "ChirpStack v4 (STICKER)"
---
import Image from '@theme/IdealImage';

# ChirpStack v4

**ChirpStack v4** is an open-source LoRaWAN Network Server for self-hosted, private network deployments.

:::info Prerequisites
1. Ensure **ChirpStack v4** is installed and operational. See the [ChirpStack Installation Guide](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation).
2. Use [**HARDWARIO Manager**](/sticker/hardwario-manager/) to extract your device credentials via NFC before creating end-device profiles in ChirpStack.
:::

---

## Device Credentials & NFC Extraction

Before registering a STICKER unit in ChirpStack v4, read its factory keys over NFC with
[**HARDWARIO Manager**](/apps/hardwario-manager). There is no cable and no
programmer. You hold the phone against the device.

:::tip First time with the app?
Work through the [**HARDWARIO Manager Quick Start Guide**](/apps/hardwario-manager/first-steps)
first: installing the app, switching NFC on, and granting the permissions it asks
for. STICKER is read from an **Android** phone with NFC.
:::

1. **Save the device so the app has its secret key.** STICKER only answers over
   an encrypted channel, so the app cannot read anything without it. You add each
   device once (see
   [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers)), and from
   then on the app fills the key in automatically.
2. **Open STICKER → LoRaWAN keys** and choose **Read LoRaWAN keys**.
3. **Tap the device.** Touch the back of the phone to the STICKER enclosure and
   keep still for a second or two. The NFC antenna is usually near the **top
   back** of the phone; if nothing happens, move the phone slowly around that
   area. On **iOS** the system scan sheet asks you to lift the phone and tap
   again partway through. That lift is required. See
   [**STICKER over NFC**](/apps/hardwario-manager/sticker) for the full tap
   procedure and what the LED shows during the exchange.
4. **Record the keys the app shows.** Which ones appear depends on the activation
   mode: **DevEUI**, **JoinEUI (AppEUI)** and **AppKey** for OTAA, or **DevEUI**,
   **DevAddr** and the session keys for ABP, see
   [**Device info and LoRaWAN keys**](/apps/hardwario-manager/sticker/device-info).
5. **Check the radio is switched on.** In **STICKER → Configuration**, the
   LoRaWAN section's **`radio-mode`** must be set to LoRaWAN, because devices ship
   radio-silent, so the unit starts a Join once it is registered. See
   [**Configuration**](/apps/hardwario-manager/sticker/configuration), and
   [**Templates**](/apps/hardwario-manager/sticker/templates) for giving a whole
   batch the same settings.

---

## Select Activation Method

| Activation Mode | Description | Required Credentials |
|---|---|---|
| **[OTAA (Over-The-Air Activation)](./chirpstack-otaa.md)** *(Recommended)* | Dynamic session key negotiation on Join. Ensures highest security. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP (Activation by Personalization)](./chirpstack-abp.md)** | Pre-assigned static session keys. Bypasses the Join procedure. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Device Profile & Payload Codec Setup

When configuring your STICKER **Device Profile** in ChirpStack v4:

- **Codec Driver:** Select **JavaScript** codec and paste the official STICKER decoder script (`ttn.js`).
- **Bidirectional Capabilities:** The codec automatically parses telemetry uplinks on fPort 2, alarm alerts on fPort 3, and formats remote JSON downlinks on **fPort 85** (see [**Downlink Commands**](downlink-commands.md)).

---

## Useful Links

- [HARDWARIO Manager and STICKER](/sticker/hardwario-manager/)
- [HARDWARIO Manager Quick Start Guide](/apps/hardwario-manager/first-steps)
- [Read device info and LoRaWAN keys over NFC](/apps/hardwario-manager/sticker/device-info)
- [ChirpStack v4 Installation Guide](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation)
- [ChirpStack End Devices Documentation](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices)
- [ChirpStack Payload Decoders Guide](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding)
- [STICKER Payload Decoder (`ttn.js`) on GitHub](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)