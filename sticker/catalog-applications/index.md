---
slug: catalog-applications
title: STICKER Variants
---
import Image from '@theme/IdealImage';

# STICKER Variants

HARDWARIO STICKER is available in three ready-to-use functional variants: **STICKER Clime**, **STICKER Input**, and **STICKER Motion**. All variants share the common STM32WL platform, multi-year battery operation powered by 2× AA cells, encrypted NFC configuration, and full remote management over LoRaWAN (fPort 85).

---

## Variant Comparison

| Variant | Primary Purpose | Integrated Sensors / Inputs | External Expansion | Key Use Cases |
|---|---|---|---|---|
| [**STICKER Clime**](/sticker/catalog-applications/sticker-clime/) | Environmental monitoring | Temperature, Relative Humidity, Ambient Light, Barometric Pressure | — | Indoor climate tracking, cold supply chain, greenhouses, cleanrooms |
| [**STICKER Input**](/sticker/catalog-applications/sticker-input/) | Industrial & probe interface | Temperature, Relative Humidity, 2× Digital/Voltage Inputs (0–30 V) | 1-Wire bus (Dallas, Machine Probe), S0 pulse counters | Energy meter reading, machine status, industrial PLC monitoring |
| [**STICKER Motion**](/sticker/catalog-applications/sticker-motion/) | Presence & motion tracking | PIR motion detector, 3-axis Accelerometer, Dual Hall-effect switches | — | Building security, space occupancy, door monitoring, asset movement |

---

## Overview of Variants

### STICKER Clime

**STICKER Clime** is designed for precise microclimate monitoring in buildings, warehouses, and industrial facilities.

* **Integrated Sensors:** Sensirion SHT43 sensor (**±0.2 °C** temperature, **±2%** humidity), OPT3001 ambient light sensor, and MPL3115A2 barometric pressure sensor.
* **Key Benefit:** Complete overview of environmental quality and ambient conditions without needing external sensor cables.
* **v1.4.0 Enhancements:** On-flash history log storage (Store-and-Forward) during network outages and configurable threshold alarms for immediate reporting on fPort 3.

→ [**More about STICKER Clime**](/sticker/catalog-applications/sticker-clime/)

---

### STICKER Input

**STICKER Input** connects external industrial sensors, reads pulse counters, and measures digital or analog signals.

* **Inputs & Interfaces:** Terminal block for 2 digital/voltage inputs (up to 30 V DC), S0 interface support for reading electricity, gas, or water meters, and a 1-Wire bus.
* **Supported Probes:** Automatic discovery of 1-Wire sensors (Dallas DS18B20) and HARDWARIO Machine Probe industrial sensors.
* **Key Benefit:** Universal converter for integrating existing industrial infrastructure and utility meters into LoRaWAN networks.

→ [**More about STICKER Input**](/sticker/catalog-applications/sticker-input/)

---

### STICKER Motion

**STICKER Motion** combines a passive infrared motion sensor, accelerometer, and magnetic door switches for complete facility and asset tracking.

* **Integrated Sensors:** PYD1698 PIR sensor (detection range 5 m, viewing angle **≥ 50°**), LIS2DH12 3-axis accelerometer (tilt, vibration, free-fall detection), and dual A1266 Hall-effect switches for door/window opening detection.
* **Key Benefit:** Instant detection of human presence and physical tampering with minimal power consumption.
* **v1.4.0 Enhancements:** Configurable `dwell` parameter in alarm rules to suppress false triggers caused by input bounce or contact wear.

→ [**More about STICKER Motion**](/sticker/catalog-applications/sticker-motion/)