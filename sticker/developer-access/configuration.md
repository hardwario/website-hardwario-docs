---
title: Configuration
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
The `config` command and most parameters on this page also work on v1.3.x firmware. **New in the upcoming STICKER firmware v1.4.0**: `config claim-token` (the write-once device claim token) and the LoRaWAN link-supervision keys (`lrw-link-check-interval`, `lrw-link-check-fail-rejoin`).
:::

# Configuration (`config`)

Device settings are read and written with the `config` command over the developer shell. See [**Firmware Setup**](firmware-setup.md) for setting up the firmware and opening the console.

## Command syntax

```
config <subcommand> [value]
```

- Called **without a value**, the subcommand **reads** and prints the current setting.
- Called **with a value**, it **writes** the new setting.

Print every current value at once:

```
config show
```

:::caution Saving changes
A `config` write updates the setting in RAM and takes effect immediately, but it is **not persisted** until you run `settings save`, which writes the configuration to flash and **reboots** the device (see [**Maintenance**](maintenance.md)). A change that is not saved is lost on the next power cycle. Alarm rules set with the `alarm` command (see [**Alarm Rules**](alarm-rules.md)) persist immediately and do not reboot.
:::

## Sampling and reporting intervals

| Command | Argument | Description |
|---|---|---|
| `config interval-sample` | `0`, or `5`-`3600` (seconds) | How often sensors are sampled. `0` means sample once, immediately before each report. |
| `config interval-report` | `60`-`86400` (seconds) | How often an uplink report is sent. Default `900` (15 minutes). |

**Example** - report every 10 minutes:

```
config interval-report 600
settings save
```

## LoRaWAN

| Command | Argument | Description |
|---|---|---|
| `config lrw-region` | `eu868` / `us915` / `au915` | Frequency region. |
| `config lrw-sub-band` | `0`-`8` | US915/AU915 sub-band. `0` = all channels. Default `2`. |
| `config lrw-network` | `public` / `private` | Network type. |
| `config lrw-activation` | `otaa` / `abp` | Activation method. |
| `config lrw-adr` | `true` / `false` | Adaptive Data Rate (ADR). |
| `config lrw-deveui` | 16 hex digits | Device EUI. |
| `config lrw-joineui` | 16 hex digits | Join EUI (AppEUI). |
| `config lrw-nwkkey` | 32 hex digits | Network Key (OTAA). |
| `config lrw-appkey` | 32 hex digits | Application Key (OTAA). |
| `config lrw-devaddr` | 8 hex digits | Device Address (ABP). |
| `config lrw-nwkskey` | 32 hex digits | Network Session Key (ABP). |
| `config lrw-appskey` | 32 hex digits | Application Session Key (ABP). |
| `config lrw-link-check-interval` | `0`-`255` | Request a LinkCheckReq every Nth uplink. `0` = disabled. Default `5`. |
| `config lrw-link-check-fail-rejoin` | `1`-`255` | Link-check failures before an OTAA rejoin is attempted. Default `5`. |

**Example** - EU868 with OTAA:

```
config lrw-region eu868
config lrw-activation otaa
config lrw-deveui 0102030405060708
config lrw-joineui 0807060504030201
config lrw-appkey 0102030405060708090A0B0C0D0E0F10
settings save
```

## Sensors and capabilities

**Capability flags** tell the firmware which hardware is present on a given variant. They are normally set during factory provisioning and should not be changed in the field.

| Command | Argument | Description |
|---|---|---|
| `config cap-barometer` | `true` / `false` | Barometric pressure sensor present. |
| `config cap-pir-detector` | `true` / `false` | PIR motion detector present. |
| `config cap-light-sensor` | `true` / `false` | Ambient light sensor present. |
| `config cap-accelerometer` | `true` / `false` | Accelerometer present (orientation, motion, free-fall). |
| `config cap-w1-sensors` | `true` / `false` | 1-Wire bus enabled; attached sensors are auto-detected on scan. |
| `config cap-hall-left` | `true` / `false` | Hall left sensor present. |
| `config cap-hall-right` | `true` / `false` | Hall right sensor present. |
| `config cap-input-a` | `true` / `false` | External input A present. |
| `config cap-input-b` | `true` / `false` | External input B present. |

**Sensor settings:**

| Command | Argument | Description |
|---|---|---|
| `config accel-motion-sensitivity` | `off` / `low` / `medium` / `high` | Accelerometer motion-detection sensitivity. Default `off`, which powers the accelerometer down (also disables free-fall). |
| `config sensor1-rom` ... `config sensor4-rom` | 16 hex digits | Bind a 1-Wire sensor to slot 1-4 by its ROM serial. All-zero = empty slot. |

## Pulse counters

| Command | Argument | Description |
|---|---|---|
| `config hall-left-counter` | `true` / `false` | Count pulses on the left hall switch. |
| `config hall-right-counter` | `true` / `false` | Count pulses on the right hall switch. |
| `config input-a-counter` | `true` / `false` | Count pulses on external input A. |
| `config input-b-counter` | `true` / `false` | Count pulses on external input B. |

For wiring details (DIP switches, 1-Wire, dry contact, analog), see [**STICKER Input Wiring**](../sticker-input-wiring/index.md).

## Device identity

These parameters are set during factory provisioning and commissioning. Avoid changing them in normal operation. For resetting the device, see [**Maintenance**](maintenance.md).

| Command | Argument | Description |
|---|---|---|
| `config calibration` | `true` / `false` | Enable calibration mode (factory use). |
| `config secret-key` | 32 hex digits | Device secret key used for the encrypted NFC channel. Readable and writable over the shell only. |
| `config serial-number` | 10 decimal digits | Device serial number. |
| `config nonce-counter` | integer | Anti-replay nonce counter for the NFC/LoRaWAN command channel. |
| `config claim-token` | 32 hex digits | 128-bit device claim token. Write-once: set once at commissioning, then immutable. |
