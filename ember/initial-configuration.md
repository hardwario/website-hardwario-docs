---
slug: initial-configuration
title: Initial Setup and Configuration
---
import Image from '@theme/IdealImage';

# Initial Setup and Configuration

Welcome! This page helps you **power up (revive)** your HARDWARIO **EMBER** and choose what to do next:
- run a **managed LoRaWAN backend** operated by HARDWARIO (ChirpStack + Node-RED),
- connect EMBER to your own **ChirpStack**,
- connect EMBER to **The Things Stack (TTS)**,
- or forward packets to **your own LoRaWAN Network Server**,
and then pass data to dashboards such as **Ubidots** or **ThingsBoard**.

Official documentation:
- https://docs.hardwario.com/ember/

---

## Before you start

#### What EMBER is 
EMBER is an industrial **LoRaWAN gateway (IoT Hotspot)** based on **MikroTik RBM33G**, designed for outdoor deployments (IP67 enclosure).  
Hardware description: https://docs.hardwario.com/ember/hardware-description/

#### You will need
- EMBER gateway (Hotspot)
- **LoRaWAN antenna** (required)
- Power source:
  - 24 V DC adapter / 24 V DC power supply, or
  - 24 V DC passive PoE via the **WAN** port
- Internet connectivity (WAN and/or LTE, depending on your setup)
- A LoRaWAN backend (HARDWARIO managed service / self-hosted ChirpStack / TTS / other)
- (Optional) A dashboard platform (Ubidots / ThingsBoard)

#### Quick links
- EMBER product page (datasheet + overview): https://www.hardwario.com/ember
- Hotspot configuration (LAN IP, login, RouterOS script): https://docs.hardwario.com/ember/hotspot-configuration/
- Managed network server (ChirpStack + Node-RED operated by HARDWARIO): https://docs.hardwario.com/ember/cloud-service/

---

## 1) "Revive" EMBER

#### 1.1 Attach antennas (important)
- **Attach the LoRaWAN antenna before powering on.**
- If your unit includes LTE, it may use **two LTE antennas** (internal/external depending on configuration).

More details: https://docs.hardwario.com/ember/hardware-description/#antennas

#### 1.2 Power the gateway
EMBER can be powered by:
- **24 V DC power adapter**
- **24 V DC power supply**
- **24 V DC passive PoE** through the **WAN Ethernet port**

More details: https://docs.hardwario.com/ember/hardware-description/#power-supply-options

#### 1.3 Outdoor mounting safety note
:::danger

For outdoor installations, **EMBER Hotspot** has to be mounted with connectors facing down.

:::

---

## 2) Connect for local access

EMBER runs **MikroTik RouterOS**.  
For initial access and management, use the LAN interface and standard RouterOS tools.

**Main documentation (recommended start):**
- EMBER Hotspot configuration & local access:  
  https://docs.hardwario.com/ember/hotspot-configuration/

Additional references:
- MikroTik RouterOS overview:  
  https://help.mikrotik.com/docs/spaces/ROS/pages/328059/RouterOS
- WebFig (browser management):  
  https://help.mikrotik.com/docs/spaces/ROS/pages/328131/WebFig

---

## 3) Initial RouterOS Configuration Script

This section provides a comprehensive configuration script to set up your EMBER gateway from a fresh state. The script will configure the network interfaces, update RouterOS, install the IoT package, and prepare the LoRa interface.

### 3.1 Set Password and Run Base Configuration

**Open a New Terminal window** (or connect via SSH to your EMBER at `172.31.255.254`), set a secure admin password, then paste the following script:

```routeros
/system identity set name=ember
/interface bridge add name=bridge0
/interface bridge port add bridge=bridge0 interface=ether2
/interface bridge port add bridge=bridge0 interface=ether3
/ip address add address=172.31.255.1/24 interface=bridge0 network=172.31.255.0
/ip dhcp-client add interface=ether1 disabled=no
/system note set show-at-login=no
/port set 0 name=serial0
/port set 1 name=serial1
# Wait for DHCP to acquire IP and establish internet connection
:delay 30s
/system package update check-for-updates
# Wait for update check to complete
:delay 20s
:if ([/system package update get status] = "New version is available") do={
    /system package update install
}
```

