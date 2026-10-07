---
slug: milesight-ws303
title: WS303
---

import Image from '@theme/IdealImage';

# Senzor Milesight WS303 {#milesight-sensor-ws303}

Milesight WS303 je **chytrý detektor úniku vody** se **dvěma sondami z nerezové oceli**, které zachytí vodu už od výšky hladiny 0,5 mm. **Vestavěný bzučák** spustí poplach přímo na místě, upozornění se zároveň odešle přes **LoRaWAN** a **baterie vydrží až 5 let**. Díky **kompaktní konstrukci s krytím IP67** ho lze instalovat i na obtížně dostupných místech.

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
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-ws303                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/ws303           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ws303-user-guide-en.pdf |
| Produktový list | https://resource.milesight.com/milesight/iot/document/ws303-datasheet-en.pdf |

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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
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
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 20 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Detekce úniku** | |
| Typ kapaliny | Vodivá kapalina |
| Podmínka spuštění | Hladina kapaliny ≥ 0,5 mm |
| **Ostatní** | |
| Bzučák | Ano |
| Konfigurace | Aplikace NFC / downlink |
| Pokročilé funkce | D2D Controller, alarm při úniku vody |
| **Fyzické vlastnosti** | |
| Napájení | 1 × CR2450 (590 mAh) |
| Výdrž baterie | ~5,7 roku (typické použití, 25 °C) |
| Provozní teplota | -10 °C ~ +60 °C |
| Vlhkost | 0 %–100 % RH (nekondenzující) |
| Krytí | IP67 |
| Rozměry | 63 × 63 × 14 mm |
| Hmotnost | 36,4 g (včetně baterie) |
| Materiál | ABS+PC, bílá |
| Instalace | Páska 3M / položení na stůl |
| **Certifikace** | CE, FCC, RoHS |
