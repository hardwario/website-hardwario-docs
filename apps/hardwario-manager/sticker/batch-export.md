---
slug: batch-export
title: Scan multiple devices
---

# Scan multiple STICKERs (batch export)

Capture the configuration of many devices in one session and export them
together, useful for inventory, audits, and backups before a change.

---

## Capture the devices

1. Open **HARDWARIO Manager** and go to
   **STICKER → Configuration → Scan multiple (batch export)**.
2. Choose which sections to capture: **LoRaWAN**, **Application**, **Sensors**,
   **Alarms**.
3. Tap each STICKER in turn. Every device's configuration is captured
   automatically as you tap it, and the running count grows.

<img src="/img/hw-manager/hw-manager-batch-config-export.png" alt="Capturing several STICKERs in one batch, with the sections to capture chosen and two devices captured" width="320" />

The scanner re-arms itself after each device, so you can work through a tray
without touching the screen between taps. Tapping a device you have already
captured updates its entry rather than adding a duplicate, and **Remove** drops
one from the set.

---

## Export them together

When you have scanned everything, choose **Export all** and pick a format.

<img src="/img/hw-manager/hw-manager-batch-config-export-as.png" alt="Exporting all captured configurations as JSON or CSV" width="320" />

| Format | Result |
|---|---|
| **Share as JSON** | One `.json` file containing every captured configuration |
| **Share as CSV** | A spreadsheet with one row per captured configuration |

:::info This only reads
A batch scan never writes to a device. To give many devices the same settings,
use a [**template**](./templates.md) instead.
:::

A batch export can be loaded back in later: **Configuration → Configure from
file** recognises a batch file and asks which device from it to load. See
[**Configuration**](./configuration.md).