**What this script does:**
- Sets the system identity to "ember"
- Creates a bridge interface (bridge0) and adds ether2 and ether3 to it
- Assigns IP address 172.31.255.1/24 to the bridge for LAN access
- Enables DHCP client on ether1 (WAN) for internet connectivity
- Configures serial ports
- Checks for RouterOS updates and installs if available

Press **Enter** to execute the script.

**Important:** Once finished, press **Y** to confirm reboot so that the RouterOS version may be upgraded.

---

### 3.2 Install IoT Package

After the gateway has rebooted and you've reconnected, paste the following script to download and install the IoT package (required for LoRa functionality):

```routeros
:local curVer [/system package update get installed-version]
:local arch [/system resource get architecture-name]
:local iotFile ("iot-" . $curVer . "-" . $arch . ".npk")
:local iotUrl ("https://download.mikrotik.com/routeros/" . $curVer . "/" . $iotFile)
/tool fetch url=$iotUrl mode=https check-certificate=no
:delay 15s
:if ([:len [/file find name=$iotFile]] > 0) do={
    /system reboot
}
```

**What this script does:**
- Detects your current RouterOS version
- Detects your device architecture
- Downloads the matching IoT package (.npk file) from MikroTik
- Automatically reboots to install the package

Press **Enter** to execute.

Once finished, press **Y** to confirm the reboot.

---

### 3.3 Configure LoRa Interface and Update Bootloader

After reconnecting following the reboot, paste this script to configure the LoRa interface and update the bootloader:

```routeros
/iot lora set 0 antenna=uFL
/iot lora servers remove [find]
/system routerboard upgrade
```

**What this script does:**
- Sets the LoRa antenna to use the uFL connector
- Removes any preconfigured LoRaWAN Network Server (LNS) entries
- Updates the bootloader to match the current RouterOS version

Press **Enter** to execute.

Immediately afterwards, press **Y** to confirm the bootloader upgrade, then type:

```routeros
/system reboot
```

and press **Enter** to complete the setup.

---

## 4) Optional: Manual RouterOS Update

Use this section if you need to update or align the RouterOS version on EMBER manually (outside of the automated script in Section 3.1).

**Main documentation (HARDWARIO):**
- RouterOS update on EMBER (WebFig workflow):  
  https://docs.hardwario.com/ember/mikrotik/gateway-update/

Additional references:
- MikroTik downloads (RouterOS / WinBox):  
  https://mikrotik.com/download

---

## 5) Choose your LoRaWAN backend 

At a high level:
**LoRaWAN devices → EMBER (gateway) → LoRaWAN Network Server → Integrations → Dashboards / Apps**

### HARDWARIO managed network server (managed backend)

HARDWARIO can operate the LoRaWAN Network Server for you as a fully **managed service**.  
It is designed for a fast start without the need to run your own infrastructure.

What the service typically provides:
- **ChirpStack** – LoRaWAN Network Server  
- **Node-RED** – data processing, payload decoding, and forwarding  
- Preconfigured connectivity between the gateway, LNS, and integrations

Around EMBER, HARDWARIO also optionally provides a **SIM card with connectivity** for the LTE backhaul and **secure remote access via OpenVPN**.

👉 Recommended if you want to **get data from devices quickly** and forward it to applications or dashboards.

#### Key links
- Service overview and concept:  
  **https://docs.hardwario.com/ember/cloud-service/**

- Web portal (service management):  
  https://docs.hardwario.com/ember/cloud-service/#web-management

- ChirpStack in the managed service:  
  https://docs.hardwario.com/ember/cloud-service/#chirpstack-lorawan-server

- Node-RED in the managed service:  
  https://docs.hardwario.com/ember/cloud-service/#node-red-application

---

### ChirpStack (self-hosted)

**Main documentation (recommended start):**
- ChirpStack (LoRaWAN Network Server overview):  
  **https://docs.hardwario.com/ember/lorawan-network-server/lorawan-chirpstack**

Additional resources:
- Add EMBER gateway to ChirpStack v4 (HARDWARIO tutorial):  
  https://docs.hardwario.com/ember/chirpstack/chirpstack-ember/

- (Optional) Install ChirpStack v4 (Debian/Ubuntu):  
  https://docs.hardwario.com/ember/chirpstack-v4-installation/

- Official ChirpStack docs (gateway connectivity):  
  https://www.chirpstack.io/docs/guides/connect-gateway.html

