---
slug: alarm-rules
title: Alarm Rules
---
import Image from '@theme/IdealImage';

# Alarm Engine & Rules (`alarm`)

The STICKER Alarm Engine continuously evaluates sensor measurements and system states against active rules. When a rule condition is met or cleared, an immediate uplink payload is generated and sent on **fPort 3**.

Rules are managed over the developer console using the `alarm` command (see [**Firmware Setup**](firmware-setup.md)) or configured remotely via NFC and LoRaWAN downlinks (`set_param` on fPort 85).

:::info Firmware v1.4.0
The Alarm Engine described on this page is a core capability introduced in **STICKER firmware v1.4.0**. It supports dynamic multi-slot threshold rules, state transitions, pulse rate limits, system health monitoring (low-battery, watchdog), and immediate event uplink reporting on **fPort 3**.
:::

---

## Global Rate Limiting & System Alarms

Global alarm rate limiting is controlled via the `config alarm-limit` parameter:

| Command | Argument | Description |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (seconds) | Minimum interval between consecutive alarm uplinks. The first event triggers an immediate uplink; subsequent alarms within this window are queued or suppressed. `0` = rate limiting disabled. Default `0`. |

### Built-in System Alarms
In addition to user-configured dynamic rules, firmware v1.4.0 automatically manages two system-level health conditions:
- **Low-Battery Alarm:** Triggered when battery voltage drops under load below critical operational thresholds. Reported via fPort 3.
- **No-Data Watchdog Alarm:** Monitors internal sensor sampling. If a physical sensor fails to respond or misses successive sampling windows, a watchdog alarm is raised on fPort 3.

---

## Dynamic Alarm Rules

Per-sensor thresholds are held in 16 fixed slots (`0`-`15`). The slot index serves as the rule's stable identifier, allowing multiple rules (e.g., warning vs. critical levels) to monitor the same sensor slot simultaneously.

| Command | Description |
|---|---|
| `alarm list [<index>]` | List all active alarm rules or inspect a specific slot. |
| `alarm set <index> <source> <quantity> <args>` | Write a rule into a designated slot (`0`-`15`). |
| `alarm new <source> <quantity> <args>` | Assign a rule to the first available free slot. |
| `alarm clear <index>` / `alarm clear all` | Delete a single rule slot or purge all active rules. |
| `alarm poll` | Force an immediate sample and evaluation of all active rules (useful for bench testing). |

### Rule Sources

| Source | Sensor Target |
|---|---|
| `onboard` | On-board sensors (temperature, humidity, atmospheric pressure) |
| `s1` - `s4` | 1-Wire sensor channels 1 to 4 |
| `hall-left`, `hall-right` | Integrated magnetic door switches |
| `input-a`, `input-b` | External industrial inputs |
| `pir` | PIR motion detector |
| `accel` | 3-axis accelerometer |

### Quantities & Rule Types

| Quantity | Kind | Arguments | Supported Sources |
|---|---|---|---|
| `temperature`, `humidity`, `pressure` | threshold | `<lo> <hi> [dwell]` | `onboard`; `temperature`/`humidity` also on `s1`-`s4` |
| `illuminance`, `magnetic-field` | threshold | `<lo> <hi> [dwell]` | `s1`-`s4` |
| `tilt` | state | `<from> <to> [dwell]` | `s1`-`s4` |
| `state` | state | `<from> <to> [dwell]` | `hall-*`, `input-*`, `pir`, `accel` |
| `count` | rate | `<N> [dwell]` | `hall-*`, `input-*`, `pir`, `accel` |

- **Threshold Rules:** The alarm triggers when a measured value crosses outside the `[lo, hi]` window.
- **State Rules:** Evaluates `<from> <to>` digital levels (`0`/`1`). `from != to` represents an **edge** (triggers once upon transition); `from == to` represents a **level** (active while line equals `to`). Momentary sources (`pir`, `accel`) only accept edge rules.
- **Rate Rules:** Fires if counter accumulation exceeds `<N>` events within a single report interval.

---

## The `dwell` Parameter

The optional **`dwell`** duration (in seconds, default `0`) provides integrated noise filtering and hysteresis. It prevents false triggers from minor signal spikes or rapid input chatter.

| Rule Kind | `dwell` Behavior |
|---|---|
| **Threshold** | Value must continuously stay outside `[lo, hi]` for `dwell` seconds before activating. Returning inside the band deactivates the alarm immediately. |
| **State (Edge)** | The line transition must hold steady for `dwell` seconds before triggering. Once triggered, the rule enforces a cool-down window of `dwell` seconds before it can re-fire. |
| **State (Level)** | Line must remain in state `to` for `dwell` seconds continuously before triggering. |
| **Momentary (`pir`, `accel`)** | Enforces a cool-down window of `dwell` seconds before a new motion event can trigger an alarm. |
| **Rate** | Hold-off time enforcing minimum spacing between successive rate limit alerts. |

---

## Command Examples

```
alarm set 0 onboard temperature 5 30     # Alarm below 5 °C or above 30 °C (immediate)
alarm set 1 onboard temperature 5 30 60  # Alarm below 5 °C or above 30 °C (must hold for 60 seconds)
alarm set 2 input-a state 0 1            # Fire on rising edge (0 to 1) on External Input A
alarm set 3 input-a state 0 1 5          # Rising edge on Input A must hold for 5 seconds
alarm new hall-left count 10             # Alarm when left hall sensor exceeds 10 counts per interval
alarm list                               # Review all programmed alarm rules
alarm clear 1                            # Erase rule in slot 1
```

:::info Over-The-Air Management
Alarm rules can also be generated and updated over LoRaWAN or NFC using binary downlink payloads on fPort 85. Use the [**Downlink Commands Generator**](../connectivity/downlink-commands-generator.mdx) to build binary downlink strings for your network server.
:::