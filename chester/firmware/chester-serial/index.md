---
title: CHESTER Serial
description: "Firmware of the CHESTER Serial catalog application: serial line and device settings, the device drivers, commands and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Serial

The **CHESTER Serial** firmware turns CHESTER into a gateway for devices with a serial interface. It reads energy meters, sensors and other devices over Modbus RTU or over their own serial protocol and sends the readings to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

The firmware is built in two variants, one for each serial interface: [**CHESTER Serial RS-485**](chester-serial-rs485.md) and [**CHESTER Serial RS-232**](chester-serial-rs232.md). This page describes what both variants share; their own pages list only what differs.

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md) catalog page.

## Supported Hardware

The firmware works with:

- one serial interface module in slot A: **CHESTER-X2** (RS-485) in the RS-485 variant or **CHESTER-X12** (RS-232) in the RS-232 variant
- the devices listed in [Supported Devices](#supported-devices)
- Bluetooth sensor tags (see [**BLE Tags**](../../catalog-applications/ble-tags.md))

## Supported Devices

The firmware has a driver for each of these devices. Each device goes into one of the slots `device-0` to `device-7` as its type, followed by its Modbus address for a Modbus device (see [Device Slots](#device-slots)):

| Device | Type and address | Interface | Measurements |
| :--- | :--- | :--- | :--- |
| **MicroSENS 180-HS** | `microsens_180hs` | RS-232, own protocol | CO₂ concentration (Vol.-%), temperature, pressure |
| [**Promag MF7S**](../../supported-devices/serial-devices/promag-mf7s.md) | `promag_mf7s` | RS-232, own protocol | UID of every RFID card presented to the reader |
| [**Carlo Gavazzi EM1XX**](../../supported-devices/modbus/carlo-gavazzi-em1xx-series.md) | `em1xx,<addr>` | RS-485, Modbus RTU | Single-phase: voltage, current, active, apparent and reactive power, power factor, frequency, imported and exported energy |
| [**Carlo Gavazzi EM5XX**](../../supported-devices/modbus/carlo-gavazzi-em5xx-series.md) | `em5xx,<addr>` | RS-485, Modbus RTU | Three-phase: voltage, current, power and power factor per phase; neutral current; total active, apparent and reactive power, power factor, frequency, imported and exported energy |
| [**ORNO OR-WE-504**](../../supported-devices/modbus/orno-or-we-504.md) | `or_we_504,<addr>` | RS-485, Modbus RTU | Single-phase: voltage, current, active, apparent and reactive power, power factor, frequency, imported energy |
| [**ORNO OR-WE-516**](../../supported-devices/modbus/orno-or-we-516.md) | `or_we_516,<addr>` | RS-485, Modbus RTU | Three-phase: voltage, current, power and power factor per phase; total active, apparent and reactive power, power factor, frequency, total, imported and exported energy |
| [**Schneider iEM3000**](../../supported-devices/modbus/schneider-electric-iem3xxx-series.md) | `iem3000,<addr>` | RS-485, Modbus RTU | Three-phase: voltage, current and power per phase; total active, apparent and reactive power, power factor, frequency, imported and exported energy |
| **FlowT FT201** | `flowt_ft201,<addr>` | RS-485, Modbus RTU | Ultrasonic flowmeter: flow, flow velocity, positive, negative and net total, heating and cooling energy, inlet and outlet temperature, signal quality |
| [**Piketronic RPP-R**](../../supported-devices/modbus/piketronic-rpp-r.md) | `piketronic,<addr>` | RS-485, Modbus RTU | Radon concentration (Bq/m³, 1-hour and 1-day average), temperature, humidity |
| **SolaX X3-Hybrid G3** | `solax_g3,<addr>` | RS-485, Modbus RTU | Hybrid inverter: power of both PV strings, battery power, temperature and state of charge, feed-in power, fed-in and consumed energy, EPS power per phase |

The RS-232 devices need the RS-232 variant and transparent mode, the Modbus RTU devices the RS-485 variant and Modbus mode.

:::tip

You can also use short aliases for some device types: `microsens`, `sensecap`, `cubic`, `em111`, `em540`, `promag`, `flowt` and `solax`.

:::

:::caution

The firmware keeps one data buffer for each device type. Connect at most one device of each type: the readings of two devices of the same type would end up mixed together.

:::

The firmware also accepts the types `sensecap_s1000` (SenseCAP S1000/S500 weather sensor), `cubic_6303` (CUBIC 6303 particulate matter sensor), `lambrecht` (Lambrecht weather station) and `generic` (any Modbus device), but version v4.0.1 has no driver for them. In Modbus mode it reads the SenseCAP S1000, the CUBIC 6303 and the first ten input registers of a generic device and only prints the values to the log; it does not read the Lambrecht station at all and sends no measurements of any of these types. The Lambrecht and SenseCAP weather stations and the CUBIC 6303 sensor are read by the M variant of [**CHESTER Meteo**](../../catalog-applications/chester-meteo/index.md).

## Measurement and Behavior

- All configured devices, the internal thermometer and the accelerometer are **sampled** with a configurable period (parameter `interval-sample`), the first time 10 seconds after start.
- Each device keeps up to 32 samples, each with its own timestamp. Samples over this limit are dropped until the next report.
- The samples are sent in a batch every report interval (parameter `interval-report`), the first time 30 seconds after start. The reports go out at exactly this interval, without the random jitter described in [**Common Functionality**](../../catalog-applications/common-functionality.md#report-interval-jitter).
- With `interval-report` set to `0`, the device sends no periodic reports after the first one, only on request (the `send` command or the button) and after each card read on the Promag MF7S.
- Bluetooth tags are sampled with the same period and aggregated over the aggregation interval (parameter `interval-aggreg`): minimum, maximum, average and median.
- The battery is measured 60 seconds after start and then every 12 hours; the first report, 30 seconds after start, carries `0` as the battery values.

### Modbus RTU Mode

In Modbus mode (`serial-mode modbus`), CHESTER acts as the Modbus RTU Master and reads all configured slave devices one after another at every sample:

* Up to **8 devices** can be configured simultaneously on the RS-485 bus, each with its own Modbus address (1–247).
* The serial line uses `serial-baudrate`, `serial-parity` and `serial-stop-bits`; Modbus RTU always uses 8 data bits.
* One response timeout applies to the whole bus: the longest `timeout` of the configured devices.
* The drivers and the `modbus` commands use the Modbus functions 03 (read holding registers), 04 (read input registers) and 06 (write single register).

### Transparent Mode

In transparent mode (`serial-mode transparent`, the default), the serial line carries the device's own protocol instead of Modbus RTU. The firmware opens the line with the configured parameters for the device driver and for the `serial` commands:

* Only one device can be connected (`device-0` slot only).
* The device driver decodes the data, and only the decoded values are sent. Firmware v4.0.1 does not forward raw serial data to the cloud.
* Useful for devices with their own protocol (MicroSENS 180-HS, Promag MF7S) and for testing a serial link with the `serial send` and `serial recv` commands.

### LoRaWAN

In LoRaWAN mode (`mode lrw`), the firmware sends one uplink for each configured device at every report, one second apart:

* Each uplink has 51 bytes at most: a header with the slot number, the system data (battery voltage and current, orientation, internal temperature) and the latest values of the device.
* Most device values are encoded as **Float16**, see [Example JSON Message](#example-json-message).
* The Promag MF7S reader sends an uplink after every card read.
* Devices of the types without a driver are not sent.

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag readings in seconds |
| `interval-report` | Report interval | `<0-86400>` | `1800` | Report interval in seconds; `0` turns the periodic reports off |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Polling interval for downlink messages from HARDWARIO Cloud in seconds; firmware v4.0.1 stores the value but does not use it |
| `serial-mode` | Serial mode | `transparent`, `modbus` | `transparent` | Protocol on the serial line: the device's own protocol or Modbus RTU |
| `serial-baudrate` | Serial baudrate | `<1200-115200>` | `9600` | Baud rate |
| `serial-data-bits` | Serial data bits | `<7-9>` | `8` | Data bits; Modbus RTU always uses 8 |
| `serial-parity` | Serial parity | `none`, `odd`, `even` | `none` | Parity |
| `serial-stop-bits` | Serial stop bits | `<1-2>` | `1` | Stop bits |
| `device-0` to `device-7` | Device 0 to Device 7 | `type[,addr[,timeout]]` | `""` | Device in slots 0 to 7, see [Device Slots](#device-slots) |

Both variants have the same parameters. The RS-232 variant takes one device only, so it uses just `device-0`.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration).

### Device Slots

Configure device slots 0–7 using the format `type[,addr[,timeout]]`:

```
app config device-<n> "<type>,<addr>,<timeout>"
```

Where:
* `n`: device slot index (0–7)
* `type`: device type string (see [Supported Devices](#supported-devices))
* `addr`: Modbus slave address (1–247), required in Modbus mode
* `timeout`: response timeout in seconds (default: 1)

**Example configurations:**

```
# Gavazzi EM111 single-phase meter at address 1
app config device-0 "em1xx,1,1"

# ORNO OR-WE-516 three-phase meter at address 2
app config device-1 "or_we_516,2,1"

# Schneider iEM3000 at address 10 with 3s timeout
app config device-2 "iem3000,10,3"

# MicroSENS CO2 sensor (RS-232, no address needed)
app config device-0 "microsens_180hs"

# Clear a device slot
app config device-3 ""
```

:::tip

In Modbus mode, the Modbus slave address is required for all devices. In transparent mode, only `device-0` can be configured.

:::

## Commands

You can easily explore the whole command tree structure. Start with the `help` command.

| Command | Action |
| :--- | :--- |
| `sample` | Sample all devices and sensors now |
| `send` | Send the data now |
| `device list` | List the configured devices with their type, address and timeout |
| `device sample <0-7>` | Read the device in the given slot now and print its values |
| `device reset <0-7>` | Reset the device in the given slot; only the MicroSENS 180-HS supports it |
| `device <type> sample <addr>` | Read the Modbus device of this type at the given address and print its values |
| `device microsens_180hs sample` | Read the MicroSENS 180-HS sensor and print its values |
| `device microsens_180hs calibrate zero [value]` | Zero-point calibration in a known CO₂ atmosphere; `value` is the CO₂ concentration in Vol.-% × 1000, `0`–`500`, default `40` (0.04 %) |
| `device microsens_180hs reset` | Soft reset of the sensor |
| `device or_we_504 config <old_addr> <new_addr>` | Write a new Modbus address to the meter |
| `device flowt_ft201 config <current_addr> <new_addr>` | Write a new Modbus address to the flowmeter |
| `device flowt_ft201 read_info <addr>` | Print the serial number and the instrument address of the flowmeter |
| `device solax_g3 service <addr>` | Read the service registers of the inverter (PV and battery voltages and currents, grid values per phase, BMS state, faults) and print them |
| `device promag_mf7s read_info` | Print the firmware version and the device name of the reader |
| `device promag_mf7s notify` | Beep and flash the LEDs of the reader |
| `device promag_mf7s sampling [timeout_s]` | Print the UID of every card presented, without storing it; stops after `timeout_s` seconds without a card (default 10) |
| `modbus read <slave> <addr> <count> [holding\|input]` | Read up to 32 registers (input registers unless `holding` is given) and print them |
| `modbus write <slave> <addr> <value>` | Write a value to one holding register |
| `modbus sample` | Read the devices of the types `sensecap_s1000`, `cubic_6303` and `generic` and print their values to the log |
| `serial send <hex> [timeout_s]` | Send bytes given in hex on the serial line and print the response |
| `serial recv [timeout_s]` | Print the bytes received on the serial line |

The `config` subcommand of the other device types only changes the address the driver uses until the next sample; set the address in the device slot instead. Reading a Modbus device (the `modbus` commands and `device <type> sample <addr>`) needs Modbus mode with at least one device configured; the `serial` commands need transparent mode with a device in `device-0`.

## Firmware Build

There is no common build: download or build the variant for your interface, [**CHESTER Serial RS-485**](chester-serial-rs485.md#firmware-build) or [**CHESTER Serial RS-232**](chester-serial-rs232.md#firmware-build).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-serial/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

The report has one entry in `devices` for each configured slot: `device` (the slot number), `type`, `type_name`, `addr` and `data`, the list of samples taken since the last report, each with its `timestamp`. The keys in `data` depend on the device type:

| Type | Keys in `data` |
| :--- | :--- |
| `microsens_180hs` | `co2_percent` (Vol.-%), `temperature` (°C), `pressure` (mbar) |
| `promag_mf7s` | `card_uid` |
| `em1xx` | `voltage`, `current`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in`, `energy_out` |
| `em5xx` | `current`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in`, `energy_out`, `voltage_l1`, `voltage_l2`, `voltage_l3`, `current_l1`, `current_l2`, `current_l3`, `power_l1`, `power_l2`, `power_l3`, `power_factor_l1`, `power_factor_l2`, `power_factor_l3` |
| `or_we_504` | `voltage`, `current`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in` |
| `or_we_516` | `voltage_l1`, `voltage_l2`, `voltage_l3`, `current_l1`, `current_l2`, `current_l3`, `power_l1`, `power_l2`, `power_l3`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `power_factor_l1`, `power_factor_l2`, `power_factor_l3`, `frequency`, `energy`, `energy_in`, `energy_out` |
| `iem3000` | `voltage_l1`, `voltage_l2`, `voltage_l3`, `current_l1`, `current_l2`, `current_l3`, `power_l1`, `power_l2`, `power_l3`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in`, `energy_out` |
| `flowt_ft201` | `flow_s` (m³/s), `flow_m` (m³/min), `flow_h` (m³/h), `velocity` (m/s), `total_positive`, `total_negative`, `total_net`, `energy_hot`, `energy_cold`, `temp_inlet` and `temp_outlet` (°C), `signal_quality` |
| `piketronic` | `radon_concentration` (Bq/m³, 1-hour average), `radon_concentration_day` (Bq/m³, 1-day average), `temperature` (°C), `humidity` (%) |
| `solax_g3` | `pv1_power`, `pv2_power`, `bat_power`, `feedin_power`, `eps_power_l1`, `eps_power_l2`, `eps_power_l3` (W), `bat_temp` (°C), `bat_soc` (%), `feedin_energy` and `consume_energy` (kWh) |

The energy meters report voltage in V, current in A, power in kW (apparent power in kVA, reactive power in kvar), frequency in Hz and energy in kWh. The `current` of the EM5XX is its neutral current (the meter's register `An`); its phase currents are `current_l1` to `current_l3`. The `power_factor` of the iEM3000 is the meter's four-quadrant encoding from −2 to 2: a value from −1 to 1 is the power factor; above 1 the power factor is 2 minus the value, below −1 it is −2 minus the value.

The example is a report of the RS-485 variant with a Carlo Gavazzi EM111 meter in slot 0 and a FlowT FT201 flowmeter in slot 1, two samples of each taken 60 seconds apart, and no Bluetooth tags.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 2,
    "sequence": 48,
    "timestamp": 1762430500
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.4",
    "fw_version": "v4.0.1",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 86500,
    "voltage_rest": 4.71,
    "voltage_load": 4.66,
    "current_load": 46
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -10,
      "snr": 9,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 24.31
  },
  "accelerometer": {
    "accel_x": 0.12,
    "accel_y": -0.08,
    "accel_z": 9.79,
    "orientation": 2
  },
  "devices": [
    {
      "device": 0,
      "type": 7,
      "type_name": "em1xx",
      "addr": 1,
      "data": [
        {
          "timestamp": 1762430410,
          "voltage": 231.4,
          "current": 5.132,
          "power": 1.1875,
          "power_apparent": 1.1875,
          "power_reactive": 0.0,
          "power_factor": 1.0,
          "frequency": 50.1,
          "energy_in": 8412.5,
          "energy_out": 0.0
        },
        {
          "timestamp": 1762430470,
          "voltage": 230.9,
          "current": 5.143,
          "power": 1.1875,
          "power_apparent": 1.1875,
          "power_reactive": 0.0,
          "power_factor": 1.0,
          "frequency": 49.9,
          "energy_in": 8412.5,
          "energy_out": 0.0
        }
      ]
    },
    {
      "device": 1,
      "type": 12,
      "type_name": "flowt_ft201",
      "addr": 2,
      "data": [
        {
          "timestamp": 1762430411,
          "flow_s": 0.0006,
          "flow_m": 0.036,
          "flow_h": 2.16,
          "velocity": 0.627,
          "total_positive": 1523.417,
          "total_negative": 0.016,
          "total_net": 1523.401,
          "energy_hot": 41.732,
          "energy_cold": 0.0,
          "temp_inlet": 61.23,
          "temp_outlet": 47.85,
          "signal_quality": 87
        },
        {
          "timestamp": 1762430471,
          "flow_s": 0.0005,
          "flow_m": 0.0354,
          "flow_h": 2.124,
          "velocity": 0.6166,
          "total_positive": 1523.453,
          "total_negative": 0.016,
          "total_net": 1523.437,
          "energy_hot": 41.734,
          "energy_cold": 0.0,
          "temp_inlet": 61.19,
          "temp_outlet": 47.88,
          "signal_quality": 86
        }
      ]
    }
  ],
  "ble_tags": []
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

**CHESTER Serial** uses binary LoRaWAN payload encoding with one uplink for each configured device. Each uplink has 51 bytes at most and carries the latest values of the device.

The ChirpStack/TTN decoder is available in the `codec/cs-decoder.js` file of the application in the CHESTER SDK. It returns the payload version (`version`), the slot number (`device_index`), the system values (`voltage_rest`, `voltage_load`, `current_load`, `orientation`, `therm_temperature`) and a `device` object with `type`, `addr`, `status`, `valid`, `error`, `type_name` and the device values in `data`. The example is an uplink of an EM111 meter in slot 0:

```json
{
  "version": 1,
  "device_index": 0,
  "voltage_rest": 4.71,
  "voltage_load": 4.66,
  "current_load": 46,
  "orientation": 2,
  "therm_temperature": 24.31,
  "device": {
    "type": 7,
    "addr": 1,
    "status": 1,
    "valid": true,
    "error": false,
    "data": {
      "voltage": 231.375,
      "current": 5.1328125,
      "power": 1.1875,
      "frequency": 50.09375,
      "energy_in": 8416,
      "energy_out": 0
    },
    "type_name": "em1xx"
  }
}
```

Firmware v4.0.1 sends the imported energy of the ORNO OR-WE-504 divided by 1000, that is in MWh, and always `0` as its exported energy. The decoder returns the imported energy of the ORNO OR-WE-516 under the key `energy`.

:::info

Due to LoRaWAN payload size constraints, device values are encoded using **Float16** (IEEE 754 half-precision) format. The decoder converts them back to ordinary numbers. Float16 keeps about three significant digits, so 231.4 V arrives as 231.375 V in the example, and it cannot hold values above 65 504: a larger energy total arrives as infinity. LTE reports keep about seven significant digits.

:::

  </TabItem>
</Tabs>

## Changelog

### v4.0.0 – 2026-08-10

- **Added**: Driver for the **SolaX X3-Hybrid G3** inverter
- **Added**: Driver for the [**Piketronic RPP-R**](../../supported-devices/modbus/piketronic-rpp-r.md) radon probe (type `piketronic`)

### v3.5.0 – 2025-12-03

- **Added**: LoRaWAN support: optimized binary encoding with multi-device packing for bandwidth efficiency
- **Added**: Support for RS-232 interface via CHESTER-X12 extension module (in addition to existing RS-485/CHESTER-X2)
- **Added**: 10 device type profiles including energy meters, environmental sensors, and generic Modbus RTU devices
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); Cloud Legacy firmware was not available for this application

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
