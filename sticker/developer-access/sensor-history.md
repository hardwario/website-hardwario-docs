---
slug: sensor-history
title: Sensor History
---
import Image from '@theme/IdealImage';

# Sensor History & Store-and-Forward (`history`)

The **Sensor History Engine** provides store-and-forward functionality for STICKER. When the device loses LoRaWAN connectivity, sensor readings are continuously buffered into non-volatile flash memory. Once connectivity is restored or requested by the backend, historical data records can be replayed over the radio or read locally over NFC.

Stored records survive battery replacement and power loss. Recording is configured via `config` parameters and managed locally using the `history` shell command (see [**Firmware Setup**](firmware-setup.md)).

:::info Firmware v1.4.0
The Store-and-Forward functionality described on this page is a core feature of **STICKER firmware v1.4.0**. It records sensor samples to flash during network outages and replays them on request.
:::

---

## Configuration

| Command | Argument | Description |
|---|---|---|
| `config history-enable` | `true` / `false` | Master enable for history recording. Default `false`. |
| `config history-sensors` | Bitmask (uint32) | Channel mask specifying which sensor channels to buffer. Default `0x0003` (**temperature + humidity**). `0` disables channel recording. |

Sensors are sampled and stored on the `interval-sample` schedule (or once per uplink when `interval-sample` is `0`) — see [**Configuration**](configuration.md).

### Recordable Channels

The `history-sensors` bitmask maps bit $i$ to channel $i$ (up to 19 selectable channels across the 32-bit field):

- **`temperature`**, **`humidity`** — Integrated ambient sensors
- **`s1-temp`/`s1-hum` … `s4-temp`/`s4-hum`** — 1-Wire sensor slots 1 through 4
- **`hall-left`**, **`hall-right`**, **`input-a`**, **`input-b`** — Pulse/counter inputs
- **`motion`** — Integrated PIR motion detection count
- **`pressure`**, **`illuminance`**, **`orientation`**, **`accel-motion`** — Barometer, ambient light, accelerometer tilt, and motion event counters

Channels for unpopulated physical sensors are automatically skipped.

---

## Shell Commands (`history`)

| Command | Description |
|---|---|
| `history info` | Print buffer status, memory usage, and capacity estimates. |
| `history count` | Display total number of currently stored records. |
| `history read [N]` | Print recorded history samples (or the last `N` records). |
| `history stats` | Display minimum, maximum, and average values per recorded sensor. |
| `history sensors [<name> on/off]` | Inspect currently active history channels or toggle an individual channel. |
| `history enable <on/off>` | Master switch to enable or suspend history logging. |
| `history capture` | Force an immediate sensor sample and write one record to buffer (useful for bench testing). |
| `history clear` | Purge the entire history ring buffer. |

---

## Replaying & Retrieving History

Data stored in the history buffer can be retrieved through two interfaces:

- **Over LoRaWAN (Remote Replay):** The backend issues a `req_history` downlink command on **fPort 85**. STICKER streams back matching historical data frames as `history_frame` uplinks on fPort 85 (see [**Downlink Commands**](../connectivity/downlink-commands.md)).
- **Over Encrypted NFC (Local Offload):** The **HARDWARIO Manager** app reads the buffer page-by-page over an encrypted NFC session (`req_history_page`), allowing full offline data retrieval without consuming LoRaWAN airtime.

---

## Storage & Ring Buffer Capacity

History records are stored in a dedicated **32 KB flash ring partition**, strictly isolated from system configuration and LoRaWAN credentials.

Memory footprint varies by selected channel size:
- Temperature / Pressure / Illuminance: 2 bytes each
- Humidity / Orientation: 1 byte each
- Pulse Counters: 4 bytes each

**Capacity Estimate:**
For the default configuration (Temperature + Humidity), the 32 KB flash buffer stores approximately **9,400 records**, representing **~98 days of offline logging** at a 15-minute sampling interval.

:::caution Firmware Update Memory Behavior
Reflashing or upgrading the firmware image re-initializes the 32 KB history partition layout and **erases stored history records**. System configuration and LoRaWAN credentials remain preserved.
:::