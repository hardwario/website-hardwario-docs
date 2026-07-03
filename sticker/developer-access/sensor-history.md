---
title: Sensor History
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
The functionality described on this page is part of the upcoming **STICKER firmware v1.4.0** and is not available in v1.3.x.
:::

# Sensor History (`history`)

Store-and-forward buffering records readings while the device is offline and replays them on request. Records survive power loss. Recording is enabled with two `config` parameters, and the buffer is inspected and managed with the `history` command over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console).

| Command | Argument | Description |
|---|---|---|
| `config history-enable` | `true` / `false` | Enable the sensor history buffer. Default `false`. |
| `config history-sensors` | bitmask (uint32) | Which sensors to record. Default `0` = all capability-available sensors. |

Inspect and manage the buffer with the `history` command:

| Command | Description |
|---|---|
| `history info` | Print a buffer summary. |
| `history count` | Number of stored records. |
| `history read [N]` | List records, optionally only the last `N`. |
| `history stats` | Per-sensor minimum, maximum and average. |
| `history sensors [<name> on/off]` | List the recorded channels, or toggle one. |
| `history enable <on/off>` | Enable or disable history recording. |
| `history capture` | Sample now and store one record (bench test). |
| `history clear` | Erase the buffer. |

Stored records are replayed over LoRaWAN with the `req_history` downlink command (see [**Downlink Commands**](../lorawan-network-server/downlink-commands.md)).
