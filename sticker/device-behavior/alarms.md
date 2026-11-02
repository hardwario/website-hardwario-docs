---
slug: alarms
title: Alarms
description: How STICKER alarms work, from the built-in alarms and the 16 configurable rules to hysteresis, timing and what the device sends and shows.
---

# Alarms

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

An alarm tells you that a value or a state needs attention: a temperature out of range, a door left open or a probe that stopped answering. STICKER evaluates its alarms on the device and reports every change over the radio, on the LED and, on the buzzer variant, with sound. This page explains which alarms exist and how each kind of rule decides when to activate and clear. It also shows what you see when an alarm triggers. The shell syntax and the channel numbers are on [**Alarm rules**](../developer-access/alarm-rules.md).

## Built-in alarms and configurable rules

STICKER has two families of alarms. The **built-in alarms** need no setup:

| Built-in alarm | Activates when | Clears when |
|---|---|---|
| Low battery | The battery voltage drops below `battery-level` (default 2.4 V) | The voltage rises 0.3 V above the threshold (2.7 V by default) |
| No data, onboard | An enabled onboard temperature, humidity, pressure, analog input voltage or battery reading has been missing for 5 s. A single failed read of the temperature and humidity sensor or the barometer is ignored; the second in a row counts. A missing analog input voltage or battery reading counts at once | Values arrive again |
| No data, 1-Wire | The probe of a 1-Wire slot with a stored serial number (ROM) is missing or stops answering (one alarm for the whole probe, channel `device`), or one chip of a MACHINE PROBE stops while the rest still answers (one alarm on the first channel of that chip) | The probe or the chip answers again |
| Sensor mismatch | A 1-Wire slot misses the probe type it expects and a probe of another type is on the bus that no free slot can take | The right probe type is back, or the slot is taught again or cleared |

The **configurable rules** are up to 16 rules, `alarm_0` to `alarm_15`. Each rule watches one value, given by a slot and a channel. The slot says where the sensor sits: `mb` is the STICKER board itself, `s1` to `s4` are the 1-Wire slots. The channel says which value of that sensor the rule watches. Several rules can watch the same channel, for example a warning level and a critical level. The rule number is the identity of the rule in the alarm reports; built-in alarms carry no rule number (the decoder shows `rule: null`).

## Which channels can have rules

| Slot | Threshold rules (value range) | State rules (0 or 1) | Rate rules (counter growth) |
|---|---|---|---|
| STICKER board (`mb`) | `temperature`, `humidity`, `pressure`, `illuminance`, `temperature-baro`, `input-a-voltage`, `input-b-voltage` | `hall-left-state`, `hall-right-state`, `input-a-state`, `input-b-state`, `pir-motion`, `accel-motion` | `hall-left-count`, `hall-right-count`, `input-a-count`, `input-b-count`, `pir-count`, `accel-count` |
| DS18B20 probe (`s1` to `s4`, type `dallas`) | `temperature` | None | None |
| MACHINE PROBE (`s1` to `s4`, type `machine-probe`) | `temperature`, `humidity`, `temperature-aux`, `illuminance`, `magnetic-field`, `accel-x`, `accel-y`, `accel-z` | `tilt` | None |

- `accel-orientation` and `altitude` cannot have rules. `battery-voltage` has only the built-in low-battery alarm.
- A rule on a channel whose sensor or input is off is stored but stays inactive until you turn the sensor or input on.
- A rule for a 1-Wire slot needs the sensor type of the slot (`sensor1-type` to `sensor4-type`, set when a probe is enrolled). A rule written for a type that the slot no longer expects is **stale**: STICKER keeps it but never evaluates it.

## How each rule kind behaves

The kind of a rule follows from its channel. The same field, `dwell`, means a different thing for each kind.

### Threshold rules

A threshold rule watches a measured value against a range from `lo` to `hi`.

