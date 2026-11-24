---
slug: connect
title: Connect and pair
description: "Pair a CHESTER in HARDWARIO Manager from its label QR code, which looks up the passkey, or from a nearby-device scan, and reconnect from Recent devices."
---

# Connect to a CHESTER

Open **HARDWARIO Manager → CHESTER**. If nothing is connected, the app shows
**Connect to CHESTER**. The devices you connected to before fill the screen, and
three buttons at the bottom offer the ways to reach a new one: **Scan device
QR**, **Scan for nearby devices** and **Join a shared session**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-connect.png" alt="The Connect to CHESTER screen with one device under Recent devices and the Scan device QR, Scan for nearby devices and Join a shared session buttons at the bottom" width="320" />

---

## Scan the device QR – the usual path

The QR code on the CHESTER label identifies the device **and** lets the app look
up its Bluetooth passkey, so pairing needs no typing.

1. Choose **Scan device QR**.
2. Allow the camera if asked, and point it at the QR code on the CHESTER label.
3. Allow Bluetooth if asked. The app looks up the passkey, finds the device and
   pairs with it.

While it works, the screen shows **Connecting to CHESTER…**. Once the passkey is
known, a notice appears:

> **Pairing automatically**: No need to type anything. If Android shows a
> Bluetooth passkey prompt, it's already filled in; just confirm it.

The button in the notice, **Passkey** followed by the six digits, copies the
passkey. The app has already put it on the clipboard as well, so you can paste
it if the phone asks for it.

The QR code is a link to a page that shows the device's passkey, and the app
reads the passkey from that page. This needs an internet connection. Without
one, or with an older label that carries only the serial number, the app still
connects, but the phone asks you for the passkey.

The app looks for the device for 30 seconds. If the device does not turn up, the
screen reports **Device not found**, see [**Troubleshooting**](./troubleshooting.md).

:::info On iOS you type the passkey
Automatic pairing is an Android feature. On iOS the system shows its own pairing
dialog and you enter the 6-digit passkey from the notice yourself.
:::

---

## Scan for nearby devices

If you do not have the label to hand, choose **Scan for nearby devices**. The
**Scan for CHESTER** screen starts scanning at once and lists what it finds,
with each device's name and its signal strength in dBm.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-scan.png" alt="Scan for CHESTER listing several nearby CHESTER devices by serial number, each with its signal strength in dBm" width="320" />

The strongest signal is at the top. The order stays put while you look at it and
changes only when a device's signal changes noticeably, for example as you walk
towards it. A device the phone is already paired with but which is not
advertising is listed last as **No signal: not advertising**.

Use **Filter by serial number** to narrow a crowded list. The scan stops by
itself after about 30 seconds; **Scan again**, or the refresh button at the top
(**Rescan**), searches again. Tap a device to connect. The screen shows
**Connecting… Enter the device passkey if prompted.**

:::caution No QR means no passkey
A device reached this way has no passkey looked up for it, so the phone's pairing
prompt will ask you for the 6-digit passkey. You can read it from the device's
QR label. Open the QR in any camera app and the page it opens shows the passkey.
Devices connected this way are also not added to **Recent devices**.
:::

If nothing appears, check that the CHESTER is powered on and in range, then scan
again.

---

## Recent devices

Each device you connect to from **Connect to CHESTER**, by its QR code or from
this list, is remembered. The screen lists up to 20 of them under **Recent
devices**, the most recent first, each with **Tap to reconnect**. The delete
icon (**Remove**) takes a device off the list.

A reconnect from this list scans no QR code, so no passkey is looked up. It
relies on the pairing the phone already holds. If you have removed the device
from the phone's Bluetooth settings, connect from the QR code again.

Only the serial number and name are stored, no keys or secrets.

---

## Join a shared session

**Join a shared session** does not connect to a device at all. It attaches to a
CHESTER that a colleague is sharing from their phone, so you can drive its
console remotely. See [**Share a terminal session**](./shared-sessions.md).

---

## After connecting

**Connect to CHESTER** is replaced by the CHESTER menu. Continue with
[**Device info**](./device-info.md) or [**Configuration**](./configuration.md).

If a connection fails, the screen says what happened and what to do. The raw
error is kept behind **Technical details**, with a copy button. **Back** returns
to the buttons. See [**Troubleshooting**](./troubleshooting.md).

If you refuse the camera or Bluetooth permission, the screen says the permission
is needed and offers **Try again**. Once the phone stops asking, it offers
**Open settings** instead.
