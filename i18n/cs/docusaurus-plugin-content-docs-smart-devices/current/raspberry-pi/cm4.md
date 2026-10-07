---
slug: cm4
title: "Compute Module 4"
description: Raspberry Pi Compute Module 4 je kompaktní modul SoM pro brány IoT, edge computing a vývoj vestavěných produktů.
---

# Raspberry Pi Compute Module 4 {#raspberry-pi-compute-module-4}

![Raspberry Pi Compute Module 4](/img/smart-devices/raspberry-pi-cm4.webp)

**Compute Module 4 (CM4)** je kompaktní modul SoM (system-on-module) průmyslové kvality od společnosti [Raspberry Pi](https://www.raspberrypi.com/). Na rozdíl od běžných desek Raspberry Pi je CM4 určený k osazení do vlastních nosných desek a vestavěných produktů.

## Klíčové parametry {#key-specifications}

| Parametr | Hodnota |
|---|---|
| SoC | Broadcom BCM2711, čtyřjádrový Cortex-A72 @ 1,5 GHz |
| RAM | 1 / 2 / 4 / 8 GB LPDDR4-3200 SDRAM |
| Flash | 0 / 8 / 16 / 32 GB eMMC (nebo bez eMMC, se SD kartou) |
| Bezdrátové rozhraní | 802.11b/g/n/ac Wi-Fi, Bluetooth 5.0 (u bezdrátových variant) |
| Rozhraní | PCIe Gen 2 × 1, USB 2.0, HDMI 2.0 × 2, CSI, DSI, 28× GPIO |
| Rozměry | 55 × 31 mm, dva 100pinové konektory s vysokou hustotou |
| Provozní teplota | 0 °C až 85 °C |

### CM4108016 {#cm4108016}

V e-shopu HARDWARIO Store se prodává varianta **CM4108016** s 8 GB RAM, 16 GB eMMC, Wi-Fi a Bluetooth.

## Integrace s HARDWARIO {#hardwario-integration}

Modul CM4 se v ekosystému HARDWARIO používá takto:

- **Platforma NFC TAPPER**: Zařízení [TAPPER](/tapper/) používá jako výpočetní jádro Raspberry Pi Zero 2 W, které čte tagy NFC a komunikuje přes MQTT.
- **Hostitel softwaru brány**: Na kompaktním výpočetním modulu běží HARDWARIO Cloud Connector, Node-RED nebo vlastní integrace.
- **Lokální HMI/dashboard**: Lokální rozhraní pro sledování senzorových sítí HARDWARIO.
- **Server LoRaWAN**: Běží na něm ChirpStack nebo The Things Stack vedle zařízení CHESTER či EMBER.

## Zdroje {#resources}

- [Produktová stránka Raspberry Pi CM4](https://www.raspberrypi.com/products/compute-module-4/)
- [Raspberry Pi v e-shopu HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [Dokumentace TAPPER](/tapper/)
