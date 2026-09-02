---
slug: milesight-ws101
title: WS101
description: "Milesight WS101 je kompaktní bateriově napájené chytré tlačítko LoRaWAN určené pro bezdrátové ovládání, spouštění akcí a odesílání alarmů. Podporuje více typů stisknutí (krátké, dlouhé a dvojité) s dobou odezvy do 1 sekundy. Tlačítko se vyznačuje…"
---

import Image from '@theme/IdealImage';

# Senzor Milesight WS101 {#milesight-sensor-ws101}

Milesight WS101 je **kompaktní bateriově napájené chytré tlačítko LoRaWAN** určené pro **bezdrátové ovládání, spouštění akcí a odesílání alarmů**. Podporuje **více typů stisknutí** (krátké, dlouhé a dvojité) s **dobou odezvy do 1 sekundy**. Tlačítko se vyznačuje **extrémně nízkou spotřebou** s **výdrží baterie více než 5 let**, **konfigurací přes NFC** a možností **komunikace Milesight D2D**. Díky **přenosnému designu** a **krytí IP30** je ideální pro chytré domácnosti, kanceláře, hotely, školy a aplikace tlačítka tísňového volání.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/ws101.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ws101                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/ws101           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ws101-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/ws101-datasheet-en.pdf |

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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-encoder.js) |
| Codec | [Zobrazit codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlinky.<br />
**Codec** -> Definuje pravidla pro dekódování a kódování (struktura, položky, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                   |
|--------|---------------------------|
| Napájení | ER14335 Li-SOCL2 (1650 mAh) |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, Milesight D2D |
| Antena | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Funkce tlačítka** | |
| Typy tlačítek | 1× externí tlačítko, 1× tlačítko napájení/reset (interní) |
| Typy stisknutí | Krátké stisknutí, dlouhé stisknutí, dvojité stisknutí |
| Doba odezvy | Méně než 1 sekunda |
| Uživatelsky definované akce | Všechny typy stisknutí lze přizpůsobit |
| **Indikace** | |
| LED | 1× LED indikátor |
| Bzučák | Ano |
| **Funkce** | |
| Konfigurace | NFC / downlink |
| Komunikace D2D | Přímo mezi zařízeními bez brány |
| Pokročilé funkce | Tísňové tlačítko, ovládání scén, spouštěče automatizace |
| **Fyzické vlastnosti** | |
| Napájení | 1 × ER14335 (1650 mAh) |
| Výdrž baterie | Více než 5 let (10 stisknutí denně) |
| Provozní teplota | -20°C ~ +60°C |
| Vlhkost | ≤90% RH (nekondenzující) |
| Krytí | IP30 |
| Rozměry | 50 × 50 × 18 mm |
| Hmotnost | 38,8 g (s baterií) |
| Materiál | ABS+PC |
| Instalace | Montáž na stěnu nebo přenosné |
| **Certifikace** | CE, FCC, RoHS |
