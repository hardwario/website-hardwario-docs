---
title: CHESTER Motion
description: "CHESTER Motion counts people passing by and their direction with two PIR sensors: its hardware, settings and the exact data it sends."
---

# CHESTER Motion

![CHESTER Motion seen from the right, with the two PIR sensor windows on the lid](/img/chester/catalog-applications/chester-motion.webp)

**CHESTER Motion** is a directional motion detection device that uses dual PIR sensors to detect and track movement direction (left-to-right and right-to-left). The application counts motion events with direction information and sends them via LTE to HARDWARIO Cloud.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Motion firmware](../../firmware/chester-motion/index.md)** page.

:::

## What It Can Do

- Detects motion with two PIR sensors and tells left-to-right from right-to-left passage.
- Counts the detections on each side and the passages in each direction, per sampling interval and in total.
- Lets you choose the detection sensitivity from three presets or set it parameter by parameter.
- In service mode, flashes the LED on every detection, which helps with installation and testing.

## Technical Specification

| Parameter | Value |
| :--- | :--- |
| Enclosure material | ASA |
| Dimensions | 130×175×45 mm |
| Operating temperature | -30 to +70 °C |
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

## Typical Use Cases

**CHESTER Motion** is equipped with two PIR sensors to monitor the passage of individuals around the device, making it ideal for tracking foot traffic in factories, train stations, or retail environments. With wireless connectivity and long battery life, the device can be easily installed anywhere, including remote locations for monitoring protected natural areas.

- Monitor foot traffic in factory aisles, train stations, or retail spaces
- Track the movement of individuals in protected natural areas
- Enhance security and optimize operations by monitoring human presence in various environments
- Facilitate easy installation in remote or difficult-to-access locations due to its wireless design and battery longevity

## CHESTER Motion {#model-chester-motion}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: CHESTER mainboard with C battery holder
* `CHESTER-E23-LP`: Enclosure with two PIR sensor holes, SMA antenna pigtail and light pipe
* `CHESTER-S3`: Extension board with two PIR sensors
* `Battery SAFT LS26500`

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Motion. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. Every parameter is on the firmware page under [**Configuration Parameters**](../../firmware/chester-motion/index.md#configuration-parameters).

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Length of one motion sample in seconds; each entry in `motion.samples` counts the detections and passages of one interval |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `sensitivity` | Sensitivity | `low`, `medium`, `high`, `individual` | `medium` | PIR sensitivity preset; `individual` uses the four `motion-*` parameters below (see [PIR Sensitivity Modes](../../firmware/chester-motion/index.md#pir-sensitivity-modes)) |
| `motion-sens` | Motion sens | `<1-255>` | `64` | Detection threshold of the PIR sensors; a lower value is more sensitive |
| `motion-blind` | Motion blind | `<0-10>` | `2` | Blind time after a detection, during which further detections are ignored: 0.5 s + 0.5 s × value (default 1.5 s) |
| `motion-pulse` | Motion pulse | `<1-10>` | `2` | Pulses within the window that trigger a detection: 1 + value (default 3) |
| `motion-window` | Motion window | `<0-10>` | `2` | Time window in which the pulses must come: 2 s + 2 s × value (default 6 s) |
| `service-mode-enabled` | Service mode enabled | `true`, `false` | `false` | Service mode for installation and testing: the LED flashes on every detection (green for the left sensor, red for the right one) and every 5 s |

The four `motion-*` parameters take effect only with `sensitivity` set to `individual`. The CHESTER-S3 driver passes only the two lowest bits of `motion-pulse` and `motion-window` to the sensors, so values from 4 up wrap around (4 acts as 0, 5 as 1). The formulas come from the Excelitas PYQ 1648 datasheet.

### Data over LTE {#data-over-lte}

The device sends a report over NB-IoT/LTE every `interval-report` seconds, with a random deviation of up to ±20 % (see [Report Interval Jitter](../common-functionality.md#report-interval-jitter)); the first report goes out 10 s after start. Detections are counted and go out with the next periodic report. Every `interval-sample` seconds the device closes one motion sample with the detections and passages counted since the previous sample. A report carries the samples taken since the last successful report, up to the first 30; the totals count every detection and passage. With the default settings a report interval stretched by the deviation spans up to 36 samples, of which `samples` carries the first 30. When a reading fails, the value is `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Motion sends `message.version` `2`.

In addition to the common data, CHESTER Motion sends:

- [`motion`](#motion): the detections of both PIR sensors and the passages in each direction, as totals and per sample interval

#### Motion {#motion}

Sent in every report. When one PIR sensor detects motion, a 750 ms window opens; a detection by the other sensor within the window also counts as a passage: left then right is `motion_right`, right then left is `motion_left`. Within the window, each sensor counts at most once.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `motion.totalizer.detect_left` | Detections by the left PIR sensor since the device started | | 0–2147483647 | 1 |
| `motion.totalizer.detect_right` | Detections by the right PIR sensor since the device started | | 0–2147483647 | 1 |
| `motion.totalizer.motion_left` | Passages from right to left since the device started | | 0–2147483647 | 1 |
| `motion.totalizer.motion_right` | Passages from left to right since the device started | | 0–2147483647 | 1 |
| `motion.samples[].timestamp` | End of the sample interval (Unix time) | s | | 1 s |
| `motion.samples[].detect_left` | Detections by the left PIR sensor in the sample interval | | 0–2147483647 | 1 |
| `motion.samples[].detect_right` | Detections by the right PIR sensor in the sample interval | | 0–2147483647 | 1 |
| `motion.samples[].motion_left` | Passages from right to left in the sample interval | | 0–2147483647 | 1 |
| `motion.samples[].motion_right` | Passages from left to right in the sample interval | | 0–2147483647 | 1 |

The totals count from the start of the device and accumulate across reports; a restart sets them to zero.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
