---
title: Alarm Rules
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
The functionality described on this page is part of the upcoming **STICKER firmware v1.4.0** and is not available in v1.3.x.
:::

# Alarm Rules (`alarm`)

Alarms generate an immediate uplink when a condition is met. The rules are managed with the `alarm` command over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console). Two related `config` parameters control how often alarm uplinks are sent:

| Command | Argument | Description |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (seconds) | Minimum interval between alarm uplinks. The first alarm is sent immediately; further alarms within the window are suppressed. `0` = disabled. Default `0`. |
| `config alarm-notif-time` | `1`-`60` (seconds) | Red-LED hold time for pulse and momentary (PIR, accelerometer) alarms. Default `10`. |

## Dynamic alarm rules

Per-sensor thresholds are **dynamic rules** held in 16 fixed slots (`0`-`15`). The slot index is the rule's stable identity, and several slots may target the same sensor (for example a warning band and a separate critical band).

| Command | Description |
|---|---|
| `alarm list [<index>]` | List all rules, or one slot. |
| `alarm set <index> <source> <quantity> <args>` | Write a rule into a specific slot. |
| `alarm new <source> <quantity> <args>` | Write a rule into the first free slot. |
| `alarm clear <index>` / `alarm clear all` | Delete one slot, or all of them. |
| `alarm poll` | Sample and evaluate the rules now (bench test). |

**Source** - which sensor the rule watches:

| Source | Sensor |
|---|---|
| `onboard` | On-board temperature / humidity / pressure |
| `s1` - `s4` | 1-Wire sensor slots 1 to 4 |
| `hall-left`, `hall-right` | Hall switches |
| `input-a`, `input-b` | External inputs |
| `pir` | PIR motion detector |
| `accel` | Accelerometer |

**Quantity** - what is measured, which also fixes the argument kind:

| Quantity | Kind | Arguments | Valid sources |
|---|---|---|---|
| `temperature`, `humidity`, `pressure` | threshold | `<lo> <hi> [hst]` | `onboard`; `temperature`/`humidity` also on `s1`-`s4` |
| `illuminance`, `magnetic-field` | threshold | `<lo> <hi> [hst]` | `s1`-`s4` |
| `tilt` | state | `<from> <to>` | `s1`-`s4` |
| `state` | state | `<from> <to>` | `hall-*`, `input-*`, `pir`, `accel` |
| `count` | rate | `<N>` | `hall-*`, `input-*`, `pir`, `accel` |

- **threshold**: the alarm fires when the value leaves the `[lo, hi]` band; `hst` is an optional hysteresis dead band (default `0`).
- **state**: `<from> <to>` are digital levels (`0`/`1`). `from != to` is an **edge** (fires once on that transition); `from == to` is a **level** (active while the line equals `to`). PIR and accelerometer are momentary sources, so only edge rules are accepted there.
- **rate**: `<N>` is the maximum number of counter events allowed per report interval.

**Examples:**

```
alarm set 0 onboard temperature 5 30 1   # alarm below 5 C or above 30 C, 1 C hysteresis
alarm set 1 input-a state 0 1            # fire when input A goes from 0 to 1 (rising edge)
alarm new hall-left count 10             # alarm at 10 or more pulses per report interval
alarm list                               # review all rules
alarm clear 1                            # delete slot 1
```

:::info Over the air
The same rules can be set over NFC or LoRaWAN with the `set_param` command, where each slot is a packed binary value rather than these shell arguments. The [**Downlink Commands Generator**](../lorawan-network-server/downlink-commands-generator.mdx) builds those rules from a form. The shell `alarm` command is the local equivalent.
:::
