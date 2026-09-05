---
slug: chester-motion
title: CHESTER Motion
---
import Image from '@theme/IdealImage';

# CHESTER Motion

This article describes the core functionality, hardware description, and example **JSON** message of the catalog application **CHESTER Motion**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](../category/platform-connectivity) on how to work with the interactive console.

:::

## Application Overview

**CHESTER Motion** is a directional motion detection device that uses dual PIR sensors to detect and track movement direction (left-to-right and right-to-left). The application counts motion events with direction information, and sends aggregated telemetry data via LTE to the HARDWARIO Cloud.

**CHESTER Motion** is equipped with two PIR sensors to monitor the passage of individuals around the device, making it ideal for tracking foot traffic in factories, train stations, or retail environments. With wireless connectivity and long battery life, the device can be easily installed anywhere, including remote locations for monitoring protected natural areas.

Typical use cases:
- Monitor foot traffic in factory aisles, train stations, or retail spaces
- Track the movement of individuals in protected natural areas
- Enhance security and optimize operations by monitoring human presence in various environments
- Facilitate easy installation in remote or difficult-to-access locations due to its wireless design and battery longevity

## Hardware Description {#chester-motion}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: CHESTER mainboard with C battery holder
* `CHESTER-E23-LP`: Enclosure with two PIR sensor holes, SMA antenna pigtail and light pipe
* `CHESTER-S3`: Extension board with two PIR sensors
* `Battery SAFT LS26500`

See [**Ordering Codes**](../ordering-codes.md) for more details.

### Technical Specification

| Parameter | Value |
| :--- | :--- |
| Enclosure material | ASA |
| Dimensions | 130×175×45 mm |
| Operating temperature | -20 to +60 °C |
| Storage temperature | -30 to +70 °C |
| Enclosure protection | IP67 |
| Nominal battery voltage | 3.6 V |
| Nominal battery capacity | 7700 mAh |
| Idle power consumption | < 180 µA |
| Peak power consumption | < 250 mA |

### PIR Sensor (CHESTER-S3)

| Parameter | Value |
| :--- | :--- |
| Detection range | Up to 3 meters |
| Measurement angle | Max 80° |

## Measurement and Behavior

The application operates in a three-stage pipeline:

1. **Sampling** (controlled by `interval-sample`, default 60 seconds):
   - Reads internal thermometer (temperature)
   - Reads accelerometer (X, Y, Z axes and orientation)
   - Captures accumulated motion counts since the last sample into a motion sample buffer
   - Resets per-cycle motion counters after each sample

2. **Motion detection** (continuous, interrupt-driven):
   - The CHESTER-S3 module has two PIR sensor channels: **left** (L) and **right** (R)
   - When one channel detects motion, a **750 ms window** opens to detect the opposite channel
   - If the opposite channel fires within 750 ms, a directional movement event is recorded:
     - L then R = left-to-right movement (`motion_right`)
     - R then L = right-to-left movement (`motion_left`)
   - If the opposite channel does not fire within 750 ms, only a single-sensor detection is counted (`detect_left` or `detect_right`)

3. **Reporting** (controlled by `interval-report`, default 1800 seconds):
   - Encodes all collected data into CBOR format
   - Sends the report to the HARDWARIO Cloud via LTE
   - Up to **30 motion samples** can be buffered per reporting period
   - Motion sample counters reset after a successful send
   - Totalizers (lifetime counters) persist across reports and are never reset

:::info

A random jitter of 0-20% is added to the report interval to prevent multiple devices from transmitting simultaneously.

:::

- Motion detection sensitivity can be configured using preset modes (**low**, **medium**, **high**) or **individual** custom parameters.

### PIR Sensitivity Modes

The application offers three preset sensitivity modes and one custom mode:

**Low**: Provides highest false alarm resistance with slower detection:
- `motion-sens`: 32, `motion-blind`: 3 s, `motion-pulse`: 3, `motion-window`: 4 s

**Medium** (default): Balanced ratio between detection speed and false alarm resistance:
- `motion-sens`: 64, `motion-blind`: 2 s, `motion-pulse`: 2, `motion-window`: 2 s

**High**: Fastest detection with highest sensitivity. Single pulse triggers detection immediately. Best for security systems or door sensors where immediate response is required:
- `motion-sens`: 128, `motion-blind`: 1 s, `motion-pulse`: 1, `motion-window`: 0 s

**Individual**: Allows manual adjustment of all four parameters for advanced control.

:::tip

The `motion-sens` parameter controls how strongly the sensor reacts to input. Higher values mean higher responsiveness.

:::

### LED Behavior

| LED | Condition | Behavior |
| :--- | :--- | :--- |
| Red | Initialization | On during startup, off when initialization is complete |
| Green | Service mode + LTE mode | Brief flash every 5 seconds |
| Yellow | Service mode + no mode | Brief flash every 5 seconds |
| Green | Service mode + left PIR trigger | 100 ms flash on left sensor detection |
| Red | Service mode + right PIR trigger | 100 ms flash on right sensor detection |
| Yellow | Button press | Pulses N times (N = number of clicks detected) |
| LOAD | 5-click button action | On for 2 minutes |

