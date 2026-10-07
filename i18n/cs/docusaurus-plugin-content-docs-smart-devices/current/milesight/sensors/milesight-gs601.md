---
slug: milesight-gs601
title: GS601
---

import Image from '@theme/IdealImage';

# Senzor Milesight GS601 {#milesight-sensor-gs601}

Milesight GS601 je **stropní detektor vapování a kouře** pro **nekuřácká prostředí**, jako jsou školy, byty, hotely nebo schodiště. Pomocí **laserového rozptylu** odhalí **s vysokou přesností** elektronické cigarety, klasické cigarety i marihuanu a zároveň měří **teplotu**, **vlhkost**, **prachové částice** (PM1.0/2.5/10) a **TVOC**. Je vybavený **ochranou proti neoprávněné manipulaci**, **okamžitě upozorní** bzučákem (70 dB) a LED indikátory a má **krytí IP30**. Díky konektivitě **LoRaWAN třídy C** poslouží ke komplexnímu sledování kvality vzduchu i k vymáhání zákazu kouření.

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

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-gs601                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/gs601           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/gs601-user-guide-en.pdf |
| Produktový list       | https://resource.milesight.com/milesight/iot/document/gs601-datasheet-en.pdf |

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
| Pracovní režim   | Class C                  |
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info 
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení jedinečný a je vytištěný na jeho štítku.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                        |
|--------|--------------------------------|
| Napájení | 5V/1A USB Type-C nebo PoE splitter |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN® |
| Anténa | Interní |
| Frekvence | RU864 / IN865 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class C |
| **Detekce vapování/kouře** | |
| Technologie | Laserový rozptyl |
| Rozsah detekce | 0-100 (stupnice) |
| Přesnost | ±10 |
| Detekuje | Elektronické cigarety, klasické cigarety, marihuana |
| **Senzory prostředí** | |
| Teplota | -20°C ~ +60°C, přesnost ±0,2°C |
| Vlhkost | 0% ~ 100% RH, přesnost ±2% |
| Prachové částice | PM1.0, PM2.5, PM10 (0-1000 μg/m³) |
| TVOC | 0-2000 μg/m³ |
| **Upozornění a indikace** | |
| Bzučák | Ano, 70 dB |
| LED indikátory | Vizuální indikace stavu |
| Detekce manipulace | Vibrační senzor |
| Požární alarm | Podle teploty (sledování v rozsahu 20-60°C) |
| **Funkce** | |
| Konfigurace | NFC / downlink |
| Pokročilé funkce | Ochrana proti manipulaci, nastavitelný bzučák, FUOTA |
| Odolnost vůči vodě a plynům | Brání planým poplachům |
| **Fyzické vlastnosti** | |
| Napájení | 5V/1A USB Type-C nebo PoE splitter |
| Provozní teplota | -5°C ~ +45°C |
| Vlhkost | 0%–95% RH (nekondenzující) |
| Krytí | IP30 |
| Rozměry | Ø128 × 40 mm |
| Hmotnost | 178,6 g |
| Materiál | ABS+PC |
| Instalace | Montáž na strop (lepicí páska 3M, výška 2,7-3 m) |
| **Certifikace** | CE, FCC, RoHS |
