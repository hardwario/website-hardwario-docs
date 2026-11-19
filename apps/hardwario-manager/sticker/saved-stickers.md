---
slug: saved-stickers
title: Saved STICKER devices
description: "Saved STICKER devices keeps each device's secret key and vendor-token in HARDWARIO Manager: claim, import, export by QR code, JSON or CSV, unclaim."
---

# Saved STICKER devices

**Saved STICKER devices** is the list of devices you manage. It holds each
device's **secret key** and **vendor-token**, so every other screen can work
without asking you for credentials.

Open **STICKER → Saved STICKER devices**. The title shows how many devices you
have.

<img src="/img/hw-manager/hw-manager-saved-stickers.png" alt="The Saved STICKER devices list with the Serial or name search box, the tag filter, color-coded tags on each row and the Claim STICKER button" width="320" />

Use the **Serial or name** box to search, and the tag icon to filter, see
[**Organize devices with tags**](./tags.md).

---

## Add a device

Devices reach the list two ways.

**Claim it.** **Claim STICKER** at the bottom of the list (or **Claim a STICKER**
on the STICKER menu) opens **Claim STICKER**. Choose **Tap over NFC** and hold
the phone against the device. Claiming registers the device to you, so nobody
else can claim it, and brings its secret key into the list on this phone.

**Import it.** If you already hold the keys (from a colleague's export, a
spreadsheet, or a shared QR code), use **Import** in the **⋮ menu** instead. No
account is needed; see [Import devices](#import-devices).

---

## A device's details

Tap a row to open the device.

<img src="/img/hw-manager/hw-manager-sticker-info.png" alt="A saved device's screen showing name, serial number, the hidden secret key with reveal, copy and change buttons, the hidden vendor-token with reveal and copy buttons, tags and change log" width="320" />

| Field | Notes |
|---|---|
| **Name** | The name you gave the device, or its serial number. Change it with **Rename** in the row menu. |
| **Serial number** | The device's identity. |
| **Secret key** | Reveal, copy, or change it. Required for every encrypted exchange. |
| **Vendor-token** | Reveal or copy it. Required for [**Vendor changes**](./reset.md#vendor-changes). |
| **Tags** | Expand to edit, see [**Organize devices with tags**](./tags.md). |
| **Change log** | See [**Device change log**](./change-log.md). |

Changing the secret key here changes only the key this phone uses to talk to the
device; the device keeps its own key. The app warns you that a wrong key will
break communication with it. To set a new key on the device itself, use
[**Change secret key**](./reset.md#vendor-changes).

Each row also has a menu:

| Action | Effect |
|---|---|
| **Generate QR code** | A claim QR carrying the serial and secret key, so another operator can import the device with the same access |
| **Edit tags** | Add or remove the device's tags |
| **Rename** | Give the device a name; leave it blank to use the serial number |
| **Unclaim** | Hand the device on: release it, put it back into claiming mode and remove it with its key from this phone |

**Unclaim** asks you to hold the phone against the device so it can go back into
claiming mode for the next owner.

---

## Export devices

Open the **⋮ menu** on the list and choose **Export**.

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="The Saved STICKER devices overflow menu with Tags, Import, Export, Export logs, Delete all logs and Delete" width="320" />

Select the devices to export, then choose what to include and where to send it:

- **Include vendor token**: off by default.
- **Include tags**: adds a tags column to the CSV.

Then pick a target: **Share as QR code**, **Share as JSON**, or
**Share as CSV**.

:::caution Exports carry secrets
An export contains the devices' secret keys, and optionally their vendor-tokens.
Treat the file or QR code as you would the keys themselves.
:::

A QR transfer carries **up to 8 devices per code**; for a longer list the app
produces several codes in sequence, with **Share next** to move through them.

## Import devices

Open the **⋮ menu** and choose **Import**:

- **Import from QR code**: scan one or more codes, using **Import more** to
  continue through a multi-code export.
- **Import from file**: a CSV or JSON export. See
  [**Import from a file**](./import-file.md) for the file format.
- **Enter manually**: type the serial number, the secret key and, optionally,
  the vendor-token. The device is saved to this phone only.

Before anything is written the app confirms what it found, including how many
devices carry keys and how many new tags will be created. Devices are matched by
serial number, so re-importing updates an existing entry rather than duplicating
it.
