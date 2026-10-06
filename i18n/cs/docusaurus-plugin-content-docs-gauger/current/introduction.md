---
slug: /
title: GAUGER
description: "GAUGER je konfigurovatelné zařízení s Wi-Fi a Ethernetem pro počítání pulzů až na čtyřech galvanicky oddělených digitálních vstupech."
sidebar_label: Úvod
---

# GAUGER {#gauger}

**GAUGER** je konfigurovatelné zařízení s Wi-Fi/Ethernetem určené pro počítání pulzů až na čtyřech galvanicky oddělených digitálních vstupech.

Zařízení se konfiguruje přes vestavěné webové rozhraní a lze ho ovládat také přes HTTP API. Stavy čítačů lze číst přes Modbus TCP.

:::tip
### Jak zařízení GAUGER zprovoznit, popisuje návod [**Prvotní konfigurace**](operation-instructions/initial-configuration.md) {#to-get-your-gauger-running-read-the-initial-configuration-guide}
:::

<img src="/img/gauger-intro.webp" data-zoom-src="/img/gauger-intro.webp" width="540" alt="GAUGER" />

## Rychlé odkazy {#quick-links}

* [**Prvotní konfigurace**](operation-instructions/initial-configuration.md): Připojte se k zařízení GAUGER a nastavte jej poprvé.
* [**Popis hardwaru**](hardware-description.md): Elektrické a mechanické parametry a specifikace vstupů.
* [**Podrobný popis**](category/detailed-description): Konektory, stavy zařízení, chování DHCP, HTTP API, registry Modbus, napájení.
* [**Návod k obsluze**](category/operation-instructions): Reset konfigurace, vyhledání zařízení, správa firmwaru.
* [**Seznam změn**](changelog): Nejnovější změny firmwaru a platformy.

## Typické případy použití {#typical-use-cases}

- Měření průtoku vody a spotřeby plynu na obtížně dostupných místech
- Počítání osob pomocí infračervených bran na přestupních nebo dopravních stanicích
- Sledování otáček zařízení a výtěžnosti výrobní linky
- Průmyslové IoT měření v budovách a ve městech

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Galvanicky oddělené vstupy** | Až čtyři izolované digitální vstupy pro počítání pulzů. |
| **Připojení přes Ethernet** | Drátová síť 10/100 Base-T. |
| **Připojení přes Wi-Fi** | 2,4GHz Wi-Fi (802.11 b/g/n). |
| **Montáž na DIN lištu** | Průmyslová krabička na DIN lištu. |
| **Server Modbus TCP** | Čtení stavů čítačů přes Modbus TCP. |
| **Webová konfigurace** | Vestavěné webové rozhraní pro konfiguraci. |
| **HTTP API** | Konfigurační API na bázi HTTP. |
| **Aktualizace OTA** | Bezdrátová aktualizace firmwaru. |
