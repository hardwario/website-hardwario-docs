---
slug: configuration
title: Configuration
description: "Read, edit and write a STICKER configuration over NFC in HARDWARIO Manager: radio, intervals, sensors, history and alarms, plus file export and import."
title_meta: "Configuration (HARDWARIO Manager for STICKER)"
---

# Configure a STICKER

This guide walks through reading, editing and writing a STICKER's configuration
over NFC. If you have not installed the app yet, start with
[**Install the app**](../install.md).

Go to **STICKER → Configuration**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-configuration.png" alt="The Configuration menu with Read, Batch export, Batch write, Configure from file and Templates" width="320" />

| Entry | What it does |
|---|---|
| **Read** | Read what is on a device, then edit it and write it back. The usual path. |
| **Batch export** | Capture many devices' configurations in one session, see [**Scan multiple devices**](./batch-export.md) |
| **Batch write** | Set values once, then write them to one device after another, see [**Batch write**](./batch-write.md) |
| **Configure from file** | Load a configuration you saved earlier (see below) |
| **Templates** | Reusable configuration presets, see [**Templates**](./templates.md) |

---

## Read and edit

Choose **Read** and hold the phone against the STICKER until the configuration
is read. The form is headed by the device it came from (STICKER and its serial
number). Open the section you want to change.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-configuration-sticker.png" alt="A read configuration: the sections Radio, Measurement & reporting, Sensors, History and Alarms, collapsed, with Save to device pinned below" width="320" />

| Section | Covers |
|---|---|
| **Radio** | **Radio mode**, the network settings (region, sub-band, network), the DevEUI and activation, the key material in a **Keys** sub-group, ADR and data rate, the link check and the announce interval |
| **Measurement & reporting** | Sample and report intervals |
| **Sensors** | Which sensors are enabled, what the GPIO pins are used for, and the options of each sensor |
| **History** | Whether measurements are stored, which channels, and about how long the stored history lasts, see [**Sensor history**](./sensor-history.md) |
| **Alarms** | The low-battery threshold, how alarms are sent, the alarm buzzer, then the alarm rules, see [**Alarm rules**](./alarms.md) |

Each section lists its fields in the order the firmware applies them and hides
any field the device would ignore as configured. With **Radio mode** set to
`OFF`, the rest of the radio settings disappear. In `P2P` only the DevEUI, the
AppKey and the link check remain. **Sub-band** shows only for US915 and AU915,
and **Data rate** only while ADR is off. A hidden value stays in the form, so
switching back brings it back.

:::info Keys follow the radio mode and the activation
**Keys** sits inside the Radio section and is collapsed by default. It shows
only the keys that apply: JoinEUI and AppKey for **OTAA**, DevAddr and the
session keys for **ABP**, and the AppKey alone in **P2P**, whatever the
activation. With the radio off, the sub-group is hidden. The DevEUI is in the
**Join** group above it. To switch the radio mode or read the keys on their own,
use the **Radio** menu, see [**Radio**](./radio.md).
:::

Sensors is deliberately placed above History, because which sensors are enabled
decides which history channels exist.

---

## Write the changes

Edit what you need, then tap **Save to device** and hold the phone against the
STICKER again. The app confirms with **Configuration saved**: the device
restarts and applies the new configuration.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-configuration-sticker-revert.png" alt="A read configuration with the Radio section open and More actions expanded: Save to device, Apply template, Save as template and Export config to file" width="320" />

A value out of range is reported under its section's title, and the write
waits until you fix it; **Show** jumps to the first one.

The button in the form's header, **Revert to read values**, puts the whole form
back to what the device reported. The other actions wait under **More actions**,
next to **Save to device**:

| Action | Effect |
|---|---|
| **Apply template** | Fill the form from a saved template before writing, see [**Templates**](./templates.md) |
| **Save as template** | Turn the current settings into a reusable template |
| **Export config to file** | Save a copy you can reload later |

Nothing is written to the device until you tap **Save to device**.

For the meaning of each individual parameter, see
[**Configuration parameters**](/sticker/developer-access/configuration).

:::info An export leaves out the secrets
**Export config to file** writes JSON with the key material removed, so a
configuration file is safe to share with a colleague. Keys stay with the device
and in your [**Saved STICKER devices**](./saved-stickers.md) list.
:::

---

## Configure from file

**Configure from file** accepts three kinds of file and adapts to each:

| File | What happens |
|---|---|
| A single configuration export | Loaded straight into the form |
| A **batch export** | The app asks you to **Choose a device** from the file |
| A **change-log export** | The app asks you to **Choose a point in time**, then rebuilds the configuration as it was at that read |

A setting the file does not carry reads **Unchanged**, and the device keeps its
own value for it. A size counter shows how big the write is against the 448 B
limit. **Write to devices** then writes the file to each STICKER you tap, one
after another, the same way as [**Batch write**](./batch-write.md).

---

## Reuse a configuration across devices

To set up many devices the same way, save a **template** and apply it to each
device over NFC, or set the values once in **Batch write** and tap one device
after another. See [**Templates**](./templates.md) and
[**Batch write**](./batch-write.md).

:::danger Factory and vendor resets
A **factory reset** drops the device's LoRaWAN session and keys, so it re-joins
the network. A **vendor reset** wipes it back to its serial number and vendor
token and sets a new secret key. There is no undo. See
[**Reset a device**](./reset.md).
:::
