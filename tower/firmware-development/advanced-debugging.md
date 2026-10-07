---
slug: advanced-debugging
title: Advanced Debugging
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This chapter is about debugging with [**JLink**](https://www.segger.com/products/debug-probes/j-link/), if you don’t have one you can always [**debug with console printing**](./firmware-debugging.md).

:::

If you have a [**JLink probe**](https://www.segger.com/products/debug-probes/j-link/), you can use our HARDWARIO Code or Visual Studio Code extension to debug your firmware with it. You will need to install the extension first, for it we have a [**special chapter in this documentation**](./about-hardwario-code.md).

There is a little difference between installation with the Portable version and the standalone extension.

## Debugging with Portable Version

If you downloaded our [**HARDWARIO Code**](./about-hardwario-code.md#installation), you should have all the required dependencies in the `/data` (Windows/Linux) or `code-portable-data` (macOS) folder.

:::info

The only thing that you will need to install is JLink drivers if you don’t have them already.

:::

### Driver Installation

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Go to the `%USERPROFILE%/AppData/Local/Programs/HARDWARIO Code/data/tower/toolchain/SEGGER/JLink/USBDriver/` and run the `InstDrivers.exe` binary.

After that, you should be good to go.

</TabItem>
<TabItem value="linux" label="Linux">

You have to update the **UDEV rules** for the **JLink** to work. Just copy the command below and replace `PATH_TO_HARDWARIO_CODE` with the actual path to the `hardwario-code` folder.

```bash
sudo cp PATH_TO_HARDWARIO_CODE/hardwario-code/data/tower/toolchain/SEGGER/JLink/99-jlink.rules /etc/udev/rules.d/99-jlink.rule
```

:::info

You have to unplug and plug the JLink and reboot your system after executing the command.

After that, you should be able to start debugging with JLink.

:::

</TabItem>
<TabItem value="macOS" label="macOS">

On macOS, the JLink should be detected automatically.

There are no additional steps needed.

</TabItem>
</Tabs>

## Debugging with Visual Studio Code Extension

If you did choose to use your own **Visual Studio Code** with [**our extension installed**](./tower-vscode-extension.md) you will have to follow the [**JLink installation for your system**](https://eclipse-embed-cdt.github.io/debug/jlink/install/).
