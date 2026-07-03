---
slug: installation-os
title: Pre-Installed Image
---
import Image from '@theme/IdealImage';

This tutorial demonstrates how to install all the needed tools for working with HARDWARIO TOWER devices onto your **Raspberry Pi with a Raspberry Pi OS installed**.

:::tip

If you already have your Raspberry Pi running with **Raspberry Pi OS** and you just want to add all the needed tools, you can follow the [**Clean Installation chapter**](./installation-clean-os.md).

:::

## Requirements
- [**HARDWARIO Raspbian**](https://github.com/hardwario/bc-raspbian/releases/latest)
- [**Raspberry Pi Imager**](https://www.raspberrypi.com/software/)
- Raspberry Pi 3B+ or better
- MicroSD card with a minimum capacity of 4 GB
- MicroSD Card Reader (+ optional SD Card Adapter)
- Ethernet cable or WiFi
- Router (or LAN switch) with the DHCP server set up
- Computer with one of the following operating systems:
  - Windows 7, 8, 10 (32-bit or 64-bit)
  - macOS (tested on version 10.12.x)
  - Ubuntu (tested on version 18.04.2 LTS)

## Set up

- Insert a microSD card into the reader connected to your computer
- Open **Raspberry Pi Imager**
- Select **CHOOSE OS** --> **Scroll Down** --> **Use Custom** --> **Select downloaded HARDWARIO Raspbian Image**
  - It should look something like this
    <div class="container">
    <div class="row">
      <div class="col col--7">
        <div><Image img={require('./images/raspberry-pi-imager-set-up.png')} /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>
- Open the **settings** by clicking the **wheel at the bottom left corner**
  - Enable Set hostname: `hub`
  - Enable **SSH**
    - Use password authentication
  - Set **password**
    - You can set up whatever password you want but we recommend a strong one. Just make sure to remember it. Please keep the username as **pi** since the image relies on this username.
  - You can also Configure wireless LAN (WiFi) but that is optional if you have a LAN connection
  <div class="container">
    <div class="row">
      <div class="col col--7">
        <div><Image img={require('./images/raspberry-pi-imager-advanced.png')} /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>
  - Click **Save** Button
- Click **Write** Button and wait for the **Flashing to finish**

:::note

After the flashing is finished insert the microSD card into your Raspberry Pi. If you didn't set up **WiFi**, connect your Ethernet cable. Connect [**Radio Dongle**](../hardware-modules/about-radio-dongle.md) and apply power to your Raspberry Pi.

After that, you are ready to start using your server.

:::

## Connect to Server

Now that you have your server up and running you can open a **web browser on your computer** and connect to it.

:::caution

Without any additional setup, you need to be on the **same network as the Raspberry Pi**.

:::

To connect to your **Raspberry Pi** you have two options that you can put into the search bar:
- The IP address of the Raspberry Pi (for how to find it check [**Login Guide**](./login-guide.md#find-out-raspberry-pi-ip) )
- The hostname that you set up in the previous step (in this tutorial it is a [**hub.local**](http://hub.local))


  <div class="container">
    <div class="row">
      <div class="col col--10">
        <div><Image img={require('./images/hardwario-hub.png')} /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>


## Troubleshooting

If the **Start pairing** button is disabled and you cannot press it. Please make sure you **first connect Radio Dongle and then apply the power to Raspberry Pi.**

If you are still having trouble with connecting to Radio Dongle it can be because you did an `apt update` and `apt upgrade`. There is an issue with mosquitto that **anonymous connections are not allowed**.
To fix this issue just run the following command:

```bash
echo 'allow_anonymous true' | sudo tee /etc/mosquitto/conf.d/auth.conf
```
