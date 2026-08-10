---
slug: installation-on-macos
title: Installation on macOS
---
import Image from '@theme/IdealImage';

# Installation on macOS

The following article will guide you through the **CHESTER SDK** installation on **macOS**. This guide was tested on versions **macOS 12 (Monterey)** and **macOS 13 (Ventura)**.

:::caution

Before you begin, make sure you comply with the article [Requirements](./requirements.md).

:::

## Installation Steps

The installation steps are split into multiple sections. In the end, you will be able to build the `blinky` sample from the **CHESTER SDK**.

### Install Package Manager

:::tip

You can skip this step if you already have **Homebrew** installed on your system.

:::

1. Open the **Terminal** application.

1. Install the **Homebrew** package manager (if not already installed in your system):

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

1. Reboot the system:

   ```
   sudo reboot
   ```

### Install Packages

Install the following **Homebrew** packages:

```
brew install cmake ninja gperf python3 ccache qemu dtc wget libmagic
```

## Create Application

1. Create the directory for your application and switch to it:

   ```
   mkdir chester-app && cd chester-app
   ```

   :::tip

   Change the parameter `chester-app` to any desired name for your project directory.

   :::

1. Initialize the **Python** virtual environment:

   ```
   python3 -m venv .venv
   ```

1. Activate the **Python** virtual environment:

   ```
   source .venv/bin/activate
   ```

   :::caution

   When you close the shell (or your text editor with the integrated terminal), you must reactivate the virtual Python environment. Call this command (used in the procedure above): `source .venv/bin/activate`. In the future, you may have various **West** workspaces with different versions of the **Python** packages, and thanks to the virtual environment concept, these will not suffer from version conflicts.

   :::

1. Upgrade the **pip** package:

   ```
   pip install --upgrade pip
   ```

1. Install the **West** tool:

   ```
   pip install west
   ```

1. Initialize the **West** workspace where you want to start your project:

   ```
   west init -m https://github.com/hardwario/chester-skeleton.git --manifest-rev main
   ```

1. Set the default board to **CHESTER (nRF52840)**:

   ```
   west config build.board chester
   ```

1. Synchronize the **West** workspace:

   ```
   west update
   ```

1. Install the **Python** dependencies:

   ```
   west packages pip --install
   ```

1. Export **Zephyr** environment:

   ```
   west zephyr-export
   ```

1. Install the **Zephyr SDK**:

   ```
   west sdk install -t arm-zephyr-eabi
   ```

## Test Build and Flash

1. Go to the `blinky` sample directory:

   ```
   cd chester/samples/blinky
   ```

1. Check that you can build the sample:

   ```
   west build
   ```

   The final build result should look like this:

   ```
   Memory region         Used Size  Region Size  %age Used
           FLASH:      112320 B         1 MB     10.71%
            SRAM:       60576 B       256 KB     23.11%
        IDT_LIST:          0 GB         2 KB      0.00%
   ```

1. If your CHESTER APP/BLE is [**connected**](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) with J-Link. [**Drivers**](../developer-tools/segger-j-link) are installed and [**power is on**](../developer-tools/power-profiler-kit-ii.md#basic-usage), you can flash compiled blinky code by typing

   ```
   west flash
   ```
