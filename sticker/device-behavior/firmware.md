---
slug: firmware
title: Firmware versions and updates
description: How to find out which firmware a STICKER runs and how to update it with a J-Link.
---

# Firmware versions and updates

This page shows how to find out which firmware a STICKER runs and how to update it. Support usually needs the version first.

## Find the firmware version

- **Info uplink:** the device sends its Info uplink (device information) on fPort 85 after every join and then every 24 h by default. The decoded field `fw_version` shows the version, for example `"2.0.0"`.
- **On request:** queue the `get_info` downlink `08032200` on fPort 85. The device answers with an Info uplink after its next uplink.
- **HARDWARIO Manager:** read the device info over NFC, see [**Device info**](/apps/hardwario-manager/sticker/device-info).

## Update the firmware

You can update the firmware only with a J-Link programmer connected to the programming pads of the device. There is no update over the radio or over NFC, so every update needs physical access to the device. The tools and steps are in [**Firmware setup**](../developer-access/firmware-setup.md).

Flashing without erasing the chip keeps the settings, keys and counters. Read out the sensor history you need before you update.

:::caution Never erase the whole chip
A chip erase (mass erase) deletes the serial number, the secret key and the LoRaWAN keys. HARDWARIO Manager can then no longer talk to the device.
:::

## Release files

Every [**GitHub release**](https://github.com/hardwario/sticker-firmware/releases) contains firmware images and a checksum file. For installed devices use:

- the **release** image
- `SHA256SUMS`, to check a download with `sha256sum -c SHA256SUMS`
