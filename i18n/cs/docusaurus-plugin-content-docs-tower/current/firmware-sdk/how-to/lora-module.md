---
slug: how-to-lora-module
title: "How To: LoRa Module"
description: "LoRa Module poskytuje jednoduchý způsob, jak připojit váš kit k síti LoRa. Pro příjem zpráv ze svého zařízení můžete využít komerční, komunitní nebo vlastní bránu LoRa."
---
import Image from '@theme/IdealImage';

[**LoRa Module**](../../hardware-modules/about-lora-module.md) poskytuje jednoduchý způsob, jak připojit váš kit k síti LoRa. Pro příjem zpráv ze svého zařízení můžete využít komerční, komunitní nebo vlastní bránu LoRa.

Nejpoužívanější komunitní backendy LoRa jsou [**The Things Network**](https://www.thethingsnetwork.org) a [**LorIoT**](https://www.loriot.io).

## Odkazy {#references}
- [**LoRa SDK Module**](https://sdk.hardwario.com/group__twr__module__gps.html)
- [**Ukázkový repozitář na GitHubu**](https://github.com/hardwario/twr-lora-push-button/blob/main/src/application.c)

## Jak to funguje? {#how-does-it-work}
- Zpráva je odeslána ze zařízení
- Brána LoRa přijme zprávu, kterou zpracuje backend
- Backend přeposílá zprávu na váš server
