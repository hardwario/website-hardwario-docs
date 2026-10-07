---
slug: milesight-ws201
title: WS201
---

import Image from '@theme/IdealImage';

# Senzor Milesight WS201 {#milesight-sensor-ws201}

Milesight WS201 je **bezdrátový senzor zaplnění**, který pro vysokou přesnost používá **technologii ToF (Time-of-Flight)**. Připojuje se přes **LoRaWAN**, na dálku se spravuje v Milesight IoT Cloud, na **knoflíkovou baterii vydrží až 2 roky** a hodí se pro **údržbu veřejných zařízení**.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/ws201-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| E-shop HARDWARIO | Zatím není k dispozici                                                |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/ws201           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ws201-user-guide-en.pdf |
| Produktový list | https://resource.milesight.com/milesight/iot/document/ws201-datasheet-en.pdf |

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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws201/ws201-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws201/ws201-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws201/ws201-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota         |
|--------|-----------------|
| Napájení | baterie CR2450 |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Protokol | LoRaWAN® |
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -132 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Měření vzdálenosti** | |
| Princip | Time-of-Flight (ToF) |
| Rozsah | 1–55 cm |
| Přesnost | ±1 cm |
| Rozlišení | 1–3 mm (v závislosti na vzdálenosti) |
| FoV | 25°, přesnost ±5° |
| **Ostatní** | |
| Tlačítko | Reset (interní) |
| LED | Indikátor (interní) |
| Konfigurace | Aplikace NFC / downlink |
| Pokročilé funkce | Alarm při překročení prahu, režim hibernace |
| **Fyzické vlastnosti** | |
| Napájení | 1 × CR2450 (590 mAh) |
| Výdrž baterie | ~2–3 roky (v závislosti na SF a regionu) |
| Provozní teplota | -10°C ~ +60°C |
| Vlhkost | 0–95 % RH (bez kondenzace) |
| Krytí | IP30 |
| Rozměry | 66 × 38 × 12 mm |
| Hmotnost | 24,7 g (včetně baterie) |
| Materiál | ABS+PC (samozhášivý), bílá |
| Instalace | Páska 3M |
| **Certifikace** | CE, FCC, RoHS |
