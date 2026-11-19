---
slug: batch-export
title: Scan multiple devices
description: "Tap many STICKER devices in one HARDWARIO Manager session to capture their configurations and export them together as JSON or CSV for inventory or backup."
---

# Scan multiple STICKERs (batch export)

Capture the configuration of many devices in one session and export them
together, useful for inventory, audits, and backups before a change.

---

## Capture the devices

1. Open **HARDWARIO Manager** and go to
   **STICKER → Configuration → Batch export**.
2. Under **1 · Choose what to scan**, pick the sections to capture: **Radio**,
   **Application**, **Sensors**, **Alarms**.
3. Tap **Start scanning**, then hold the phone against each STICKER in turn.
   Every device's configuration is captured as you tap it, and the count
   (**2 captured**, for example) grows.

<img src="/img/hw-manager/hw-manager-batch-config-export.png" alt="Batch export with the sections Radio, Application, Sensors and Alarms chosen, one STICKER captured with Remove, and Export all" width="320" />

The scanner re-arms itself after each device, so you can work through a tray
without touching the screen between taps. Tapping a device you have already
captured updates its entry rather than adding a duplicate, and **Remove** drops
one from the set.

---

## Export them together

When you have scanned everything, choose **Export all** (the button shows the
count) and pick a format.

<img src="/img/hw-manager/hw-manager-batch-config-export-as.png" alt="Export all: Share as JSON or Share as CSV" width="320" />

| Format | Result |
|---|---|
| **Share as JSON** | One `.json` file containing every captured configuration |
| **Share as CSV** | A spreadsheet with one row per captured configuration |

:::caution Radio alone exports the keys
With **Radio** as the only section, **Share as JSON** produces the same file as
the [**Radio link keys**](./radio.md) export, with the keys each device
returned. With any other section chosen, and in every CSV, the key material is
left out.
:::

:::info This only reads
A batch scan never writes to a device. To give many devices the same settings,
use [**Batch write**](./batch-write.md) or a [**template**](./templates.md).
:::

A batch export can be loaded back in later: **Configuration → Configure from
file** recognizes a batch file and asks which device from it to load. See
[**Configuration**](./configuration.md).
