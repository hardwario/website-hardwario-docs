---
slug: first-steps
title: Quick Start Guide
title_meta: "Quick Start Guide (HARDWARIO Manager)"
---

# HARDWARIO Manager Quick Start Guide

**HARDWARIO Manager** is the HARDWARIO mobile app for setting up devices in the field. Hold your phone against a device (or connect to it wirelessly) to read its information, write its configuration, run device commands, and keep a list of the devices you manage, with no cables, programmers, or desktop software required.

The app reaches a device over one of two wireless links, depending on the product:

| Link | Used by | Notes |
|---|---|---|
| **NFC** | STICKER | Works even with **no batteries inserted** (NFC energy harvesting), so a device can be prepared before it is installed. Needs an **Android** phone with NFC. |
| **Bluetooth Low Energy** | CHESTER | Configuration, shell access and firmware updates over a paired Bluetooth connection. |

---

## 1) Install the app

| Platform | Download |
|---|---|
| **Android** | [**Google Play**](https://play.google.com/store/apps/details?id=com.hardwario.manager) |
| **iOS** | [**App Store**](https://apps.apple.com/app/id6444803082) |

Updates arrive automatically through the store, and your saved devices are kept across updates.

:::info STICKER is configured from Android
STICKER configuration over NFC is done from an **Android phone with NFC** (most phones from the last few years have it).
:::

---

## 2) Turn on the wireless link

- **NFC**: open **Settings**, type **NFC** in the search box at the top, then switch it **On**. There is no in-app permission prompt for NFC.
- **Bluetooth**: switch Bluetooth on and tap **Allow** when the app asks for the **Nearby devices** permission.

The app also asks for the **Camera** permission, but only the first time you scan a QR code.

---

## 3) Open the app and pick your device


1. Open **HARDWARIO Manager** and choose the device family you are working with.
2. Pick what you want to do: for example **Device info** or **Configuration**.
3. When the screen says *Hold the phone against the …*, touch the back of your phone to the device and keep still for a second or two.

The NFC antenna is usually near the **top back** of the phone. If nothing happens, move the phone slowly around that area until it reads.

---

## 4) Continue with your device guide

Each product documents what HARDWARIO Manager can do with it:

| Device | Guide |
|---|---|
| **STICKER** | [**Set up STICKER over NFC →**](/apps/hardwario-manager/sticker) |
| **CHESTER** | [**Connect to CHESTER over Bluetooth →**](/apps/hardwario-manager/chester) |
