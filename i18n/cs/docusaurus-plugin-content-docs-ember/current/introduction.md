---
slug: /
title: EMBER
sidebar_label: Úvod
description: "EMBER je průmyslová platforma LoRaWAN, která přenáší a zpracovává hodnoty ze senzorů a řídí akční členy v průmyslových areálech."
---
import Image from '@theme/IdealImage';

# EMBER {#ember}

**EMBER** je průmyslová platforma LoRaWAN, která přenáší a zpracovává měřené hodnoty ze senzorů a řídí akční členy v průmyslových areálech. Každá lokalita kombinuje venkovní bránu **EMBER Hotspot**, zařízení LoRaWAN (například **CHESTER**), páteřní připojení **LTE** přes **Onomondo** a **LoRaWAN Network Server** (**ChirpStack** nebo **The Things Stack**, který si zákazník provozuje sám, nebo ho jako spravovanou službu provozuje **HARDWARIO**) s **Node-RED** pro low-code integrace přes REST. Data tak lze vizualizovat a zpracovávat v cloudu i on-premise.

:::tip
### Než zařízení EMBER zprovozníte, přečtěte si [**Rychlého průvodce**](getting-started.md) {#to-get-your-ember-running-read-the-quick-start-guide}
:::

<img src="/img/ember-top.webp" data-zoom-src="/img/ember-top.webp" width="540" alt="EMBER" />

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](getting-started.md): Návod k nastavení krok za krokem.
* [**Konfigurace hotspotu**](hotspot-configuration.md): Koncept systému, konfigurace RouterOS, IP adresy a VPN tunely.
* [**Spravovaný network server**](cloud-service.md): ChirpStack a Node-RED provozované společností HARDWARIO jako spravovaná služba.
* [**Popis hardwaru**](hardware-description.md): Hlavní části a parametry zařízení EMBER Hotspot.
* [**Objednací kódy**](ordering-codes.md): Kompletní přehled objednacích kódů produktů.
* [**Seznam změn**](changelog): Nejnovější změny firmwaru a platformy.
* [**Videonávody**](category/video-tutorials): Krátká videa o nastavení ChirpStack a MikroTik.

## Typické případy použití {#typical-use-cases}

- Nasazení průmyslového IoT ve výrobních halách a areálech
- Komerční prostředí vyžadující spolehlivé pokrytí LoRaWAN
- Systémy domácí automatizace
- Spolehlivá správa infrastruktury LoRaWAN ve velkém rozsahu

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Průmyslový LoRaWAN Hotspot** | Vodotěsná venkovní brána postavená na platformě MikroTik RBM33G. |
| **LTE backhaul** | Integrovaná mobilní konektivita přes Onomondo. |
| **LoRaWAN Network Server** | ChirpStack nebo The Things Stack. Provozovaný vlastními silami, nebo spravovaný společností HARDWARIO jako služba, s Node-RED, vzdálenou konfigurací a monitoringem. |
| **Volitelné služby HARDWARIO** | SIM karta s konektivitou pro LTE backhaul, spravovaný network server a bezpečný vzdálený přístup přes OpenVPN. |
| **Redundantní nasazení** | Konfigurace lokalit pro pokrytí s vysokou dostupností. |
| **Bezpečné VPN tunely** | Nezávislé tunely pro data LoRaWAN a vzdálenou správu. |
