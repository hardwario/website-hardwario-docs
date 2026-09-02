---
slug: /
title: Úvod
description: "Zařízení hostuje webové uživatelské rozhraní, které slouží k jeho konfiguraci. Lze jej ovládat také přes HTTP API. Hodnoty počítadel je možné čítat pomocí Modbus TCP."
---

# GAUGER {#gauger}

**GAUGER** je konfigurovatelné zařízení s WiFi/Ethernetem určené pro počítání pulzů na až čtyřech galvanicky oddělených digitálních vstupech.

Zařízení hostuje webové uživatelské rozhraní, které slouží k jeho konfiguraci. Lze jej ovládat také přes HTTP API. Hodnoty počítadel je možné čítat pomocí Modbus TCP.

:::tip
### Pro zprovoznění zařízení GAUGER si přečtěte návod [**Prvotní konfigurace**](operation-instructions/initial-configuration.md). {#to-get-your-gauger-running-read-the-initial-configuration-guide}
:::

<img src="/img/gauger-intro.webp" data-zoom-src="/img/gauger-intro.webp" width="540" alt="GAUGER" />

## Rychlé odkazy {#quick-links}

* [**Prvotní konfigurace**](operation-instructions/initial-configuration.md) – Připojte se k zařízení GAUGER a nastavte jej poprvé.
* [**Popis hardwaru**](hardware-description.md) – Elektrické, fyzické a vstupní specifikace.
* [**Podrobný popis**](category/detailed-description) – Konektory, stavy zařízení, chování DHCP, HTTP API, registry Modbus, napájení.
* [**Návod k obsluze**](category/operation-instructions) – Reset konfigurace, vyhledání zařízení, správa firmwaru.
* [**Seznam změn**](changelog) – Nejnovější změny firmwaru a platformy.

## Typické případy použití {#typical-use-cases}

- Měření průtoku vody a spotřeby plynu na obtížně dostupných místech
- Počítání osob pomocí infračervených bran na přestupních nebo dopravních stanicích
- Sledování otáček zařízení a výtěžnosti výrobní linky
- Průmyslové IoT snímání v budovách a městských oblastech

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Galvanicky oddělené vstupy** | Až čtyři izolované digitální vstupy pro počítání pulzů. |
| **Připojení přes Ethernet** | Drátová síť 10/100 Base-T. |
| **Připojení přes WiFi** | 2.4GHz WiFi (802.11 b/g/n). |
| **Montáž na DIN lištu** | Průmyslová krabička na DIN lištu. |
| **Server Modbus TCP** | Čtení hodnot počítadel přes Modbus TCP. |
| **Webová konfigurace** | Vestavěný konfigurační web. |
| **HTTP API** | Konfigurační API na bázi HTTP. |
| **Aktualizace OTA** | Funkce bezdrátové aktualizace firmwaru. |
