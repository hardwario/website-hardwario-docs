---
slug: one-wire-bus
title: "1-Wire Bus"
description: 1-Wire is a serial bus that uses only two wires for half-duplex bidirectional communication with multiple 1-Wire slave devices.
---
import Image from '@theme/IdealImage';

1-Wire is a serial bus that uses only **two wires** (data line and ground) for a **half-duplex bidirectional communication** of a 1-Wire master with one or multiple 1-Wire slaves.

:::info

To identify the devices on the bus each device has a unique 64-bit identification number (ID).

:::

1-Wire is special because if some device loses contact or disconnects from the bus, it is put into the default reset state. After the device is connected back it wakes up and signals its presence.

## 1-Wire Bus usage in TOWER

We made it easy for our users to connect 1-Wire devices to the TOWER device. For this we developed a [**Sensor Module**](../hardware-modules/about-sensor-module.md) which you can use to simply connect, for example, one of the following devices.

- [**Soil Sensor**](https://shop.hardwario.com/soil-sensor/)
- [**Machine Probe**](https://shop.hardwario.com/machine-probe-2m-cable/)
- [**Temperature sensor DS18B20**](https://shop.hardwario.com/temperature-sensor-ds18b20-original-10m-cable/)

