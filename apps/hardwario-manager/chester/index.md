---
slug: /hardwario-manager/chester
title: CHESTER
description: "Manage CHESTER over Bluetooth Low Energy with HARDWARIO Manager: read device state, edit configuration, drive the shell, bind BLE tags and update firmware."
title_meta: "CHESTER (HARDWARIO Manager)"
---

# CHESTER over Bluetooth

CHESTER is managed over **Bluetooth Low Energy**. Connect the phone to a device
and you can read its state, edit its configuration, drive its shell, bind
external BLE sensor tags, update its firmware, reboot it and reset its
configuration to factory defaults.

Open **HARDWARIO Manager** and choose **CHESTER**. Until a device is connected,
the app shows **Connect to CHESTER**, see [**Connect and pair**](./connect.md).

---

## The menu

Once a device is connected, the screen is titled with the device it is attached
to, for example **CHESTER 2159019023**, and lists what you can do with it.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-menu.png" alt="The CHESTER menu titled CHESTER and the serial number, listing Device info, Configuration, Terminal, Tools and BLE tags, with the Disconnect button at the bottom" width="320" />

| Entry | What it does |
|---|---|
| [**Device info**](./device-info.md) | Serial, firmware, uptime and device controls |
| [**Configuration**](./configuration.md) | Read and edit the device configuration |
| [**Terminal**](./terminal.md) | Send shell commands over the device console |
| [**Tools**](./tools.md) | Firmware update, reboot, factory reset |
| [**BLE tags**](./ble-tags.md) | Bind external BLE sensor tags to slots and read their values |

**Disconnect** at the bottom of the screen ends the connection. The app returns
to **Connect to CHESTER**, where you can reach another device.

---

## How long the connection lasts

The app holds **one** CHESTER connection at a time. It stays up while you move
around the app: you can go back to the home screen, or to the STICKER pages,
and find the CHESTER still connected when you return.

The connection ends when:

- you tap **Disconnect**;
- the device goes away, for example when it restarts or moves out of range;
- 30 minutes pass without the app talking to the device.

After the 30 minutes, **Connect to CHESTER** explains what happened with the
notice **Disconnected after 30 minutes**. Reconnect from there.

When the app restarts the device itself (after a configuration save, a reboot or
a factory reset), it waits for the device to come back and reconnects on its
own. See [**Configuration**](./configuration.md#saving) and
[**Tools**](./tools.md).

---

## Before you start

- Bluetooth must be on, and the app needs the **nearby devices** permission,
  see [**Install the app**](../install.md).
- Pairing uses the 6-digit **passkey** tied to the device. Scanning the QR code
  on the CHESTER label is the path that fetches it for you, so the phone needs
  an internet connection for that first pairing.
- Keep the phone near the device. Most connection problems are range or a stale
  pairing, see [**Troubleshooting**](./troubleshooting.md).

Start with [**Connect and pair**](./connect.md).
