---
slug: lorawan-tts
title: The Things Stack
title_meta: "The Things Stack (STICKER)"
---
import Image from '@theme/IdealImage';

# The Things Stack

**The Things Stack (TTS)** is a managed LoRaWAN Network Server provided by The Things Industries, available as a public cloud service (TTS Cloud / Community Edition) or as a private enterprise deployment.

:::info Prerequisites
1. Ensure access to an active **The Things Stack** instance with an operational LoRaWAN gateway within range.
2. Use [**HARDWARIO Manager**](/sticker/hardwario-manager/) to extract your device credentials via NFC before creating end-device profiles in TTS.
:::

---

## Device Credentials & NFC Extraction

Before registering a STICKER unit in The Things Stack, read its factory keys over NFC with
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
| **[OTAA (Over-The-Air Activation)](./tts-otaa.md)** *(Recommended)* | Dynamic session key negotiation on Join. Ensures maximum security. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP (Activation by Personalization)](./tts-abp.md)** | Pre-assigned static session keys. Skips the Join procedure entirely. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Payload Formatter & Downlink Configuration

When registering your STICKER end device in TTS:

- **Uplink Formatter:** Assign the official STICKER payload decoder script (`ttn.js`) under **Payload Formatters → Uplink**. This decodes standard sensor data on fPort 2 and system/alarm alerts on fPort 3.
- **Downlink Formatter:** Assign `ttn.js` under **Payload Formatters → Downlink** to enable JSON payload encoding for remote management on **fPort 85** (see [**Downlink Commands**](downlink-commands.md)).

---

## Useful Links

- [HARDWARIO Manager and STICKER](/sticker/hardwario-manager/)
- [HARDWARIO Manager Quick Start Guide](/apps/hardwario-manager/first-steps)
- [Read device info and LoRaWAN keys over NFC](/apps/hardwario-manager/sticker/device-info)
- [TTS End Devices Documentation](https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices)
- [STICKER Payload Decoder (`ttn.js`) on GitHub](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)