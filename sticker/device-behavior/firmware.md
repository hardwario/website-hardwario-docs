---
slug: firmware
title: Firmware versions and updates
description: How to find the STICKER firmware version, how to update the firmware over SWD and what changes between firmware versions.
---

# Firmware versions and updates

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

This page shows how to find out which firmware a STICKER runs, how the firmware is updated and what changes when you move from one version to the next. The firmware version decides which decoder, which HARDWARIO Manager version and which commands work with a device, so support usually needs it first.

## Find the firmware version

| Where | How | What you see |
|---|---|---|
| Info uplink on fPort 85 | Sent after every join and then every `interval-announce` hours (default 24 h) | `info.fw_version`, for example `"2.0.0"`, together with `build_type_name` and `debug` |
| `get_info` downlink | Queue `08032200` on fPort 85 (`seq` 3) | An Info with `seq` 3 after the next uplink of the device |
| HARDWARIO Manager | **STICKER → Device info**, field **Firmware** **[ověřit]** | The running version |
| Shell of a debug build | `ats device info` | The lines `FW version` and `Build type` |

- **Terms:** an uplink is a message from the device to the network, a downlink a message from the network server to the device. The fPort is the port number that tells what a LoRaWAN message carries. The Info is described in [**Messages and timing**](messages.md), the device info screen of the app in [**Device info and LoRaWAN keys**](/apps/hardwario-manager/sticker/device-info).
- **Without the key:** over NFC the device reports its firmware version in its plain-text basic information, so a phone learns it even before it knows the secret key of the device.
- **LED:** while connected, a debug or provisioning image shows a green flash followed by a yellow flash every 3 s instead of the green flash alone, so you can tell it from a release image at a glance.

## Build types

| Info field | Value | Meaning |
|---|---|---|
| `build_type_name` | `main` | Release build from a version tag, as published on GitHub |
| `build_type_name` | `dev` | Test build of a branch or pull request; it reports the version of the release it leads to, so a `dev` build that reports 2.0.0 is not the 2.0.0 release |
| `build_type_name` | `custom` | Built locally or modified |
| `debug` | `false` | Release image: no shell, power management on |
| `debug` | `true` | Debug or provisioning image: shell over J-Link, power management off |

Only a `main` build with `debug: false` belongs in an installed device. A debug image keeps the processor awake for the shell, which drains the batteries, and goes into deep sleep after 2 h without shell activity. See [**Firmware setup**](../developer-access/firmware-setup.md).

## How to update the firmware

STICKER firmware can be replaced only with a J-Link debug probe connected to the SWD programming pads of the device. There is no update over LoRaWAN, over NFC or through a bootloader. This is deliberate: nobody can replace or downgrade the firmware remotely. It also means that a firmware fix needs physical access to every device.

