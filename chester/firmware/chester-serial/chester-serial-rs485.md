---
title: CHESTER Serial RS-485
description: "CHESTER Serial RS-485 firmware: what it adds to the shared CHESTER Serial firmware for Modbus RTU devices on the RS-485 bus of the CHESTER-X2 module."
---

# CHESTER Serial RS-485

**CHESTER Serial RS-485** is the CHESTER Serial firmware built for the **CHESTER-X2** RS-485 interface. Everything this page does not mention works as described for [**CHESTER Serial**](index.md).

## Differences from CHESTER Serial

### Hardware

- Uses **CHESTER-X2** in slot A: a non-isolated RS-485 interface (see [**CHESTER-X2**](../../extension-modules/chester-x2.md)).
- Works with the Modbus RTU devices from the [Supported Devices](index.md#supported-devices) table: up to 8 devices on one multi-drop bus, each with its own address.

### Behavior

- Reads the configured devices one after another at every sample, with a 50 ms pause between two devices to let the bus settle.

### Configuration Parameters

The parameters are the same as in CHESTER Serial. For the Modbus RTU devices, set `serial-mode` to `modbus` and give each device its Modbus address, for example `app config device-0 "em1xx,1"`.

### Commands

The `modbus` commands work only in this variant, because only this build has Modbus RTU.

## Firmware Build

- **Firmware:** [hio-chester-serial-rs485:v4.0.1](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `cc16bc72ff9d41a5addc516e77abdec5`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5/hex), SHA256 `6e53308ef2a26e463c7536278438786e17ef7ee1a265736bb897536f6ef48768`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5/bin), SHA256 `2e69e20679c1788ec9a5810cf7aa6ab738d9cc9e9ad00171d2c067a94a27ad75`
- **Build from the SDK:** `west chester-update serial --variant "CHESTER Serial RS-485"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
