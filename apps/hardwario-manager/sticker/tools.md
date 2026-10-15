---
slug: tools
title: Tools
title_meta: "Tools (HARDWARIO Manager for STICKER)"
---

# Tools

**STICKER → Tools** gathers the service actions that operate on a device directly
rather than through its configuration.

| Tool | What it does |
|---|---|
| **Sync time** | Set the device clock from the phone |
| **Calibration mode** | Reboot the device into its sensor-calibration service mode |
| [**Reset**](./reset.md) | The reset ladder, from a reboot to a factory reset |
| **Vendor changes** | Change the secret key, or perform a vendor reset, see [**Reset a device**](./reset.md) |
| **Debug tools** | Service and repair tools, listed only while Debug mode is on (see below) |

The sensor and network tools have menus of their own on the STICKER screen:

| Menu | What it holds |
|---|---|
| **Sensors** | [**1-Wire sensors**](./one-wire-sensors.md), [**Sample data**](./sample-data.md), [**Sensor history**](./sensor-history.md) |
| **LoRaWAN** | **LoRaWAN keys** and **LoRaWAN join**, see [**Device info and LoRaWAN keys**](./device-info.md) |

<img src="/img/hw-manager/hw-manager-sticker-tools.png" alt="The STICKER Tools menu with Sync time, Calibration mode, Reset and Vendor changes" width="320" />
<img src="/img/hw-manager/hw-manager-sticker-sensors.png" alt="The STICKER Sensors menu with 1-Wire sensors, Sample data and Sensor history" width="320" />

---

## Sync time

Choose **Sync time** and hold the phone against the STICKER. The device clock is
set from the phone, in UTC.

A synchronized clock is what lets stored measurements carry absolute timestamps.
Without it, [**Sensor history**](./sensor-history.md) can only report records
relative to the read.

---

## Calibration mode

Choose **Calibration mode** and hold the phone against the STICKER. The device
reboots into its sensor-calibration service mode: it sends live sensor readings
over LoRaWAN and pauses its normal reporting for up to about two hours. The mode
ends with the device's next restart.

This is a servicing action, used when a sensor needs calibrating against a
reference.

---

## Debug tools

With [**Debug mode**](../settings.md#debug-mode) on, Tools also lists
**Debug tools**: service and repair tools that are not part of the everyday
workflow.

| Tool | What it does |
|---|---|
| **Unclaim** | Hands the device you are holding on to someone else, see [**Hand a device on**](./saved-stickers.md#hand-a-device-on) |
| **Write claim code** | Writes a claim code onto a device whose code was replaced in ATELOS, so it can be claimed by tapping again. Issue the new code in ATELOS, paste it here, and hold the phone against the device. |
| **NFC Console** | A low-level console for raw NFC commands, used for diagnostics |
