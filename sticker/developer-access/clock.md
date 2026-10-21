---
title: Real-time Clock
---
import Image from '@theme/IdealImage';

# Real-time Clock (`clock`)

STICKER maintains accurate wall-clock time via an internal Real-Time Clock (RTC). Wall-clock time is required for precise timestamping of [**Sensor History**](sensor-history.md) log records, [**Alarm Rules**](alarm-rules.md) event triggers, and network status messages.

:::info Firmware v2.0.0
In **STICKER firmware v2.0.0**, the network time comes from either radio (LoRaWAN or P2P), and the clock accepts only times between 2024-01-01 and 2099-01-01.
:::

---

## Time Synchronization Mechanisms

The RTC can be synchronized through three independent methods:

1. **Network Time:**
   - When the link comes up without a network time since boot (a LoRaWAN join, a P2P join or a boot with a stored P2P pairing), the device requests the time automatically: on LoRaWAN with the standard MAC command `DeviceTimeReq`, on P2P with a time request to the Hub.
   - The request rides the next regular uplink, so it costs no extra message.
   - After the first network time, the device re-synchronizes about once a week to correct clock drift during long-term field deployment.

2. **Encrypted NFC Local Sync:**
   - When configured using the **HARDWARIO Manager** app on a smartphone, the phone's system time can automatically update and set the STICKER RTC over NFC.

3. **Remote & Shell Commands:**
   - Time can be queried or manually updated using developer shell commands, or remotely with the `clock_sync` command on **fPort 85** over a radio or NFC.
   - A `clock_sync` without a time asks the device to fetch the network time. Once the time lands, the device sends an Info uplink that carries the request's sequence number, so the host can pair the answer with its request. A `clock_sync` with a time (the phone's time over NFC) sets the RTC at once and is answered with the resulting Info.

A time outside the accepted window (2024-01-01 to 2099-01-01) is rejected, whatever its source.

---

## Developer Shell Commands (`clock`)

Developer shell commands allow inspecting and managing the RTC directly (see [**Firmware Setup**](firmware-setup.md) for opening the console):

| Command | Description |
|---|---|
| `clock get` | Read and print the current UTC wall-clock time and Unix timestamp. |
| `clock set <unix>` | Manually set the RTC using a Unix epoch timestamp (seconds since Jan 1, 1970). Accepted range: 2024-01-01 (`1704067200`) up to, but not including, 2099-01-01 (`4070908800`). |
| `clock sync` | Request the network time: a LoRaWAN `DeviceTimeReq`, or a P2P time request. The request rides the next uplink, and the RTC updates when the answer lands. |