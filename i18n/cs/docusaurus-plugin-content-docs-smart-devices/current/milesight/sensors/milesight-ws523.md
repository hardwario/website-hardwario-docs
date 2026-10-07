---
slug: milesight-ws523
title: WS523
---

import Image from '@theme/IdealImage';

# Senzor Milesight WS523 {#milesight-sensor-ws523}

Milesight WS523 je **chytrá přenosná zásuvka** s **konektivitou LoRaWAN** pro **dálkové ovládání a sledování spotřeby energie**. **Zapíná a vypíná** připojené spotřebiče **podle plánu**, měří **spotřebu energie** (napětí, proud, činný výkon, účiník) a má **ochranu proti nadproudu a přetížení**. Díky **přesnosti měření ±3 %**, **konfiguraci přes NFC** a variantám pro několik typů zásuvek (US, EU, AU, UK, CN) se hodí pro energetický management, chytré domácnosti a automatizaci budov.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/ws523.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-ws523                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/ws523         |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ws52x-user-guide-en.pdf |
| Produktový list       | https://resource.milesight.com/milesight/iot/document/ws52x-datasheet-en.pdf |

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
| Pracovní režim   | Class C                  |
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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws523/ws523-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws523/ws523-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws523/ws523-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Dekodér** -> Převádí binární payload zařízení na čitelný JSON.<br />
**Enkodér** -> Převádí příkazy v JSON na binární payload pro downlink.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                    |
|--------|----------------------------|
| Napájení | 100-250 VAC, 50-60 Hz    |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN® |
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class C |
| **Monitorování energie** | |
| Měření napětí | VAC |
| Měření proudu | mA |
| Činný výkon | W |
| Účiník | % |
| Spotřeba energie | kWh |
| Přesnost měření | Typicky ±3 %, maximálně ±5 % |
| **Zatížitelnost** | |
| Typy zásuvek | verze US-15A / EU-16A / AU-10A / UK-13A / CN |
| Provozní napětí | 100-250 VAC, 50-60 Hz |
| Maximální zatížení | 10A-16A (podle verze) |
| **Funkce** | |
| Vzdálené ovládání | Zapínání/vypínání přes aplikaci/downlink |
| Plánování | Automatické spínání podle času |
| Ochrana | Ochrana proti nadproudu/přetížení |
| Konfigurace | NFC / downlink |
| **Fyzické vlastnosti** | |
| Napájení | Síťové napájení 100-250 VAC |
| Provozní teplota | -20 °C ~ +60 °C |
| Krytí | IP20 |
| Rozměry | 110 × 62,3 × 34,6 mm |
| Hmotnost | 117,5 g |
| Materiál | Polykarbonát (UL94 V0) |
| Instalace | Přenosná, zapojuje se do zásuvky |
| **Certifikace** | CE, FCC, RCM, SAA, UKCA, RoHS |
