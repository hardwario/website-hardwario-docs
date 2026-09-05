---
title: Shell Commands
sidebar_position: 2
---
import Image from '@theme/IdealImage';

# Shell Commands Reference

GLIDER runs a full **Zephyr shell** that exposes application-level commands for every subsystem. The shell is reachable through:

- the [**RTT Console**](../console/rtt-jlink.md) directly, or
- the [**AT Console**](../console/usb-at.md) via `AT$SHELL="<command>"`.

:::tip
For the equivalent AT commands available over USB-C, see the [**AT Commands**](at-commands.md) page.
:::

This page lists the GLIDER-specific commands. Generic Zephyr commands (`kernel`, `log`, `device`, …) are not repeated here.

## Generic `config` sub-command

Every module that exposes configuration speaks the same `config` syntax:

| Form | Meaning |
| :--- | :--- |
| `<module> config show` | Print every key of the module. |
| `<module> config show <key>` | Print one key. |
| `<module> config <key> <value>` | Write a value. |

After making changes, save them to flash:

```text
AT&W
```

…or, equivalently, from the Zephyr shell, reboot with `kernel reboot cold`. Values written via `<module> config` are persisted automatically when `&W` runs.

## `app` - application-wide commands

| Command | Description |
| :--- | :--- |
| `app config …` | Configure global app parameters (sample / send intervals, downlink watchdog). |
| `app sample` | Force one full measurement cycle (read every sensor + evaluate alarms). |
| `app send` | Force an immediate CBOR encode + uplink. |

For configurable keys see [**Configuration → `app`**](../configuration.md#global-app-settings).

## `inputs` - digital inputs

| Command | Description |
| :--- | :--- |
| `inputs config …` | Configure channels CH1 / CH2 (mode, debounce, cooldown, edge selection). |
| `inputs show` | Print current counters and recent events for both channels. |
| `inputs clear` | Wipe the event buffer of both channels. |

For configurable keys see [**Configuration → Digital Inputs**](../configuration.md#digital-inputs).

## `therm` - DS18B20 thermometers (1-Wire)

| Command | Description |
| :--- | :--- |
| `therm config …` | Bind / show ROM codes for the 8 slots. |
| `therm read <1-8>` | Read one slot. |
| `therm readall` | Read every populated slot. |
| `therm scan` | Discover sensors on the 1-Wire bus and propose changes (asks for confirmation). |
| `therm scan --save` | Discover and save automatically (no prompt). |
| `therm scan --clear-missing` | Like `scan`, but also clear slots whose ROM codes are no longer on the bus. |
| `therm state` | Current slot bindings + last temperature + read/error counters. |

For a step-by-step walk-through see [**External Temperature Sensors**](../external-sensors/temperature.md).

## `alarm` - temperature alarms

| Command | Description |
| :--- | :--- |
| `alarm config …` | Configure up to 32 alarm rules (enable, thermometer slot, threshold, hysteresis). |
| `alarm evaluate` | Immediately evaluate all rules. |
| `alarm state` | Show the current state (active / inactive) of every enabled rule. |

For configurable keys see [**Configuration → Alarms**](../configuration.md#alarms).

#### Example - set up a high-temperature alarm on slot 1

```text
alarm config 1-enabled true
alarm config 1-therm 1
alarm config 1-threshold 30
alarm config 1-hysteresis 5
AT&W
```

The alarm activates at **≥ 30 °C** and deactivates at **≤ 25 °C** (30 − 5).

## `modbus` - RS-485 Modbus RTU client

| Command | Description |
| :--- | :--- |
| `modbus enable` | Power the isolated RS-485 driver (`RS_ON` high). |
| `modbus disable` | Cut RS-485 power. |
| `modbus read <addr> <start> [count]` | Read input registers (Modbus function code 04). `count` defaults to 1, maximum 32. |

The line speed is fixed at **19 200 baud, 8E1** (RTU mode), and the response timeout is **500 ms**.

#### Example - read 4 input registers starting at address 0 from slave 1

```text
modbus enable
modbus read 1 0 4
modbus disable
```

## `led` - status LEDs

GLIDER has three on-board signaling LEDs: **r**ed, **g**reen, **y**ellow.

| Command | Description |
| :--- | :--- |
| `led on <r\|g\|y\|rg\|ry\|gy\|rgy>` | Turn on a single LED or any combination. |
| `led off <r\|g\|y\|rg\|ry\|gy\|rgy>` | Turn one or more LEDs off. |
| `led test` | Blink each LED in sequence (sanity test). |

In normal operation the firmware uses the LEDs as follows:

- Every **5 seconds** a brief **30 ms pulse** is emitted, green when no alarm is active and red when at least one alarm rule is active. The pulse is short enough to be easy to miss in bright light.
- After a button click is recognized, the **yellow LED** blinks once per detected click (50 ms on, 200 ms off) as feedback for which click count was registered, before the corresponding action runs.

The LEDs do **not** indicate cellular attach or cloud connectivity.
