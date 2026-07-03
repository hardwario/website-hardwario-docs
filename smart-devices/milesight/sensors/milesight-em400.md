---
slug: milesight-em400
title: EM400
---

import Image from '@theme/IdealImage';

# Milesight Sensor EM400-MUD

Milesight EM400-MUD is a **multifunctional ultrasonic distance sensor** designed for **smart parking**, **waste management**, and **level monitoring**. It features **60° beam angle** with **detection range of 3–450 cm** and **high accuracy** of ± (1+0.3%×S) cm. The sensor offers **three operational modes** (Standard, Bin, and Parking Lot), **IP67-rated enclosure**, **ultra-long battery life up to 10 years**, and supports **LoRaWAN**, **NB-IoT**, and **Cat M** connectivity.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/em400-mud.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::info EM400 Series
The EM400 series includes multiple variants: **EM400-TLD** (ToF Laser), **EM400-UDL** (Ultrasonic), and **EM400-MUD** (Multifunctional Ultrasonic). This documentation focuses on the EM400-MUD model.
:::

## Integration Links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | Not yet available                                                     |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/em400-mud       |
| User Guide      | https://resource.milesight.com/milesight/iot/document/em400-mud-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/em400-mud-datasheet-en.pdf |

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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em400-mud/em400-mud-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em400-mud/em400-mud-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/em-series/em400-mud/em400-mud-codec.json) |

:::info
### Terminology Overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value                              |
|--------|------------------------------------|
| Power  | 2× ER26500 Li-SOCL2 (18000 mAh)   |

---

## Technical Specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless Transmission** | |
| Technology | LoRaWAN®, NB-IoT, Cat M |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 16 dBm (868MHz) / 20 dBm (915MHz) / 19 dBm (470MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class A |
| **Distance Measurement** | |
| Technology | Ultrasonic |
| Detection Range | 3–450 cm |
| Accuracy | ± (1+0.3%×S) cm where S = distance (-15–60°C) |
| Resolution | 1 mm |
| Beam Angle | 60° |
| **Additional Sensors** | |
| Temperature | -40°C ~ +125°C, Resolution 0.1°C (NTC thermistor) |
| Accelerometer | 3-axis (tilt detection) |
| **Features** | |
| Modes | Standard Mode, Bin Mode, Parking Lot Mode (LoRaWAN only) |
| Advanced Features | Level monitoring, parking detection, waste management |
| Configuration | NFC / Downlink |
| **Physical Characteristics** | |
| Power Supply | 2 × ER26500 (9000 mAh each) |
| Battery Life | >10 years (Standard/Bin mode); 5 years (Parking mode, 12 daily triggers) |
| Operating Temp | -30°C ~ +70°C |
| Humidity | 0%–95% RH (non-condensing) |
| Ingress Protection | IP67 |
| Dimensions | 118 × 65 × 32.5 mm |
| Weight | 181.4 g (with batteries) |
| Material | ABS+PC (UL94 V0), Black-gray |
| **Approvals** | CE, FCC, RoHS |
