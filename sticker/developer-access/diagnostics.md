---
title: Diagnostics
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
This diagnostics command was **renamed `tester` → `ats` in STICKER firmware v1.4.0**; its core subcommands also exist on v1.3.x (as `tester`). New in v1.4.0: `ats lrw reset`, `ats lrw compose`, `ats lrw lc`, `ats cmd lrw|nfc`, and the claim token shown by `ats device info`.
:::

# Diagnostics (`ats`)

The `ats` command (Automated Test System, renamed from `tester` in v1.4.0) groups read-only diagnostics and bench-test helpers over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console). Unlike `config`, these commands do not change stored settings.

## Device

| Command | Description |
|---|---|
| `ats device info` | Print firmware version, build type, serial number, uptime, wall clock, and the device secret key and claim token. |
| `ats device reboot` | Cold-reboot the device. |

## Sensors

| Command | Description |
|---|---|
| `ats sensors sample` | Sample and print all sensor values. |
| `ats sensors serial` | Print the serial numbers of attached sensors. |
| `ats sensors reset` | Reset the sensor pulse counters. |
| `ats sensors check <sensor> [timeout]` | Monitor one sensor and report changes. |

## LEDs

| Command | Description |
|---|---|
| `ats led cycle [count]` | Cycle the LED through red, yellow, green and off. `count` defaults to `1`; `0` stops, `1`-`99` repeats. |
| `ats led switch <color> <state>` | Set one LED channel (`red`, `yellow` or `green`) to `on` or `off`. |

## LoRaWAN

| Command | Description |
|---|---|
| `ats lrw status` | Print the current LoRaWAN status. |
| `ats lrw check` | Send an uplink with a link check. |
| `ats lrw compose [budget]` | Build a telemetry uplink without sending it and print the fPort-2 payload as hex. |
| `ats lrw reset` | Reset the LoRaWAN frame counters and DevNonce (reboots). |
| `ats lrw lc <result>` | Inject a link-check result (`ok` or `fail`) for debugging. |

:::info Command injection (debug builds)
Builds with command-debug support also expose `ats cmd lrw <hex>` and `ats cmd nfc <hex>`, which feed a raw protobuf command frame into the LoRaWAN or NFC command engine for bench testing and print the response as hex. A deferred action (reboot, save, factory reset) is reported but not executed from a shell inject.
:::
