---
slug: homekit-and-siri
title: HomeKit and Siri
---
import Image from '@theme/IdealImage';

With HomeKit integration, you will be able to control your IoT projects from your **iOS** or **macOS** device. After you have your device in your Home app,
you can control it using Siri.

:::info

At the end of the article, you will ask Siri for the temperature in your bedroom and she will tell you back the temperature from your HARDWARIO temperature sensor!

:::

## Installation

If you want to use the following integration on [**HARDWARIO Hub**](../server-raspberry-pi/installation-os.md) or Debian and Ubuntu system, you have to install few dependencies.
Connect to the command line of **HARDWARIO Hub** and use the article [**Raspberry Pi Login**](../server-raspberry-pi/login-guide.md).

After you login in, copy, paste and run the following commands.

```bash showLineNumbers
sudo apt-get update
sudo apt-get install libavahi-compat-libdnssd-dev
```

Open **HARDWARIO Hub in your Browser** (Linux and macOS can use `hub.local`, on Windows you have to use the IP address of HARDWARIO Hub).
In the menu select functions and in the top right corner click on the **hamburger menu**. Click on **manage palette** and select **Install card**, where search:

```
node-red-contrib-homekit-bridged
```

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/node-red-pallete.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>
<br />

:::info

When a message with the title Installing **'node-red-contrib-homekit-bridged'** pops up, just click **Install**. After Installation, you should see **module** in the **advanced group**.

:::

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/node-red-advanced-tab.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

## Connect Hardware

#### Flash Firmware

- Open [**HARDWARIO Playground**](../desktop-programming/about-playground.md) on your computer.
- Connect [**Core Module**](../hardware-modules/about-core-module.md) to computer via micro USB cable.
- Click on the [**Firmware**](../desktop-programming/firmware-flashing.md) tab in the side menu.
- Use `hardwario/twr-radio-push-button` and Click **Flash**.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/playgroud-flash-firmware.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Pair the Device

Open **HARDWARIO Hub** page in the browser, same as in the chapter **Installation** and select the **Devices** tab in the side menu and click on **Start pairing** button.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/playgroud-pair-hardware.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Assemble the Device

Now unplug the **Core Module** from the computer and connect it to the [**Battery Module**](../hardware-modules/about-battery-module.md).

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/homekit-and-siri-core-standart-battery.jpg')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Test

You should see the device now (it should be paired). You can look at the **Messages** tab and see that the temperature messages are incoming now.

## Connect it all together

#### Open the **Functions tab** in the side menu. Open the **Hamburger menu**, select **Import > Clipboard** and paste the following code

```json
    [{"id":"c10a49.8c0905b8","type":"mqtt in","z":"2c41a2bd.aa36ae","name":"Temperature from Core Module","topic":"node/push-button:0/thermometer/0:1/temperature","qos":"2","broker":"29fba84a.b2af58","x":230,"y":180,"wires":[["d7033322.3f2d5"]]},{"id":"d7033322.3f2d5","type":"template","z":"2c41a2bd.aa36ae","name":"Convert payload to HomeKit JSON format","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"{\n\"CurrentTemperature\": \"{{payload}}\"\n}","output":"str","x":600,"y":180,"wires":[[]]},{"id":"29fba84a.b2af58","type":"mqtt-broker","z":"","broker":"127.0.0.1","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","willTopic":"","willQos":"0","willPayload":""}]
```

:::info

The imported flow should look like the following

:::

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/playground-flow-basic.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Place the **Homekit node** from the **advanced group** and connect it to the template node in the flow

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/homekit-connected.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Double-click on the **HomeKit node** in flow the settings window should popup

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/homekit-settings.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Setup the Bridge

:::info

This will be the Bridge between our **Hardware sensors** and your **iPhones**, **iPads**, **macs**, etc.

:::

Click on the **little pencil icon** next to the bridge part of the setting and fill it as follows and click **Add**

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/home-kit-bridge-settings.png')} /></div>
    </div>
    <div class="col col--5">
    </div>
  </div>
</div>

#### Fill in the rest of the settings according to the screenshot below. Click Done and then Deploy

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('./images/home-kit-settings.png')} /></div>
    </div>
    <div class="col col--5">
    </div>
  </div>
</div>

#### Pairing

Now as you can see on your screen and screenshot below. The device is waiting for pairing with code `111-11-111`.
Open the **Home app** on your iPhone or iPad and click **Add Accessory > Don't Have a Code or Can't Scan > HARDWRIO bridge**.
Select **Add anyway** on the next screen. On the screen where you have to input code, input the number `1` to all boxes

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/homekit-and-siri-iphones-screens-1.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Setup

Now just setup where is your bridge and temperature sensor.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/homekit-and-siri-iphones-screens-2.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

## Siri

:::info

If you have some device in the **Home app**, you can control it or get information from it via Siri.

:::

So if you want to get the temperature from **Core Module** which we just set up, just ask Siri for example: "**what's the temperature in the bedroom?**".

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('./images/homekit-and-siri-iphones-screens-siri.png')} /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

## Conclusion

With the **HomeKit** plugin, you can simulate real **HomeKit devices**.
This plugin can also control things. So you can use it to control the [**Relay Module**](../hardware-modules/about-relay-module.md), etc.

:::caution

This plugin has a little issue. Every time, you **Deploy** flow, you have to **reset all Node-RED**, or the HomeKit plugin won't work.

:::

You can do it by following the command (you have to do it on **HARDWARIO hub** if the plugin is installed there):

```bash
pm2 restart node-red
```
