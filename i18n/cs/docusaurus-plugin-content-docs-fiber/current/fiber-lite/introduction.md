---
title: Úvod
description: "zprovoznění a testování zařízení LoRaWAN, zejména HARDWARIO STICKER a HARDWARIO"
---

# FIBER Lite {#fiber-lite}

**FIBER Lite** je varianta zařízení [**FIBER**](/fiber/) postavená na Raspberry Pi 5, určená k rychlému
zprovoznění a testování zařízení **LoRaWAN** (zejména **HARDWARIO STICKER** a **HARDWARIO
CHESTER**) přímo na stole, bez nutnosti pro každý test stavět samostatný LoRaWAN network server, databázi
a vizualizační vrstvu.

Postup zprovoznění je **stejný jako u zařízení FIBER**, viz [**Instalace**](/fiber/installation) (nebo
[**Rychlý průvodce**](/fiber/first-steps)), se záložkami v těch několika místech, kde se skutečně
liší. Neexistuje žádný samostatný instalační postup pro FIBER Lite: ChirpStack, Node-RED, InfluxDB, Grafana
i značkový Dashboard jsou součástí jednoho společného stacku dostupného na obou variantách. Tato
stránka (a sekce Řešení problémů pod ní) popisuje pouze to, co je u varianty Lite skutečně **odlišné**,
což se týká hardwaru. Vše ostatní najdete v sekcích [**Úvod**](/fiber/) a
[**Popis hardwaru**](/fiber/category/hardware-description), které už FIBER pokrývá.

## Co je jinak {#whats-different}

| | FIBER (CM4) | FIBER Lite (Pi 5) |
|---|---|---|
| Platforma | Raspberry Pi Compute Module 4 | Raspberry Pi 5 |
| Úložiště | eMMC (na modulu, 8/16/32 GB) | microSD karta, 32 GB, high-endurance |
| Napájení | PoE (802.3af) + záložní Li-Ion baterie | USB-C, bez PoE injektoru, bez záložní baterie |
| RTC | Externí I2C čip PCF85063A | Nativní vestavěné RTC (`rtc0`). Overlay není potřeba |
| Krabička | Vlastní krabička FIBER, 175×120×35 mm | Krabička na DIN lištu |
| 1-Wire hub, LCD, bzučák | Přítomno | Není přítomno |
| BLE, LTE | Přítomno | Není přítomno (pouze LAN nebo Wi-Fi) |
| Koncentrátor LoRaWAN | RAK5146, připojený přes **USB** | RAK5146 na HAT RAK2287, připojený přes **SPI** |

Jak do sebe sdílený softwarový stack zapadá, viz [Tok dat](/fiber/installation#data-flow) na úvodní
stránce Instalace. Na obou variantách je identický.

## Kusovník (specifický pro FIBER Lite) {#bill-of-materials-fiber-lite-specific}

| Komponenta | Poznámky |
|---|---|
| Raspberry Pi 5 | Hlavní výpočetní jednotka |
| RAK WisLink RAK5146 | Karta koncentrátoru LoRaWAN (SX1302), SPI |
| RAK2287 Pi HAT | SPI adaptér pro propojení RAK5146 → GPIO konektor Raspberry Pi 5 |
| Krabička na DIN lištu | Pro montáž do rozvaděče/racku |
| microSD karta, 32 GB, high-endurance | OS + logy + časová databáze (zátěž s intenzivním zápisem) |
| Distanční sloupky | Mechanická montáž |
