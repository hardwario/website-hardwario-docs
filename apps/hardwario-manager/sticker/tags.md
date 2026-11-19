---
slug: tags
title: Organize devices with tags
description: "Label saved STICKER devices with colored tags by site, customer or floor in HARDWARIO Manager, manage the tag registry and filter the list by tag."
---

# Organize saved devices with tags

Tags label and filter the devices in your saved list, for example by site,
customer, floor, or state of deployment. A device can carry as many tags as you
need, and each tag has its own color.

---

## Tag a device

1. Open **HARDWARIO Manager** and go to **STICKER → Saved STICKER devices**.
2. Open a device row's menu and choose **Edit tags**, or tap the row and expand
   **Tags** on the device's screen.
3. Pick existing tags or type a new one and choose **Create "…"**, then confirm
   with **Done**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-sticker-tags.png" alt="Editing the tags on one saved device, with the chosen tags as colored chips and the Add tag field" width="320" />

---

## Manage the tag registry

Open the **⋮ menu** on the Saved STICKER devices list and choose **Tags**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-tags.png" alt="The Tags registry listing each tag with its color and the number of devices that carry it, and the Add tag button" width="320" />

The registry covers your whole list: **add**, **rename**, **recolor**, and
**delete** tags, with a count showing how many devices use each one. Renaming or
recoloring a tag updates it on every device at once. Deleting a tag removes it
from the devices but leaves the devices otherwise untouched.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-tags-color.png" alt="Choosing a new color for a tag in the tag registry" width="320" />

---

## Filter by tag

Back in **Saved STICKER devices**, tap the **tag icon** (**Filter by tag**) and
pick one or more tags to show only the matching devices. A badge on the icon
shows how many filters are active, and **Clear** removes them all.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-tag-filter.png" alt="Filtering the Saved STICKER devices list by tag, with one filter active and a Clear action" width="320" />

Filtering works alongside the **Serial or name** search box, so you can narrow by
tag and then search within the result.

:::info Tags travel with an export
Tags are not secret, so they ride along in exports. Tick **Include tags** when
exporting to add a tags column to the CSV; importing unions those tags onto the
matching serials and creates any that do not exist yet. See
[**Saved STICKER devices**](./saved-stickers.md).
:::
