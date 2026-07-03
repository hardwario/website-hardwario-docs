---
slug: milesight-ws101
title: WS101
---

import Image from '@theme/IdealImage';

# Milesight Sensor WS101

Milesight WS101 is a **compact, battery-powered LoRaWAN smart button** designed for **wireless control, triggering actions, and sending alarms**. It supports **multiple press actions** (short, long, and double press) with **response time less than 1 second**. The button features **ultra-low power consumption** with **battery life over 5 years**, **NFC configuration**, and **Milesight D2D communication** capability. With its **portable design** and **IP30 rating**, it's ideal for smart homes, offices, hotels, schools, and emergency panic button applications.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/ws101.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Integration Links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ws101                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/ws101           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/ws101-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/ws101-datasheet-en.pdf |

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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws101/ws101-codec.json) |

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
| Power  | ER14335 Li-SOCL2 (1650 mAh) |

---

## Technical Specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless Transmission** | |
| Technology | LoRaWAN®, Milesight D2D |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class A |
| **Button Functions** | |
| Button Types | 1× External Button, 1× Power/Reset Button (internal) |
| Press Actions | Short press, long press, double press |
| Response Time | Less than 1 second |
| User Defined Actions | All press actions can be customized |
| **Indicators** | |
| LED | 1× LED indicator |
| Buzzer | Yes |
| **Features** | |
| Configuration | NFC / Downlink |
| D2D Communication | Direct device-to-device without gateway |
| Advanced Features | Panic button, scene control, automation triggers |
| **Physical Characteristics** | |
| Power Supply | 1 × ER14335 (1650 mAh) |
| Battery Life | Over 5 years (10 presses per day) |
| Operating Temp | -20°C ~ +60°C |
| Humidity | ≤90% RH (non-condensing) |
| Ingress Protection | IP30 |
| Dimensions | 50 × 50 × 18 mm |
| Weight | 38.8 g (with battery) |
| Material | ABS+PC |
| Installation | Wall mount or portable |
| **Approvals** | CE, FCC, RoHS |