---

### The Things Stack

**Main documentation (recommended start):**
- The Things Stack (LoRaWAN Network Server overview):  
  **https://docs.hardwario.com/ember/lorawan-network-server/lorawan-tts**

Additional resources:
- TTS documentation home:  
  https://www.thethingsindustries.com/docs/

Protocol note:
- Many gateways use **Semtech UDP Packet Forwarder**, but it has known security and scalability drawbacks.  
  TTS recommends **LoRa Basics™ Station** when possible.

Reference:
- Semtech UDP Packet Forwarder concept:  
  https://www.thethingsindustries.com/docs/hardware/gateways/concepts/udp/

---

### Self-Hosted LoRaWAN Server
If you already run another LoRaWAN server, you can set EMBER to forward packets to your server.

Key note from the official Hotspot Configuration:
- If you **do not use the HARDWARIO managed service**, use **your LoRaWAN server IP address**
  and you **don't need to configure VPN tunnels**.

Reference: https://docs.hardwario.com/ember/hotspot-configuration/

---

## 6) Dashboards & visualization

Once your LoRaWAN server receives uplinks, you typically:
1) decode payload → 2) transform to JSON/telemetry → 3) send to a dashboard via HTTP/MQTT.

If you use the HARDWARIO **managed network server**, **Node-RED** is usually the fastest way to transform and forward data.

### Ubidots

**Main documentation (HARDWARIO):**
- Ubidots integration overview:  
  **https://docs.hardwario.com/apps/ubidots/index**

Additional resources:
- Ubidots home:  
  https://ubidots.com/
- Ubidots documentation:  
  https://ubidots.com/docs/
- HARDWARIO-hosted Ubidots instance (if applicable):  
  https://ubidots.hardwario.com/

---

### ThingsBoard

**Main documentation (HARDWARIO):**
- ThingsBoard integration overview:  
  **https://docs.hardwario.com/apps/thingsboard/index**

Additional resources:
- ThingsBoard home:  
  https://thingsboard.io/
- ThingsBoard documentation:  
  https://thingsboard.io/docs/
- HARDWARIO-hosted ThingsBoard instance (if applicable):  
  https://thingsboard.hardwario.com/

---

## 7) "Day 1" validation checklist

- [ ] LoRaWAN antenna attached (required)
- [ ] Power connected (24 V DC or 24 V passive PoE via WAN)
- [ ] Outdoor installation: connectors facing down
- [ ] PC connected to **LAN**, receives DHCP lease, can reach `172.31.255.1` (updated from default)
- [ ] RouterOS login works (`admin` / `[your-password]`)
- [ ] Initial configuration script completed (Section 3)
- [ ] RouterOS updated to latest version
- [ ] IoT package installed
- [ ] LoRa interface configured (antenna set to uFL)
- [ ] Bootloader updated
- [ ] Gateway is configured to your backend (HARDWARIO managed / ChirpStack / TTS / other)
- [ ] In the LoRaWAN server UI, gateway status shows **Last seen / connected**
- [ ] You can see uplinks from at least one LoRaWAN device

---

## Troubleshooting (quick)

#### Can't reach `172.31.255.1`
- Make sure you are plugged into the **LAN** port (not WAN). LAN ports are ether2 and ether3 after running the configuration script.
- Ensure your PC is set to DHCP (or set a static IP in `172.31.255.0/24`).
- Check the Ethernet link LEDs.
- If you haven't run the configuration script yet, the default IP might still be `172.31.255.254`.

#### Gateway is powered, but not "seen" in the LoRaWAN server
- Confirm the gateway's forwarding destination (server address / ports / protocol).
- Verify WAN/LTE Internet connectivity.
- Ensure the IoT package is installed (check with `/system package print`).
- Verify LoRa interface is configured (check with `/iot lora print`).
- If using the HARDWARIO managed service, confirm you are using the provided service URL and correct configuration guidance.

#### Script execution errors
- Ensure you have a stable internet connection on the WAN port (ether1).
- If the IoT package download fails, verify the RouterOS version matches available packages on MikroTik's download server.
- You can manually download the IoT package from https://mikrotik.com/download and upload it via WebFig or WinBox.

#### Want to understand the baseline RouterOS configuration
- The reference configuration is documented here:  
  https://docs.hardwario.com/ember/hotspot-configuration/
