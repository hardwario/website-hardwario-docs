---
slug: milesight-ws303
title: WS303
---

import Image from '@theme/IdealImage';

# Milesight Sensor WS303

Milesight WS303 is a **smart water leak detector** with **two stainless steel probes** that detect water as low as 0.5 mm. It features a **built-in buzzer** for local alerts, sends notifications through **LoRaWAN**, and offers up to **5 years of battery life**. Its **compact IP67 design** allows installation even in hard-to-reach places.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/ws303-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Integration Links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ws303                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/ws303           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/ws303-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/ws303-datasheet-en.pdf |

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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws303/ws303-codec.json) |

:::info
### Terminology Overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value          |
|--------|----------------|
| Power  | CR2450 battery |

---

## Technical Specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless Transmission** | |
| Technology | LoRaWAN®, Milesight D2D |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 16 dBm (868MHz) / 20 dBm (915MHz) / 19 dBm (470MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class A |
| **Leakage Detection** | |
| Liquid Type | Conductive liquid |
| Trigger Condition | ≥ 0.5 mm liquid level |
| **Others** | |
| Buzzer | Yes |
| Configuration | NFC App / Downlink |
| Advanced Features | D2D Controller, Water Leakage Alarm |
| **Physical Characteristics** | |
| Power Supply | 1 × CR2450 (590 mAh) |
| Battery Life | ~5.7 years (typical use, 25°C) |
| Operating Temp | -10°C ~ +60°C |
| Humidity | 0%–100% RH (non-condensing) |
| Ingress Protection | IP67 |
| Dimensions | 63 × 63 × 14 mm |
| Weight | 36.4 g (incl. battery) |
| Material | ABS+PC, White |
| Installation | 3M Tape / Desktop |
| **Approvals** | CE, FCC, RoHS |

