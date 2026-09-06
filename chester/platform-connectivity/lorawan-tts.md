---
slug: lorawan-tts
title: The Things Stack
title_meta: "The Things Stack (CHESTER)"
---
import Image from '@theme/IdealImage';

# The Things Stack

This page describes how to connect a **HARDWARIO CHESTER** device to **The Things Stack (TTS)** LoRaWAN Network Server.

---

## Prerequisites

- LoRaWAN network with gateway and **The Things Stack**
- Access to CHESTER console (Bluetooth / USB / J-Link)
- Correct LoRaWAN region configured on CHESTER, gateway and TTS

---

## 1) Where to get LoRaWAN credentials

### 1.1 From CHESTER

Connect to CHESTER console and run:

```bash
lrw config show
```

Important parameters:

- `deveui`: Device EUI
- `joineui`: JoinEUI / AppEUI
- `band`: region
- `mode`: OTAA / ABP

### 1.2 From The Things Stack

During device registration you will configure:

- **JoinEUI**
- **DevEUI**
- **AppKey**
- **Device ID**

---

## 2) Switch catalog application to LoRaWAN mode (if needed)

```bash
app config mode lrw
config save
```

CHESTER will reboot and enable LoRaWAN radio.

---

## 3) Configure CHESTER for OTAA

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
- Always keep AppKey identical in CHESTER and TTS
- Use quotes for AppKey to avoid formatting issues

---

## 4) The Things Stack – Create application

1. Go to **Home**
2. Click **Create application**
3. Fill:
   - **Application ID**
   - **Application Name**
   - (Optional) Description and labels
4. Click **Create application**

---

## 5) The Things Stack – Register CHESTER end device

1. Inside the application click **+ Register end device**
2. Choose **Enter the device manually**
3. Fill:
   - **JoinEUI**
   - **DevEUI**
   - **AppKey**
   - **Device ID**
4. (Optional) Add labels (recommended same as gateway/app)
5. Click **Register end device**

---

## 6) Payload decoder (recommended)

To decode CHESTER uplink payloads in The Things Stack:

1. Open **End device**
2. Go to **Payload formatters**
3. Use **Uplink formatter (JavaScript)**


---

## References

- CHESTER LoRaWAN radio configuration:  
  https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio
- The Things Stack end device tutorial:  
  https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices
