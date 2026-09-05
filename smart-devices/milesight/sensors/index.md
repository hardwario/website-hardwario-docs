---
slug: index
title: Milesight - Sensors
description: "Milesight LoRaWAN sensors tested by HARDWARIO, with reference resources for each device."
---

import Image from '@theme/IdealImage';

Here is a list of tested **Milesight sensors** by HARDWARIO with reference resources:

| Name                                | Type                          | Overview                               | Product page                                                 | Purchase link                                             |
|-------------------------------------|-------------------------------|------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| [**Milesight AM319**](/smart-devices/milesight/sensors/milesight-am300/milesight-am319) | Ambience sensor              | [Details](/smart-devices/milesight/sensors/milesight-am300/milesight-am319)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/am319) | [Buy here](https://www.hardwario.store/p/milesight-am319)             |
| [**Milesight EM400-MUD**](/smart-devices/milesight/sensors/milesight-em400) | Ultrasonic distance sensor   | [Details](/smart-devices/milesight/sensors/milesight-em400)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/em400-mud) | *Not available yet*                                                    |
| [**Milesight EM500-CO2**](/smart-devices/milesight/sensors/milesight-em500) | CO₂ sensor                   | [Details](/smart-devices/milesight/sensors/milesight-em500)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/em500-co2) | *Not available yet*                                                    |
| [**Milesight GS601**](/smart-devices/milesight/sensors/milesight-gs601) | Vape & smoke detector        | [Details](/smart-devices/milesight/sensors/milesight-gs601)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/gs601) | [Buy here](https://www.hardwario.store/p/milesight-gs601)             |
| [**Milesight VS135**](/smart-devices/milesight/sensors/milesight-vs135) | People counting sensor       | [Details](/smart-devices/milesight/sensors/milesight-vs135)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/vs135) | [Buy here](https://www.hardwario.store/p/milesight-vs135)             |
| [**Milesight VS373**](/smart-devices/milesight/sensors/milesight-vs373) | Fall detection sensor        | [Details](/smart-devices/milesight/sensors/milesight-vs373)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/vs373) | [Buy here](https://www.hardwario.store/p/milesight-vs373)             |
| [**Milesight WS101**](/smart-devices/milesight/sensors/milesight-ws101) | Smart button                 | [Details](/smart-devices/milesight/sensors/milesight-ws101)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/ws101) | [Buy here](https://www.hardwario.store/p/milesight-ws101)             |
| [**Milesight WS201**](/smart-devices/milesight/sensors/milesight-ws201) | Fill level monitoring sensor | [Details](/smart-devices/milesight/sensors/milesight-ws201)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/ws201) | *Not available yet*                                                    |
| [**Milesight WS303**](/smart-devices/milesight/sensors/milesight-ws303) | Leak detection sensor        | [Details](/smart-devices/milesight/sensors/milesight-ws303)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/ws303) | [Buy here](https://www.hardwario.store/p/milesight-ws303)             |
| [**Milesight WS523**](/smart-devices/milesight/sensors/milesight-ws523) | Smart portable socket        | [Details](/smart-devices/milesight/sensors/milesight-ws523)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/ws523) | [Buy here](https://www.hardwario.store/p/milesight-ws523)             |
| [**Milesight WT101**](/smart-devices/milesight/sensors/milesight-wt101) | Radiator thermostat          | [Details](/smart-devices/milesight/sensors/milesight-wt101)       | [Official site](https://www.milesight.com/iot/product/lorawan-sensor/wt101) | [Buy here](https://www.hardwario.store/p/milesight-wt101)             |

---

## General configuration

**Overview**  
For sensor configuration, use the **Milesight ToolBox** mobile application, available on both:  
- Apple App Store: https://apps.apple.com/us/app/milesight-toolbox/id1518748039  
- Google Play Store: https://play.google.com/store/apps/details?id=com.ursalinknfc&hl=en&pli=1  

#### QR code – Milesight ToolBox
<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '250px', height: '250px' }}>
        <Image img={require('./images/milesight-toolbox.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

**Installation and configuration**  
- Configuration is done via **NFC**.  
- After reading the device, go to the *Basic Information* tab to update the **Device Time**.  
- Setting the correct **date and time** is required for all devices.  

**LoRaWAN connection**  
- Devices are preconfigured with an **AppKey for OTAA** (default values are listed in the user manual).  
- The **gateway must be set to Public**. If the gateway is configured as Private, devices will not be able to join the network.  

:::info
We also provide a **complete video tutorial** for a better overview of device configuration using the **Milesight ToolBox** application:

https://docs.hardwario.com/smart-devices/milesight/videos-milesight/general-configuration
:::


---

## LoRaWAN Network Options

To operate your LoRaWAN device, you can choose between two supported network server platforms. Both solutions allow you to manage gateways, register end devices, configure profiles, and process payload data.

### Option 1: The Things Stack

A cloud-based LoRaWAN Network Server suitable for both small and large deployments.

➡️ **Configuration guide: https://docs.hardwario.com//apps/the-things-stack/index#configure-the-things-stack**  



### Option 2: ChirpStack v4

An open-source LoRaWAN Network Server ideal for on-premise or private network installations.

➡️ **Getting started guide: https://docs.hardwario.com//apps/chirpstack/index#getting-started-with-chirpstack-v4**  

