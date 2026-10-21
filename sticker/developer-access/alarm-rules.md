---
slug: alarm-rules
title: Alarm Rules
---
import Image from '@theme/IdealImage';

# Alarm Engine & Rules (`alarm`)

The STICKER Alarm Engine continuously evaluates sensor measurements and system states against active rules. When a rule condition is met or cleared, an alarm uplink is sent on **fPort 3**, over LoRaWAN or P2P.

Rules are managed over the developer console using the `alarm` command (see [**Firmware Setup**](firmware-setup.md)) or configured remotely via NFC and radio downlinks (`set_param` on fPort 85).

:::info Firmware v2.0.0
In **STICKER firmware v2.0.0**, a rule addresses a sensor value by **slot and channel**. Every value of every sensor is a channel that can be alarmed, for example both temperatures of a machine probe, the barometer temperature or the voltage on an analog input. The shell syntax changed accordingly.

Alarm rules from v1.4.x are **not migrated**. After the upgrade the old rules are deleted; write them again in the new syntax.
:::

---

## Alarm Uplinks and Rate Limiting

| Command | Argument | Description |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (seconds) | Collection window for alarm uplinks. The first alarm event opens a window of this length; the events within it are collected and sent together when the window ends, or at once when 16 events have collected. One report takes at most 4 frames; what does not fit follows as the next report. `0` = every event is sent right away. Default `10`. |

