---
slug: history-and-counters
title: History and counters
description: How STICKER stores sensor history and pulse counters, how long the data lasts, how to read it out and what survives a reset or battery swap.
---

# History and counters

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

STICKER can keep two kinds of data on the device: a sensor history that bridges radio outages, and pulse counters that add up meter pulses and switch activations. This page explains what each one stores, how long the data lasts, how you read it out and what happens to it after a reset, a battery swap or a firmware update. The shell commands and the full parameter reference are on [**Sensor history**](../developer-access/sensor-history.md) and [**Configuration**](../developer-access/configuration.md).

## Sensor history in brief

The sensor history is a store-and-forward buffer in the flash memory of the device. At every report interval STICKER writes one record with its latest sensor values, also while it has no network connection. Your backend can ask for the stored records later and fill the gaps in its data.

- **What it stores:** periodic sensor samples only. It is not a log of radio messages: alarm events, command answers and settings changes are not stored.
- **Off by default:** recording starts only after you turn on `history-enable` and save the settings, in HARDWARIO Manager under **Configuration → History** or with the downlink in the examples below.
- **One record per report slot:** STICKER writes one record every `interval-report` (default 900 s, that is 15 min). An extra report triggered by an alarm, `force_send` or `sample` adds no record, so the records stay exactly one interval apart.
- **Recorded while offline:** STICKER records before it checks the network link, so it records before the first join, during an outage and with `radio-mode off`.
- **Columns:** `history-channels` selects up to 24 channels. The default is the onboard temperature and humidity. Any sensor channel can be recorded, including 1-Wire probe channels, counters and analog input voltages. The PIR and accelerometer motion channels record `1` when at least one motion event happened during the interval.
- **Values only:** a record carries no timestamp of its own. Its time follows from the time of the first record and the interval. A value that is not available, for example from a disconnected probe, is stored as missing and decodes as `null`.

## How much history fits

The history uses a 32 KB flash area split into 16 pages of 2 KB. Each page holds 1 757 B of records, and a record never spans two pages. A record is as large as the selected channels together: 1 B for humidity and states, 2 B for temperatures, pressure, illuminance and voltages, 4 B for counters. The full list is on [**Sensor history**](../developer-access/sensor-history.md).

| Selected channels | Bytes per record | Records | Days at 15 min | Days at 5 min | Days at 1 min |
|---|---|---|---|---|---|
| Temperature only | 2 | 14 048 | 146 | 49 | 9.8 |
| Temperature and humidity (default) | 3 | 9 360 | 97.5 | 32.5 | 6.5 |
| Default plus one DS18B20 probe | 5 | 5 616 | 58.5 | 19.5 | 3.9 |
| Default plus one counter, or default plus two DS18B20 probes | 7 | 4 016 | 41.8 | 13.9 | 2.8 |
| Largest possible record: 5 counters and 19 channels of 2 B | 58 | 480 | 5 | 1.7 | 0.3 |

Plan with about 15/16 of these times. When the buffer is full, STICKER erases the oldest page at once, and every boot leaves the rest of a page unused. The [**Sensor history calculator**](../developer-access/sensor-history-calculator.mdx) computes the record size and the time covered for any selection.

## When records are overwritten or discarded

In normal operation the buffer works as a ring. When all 16 pages are full, STICKER erases the oldest page and reuses it, so the oldest sixteenth of the history disappears in one step. Each boot starts a new page and leaves the rest of the previous page empty, so frequent reboots shorten the history.

STICKER drops the whole stored history and starts again when:

- `interval-report` changes, because the record times follow from the interval;
- the record layout changes: a change of `history-channels`, of a capability that a recorded channel needs (for example `cap-sht`) or of the sensor type of a recorded 1-Wire slot;
- you run `history clear` in the shell, `factory_reset` or `vendor_reset`.

A reboot, a battery swap, a lost network connection and a disconnected probe do not discard the history; a disconnected probe only leaves missing values in its columns. `device_reset` keeps the stored records, but it returns `history-enable`, `history-channels`, `interval-report` and the sensor capabilities to their defaults. Recording is then off until you turn it on again. The stored records stay readable with `req_history` only if they were recorded with the default channel selection and capabilities; records made with another selection are not found after the restart. If you turn recording on again with an `interval-report` different from that of the stored records, STICKER drops them when it writes the first new record.

:::tip
Read the history out before you change the report interval, the channel selection or the 1-Wire slots.
:::

## Power loss and timestamps

