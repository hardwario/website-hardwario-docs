---
slug: tower-vscode-extension
title: TOWER VSCode Extension
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

If you experience some issues or difficulties with the extension or portable version, please let us know on [**our forum**](https://forum.hardwario.com/) or directly on [**GitHub**](https://github.com/hardwario/hardwario-tower-vscode-extension/issues).

:::

This chapter focuses on the HARDWARIO TOWER Visual Studio Code extension, you will need to install some tools for this extension to work fully. If you don't want to bother with this, you can install our standalone HARDWARIO Code, on how to do that visit the [**About HARDWARIO Code chapter**](./about-hardwario-code.md).

## Installation

To install the extension just open your **Visual Studio Code** and go to the extension tab on the left side panel, type `HARDWARIO TOWER` into the search bar and click **Install** next to the first extension available.

:::tip

After a while, the extension should be installed and ready to use.

:::

<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('./images/extension-install-guide.png')} alt="VS Code Extensions marketplace with the HARDWARIO TOWER extension found by search, ready to install" /></div>
    </div>
    <div class="col col--4">
    </div>
  </div>
</div>

### Tools Setup

You will need some dependencies for the extension to work as intended:

:::tip

The extension will warn you that you are missing some of those and provide you with a corresponding link in the bottom right corner.

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 or newer**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **Linux commands**
  - You have to install git to your machine and then add the `\usr\bin\` folder to PATH. The folder path should look something like `C:\Program Files\Git\usr\bin\`

</TabItem>
<TabItem value="linux" label="Linux">

- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 or newer**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

</TabItem>
<TabItem value="macOS" label="macOS">

- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 or newer**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

</TabItem>
</Tabs>

:::tip

You can now start using the **Visual Studio Code** for developing HARDWARIO TOWER Firmware. To get some basic information on how to use the extension visit[**HARDWARIO Code Tutorial**](./hardwario-extension-tutorial.md) or you can go straight to the **Firmware Quick Start chapter**.

:::
