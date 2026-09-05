---
slug: application-over-at
title: Application over USB-C
---
import Image from '@theme/IdealImage';

# Application over USB-C

You can update GLIDER firmware over the **USB-C cable**, with no debug probe.

## What you need

- A working [**USB-C AT console**](../console/usb-at.md).
- The firmware image file: **`zephyr.signed.bin`**. Either build it yourself with `west build`, or ask HARDWARIO for the latest release.

## Steps

1. Open a terminal in the GLIDER firmware workspace and activate the virtualenv:

    ```bash
    cd ~/Hardwario/firmware
    source .venv/bin/activate
    ```

2. Connect GLIDER to your computer with a USB-C cable.

3. Run the flashing command:

    ```bash
    west bin-to-at --input-file path/to/zephyr.signed.bin --output-file update.at
    west serial-console --input update.at
    ```

    The console streams the new image to the device. When it finishes, GLIDER reboots into the new firmware.

4. Confirm the new image so it does not roll back:

    ```text
    AT$FW="confirm"
    ```

5. Verify the version:

    ```text
    AT+CGMR
    ```

That is the full procedure.

:::caution
You must send `AT$FW="confirm"` after the reboot. If you skip this step, the device falls back to the previous firmware the next time it reboots.
:::

:::info
If you already have GLIDER's build output sitting in `build/`, you can skip `--input-file`, because `west bin-to-at` finds `zephyr.signed.bin` automatically.
:::
