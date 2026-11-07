---
title: CHESTER Meteo
description: "CHESTER Meteo is the catalog application for weather monitoring: its hardware, variants, the settings you change and the exact data it sends."
---

# CHESTER Meteo

![CHESTER Meteo with the external hygrometer and four cable glands](/img/chester/catalog-applications/chester-meteo.webp)

**CHESTER Meteo** is a wind and environmental sensor: it measures wind speed and direction, rainfall, atmospheric pressure, temperature and humidity. It samples the measured variables, aggregates them for every interval and sends the results to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Meteo firmware](../../firmware/chester-meteo/index.md)** page.

:::

## What It Can Do

- Measures wind speed (m/s), wind direction (0–360°) and rainfall (mm) with weather sensors connected to the **CHESTER-X0B** input module.
- Measures atmospheric pressure (Pa) with an external barometer.
- Measures temperature (°C) and humidity (%RH) with the external **CHESTER-S2** hygrometer.
- Reads **DS18B20** 1-Wire temperature probes and 1-Wire soil sensors.
- Reports a temperature alarm when a configured threshold is crossed.
- Collects readings from Bluetooth sensor tags.
- Other firmware builds read a pyranometer ([**CHESTER Meteo P**](../../firmware/chester-meteo/chester-meteo-p.md)) or a SenseCAP weather station and a Cubic particulate matter sensor over Modbus ([**CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md)).

## Models {#variants}

