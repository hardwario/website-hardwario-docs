---
slug: application-over-j-link
title: Application over J-Link
title_meta: "Application over J-Link (GLIDER)"
---
import Image from '@theme/IdealImage';

# Application over J-Link

You can update GLIDER firmware over a **SEGGER J-Link** debug probe. This is the fast path used during firmware development.

## What you need

- A working GLIDER firmware workspace (Zephyr / nRF Connect SDK installed, with `west` and the toolchain).
- A SEGGER J-Link probe connected over SWD to the GLIDER debug header (`SWDIO`, `SWCLK`, `GND`, `VTref`).
- GLIDER powered on.
- The SEGGER J-Link software pack installed (`which JLinkExe` returns a path).

## Steps

1. Open a terminal in the GLIDER firmware workspace and activate the virtualenv:

    ```bash
    cd ~/Hardwario/firmware
    source .venv/bin/activate
    ```

2. Build the firmware (skip if you already have a build):

    ```bash
    west build -b gauger_lte/nrf9151/ns application
    ```

3. Flash it to the device:

    ```bash
    west flash
    ```

`west flash` automatically erases the application area, writes the new image, and resets the device. The new firmware is running as soon as the command finishes.

:::caution
J-Link flashing is destructive: the previous image is overwritten immediately and there is no automatic rollback. Use [**Application over USB-C**](application-over-at.md) when you want the safety net of MCUboot's rollback mechanism.
:::

:::info
If you have several probes plugged in, select one with `west flash --dev-id <jlink-serial-number>`.
:::
