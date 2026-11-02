---
slug: one-wire
title: 1-Wire probes
description: How STICKER finds DS18B20 and MACHINE PROBE sensors on the 1-Wire bus and what happens when a probe is disconnected, reconnected or replaced.
---

# 1-Wire probes

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

STICKER Input reads external probes on its 1-Wire bus: DS18B20 temperature probes and the MACHINE PROBE. This page explains how STICKER finds the probes and binds them to slots and what you see when a probe is disconnected, reconnected or replaced. It ends with a step-by-step procedure for replacing a probe. Wiring and setup are on [**1-Wire temperature probes**](../sticker-input-wiring/one-wire-dallas.md).

## What is supported

| Probe | Sensor type (number) | Channels |
|---|---|---|
| DS18B20 | `dallas` (2) | `temperature` |
| [**MACHINE PROBE**](../sticker-input-wiring/machine-probe.md) | `machine-probe` (3) | `temperature`, `humidity`, `temperature-aux`, `illuminance`, `magnetic-field`, `tilt`, `accel-x`, `accel-y`, `accel-z` |

- **Four slots:** STICKER keeps up to four probes in the slots `s1` to `s4`. A slot is bound to one probe by its ROM, the unique identifier that every 1-Wire device carries (a family code, a 48-bit serial number and a checksum). The slot decides the name under which the values appear in telemetry, history and alarm rules.
- **At most two of each type:** the firmware drives at most two DS18B20 and two MACHINE PROBE at the same time and ignores a third probe of the same type. In practice that means up to 2 DS18B20 plus 2 MACHINE PROBE.
- **Prerequisites:** STICKER Input with DIP switch S1 in the 1-Wire position (switch 3 for input A, 6 for input B), `cap-w1-sensors true` and the mode of that input at `none`. The release firmware contains 1-Wire support; the default debug build leaves it out.

## How STICKER finds probes

STICKER looks for probes on the bus (a scan) only at these moments:

- **At boot,** when at least one slot is taught, that is when it has a stored ROM (`sensorN-rom`) or an expected sensor type (`sensorN-type`). A new unit without a taught slot does not scan at boot.
- **In the background,** while a taught slot has no probe: first about 2 min after boot, then after another 5, 10 and 15 min, then every 15 min. That is roughly at 2, 7, 17 and 32 min after boot and every 15 min after that. Each check is a quick search of the bus, and STICKER binds the slots again only when the set of probes on the bus has changed. When every taught slot has its probe, the background checks stop.
- **On the `w1_scan` command,** sent as a downlink (a message from the network to the device) or over NFC. HARDWARIO Manager sends it when it reads the 1-Wire slots. The answer lists up to 4 ROMs found on the bus, and STICKER binds its slots again and restarts the background checks. On a unit without a taught slot this rebinding does nothing.

A probe that STICKER finds is bound without a restart, and STICKER takes a fresh reading for it.

## Enrolling the first probe

STICKER uses a probe only after a slot is taught for it. You can teach a slot in these ways:

- **HARDWARIO Manager:** in **STICKER → Tools → 1-Wire sensors** read the slots and scan the bus, assign each probe to a slot and choose **Save to device**. See [**1-Wire sensors**](/apps/hardwario-manager/sticker/one-wire-sensors) in the HARDWARIO Manager guide.
- **Provisioning:** set `sensorN-type` in advance (2 for DS18B20, 3 for MACHINE PROBE) and save. At the next boot STICKER scans the bus and enrolls a matching probe by itself, into the lowest free slot that accepts its type. A slot without a type accepts any probe, so set the types from `sensor1-type` upward without a gap; otherwise the probe lands in a lower untyped slot and the typed slot stays `absent`.
- **Downlink:** read the ROMs with `w1_scan`, then write `sensorN-rom` with `set_param` and save. The slot uses another byte order than the scan answer, see the details under the replacement procedure below.
- **Shell** (provisioning image; the default debug build has no 1-Wire support and no `w1` command): `w1 scan` or `w1 enroll`, then `settings save`.

**Automatic enrollment:** whenever STICKER binds its slots and finds a probe that no slot claims, it enrolls the probe into the lowest free slot, a slot without a ROM that expects the type of the probe or no type. STICKER keeps such an enrollment in RAM until the settings are saved, and any later save stores it. An enrollment that was not saved is repeated at the next boot only when at least one slot is taught in the saved settings (a stored ROM or `sensorN-type`), because only then does STICKER scan at boot **[ověřit]**. If the probes on the bus changed, a probe can land in another slot, so save after an enrollment.

## How probes are assigned to slots

Every time STICKER binds its slots, it follows these rules:

1. A slot with a stored ROM takes the probe with exactly that ROM, in whatever order the probes are found. A slot therefore always means the same physical probe.
2. Each remaining probe goes into the lowest free slot that expects its type or no type.
3. A taught slot left without its probe is `absent`. It is `replaced` when a new probe of the same type is on the bus, and `mismatch` when it expects a type and a probe of another type is on the bus that no free slot could take.

Keep the slot order the same across a fleet, otherwise the same slot name means a different probe on different devices.

