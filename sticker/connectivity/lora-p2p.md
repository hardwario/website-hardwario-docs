---
slug: lora-p2p
title: LoRa P2P Mode
---
import Image from '@theme/IdealImage';

# LoRa P2P (Peer-to-Peer) Mode

:::info Upcoming Feature
LoRa P2P communication mode and direct edge gateway integrations (such as HARDWARIO FIBER) are introduced in upcoming platform firmware releases.
:::

**LoRa P2P (Peer-to-Peer)** allows STICKER devices to transmit proprietary, unmanaged radio frames directly to other nodes or edge receivers without connecting to a LoRaWAN Network Server (LNS).

---

## Key Advantages

- **Zero Network Server Infrastructure:** Operates without requiring cloud or local LoRaWAN Network Servers (ChirpStack, TTS).
- **Low Latency & Custom Schedules:** Direct transmission without network join negotiations or LNS duty-cycle overhead.
- **Standalone Edge Gateways:** Ideal for pairing directly with HARDWARIO FIBER or custom edge receivers in remote or air-gapped deployments.
- **Power Efficiency:** Eliminates downlink listening windows and join request retries when out of network coverage.

---

## Architecture & Topology

In LoRa P2P mode, STICKER bypasses the LoRaWAN MAC layer while utilizing the underlying Semtech SX1262 / STM32WL LoRa PHY modulation layer.

```text
+-------------------+        Direct RF (LoRa PHY)        +-------------------+
|  STICKER Device   | ---------------------------------> |  HARDWARIO FIBER  |
| (P2P Transmitter) |                                   |  (Edge Receiver)  |
+-------------------+                                   +-------------------+
```

---

## Radio Parameters

When operating in P2P mode, both the transmitter and receiver must be configured with matching physical RF parameters:

| Parameter | Default Value | Description |
|---|---|---|
| **Frequency** | 868.100 MHz (EU868) / 915.000 MHz (US915) | Center RF frequency channel. |
| **Bandwidth (BW)** | 125 kHz | Channel bandwidth. |
| **Spreading Factor (SF)** | SF7 | Trade-off between link budget/range and airtime (SF7 to SF12). |
| **Coding Rate (CR)** | 4/5 | Forward error correction scheme. |
| **Preamble Length** | 8 symbols | Radio frame synchronization preamble. |
| **Sync Word** | `0x12` (Private) | PHY sync word used to isolate private P2P traffic. |
| **Tx Power** | +14 dBm | Output RF transmission power. |

---

## Configuration & Management

P2P parameters and radio modes can be set locally over NFC using [**HARDWARIO Manager**](../hardwario-manager) or via the developer RTT shell:

```bash
config radio-mode p2p
config p2p-frequency 868100000
config p2p-sf 7
config p2p-bandwidth 125
settings save
```

For detailed field commissioning workflows, refer to the [**HARDWARIO Manager**](../hardwario-manager) documentation.