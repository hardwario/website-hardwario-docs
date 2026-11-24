---
slug: troubleshooting
title: Troubleshooting
description: "Fix CHESTER Bluetooth problems in HARDWARIO Manager: what each scan, pairing, connection and download error means and what to do about it."
title_meta: "Troubleshooting (HARDWARIO Manager for CHESTER)"
---

# CHESTER troubleshooting

The app classifies every Bluetooth failure into a message that says what
happened and what to do. The raw error is kept behind a **Technical details**
expander, with a copy button. Include that text when you report a problem.

Where retrying cannot help, the app offers the fix instead of a retry button:
**Turn on Bluetooth** when the phone's Bluetooth is off, **Open settings** when a
permission is missing.

---

## Finding and connecting

| What you see | What to do |
|---|---|
| **Bluetooth is off** | Turn the phone's Bluetooth on, or tap **Turn on Bluetooth**, then scan again. |
| **Bluetooth permission needed** | Allow the nearby-devices permission for the app in the phone's settings, see [**Install the app**](../install.md). |
| **Device not found**, no CHESTER nearby | Check the device is powered on and in range, then scan again. The search for a scanned QR code gives up after 30 seconds. |
| Found devices, but not the serial you wanted | The app lists which serials it did see. Confirm you are looking at the right device. |
| **Connection failed** | Move the phone closer, power-cycle the device, and try again. |
| The scan stops on its own | Scanning runs for about 30 seconds. Use **Scan again**. |
| **Unsupported device** | The device does not expose the CHESTER services. Check it runs CHESTER firmware and is not stuck in the bootloader. |
| The device disappeared before connecting | It went out of range. Scan again and tap it once it reappears. |
| **Bluetooth busy** | Another app or an unfinished operation holds the connection. Wait a moment and try again. |

---

## Pairing

| What you see | What to do |
|---|---|
| **Pairing failed** | The phone probably holds a stale pairing. Forget the device in the phone's Bluetooth settings, then connect again and enter the passkey from the label. |
| Pairing did not complete | Accept the pairing request on the phone and enter the passkey. If a stale pairing exists, forget it first. |
| The device refused to pair right now | Wait a few seconds and try again. Power-cycling the device clears a stuck pairing attempt. |
| A generic Bluetooth error on Android | Move closer, power-cycle the device, and retry. If it persists, turn the phone's Bluetooth off and on, or forget the device in the Bluetooth settings. |
| The label passkey is not accepted | The device may have its own passkey set in **Advanced configuration → Bluetooth**. Use that one, or ask whoever configured the device. |

:::tip Forgetting the device is the usual fix
Most persistent pairing problems are a stale bond on the phone. Forget the
CHESTER in the phone's own Bluetooth settings (not just in the app), then
connect again from the QR code.
:::

---

## While connected

| What you see | What to do |
|---|---|
| **Connection lost**. The device closed the link | It may have rebooted; a reboot, a configuration save or a firmware update does this. When the app caused the restart, it reconnects on its own; otherwise reconnect. |
| The device powered off | Check its power supply or battery, then reconnect. |
| **No answer from the device** | Keep it close to the phone and try again. If it stays silent, reconnect. |
| The phone has too many Bluetooth connections | Disconnect another device and try again. |
| **The device refused it** | The firmware does not allow that operation. Check the device runs current CHESTER firmware. |
| The configuration read came back with nothing usable | The firmware may not support the configuration shell commands. See [**Configuration**](./configuration.md). |
| **Reconnecting to CHESTER** gives up | The app could not find the device after its restart. Check that it is powered and in range, then connect again from [**Connect to CHESTER**](./connect.md). |

---

## Downloads

Fetching a passkey or a firmware image needs the internet:

| What you see | What to do |
|---|---|
| **No server connection** | Check the phone's internet connection and try again. |
| The server has nothing at that address (404) | The link is wrong or expired. Get a fresh QR code. |
| **Firmware not usable** | The file or download is not a CHESTER firmware image, or its checksum does not match. See [**Firmware update**](./firmware-update.md#if-it-fails). |

---

## Things that are expected

- **The connection lasts while you use the app.** Leaving the CHESTER screens
  keeps the device connected. It ends when you tap **Disconnect**, when the
  device goes away, or after 30 minutes without the app talking to the device,
  which **Connect to CHESTER** explains with **Disconnected after 30 minutes**.
- **Only one CHESTER at a time.** Disconnect before connecting to another.
- **Saving restarts the device.** A configuration save, a reboot, a factory reset
  and a saved change of BLE tag slots all restart the CHESTER and drop the link
  for a while. The app reconnects by itself.
- **A device connected from the nearby-devices scan is not remembered** and has
  no passkey looked up for it. Connect from the QR code to get both.
- **BLE tag slots you assign stay empty until you save.** **Assign** stages the
  change; it only reaches the device when you tap **Save to device**. Adding a
  tag by address, by QR code or by enrolling nearby tags applies at once, see
  [**BLE tags**](./ble-tags.md).