## When a probe is disconnected

When a probe is unplugged, its cable breaks or it fails, you see the following. No restart is needed.

- **Values:** from the next sensor reading the values of the slot are `null` in telemetry and in the history. By default STICKER reads its sensors once per report interval.
- **Slot state:** `absent` in the Info uplink, the status message the device sends to the network after every join. The slot keeps its ROM, and STICKER tries the probe again at every reading.
- **No-data alarm:** once the values have been missing for 5 s, STICKER raises one no-data alarm for the whole probe (channel `device`, number 255). An active threshold alarm on the slot clears, because its value is missing. The red LED blinks while the alarm is active.
- **One chip of a MACHINE PROBE:** if only one chip stops while the probe still answers, the other channels keep their values, and the no-data alarm names the first channel of the failed chip. A chip that has not reported since the slot was bound, for example a TMP112 that the probe revision does not have, never raises an alarm.

## When the same probe is reconnected

When the probe answers again, at the next reading:

- the slot returns to `ok` and the values come back;
- the no-data alarm clears, and the clear is sent;
- a MACHINE PROBE gets its accelerometer set up again.

No restart is needed. If the device restarted while the probe was unplugged, the slot has no probe after the boot, and STICKER finds the probe with a background check or a `w1_scan`.

## When a probe is replaced

A new probe has a different ROM, even when it is the same model. STICKER never moves a new probe into the slot of the old one by itself, because that slot stays bound to the old ROM.

| Situation | Old slot | New probe |
|---|---|---|
| Same type, a free slot exists | `replaced`, values `null`, no-data alarm | Enrolled into the free slot, its values appear under that slot |
| Same type, no free slot | `replaced`, values `null`, no-data alarm | Not used until you assign it |
| Different type, a free slot can take it | `absent`, values `null`, no-data alarm | Enrolled into the free slot under its own type |
| Different type, no free slot can take it | `mismatch`, values `null`, `sensor_mismatch` alarm instead of the no-data alarm, alarm rules of the slot inactive | Not used until you assign it |

- The alarm rules and history channels of the old slot do not follow the new probe into another slot.
- If you swap a probe while the device is running, STICKER does not look for the new probe by itself: the old slot still counts as bound, so no background check runs (unless another taught slot is already waiting for its probe). Trigger a binding with `w1_scan` (HARDWARIO Manager sends it when it reads the 1-Wire slots) or restart the device.

### Replace a probe step by step

These steps put the new probe into the slot of the old one, so its values, alarm rules and history keep the same slot name. You need HARDWARIO Manager on a phone with NFC, and the device must be powered.

1. Unplug the old probe and plug in the new one on the same input. Leave the DIP switch as it is.
2. In HARDWARIO Manager go to **STICKER → Tools → 1-Wire sensors**, choose **Read slots & scan the 1-Wire bus** and hold the phone to the device. The scan also makes STICKER bind its slots again, and it may enroll the new probe into a free slot by itself.
3. Read the slots once more, so that the app shows where STICKER has put the new probe **[ověřit]**.
4. Assign the new probe, shown by its ROM, to the slot of the old probe. The app moves it out of any other slot. To tell probes apart, warm one in your hand and watch which live reading moves.
5. Clear every slot that no longer has a probe.
6. Choose **Save to device** and hold the phone to the device. STICKER saves the slots and restarts.
7. Check the result: the next Info uplink shows the slot as `ok`, telemetry has values for it and its no-data or mismatch alarm clears. If a slot that you cleared still appears in telemetry with `null` values, its expected sensor type is still set: set its `sensorN-type` to 0 and save.
8. If the new probe is of a different type, write the alarm rules of the slot again, because rules written for the old type stay inactive. If the history records channels of that slot, the history starts again, because its record layout changed.

<details>
<summary><b>Replace a probe over the radio or in the shell</b></summary>

**Over the radio** **[ověřit]**:

1. Send `w1_scan`, for example `{"seq":4,"command":"w1_scan"}` (hex `08047200` on fPort 85, the LoRaWAN port for commands). The answer lists the ROMs on the bus, for example `"rom": ["28abcdef010203b7"]`.
2. Read the slots with `get_param`, for example `{"seq":5,"command":"get_param","get_param":{"sensors_field":[11,12,13,14]}}` (hex `08051a061a040b0c0d0e`). Fields 11 to 14 are `sensor1_rom` to `sensor4_rom`.
3. Convert the ROM of the new probe to the slot format: two zero bytes, then the six serial-number bytes (bytes 2 to 7 of the ROM) in reverse order. `28abcdef010203b7` becomes `0000030201efcdab`.
4. In one `set_param`, write the slot, clear any other slot that holds the new probe (its ROM and its type) and save. The example below writes slot 1 and clears slot 2.
5. After the restart, check the Info uplink.

```json
{ "seq": 6, "command": "set_param", "set_param": { "sensors": { "sensor1_rom": "0000030201efcdab", "sensor2_rom": "0000000000000000", "sensor2_type": 0 }, "save": true } }
```

Hex (fPort 85): `0806121b22175a080000030201efcdab62080000000000000000c001001801`

