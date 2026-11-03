---
slug: payload
title: Payload and decoder
description: What each STICKER uplink carries, where to get the decoder and what the decoded data looks like.
---

# Payload and decoder

STICKER sends its data as short binary uplinks (messages from the device), and a decoder on the network server turns them into JSON. This page shows what each uplink carries, where to get the decoder and what the decoded data looks like.

## What each uplink carries

The fPort, a number in every LoRaWAN message, tells what an uplink carries.

| fPort | Content |
|---|---|
| 2 | **Telemetry:** the regular measurements, plus extra reports after an alarm or a command |
| 3 | **Alarm report:** alarm events with their time and value |
| 85 | **Info uplink** (device information), **settings uplink** (key settings), answers to commands and history replays. Commands to the device use this port too. |
| 10 | Calibration mode only, a factory test |

- **Telemetry** starts with the battery voltage, the `boot` flag (`true` in the first report after a start) and the alarm state. The values of every sensor that is on follow.
- **Units:** the decoder returns normal units, such as °C, %, hPa, lx and V.
- **Parts:** how many bytes fit into one uplink depends on the data rate, and a device far from the gateway uses a low one. A report that does not fit is split into parts sent about 3 s apart. The decoder labels each part, for example `"pages": "1/2"`.
- **LoRa P2P:** the ProXimos Hub decodes the same uplinks with the same decoder, see [**LoRa P2P**](../connectivity/lora-p2p.md).

## Missing values

A key with the value `null` means that the sensor is on but has no valid reading, for example because a probe is disconnected. A missing key means that the sensor is turned off in the settings.

## The decoder

The decoder is the file `ttn.js` from the STICKER firmware repository, see [**ttn.js on GitHub**](https://github.com/hardwario/sticker-firmware/blob/v2.0.0/app/decoder/ttn.js). The GitHub release itself contains only the firmware files, not the decoder.

- **Install:** set the file as the uplink and downlink payload formatter of your network server, see [**The Things Stack**](../connectivity/lorawan-tts.md) and [**ChirpStack v4**](../connectivity/lorawan-chirpstack.md).
- **Commands:** as the downlink formatter it lets you queue commands as JSON, see [**Downlink commands**](../connectivity/downlink-commands.md). ChirpStack v3 can use the file only to decode uplinks, so send commands there as hex.
- **No merging:** the decoder decodes every uplink on its own and never merges parts. Your application merges the parts of an answer by DevEUI, fPort and sequence number.

## Examples

- **Alarm report** (fPort 3): `alarms` lists each change with `slot`, `channel`, `rule` (`null` for a built-in alarm), `event` (`activate` or `deactivate`), `type`, `value` and `time`. `total` counts all changes, including those that did not fit. Every `time` is `null` while the device has no clock.
- **History replay** (fPort 85): each `history_frame` carries `records`, each with its `time` and the recorded values, and the `seq` of your request.

When they are sent is described in [**Alarms**](alarms.md) and [**History and counters**](history-and-counters.md).

<details>
<summary><b>Telemetry example</b></summary>

A report from a device with the accelerometer and both Hall sensors on (fPort 2). The battery has 3.36 V, the temperature is 23.65 °C and the humidity 54 %. The Hall values are sent although both counts are 0, because the sensors are on.

```text
0108a801100018fa24206c4002900100980104a00100a80104
```

```json
{
  "voltage": 3.36,
  "boot": false,
  "alarm_status": 0,
  "alarm_status_flags": [],
  "temperature": 23.65,
  "humidity": 54,
  "orientation": 2,
  "hall_left_count": 0,
  "hall_left_is_active": true,
  "hall_right_count": 0,
  "hall_right_is_active": true
}
```

</details>

<details>
<summary><b>Info example</b></summary>

The main fields of a decoded Info uplink (fPort 85): a release build, uptime 42 s, battery 3062 mV and no active alarms.

```text
011a13080228d285d8cc04302a50f617580570808004
```

```json
{
  "info": {
    "fw_version": "2.0.0",
    "build_type_name": "main",
    "debug": false,
    "serial_number": 1234567890,
    "uptime_s": 42,
    "battery": 3062,
    "active_alarms": []
  }
}
```

</details>
