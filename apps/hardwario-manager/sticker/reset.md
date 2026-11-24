---
slug: reset
title: Reset a device
description: "STICKER resets in HARDWARIO Manager from reboot to factory reset, plus a secret key change and a vendor reset authorized by the vendor-token."
---

# Reset a STICKER

The reset options range from a harmless reboot to a full vendor erase. Pick the
**least destructive** option that solves your problem.

Open **STICKER → Tools → Reset** and choose an option. The app shows what the
reset does and asks **Really send?**; choose **Send** and hold the phone against
the device.

| Reset | What it does |
|---|---|
| **Reboot device** | Restarts the device. All settings, keys and stored data are kept |
| **Reset counters** | Zeroes the Hall and input counters |
| **Device reset** | Resets the settings and configuration to defaults and clears the alarm rules, but keeps the device identity and LoRaWAN keys, so the device stays joined to the network |
| **LoRaWAN reset** | Clears the LoRaWAN frame counters, DevNonce and session, then restarts and joins as if it had never been on the network. Keys and configuration are kept. Use it after re-keying or when moving the device to another network |
| **Factory reset** | Resets the settings to defaults, drops the LoRaWAN keys and session, erases the pulse counters and history, and switches the radio **Off**. The identity is kept (serial, secret key, vendor-token, DevEUI and JoinEUI), so the app can still reach the device |

After a **factory reset** the device stays silent until its LoRaWAN keys are set
again and the radio is switched on in [**Radio mode**](./radio.md).

---

## Vendor changes

Two further operations sit under **STICKER → Tools → Vendor changes**. They are
authenticated by the device's **vendor-token** rather than its secret key, which
is why they are kept apart from the reset ladder above. Only whoever holds the
vendor-token can run them.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-vendor-changes.png" alt="Vendor changes, offering Change secret key and Vendor reset" width="320" />

| Operation | What it does |
|---|---|
| **Change secret key** | Sets a new secret key on the device. It also erases the device down to its serial and vendor-token |
| **Vendor reset** | Erases the device down to its serial and vendor-token and sets a new secret key |

Both erase the configuration, the LoRaWAN keys and session, the DevEUI and
JoinEUI, the pulse counters and the history. They switch the radio **Off**, and
the device cannot be claimed until its claim window is opened again.

**Load vendor-token from Saved STICKER devices** fills in the token: hold the
phone against the device so the app reads its serial, and it looks up the token
it has stored for it. Otherwise type the token into **Vendor-token (hex)**. The
dice button next to **New secret key (hex)** generates a random key, so you do
not have to invent one.

On success the new secret key is saved into your
[**Saved STICKER devices**](./saved-stickers.md), so the app can keep talking to
the device without you copying anything by hand.

:::caution Change secret key also erases the device
This app supports no re-key that keeps the configuration, so
**Change secret key** erases the device as a vendor reset does. Plan to set up
the radio and re-apply the configuration afterwards. A
[**template**](./templates.md) makes the configuration a single tap.
:::

:::danger No undo
A **factory reset**, a **vendor reset** and **Change secret key** cannot be
undone. Each leaves the radio **Off** until LoRaWAN is set up again. Use them
only when you intend to start from a clean state.
:::
