# CHESTER Current

This article describes the core functionality, hardware description, default configuration, example JSON message, and channel calibration of the catalog application **CHESTER Current**.

> **Caution:** Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:
> - [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
> - [**Common functionality**](https://docs.hardwario.com/chester/catalog-applications/common-functionality) to know how LED, button and network configuration works.
> - [**Platform Management**](https://docs.hardwario.com/chester/category/platform-connectivity) on how to work with the interactive console.

## Application Overview

The application primarily targets non-invasive current measuring using the so-called **DC Current "Transformer"** (DCCT). It can measure up to 4 channels of both AC and DC currents. The current probes are clips around the measured line, which convert the magnetic flux (proportional to the electrical current) to a differential output voltage.

> **Tip:** The current probes require a 5 V power supply (generated using the boost converter on **CHESTER-K1**) during the measurement cycle. The boost converter and the power rails to each channel are software-controlled, so **CHESTER Current** can operate as a low-power device powered by the battery. Of course, the measurement interval plays a key role in the battery lifespan.

Apart from the current measurements, the device can be configured (on demand) to measure up to 4 voltage channels (in single-ended mode). It can combine both current and voltage measurements (the total number of channels never exceeds number 4).

## Application Variants

**CHESTER Current** can be ordered in one of these variants:

### CHESTER Current

The catalog **CHESTER Current** hardware consists of the following ordering codes:

- `CHESTER-M-CGLS`: Standard mainboard
- `CHESTER-K1-C1-C2-C3-C4`: 4x Diff. Input + 5 V Boost
- `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build variant: `west chester-update current --variant "CHESTER Current"`

### CHESTER Current Z

The catalog **CHESTER Current Z** hardware consists of the following ordering codes:

- `CHESTER-M-CGLS`: Standard mainboard
- `CHESTER-K1-C1-C2-C3-C4`: 4x Diff. Input + 5 V Boost
- `CHESTER-Z1`: Backup module
- `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build variant: `west chester-update current --variant "CHESTER Current Z"`

### CHESTER Current 1W

The catalog application **CHESTER Current 1W** supports multiple external DS18B20 1-Wire temperature sensors.

The hardware of this application consists of the following ordering codes:

- `CHESTER-M-CGLS`: Standard mainboard
- `CHESTER-K1-C1-C2-C3-C4`: 4x Diff. Input + 5 V Boost
- `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](https://docs.hardwario.com/chester/ordering-codes) for more details.

Firmware build variant: `west chester-update current --variant "CHESTER Current"` (DS18B20 1-Wire support is built into the base **CHESTER Current** firmware)

### Probes

You can choose up to 4 current probes with the following current ranges:

- Maximum current **10 A**
- Maximum current **100 A**
- Maximum current **300 A**
- Maximum current **1,000 A**
- Maximum current **1,500 A**

> **Caution:** The current range is specified for the DC. If you design your system for the AC, you have to multiply the maximum expected AC by the coefficient of `1.42` (square root of two) to see if the current probe fits within the limit.

## Application Behavior

For the wiring diagram to **CHESTER Current**, please follow the [**terminal block description**](https://docs.hardwario.com/chester/extension-modules/chester-k1) of the **CHESTER-K1** extension module. The extension module **CHESTER-K1** uses both slots **A** and **B**. So you use the corresponding terminals **A1** to **A8** and **B1** to **B8**.

### Analog

- The analog readings are sampled periodically (parameter `interval-sample`). These readings are stored as a **buffer of samples**.
- The collected samples are **aggregated** periodically (parameter `interval-aggreg`). The minimum, maximum, average, and median aggregates are computed from the buffered samples. These aggregated results are referred to as **measurements**.
- Each **measurement** has an associated timestamp. The buffer **measurements** are transferred as time-series data regularly (parameter `interval-report`).

### Backup

**CHESTER Current Z** (equipped with **CHESTER-Z1**) can also report information on the backup battery and external DC power state.

- The current **battery voltage** and **external DC voltage** are sent in every report.
- When the DC power input changes, the timestamp of the change event is stored altogether with the **connected**/**disconnected** state, this information is buffered, and the buffer of the events is sent (at the latest) with the regular report (parameter `interval-report`).
- Optionally, DC power input changes to the **connected** (parameter `backup-report-connected`) or **disconnected** (parameter `backup-report-disconnected`) states can be reported **immediately** or with a configurable **delay** (parameter `event-report-delay`) to allow capturing multiple consequent input changes.
- The maximum number of reports per hour is configurable (parameter `event-report-rate`). The event throttling limits communication bandwidth and preserves the battery lifespan.

> **Caution:** The next report interval is calculated at the beginning of the transmission cycle as the `interval-report` parameter (specified in seconds) ±20 % spread. This spread is intentionally random to avoid transmission aliasing for multiple devices operating in the same place (e.g., powered from a local DC line). If such a spread was not implemented, the device transmission could synchronously overlap.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 900
app config interval-poll 0
app config downlink-wdg-interval 129600
app config event-report-delay 1
app config event-report-rate 30
app config backup-report-connected true
app config backup-report-disconnected true
app config channel-active-1 false
app config channel-active-2 false
app config channel-active-3 false
app config channel-active-4 false
app config channel-differential-1 false
app config channel-differential-2 false
app config channel-differential-3 false
app config channel-differential-4 false
app config channel-calib-x0-1 0.00
app config channel-calib-x0-2 0.00
app config channel-calib-x0-3 0.00
app config channel-calib-x0-4 0.00
app config channel-calib-x1-1 0.00
app config channel-calib-x1-2 0.00
app config channel-calib-x1-3 0.00
app config channel-calib-x1-4 0.00
app config channel-calib-y0-1 0.00
app config channel-calib-y0-2 0.00
app config channel-calib-y0-3 0.00
app config channel-calib-y0-4 0.00
app config channel-calib-y1-1 0.00
app config channel-calib-y1-2 0.00
app config channel-calib-y1-3 0.00
app config channel-calib-y1-4 0.00
app config channel-calib-mode-1 "rms"
app config channel-calib-mode-2 "rms"
app config channel-calib-mode-3 "rms"
app config channel-calib-mode-4 "rms"
app config w1-therm-interval-sample 60
app config w1-therm-interval-aggreg 300
app config mode "lte"
```

## Specific Commands

> **Info:** You can easily explore the whole command tree structure. Start with the `help` command.

### Commands

Command to **trigger sample** immediately (and store the result in the sample buffer):

```
sample
```

Command to **send data** immediately (and flush the aggregated measurements):

```
send
```

### Reporting

Use this command to set **report interval** (in seconds):

```
app config interval-report <value>
```

### Backup

Use this command to configure a short delay (in seconds) between the **backup** event and its reporting:

```
app config event-report-delay <value>
```

> **Tip:** This feature is useful in systems where another change may arrive shortly after the first one.

Use this command to limit the number of asynchronous **backup** event reports in a one-hour window:

```
app config event-report-rate <value>
```

> **Tip:** This feature helps to conserve power in the battery-operated device and optimizes the amount of transferred data. The regular (periodic) reports set by the parameter `interval-report` are not counted to this limit.

Use these commands to enable/disable reporting of the backup module power input connect/disconnect events:

```
app config backup-report-connected <true/false>
app config backup-report-disconnected <true/false>
```

### Analog Channels

Command to **enable/disable** channel `n` (index 1-4):

```
app config channel-active-<n> <true/false>
```

Command to switch between **single-ended/differential** modes on the channel `n` (index 1-4):

```
app config channel-differential-<n> <true/false>
```

Command to set **calibration point X0** (input) on the channel `n` (index 1-4):

```
app config channel-calib-x0-<n> <value>
```

Command to set **calibration point Y0** (output) on the channel `n` (index 1-4):

```
app config channel-calib-y0-<n> <value>
```

Command to set **calibration point X1** (input) on the channel `n` (index 1-4):

```
app config channel-calib-x1-<n> <value>
```

Command to set **calibration point Y1** (output) on the channel `n` (index 1-4):

```
app config channel-calib-y1-<n> <value>
```

Command to set **calibration mode** on the channel `n` (index 1-4):

```
app config channel-calib-mode-<n> <avg/rms>
```

| Mode | Description | Use Case |
|------|-------------|----------|
| `avg` | Mean (average) value | DC signals, slow-changing values |
| `rms` | Root Mean Square | AC signals, current transformers |

### Channel Commands

The following shell commands allow interactive calibration and reading of channels. Where `<n>` is channel number 1-4.

| Command | Description |
|---------|-------------|
| `current channel-<n> read` | Read raw and calibrated values |
| `current channel-<n> calib set-0 <value>` | Capture current raw reading as X0, set Y0 to `<value>` |
| `current channel-<n> calib set-1 <value>` | Capture current raw reading as X1, set Y1 to `<value>` |
| `current channel-<n> calib show` | Show calibration parameters |
| `current channel-<n> calib reset` | Reset calibration to defaults |
| `current channel-<n> calib mode [avg\|rms]` | Get/set calibration mode |

### 1-Wire Thermometer

Command to set **1-Wire thermometer sample interval** in seconds:

```
app config w1-therm-interval-sample <1-86400>
```

Command to set **1-Wire thermometer aggregate interval** in seconds:

```
app config w1-therm-interval-aggreg <1-86400>
```

## Firmware

The latest firmware is available in Catalog Applications [Firmware chapter](https://docs.hardwario.com/chester/catalog-applications/catalog-applications#application-firmware).

### Firmware v3.5.1

| Variant | Version | Link |
|---------|---------|------|
| **CHESTER Current** | v3.5.1 | [Download](https://firmware.hardwario.com/chester/c2ac3f9d94194573b43c56f54962e672) |
| **CHESTER Current Z** | v3.5.1 | [Download](https://firmware.hardwario.com/chester/627823995dc34c4a9336d0534ce3e418) |

## Example JSON Message

### LTE

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 42,
    "timestamp": 1738627200
  },
  "system": {
    "uptime": 86400,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 28
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -10,
      "snr": 12,
      "plmn": 23003,
      "cid": 1234567,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.012,
    "accel_y": -0.008,
    "accel_z": 1.002,
    "orientation": 2
  },
  "analog_channels": [
    {
      "channel": 1,
      "raw_rms": {
        "measurements": [
          { "timestamp": 1738627200, "period": 300 },
          { "min": 70.12, "max": 72.45, "avg": 71.28, "mdn": 71.30 },
          { "min": 69.88, "max": 73.01, "avg": 71.45, "mdn": 71.42 }
        ]
      },
      "raw_mean": {
        "measurements": [
          { "timestamp": 1738627200, "period": 300 },
          { "min": 49.50, "max": 51.20, "avg": 50.35, "mdn": 50.32 },
          { "min": 49.22, "max": 51.55, "avg": 50.38, "mdn": 50.40 }
        ]
      },
      "calibration": {
        "mode": 1,
        "measurements": [
          { "timestamp": 1738627200, "period": 300 },
          { "min": 9.85, "max": 10.18, "avg": 10.01, "mdn": 10.02 },
          { "min": 9.82, "max": 10.25, "avg": 10.03, "mdn": 10.04 }
        ]
      }
    }
  ]
}
```

</details>

> **Info:** The payload structure for analog channels has changed in **v3.5.1**:
> - `raw_rms`: Contains RMS measurements in mV
> - `raw_mean`: Contains mean (average) measurements in mV
> - `calibration`: Contains calibrated values based on the selected mode (0=avg, 1=rms)

### LoRaWAN

**CHESTER Current** supports binary LoRaWAN payload encoding. Example with battery + thermometer + channel 1 active:

**Header:** `0x25 0x00` (bits: BATT=1, ACCEL=0, THERM=1, W1=0, BACKUP=0, CH1=1)

**Raw bytes (hex):**

```
25 00 45 0E 5A 0D 1C 29 09 00 47 00 48 E4 49
```

**Decoded:**

| Offset | Bytes | Field | Value |
|--------|-------|-------|-------|
| 0-1 | `25 00` | Header | 0x0025 (BATT + THERM + CH1) |
| 2-3 | `45 0E` | voltage_rest | 3653 mV |
| 4-5 | `5A 0D` | voltage_load | 3418 mV |
| 6 | `1C` | current_load | 28 mA |
| 7-8 | `29 09` | temperature | 23.45 °C (2345 / 100) |
| 9-10 | `00 47` | ch1_rms | 71.5 mV (float16) |
| 11-12 | `00 48` | ch1_mean | 50.3 mV (float16) |
| 13-14 | `E4 49` | ch1_calib | 10.02 A (float16) |

**Total:** 15 bytes

## Channel Calibration

> **Danger:** When upgrading firmware from **v1.x.x** to version **v2.0.0 and newer**, it is necessary to [**backup configuration**](https://docs.hardwario.com/chester/catalog-applications/common-functionality#configuration-backup). In the case of using **CHESTER Current** also calibration data.

> **Caution:** The following section is provided only for reference. Usually, the **CHESTER Current** devices are ordered altogether with the current probes, and **HARDWARIO** does the channel calibration for their customers in such a case.

### Calibration System Overview

The calibration system uses **two-point linear interpolation** to convert raw mV readings to calibrated values (e.g., Amps, Watts, or any physical unit).

> **Tip:** Linear interpolation is defined by this formula for output calculation:
>
> `calibrated = (y0 × (x1 - raw) + y1 × (raw - x0)) / (x1 - x0)`
>
> Where:
> - `x0`, `x1` = Raw mV values at calibration points
> - `y0`, `y1` = Real physical values at calibration points
> - `raw` = Current raw mV reading

### Configuration Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `channel-active-<1..4>` | bool | true/false | false | Enable channel |
| `channel-differential-<1..4>` | bool | true/false | false | Differential mode |
| `channel-calib-x0-<1..4>` | float | -10000..10000 | 0.00 | Raw mV at point 0 |
| `channel-calib-x1-<1..4>` | float | -10000..10000 | 0.00 | Raw mV at point 1 |
| `channel-calib-y0-<1..4>` | float | -10000..10000 | 0.00 | Real value at point 0 |
| `channel-calib-y1-<1..4>` | float | -10000..10000 | 0.00 | Real value at point 1 |
| `channel-calib-mode-<1..4>` | enum | avg/rms | rms | Calibration mode |

### Calibration Procedure

#### Prerequisites

1. Connect the current sensor (e.g., CT clamp) to the CHESTER-K1 channel
2. Connect to CHESTER via RTT shell or USB console
3. Have a reference measurement device ready (multimeter, clamp meter)

#### Step-by-Step Calibration

##### 1. Enable the Channel

```
app config channel-active-1 true
```

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

To clear calibration and return to raw mV output:

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
app config channel-calib-x0 <n> 0
app config channel-calib-y0 <n> 0
app config channel-calib-x1 <n> 625
app config channel-calib-y1 <n> 300

# Set measurement mode to RMS (Root Mean Square)
app config channel-calib-mode <n> rms

# Enable differential input mode
app config channel-differential <n> true
```

:::caution

If your sensor has a different rating (e.g., 100 A / 1 V), you must update `x1` to `1000` and `y1` to `100` to maintain accuracy.

:::

### Legacy Calibration Method

In **HARDWARIO**, we have a calibration kit for **CHESTER Current** made of several air-core coils with 10/50/100 turns.

#### Example Current Calibration (Legacy)

1. Measure the **zero-current offsets** and write them for each channel as the `x0` parameter.

   > **Tip:** Use the `sample` command to trigger the measurement.

2. Let's assume calibration of **100 A** current probe and pick the **100-turn coil**.
3. Set the laboratory power supply's current limit to **900 mA**, and connect the power supply to the coil.
4. **Clip the current probe** around the calibration coil.
5. Verify the current flowing to the coil using a **multimeter** connected in series.
6. Measure the channel, and write the reading as the `x1` value.
7. Set the `y1` parameter to the value `90000`.

   > **Info:** The value represents the multiplication of the number of turns on the coil and the power supply's current limit, in this example `90000`.

8. Since we assumed a zero-current offset point, we can keep the `x0` parameter set as `0`.
9. Save the configuration data (using the `config save` command) and verify the applied calibrated values.

---

## Changelog

### v3.5.1 – 2025-12-08

- **Added**: Shell commands for real-time per-channel calibration: set zero and span points interactively
- **Added**: Downlink watchdog: detects loss of cloud communication
- **Improved**: LoRaWAN reliability and encoding
- **Fixed**: Calibration range validation

### v3.5.0 – 2025-12-03

- **Added**: New variants: **CHESTER Current Z** (with CHESTER-Z1 backup module) and **CHESTER Current 1W** (with external DS18B20 1-Wire temperature sensors)
- **Added**: LoRaWAN support: single firmware binary for both LTE and LoRaWAN; mode selectable via `app config mode lte` / `app config mode lrw`
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); previous Cloud v1 firmware remains separately available

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
