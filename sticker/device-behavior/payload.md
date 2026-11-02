---
slug: payload
title: Payload and decoder
description: How STICKER uplinks are built, which decoder to use for which firmware version and what the decoded data looks like.
---

# Payload and decoder

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

STICKER sends its data as compact binary uplinks, the messages that the device sends to the network. A decoder on the network server, the payload formatter, turns them into JSON. This page explains how the uplinks are built, which decoder to use for which firmware version and what the decoded data looks like. You need it when you connect STICKER data to your own system, or when decoded values look wrong.

## Uplink structure

Every uplink is sent on an fPort, the port number of a LoRaWAN message that tells the receiver what the message carries:

| fPort | Direction | Content |
|---|---|---|
| 2 | Uplink | Telemetry: periodic reports and reports triggered by an alarm or a command |
| 3 | Uplink | Alarm report: alarm events with their time and value |
| 85 | Uplink | Answers to commands, the Info and settings-info, history frames |
| 85 | Downlink | Commands, see [**Downlink processing**](downlinks.md) |
| 10 | Uplink | Calibration mode only (factory test), with its own decoder `calibration.js` |
| 1 | Uplink | Bitmap format of firmware v1.3.x and older; firmware v2.0.0 does not send it |

How a payload is built:

- **Version byte:** the first byte of every uplink on fPorts 2, 3 and 85 is the payload version, `0x01`. Commands sent to the device (downlinks) have no version byte.
- **Protobuf body:** the rest is protobuf, a compact binary format of numbered fields. Fields a report does not need are left out, so a report stays short.
- **Scaled whole numbers:** values travel as whole numbers, for example a temperature in hundredths of a degree. The decoder converts them back to normal units.
- **`null` or no key:** when a sensor is enabled but has no valid reading, for example because a probe is disconnected, its key is present with the value `null`. When a key is missing, the capability is turned off in the settings.
- **System group:** every telemetry report starts with the battery voltage, the `boot` flag (`true` in the first report after a start) and the alarm state (`alarm_status` and `alarm_status_flags`).
- **Order:** the other groups follow in a fixed order: onboard temperature and humidity, barometer, light, accelerometer, PIR, Hall sensors, inputs and the 1-Wire readings.
- **Pages:** the data rate (DR) of an uplink sets how many bytes fit into it. A report that does not fit the current data rate is split into pages sent about 3 s apart. Each page is a slice of the same measurement and carries `page_index` and `page_count`; the decoder adds `pages`, for example `"1/2"`. A 1-Wire reading is never split between pages. Answers on fPort 85 and alarm reports are paged in the same way.
- **LoRa P2P:** over [**LoRa P2P**](../connectivity/lora-p2p.md) the same payloads travel inside the radio frame after an envelope byte `0x81` and the port number, so the ProXimos Hub decodes them with the same decoder.

<details>
<summary><b>Scaled values</b></summary>

| Decoded key | On the air | Decoded unit |
|---|---|---|
| `voltage` (battery) | V × 50, in 20 mV steps; 0 means not measured yet | V |
| `temperature` | °C × 100 | °C |
| `humidity` | % × 2 | % |
| `pressure` | hPa × 10 | hPa |
| `altitude` | m × 10 | m |
| `illuminance` | lx ÷ 2 | lx |
| `input_a_voltage`, `input_b_voltage` | mV | V |
| `orientation` | 1–6 | 1–6 |
| Counters such as `hall_left_count` | 32-bit whole number | Same |
| 1-Wire readings (`w1_sensors`) | Per probe: slot, type, a mask of valid channels and the packed values | `values` and `units` for every channel of the probe type |

</details>

## The decoder

