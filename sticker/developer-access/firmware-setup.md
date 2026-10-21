---
title: Firmware Setup
---
import Image from '@theme/IdealImage';

# Firmware Setup

Set up the STICKER firmware repository locally, build binaries, flash a **debug** image (which enables the interactive shell console), and open the console. This is the entry point for the [**Developer Access**](../developer-mode.md) workflow.

:::info Firmware v2.0.0
STICKER firmware is built on **Zephyr RTOS**. This guide covers setting up the development workspace, compiling the release, debug and provisioning images, flashing via SWD, and understanding the security model. Firmware v2.0.0 builds against HARDWARIO's Zephyr fork and needs a patch applied after every `west update` (see step 2).
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
west init -m https://github.com/hardwario/sticker-firmware.git
west update
west patch apply
west zephyr-export
west packages pip --install
```

The manifest (`west.yml`) pins HARDWARIO's Zephyr fork, [**hardwario/sticker-zephyr**](https://github.com/hardwario/sticker-zephyr), at a fixed revision. `west patch apply` applies the STICKER patches to the west-managed modules (the `loramac-node` LoRaWAN stack). **Run it again after every `west update`**; a LoRaWAN build refuses to configure while the patch is missing.

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

To format the source code with `clang-format`, run `make format` from the repository root (not from `app`).

**To build and flash a debug image:**

```bash
make debug
make flash
```

### Build Variants

| | Release | Debug | Provisioning |
|---|---|---|---|
| Build command (in `app`) | `make` | `make debug` | `west build -p always -b sticker -- -DEXTRA_CONF_FILE="debug.conf;provisioning.conf"` |
| Shell and RTT console | no | yes | yes |
| Log output | none | warnings and errors | none |
| Sensors | all | 1-Wire, accelerometer, PIR and buzzer left out | all |
| LoRaWAN regions | EU868, US915, AU915, AS923 | EU868 | EU868 |
| P2P radio | yes | no | no |
| Sensor history | 32 KB flash ring | 992 B RAM ring, cleared at boot | minimal RAM ring |
| Power management | on | off (auto-suspend after 2 h) | off (auto-suspend after 2 h) |

- **Release** is the production image: no console, every sensor and region, the P2P radio, and history in flash.
- **Debug** (`debug.conf`) adds the RTT shell and log, and makes room for them by leaving out some sensors, the P2P radio and the regions other than EU868. Re-enable a sensor for a bench session on the command line, for example `west build -p always -b sticker -- -DEXTRA_CONF_FILE=debug.conf -DCONFIG_W1=y`. The debug image is close to its flash limit; if a build with an extra subsystem does not fit, add `-DCONFIG_SHELL_HELP=n`.
- **Provisioning** (`debug.conf` + `provisioning.conf`) is the production-line image: every sensor on and the shell for writing the identity, keys and configuration, without log output. The release image is then flashed **without an erase** and boots with the values written. Set `config radio-mode lorawan` and `settings save` during provisioning, so the release image joins on its first boot. Build both images from the same commit, so their settings layout matches.

Every tagged release on GitHub ships the three images, `hio-sticker-<version>-release.hex`, `hio-sticker-<version>-debug.hex` and `hio-sticker-<version>-provisioning.hex`, together with a `SHA256SUMS` file for checking a download (`sha256sum -c SHA256SUMS`).

:::caution Protect NVS Storage & Provisioning Keys
`make flash` executes a standard `west flash` which overwrites only the application flash partition. **Never execute a full chip erase** (`west flash --erase` or J-Link mass erase), as this will erase the non-volatile storage (NVS) containing the serial number, secret key, claim token, and LoRaWAN credentials.
:::

---

## Opening the Console

Once a debug image is flashed and the J-Link probe is attached, start the RTT terminal from the `app` directory:

```bash
make rttt
```

This opens an interactive shell prompt where you can execute `config`, `alarm`, `sensor`, `history`, `clock`, `settings` and `ats` commands.

:::info Console Auto-Suspend
In debug builds, the MCU remains active to keep the RTT console responsive, which increases battery draw. If no console activity is detected for `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (default: 2 hours), the device enters deep sleep. Reset the MCU or cycle power to re-enable console access. Production release builds are not affected by this behavior and enter deep sleep immediately between sampling intervals.
:::