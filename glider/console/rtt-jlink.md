---
title: RTT Console (J-Link)
sidebar_position: 1
---
import Image from '@theme/IdealImage';

# RTT Console over J-Link

:::tip
The RTT console gives you the **Zephyr shell** plus a live firmware log stream, so it is the recommended console for **development and debugging**. For day-to-day configuration, use the [**AT Console over USB-C**](usb-at.md) instead. It requires no special hardware.
:::

This page shows you how to attach to GLIDER through a **Segger J-Link** debug probe using the **RTT (Real-Time Transfer)** protocol. RTT gives you the full **Zephyr shell** plus live firmware logs, so it is the recommended console for development and debugging.

## When to use this console

| | **RTT (`rttt`)** | **AT over USB-C (`west serial-console`)** |
| :--- | :--- | :--- |
| Path | J-Link → SWD → RTT | USB-C → FT234XD → UART0 |
| What you see | Zephyr shell + logs | AT commands + `@LOG:` messages |
| Hardware required | J-Link probe + SWD wires | Just a USB-C cable |
| Best for | Development, debugging, flashing, reset | Day-to-day provisioning |

:::info
If you do not need full developer access, use the [**AT console over USB-C**](usb-at.md) instead. It requires no special hardware.
:::

## Prerequisites

You need three things on your computer:

1. **System packages** (Python, venv, Git):

 ```bash
 sudo apt update
 sudo apt install python3 python3-venv git
 ```

2. **Segger J-Link software pack** installed. Verify with:

 ```bash
 which JLinkExe
 # /usr/bin/JLinkExe
 ```

 If `JLinkExe` is missing, download the J-Link software from [Segger's website](https://www.segger.com/downloads/jlink/) and install it.

3. **The `rttt` CLI** available in your active Python virtual environment:

 ```bash
 source .venv/bin/activate
 which rttt
 rttt --version
 ```

 If `rttt` is missing inside the venv, install it:

 ```bash
 pip install rttt
 ```

## Hardware

- **J-Link probe** (external Segger probe or the on-board J-Link of a Nordic devkit).
- **USB cable** from the J-Link to your computer.
- **SWD wires** wired to the GLIDER debug header: `SWDIO`, `SWCLK`, `GND`, `VTref`.
- A **powered GLIDER** (from its own power supply or via `VTref` from the probe).

## Launching the console

With the venv active:

```bash
rttt --device nRF9151_xxCA
```

:::caution
The device identifier must be **`nRF9151_xxCA`**, with lowercase `xx` and uppercase `CA`. The default identifier `xxAA` collides with J-Link DLL versions ≥ V9.42 and the connection will silently fail.
:::

If you have more than one J-Link plugged in, select one by its serial number:

```bash
rttt --device nRF9151_xxCA --serial 123456789
```

To reset the device on attach (useful if the firmware crashed):

```bash
rttt --device nRF9151_xxCA --reset
```

## What you get

An interactive **Zephyr shell** with prompt `uart:~$`:

- **Live logs** stream past as they happen.
- **Shell commands** can be typed and executed directly.

A few useful commands to get started:

```text
help # list all commands
device list # list Zephyr devices
kernel uptime # time since last boot
kernel reboot cold # cold restart
log disable # silence logs for a clean shell
log enable wrn # show only warnings and above
info show # device info: serial number, claim token, version
```

GLIDER-specific commands include `app`, `inputs`, `therm`, `alarm`, `modbus`, and `led`. See the [**Shell Commands**](../commands/shell-commands.md) reference for the full list.

## Exiting

Press **`Ctrl+C`** or simply close the terminal window.

## Troubleshooting

#### `Failed to open J-Link`

Another process is holding the probe (`nrfjprog`, another `rttt` session, Segger Ozone, a VS Code debugger, etc.). Find and close it:

```bash
ps aux | grep -i jlink
```

#### `Could not find requested device`

- Check the device identifier: it must be `nRF9151_xxCA` (lowercase `xx`, uppercase `CA`).
- Confirm the GLIDER is powered.
- Verify SWD wires (`SWDIO`, `SWCLK`, `GND`, `VTref`) are connected correctly.
- Run `JLinkExe` interactively and `connect` to confirm the probe can see the target.

#### Console attaches but the prompt `uart:~$` never appears

The firmware is not running or has crashed. Reset the device on attach:

```bash
rttt --device nRF9151_xxCA --reset
```

#### `pylink-square` complains about `libjlinkarm.so.X`

The J-Link software pack version installed does not match the library version `pylink-square` expects. Reinstall the latest J-Link pack, or point `LD_LIBRARY_PATH` to it:

```bash
export LD_LIBRARY_PATH=/opt/SEGGER/JLink:$LD_LIBRARY_PATH
```
