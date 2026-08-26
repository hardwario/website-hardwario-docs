---
title: Firmware Setup
---
import Image from '@theme/IdealImage';

# Firmware Setup

Set up the STICKER firmware repository locally, build binaries, flash a **debug** image (which enables the interactive shell console), and open the console. This is the entry point for the [**Developer Access**](../developer-mode.md) workflow.

:::info Firmware v1.4.0
STICKER firmware is built on **Zephyr RTOS**. This guide covers setting up the development workspace, compiling release/debug binaries, flashing via SWD, and understanding the security model.
:::

---

## Security Model & Firmware Architecture

STICKER uses a **flat application image** linked directly from the base of flash memory:
- **No Remote Bootloader or FUOTA:** The device does not include MCUboot or a DFU partition. There is no over-the-air (FUOTA) or NFC firmware update capability. The legacy `enter_dfu` command was deliberately removed.
- **Zero Remote Attack Surface:** Firmware images cannot be replaced, downgraded, or tampered with over LoRaWAN or NFC.
- **Physical SWD Access Only:** Reprogramming or updating firmware in the field strictly requires physical access to the SWD programming pads using a SEGGER J-Link probe (`make flash`).

---

## What You Need

- **STICKER device** with physical SWD access.
- **SEGGER J-Link debug probe** (SWD connection) for flashing and RTT console output.
- **Host System:** Linux or macOS with Python 3, Git, and CMake.
  - *NixOS / Nix users:* A `shell.nix` file is provided at the repository root to automatically set up the ARM toolchain, J-Link, and Python environment via `nix-shell`.

---

## Local Development Workspace Setup

The firmware repository is hosted at [**github.com/hardwario/sticker-firmware**](https://github.com/hardwario/sticker-firmware) and managed using **West** (the Zephyr meta-tool).

### 1. Create a Workspace & Virtual Environment

```bash
mkdir sticker && cd sticker
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install west
```

### 2. Fetch Firmware & Zephyr SDK Modules

```bash
west init -m [https://github.com/hardwario/sticker-firmware.git](https://github.com/hardwario/sticker-firmware.git)
west update
west zephyr-export
west packages pip --install
```

### 3. Install Supporting Dependencies

```bash
pip install rttt
pip install protobuf grpcio-tools
west sdk install
```

---

## Building and Flashing

All compilation and flashing commands are executed from the `app` directory of the firmware workspace:

```bash
cd sticker/app
```

### Build Targets

| Command | Description |
|---|---|
| `make` | Build the **production release** image (shell console disabled for maximum power savings). |
| `make debug` | Build the **debug** image (interactive shell console enabled). |
| `make flash` | Program the compiled binary to the device via J-Link SWD. |
| `make clean` | Purge build artifacts and CMake cache. |
| `make rttt` | Launch the interactive RTT terminal console. |
| `make format` | Format source code using `clang-format`. |

**To build and flash a debug image:**

```bash
make debug
make flash
```

:::caution Protect NVS Storage & Provisioning Keys
`make flash` executes a standard `west flash` which overwrites only the application flash partition. **Never execute a full chip erase** (`west flash --erase` or J-Link mass erase), as this will erase the non-volatile storage (NVS) containing the serial number, secret key, claim token, and LoRaWAN credentials.
:::

---

## Opening the Console

Once a debug image is flashed and the J-Link probe is attached, start the RTT terminal from the `app` directory:

```bash
make rttt
```

This opens an interactive shell prompt where you can execute `config`, `alarm`, `history`, `clock`, and `ats` commands.

:::info Console Auto-Suspend
In debug builds, the MCU remains active to keep the RTT console responsive, which increases battery draw. If no console activity is detected for `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (default: 2 hours), the device enters deep sleep. Reset the MCU or cycle power to re-enable console access. Production release builds are not affected by this behavior and enter deep sleep immediately between sampling intervals.
:::