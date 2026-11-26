---
slug: milesight-gs601
title: GS601
description: "Milesight GS601 ceiling vape and smoke detector with PM, TVOC, temperature and humidity sensing: LoRaWAN Class C keys, decoders and specifications."
---

import Image from '@theme/IdealImage';

# Milesight sensor GS601

Milesight GS601 is a **ceiling-mounted vape and smoke detector** designed for **smoke-free environments** including schools, apartments, hotels, and stairwells. It uses **laser scattering technology** to detect e-cigarettes, traditional cigarettes, and marijuana with **high accuracy**, while also monitoring **temperature**, **humidity**, **particulate matter** (PM1.0/2.5/10), and **TVOC**. The sensor features **anti-tamper protection**, **real-time alerts** via buzzer (70 dB) and LED indicators, **IP30 rating**, and **LoRaWAN Class C** connectivity for comprehensive air quality monitoring and enforcement.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ maxWidth: '500px' }}>
        <Image img={require('./images/gs601.png')} alt="Milesight Sensor GS601" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Integration links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-gs601                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/gs601           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/gs601-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/gs601-datasheet-en.pdf |

---

## General configuration
Configuration is done via NFC using the [Milesight ToolBox app](/smart-devices/milesight/sensors/index#qr-code--milesight-toolbox).

For sensor configuration instructions, see 👉 [**General configuration**](/smart-devices/milesight/sensors/index/#general-configuration).

---

## LoRaWAN network options

For information about supported LoRaWAN network server platforms, see 👉[**LoRaWAN Network Options**](/smart-devices/milesight/sensors/index#lorawan-network-options)

---

## LoRaWAN configuration
| Parameter        | Value                    |
|------------------|--------------------------|
| Work mode        | Class C                  |
| Join type        | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info 
**DevEUI** (Device Extended Unique Identifier) is unique for each device and can be found printed on the device label.
:::

---

## Data encoding & decoding

| Type | GitHub Link |
|------|--------------|
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/gs-series/gs601/gs601-codec.json) |

:::info
### Terminology overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value                          |
|--------|--------------------------------|
| Power  | 5 V/1A USB Type-C or PoE Splitter |

---

## Technical specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless transmission** | |
| Technology | LoRaWAN® |
| Antenna | Internal |
| Frequency | RU864 / IN865 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx power | 16 dBm (868 MHz) / 22 dBm (915 MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class C |
| **Vape/smoke detection** | |
| Technology | Laser scattering |
| Detection range | 0-100 (scale) |
| Accuracy | ±10 |
| Detection capability | E-cigarettes, traditional cigarettes, marijuana |
| **Environmental sensors** | |
| Temperature | -20 °C ~ +60 °C, Accuracy ±0.2 °C |
| Humidity | 0–100 % RH, Accuracy ±2 % |
| Particulate matter | PM1.0, PM2.5, PM10 (0-1000 μg/m³) |
| TVOC | 0-2000 μg/m³ |
| **Alerts & indicators** | |
| Buzzer | Yes, 70 dB |
| LED Indicators | Visual status alerts |
| Tamper detection | Vibration sensor |
| Flame alarm | Temperature-based (20-60 °C monitoring) |
| **Features** | |
| Configuration | NFC / Downlink |
| Advanced features | Anti-tamper, adjustable buzzer, FUOTA |
| Water/gas resistance | Resilient against false alarms |
| **Physical characteristics** | |
| Power supply | 5 V/1A USB Type-C or PoE Splitter |
| Operating temp | -5°C ~ +45 °C |
| Humidity | 0 %–95 % RH (non-condensing) |
| Ingress protection | IP30 |
| Dimensions | Ø128 × 40 mm |
| Weight | 178.6 g |
| Material | ABS+PC |
| Installation | Ceiling mount (3M adhesive, 2.7-3m height) |
| **Approvals** | CE, FCC, RoHS |
