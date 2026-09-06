---
slug: lorawan-chirpstack
title: ChirpStack v4
title_meta: "ChirpStack v4 (CHESTER)"
---
import Image from '@theme/IdealImage';

# ChirpStack v4

This page is a practical checklist for connecting a **HARDWARIO CHESTER** device to a **LoRaWAN network using ChirpStack v4**.  
It covers where to get LoRaWAN credentials from CHESTER and how to configure them in ChirpStack.

---

## Prerequisites

- LoRaWAN network with gateway and **ChirpStack v4**
- Access to CHESTER console (Bluetooth / USB / J-Link)
- Correct LoRaWAN region (e.g. **EU868**, **US915**) configured consistently on:
  - CHESTER
  - Gateway
  - Network Server

---

## 1) Where to get CHESTER LoRaWAN credentials

### 1.1 Connect to CHESTER console

You can use one of the following tools:

- **HARDWARIO Manager** (mobile, BLE)
- **HARDWARIO Terminal** (web BLE terminal in Chrome)
- **J-Link + HARDWARIO CLI console**

### 1.2 Display LoRaWAN configuration

Run:

```bash
lrw config show
```

You will see values such as:

- `lrw config band` (e.g. `eu868`)
- `lrw config mode` (`otaa` / `abp`)
- `lrw config deveui`
- `lrw config joineui`
- `lrw config appkey`

> Recommendation: use **OTAA** unless you have a specific reason to use ABP.

---

## 2) Switch catalog application to LoRaWAN mode (if needed)

Some catalog firmwares do not transmit data until the communication mode is selected.

```bash
app config mode lrw
config save
```

CHESTER will reboot and enable LoRaWAN radio.

---

## 3) Configure CHESTER for OTAA (recommended)

### 3.1 Parameters that must match

Between CHESTER and ChirpStack:

- **DevEUI**
- **JoinEUI / AppEUI**
- **AppKey**

### 3.2 Configure OTAA parameters on CHESTER

```bash
lrw config mode otaa
lrw config nwk public
lrw config dutycycle false

lrw config deveui  <YOUR_DEV_EUI>
lrw config joineui <YOUR_JOIN_EUI>
lrw config appkey  "<YOUR_APPKEY>"

config save
```

Notes:
- AppKey copied from UI may contain spaces → quotes are recommended.
- `nwk public/private` must match the gateway/network configuration.

---

## 4) ChirpStack – Device Profile for CHESTER

Create a **Device Profile** with the following recommended settings:

| Parameter | Value |
|---|---|
| MAC version | LoRaWAN 1.0.4 |
| Regional parameters revision | A |
| ADR algorithm | Default ADR algorithm (LoRa only) |
| Device supports OTAA | ON |
| Device supports Class-B | OFF |
| Device supports Class-C | OFF |

---

## 5) ChirpStack – Application and device registration

### 5.1 Create an application

- Go to **Applications**
- Create a new application

### 5.2 Add CHESTER as an end device

Inside the application:

- **Name**
- **Device EUI (DevEUI)**
- **Join EUI / AppEUI**
- **Device Profile**

Save the device.

### 5.3 Configure AppKey in ChirpStack

- In device details, set or generate **AppKey**
- Copy the AppKey carefully (use “eye” icon if needed)
- Use the same AppKey in CHESTER configuration

---


## 6) Payload decoder (recommended)

To decode uplink payloads from CHESTER:

1. Open **Device Profile**
2. Go to **Codec**
3. Insert JavaScript payload decoder


---

## References

- CHESTER LoRaWAN radio configuration:  
  https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio
- Recommended ChirpStack settings:  
  https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio#chirpstack-configuration
- ChirpStack end device tutorial:  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices
