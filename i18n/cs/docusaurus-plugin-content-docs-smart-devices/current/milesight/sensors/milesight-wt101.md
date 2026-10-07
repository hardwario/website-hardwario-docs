---
slug: milesight-wt101
title: WT101
---

import Image from '@theme/IdealImage';

# Senzor Milesight WT101 {#milesight-sensor-wt101}

Milesight WT101 je **chytrá termostatická hlavice** s **ovládáním přes LoRaWAN** pro efektivní řízení vytápění. Má **vysoce přesný teplotní senzor (±0,5 °C)**, zvládne **až 16 topných plánů** a nabízí bezpečnostní funkce, jako je **detekce otevřeného okna a dětský zámek**.

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
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-wt101                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/wt101         |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/wt101-user-guide-en.pdf |
| Produktový list | https://resource.milesight.com/milesight/iot/document/wt101-datasheet-en.pdf |

---

## Obecná konfigurace {#general-configuration}
Zařízení se konfiguruje přes NFC v [aplikaci Milesight ToolBox](/smart-devices/milesight/sensors/index#qr-code--milesight-toolbox).

Postup konfigurace najdete v části 👉 [**Obecná konfigurace**](/smart-devices/milesight/sensors/index/#general-configuration).

---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Přehled podporovaných platforem síťových serverů LoRaWAN najdete v části 👉[**Možnosti sítě LoRaWAN**](/smart-devices/milesight/sensors/index#lorawan-network-options).

---

## Konfigurace LoRaWAN {#lorawan-configuration}
| Parametr         | Hodnota                  |
|------------------|--------------------------|
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info DevEUI
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení jedinečný a je vytištěný na jeho štítku.
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
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
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
| Akční člen | krokový motor |
| Výchozí závit | M30 × 1,5 mm |
| Volitelné adaptéry | RA, RAV, RAVL, Giacomini, M28 (Comap, Herz, TA) |
| Pokročilé funkce | automatická regulace teploty, topné plány, ochrana proti zamrznutí, detekce otevřeného okna, alarm neoprávněné manipulace |
| **Teplotní senzor** | |
| Typ | NTC |
| Rozsah | -20°C ~ +60°C |
| Přesnost | ±0,5°C (0–50°C) |
| Rozlišení | 0,1°C |
| **Ostatní** | |
| Displej | LED displej (bílé světlo) |
| Tlačítka | ovládací kolečko, kalibrace / ochrana proti manipulaci (vnitřní), reset (vnitřní) |
| Software | Aplikace NFC / downlink |
| Pokročilé funkce | dětský zámek, režim externího senzoru, FUOTA |
| **Fyzické vlastnosti** | |
| Napájení | 2 × AA Li-FeS2 (celkem 3000 mAh) |
| Výdrž baterie | ~5–8 let (podle SF) |
| Provozní teplota | -20°C ~ +60°C |
| Skladovací teplota | -40°C ~ +70°C (bez baterie) |
| Vlhkost | 0–95 % RH (nekondenzující) |
| Krytí | IP30 |
| Rozměry | Φ52 × 90 mm |
| Hmotnost | 170 g (s bateriemi) |
| Materiál | nerezová ocel + ABS, bílá |
| Instalace | nasazení na ventil (západka) |
| **Certifikace** | CE, RoHS |
