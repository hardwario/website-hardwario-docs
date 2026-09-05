---
slug: chester-serial
title: CHESTER Serial
---
import Image from '@theme/IdealImage';

# CHESTER Serial

This article describes the core functionality, hardware description, default configuration, and example **JSON** message of the catalog application **CHESTER Serial**.

:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](../category/platform-connectivity) on how to work with the interactive console.

:::

## Application Overview

**CHESTER Serial** is a universal application for industrial serial communications. It works as a flexible gateway for integrating industrial devices (sensors, energy meters) into the cloud via LTE-M/NB-IoT or LoRaWAN.

The application supports two communication interfaces, depending on the installed extension module:
* **RS-485** (with Module [**CHESTER-X2**](../extension-modules/chester-x2.md)): Modbus RTU Master, multi-drop bus, up to 8 slave devices
* **RS-232** (with Module [**CHESTER-X12**](../extension-modules/chester-x12.md)): point-to-point connection, 1 device

It supports 11 device types including energy meters, environmental sensors, and generic Modbus devices. Data is transmitted via LTE (CBOR encoding) or LoRaWAN (optimized binary encoding with multi-device packing).

## Application Variants

**CHESTER Serial** can be ordered in one of these variants:

### CHESTER Serial RS-485 {#chester-serial-rs-485}

This variant is equipped with the **CHESTER-X2** extension module. It is designed for standard industrial bus communication where multiple devices are connected in a daisy-chain topology.

* **Interface:** Non-isolated RS-485
* **Topology:** Multi-drop bus
* **Capacity:** Up to 8 Modbus RTU slave devices

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-X2`: RS-485 interface module
* `CHESTER-X10`: External power input (5-28V DC)
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

### CHESTER Serial RS-232 {#chester-serial-rs-232}

This variant is equipped with the **CHESTER-X12** extension module. It is intended for point-to-point communication with a single peripheral device, legacy equipment, or sensors requiring a direct serial link.

* **Interface:** Non-isolated RS-232
* **Topology:** Point-to-point connection
* **Capacity:** Single device (1:1 connection)

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CGLS`: Standard mainboard
* `CHESTER-X12`: RS-232 interface module
* `CHESTER-E2-LP`: Enclosure with SMA pigtail

See [**Ordering Codes**](../ordering-codes.md) for more details.

:::caution

**CHESTER Serial** requires an external power supply (5–28 V DC) for continuous operation. Sensors and the serial interface are powered continuously.

:::

## Supported Devices

The firmware includes native support for the following devices:

| Device | Type String | Interface | Measurements |
| :--- | :--- | :--- | :--- |
| **MicroSENS 180-HS** | `microsens_180hs` | RS-232 (ASCII) | CO2 (Vol.-%), Temperature, Pressure |
| **SenseCAP S1000 / S500** | `sensecap_s1000` | RS-485 Modbus | Temperature, Humidity, Pressure, Light, Wind |
| **CUBIC 6303** | `cubic_6303` | RS-485 Modbus | PM1.0, PM2.5, PM10 |
| **Lambrecht** | `lambrecht` | RS-485 Modbus | Weather station data |
| **Piketronic RPP-R** | `piketronic` | RS-485 Modbus | Radon concentration (Bq/m³), Temperature, Humidity |
| **Generic Modbus** | `generic` | RS-485 Modbus | Custom register mapping |
| **Carlo Gavazzi EM1XX** | `em1xx` | RS-485 Modbus | Voltage, Current, Power, Frequency, Energy in/out (single-phase) |
| **Carlo Gavazzi EM5XX** | `em5xx` | RS-485 Modbus | Voltage, Current, Power, Frequency, Energy per phase (three-phase) |
| **ORNO OR-WE-504** | `or_we_504` | RS-485 Modbus | Voltage, Current, Power, Energy (single-phase) |
| **ORNO OR-WE-516** | `or_we_516` | RS-485 Modbus | Voltage, Current, Power per phase, Energy (three-phase) |
| **Schneider iEM3000** | `iem3000` | RS-485 Modbus | Voltage, Current, Power, Energy per phase (three-phase) |

:::tip

You can also use short aliases for some device types: `microsens`, `sensecap`, `cubic`, `em111`, `em540`.

:::

## Application Behavior

### Modbus RTU Mode

In Modbus mode, CHESTER acts as the Modbus RTU Master and periodically polls all configured slave devices:

* Devices are **sampled** with a configurable period (parameter `interval-sample`).
* Collected measurements are sent in batch during the report interval (parameter `interval-report`).
* Up to **8 devices** can be configured simultaneously on the RS-485 bus.
* Supported Modbus functions: FC01, FC02, FC03, FC04, FC05, FC06, FC0F, and FC10.

### Transparent Mode

In Transparent mode, CHESTER acts as a bidirectional bridge between the serial port and the cloud:

* Data received on the serial line is forwarded to the cloud.
* Only one device can be connected (`device-0` slot only).
* Useful for debugging, legacy equipment, or non-standard protocols.

### LoRaWAN Multi-Device Packing

