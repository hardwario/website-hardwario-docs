---
slug: installation-on-windows
title: Installation on Windows
---
import Image from '@theme/IdealImage';

# Installation on Windows

The following article will guide you through the **CHESTER SDK** installation on **Windows**. This guide was tested on **Windows versions 10 and 11**.

:::caution

Before you begin, make sure you comply with the article [**Requirements**](./requirements.md).

:::

## Installation Steps

The installation steps are split into multiple sections. In the end, you will be able to build the `blinky` sample from the **CHESTER SDK**.

### Install Python

:::tip

You can skip this step if you already have **Python** installed on your system.

:::

Download the latest stable installer from [**this link**](https://www.python.org/downloads/windows/).

:::caution

Ensure the Windows installer can modify the `PATH` variable so the **Python** executable is available from any location.

:::

### Install Package Manager

:::tip

You can skip this step if you already have **Chocolatey** installed on your system.

:::

1. Open the **Windows PowerShell** application with administrator rights.

   :::info

   You can quickly launch **Windows PowerShell** as an administrator from the **Windows Search** bar. In the search bar, type `Windows PowerShell`, right-click the **Windows PowerShell** app in the search results, and click **Run as administrator** in the menu.

   :::

1. Run this command:

   ```
   Get-ExecutionPolicy
   ```

1. If the previous command returns `Restricted`, run the following command:

   ```
   Set-ExecutionPolicy AllSigned
   ```

   :::info

   Choose option `A` when asked.

   :::

1. Execute the following command:

   ```
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

1. Wait a few seconds for the previous command to complete.

1. You are ready to use **Chocolatey** if you don't see any errors.

1. Close the **Windows Powershell** application.

   :::caution

   It is better to close it now even though we re-open it in the next section. Some important changes are reflected only with the new application session.

   :::

### Install Packages

1. Open the **Windows PowerShell** application with administrator rights.

   :::info

   You can quickly launch **Windows PowerShell** as an administrator from the **Windows Search** bar. In the search bar, type `Windows PowerShell`, right-click the **Windows PowerShell** app in the search results, and click **Run as administrator** in the menu.

   :::

1. Disable global confirmation to avoid having to confirm the installation of individual programs:

   ```
   choco feature enable -n allowGlobalConfirmation
   ```

1. Install the **CMake** package:

   ```
   choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
   ```

1. Install the remaining packages:

   ```
   choco install ninja gperf git dtc-msys2 wget 7zip
   ```

1. Close the **Windows Powershell** application.

## Create Application

:::caution

Close your previous PowerShell and open new one with user rights. **Do not continue with Administrator rights.**

:::

You should be now in your home directory. However, you might continue the next steps in the different directory where you want the project.

Do not use a folder that has spaces anywhere in the path.

1. Open the **Windows PowerShell** application with **user** rights.

1. Go to your home directory:

   ```
   Set-Location ~
   ```

1. Create the directory for your application:

   ```
   mkdir chester-app
   ```

   :::tip

   Change the parameter `chester-app` to any desired name for your project directory.

   :::

   :::danger

   On the Windows platform, you must use the directory path without any spaces. Also, keep only ASCII letters/digits in the path. Otherwise, you may encounter issues with the toolchain.

   :::

1. Switch to your application directory:

   ```
   cd chester-app
   ```

1. Initialize the **Python** virtual environment:

   ```
   python -m venv .venv
   ```

1. Activate the **Python** virtual environment:

   ```
   .\.venv\Scripts\Activate.ps1
   ```

   :::caution

   When you close the shell (or your text editor with the integrated terminal), you must reactivate the virtual Python environment. Call this command (used in the procedure above): `.\.venv\Scripts\Activate.ps1`. In the future, you may have various **West** workspaces with different versions of the **Python** packages, and thanks to the virtual environment concept, these will not suffer from version conflicts.

   :::

1. Upgrade the **pip** package:

   ```
   python -m pip install --upgrade pip
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

1. If your CHESTER APP/BLE is [**connected**](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) with J-Link. [**Drivers**](/chester/developer-tools/segger-j-link/) are installed and [**power is on**](../developer-tools/power-profiler-kit-ii.md#basic-usage), you can flash compiled blinky code by typing

   ```
   west flash
   ```
