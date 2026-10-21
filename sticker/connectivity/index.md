---
slug: /connectivity
title: Connectivity Overview
description: "HARDWARIO STICKER supports multiple wireless communication protocols, allowing you to select the optimal radio architecture for your deployment requirements."
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
| **Network Server (LNS)** | Required (ChirpStack, TTS, etc.) | None. A ProXimos Hub runs the network instead |
| **Topology** | Star-of-stars (Node → Gateway → LNS) | Star (Node → HARDWARIO FIBER modem → ProXimos Hub) |
| **Radio protocol** | LoRaWAN 1.0.4 MAC, Class A | HARDWARIO TOWER radio protocol (AES-CCM frames, gateway ACKs) |
| **Downlinks & management** | Class A downlinks on fPort 85 | Announced in the gateway ACK, same commands as on fPort 85 |
| **Best Used For** | Cloud platforms, multi-tenant enterprise IoT | Isolated sites without LoRaWAN coverage, private on-premise networks with a ProXimos Hub |

---

## Available Protocols

### LoRaWAN Integration
Standard LoRaWAN Class A operation with OTAA/ABP activation, encrypted telemetry, and remote management over fPort 85. Regions EU868, US915, AU915 and AS923 (AS923-1). The data rate is either managed by ADR or, with ADR off, fixed with `lrw-datarate` (`dr0` to `dr7`). Answers that do not fit one frame are split into pages that the device sends by itself, and `get_radio_state` reports the link state and radio diagnostics.

- **[ChirpStack v4 Integration](./lorawan-chirpstack.md)**: Setup guide for self-hosted ChirpStack LNS deployments.
- **[The Things Stack Integration](./lorawan-tts.md)**: Setup guide for TTS Cloud and Community Edition.
- **[Downlink Commands](./downlink-commands.md)**: Reference guide for remote parameter configuration over fPort 85.

### LoRa P2P (Peer-to-Peer)
Second radio mode, available since firmware v2.0.0, for sites without a LoRaWAN network. STICKER pairs with a ProXimos Hub through a HARDWARIO FIBER modem and talks the HARDWARIO TOWER radio protocol, with gateway acknowledgements, downlinks, network time and link supervision. Telemetry, alarms, commands and history work as over LoRaWAN.

- **[LoRa P2P Guide](./lora-p2p.md)**: Architecture, radio parameters, and configuration.