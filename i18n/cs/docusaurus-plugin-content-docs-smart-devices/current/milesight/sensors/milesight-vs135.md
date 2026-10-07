---
slug: milesight-vs135
title: VS135
---

import Image from '@theme/IdealImage';

# Senzor Milesight VS135 {#milesight-sensor-vs135}

Milesight VS135 je **senzor pro počítání osob s technologií ToF (Time-of-Flight) a umělou inteligencí**, který **detekuje obsazenost s přesností 99,8 %** a přitom plně chrání soukromí. **Počítá osoby v obou směrech**, podporuje až **4 vlastní zóny** a nabízí pokročilou analytiku včetně **analýzy doby setrvání**, **tepelných map** a **počítání skupin**. Má **krytí IP65** a několik možností konektivity, mezi nimi **LoRaWAN**, **Ethernet**, **4G LTE** a **Wi-Fi HaLow**, takže se hodí pro maloobchod, kanceláře i správu budov.

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
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-vs135                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/vs135           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/vs135-user-guide-en.pdf |
| Produktový list | https://resource.milesight.com/milesight/iot/document/vs135-datasheet-en.pdf |

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

:::info
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení jedinečný a je vytištěný na jeho štítku.
:::

---

## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                 |
|--------|-------------------------|
| Napájení | 802.3at PoE+ nebo 12V/2A  |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, Ethernet, 4G LTE, Wi-Fi HaLow |
| Anténa | Interní |
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
| Světelný paprsek ToF | 940nm (neviditelné infračervené záření) |
| **Funkce** | |
| Zóny počítání | až 4 vlastní zóny |
| Analytika | obousměrné počítání, doba setrvání, tepelné mapy, počítání skupin |
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
