---
slug: /
title: STICKER
sidebar_label: Úvod
description: "STICKER je otevřená IoT platforma na STM32WL s LoRaWAN a volitelným režimem LoRa P2P, která se nastavuje přes NFC v aplikaci HARDWARIO Manager."
---
import Image from '@theme/IdealImage';

# STICKER {#sticker}

**STICKER** je otevřená IoT platforma postavená na STM32WL. Má integrovanou konektivitu LoRaWAN a softwarově volitelný proprietární režim **LoRa P2P**, ve kterém komunikuje přímo se zařízením **HARDWARIO FIBER**. Je to kompaktní zařízení na baterie s dlouhou výdrží a s hotovými aplikacemi, jako jsou STICKER Clime, Input a Motion.

:::tip
### Jak zařízení STICKER zprovoznit, popisuje [**Rychlý průvodce**](first-steps) {#to-get-your-sticker-running-read-the-quick-start-guide}
:::

<img src="/img/sticker.webp" data-zoom-src="/img/sticker.webp" width="540" alt="Varianty zařízení STICKER" />

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](first-steps): Zprovoznění krok za krokem.
* [**Koupit STICKER**](https://www.hardwario.store/sticker): Nákup v našem e-shopu.
* [**Objednací kódy**](/sticker/ordering-codes): Seznam součástí a jejich objednacích čísel.
* [**Popis hardwaru**](/sticker/hardware-description): Technické údaje a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.
* [**Seznam změn**](changelog): Nejnovější vydání SDK, verze firmwaru a změny v jednotlivých aplikacích.

## Typická použití {#typical-use-cases}

- Sledování a udržování optimální teploty v místnostech kvůli pohodlí a úspoře energie
- Přesné řízení a sledování teploty při kritických výrobních operacích
- Hlídání teploty ve skladech, aby uložené zboží zůstalo ve vhodných podmínkách
- Sledování a regulace teploty ve sklenících pro ideální podmínky pěstování rostlin
- Napojení na PLC nebo samostatné senzory a sběr dat pro výrobní a průmyslové procesy

## Klíčové vlastnosti {#key-features}

* **Extrémně nízká spotřeba:** Několik let provozu na dvě běžné baterie AA díky inteligentním režimům spánku a režimu Radio-Silent, ve kterém zařízení z výroby nevysílá.
* **Flexibilní konektivita a NFC:** Komunikace LoRaWAN na velké vzdálenosti a šifrované NFC pro okamžitou konfiguraci a správu.
* **Modulární ekosystém:** Hotové katalogové aplikace (Clime, Motion, Input) pro nejrůznější měření prostředí i průmyslových veličin.
* **Otevřený a bezpečný firmware:** Postavený na Zephyr RTOS, bez vzdálené útočné plochy (nahrávání jen přes SWD, žádný bootloader v nasazených zařízeních).
