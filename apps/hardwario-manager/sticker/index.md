---
slug: /hardwario-manager/sticker
title: STICKER
description: "STICKER is configured by holding the phone against the powered device: the menu, a one-tap exchange, claiming and troubleshooting in HARDWARIO Manager."
title_meta: "STICKER (HARDWARIO Manager)"
---

# STICKER over NFC

STICKER is configured by **holding the phone against the device**. There are no
cables, no programmer, and no desktop software. The phone talks to the running
device through its NFC chip, so **the batteries must be in** and charged. If they
are not, the app reports that the device did not power up its NFC.

Open **HARDWARIO Manager** and choose **STICKER**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-sticker.png" alt="The STICKER menu in HARDWARIO Manager, listing Device info, Configuration, Sensors, Radio, Tools and Saved STICKER devices, with the Claim a STICKER button at the bottom" width="320" />

---

## The menu

| Entry | What it holds |
|---|---|
| **Device info** | Serial number, firmware, uptime, battery, alarms, device health and radio state, see [**Device info**](./device-info.md) |
| **Configuration** | **Read** the configuration and edit it, **Batch export**, **Batch write**, **Configure from file** and **Templates**, see [**Configuration**](./configuration.md) |
| **Sensors** | [**1-Wire sensors**](./one-wire-sensors.md), [**Sample data**](./sample-data.md) and [**Sensor history**](./sensor-history.md) |
| **Radio** | **Radio mode** (Off, LoRaWAN or P2P), **Radio link keys** and **Join radio network**, see [**Radio**](./radio.md) |
| **Tools** | **Sync time**, **Calibration mode**, **Reset** and **Vendor changes**, see [**Tools**](./tools.md) |
| **Saved STICKER devices** | The devices you manage and their stored keys, see [**Saved STICKER devices**](./saved-stickers.md) |

The button at the bottom, **Claim a STICKER**, registers a device to you so
nobody else can claim it, and saves it with its keys on this phone. See
[**Saved STICKER devices**](./saved-stickers.md).

---

## How a tap works

When a screen says *hold the phone against the …*, touch the back of the phone
to the STICKER and keep still for a second or two. The NFC antenna is usually
near the **top back** of the phone; if nothing happens, move the phone slowly
around that area until it reads.

STICKER talks over an **AES-CCM encrypted channel**, so the app needs the
device's **secret key** before it can read or write. Once a device is saved, the
app fills the key in automatically. It takes the serial and nonce from the tag
and looks the key up in your saved list, so most actions need no typing at all.

:::info Firmware v2.0.0 or newer
Every exchange is one tap with the phone held still, the same on Android and
iOS. HARDWARIO Manager talks to STICKER firmware **v2.0.0** and newer. A device
on firmware **v1.4.x** gets a message that the app no longer supports its
firmware: have its firmware updated to v2.0.0 or newer.
:::

---

## If the device is not in your list

If a tag reads correctly but its serial is not among your saved devices, the app
shows an **Unknown STICKER** screen and offers to **claim** it rather than
simply failing. See [**Saved STICKER devices**](./saved-stickers.md).

---

## Troubleshooting

| Problem | What to check |
|---|---|
| The STICKER will not read | NFC is on, no thick case in the way, hold the top-back of the phone flat against the device and keep still for a few seconds. |
| *The STICKER didn't accept the command* | The secret key saved for this serial is probably wrong. Check it in [**Saved STICKER devices**](./saved-stickers.md) and try again. |
| *This STICKER did not power up its NFC* | The battery is missing or flat. Insert a charged battery and try again. |
| The app says the firmware is no longer supported | The device runs firmware v1.4.x, which the app no longer supports. Have its firmware updated to v2.0.0 or newer. |
| The configuration is too large | Reduce the number of settings. The app shows the size against the device's limit while you edit. |
| No response after **Join radio network** | Open **Device info**: the **Radio** row shows *Joining* while the device waits and *Healthy* once the network has accepted it. If it stays at *Joining*, verify the keys, the region and the device profile in your network server. |
