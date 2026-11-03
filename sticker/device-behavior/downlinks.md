---
slug: downlinks
title: Downlink processing
description: How STICKER receives commands over the radio, when a change takes effect and how the device answers.
---

# Downlink processing

You can control STICKER remotely with downlinks, messages that the network server sends to the device. This page explains what the device does with them.

## How a command reaches the device

STICKER listens for a downlink only briefly after each of its own uplinks (messages from the device). A command therefore waits on the network server until the next uplink. That is usually the next regular report, sent once per report interval (`interval-report`, default 15 min).

1. Queue the command on **fPort 85**, the port number that STICKER uses for commands. Give it a sequence number (`seq`) of 1 or higher.
2. After its next uplink the device receives the command and runs it.
3. The device answers with an uplink on fPort 85 that carries the same sequence number.

If no answer arrives, read the settings back with `get_settings` before you repeat a command that saves or restarts the device.

## Commands over the radio and over NFC

Commands that could cut the device off the network or reveal its secrets work only over NFC with [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration).

**Over the radio:**

- read settings, device information or the radio state (`get_param`, `get_config`, `get_settings`, `get_info`, `get_radio_state`)
- change and save settings or restart (`set_param`, `settings_save`, `reboot`)
- reset counters, join again or sync the clock (`reset_counters`, `lrw_join`, `clock_sync`)
- measure and send now, scan the 1-Wire bus, play the buzzer or replay the history (`sample`, `force_send`, `w1_scan`, `buzzer_play`, `req_history`)

**Only over NFC** (or the shell):

- device reset and factory reset (`device_reset`, `factory_reset`)
- LoRaWAN reset (`lrw_reset`)
- calibration mode (`enter_calibration`)
- a new secret key (`set_secret_key`)

Sent over the radio, these get the error `NOT_READY`. Build commands with the [**Downlink commands generator**](../connectivity/downlink-commands-generator.mdx). [**Downlink commands**](../connectivity/downlink-commands.md) describes each command in hex and JSON.

<details>
<summary><b>Example downlinks</b></summary>

Hex for fPort 85. The number in brackets is the sequence number.

| Hex | What it does |
|---|---|
| `08032200` | `get_info` (3): sends the Info uplink (device information) |
| `0807fa0100` | `get_settings` (7): sends the settings uplink (key settings) |
| `08043200` | `settings_save` (4): saves the changes, then restarts |
| `08056200` | `clock_sync` (5): gets the network time, then sends an Info uplink |
| `08064a00` | `force_send` (6): sends a telemetry report (measurements) instead of an answer |
| `08118a0100` | `lrw_join` (17): joins the network again without a restart |
| `080812023001` | `set_param` (8): clears all alarm rules until the next restart |

</details>

## When a change takes effect

- **After a save:** most settings sent with `set_param` take effect only after a save (`settings_save` or `set_param` with `save`), which restarts the device. Until then the device keeps its current settings, although read commands already show the new values. A `reboot` without a save discards the changes.
- **At once:** alarm rules and counter resets apply without a restart. Alarm rules that you do not save return to the old ones at the next restart.
- **Never over the radio:** a downlink cannot change the radio mode, region, LoRaWAN keys or other network settings, because a wrong value could cut off the link. A `set_param` that contains one of them gets `NOT_WRITABLE` and changes nothing. Use NFC instead, see [**Configuration**](configuration.md).

The device saves, restarts or joins again only after its answer has gone out, at the latest about 2 min after the command.

## Answers

Most commands answer with a short confirmation (`Ack`). Read commands answer with their data.

A long answer arrives in several parts, which the device sends by itself; the decoder labels them, for example `"pages": "2/4"`. A device far from the gateway uses a low data rate: each uplink carries few bytes and takes long to send, so allow at least an hour for a large answer. If a part is missing, send the same `get_config` or `get_param` again with `page` set to the `page_index` of the missing part; it counts from 0, so the part labeled `"2/4"` is `page` 1.

<details>
<summary><b>Error answers</b></summary>

For a rejected setting, the decoded error also identifies the setting by two numbers, its group and its field.

| Error | Usual cause |
|---|---|
| `BAD_REQUEST` (1) | The command could not be decoded |
| `OUT_OF_RANGE` (2) | A value or alarm rule out of range, or a part that does not exist |
| `NOT_READY` (3) | Not allowed on this channel, another long answer still running, 1-Wire bus or buzzer not ready |
| `HISTORY_UNAVAILABLE` (4) | No history in the requested time window, for example because history is off |
| `NOT_SUPPORTED` (7) | Unknown command or a function that this firmware does not include |
| `NOT_WRITABLE` (8) | Setting not writable on this channel, for example a LoRaWAN setting over the radio |
| `BUDGET_TOO_SMALL` (9) | Answer too large for the current data rate; try again at a higher data rate or read it over NFC |

</details>
