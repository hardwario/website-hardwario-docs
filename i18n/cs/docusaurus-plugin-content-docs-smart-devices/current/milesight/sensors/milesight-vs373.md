---
slug: milesight-vs373
title: VS373
description: "Milesight VS373 je bezkontaktní senzor detekce pádu navržený pro péči o seniory a zdravotnická zařízení. Využívá pokročilou 4D radarovou technologii milimetrových vln 60 GHz v kombinaci s AI algoritmy k detekci pádů a abnormálních pohybů s přesností…"
---

import Image from '@theme/IdealImage';

# Milesight Sensor VS373 {#milesight-sensor-vs373}

Milesight VS373 je **bezkontaktní senzor detekce pádu** navržený pro **péči o seniory a zdravotnická zařízení**. Využívá pokročilou **4D radarovou technologii milimetrových vln 60 GHz** v kombinaci s **AI algoritmy** k detekci pádů a abnormálních pohybů s **přesností až 99 %**. Senzor poskytuje **nepřetržité monitorování 24/7** i v temném a vlhkém prostředí, nabízí **plnou ochranu soukromí** bez snímání obrazu a disponuje **krytím IP65**. Podporuje více detekčních funkcí včetně přítomnosti v posteli, obsazenosti místnosti, detekce nehybnosti a monitorování dýchání.

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

## Odkazy pro integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-vs373                        |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/vs373         |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/vs373-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/vs373-datasheet-en.pdf |

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
| Pracovní režim   | Class C                  |
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
| Decoder | [Zobrazit decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-decoder.js) |
| Encoder | [Zobrazit encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-encoder.js) |
| Codec | [Zobrazit codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-codec.json) |

:::info
### Přehled terminologie {#terminology-overview}
**Decoder** -> Převádí binární payload zařízení do čitelného JSON.<br />
**Encoder** -> Převádí JSON příkazy na binární payload pro downlinky.<br />
**Codec** -> Definuje pravidla pro dekódování a kódování (struktura, pole, porty) používaná network servery.
:::


---

## Napájení {#power-supply}
| Typ    | Hodnota                    |
|--------|----------------------------|
| Napájení | DC 5V/3A přes USB Type-C |

---

## Technické specifikace {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN®, Milesight D2D, Wi-Fi 2,4 GHz |
| Antena | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class C |
| **Radarová detekce** | |
| Technologie | 4D radar mmWave 60 GHz |
| Vysílače/přijímače | 24 vysílačů, 22 přijímačů |
| Zorné pole | 70° H × 140° V |
| Detekční rozsah | 2m×2m až 4m×5m (při výšce 2,3–3 m) |
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
