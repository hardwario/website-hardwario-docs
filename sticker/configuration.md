---
slug: configuration
title: Configuration
---
import Image from '@theme/IdealImage';

# Sticker Configuration

STICKER supports two configuration methods:

- **NFC** — primary method for end users; configure the device using a smartphone without opening the enclosure.
- **Shell (RTT terminal)** — developer method; configure via an interactive console over a debug connection.

---

## NFC Configuration

STICKER includes an NFC interface that allows configuration even when batteries are not inserted, using **NFC energy harvesting** — the NFC field from a smartphone provides enough power to write settings into the device's internal EEPROM.

When the device wakes up on battery power, it reads the NFC tag, applies the stored configuration, and clears the temporary storage.

The following parameters can be set via NFC:
- LoRaWAN region, network type, activation mode, and keys
- Sampling, aggregation and report intervals
- Alarm thresholds (temperature, humidity, pressure, external T1/T2)
- Hall and external input notification settings
- Temperature corrections
- Capability flags
- Calibration mode

Once configured, you can read and write these parameters using the [**HARDWARIO STICKER NFC Configurator**](nfc-configurator-app/setup.md).

For more details on NFC energy harvesting and power behavior, see [**Power Management**](https://docs.hardwario.com/sticker/power-management/).

---

## Shell Configuration (Developer)

When the device is in **Developer (Debug) Mode**, configuration is accessible through an interactive shell via the RTT terminal.

To open the RTT terminal, run the following from the `app` directory of the firmware:

```bash
make rttt
```

For more information on how to access developer mode, see [**Developer Access**](https://docs.hardwario.com/sticker/developer-mode/).

### Command Syntax

All configuration is done using the `config` command:

```
config <subcommand> [value]
```

- When called **without a value**, the subcommand **reads** and prints the current setting.
- When called **with a value**, the subcommand **writes** the new setting.

To print all current configuration values at once:

```
config show
```

---

### Reporting Intervals

| Command | Argument | Description |
|---|---|---|
| `config interval-sample` | `0` or `5`–`3600` (seconds) | How often the device samples sensors. `0` means sample immediately before each report. |
| `config interval-aggreg` | `0`–`86400` (seconds) | How often the device aggregates samples. `0` means aggregation is disabled. |
| `config interval-report` | `60`–`86400` (seconds) | How often the device sends an uplink report. Default: `900` (15 minutes). |

**Example** — set report interval to 10 minutes:
```
config interval-report 600
```

**Example** — set sample interval to 60 seconds:
```
config interval-sample 60
```

---

### LoRaWAN

| Command | Argument | Description |
|---|---|---|
| `config lrw-region` | `eu868` / `us915` / `au915` | LoRaWAN frequency region |
| `config lrw-network` | `public` / `private` | LoRaWAN network type |
| `config lrw-activation` | `otaa` / `abp` | Activation method |
| `config lrw-adr` | `true` / `false` | Adaptive Data Rate (ADR) |
| `config lrw-deveui` | 16 hex digits | Device EUI |
| `config lrw-joineui` | 16 hex digits | Join EUI (AppEUI) |
| `config lrw-nwkkey` | 32 hex digits | Network Key (OTAA) |
| `config lrw-appkey` | 32 hex digits | Application Key (OTAA) |
| `config lrw-devaddr` | 8 hex digits | Device Address (ABP) |
| `config lrw-nwkskey` | 32 hex digits | Network Session Key (ABP) |
| `config lrw-appskey` | 32 hex digits | Application Session Key (ABP) |

**Example** — set EU868 region with OTAA activation:
```
config lrw-region eu868
config lrw-activation otaa
config lrw-deveui 0102030405060708
config lrw-joineui 0807060504030201
config lrw-appkey 0102030405060708090A0B0C0D0E0F10
```

---

### Alarms

Alarms generate an immediate uplink when a threshold is crossed. Each alarm has a hysteresis value to prevent repeated triggering when the value hovers near the threshold.

#### Temperature Alarm

| Command | Argument | Description |
|---|---|---|
| `config alarm-temperature-enabled` | `true` / `false` | Enable or disable the temperature alarm |
| `config alarm-temperature-lo` | `-30` to `70` (°C) | Low threshold — alarm triggers when temperature drops below this value |
| `config alarm-temperature-hi` | `-30` to `70` (°C) | High threshold — alarm triggers when temperature rises above this value |
| `config alarm-temperature-hst` | `0` to `5` (°C) | Hysteresis — dead band around the threshold |

#### Humidity Alarm

| Command | Argument | Description |
|---|---|---|
| `config alarm-humidity-enabled` | `true` / `false` | Enable or disable the humidity alarm |
| `config alarm-humidity-lo` | `0` to `100` (%) | Low threshold |
| `config alarm-humidity-hi` | `0` to `100` (%) | High threshold |
| `config alarm-humidity-hst` | `0` to `20` (%) | Hysteresis |

#### Pressure Alarm

| Command | Argument | Description |
|---|---|---|
| `config alarm-pressure-enabled` | `true` / `false` | Enable or disable the pressure alarm |
| `config alarm-pressure-lo` | `500` to `1200` (hPa) | Low threshold |
| `config alarm-pressure-hi` | `500` to `1200` (hPa) | High threshold |
| `config alarm-pressure-hst` | `0` to `50` (hPa) | Hysteresis |

#### External Thermometer T1 Alarm

Used with the first external 1-Wire temperature sensor.

| Command | Argument | Description |
|---|---|---|
| `config alarm-t1-temperature-enabled` | `true` / `false` | Enable or disable the T1 alarm |
| `config alarm-t1-temperature-lo` | `-30` to `70` (°C) | T1 low threshold |
| `config alarm-t1-temperature-hi` | `-30` to `70` (°C) | T1 high threshold |
| `config alarm-t1-temperature-hst` | `0` to `5` (°C) | T1 hysteresis |

#### External Thermometer T2 Alarm

Used with the second external 1-Wire temperature sensor.

| Command | Argument | Description |
|---|---|---|
| `config alarm-t2-temperature-enabled` | `true` / `false` | Enable or disable the T2 alarm |
| `config alarm-t2-temperature-lo` | `-30` to `70` (°C) | T2 low threshold |
| `config alarm-t2-temperature-hi` | `-30` to `70` (°C) | T2 high threshold |
| `config alarm-t2-temperature-hst` | `0` to `5` (°C) | T2 hysteresis |

**Example** — enable temperature alarm with range 5–40 °C and 1 °C hysteresis:
```
config alarm-temperature-enabled true
config alarm-temperature-lo 5
config alarm-temperature-hi 40
config alarm-temperature-hst 1
```

---

### Hall Sensor Inputs

The hall effect sensor detects magnetic fields (e.g. magnets on rotating machinery or open/close detection).

#### Hall Left

| Command | Argument | Description |
|---|---|---|
| `config hall-left-counter` | `true` / `false` | Enable pulse counting on the left hall sensor |
| `config hall-left-notify-act` | `true` / `false` | Send uplink on activation (magnet detected) |
| `config hall-left-notify-deact` | `true` / `false` | Send uplink on deactivation (magnet removed) |

#### Hall Right

| Command | Argument | Description |
|---|---|---|
| `config hall-right-counter` | `true` / `false` | Enable pulse counting on the right hall sensor |
| `config hall-right-notify-act` | `true` / `false` | Send uplink on activation |
| `config hall-right-notify-deact` | `true` / `false` | Send uplink on deactivation |

---

### External Inputs (STICKER Input)

These settings apply to **STICKER Input** variant with external digital/analog inputs.

#### Input A

| Command | Argument | Description |
|---|---|---|
| `config input-a-counter` | `true` / `false` | Enable pulse counting on input A |
| `config input-a-notify-act` | `true` / `false` | Send uplink on input A activation |
| `config input-a-notify-deact` | `true` / `false` | Send uplink on input A deactivation |

#### Input B

| Command | Argument | Description |
|---|---|---|
| `config input-b-counter` | `true` / `false` | Enable pulse counting on input B |
| `config input-b-notify-act` | `true` / `false` | Send uplink on input B activation |
| `config input-b-notify-deact` | `true` / `false` | Send uplink on input B deactivation |

For wiring details (DIP switches, 1-Wire, dry contact, analog), see [**STICKER Input Wiring**](https://docs.hardwario.com/sticker/sticker-input-wiring/sticker-input-wiring/).

---

### Temperature Corrections

Apply a fixed offset to compensate for sensor placement or self-heating effects.

| Command | Argument | Description |
|---|---|---|
| `config corr-temperature` | `-5.0` to `+5.0` (°C) | Offset applied to the built-in thermometer reading |
| `config corr-t1-temperature` | `-5.0` to `+5.0` (°C) | Offset applied to external 1-Wire sensor T1 |
| `config corr-t2-temperature` | `-5.0` to `+5.0` (°C) | Offset applied to external 1-Wire sensor T2 |

**Example** — compensate for +1.5 °C self-heating on the built-in sensor:
```
config corr-temperature -1.5
```

---

### Capability Flags

Capability flags tell the firmware which hardware features are present on a given device variant. These are typically set during factory provisioning and should not need to be changed in the field.

| Command | Argument | Description |
|---|---|---|
| `config cap-barometer` | `true` / `false` | Barometric pressure sensor present |
| `config cap-pir-detector` | `true` / `false` | PIR motion detector present |
| `config cap-light-sensor` | `true` / `false` | Ambient light sensor present |
| `config cap-1w-thermometer` | `true` / `false` | 1-Wire thermometer support enabled |
| `config cap-1w-machine-probe` | `true` / `false` | 1-Wire machine probe support enabled |
| `config cap-hall-left` | `true` / `false` | Hall left sensor present |
| `config cap-hall-right` | `true` / `false` | Hall right sensor present |
| `config cap-input-a` | `true` / `false` | External input A present |
| `config cap-input-b` | `true` / `false` | External input B present |

---

### Calibration Mode

| Command | Argument | Description |
|---|---|---|
| `config calibration` | `true` / `false` | Enable or disable calibration mode |

:::caution
Calibration mode is intended for factory use. Do not enable this in normal operation.
:::
