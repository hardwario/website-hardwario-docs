---
title: AT Console (USB-C)
sidebar_position: 2
---
import Image from '@theme/IdealImage';

# AT Console over USB-C

This page shows you how to communicate with GLIDER through its **USB-C** connector using **AT commands**. The AT console is the recommended interface for everyday work (provisioning, configuration, firmware updates) and requires no special debug hardware.

:::tip
Looking for live logs and the full Zephyr shell? Use the [**RTT Console (J-Link)**](rtt-jlink.md) instead.
:::

## How it works

Internally, GLIDER pipes UART0 of the nRF9151 to an **FT234XD USB-UART bridge** chip. The moment you plug in a USB-C cable, the firmware powers up the bridge and starts accepting AT commands.

| Signal | nRF9151 pin | Function |
| :--- | :--- | :--- |
| `UART0 TX` | `P0.25` | nRF91 → FT234XD RXD |
| `UART0 RX` | `P0.24` | nRF91 ← FT234XD TXD |
| `USB_EN` | `P0.00` | Powers the FT234XD (active high) |
| `USB_DETECT` | `P0.26` | Detects the cable (active low) |

UART0 runs at **1 000 000 baud** (configured in `gauger_lte_nrf9151_common.dtsi`).

When you connect the USB-C cable the firmware:

1. Detects the cable on `USB_DETECT` (P0.26).
2. After a 50 ms debounce, turns on `USB_EN` (P0.00), and the FT234XD boots.
3. Activates UART0 RX and starts processing AT commands.

## Prerequisites

#### System packages

```bash
sudo apt update
sudo apt install python3 python3-venv git
```

#### Membership in the `dialout` group

Linux restricts serial port access to members of the `dialout` group. Add yourself once:

```bash
sudo usermod -aG dialout $USER
```

:::caution
You must **log out and log in again** for the group change to take effect. Verify with:

```bash
groups | grep -o dialout
# should print: dialout
```
:::

#### Verify the USB-C cable enumerates

Plug in GLIDER and check:

```bash
ls -l /dev/ttyUSB0
# crw-rw---- 1 root dialout ... /dev/ttyUSB0
```

If `/dev/ttyUSB0` does not appear, check `dmesg | tail -20`. You should see something like:

```text
usb 1-2: new full-speed USB device
ftdi_sio 1-2:1.0: FTDI USB Serial Device converter detected
usb 1-2: FTDI USB Serial Device converter now attached to ttyUSB0
```

If you see errors instead, the issue is hardware-side (wrong cable, faulty connector, FT234XD not getting power).

## Full setup with a Python virtual environment

The recommended way to install the HARDWARIO command-line tools is inside a Python **virtualenv**. This isolates the packages from your system Python and works on every modern Linux distribution.

#### Step 1 - Verify `python3-venv` is installed

```bash
dpkg -l python3-venv | tail -1
# expect a line starting with "ii"
```

If it is missing:

```bash
sudo apt install python3-venv
```

#### Step 2 - Create the virtualenv

Inside your project folder:

```bash
python3 -m venv .venv
```

#### Step 3 - Activate the virtualenv

```bash
source .venv/bin/activate
```

Your shell prompt should now be prefixed with `(.venv)`.

#### Step 4 - Install the required packages

```bash
pip install --upgrade pip
pip install west pyserial loguru rttt
```

What you just installed:

| Package | Purpose |
| :--- | :--- |
| `west` | Meta-build tool used by Zephyr / nRF Connect SDK |
| `pyserial` | UART communication library |
| `loguru` | Structured logging |
| `rttt` | HARDWARIO console UI library that parses the `@LOG:` framing |

#### Step 5 - Verify the installation

```bash
west --version
python3 -c "import serial, loguru, rttt; print('OK')"
```

Both commands should succeed.

## Launching the console

In a terminal where the virtualenv is active:

```bash
source .venv/bin/activate
west serial-console
```

Defaults used by `west serial-console`:

