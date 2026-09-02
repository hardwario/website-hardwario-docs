---
slug: milesight-am319
title: AM319
description: "Milesight AM319 je senzor kvality vnitřního ovzduší, který měří devět parametrů včetně teploty, vlhkosti, CO₂ a pevných částic. Výsledky zobrazuje na 4,2\" E-Ink displeji s přehlednými indikátory a data přenáší pomocí technologie LoRaWAN pro…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor AM319 {#milesight-sensor-am319}

Milesight AM319 je **senzor kvality vnitřního ovzduší**, který měří **devět parametrů** včetně teploty, vlhkosti, CO₂ a pevných částic. Výsledky zobrazuje na **4,2" E-Ink displeji** s přehlednými indikátory a data přenáší pomocí **technologie LoRaWAN** pro komunikaci na velkou vzdálenost s nízkou spotřebou.

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
[**AM308**](milesight-am308.md) – stejné jako AM307 plus měření částic (PM2.5/PM10).<br />
[**AM319**](milesight-am319.md) – nejpokročilejší verze s dodatečným měřením HCHO nebo O₃; musí být napájena přes USB (bez baterií).
:::

## Odkazy pro integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-am319                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/am319         |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/am300-series-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/am319-datasheet-en.pdf |

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
| Verze LoRaWAN    | 1.0.3                    |
| Pracovní režim   | Class C                  |
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení unikátní a najdete jej vytištěný na štítku zařízení.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am319-hcho/am319-hcho-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am319-hcho/am319-hcho-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am319-hcho/am319-hcho-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla pro dekódování a kódování (struktura, pole, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota            |
|--------|--------------------|
| Napájení | USB-C nebo baterie |

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
| Režim | OTAA / ABP Class C |
| **Senzory** | |
| Teplota | -20°C ~ 60°C, přesnost ±0.2~0.3°C, rozlišení 0.1°C |
| Vlhkost | 0% ~ 100% RH, přesnost ±2% RH, rozlišení 0.5% |
| Pohyb (PIR) | 80° H, 55° V, max 5m |
| Osvětlení | 0–60000 Lux (6 úrovní) |
| TVOC | IAQ hodnocení 1–5 nebo 0–2000 μg/m³ |
| Barometrický tlak | 260–1260 hPa, přesnost ±0.5 hPa |
| CO₂ | 400–2000 ppm, přesnost ±(50 ppm + 5%) |
| PM2.5 a PM10 | 0–1000 μg/m³, ±10 μg/m³ (0–100) |
| Formaldehyd (HCHO) | 0–1.25 mg/m³, přesnost ±10% |
| Ozon (O₃) | 0–10 ppm, přesnost ±5% FS |
| **Rozhraní a displej** | |
| Displej | 4,2" E-Ink |
| Tlačítka | Power + Reset |
| LED a bzučák | Stavová LED + poplachový bzučák |
| USB | Type-C (napájení/konfigurace/konzole) |
| **Software** | Konfigurace přes NFC / USB, prahové hodnoty, kalibrace, ukládání dat (18k záznamů) |
| **Fyzické vlastnosti** | |
| Napájení | 5V/1A (USB-C) |
| Provozní teplota | -20°C ~ +60°C (E-Ink: 0°C–40°C) |
| Kryt | ABS, bílý |
| Rozměry | 100.8 × 114 × 22 mm |
| Hmotnost | 148 g |
| Instalace | Montáž na stěnu (3M páska nebo šrouby) |
| **Certifikace** | CE, FCC, ISED, RoHS |