- **Images:** every [**GitHub release**](https://github.com/hardwario/sticker-firmware/releases) ships three images and a checksum file. For v2.0.0 these are `hio-sticker-v2.0.0-release.hex` for installed devices, `hio-sticker-v2.0.0-debug.hex` with the shell for diagnostics, `hio-sticker-v2.0.0-provisioning.hex` for the production line and `SHA256SUMS`. Check a download with `sha256sum -c SHA256SUMS`.
- **Procedure:** the tools, the build and the flash commands are described in [**Firmware setup**](../developer-access/firmware-setup.md).
- **What stays:** a normal flash replaces only the program. It keeps NVS (the settings storage in flash) with the settings, identity, keys, pulse counters and LoRaWAN frame counters.
- **History:** a release image leaves the stored sensor history in place. A debug or provisioning image is larger and overwrites the history area, so read out the history you need before you flash one.

| Data | Flash without erase | Chip erase |
|---|---|---|
| Settings, identity, secret key, LoRaWAN keys | Kept | Erased |
| Pulse counters | Kept | Erased |
| LoRaWAN frame counters and join counter (DevNonce) | Kept | Erased |
| Sensor history | Kept with a release image; overwritten by a debug or provisioning image | Erased |

:::warning Never erase the whole chip
A chip erase (also called mass erase) deletes the serial number, the secret key, the claim token and the LoRaWAN keys. HARDWARIO Manager can then no longer talk to the device. A device that has joined the network with OTAA (over-the-air activation) before may also be refused by the network server until its used join counters (DevNonce) are cleared there.
:::

### HARDWARIO STICKER Flash Tool

The HARDWARIO STICKER Flash Tool is a desktop application for Windows and Linux that flashes and provisions STICKER over a J-Link. Its release for firmware v2.0.0 bundles the v2.0.0 images and offers a **Migrate from / to** choice, by default v1.4.0 to v2.0.0, which translates the renamed settings. It can also write a QR code with the secret key of the device, which HARDWARIO Manager imports. A migration of a real device from v1.4.0 to v2.0.0 had not been tested when this release of the tool came out **[ověřit]**. How customers get the tool also needs confirmation **[ověřit]**.

## Upgrade from v1.4.x to v2.0.0

Firmware v2.0.0 is not compatible with v1.4.x in several places. Go through this list before you upgrade a device or a fleet:

1. **HARDWARIO Manager:** update the app together with the firmware. An older app cannot configure a v2.0.0 device, and NFC now works only on a powered device.
2. **Old NFC records:** a device upgraded from v1.4.x keeps its old NDEF records in the tag memory, including the claim token in plain text. Wipe them once: run `nfc clear` on a debug build, or write an empty NDEF message from the phone.
3. **Renamed and reset settings:** `lrw-deveui` and `lrw-appkey` become `radio-deveui` and `radio-appkey` and keep their values. `lrw-link-check-interval` and `lrw-link-check-fail-rejoin` become `radio-link-check-interval` and `radio-link-check-fail-rejoin` and return to 5 and 5. The input, PIR and buzzer capabilities become `cap-gpio-mode`, `cap-gpio-input-a` and `cap-gpio-input-b` and return to `none`; set them again, otherwise the input values and counters are missing from telemetry. A host that still sends the old capability fields gets `BAD_REQUEST`.
4. **Alarm rules:** write all alarm rules again. A rule is now 18 B long and addresses a value by slot and channel, the 1-Wire type numbers changed (2 for a DS18B20, 3 for a MACHINE PROBE) and the old rules are deleted during the first one or two boots. See [**Alarms**](alarms.md).
5. **Threshold `dwell`:** on threshold rules `dwell` is now a deadband in the unit of the value, for example 0.5 °C, and no longer a time in seconds. On rate rules `dwell` is now the counting window.
6. **Sensor history:** select the history channels again with `history-channels`, which replaces `history-sensors`. A host that still writes the old `history_sensors` field gets an `Ack`, but nothing changes. Stored history starts empty after the upgrade, so read out what you need first. There is no supported downgrade.
7. **Decoder:** switch to the `ttn.js` of v2.0.0, and in a mixed fleet pick the decoder by the firmware version in the Info. The Info no longer carries the link state, which v1.4.x reported over NFC; ask for it with `get_radio_state`, which works on every channel. The `device_status` bits were regrouped. See [**Payload and decoder**](payload.md).
8. **Commands:** `lrw_reset`, `enter_calibration` and the `calibration` setting no longer work over LoRaWAN, see [**Downlink processing**](downlinks.md).
9. **Resets:** `factory_reset` now also clears the pulse counters and the sensor history.
10. **LoRa P2P only:** update the nodes and the ProXimos Hub together; every node joins again after the update.

## Behavior changes by version

The table lists the changes between versions that change what a user sees.

| Area | v1.3.x | v1.4.x | v2.0.0 |
|---|---|---|---|
| Uplink format | Bitmap on fPort 1 | Protobuf on fPorts 2, 3 and 85, version byte `0x01` | Same ports and version byte; new encoding of alarms, 1-Wire readings and `device_status`; long answers in pages |
| Radio when first powered | No `radio-mode` setting | `radio-mode off` by default (radio-silent) | Same as v1.4.x |
| NFC | Not encrypted | Encrypted NDEF records; works on a device without batteries; two taps per command on iOS | Encrypted mailbox; one tap; the device must be powered; ready about 1.2 s after a reset |
| Remote control | No command protocol | Commands on fPort 85 | Same, plus `get_settings`, `get_radio_state` and paged answers; `lrw_reset` and calibration only over NFC |
| Alarms | Fixed threshold settings per sensor | 16 rules, alarm reports on fPort 3; `dwell` in seconds | 16 rules addressed by slot and channel; threshold `dwell` is a deadband |
| Pulse counters after a restart or power loss | Lost | Kept | Kept; `factory_reset` clears them |
| Sensor history | None | Flash ring, read on request | Selectable channels; starts empty after the upgrade from v1.4.x |
| From link loss to a new join, default settings | Not documented | About 9–10 h | About 4–5 h |
| Battery below 1.8 V at power-up | Not documented | The device keeps restarting | The device blinks red and switches itself off |

For the full list of changes, see the [**Changelog**](../changelog.md). How the device connects and recovers a lost link is described in [**Network connection**](network-connection.md).
