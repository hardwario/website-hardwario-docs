---
title: Real-time Clock
---
import Image from '@theme/IdealImage';

# Real-time Clock (`clock`)

STICKER maintains accurate wall-clock time via an internal Real-Time Clock (RTC). Wall-clock time is required for precise timestamping of [**Sensor History**](sensor-history.md) log records, [**Alarm Rules**](alarm-rules.md) event triggers, and network status messages.

:::info Firmware v1.4.0
The Real-time Clock (RTC) capabilities described on this page are a core feature of **STICKER firmware v1.4.0** and are not available in v1.3.x.
:::

---

## Time Synchronization Mechanisms

The RTC can be synchronized through three independent methods:

1. **LoRaWAN Network Sync (`DeviceTimeReq`):**
   - The device automatically requests network time using the standard LoRaWAN MAC command `DeviceTimeReq` upon joining the network.
   - Periodic re-synchronization is performed to correct clock drift during long-term field deployment.

2. **Encrypted NFC Local Sync:**
   - When configured using the **HARDWARIO Manager** app on a smartphone, the phone's system time can automatically update and set the STICKER RTC over NFC.

3. **Remote & Shell Commands:**
   - Time can be queried or manually updated using developer shell commands or remotely via LoRaWAN downlink commands on **fPort 85**.

---

## Developer Shell Commands (`clock`)

Developer shell commands allow inspecting and managing the RTC directly (see [**Firmware Setup**](firmware-setup.md) for opening the console):

| Command | Description |
|---|---|
| `clock get` | Read and print the current UTC wall-clock time and Unix timestamp. |
| `clock set <unix>` | Manually set the RTC using a 32-bit Unix epoch timestamp (seconds since Jan 1, 1970). |
| `clock sync` | Force an immediate LoRaWAN `DeviceTimeReq` MAC command to request network time synchronization. |