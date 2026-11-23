---
slug: device-info
title: Device info
description: "CHESTER Device info in HARDWARIO Manager: firmware, uptime, vendor, Bluetooth address and passkey, hardware variant and revision, and the claim token."
---

# CHESTER device info

Open **CHESTER → Device info** once a device is connected. The screen, titled
**Device Info**, shows what the device says it is and how long it has been up.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-device-info.png" alt="The Device Info screen: the product name and serial number at the top, then Firmware, Firmware name, Uptime, Vendor, Bluetooth address, a masked Bluetooth passkey, Hardware, Revision and a masked Claim token, with the Share button at the bottom" width="320" />

---

## What is shown

The product name and the serial number lead the screen. Below them:

| Row | Meaning |
|---|---|
| **Firmware** | The running firmware version |
| **Firmware name** | The firmware application. Older firmware may not report it |
| **Uptime** | Time since the device last booted, updated live. A dash holds its place until the first value arrives |
| **Vendor** | The manufacturer |
| **Bluetooth address** | The device's BLE address |
| **Bluetooth passkey** | The passkey the phone pairs with, hidden until you reveal it |
| **Hardware** | The hardware variant, the full ordering code of this unit |
| **Revision** | The board revision |
| **Claim token** | The token used to claim the device, hidden until you reveal it |

Rows the device does not report are left out rather than shown blank. The
values can be selected and copied; a hidden one once you reveal it.

The passkey and the claim token are shown as dots, because this screen is often
read over someone's shoulder. The eye button beside each (**Reveal**, then
**Hide**) shows or hides it. The copy button next to the claim token
(**Copy claim token**) copies the token even while it is hidden, which is what
you need when you paste it into a claim form.

---

## Copy or share it

**Share** at the bottom of the screen opens the phone's share sheet with the
device's name followed by one `Label: value` line per field. This is the
quickest way to send a device's identity to support.

:::caution The shared text includes the secrets
The shared text carries the **Bluetooth passkey** and **Claim token** lines in
clear, even while they are hidden on screen. Anyone who reads it can pair with
the device or claim it. Send it only to people you trust, or delete those two
lines before you send it.
:::

---

## Device controls

This screen only reads. The actions that change the device are under
[**Tools**](./tools.md): rebooting it, restoring its factory configuration and
updating its firmware. Configuration changes are saved from
[**Configuration**](./configuration.md).
