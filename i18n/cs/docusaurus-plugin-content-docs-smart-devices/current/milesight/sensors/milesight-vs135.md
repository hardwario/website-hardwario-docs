---
slug: milesight-vs135
title: VS135
description: "Milesight VS135 je ToF senzor (Time-of-Flight) pro počítání osob s podporou AI, který zajišťuje detekci obsazenosti s 99,8% přesností při plné ochraně soukromí. Nabízí obousměrné počítání, podporuje až 4 vlastní zóny a poskytuje pokročilé analytické…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor VS135 {#milesight-sensor-vs135}

Milesight VS135 je **ToF senzor (Time-of-Flight) pro počítání osob s podporou AI**, který zajišťuje **detekci obsazenosti s 99,8% přesností** při plné ochraně soukromí. Nabízí **obousměrné počítání**, podporuje až **4 vlastní zóny** a poskytuje pokročilé analytické funkce včetně **analýzy doby setrvání**, **teplotních map** a **počítání skupin**. Díky **krytí IP65** a několika možnostem konektivity včetně **LoRaWAN**, **Ethernetu**, **4G LTE** a **Wi-Fi HaLow** je ideální pro retail, kanceláře a správu budov.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/vs135.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-vs135                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/vs135           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/vs135-user-guide-en.pdf |
| Katalogový list | https://resource.milesight.com/milesight/iot/document/vs135-datasheet-en.pdf |

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
| Decoder | [Zobrazit decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-decoder.js) |
| Encoder | [Zobrazit encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-encoder.js) |
| Codec | [Zobrazit codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Decoder** -> Převádí binární payload zařízení do čitelného JSONu.<br />
**Encoder** -> Převádí příkazy v JSONu na binární payload pro downlinky.<br />
**Codec** -> Definuje pravidla pro dekódování a kódování (struktura, položky, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                 |
|--------|-------------------------|
| Napájení | 802.3at PoE+ nebo 12V/2A  |

---

## Technické specifikace {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, Ethernet, 4G LTE, Wi-Fi HaLow |
| Antena | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 20 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class C |
| **Detekce** | |
| Technologie | ToF (Time-of-Flight) s AI |
| Detekční rozsah | 0,5–3,5 m (standardní); 2–6,5 m (vysoké stropy) |
| Montážní výška | ≤3,5 m (standardní); ≤6,5 m (vysoké stropy) |
| Zorné pole | 98° H × 80° V (standardní); 60° H × 45° V (vysoké stropy) |
| Přesnost vzdálenosti | ±3,5 cm (standardní); ±6,5 cm (vysoké stropy) |
| Přesnost | 99,8% |
| Světelný paprsek ToF | 940nm (neviditelné infračervené) |
| **Funkce** | |
| Zóny počítání | až 4 vlastní zóny |
| Analytika | obousměrné počítání, doba setrvání, teplotní mapy, počítání skupin |
| Pokročilé funkce | vyloučení zaměstnanců, detekce nákupních vozíků, rozlišení dospělý/dítě |
| Lokální úložiště | až 1 milion datových záznamů |
| Spojení více zařízení | až 8 jednotek |
| **Fyzické vlastnosti** | |
| Napájení | 802.3at PoE+ nebo 12V/2A DC |
| Spotřeba | průměrně 7–10 W, max 15–24 W |
| Provozní teplota | -20 °C ~ +50 °C |
| Vlhkost | 0%–95% RH (bez kondenzace) |
| Krytí | IP65 |
| Rozměry | 200 × 35 × 85 mm |
| Hmotnost | 419 g (verze PoE) |
| Materiál | ABS+PC |
| **Certifikace** | CE, FCC, ISED, RoHS, certifikováno dle GDPR |
