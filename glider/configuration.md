---
title: Configuration
sidebar_position: 5
description: "GLIDER configuration reference: the settings stored in non-volatile memory and how to change them over the console interfaces."
---
import Image from '@theme/IdealImage';

# Configuration Reference

GLIDER stores configuration in non-volatile memory (NVS), so settings survive power cycles and reboots. You can change configuration through either console:

- **AT console:** `AT$CONFIG="<module>","<key>",<value>`
- **RTT console (Zephyr shell):** `<module> config <key> <value>`

After making changes, always save them to flash:

```text
AT&W
```

This persists the new values **and reboots** the device. To wipe everything back to factory defaults:

```text
AT&F
```

## Listing configuration

| Goal | AT command | Shell command |
| :--- | :--- | :--- |
| List every module | `AT$CONFIG?` | `config show` |
| List one module | `AT$CONFIG="<module>"` | `<module> config show` |
| Read one key | `AT$CONFIG="<module>","<key>"` | `<module> config show <key>` |
| Show full schema | `AT$CONFIG=?` | - |

The schema (`AT$CONFIG=?`) reports each key's type, range, default and a one-line description, useful for discovery.

## Global `app` settings

These keys apply to the whole device.

| Key | Type | Range | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | int (s) | 5–3600 | **60** | How often the firmware reads sensors and evaluates alarms. |
| `interval-send` | int (s) | 30–86400 | **300** | How often the firmware encodes a CBOR payload and uplinks it. |
| `downlink-wdg-interval` | int (s) | 0–1209600 | **129600** (36 h) | Downlink watchdog. If the cloud sends no downlink within this period, the device reboots. `0` disables the watchdog. |

#### Example

```text
app config interval-sample 30
app config interval-send 120
AT&W
```

## Digital inputs

GLIDER has **two galvanically isolated** digital input channels (**CH1** and **CH2**). Each channel can run in one of three modes:

| Mode | Behavior |
| :--- | :--- |
| `disabled` | The channel is powered off: no counting, no events. |
| `counter` | Selected edges (rising / falling / both) increment counters. Counters are sent in every CBOR payload. |
| `event` | Each edge produces a timestamped event. Events are streamed in the next CBOR payload (up to 64 per channel, per send cycle). |

#### Per-channel keys

The same keys exist for both channels, prefixed with `1-` (CH1) or `2-` (CH2):

| Key | Type | Range | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `<n>-mode` | enum | `disabled` / `counter` / `event` | `disabled` | Channel mode. |
| `<n>-active-duration` | int (ms) | 0–60000 | **100** | Minimum time the input must stay active (rising edge debounce). |
| `<n>-inactive-duration` | int (ms) | 0–60000 | **100** | Minimum time the input must stay inactive (falling edge debounce). |
| `<n>-cooldown-time` | int (ms) | 0–60000 | **10** | Minimum time between two registered transitions. |
| `<n>-counter-edge` | enum | `rising` / `falling` / `both` | `both` | Which edges increment the counter (only used in `counter` mode). |
| `<n>-event-type` | enum | `activation` / `deactivation` / `both` | `both` | Which transitions create events (only used in `event` mode). |

#### Example - count pulses on CH1

```text
inputs config 1-mode counter
inputs config 1-counter-edge rising
inputs config 1-active-duration 5
inputs config 1-inactive-duration 5
AT&W
```

This counts every rising edge on CH1 as long as the input stays high for at least 5 ms (and low for at least 5 ms between pulses).

## Thermometer slots (`therm`)

Eight independent slots, one ROM code per slot. Empty slots are skipped in the cloud payload.

| Key | Type | Size | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `1` … `8` | hex | 8 bytes | `0x00…` | DS18B20 ROM serial bound to that slot. `0x00…` = empty. |

:::tip
In practice you should not edit these by hand. Use `therm scan --save` to discover and bind sensors automatically. See [**External Temperature Sensors**](external-sensors/temperature.md).
:::

## Alarms

Up to **32 independent alarm rules** can be configured. Each rule watches one thermometer slot and toggles between **active** and **inactive** based on a threshold with hysteresis:

- The rule **activates** when `temperature ≥ threshold`.
- The rule **deactivates** when `temperature ≤ threshold − hysteresis`.

Each transition is recorded in the alarm events buffer and uploaded with the next CBOR payload.

The same four keys exist for every rule, prefixed with `<n>-` (1-32):

| Key | Type | Range | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `<n>-enabled` | bool | - | `false` | Master switch for the rule. When `false`, the other keys for this rule are hidden. |
| `<n>-therm` | int | 1–8 | **1** | Which thermometer slot the rule watches. |
| `<n>-threshold` | float (°C) | −55–125 | **50** | Activation threshold. |
| `<n>-hysteresis` | float (°C) | 0–50 | **5** | Deactivation offset below the threshold. |

#### Example - alarm on slot 1 if it exceeds 30 °C

```text
alarm config 1-enabled true
alarm config 1-therm 1
alarm config 1-threshold 30
alarm config 1-hysteresis 5
AT&W
```

When slot 1 reads ≥ 30 °C the firmware fires the alarm; it clears again when the reading drops to ≤ 25 °C.

## Saving and resetting

| Action | Command |
| :--- | :--- |
| Save and reboot | `AT&W` |
| Factory reset (wipe everything) | `AT&F` |
| Reboot without saving | `AT$REBOOT` |

:::caution
`AT&F` is destructive: every configured slot, alarm rule and interval is reset to factory defaults. There is no undo.
:::
