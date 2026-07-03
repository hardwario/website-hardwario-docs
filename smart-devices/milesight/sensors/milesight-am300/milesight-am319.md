---
slug: milesight-am319
title: AM319
---

import Image from '@theme/IdealImage';

# Milesight Sensor AM319

Milesight AM319 is an **indoor air quality sensor** that measures **nine parameters** including temperature, humidity, CO₂, and particulate matter. It displays results on a **4.2" E-Ink screen** with clear indicators and transmits data via **LoRaWAN technology** for long-range, low-power communication.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/am319-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::info
[**AM307**](milesight-am307.md) – monitors basic indoor air quality.<br />
[**AM308**](milesight-am308.md) – same as AM307 plus particle measurement (PM2.5/PM10).<br />
[**AM319**](milesight-am319.md) – the most advanced version with additional HCHO or O₃ measurement; must be powered by USB (no batteries).
:::

## Integration Links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-am319                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/am319           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/am300-series-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/am319-datasheet-en.pdf |

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
| Work mode        | Class C                  |
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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am319-hcho/am319-hcho-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am319-hcho/am319-hcho-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/am-series/am319-hcho/am319-hcho-codec.json) |

:::info
### Terminology Overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value              |
|--------|--------------------|
| Power  | USB-C or battery   |

---

## Technical Specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless Transmission** | |
| Technology | LoRaWAN® |
| Antenna | Internal Antennas |
| Frequency | CN470 / RU864 / IN865 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class C |
| **Sensors** | |
| Temperature | -20°C ~ 60°C, Accuracy ±0.2~0.3°C, Resolution 0.1°C |
| Humidity | 0% ~ 100% RH, Accuracy ±2% RH, Resolution 0.5% |
| Motion (PIR) | 80° H, 55° V, max 5m |
| Light | 0–60000 Lux (6 levels) |
| TVOC | IAQ rating 1–5 or 0–2000 μg/m³ |
| Barometric Pressure | 260–1260 hPa, Accuracy ±0.5 hPa |
| CO₂ | 400–2000 ppm, Accuracy ±(50 ppm + 5%) |
| PM2.5 & PM10 | 0–1000 μg/m³, ±10 μg/m³ (0–100) |
| Formaldehyde (HCHO) | 0–1.25 mg/m³, Accuracy ±10% |
| Ozone (O₃) | 0–10 ppm, Accuracy ±5% FS |
| **Interfaces & Display** | |
| Display | 4.2" E-Ink |
| Buttons | Power + Reset |
| LED & Buzzer | Status LED + Alarm buzzer |
| USB | Type-C (power/config/console) |
| **Software** | NFC / USB configuration, thresholds, calibration, data storage (18k entries) |
| **Physical Characteristics** | |
| Power Supply | 5V/1A (USB-C) |
| Operating Temp | -20°C ~ +60°C (E-Ink: 0°C–40°C) |
| Housing | ABS, White |
| Dimensions | 100.8 × 114 × 22 mm |
| Weight | 148 g |
| Installation | Wall mount (3M tape or screws) |
| **Approvals** | CE, FCC, ISED, RoHS |
