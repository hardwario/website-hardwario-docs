---
slug: downlink-commands
title: Downlink Commands
---
import Image from '@theme/IdealImage';

# Downlink Commands & Remote Management (`fPort 85`)

STICKER processes remote commands received as LoRaWAN **downlinks on fPort 85** and returns response messages on **fPort 85**.

Commands can be transmitted in two formats:
- **As JSON (Recommended):** When the STICKER payload codec (`ttn.js`) is assigned to your network server as the downlink formatter, commands can be enqueued as structured JSON objects.
- **As Raw Hex:** Pre-encoded binary payload bytes can be sent directly to fPort 85 without passing through an LNS encoder.

In all JSON examples below, `seq` is a user-defined sequence transaction ID (e.g. `1`) echoed in the corresponding uplink response.

:::info Firmware v1.4.0 Remote Control
Firmware **v1.4.0** introduces comprehensive remote management over LoRaWAN on **fPort 85**. Devices can be reconfigured, queried, synchronized, or instructed to replay history logs entirely over the air without requiring physical SWD connection or NFC access.
:::

:::caution Persisting Configuration Changes
Parameters updated remotely via `set_param` take effect immediately in RAM. However, changes **are not saved to flash** until a `settings_save` command is issued (which triggers a device reboot). Unsaved changes will be discarded on the next power cycle.
:::

---

## Action Commands (No Parameters)

Action commands execute system operations, trigger diagnostic reports, or force hardware state resets.

| Action | JSON Command | Hex (fPort 85) | Description |
|---|---|---|---|
| **Request Device Info** | `{"command":"get_info","seq":1}` | `08012200` | Triggers an immediate **Device Info on Join** payload (serial number, FW version, reset cause, claim token, battery level). |
| **Send Report Now** | `{"command":"force_send","seq":1}` | `08014a00` | Forces an immediate sensor measurement sample and uplink transmission on fPort 2. |
| **Get Configuration** | `{"command":"get_config","seq":1}` | `08012a00` | Returns a complete dump of active device parameters. |
| **Scan 1-Wire Bus** | `{"command":"w1_scan","seq":1}` | `08017200` | Scans the 1-Wire bus for attached Dallas/Machine Probe sensors. |
| **Sync RTC Clock** | `{"command":"clock_sync","seq":1}` | `08016200` | Issues a `DeviceTimeReq` MAC request to synchronize the Real-Time Clock from network time. |
| **Save Staged Config** | `{"command":"settings_save","seq":1}` | `08013200` | Commits pending RAM configuration to NVS flash memory and reboots the device. |
| **Reboot System** | `{"command":"reboot","seq":1}` | `08013a00` | Triggers an immediate system reboot. |
| **Factory Reset** | `{"command":"factory_reset","seq":1}` | `08014200` | Resets configuration to factory defaults while preserving serial number, secret key, and claim token. |
| **Reset LoRaWAN Stack**| `{"command":"lrw_reset","seq":1}` | `0801820100` | Resets LoRaWAN frame counters and DevNonce values (reboots MCU). |
| **Force Rejoin** | `{"command":"lrw_join","seq":1}` | `08018a0100` | Forces the LoRaWAN stack to initiate a new OTAA Join sequence. |
| **Enter Calibration** | `{"command":"enter_calibration","seq":1}` | `0801920100` | Enters calibration mode for Hall sensors and analog inputs. |

---

## Remote Configuration (`set_param` & `get_param`)

System parameters are organized under `lorawan`, `application`, and `sensors` configuration groups.

### Examples

**Set Uplink Report Interval to 10 minutes (600 seconds):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_report": 600 } } }
```

*Hex (fPort 85):* `08011205120318d804`

**Enable Radio Transmission (`radio_mode`):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "lorawan": { "radio_mode": true } } }
```

*Hex (fPort 85):* `080112040a022801`

**Enable Adaptive Data Rate (ADR):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "lorawan": { "adr": true } } }
```

*Hex (fPort 85):* `080112040a022001`

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

Alarm rules monitoring temperature, humidity, digital inputs, or pulse thresholds can be updated over the air. Up to 16 rules (`alarm_0` to `alarm_15`) can be populated. Active alarms send immediate uplink alerts on **fPort 3**.

**Set Slot 0 (Onboard Temperature threshold: alarm below 5 °C or above 30 °C):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "03000000000000a0400000f0410000803f" } } }
```

*Hex (fPort 85):* `080112152a131a1103000000000000a0400000f0410000803f`

**Clear Alarm Rule in Slot 0:**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "0000000000000000000000000000000000" } } }
```

*Hex (fPort 85):* `080112152a131a110000000000000000000000000000000000`

---

## Remote History Replay (`req_history`)

To retrieve offline sensor logs buffered in flash memory during network outages, issue a `req_history` downlink specifying the desired Unix timestamp window. STICKER will stream the stored readings back as sequential `history_frame` packets on **fPort 85**.

**Request Sensor History Replay:**

```json
{ "command": "req_history", "seq": 1, "req_history": { "from_unix": 1780000000, "to_unix": 1780003600 } }
```

*Hex (fPort 85):* `08015a0c0880cae2d0061090e6e2d006`

---

## Network Server Downlink Setup

- **ChirpStack v4:** Navigate to **Device $\rightarrow$ Queue**, select **fPort 85**. Enqueue either the raw hexadecimal payload or the structured JSON object (when using the device profile codec).
- **The Things Stack (TTS):** Navigate to **Device $\rightarrow$ Messaging $\rightarrow$ Downlink**, set **fPort 85**. Paste the hex bytes directly or insert the JSON payload if the codec is assigned as the downlink payload formatter.