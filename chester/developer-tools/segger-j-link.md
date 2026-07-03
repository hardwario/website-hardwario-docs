---
slug: segger-j-link
title: SEGGER J-Link
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SEGGER J-Link

This article provides information on **SEGGER J-Link** debugger tool.

## Requirements

You will need the following hardware and software tools:

* One of these operating systems:

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12 (with Homebrew installed)
  * Windows 10 / Windows 11

* **Python 3** distribution installed on your system:

  <Tabs groupId="operating-system">
  <TabItem value="windows" label="Windows" default>

  Download the latest stable installer from [**this link**](https://www.python.org/downloads/windows/).

  :::caution

  Please tick **_Add Python x.x to PATH_** in installer so the Python executable is available from any location.

  :::

  </TabItem>
  <TabItem value="linux" label="Linux">

  Run this command in the **Terminal** app:

  ```
  sudo apt install python3
  ```

  </TabItem>
  <TabItem value="macOS" label="macOS">

  Run this command in the **Terminal** app:

  ```
  brew install python3
  ```

  </TabItem>
  </Tabs>

* **HARDWARIO CHESTER** device (you will need to open the enclosure top cover with six screws)

* USB debugger/programmer **SEGGER J-Link** (including a 10-pin SWD adapter + flat cable)

  :::tip

  **HARDWARIO** provides **SEGGER J-Link** + all the required accessories on demand.

  :::

* Micro-USB cable with appropriate plug type to your computer

  :::danger

  Some Micro-USB cables provide only power and no data signals. If the connection between J-Link, and your system does not work, check the cable type in the first place.

  :::

* Python application bundle **HARDWARIO Command Line Tools**

## Instalation

You can install **HARDWARIO Command Line Tools** with these steps:

1. On Windows only - Install SEGGER J-Link drivers:

   * Download [**64-bit Intel/AMD installer**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)

   * Download [**32-bit Intel/AMD installer**](https://www.segger.com/downloads/jlink/JLink_Windows.exe)

   * Download [**64-bit ARM installer**](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

   :::caution

   If you encounter **_An error was reported by NRFJPROG DLL: -101 JLINKARM_DLL_COULD_NOT_BE_OPENED_** please visit [this](../firmware-sdk/installation-on-ubuntu#set-up-device-rules) page.

   :::

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
   hardwario.chester v1.23.0
   hardwario.cloud v1.4.2
   hardwario.common v1.7.2
   hardwario.hardwario v1.3.1
   ```
## SEGGER J-Link to APP Port Connection

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/chester-app-flash-jlink-olimex-white.png')}/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/chester-segger-app.png')}/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## SEGGER J-Link to LTE Port Connection

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/chester-lte-flash-jlink-olimex-white.png')}/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/chester-segger-lte.png')}/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## SEGGER J-Link to LRW Port Connection

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/chester-lrw-flash-jlink-olimex-white.png')}/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/chester-segger-lrw.png')}/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />
