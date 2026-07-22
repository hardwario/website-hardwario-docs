---
slug: nfc-configurator-setup
title: Setup
---

# Hardwario Manager — Setup

**Hardwario Manager** is the mobile app for setting up STICKER devices over **NFC**. Hold your phone against the STICKER to read its info, write LoRaWAN keys and settings, run device commands, and manage your saved devices — no cables, programmers, or desktop software required.

STICKER is **NFC-ready** and can be configured even with **no batteries inserted** (NFC energy harvesting), so you can prepare a device before you install it.

:::info Android with NFC
STICKER configuration over NFC is done from an **Android phone with NFC** (most phones from the last few years have it). The app also provisions HARDWARIO **FIBER** over Bluetooth.
:::

---

## What you need

| Item | Notes |
|---|---|
| **Android phone with NFC** | NFC lets the phone talk to the STICKER when you hold them together. |
| **Hardwario Manager** | Install it from Google Play (below). |
| **STICKER device(s)** | Any variant: Clime, Input, Motion. |
| **Device secret key** | STICKER uses an encrypted NFC channel. Each device's secret key is provided with your devices; you add it in the app the first time you save a device (see [**Configuration →**](./config.md)). |

---

## 1) Turn on NFC

1. Open **Settings** on the phone.
2. In the search box at the top, type **NFC**.
3. Tap the NFC result and switch it **On**.

If no NFC result appears, your phone does not have NFC and cannot configure a STICKER over the air.

---

## 2) Install Hardwario Manager

Hardwario Manager is available on the **Google Play Store**:

1. Open **Google Play** on your Android phone.
2. Search for **Hardwario Manager** and open its listing.
3. Tap **Install**, then **Open**.

Updates are delivered automatically through Google Play, and your saved devices are kept across updates.

---

## 3) Allow the permissions

The first time you use a feature that needs it, the app asks for a permission — tap **Allow** (or **While using the app**):

- **Camera** — only when you scan a QR code.
- **Nearby devices / Bluetooth** — only if you connect to a **FIBER** over Bluetooth.

There is no permission prompt for NFC — you just switch it on once in Step 1.

---

## 4) Open the app

<img src="/img/hw-manager/hw-manager-landing-page.jpg" alt="Hardwario Manager home screen — choose Sticker or Fiber" width="320" />

1. Open **Hardwario Manager** and choose **Sticker**.
2. Pick what you want to do — for example **Device info** or **Configuration**.
3. When the screen says *Hold the phone against the …*, touch the back of your phone to the STICKER and keep still for a second or two.

The NFC antenna is usually near the **top back** of the phone. If nothing happens, move the phone slowly around that area until it reads.

You are ready to read and write configuration — continue with [**Configuration →**](./config.md).
