---
slug: tools
title: Tools
---

# Tools

**STICKER → Tools** gathers the actions that operate on a device directly rather
than through its configuration.

| Tool | What it does |
|---|---|
| **Sync time** | Set the device clock from the phone |
| [**1-Wire sensors**](./one-wire-sensors.md) | Scan the 1-Wire bus and assign sensors to slots |
| [**Sample data**](./sample-data.md) | Read every sensor now and transmit the values |
| [**Sensor history**](./sensor-history.md) | Read measurements the device stored earlier |
| **Calibration mode** | Reboot the device into its sensor-calibration service mode |
| [**Reset**](./reset.md) | The reset ladder, from a reboot to a factory reset |
| **Vendor changes** | Change the secret key, or perform a vendor reset — see [**Reset a device**](./reset.md) |

---

## Sync time

Choose **Sync time** and hold the phone against the STICKER. The device clock is
set from the phone.

A synchronised clock is what lets stored measurements carry absolute timestamps.
Without it, [**Sensor history**](./sensor-history.md) can only report records
relative to the read.

---

## Calibration mode

Choose **Calibration mode** and hold the phone against the STICKER. The device
reboots into its sensor-calibration service mode.

This is a servicing action, used when a sensor needs calibrating against a
reference. The device returns to normal operation afterwards.

---

## NFC Console

If [**Debug mode**](../settings.md) is on, Tools also shows an **NFC Console** —
a low-level console for raw NFC commands, used for diagnostics. It is not needed
for normal configuration work.
