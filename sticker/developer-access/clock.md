---
title: Real-time Clock
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
The functionality described on this page is part of the upcoming **STICKER firmware v1.4.0** and is not available in v1.3.x.
:::

# Real-time Clock (`clock`)

The device keeps wall-clock time, used to timestamp sensor-history records and alarm events. It syncs automatically from the network on join (LoRaWAN `DeviceTimeReq`) and can also be set from a phone over NFC. The `clock` command reads and sets it over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console).

| Command | Description |
|---|---|
| `clock get` | Print the current RTC time. |
| `clock set <unix>` | Set the RTC manually from a Unix timestamp. |
| `clock sync` | Request a network time sync. |
