---
slug: about-hardwario-code
title: About HARDWARIO Code
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

If you experience some issues or difficulties with the extension or portable version, please let us know on [**our forum**](https://forum.hardwario.com/) or directly on [**GitHub**](https://github.com/hardwario/hardwario-tower-vscode-extension/issues).

:::

This chapter focuses on **HARDWARIO Code** which is our slightly changed version of [**Visual Studio Code**](https://code.visualstudio.com). It includes all needed tools that are needed to develop firmware for HARDWARIO TOWER.

:::note

If you already have your **Visual Studio Code** and don't want to install the new version, there is an extension available that you can install.

You will need to install all needed tools by yourself, on how to do that visit the [**TOWER VSCode Extension chapter**](./tower-vscode-extension.md).

:::

## Installation

There is a version available for each major operating system. Installation slightly differs.

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- Download the [**HARDWARIO Code installer for windows**](https://github.com/hardwario/hardwario-code/releases)
- Complete the installer
  :::info

    At the location selection, we recommend leaving the **default path** that leads to your **user AppData** (the portable version of Visual Studio Code does not support multiple user installations).

  :::
- You should have **HARDWARIO Code** icon on the desktop
- Wait for the **HARDWARIO Code** to open
- You should see HARDWARIO Logo on the side panel and the HARDWARIO Code at the top of the window

</TabItem>
<TabItem value="linux" label="Linux">

- Download [**HARDWARIO Code**](https://github.com/hardwario/hardwario-code/releases)
- Unpack the archive wherever you want
- If you want to have a **shortcut available** and some **additional drivers installed** you can run the `install.sh` script from the unpacked folder
- Run the **code** binary from the terminal or find **HARDWARIO Code** with your search bar
- Wait for the **HARDWARIO Code** to open
- You should see HARDWARIO Logo on the side panel and the **HARDWARIO Code** at the top of the window

:::info

You might need to install an additional library with `sudo apt-get install libncurses*` (for JLink debugging).

:::

:::caution

If you don’t have a **git** installed on your system, you will have to [**install it**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for the extension to work fully.

:::

</TabItem>
<TabItem value="macOS" label="macOS">

- Download the [**HARDWARIO Code installation package**](https://github.com/hardwario/hardwario-code/releases) for macOS
  - You need to select the correct version for your architecture
- Run the installer by double clicking it
- Follow the installer instruction
- You should see a **hardwario-code** folder in your user’s ~/Applications folder
- Run `~Applications/hardwario-code/Visual Studio Code`
- Wait for the **HARDWARIO Code** to open
- You should see HARDWARIO Logo on the side panel and the **HARDWARIO Code** at the top of the window

</TabItem>
</Tabs>

<Image img={require('./images/hardwario-code.png')} alt="VS Code with the HARDWARIO icon highlighted in the left sidebar and HARDWARIO Code in the title bar" />
<br />

:::tip

You can now start using the **HARDWARIO Code** for developing HARDWARIO TOWER Firmware. To get some basic information on how to use the extension visit [**HARDWARIO Code Tutorial**](./hardwario-extension-tutorial.md) or you can go straight to the **Firmware Quick Start chapter**.

:::


