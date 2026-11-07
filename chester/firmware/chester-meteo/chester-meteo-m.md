---
title: CHESTER Meteo M
description: "CHESTER Meteo M firmware: what it changes against the main CHESTER Meteo firmware for a Modbus weather station on the CHESTER-X2 module."
---

# CHESTER Meteo M

**CHESTER Meteo M** is the CHESTER Meteo firmware built for a weather station and a particulate matter sensor connected over RS-485 Modbus RTU. Everything this page does not mention works as described for [**CHESTER Meteo**](index.md).

## Differences from CHESTER Meteo

### Hardware

- Adds **CHESTER-X2** in slot A, the RS-485 interface for the Modbus devices (see [**CHESTER-X2**](../../ordering-codes.md#chester-x2)). It takes the place of the CHESTER-X0 input module, so the analog rain gauge, anemometer and wind vane cannot be connected.
- Reads a **SenseCAP S500** or **SenseCAP S1000** weather station (parameter `meteo-type`).
- Optionally reads a **Cubic** particulate matter sensor on the same bus (parameter `pm-type`).

### Behavior

At every sample, the firmware reads the selected Modbus devices and aggregates their values like the other sensors.

:::caution

Firmware v4.0.1 accepts `meteo-type lambrecht`, but its support for Lambrecht stations is not built in, so it reads no data from them.

:::

### Configuration Parameters

The Modbus parameters exist in every CHESTER Meteo build, but only this firmware uses them:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `meteo-type` | Meteo type | `none`, `lambrecht`, `sensecap-s1000`, `sensecap-s500` | `none` | Type of the weather station; with `none`, no station is read |
| `meteo-addr` | Meteo addr | `<1-247>` | `1` | Modbus address of the weather station |
| `pm-type` | Pm type | `none`, `cubic-6303` | `none` | Type of the particulate matter sensor; with `none`, no sensor is read |
| `pm-addr` | Pm addr | `<1-247>` | `1` | Modbus address of the particulate matter sensor |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `9600` | Baud rate |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even`, `mark`, `space` | `none` | Parity; only `none`, `odd` and `even` work, with `mark` or `space` the Modbus interface does not start |
| `modbus-stop-bits` | Modbus stop bits | `0_5`, `1`, `1_5`, `2` | `1` | Stored but not applied: the firmware uses 1 stop bit with `odd` or `even` parity and 2 stop bits with `none` |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | Stored, but firmware v4.0.1 does not use it; the device addresses are `meteo-addr` and `pm-addr` |

Example: `app config meteo-type sensecap-s500`, then `config save`.

### Commands

| Command | Action |
| :--- | :--- |
| `app modbus` | Print the last values of the Modbus devices |
| `app modbus sample` | Read the Modbus devices now and print the values |
| `app modbus_set_sensecap <current_addr> <new_addr>` | Change the Modbus address of the SenseCAP station; connect only the station, then disconnect and reconnect its power to apply the new address |
| `app modbus_set_cubic <current_addr> <new_addr>` | Change the Modbus address of the Cubic sensor; connect only the sensor |

### Data

With `meteo-type` set to `sensecap-s500` or `sensecap-s1000`, the report adds a `sensecap` structure. Each value in it has `measurements` with a timestamp and the `min`, `max`, `avg` and `mdn` values:

| Key | Value | Unit |
| :--- | :--- | :--- |
| `air_temperature` | Air temperature | °C |
| `air_humidity` | Relative humidity | % |
| `barometric_pressure` | Atmospheric pressure | Pa |
| `wind_direction_avg` | Average wind direction from the station | ° |
| `wind_speed_avg` | Average wind speed from the station | m/s |
| `light_intensity` | Illuminance (S1000 only) | lx |
| `accumulated_rainfall` | Accumulated rainfall (S1000 only) | mm |
| `pm2_5`, `pm10` | Particulate matter PM2.5 and PM10 (S1000 only) | µg/m³ |
| `co2` | CO₂ concentration (S1000 only) | ppm |

With `pm-type cubic-6303`, the report adds a `cubic_pm` structure with the same layout:

| Key | Value | Unit |
| :--- | :--- | :--- |
| `tsp` | Total suspended particles | µg/m³ |
| `pm1_0`, `pm2_5`, `pm10` | Particulate matter PM1.0, PM2.5 and PM10 | µg/m³ |
| `gas_flow` | Flow of the sampled gas through the sensor, nominally 1 L/min | L/min |

The `weather_station` structure of the main firmware stays in the report, but without the CHESTER-X0 module it holds no valid readings. In LoRaWAN mode, the Modbus values are not sent. Every field, with its unit, range and resolution, is described on the catalog page under [**CHESTER Meteo M**](../../catalog-applications/chester-meteo/index.md#data-chester-meteo-m).

:::caution

Firmware v4.0.1 reads the Modbus devices twice at every sample and aggregates their values twice in every aggregation interval. The `sensecap` and `cubic_pm` structures therefore get two entries per interval, the second one without values (`null`), and the decoded timestamps spread them over twice the real time. Every sample stores two readings and an aggregation interval holds at most 32, so keep `interval-aggreg` below 16 times `interval-sample`.

:::

## Firmware Build

- **Firmware:** [hio-chester-meteo-m:v4.0.1](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `0b1d815d983b40118c26ee0e425e9f76`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76/hex), SHA256 `35c4e7659dd8bf5ca27d85afdfa5c3268a3ae4ea9c6c543d33d4e8cd927e7416`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76/bin), SHA256 `05d351f779bba72446641b0a67da55b8a792187bf813769ddbe777f66377a495`
- **Build from the SDK:** `west chester-update meteo --variant "CHESTER Meteo M"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
