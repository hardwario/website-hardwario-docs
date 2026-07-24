---
slug: firmware-quick-start
title: Firmware Quick Start
---
import Image from '@theme/IdealImage';

You can easily edit or create your custom firmware for [**TOWER Core Module**](../hardware-modules/about-core-module.md) on every major operating system.

## Getting your first TOWER firmware

:::tip

If you are returning to the project use the **Open folder** option in VSCode. Go to the `File -> Open Folder...` or use `Ctrl + K` then `Ctrl + O`.

:::

- Open **VSCode** and click the **HARDWARIO Icon** on the left sidebar

<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('./images/hardwario-code-sidebar-icon.png')} alt="VS Code left sidebar with an arrow pointing to the HARDWARIO icon" /></div>
    </div>
    <div class="col col--4">
    </div>
  </div>
</div>

- In the section **TOWER: Start** select **From Skeleton Project...**
- Select **Folder** where the new firmware project folder should be created
- You will be prompted to name the folder, default **twr-skeleton** is just fine for now
- Wait for the firmware to finish downloading
- Visual Studio Code will reopen with the new firmware opened

:::info

You can also download the firmware with the **git command**.

```bash
git clone --recursive https://github.com/hardwario/twr-skeleton.git
```

:::

:::tip

You can select **From Existing Project...** instead of **From Skeleton Project...** to clone any other project from [**GitHub**](https://github.com/hardwario).

:::

## Project Structure

This is the file structure of the **twr-skeleton project** that you just cloned. It is a Git-initialized repository ready to be used *out of the box*.

This project can be immediately **compiled and flashed** to the [**Core Module**](../hardware-modules/about-core-module.md) or [**Radio Dongle**](../hardware-modules/about-core-module.md)

```
.
├── .git
│   └── ...skipped
├── .github
│   └── CI files, you can put some workflow for GitHub Actions here
├── .vscode
│   └── ...skipped
├── sdk
│   └── a lot of files (mostly not important for normal user)
├── src
│   └── application.c
|   └── application.h
|   └── CMakeLists.txt
├── .editorconfig
├── .gitignore
├── .gitmodules
├── CMakeLists.txt
├── LICENSE
└── README.md
```

The place where you should edit your code is in the `src` directory.
Usually, you will not need to modify other files than those.

Therefore your first step most likely will be to open the src/application.c file.

:::note

If you are using [**HARDWARIO Code Visual Studio Code extension**](./about-hardwario-code.md) the `src/application.c` will be opened automatically.

:::

:::info

If you want to see some firmware examples, you can visit our [**GitHub**](https://github.com/hardwario) repository or some of the **How to: chapters** in the [**Firmware SDK section**](../firmware-sdk/index.md).

:::

## Development Cycle

Normally, the development cycle is the repetition of the **following 4 steps**.

- Edit the `src/application.c` and save changes **Ctrl + S**
- Click on [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console) to **compile**, **flash** and **open the serial console for logging**.
  - You can also work with [**the CLI Tools**](./development-with-cli-tools.md)
- Test your firmware
  - If you need to debug your application, please follow the [**Debugging chapter**](./firmware-debugging.md).

## Programming Language

Firmware is implemented in **pure C language**, which is an industrially accepted language for embedded and low-power devices.

There are the main reasons for choosing this technology.

- Efficient use of hardware resources
- Stability and long-time available development environment
- Simple and understandable syntax

You can use all known C language structures and also [**our SDK**](../firmware-sdk/index.md) that is implemented so you can quickly and easily, without any problems with compatibility, create your custom firmware.

## Troubleshooting

If you can't detect or flash the **Radio Dongle** or **Core Module** it can be a driver or OS issue. You can try some fixes based on your system

- On **Windows** and **macOS** please install the [**FTDI VCP drivers**](https://ftdichip.com/drivers/vcp-drivers/)
- On **Ubuntu**, you need to be in `dialout` user group. Please use the command `sudo usermod -a -G dialout $USER` and restart the computer

## Next steps

From now you should be able to **create firmware** and **update existing ones**.

To know more about our modules and see some examples you can read the [**Hardware Modules**](../hardware-modules/index.md) section or [**Firmware SDK section**](../firmware-sdk/index.md)
