---
slug: system-basics
title: System Basics
---
import Image from '@theme/IdealImage';

TOWER is a device platform, specifically designed for the Internet-of-Things. With TOWER, you can quickly build your own electronic devices.

Thanks to its open approach, you will have total control of your devices, and the way they communicate, or integrate with 3rd party components. That will give you freedom for future customization and extensibility.

With TOWER, you will **not encounter** things like **black box magi**c or **vendor lock-in**.

TOWER offers a **unique set of features** that makes it different from other platforms.

## Open-source

Open-source is our passion, so we share everything that we do on [**our GitHub**](https://github.com/orgs/hardwario/repositories)

In general, we don’t like hidden catches nor hiding the implementation under the hood. We work hard every day to earn your trust in our products, so anytime you have a chance see the amount of care, passion and quality we put into the design and code.

As we grow and build the community, we sincerely appreciate every single contribution from it

:::tip

  You can contribute as well, on [**our GitHub**](https://github.com/orgs/hardwario/repositories) or [**hackster.io**](https://www.hackster.io/hardwario/projects) pages.

:::

## Wireless

With TOWER, you can build a **radio network for your devices**. The radio network uses a Sub-GHz communication technology (868/915 MHz), which is a great choice for home automation applications, security alarms, etc.

The devices in your network will be able to communicate up to **500 meters line-of-sight** distance.

Speaking of the indoor range, in most cases, you will be able to achieve full house coverage from a single point.

## Modular

Why would you constantly reinvent the wheel? We take no shortcomings when it comes down to modularity and reusability.

You will be able to assemble your hardware similarly as you do with the LEGO® bricks. When you start building multiple devices, you will greatly appreciate the fact that there is no need for wiring or soldering. We use a standardized pin header format, which is compatible across the whole ecosystem of hardware products.

An equal level of modularity has been also taken on the software level. Either on a device side, anyone can master creating the firmware with the properly documented APIs and examples, or the distributed system approach of MQTT messages on the side of the hub.

## Low-Power

From the very beginning, HARDWARIO TOWER has been optimized for long service time from batteries. Most devices can operate without a need for battery replacement for more than 2 years.

We have achieved that thanks to our long-time experience designing ultra-low-power devices and utilizing modern hardware components that offer very low standby and/or operation currents.

## Secure

TOWER uses simple, yet proven security mechanisms for data encryption and authentication in radio communication.

In every TOWER device, you will also find a special hardware security element - the so-called crypto chip. This special tiny memory allows you to store your security keys securely used in message authentication. You cannot rip the keys from the memory even if you get physical access to the device.

We all know that the “security by obscurity” approach does not work in long term and still, you will find it in so many proprietary products.

## System Concept

<Image img={require('./images/system-concept.png')}/>

<br />

:::note

To learn more about TOWER Design, you can visit the [**Design Principles chapter**](./design-principles.md).

:::
