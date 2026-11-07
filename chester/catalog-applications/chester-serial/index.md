---
title: CHESTER Serial
description: "CHESTER Serial reads meters and sensors over RS-485 or RS-232 and sends their values over LTE or LoRaWAN: its hardware, variants, settings and data."
---

# CHESTER Serial

**CHESTER Serial** is a universal application for industrial serial communications. It works as a gateway that reads energy meters, an inverter, a flowmeter and sensors over RS-485 or RS-232 and sends their values to the cloud over LTE-M/NB-IoT or LoRaWAN.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER Serial firmware](../../firmware/chester-serial/index.md)** page.

:::

## What It Can Do

- Reads up to 8 Modbus RTU slave devices on an RS-485 multi-drop bus through the [**CHESTER-X2**](../../extension-modules/chester-x2.md) module.
- Connects a single device point to point over RS-232 through the [**CHESTER-X12**](../../extension-modules/chester-x12.md) module.
- Has drivers for energy meters (Carlo Gavazzi, ORNO, Schneider), a SolaX hybrid inverter, a FlowT ultrasonic flowmeter, a Piketronic radon probe, a MicroSENS CO₂ sensor and a Promag RFID card reader.
- Sends the data over LTE (CBOR encoding) or LoRaWAN (compact binary encoding).
- Collects readings from Bluetooth sensor tags.

## Technical Specifications

