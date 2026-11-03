---
title: CHESTER Serial RS-232
description: "CHESTER Serial RS-232 firmware: what it changes against the shared CHESTER Serial firmware for a single RS-232 device on the CHESTER-X12 module."
---

# CHESTER Serial RS-232

**CHESTER Serial RS-232** is the CHESTER Serial firmware built for the **CHESTER-X12** RS-232 interface. Everything this page does not mention works as described for [**CHESTER Serial**](index.md).

## Differences from CHESTER Serial

### Hardware

- Uses **CHESTER-X12** in slot A: a non-isolated RS-232 interface for a point-to-point connection (see [**CHESTER-X12**](../../extension-modules/chester-x12.md)).
- Works with one device with its own protocol: the **MicroSENS 180-HS** CO₂ sensor or the [**Promag MF7S**](../../supported-devices/serial-devices/promag-mf7s.md) RFID reader.

### Behavior

- The build has no Modbus RTU: use transparent mode (the default). The Modbus devices from the [Supported Devices](index.md#supported-devices) table cannot be used.

### Configuration Parameters

The parameters are the same as in CHESTER Serial, but only one device is allowed, in `device-0`. Keep `serial-mode` at `transparent` and set the line parameters of the device; the Promag MF7S reader uses 19200 baud, 8 data bits, no parity and 1 stop bit.

### Commands

The `modbus` commands do not work, because the build has no Modbus RTU.

### Data

The `devices` list in the report has at most one entry.

## Firmware Build

- **Firmware:** [hio-chester-serial-rs232:v4.0.1](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `8be3907b12b5445b847fa03cb2970d6d`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d/hex), SHA256 `c5e5de31c9f7bfb9d8045f64a8567dae8de058a0c7275e2a9f92ef200e78c7cf`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d/bin), SHA256 `54ce738f50a1171bb70b12cd7a83b0deade3a644aec35dbc2a81a9f9dca4e4b5`
- **Build from the SDK:** `west chester-update serial --variant "CHESTER Serial RS-232"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
