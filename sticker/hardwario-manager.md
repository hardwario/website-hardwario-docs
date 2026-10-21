---
slug: hardwario-manager
title: HARDWARIO Manager
description: "STICKER has no buttons, display or configuration cable and is set up over NFC with HARDWARIO Manager, the HARDWARIO mobile app."
title_meta: "HARDWARIO Manager (STICKER)"
---

# HARDWARIO Manager

STICKER has no buttons, no display, and no configuration cable. It is set up
over **NFC** with **HARDWARIO Manager**, the HARDWARIO mobile app. You hold the
phone against the device and the app reads or writes its settings.

:::tip Full App Documentation
This page explains how HARDWARIO Manager fits into the STICKER deployment
workflow. The app itself is documented in full under **APPS**:

- → [**Quick Start Guide**](/apps/hardwario-manager/first-steps): install the
  app, switch the wireless link on, and make the first tap. Start here.
- → [**HARDWARIO Manager Documentation**](/apps/hardwario-manager): the complete
  app guides and feature reference.
- → [**STICKER over NFC**](/apps/hardwario-manager/sticker): the STICKER menu
  and how a tap works.
:::

---

## What you need

- A phone with **NFC**, running the app. Getting it onto the phone and switching
  NFC on is covered in [**Install the app**](/apps/hardwario-manager/install).
- The device's **secret key**. STICKER talks over an encrypted NFC channel, so
  the app cannot read or write anything without it. You add each device once (see
  [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers)), and
  from then on the app fills the key in automatically.

## NFC needs a powered device

Since firmware **v2.0.0**, every phone command goes through the mailbox of the
STICKER's NFC chip: one tap, phone held still, the same on Android and iOS. The
mailbox only works while the device runs, so **the batteries must be in**. A
device with no batteries, or with a dead battery, reads as a blank tag.
Configuring a device with no batteries inserted is no longer possible.

To prepare a batch of devices before installation, configure powered units over
NFC (a [**template**](/apps/hardwario-manager/sticker/templates) gives them all
the same settings), or provision them over SWD with a J-Link and the
[**HARDWARIO STICKER Flash Tool**](https://github.com/hardwario/sticker-configuration).

A new device ships radio-silent (`radio-mode off`) and does not transmit until
the radio is switched on: see [**Features**](features.md).

---

## What you can do with a STICKER

| Task | Where it is documented |
|---|---|
| Read the serial number, firmware, and the LoRaWAN keys needed to register the device | [**Device info and LoRaWAN keys**](/apps/hardwario-manager/sticker/device-info) |
| Read and edit the full configuration: intervals, sensors, history, LoRaWAN | [**Configuration**](/apps/hardwario-manager/sticker/configuration) |
| Set threshold, state, and rate alarms | [**Alarm rules**](/apps/hardwario-manager/sticker/alarms) |
| Give many devices the same settings | [**Templates**](/apps/hardwario-manager/sticker/templates) |
| Capture a whole fleet's configuration in one session | [**Scan multiple devices**](/apps/hardwario-manager/sticker/batch-export) |
| Assign external 1-Wire probes to their slots | [**1-Wire sensors**](/apps/hardwario-manager/sticker/one-wire-sensors) |
| Test a device end to end | [**Sample sensor data**](/apps/hardwario-manager/sticker/sample-data) |
| Read measurements stored on the device | [**Sensor history**](/apps/hardwario-manager/sticker/sensor-history) |
| Reboot, reset, or re-key a device | [**Reset a device**](/apps/hardwario-manager/sticker/reset) |

Registering the device on a network server afterwards is covered under
[**ChirpStack**](connectivity/lorawan-chirpstack.md) and
[**The Things Stack**](connectivity/lorawan-tts.md).

---

## Configuring over the shell instead

The app is the standard way to set up a STICKER, and the only one that needs no
hardware beyond a phone. A device delivered in **Debug Mode** can also be
configured from a console over a debug connection, which is intended for
firmware development rather than deployment, see
[**Developer Access**](developer-mode.md) and the full
[**configuration parameter reference**](developer-access/configuration.md).
