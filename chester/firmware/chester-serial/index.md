---
title: CHESTER Serial
description: "Firmware of the CHESTER Serial catalog application: serial line and device settings, the device drivers, commands and the data format."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Serial

The **CHESTER Serial** firmware turns CHESTER into a gateway for devices with a serial interface. It reads energy meters, sensors and other devices over Modbus RTU or over their own serial protocol and sends the readings to HARDWARIO Cloud over NB-IoT/LTE or LoRaWAN.

The firmware is built in two variants, one for each serial interface: [**CHESTER Serial RS-485**](chester-serial-rs485.md) and [**CHESTER Serial RS-232**](chester-serial-rs232.md). This page describes what both variants share; their own pages list only what differs.

What all catalog applications share (LED, button, network mode, BLE tags and shell commands) is described in [**Common Functionality**](../common-functionality.md). The hardware and the product variants are on the [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md) catalog page.

## Supported Hardware

The firmware works with:

- one serial interface module in slot A: **CHESTER-X2** (RS-485) in the RS-485 variant or **CHESTER-X12** (RS-232) in the RS-232 variant
- the devices listed in [Supported Devices](#supported-devices)
- Bluetooth sensor tags (see [**BLE Tags**](../ble-tags.md))

## Supported Devices

The firmware has a driver for each of these devices. Each device goes into one of the slots `device-0` to `device-7` as its type, followed by its Modbus address for a Modbus device (see [Device Slots](#device-slots)):

| Device | Type and address | Interface | Measurements |
| :--- | :--- | :--- | :--- |
| **MicroSENS 180-HS** | `microsens_180hs` | RS-232, own protocol | CO₂ concentration (Vol.-%), temperature, pressure |
| [**Promag MF7S**](../../supported-devices/serial-devices/promag-mf7s.md) | `promag_mf7s` | RS-232, own protocol | UID of every RFID card presented to the reader |
| [**Carlo Gavazzi EM1XX**](../../supported-devices/modbus/carlo-gavazzi-em1xx-series.md) | `em1xx,<addr>` | RS-485, Modbus RTU | Single-phase: voltage, current, active, apparent and reactive power, power factor, frequency, imported and exported energy |
| [**Carlo Gavazzi EM5XX**](../../supported-devices/modbus/carlo-gavazzi-em5xx-series.md) | `em5xx,<addr>` | RS-485, Modbus RTU | Three-phase: voltage, current, power and power factor per phase; total current, active, apparent and reactive power, power factor, frequency, imported and exported energy |
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
- The samples are sent in a batch every report interval (parameter `interval-report`), the first time 30 seconds after start. The reports go out at exactly this interval, without the random jitter described in [**Common Functionality**](../common-functionality.md#report-interval-jitter).
- With `interval-report` set to `0`, the device sends no periodic reports after the first one, only on request (the `send` command or the button) and after each card read on the Promag MF7S.
- Bluetooth tags are sampled with the same period and aggregated over the aggregation interval (parameter `interval-aggreg`): minimum, maximum, average and median.

### Modbus RTU Mode

In Modbus mode (`serial-mode modbus`), CHESTER acts as the Modbus RTU Master and reads all configured slave devices one after another at every sample:

* Up to **8 devices** can be configured simultaneously on the RS-485 bus, each with its own Modbus address (1–247).
* The serial line uses `serial-baudrate`, `serial-parity` and `serial-stop-bits`; Modbus RTU always uses 8 data bits.
* One response timeout applies to the whole bus: the longest `timeout` of the configured devices.
* The drivers and the `modbus` commands use the Modbus functions 03 (read holding registers), 04 (read input registers) and 06 (write single register).

### Transparent Mode

In transparent mode (`serial-mode transparent`, the default), the firmware does not use Modbus. It opens the serial line with the configured parameters for a device with its own protocol and for the `serial` commands:

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

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Sampling interval in seconds |
| `interval-aggreg` | `<1-86400>` | `300` | Aggregation interval of the Bluetooth tag readings in seconds |
| `interval-report` | `<0-86400>` | `1800` | Report interval in seconds; `0` turns the periodic reports off |
| `interval-poll` | `<0-86400>` | `0` | Polling interval for downlink messages from HARDWARIO Cloud in seconds; firmware v4.0.1 stores the value but does not use it |
| `serial-mode` | `transparent`, `modbus` | `transparent` | Protocol on the serial line: the device's own protocol or Modbus RTU |
| `serial-baudrate` | `<1200-115200>` | `9600` | Baud rate |
| `serial-data-bits` | `<7-9>` | `8` | Data bits; Modbus RTU always uses 8 |
| `serial-parity` | `none`, `odd`, `even` | `none` | Parity |
| `serial-stop-bits` | `<1-2>` | `1` | Stop bits |
| `device-0` to `device-7` | `type[,addr[,timeout]]` | `""` | Device in slots 0 to 7, see [Device Slots](#device-slots) |

Both variants have the same parameters. The RS-232 variant takes one device only, so it uses just `device-0`.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../common-functionality.md#network-mode-configuration).

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

The energy meters report voltage in V, current in A, power in kW (apparent power in kVA, reactive power in kvar), frequency in Hz and energy in kWh.

The example below was recorded with an earlier firmware version (`fw_version` `v1.0.0`). Firmware v4.0.1 sends the keys listed above, reports the power of the energy meters in kW and has no `imei` and `imsi` in `network`.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 42,
    "timestamp": 1738627200
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.4",
    "fw_version": "v1.0.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 86400,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 28
  },
  "network": {
    "imei": 351358815180770,
    "imsi": 901288910018982,
    "parameter": {
      "rsrp": -85,
      "rsrq": -6,
      "snr": 12,
      "plmn": 23003,
      "cid": 939040,
      "band": 20
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
  "devices": [
    {
      "device": 0,
      "type": 7,
      "type_name": "em1xx",
      "addr": 1,
      "data": [
        {
          "timestamp": 1738627200,
          "voltage": 230.5,
          "current": 5.23,
          "power": 1198.0,
          "frequency": 50.01,
          "energy_in": 12345,
          "energy_out": 0
        }
      ]
    },
    {
      "device": 1,
      "type": 8,
      "type_name": "or_we_516",
      "addr": 2,
      "data": [
        {
          "timestamp": 1738627200,
          "voltage_l1": 230.1,
          "voltage_l2": 231.2,
          "voltage_l3": 229.8,
          "current_l1": 4.12,
          "current_l2": 3.89,
          "current_l3": 4.35,
          "power_l1": 948.0,
          "power_l2": 901.2,
          "power_l3": 996.5,
          "power_total": 2845.7,
          "energy": 98765
        }
      ]
    }
  ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

**CHESTER Serial** uses binary LoRaWAN payload encoding with one uplink for each configured device. Each uplink has 51 bytes at most.

The ChirpStack/TTN decoder is available in the `codec/cs-decoder.js` file of the application in the CHESTER SDK. It returns the system values (`voltage_rest`, `voltage_load`, `current_load`, `orientation`, `therm_temperature`), the slot number (`device_index`) and a `device` object with `type`, `type_name`, `addr`, `valid` and the device values in `data`.

:::info

Due to LoRaWAN payload size constraints, device values are encoded using **Float16** (IEEE 754 half-precision) format. The decoder converts them back to ordinary numbers. Float16 keeps about three significant digits and cannot hold values above 65,504, so large energy totals lose precision over LoRaWAN; LTE reports send full values.

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