- `--port /dev/ttyUSB0`
- `--baudrate 1000000`

If you have multiple devices, specify the port explicitly:

```bash
west serial-console --port /dev/ttyUSB1 --baudrate 1000000
```

The console keeps two streams separated:

- **AT commands and responses**: what you type and what GLIDER replies.
- **`@LOG:` messages**: live log lines that scroll past without interfering with the command line.

Useful files maintained by `west serial-console`:

- Command history: `~/.serial_console_history`
- Full session transcript: `~/.serial_console_console`
- Modem trace: `~/.serial_console.mtrace`

## A quick sanity check

```text
AT
# OK

ATI
# "GLIDER-R1.1"
```

If `OK` appears, you are talking to the device.

## Basic AT commands

| Command | What it does |
| :--- | :--- |
| `AT` | Connection test, returns `OK` |
| `AT+CLAC` | Lists all registered AT commands |
| `AT$HELP` | Same as `+CLAC` but with hints |
| `ATI` | Device identification |
| `AT+CGMI` | Vendor name |
| `AT+CGMM` | Product name |
| `AT+CGMR` | Firmware revision |
| `AT+CGSN` | Serial number |
| `AT$INFO?` | Dump of all info fields (serial, claim token, …) |
| `AT$REBOOT` | Restart the device |
| `AT&W` | Save configuration to flash |
| `AT&F` | Factory reset (wipes all configuration) |

#### Configuration over AT

```text
AT$CONFIG=? # list every configurable key
AT$CONFIG="therm config show" # current thermometer slot bindings
AT$CONFIG="therm config 1 28ab12cd…" # bind slot 1 to a specific DS18B20
AT&W # save and reboot
```

#### Running shell commands from the AT console

The AT console can also execute any **Zephyr shell command** via `AT$SHELL`:

```text
AT$SHELL="therm state"
AT$SHELL="therm scan"
AT$SHELL="therm scan --save"
AT$SHELL="kernel reboot cold"
AT$SHELL="log disable"
AT$SHELL="log enable wrn"
```

#### Firmware update

For a programmatic firmware update see the [**AT Commands**](../commands/at-commands.md) reference (`AT$FW`).

## Maintenance

| Action | Command |
| :--- | :--- |
| Leave the virtualenv | `deactivate` |
| Upgrade the tools | `pip install --upgrade west pyserial loguru rttt` |
| Remove the virtualenv | `rm -rf .venv` |
| List installed packages | `pip list` |

## Troubleshooting

#### `Permission denied` on `/dev/ttyUSB0`

```bash
ls -l /dev/ttyUSB0
# crw-rw---- 1 root dialout ...

groups | grep dialout
# if "dialout" is missing:
sudo usermod -aG dialout $USER
# then log out / log in (or run: newgrp dialout)
```

#### The port is busy

Another terminal (`screen`, `minicom`, `picocom`, `tio`, …) is already holding it:

```bash
sudo lsof /dev/ttyUSB0
screen -ls && screen -wipe
killall screen minicom picocom tio 2>/dev/null
```

#### Logs arrive, but AT commands are not echoed back

Your terminal is sending **CR only** instead of `LF` or `CRLF`. `west serial-console` handles line endings automatically, but other terminals may not. For example, when using `tio`:

```bash
tio -b 1000000 -m INLCRNL,OCRNL /dev/ttyUSB0
```

`OCRNL` maps outgoing CR to LF.

## Alternative terminals

If `west serial-console` is not available, any terminal that can do **1 000 000 baud** works:

```bash
# tio (recommended alternative)
tio -b 1000000 -m INLCRNL,OCRNL /dev/ttyUSB0
# exit: Ctrl-T Q

# picocom
picocom -b 1000000 --omap crlf /dev/ttyUSB0
# exit: Ctrl-A Ctrl-X

# pyserial miniterm
python3 -m serial.tools.miniterm /dev/ttyUSB0 1000000
# exit: Ctrl-]
```