- **Activation:** the alarm activates as soon as a reading is below `lo` (a LOW alarm) or above `hi` (a HIGH alarm). A reading equal to a limit is still inside the range.
- **Deadband:** `dwell` is a deadband in the unit of the channel, not a time. A HIGH alarm clears once the reading drops below `hi` minus `dwell`, a LOW alarm once it rises above `lo` plus `dwell`. Between the limit and the edge of the deadband the alarm holds, so a value hovering at the limit does not raise and clear the alarm at every reading. With `dwell` 0 the alarm clears as soon as the reading is back in the range. `hi` must be greater than `lo`, and `dwell` must be between 0 and the width of the range.
- **Jump across:** a reading that jumps from one side straight to the other clears the old alarm and activates the new one at once.
- **Missing reading:** when the sensor delivers no value, an active threshold alarm clears. The built-in no-data alarm reports the missing sensor instead.
- **Reaction time:** a threshold rule sees a new value only when STICKER reads its sensors. With the default `interval-sample` 0 that happens once per report interval (15 min by default), so a threshold alarm can take up to one report interval to react. Set `interval-sample` (5–3600 s) to read the sensors more often.

:::note Firmware v1.4.x
In firmware v1.4.x, `dwell` on a threshold rule is a time in seconds that the value has to stay outside the range before the alarm activates. Firmware v2.0.0 reads the same field as a deadband in the unit of the channel, so a v1.4.x value means something else after the upgrade.
:::

### State rules

A state rule watches a level that is 0 or 1: a Hall switch, a digital input or the tilt alert of a MACHINE PROBE. It takes `from`, `to` and `dwell`, where `dwell` is a time from 0 to 3600 s.

- **Edge rule** (`from` and `to` differ, for example `from 0 to 1`): fires when the level changes from `from` to `to`. With `dwell`, the new level must hold for `dwell` seconds, otherwise nothing happens. After the rule fires, the alarm stays active for the same `dwell` and blocks another firing. Then it ends silently: an edge rule sends no deactivate event.
- **Level rule** (`from` and `to` equal, for example `from 1 to 1`): active while the level equals `to`. With `dwell`, the level must stay at `to` for `dwell` seconds before the alarm activates. The alarm clears as soon as the level leaves `to`, and the clear is sent.

STICKER checks the Hall switches and the digital inputs every 100 ms. An input in `pulse` mode has no level, so a state rule on it stays inactive.

### Motion rules (PIR and accelerometer)

`pir-motion` and `accel-motion` only report motion events. They never report that motion stopped, so their rules work with time windows:

- **`from 0 to 1`** (edge): fires on a motion event. For the next `dwell` seconds the rule cannot fire again, and then the alarm ends silently.
- **`from 1 to 1`** (motion started and ended): the first event activates the alarm, and every further event restarts a quiet window of `dwell` seconds. The alarm clears, and the clear is sent, once `dwell` passes without an event. This gives one alarm per episode of motion.
- **`from 0 to 0`** (stillness): the alarm activates once `dwell` seconds pass without an event, for example for a machine that must report when it stops vibrating. The next event clears it, and the clear is sent.

The accelerometer reports motion events only while `accel-motion-sensitivity` is not `off`.

### Rate rules

A rate rule watches a counter: a Hall count, an input count (`digital` or `pulse` mode), the PIR count or the accelerometer count. It takes `hi`, the number of counts, and `dwell`, the length of the counting window in seconds (0–3600; 0 means `interval-report`).

- **Activation:** the alarm activates as soon as the counter has grown by at least `hi` within the current window. STICKER checks every 3 s, so it does not wait for the end of the window.
- **Sustained rate:** while each following window reaches `hi`, the alarm stays one alarm. It clears, and the clear is sent, at the end of the first window that falls short.
- **Counter reset:** resetting the counter does not fire the rule; the window starts again. With `hi` 0 the rule never fires.

:::note Firmware v1.4.x
In firmware v1.4.x the counting window of a rate rule is always `interval-report`, and `dwell` only blocks a new alarm after one has fired. The `from 1 to 1` and `from 0 to 0` motion rules are new in v2.0.0.
:::

## Worked examples

### Room temperature 5–30 °C with a 1 °C deadband

Rule 0 on slot `mb`, channel `temperature`, `lo` 5, `hi` 30, `dwell` 1. The readings arrive one per sensor reading:

