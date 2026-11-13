---
slug: lorawan-chirpstack
title: "ChirpStack v4: Semtech UDP"
description: "Connect the HARDWARIO EMBER gateway to ChirpStack v4 over Semtech UDP: add the server on port 1700 in RouterOS and register the Gateway ID."
sidebar_label: Semtech UDP
title_meta: "ChirpStack v4: Semtech UDP (EMBER)"
---
import Image from '@theme/IdealImage';

# ChirpStack v4: Semtech UDP

This guide shows how to connect the **HARDWARIO EMBER** LoRaWAN gateway (MikroTik RouterOS) to a **ChirpStack v4** network server with the **Semtech UDP** packet forwarder protocol. For a TCP connection secured with TLS or client certificates (mTLS), use [Basics Station](./lorawan-chirpstack-basics-station.md) instead.

## Useful docs
- ChirpStack v4 Installation → https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
- Adding a gateway in ChirpStack: [Gateways](/apps/chirpstack/chirpstack-configuration/chirpstack-gateways)
- EMBER hotspot configuration (RouterOS basics, LoRaWAN section): https://docs.hardwario.com/ember/hotspot-configuration/

:::info
Before configuring the HARDWARIO EMBER gateway, make sure **ChirpStack v4 is installed and running**.

Installation instructions are available here:  
https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
:::


## Prerequisites
- Access to the EMBER management interface (**WebFig** or **WinBox**)
- Your ChirpStack gateway endpoint (hostname/IP + UDP ports): typically the **Gateway Bridge** endpoint
- If you are not using the HARDWARIO managed network server, point the LoRaWAN server address to **your own** LoRaWAN server (no VPN tunnels needed).

---

## 1) Get the Gateway ID (EUI-64) from EMBER
On MikroTik RouterOS, the gateway EUI is shown as **Gateway ID**:

- **IoT → LoRa → Devices → Gateway ID**
![EMBER Gateway ID](images/ember-geteway-id.png)

---

## 2) Configure EMBER (MikroTik RouterOS) to connect to ChirpStack
> RouterOS typically requires the LoRa card to be **Disabled** while you change LoRa settings.

1. In the left panel, open **IoT**→ **LoRa**. Click the line in the list and choose Disable. 
![EMBER disable lrw card](images/ember-disable-lrw-card.png)

2. In the left panel, open **IoT**→ **LoRa**→ **Servers**. Select **New** and fill boxes:
- Name: **Chirpstack**
- Address: **ENTER_ADDRESS_OF_CHIRPSTACK_SERVER**
- Protocol: **UDP**
- Up/Down ports: **1700** (Or your custom port)
![EMBER add Chirpstack server](images/ember-add-chirpstack-server.png)

3. Go to **IoT → LoRa → Devices** and double-click on the device. In the Network Servers field, check that ChirpStack is selected. If not, click **+** and add it.
![EMBER check network server](images/ember-check-chirpstack-net-ser.png)

4. Enable your LoRa card. Go to **IoT → LoRa → Devices → Enable**
![EMBER enable lrw card](images/ember-enable-lrw.png)

---

## 3) Register EMBER as a gateway in ChirpStack
1. In **ChirpStack v4**, open **Tenant → Gateways**.
2. Click **Add Gateway**.
3. Fill in:
   - Name: **EMBER-0** (Or your preferred name)
   - Gateway ID: **GATEWAY_ID**
   - Stats Interval: **YOUR_PREFERENCE**
4. Click **Submit**.

![ChirpStack v4 - Gateways](images/chirpstack-add-geteway.png)

---

## 4) Verify gateway traffic
- On EMBER: **WebFig → LoRa → Traffic** should show incoming messages when nearby end devices transmit.
- In ChirpStack: the gateway should show activity (e.g., status/“last seen” updates).

---

## Payload decoder links (for end devices)
EMBER (gateway) forwards packets only. Payload decoding is configured **per end device/app** in ChirpStack.

Example decoder (CHESTER Clime):
- Codec folder: https://github.com/hardwario/chester-sdk/tree/main/applications/clime/codec
- ChirpStack JS decoder: https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/cs-decoder.js
