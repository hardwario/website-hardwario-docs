---
slug: routerboard-lora
title: "RouterBOARD LoRa"
description: MikroTik RouterBOARD-based LoRaWAN gateway with integrated LoRa concentrator and RouterOS.
---

# MikroTik RouterBOARD LoRa

![MikroTik RouterBOARD LoRa](/img/smart-devices/mikrotik-routerboard-lora.webp)

The **MikroTik RouterBOARD LoRa** is a compact LoRaWAN gateway combining MikroTik's RouterOS networking platform with an integrated LoRa concentrator card. It supports 8-channel LoRaWAN reception and standard Semtech packet forwarder software.

## Key Specifications

| Parameter | Value |
|---|---|
| LoRa Channels | 8-channel (SX1301 or SX1302 concentrator) |
| Frequency Bands | EU868, US915 (model-dependent) |
| Network Software | RouterOS (MikroTik), Semtech UDP Packet Forwarder |
| LAN Interface | 1× Gigabit Ethernet |
| Power | PoE (802.3af) or DC |
| Mounting | Compact desktop/DIN-rail |
| Protocols | UDP Packet Forwarder, Basics Station |

## HARDWARIO Integration

The RouterBOARD LoRa gateway connects CHESTER and STICKER devices to LoRaWAN Network Servers:

- **ChirpStack**: Configure the gateway to forward LoRaWAN packets to a self-hosted [ChirpStack](/apps/chirpstack/index) instance.
- **The Things Stack**: Register the gateway in [The Things Stack](/apps/the-things-stack/index) for cloud-managed LoRaWAN network server.
- **Private LoRaWAN network**: Deploy a localized LoRaWAN network for a single building or campus.

## Resources

- [MikroTik official website](https://mikrotik.com/)
- [MikroTik products in HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [ChirpStack integration](/apps/chirpstack/index)
- [The Things Stack integration](/apps/the-things-stack/index)
- [CHESTER documentation](/chester/)
