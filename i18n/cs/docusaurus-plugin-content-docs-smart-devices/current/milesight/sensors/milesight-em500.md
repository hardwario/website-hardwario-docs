---
slug: milesight-em500
title: EM500
---

import Image from '@theme/IdealImage';

# Senzor Milesight EM500-CO2 {#milesight-sensor-em500-co2}

Milesight EM500-CO2 je **venkovní senzor prostředí 4 v 1**, který v náročných podmínkách **měří koncentraci CO₂ spolu s dalšími veličinami prostředí**. Má **senzor CO₂ typu NDIR** s **rozsahem 400–5 000 ppm**, vestavěné **senzory teploty, vlhkosti a barometrického tlaku**, **krabičku s krytím IP65** a **baterii s výdrží 10 let**. Díky **konektivitě LoRaWAN** a **konfiguraci přes NFC** se hodí pro monitorování skleníků, řízení větrání budov, sklady ovoce a detekci lesních požárů.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/em500-co2.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::info Řada EM500
Řada EM500 má několik variant: **EM500-SWL** (hladina vody), **EM500-PP** (tlak v potrubí), **EM500-LGT** (osvětlení), **EM500-PT100** (teplota), **EM500-CO2** (CO₂), **EM500-SMTC** (vlhkost půdy) a další. Tato stránka popisuje model EM500-CO2.
:::

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| E-shop HARDWARIO | Zatím není k dispozici                                                   |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-sensor/em500-co2      |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/em500-series-user-guide-en.pdf |
| Produktový list       | https://resource.milesight.com/milesight/iot/document/em500-co2-datasheet-en.pdf |

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
| Verze LoRaWAN    | 1.0.3                    |
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
| Dekodér | [Zobrazit dekodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em500-co2/em500-co2-decoder.js) |
| Enkodér | [Zobrazit enkodér](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em500-co2/em500-co2-encoder.js) |
| Kodek | [Zobrazit kodek](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em500-co2/em500-co2-codec.json) |

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
| Napájení | ER34615 Li-SOCL2 (19000 mAh) |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Technologie | LoRaWAN® |
| Anténa | Interní |
| Frekvence | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 16–20 dBm (podle frekvence) |
| Citlivost | -137 dBm @300bps |
| Režim | OTAA / ABP Class A |
| Dosah | Až 2 km (město); 15 km (venkov) |
| **Měření CO₂** | |
| Typ senzoru | NDIR (nedisperzní infračervený) |
| Rozsah měření | 400–5 000 ppm |
| Přesnost | ± (30 ppm + 3 % z měřené hodnoty) (0–50 °C, 0–85 % RH) |
| Rozlišení | 1 ppm |
| **Senzor teploty** | |
| Rozsah | -30 °C ~ +70 °C |
| Přesnost | ±0,3 °C (0–70 °C); ±0,6 °C (-30–0 °C) |
| Rozlišení | 0,1 °C |
| **Senzor vlhkosti** | |
| Rozsah | 0–100 % RH |
| Přesnost | ±3 % (10–90 % RH); ±5 % (mimo rozsah) |
| Rozlišení | 0,5 % RH |
| **Barometrický tlak** | |
| Rozsah | 300–1 100 hPa |
| Přesnost | ±1 hPa |
| Rozlišení | 0,1 hPa |
| **Funkce** | |
| Ukládání dat | 1 000 záznamů |
| Konfigurace | NFC / downlink |
| Rozšířené funkce | Alarmy podle prahových hodnot, opakovaný přenos dat, kalibrace |
| **Fyzické vlastnosti** | |
| Napájení | 1 × ER34615 (19000 mAh) |
| Výdrž baterie | ~10 let (interval 10 min, 25 °C) |
| Provozní teplota | -30 °C ~ +70 °C |
| Vlhkost | 0 %–95 % RH (nekondenzující) |
| Krytí | IP65 |
| Rozměry | 147,9 × 71 × 69,5 mm |
| Hmotnost | 434,7 g (s baterií a držákem) |
| Materiál | ABS+PC, šedý |
| Instalace | Na sloup, na zeď nebo na DIN lištu |
| **Certifikace** | CE, FCC, LoRaWAN Certified, ISED, ICASA, Telec, RoHS |