| Feature | Value |
| :--- | :--- |
| **Operating System** | Zephyr RTOS |
| **Physical Interface** | RS-232 (Module X12), RS-485 (Module X2) |
| **Application Protocols** | Transparent (the device's own protocol), Modbus RTU |
| **Cloud Formats** | CBOR (LTE), Optimized Binary (LoRaWAN) |
| **Power Supply** | External source (6–28 V DC) required |

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Serial RS-485**](#chester-serial-rs-485) | RS-485 interface CHESTER-X2, up to 8 Modbus RTU devices | [CHESTER Serial RS-485](../../firmware/chester-serial/chester-serial-rs485.md) |
| [**CHESTER Serial RS-232**](#chester-serial-rs-232) | RS-232 interface CHESTER-X12, 1 device | [CHESTER Serial RS-232](../../firmware/chester-serial/chester-serial-rs232.md) |

## Both Variants {#model-chester-serial}

Both variants share the hardware base, the settings and the data described in this section; the sections of the variants add what differs.

### Hardware {#hardware}

Both variants use the same mainboard and enclosure and differ in the interface module:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-E2-LP`: Enclosure with SMA pigtail
* `CHESTER-X2` (RS-485 interface module) or `CHESTER-X12` (RS-232 interface module) in slot A, see [Models](#variants)

See [**Ordering Codes**](../../ordering-codes.md) for more details.

:::caution

**CHESTER Serial** requires an external power supply (6–28 V DC) for continuous operation. Sensors and the serial interface are powered continuously.

:::

### Settings {#settings}

These are the settings you usually change for CHESTER Serial: how often the devices are read and reported, the serial line and the devices in the slots. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The full list is on the [**firmware page**](../../firmware/chester-serial/index.md#configuration-parameters).

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | How often the devices and the Bluetooth tags are read, in seconds |
| `interval-report` | Report interval | `<0-86400>` | `1800` | Report interval in seconds; `0` turns the periodic reports off |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag readings in seconds |
| `serial-baudrate` | Serial baudrate | `<1200-115200>` | `9600` | Baud rate |
| `serial-data-bits` | Serial data bits | `<7-9>` | `8` | Data bits; Modbus RTU always uses 8 |
| `serial-parity` | Serial parity | `none`, `odd`, `even` | `none` | Parity |
| `serial-stop-bits` | Serial stop bits | `<1-2>` | `1` | Stop bits |
| `device-0` to `device-7` | Device 0 to Device 7 | `type[,addr[,timeout]]` | `""` | The device in slots 0 to 7: its type, its Modbus address `1`–`247` (required in Modbus mode) and its response timeout in seconds (default `1`); `""` empties the slot |

The serial line settings must match the connected devices. Use each type at most once: the firmware keeps one data buffer per type. The device types, the protocol on the line (`serial-mode`) and the number of devices depend on the variant: see [**CHESTER Serial RS-485**](#chester-serial-rs-485) and [**CHESTER Serial RS-232**](#chester-serial-rs-232). The network mode (`app config mode`: `lte` or `lrw`) is described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

### Data over LTE {#data-over-lte}

CHESTER Serial reads all configured devices every `interval-sample` seconds, the first time 10 seconds after start, and keeps the first 32 samples of each device between two reports, each with its own timestamp. Every `interval-report` seconds, the first time 30 seconds after start, it sends a report with all samples taken since the last report. The `send` command and one press of the mainboard button send a report at once. A card read on the Promag MF7S sends a report at once when `interval-report` is `0`; otherwise the card waits for the next report.

The values of the devices are sent as read: every answer of a device adds one sample, and a value whose reading fails is `null`. The Bluetooth tags are aggregated: each `measurements` entry has `timestamp` and `min`, `max`, `avg`, `mdn` over `interval-aggreg`. The battery is measured 60 seconds after start and then every 12 hours; until the first measurement, the battery values are `0`.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER Serial sends `message.version` `2`.

In addition to the common data, CHESTER Serial sends:

- [`attribute`](#attribute): the identification of the device as text
- [`devices`](#devices): one entry for each configured slot, with the samples of its device; the keys of a sample depend on the device type, and the device types on the variant
- [`ble_tags`](#bluetooth-tags): the readings of the enrolled Bluetooth tags, aggregated over `interval-aggreg`

#### Device Identification {#attribute}

Every report carries `attribute` with the identification of the device as text: `vendor_name`, `product_name`, `hw_variant`, `hw_revision`, `fw_version` and `serial_number`.

#### Devices {#devices}

The `devices` list has one entry for each configured slot:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].device` | Slot number (`device-0` to `device-7`) | | 0–7 | 1 |
| `devices[].type` | Device type as a number: `5` `microsens_180hs`, `6` `or_we_504`, `7` `em1xx`, `8` `or_we_516`, `9` `em5xx`, `10` `iem3000`, `11` `promag_mf7s`, `12` `flowt_ft201`, `13` `piketronic`, `14` `solax_g3` | | 1–14 | 1 |
| `devices[].type_name` | Device type as text, for example `em1xx` | | | |
| `devices[].addr` | Modbus address from the slot; `0` when the slot gives the type alone | | 0–247 | 1 |
| `devices[].data[].timestamp` | Time of the sample (Unix time) | s | | 1 s |

`data` holds the samples taken since the last report and appears when there is at least one. For the types `sensecap_s1000` (`1`), `cubic_6303` (`2`), `lambrecht` (`3`) and `generic` (`4`), firmware v4.0.1 sends the entry with `device`, `type`, `type_name` and `addr`. The other keys in `devices[].data[]` depend on the device type, and the device types depend on the variant: see [**CHESTER Serial RS-485**](#chester-serial-rs-485) and [**CHESTER Serial RS-232**](#chester-serial-rs-232).

#### Bluetooth Tags

Sent in every report: one entry for each enrolled Teltonika EYE tag, up to 8 (see [**BLE Tags**](../ble-tags.md)); the list is empty until a tag is enrolled.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetooth address of the tag | | | |
| `ble_tags[].rssi` | Signal strength of the tag | dBm | | 1 dBm |
| `ble_tags[].voltage` | Battery voltage of the tag | V | 2.00–4.55 | 0.01 V |
| `ble_tags[].temperature.measurements[]` | Temperature measured by the tag: `timestamp` and `min`, `max`, `avg`, `mdn` | °C | −20 to 60 | 0.01 °C |
| `ble_tags[].humidity.measurements[]` | Relative humidity measured by the tag: `timestamp` and `min`, `max`, `avg`, `mdn` | % | 0–100 | 1 %; `avg` 0.01 % |

### Data over LoRaWAN {#data-over-lorawan}

In LoRaWAN mode, the device sends one uplink at every report for each configured device of the types `5` to `14`, one second apart. An uplink has 51 bytes at most and carries the latest values of one device. The ChirpStack/TTN decoder `codec/cs-decoder.js` of the application in the CHESTER SDK outputs these fields for every device; the keys in `device.data` depend on the device type and are listed in the variant sections.

Every uplink carries the common LoRaWAN fields described in [**Common Functionality**](../common-functionality.md#common-data-lorawan) and the fields in the table below.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `version` | Version of the payload format | | `1` | |
| `device_index` | Slot number (`device-0` to `device-7`) | | 0–7 | 1 |
| `device.type` | Device type as a number, as `devices[].type` over LTE | | 5–14 | 1 |
| `device.type_name` | Device type as text, for example `em1xx` | | | |
| `device.addr` | Modbus address from the slot; `0` when the slot gives the type alone | | 0–247 | 1 |
| `device.status`, `device.valid`, `device.error` | Status of the reading; firmware v4.0.1 always sends `1`, so `valid` is `true` and `error` is `false` | | `1` | |

Float16 is a 16-bit floating-point number with 11 significant bits, about three significant digits: around 230 V it moves in steps of 0.125 V, and above 32 768 in steps of 32. It holds values up to 65 504. A Float16 value is `NaN`, which JSON shows as `null`, when the last reading of the device failed.

## CHESTER Serial RS-485 {#chester-serial-rs-485}

The variant with the **CHESTER-X2** extension module, for a standard industrial bus with several devices connected in a daisy chain:

* **Interface:** RS-485 with a common ground
* **Topology:** Multi-drop bus
* **Capacity:** Up to 8 Modbus RTU slave devices

It runs the **[CHESTER Serial RS-485 firmware](../../firmware/chester-serial/chester-serial-rs485.md)**.

### Hardware {#chester-serial-rs-485-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-X2`: RS-485 interface module
* `CHESTER-X10`: External power input (6–28 V DC)
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

### Settings {#chester-serial-rs-485-settings}

CHESTER Serial RS-485 uses the settings of [CHESTER Serial](#settings) with Modbus RTU: set `serial-mode` to `modbus` and give each device in `device-0` to `device-7` its Modbus address, for up to 8 devices on one bus. The devices on one RS-485 bus share the line settings, so all of them must use the same baud rate, parity and stop bits. Most supported devices ship at 9600 baud, the firmware default; the SolaX X3-Hybrid G3 uses 115 200 baud and the Piketronic RPP-R 19 200 baud with even parity.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `serial-mode` | Serial mode | `transparent`, `modbus` | `transparent` | Protocol on the serial line: `modbus` for the Modbus RTU devices |

The slots `device-0` to `device-7` take these device types, each with its Modbus address:

| Type | Device | Interface |
| :--- | :--- | :--- |
| `em1xx` | Carlo Gavazzi EM1XX single-phase energy meter | RS-485, Modbus RTU |
| `em5xx` | Carlo Gavazzi EM5XX three-phase energy meter | RS-485, Modbus RTU |
| `or_we_504` | ORNO OR-WE-504 single-phase energy meter | RS-485, Modbus RTU |
| `or_we_516` | ORNO OR-WE-516 three-phase energy meter | RS-485, Modbus RTU |
| `iem3000` | Schneider iEM3000 three-phase energy meter | RS-485, Modbus RTU |
| `flowt_ft201` | FlowT FT201 ultrasonic flowmeter | RS-485, Modbus RTU |
| `piketronic` | Piketronic RPP-R radon probe | RS-485, Modbus RTU |
| `solax_g3` | SolaX X3-Hybrid G3 hybrid inverter | RS-485, Modbus RTU |

### Data {#chester-serial-rs-485-data}

CHESTER Serial RS-485 sends the data of [CHESTER Serial](#data-over-lte) for these device types:

- [Carlo Gavazzi EM1XX](#carlo-gavazzi-em1xx) (`em1xx`)
- [Carlo Gavazzi EM5XX](#carlo-gavazzi-em5xx) (`em5xx`)
- [ORNO OR-WE-504](#orno-or-we-504) (`or_we_504`)
- [ORNO OR-WE-516](#orno-or-we-516) (`or_we_516`)
- [Schneider iEM3000](#schneider-iem3000) (`iem3000`)
- [FlowT FT201](#flowt-ft201) (`flowt_ft201`)
- [Piketronic RPP-R](#piketronic-rpp-r) (`piketronic`)
- [SolaX X3-Hybrid G3](#solax-x3-hybrid-g3) (`solax_g3`)

The power, power factor and energy values of the energy meters travel as 32-bit floating-point numbers, which keep about seven significant digits; the resolution in the tables applies within those seven digits. `float32` in the Resolution column marks a value that the meter itself delivers as such a number.

#### Carlo Gavazzi EM1XX

Sent for an `em1xx` device. The ranges are those of the EM111: the model for direct connection (`AV8`, up to 45 A) and the model for a current transformer (`AV5`, 5 A secondary, transformer ratio up to 60). In its default measurement mode A, the meter reports every value as positive; measurement mode B reports export with negative values and counts exported energy in `energy_out`.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage` | Voltage between phase and neutral | V | 161–276 | 0.1 V |
| `devices[].data[].current` | Current | A | 0–45 (`AV8`), 0–360 (`AV5`) | 0.001 A |
| `devices[].data[].power` | Active power | kW | as reported by the meter | 0.0001 kW |
| `devices[].data[].power_apparent` | Apparent power | kVA | as reported by the meter | 0.0001 kVA |
| `devices[].data[].power_reactive` | Reactive power | kvar | as reported by the meter | 0.0001 kvar |
| `devices[].data[].power_factor` | Power factor | | −1 to 1 | 0.001 |
| `devices[].data[].frequency` | Frequency | Hz | 45–65 | 0.1 Hz |
| `devices[].data[].energy_in` | Imported active energy, total | kWh | 0–9999999 | 0.1 kWh |
| `devices[].data[].energy_out` | Exported active energy, total | kWh | 0–9999999 | 0.1 kWh |

#### Carlo Gavazzi EM5XX

Sent for an `em5xx` device. The ranges are those of the EM540 (direct connection, up to 65 A) and the EM530 (current transformers with a 5 A secondary, ratio up to 2000, primary current up to 10 kA; it reports primary values). In the default measurement mode A, the power is always positive; measurement modes B and C report export with negative values and count exported energy in `energy_out`.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` | Voltage between each phase and neutral | V | 96–276 | 0.1 V |
| `devices[].data[].current_l1`, `current_l2`, `current_l3` | Current of each phase | A | 0–65 (EM540), 0–10000 (EM530) | 0.001 A |
| `devices[].data[].current` | Neutral current (the meter's register `An`) | A | as reported by the meter | 0.001 A |
| `devices[].data[].power_l1`, `power_l2`, `power_l3` | Active power of each phase | kW | as reported by the meter | 0.0001 kW |
| `devices[].data[].power` | Total active power | kW | as reported by the meter | 0.0001 kW |
| `devices[].data[].power_apparent` | Total apparent power | kVA | as reported by the meter | 0.0001 kVA |
| `devices[].data[].power_reactive` | Total reactive power | kvar | as reported by the meter | 0.0001 kvar |
| `devices[].data[].power_factor` | Total power factor | | −1 to 1 | 0.001 |
| `devices[].data[].power_factor_l1`, `power_factor_l2`, `power_factor_l3` | Power factor of each phase | | −1 to 1 | 0.001 |
| `devices[].data[].frequency` | Frequency | Hz | 45–65 | 0.1 Hz |
| `devices[].data[].energy_in` | Imported active energy, total | kWh | 0–99999999.9 | 0.1 kWh |
| `devices[].data[].energy_out` | Exported active energy, total | kWh | 0–99999999.9 | 0.1 kWh |

#### ORNO OR-WE-504

Sent for an `or_we_504` device. The OR-WE-504 is rated 230 V, 50 Hz, 5(80) A and measures imported energy.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage` | Voltage | V | as reported by the meter | 0.1 V |
| `devices[].data[].current` | Current | A | 0–80 | 0.1 A |
| `devices[].data[].power` | Active power | kW | as reported by the meter | 0.001 kW |
| `devices[].data[].power_apparent` | Apparent power | kVA | as reported by the meter | 0.001 kVA |
| `devices[].data[].power_reactive` | Reactive power | kvar | as reported by the meter | 0.001 kvar |
| `devices[].data[].power_factor` | Power factor | | −1 to 1 | 0.001 |
| `devices[].data[].frequency` | Frequency | Hz | as reported by the meter | 0.1 Hz |
| `devices[].data[].energy_in` | Imported active energy, total | kWh | 0–4294967.295 | 0.001 kWh |

#### ORNO OR-WE-516

Sent for an `or_we_516` device. The OR-WE-516 is rated 3 × 230/400 V, 50 Hz, 5(80) A and delivers all values as 32-bit floating-point numbers.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` | Voltage of each phase | V | as reported by the meter | 0.01 V |
| `devices[].data[].current_l1`, `current_l2`, `current_l3` | Current of each phase | A | 0–80 | 0.001 A |
| `devices[].data[].power_l1`, `power_l2`, `power_l3` | Active power of each phase | kW | as reported by the meter | float32 |
| `devices[].data[].power` | Total active power | kW | as reported by the meter | float32 |
| `devices[].data[].power_apparent` | Total apparent power | kVA | as reported by the meter | float32 |
| `devices[].data[].power_reactive` | Total reactive power | kvar | as reported by the meter | float32 |
| `devices[].data[].power_factor` | Total power factor | | −1 to 1 | float32 |
| `devices[].data[].power_factor_l1`, `power_factor_l2`, `power_factor_l3` | Power factor of each phase | | −1 to 1 | float32 |
| `devices[].data[].frequency` | Frequency | Hz | as reported by the meter | 0.01 Hz |
| `devices[].data[].energy` | Total active energy | kWh | 0–999999.99 | float32 |
| `devices[].data[].energy_in` | Imported (forward) active energy | kWh | 0–999999.99 | float32 |
| `devices[].data[].energy_out` | Exported (reverse) active energy | kWh | 0–999999.99 | float32 |

#### Schneider iEM3000

Sent for an `iem3000` device. The ranges are those of the iEM3100, iEM3200 and iEM3300 series: 100–277 V between phase and neutral ±20 %, 50/60 Hz ±10 %, up to 63 A (iEM3150, iEM3155) or 125 A (iEM3350, iEM3355), or a current transformer with a primary current up to 32 767 A (iEM3250, iEM3255). The iEM3155, iEM3255 and iEM3355 also measure the apparent and reactive power and the exported energy. The meter delivers its values as 32-bit floating-point numbers and the energies in Wh; the iEM3200 series counts energy up to 99 999 999 MWh, the other two up to 99 999 999.9 kWh.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` | Voltage between each phase and neutral | V | 80–332 | 0.01 V |
| `devices[].data[].current_l1`, `current_l2`, `current_l3` | Current of each phase | A | 0–63 (iEM3150, iEM3155), 0–125 (iEM3350, iEM3355) | 0.001 A |
| `devices[].data[].power_l1`, `power_l2`, `power_l3` | Active power of each phase; negative when the power flows from the load to the source | kW | as reported by the meter | float32 |
| `devices[].data[].power` | Total active power | kW | as reported by the meter | float32 |
| `devices[].data[].power_apparent` | Total apparent power | kVA | as reported by the meter | float32 |
| `devices[].data[].power_reactive` | Total reactive power | kvar | as reported by the meter | float32 |
| `devices[].data[].power_factor` | Total power factor in the meter's four-quadrant encoding: a value from −1 to 1 is the power factor; above 1 the power factor is 2 minus the value, below −1 it is −2 minus the value | | −2 to 2 | float32 |
| `devices[].data[].frequency` | Frequency | Hz | 45–66 | 0.01 Hz |
| `devices[].data[].energy_in` | Imported active energy, total | kWh | 0–99999999.9 (iEM3100, iEM3300) | 0.001 kWh |
| `devices[].data[].energy_out` | Exported active energy, total | kWh | 0–99999999.9 (iEM3100, iEM3300) | 0.001 kWh |

#### FlowT FT201

Sent for a `flowt_ft201` device. The flowmeter sends its values in the units set in its own menu: volume in m³ by default (the keys then hold m³/s, m³/min and m³/h), energy in GJ, kWh or another unit. The flow range follows from the velocity range and the pipe size (DN25 to DN1200). The energy version of the flowmeter measures the temperatures with Pt1000 sensors.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].flow_s` | Flow per second | m³/s | from velocity and pipe size | 0.0001 m³/s |
| `devices[].data[].flow_m` | Flow per minute | m³/min | from velocity and pipe size | 0.0001 m³/min |
| `devices[].data[].flow_h` | Flow per hour | m³/h | from velocity and pipe size | 0.0001 m³/h |
| `devices[].data[].velocity` | Flow velocity | m/s | −5 to 5 | 0.0001 m/s |
| `devices[].data[].total_positive`, `total_negative`, `total_net` | Total volume in the positive and in the negative direction, and their difference | m³ | as reported by the flowmeter | 0.001 m³ |
| `devices[].data[].energy_hot`, `energy_cold` | Total heating and cooling energy | set in the flowmeter | as reported by the flowmeter | 0.001 of the unit |
| `devices[].data[].temp_inlet`, `temp_outlet` | Inlet and outlet temperature | °C | −40 to 80, −40 to 130 (high-temperature sensors) | 0.01 °C |
| `devices[].data[].signal_quality` | Signal quality; normally above 60 | | 0–99 | 1 |

#### Piketronic RPP-R

Sent for a `piketronic` device.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].radon_concentration` | Radon concentration, moving average over 1 hour | Bq/m³ | 100–100000 | 1 Bq/m³ |
| `devices[].data[].radon_concentration_day` | Radon concentration, moving average over 1 day | Bq/m³ | 20–100000 | 1 Bq/m³ |
| `devices[].data[].temperature` | Temperature in the measuring chamber of the probe | °C | −40 to 125 | 1 °C |
| `devices[].data[].humidity` | Relative humidity in the measuring chamber of the probe | % | 0–100 | 1 % |

#### SolaX X3-Hybrid G3

Sent for a `solax_g3` device. The ranges are those of the X3-Hybrid-10.0, the largest model of the series: recommended DC power up to 8000 W on PV input 1 and 5000 W on PV input 2; the smaller models have lower limits.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].pv1_power` | Power of PV input 1 | W | 0–8000 | 1 W |
| `devices[].data[].pv2_power` | Power of PV input 2 | W | 0–5000 | 1 W |
| `devices[].data[].bat_power` | Battery power | W | as reported by the inverter | 1 W |
| `devices[].data[].bat_temp` | Battery temperature | °C | as reported by the inverter | 1 °C |
| `devices[].data[].bat_soc` | Battery state of charge | % | 0–100 | 1 % |
| `devices[].data[].feedin_power` | Power at the grid connection: positive when it flows into the grid, negative when it is taken from the grid | W | as reported by the inverter | 1 W |
| `devices[].data[].feedin_energy` | Energy fed into the grid, total | kWh | 0–21474836.47 | 0.01 kWh |
| `devices[].data[].consume_energy` | Energy taken from the grid, total | kWh | 0–21474836.47 | 0.01 kWh |
| `devices[].data[].eps_power_l1`, `eps_power_l2`, `eps_power_l3` | Active power of the EPS (backup) output in each phase | W | as reported by the inverter | 1 W |

#### Over LoRaWAN {#chester-serial-rs-485-data-lorawan}

The uplink of a device of these types carries these keys in `device.data`; the other fields and Float16 are described under [Data over LoRaWAN](#data-over-lorawan):

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `device.data.voltage` | Voltage (`em1xx`, `or_we_504`) | V | as over LTE | Float16 |
| `device.data.current` | Current (`em1xx`, `or_we_504`) | A | as over LTE | Float16 |
| `device.data.power` | Active power (`em1xx`, `or_we_504`) | kW | as over LTE | Float16 |
| `device.data.voltage_l1`, `voltage_l2`, `voltage_l3` | Voltage of each phase (`em5xx`, `or_we_516`, `iem3000`) | V | as over LTE | Float16 |
| `device.data.current_l1`, `current_l2`, `current_l3` | Current of each phase (`em5xx`, `or_we_516`, `iem3000`) | A | as over LTE | Float16 |
| `device.data.power_l1`, `power_l2`, `power_l3` | Active power of each phase (`em5xx`, `or_we_516`, `iem3000`) | kW | as over LTE | Float16 |
| `device.data.power_total` | Total active power (`em5xx`, `or_we_516`, `iem3000`) | kW | as over LTE | Float16 |
| `device.data.frequency` | Frequency (all energy meters) | Hz | as over LTE | Float16 |
| `device.data.energy_in` | Imported active energy (`em1xx`, `em5xx`, `iem3000`); for `or_we_504`, firmware v4.0.1 sends the value divided by 1000, that is in MWh | kWh | 0–65504 | Float16 |
| `device.data.energy` | Imported active energy (`or_we_516`) | kWh | 0–65504 | Float16 |
| `device.data.energy_out` | Exported active energy; always `0` for `or_we_504` | kWh | 0–65504 | Float16 |
| `device.data.flow_h` | Flow (`flowt_ft201`) | m³/h | as over LTE | Float16 |
| `device.data.velocity` | Flow velocity (`flowt_ft201`) | m/s | as over LTE | Float16 |
| `device.data.temp_inlet`, `temp_outlet` | Inlet and outlet temperature (`flowt_ft201`) | °C | as over LTE | Float16 |
| `device.data.energy_hot`, `energy_cold` | Total heating and cooling energy (`flowt_ft201`) | set in the flowmeter | 0–65504 | Float16 |
| `device.data.signal_quality` | Signal quality (`flowt_ft201`); `null` when the last reading failed | | 0–99 | 1 |
| `device.data.radon_concentration`, `radon_concentration_day` | Radon concentration, 1-hour and 1-day average (`piketronic`) | Bq/m³ | as over LTE | Float16 |
| `device.data.humidity` | Relative humidity (`piketronic`) | % | as over LTE | Float16 |
| `device.data.temperature` | Temperature (`piketronic`) | °C | as over LTE | Float16 |
| `device.data.pv1_power`, `pv2_power` | Power of PV input 1 and 2 (`solax_g3`) | W | as over LTE | Float16 |
| `device.data.bat_power` | Battery power (`solax_g3`) | W | as over LTE | Float16 |
| `device.data.bat_temp` | Battery temperature (`solax_g3`) | °C | as over LTE | Float16 |
| `device.data.bat_soc` | Battery state of charge (`solax_g3`) | % | as over LTE | Float16 |
| `device.data.feedin_power` | Power at the grid connection (`solax_g3`) | W | as over LTE | Float16 |
| `device.data.feedin_energy`, `consume_energy` | Energy fed into and taken from the grid, totals (`solax_g3`) | kWh | 0–65504 | Float16 |
| `device.data.eps_power_l1`, `eps_power_l2`, `eps_power_l3` | Active power of the EPS output in each phase (`solax_g3`) | W | as over LTE | Float16 |

## CHESTER Serial RS-232 {#chester-serial-rs-232}

The variant with the **CHESTER-X12** extension module, for a point-to-point link with a single peripheral device, legacy equipment or a sensor that needs a direct serial line:

* **Interface:** RS-232 with a common ground
* **Topology:** Point-to-point connection
* **Capacity:** Single device (1:1 connection)

It runs the **[CHESTER Serial RS-232 firmware](../../firmware/chester-serial/chester-serial-rs232.md)**, which works with the MicroSENS 180-HS CO₂ sensor and the Promag MF7S RFID reader.

### Hardware {#chester-serial-rs-232-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-X12`: RS-232 interface module
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

### Settings {#chester-serial-rs-232-settings}

CHESTER Serial RS-232 connects one device in `device-0` and uses `serial-mode transparent`, with the settings of [CHESTER Serial](#settings). Set the serial line to the device: the Promag MF7S uses 19 200 baud and the MicroSENS 180-HS 9600 baud, both with 8 data bits, parity `none` and 1 stop bit.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `serial-mode` | Serial mode | `transparent`, `modbus` | `transparent` | Protocol on the serial line: `transparent` for the devices with their own protocol |

The slot `device-0` takes one of these device types:

| Type | Device | Interface |
| :--- | :--- | :--- |
| `microsens_180hs` | MicroSENS 180-HS CO₂ sensor | RS-232, transparent mode |
| `promag_mf7s` | Promag MF7S RFID card reader | RS-232, transparent mode |

### Data {#chester-serial-rs-232-data}

CHESTER Serial RS-232 sends the data of [CHESTER Serial](#data-over-lte) for these device types:

- [MicroSENS 180-HS](#microsens-180-hs) (`microsens_180hs`)
- [Promag MF7S](#promag-mf7s) (`promag_mf7s`)

#### MicroSENS 180-HS

Sent for a `microsens_180hs` device.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].co2_percent` | CO₂ concentration | Vol.-% | 0–20 | 0.001 Vol.-% |
| `devices[].data[].temperature` | Temperature of the sensor, used for its internal compensation | °C | −20 to 250 | 0.1 °C |
| `devices[].data[].pressure` | Air pressure measured by the sensor | mbar | 600–1200 | 1 mbar |

#### Promag MF7S

Sent for a `promag_mf7s` device: one sample for each card presented to the reader.

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].card_uid` | UID of the card: the 8 hexadecimal digits the reader sends, as a number | | 0–4294967295 | |

#### Over LoRaWAN {#chester-serial-rs-232-data-lorawan}

The uplink of a device of these types carries these keys in `device.data`, and the Promag MF7S sends an uplink after every card read; the other fields and Float16 are described under [Data over LoRaWAN](#data-over-lorawan):

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `device.data.co2_percent` | CO₂ concentration (`microsens_180hs`) | Vol.-% | as over LTE | 0.1 Vol.-% |
| `device.data.temperature` | Temperature (`microsens_180hs`) | °C | as over LTE | 0.1 °C |
| `device.data.pressure` | Air pressure (`microsens_180hs`) | mbar | as over LTE | 1 mbar |
| `device.data.uid`, `uid_hex` | UID of the last card (`promag_mf7s`) as a number and as 8 hexadecimal digits; `null` before the first card | | 0–4294967295 | |
| `device.data.timestamp` | Time of the last card read (`promag_mf7s`, Unix time) | s | | 1 s |
| `device.data.total_reads` | Card reads since the device started (`promag_mf7s`) | | 0–65535 | 1 |

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
