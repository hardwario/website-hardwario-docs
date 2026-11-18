---
slug: integrations
title: Integrations
description: "Integrations for HARDWARIO Dashboards: connect a ChirpStack network server to map LoRaWAN devices, show their telemetry and send downlink commands."
title_meta: "Integrations (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# Integrations

HARDWARIO Dashboards can connect with external systems, cloud platforms, and data services. This section covers the available integration methods to extend your IoT ecosystem and enable advanced data processing.

---

## [ChirpStack](/apps/thingsboard/chirpstack-integration)

Connect your LoRaWAN infrastructure directly to HARDWARIO Dashboards. This integration bridges the gap between your ChirpStack network server and HARDWARIO Dashboards, allowing you to manage LoRaWAN devices, process uplinks, and send downlinks through the unified interface.

**Use the ChirpStack integration when you need to:**
- Automatically map LoRaWAN devices to assets
- Visualize LoRaWAN telemetry and metadata in real-time
- Send downlink commands (RPC) directly to your LoRaWAN devices

:::info
Before setting up the integration, ensure you have your CA and client certificates ready. For a step-by-step guide on configuring the secure MQTT connection, see our [ChirpStack MQTT via TLS](/apps/thingsboard/chirpstack-integration) tutorial.
:::

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [Integrations](https://thingsboard.io/docs/pe/user-guide/integrations/).
:::
