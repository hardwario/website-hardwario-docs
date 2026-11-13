---
slug: chester-z-over-j-link
title: CHESTER-Z1 over J-Link
description: "Flash CHESTER-Z1 firmware v1.4.0 with SEGGER J-Link through the 9-pin SWD connector of the board in the top cover, without removing the board."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER-Z1 over J-Link

This article will describe how to flash firmware in **CHESTER-Z1** using **SEGGER J-Link**.

## Requirements

You will need the following hardware and software tools:

* One of these operating systems:

  * **Ubuntu 20.04** and **Ubuntu 22.04**
  * **macOS 11** and **macOS 12**
  * **Windows 10** and **Windows 11**

* Target device **CHESTER-Z1** (mounted in the top cover)

* USB debugger/programmer **SEGGER J-Link** (including a 10-pin **SWD** adapter + flat cable)

  :::tip

  **HARDWARIO** provides **SEGGER J-Link** + all the required accessories on demand.

  :::

* **Micro-USB** cable with appropriate plug type to your computer

  :::danger

  Some **Micro-USB** cables provide only power and no data signals. If the connection between **SEGGER J-Link**, and your system does not work, check the cable type in the first place.

  :::

## Installation

You can install **SEGGER J-Link Software and Documentation Pack** with these steps:

<Tabs groupId="operating-system">

<TabItem value="ubuntu" label="Ubuntu" default>

1. Download the 64-bit **DEB** package from [**this link**](https://www.segger.com/downloads/jlink/JLink_Linux_x86_64.deb).

1. Open the **Terminal** application.

1. Go to the folder with the downloaded package, for example:

   ```
   cd Downloads
   ```

1. Install the package using this command:

   ```
   sudo dpkg -i JLink_Linux_<VERSION>_x86_64.deb
   ```

   :::caution

   Don't forget to replace the `<VERSION>` placeholder with the real version in the file name.

   :::

</TabItem>

<TabItem value="macos" label="macOS">

1. Download the universal **PKG** installer from [**this link**](https://www.segger.com/downloads/jlink/JLink_MacOSX_universal.pkg).

1. Launch the downloaded installer and finish the installation.

</TabItem>

<TabItem value="windows" label="Windows">

1. Download the 64-bit Intel installer from [**this link**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe).

1. Launch the downloaded installer and finish the installation.

</TabItem>

</Tabs>

## Flashing

Follow these steps to flash the **CHESTER-Z1** firmware:

1. Open the **CHESTER** enclosure (6 screws from the bottom side).

   :::tip

   You don't need to unmount the **CHESTER-Z1** board from the top cover. The **SWD** connector for **SEGGER J-Link** is available from the bottom side of the board.

   :::

1. In the top cover, on the **CHESTER-Z1** board, find the 9-pin **SWD** connector.

1. Connect **SEGGER J-Link** and the 9-pin **SWD** connector using the flat cable.

   :::caution

   One of the wires on the flat cable between J-Link and CHESTER has red color. This red color denotes a **signal number 1**. This red-colored signal has to be oriented toward the white dot located next to the SWD connector on CHESTER-Z1 board. The same rule with the cable applies at the side of **SEGGER J-Link**.

   :::

1. Connect the **Micro-USB** cable to your computer and **SEGGER J-Link**.

1. Download the **CHESTER-Z1** firmware package [**v1.4.0**](pathname:///download/hio-chester-z-v1.4.0.zip).

1. Unzip the downloaded package.

1. Open the **Terminal** application and switch to the directory with the unzipped package.

1. Start the flash procedure:

   <Tabs groupId="operating-system">

   <TabItem value="ubuntu" label="Ubuntu" default>

   ```
   ./flash.sh
   ```

   </TabItem>

   <TabItem value="macos" label="macOS">

   ```
   ./flash.sh
   ```

   </TabItem>

   <TabItem value="windows" label="Windows">

   ```
   flash.bat
   ```

   </TabItem>

   </Tabs>

1. You should get a message about the successful operation.

1. Disconnect **SEGGER J-Link** from the **SWD** connector.
