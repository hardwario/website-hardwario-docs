---
slug: lte-modem-over-j-link
title: LTE Modem over J-Link
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LTE Modem over J-Link

This article describes how to flash the LTE modem firmware in **CHESTER** using **SEGGER J-Link**.

## Requirements

You will need the following hardware and software tools:

* One of these operating systems:

  * **Ubuntu** version 24.04
  * **macOS** version 15 (with Homebrew installed)
  * **Windows** version 11

* **Python 3** distribution installed on your system:

  <Tabs groupId="operating-system">

  <TabItem value="ubuntu" label="Ubuntu" default>

  Run this command in the **Terminal** app:

  ```
  sudo apt install python3
  ```

  </TabItem>

  <TabItem value="macos" label="macOS">

  Run this command in the **Terminal** app:

  ```
  brew install python3
  ```

  </TabItem>

  <TabItem value="windows" label="Windows">

  Download the latest stable installer from [this link](https://www.python.org/downloads/windows/).

  :::caution

  Ensure the Windows installer can modify the `PATH` variable so the **Python** executable is available from any location.

  :::

  </TabItem>

  </Tabs>

* **CHESTER** device (you will need to open the enclosure top cover with six screws)

* USB debugger/programmer **SEGGER J-Link** (including a 10-pin **SWD** adapter + flat cable)

  :::tip

  **HARDWARIO** provides J-Link + all the required accessories on demand.

  :::

* Micro-USB cable with appropriate plug type to your computer

  :::danger

  Some Micro-USB cables provide only power and no data signals. If the connection between J-Link, and your system does not work, check the cable type in the first place.

  :::

* Python application bundle **HARDWARIO Command Line Tools**

## Installation

You can install **HARDWARIO Command Line Tools** with these steps:

1. On Windows only: Install the **SEGGER J-Link** drivers:

   * Download [64-bit Intel/AMD installer](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)
   * Download [32-bit Intel/AMD installer](https://www.segger.com/downloads/jlink/JLink_Windows.exe)
   * Download [64-bit ARM installer](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

1. Open the **Terminal** (Ubuntu or macOS) or **Command Prompt** (Windows) application.

1. Initialize the **Python** virtual environment:

   ```
   python3 -m venv hardwario-venv
   ```

1. Activate the **Python** virtual environment:

   <Tabs groupId="operating-system">

   <TabItem value="ubuntu" label="Ubuntu" default>

   ```
   source hardwario-venv/bin/activate
   ```

   </TabItem>

   <TabItem value="macos" label="macOS">

   ```
   source hardwario-venv/bin/activate
   ```

   </TabItem>

   <TabItem value="windows" label="Windows">

   ```
   hardwario-venv\Scripts\activate.bat
   ```

   </TabItem>

   </Tabs>

   :::caution

   When you close the **Terminal** or **Command Prompt**, you must reactivate the **Python** virtual environment. Simply repeat the appropriate command for the given platform above.

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

Follow these steps to flash the LTE modem firmware in the **CHESTER** device:

1. Open the **CHESTER** enclosure (6 screws from the bottom side).

1. Connect the 10-pin flat cable to the [connector labeled `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (or `BLE` on hardware revision R3.2 and earlier).

   :::caution

   One of the wires on the flat cable between **SEGGER J-Link** and **CHESTER** has red color. This red color denotes signal number `1`. This red-colored signal has to be oriented toward the black dot located next to the **SWD** connector on the **CHESTER** mainboard. The same rule with the cable applies at the side of **SEGGER J-Link**.

   :::

1. Connect the other side of the 10-pin flat cable to the **SEGGER J-Link** adapter board (and plug the adapter board into the **SEGGER J-Link** device).

1. Connect the **Micro-USB** cable to your computer and **SEGGER J-Link**.

1. Open the **Terminal** (Ubuntu or macOS) or **Command Prompt** (Windows) application.

1. Activate the **Python** virtual environment where you have installed the **HARDWARIO Command Line Tools** (see the previous chapter).

1. Run this command to erase the application firmware:

   ```
   hardwario chester app erase
   ```

   :::tip

   The application firmware erase is required in order to prevent the reset signal collision between **SEGGER J-Link** and the application firmware.

   :::

1. Connect the 10-pin flat cable to the [connector labeled `LTE`](../developer-tools/segger-j-link.md#segger-j-link-to-lte-port-connection).

   :::caution

   One of the wires on the flat cable between **SEGGER J-Link** and **CHESTER** has red color. This red color denotes signal number `1`. This red-colored signal has to be oriented toward the black dot located next to the **SWD** connector on the **CHESTER** mainboard. The same rule with the cable applies at the side of **SEGGER J-Link**.

   :::

1. Download the **LTE modem** firmware package [**v1.7.0**](pathname:///download/hio-chester-lte-v1.7.0.zip).

   :::info

   If you are looking for the LTE modem firmware compatible with the **LTE v1** communication stack for the **HARDWARIO Cloud v1** service, you need to download and flash [**v1.3.0**](pathname:///download/hio-chester-lte-v1.3.0.zip).

   :::

1. Run this command to flash the LTE modem firmware:

   ```
   hardwario chester lte flash hio-chester-lte-v1.7.0.zip
   ```

1. Connect the 10-pin flat cable to the [connector labeled `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (or `BLE` on hardware revision R3.2 and earlier).

   :::caution

   One of the wires on the flat cable between **SEGGER J-Link** and **CHESTER** has red color. This red color denotes signal number `1`. This red-colored signal has to be oriented toward the black dot located next to the **SWD** connector on the **CHESTER** mainboard. The same rule with the cable applies at the side of **SEGGER J-Link**.

   :::

1. Flash the application firmware.

1. Disconnect the **SEGGER J-Link** adapter.

## Nordic nRF9160 Modem Firmware

The procedure above flashes the **HARDWARIO LTE modem firmware**, the communication stack that connects **CHESTER** to **HARDWARIO Cloud**. That is a different image from the **Nordic modem firmware** (the baseband image, distributed as `mfw_nrf9160_*.zip`), which is the low-level cellular firmware of the **nRF9160** SiP itself. The two images are flashed independently and with different commands.

Most deployments never need to touch the Nordic modem firmware. You need this procedure only when a specific network or SIM card requires a particular modem firmware version, for example a **Vodafone Ukraine** SIM card, which requires **v1.3.7**. See [**Tested SIM cards and operators**](../platform-connectivity/cellular-networks/sim-card-setup.md#tested-sim-cards-and-operators).

:::caution

Flash a specific Nordic modem firmware version only when the operator or **HARDWARIO** support tells you to. Changing this image affects cellular behavior on all networks, not just the one you are troubleshooting.

:::

The hardware setup, the **Python** virtual environment and the cabling rules are the same as in the [**Flashing Procedure**](#flashing-procedure) above.

1. Download the modem firmware package from the **nRF9160** download section at **Nordic Semiconductor**. Direct link for version **1.3.7**: [`mfw_nrf9160_1.3.7.zip`](https://nsscprodmedia.blob.core.windows.net/prod/software-and-other-downloads/dev-kits/nrf9160-dk/nrf9160-modem-fw/mfw_nrf9160_1.3.7.zip).

1. Open the **CHESTER** enclosure (6 screws from the bottom side) and connect **SEGGER J-Link** to the [connector labeled `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (or `BLE` on hardware revision R3.2 and earlier).

   :::caution

   One of the wires on the flat cable between **SEGGER J-Link** and **CHESTER** has red color. This red color denotes signal number `1`. This red-colored signal has to be oriented toward the black dot located next to the **SWD** connector on the **CHESTER** mainboard. The same rule with the cable applies at the side of **SEGGER J-Link**.

   :::

1. Activate the **Python** virtual environment with the **HARDWARIO Command Line Tools** and run this command to erase the application firmware:

   ```
   hardwario chester app erase
   ```

   :::tip

   The application firmware erase is required in order to prevent the reset signal collision between **SEGGER J-Link** and the application firmware.

   :::

1. Move the 10-pin flat cable to the [connector labeled `LTE`](../developer-tools/segger-j-link.md#segger-j-link-to-lte-port-connection).

   :::caution

   One of the wires on the flat cable between **SEGGER J-Link** and **CHESTER** has red color. This red color denotes signal number `1`. This red-colored signal has to be oriented toward the black dot located next to the **SWD** connector on the **CHESTER** mainboard. The same rule with the cable applies at the side of **SEGGER J-Link**.

   :::

1. Run this command to flash the Nordic modem firmware:

   ```
   hardwario device nrf91 flash mfw_nrf9160_1.3.7.zip
   ```

   :::info

   Note the different command. `hardwario device nrf91 flash` writes the Nordic baseband image, while `hardwario chester lte flash` writes the **HARDWARIO** LTE modem firmware described [above](#flashing-procedure).

   :::

1. Move the 10-pin flat cable back to the [connector labeled `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (or `BLE` on hardware revision R3.2 and earlier), flash the application firmware and disconnect the **SEGGER J-Link** adapter.

1. Configure the SIM card as usual: see [**SIM Card Setup**](../platform-connectivity/cellular-networks/sim-card-setup.md). Flashing the Nordic modem firmware does not change the `lte config` parameters.
