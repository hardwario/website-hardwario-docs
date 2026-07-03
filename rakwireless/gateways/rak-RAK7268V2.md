---
slug: rak-RAK7268V2
title: RAK7268V2
---

import Image from '@theme/IdealImage';

# RAK7268V2 WisGate Edge Lite 2

The **RAK7268V2 WisGate Edge Lite 2** is a full 8-channel indoor LoRaWAN® gateway based on the latest **WisGateOS 2**. It is designed for smart building, smart office, and other indoor IoT applications. 

It supports Ethernet and Wi-Fi connectivity (and optional LTE), making it a versatile choice for SOHO and enterprise environments. The gateway comes with a built-in Network Server suitable for small to medium deployments but can easily connect to major cloud platforms like The Things Stack, ChirpStack, or AWS IoT Core.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('./images/rak-rak7268v2.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

:::tip WisGateOS 2
This V2 model runs on the **WisGateOS 2**, which offers a more modern interface, extension add-ons, and better security compared to the legacy V1 models.
:::

---

## Key Features

* **8 Channels:** Full LoRaWAN support.
* **Connectivity:** 10/100M Ethernet (PoE) and 2.4 GHz Wi-Fi (AP/Client).
* **Operating System:** OpenWRT-based WisGateOS 2.
* **Extension Add-ons:** Supports Python SDK and extension installation.
* **Management:** Web UI, SSH, and Remote Management via WisDM.
* **Antenna:** Internal antenna (with option for external connectors on some models).

---

## Technical Specifications

| Feature | Specification |
| :--- | :--- |
| **Model** | RAK7268V2 |
| **LoRa Channels** | 8 Channels |
| **Frequency** | EU868 (supports other regions) |
| **Power Supply** | 12 V DC (Power Adapter) or **PoE (802.3af)** |
| **Network** | Ethernet, Wi-Fi (802.11b/g/n) |
| **Cellular** | Optional (LTE Cat 4) - *Check specific SKU* |
| **Operating Temp.** | -10°C to +55°C |
| **Dimensions** | 166 x 129 x 43 mm |
| **IP Rating** | IP30 (Indoor use only) |

---

## Quick Start Guide

### 1. Power On
You can power the gateway using:
* The provided **12 V DC adapter**.
* An Ethernet cable connected to a **PoE injector** or PoE switch (IEEE 802.3af).

### 2. Accessing the Gateway

You can connect to the gateway's local Web UI using one of two methods:

#### WiFi AP Mode (Default)
1. Connect your PC to the Wi-Fi SSID: `RAK7268CV2_XXXX` (where XXXX are the last bytes of the MAC address).
2. No password is required.
3. Open a web browser and go to `192.168.230.1`.

#### Ethernet Mode
1. Connect the gateway's **ETH** port directly to your PC.
2. Set your PC to a static IP (e.g., `169.254.15.100`) to match the gateway's fallback IP (`169.254.15.1`).

### 3. Setting the Mandatory Password

When you first access the gateway, you are required to set a password for the **root** user. The password must meet these criteria:

* At least **12 characters** long
* Includes at least one **special character**
* Includes at least one **number**
* Includes at least one **Latin letter**

:::tip Gateway EUI
Once the password is set, you will be redirected to the **Dashboard**, where you will define your country and region. Copy the **16-character Gateway EUI** displayed there – you will need it for network server registration.
:::

### 4. Internet Connectivity

Before the gateway can communicate with a network server, it needs an internet connection. Navigate to **Network > WAN**:

* **Ethernet:** Plug the ETH port into your router; it uses DHCP by default.
* **WiFi:** Go to **Wi-Fi**, enable the interface, and scan for your local network.
* **Cellular (LTE Models):** If using a SIM card, configure the APN under **Cellular**.

If your SIM card requires a PIN code, you need to configure it in the settings. Navigate to **Network → WAN → Cellular → General**, enable LTE Network, enter your SIM card PIN into the **PIN code** field, and click **Save**.
![PIN code](images/sim-pin.png)

:::warning Cellular Note
If you are not using a SIM card, disable the cellular interface to prevent `SIM_ABSENT` log spam.
:::

---

## Configuring Work Modes

The gateway supports multiple LoRaWAN work modes. Navigate to **LoRa > Configuration** to select your preferred mode:

### Basics Station (Recommended for TTS)

Select **Basics Station** to connect to The Things Stack:

| Setting | Value |
| :--- | :--- |
| **Basics Station Mode** | LNS Server |
| **Server URL** | `wss://hardwario-com.eu1.cloud.thethings.industries` (Port 8887) |
| **Trust (CA Certificate)** | Upload the [ISRG Root X1 .pem](https://letsencrypt.org/certs/isrgrootx1.pem) file |
| **Client Token** | Paste your TTS API Key |

### Other Available Work Modes

* **Packet Forwarder:** Used for legacy Semtech UDP or ChirpStack MQTT connections.
* **Built-in Network Server:** Allows the gateway to act as its own standalone LNS (ChirpStack).

---

## LoRaWAN Network Options

For information about supported LoRaWAN network server platforms, see [**LoRaWAN Network Options**](/rakwireless/gateways/index#lorawan-network-options)

---

## Resources

* [RAK7268V2 Datasheet](https://docs.rakwireless.com/Product-Categories/WisGate/RAK7268V2/Datasheet/)
* [Quick Start Guide](https://docs.rakwireless.com/Product-Categories/WisGate/RAK7268V2/Quickstart/)
