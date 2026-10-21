---
slug: developer-mode
title: Developer Access
description: "Developer access to STICKER: the debug firmware build adds an interactive shell over RTT for development and diagnostics on the Zephyr RTOS platform."
---
import Image from '@theme/IdealImage';

# Developer Access (Debug Mode)

STICKER is an **open platform** built on the Zephyr RTOS. A **debug build** of the firmware adds an interactive shell console over RTT, which developers use to configure the device and run diagnostics directly over a debug connection.

## Debug Mode

The STICKER can be delivered in **Debug Mode**, which is intended primarily for developers. In this configuration, the device is supplied in an open state, allowing direct access for development, so you can explore, modify, and extend its functionality.

:::info
End users normally configure STICKER over **NFC** with a smartphone, with no cable or console required. See the [**HARDWARIO Manager**](/apps/hardwario-manager/sticker). The pages below are for firmware development and shell-based configuration.
:::

---

## Getting started

To set up the firmware locally, flash a debug image, and open the console, follow [**Firmware Setup**](developer-access/firmware-setup.md).

---

:::info Firmware v2.0.0
The pages below describe **STICKER firmware v2.0.0**. Coming from v1.4.x, note the changes to the shell:
- **Renamed parameters:** `lrw-deveui` / `lrw-appkey` are now `radio-deveui` / `radio-appkey`, `lrw-link-check-*` is now `radio-link-check-*`, and `cap-input-a/-b` and `cap-pir-detector` are replaced by `cap-gpio-mode` and `cap-gpio-input-a/-b`. There are no aliases, so update your scripts.
- **Alarm rules** address a sensor value by slot and channel (`alarm set 0 mb temperature lo 2 hi 8`), see [**Alarm Rules**](developer-access/alarm-rules.md).
- **Sensor history** selects its channels with `history-channels`, which replaces `history-sensors`.
- **Radio diagnostics** moved from `ats lrw` to `ats radio`, which covers both LoRaWAN and P2P.
:::

## Shell command reference

Once the console is open, configuration and diagnostics are entered as shell commands. Each command has its own page:

- [**Configuration**](developer-access/configuration.md): the `config` command: intervals, radio (LoRaWAN and P2P), sensors, GP pins, alarms and buzzer, pulse counters, device identity and NFC.
- [**Alarm Rules**](developer-access/alarm-rules.md): the `alarm` command, the `sensor types` channel list and the alarm uplink limits.
- [**Sensor History**](developer-access/sensor-history.md): the `history` command and store-and-forward recording.
- [**Real-time Clock**](developer-access/clock.md): the `clock` command.
- [**Maintenance**](developer-access/maintenance.md): the `settings` command: save, reset, erase.
- [**Diagnostics**](developer-access/diagnostics.md): the `ats` command: device info, sensor and LED tests, radio status (LoRaWAN or P2P), claim window.

Two more commands help with sensors:

- `sensor types [<type>]` lists the sensor types (`motherboard`, `dallas`, `machine-probe`) and their channels, with the channel names and numbers that `alarm` and `history` take.
- `w1 list|scan|enroll|clear` manages the 1-Wire slots: `w1 scan` lists every device on the bus, `w1 enroll` binds unbound devices into free slots (`w1 enroll <slot> [<rom>]` binds one), `w1 list` prints the slot table and `w1 clear <slot>` forgets a slot. It is available only in builds with 1-Wire support (the default debug build leaves 1-Wire out, see [**Firmware Setup**](developer-access/firmware-setup.md#build-variants)).
