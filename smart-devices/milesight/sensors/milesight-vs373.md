---
slug: milesight-vs373
title: VS373
description: "Milesight VS373 60 GHz mmWave radar fall detection sensor for elderly care: LoRaWAN Class C join keys, payload decoder links and technical specifications."
---

import Image from '@theme/IdealImage';

# Milesight sensor VS373

Milesight VS373 is a **non-contact fall detection sensor** designed for **elderly care and healthcare facilities**. It employs advanced **4D 60-GHz millimeter-wave radar technology** combined with **AI algorithms** to detect falls and abnormal movements with **up to 99 % accuracy**. The sensor provides **24/7 monitoring** in dark and humid environments, offers **complete privacy protection** without image capture, and features **IP65 waterproof rating**. It supports multiple detection functions including bed presence, room occupancy, motionless detection, and breathing monitoring.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ maxWidth: '500px' }}>
        <Image img={require('./images/vs373.webp')} alt="Milesight Sensor VS373" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Integration links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-vs373                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/vs373           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/vs373-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/vs373-datasheet-en.pdf |

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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/vs-series/vs373/vs373-codec.json) |

:::info
### Terminology overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value                      |
|--------|----------------------------|
| Power  | DC 5 V/3A via USB Type-C    |

---

## Technical specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless transmission** | |
| Technology | LoRaWAN®, Milesight D2D, Wi-Fi 2.4 GHz |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx power | 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class C |
| **Radar detection** | |
| Technology | 4D 60-GHz mmWave Radar |
| Transceiver | 24 transmitters, 22 receivers |
| Field of view | 70° H × 140° V |
| Detection range | 2m×2m to 4m×5m (within 2.3-3m height) |
| Fall detection accuracy | Up to 99 % |
| **Detection functions** | |
| Primary features | Fall detection, bed presence, room occupancy |
| Advanced features | Motionless detection, breathing detection, bed exit alerts |
| **Interfaces** | |
| Digital output | 1× (60 V/1A) |
| Buttons | 1× Reset, 1× Multi-function |
| Indicators | Multi-color LED, Buzzer |
| Configuration | NFC / Downlink |
| **Physical characteristics** | |
| Power supply | DC 5 V/3A (USB Type-C) |
| Power consumption | Max 9.5 W |
| Operating temp | 0 °C ~ +50 °C |
| Humidity | 0 %–95 % RH (non-condensing) |
| Ingress protection | IP65 |
| Dimensions | 114 × 84 × 15 mm |
| Weight | 214.5 g |
| Material | ABS+PC |
| Installation | Wall or ceiling mount |
| **Approvals** | CE, FCC |
