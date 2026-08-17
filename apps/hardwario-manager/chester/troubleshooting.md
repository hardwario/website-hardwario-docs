---
slug: troubleshooting
title: Troubleshooting
---

# CHESTER troubleshooting

The app classifies every Bluetooth failure into a message that says what
happened and what to do. The raw error is kept behind a **Technical details**
expander, with a **Copy** button — include that text when you report a problem.

Where retrying cannot help — Bluetooth switched off, a permission not granted —
the app offers to open the phone's settings instead of a retry button.

---

## Finding and connecting

| What you see | What to do |
|---|---|
| **Bluetooth is off** | Turn the phone's Bluetooth on, then scan again. |
| **Bluetooth permission needed** | Allow the nearby-devices permission for the app in the phone's settings — see [**Install the app**](../install.md). |
| **Device not found** — no CHESTER nearby | Check the device is powered on and in range, then scan again. |
| Found devices, but not the serial you wanted | The app lists which serials it did see. Confirm you are looking at the right device. |
| **Connection failed** | Move the phone closer, power-cycle the device, and try again. |
| The scan stops on its own | Scanning runs for about 30 seconds. Use **Rescan**. |
| **Not a CHESTER** | The device does not expose the CHESTER services. Check it runs CHESTER firmware and is not stuck in the bootloader. |
| The device disappeared before connecting | It went out of range. Scan again and tap it once it reappears. |

---

## Pairing

| What you see | What to do |
|---|---|
| **Pairing failed** | The phone probably holds a stale pairing. Forget the device in the phone's Bluetooth settings, then connect again and enter the passkey from the label. |
| Pairing did not complete | Accept the pairing request on the phone and enter the passkey. If a stale pairing exists, forget it first. |
| The device refused to pair right now | Wait a few seconds and try again. Power-cycling the device clears a stuck pairing attempt. |
| A generic Bluetooth error on Android | Move closer, power-cycle the device, and retry. If it persists, turn the phone's Bluetooth off and on, or forget the device in the Bluetooth settings. |

:::tip Forgetting the device is the usual fix
Most persistent pairing problems are a stale bond on the phone. Forget the
CHESTER in the phone's own Bluetooth settings — not just in the app — then
connect again from the QR code.
:::

---

## While connected

| What you see | What to do |
|---|---|
| **Connection lost** — the device closed the link | It may have rebooted; a reboot or a firmware update does this. Reconnect. |
| The device powered off | Check its power supply or battery, then reconnect. |
| **No answer from the device** | Keep it close to the phone and try again. If it stays silent, reconnect. |
| The phone has too many Bluetooth connections | Disconnect another device and try again. |
| **The device refused it** | The firmware does not allow that operation. Check the device runs current CHESTER firmware. |
| The configuration read came back with nothing usable | The firmware may not support the configuration shell commands. See [**Configuration**](./configuration.md). |

---

## Downloads

Fetching a passkey or a firmware image needs the internet:

| What you see | What to do |
|---|---|
| **No server connection** | Check the phone's internet connection and try again. |
| The server has nothing at that address (404) | The link is wrong or expired. Get a fresh QR code. |

---

## Things that are expected

- **Leaving the CHESTER screen disconnects the device.** This is by design — the
  connection belongs to that screen.
- **Only one CHESTER at a time.** Disconnect before connecting to another.
- **A device connected from the nearby-devices scan is not remembered** and has
  no passkey looked up for it. Connect from the QR code to get both.
- **BLE tag slots stay empty until you save.** Binding a tag stages the change;
  it only reaches the device when you tap **Save to device** — see
  [**BLE tags**](./ble-tags.md).
