---
slug: hardwario-tower-console
title:  TOWER Console
---
import Image from '@theme/IdealImage';

:::info

This tutorial expects that you have a running Visual Studio Code with our HARDWARIO TOWER extension installed. If you don’t please visit the [**About HARDWARIO Code**](./about-hardwario-code.md).

:::

For logging with the **HARDWARIO Code** there is an available tab in the bottom panel.

<Image img={require('./images/hardwario-console-showcase.png')} alt="TOWER tab highlighted in the VS Code bottom panel, showing NO DEVICE ATTACHED" />
<br />

In this console, there will be some logs displayed from your connected device.

:::info

For the firmware to print something to this console you will have to include some log messages in it. You can read more about that in [**Debugging chapter**](./firmware-debugging.md).

:::

## Controls

There are several buttons on the right side if you open the HARDWARIO TOWER Console. They will be listed from left to right

<div class="container">
  <div class="row">
    <div class="col col--3">
      <h4>No device connected</h4>
      <div><Image img={require('./images/console-commands-disconnected.png')} alt="TOWER console toolbar icons available while no device is connected" /></div>
    </div>
    <div class="col col--3">
      <h4>TOWER device connected</h4>
      <div><Image img={require('./images/console-commands-connected.png')} alt="TOWER console toolbar icons available with a TOWER device connected, including device restart" /></div>
    </div>
  </div>
</div>


- **Clear console** - this will just clear all the log messages that you received.
- **Connect/Disconnect console** - this will attach the console to the device that is selected on the bottom panel. If the console is already attached it will disconnect it. You don’t have to use this button if you are using extension commands [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console) or [**Attach console**](./hardwario-extension-tutorial.md#attach-console).
- **Restart device** - this command will restart the connected device and start the program on the device from the beginning.
- **Scroll to bottom** - by default, the console will scroll automatically with the messages. If you scroll to view some message auto scroll will turn off. To start it again, just click this button.
- **Save Log** - this will save the displayed log.
- **Allow Input** - this will allow sending input to the device. [**Usable for AT commands**](../radio-communication/lora-at-commands.md).
- **Maximize window** - this will make the console bigger. It is a standard Visual Studio Code button available on most panels.
- **Close panel** - this will close the whole panel, not just HARDWARIO TOWER Console.