- **Alarm state in every telemetry frame:** each periodic telemetry frame carries the current alarm state, so the state reaches the network even if an alarm frame is lost on the air.
- **Confirmed alarms:** with `config radio-alarm-ack true`, alarm uplinks are confirmed on both radios and repeated up to 3 times (see [**Configuration**](configuration.md#alarms-buzzer-and-battery)).
- **Buzzer:** on the buzzer variant, `config alarm-buzzer-mode` plays a melody while an alarm is active.

### Built-in System Alarms
In addition to the configured rules, the firmware raises these alarms by itself:
- **Low-Battery Alarm:** the battery voltage drops below `config battery-level` (default `2400` mV). It clears once the voltage recovers 0.3 V above the threshold.
- **No-Data Alarm:** a sensor that should report stops delivering values. A single failed read of an onboard sensor keeps the previous value and raises nothing. On a 1-Wire sensor, a silent chip raises one alarm on its first channel; when the whole sensor stops answering, one alarm for the whole device replaces them.
- **Sensor Mismatch Alarm:** a 1-Wire slot that expects one sensor type (`config sensorN-type`) sees a sensor of another type. The alarm (`sensor_mismatch`) carries the detected type; the slot's rules stop and its values are reported as missing until the right sensor is back or the slot is enrolled again.

---

## Dynamic Alarm Rules

Rules are held in 16 fixed indexes (`0`-`15`). The index serves as the rule's stable identifier, and several rules (e.g., warning vs. critical levels) can watch the same channel.

| Command | Description |
|---|---|
| `alarm list [<rule>]` | List all rules, or the rule with the given index. |
| `alarm set <rule> <slot> <channel> <key> <value> ...` | Write a rule to index `<rule>` (`0`-`15`). |
| `alarm new <slot> <channel> <key> <value> ...` | Write a rule to the first free index. |
| `alarm clear <rule>` / `alarm clear all` | Delete one rule or all rules. |
| `alarm poll` | Force an immediate sample and evaluation of all active rules (useful for bench testing). |
| `sensor types [<type>]` | List the sensor types and their channels with their numbers and rule kinds. |

`alarm list` prints each rule with its slot, channel, sensor type, values and state. A rule written for a sensor type the slot no longer expects is marked **`STALE`**: it is kept, but never evaluated. A rule on a channel whose capability is off (for example `cap-barometer false`) is stored and stays inactive until the capability is turned on.

### Slots

| Slot | Sensor |
|---|---|
| `mb` | The STICKER motherboard: onboard sensors, Hall switches, inputs A/B, PIR and accelerometer. |
| `s1`–`s4` | 1-Wire slots 1 to 4. The slot must have a sensor type (`config sensor1-type` … `sensor4-type`, set when a sensor is enrolled) before a rule can be written. |

### Channels

A channel is given by its name or its number; `sensor types` prints the list. Channels marked "—" cannot be a rule target.

**Motherboard (`mb`)**

| Ch | Name | Kind | Unit | Present with |
|:-:|---|---|---|---|
| 0 | `temperature` | threshold | °C | `cap-sht` |
| 1 | `humidity` | threshold | %RH | `cap-sht` |
| 2 | `pressure` | threshold | hPa | `cap-barometer` |
| 3 | `illuminance` | threshold | lx | `cap-light-sensor` |
| 4 | `temperature-baro` | threshold | °C | `cap-barometer` |
| 5 | `hall-left-state` | state | 0/1 | `cap-hall-left` |
| 6 | `hall-left-count` | rate | pulses | `cap-hall-left` |
| 7 | `hall-right-state` | state | 0/1 | `cap-hall-right` |
| 8 | `hall-right-count` | rate | pulses | `cap-hall-right` |
| 9 | `input-a-state` | state | 0/1 | input A `digital` |
| 10 | `input-a-count` | rate | pulses | input A `digital` or `pulse` |
| 11 | `input-a-voltage` | threshold | V | input A `analog` |
| 12 | `input-b-state` | state | 0/1 | input B `digital` |
| 13 | `input-b-count` | rate | pulses | input B `digital` or `pulse` |
| 14 | `input-b-voltage` | threshold | V | input B `analog` |
| 15 | `pir-motion` | state (momentary) | 0/1 | `cap-gpio-mode pir` |
| 16 | `pir-count` | rate | events | `cap-gpio-mode pir` |
| 17 | `accel-motion` | state (momentary) | 0/1 | `cap-accelerometer` |
| 18 | `accel-count` | rate | events | `cap-accelerometer` |
| 19 | `accel-orientation` | — | 1–6 | `cap-accelerometer` |
| 20 | `battery-voltage` | — (low-battery alarm only) | V | always |
| 21 | `altitude` | — | m | `cap-barometer` |

**1-Wire `dallas` (DS18B20, type `2`)**

| Ch | Name | Kind | Unit |
|:-:|---|---|---|
| 0 | `temperature` | threshold | °C |

**1-Wire `machine-probe` (type `3`)**

| Ch | Name | Kind | Unit |
|:-:|---|---|---|
| 0 | `temperature` | threshold | °C |
| 1 | `humidity` | threshold | %RH |
| 2 | `temperature-aux` | threshold | °C |
| 3 | `illuminance` | threshold | lx |
| 4 | `magnetic-field` | threshold | mT |
| 5 | `tilt` | state | 0/1 |
| 6 | `accel-x` | threshold | m/s² |
| 7 | `accel-y` | threshold | m/s² |
| 8 | `accel-z` | threshold | m/s² |

### Rule Kinds

The kind comes from the channel. Each kind takes its own keys, given as `<key> <value>` pairs:

| Kind | Keys |
|---|---|
| threshold | `lo <lo> hi <hi> [dwell <deadband>]` (`hi` must be greater than `lo`, values in the channel's unit) |
| state | `from <0\|1> to <0\|1> [dwell <seconds>]` |
| rate | `hi <N> [dwell <seconds>]` |

- **Threshold Rules:** the alarm activates immediately when the value leaves `[lo, hi]`: below `lo` as a LOW alarm, above `hi` as a HIGH alarm. A jump straight to the other side ends the old alarm and starts the new one.
- **State Rules:** `from != to` is an **edge** (fires once on the transition); `from == to` is a **level** (active while the line equals `to`).
- **Motion and stillness:** the momentary channels `pir-motion` and `accel-motion` take three shapes. The edge `from 0 to 1` fires on motion. The level `from 1 to 1` is "motion started / ended": the first event activates the alarm, every further event restarts the `dwell` quiet window, and the alarm ends once `dwell` passes with no event. The level `from 0 to 0` is "stillness": it activates once `dwell` passes with no event and ends on the next event, for example for a machine that must report when it stops vibrating.
- **Rate Rules:** the alarm fires as soon as the counter rises by at least `hi` within `dwell` seconds. A sustained rate stays one alarm; it ends on the first window that falls short.

---

## The `dwell` Parameter

The optional **`dwell`** (default `0`) filters noise and chatter. Its meaning depends on the rule kind: on threshold rules it is a value in the channel's unit, on the other kinds a time in seconds (`0`-`3600`).

| Rule Kind | `dwell` Behavior |
|---|---|
| **Threshold** | Deadband (hysteresis) in the channel's units. A HIGH alarm clears once the value drops below `hi - dwell`, a LOW alarm once it rises above `lo + dwell`; between the limit and the deadband edge the alarm holds. `0` clears on re-entering the band. Valid range `0` to `hi - lo`. |
| **State (Edge)** | The transition must hold for `dwell` seconds before the rule fires. Once fired, the rule waits `dwell` seconds before it can fire again. |
| **State (Level)** | The line must stay at `to` for `dwell` seconds before the alarm activates. It deactivates immediately. |
| **Momentary (`pir-motion`, `accel-motion`)** | Edge rule: a new motion event can fire again only after `dwell` seconds. Level rules: the quiet window described above. |
| **Rate** | Counting window in seconds. `0` = the report interval (`interval-report`). |

---

## Command Examples

```
sensor types motherboard                          # List the motherboard channels
alarm set 0 mb temperature lo 5 hi 30             # Alarm below 5 °C or above 30 °C
alarm set 1 mb humidity lo 0 hi 55 dwell 5        # Active above 55 %RH, clears below 50 %RH
alarm set 2 mb input-a-state from 0 to 1          # Rising edge on input A
alarm set 3 mb input-a-state from 0 to 1 dwell 5  # Rising edge on input A must hold for 5 seconds
alarm set 4 mb accel-motion from 0 to 0 dwell 300 # No motion for 5 minutes
alarm new mb hall-left-count hi 10 dwell 60       # 10 or more pulses within 60 seconds
alarm new s1 temperature lo 2 hi 8 dwell 0.5      # 1-Wire slot 1: LOW clears above 2.5 °C, HIGH below 7.5 °C
alarm list                                        # Review all programmed alarm rules
alarm clear 1                                     # Erase rule 1
```

:::info Over-The-Air Management
Alarm rules can also be written over a radio or NFC using binary payloads on fPort 85. A `set_param` with `alarms_replace` makes one message the complete alarm table, so rules deleted on the host are deleted on the device. A rejected rule is answered with `fault_field` = 400 + the rule's field tag, so the host knows which rule failed. Use the [**Downlink Commands Generator**](../connectivity/downlink-commands-generator.mdx) to build binary downlink strings for your network server.
:::