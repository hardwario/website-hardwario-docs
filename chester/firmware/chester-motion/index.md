---
title: CHESTER Motion
description: "Firmware of the CHESTER Motion catalog application: how it counts passages with two PIR sensors, the sensitivity settings, commands and the data format."
---

# CHESTER Motion

The **CHESTER Motion** firmware turns CHESTER into a directional motion detector. It watches two PIR sensors, counts the detections on each side and the passages in each direction (left to right and right to left), and sends the counts to HARDWARIO Cloud over NB-IoT/LTE.

The firmware has a single build for the whole application. The network mode, the button and the configuration commands that the catalog applications share are described in [**Common Functionality**](../common-functionality.md). The hardware and its technical specification are on the [**CHESTER Motion**](../../catalog-applications/chester-motion/index.md) catalog page.

## Supported Hardware

The firmware works with:

- the **CHESTER-S3** extension board with two PIR sensors, left (L) and right (R)
- the thermometer and the accelerometer on the CHESTER mainboard

It communicates over NB-IoT/LTE only.

## Measurement and Behavior

The application operates in a three-stage pipeline:

1. **Sampling** (controlled by `interval-sample`, default 60 seconds, the first sample right after start):
   - Reads internal thermometer (temperature)
   - Reads accelerometer (X, Y, Z axes and orientation)
   - Stores the motion counts since the last sample, with a timestamp, in the motion sample buffer
   - Resets the motion counters for the next sample

2. **Motion detection** (continuous, interrupt-driven):
   - The CHESTER-S3 module has two PIR sensor channels: **left** (L) and **right** (R)
   - Every activation of a channel counts as a detection on its side (`detect_left` or `detect_right`)
   - When one channel detects motion, a **750 ms window** opens to detect the opposite channel
   - If the opposite channel fires within 750 ms, the pair also counts as a directional movement:
     - L then R = left-to-right movement (`motion_right`)
     - R then L = right-to-left movement (`motion_left`)
   - Another activation of the first channel within the window is not counted

3. **Reporting** (controlled by `interval-report`, default 1800 seconds, the first report 10 seconds after start):
   - Encodes all collected data into CBOR format
   - Sends the report to HARDWARIO Cloud via LTE
   - Up to **30 motion samples** can be buffered per reporting period; further samples are dropped until the next successful report, but their counts still go to the totals
   - Motion samples are cleared after a successful send
   - The totals (`totalizer`) count from the start of the device: reports do not reset them, a restart does

:::info

The report interval has a random jitter of up to ±20 % (see [**Report Interval Jitter**](../common-functionality.md#report-interval-jitter)), so that multiple devices do not transmit simultaneously.

:::

- Motion detection sensitivity can be configured using preset modes (**low**, **medium**, **high**) or **individual** custom parameters.

### PIR Sensitivity Modes

The application offers three preset sensitivity modes and one custom mode. Both PIR sensors always use the same settings:

**Low**: Provides highest false alarm resistance with slower detection:
- `motion-sens`: 32, `motion-blind`: 3 s, `motion-pulse`: 3, `motion-window`: 4 s

**Medium** (default): Balanced ratio between detection speed and false alarm resistance:
- `motion-sens`: 64, `motion-blind`: 2 s, `motion-pulse`: 2, `motion-window`: 2 s

**High**: Fastest detection with highest sensitivity. Single pulse triggers detection immediately. Best for security systems or door sensors where immediate response is required:
- `motion-sens`: 32, `motion-blind`: 1 s, `motion-pulse`: 1, `motion-window`: 0 s

**Individual**: Allows manual adjustment of all four parameters for advanced control.

:::tip

The `motion-sens` parameter is the detection threshold of the PIR sensors. A lower value makes them react to a weaker signal, so they are more sensitive.

:::

:::caution

The CHESTER-S3 driver passes only the two lowest bits of `motion-pulse` and `motion-window` to the sensors, so values from 4 up wrap around (4 acts as 0, 5 as 1). This applies to the `low` preset too: its window of 4 reaches the sensors as 0.

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

Service mode LED indicators are only active when `service-mode-enabled` is set to `true`. Without service mode, the LED does not flash every 5 seconds, which saves the battery.

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

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-report` | `<30-86400>` | `1800` | Report interval in seconds |
| `interval-poll` | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `sensitivity` | `low`, `medium`, `high`, `individual` | `medium` | PIR sensitivity preset (see [PIR Sensitivity Modes](#pir-sensitivity-modes)) |
| `motion-sens` | `<1-255>` | `64` | Detection threshold of the PIR sensors; a lower value is more sensitive |
| `motion-blind` | `<0-10>` | `2` | Blind time in seconds after a detection, during which further detections are ignored |
| `motion-pulse` | `<1-10>` | `2` | Minimum number of detection pulses needed to trigger a motion event |
| `motion-window` | `<0-10>` | `2` | Time window in seconds during which the required pulse count must be recorded |
| `service-mode-enabled` | `true`, `false` | `false` | Service mode: LED indication of every detection and of the network mode, for installation and testing |

The four `motion-*` parameters take effect only with `sensitivity` set to `individual`; in the other modes the preset sets them, and `app config show` does not list them.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration). CHESTER Motion offers only the modes `none` and `lte` and starts in `lte`.

## Commands

You can easily explore the whole command tree structure. Start with the `help` command.

| Command | Action |
| :--- | :--- |
| `sample` | Sample all sensors now and print the new motion sample |
| `send` | Send the data now |
| `motion detection [timeout_s]` | Print every detected movement with its direction and the counters as it happens, for `timeout_s` seconds (default 60, at most 1800) |
| `motion samples` | Print the buffered motion samples and the totals |

## Firmware Build

- **Firmware:** [hio-chester-motion:v4.0.1](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `56cbeef2fcae46bcb69e76025800a33b`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b/hex), SHA256 `cdb3d71768b8ab93a73f1265c7c863917088065e7f791b4a9e27c229d79c4d15`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b/bin), SHA256 `65c2304a07f759c5f1de436323712b2d6f0dbd5b6d45c63f2a995fe8e1a4a82b`
- **Build from the SDK:** `west chester-update motion --variant "CHESTER Motion"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

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
  - **totalizer**: Event counters since the device started (reports do not reset them).
  - **samples**: Time-sequence offset encoded array of motion events. The first element is the base timestamp. Each subsequent element is an array: `[offset, detect_left, detect_right, motion_left, motion_right]`, where `offset` is in seconds from the base timestamp.

:::info

Any value may be `null` if the corresponding sensor read failed.

:::

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