- **Power loss:** the history survives a reset, a power loss and a battery swap. STICKER writes records to flash in 8-byte steps and keeps the not yet written remainder in RAM, so every restart and every power loss costs at most about the last 2 records.
- **Time after a battery swap:** the clock stops when power is lost. After the restart STICKER does not know the time until it gets it again: from the network after the join, or from a phone over NFC (`clock_sync`, in HARDWARIO Manager under **Tools → Sync time**). Records taken before that carry the time since boot and get their real time once the clock is set.
- **Records without a time:** if the device restarts again before it ever got the time, the records of that boot never get a real time. Their history frame says `time_synced: false` and the decoder shows `time: null` for each record.
- **Radio off:** with `radio-mode off` there is no network time, so only an NFC `clock_sync` sets the clock. See [**Real-time clock**](../developer-access/clock.md).
- **Debug builds:** a debug build keeps the history in a 992 B RAM buffer that starts empty at every boot. Only the release image records to flash. Flashing a debug or provisioning image overwrites the history area.

:::note Firmware v1.4.x
Firmware v2.0.0 cannot read the history stored by v1.4.x, so the history starts empty after the upgrade, and there is no supported downgrade. Read out what you need before you upgrade. In v1.4.x, records stored after a reboot or a power loss could also be shifted in time by the length of the outage.
:::

## Reading the history out

You can read the stored records in two ways: over the radio with a `req_history` downlink, or over NFC with HARDWARIO Manager. A downlink is a message from the network to the device, an uplink a message from the device to the network.

### Over the radio

- **Only on request:** STICKER never uploads its history by itself, not even after an outage. Your backend must send a `req_history` downlink on fPort 85 (the LoRaWAN port number STICKER uses for commands and their answers). It works over LoRaWAN and over [**LoRa P2P**](../connectivity/lora-p2p.md).
- **Time window:** `from_unix` and `to_unix` (Unix time in seconds, UTC) limit the request. Without them the device sends the whole buffer.
- **A stream of frames:** the device sends the matching records as `history_frame` uplinks on fPort 85, all with the `seq` of the request. The first frame is the answer; there is no separate acknowledgement. Each frame carries `pages` such as `"1/12"`; the total is an estimate made when the stream starts.
- **Pace:** frames are at least 3 s apart. The duty cycle (the share of airtime the radio rules allow, 1 % or 36 s per hour in EU868) can space them further.
- **Records per frame:** each frame is sized to the current data rate (DR, the LoRaWAN speed setting; DR0 is the slowest and carries the least data). With the default 3-byte records a frame holds about 9 records at DR0 and about 70 at DR5. At DR0 one frame takes about 2.1 s of airtime, so a long replay at a low data rate can take many hours. Ask only for the time window you need.
- **One replay at a time:** a second `req_history` during a running replay is ignored and gets no answer. If the link is lost during the replay, the replay stops; send the request again later.
- **Recording during a replay:** STICKER keeps recording during a replay and leaves the new records for the next request. It cannot open a new flash page while a replay runs, so a record that needs one is dropped. The first record after every restart needs a new page, so send `req_history` at least one `interval-report` after a restart.
- **Other traffic:** periodic telemetry waits until the replay ends. Alarms and command answers do not wait.
- **Records without a time** (`time: null`) are returned only for a request without a time window, or while the device itself has no clock.

| Error (code) | Meaning | What to do |
|---|---|---|
| `HISTORY_UNAVAILABLE` (4) | No records in the requested window, or the link was not ready | Check that `history-enable` is on and that the window covers stored records |
| `BUDGET_TOO_SMALL` (9) | Records exist, but not even one fits a frame at the current data rate. This always happens at the 11-byte tier (US915 DR0, AU915 DR2 and AS923 DR2) and, with many recorded channels, also at 51-byte data rates such as EU868 DR0–DR2 **[ověřit]**. A data rate drop can also end a running replay with this error. | Ask again at a higher data rate |

Over LoRaWAN an error carries only its code, without the text detail.

### Over NFC

HARDWARIO Manager reads the history over NFC page by page (`req_history_page`). This uses no airtime and works with the radio off, as long as the device is powered. See [**Sensor history**](/apps/hardwario-manager/sticker/sensor-history) in the HARDWARIO Manager guide.

### Downlink examples

Send these on fPort 85, either as JSON through the STICKER codec (`ttn.js` v2.0.0) or as raw bytes in hex or base64. `seq` is your own number, and the device repeats it in the answer. The example window starts at `1780000000` (2026-05-28 20:26:40 UTC).

| Meaning | JSON | Hex | Base64 |
|---|---|---|---|
| Whole buffer **[ověřit]** | `{"seq":1,"command":"req_history"}` | `08015a00` | `CAFaAA==` |
| One hour, from 2026-05-28 20:26:40 UTC **[ověřit]** | `{"seq":2,"command":"req_history","req_history":{"from_unix":1780000000,"to_unix":1780003600}}` | `08025a0c0880cae2d0061090e6e2d006` | `CAJaDAiAyuLQBhCQ5uLQBg==` |
| Everything from 2026-05-28 20:26:40 UTC onward **[ověřit]** | `{"seq":3,"command":"req_history","req_history":{"from_unix":1780000000}}` | `08035a060880cae2d006` | `CANaBgiAyuLQBg==` |
| Turn history on and save (the device restarts) **[ověřit]** | `{"seq":5,"command":"set_param","set_param":{"application":{"history_enable":true},"save":true}}` | `08051206120220011801` | `CAUSBhICIAEYAQ==` |

