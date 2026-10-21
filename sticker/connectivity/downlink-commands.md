---
slug: downlink-commands
title: Downlink Commands
---
import Image from '@theme/IdealImage';

# Downlink Commands & Remote Management (`fPort 85`)

STICKER processes remote commands received as LoRaWAN **downlinks on fPort 85** and returns response messages on **fPort 85**. In [**LoRa P2P**](./lora-p2p.md) mode the same commands and answers travel through the ProXimos Hub.

Commands can be transmitted in two formats:
- **As JSON (Recommended):** When the STICKER payload codec (`ttn.js`) is assigned to your network server as the downlink formatter, commands can be enqueued as structured JSON objects.
- **As Raw Hex:** Pre-encoded binary payload bytes can be sent directly to fPort 85 without passing through an LNS encoder.

In all JSON examples below, `seq` is a user-defined sequence transaction ID (e.g. `1`) echoed in the corresponding uplink response.

:::info Firmware v2.0.0
The commands and examples on this page are for STICKER firmware **v2.0.0**, encoded with the v2.0.0 `ttn.js`. Compared with v1.4.0:
- **Paged answers:** An answer that does not fit one frame is split into pages with the same `seq`, and the device sends all of them by itself.
- **New commands:** `get_settings` (key settings on request) and `get_radio_state` (link state and radio diagnostics).
- **Alarm rules** are 18 bytes and address a value by slot and channel. The 17-byte v1.4.x rules are not accepted.
- **`alarms_replace`** rewrites the whole alarm table in one `set_param`.
- **`get_info`** no longer carries the claim token or the link state; ask for the link state with `get_radio_state`.
:::

:::caution Persisting Configuration Changes
Parameters updated remotely via `set_param` take effect immediately in RAM. However, changes **are not saved to flash** until a `settings_save` command is issued, or a `set_param` is sent with `"save": true` (both trigger a device reboot). Unsaved changes will be discarded on the next power cycle.
:::

---

## Action Commands (No Parameters)

Action commands execute system operations, trigger diagnostic reports, or ask for the device state.

| Action | JSON Command | Hex (fPort 85) | Description |
|---|---|---|---|
| **Request Device Info** | `{"command":"get_info","seq":1}` | `08012200` | Returns the device **Info**: firmware version and build, serial number, uptime, time, battery voltage, reset cause, device status, active alarms and 1-Wire slot state. |
| **Request Key Settings** | `{"command":"get_settings","seq":1}` | `0801fa0100` | Returns the settings-info: report and sample intervals, history on/off, every sensor capability flag and the detected 1-Wire sensor types. Much shorter than `get_config`. |
| **Request Radio State** | `{"command":"get_radio_state","seq":1}` | `0801820200` | Returns the link state, SF / data rate, TX power, RSSI/SNR of the last downlink and uplink, duty-cycle use and counters since boot. |
| **Send Report Now** | `{"command":"force_send","seq":1}` | `08014a00` | Sends a telemetry uplink on fPort 2 at once. The uplink is the answer. |
| **Sample and Send** | `{"command":"sample","seq":1}` | `0801aa0100` | Takes a fresh sensor reading, then sends it as a telemetry uplink on fPort 2. |
| **Get Configuration** | `{"command":"get_config","seq":1}` | `08012a00` | Returns a complete dump of active device parameters, in several pages. |
| **Scan 1-Wire Bus** | `{"command":"w1_scan","seq":1}` | `08017200` | Scans the 1-Wire bus for attached Dallas/Machine Probe sensors. |
| **Sync RTC Clock** | `{"command":"clock_sync","seq":1}` | `08016200` | Requests network time (`DeviceTimeReq` on LoRaWAN) and answers with an Info that carries the synchronized time. |
| **Save Staged Config** | `{"command":"settings_save","seq":1}` | `08013200` | Commits pending RAM configuration to NVS flash memory and reboots the device. |
| **Reboot System** | `{"command":"reboot","seq":1}` | `08013a00` | Reboots the device after its answer has been sent. |
| **Force Rejoin** | `{"command":"lrw_join","seq":1}` | `08018a0100` | Starts a new join (OTAA on LoRaWAN, a fresh pairing on P2P). |
| **Play Buzzer Melody** | `{"command":"buzzer_play","seq":1,"buzzer_play":{"kind":3}}` | `0801e201020803` | Plays buzzer melody 3 (melodies 1–3, `0` stops). Needs the buzzer variant with `cap-gpio-mode buzzer`. |

:::note Commands available over a radio
Over LoRaWAN and P2P, firmware v2.0.0 accepts `set_param`, `get_param`, `get_info`, `get_config`, `get_settings`, `get_radio_state`, `settings_save`, `reboot`, `force_send`, `sample`, `reset_counters`, `req_history`, `clock_sync`, `w1_scan`, `lrw_join` and `buzzer_play`. The reset commands (`factory_reset`, `device_reset`, `lrw_reset`) and `enter_calibration` work only over NFC or the shell.
:::

---

## Remote Configuration (`set_param` & `get_param`)

Over a radio, `set_param` can write the `application`, `sensors` and `alarms` configuration groups. The `lorawan` group (keys, region, ADR, data rate, `radio_mode`) and the P2P radio parameters can be read with `get_param` / `get_config`, but are set only over NFC or the shell.

### Examples

