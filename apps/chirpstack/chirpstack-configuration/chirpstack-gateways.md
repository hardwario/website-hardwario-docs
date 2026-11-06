---
slug: chirpstack-gateways
title: "Gateways: Semtech UDP"
sidebar_label: Semtech UDP
title_meta: "Gateways: Semtech UDP (ChirpStack)"
---
import Image from '@theme/IdealImage';

# Gateways: Semtech UDP {#gateways-semtech-udp}

This guide shows how to connect a gateway to **ChirpStack v4** with the **Semtech UDP** packet forwarder protocol and how to add the gateway in ChirpStack. Semtech UDP is easy to set up, but the traffic between the gateway and the server is neither encrypted nor authenticated. For an encrypted connection with gateway certificates, use [Basics Station](./chirpstack-basics-station.md) instead.

## How it works {#how-it-works}
The gateway sends the received LoRaWAN packets as UDP datagrams to the **ChirpStack Gateway Bridge**, by default to port **1700**. The bridge passes them over MQTT to ChirpStack, and downlinks travel the same way back. In chirpstack-docker, a Gateway Bridge with the `semtech_udp` backend runs by default, so no server configuration is needed for EU868.

```toml
[backend]
type="semtech_udp"

  [backend.semtech_udp]
  udp_bind="0.0.0.0:1700"
```

- Open **UDP port 1700** in the firewall for the network the gateways send from.
- The MQTT topics of the bridge (e.g. `eu868/gateway/…`) must match the region on the ChirpStack server.

---

## Add the gateway in ChirpStack {#add-the-gateway-in-chirpstack}
From the left navigation menu, under tenant, select **Gateways** and then click the **Add Gateway** button in the top right.

A form will appear where you can enter gateway information such as:
- **Name**
- **Gateway ID**
- **Stats Interval**

Once completed, click **Submit**.

![ChirpStack v4 - Gateways](images/chirpstack-tutorial-1.png)

:::info
If you are using our **EMBER gateway**, the **Gateway ID** can be found in the **MikroTik software** under **LoRa → Devices**.
:::

---

## Configure the gateway {#configure-the-gateway}
Point the gateway's packet forwarder to the address of the server and UDP port 1700 (up and down).

- EMBER: [ChirpStack v4: Semtech UDP](/ember/lorawan-network-server/lorawan-chirpstack)
- Updating EMBER RouterOS: [Gateway update](/ember/mikrotik/gateway-update)

Once connected, the gateway shows **Last seen** in ChirpStack, and its charts show received packets.

## Video Tutorial {#video-tutorial}

:::tip
If you need further assistance or a visual demonstration of the process described in this guide, consult the [**Video Guide**](/apps/videos-apps/chirpstack-ember).
:::
