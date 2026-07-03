---
title: Firmware Setup
---
import Image from '@theme/IdealImage';

# Firmware Setup

Set up the STICKER firmware locally, flash a **debug** image (which enables the shell console), and open the console. This is the entry point for the [**Developer Access**](../developer-mode.md) workflow.

## What you need

- A STICKER in Debug Mode (open, programmable).
- A SEGGER **J-Link** debug probe (SWD) - used for flashing and for the RTT console.
- A Linux or macOS host with **Python 3** and **git**.

---

## Set up the firmware repository locally

The firmware is an open Zephyr project, hosted at [**github.com/hardwario/sticker-firmware**](https://github.com/hardwario/sticker-firmware), and managed with **West** (the Zephyr meta-tool). The steps below create a West workspace, fetch the firmware together with its pinned Zephyr fork, and install the toolchain.

### 1. Create a workspace and Python environment

```bash
mkdir sticker && cd sticker
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install west
```

### 2. Fetch the firmware and Zephyr

```bash
west init -m https://github.com/hardwario/sticker-firmware.git
west update
west zephyr-export
west packages pip --install
```

`west init` clones the firmware into a `sticker/` folder inside the workspace, and `west update` fetches the pinned Zephyr fork alongside it.

### 3. Install supporting tools

```bash
pip install rttt
pip install protobuf grpcio-tools
```

### 4. Install the Zephyr SDK

```bash
west sdk install
```

---

## Build and flash

All firmware commands run from the firmware repository's `app` directory:

```bash
cd sticker/app
```

To get the shell console you must flash a **debug** build (the console is compiled out of the release build):

```bash
make debug
make flash
```

`make flash` programs the last build through the J-Link probe. Other useful targets:

| Command | Description |
|---|---|
| `make` | Build the **release** image (no console). |
| `make debug` | Build the **debug** image (interactive shell console enabled). |
| `make flash` | Flash the most recent build to the device. |
| `make clean` | Remove build outputs. |
| `make rttt` | Open the RTT terminal (see below). |

:::caution Do not mass-erase a provisioned device
`make flash` runs a plain `west flash`, which writes only the firmware image and leaves stored settings intact. A full-chip erase (`west flash --erase`, or a J-Link mass erase) wipes the NVS `storage` region, which holds the serial number, secret key, claim token and LoRaWAN keys. Never mass-erase a unit you want to keep provisioned.
:::

---

## Open the console

With a debug image flashed and the J-Link connected, open the RTT terminal from the `app` directory:

```bash
make rttt
```

You now have an interactive shell prompt. Configuration and diagnostics are entered here as shell commands; see the command pages under [**Developer Access**](../developer-mode.md).

:::info Debug builds auto-suspend when idle
A debug image keeps the CPU awake so the console stays reachable, which drains the battery. After `CONFIG_APP_DEBUG_AUTOSUSPEND_S` of no shell activity (default 2 hours; `0` disables it) the device enters deep sleep; wake it with NRST or a power cycle. See [**Features**](../features.md) for details. The release build is unaffected.
:::
