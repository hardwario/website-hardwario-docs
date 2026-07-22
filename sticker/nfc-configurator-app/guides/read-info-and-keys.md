---
slug: hm-guide-read-info-keys
title: Read device info and keys
---

# Read device info and LoRaWAN keys

Read a STICKER's identity and the LoRaWAN keys you need to register it on a network — over NFC, in a few seconds.

:::info Save the device first
Reading the LoRaWAN keys uses the encrypted channel, so the STICKER must be saved with its **secret key**. See [**Before you begin**](../config.md#before-you-begin) in the Configuration guide.
:::

## Read device info

1. Open **Hardwario Manager** and go to **Sticker → Device info**.
2. Hold the phone against the STICKER and keep still.
3. The app shows the **serial number**, **firmware version**, **uptime**, and **clock**.

<img src="/img/hw-manager/hw-manager-device-info.png" alt="Device info read over NFC" width="320" />

## Read LoRaWAN keys

1. Go to **Sticker → LoRaWAN keys**.
2. Hold the phone against the STICKER.
3. The app shows the **DevEUI** and the LoRaWAN keys for the device's activation mode — for **OTAA** the JoinEUI and AppKey, for **ABP** the DevAddr and session keys.

<img src="/img/hw-manager/hw-manager-lrw-keys.png" alt="LoRaWAN keys read over NFC (an ABP device)" width="320" />

## Share the keys

Use the share action to export the keys as **JSON, CSV, plain text, or a QR code**, or copy them to the clipboard. Use them to register the device in [**ChirpStack**](../../lorawan-network-server/lorawan-chirpstack.md) or [**The Things Stack**](../../lorawan-network-server/lorawan-tts.md).

<img src="/img/hw-manager/hw-manager-lrw-keys-share.png" alt="Share the LoRaWAN keys as JSON, CSV, text, or QR code" width="320" />
