---
slug: how-to-lora-module
title: "How To: LoRa Module"
---
import Image from '@theme/IdealImage';

The [**LoRa Module**](../../hardware-modules/about-lora-module.md) provides a simple way how to connect your kit to the LoRa network. You can use commercial, community or your own LoRa gateway to receive messages from your device.

The most used community LoRa backends are [**The Things Network**](https://www.thethingsnetwork.org) and [**LorIoT**](https://www.loriot.io).

## References
- [**LoRa SDK Module**](https://sdk.hardwario.com/group__twr__module__gps.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-lora-push-button/blob/main/src/application.c)

## How Does it Work?
- The message is sent from the device
- LoRa gateway receives the message which is processed by the backend
- Backend resends the message to your server

