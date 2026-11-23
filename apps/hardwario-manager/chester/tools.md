---
slug: tools
title: Tools
description: "CHESTER Tools in HARDWARIO Manager: a firmware update from a QR code, an ID or a file, a device reboot, and a factory reset of the configuration."
title_meta: "Tools (HARDWARIO Manager for CHESTER)"
---

# CHESTER tools

**CHESTER → Tools** holds the three actions that operate on the device itself
rather than on its configuration.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-tools.png" alt="The CHESTER Tools menu listing Firmware update, Reboot device and Factory reset, each with its description" width="320" />

| Tool | What it does |
|---|---|
| [**Firmware update**](./firmware-update.md) | Flash new firmware over Bluetooth (QR, ID or file) |
| **Reboot device** | Restart the CHESTER (drops the connection) |
| **Factory reset** | Restore the CHESTER configuration to factory defaults |

While one action is running, the others are disabled: the connection serves one
command at a time.

---

## Reboot device

Restarts the device. The app asks first:

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-reboot.png" alt="The Reboot device? dialog saying the CHESTER will restart and drop the connection, with Cancel and Reboot" width="320" />

Choose **Reboot**. The app confirms with **Reboot command sent**. The CHESTER
drops its Bluetooth link while it restarts, and the app waits for it and
reconnects on its own. Go back to **Connect to CHESTER** to follow it: a banner
shows **Reconnecting to CHESTER** with the serial number, the attempt number
and a countdown, and **Cancel** stops waiting. The first attempt comes after 30
seconds, see [**Saving**](./configuration.md#saving).

Settings already saved to the device survive the reboot; anything changed but
not saved does not.

## Factory reset

Restores the device's configuration to its factory defaults. This is a
destructive action, and the app asks first: **Factory reset?** *Every
configuration value on the CHESTER returns to its factory default. This cannot
be undone.* Choose **Reset** to go ahead.

The app confirms with **Factory reset sent**. The device restarts with the
default configuration, and the app reconnects to it the same way as after a
reboot.

:::danger A factory reset clears what you configured
Intervals, communication mode, the LTE and LoRaWAN settings and everything else
in the configuration go back to their defaults. Export the configuration first
if you may need it again. **Share configuration** on the
[**Configuration**](./configuration.md) screen writes out the whole thing as
text.
:::

If an action fails, the app reports it rather than failing silently. The raw
error is kept behind **Technical details**, with a copy button. See
[**Troubleshooting**](./troubleshooting.md).