| Reading | What happens |
|---|---|
| 29.8 °C | Nothing, the value is inside 5–30 °C |
| 30.4 °C | HIGH alarm activates |
| 29.5 °C | Alarm holds, the value is still above 29 °C |
| 28.9 °C | HIGH alarm clears |
| 4.6 °C | LOW alarm activates |
| 5.7 °C | Alarm holds, the value is still below 6 °C |
| 6.2 °C | LOW alarm clears |

### DS18B20 probe 2–8 °C with a 0.5 °C deadband

Rule 1 on slot `s1` (a DS18B20 probe in 1-Wire slot 1), channel `temperature`, `lo` 2, `hi` 8, `dwell` 0.5. This suits a fridge.

- A HIGH alarm activates above 8 °C and clears below 7.5 °C.
- A LOW alarm activates below 2 °C and clears above 2.5 °C.
- If the probe is unplugged, its value becomes `null`: an active HIGH or LOW alarm clears, and the built-in no-data alarm for the probe activates instead.
- Slot 1 must already expect a DS18B20 (`sensor1-type` 2), otherwise the rule is refused.

### Input A held active for 5 s

Rule 2 on slot `mb`, channel `input-a-state`, `from 1 to 1`, `dwell` 5. This suits a door contact that may open briefly.

- Input A becomes active (level 1): the alarm activates only after the input has stayed active for 5 s. If the input becomes inactive earlier, nothing is sent.
- Input A becomes inactive: the alarm clears at once, and the clear is sent.
- The input needs `cap-gpio-mode inputs` and `cap-gpio-input-a digital`.

### Input A counts 100 pulses within 15 s

Rule 3 on slot `mb`, channel `input-a-count`, `hi` 100, `dwell` 15. This suits a flow meter or a production line that must not run too fast.

- The alarm activates as soon as 100 pulses have been counted within the current 15 s window, checked every 3 s.
- While each following 15 s window reaches 100 pulses, it stays one alarm. It clears after the first window with fewer pulses.
- The input needs `cap-gpio-mode inputs` and either `cap-gpio-input-a pulse`, or `cap-gpio-input-a digital` together with `input-a-counter true`.

The same four rules in the shell of a debug or provisioning build (the `s1` rule needs `sensor1-type 2` first):

```text
alarm set 0 mb temperature lo 5 hi 30 dwell 1
alarm set 1 s1 temperature lo 2 hi 8 dwell 0.5
alarm set 2 mb input-a-state from 1 to 1 dwell 5
alarm set 3 mb input-a-count hi 100 dwell 15
```

<details>
<summary><b>Rule values and downlinks for these examples</b></summary>

Each rule is an 18-byte value; its layout is on [**Downlink commands**](../connectivity/downlink-commands.md). The [**Downlink commands generator**](../connectivity/downlink-commands-generator.mdx) builds these values and downlinks for you. A downlink is a message from the network to the device; STICKER takes commands on fPort 85, the LoRaWAN port number for commands. Each downlink below writes one rule and saves it (`"save": true`), so the device restarts afterwards. To write several rules, send them without `save` and set `save` on the last one only.

| Rule | 18-byte value | Downlink with save (hex, fPort 85) |
|---|---|---|
| `alarm_0`, temperature 5–30 °C, deadband 1 °C | `0300000100000000a0400000f0410000803f` | `080112182a141a120300000100000000a0400000f0410000803f1801` **[ověřit]** |
| `alarm_1`, `s1` DS18B20 2–8 °C, deadband 0.5 °C | `03010002000000000040000000410000003f` **[ověřit]** | `080212182a14221203010002000000000040000000410000003f1801` **[ověřit]** |
| `alarm_2`, `input-a-state` from 1 to 1, 5 s | `03000901010100000000000000000000a040` **[ověřit]** | `080312182a142a1203000901010100000000000000000000a0401801` **[ověřit]** |
| `alarm_3`, `input-a-count` at least 100 within 15 s | `03000a010000000000000000c84200007041` **[ověřit]** | `080412182a14321203000a010000000000000000c842000070411801` **[ověřit]** |

The first downlink as JSON for the STICKER codec:

```json
{ "seq": 1, "command": "set_param", "set_param": { "alarms": { "alarm_0": "0300000100000000a0400000f0410000803f" }, "save": true } }
```

</details>

## What happens when an alarm triggers or clears

When a rule or a built-in alarm activates or clears, STICKER does the following:

1. **Alarm report on fPort 3.** The first change opens a collection window of `alarm-limit` seconds (default 10 s). All changes within the window go into one alarm report, which STICKER sends when the window ends. A window that has collected 16 changes is sent at once. With `alarm-limit 0` every change is sent at once. fPort is the LoRaWAN port number that tells message types apart.
2. **Extra telemetry on fPort 2.** The first change also triggers a telemetry uplink (a message from the device to the network) with the current values, after a random delay of up to 10 s. STICKER sends at most one such extra uplink per `alarm-limit` period.
3. **Alarm state in every telemetry uplink.** Every fPort 2 uplink carries `alarm_status` and `alarm_status_flags`, with the flags `alarm_any`, `alarm_threshold`, `alarm_state`, `alarm_rate`, `alarm_no_data`, `alarm_low_battery` and `alarm_sensor_mismatch`. So the state reaches the network even when an alarm report is lost.
4. **Active alarms in the Info uplink.** `active_alarms` lists every active alarm with its slot, channel and type. The Info uplink goes out after every join, every `interval-announce` hours (24 h by default) and on a `get_info` request. HARDWARIO Manager shows the same list as **Active alarms** in **Device info**.
5. **Red LED.** While any alarm is active, the red LED blinks briefly (5 ms) every 3 s. Other patterns take priority: an NFC session, a failed settings load, the network patterns (joining or reconnecting: a yellow and a red flash; link warning: two yellow flashes) and the single yellow blink of `radio-mode off`. While one of them shows, you do not see the alarm blink, although STICKER still evaluates its alarms. The full LED reference is on [**Hardware description**](../hardware-description.md).
6. **Buzzer.** On the buzzer variant with `cap-gpio-mode buzzer`, `alarm-buzzer-mode` plays the alarm melody (five short beeps, about 0.9 s) whenever a new alarm activates, also while other alarms are already active. It repeats as the table below says while any alarm stays active and stops as soon as the last alarm clears. The buzzer variant is not tested on hardware yet in firmware v2.0.0 **[ověřit]**.

| `alarm-buzzer-mode` | Sound while an alarm is active |
|---|---|
| `off` (default) | None |
| `once` | The melody once per new alarm |
| `slow` | The melody every 120 s |
| `normal` | The melody every 30 s |
| `fast` | The melody every 10 s |
| `continuous` | The melody back to back |

## Delivery and reliability

- **Unconfirmed by default:** an alarm report lost on the air is not sent again. The state still reaches the network with the next telemetry uplink.
- **Confirmed alarms:** with `radio-alarm-ack true`, alarm reports are confirmed uplinks. The network must acknowledge each one, and STICKER repeats an unacknowledged report up to 3 times, after random waits of 1–2 s, 1–4 s and 1–8 s. An alarm report that never gets an acknowledgement does not count as a failed link check.
- **Link down:** while STICKER is not connected, it holds the alarm report and keeps adding changes to it. It sends the report after the next join, right after the Info and settings-info uplinks. See [**Network connection**](network-connection.md).
- **Size limits:** one alarm report frame carries up to 8 changes, fewer at a low data rate (the LoRaWAN speed setting, which also limits the frame size). One report takes at most 4 frames; changes beyond that follow as the next report. A held report keeps up to 16 changes; further changes are dropped but still counted in `total`. At the smallest data rate tier (11 B), where not even one change fits a frame, only the alarm bits in telemetry carry the state.
- **Restart after a command:** a command that restarts the device, such as a save or a reset, waits until the queued alarm frames are sent, for at most 120 s.
- **After any restart:** the alarm state lives in RAM and starts empty. Conditions that still hold activate again and are reported again once the device is connected: threshold rules at the first evaluation, level state rules after their `dwell`, low battery at the first valid measurement and no data after 5 s. Edge rules and rate rules fire again only on a new event, and so do the motion rules `from 0 to 1` and `from 1 to 1`. A stillness rule (`from 0 to 0`) activates again `dwell` seconds after the restart when no motion event arrives, and a `sensor_mismatch` alarm returns when the slots are bound at boot. A backend should close its open alarms when it sees a restart, for example from `boot: true` in the first telemetry uplink after the join.

