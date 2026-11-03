---
slug: catalog-applications
title: Catalog Applications
description: "Catalog applications are ready-made CHESTER firmware for common use cases: what each one does, which hardware it needs and how its data looks."
---
import Image from '@theme/IdealImage';

# Catalog Applications

This article provides information on the so-called **catalog application** for the **CHESTER** platform.

**CHESTER** is an extensible low-power IoT gateway with an open SDK built on top of the **Zephyr** operating system. For immediate deployment, **HARDWARIO** provides several applications for particular use cases. Those **catalog applications** are available from **HARDWARIO** with a short lead time. The applications have source codes available as part of the **CHESTER SDK** and are actively improved, maintained, and supported.

The **catalog applications** also serve as a great starting point for your own firmware application.

## Application List

For details on how each catalog application works, click on the application name in the table below.

Common features are described in the special [**Common Functionality**](../firmware/common-functionality.md) article.

Firmware downloads, configuration parameters and data formats are in the [**Firmware**](../firmware/index.md) section.



| Application | Application Goal | LoRaWAN | BLE Tags | Backup Module (Z1) | 1-Wire (DS18B20) | External Power Supply |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| [**CHESTER Clime**](chester-clime/index.md) | Temperature, humidity, IAQ sensing | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> |
| [**CHESTER Control**](chester-control/index.md) | 4ch input/output control | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> |
| [**CHESTER Current**](chester-current/index.md) | AC/DC current sensing (4ch) | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> |
| [**CHESTER Meteo**](chester-meteo/index.md) | Wind, pressure, weather sensing | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> |
| [**CHESTER Motion**](chester-motion/index.md) | Dual PIR motion detection | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> |
| [**CHESTER Push**](chester-push/index.md) | Push button alerting | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> |
| [**CHESTER Range**](chester-range/index.md) | Ultrasonic distance measurement | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> |
| [**CHESTER Scale**](chester-scale/index.md) | Weight scale monitoring | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> |
| [**CHESTER Serial**](chester-serial/index.md) | RS-232/RS-485 Modbus gateway | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> |
| [**CHESTER wM-Bus**](chester-wm-bus/index.md) | Wireless M-Bus gateway | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Not supported" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Supported" /> |



:::info

- **CHESTER Clime IAQ** variant uses CHESTER-X10 for external power input (6–28 V)
- **CHESTER Control** uses CHESTER-X4 module for step-down power supply and digital outputs
- **CHESTER Push** uses CHESTER-Z1-F which combines backup battery with power supply; can also run from battery only
- **CHESTER wM-Bus** is available in battery variant (6× D cell) or DC variant with an external 230 V adapter
- **CHESTER Serial** uses CHESTER-X12 (RS-232) or CHESTER-X2 (RS-485) with external power input (5–28 V)

:::