When using LoRaWAN, the application uses adaptive multi-device packing (Protocol v2) to optimize airtime:

* Dynamically queries the current Data Rate to determine available MTU.
* Batches multiple device readings into single uplinks where possible.
* First uplink contains system data (battery, temperature, accelerometer) plus device data.
* Subsequent uplinks contain only device data.

## Technical Specifications

| Feature | Value |
| :--- | :--- |
| **Operating System** | Zephyr RTOS |
| **Physical Interface** | RS-232 (Module X12), RS-485 (Module X2) |
| **Application Protocols** | Transparent (RAW), Modbus RTU |
| **Cloud Formats** | CBOR (LTE), Optimized Binary (LoRaWAN) |
| **Power Supply** | External source (5–28V DC) required |

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config mode none
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
app config interval-poll 0
app config serial-mode transparent
app config serial-baudrate 9600
app config serial-data-bits 8
app config serial-parity none
app config serial-stop-bits 1
app config device-0
app config device-1
app config device-2
app config device-3
app config device-4
app config device-5
app config device-6
app config device-7
```

## Specific Commands

:::info

You can easily explore the whole command tree structure. Start with the `help` command.

:::

:::caution

To apply a new configuration, you need to call `config save`, which applies the new configuration parameters and reboots the device.

:::

### Action Commands

Command to **trigger sample** immediately (and store the result in the sample buffer):

```
sample
```

Command to **send data** immediately:

```
send
```

### Network Mode

Command to set the **communication mode**:

```
app config mode <none/lte/lrw>
```

### Reporting

Command to set **sample interval** in seconds:

```
app config interval-sample <1-86400>
```

Command to set **aggregation interval** in seconds:

```
app config interval-aggreg <1-86400>
```

Command to set **report interval** in seconds:

```
app config interval-report <30-86400>
```

Command to set **LTE polling interval** in seconds (0 = disabled):

```
app config interval-poll <0-86400>
```

### Serial Line

Command to set **serial operating mode**:

```
app config serial-mode <transparent/modbus>
```

Command to set **baud rate**:

```
app config serial-baudrate <1200-115200>
```

Command to set **data bits**:

```
app config serial-data-bits <7-9>
```

Command to set **parity**:

```
app config serial-parity <none/odd/even>
```

Command to set **stop bits**:

```
app config serial-stop-bits <1-2>
```

### Device Configuration

Configure device slots 0–7 using the format `type[,addr[,timeout]]`:

```
app config device-<n> "<type>,<addr>,<timeout>"
```

Where:
* `n`: device slot index (0–7)
* `type`: device type string (see Supported Devices table)
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

In Modbus mode, the Modbus slave address is required for all devices. In Transparent mode, only `device-0` can be configured.

:::

### Modbus Commands

Read Modbus registers from a slave device:

```
modbus read <slave> <addr> <count> [holding|input]
```

Write a value to a Modbus register:

```
modbus write <slave> <addr> <value>
```

Sample the configured Modbus device:

```
modbus sample
```

### Serial Commands

Send hex data on the serial line and wait for a response:

```
serial send <hex> [timeout_s]
```

Read data from the serial RX buffer:

```
serial recv [timeout_s]
```

### Device Commands

List all configured devices:

```
device list
```

Sample a specific device by its slot index:

```
device sample <0-7>
```

Reset a specific device:

```
device reset <0-7>
```

Access device-specific commands (per device type):

```
device microsens_180hs <subcommand>
device em1xx <subcommand>
device or_we_504 <subcommand>
device or_we_516 <subcommand>
device em5xx <subcommand>
device iem3000 <subcommand>
```

## Firmware

The latest firmware is available in the Catalog Applications [Firmware chapter](index.md#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">

<details>
<summary><b>Show JSON Example</b></summary>
<p>

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

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

**CHESTER Serial** uses binary LoRaWAN payload encoding with Protocol v2 multi-device packing. The payload is compressed to fit within the LoRaWAN MTU (51–222 bytes depending on Data Rate). Multiple device readings are batched into single uplinks when possible.

The ChirpStack/TTN decoder is available in the `codec/cs-decoder.js` file. It supports both Protocol v1 (single-device, legacy) and Protocol v2 (multi-device packing).

:::info

Due to LoRaWAN payload size constraints, device values are encoded using **Float16** (IEEE 754 half-precision) format. The decoder automatically converts these back to full-precision values.

:::

  </TabItem>
</Tabs>

---

## Changelog

### v4.0.0 – 2026-08-10

- **Added**: Driver for the **SolaX X3-Hybrid G3** inverter
- **Added**: Driver for the [**Piketronic RPP-R**](../supported-devices/modbus/piketronic-rpp-r.md) radon probe (type `piketronic`)

### v3.5.0 – 2025-12-03

- **Added**: LoRaWAN support: optimized binary encoding with multi-device packing for bandwidth efficiency
- **Added**: Support for RS-232 interface via CHESTER-X12 extension module (in addition to existing RS-485/CHESTER-X2)
- **Added**: 10 device type profiles including energy meters, environmental sensors, and generic Modbus RTU devices
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); Cloud v1 firmware was not available for this application

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
