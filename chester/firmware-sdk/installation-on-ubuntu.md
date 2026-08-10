---
slug: installation-on-ubuntu
title: Installation on Ubuntu
---
import Image from '@theme/IdealImage';

# Installation on Ubuntu

The following article will guide you through the **CHESTER SDK** installation on **Ubuntu**. It has been tested on versions **Ubuntu 22.04 LTS**.

:::caution

Before you begin, make sure you comply with the article [**Requirements**](./requirements.md).

:::

## Installation Steps

The installation steps are split into multiple sections. In the end, you will be able to build the `blinky` sample from the **CHESTER SDK**.

### Update Your System

1. Open the **Terminal** application.

1. Update the package lists:

   ```
   sudo apt update
   ```

1. Upgrade the packages:

   ```
   sudo apt upgrade
   ```

1. Reboot the system:

   ```
   sudo reboot
   ```

### Set Up Device Rules

1. Open the **Terminal** application.

1. Get the package with the **udev** rules:

   ```
   wget https://github.com/NordicSemiconductor/nrf-udev/releases/download/v1.0.1/nrf-udev_1.0.1-all.deb
   ```

1. Install the package with the **udev** rules:

   ```
   sudo dpkg -i nrf-udev_1.0.1-all.deb
   ```

1. Remove the package with the **udev** rules:

   ```
   rm nrf-udev_1.0.1-all.deb
   ```

### Install Packages

Install the following **APT** packages:

```
sudo apt install --no-install-recommends git cmake ninja-build gperf ccache dfu-util device-tree-compiler wget python3-dev python3-pip python3-setuptools python3-tk python3-wheel xz-utils file make gcc gcc-multilib g++-multilib libsdl2-dev libmagic1
```

Install the **python3-venv** package:

```
sudo apt install python3-venv
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
