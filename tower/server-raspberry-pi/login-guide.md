---
slug: login-guide
title: Login Guide
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document describes how to log in to Raspberry Pi using a **remote terminal via SSH protocol**.

:::caution

This tutorial assumes that you are using a clear [**Raspberry Pi OS**](./installation-clean-os.md) or [**HARDWARIO Raspbian**](./installation-os.md).

:::

## Find out Raspberry Pi IP

In the case, you want to connect to your Raspberry Pi by IP Address you need to find out what address the DHCP server assigned to your Raspberry Pi.

:::caution

Every method mentioned below assumes that you are on the same network as the Raspberry Pi.

:::

There are several ways to find out what address the DHCP server assigned to your devices:
- Login to your router and go to DHCP Clients, LAN Status or something like that, this varies depending on the router
- Use computer utilities like [**Advanced IP Scanner (Windows)**](https://www.advanced-ip-scanner.com/cz/), [**IP Scanner(macOS)**](https://apps.apple.com/us/app/ip-scanner/id404167149?mt=12) or some [**Linux utility**](https://www.techrepublic.com/article/how-to-scan-for-ip-addresses-on-your-network-with-linux/)
- Use a mobile app like [**Fing**](https://www.fing.com)

:::tip

You will be looking for a device with a specific **hostname** like **raspberry.local**.

:::

## Connect With PuTTY

You can use **PuTTY**, which is an application that allows you to connect to a remote terminal via SSH and other means.

- Download the [**PuTTY application**](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
- Open PuTTY and you should see **this screen**
<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('./images/putty-login.png')} alt="PuTTY configuration with Host Name hub.local, port 22, SSH selected, and the Open button marked" /></div>
    </div>
    <div class="col col--4">
    </div>
  </div>
</div>

- Add your **hostname** or **IP Address** (here it is a ``hub.local``)
- Select **SSH** if not already selected
- Click **Open**
- Log in:
  - username: ``pi``
  - password: ``raspberry``

:::info

You should be logged in to your Raspberry Pi. We recommend [**changing the password**](#change-the-password) (if it was not changed while flashing the microSD card) and [**updating the system**](#update-the-system). After that, you can visit the [**Command Line Tool section**](../command-line-tools/index.md) to learn about the tools installed on the Raspberry.

:::

## Connect With Terminal

On all systems, you can open the integrated terminal and connect with the ``ssh`` command

Open a terminal and run the following command:

<Tabs>
<TabItem value="hostname" label="Hostname" default>

The hostname will be different based on what installation you went for

[**HARDWARIO Raspbian**](./installation-os.md)

```bash
ssh pi@hub.local
```

[**Raspberry Pi OS**](./installation-clean-os.md)

```bash
ssh pi@raspberry.local
```

</TabItem>
<TabItem value="ipAddress" label="IP Address">

```bash
ssh pi@IP_ADDRESS
```

</TabItem>
</Tabs>

- Log in:
  - password: ``raspberry`` or **any other that you choose**

:::info

You should be logged in to your Raspberry Pi. We recommend [**changing the password**](#change-the-password) (if it was not changed while flashing the microSD card) and [**updating the system**](#update-the-system). After that, you can visit the [**Command Line Tool section**](../command-line-tools/index.md) to learn about the tools installed on the Raspberry.

:::

## Change the Password

You should always **change the default password**. You can do that simply by running ``passwd`` command in the terminal.

## Update the System

For reasons of security and stability, it is important to keep the system up to date.
The system consists of packages and you can update them with the following command:

```bash
sudo apt update && sudo apt upgrade
```
