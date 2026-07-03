---
slug: hardwario-manager
title: HARDWARIO Manager
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HARDWARIO Manager

The **HARDWARIO Manager** mobile app allows you via **Bluetooth Low Energy** to:

- Show device information
- Configure the device over the terminal
- Update device firmware

:::info
We also provide a [video tutorial](https://docs.hardwario.com/chester/videos-chester/chester-connect-phone) demonstrating the procedure for pairing the Chester device with a mobile phone using the Hardwario Manager application.
:::

## App Installation

<Tabs groupId="mobile-platform">

<TabItem value="android" label="Android" default>

Download the Android [HARDWARIO Manager](https://play.google.com/store/apps/details?id=com.hardwario.manager) app.

</TabItem>

<TabItem value="ios" label="iOS">

Download the iOS [HARDWARIO Manager](https://apps.apple.com/cz/app/hardwario-manager/id6444803082) app.

</TabItem>

</Tabs>

## Scan List

When you open **HARDWARIO Manager**, you will see the **SCAN LIST** page. Here you will see nearby devices, which use Bluetooth-enabled applications.

Choose a device from the list to connect, or use a **QR code** button in the top right corner. This **QR code** feature can be used only if you already know the **BLE passkey** or your device is already paired with the phone. Otherwise, follow instructions from the next [Device Pairing](#device-pairing) chapter.

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/manager-scan-list.png')} /></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

## Device Pairing

To manage your **CHESTER** device, you have to connect to it via Bluetooth. Every device has a **unique** pairing passkey, which you can obtain if you scan the QR on the back side of your device. Use your favorite QR scan app or camera app to read **QR code** on the back of the **CHESTER** device. This **QR code** will open a webpage that contains the **BLE passkey**, which you need to pair with your phone.

:::caution
You can't use the built-in QR code reader in **HARDWARIO Manager** app to get the BLE passkey. Use your favorite QR scan app or camera app to read **QR code** to get the BLE passkey to pair your device.
:::

:::tip
If you need further assistance or a visual demonstration of the process described in this guide, consult the [Video Guide](https://docs.hardwario.com/chester/videos-chester/chester-connect-phone).
:::

## App Menu

When you connect to **CHESTER**, you can use a menu to browse the following categories

### Show Information

This page shows basic information about hardware version, variant, firmware version and device uptime.

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/manager-general-info.png')} /></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

:::tip

If the firmware application is supported by **HARDWARIO MANAGER**, the **OPEN APPLICATION** button appears at the bottom of the information page.

:::

### Command Terminal

The purpose of the **Command Terminal** is to easily make changes in the settings of your app or find out what setting is applied.

- You have to type a command (for example here it is **info** command) and send it by black arrow **(1)**
- The console will return this command to confirm what was sent **(2)**
- The console will return wanted information or it will set a certain value **(3)**.
- You can select an already used command in **Command history (4)**.


<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/manager-console.png')} /></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

:::tip

Anytime when you feel lost, just type the **help** command.

:::

### Firmware Update

You can update your **CHESTER** device via this page. You can find [**pre-built binaries**](../catalog-applications/index.md#application-firmware) for catalog applications, or you will receive a link to your custom build firmware via e-mail.

Click on **SCAN QR CODE** to get the link to firmware **(1)**. When you do so and scan a valid QR code, you get information about firmware **(2)**. If this information is OK, you can start flashing by pressing **UPDATE FIRMWARE (3)**. You can click at **START OVER**, if you want to update to different firmware **(4)**.
Firmware Update Interruption: Should the phone disconnect during a firmware swap, please attempt the update again. The final firmware version is stored in the device's memory but requires confirmation for use. Bluetooth communication timeouts may occur.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/manager-firmware-update.png')} /></div>
    </div>
    <div class="col col--12">
    </div>
  </div>
</div>

:::tip
If you need further assistance or a visual demonstration of the process described in this guide, consult the [Video Guide](https://docs.hardwario.com/chester/videos-chester/chester-update-phone).
:::

### Device Reboot

This screen will let you remotely restart your device.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/manager-restart-device.png')} /></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