**Set Uplink Report Interval to 10 minutes (600 seconds):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_report": 600 } } }
```

*Hex (fPort 85):* `08011205120318d804`

**Set Info and Settings Re-announce Interval to 24 hours (`interval_announce`):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_announce": 24 } } }
```

*Hex (fPort 85):* `0801120412024018`

**Give the GP pins to the inputs and measure Input A as analog voltage:**

```json
{ "command": "set_param", "seq": 1, "set_param": { "sensors": { "cap_gpio_mode": "inputs", "cap_gpio_input_a": "analog" } } }
```

*Hex (fPort 85):* `080112082206d80101e00102`

**Query Specific Parameter (e.g., Report Interval):**

```json
{ "command": "get_param", "seq": 1, "get_param": { "application_field": [3] } }
```

*Hex (fPort 85):* `08011a03120103`

**Reset Pulse Counters (Left Hall Switch & External Input A):**

```json
{ "command": "reset_counters", "seq": 1, "reset_counters": { "hall_left": true, "input_a": true } }
```

*Hex (fPort 85):* `0801520408011801`

---

## Dynamic Alarm Rules (`alarms`)

Alarm rules can be updated over the air. Up to 16 rules (`alarm_0` to `alarm_15`) can be populated. Each rule watches one value, addressed by its **slot** (where the sensor sits) and **channel** (which value of that sensor). Active alarms send immediate uplink alerts on **fPort 3**.

### Rule Layout (18 bytes)

Each `alarm_N` value is an 18-byte blob, written as a hex string in JSON:

| Byte | Field | Meaning |
|---|---|---|
| 0 | Flags | Bit 0 = rule present, bit 1 = rule enabled. `03` = active rule, `00` = empty rule |
| 1 | Slot | `0` = onboard, `1`–`4` = 1-Wire slot 1–4 |
| 2 | Channel | Channel number of the sensor type (see below) |
| 3 | Sensor type | `1` = onboard, `2` = Dallas, `3` = Machine Probe |
| 4 | From | State rules only: previous level (0/1) |
| 5 | To | State rules only: triggering level (0/1) |
| 6–9 | Low | Float, little-endian. Threshold rules: lower limit |
| 10–13 | High | Float, little-endian. Threshold rules: upper limit; rate rules: count that triggers the alarm |
| 14–17 | Dwell | Float, little-endian. Threshold rules: hysteresis band in the channel's units (0 to high − low); state rules: time in seconds (0–3600); rate rules: counting window in seconds (0–3600, 0 = report interval) |

A threshold rule activates as soon as the value leaves the `[low, high]` band and clears once it is back inside by more than the dwell (below `high − dwell`, or above `low + dwell`).

Common channels:

| Sensor type | Channels |
|---|---|
| Onboard (`1`) | `0` temperature, `1` humidity, `2` pressure, `3` illuminance, `4` barometer temperature, `5`/`7` hall left/right state, `6`/`8` hall left/right count, `9`/`12` input A/B state, `10`/`13` input A/B count, `11`/`14` input A/B voltage, `15` PIR motion, `16` PIR count, `17` accelerometer motion, `18` accelerometer count |
| Dallas (`2`) | `0` temperature |
| Machine Probe (`3`) | `0` temperature, `1` humidity, `2` auxiliary temperature, `3` illuminance, `4` magnetic field, `5` tilt, `6`–`8` acceleration X/Y/Z |

### Examples

**Set Rule 0 (Onboard Temperature threshold: alarm below 5 °C or above 30 °C):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "0300000100000000a0400000f04100000000" } } }
```

*Hex (fPort 85):* `080112162a141a120300000100000000a0400000f04100000000`

**Clear Alarm Rule 0:**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "000000000000000000000000000000000000" } } }
```

*Hex (fPort 85):* `080112162a141a12000000000000000000000000000000000000`

**Replace the Whole Alarm Table with Rule 0 Only, and Save:**

`alarms_replace` empties all 16 rules before the rules in the same message are applied, so rules deleted on the host are deleted on the device too. `save` persists the change and reboots.

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms_replace": true, "alarms": { "alarm_0": "0300000100000000a0400000f04100000000" }, "save": true } }
```

*Hex (fPort 85):* `0801121a2a141a120300000100000000a0400000f0410000000018013001`

If a table is split over several downlinks, set `alarms_replace` on the first message only and `save` on the last.

---

## Remote History Replay (`req_history`)

To retrieve offline sensor logs buffered in flash memory during network outages, issue a `req_history` downlink specifying the desired Unix timestamp window. STICKER will stream the stored readings back as sequential `history_frame` pages on **fPort 85**, all with the request's `seq`.

**Request Sensor History Replay:**

```json
{ "command": "req_history", "seq": 1, "req_history": { "from_unix": 1780000000, "to_unix": 1780003600 } }
```

*Hex (fPort 85):* `08015a0c0880cae2d0061090e6e2d006`

---

## Network Server Downlink Setup

- **ChirpStack v4:** Navigate to **Device → Queue**, select **fPort 85**. Enqueue either the raw hexadecimal payload or the structured JSON object (when using the device profile codec).
- **The Things Stack (TTS):** Navigate to **Device → Messaging → Downlink**, set **fPort 85**. Paste the hex bytes directly or insert the JSON payload if the codec is assigned as the downlink payload formatter.