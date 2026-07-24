---
slug: power-profiler-kit-ii
title: Power Profiler Kit II
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ReactPlayer from 'react-player'

# Power Profiler Kit II

This article provides information on **Power Profiler Kit II** (further referred to as **PPK2**) from **Nordic Semiconductor**.

:::info

You can purchase **Power Profiler Kit II** directly from **HARDWARIO**.

:::

## Setup

In order to use **Power Profiler Kit II**, you must install or run ** nRF Connect for Desktop**.

You can download installation package for your operating system [here](https://www.nordicsemi.com/Products/Development-tools/nRF-Connect-for-desktop/Download#infotabs).

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>
Run installator and install application.

</TabItem>
<TabItem value="linux" label="Linux">
Application is in .AppImage format so you must make it executable. To do so you have to either:

- in console run ```bash chmod u+x "AppImage File" ```
- **right click** on the downloaded .appimage file and select **Properties**. In the next screen, go to the **Permissions** tab and check the box that says **“Allow executing file as program”**.

</TabItem>
<TabItem value="macOS" label="macOS">


</TabItem>
</Tabs>
<br />

Because **nRF Connect for Desktop** is multitool application, you have to install support for **PPK2**.

<div class="container">
    <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/nrf-connect-ppk2-install.png')} alt="nRF Connect for Desktop app list with the Power Profiler app and its Install button highlighted"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

You should see **Power Profiler** at the top of the apps, when is installation complete. You will start application by clicking at **Open** button.

<div class="container">
    <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/nrf-connect-ppk2-open.png')} alt="Installed Power Profiler app in nRF Connect for Desktop with the Open button shown"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

After clicking at **Open** button, you should see window similir to this one:

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/nrf-connect-plain.png')} alt="Power Profiler app main window before a device is connected, with an empty measurement chart"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## Basic Usage

You will need the following hardware to connect **CHESTER** device to **PPK2**:

- **CHESTER** device
- **Power Profiler Kit II**
- micro USB cable
- power cable from **PPK2** to **CHESTER** device (comes with **PPK2** if you buy it from **HARDWARIO**)

Please connect power cable from **PPK2** to **CHESTER** device.

:::caution

Please make sure that power cable is in **PPK2** connected same way as on the picture!

:::

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('./images/ppk2-chester-device.jpg')} alt="PPK2 board wired to the CHESTER mainboard battery connector, with USB in the DATA/POWER port"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

Now, you have to connect to your **PPK2**. Plug micro USB end of the cable to the **USB DATA/POWER** port at **PPK2** and other end to your computer. **PPK2** should be now **pulsing with green light**.

Then you have to select your **PPK2** in **nRF Connect for Desktop**.


<Image img={require('./images/nrf-connect-select-device.png')} alt="Power Profiler app with the SELECT DEVICE button highlighted in the top-left corner"/>

<br />

Click to **SELECT DEVICE** and choose your **PPK2** device.

<Image img={require('./images/nrf-connect-choose-device.png')} alt="SELECT DEVICE list expanded with the PPK2 device shown by its serial number"/>

<br />

**PPK2** should be now either **red** (**Source** meter mode) or **blue** (**Ampere** meter mode).

To start capturing some data, you have to:

1. Select mode in which you want to operate.

1. Set supply voltage to **3600mV**

1. Enable power to the output

1. Start capturing your data

1. To look at data in certain time, you can either **zoom in** with your mouse/trackpad or you can click at **Live view** switch to see data at current time.

<div class="container">
    <div class="row">
    <div class="col col--12">
      <div><Image img={require('./images/nrf-connect-main-window.png')} alt="Power Profiler window with numbered steps: meter mode, 3600 mV supply voltage, power output, Start, Live view"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

When you click **Start** to capture data, your **PPK2** will start pulsing in color of your mode and you will see measurements in your app.

<div class="container">
    <div class="row">
    <div class="col col--12">
      <div><Image img={require('./images/nrf-connect-running.png')} alt="Power Profiler capturing data, showing current-consumption spikes and average/max values of the window"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## Video Tutorial

Here is short video tutorial on **how to use Power Profiler Kit II** from **Nordic Semiconductor**.

<ReactPlayer controls src='https://youtu.be/B42lPvkUSoc' />
