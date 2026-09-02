---
slug: milesight-ws303
title: WS303
description: "Milesight WS303 je inteligentní detektor zaplavení se dvěma sondami z nerezové oceli, které detekují vodu už od výšky 0,5 mm. Obsahuje integrovaný bzučák pro místní upozornění, odesílá notifikace přes LoRaWAN a nabízí až 5 let výdrže baterie. Díky…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor WS303 {#milesight-sensor-ws303}

Milesight WS303 je **inteligentní detektor zaplavení** se **dvěma sondami z nerezové oceli**, které detekují vodu už od výšky 0,5 mm. Obsahuje **integrovaný bzučák** pro místní upozornění, odesílá notifikace přes **LoRaWAN** a nabízí až **5 let výdrže baterie**. Díky **kompaktní konstrukci s krytím IP67** ho lze instalovat i na obtížně dostupných místech.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/ws303-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ws303                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/ws303           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ws303-user-guide-en.pdf |
| Katalogový list | https://resource.milesight.com/milesight/iot/document/ws303-datasheet-en.pdf |

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
| Typ připojení    | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info
**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení jedinečný a najdete ho vytištěný na etiketě zařízení.
:::

---


## Kódování a dekódování dat {#data-encoding--decoding}

| Typ | Odkaz na GitHub |
|------|--------------|
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla pro dekódování a kódování (struktura, položky, porty), která používají network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota        |
|--------|----------------|
| Napájení | baterie CR2450 |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, Milesight D2D |
| Antena | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 20 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Detekce zaplavení** | |
| Typ kapaliny | Vodivá kapalina |
| Podmínka spuštění | ≥ 0,5 mm hladiny kapaliny |
| **Ostatní** | |
| Bzučák | Ano |
| Konfigurace | NFC aplikace / downlink |
| Pokročilé funkce | D2D Controller, alarm zaplavení |
| **Fyzické vlastnosti** | |
| Napájení | 1 × CR2450 (590 mAh) |
| Výdrž baterie | ~5,7 roku (typické použití, 25 °C) |
| Provozní teplota | -10 °C ~ +60 °C |
| Vlhkost | 0 %–100 % RH (nekondenzující) |
| Krytí | IP67 |
| Rozměry | 63 × 63 × 14 mm |
| Hmotnost | 36,4 g (včetně baterie) |
| Materiál | ABS+PC, bílá |
| Instalace | 3M páska / na stůl |
| **Certifikace** | CE, FCC, RoHS |