CHESTER Meteo comes as the base model, the catalog variant CHESTER Meteo Z and two separate firmware builds, CHESTER Meteo P and CHESTER Meteo M (see their firmware pages). Each model has its own section below.

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Meteo**](#model-chester-meteo) | Base model | [CHESTER Meteo](../../firmware/chester-meteo/index.md) |
| [**CHESTER Meteo Z**](#chester-meteo-z) | Backup module CHESTER-Z1 | [CHESTER Meteo Z](../../firmware/chester-meteo/chester-meteo-z.md) |
| [**CHESTER Meteo P**](#chester-meteo-p) | Separate firmware build: pyranometer on slot B | [CHESTER Meteo P](../../firmware/chester-meteo/chester-meteo-p.md) |
| [**CHESTER Meteo M**](#chester-meteo-m) | Separate firmware build: SenseCAP weather station and Cubic particulate matter sensor over Modbus | [CHESTER Meteo M](../../firmware/chester-meteo/chester-meteo-m.md) |

## CHESTER Meteo {#model-chester-meteo}

### Hardware {#hardware}

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X0B:A`: Input module (4 channels)
* `CHESTER-S2`: External hygrometer
* External barometer
* `CHESTER-E10-LP`: Enclosure with four cable glands, a PG9 gland, a ventilation membrane, a pole mount bracket and SMA pigtail

See [**Ordering Codes**](../../ordering-codes.md) for more details.

### Settings {#settings}

These are the settings you usually change for CHESTER Meteo. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The full list is on the [**CHESTER Meteo firmware**](../../firmware/chester-meteo/index.md#configuration-parameters) page.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval in seconds |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Report interval in seconds |
| `hygro_t_alarm_hi_report` | Hygro t alarm hi report | `true`, `false` | `false` | Report when the hygrometer temperature crosses the high threshold |
| `hygro_t_alarm_hi_thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | High temperature threshold in °C |
| `hygro_t_alarm_hi_hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | High temperature hysteresis in °C |
| `hygro_t_alarm_lo_report` | Hygro t alarm lo report | `true`, `false` | `false` | Report when the hygrometer temperature crosses the low threshold |
| `hygro_t_alarm_lo_thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Low temperature threshold in °C |
| `hygro_t_alarm_lo_hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Low temperature hysteresis in °C |

The temperature alarm watches the temperature of the CHESTER-S2 hygrometer. CHESTER Meteo writes its parameters with underscores (`hygro_t_alarm_hi_thr`). The high alarm turns on when the temperature rises above the threshold plus half the hysteresis and turns off when it falls below the threshold minus half the hysteresis. The low alarm turns on below the threshold minus half the hysteresis and turns off above the threshold plus half the hysteresis. How soon and how often the alarm reports go out is set by `event-report-delay` and `event-report-rate` on the firmware page.

### Data over LTE {#data-over-lte}

The device sends a report every `interval-report` seconds; in firmware v4.0.1 the time between two reports varies at random by up to ±20 %. A hygrometer temperature alarm and, on CHESTER Meteo Z, a failure or return of external power send an extra report when their report setting is on. Most values are aggregated: each entry in `measurements` has a `timestamp` and the `min`, `max`, `avg` (average) and `mdn` (median) of the samples taken every `interval-sample` seconds during one `interval-aggreg` interval, so a report holds one entry for every aggregation since the previous report. Wind direction and rainfall have a single `value` per interval instead. When a sensor reading fails, the value is `null`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Meteo sends `message.version` `1` and the acceleration as `accelerometer.acceleration_x`, `acceleration_y` and `acceleration_z`.

In addition to the common data, CHESTER Meteo sends:

- [`weather_station`](#weather-station): rain gauge, anemometer and wind vane
- [`barometer`](#barometer): atmospheric pressure
- [`hygrometer`](#hygrometer): temperature, humidity and temperature alarms from CHESTER-S2
- [`w1_thermometers`](#w1-thermometers): DS18B20 thermometers
- [`soil_sensors`](#soil-sensors): moisture and temperature from 1-Wire soil sensors
- [`ble_tags`](#ble-tags): Bluetooth tags

#### Weather Station {#weather-station}

`weather_station` holds the readings of the rain gauge, the anemometer and the wind vane on CHESTER-X0 in slot A. It is in every report.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `weather_station.wind_speed.measurements[]` | Wind speed (min, max, avg, mdn); each sample is the average speed since the previous sample | m/s | not specified | 0.01 m/s |
| `weather_station.wind_direction.measurements[].value` | Wind direction in degrees from north (90° is east), the vector average of the samples; `0` also when no direction was read | ° | 0–359 | 1° |
| `weather_station.rainfall.measurements[].value` | Rainfall in the aggregation interval; the rain gauge counts in steps of 0.2794 mm | mm | not specified | 0.01 mm |

#### Barometer {#barometer}

`barometer` holds the atmospheric pressure from the external barometer (NXP MPL3115A2). It is in every report; a disconnected barometer gives `null` values.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `barometer.pressure.measurements[]` | Atmospheric pressure (min, max, avg, mdn) | Pa | 20000–110000 | 1 Pa |

#### Hygrometer {#hygrometer}

`hygrometer` holds the readings of the CHESTER-S2 hygrometer (Sensirion SHT30). It is in every report; a disconnected CHESTER-S2 gives `null` values. `events` lists the temperature alarms since the previous report, at most 32.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `hygrometer.temperature.measurements[]` | Temperature (min, max, avg, mdn) | °C | −40 to 125 | 0.01 °C |
| `hygrometer.temperature.events[].timestamp` | Time of the alarm event (Unix time) | s | | 1 s |
| `hygrometer.temperature.events[].type` | `alarm_hi_activated`, `alarm_hi_deactivated`, `alarm_lo_activated` or `alarm_lo_deactivated` | | | |
| `hygrometer.humidity.measurements[]` | Relative humidity (min, max, avg, mdn) | % | 0–100 | 0.01 % |

#### 1-Wire Thermometers {#w1-thermometers}

`w1_thermometers` has one entry for each DS18B20 thermometer found on the 1-Wire bus, at most 10.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Serial number of the thermometer, 48 bits from its 1-Wire ROM | | | |
| `w1_thermometers[].measurements[]` | Temperature (min, max, avg, mdn) | °C | −55 to 125 | 0.01 °C |

#### Soil Sensors {#soil-sensors}

`soil_sensors` has one entry for each soil sensor found on the 1-Wire bus, at most 10. The soil sensor measures moisture capacitively (ZSSC3123) and temperature in its top part, above the soil (TMP112).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `soil_sensors[].serial_number` | Serial number of the sensor, 48 bits from its 1-Wire ROM | | | |
| `soil_sensors[].temperature.measurements[]` | Temperature in the top part of the sensor (min, max, avg, mdn) | °C | −40 to 85 | 0.01 °C |
| `soil_sensors[].moisture.measurements[]` | Moisture as the raw reading of the capacitive sensor, about 6500 dry and 13000 fully in water (min, max, avg, mdn) | | 0–16383 | 1 |

#### Bluetooth Tags {#ble-tags}

`ble_tags` has one entry for each paired Bluetooth tag (Teltonika EYE Sensor), at most 8; see [**BLE Tags**](../ble-tags.md).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | MAC address of the tag, 12 hexadecimal digits | | | |
| `ble_tags[].rssi` | Signal strength of the tag at the last sample | dBm | −128 to −1 | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag at the last sample | V | 2.00–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[]` | Temperature (min, max, avg, mdn) | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[]` | Relative humidity (min, max, avg, mdn) | % | 0–100 | 0.01 % |

### Data over LoRaWAN {#data-over-lorawan}

Every uplink carries the common LoRaWAN fields described in [**Common Functionality**](../common-functionality.md#common-data-lorawan) and the fields in the table below.

In LoRaWAN mode, a message carries the last sample of each value instead of the aggregated values. The decoder outputs these fields:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `wind_speed` | Wind speed, the average since the previous sample | m/s | not specified | 0.01 m/s |
| `wind_direction` | Wind direction in degrees from north, one of 16 directions | ° | 0–337 | 1° |
| `rainfall` | Rainfall in the last completed aggregation interval | mm | not specified | 0.01 mm |
| `hygro_temperature` | Temperature from CHESTER-S2 | °C | −40 to 125 | 0.01 °C |
| `hygro_humidity` | Relative humidity from CHESTER-S2 | % | 0–100 | 0.5 % |
| `w1_thermometers[]` | Temperature of each DS18B20 thermometer | °C | −55 to 125 | 0.01 °C |
| `ble_tags[].temperature` | Temperature of each Bluetooth tag | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity` | Relative humidity of each Bluetooth tag | % | 0–100 | 0.5 % |
| `barometer` | Atmospheric pressure | kPa | 20–110 | 0.001 kPa |
| `soil_sensors[].temperature` | Temperature of each soil sensor | °C | −40 to 85 | 0.01 °C |
| `soil_sensors[].moisture` | Moisture of each soil sensor, raw reading | | 0–16383 | 1 |

A message has at most 51 bytes: 26 bytes plus 2 for each DS18B20 thermometer, 3 for each Bluetooth tag and 4 for each soil sensor. Firmware v4.0.1 sends the message when the connected sensors fit into this limit.

## CHESTER Meteo Z {#chester-meteo-z}

**CHESTER Meteo Z** is CHESTER Meteo with the **CHESTER-Z1** backup module. It keeps running on the backup battery when external power fails, and it reports at once when external power fails and when it returns.

This variant runs the [**CHESTER Meteo Z firmware**](../../firmware/chester-meteo/chester-meteo-z.md).

### Hardware {#chester-meteo-z-hardware}

The hardware of this variant consists of the following ordering codes:

* `CHESTER-M-BCGLS`: Standard mainboard
* `CHESTER-X0B:A`: Input module (4 channels)
* `CHESTER-Z1`: Backup module
* `CHESTER-S2`: External hygrometer
* External barometer
* `CHESTER-E10-LP`: Enclosure with four cable glands, a PG9 gland, a ventilation membrane, a pole mount bracket and SMA pigtail

### Settings {#chester-meteo-z-settings}

CHESTER Meteo Z uses the settings of [CHESTER Meteo](#settings) and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Report immediately when external power returns |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Report immediately when external power fails |

The power reports also follow `event-report-delay` and `event-report-rate`, described on the firmware page.

### Data {#chester-meteo-z-data}

CHESTER Meteo Z sends the data of [CHESTER Meteo](#data-over-lte) and additionally:

- the `backup` structure below, in every report
- an extra report when external power fails or returns, if the matching `backup-report-*` setting is on

#### Backup Module {#backup}

`backup` describes the power input of CHESTER-Z1. `events` lists the failures and returns of external power since the previous report, at most 32.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Voltage on the DC input of CHESTER-Z1: 6–26 V with external power connected, near 0 when disconnected | mV | 0–26000 | 1 mV |
| `backup.batt_voltage` | Voltage of the Li-Ion backup battery in CHESTER-Z1 | mV | 3200–4200 | 1 mV |
| `backup.state` | External power: `connected` or `disconnected` | | | |
| `backup.events[].timestamp` | Time of the change (Unix time) | s | | 1 s |
| `backup.events[].type` | `connected` (power returned) or `disconnected` (power failed) | | | |

#### Over LoRaWAN {#chester-meteo-z-data-lorawan}

A LoRaWAN uplink carries the same fields as for [CHESTER Meteo](#data-over-lorawan).

## CHESTER Meteo P {#chester-meteo-p}

**CHESTER Meteo P** is a separate firmware build of CHESTER Meteo for a pyranometer on the analog inputs of slot B (see its [firmware page](../../firmware/chester-meteo/chester-meteo-p.md)).

### Data {#data-chester-meteo-p}

The [**CHESTER Meteo P**](../../firmware/chester-meteo/chester-meteo-p.md) firmware sends the data of [CHESTER Meteo](#data-over-lte) and additionally:

- the `pyranometer` structure below, in every report

#### Pyranometer {#pyranometer}

`pyranometer` holds the readings of a pyranometer on analog inputs B0 and B1 of slot B; the firmware sends the measured voltage. Firmware v4.0.1 takes the timestamp of these entries from the last aggregation of the report instead of the first, so the decoded timestamps are later than the real ones.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `pyranometer.irradiance_1.measurements[]` | Voltage on analog input B0 (min, max, avg, mdn) | mV | 0–3600 | 1 mV |
| `pyranometer.irradiance_2.measurements[]` | Voltage on analog input B1 (min, max, avg, mdn) | mV | 0–3600 | 1 mV |

#### Over LoRaWAN {#chester-meteo-p-data-lorawan}

A LoRaWAN uplink carries the same fields as for [CHESTER Meteo](#data-over-lorawan).

## CHESTER Meteo M {#chester-meteo-m}

**CHESTER Meteo M** is a separate firmware build of CHESTER Meteo for a SenseCAP weather station and a Cubic particulate matter sensor on the RS-485 Modbus of CHESTER-X2 (see its [firmware page](../../firmware/chester-meteo/chester-meteo-m.md)).

### Settings {#settings-chester-meteo-m}

The [**CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md) firmware uses the settings of [CHESTER Meteo](#settings) and these:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `meteo-type` | Meteo type | `none`, `lambrecht`, `sensecap-s1000`, `sensecap-s500` | `none` | Type of the Modbus weather station |
| `meteo-addr` | Meteo addr | `<1-247>` | `1` | Modbus address of the weather station |
| `pm-type` | Pm type | `none`, `cubic-6303` | `none` | Type of the particulate matter sensor |
| `pm-addr` | Pm addr | `<1-247>` | `1` | Modbus address of the particulate matter sensor |

The Modbus line settings are on the [**CHESTER Meteo M firmware**](../../firmware/chester-meteo/chester-meteo-m.md#configuration-parameters) page. Firmware v4.0.1 reads the SenseCAP S500 and S1000 weather stations and the Cubic sensor; it reads the Modbus devices twice at every sample, so keep `interval-aggreg` below 16 times `interval-sample`.

### Data {#data-chester-meteo-m}

The [**CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md) firmware sends the data of [CHESTER Meteo](#data-over-lte) and additionally:

- the `sensecap` and `cubic_pm` structures below, each when its Modbus device is selected

In `weather_station` it sends placeholder values, because CHESTER-X2 takes the place of CHESTER-X0 in slot A.

#### SenseCAP Weather Station {#sensecap}

`sensecap` is sent when `meteo-type` is `sensecap-s500` or `sensecap-s1000`; the keys marked S1000 come only with `sensecap-s1000`. Firmware v4.0.1 adds an entry with `null` values after every real entry and spreads the decoded timestamps over twice the real time (see the firmware page).

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `sensecap.air_temperature.measurements[]` | Air temperature (min, max, avg, mdn) | °C | −40 to 85 | 0.01 °C |
| `sensecap.air_humidity.measurements[]` | Relative humidity (min, max, avg, mdn) | % | 0–100 | 0.01 % |
| `sensecap.barometric_pressure.measurements[]` | Atmospheric pressure (min, max, avg, mdn) | Pa | 30000–125000 | 0.01 Pa |
| `sensecap.wind_direction_avg.measurements[]` | Average wind direction reported by the station (min, max, avg, mdn) | ° | 0–360 | 0.1° |
| `sensecap.wind_speed_avg.measurements[]` | Average wind speed reported by the station (min, max, avg, mdn) | m/s | 0–60 | 0.01 m/s |
| `sensecap.light_intensity.measurements[]` | S1000 only: illuminance (min, max, avg, mdn) | lx | 0–188000 | 1 lx |
| `sensecap.accumulated_rainfall.measurements[]` | S1000 only: accumulated rainfall reported by the station (min, max, avg, mdn) | mm | 0–80000 | 0.01 mm |
| `sensecap.pm2_5.measurements[]`, `sensecap.pm10.measurements[]` | S1000 only: particulate matter PM2.5 and PM10 (min, max, avg, mdn) | µg/m³ | 0–1000 | 0.1 µg/m³ |
| `sensecap.co2.measurements[]` | S1000 only: CO₂ concentration (min, max, avg, mdn) | ppm | 400–5000, extended range up to 10000 | 1 ppm |

#### Cubic Particulate Matter Sensor {#cubic-pm}

`cubic_pm` is sent when `pm-type` is `cubic-6303`; it gets the same extra `null` entries as `sensecap`.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `cubic_pm.tsp.measurements[]` | Total suspended particles, TSP (min, max, avg, mdn) | µg/m³ | 0–1000 (shown up to 30000) | 1 µg/m³ |
| `cubic_pm.pm1_0.measurements[]`, `cubic_pm.pm2_5.measurements[]`, `cubic_pm.pm10.measurements[]` | Particulate matter PM1.0, PM2.5 and PM10 (min, max, avg, mdn) | µg/m³ | 0–1000 (shown up to 30000) | 1 µg/m³ |
| `cubic_pm.gas_flow.measurements[]` | Flow of the sampled gas through the sensor, nominally 1 L/min (min, max, avg, mdn) | L/min | not specified | 0.01 L/min |

#### Over LoRaWAN {#chester-meteo-m-data-lorawan}

A LoRaWAN uplink carries the same fields as for [CHESTER Meteo](#data-over-lorawan); `wind_speed`, `wind_direction` and `rainfall` hold placeholder values, because CHESTER-X2 takes the place of CHESTER-X0 in slot A.

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
