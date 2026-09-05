---
title: CBOR Payload
sidebar_position: 7
description: "GLIDER reports measurements to HARDWARIO Cloud using the CBOR binary format (RFC 8949)."
---
import Image from '@theme/IdealImage';

# CBOR Payload Structure

GLIDER reports measurements to **HARDWARIO Cloud** using the **CBOR** binary format (RFC 8949). To keep messages small, the schema uses **numeric keys** rather than strings, so every payload typically fits in **70 to 150 bytes** on the wire.

The schema is defined in [`application/codec/cbor-decoder.yaml`](https://github.com/hardwario/) of the GLIDER firmware, and the cloud automatically applies the matching decoder.

The send frequency is controlled by `app config interval-send` (default **300 s** = 5 minutes).

## Top-level structure

After decoding, every message contains five top-level objects:

| Key | Description |
| :--- | :--- |
| `message` | Metadata: schema version, sequence number, timestamp. |
| `system` | System information: device uptime. |
| `thermometers` | Array of measured temperatures, one entry per populated DS18B20 slot. |
| `alarms` | Alarm activation / deactivation history since the previous message. |
| `inputs` | Digital input counters and recent events for CH1 / CH2. |

## `message`

Message header. CBOR key: `0`.

| Field | Type | Unit | Description |
| :--- | :--- | :--- | :--- |
| `version` | uint | - | Schema version, currently **`1`**. Used for forward compatibility. |
| `sequence` | uint32 | - | Incremental sequence number. Starts at `0` after every reboot. The cloud uses gaps to detect lost uplinks. |
| `timestamp` | int64 | Unix epoch (s) | Time of transmission, taken from the RTC. |

## `system`

CBOR key: `4`.

| Field | Type | Unit | Description |
| :--- | :--- | :--- | :--- |
| `uptime` | uint64 | seconds | Time since the last boot. |

## `thermometers`

An array of maps, one entry per configured DS18B20 slot. **Empty slots** (no ROM bound, or not yet validated) are **omitted** from the payload.

CBOR key: `6`.

| Field | Type | Unit | Description |
| :--- | :--- | :--- | :--- |
| `slot` | uint (1-8) | - | Slot number (`APP_W1_THERM_MAX_SLOTS = 8`). |
| `temperature` | int (×0.01 °C) or `null` | °C | Last successful read. Encoded as `temperature × 100`; the decoder rescales (`$div: 100`, `$fpp: 2`). `null` = NaN (failed read). |

:::info
Only the **most recent sample** per slot is sent, not the full history between uplinks. If you need a time series, sample at a higher rate and accept the proportionally higher data cost, or open a feature request.
:::

#### Example

```yaml
thermometers:
 - slot: 1
 temperature: 22.68 # encoded on the wire as 2268
 - slot: 2
 temperature: 23.62
```

## `alarms`

CBOR key: `9`.

| Field | Type | Description |
| :--- | :--- | :--- |
| `events` | TSO list | Alarm activation / deactivation events accumulated since the last successful uplink. The buffer is cleared after the send. |

#### `events` - Time-Series Object (TSO) format

The `events` value is a **flat list** in this order:

```text
[timestamp_abs, offset_1, alarm_1, active_1, offset_2, alarm_2, active_2, …]
```

- `timestamp_abs`: Unix epoch (s) of the **first** event in the list (anchor).
- `offset_N`: seconds relative to `timestamp_abs`.
- `alarm_N`: rule number (1-based, 1-32).
- `active_N`: `1` = activated, `0` = deactivated.

The buffer holds up to **100 events** (`APP_ALARM_MAX_EVENTS`).

#### Example

```yaml
alarms:
 events:
 - 1747142400 # timestamp_abs
 - 0 # offset → alarm 1 activated at 1747142400
 - 1
 - 1
 - 120 # offset → alarm 1 deactivated at 1747142520
 - 1
 - 0
```

## `inputs`

Array of maps, one entry per digital input channel (`APP_INPUTS_NUM_CHANNELS = 2`).

CBOR key: `11`.

| Field | Type | Description |
| :--- | :--- | :--- |
| `channel` | uint (1 / 2) | Channel number. |
| `counter_rising` | uint64 | Cumulative count of rising edges since boot. Resets on reboot. |
| `counter_falling` | uint64 | Cumulative count of falling edges since boot. |
| `events` | TSO list | Edge timeline (only populated when the channel is in **event** mode). Cleared after each send. |

#### `events` - TSO format

```text
[timestamp_abs, offset_1, active_1, offset_2, active_2, …]
```

- `timestamp_abs`: Unix epoch (s) of the first event.
- `offset_N`: seconds relative to `timestamp_abs`.
- `active_N`: `1` = activation (rising), `0` = deactivation (falling).

The buffer holds up to **64 events per channel** (`APP_INPUTS_MAX_EVENTS`).

The channel mode (`disabled` / `counter` / `event`) is set via configuration, see [**Configuration → Digital Inputs**](configuration.md#digital-inputs).

#### Example

```yaml
inputs:
 - channel: 1
 counter_rising: 142
 counter_falling: 141
 events:
 - 1747142400 # timestamp_abs
 - 0 # active=1
 - 1
 - 30 # active=0
 - 0
 - channel: 2
 counter_rising: 0
 counter_falling: 0
 events: []
```

## Complete example

A typical decoded payload from a GLIDER monitoring two DS18B20 probes, with no recent alarm events and one input counting pulses:

```yaml
message:
 version: 1
 sequence: 33
 timestamp: 1747142400
system:
 uptime: 2772
thermometers:
 - slot: 1
 temperature: 22.68
 - slot: 2
 temperature: 23.62
alarms:
 events: [] # no alarm transitions since the last uplink
inputs:
 - channel: 1
 counter_rising: 142
 counter_falling: 141
 events: []
 - channel: 2
 counter_rising: 0
 counter_falling: 0
 events: []
```

On the wire this payload is **~95 bytes** of CBOR.

## Codec hash

To make sure the cloud uses the right decoder for the right firmware, every schema has a 64-bit hash baked into the firmware:

```c
#define CODEC_CLOUD_DECODER_HASH ((uint64_t)0xcfef6b4543a9ddb7)
```

Changing the schema regenerates the hash and the cloud must be updated with the matching decoder. The generator command is:

```bash
west gen-codec
```

It reads `application/codec/cbor-decoder.yaml`, writes `application/src/app_codec.h` with the new hash, and produces the binary decoder buffer that gets embedded into the firmware image.

## Related

- **CBOR spec:** [RFC 8949](https://www.rfc-editor.org/rfc/rfc8949)
- **Encoder source:** `application/src/app_cbor.c`
- **Schema source:** `application/codec/cbor-decoder.yaml`
