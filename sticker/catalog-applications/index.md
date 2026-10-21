---
slug: catalog-applications
title: STICKER Variants
description: "HARDWARIO STICKER is available in three ready-to-use functional variants: STICKER Clime, STICKER Input, and STICKER Motion."
---
import Image from '@theme/IdealImage';

# STICKER Variants

HARDWARIO STICKER is available in three ready-to-use functional variants: **STICKER Clime**, **STICKER Input**, and **STICKER Motion**. All variants share the common STM32WL platform, multi-year battery operation powered by 2× AA cells, encrypted NFC configuration, and full remote management over LoRaWAN (fPort 85) or LoRa P2P.

---

## Variant Comparison

| Variant | Primary Purpose | Integrated Sensors / Inputs | External Expansion | Key Use Cases |
|---|---|---|---|---|
| [**STICKER Clime**](/sticker/catalog-applications/sticker-clime/) | Environmental monitoring | Temperature, Relative Humidity, Ambient Light, Barometric Pressure | — | Indoor climate tracking, cold supply chain, greenhouses, cleanrooms |
| [**STICKER Input**](/sticker/catalog-applications/sticker-input/) | Industrial & probe interface | Temperature, Relative Humidity, 2× external inputs (each digital, 0–24 V analog or S0 pulse counter) | 1-Wire bus (Dallas, Machine Probe), S0 pulse counters | Energy meter reading, machine status, industrial PLC monitoring |
| [**STICKER Motion**](/sticker/catalog-applications/sticker-motion/) | Presence & motion tracking | PIR motion detector, 3-axis Accelerometer, Dual Hall-effect switches | — | Building security, space occupancy, door monitoring, asset movement |

---

## Overview of Variants

### STICKER Clime

**STICKER Clime** is designed for precise microclimate monitoring in buildings, warehouses, and industrial facilities.

* **Integrated Sensors:** Sensirion SHT40 sensor (**±0.2 °C** temperature, **±2%** humidity), OPT3001 ambient light sensor, and MPL3115A2 barometric pressure sensor.
* **Key Benefit:** Complete overview of environmental quality and ambient conditions without needing external sensor cables.
* **v2.0 Enhancements:** Temperature, humidity, pressure, illuminance and the barometer's own temperature can all be used in alarm rules and recorded in the history. The onboard temperature/humidity sensor can be switched off with `cap-sht`. On threshold rules, `dwell` is now a hysteresis band in the channel's units (for example °C), not a time in seconds.

→ [**More about STICKER Clime**](/sticker/catalog-applications/sticker-clime/)

---

### STICKER Input

**STICKER Input** connects external industrial sensors, reads pulse counters, and measures digital or analog signals.

* **Inputs & Interfaces:** Terminal block for 2 external inputs, each configurable as a digital input, a 0–24 V analog input or a pulse counter (for example the S0 output of an electricity, gas or water meter), and a 1-Wire bus.
* **Supported Probes:** Up to four 1-Wire sensors in slots 1–4: Dallas DS18B20 thermometers and HARDWARIO Machine Probe industrial sensors.
* **Key Benefit:** Universal converter for integrating existing industrial infrastructure and utility meters into LoRaWAN networks.
* **v2.0 Enhancements:** 0–24 V analog measurement and S0 pulse counting on the external inputs, an expected sensor type per 1-Wire slot with a `sensor_mismatch` alarm, and detection of a probe plugged in after power-up into a slot that waits for it.

→ [**More about STICKER Input**](/sticker/catalog-applications/sticker-input/)

---

### STICKER Motion

**STICKER Motion** combines a passive infrared motion sensor, accelerometer, and magnetic door switches for complete facility and asset tracking.

* **Integrated Sensors:** PYD1698 PIR sensor (detection range 5 m, viewing angle **≥ 50°**), LIS2DH12 3-axis accelerometer (tilt, vibration, free-fall detection), and dual A1266 Hall-effect switches for door/window opening detection.
* **Key Benefit:** Instant detection of human presence and physical tampering with minimal power consumption.
* **v2.0 Enhancements:** Alarm rules for the PIR and the accelerometer can track a whole episode of motion (one alarm for *motion started* and *motion ended*) or report *stillness*, for example a machine that must report when it stops vibrating.

→ [**More about STICKER Motion**](/sticker/catalog-applications/sticker-motion/)