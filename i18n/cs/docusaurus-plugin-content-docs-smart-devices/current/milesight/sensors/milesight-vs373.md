---
slug: milesight-vs373
title: VS373
---

import Image from '@theme/IdealImage';

# Senzor Milesight VS373 {#milesight-sensor-vs373}

Milesight VS373 je **bezkontaktní senzor detekce pádů** pro **péči o seniory a zdravotnická zařízení**. Pomocí pokročilého **4D radaru s milimetrovými vlnami 60 GHz** a **algoritmů AI** rozpozná pády a neobvyklé pohyby s **přesností až 99 %**. **Monitoruje nepřetržitě, 24/7**, i ve tmě a ve vlhkém prostředí, **plně chrání soukromí**, protože nepořizuje obraz, a má **krytí IP65**. Umí také zjistit přítomnost v posteli, obsazenost místnosti a nehybnost a sledovat dýchání.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/vs373.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-vs373                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/vs373         |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/vs373-user-guide-en.pdf |
| Produktový list       | https://resource.milesight.com/milesight/iot/document/vs373-datasheet-en.pdf |

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
| Decoder | [Zobrazit decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-decoder.js) |
| Encoder | [Zobrazit encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-codec.json) |

:::info
### Přehled pojmů {#terminology-overview}
**Decoder** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Encoder** -> Převádí JSON příkazy na binární payload pro downlinky.<br />
**Kodek** -> Definuje pravidla dekódování a kódování (strukturu, pole, porty), podle kterých pracují síťové servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                    |
|--------|----------------------------|
| Napájení | DC 5V/3A přes USB Type-C |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, Milesight D2D, Wi-Fi 2,4 GHz |
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class C |
| **Radarová detekce** | |
| Technologie | 4D radar mmWave 60 GHz |
| Vysílače/přijímače | 24 vysílačů, 22 přijímačů |
| Zorné pole | 70° H × 140° V |
| Detekční rozsah | 2m×2m až 4m×5m (při montážní výšce 2,3–3 m) |
| Přesnost detekce pádu | Až 99 % |
| **Detekční funkce** | |
| Základní funkce | Detekce pádu, přítomnost v posteli, obsazenost místnosti |
| Pokročilé funkce | Detekce nehybnosti, detekce dýchání, upozornění na opuštění postele |
| **Rozhraní** | |
| Digitální výstup | 1× (60V/1A) |
| Tlačítka | 1× Reset, 1× multifunkční |
| Indikace | Vícebarevná LED, bzučák |
| Konfigurace | NFC / downlink |
| **Fyzické vlastnosti** | |
| Napájení | DC 5V/3A (USB Type-C) |
| Spotřeba | Max 9,5 W |
| Provozní teplota | 0°C ~ +50°C |
| Vlhkost | 0 %–95 % RH (nekondenzující) |
| Krytí | IP65 |
| Rozměry | 114 × 84 × 15 mm |
| Hmotnost | 214,5 g |
| Materiál | ABS+PC |
| Instalace | Montáž na stěnu nebo strop |
| **Certifikace** | CE, FCC |
