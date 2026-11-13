---
slug: history-and-counters
title: History and counters
description: How STICKER stores sensor history and counters, how long the data lasts, how you read it and what survives a restart or a reset.
---

# History and counters

This page explains how STICKER stores sensor history and counters, how you read them and what survives a restart or a reset.

## Sensor history

The sensor history keeps measurements on the device, so you can fill gaps in your data after a radio outage.

- **One record per report:** STICKER stores one record at every report interval (`interval-report`, default 15 min), also while it is offline.
- **Off by default:** switch on history recording (`history-enable`) and save, for example in HARDWARIO Manager under **Configuration → History**.
- **You choose the channels** (`history-channels`): up to 24 values, including 1-Wire probes, counters and input voltages. The default is the onboard temperature and humidity.
- **Measurements only:** alarms and settings changes are not stored. A missing value, for example from an unplugged probe, appears as `null`.

## How long the history lasts

| Recorded channels | Days at a 15 min report interval |
|---|---|
| Temperature only | 146 |
| Temperature and humidity (default) | 97.5 |
| Default plus one DS18B20 probe | 58.5 |

At a 5 min report interval the history lasts a third as long. When the memory is full, STICKER deletes the oldest sixteenth of the history and keeps recording, so plan with about 6 % less. The [**Sensor history calculator**](../developer-access/sensor-history-calculator.mdx) works out any other selection.

The history survives restarts, battery changes and network outages. Each restart or power loss costs at most about the last 2 records.

STICKER deletes the whole history when you change the report interval or the history channels, switch a recorded sensor on or off, change the probe type of a recorded 1-Wire slot or run a factory reset.

:::tip
Read the history before you change these settings or reset the device.
:::

## Reading the history

STICKER never sends its history by itself. You read it over the radio or over NFC.

**Over the radio,** your backend sends the `req_history` command as a downlink (a message from the network to the device), with an optional time window. STICKER answers with a series of uplinks (messages from the device to the network).

- Ask only for the time window you need. At a low data rate (the LoRaWAN speed setting) a long readout can take many hours.
- Send the request at least one report interval after a restart, otherwise the first new record can be lost.
- One readout runs at a time. If the connection drops, send the request again.
- Telemetry (the regular measurement messages) waits until the readout ends. Alarm reports do not wait.

**Over NFC,** HARDWARIO Manager reads the history under **Tools → Sensor history**, even with the radio off. See [**Sensor history**](/apps/hardwario-manager/sticker/sensor-history) in the HARDWARIO Manager guide.

<details>
<summary><b>Example downlinks</b></summary>

Send these on fPort 85, the LoRaWAN port STICKER uses for commands. `seq` is your own number, which the device repeats in its answer.

| Hex | What it does |
|---|---|
| `08015a00` | Reads the whole history (`seq` 1) |
| `08025a0c0880cae2d0061090e6e2d006` | Reads one hour from 2026-05-28 20:26:40 UTC (`seq` 2) |
| `08051206120220011801` | Switches on history recording and saves; the device restarts (`seq` 5) |
| `080752021801` | Resets the counter of input A (`seq` 7) |

The error `HISTORY_UNAVAILABLE` (4) means that no record matches. `BUDGET_TOO_SMALL` (9) means that the data rate is too low; ask again at a higher one. The [**Downlink commands generator**](../connectivity/downlink-commands-generator.mdx) builds other requests.

</details>

## Counters

STICKER counts activations of its Hall switches and inputs. An input can also count the pulses of a meter, see [**S0 interface (pulse output)**](../sticker-input-wiring/s0-interface.md).

- **Hall and input counters** are saved with every report and kept across restarts and battery changes. A restart loses only the pulses counted since the last save, with default settings at most one report interval.
- **PIR and accelerometer counts** are not saved and start from zero after every restart.
- **Overflow:** after 4 294 967 295 the totals wrap to 0. A backend that computes consumption from differences must handle a wrap and a reset.

To set the Hall and input counters to zero, use **Tools → Reset → Reset counters** in HARDWARIO Manager or the `reset_counters` command. The reset takes effect at once, without a restart.

## What survives what

| Data | Restart | Battery change | Device reset | Factory reset |
|---|---|---|---|---|
| Saved settings | Kept | Kept | Defaults | Defaults |
| Hall and input counters | Kept | Kept | Kept | Cleared |
| Sensor history | Kept | Kept | Kept | Cleared |
| Saved alarm rules | Kept | Kept | Cleared | Cleared |

- Settings and alarm rules that you changed but did not save are lost at any restart.
- A device reset keeps the LoRaWAN setup but switches off the history, the Hall switches and the inputs until you set them up again. History recorded with other than the default channels can no longer be read after a device reset.
- A factory reset keeps only the device identity, DevEUI and JoinEUI.

What each reset does is on [**Reset a device**](/apps/hardwario-manager/sticker/reset) in the HARDWARIO Manager guide.
