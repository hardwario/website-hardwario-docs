---
slug: milesight-am307
title: AM307
description: "Milesight AM307 je senzor pro monitorování vnitřního prostředí, který měří sedm parametrů: teplotu, vlhkost, pohyb (PIR), osvětlení, CO₂, TVOC a barometrický tlak. Výsledky zobrazuje na 4,2\" E-Ink displeji s přehlednými indikátory a data přenáší…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor AM307 {#milesight-sensor-am307}

Milesight AM307 je **senzor pro monitorování vnitřního prostředí**, který měří **sedm parametrů**: teplotu, vlhkost, pohyb (PIR), osvětlení, CO₂, TVOC a barometrický tlak. Výsledky zobrazuje na **4,2" E-Ink displeji** s přehlednými indikátory a data přenáší technologií **LoRaWAN Class A** pro komunikaci na velkou vzdálenost s nízkou spotřebou.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../../smart-devices/milesight/sensors/milesight-am300/images/am319-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::info
[**AM307**](milesight-am307.md) – monitoruje základní kvalitu vnitřního ovzduší.<br />
[**AM308**](milesight-am308.md) – totéž co AM307 plus měření částic (PM2.5/PM10).<br />
[**AM319**](milesight-am319.md) – nejpokročilejší verze s dodatečným měřením HCHO nebo O₃; musí být napájena přes USB (bez baterií).
:::

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | Zatím není dostupné                      |
| Oficiální stránka   | https://www.milesight.com/iot/product/lorawan-sensor/am319           |
| Uživatelská příručka      | https://resource.milesight.com/milesight/iot/document/am300-series-user-guide-en.pdf |
| Katalogový list       | https://resource.milesight.com/milesight/iot/document/am300-series-datasheet-en.pdf |

---

## Obecná konfigurace {#general-configuration}
Konfigurace probíhá přes NFC pomocí [aplikace Milesight ToolBox](/smart-devices/milesight/sensors/index#qr-code--milesight-toolbox).

Pokyny ke konfiguraci senzoru najdete zde 👉 [**Obecná konfigurace**](/smart-devices/milesight/sensors/index/#general-configuration).

---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Informace o podporovaných platformách LoRaWAN network serverů najdete zde 👉[**Možnosti sítě LoRaWAN**](https://docs.hardwario.com/smart-devices/milesight/sensors/index#lorawan-network-options)

---

## Konfigurace LoRaWAN {#lorawan-configuration}
| Parametr         | Hodnota                  |
|------------------|--------------------------|
| Verze LoRaWAN    | 1.0.3                    |
| Pracovní režim   | Class A                  |
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení jedinečné a najdete jej vytištěné na štítku zařízení.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am307/am307-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am307/am307-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am307/am307-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí JSON příkazy na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla pro dekódování a kódování (struktura, pole, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota            |
|--------|--------------------|
| Baterie | 4 × 2700 mAh ER14505 Li-SOCl2 (vyměnitelné) |
| Napájení USB | 5V/1A přes Type-C |
| Výdrž baterie | Přes 1 rok (interval 10 min @ 25°C) |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN® |
| Anténa | Interní antény |
| Frekvence | CN470 / RU864 / IN865 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Senzory** | |
| Teplota | -20°C ~ 60°C, přesnost ±0.2°C, rozlišení 0.1°C |
| Vlhkost | 0% ~ 100% RH, přesnost ±2% RH, rozlišení 0.5% |
| Pohyb (PIR) | 80° H, 55° V, max 5m, stav: volno/obsazeno |
| Osvětlení | 0–60000 Lux (6 úrovní) |
| TVOC | Hodnocení IAQ 1.00–5.00, přesnost ±1, rozlišení 0.01 |
| Barometrický tlak | 260–1260 hPa, přesnost ±0.5 hPa, rozlišení 0.1 hPa |
| CO₂ | 400–5000 ppm, přesnost ±(50 ppm + 5%) |
| **Rozhraní a displej** | |
| Displej | 4,2" E-Ink |
| Tlačítka | Power + Reset |
| LED a bzučák | Stavová LED + poplachový bzučák |
| USB | Type-C (napájení/konfigurace/konzole) |
| **Software** | Konfigurace přes NFC / USB, prahové hodnoty, kalibrace, ukládání dat (18k záznamů) |
| **Fyzické vlastnosti** | |
| Napájení | 4 × baterie ER14505 nebo 5V/1A (USB-C) |
| Provozní teplota | -20°C ~ +60°C (E-Ink: 0°C–40°C) |
| Relativní vlhkost | 10% ~ 90% (bez kondenzace) |
| Krytí | IP30 |
| Kryt | ABS, bílý |
| Rozměry | 100.8 × 114 × 22 mm (3.97 × 4.49 × 0.87 in) |
| Hmotnost | 148 g |
| Instalace | Montáž na stěnu (3M páska nebo šrouby) |
| **Certifikace** | CE, FCC, ISED, RoHS |
