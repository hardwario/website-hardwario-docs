---
slug: cloud-service
title: Managed Network Server
description: "Managed LoRaWAN network server for EMBER: HARDWARIO can host The Things Stack for you as an alternative to self-hosting."
---
import Image from '@theme/IdealImage';

# Managed Network Server

The LoRaWAN Network Server for **EMBER** (**ChirpStack** or **The Things Stack**) can be either self-hosted on your own infrastructure (see [**ChirpStack**](lorawan-network-server/lorawan-chirpstack.md) and [**The Things Stack**](lorawan-network-server/lorawan-tts.md)) or operated by **HARDWARIO** as a managed service with **The Things Stack**. This page describes the managed service. Besides the managed network server, **HARDWARIO** optionally provides a SIM card with connectivity for the **LTE** backhaul and secure remote access via **OpenVPN**.

To get the managed service, you need to have at least one **EMBER Hotspot**.

With this service, you get your own instance of **The Things Stack** and [**Node-RED**](https://nodered.org/). **Node-RED** is accessible through the web management UI.

Access is secured by the **HTTPS/TLSv1.3** protocol, and the user identity is created in the managed service by the **HARDWARIO** team during service setup.

You do not need any specialized software on your PC/mobile to manage the service. An up-to-date web browser is sufficient.

## Web Management

The web management provides access to the **Node-RED** application through the **Teleport** service.

:::caution

**HARDWARIO** support team will create a user account.

:::

The web management login URL: `https://<customer identifier>-<service index>.ember.hardwario.cloud/`

:::tip

You have to replace &lt;customer identifier&gt; with your identification assigned by **HARDWARIO** (usually a company name).

:::

You need one of those methods for multifactor authentication:

* **Google Authenticator** or a compatible application on mobile

* **FIDO2**: universal 2nd factor (**U2F**) USB key (e.g., **Security Key Series**)

* **FIDO2**: universal 2nd Factor (**U2F**) passwordless (e.g., **YubiKey Bio Series**)

The service mentioned below is accessible through the **Applications** menu item. It is identified by this abbreviation:

* `nr`: **Node-RED** application

To access the specific service, click on the **LAUNCH** button.

## Node-RED Application

The **Teleport** service will bring the user to the following URL:

```
https://ember-<customer identifier>-<service index>-nr.tp.hardwario.com/
```

Data are passed from the **LoRaWAN** server to **Node-RED** by **Mosquitto** (the **MQTT** server). The MQTT server is provided by the managed service at `localhost:1883`.

The data processing flow in the **Node-RED** application starts with the **MQTT** message.

:::tip

In **Node-RED**, use the `mqtt in` node to subscribe to the uplink data.

:::

After the **MQTT** message is received, the device payload data needs to be decoded based on firmware used in the **LoRaWAN** device (e.g. **CHESTER**).

:::caution

While it is possible to decode the payload in the **LoRaWAN** server directly, we recommend doing that later in **Node-RED** where the user has a full-featured **Node.js** library for binary buffer parsing and a more robust **JavaScript** interpreter with advanced debugging tools.

:::

After decoding, you can further process the data: scalarizing, adding attributes, etc. The last action in the flow should be delivering the data through some common connector, e.g., an **HTTPS** request.

To tune and troubleshoot flow, you can use the `debug` node and the console view in **Node-RED**.

### Integration Examples

Data can be passed to any service via the Internet for processing, e.g., visualization, data storage, and integration with business applications.

Some common integration examples are:

* **REST API**

* Data streaming services:

  * **Azure Event Hub**

  * **Azure IoT Hub**

  * **AWS IoT Core**

  * ...

* **Microsoft Power BI**

* **Ubidots**