**In the shell** (provisioning image) **[ověřit]**: `w1 list` shows the slots and `w1 scan` the probes on the bus. `w1 clear <slot>` forgets a slot, both its ROM and its type. Clear the old slot and any slot that the new probe went into, bind the probe with `w1 enroll <slot> <rom>` if it did not land in the right slot by itself, check with `w1 list` and store the result with `settings save`. For `<rom>` give the 12-digit serial number as `w1 scan` and `w1 list` print it, not the 16-digit ROM from the `w1_scan` answer.

</details>

## Reading checks

- **Range:** DS18B20 readings outside −55 to 125 °C are rejected and reported as missing. Every other reading is also checked against the valid range of its channel.
- **The +85 °C value:** a DS18B20 shows exactly +85 °C after a power glitch. STICKER reports the first reading of exactly +85 °C as missing and accepts it only when the next reading is +85 °C as well, so a real 85 °C appears one reading later.
- **MACHINE PROBE chips:** STICKER reads a MACHINE PROBE chip by chip. A failed chip leaves only its own channels `null`. The TMP112 chip (`temperature-aux`) is skipped after 3 failed reads in a row until the slots are bound again (at boot, on a scan or on an enrollment); older probe revisions do not have this chip.

## How missing probes appear

The fPort in the table is the LoRaWAN port number that tells the message types apart.

| Where | What you see |
|---|---|
| Telemetry (fPort 2) | The slot is still sent, with `null` for every value. Only slots without an expected type are left out. |
| Info uplink (fPort 85) | `w1_slot_state` lists all four slots as `none` (unused), `ok`, `absent`, `replaced` or `mismatch`. STICKER sends Info after every join, every `interval-announce` hours (24 h by default) and on `get_info`. |
| Alarm report (fPort 3) | `no_data` with channel `device` for a whole probe, or with the first channel and the `part` of a failed chip; `sensor_mismatch` with `detected_type` |
| Sensor history | The columns of the slot are stored as missing and decode as `null` |
| LED | The red alarm blink every 3 s while an alarm is active |
| Shell (provisioning image) | `w1 list` shows `present`, `absent`, `REPLACED?` or `MISMATCH` for each slot |

More on alarm reports is on [**Alarms**](alarms.md), and on the history on [**History and counters**](history-and-counters.md).

<details>
<summary><b>Decoded examples</b></summary>

Telemetry with a MACHINE PROBE in slot 1 and a DS18B20 in slot 2, both missing, from the firmware test suite:

```text
01da010408011003da010408021002
```

```json
{
  "w1_sensors": [
    {
      "slot": 1,
      "type": 3,
      "type_name": "machine-probe",
      "values": {
        "temperature": null,
        "humidity": null,
        "temperature-aux": null,
        "illuminance": null,
        "magnetic-field": null,
        "tilt": null,
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
      "slot": 2,
      "type": 2,
      "type_name": "dallas",
      "values": { "temperature": null },
      "units": { "temperature": "degC" }
    }
  ]
}
```

The DS18B20 in slot 1 stopped answering **[ověřit]**:

```text
010880cae2d00610011a0c080138ff01480450ff0158022001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "s1",
      "channel": "device",
      "sensor_type": "dallas",
      "rule": null,
      "event": "activate",
      "type": "no_data",
      "value": null,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

Slot 1 expects a DS18B20 but finds a MACHINE PROBE that no free slot can take **[ověřit]**:

```text
010880cae2d00610011a0b0801280638ff01480558022001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "s1",
      "channel": null,
      "sensor_type": "dallas",
      "rule": null,
      "event": "activate",
      "type": "sensor_mismatch",
      "value": 3,
      "time": 1780000000,
      "detected_type": "machine-probe"
    }
  ],
  "truncated": false
}
```

The TMP112 chip of a MACHINE PROBE in slot 2 failed while the probe still answers **[ověřit]**:

```text
010880cae2d00610011a0b080238ff014804500258032001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "s2",
      "channel": "temperature-aux",
      "part": "tmp112",
      "sensor_type": "machine-probe",
      "rule": null,
      "event": "activate",
      "type": "no_data",
      "value": null,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

When the probe or the chip answers again, the same event follows with `"event": "deactivate"`.

</details>

:::note Firmware v1.4.x
Firmware v1.4.x numbers the probe types 1 (DS18B20) and 2 (MACHINE PROBE), and its decoder puts `temperature`, `humidity` and `tilt_alert` directly into each `w1_sensors` entry. Firmware v2.0.0 uses the numbers 2 and 3 and puts the values under `values`, so decoders and alarm rules must be updated. The expected sensor type per slot, the `sensor_mismatch` alarm and the slot states in the Info uplink are new in v2.0.0.
:::

:::note Firmware v1.4.x
In firmware v1.4.x a probe plugged in after boot is found only after a restart or a `w1 scan` in the shell. The `w1_scan` command lists the probes but does not bind them, and there are no background checks. The stored ROM bindings carry over to v2.0.0, and STICKER fills in the sensor type of each slot at the first binding **[ověřit]**.
:::
