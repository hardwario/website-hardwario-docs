---
slug: downlink-commands
title: Downlink Commands
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
The functionality described on this page is part of the upcoming **STICKER firmware v1.4.0** and is not available in v1.3.x.
:::

# Downlink Commands

STICKER accepts commands as LoRaWAN **downlinks on fPort 85** and replies on fPort 85. Commands can request device info, change configuration, force a report, set alarm rules, replay history, reboot, and more.

There are two ways to send a command:

- **As JSON** (recommended): with the STICKER codec installed as the **downlink** payload formatter, enqueue the command as a JSON object and the network server encodes it to bytes. See your server's setup page ([**ChirpStack**](lorawan-chirpstack.md) or [**The Things Stack**](lorawan-tts.md)) for installing the codec, the same `ttn.js` used to decode uplinks.
- **As raw hex**: paste the ready-made byte payload directly into a downlink on fPort 85, without the codec.

Both forms produce the same bytes (the JSON is converted by the codec's `encodeDownlink` function). In the examples below, `seq` is any value you choose (`1` here) and is echoed in the reply so you can match responses to requests.

:::caution Persisting configuration
A `set_param` change takes effect immediately but is **not saved** until you send a `settings_save` command (which reboots). Without it, the change is lost on the next power cycle.
:::

## Actions (no parameters)

| Action | JSON | Hex (fPort 85) |
|---|---|---|
| Request device info | `{"command":"get_info","seq":1}` | `08012200` |
| Send a report now | `{"command":"force_send","seq":1}` | `08014a00` |
| Dump the whole configuration | `{"command":"get_config","seq":1}` | `08012a00` |
| Scan the 1-Wire bus | `{"command":"w1_scan","seq":1}` | `08017200` |
| Sync the wall clock from the network | `{"command":"clock_sync","seq":1}` | `08016200` |
| Save staged configuration (reboots) | `{"command":"settings_save","seq":1}` | `08013200` |
| Reboot | `{"command":"reboot","seq":1}` | `08013a00` |
| Factory reset, keeps identity + keys (reboots) | `{"command":"factory_reset","seq":1}` | `08014200` |
| Reset LoRaWAN counters + DevNonce (reboots) | `{"command":"lrw_reset","seq":1}` | `0801820100` |
| Force a (re)join | `{"command":"lrw_join","seq":1}` | `08018a0100` |
| Enter calibration mode | `{"command":"enter_calibration","seq":1}` | `0801920100` |

## Configuration

Change settings with `set_param`, grouped by `lorawan`, `application` or `sensors`. Follow with `settings_save` to persist.

Set the report interval to 600 seconds:

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_report": 600 } } }
```

Hex (fPort 85): `08011205120318d804`

Enable ADR:

```json
{ "command": "set_param", "seq": 1, "set_param": { "lorawan": { "adr": true } } }
```

Hex (fPort 85): `080112040a022001`

Enable the barometer capability:

```json
{ "command": "set_param", "seq": 1, "set_param": { "sensors": { "cap_barometer": true } } }
```

Hex (fPort 85): `0801120422023001`

Read a parameter back (here the report interval, field 3 of the `application` group):

```json
{ "command": "get_param", "seq": 1, "get_param": { "application_field": [3] } }
```

Hex (fPort 85): `08011a03120103`

Clear the hall-left and input-a pulse counters:

```json
{ "command": "reset_counters", "seq": 1, "reset_counters": { "hall_left": true, "input_a": true } }
```

Hex (fPort 85): `0801520408011801`

## Alarm rules

Alarm rules are written with `set_param` on the `alarms` group, one packed value per slot (`alarm_0` ... `alarm_15`). The local `alarm` shell command (see [**Alarm Rules**](../developer-access/alarm-rules.md)) is an easier way to author the same rules over a debug connection. Add a `settings_save` afterwards to keep a rule across a reboot.

Set slot 0 to an onboard-temperature rule (alarm below 5 °C or above 30 °C, 1 °C hysteresis):

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "03000000000000a0400000f0410000803f" } } }
```

Hex (fPort 85): `080112152a131a1103000000000000a0400000f0410000803f`

Clear slot 0:

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "0000000000000000000000000000000000" } } }
```

Hex (fPort 85): `080112152a131a110000000000000000000000000000000000`

## History

Replay stored history for a time window (Unix seconds); the device streams the records back on fPort 85:

```json
{ "command": "req_history", "seq": 1, "req_history": { "from_unix": 1780000000, "to_unix": 1780003600 } }
```

Hex (fPort 85): `08015a0c0880cae2d0061090e6e2d006`

:::info Queuing the downlink
- **The Things Stack**: device → **Messaging → Downlink**, fPort `85`. Paste the hex as the byte payload, or send the JSON if the codec is set as the downlink formatter.
- **ChirpStack**: device → **Queue**, fPort `85`. Enqueue the JSON object (encoded by the device-profile codec) or the raw bytes.
:::
