---
slug: how-to-lora-module
title: "Jak na: LoRa Module"
description: "Odesílání zpráv ze zařízení TOWER přes LoRa s modulem LoRa Module: cesta přes bránu a backend (např. The Things Network) na server a příklad na GitHubu."
---
import Image from '@theme/IdealImage';

Modul [**LoRa Module**](../../hardware-modules/about-lora-module.md) jednoduše připojí vaši sadu k síti LoRa. Zprávy ze zařízení můžete přijímat komerční, komunitní nebo vlastní bránou LoRa.

Nejpoužívanější komunitní backendy LoRa jsou [**The Things Network**](https://www.thethingsnetwork.org) a [**LorIoT**](https://www.loriot.io).

## Odkazy {#references}
- [**Modul SDK pro LoRa Module**](https://sdk.hardwario.com/group__twr__module__gps.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-lora-push-button/blob/main/src/application.c)

## Jak to funguje? {#how-does-it-work}
- Zařízení odešle zprávu
- Brána LoRa zprávu přijme a předá ji ke zpracování backendu
- Backend zprávu přepošle na váš server
