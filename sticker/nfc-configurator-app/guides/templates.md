---
slug: hm-guide-templates
title: Templates
---

# Templates: create, share, edit, and apply

A template is a reusable configuration preset — **capture once, apply to many**. Templates carry only shareable settings; per-device identity and secrets (serial, LoRaWAN keys and EUIs, session keys) are intentionally left out so a template is safe to reuse across devices.

<img src="/img/hw-manager/hw-manager-template.png" alt="The Templates list" width="320" />

## Create a template

Go to **STICKER → Templates → New** and choose a source:

- **From a device** — read a STICKER and capture its current settings.
- **Create manually** — build one from scratch.
- **From hex** — paste a template's hex string.
- **From a QR code** — scan a shared template.

<img src="/img/hw-manager/hw-manager-template-add.png" alt="New template — choosing a source" width="320" />

If you build one **manually**, give it a name and set values in any category — a category left empty isn't saved — then **Save**.

<img src="/img/hw-manager/hw-manager-template-create.png" alt="Building a template manually" width="320" />

You can also save the configuration you are editing with **Configuration → Save as template**, or build one in a browser with the [**Template Generator**](../template-generator.mdx).

## Edit a template

Open a template and choose **Edit values** to change what it carries.

<img src="/img/hw-manager/hw-manager-template-edit.png" alt="Editing a template's values" width="320" />

## Apply a template

Open a template and choose how to write it:

- **Apply over NFC** — read the device, review the changes, then write.
- **Apply offline** — bulk-write to powered-off devices (the NFC field powers each tag).

Applying offline pre-fills the configuration from the template — review it, then tap **Write to tag**.

<img src="/img/hw-manager/hw-manager-template-offline.png" alt="Applying a template offline — pre-filled, review and write to tag" width="320" />

## Share a template

Open a template and choose **Share** to produce a **QR code** or **hex string**. Anyone can load it back with **New → From QR code** or **New → From hex**. **Rename** and **Delete** are in the same menu.

<img src="/img/hw-manager/hw-manager-template-share-qr.png" alt="Sharing a template as a QR code and hex string" width="320" />
