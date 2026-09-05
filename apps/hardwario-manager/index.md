---
slug: /hardwario-manager
title: HARDWARIO Manager
---

# HARDWARIO Manager

**HARDWARIO Manager** is the mobile app for setting up and managing HARDWARIO
devices in the field. It is one app for the whole ecosystem: hold the phone
against a **STICKER** to configure it over NFC, or connect to a **CHESTER** over
Bluetooth to read its state, edit its configuration, run shell commands, and
update its firmware.

The app runs on **Android and iOS**, in **English and Czech**.

---

## What you can do

| Device | How the phone talks to it | What the app can do |
|---|---|---|
| **STICKER** | NFC. Hold the phone against the device | Read device info and LoRaWAN keys, read and write the full configuration, build and apply configuration templates, manage sensors and alarms, read stored measurements, reset the device, and keep a list of the devices you manage |
| **CHESTER** | Bluetooth Low Energy | Read device information, edit the configuration, open a shell terminal, share that terminal with a colleague, update the firmware, and reboot the device |

STICKER can be configured even with **no batteries inserted**, because the NFC field
from the phone powers the device long enough to store settings. See
[**Configure a powered-off device**](./sticker/offline-configuration.md).

---

## Getting around

Every screen carries the same header: the **HARDWARIO Manager** lockup on the
left and a **settings** gear on the right. Tapping the lockup takes you back to
the home screen from anywhere. It is the app's home button.

The home screen is a grid of tiles, one per device family you have access to,
plus a tile for your **ATELOS account**. Pick a device family to see what the
app can do with it.

---

## Where to start

1. [**Install the app**](./install.md): get it onto the phone, turn on NFC, and
   grant the permissions it asks for.
2. [**ATELOS account**](./atelos.md): sign in so the app can claim devices and
   fill in their keys for you.
3. [**STICKER**](./sticker/index.md): configure STICKER devices over NFC.
4. [**CHESTER**](./chester/index.md): connect to a CHESTER over Bluetooth.
5. [**App settings**](./settings.md): appearance, language, app lock, and how
   long device change logs are kept.
