---
slug: development-cli-tools
title: Development with command line tools
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

If you want to develop using a GUI tool, please visit [**About HARDWARIO Code**](./about-hardwario-code.md) or [**TOWER VSCode Extension**](./tower-vscode-extension.md) chapter.

:::

This chapter focuses on developing firmware using strictly command-line tools.

:::caution

This chapter will go over using multiple tools like **CMake** and **ninja**, it will also go over our command-line flashing tool. There is a separate chapter on [**Firmware Flashing Tool**](../command-line-tools/firmware-tool.md) where you can learn how to install it.

:::

## Installation

You will need to install a few tools so you will be able to build your project:

:::note

All of these have to be in **PATH**.

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- [**bcf**](../command-line-tools/firmware-tool.md)
- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 or newer**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**make**](https://www.technewstoday.com/install-and-use-make-in-windows/) (**LEGACY**)

</TabItem>
<TabItem value="linux" label="Linux">

- [**bcf**](../command-line-tools/firmware-tool.md)
- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 or newer**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**make**](https://linuxhint.com/install-make-ubuntu/) (**LEGACY**)

</TabItem>
<TabItem value="macOS" label="macOS">

- [**bcf**](../command-line-tools/firmware-tool.md)
- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 or newer**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**make**](https://formulae.brew.sh/formula/make) (**LEGACY**)

</TabItem>
</Tabs>

## Development cycle

- First, you need to clone some firmware from [**our GitHub**](https://github.com/hardwario). For a blank start, there is the [**twr-skeleton**](https://github.com/hardwario/twr-skeleton) firmware available
  - To clone the firmware use:
    ```
    git clone https://github.com/hardwario/twr-skeleton.git --recursive
    ```
    :::note

    The `--recursive` flag is needed to clone all submodules as well, mainly SDK submodule.

    :::
- Open the project in your favorite editor
- Make some changes to the code
- Run **CMake** to generate build files:
  ```
  cmake -B obj/debug . -G Ninja -DTYPE=debug -DCMAKE_TOOLCHAIN_FILE=sdk/toolchain/toolchain.cmake
  ```
- Run ninja to generate the final firmware binary:
  ```
  ninja -C obj/debug
  ```
- Flash firmware to your device with `bcf` (you will be prompted to select the device that you want to flash)
  ```
  bcf flash
  ```
- If you want to attach the console to your device for some debugging, run `bcf` with `--log` flag or just run `bcf log`:
  ```
  bcf flash --log
  ```
  **OR**
  ```
  bcf log
  ```
- To clean output so you can compile everything from scratch just run:
  ```
  ninja -t clean
  ```
- **Repeat these steps until you have the final firmware that you want**