:::note Firmware v1.4.x
In firmware v1.4.x a collection window holds at most 8 changes, and alarm frames can be lost in a burst or when the device restarts right after a command.
:::

<details>
<summary><b>Decoded alarm reports</b></summary>

The temperature example (rule 0) activating at 30.4 °C **[ověřit]**:

```text
010880cae2d00610011a0528c02f48022001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "temperature",
      "rule": 0,
      "event": "activate",
      "type": "high",
      "value": 30.4,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

The same alarm clearing 30 min later at 28.9 °C **[ověřit]**:

```text
010888d8e2d00610011a07100128942d48022001
```

```json
{
  "base_time": 1780001800,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "temperature",
      "rule": 0,
      "event": "deactivate",
      "type": "high",
      "value": 28.9,
      "time": 1780001800
    }
  ],
  "truncated": false
}
```

- `base_time`: when the collection window opened, as Unix time. The `time` of each change is `base_time` plus its offset within the window.
- `total`: the number of changes in the window, including any that did not fit.
- `rule`: the rule number 0–15, or `null` for a built-in alarm.
- `event`: `activate` or `deactivate`. `type` keeps the condition, so a HIGH alarm clears as `deactivate` with `type` `high`.
- `type`: `low`, `high`, `trigger` (state, motion and rate rules), `no_data` or `sensor_mismatch`.
- `value`: the reading in the unit of the channel. Rate rules report the counter value, state rules 0 or 1.
- `time_synced`: `false` when the device had no clock yet; every `time` is then `null`.

Examples of 1-Wire alarms are on [**1-Wire probes**](one-wire.md).

</details>

## Where to configure alarms

- **HARDWARIO Manager:** **Configuration → Alarms**, see [**Alarm rules**](/apps/hardwario-manager/sticker/alarms) in the HARDWARIO Manager guide. The app writes the rules with a save, so the device restarts afterwards **[ověřit]**.
- **Downlink:** `set_param` with `alarms.alarm_0` to `alarms.alarm_15`. `alarms_replace` makes one message the complete rule table, so rules deleted on the host are deleted on the device. See [**Downlink commands**](../connectivity/downlink-commands.md) and the [**Downlink commands generator**](../connectivity/downlink-commands-generator.mdx); the generator also encodes `alarm_buzzer_mode` and `radio_alarm_ack`, which the v2.0.0 `ttn.js` cannot encode from JSON.
- **Shell:** `alarm set`, `alarm new`, `alarm list` and `alarm clear` in a debug or provisioning build, see [**Alarm rules**](../developer-access/alarm-rules.md).

When the changes take effect:

- A rule written over a downlink or NFC is live at once, without a restart, but it survives a restart only when it is saved (`"save": true` in the message or a `settings_save` command, both restart the device).
- In the shell, `alarm set`, `alarm new` and `alarm clear` save at once, without a restart.
- A rejected rule is answered with the error `OUT_OF_RANGE` and `fault_field` 400 plus the field number of the rule (403 for `alarm_0` up to 418 for `alarm_15`), and the whole message is rolled back. The decoder splits the number, so a rejected `alarm_0` decodes as `"fault_group": 4` and `"fault_field": 3`.
- The general alarm settings are ordinary settings. Sent over a downlink or NFC, they apply after a save.

| Setting | Default | Meaning |
|---|---|---|
| `alarm-limit` | 10 s (0–3600 s) | Collection window of the alarm report; 0 sends every change at once |
| `alarm-buzzer-mode` | `off` | Buzzer behavior on the buzzer variant |
| `radio-alarm-ack` | `false` | Send alarm reports as confirmed uplinks |
| `battery-level` | 2400 mV (1000–3600 mV) | Threshold of the low-battery alarm |

:::note Firmware v1.4.x
Firmware v1.4.x rules are 17 bytes long and use other 1-Wire type numbers (1 for DS18B20, 2 for MACHINE PROBE instead of 2 and 3). They are not migrated: firmware v2.0.0 deletes them at the first boots after the upgrade, so write all rules again.
:::
