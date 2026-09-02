---
slug: milesight-gs601
title: GS601
description: "Milesight GS601 je stropní detektor vapování a kouře určený pro prostředí bez kouře, včetně škol, bytů, hotelů a schodišť. Využívá technologii laserového rozptylu k detekci elektronických cigaret, klasických cigaret a marihuany s vysokou přesností a…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor GS601 {#milesight-sensor-gs601}

Milesight GS601 je **stropní detektor vapování a kouře** určený pro **prostředí bez kouře**, včetně škol, bytů, hotelů a schodišť. Využívá **technologii laserového rozptylu** k detekci elektronických cigaret, klasických cigaret a marihuany s **vysokou přesností** a zároveň monitoruje **teplotu**, **vlhkost**, **prachové částice** (PM1.0/2.5/10) a **TVOC**. Senzor nabízí **ochranu proti manipulaci**, **výstrahy v reálném čase** pomocí bzučáku (70 dB) a LED indikátorů, **krytí IP30** a konektivitu **LoRaWAN Class C** pro komplexní monitorování kvality vzduchu a vymáhání pravidel.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/gs601.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy pro integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-gs601                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/gs601           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/gs601-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/gs601-datasheet-en.pdf |

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
| Pracovní režim   | Class C                  |
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info 
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení unikátní a najdete jej vytištěný na etiketě zařízení.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-codec.json) |

:::info
### Přehled terminologie {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla pro dekódování a kódování (struktura, položky, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                        |
|--------|--------------------------------|
| Napájení | 5V/1A USB Type-C nebo PoE splitter |

---

## Technické specifikace {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN® |
| Antena | Interní |
| Frekvence | RU864 / IN865 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class C |
| **Detekce vapování/kouře** | |
| Technologie | Laserový rozptyl |
| Rozsah detekce | 0-100 (stupnice) |
| Přesnost | ±10 |
| Schopnost detekce | Elektronické cigarety, klasické cigarety, marihuana |
| **Environmentální senzory** | |
| Teplota | -20°C ~ +60°C, přesnost ±0.2°C |
| Vlhkost | 0% ~ 100% RH, přesnost ±2% |
| Prachové částice | PM1.0, PM2.5, PM10 (0-1000 μg/m³) |
| TVOC | 0-2000 μg/m³ |
| **Výstrahy a indikátory** | |
| Bzučák | Ano, 70 dB |
| LED indikátory | Vizuální stavové výstrahy |
| Detekce manipulace | Vibrační senzor |
| Alarm plamene | Na základě teploty (monitorování 20-60°C) |
| **Funkce** | |
| Konfigurace | NFC / downlink |
| Pokročilé funkce | Ochrana proti manipulaci, nastavitelný bzučák, FUOTA |
| Odolnost proti vodě/plynům | Odolnost proti falešným alarmům |
| **Fyzické vlastnosti** | |
| Napájení | 5V/1A USB Type-C nebo PoE splitter |
| Provozní teplota | -5°C ~ +45°C |
| Vlhkost | 0%–95% RH (nekondenzující) |
| Krytí | IP30 |
| Rozměry | Ø128 × 40 mm |
| Hmotnost | 178.6 g |
| Materiál | ABS+PC |
| Instalace | Montáž na strop (lepicí páska 3M, výška 2.7-3 m) |
| **Certifikace** | CE, FCC, RoHS |
