---
slug: /
title: EMBER
sidebar_label: Úvod
description: "EMBER je průmyslová platforma LoRaWAN, která přenáší a zpracovává hodnoty ze senzorů a řídí akční členy v průmyslových areálech."
---
import Image from '@theme/IdealImage';

# EMBER {#ember}

**EMBER** je průmyslová platforma LoRaWAN, která přenáší a zpracovává měřené hodnoty ze senzorů a řídí akční členy v průmyslových areálech. Každou lokalitu tvoří venkovní brána **EMBER Hotspot**, zařízení LoRaWAN (například **CHESTER**), páteřní připojení **LTE** přes **Onomondo** a síťový server LoRaWAN (**ChirpStack** nebo **The Things Stack**; provozuje ho buď sám zákazník, nebo **HARDWARIO** jako spravovanou službu) s **Node-RED** pro low-code integrace přes REST. Data tak můžete vizualizovat a zpracovávat v cloudu i na vlastních serverech (on-premise).

:::tip
### Než zařízení EMBER zprovozníte, přečtěte si [**Rychlého průvodce**](getting-started.md) {#to-get-your-ember-running-read-the-quick-start-guide}
:::

<img src="/img/ember-top.webp" data-zoom-src="/img/ember-top.webp" width="540" alt="EMBER" />

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](getting-started.md): Návod k nastavení krok za krokem.
* [**Konfigurace hotspotu**](hotspot-configuration.md): Koncept systému, konfigurace RouterOS, IP adresy a VPN tunely.
* [**Spravovaný síťový server**](cloud-service.md): ChirpStack a Node-RED jako spravovaná služba, kterou provozuje HARDWARIO.
* [**Popis hardwaru**](hardware-description.md): Hlavní části a parametry zařízení EMBER Hotspot.
* [**Objednací kódy**](ordering-codes.md): Kompletní přehled objednacích kódů produktů.
* [**Seznam změn**](changelog): Nejnovější změny firmwaru a platformy.
* [**Videonávody**](category/video-tutorials): Krátká videa o nastavení serveru ChirpStack a zařízení MikroTik.

## Typické využití {#typical-use-cases}

- Průmyslové IoT ve výrobních závodech a areálech
- Komerční prostředí, která potřebují spolehlivé pokrytí LoRaWAN
- Systémy domácí automatizace
- Spolehlivá správa infrastruktury LoRaWAN ve velkém měřítku

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Průmyslový hotspot LoRaWAN** | Vodotěsná venkovní brána postavená na platformě MikroTik RBM33G. |
| **LTE backhaul** | Integrované mobilní připojení přes Onomondo. |
| **Síťový server LoRaWAN** | ChirpStack nebo The Things Stack. Na vlastním serveru, nebo jako spravovaná služba HARDWARIO s Node-RED, vzdálenou konfigurací a monitoringem. |
| **Volitelné služby HARDWARIO** | SIM karta s konektivitou pro páteřní připojení LTE, spravovaný síťový server a bezpečný vzdálený přístup přes OpenVPN. |
| **Redundantní nasazení** | Konfigurace lokalit pro pokrytí s vysokou dostupností. |
| **Bezpečné VPN tunely** | Nezávislé tunely pro data LoRaWAN a pro vzdálenou správu. |
