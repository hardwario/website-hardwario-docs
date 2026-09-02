---
slug: lora-wan-radio
title: LoRaWAN rádio
description: "Rádiovou modulaci navrhla společnost Semtech a umožňuje velký dosah a dlouhou životnost při napájení zařízení z baterií."
---
import Image from '@theme/IdealImage';

**LoRa** je proprietární rádiová technologie, která umožňuje **posílat malé datové pakety v obou směrech** (uplink & downlink).

Rádiovou modulaci navrhla společnost **Semtech** a umožňuje velký dosah a dlouhou životnost při **napájení zařízení z baterií**.

Zpráva může obsahovat **52 bajtů** a data lze posílat/přijímat přibližně **každých 10 minut**. Rádio využívá ISM pásmo **868 MHz v Evropě** a **915 MHz v USA**.

:::tip

Modul LoRa je potřeba nastavit pomocí AT příkazů. Jak na to, se dozvíte v kapitole [**Konfigurace LoRa pomocí AT příkazů**](../radio-communication/lora-at-commands.md).

:::

Výhodou technologie LoRa je, že si můžete vlastní bránu postavit nebo koupit a využívat komunitní sítě jako [**The Things Network**](https://www.thethingsnetwork.org), [**LORIOT**](https://www.loriot.io) a mnoho dalších.

:::note

Je také možné využít již vybudovanou LoRa síť komerčního poskytovatele.

:::

TOWER má **modul LoRa**, který můžete použít k vytvoření bateriově napájených uzlů posílajících nebo přijímajících data. Modul podporuje LoRaWAN Class A a Class C.

:::tip

Více se o [**modulu LoRa dočtete v jeho kapitole**](../hardware-modules/about-lora-module.md).

:::