- **File:** `ttn.js` in the folder `app/decoder` of the firmware repository, at the tag of the firmware version. For firmware v2.0.0 use [**ttn.js at v2.0.0**](https://github.com/hardwario/sticker-firmware/blob/v2.0.0/app/decoder/ttn.js) on GitHub. The GitHub release itself contains only the firmware images and their checksums, not the decoder.
- **Functions:** the file is plain JavaScript (ES5) for the payload formatter of the network server. The Things Stack v3 and ChirpStack v4 use `decodeUplink`, `encodeDownlink` and `decodeDownlink`. ChirpStack v3 uses `Decode(fPort, bytes)`, which decodes uplinks only, so send commands there as hex.
- **Installation:** set the file as the uplink and downlink payload formatter, see [**The Things Stack**](../connectivity/lorawan-tts.md) and [**ChirpStack v4**](../connectivity/lorawan-chirpstack.md).
- **No memory:** the decoder decodes every uplink on its own and never merges pages. Your application merges the pages of an answer by DevEUI, fPort and `seq`, and the pages of an alarm report by `base_time`.
- **Unknown version:** a payload with an unknown version byte gets the warning `unknown payload version`, and the decoder still decodes as much as it can.
- **Commands:** the [**Downlink commands generator**](../connectivity/downlink-commands-generator.mdx) builds commands with the same encoder.

## Compatibility between firmware versions

Firmware v1.4.x and v2.0.0 both start their payloads with the version byte `0x01`, but they encode alarm events, 1-Wire readings and the `device_status` bits differently. A decoder cannot tell the two formats apart from the payload, so each device needs the decoder that matches its firmware.

- **Pick by the Info:** every device reports its firmware version in the Info uplink (`info.fw_version`). The decoders of both versions read this field correctly, so you can always find out which decoder a device needs, see [**Firmware versions and updates**](firmware.md).
- **Mixed fleet:** assign the decoder per device or per device profile to match the firmware version, or use one decoder that picks the format by the firmware version from the Info.
- **Older formats:** the v2.0.0 decoder still decodes v1.4.x history frames without the `channels` field and the fPort 1 bitmap of v1.3.x and older.

What a wrong decoder shows:

| Device firmware | Decoder | What you see |
|---|---|---|
| v1.4.x | v2.0.0 | 1-Wire readings with a wrong sensor type and `null` values; alarm events with a wrong channel and value, and an unknown slot for inputs and Hall sensors; wrong `device_status_flags` |
| v2.0.0 | v1.4.x | 1-Wire readings without values; alarm events with a wrong source, quantity and value; wrong `device_status_flags` |

:::note Firmware v1.4.x
Firmware v1.4.x uses the same fPorts and version byte. Its 1-Wire readings use the old type numbers (1 for a DS18B20 and 2 for a MACHINE PROBE, now 2 and 3), its alarm events name a source and quantity instead of a slot and channel and its `device_status` bits are grouped differently. Decode v1.4.x devices with the `ttn.js` of v1.4.0.
:::

## Decoded examples

Each example shows the payload in hex and the `data` object that the v2.0.0 decoder returns. Examples marked **[ověřit]** were built from the protocol definition and decoded with the v2.0.0 decoder, but not captured from a device.

### Telemetry

A report captured on a real device with the accelerometer and both Hall sensors enabled (fPort 2). The battery has 3.36 V, the temperature is 23.65 °C and the humidity 54 %. The Hall groups are sent whole although both counts are 0, because their capabilities are on.

```text
0108a801100018fa24206c4002900100980104a00100a80104
```

<details>
<summary><b>Decoded telemetry</b></summary>

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

### 1-Wire readings

A test frame from the decoder's test suite with a MACHINE PROBE in slot 3 and a DS18B20 in slot 1 (fPort 2). The test frame contains only the 1-Wire group; a real report also carries `voltage`, `boot` and `alarm_status`. Every channel of the probe type is listed; a channel without a value is `null`. A slot whose probe is missing, or holds a probe of another type, is sent without values, so all its channels decode as `null`.

```text
01da010d0803100358236205fa24d80102da010a0801100258016202cc21
```

<details>
<summary><b>Decoded 1-Wire readings</b></summary>

```json
{
  "w1_sensors": [
    {
      "slot": 3,
      "type": 3,
      "type_name": "machine-probe",
      "values": {
        "temperature": 23.65,
        "humidity": 54,
        "temperature-aux": null,
        "illuminance": null,
        "magnetic-field": null,
        "tilt": 1,
        "accel-x": null,
        "accel-y": null,
        "accel-z": null
      },
      "units": {
        "temperature": "degC",
        "humidity": "%RH",
        "temperature-aux": "degC",
        "illuminance": "lx",
        "magnetic-field": "mT",
        "tilt": "bool",
        "accel-x": "m/s2",
        "accel-y": "m/s2",
        "accel-z": "m/s2"
      }
    },
    {
      "slot": 1,
      "type": 2,
      "type_name": "dallas",
      "values": { "temperature": 21.5 },
      "units": { "temperature": "degC" }
    }
  ]
}
```

</details>

### Info

An Info after a power-on (fPort 85) **[ověřit]**: firmware 2.0.0 release build, uptime 42 s, battery 3062 mV and no active alarms. After a power-on the clock is not set yet, so `unix_time` is missing and `device_status_flags` contains `time_unsynced`. The boot Info has `seq` 0, so the decoded data has no `seq` key. Over NFC the Info also carries the DevEUI and the claim token; over the radio it never does.

```text
011a13080228d285d8cc04302a50f617580570808004
```

<details>
<summary><b>Decoded Info</b></summary>

```json
{
  "info": {
    "fw_major": 2,
    "fw_minor": 0,
    "fw_patch": 0,
    "build_type": 0,
    "debug": false,
    "device_status": 65536,
    "active_alarms": [],
    "serial_number": 1234567890,
    "uptime_s": 42,
    "battery": 3062,
    "reset_cause": 5,
    "fw_version": "2.0.0",
    "build_type_name": "main",
    "device_status_flags": ["time_unsynced"],
    "reset_cause_flags": ["pin", "brownout"]
  }
}
```

</details>

### Alarm report

An alarm report with two events (fPort 3) **[ověřit]**: rule 7 sees the onboard temperature rise above its high limit at 26.6 °C, which opens the collection window, and 5 s later rule 0 sees the left Hall sensor switch on. The first change has the time `base_time`; each later one adds its offset. When the clock was not set (`time_synced: false`), the event times are `null`.

```text
010880cae2d00610021a0728c829380748021a0820052802480350052001
```

<details>
<summary><b>Decoded alarm report</b></summary>

```json
{
  "base_time": 1780000000,
  "total": 2,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "temperature",
      "rule": 7,
      "event": "activate",
      "type": "high",
      "value": 26.6,
      "time": 1780000000
    },
    {
      "slot": "mb",
      "channel": "hall-left-state",
      "rule": 0,
      "event": "activate",
      "type": "trigger",
      "value": 1,
      "time": 1780000005
    }
  ],
  "truncated": false
}
```

</details>

### History frame

A history frame from a `req_history` replay with `seq` 1 and the default channels (temperature and humidity) on fPort 85 **[ověřit]**. Records carry no time of their own: the time of record number n (counted from 0) is `t0_unix` + n × `interval_s`, and with `time_synced: false` the record times decode as `null`. A second test frame from the decoder's test suite shows a frame that is page 1 of 2; it lacks the `channels` field, like the frames of v1.4.x.

```text
0108012a191880cae2d006220666085a70085c2803308407380152020001
01080a2a121880cae2d006220366085a280330840738016802
```

<details>
<summary><b>Decoded history frames</b></summary>

```json
{
  "seq": 1,
  "history_frame": {
    "records": [
      { "time": 1780000000, "temperature": 21.5, "humidity": 45 },
      { "time": 1780000900, "temperature": 21.6, "humidity": 46 }
    ],
    "t0_unix": 1780000000,
    "present": 3,
    "interval_s": 900,
    "time_synced": true,
    "channels": ["temperature", "humidity"]
  }
}
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

</details>

For how history is recorded and read out, see [**History and counters**](history-and-counters.md) and [**Sensor history**](../developer-access/sensor-history.md).
