---
title: CHESTER Current
description: "Firmware of the CHESTER Current catalog application: how it measures the current channels, every configuration parameter, calibration and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Current

The **CHESTER Current** firmware turns CHESTER into a current meter. It measures up to four analog channels of the **CHESTER-K1** module, aggregates the samples, converts them to calibrated values and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

This page describes the main firmware. The variant built for the CHESTER-Z1 backup module has its own page, which lists only what it changes: [**CHESTER Current Z**](chester-current-z.md).

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware, the current probes and the product variants are on the [**CHESTER Current**](../../catalog-applications/chester-current/index.md) catalog page.

## Supported Hardware

The main firmware works with:

- the **CHESTER-K1** module: four differential inputs and a 5 V boost converter for the current probes (see [**CHESTER-K1**](../../ordering-codes.md#chester-k1))
- **DS18B20** 1-Wire thermometers, up to 10 of them
- Bluetooth sensor tags (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

The main firmware does not support the **CHESTER-Z1** backup module; use the [**CHESTER Current Z**](chester-current-z.md) build with it.

## Measurement and Behavior

### Analog Channels

- Each active channel is **sampled** every `interval-sample` seconds. The firmware switches on the 5 V supply of the channel, waits 100 ms, measures and switches the supply off again.
- Each sample holds two raw values in mV: the **mean** (average) and the **RMS** value of the input.
- The samples are **aggregated** every `interval-aggreg` seconds. The minimum, maximum, average and median of both raw values are computed from the buffered samples, together with the **calibrated** values (see [**Channel Calibration**](#channel-calibration)). These aggregated results are referred to as **measurements**.
- Each measurement has its timestamp. The measurements are sent as time series every `interval-report` seconds.

A channel measures either in the single-ended or in the differential mode (parameter `channel-differential-<n>`).

### 1-Wire Thermometers

DS18B20 thermometers are sampled every `w1-therm-interval-sample` seconds and aggregated every `w1-therm-interval-aggreg` seconds, independently of the analog channels. Each report carries the minimum, maximum, average and median temperature of every thermometer.

### Other Sensors

The internal thermometer and the accelerometer are read every 60 seconds, and the report carries their last values. Bluetooth tags are sampled every `interval-sample` seconds and aggregated every `interval-aggreg` seconds.

The report is sent every `interval-report` seconds. Firmware v4.0.1 of CHESTER Current does not enable the random [**report interval jitter**](../../catalog-applications/common-functionality.md#report-interval-jitter), so the reports keep a fixed period.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval of the analog channels and BLE tags in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the analog channels and BLE tags in seconds |
| `interval-report` | Report interval | `<30-86400>` | `900` | Report interval in seconds |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `channel-active-1` to `channel-active-4` | Channel active 1 to Channel active 4 | `true`, `false` | `false` | Measure and report the channel |
| `channel-differential-1` to `channel-differential-4` | Channel differential 1 to Channel differential 4 | `true`, `false` | `false` | Measure the channel in the differential mode instead of the single-ended mode |
| `channel-calib-x0-1` to `channel-calib-x0-4` | Channel calib x0 1 to Channel calib x0 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 0: raw value in mV |
| `channel-calib-x1-1` to `channel-calib-x1-4` | Channel calib x1 1 to Channel calib x1 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 1: raw value in mV |
| `channel-calib-y0-1` to `channel-calib-y0-4` | Channel calib y0 1 to Channel calib y0 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 0: real value (for example in A) |
| `channel-calib-y1-1` to `channel-calib-y1-4` | Channel calib y1 1 to Channel calib y1 4 | `<-1000000.0..1000000.0>` | `0.0` | Calibration point 1: real value |
| `channel-calib-mode-1` to `channel-calib-mode-4` | Channel calib mode 1 to Channel calib mode 4 | `mean`, `rms` | `rms` | Raw value the calibration converts (see the table below) |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Sampling interval of the DS18B20 thermometers in seconds |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Aggregation interval of the DS18B20 thermometers in seconds |

The calibration mode selects the raw value that the calibration converts:

| Mode | Description | Use Case |
| :--- | :--- | :--- |
| `mean` | Mean (average) value; the `current` commands call this mode `avg` | DC signals, slow-changing values |
| `rms` | Root Mean Square | AC signals, current transformers |

The `channel-*` parameters belong to the four inputs of CHESTER-K1 and the `w1-therm-*` parameters to DS18B20 thermometers. The backup module parameters are added by the [**CHESTER Current Z**](chester-current-z.md) build.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Commands

| Command | Action |
| :--- | :--- |
| `sample` | Sample the sensors now; the samples are stored in the sample buffer |
| `aggreg` | Aggregate the samples now |
| `send` | Send the data now and clear the sent measurements |
| `current channel-<n> read` | Read the raw and calibrated values of channel `<n>` (1–4) |
| `current channel-<n> calib set-0 <value>` | Capture the current raw reading as X0 and set Y0 to `<value>` |
| `current channel-<n> calib set-1 <value>` | Capture the current raw reading as X1 and set Y1 to `<value>` |
| `current channel-<n> calib show` | Show the calibration parameters |
| `current channel-<n> calib reset` | Reset the calibration points to their default `0` |
| `current channel-<n> calib mode [avg\|rms]` | Show or set the calibration mode |

The `current` commands store the calibration immediately; they need no `config save` and no restart.

## Channel Calibration

:::danger

When upgrading firmware from **v1.x.x** to version **v2.0.0 and newer**, it is necessary to [**back up the configuration**](../../catalog-applications/common-functionality.md#configuration-backup), including the calibration data of **CHESTER Current**.

:::

:::caution

The following section is provided only for reference. Usually, the **CHESTER Current** devices are ordered together with the current probes, and **HARDWARIO** does the channel calibration for their customers in such a case.

:::

### Calibration System Overview

The calibration system uses **two-point linear interpolation** to convert raw mV readings to calibrated values (e.g., Amps, Watts, or any physical unit).

:::tip

Linear interpolation is defined by this formula for output calculation:

`calibrated = (y0 × (x1 - raw) + y1 × (raw - x0)) / (x1 - x0)`

Where:
- `x0`, `x1` = Raw mV values at calibration points
- `y0`, `y1` = Real physical values at calibration points
- `raw` = Current raw mV reading

:::

The calibration points are the `channel-calib-*` parameters in [**Configuration Parameters**](#configuration-parameters). While `x0` equals `x1` (the default), the channel has no calibrated value.

### Calibration Procedure

#### Prerequisites

1. Connect the current sensor (e.g., CT clamp) to the CHESTER-K1 channel
2. Connect to the CHESTER shell over J-Link RTT or Bluetooth
3. Have a reference measurement device ready (multimeter, clamp meter)

#### Step-by-Step Calibration

##### 1. Enable the Channel

```
app config channel-active-1 true
```

Apply the change with `config save`, which restarts the device.

##### 2. Set Calibration Mode

Choose `rms` for AC current transformers or `avg` for DC sensors:

```
current channel-1 calib mode rms
```

##### 3. Verify Raw Reading

Read the current raw mV value:

```
current channel-1 read
```

Output example:

```
Channel 1: avg=0.5 rms=1.2 mV (mode=rms, no calibration)
```

##### 4. Calibration Point 0 (Zero/Low Point)

Apply a known **low** current (e.g., 0 A) and set the calibration:

```
current channel-1 calib set-0 0
```

This captures the current raw mV reading as `x0` and sets `y0 = 0`.

Output:

```
Channel 1: avg=0.5 rms=1.2 (using rms), point 0 set (x0=1.20, y0=0.00)
```

##### 5. Calibration Point 1 (High Point)

Apply a known **high** current (e.g., 10 A) and set the calibration:

```
current channel-1 calib set-1 10
```

This captures the current raw mV reading as `x1` and sets `y1 = 10`.

Output:

```
Channel 1: avg=50.3 rms=71.5 (using rms), point 1 set (x1=71.50, y1=10.00)
```

##### 6. Verify Calibration

Read the channel to see calibrated output:

```
current channel-1 read
```

Output:

```
Channel 1: avg=50.3 rms=71.5 mV (mode=rms, calibrated: 10.00)
```

##### 7. Show Calibration Parameters

```
current channel-1 calib show
```

Output:

```
Channel 1 calibration: x0=1.20 y0=0.00, x1=71.50 y1=10.00, mode=rms
```

#### Reset Calibration

The following command sets all four calibration points to `0`. The channel then has no calibrated value (`null` in the report); its raw values are still sent:

```
current channel-1 calib reset
```

### Hall Effect Sensor Calibration

This section describes how to configure the current measurement firmware for Hall effect sensors (e.g., **YHDC HSTS30**). To ensure accurate readings, the system must be configured for linear approximation and differential input mode.

#### Calibration Logic

A standard sensor (300 A / 2.5 V ± 0.625 V) uses a 2.5 V reference center. At a nominal current of 300 A, the output voltage swings by 625 mV from that center.

By enabling **Differential Mode** (measuring INP against INM, where INM is the sensor's 2.5 V reference), we isolate the relevant signal and remove the DC bias.

**Sensitivity Calculation:**

```
Sensitivity = 625 mV / 300 A = 2.0833 mV/A
```

#### Theoretical Parameters

The CHESTER firmware uses two points [x, y] to define the linear scaling, where **x** is voltage (mV) and **y** is the physical value (A).

| Parameter | Value | Description |
| :--- | :--- | :--- |
| **x0** | 0 | 0 mV input (zero offset) |
| **y0** | 0 | 0 A measured |
| **x1** | 625 | 625 mV input (full swing) |
| **y1** | 300 | 300 A measured |

:::info

Ensure the physical values on the sensor label match the theoretical values above before applying this configuration.

:::

#### CLI Configuration Commands

Replace `<n>` with the target channel number (1–4):

```shell
# Define linear approximation points
app config channel-calib-x0-<n> 0
app config channel-calib-y0-<n> 0
app config channel-calib-x1-<n> 625
app config channel-calib-y1-<n> 300

# Set measurement mode to RMS (Root Mean Square)
app config channel-calib-mode-<n> rms

# Enable differential input mode
app config channel-differential-<n> true
```

Apply the configuration with `config save`.

:::caution

If your sensor has a different rating (e.g., 100 A / 1 V), you must update `x1` to `1000` and `y1` to `100` to maintain accuracy.

:::

### Legacy Calibration Method

In **HARDWARIO**, we have a calibration kit for **CHESTER Current** made of several air-core coils with 10/50/100 turns.

#### Example Current Calibration (Legacy)

1. Measure the **zero-current offsets** and write them for each channel as the `x0` parameter. Use the `sample` command to trigger the measurement.
2. Let's assume calibration of **100 A** current probe and pick the **100-turn coil**.
3. Set the laboratory power supply's current limit to **900 mA**, and connect the power supply to the coil.
4. **Clip the current probe** around the calibration coil.
5. Verify the current flowing to the coil using a **multimeter** connected in series.
6. Measure the channel, and write the reading as the `x1` value.
7. Set the `y1` parameter to the value `90000`. The value represents the multiplication of the number of turns on the coil and the power supply's current limit, in this example `90000`.
8. Point 0 is the zero-current point, so keep the `y0` parameter at `0`.
9. Save the configuration data (using the `config save` command) and verify the applied calibrated values.

## Firmware Build

- **Firmware:** [hio-chester-current:v4.0.1](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `98f42b431dfb4ba681abfea1958f0ef9`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9/hex), SHA256 `d5e679a4118aac2a013663b11e300dc2afbf395bc8d13ba9e3949878d96ab0c4`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9/bin), SHA256 `8223cf0a4fbfc0bc8890f914e40c4cd9632446475c6b9475f4a0ce8ef97c1c54`
- **Build from the SDK:** `west chester-update current --variant "CHESTER Current"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-current/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

The example shows a report of the main firmware with the default intervals: channel 1 is active and calibrated for a current probe (`x0` = 1.20 mV for 0 A, `x1` = 71.50 mV for 10 A, mode `rms`), and one DS18B20 thermometer and one Bluetooth tag are connected. The `analog_channels` list has one entry for each active channel, and each `measurements` list has one entry for each aggregation interval since the previous report.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 96,
    "timestamp": 1793961010
  },
  "system": {
    "uptime": 86410,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 34
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -10,
      "snr": 12,
      "plmn": 23003,
      "cid": 26853412,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.12,
    "accel_y": -0.08,
    "accel_z": 9.83,
    "orientation": 2
  },
  "analog_channels": [
    {
      "channel": 1,
      "raw_rms": {
        "measurements": [
          { "timestamp": 1793960400, "min": 70.12, "max": 72.45, "avg": 71.28, "mdn": 71.3 },
          { "timestamp": 1793960700, "min": 69.88, "max": 73.01, "avg": 71.45, "mdn": 71.42 },
          { "timestamp": 1793961000, "min": 70.4, "max": 72.1, "avg": 71.12, "mdn": 71.09 }
        ]
      },
      "raw_mean": {
        "measurements": [
          { "timestamp": 1793960400, "min": -0.42, "max": 0.61, "avg": 0.08, "mdn": 0.07 },
          { "timestamp": 1793960700, "min": -0.55, "max": 0.48, "avg": -0.03, "mdn": -0.02 },
          { "timestamp": 1793961000, "min": -0.37, "max": 0.52, "avg": 0.05, "mdn": 0.06 }
        ]
      },
      "calibration": {
        "mode": "rms",
        "measurements": [
          { "timestamp": 1793960400, "min": 9.8, "max": 10.13, "avg": 9.96, "mdn": 9.97 },
          { "timestamp": 1793960700, "min": 9.76, "max": 10.21, "avg": 9.99, "mdn": 9.98 },
          { "timestamp": 1793961000, "min": 9.84, "max": 10.08, "avg": 9.94, "mdn": 9.94 }
        ]
      }
    }
  ],
  "w1_thermometers": [
    {
      "serial_number": 1207863897645,
      "measurements": [
        { "timestamp": 1793960400, "min": 21.06, "max": 21.12, "avg": 21.1, "mdn": 21.12 },
        { "timestamp": 1793960700, "min": 21.12, "max": 21.18, "avg": 21.15, "mdn": 21.12 },
        { "timestamp": 1793961000, "min": 21.18, "max": 21.25, "avg": 21.22, "mdn": 21.25 }
      ]
    }
  ],
  "ble_tags": [
    {
      "addr": "7cd9f413e360",
      "rssi": -77,
      "voltage": 3.03,
      "temperature": {
        "measurements": [
          { "timestamp": 1793960400, "min": 22.31, "max": 22.38, "avg": 22.34, "mdn": 22.35 },
          { "timestamp": 1793960700, "min": 22.36, "max": 22.44, "avg": 22.4, "mdn": 22.41 },
          { "timestamp": 1793961000, "min": 22.4, "max": 22.47, "avg": 22.44, "mdn": 22.45 }
        ]
      },
      "humidity": {
        "measurements": [
          { "timestamp": 1793960400, "min": 45, "max": 46, "avg": 45.6, "mdn": 46 },
          { "timestamp": 1793960700, "min": 46, "max": 47, "avg": 46.4, "mdn": 46 },
          { "timestamp": 1793961000, "min": 46, "max": 47, "avg": 46.8, "mdn": 47 }
        ]
      }
    }
  ]
}
```

</details>

:::info

The payload structure for analog channels has changed in **v3.5.1**:
- `raw_rms`: Contains RMS measurements in mV
- `raw_mean`: Contains mean (average) measurements in mV
- `calibration`: Contains calibrated values based on the selected mode (`mode` is `avg` or `rms`)

:::

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

**CHESTER Current** supports binary LoRaWAN payload encoding. Example of a firmware v4.0.1 uplink from the same device, with channel 1 active and one DS18B20 thermometer. An uplink carries the last sample of each value, not the aggregated measurements.

**Header:** `0x2F 0x00` (bits: BATT=1, ACCEL=1, THERM=1, W1=1, BACKUP=0, CH1=1)

**Raw bytes (hex):**

```
2F 00 45 0E 5A 0D 22 02 29 09 01 4D 08 71 54 00 30 F8 48
```

**Decoded:**

| Offset | Bytes | Field | Value |
| :--- | :--- | :--- | :--- |
| 0–1 | `2F 00` | Header | 0x002F (BATT + ACCEL + THERM + W1 + CH1) |
| 2–3 | `45 0E` | `voltage_rest` | 3653 mV |
| 4–5 | `5A 0D` | `voltage_load` | 3418 mV |
| 6 | `22` | `current_load` | 34 mA |
| 7 | `02` | `orientation` | 2 |
| 8–9 | `29 09` | `therm_temperature` | 23.45 °C (2345 / 100) |
| 10 | `01` | Number of DS18B20 thermometers | 1 |
| 11–12 | `4D 08` | `w1_thermometers` | 21.25 °C (2125 / 100) |
| 13–14 | `71 54` | `raw_rms` of channel 1 | 71.0625 mV (float16) |
| 15–16 | `00 30` | `raw_mean` of channel 1 | 0.125 mV (float16) |
| 17–18 | `F8 48` | `calibrated` of channel 1 | 9.9375 A (float16) |

**Total:** 19 bytes

The ChirpStack/TTN decoder (`codec/cs-decoder.js` of the application in the CHESTER SDK) returns:

```json
{
  "voltage_rest": 3.653,
  "voltage_load": 3.418,
  "current_load": 34,
  "orientation": 2,
  "therm_temperature": 23.45,
  "w1_thermometers": [21.25],
  "analog_channels": [
    {
      "channel": 1,
      "raw_rms": 71.0625,
      "raw_mean": 0.125,
      "calibrated": 9.9375
    }
  ]
}
```

Firmware v4.0.1 always sets the BATT, ACCEL, THERM and W1 flags. Each DS18B20 thermometer adds two bytes (temperature × 100) after the count byte, and each further active channel adds six bytes. An uplink holds at most 51 bytes; a report that does not fit is not sent.

  </TabItem>
</Tabs>

## Changelog

### v3.5.1 – 2025-12-08

- **Added**: Shell commands for real-time per-channel calibration: set zero and span points interactively
- **Added**: Downlink watchdog: detects loss of cloud communication
- **Improved**: LoRaWAN reliability and encoding
- **Fixed**: Calibration range validation

### v3.5.0 – 2025-12-03

- **Added**: New variants: **CHESTER Current Z** (with CHESTER-Z1 backup module) and **CHESTER Current 1W** (with external DS18B20 1-Wire temperature sensors)
- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); previous Cloud Legacy firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