:::info

Service mode LED indicators are only active when `service-mode-enabled` is set to `true`.

:::

### Button Behavior

The INT button supports multi-click actions:

| Clicks | Action |
| :--- | :--- |
| 1x | Send data to cloud immediately |
| 2x | Sample all sensors immediately |
| 3x | Sample all sensors + send data |
| 4x | Reboot the device |
| 5x | Turn on LOAD LED for 2 minutes (load indication) |

Each button press is acknowledged with yellow LED flashes corresponding to the number of detected clicks.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-sample 60
app config interval-report 1800
app config interval-poll 0
app config sensitivity medium
app config motion-sens 64
app config motion-blind 2
app config motion-pulse 2
app config motion-window 2
app config service-mode-enabled false
app config mode lte
```

## Specific Commands

:::info

You can easily explore the whole command tree structure. Start with the `help` command.

:::

:::caution

To apply a new configuration, you need to call `config save`, which applies the new configuration parameters and reboots the device.

:::

Command to set the **operating mode**:

```
app config mode <none|lte>
```

Command to set **sample interval** in seconds:

```
app config interval-sample <1-86400>
```

Command to set **report interval** in seconds:

```
app config interval-report <30-86400>
```

Command to set **poll interval** in seconds (0 to disable):

```
app config interval-poll <0-86400>
```

Command to set **PIR sensitivity** preset:

```
app config sensitivity <low|medium|high|individual>
```

:::tip

When set to `individual`, you can fine-tune all four motion detection parameters below. In other modes, these parameters are set automatically by the preset.

:::

Command to set **motion sensor sensitivity** (higher value = higher responsiveness):

```
app config motion-sens <1-255>
```

Command to set **motion blind time** in seconds (time after detection during which further detections are ignored):

```
app config motion-blind <0-10>
```

Command to set **motion pulse count** (minimum number of detection pulses needed to trigger a motion event):

```
app config motion-pulse <1-10>
```

Command to set **motion detection window** in seconds (time window during which required pulse count must be recorded):

```
app config motion-window <0-10>
```

Command to enable/disable **service mode** for real-time motion monitoring:

```
app config service-mode-enabled <true|false>
```

### Action Commands

Sample all sensors immediately:

```
sample
```

Send data to cloud immediately:

```
send
```

Monitor motion detection events in real-time (default timeout 60 seconds, max 1800 seconds):

```
motion detection [timeout_s]
```

Display buffered motion samples and totalizers:

```
motion samples
```

## Firmware

The latest firmware is available in the Catalog Applications [Firmware chapter](index.md#application-firmware).

## Example JSON Message

```json
{
  "message": {
    "version": 2,
    "sequence": 42,
    "timestamp": 1736942400
  },
  "system": {
    "uptime": 86400,
    "voltage_load": 3.21,
    "voltage_rest": 3.65,
    "current_load": 38
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -87,
      "rsrq": -6,
      "snr": 12,
      "plmn": 23003,
      "cid": 2851843,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.02,
    "accel_y": -0.01,
    "accel_z": 9.81,
    "orientation": 2
  },
  "motion": {
    "totalizer": {
      "detect_left": 1250,
      "detect_right": 1180,
      "motion_left": 485,
      "motion_right": 520
    },
    "samples": [
      1736942400,
      [0, 3, 2, 1, 2],
      [60, 5, 4, 2, 3],
      [120, 2, 1, 0, 1],
      [180, 4, 3, 1, 2],
      [240, 6, 5, 3, 4]
    ]
  }
}
```

### Message Fields Description

- **message**: Metadata (version, sequence, timestamp).
- **system**: Power status (uptime, voltage, current).
- **network.parameter**: LTE connection details (RSRP, SNR, Cell ID, etc.).
- **thermometer**: Internal temperature in °C.
- **accelerometer**: Acceleration in m/s² and orientation.
- **motion**:
  - **totalizer**: Lifetime event counters (never reset).
  - **samples**: Time-sequence offset encoded array of motion events. The first element is the base timestamp. Each subsequent element is an array: `[offset, detect_left, detect_right, motion_left, motion_right]`.

:::info

Any value may be `null` if the corresponding sensor read failed.

:::

---

## Changelog

### v1.0.0 – 2026-02-11

- **Added**: Initial application release: dual PIR motion detection via CHESTER-S3 module
- **Added**: Directional movement tracking: distinguishes left-to-right (`motion_right`) and right-to-left (`motion_left`) passage
- **Added**: Configurable PIR sensitivity presets: `low`, `medium` (default), `high`, and `individual` for manual parameter tuning
- **Added**: Lifetime motion totalizers that persist across reports and device reboots
- **Added**: Service mode (`service-mode-enabled`) with real-time LED feedback for sensor testing and installation
- **Added**: Multi-click button actions for immediate sampling, sending, and device reboot

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
