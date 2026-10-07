---
slug: milesight-ws101
title: WS101
---

import Image from '@theme/IdealImage';

# Senzor Milesight WS101 {#milesight-sensor-ws101}

Milesight WS101 je **kompaktní chytré tlačítko LoRaWAN napájené z baterie** pro **bezdrátové ovládání, spouštění akcí a odesílání alarmů**. Rozlišuje **několik způsobů stisku** (krátký, dlouhý a dvojitý) a **reaguje do 1 sekundy**. Má **extrémně nízkou spotřebu**, **baterie vydrží přes 5 let**, **konfiguruje se přes NFC** a podporuje **komunikaci Milesight D2D**. Díky **přenosnému provedení** a **krytí IP30** se hodí do chytrých domácností, kanceláří, hotelů a škol i jako tísňové tlačítko.

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
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-ws101                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/ws101           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ws101-user-guide-en.pdf |
| Produktový list       | https://resource.milesight.com/milesight/iot/document/ws101-datasheet-en.pdf |

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
| Pracovní režim   | Class A                  |
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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
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
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| **Funkce tlačítka** | |
| Typy tlačítek | 1× externí tlačítko, 1× tlačítko napájení/reset (interní) |
| Typy stisku | Krátký stisk, dlouhý stisk, dvojitý stisk |
| Doba odezvy | Méně než 1 sekunda |
| Uživatelsky definované akce | Akci lze nastavit pro každý typ stisku |
| **Indikace** | |
| LED | 1× LED indikátor |
| Bzučák | Ano |
| **Funkce** | |
| Konfigurace | NFC / downlink |
| Komunikace D2D | Přímo mezi zařízeními bez brány |
| Pokročilé funkce | Tísňové tlačítko, ovládání scén, spouštěče automatizace |
| **Fyzické vlastnosti** | |
| Napájení | 1 × ER14335 (1650 mAh) |
| Výdrž baterie | Více než 5 let (10 stisků denně) |
| Provozní teplota | -20°C ~ +60°C |
| Vlhkost | ≤90% RH (nekondenzující) |
| Krytí | IP30 |
| Rozměry | 50 × 50 × 18 mm |
| Hmotnost | 38,8 g (s baterií) |
| Materiál | ABS+PC |
| Instalace | Montáž na stěnu nebo přenosné použití |
| **Certifikace** | CE, FCC, RoHS |
