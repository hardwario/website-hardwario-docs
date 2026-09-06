---
slug: application-over-j-link
title: Application over J-Link
title_meta: "Application over J-Link (CHESTER)"
---
import Image from '@theme/IdealImage';

# Application over J-Link

This article will describe how to flash application firmware in CHESTER using SEGGER J-Link.

## Requirements

You will need the following hardware and software tools:

* One of these operating systems:

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12 (with Homebrew installed)
  * Windows 10 / Windows 11

* **Python 3** distribution installed on your system:

  * On Ubuntu, run this command in the **Terminal** app:

    ```
    sudo apt install python3
    ```

  * On macOS, run this command in the **Terminal** app:

    ```
    brew install python3
    ```

  * On Windows, download the latest stable installer from [**this link**](https://www.python.org/downloads/windows/).

    :::caution

    Ensure the Windows installer can modify the `PATH` variable so the Python executable is available from any location.

    :::


* HARDWARIO CHESTER device (you will need to open the enclosure top cover with six screws)

* USB debugger/programmer SEGGER J-Link (including a 10-pin SWD adapter + flat cable)

  :::tip

  HARDWARIO provides J-Link + all the required accessories on demand.

  :::

* Micro-USB cable with appropriate plug type to your computer

  :::danger

  Some Micro-USB cables provide only power and no data signals. If the connection between J-Link, and your system does not work, check the cable type in the first place.

  :::

* Python application bundle **HARDWARIO Command Line Tools**

## Installation

You can install **HARDWARIO Command Line Tools** with these steps:

1. On Windows only: Install SEGGER J-Link drivers:

   * Download [**64-bit Intel/AMD installer**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)
   * Download [**32-bit Intel/AMD installer**](https://www.segger.com/downloads/jlink/JLink_Windows.exe)
   * Download [**64-bit ARM installer**](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

1. Open the **Terminal** (Ubuntu or macOS) or **Command Prompt** (Windows) application.

1. Initialize the Python virtual environment:

   ```
   python3 -m venv hardwario-venv
   ```

1. Activate the Python virtual environment:

   ```
   source hardwario-venv/bin/activate
   ```

   :::caution

   When you close the **Terminal** or **Command Prompt**, you must reactivate the Python virtual environment. Simply call the command from the above procedure: `source hardwario-venv/bin/activate`.

   :::

1. Install **HARDWARIO Command Line Tools**:

   ```
   pip install hardwario
   ```

1. You can verify the installation with the following command:

   ```
   hardwario --version
   ```

   It should provide output similar to this:

   ```
   hardwario.chester v1.19.0
   hardwario.cloud v1.4.1
   hardwario.common v1.7.1
   hardwario.hardwario v1.2.0
   ```

## Flashing Procedure

Before you start, check that you have the application HEX file downloaded to your system; or have the firmware 128-bit unique ID available.

:::tip

Usually, the firmware application is distributed via the **HARDWARIO Cloud** and a feature called **Shareable Firmware Link** from which you can get both the HEX file and the 128-bit unique ID. With the unique ID, you don't have to send any attachments. Just provide the identifier, and the tool will download it automatically.

:::

Follow these steps to flash application firmware in the CHESTER device:

1. Connect the 10-pin flat cable to the connector labeled [**APP**](/chester/developer-tools/segger-j-link/#segger-j-link-to-app-port-connection) (or `BLE` on hardware revision R3.2 and earlier).

1. Connect the other side of the 10-pin flat cable to SEGGER J-Link adapter board (and plug the adapter board to SEGGER J-Link device).

1. Connect Micro-USB cable to SEGGER J-Link and your computer.

1. Open the **Terminal** (Ubuntu or macOS) or **Command Prompt** (Windows) application.

1. Activate the Python virtual environment where you have installed the **HARDWARIO Command Line Tools** (see the previous chapter).

1. The next operation depends on the scenario:

   * If you have an **application HEX file**, you can flash firmware using this command:

     ```
     hardwario chester app flash <PATH-TO-APPLICATION-HEX-FILE>
     ```

     Example: `hardwario chester app flash ~/Downloads/hio-chester-clime-v1.0.0.hex`

   * If you have an **application unique ID**, you can flash firmware using this command:

     ```
     hardwario chester app flash <APPLICATION-UNIQUE-ID>
     ```

     Example: `hardwario chester app flash 071ea903ae29053ee96e0124c3454238`

1. Disconnect the SEGGER J-Link adapter.
