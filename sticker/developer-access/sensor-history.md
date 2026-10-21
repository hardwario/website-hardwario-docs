---
slug: sensor-history
title: Sensor History
---
import Image from '@theme/IdealImage';

# Sensor History & Store-and-Forward (`history`)

The **Sensor History Engine** provides store-and-forward functionality for STICKER. When the device loses radio connectivity, sensor readings are continuously buffered into non-volatile flash memory. Once connectivity is restored or requested by the backend, historical data records can be replayed over the radio or read locally over NFC.

Stored records survive battery replacement and power loss. Recording is configured via `config` parameters and managed locally using the `history` shell command (see [**Firmware Setup**](firmware-setup.md)).

:::info Firmware v2.0.0
In **STICKER firmware v2.0.0**, the recorded channels are selected with `history-channels`, which replaces the `history-sensors` bitmask. Any sensor channel can be recorded, including the 1-Wire channels, the barometer temperature and the analog inputs. Record timestamps follow the real-time clock across reboots and power loss.
:::

---

## Configuration

| Command | Argument | Description |
|---|---|---|
| `config history-enable` | `true` / `false` | Master enable for history recording. Default `false`. |
| `config history-channels` | 48 hex digits (24 bytes) | Channels to record, in record order: up to 24 one-byte entries, each `slot × 32 + channel` (slot `0` = motherboard, `1`-`4` = 1-Wire slots `s1`-`s4`), `ff` = unused. Default `0001` followed by `ff` bytes: onboard **temperature + humidity**. |

The entries use the channel numbers from the channel tables on the [**Alarm Rules**](alarm-rules.md#channels) page. For example onboard temperature (`00`), humidity (`01`), pressure (`02`) and the temperature of 1-Wire slot 1 (`1 × 32 + 0` = `20`):

```bash
config history-channels 00010220ffffffffffffffffffffffffffffffffffffffff
config history-enable true
settings save
```

The `history sensors` command below selects channels by name, which is usually easier than writing the hex string.

One record is stored per report interval (`interval-report`). It holds the latest sensor sample, taken on the `interval-sample` schedule (or just before the report when `interval-sample` is `0`), see [**Configuration**](configuration.md). The [**Sensor History Calculator**](sensor-history-calculator.mdx) shows how long the buffer lasts for a given channel selection and interval.

### Recordable Channels

Every channel of the motherboard and of each 1-Wire slot with a sensor type can be recorded. In the shell, motherboard channels use their plain names (`temperature`, `pressure`, `input-a-voltage`, …) and 1-Wire channels carry the slot prefix (`s1-temperature`, `s2-humidity`, …).

- The momentary channels `pir-motion` and `accel-motion` record `1` when at least one event occurred during the interval.
- Entries whose capability is off, and entries of a 1-Wire slot without a sensor type, are skipped and take no space.
- A value that is not available (for example a disconnected probe) is stored as missing.

---

## Shell Commands (`history`)

| Command | Description |
|---|---|
| `history info` | Print buffer status, memory usage, capacity and time segments. |
| `history count` | Display total number of currently stored records. |
| `history read [N]` | Print recorded history samples (or the last `N` records). A record captured before the clock was set shows its time as `up <s> (no-rtc)`, the uptime of the boot that recorded it. |
| `history stats` | Display minimum, maximum, and average values per recorded channel. |
| `history sensors [<channel> on\|off]` | Without arguments, list every channel with whether it is recorded and whether its capability is on. With arguments, add or remove one channel. Changing the selection clears the buffer. |
| `history enable on\|off` | Master switch to enable or suspend history logging. |
| `history capture` | Force an immediate sensor sample and write one record to buffer (useful for bench testing). |
| `history clear` | Purge the entire history ring buffer. |

`history sensors` and `history enable` change the running device at once; like a `config` write, the change is kept only after `settings save`.

---

## Replaying & Retrieving History

Data stored in the history buffer can be retrieved through two interfaces:

- **Over the radio (Remote Replay):** The backend issues a `req_history` downlink command on **fPort 85**. STICKER streams back matching historical data frames as `history_frame` uplinks on fPort 85 (see [**Downlink Commands**](../connectivity/downlink-commands.md)). This works over LoRaWAN and P2P.
- **Over Encrypted NFC (Local Offload):** The **HARDWARIO Manager** app reads the buffer page-by-page over an encrypted NFC session (`req_history_page`), allowing full offline data retrieval without consuming radio airtime.

Each history frame carries its own `time_synced` flag: records captured before the real-time clock was set have no wall-clock time and are marked unsynced.

---

## Storage & Ring Buffer Capacity

History records are stored in a dedicated **32 KB flash ring partition**, strictly isolated from system configuration and radio credentials. The ring consists of 16 pages of 2 KB; each page starts with a 40 B header and holds **1,757 B** of records.

Memory footprint varies by selected channel size:
- State channels, motion flags, humidity and orientation: 1 byte each
- Temperatures, pressure, illuminance, voltages, altitude, magnetic field and acceleration: 2 bytes each
- Counters (Hall switches, inputs, PIR and accelerometer motion counts): 4 bytes each

**Capacity Estimate:**
For the default configuration (temperature + humidity, 3 B per record), a page holds 585 records and the 32 KB buffer **9,360 records**, representing about **97 days of offline logging** at the default 15-minute report interval. For other channels and intervals, use the [**Sensor History Calculator**](sensor-history-calculator.mdx).

:::caution When the history starts over
- **Upgrade from v1.4.x:** firmware v2.0.0 does not read the history pages of v1.4.x, so the ring **starts empty** after the upgrade. Read out what you need before upgrading. There is no supported downgrade from v2.0.0.
- **Changing the record layout or the interval:** a change of `history-channels`, of a 1-Wire slot's sensor type, of a capability used by a recorded channel, or of `interval-report` restarts the ring.
- **Resets:** `settings factory-reset` and `settings vendor-reset` erase the history; `settings device-reset` keeps it (see [**Maintenance**](maintenance.md)).
- **Debug builds** keep the history in a small RAM ring (992 B) that is cleared at every boot. Only the release image records to flash.
:::