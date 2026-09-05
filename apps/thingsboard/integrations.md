---
slug: integrations
title: Integrations
---
import Image from '@theme/IdealImage';

# Integrations

ThingsBoard allows you to seamlessly connect with external systems, cloud platforms, and data services. This section covers the available integration methods to extend your IoT ecosystem and enable advanced data processing.

---

## [ChirpStack](/apps/thingsboard/chirpstack-integration)

Connect your LoRaWAN infrastructure directly to the HARDWARIO ThingsBoard platform. This integration bridges the gap between your ChirpStack network server and ThingsBoard, allowing you to manage LoRaWAN devices, process uplinks, and send downlinks through the unified interface.

**Use the ChirpStack integration when you need to:**
- Automatically map LoRaWAN devices to ThingsBoard assets
- Visualize LoRaWAN telemetry and metadata in real-time
- Send downlink commands (RPC) directly to your LoRaWAN devices

:::info
Before setting up the integration, ensure you have your CA and client certificates ready. For a step-by-step guide on configuring the secure MQTT connection, see our [ChirpStack MQTT via TLS](/apps/thingsboard/chirpstack-integration) tutorial.
:::