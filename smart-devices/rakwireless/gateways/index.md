---
slug: index
title: RAKwireless - Gateways
---

import Image from '@theme/IdealImage';

Here is a list of tested **RAKwireless gateways** by HARDWARIO with reference resources:

| Name | Type | Overview | Product page | Purchase link |
| :--- | :--- | :--- | :--- | :--- |
| [**RAK7268V2**](/smart-devices/rakwireless/gateways/rak-RAK7268V2) | Indoor LoRaWAN® Gateway <br/>(WisGate Edge Lite 2) | [Details](/smart-devices/rakwireless/gateways/rak-RAK7268V2) | [Official site](https://docs.rakwireless.com/product-categories/wisgate/rak7268v2/overview) | [Buy here](https://www.hardwario.store/p/rak-7268v2) |
| [**RAK7289V2**](/smart-devices/rakwireless/gateways/rak-RAK7289V2) | Outdoor Industrial LoRaWAN® Gateway <br/>(WisGate Edge Pro) | [Details](/smart-devices/rakwireless/gateways/rak-RAK7289V2) | [Official site](https://docs.rakwireless.com/product-categories/wisgate/rak7289v2/overview/) | [Buy here](https://www.hardwario.store/p/rak-7289v2) |

---

## LoRaWAN Network Options

To operate your LoRaWAN device, you can choose between two supported network server platforms. Both solutions allow you to manage gateways, register end devices, configure profiles, and process payload data.

### Option 1: The Things Stack (TTS)

A cloud-based LoRaWAN Network Server suitable for both small and large deployments.

#### Gateway Registration on TTS

1. Log in to your TTS Console (e.g., `hardwario-com.eu1.cloud.thethings.industries`).
2. Go to **Gateways → Register gateway**.
![TTS Register Geteway](images/tts-register-geteway.png)

3. Paste your **Gateway EUI** (16 characters, found in the gateway Dashboard) and click **Confirm**.
![TTS Register Geteway](images/tts-geteway-eui.png)



4. After entering the Gateway EUI, fill in the following fields:
- Gateway ID: ( Your chosen identifier for the device → example: **rak-0x**)
- Gateway Name: (Your chosen name for the device → example **Rak 0x**)
- Frequency Plan: **Europe 863–870 MHz (SF9 for RX2, recommended)**
- **(Optional)** Label

Check the box **Require authenticated connection**.

Enable the following:
- **Generate API key for CUPS**
- **Generate API key for LNS**

Click **Register gateway** and **download both API keys** (CUPS + LNS).

![TTS Geteway Config](images/tts-geteway-config.png)

5. A new window will appear. Click **Download LNS key**, then **Download CUPS key** to save both API keys to your device. Once both files are downloaded, click **I have downloaded the keys**.
![TTS Download API Keys](images/tts-api-keys.png)
#### Gateway Configuration

On your RAK gateway, navigate to **LoRa → Configuration** and select **Basics Station** as **Work mode**.
- Make sure the **Frequency Plan** and **Country** matches your regional settings.
Click on **Configure Basics Station server setup** and fill the following field:
- Basics Station Server Type: **LNS Server**
- Server URL: **wss://hardwario-com.eu1.cloud.thethings.industries**
- Server Port: **8887**
- Authentication Mode: **TLS Server & Client Token Authentication**
- Trust (CA Certificat): **isrgrootx1.pem** (Download from https://letsencrypt.org/certs/isrgrootx1.pem and select)
- Client Token: **NNSXS.K5BHKTOO...** (From file **tc.key**)
- Confirm by clicking **Save changes**.


![Rak TTS Server Setup](images/rak-cofigure-tts-server.png)

---

### Option 2: ChirpStack v4

An open-source LoRaWAN Network Server ideal for on-premise or private network installations.

#### Gateway Registration on ChirpStack
1. In **ChirpStack v4**, open **Tenant → Gateways**.
2. Click **Add Gateway**.
![Rak ChirpStack add Gateway](images/chirpstack-add-gateway.png)
3. Fill in:
   - Name: **Rak-gate** (Or your preferred name)
   - Gateway ID: **GATEWAY_ID**
   - Stats Interval: **YOUR_PREFERENCE**
4. Click **Submit**.
![Rak ChirpStack config](images/chirpstack-config-gateway.png)

#### Gateway Configuration
On your RAK gateway, navigate to **LoRa → Configuration** and select **Packet forwarder** as **Work mode**.
- Make sure the **Frequency Plan** and **Country** matches your regional settings.
Select **Samtech UDP GWMP Protocol** as Protocol.
In **UDP Protocol parameters** category fill the following field:
- Server address: **ADDRESS_OF_YOUR_CHIRPSTACK_SERVER**
- Server Port up: **1700**
- Server port down: **1700**
- Confirm by clicking **Save changes**.

![Rak select ChirpStack](images/rak-chirpstack.png)

---

## OpenVPN Configuration

To configure a secure OpenVPN connection on your RAK gateway, follow these steps:

1. Click on the **Extensions** icon (puzzle piece) in the left navigation menu. Open the **Extension gallery** tab and install the **RAK OpenVPN Client** extension if it is not already installed.
![OpenVPN Extension Gallery](images/OpenVPN-certificate-1.png)

2. Switch to the **Installed** tab, find **RAK OpenVPN Client**, and click **Launch**.
![Launch OpenVPN Extension](images/OpenVPN-certificate-2.png)

3. On the OpenVPN Client dashboard, click **Configure** under the **VPN Tunnel** overview.
![Configure VPN Tunnel](images/OpenVPN-certificate-3.png)

4. Go to the **Configuration** tab, toggle **Enable Connection**, upload your `.ovpn` configuration file, and click **Save changes**.
![Upload OpenVPN Certificate](images/OpenVPN-certificate-4.png)
