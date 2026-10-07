---
title: Úvod
description: "FIBER Lite je varianta FIBER postavená na Raspberry Pi 5, určená k rychlému zprovoznění a testování zařízení LoRaWAN, například HARDWARIO STICKER."
title_meta: "Úvod (FIBER Lite)"
---

# FIBER Lite {#fiber-lite}

**FIBER Lite** je varianta zařízení [**FIBER**](/fiber/) postavená na Raspberry Pi 5, určená k rychlému
zprovoznění a testování zařízení **LoRaWAN** (zejména **HARDWARIO STICKER** a **HARDWARIO
CHESTER**) přímo na stole, aniž byste pro každý test museli zprovozňovat samostatný síťový server LoRaWAN, databázi
a vizualizační vrstvu.

Postup zprovoznění je **stejný jako u zařízení FIBER**, viz [**Instalace**](/fiber/installation) (nebo
[**Rychlý průvodce**](/fiber/first-steps)), se záložkami na těch několika místech, kde se skutečně
liší. Samostatný instalační postup pro FIBER Lite neexistuje: ChirpStack, Node-RED, InfluxDB, Grafana
i Dashboard ve firemním vzhledu patří do jednoho společného stacku, který je k dispozici na obou variantách. Tato
stránka (a sekce Řešení problémů pod ní) popisuje pouze to, co je u varianty Lite skutečně **odlišné**,
a to je hardware. Vše ostatní, co platí pro FIBER, najdete v sekcích [**Úvod**](/fiber/) a
[**Popis hardwaru**](/fiber/category/hardware-description).

## Co je jinak {#whats-different}

| | FIBER (CM4) | FIBER Lite (Pi 5) |
|---|---|---|
| Platforma | Raspberry Pi Compute Module 4 | Raspberry Pi 5 |
| Úložiště | eMMC (na modulu, 8/16/32 GB) | Karta microSD, 32 GB, high-endurance |
| Napájení | PoE (802.3af) + záložní baterie Li-Ion | USB-C, bez injektoru PoE, bez záložní baterie |
| RTC | Externí čip I2C PCF85063A | Vestavěné RTC (`rtc0`), overlay není potřeba |
| Krabička | Vlastní krabička FIBER, 175×120×35 mm | Krabička na DIN lištu |
| 1-Wire hub, LCD, bzučák | Ano | Ne |
| BLE, LTE | Ano | Ne (jen LAN nebo Wi-Fi) |
| Koncentrátor LoRaWAN | RAK5146, připojený přes **USB** | RAK5146 na HAT RAK2287, připojený přes **SPI** |

Jak sdílený softwarový stack funguje dohromady, popisuje část [Tok dat](/fiber/installation#data-flow)
na úvodní stránce Instalace. Na obou variantách je stejný.

## Kusovník (specifický pro FIBER Lite) {#bill-of-materials-fiber-lite-specific}

| Komponenta | Poznámky |
|---|---|
| Raspberry Pi 5 | Hlavní výpočetní jednotka |
| RAK WisLink RAK5146 | Karta koncentrátoru LoRaWAN (SX1302), SPI |
| RAK2287 Pi HAT | Adaptér SPI pro připojení RAK5146 ke konektoru GPIO Raspberry Pi 5 |
| Krabička na DIN lištu | Pro montáž do rozvaděče/racku |
| Karta microSD, 32 GB, high-endurance | OS, logy a databáze časových řad (náročné na zápis) |
| Distanční sloupky | Mechanická montáž |
