---
slug: milesight-am308
title: AM308(L)
description: "Milesight AM308 a AM308L jsou vnitřní senzory pro monitorování prostředí, které měří osm parametrů: teplotu, vlhkost, pohyb (PIR), osvětlení, CO₂, TVOC, barometrický tlak, PM2.5 a PM10. Model AM308 je vybaven 4,2\" E-Ink displejem pro zobrazení hodnot…"
---
import Image from '@theme/IdealImage';

# Senzor Milesight AM308(L) {#milesight-sensor-am308l}

Milesight AM308 a AM308L jsou **vnitřní senzory pro monitorování prostředí**, které měří **osm parametrů**: teplotu, vlhkost, pohyb (PIR), osvětlení, CO₂, TVOC, barometrický tlak, PM2.5 a PM10. Model **AM308** je vybaven **4,2" E-Ink displejem** pro zobrazení hodnot v reálném čase, zatímco **AM308L** nabízí delší výdrž baterie bez displeje. Oba přenášejí data pomocí technologie **LoRaWAN Class A** pro komunikaci na velké vzdálenosti s nízkou spotřebou.

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
[**AM307**](milesight-am307.md) – monitoruje základní kvalitu vnitřního vzduchu.<br />
[**AM308**](milesight-am308.md) – stejné jako AM307 plus měření částic (PM2.5/PM10).<br />
[**AM319**](milesight-am319.md) – nejpokročilejší verze s dodatečným měřením HCHO nebo O₃; musí být napájena přes USB (bez baterií).
:::

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | Zatím není k dispozici                      |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/am319           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/am300-series-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/am300-series-datasheet-en.pdf |

---

## Obecná konfigurace {#general-configuration}
Konfigurace se provádí přes NFC pomocí [aplikace Milesight ToolBox](/smart-devices/milesight/sensors/index#qr-code--milesight-toolbox).

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
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení unikátní a najdete jej vytištěný na etiketě zařízení.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am308/am308-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am308/am308-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am308/am308-codec.json) |

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
| Baterie | 4 × 2700 mAh ER14505 Li-SOCl2 (vyměnitelné) |
| Napájení USB | 5V/1A přes Type-C |
| Výdrž baterie (AM308) | Více než 1 rok (interval 10 min @ 25°C) |
| Výdrž baterie (AM308L) | Přibližně 1,5 roku (interval 10 min @ 25°C) |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN® |
| Antény | Interní antény |
| Frekvence | CN470 / RU864 / IN865 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Senzory** | |
| Teplota | -20°C ~ 60°C, přesnost ±0.2°C, rozlišení 0.1°C |
| Vlhkost | 0% ~ 100% RH, přesnost ±2% RH, rozlišení 0.5% |
| Pohyb (PIR) | 80° H, 55° V, max 5m, stav: neobsazeno/obsazeno |
| Osvětlení | 0–60000 Lux (6 úrovní) |
| TVOC | IAQ hodnocení 1.00–5.00, přesnost ±1, rozlišení 0.01 |
| Barometrický tlak | 260–1260 hPa, přesnost ±0.5 hPa, rozlišení 0.1 hPa |
| CO₂ | 400–5000 ppm, přesnost ±(50 ppm + 5%) |
| PM2.5 a PM10 | 0–1000 μg/m³, přesnost ±10 μg/m³ (0–100 μg/m³) |
| **Rozhraní a displej** | |
| Displej | 4,2" E-Ink (pouze AM308, není u AM308L) |
| Tlačítka | Power + Reset |
| LED a bzučák | Stavová LED + poplachový bzučák |
| USB | Type-C (napájení/konfigurace/konzole) |
| **Software** | Konfigurace přes NFC / USB, prahové hodnoty, kalibrace, ukládání dat (18k záznamů) |
| **Fyzické vlastnosti** | |
| Napájení | 4 × baterie ER14505 nebo 5V/1A (USB-C) |
| Provozní teplota | -20°C ~ +60°C (E-Ink: 0°C–40°C u AM308) |
| Relativní vlhkost | 10% ~ 90% (bez kondenzace) |
| Krytí | IP30 |
| Kryt | ABS, bílý |
| Rozměry | 100.8 × 114 × 22 mm (3.97 × 4.49 × 0.87 in) |
| Hmotnost | 148 g |
| Instalace | Montáž na zeď (3M lepicí páska nebo šrouby) |
| **Certifikace** | CE, FCC, ISED, RoHS |
