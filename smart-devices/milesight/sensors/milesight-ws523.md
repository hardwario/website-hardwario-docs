---
slug: milesight-ws523
title: WS523
---

import Image from '@theme/IdealImage';

# Milesight Sensor WS523

Milesight WS523 is a **smart portable socket** with **LoRaWAN connectivity** designed for **remote control and power consumption monitoring**. It enables **scheduled on/off control** of electronic devices, tracks **power consumption** (voltage, current, active power, power factor), and features **overcurrent/overload protection**. With **±3% measurement accuracy**, **NFC configuration**, and support for multiple socket types (US, EU, AU, UK, CN), it's ideal for energy management, smart homes, and building automation applications.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/ws523.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Integration Links
| Resource        | Link                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ws523                        |
| Official page   | https://www.milesight.com/iot/product/lorawan-sensor/ws523           |
| User Guide      | https://resource.milesight.com/milesight/iot/document/ws52x-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/ws52x-datasheet-en.pdf |

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
| Decoder | [View decoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws523/ws523-decoder.js) |
| Encoder | [View encoder](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws523/ws523-encoder.js) |
| Codec | [View codec](https://github.com/Milesight-IoT/SensorDecoders/blob/main/ws-series/ws523/ws523-codec.json) |

:::info
### Terminology Overview
**Decoder** -> Converts the device's binary payload into readable JSON.<br />
**Encoder** -> Converts JSON commands into binary payload for downlinks.<br />
**Codec** -> Defines the rules for decoding and encoding (structure, fields, ports) used by network servers.
:::


---

## Power supply
| Type   | Value                      |
|--------|----------------------------|
| Power  | 100-250 VAC, 50-60 Hz      |

---

## Technical Specifications

| **Parameter** | **Value** |
|---------------|-----------|
| **Wireless Transmission** | |
| Technology | LoRaWAN® |
| Antenna | Internal |
| Frequency | CN470 / IN865 / RU864 / EU868 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 16 dBm (868MHz) / 22 dBm (915MHz) / 19 dBm (470MHz) |
| Sensitivity | -137 dBm @300bps |
| Mode | OTAA / ABP Class C |
| **Power Monitoring** | |
| Voltage Measurement | VAC |
| Current Measurement | mA |
| Active Power | W |
| Power Factor | % |
| Power Consumption | kWh |
| Measurement Accuracy | Typical ±3%, Maximum ±5% |
| **Load Capacity** | |
| Socket Types | US-15A / EU-16A / AU-10A / UK-13A / CN versions |
| Operating Voltage | 100-250 VAC, 50-60 Hz |
| Max Load | 10A-16A (depending on version) |
| **Features** | |
| Remote Control | On/off switching via app/downlink |
| Scheduling | Time-based automated switching |
| Protection | Overcurrent/overload protection |
| Configuration | NFC / Downlink |
| **Physical Characteristics** | |
| Power Supply | 100-250 VAC mains power |
| Operating Temp | -20°C ~ +60°C |
| Ingress Protection | IP20 |
| Dimensions | 110 × 62.3 × 34.6 mm |
| Weight | 117.5 g |
| Material | Polycarbonate (UL94 V0) |
| Installation | Plug-in portable socket |
| **Approvals** | CE, FCC, RCM, SAA, UKCA, RoHS |
