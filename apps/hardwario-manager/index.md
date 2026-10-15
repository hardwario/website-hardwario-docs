---
slug: /hardwario-manager
title: HARDWARIO Manager
description: "HARDWARIO Manager is the mobile app for setting up and managing HARDWARIO devices in the field."
---

# HARDWARIO Manager

**HARDWARIO Manager** is the mobile app for setting up and managing HARDWARIO
devices in the field. It is one app for the whole ecosystem: hold the phone
against a **STICKER** to configure it over NFC, or connect to a **CHESTER** over
Bluetooth to read its state, edit its configuration, run shell commands, and
update its firmware. It can also set up a **FIBER** gateway over Bluetooth.

The app runs on **Android and iOS**, in **English and Czech**. See
[**Install the app**](./install.md) for where to get it.

---

## What you can do

| Device | How the phone talks to it | What the app can do |
|---|---|---|
| **STICKER** | NFC. Hold the phone against the device | Read device info and LoRaWAN keys, read and write the full configuration, build and apply configuration templates, manage sensors and alarms, read stored measurements, reset the device, and keep a list of the devices you manage |
| **CHESTER** | Bluetooth Low Energy | Read device information, edit the configuration, open a shell terminal, share that terminal with a colleague, update the firmware, and reboot the device |
| **FIBER** | Bluetooth Low Energy | Name the gateway, connect it to Wi-Fi or Ethernet, choose its role, and connect STICKERs and Beacons to it, see [**FIBER**](./fiber/index.md) for which builds include it |

STICKER can be configured even with **no batteries inserted**, because the NFC field
from the phone powers the device long enough to store settings. See
[**Configure a powered-off device**](./sticker/offline-configuration.md).

---

## Getting around

Every screen carries the same header: the **HARDWARIO** logo on the left and the
**menu** button on the right. Tapping the logo takes you back to the home screen
from anywhere. It is the app's home button.

The menu holds **Settings** (see [**App settings**](./settings.md)) and links to
the HARDWARIO **Cloud**, this **Documentation**, the **Homepage** and
**Support**.

<img src="/img/hw-manager/hw-manager-menu.png" alt="The app menu with Settings and the external links Cloud, Documentation, Homepage and Support" width="320" />

The home screen is a grid of tiles, one per device family the build includes.
Builds with the ATELOS account hub add an **ATELOS account** tile. Pick a device
family to see what the app can do with it.

---

## Where to start

1. [**Install the app**](./install.md): get it onto the phone, turn on NFC, and
   grant the permissions it asks for.
2. [**STICKER**](./sticker/index.md): configure STICKER devices over NFC.
3. [**CHESTER**](./chester/index.md): connect to a CHESTER over Bluetooth.
4. [**FIBER**](./fiber/index.md): set up a FIBER gateway over Bluetooth.
5. [**ATELOS account**](./atelos.md): how the app claims devices and fills in
   their keys for you.
6. [**App settings**](./settings.md): appearance, language, app lock, and how
   long device change logs are kept.
7. [**Troubleshooting and FAQ**](./troubleshooting.md): what to check when
   something does not work.
