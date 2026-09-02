---
slug: milesight-em400
title: EM400
description: "Milesight EM400-MUD je multifunkční ultrazvukový senzor vzdálenosti určený pro chytré parkování, odpadové hospodářství a monitorování hladiny. Nabízí úhel svazku 60° s detekčním rozsahem 3–450 cm a vysokou přesností ± (1+0,3 %×S) cm. Senzor nabízí…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor EM400-MUD {#milesight-sensor-em400-mud}

Milesight EM400-MUD je **multifunkční ultrazvukový senzor vzdálenosti** určený pro **chytré parkování**, **odpadové hospodářství** a **monitorování hladiny**. Nabízí **úhel svazku 60°** s **detekčním rozsahem 3–450 cm** a **vysokou přesností** ± (1+0,3 %×S) cm. Senzor nabízí **tři provozní režimy** (Standard, Bin a Parking Lot), **krabičku s krytím IP67**, **extrémně dlouhou výdrž baterie až 10 let** a podporuje konektivitu **LoRaWAN**, **NB-IoT** a **Cat M**.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/em400-mud.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::info Řada EM400
Řada EM400 zahrnuje několik variant: **EM400-TLD** (ToF laser), **EM400-UDL** (ultrazvuk) a **EM400-MUD** (multifunkční ultrazvuk). Tato dokumentace se zaměřuje na model EM400-MUD.
:::

## Odkazy pro integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | Zatím není k dispozici                                                |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/em400-mud       |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/em400-mud-user-guide-en.pdf |
| Katalogový list | https://resource.milesight.com/milesight/iot/document/em400-mud-datasheet-en.pdf |

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
| Pracovní režim   | Class A                  |
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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em400-mud/em400-mud-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em400-mud/em400-mud-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em400-mud/em400-mud-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla pro dekódování a kódování (struktura, pole, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                            |
|--------|------------------------------------|
| Napájení | 2× ER26500 Li-SOCL2 (18000 mAh)   |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, NB-IoT, Cat M |
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 20 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Měření vzdálenosti** | |
| Technologie | Ultrazvuk |
| Detekční rozsah | 3–450 cm |
| Přesnost | ± (1+0.3%×S) cm, kde S = vzdálenost (-15–60°C) |
| Rozlišení | 1 mm |
| Úhel svazku | 60° |
| **Další senzory** | |
| Teplota | -40°C ~ +125°C, rozlišení 0.1°C (NTC termistor) |
| Akcelerometr | 3osý (detekce náklonu) |
| **Funkce** | |
| Režimy | Standard Mode, Bin Mode, Parking Lot Mode (pouze LoRaWAN) |
| Pokročilé funkce | Monitorování hladiny, detekce parkování, odpadové hospodářství |
| Konfigurace | NFC / downlink |
| **Fyzické vlastnosti** | |
| Napájení | 2 × ER26500 (9000 mAh každá) |
| Výdrž baterie | >10 let (režim Standard/Bin); 5 let (režim Parking, 12 sepnutí denně) |
| Provozní teplota | -30°C ~ +70°C |
| Vlhkost | 0%–95% RH (nekondenzující) |
| Krytí | IP67 |
| Rozměry | 118 × 65 × 32.5 mm |
| Hmotnost | 181.4 g (s bateriemi) |
| Materiál | ABS+PC (UL94 V0), černo-šedá |
| **Schválení** | CE, FCC, RoHS |
