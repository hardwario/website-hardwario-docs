---
slug: chirpstack-integration
title: ChirpStack
title_meta: "ChirpStack Integration (ThingsBoard)"
---

import Image from '@theme/IdealImage';

# ChirpStack MQTT Integration via TLS

This guide explains how to connect your HARDWARIO ThingsBoard platform to a ChirpStack MQTT broker over an encrypted TLS connection. This method uses a generic MQTT integration, which ensures secure data transmission using client-side certificates.

## Prerequisites

Before configuring the integration in ThingsBoard, ensure you have successfully generated and downloaded the following three files from the ChirpStack UI (under **Applications** -> **Integrations** -> **MQTT Certificate**):

* **CA Certificate** (`ca.pem`)
* **TLS Certificate** (`client-cert.pem`)
* **TLS Key** (`client-key.pem`)

> **Note:** Ensure your MQTT broker (Mosquitto) is configured with a TLS-enabled listener on port `8883` and that your ChirpStack MQTT integration is configured with `json=true`.

---

## Configuration Steps in ThingsBoard

Follow these steps to set up the secure MQTT integration:

### 1. Create Integration
1.  Log in to your ThingsBoard instance.
2.  Navigate to **Integrations** in the left-hand menu.
3.  Click **Add integration** and select **MQTT** as the type.

### 2. Connection Settings
In the **Connection** tab, configure the following parameters:

| Field | Value |
| :--- | :--- |
| **Host** | IP address of your ChirpStack server (e.g., `10.0.0.52`) |
| **Port** | `8883` |
| **Enable SSL/TLS** | Enabled |
| **Credentials type** | PEM (certificate based) |

### 3. Credential Upload
Upload the three files obtained from the ChirpStack UI into the corresponding fields:

* **CA certificate:** Upload `ca.pem`.
* **Certificate:** Upload `client-cert.pem`.
* **Private key:** Upload `client-key.pem`.

### 4. Topic Configuration
Set the **Topic filter** to receive uplink data from your devices:
`application/+/device/+/event/up`

---

## Verification & Troubleshooting

Once saved, ThingsBoard will establish a secure MQTT connection over TLS. The broker will authenticate the connection using the client certificate signed by your ChirpStack CA. 

### How to verify:
* **Integration Logs:** Navigate to the **Logs** tab of your integration in ThingsBoard. If the configuration is correct, you should see successful connection events.
* **Server-side check:** If the connection fails, verify that your Mosquitto server is actively listening on port 8883 by running this command on your server: 
    `ss -tlnp | grep mosquitto`

### Common pitfalls:
* **Certificate Mismatch:** Ensure you did not swap the `Certificate` and `Private key` files.
* **JSON Format:** If you see the connection as "active" but no data is arriving, double-check that your ChirpStack MQTT integration settings have `json=true` enabled.