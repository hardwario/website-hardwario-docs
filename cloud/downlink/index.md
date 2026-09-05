---
title: Downlink
description: "Downlink messages in HARDWARIO Cloud: the three kinds of message the Cloud can send to a CHESTER device and how to use each of them."
---

# Downlink

A **downlink** is a message sent **from the Cloud to the device**. HARDWARIO Cloud supports three
kinds of downlink message:

- [**Data**](data.md): send JSON commands your firmware decodes.
- [**Config**](config.md): change the device's configuration with `app config` commands.
- [**Shell**](shell.md): run shell commands and read their responses.

To send a **Data** or **Config** downlink from the web interface, open the device's messages and click
**+&nbsp;SCHEDULE DOWNLINK** in the top-right corner. Because the device is usually asleep to save
power, a downlink is **queued** and delivered the next time it boots, sends an uplink, or polls the
Cloud, so the response may not appear immediately.
