---
slug: developer-mode
title: Developer Access
---
import Image from '@theme/IdealImage';

# Developer Access (Debug Mode)

STICKER is an **open platform** built on the Zephyr RTOS. A **debug build** of the firmware adds an interactive shell console over RTT, which developers use to configure the device and run diagnostics directly over a debug connection.

## Debug Mode

The STICKER can be delivered in **Debug Mode**, which is intended primarily for developers. In this configuration, the device is supplied in an open state, allowing direct access for development, so you can explore, modify, and extend its functionality.

:::info
End users normally configure STICKER over **NFC** with a smartphone, with no cable or console required. See the [**NFC Configurator APP**](nfc-configurator-app/setup.md). The pages below are for firmware development and shell-based configuration.
:::

---

## Getting started

To set up the firmware locally, flash a debug image, and open the console, follow [**Firmware Setup**](developer-access/firmware-setup.md).

---

:::info Firmware v1.4.0
Several of the shell commands below — `clock`, `history`, the dynamic `alarm` rules, `settings erase`, and the renamed `ats` diagnostics — are new in the upcoming **STICKER firmware v1.4.0**.
:::

## Shell command reference

Once the console is open, configuration and diagnostics are entered as shell commands. Each command has its own page:

- [**Configuration**](developer-access/configuration.md) - the `config` command: intervals, LoRaWAN, sensors, capabilities, pulse counters, device identity.
- [**Alarm Rules**](developer-access/alarm-rules.md) - the `alarm` command and the alarm uplink limits.
- [**Sensor History**](developer-access/sensor-history.md) - the `history` command and store-and-forward recording.
- [**Real-time Clock**](developer-access/clock.md) - the `clock` command.
- [**Maintenance**](developer-access/maintenance.md) - the `settings` command: save, reset, erase.
- [**Diagnostics**](developer-access/diagnostics.md) - the `ats` command: device info, sensor and LED tests, LoRaWAN status.
