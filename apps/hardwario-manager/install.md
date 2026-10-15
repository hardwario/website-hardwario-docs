---
slug: install
title: Install the app
---

# Install HARDWARIO Manager

**HARDWARIO Manager** runs on **Android** and **iOS**. The Android app is on
[**Google Play**](https://play.google.com/store/apps/details?id=com.hardwario.manager).
The iOS app is not in the App Store yet; ask your HARDWARIO contact for the
current iOS build.

---

## What you need

| Item | Why |
|---|---|
| **A phone with NFC** | Required to configure a **STICKER**. Most phones from the last few years have it. |
| **Bluetooth** | Required to connect to a **CHESTER**. |
| **A camera** | Used to scan QR codes. CHESTER pairing labels, firmware links, device claim codes, and shared templates. |
| **An ATELOS account** (optional) | Lets the app claim devices into your account and pull their stored secret keys onto the phone. Without one, a device can be claimed to the phone itself. See [**ATELOS account**](./atelos.md). |
| **The device's secret key** | STICKER talks over an encrypted NFC channel. Claiming a device fills the key in for you; you can also enter it by hand. |

---

## 1. Turn on NFC

NFC has to be switched on before the phone can talk to a STICKER.

1. Open **Settings** on the phone.
2. Search for **NFC**.
3. Switch it **on**.

If no NFC setting appears, the phone does not have NFC and cannot configure a
STICKER. It can still be used for CHESTER over Bluetooth.

---

## 2. Install the app

Install **HARDWARIO Manager** from Google Play (or the iOS build you were given),
then open it. Your saved devices, templates and settings are kept across
updates.

---

## 3. Allow the permissions

The app asks for a permission the first time it needs one. Tap **Allow** (or
**While using the app**):

- **Camera**: only when you scan a QR code.
- **Nearby devices / Bluetooth**: only when you connect to a CHESTER or a FIBER, or look for Beacons.
- **Face ID / biometrics**: only if you switch on the app lock in
  [**App settings**](./settings.md).

There is no permission prompt for NFC. You switch it on once, in step 1.

:::info Bluetooth permissions on Android
On Android 12 and newer the app needs both the **scan** and **connect**
permissions for nearby devices. If you decline them, the CHESTER screens offer
to open the phone's settings so you can grant them.

On Android 11 and older, Bluetooth scanning also needs **Location** switched on
in the phone settings.
:::

---

## 4. Open the app

Open **HARDWARIO Manager** and pick a device family from the home grid:

- **STICKER**: configuration over NFC. Continue with [**STICKER**](./sticker/index.md).
- **CHESTER**: connection over Bluetooth. Continue with [**CHESTER**](./chester/index.md).

The phone's NFC antenna is usually near the **top back** of the phone. If a tap
does not register, move the phone slowly around that area until it reads.
