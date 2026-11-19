---
slug: tools
title: Tools
description: "STICKER Tools in HARDWARIO Manager: sync the device clock, start calibration mode, reset the device and reach the vendor changes."
title_meta: "Tools (HARDWARIO Manager for STICKER)"
---

# Tools

**STICKER → Tools** gathers the actions that operate on a device directly rather
than through its configuration.

| Tool | What it does |
|---|---|
| **Sync time** | Set the device clock from the phone |
| **Calibration mode** | Reboot the device into its sensor-calibration service mode |
| [**Reset**](./reset.md) | Reboot, reset the counters, or reset the device, its LoRaWAN session or its whole configuration |
| [**Vendor changes**](./reset.md#vendor-changes) | Change the secret key, or run a vendor reset, with the device's vendor-token |

The sensor actions (**1-Wire sensors**, [**Sample data**](./sample-data.md) and
[**Sensor history**](./sensor-history.md)) are under **STICKER → Sensors**. The
radio actions are under [**STICKER → Radio**](./radio.md).

---

## Sync time

Choose **Sync time** and hold the phone against the STICKER. The device clock is
set from the phone, in UTC, and the app confirms with **Time synced**.

A synchronized clock is what lets stored measurements carry absolute timestamps.
Without it, [**Sensor history**](./sensor-history.md) can only report records
relative to the read, and **Device info** shows the **Time unsynced** health
flag.

---

## Calibration mode

Choose **Calibration mode**, confirm, and hold the phone against the STICKER.
The device reboots into its sensor-calibration service mode: it streams live
sensor readings over LoRaWAN and pauses normal reporting for up to about
2 hours. It leaves the mode by itself on the next boot.

This is a servicing action, used when a sensor needs calibrating against a
reference.

---

## Debug tools

If [**Debug mode**](../settings.md#debug-mode) is on, Tools also shows
**Debug tools**. They are diagnostic and repair tools, not needed for normal
configuration work:

| Tool | What it does |
|---|---|
| **Unclaim** | Release the device you hold the phone against so someone else can claim it, the same as **Unclaim** in [**Saved STICKER devices**](./saved-stickers.md) |
| **Write claim code** | Write the claim code back onto a device whose code was replaced |
| **NFC Console** | A low-level console for raw NFC commands |
