---
slug: /connectivity
title: Connectivity Overview
---
import Image from '@theme/IdealImage';

# Connectivity Overview

HARDWARIO STICKER supports multiple wireless communication protocols, allowing you to select the optimal radio architecture for your deployment requirements.

:::tip Provisioning & Radio Mode
Regardless of the chosen connectivity protocol, radio state and credentials can be configured wirelessly over NFC using [**HARDWARIO Manager**](../hardwario-manager.md).
:::

---

## Protocol Comparison

| Feature | LoRaWAN | LoRa P2P |
|---|---|---|
| **Network Server (LNS)** | Required (ChirpStack, TTS, etc.) | None (Direct node-to-node or gateway link) |
| **Topology** | Star-of-stars (Node → Gateway → LNS) | Point-to-Point / Point-to-Multipoint |
| **Range & Coverage** | Public / private gateway networks | Direct RF line-of-sight link |
| **Latency** | Standard (Class A scheduled uplinks) | Low (Custom transmission timing) |
| **Best Used For** | Cloud platforms, multi-tenant enterprise IoT | Isolated sites, direct FIBER gateway links, private edge networks |

---

## Available Protocols

### LoRaWAN Integration
Standard LoRaWAN Class A operation with OTAA/ABP activation, dynamic ADR, encrypted telemetry, and remote management over fPort 85.

- **[ChirpStack v4 Integration](./lorawan-chirpstack.md)**: Setup guide for self-hosted ChirpStack LNS deployments.
- **[The Things Stack Integration](./lorawan-tts.md)**: Setup guide for TTS Cloud and Community Edition.
- **[Downlink Commands](./downlink-commands.md)**: Reference guide for remote parameters configuration over fPort 85.

### LoRa P2P (Peer-to-Peer)
Software-selectable proprietary radio mode enabling direct, unmanaged radio packet transmission without an intermediate network server.

- **[LoRa P2P Guide](./lora-p2p.md)**: Architecture overview, RF framing parameters, and edge gateway integration.