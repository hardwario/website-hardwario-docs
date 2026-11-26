---
slug: lora-wan-radio
title: LoRaWAN radio
---
import Image from '@theme/IdealImage';

**LoRa** is a proprietary radio technology that allows **sending small data packets in both directions** (uplink & downlink).

Radio modulation was designed by the **Semtech** company and allows long range and long lifetime when **powering devices from the batteries**.

The message can contain **52 bytes** and you can send/receive data about **every 10 minutes**. Radio is using ISM band **868 MHz in Europe** and **915 MHz in the US**.

:::tip

LoRa module needs to be set up with AT Commands, to read about how to do that, you can visit [**LoRa AT Commands Configuration chapter**](../radio-communication/lora-at-commands.md).

:::

The advantage of LoRa is that it’s possible to build/buy your gateway, and use some community-based networks like [**The Things Network**](https://www.thethingsnetwork.org), [**LORIOT**](https://www.loriot.io) and many others.

:::note

It’s also possible to use a commercial provider’s already established LoRa network.

:::

TOWER has a **LoRa Module** which you can use to create battery-operated nodes that are sending or receiving data. The module supports LoRaWAN Class A and Class C.

:::tip

You can read more about [**LoRa Module in its chapter**](../hardware-modules/about-lora-module.md).

:::

