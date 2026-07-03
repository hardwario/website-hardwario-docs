---
slug: milesight-em500
title: EM500
---

import Image from '@theme/IdealImage';

# Milesight Sensor EM500-CO2

Milesight EM500-CO2 is a **4-in-1 outdoor environmental monitoring sensor** designed for **measuring CO₂ levels alongside environmental conditions** in harsh settings. It features **NDIR CO₂ sensor** with **400-5,000 ppm range**, integrated **temperature, humidity, and barometric pressure sensors**, **IP65-rated enclosure**, and **10-year battery life**. With **LoRaWAN connectivity** and **NFC configuration**, it's ideal for greenhouse monitoring, building ventilation, fruit storage, and forest fire detection.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/em500-co2.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::info EM500 Series
The EM500 series includes multiple variants: **EM500-SWL** (Water Level), **EM500-PP** (Pipe Pressure), **EM500-LGT** (Light), **EM500-PT100** (Temperature), **EM500-CO2** (CO₂), **EM500-SMTC** (Soil Moisture), and more. This documentation focuses on the EM500-CO2 model.
:::

## Integration Links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | Not yet available                                                     |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/em500-co2      |
| User Guide      | https://resource.milesight.com/milesight/iot/document/em500-series-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/em500-co2-datasheet-en.pdf |

---

## General configuration
Configuration is done via NFC using the [Milesight ToolBox app](/smart-devices/milesight/sensors/index#qr-code--milesight-toolbox).

For sensor configuration instructions, see 👉 [**General configuration**](/smart-devices/milesight/sensors/index/#general-configuration).

---

## LoRaWAN Network Options

For information about supported LoRaWAN network server platforms, see 👉[**LoRaWAN Network Options**](https://docs.hardwario.com/smart-devices/milesight/sensors/index#lorawan-network-options)

---

## LoRaWAN configuration
| Parameter        | Value                    |
|------------------|--------------------------|
| LoRaWAN version  | 1.0.3                    |
| Work mode        | Class A                  |
| Join type        | OTAA                     |
| AppEUI/JoinEUI   | 24E124C0002A0001         |
| AppKey           | 5572404C696E6B4C6F52613230313823 |

:::info 
**DevEUI** (Device Extended Unique Identifier) is unique for each device and can be found printed on the device label.
:::

---

## Data Encoding & Decoding

| Type | GitHub Link |
|------|--------------|
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em500-co2/em500-co2-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em500-co2/em500-co2-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em500-co2/em500-co2-codec.json) |

:::info
### Terminology Overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value                     |
|--------|---------------------------|
| Power  | ER34615 Li-SOCL2 (19000 mAh) |

---

## Technical Specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless Transmission** | |
| Technology | LoRaWAN® |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 16–20 dBm (varies by frequency) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class A |
| Range | Up to 2 km (urban); 15 km (rural) |
| **CO₂ Measurement** | |
| Sensor Type | NDIR (Non-Dispersive Infrared) |
| Measurement Range | 400–5,000 ppm |
| Accuracy | ± (30 ppm + 3% of reading) (0–50°C, 0–85% RH) |
| Resolution | 1 ppm |
| **Temperature Sensor** | |
| Range | -30°C ~ +70°C |
| Accuracy | ±0.3°C (0–70°C); ±0.6°C (-30–0°C) |
| Resolution | 0.1°C |
| **Humidity Sensor** | |
| Range | 0–100% RH |
| Accuracy | ±3% (10–90% RH); ±5% (outside range) |
| Resolution | 0.5% RH |
| **Barometric Pressure** | |
| Range | 300–1,100 hPa |
| Accuracy | ±1 hPa |
| Resolution | 0.1 hPa |
| **Features** | |
| Data Storage | 1,000 entries |
| Configuration | NFC / Downlink |
| Advanced Features | Threshold alarms, data retransmission, calibration |
| **Physical Characteristics** | |
| Power Supply | 1 × ER34615 (19000 mAh) |
| Battery Life | ~10 years (10-min interval, 25°C) |
| Operating Temp | -30°C ~ +70°C |
| Humidity | 0%–95% RH (non-condensing) |
| Ingress Protection | IP65 |
| Dimensions | 147.9 × 71 × 69.5 mm |
| Weight | 434.7 g (with battery and bracket) |
| Material | ABS+PC, Grey |
| Installation | Pole, wall, or DIN rail mounting |
| **Approvals** | CE, FCC, LoRaWAN Certified, ISED, ICASA, Telec, RoHS |