:::caution Use the nested JSON form
Put the window inside `"req_history": {…}` as shown. The usage comments in `ttn.js` show a flat form with `from_unix` next to `command`; the encoder ignores those fields, so the flat form silently becomes a request for the whole buffer.
:::

<details>
<summary><b>Decoded history frame and error</b></summary>

A history frame from the firmware test suite (fPort 85): page 1 of 2, one record.

```text
01080a2a121880cae2d006220366085a280330840738016802
```

```json
{
  "seq": 10,
  "history_frame": {
    "records": [
      { "time": 1780000000, "temperature": 21.5, "humidity": 45 }
    ],
    "t0_unix": 1780000000,
    "present": 3,
    "interval_s": 900,
    "time_synced": true
  },
  "page_count": 2,
  "page_index": 0,
  "pages": "1/2"
}
```

Frames from firmware v2.0.0 also carry `channels`, the list of recorded columns, for example `["temperature", "humidity"]`.

The answer when no record matches the request, `HISTORY_UNAVAILABLE` for `seq` 1 **[ověřit]**:

```text
01080132020804
```

```json
{ "seq": 1, "error": { "code": 4 } }
```

</details>

## Pulse counters

STICKER counts pulses and activations on its inputs and sensors. The Hall switch and input counters are running totals that STICKER saves to flash, so they continue after a restart. The PIR and accelerometer counts live only in RAM and start at 0 after every boot.

| Counter | Telemetry field | What it counts | Counts when | Saved to flash |
|---|---|---|---|---|
| Hall switch, left and right | `hall_left_count`, `hall_right_count` | Each activation of the switch (magnet present), checked every 100 ms | `cap-hall-left` and `hall-left-counter` are `true` (right alike); all are `false` by default | Yes |
| Input A or B, `digital` mode | `input_a_count`, `input_b_count` | Each activation of the input, checked every 100 ms, so shorter pulses can be missed | `cap-gpio-mode inputs`, `cap-gpio-input-a digital` and `input-a-counter true` (B alike) | Yes |
| Input A or B, `pulse` mode (S0 meters) | `input_a_count`, `input_b_count` | Each pulse, counted in an interrupt: every move away from the idle level seen at startup, after 20 ms of stable level | `cap-gpio-mode inputs` and `cap-gpio-input-a pulse` (B alike); counts always, `input-a-counter` is ignored | Yes |
| PIR motion | `motion_count` | Each PIR detection | `cap-gpio-mode pir` | No |
| Accelerometer motion | `accel_motion_count` | Each motion event of the accelerometer | `cap-accelerometer true` and `accel-motion-sensitivity` other than `off` | No |

- A count is sent in every telemetry uplink while its sensor or input is enabled, also when it is 0. With `hall-left-counter` off, the Hall count is still sent but does not grow.
- The pulse counter is not tested on hardware yet in firmware v2.0.0, see [**S0 interface (pulse output)**](../sticker-input-wiring/s0-interface.md).
- The MACHINE PROBE has no counters.

### When counters are saved

STICKER saves the four Hall and input totals to NVS (the settings storage in flash) together, and only when a value changed since the last save:

- with the default `interval-sample` 0: at every report cycle, that is every `interval-report` and at every extra report triggered by an alarm, `force_send` or `sample`;
- with `interval-sample` set (5–3600 s): also at every sensor sample.

Saving does not depend on the network, so it also runs before the first join, during an outage and with `radio-mode off`.

**What can be lost:** the pulses counted since the last save. A power loss, a battery swap or any other restart loses them. With the defaults this is at most one report interval of pulses (15 min). A shorter `interval-sample` narrows this window at the cost of more flash writes. The PIR and accelerometer counts are never saved.

If STICKER cannot read its stored settings at boot, the counters start from 0 for that boot and STICKER does not save them, so the last good totals stay in flash for the next clean boot.

### After a reset, battery swap or firmware update

- **At boot:** STICKER restores the totals from flash, adds the pulses it counted during the boot itself and counts on.
- **Firmware update:** flashing new firmware over J-Link without a mass erase keeps the totals. A mass erase or `settings erase` loses them.
- **Upgrade from v1.4.x:** the input modes are not carried over and start at `none`. Until you set `cap-gpio-mode` and `cap-gpio-input-a` or `cap-gpio-input-b` again, the inputs count nothing and `input_a_count` and `input_b_count` disappear from telemetry. The stored totals stay in flash and continue once the input is enabled again.
- **Overflow:** the counters are 32-bit. After 4 294 967 295 they wrap to 0. A backend that computes consumption from differences must handle a wrap and a reset.

