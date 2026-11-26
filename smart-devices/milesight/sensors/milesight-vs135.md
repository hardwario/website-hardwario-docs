---
slug: milesight-vs135
title: VS135
description: "Milesight VS135 AI ToF people counting sensor with up to 4 zones: LoRaWAN Class C join keys, payload decoder links and technical specifications."
---

import Image from '@theme/IdealImage';

# Milesight sensor VS135

Milesight VS135 is an **AI-powered ToF (Time-of-Flight) people counting sensor** that delivers **99.8 % accurate occupancy detection** with full privacy protection. It features **bi-directional counting**, supports up to **4 custom zones**, and offers advanced analytics including **dwell time analysis**, **heat maps**, and **group counting**. With its **IP65 rating** and multiple connectivity options including **LoRaWAN**, **Ethernet**, **4G LTE**, and **Wi-Fi HaLow**, it's ideal for retail, office, and building management applications.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ maxWidth: '500px' }}>
        <Image img={require('./images/vs135.webp')} alt="Milesight Sensor VS135" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Integration links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-vs135                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/vs135           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/vs135-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/vs135-datasheet-en.pdf |

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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs135/vs135-codec.json) |

:::info
### Terminology overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value                   |
|--------|-------------------------|
| Power  | 802.3at PoE+ or 12 V/2A  |

---

## Technical specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless transmission** | |
| Technology | LoRaWAN®, Ethernet, 4G LTE, Wi-Fi HaLow |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx power | 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class C |
| **Detection** | |
| Technology | ToF (Time-of-Flight) with AI |
| Detection range | 0.5–3.5m (standard); 2–6.5m (high-ceiling) |
| Installation height | ≤3.5m (standard); ≤6.5m (high-ceiling) |
| Field of view | 98° H × 80° V (standard); 60° H × 45° V (high-ceiling) |
| Distance accuracy | ±3.5 cm (standard); ±6.5 cm (high-ceiling) |
| Accuracy | 99.8 % |
| ToF light beam | 940nm (invisible infrared) |
| **Features** | |
| Counting zones | Up to 4 custom zones |
| Analytics | Bi-directional counting, dwell time, heat maps, group counting |
| Advanced features | Staff exclusion, shopping cart detection, adult/child differentiation |
| Local storage | Up to 1 million data records |
| Multi-device stitching | Up to 8 units |
| **Physical characteristics** | |
| Power supply | 802.3at PoE+ or 12 V/2A DC |
| Power consumption | Avg. 7–10 W, max 15–24 W |
| Operating temp | -20 °C ~ +50 °C |
| Humidity | 0 %–95 % RH (non-condensing) |
| Ingress protection | IP65 |
| Dimensions | 200 × 35 × 85 mm |
| Weight | 419 g (PoE version) |
| Material | ABS+PC |
| **Approvals** | CE, FCC, ISED, RoHS, GDPR certified |
