---
slug: templates
title: Templates
description: "Create STICKER configuration templates in HARDWARIO Manager from a device, by hand, hex or QR code, then apply them over NFC or in a batch write and share them."
---

# Templates: create, share, edit, and apply

A template is a reusable configuration preset: **capture once, apply to many**.
Templates carry only shareable settings; per-device identity and secrets (serial
number, LoRaWAN keys and EUIs, session keys) are deliberately left out, so a
template is safe to reuse across devices and safe to hand to a colleague.

Open **STICKER → Configuration → Templates**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-template.png" alt="The Templates list with a saved template, the sections it sets and the STICKER it came from, and the Add template button" width="320" />

---

## Create a template

Choose **Add template** and pick a source:

<img className="app-screenshot" src="/img/hw-manager/hw-manager-template-add.png" alt="New template: From a device, Create manually, From hex and From QR code" width="320" />

| Source | Use it when |
|---|---|
| **From a device** | You have a device already set up the way you want |
| **Create manually** | You are building a preset from scratch |
| **From hex** | Someone sent you a template as a hex string |
| **From QR code** | Someone shared a template as a QR code |

Building one **manually**, give it a name and set values in any category. A
category left empty is not saved, so a template carries only what you chose.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-template-create.png" alt="Building a template manually: the name field and the sections Radio, Measurement & reporting, Sensors, History and Alarms" width="320" />

You can also save the configuration you are currently editing with
**More actions → Save as template** on the Configuration screen, or build one in
a browser with the [**Template Generator**](./template-generator.mdx).

:::info Older templates are converted
A template made for firmware v1.4 (a shared code from an older app, or one from
the Template Generator) is converted for firmware v2.0.0 when you load it. The
form you apply it to says what changed under **Converted for firmware 2.0**.
Alarm rules from older firmware can't be converted and are removed, so set them
up again.
:::

---

## Edit a template

Open a template and choose **Edit values**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-template-edit.png" alt="Editing a template's values, with the Measurement & reporting section open and the report interval set to 15 min" width="320" />

**Rename** and **Delete** are in the same menu.

---

## Apply a template

Open a template and choose **Apply over NFC**: the app reads the device, fills
the form from the template for you to review, then you write it with **Save to
device**.

To give many devices the same template, open
[**Batch write**](./batch-write.md), choose **More actions → Apply template**,
then **Write to devices** and tap one device after another.

---

## Share a template

Open a template and choose **Share** to produce a **QR code** and a **hex
string**; **Copy hex** puts the string on the clipboard. Anyone can load it back
with **Add template → From QR code** or **From hex**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-template-share-qr.png" alt="Sharing a template as a QR code and a hex string, with Copy hex" width="320" />

A template that is too large to fit in a QR code is offered as hex only.

Importing a template, or renaming one, to a name you already use asks whether
to **Replace** the existing one.
