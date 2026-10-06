---
slug: /
title: STICKER
sidebar_label: Úvod
description: "STICKER je otevřená IoT platforma na STM32WL s konektivitou LoRaWAN a volitelným režimem LoRa P2P, konfigurovaná přes NFC aplikací HARDWARIO Manager."
---
import Image from '@theme/IdealImage';

# STICKER {#sticker}

**STICKER** je otevřená IoT platforma založená na STM32WL s integrovanou konektivitou LoRaWAN a softwarově volitelným proprietárním režimem **LoRa P2P**, který umožňuje přímé spojení se zařízením **HARDWARIO FIBER**. Jde o kompaktní zařízení na baterie s dlouhou životností a hotovými aplikacemi, jako jsou STICKER Clime, Input a Motion.

:::tip
### Než zařízení STICKER rozběhnete, přečtěte si [**rychlého průvodce**](first-steps) {#to-get-your-sticker-running-read-the-quick-start-guide}
:::

<img src="/img/sticker.webp" data-zoom-src="/img/sticker.webp" width="540" alt="Varianty zařízení STICKER" />

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](first-steps): Postup zprovoznění krok za krokem.
* [**Koupit STICKER**](https://www.hardwario.store/sticker): Nákup v našem obchodě.
* [**Objednací kódy**](/sticker/ordering-codes): Seznam součástek a jejich objednacích čísel.
* [**Popis hardwaru**](/sticker/hardware-description): Technické detaily a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.
* [**Seznam změn**](changelog): Nejnovější vydání SDK, verze firmwaru a změny v jednotlivých aplikacích.

## Typická použití {#typical-use-cases}

- Sledování a udržování optimální teploty v různých místnostech pro komfort a energetickou efektivitu
- Přesná regulace a kontrola teploty během kritických výrobních operací
- Hlídání teploty ve skladech, aby uložené zboží zůstalo ve vhodných podmínkách
- Sledování a regulace teploty ve sklenících pro ideální podmínky pěstování rostlin
- Integrace s PLC nebo samostatnými senzory pro sběr dat potřebných ve výrobních a průmyslových procesech

## Klíčové vlastnosti {#key-features}

* **Extrémně nízká spotřeba:** Provoz po několik let na dvou běžných bateriích AA díky inteligentním režimům spánku a podpoře režimu Radio-Silent nastaveného z výroby.
* **Flexibilní konektivita a NFC:** Komunikace LoRaWAN na velké vzdálenosti v kombinaci se šifrovaným NFC pro okamžitou konfiguraci a správu.
* **Modulární ekosystém:** Hotové katalogové aplikace (Clime, Motion, Input) pokrývající různé úlohy měření prostředí i průmyslových veličin.
* **Otevřený a bezpečný firmware:** Postavený na Zephyr RTOS, bez vzdálené útočné plochy (nahrávání jen přes SWD, žádný bootloader v nasazených zařízeních).
