---
slug: change-log
title: Device change log
description: "Turn on the STICKER change log in HARDWARIO Manager, browse each recorded read and write, restore an earlier configuration, and export or delete logs."
---

# View a device's change log

The change log records each configuration **read** and each successful **write**
for a saved STICKER, so you can see what a device was set to and when.

---

## Turn the change log on

Open **Settings** from the app menu and, under **STICKER change log**, choose
how long entries are kept: **Off**, **30 days**, **60 days** or **90 days**. The
default is 30 days. Choosing **Off** stops new recording; entries already
recorded are kept.

See [**App settings**](../settings.md).

---

## Open a device's log

1. Go to **STICKER → Saved STICKER devices** and tap the device.
2. Under **Change log**, pick an entry from the **Recorded read** list.
   Each is stamped with its date, time, and which sections it covers
   (**Radio**, **Application**, **Sensors**, **Alarms**).

<img className="app-screenshot" src="/img/hw-manager/hw-manager-sticker-log.png" alt="A saved device's screen scrolled to the Change log, with a recorded read selected and its actions" width="320" />

A write from **Batch write** or **Configure from file** records only the
values it wrote, not the whole form.

For the selected entry you can:

| Action | Effect |
|---|---|
| **Configure a STICKER with this** | Write that recorded configuration back to a device. A point-in-time restore |
| **Export this** | Share the single entry as a file |
| **Export log** | Share this device's whole log |
| **Delete this entry** | Remove just that entry |
| **Delete full log** | Remove this device's log |

:::tip Restoring an earlier configuration
**Configure a STICKER with this** is the quickest way back to a known-good state
after a change goes wrong. You can also reach the same recorded points through
**Configuration → Configure from file** by picking a change-log export and then
choosing a point in time. See [**Configuration**](./configuration.md).
:::

---

## Across all devices

From the **⋮ menu** on the **Saved STICKER devices** list you can
**Export logs** or **Delete all logs** across every device at once. Deleting
keeps the devices and their keys.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="The Saved STICKER devices overflow menu with Tags, Import, Export, Export logs, Delete all logs and Delete" width="320" />
