---
slug: cm4
title: "Compute Module 4"
description: Raspberry Pi Compute Module 4 — kompaktní system-on-module pro IoT brány, edge computing a vývoj embedded produktů.
---

# Raspberry Pi Compute Module 4 {#raspberry-pi-compute-module-4}

![Raspberry Pi Compute Module 4](/img/smart-devices/raspberry-pi-cm4.webp)

**Compute Module 4 (CM4)** je kompaktní system-on-module průmyslové kvality od [Raspberry Pi](https://www.raspberrypi.com/). Na rozdíl od standardních desek Raspberry Pi je CM4 určen pro integraci do vlastních nosných desek a embedded produktů.

## Klíčové parametry {#key-specifications}

| Parametr | Hodnota |
|---|---|
| SoC | Broadcom BCM2711, quad-core Cortex-A72 @ 1.5 GHz |
| RAM | 1 / 2 / 4 / 8 GB LPDDR4-3200 SDRAM |
| Flash | 0 / 8 / 16 / 32 GB eMMC (nebo bez eMMC pro SD kartu) |
| Bezdrátové rozhraní | 802.11b/g/n/ac Wi-Fi, Bluetooth 5.0 (u bezdrátových variant) |
| Rozhraní | PCIe Gen 2 × 1, USB 2.0, HDMI 2.0 × 2, CSI, DSI, 28× GPIO |
| Rozměry | 55 × 31 mm, dva 100pinové vysokohustotní konektory |
| Provozní teplota | 0 °C až 85 °C |

### CM4108016 {#cm4108016}

Varianta prodávaná v HARDWARIO Store je **CM4108016** — 8 GB RAM, 16 GB eMMC, s Wi-Fi a Bluetooth.

## Integrace s HARDWARIO {#hardwario-integration}

Modul CM4 se v ekosystémech HARDWARIO používá pro:

- **NFC platforma TAPPER**: Zařízení [TAPPER](/tapper/) používá jako výpočetní jádro Raspberry Pi Zero 2 W pro čtení NFC tagů a komunikaci přes MQTT.
- **Hostování softwaru brány**: Provoz HARDWARIO Cloud Connector, Node-RED nebo vlastních integrací na nenáročném výpočetním modulu.
- **Lokální HMI/dashboard**: Hostování lokálního monitorovacího rozhraní pro senzorové sítě HARDWARIO.
- **LoRaWAN server**: Provoz ChirpStack nebo The Things Stack společně se zařízeními CHESTER či EMBER.

## Zdroje {#resources}

- [Produktová stránka Raspberry Pi CM4](https://www.raspberrypi.com/products/compute-module-4/)
- [Raspberry Pi v HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [Dokumentace TAPPER](/tapper/)
