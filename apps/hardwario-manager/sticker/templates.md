---
slug: templates
title: Templates
---

# Templates: create, share, edit, and apply

A template is a reusable configuration preset: **capture once, apply to many**.
Templates carry only shareable settings; per-device identity and secrets (serial
number, LoRaWAN keys and EUIs, session keys) are deliberately left out, so a
template is safe to reuse across devices and safe to hand to a colleague.

Open **STICKER → Templates**.

<img src="/img/hw-manager/hw-manager-template.png" alt="The Templates list" width="320" />

---

## Create a template

Choose **Add template** and pick a source:

<img src="/img/hw-manager/hw-manager-template-add.png" alt="Creating a new template: choosing a source" width="320" />

| Source | Use it when |
|---|---|
| **From a device** | You have a device already set up the way you want |
| **Create manually** | You are building a preset from scratch |
| **From hex** | Someone sent you a template as a hex string |
| **From QR code** | Someone shared a template as a QR code |

Building one **manually**, give it a name and set values in any category. A
category left empty is not saved, so a template carries only what you chose.

<img src="/img/hw-manager/hw-manager-template-create.png" alt="Building a template manually" width="320" />

You can also save the configuration you are currently editing with
**Configuration → Save as template**, or build one in a browser with the
[**Template Generator**](./template-generator.mdx).

---

## Edit a template

Open a template and choose **Edit values**.

<img src="/img/hw-manager/hw-manager-template-edit.png" alt="Editing a template's values" width="320" />

**Rename** and **Delete** are in the same menu.

---

## Apply a template

Open a template and choose how to write it:

| Action | What happens |
|---|---|
| **Apply over NFC** | Read the device, review the resulting changes, then write |
| **Apply offline** | Write to powered-off devices in bulk, see [**Configure a powered-off device**](./offline-configuration.md) |

Applying offline pre-fills the configuration from the template. Review it, then
**Write to tag**.

<img src="/img/hw-manager/hw-manager-template-offline.png" alt="Applying a template offline: pre-filled, ready to review and write to the tag" width="320" />

---

## Share a template

Open a template and choose **Share** to produce a **QR code** and a **hex
string**; **Copy hex** puts the string on the clipboard. Anyone can load it back
with **Add template → From QR code** or **From hex**.

<img src="/img/hw-manager/hw-manager-template-share-qr.png" alt="Sharing a template as a QR code and a hex string" width="320" />

A template that is too large to fit in a QR code is offered as hex only.

Importing a template with the same name as one you already have asks whether to
**Replace** it.
