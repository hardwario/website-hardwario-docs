---
title: CHESTER Clime
description: "CHESTER Clime is the catalog application for temperature and humidity monitoring: its variants, hardware, settings and the exact data it sends."
---

# CHESTER Clime

![CHESTER Clime with the external hygrometer gland](/img/chester/catalog-applications/chester-clime.webp)

**CHESTER Clime** is an environmental sensor. It measures temperature and humidity and sends the results to HARDWARIO Cloud: over NB-IoT/LTE as the minimum, maximum, average and median of every interval, over LoRaWAN as the latest values.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Clime firmware](../../firmware/chester-clime/index.md)** page.

:::

## What It Can Do

- Measures temperature and humidity with the external **CHESTER-S2** hygrometer.
- Reads several **DS18B20** 1-Wire temperature probes and 1-Wire soil sensors.
- Reports a temperature alarm when a configured threshold is crossed.
- Keeps running on the **CHESTER-Z** backup module when external power fails, and reports the power change.
- Collects readings from Bluetooth sensor tags.
- In its variants, measures indoor air quality with the **CHESTER-S1** multisensor, or temperature with two Pt1000 probes or two type K thermocouples.

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Clime**](#model-chester-clime) | Base model: external CHESTER-S2 hygrometer | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime Z**](#chester-clime-z) | Backup module CHESTER-Z1 | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime IAQ**](#chester-clime-iaq) | Indoor air quality: CO₂, pressure, illuminance, motion | [CHESTER Clime IAQ](../../firmware/chester-clime/chester-clime-iaq.md) |
| [**CHESTER Clime 1W**](#chester-clime-1w) | DS18B20 probes | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime 1WH**](#chester-clime-1wh) | DS18B20 probes and the hygrometer | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime RTD**](#chester-clime-rtd) | Two Pt1000 probes | [CHESTER Clime RTD](../../firmware/chester-clime/chester-clime-rtd.md) |
| [**CHESTER Clime TC**](#chester-clime-tc) | Two type K thermocouples | [CHESTER Clime TC](../../firmware/chester-clime/chester-clime-tc.md) |
| [**CHESTER Clime SPS30**](#chester-clime-sps30) | Sensirion SPS30 particulate matter sensor; separate firmware build | [CHESTER Clime SPS30](../../firmware/chester-clime/chester-clime-sps30.md) |
| [**CHESTER Clime Radon**](#chester-clime-radon) | Piketronic RPP-R radon probe on CHESTER-X2; separate firmware build | [CHESTER Clime Radon](../../firmware/chester-clime/chester-clime-radon.md) |

## CHESTER Clime {#model-chester-clime}

The base model measures with the external **CHESTER-S2** hygrometer and runs the main [CHESTER Clime firmware](../../firmware/chester-clime/index.md).

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S2`: External hygrometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Clime. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. Every parameter, the network ones included, is on the firmware page under [**Configuration Parameters**](../../firmware/chester-clime/index.md#configuration-parameters).

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | Mode | `none`, `lte`, `lrw` | `none` | Network: `lte` for NB-IoT/LTE, `lrw` for LoRaWAN; `none` keeps the device off the network (see [Network Mode Configuration](../common-functionality.md#network-mode-configuration)) |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | How often the sensors are sampled, in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds; each `measurements` entry covers one interval, made of at most 32 samples (16 for Bluetooth tags) |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `hygro-t-alarm-hi-report` | Hygro t alarm hi report | `true`, `false` | `false` | Send an extra report when the hygrometer temperature crosses the high threshold in either direction |
| `hygro-t-alarm-hi-thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | High temperature threshold in °C |
| `hygro-t-alarm-hi-hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | Hysteresis of the high threshold in °C: the alarm turns on above the threshold plus half the hysteresis and off below the threshold minus half |
| `hygro-t-alarm-lo-report` | Hygro t alarm lo report | `true`, `false` | `false` | Send an extra report when the hygrometer temperature crosses the low threshold in either direction |
| `hygro-t-alarm-lo-thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Low temperature threshold in °C |
| `hygro-t-alarm-lo-hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Hysteresis of the low threshold in °C: the alarm turns on below the threshold minus half the hysteresis and off above the threshold plus half |

An extra report for an alarm or a power change goes out `event-report-delay` seconds after the change (default 1), at most `event-report-rate` times per hour (default 30; firmware v4.0.1 sends up to one more).

### Data over LTE {#data-over-lte}

Over NB-IoT/LTE the device sends a report every `interval-report` seconds, with a random deviation of up to ±20 % (see [Report Interval Jitter](../common-functionality.md#report-interval-jitter)); the first report goes out 10 s after start. An alarm or a power change sends an extra report. Every sensor is sampled every `interval-sample` seconds, and at the end of each `interval-aggreg` its samples become one entry in `measurements`: a `timestamp` (Unix time when the interval ended) and the `min`, `max`, `avg` (average) and `mdn` (median) of the samples. A report carries the entries collected since the last successful report, about 6 with the default settings; the buffer holds the first 32 per sensor (16 per Bluetooth tag) and empties with each successful report. When a reading fails, the value is `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Clime sends `message.version` `2`.

In addition to the common data, CHESTER Clime sends:

- [`hygrometer`](#hygrometer): temperature and humidity from CHESTER-S2, with the alarm events
- [`w1_thermometers`](#w1-thermometers): temperature of each DS18B20 1-Wire probe
- [`soil_sensors`](#soil-sensors): temperature and moisture of each 1-Wire soil sensor
- [`ble_tags`](#ble-tags): readings of each enrolled Bluetooth tag

How the other models differ is described in their own sections; the overview is under [Models](#variants).

#### Hygrometer {#hygrometer}

Sent in every report.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `hygrometer.temperature.measurements[]` | Air temperature (SHT30 in CHESTER-S2): `min`, `max`, `avg`, `mdn` | °C | −40 to 125 | 0.01 °C |
| `hygrometer.humidity.measurements[]` | Relative humidity: `min`, `max`, `avg`, `mdn` | % | 0–100 | 0.01 % |
| `hygrometer.temperature.events[].type` | Alarm change, with its `timestamp`: `alarm_hi_activated`, `alarm_hi_deactivated`, `alarm_lo_activated` or `alarm_lo_deactivated` | | | |
| `hygrometer.temperature.events[].value` | Hygrometer temperature that caused the change | °C | −40 to 125 | 0.01 °C |

`events` lists the alarm changes since the previous report, up to 32: changes of the high alarm while `hygro-t-alarm-hi-report` is `true`, changes of the low alarm while `hygro-t-alarm-lo-report` is `true`.

#### 1-Wire Thermometers {#w1-thermometers}

Sent in every report by every CHESTER Clime firmware as a list of 0–10 entries: one for each DS18B20 found on the 1-Wire bus when the device starts.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Serial number of the probe | | | |
| `w1_thermometers[].measurements[]` | Temperature: `min`, `max`, `avg`, `mdn` | °C | −55 to 125 | 0.01 °C |

#### Soil Sensors {#soil-sensors}

Sent in every report by every CHESTER Clime firmware as a list of 0–10 entries: one for each 1-Wire soil sensor found when the device starts.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `soil_sensors[].serial_number` | Serial number of the sensor | | | |
| `soil_sensors[].temperature.measurements[]` | Temperature in the top part of the sensor, above the soil: `min`, `max`, `avg`, `mdn` | °C | −40 to 85 | 0.01 °C |
| `soil_sensors[].moisture.measurements[]` | Soil moisture as the raw value of the capacitive sensor, about 6500 when dry and 13000 in water: `min`, `max`, `avg`, `mdn` | | 0–16383 | 1 |

#### Bluetooth Tags {#ble-tags}

Sent in every report by every CHESTER Clime firmware as a list of 0–8 entries: one for each enrolled Teltonika EYE Sensor tag (see [Bluetooth Tags](../ble-tags.md)).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetooth address of the tag, 12 hexadecimal digits | | | |
| `ble_tags[].rssi` | Signal strength of the tag at the last sample | dBm | −128 to −1 | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag at the last sample | V | 2.00–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[]` | Temperature: `min`, `max`, `avg`, `mdn` | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[]` | Relative humidity: `min`, `max`, `avg`, `mdn` | % | 0–100 | 0.01 % |

### Data over LoRaWAN {#data-over-lorawan}

Every uplink carries the common LoRaWAN fields described in [**Common Functionality**](../common-functionality.md#common-data-lorawan) and the fields in the table below.

Over LoRaWAN the device sends an uplink every `interval-report` seconds, with the same random deviation, and an extra uplink after an alarm or a power change. The uplink carries the last sample of each sensor. An uplink holds at most 51 bytes and goes out when the values of the connected sensors fit into them. The decoder `codec/cs-decoder.js` from the CHESTER SDK outputs these fields for CHESTER Clime:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `hygro_temperature` | Air temperature from CHESTER-S2 | °C | −40 to 125 | 0.01 °C |
| `hygro_humidity` | Relative humidity from CHESTER-S2 | % | 0–100 | 0.5 % |
| `w1_thermometers[]` | Temperature of each DS18B20 probe, in the order found | °C | −55 to 125 | 0.01 °C |
| `soil_sensors[].temperature` | Temperature of each soil sensor | °C | −40 to 85 | 0.01 °C |
| `soil_sensors[].moisture` | Soil moisture of each soil sensor, raw value | | 0–16383 | 1 |
| `ble_tags[].temperature` | Temperature of each enrolled Bluetooth tag | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity` | Relative humidity of each enrolled Bluetooth tag | % | 0–100 | 0.5 % |

## CHESTER Clime Z {#chester-clime-z}

CHESTER Clime with the **CHESTER-Z1** backup module. It keeps running on the backup battery when external power fails, and reports at once when external power fails and when it returns.

It runs the main [CHESTER Clime firmware](../../firmware/chester-clime/index.md), which detects the backup module at runtime.

### Hardware {#chester-clime-z-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-Z1`: Backup module
* `CHESTER-S2`: External hygrometer
* `CHESTER-E1-LP`: Enclosure with SMA pigtail

### Settings {#chester-clime-z-settings}

CHESTER Clime Z uses all settings of [CHESTER Clime](#settings) and adds these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Send an extra report when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Send an extra report when external power fails |

The full list is on the [CHESTER Clime firmware](../../firmware/chester-clime/index.md#configuration-parameters) page.

### Data {#chester-clime-z-data}

CHESTER Clime Z sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`backup`](#backup), [`hygrometer`](#hygrometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags).

#### Backup Module {#backup}

Sent in every report by every CHESTER Clime firmware when a CHESTER-Z backup module was detected at start, as in CHESTER Clime Z. The CHESTER Clime IAQ firmware sends it in every report and fills it from a CHESTER-Z backup module; with CHESTER-X10 alone, both voltages are `0` and `state` is `disconnected`.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage of the external power input at the last sample: 6–26 V with external power connected, near 0 when it is disconnected | V | 0–26 | 0.01 V |
| `backup.batt_voltage` | Voltage of the backup battery at the last sample | V | 3.2–4.2 | 0.01 V |
| `backup.state` | External power: `connected` or `disconnected` | | | |
| `backup.events[].type` | Change of external power, with its `timestamp`: `connected` or `disconnected` | | | |

`events` lists every failure and return of external power since the previous report, up to 32. While `backup-report-disconnected` and `backup-report-connected` are `true` (the default), each change also sends an extra report.

#### Over LoRaWAN {#chester-clime-z-data-lorawan}

The uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan) and the fields of [CHESTER Clime](#data-over-lorawan): `hygro_temperature`, `hygro_humidity`, `w1_thermometers[]`, `soil_sensors[]` and `ble_tags[]`. A power change sends an extra uplink.

## CHESTER Clime IAQ {#chester-clime-iaq}

![CHESTER Clime IAQ: white enclosure with the push button and the PIR lens on the lid and a power jack on the side](/img/chester/catalog-applications/chester-clime-iaq.webp)

The indoor air quality variant. Its integrated **CHESTER-S1** multisensor measures temperature, humidity, illuminance, CO₂ concentration and atmospheric pressure, and detects motion with a PIR sensor. The device reports push button presses with acoustic and optical feedback, and the button LED color shows the CO₂ level. It runs from external power 6–28 V on **CHESTER-X10** with a Li-Ion backup battery.

It runs the [CHESTER Clime IAQ firmware](../../firmware/chester-clime/chester-clime-iaq.md).

### Hardware {#chester-clime-iaq-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S1-BCMP`: Integrated multi-sensor
* `CHESTER-X10`: External power 6–28 V with Li-Ion battery
* `CHESTER-E7-LP`: Enclosure with SMA pigtail

### Settings {#chester-clime-iaq-settings}

CHESTER Clime IAQ uses these settings of [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` and `interval-report`. It adds these settings:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `iaq-led-thr-warning` | IAQ LED threshold warning | `<-40.0..5000.0>` | `800.0` | CO₂ concentration in ppm at which the button turns orange |
| `iaq-led-thr-alarm` | IAQ LED threshold alarm | `<-40.0..5000.0>` | `1600.0` | CO₂ concentration in ppm at which the button turns red |
| `iaq-led-hst` | IAQ LED hysteresis | `<-40.0..125.0>` | `50.0` | Hysteresis of both thresholds in ppm: the color changes up at the threshold plus the hysteresis and back at the threshold minus the hysteresis |

With a CHESTER-Z backup module, it also uses the `backup-report-*` settings of [CHESTER Clime Z](#chester-clime-z-settings). The full list is on the [CHESTER Clime IAQ firmware](../../firmware/chester-clime/chester-clime-iaq.md#configuration-parameters) page.

### Data {#chester-clime-iaq-data}

CHESTER Clime IAQ sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`iaq_sensor`](#iaq-sensor), [`backup`](#backup), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags). `backup` is in every report and is filled from a CHESTER-Z backup module; with CHESTER-X10 alone, both voltages are `0` and `state` is `disconnected`.

#### Indoor Air Quality Sensor {#iaq-sensor}

Sent in every report by the CHESTER Clime IAQ firmware, with the CHESTER-S1 multisensor.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `iaq_sensor.temperature.measurements[]` | Air temperature: `min`, `max`, `avg`, `mdn` | °C | −40 to 125 | 0.01 °C |
| `iaq_sensor.humidity.measurements[]` | Relative humidity: `min`, `max`, `avg`, `mdn` | % | 0–100 | 0.01 % |
| `iaq_sensor.illuminance.measurements[]` | Illuminance: `min`, `max`, `avg`, `mdn` | lx | not specified | 1 lx |
| `iaq_sensor.altitude.measurements[]` | Altitude derived from the air pressure: `min`, `max`, `avg`, `mdn` | m | not specified | 1 m |
| `iaq_sensor.pressure.measurements[]` | Atmospheric pressure: `min`, `max`, `avg`, `mdn` | Pa | 20000–110000 | 1 Pa |
| `iaq_sensor.co2_conc.measurements[]` | CO₂ concentration: `min`, `max`, `avg`, `mdn` | ppm | 0–10000 | 1 ppm |
| `iaq_sensor.motion_count.measurements[].value` | Motions detected by the PIR sensor since the device started, read at the end of each aggregation interval | | 0–2147483647 | 1 |
| `iaq_sensor.press_count.measurements[].value` | Button presses since the device started; each press adds an entry and sends a report at once | | 0–2147483647 | 1 |

#### Over LoRaWAN {#chester-clime-iaq-data-lorawan}

With firmware v4.0.1, the uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan) and these fields of [CHESTER Clime](#data-over-lorawan): `w1_thermometers[]`, `soil_sensors[]` and `ble_tags[]`.

## CHESTER Clime 1W {#chester-clime-1w}

Measures temperature with several **DS18B20** 1-Wire probes. The enclosure has 8 cable glands for the probe cables.

It runs the main [CHESTER Clime firmware](../../firmware/chester-clime/index.md), which has DS18B20 1-Wire support built in.

### Hardware {#chester-clime-1w-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-E8-LP`: Enclosure with 8 cable glands (RM8L-4S)

### Settings {#chester-clime-1w-settings}

CHESTER Clime 1W uses these settings of [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` and `interval-report`.

### Data {#chester-clime-1w-data}

CHESTER Clime 1W sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`hygrometer`](#hygrometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags). `hygrometer` carries `null` values; `w1_thermometers` has one entry for each connected DS18B20 probe, up to 10.

#### Over LoRaWAN {#chester-clime-1w-data-lorawan}

The uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan) and the fields of [CHESTER Clime](#data-over-lorawan): `hygro_temperature` and `hygro_humidity` as `null`, `w1_thermometers[]` with one value for each probe, `soil_sensors[]` and `ble_tags[]`.

## CHESTER Clime 1WH {#chester-clime-1wh}

Adds several **DS18B20** 1-Wire temperature probes to the **CHESTER-S2** hygrometer. The enclosure has 8 cable glands for the probe cables.

It runs the main [CHESTER Clime firmware](../../firmware/chester-clime/index.md), which has DS18B20 1-Wire and CHESTER-S2 support built in.

### Hardware {#chester-clime-1wh-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-S2`: External hygrometer
* `CHESTER-E8-LP`: Enclosure with 8 cable glands (RM8L-4S)

### Settings {#chester-clime-1wh-settings}

CHESTER Clime 1WH uses all settings of [CHESTER Clime](#settings).

### Data {#chester-clime-1wh-data}

CHESTER Clime 1WH sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`hygrometer`](#hygrometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags); `w1_thermometers` has one entry for each connected DS18B20 probe, up to 10. Over LoRaWAN, it sends the uplink of [CHESTER Clime](#data-over-lorawan).

## CHESTER Clime RTD {#chester-clime-rtd}

Measures temperature with two Pt1000 4-wire probes on the **CHESTER-X3A** module. The enclosure has 2 PG7 cable glands for the probe cables.

It runs the [CHESTER Clime RTD firmware](../../firmware/chester-clime/chester-clime-rtd.md).

### Hardware {#chester-clime-rtd-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3A:A`: 2x Pt100/Pt1000 interface
* `CHESTER-E13-LP`: Enclosure with SMA pigtail and 2 cable PG7 glands

### Settings {#chester-clime-rtd-settings}

CHESTER Clime RTD uses these settings of [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` and `interval-report`. The full list is on the [CHESTER Clime RTD firmware](../../firmware/chester-clime/chester-clime-rtd.md#configuration-parameters) page.

### Data {#chester-clime-rtd-data}

CHESTER Clime RTD sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`rtd_thermometer`](#rtd-thermometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags).

#### RTD Thermometers {#rtd-thermometer}

Sent in every report by the CHESTER Clime RTD firmware: two entries, for inputs 1 and 2 of the CHESTER-X3A module in slot A.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `rtd_thermometer[].channel` | Input of the CHESTER-X3A module | | 1–2 | 1 |
| `rtd_thermometer[].measurements[]` | Temperature of the Pt1000 probe: `min`, `max`, `avg`, `mdn` | °C | not specified | 0.01 °C |

#### Over LoRaWAN {#chester-clime-rtd-data-lorawan}

The uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan), the fields `w1_thermometers[]`, `soil_sensors[]` and `ble_tags[]` of [CHESTER Clime](#data-over-lorawan) and this field:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `rtd_thermometers[]` | Temperature of the two Pt1000 probes | °C | not specified | 0.01 °C |

## CHESTER Clime TC {#chester-clime-tc}

Measures temperature with two **type K** thermocouples on the **CHESTER-X3B** module. The enclosure has 2 PG7 cable glands for the thermocouple cables.

It runs the [CHESTER Clime TC firmware](../../firmware/chester-clime/chester-clime-tc.md).

### Hardware {#chester-clime-tc-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X3B:A`: 2x Type K thermocouple interface
* `CHESTER-E13-LP`: Enclosure with SMA pigtail and 2 cable PG7 glands

### Settings {#chester-clime-tc-settings}

CHESTER Clime TC uses these settings of [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` and `interval-report`. The full list is on the [CHESTER Clime TC firmware](../../firmware/chester-clime/chester-clime-tc.md#configuration-parameters) page.

### Data {#chester-clime-tc-data}

CHESTER Clime TC sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`tc_thermometer`](#tc-thermometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags).

#### Thermocouples {#tc-thermometer}

Sent in every report by the CHESTER Clime TC firmware: two entries, for inputs 1 and 2 of the CHESTER-X3B module in slot A.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `tc_thermometer[].channel` | Input of the CHESTER-X3B module | | 1–2 | 1 |
| `tc_thermometer[].measurements[]` | Temperature at the type K thermocouple, with the cold junction compensated by the thermometer on the mainboard: `min`, `max`, `avg`, `mdn` | °C | not specified | 0.01 °C |

#### Over LoRaWAN {#chester-clime-tc-data-lorawan}

The uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan), the fields `w1_thermometers[]`, `soil_sensors[]` and `ble_tags[]` of [CHESTER Clime](#data-over-lorawan) and this field:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `tc_thermometers[]` | Temperature of the two type K thermocouples | °C | not specified | 0.01 °C |

## CHESTER Clime SPS30 {#chester-clime-sps30}

CHESTER Clime SPS30 is a separate firmware build for the **Sensirion SPS30** particulate matter sensor; its hardware and parameters are on the [CHESTER Clime SPS30 firmware](../../firmware/chester-clime/chester-clime-sps30.md) page.

### Data {#data-chester-clime-sps30}

CHESTER Clime SPS30 sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`sps30`](#sps30), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags).

#### Particulate Matter Sensor {#sps30}

Sent in every report by the CHESTER Clime SPS30 firmware, with the Sensirion SPS30 sensor.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `sps30.pm1`, `sps30.pm2_5`, `sps30.pm4`, `sps30.pm10` | Mass concentration of particles up to 1, 2.5, 4 and 10 µm, each with `measurements[]`: `min`, `max`, `avg`, `mdn` | µg/m³ | 0–1000 | 0.01 µg/m³ |
| `sps30.num_pm0_5`, `sps30.num_pm1`, `sps30.num_pm2_5`, `sps30.num_pm4`, `sps30.num_pm10` | Number concentration of particles up to 0.5, 1, 2.5, 4 and 10 µm, each with `measurements[]`: `min`, `max`, `avg`, `mdn` | #/cm³ | 0–3000 | 0.01 #/cm³ |

#### Over LoRaWAN {#chester-clime-sps30-data-lorawan}

With firmware v4.0.1, the uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan) and these fields of [CHESTER Clime](#data-over-lorawan): `w1_thermometers[]`, `soil_sensors[]` and `ble_tags[]`.

## CHESTER Clime Radon {#chester-clime-radon}

CHESTER Clime Radon is a separate firmware build for the **Piketronic RPP-R** radon probe on CHESTER-X2; its hardware and parameters are on the [CHESTER Clime Radon firmware](../../firmware/chester-clime/chester-clime-radon.md) page.

### Settings {#settings-chester-clime-radon}

CHESTER Clime Radon uses these settings of [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` and `interval-report`. It adds the settings of the probe's Modbus connection; set them with `radon config <parameter> <value>` and apply them with `config save`:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `19200` | Baud rate |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | Modbus address of the probe |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even` | `even` | Parity |
| `modbus-stop-bits` | Modbus stop bits | `1`, `2` | `1` | Stop bits |

The values must match the DIP switches of the probe. The full list is on the [CHESTER Clime Radon firmware](../../firmware/chester-clime/chester-clime-radon.md#configuration-parameters) page.

### Data {#data-chester-clime-radon}

CHESTER Clime Radon sends the [common data](../common-functionality.md#common-data-lte) and these structures: [`radon_probe`](#radon-probe), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) and [`ble_tags`](#ble-tags).

#### Radon Probe {#radon-probe}

Sent in every report by the CHESTER Clime Radon firmware, with a Piketronic RPP-R probe on CHESTER-X2.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `radon_probe.concentration_hourly.measurements[].value` | Radon concentration, moving average over the last hour, read at the end of each aggregation interval | Bq/m³ | 100–500000 | 1 Bq/m³ |
| `radon_probe.concentration_daily.measurements[].value` | Radon concentration, moving average over the last day, read at the end of each aggregation interval | Bq/m³ | 20–500000 | 1 Bq/m³ |
| `radon_probe.chamber_temperature.measurements[]` | Temperature in the measurement chamber: `min`, `max`, `avg`, `mdn` | °C | −40 to 125 | 1 °C |
| `radon_probe.chamber_humidity.measurements[]` | Relative humidity in the measurement chamber: `min`, `max`, `avg`, `mdn` | % | 0–100 | 1 % |

#### Over LoRaWAN {#chester-clime-radon-data-lorawan}

With firmware v4.0.1, the uplink carries the [common LoRaWAN fields](../common-functionality.md#common-data-lorawan) and these fields of [CHESTER Clime](#data-over-lorawan): `w1_thermometers[]`, `soil_sensors[]` and `ble_tags[]`.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
