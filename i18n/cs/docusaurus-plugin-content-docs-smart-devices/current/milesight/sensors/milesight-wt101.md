---
slug: milesight-wt101
title: WT101
description: "Milesight WT101 je chytrá radiátorová termostatická hlavice s ovládáním přes LoRaWAN pro efektivní řízení vytápění. Obsahuje vysoce přesný teplotní senzor (±0,5 °C), podporuje až 16 topných plánů a nabízí bezpečnostní funkce jako detekci otevřeného…"
---

import Image from '@theme/IdealImage';

# Senzor Milesight WT101 {#milesight-sensor-wt101}

Milesight WT101 je **chytrá radiátorová termostatická hlavice** s **ovládáním přes LoRaWAN** pro efektivní řízení vytápění. Obsahuje **vysoce přesný teplotní senzor (±0,5 °C)**, podporuje **až 16 topných plánů** a nabízí bezpečnostní funkce jako **detekci otevřeného okna a dětský zámek**.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/wt101-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-wt101                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/wt101         |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/wt101-user-guide-en.pdf |
| Katalogový list | https://resource.milesight.com/milesight/iot/document/wt101-datasheet-en.pdf |

---

## Obecná konfigurace {#general-configuration}
Konfigurace se provádí přes NFC pomocí [aplikace Milesight ToolBox](/smart-devices/milesight/sensors/index#qr-code--milesight-toolbox).

Pokyny ke konfiguraci senzoru najdete zde 👉 [**Obecná konfigurace**](/smart-devices/milesight/sensors/index/#general-configuration).

---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Informace o podporovaných platformách LoRaWAN network serveru najdete zde 👉[**Možnosti sítě LoRaWAN**](https://docs.hardwario.com/smart-devices/milesight/sensors/index#lorawan-network-options)

---

## Konfigurace LoRaWAN {#lorawan-configuration}
| Parametr         | Hodnota                  |
|------------------|--------------------------|
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info DevEUI
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení unikátní a najdete jej vytištěný na štítku zařízení.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/wt-series/wt101/wt101-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/wt-series/wt101/wt101-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/wt-series/wt101/wt101-codec.json) |

:::info 
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení do čitelného formátu JSON.<br />
**Enkodér** -> Převádí příkazy ve formátu JSON na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla pro dekódování a kódování (struktura, pole, porty), která používají network servery.
:::

---

## Napájení {#power-supply}
| Typ     | Hodnota          |
|--------|----------------|
| Napájení | baterie CR2450 |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Protokol | LoRaWAN® |
| Frekvence | IN865 / RU864 / EU868 |
| Vysílací výkon | 16 dBm (868 MHz) |
| Citlivost | -137 dBm |
| Režim | OTAA / ABP Class A |
| **Řízení ventilu** | |
| Aktuátor | krokový motor |
| Výchozí závit | M30 × 1.5 mm |
| Volitelné adaptéry | RA, RAV, RAVL, Giacomini, M28 (Comap, Herz, TA) |
| Pokročilé funkce | automatická regulace teploty, topné plány, ochrana proti zamrznutí, detekce otevřeného okna, alarm neoprávněné manipulace |
| **Teplotní senzor** | |
| Typ | NTC |
| Rozsah | -20°C ~ +60°C |
| Přesnost | ±0.5°C (0–50°C) |
| Rozlišení | 0.1°C |
| **Ostatní** | |
| Displej | LED displej (bílé světlo) |
| Tlačítka | ovládací kolečko, kalibrace/tamper (vnitřní), reset (vnitřní) |
| Software | NFC aplikace / downlink |
| Pokročilé funkce | dětský zámek, režim externího senzoru, FUOTA |
| **Fyzické vlastnosti** | |
| Napájení | 2 × AA Li-FeS2 (celkem 3000 mAh) |
| Životnost baterie | ~5–8 let (podle SF) |
| Provozní teplota | -20°C ~ +60°C |
| Skladovací teplota | -40°C ~ +70°C (bez baterie) |
| Vlhkost | 0–95 % RH (nekondenzující) |
| Krytí | IP30 |
| Rozměry | Φ52 × 90 mm |
| Hmotnost | 170 g (s bateriemi) |
| Materiál | nerezová ocel + ABS, bílá |
| Instalace | západka na ventil |
| **Certifikace** | CE, RoHS |
