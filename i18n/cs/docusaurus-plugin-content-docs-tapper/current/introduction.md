---
slug: /
title: TAPPER
sidebar_label: Úvod
description: "TAPPER je bezpečná čtečka NFC tagů postavená na Raspberry Pi Zero 2 W a modulu PN532, komunikující přes MQTT."
---

import Image from '@theme/IdealImage';

# TAPPER {#tapper}

**TAPPER** je bezpečná čtečka NFC tagů postavená na Raspberry Pi Zero 2 W a modulu PN532. Byla navržena pro komunikaci přes MQTT v systémech, které vyžadují spolehlivé ověřování tagů.

## Rychlé odkazy {#quick-links}

* [**Instalace klienta**](installation): Instalace klienta TAPPER na zařízení TAPPER.
* [**Popis hardwaru**](hardware): Napájecí připojení, specifikace provozních podmínek.
* [**Používání klienta**](usage): Používání klienta TAPPER.
* [**Vylepšení zabezpečení**](security): Tipy pro vyšší bezpečnost.
* [**MQTT přes TLS**](tls-setup): Návod na nastavení MQTT přes TLS.
* [**Specifikace MQTT**](api-spec): Specifikace MQTT API.
* [**Seznam změn**](changelog): Nejnovější změny firmwaru a platformy.

## Typické případy použití {#typical-use-cases}

- Kontrola přístupu a bezpečné ověřování vstupu
- Sledování výdeje a návratu majetku nebo vybavení
- Evidence účasti na akcích nebo v objektech
- Ověřování tagů s detekcí neoprávněné manipulace v zabezpečených prostředích

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Detekce NFC tagů** | Ověřeno s tagy MIFARE Classic 1k. |
| **Bezpečná komunikace MQTT** | Spolehlivé zasílání zpráv s podporou TLS. |
| **Detekce neoprávněné manipulace** | Mechanický spínač detekuje otevření krabičky. |
| **Vizuální a akustická signalizace** | Integrovaná RGB LED a bzučák pro indikaci stavu. |