### Resetting counters

The `reset_counters` command resets selected totals. It works over LoRaWAN, LoRa P2P, NFC and the shell. The flags `hall_left`, `hall_right`, `input_a` and `input_b` choose the counters. The reset takes effect at once and the cleared values are saved immediately, without a restart. A command without any flag resets nothing. The PIR and accelerometer counts cannot be reset this way; they restart at 0 at every boot.

Reset input A only:

```json
{ "seq": 7, "command": "reset_counters", "reset_counters": { "input_a": true } }
```

Hex (fPort 85): `080752021801`, base64 `CAdSAhgB` **[ověřit]**.

- Use the nested form shown. The flat form from the `ttn.js` usage comments (`"input_a": true` next to `"command"`) encodes an empty command that resets nothing.
- A rate alarm rule on a counter does not fire when you reset the counter; its counting window starts again.
- `factory_reset` and `vendor_reset` clear all four totals. `device_reset` keeps them, but it returns the Hall switch and input settings to their defaults (off), so nothing counts until you configure them again.

More command examples are on [**Downlink commands**](../connectivity/downlink-commands.md).

:::note Firmware v1.4.x
Firmware v1.4.x saves the counters in the same way and format, so the totals carry over to v2.0.0. Firmware v1.3.x and older did not save them at all, so every restart set them to 0. In v1.4.x, `factory_reset` kept the counters and the history.
:::

## What survives what

| Data | Reboot | Battery replacement | `device_reset` | `factory_reset` | Firmware update without erase |
|---|---|---|---|---|---|
| Saved settings | ✓ | ✓ | ✗ | ✗ | ✓ |
| LoRaWAN keys and DevNonce | ✓ | ✓ | ✓ | ✗ | ✓ |
| Hall and input counters | ✓ | ✓ | ✓ | ✗ | ✓ |
| PIR and accelerometer counts | ✗ | ✗ | ✗ | ✗ | ✗ |
| Sensor history | ✓ | ✓ | ✓ | ✗ | ✓ **[ověřit]** |
| Alarm rules (saved) | ✓ | ✓ | ✗ | ✗ | ✓ |
| Active alarm state | ✗ | ✗ | ✗ | ✗ | ✗ |
| Clock | ✓ | ✗ | ✓ | ✓ | ✓ |
| 1-Wire slot bindings (saved) | ✓ | ✓ | ✗ | ✗ | ✓ |

- **Saved settings:** settings changed but not saved are lost at any restart. `device_reset` keeps the device identity and the whole LoRaWAN setup and resets the rest. `factory_reset` keeps the identity, DevEUI and JoinEUI only.
- **LoRaWAN keys and DevNonce:** the DevNonce is the counter in each join request that lets the network reject a replayed join. STICKER joins again at every boot, so the network session itself is always new after a restart. `factory_reset` also restarts the DevNonce, so a network server that keeps the used DevNonces of the device may refuse its joins until you clear them there.
- **Counters:** pulses counted since the last save are lost at a restart or a battery swap. After `device_reset` the totals are kept, but the Hall switches and inputs count again only after you configure them.
- **Sensor history:** release image only. Each restart or power loss costs at most about 2 records. After `device_reset` the records are kept, but recording is off and the history settings are back at their defaults. After a firmware update the history is kept only when the new release uses the same record layout; it starts empty after an upgrade from v1.4.x and after a debug or provisioning image was flashed.
- **Alarm rules:** a rule written over a downlink or NFC without a save is lost at any restart. After an upgrade from v1.4.x the old rules are deleted.
- **Active alarm state:** it starts empty after every restart, and conditions that still hold activate again, see [**Alarms**](alarms.md).
- **Clock:** the clock keeps running across a restart while the battery stays in and stops when power is lost. After a join STICKER asks the network for the time when it has not received it since the start, and then once a week.
- **1-Wire slot bindings:** an automatic enrollment that was not saved does not survive a restart. STICKER repeats it at the next boot only when the saved settings hold a ROM or a `sensorN-type` for at least one slot, because only then does it scan the bus at boot **[ověřit]**, see [**1-Wire probes**](one-wire.md).

What each reset keeps in detail is on [**Maintenance**](../developer-access/maintenance.md) and [**Reset a device**](/apps/hardwario-manager/sticker/reset) in the HARDWARIO Manager guide.

:::note Firmware v1.4.x
An upgrade from v1.4.x without an erase keeps the identity, the LoRaWAN keys, the counters and the 1-Wire slot bindings. It resets the input modes to `none`, the link-check settings to 5 and 5 and `history-channels` to temperature and humidity, deletes the alarm rules and starts the history empty.
:::
