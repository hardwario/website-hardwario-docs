---
slug: first-steps
title: Quick Start Guide
---
import Image from '@theme/IdealImage';

# STICKER Quick Start Guide

Welcome! This page helps you **power up, provision, and activate** your STICKER device and connect it to your preferred LoRaWAN Network Server (ChirpStack, The Things Stack, or custom backend).

---

## Before You Start

#### What STICKER Is

**STICKER** is an open IoT platform based on the STM32WL SoC with integrated LoRaWAN connectivity and software-selectable proprietary **LoRa P2P** mode. It is a compact, battery-powered sensor platform built on Zephyr RTOS, running catalog applications like STICKER Clime, Input, and Motion.

For technical details, see the [**Hardware Description**](hardware-description).

#### You Will Need
- **STICKER device** (Clime / Input / Motion variant)
- **2× AA batteries** (1.5V alkaline or lithium)
- A **LoRaWAN Gateway** within range
- A **LoRaWAN Network Server** (ChirpStack / TTS / custom LNS)
- A smartphone with **NFC** and the [**HARDWARIO Manager**](hardwario-manager) app installed

#### Useful Links
- NFC Mobile App Guide: [**HARDWARIO Manager**](hardwario-manager)
- STICKER Decoder: [ttn.js on GitHub](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
- HARDWARIO Datasheets Hub: [hardwario.com/resources/datasheets](https://www.hardwario.com/resources/datasheets)

---

## Step 1: Identify Your STICKER Variant

STICKER comes pre-flashed with one of the catalog applications:

- **STICKER Clime** — Temperature, humidity, light & barometric pressure monitoring.  
  [Documentation →](catalog-applications/sticker-clime)
- **STICKER Input** — External sensors (1-Wire, Machine Probe) and industrial inputs (S0 pulse, 0–30 V logic).  
  [Documentation →](catalog-applications/sticker-input)
- **STICKER Motion** — Ultra-low-power PIR motion detection and 3-axis acceleration tracking.  
  [Documentation →](catalog-applications/sticker-motion)

---

## Step 2: Power Up & Understand Factory Defaults (v1.4.0+)

1. **Open the enclosure** and insert two AA batteries according to the polarity markings.
2. Observe the **LED Boot Sequence**: Red (0.5 s) → Yellow (0.5 s) → Green (1.5 s).

:::note Factory Default: Radio-Silent Mode
Starting with firmware **v1.4.0**, STICKER ships in **Radio-Silent Mode** (`radio-mode` disabled) to prevent battery drain during shipping. The device will **not** automatically attempt a LoRaWAN Join upon battery insertion until activated via NFC.
:::

3. **Status LED Indication:** After boot, the LED will flash **1× Yellow every 3 seconds**, indicating that the device is running normally but the radio is switched off.

---

## Step 3: Configure & Activate via NFC

STICKER uses encrypted NFC for local configuration. Configuration works even without batteries inserted thanks to **NFC energy harvesting**.

:::tip Mobile App Setup
For complete instructions on extracting provisioning keys, configuring parameters, and managing templates, see the [**HARDWARIO Manager**](hardwario-manager) guide.
:::

1. Open [**HARDWARIO Manager**](hardwario-manager) on your mobile phone.
2. Read device info to extract the factory **DevEUI**, **AppEUI/JoinEUI**, and **Claim Token**.
3. Configure your LoRaWAN parameters (DevEUI, AppEUI, AppKey, activation mode).
4. Tap the phone against the STICKER enclosure to write settings:
   - Writing configuration automatically **enables `radio-mode`** and triggers a LoRaWAN Join.
   - The LED status heartbeat will change from **1× Yellow** (radio off) to **Yellow + Red** (joining).
   - Upon successful join, the LED transitions to **1× Green** heartbeat and transmits a **Device Info on Join** payload.

---

## Step 4: Register on your LoRaWAN Network Server

### ChirpStack v4
1. Register the device using the DevEUI, JoinEUI, and AppKey obtained via [**HARDWARIO Manager**](hardwario-manager).
2. Assign the STICKER payload decoder script.
3. Follow the full setup guide: [ChirpStack LNS Integration](connectivity/lorawan-chirpstack).

### The Things Stack (TTS / TTN)
1. Add a new end device using OTAA or ABP provisioning keys obtained via [**HARDWARIO Manager**](hardwario-manager).
2. Import the payload decoder.
3. Follow the full setup guide: [The Things Stack Integration](connectivity/lorawan-tts).

---

## Step 5: Post-Commissioning Verification

Once registered and connected:

- **Verify Uplinks:** Confirm that the initial **Device Info** uplink (firmware version, battery status, reset cause) and regular sensor data packets arrive at your LNS dashboard.
- **Check LED Status:** A single green flash every 3 seconds confirms optimal network link and healthy operation.
- **Adjust Schedules:** Use NFC via [**HARDWARIO Manager**](hardwario-manager) or LoRaWAN Downlink commands (fPort 85) to fine-tune sampling and uplink intervals.

:::info STICKER Input Wiring
If using **STICKER Input**, review the terminal block and DIP switch instructions before connecting external probes: [STICKER Input Wiring Guide](sticker-input-wiring/index).
:::

---

## Troubleshooting Checklist

- **Device dark (No LED boot carousel)?** Check battery orientation or replace batteries.
- **LED flashing 1× Yellow endlessly?** The radio is in Radio-Silent Mode. Apply configuration via NFC using [**HARDWARIO Manager**](hardwario-manager) to activate transmission.
- **LED flashing Yellow + Red?** The device is attempting to Join the network but receiving no response. Check gateway proximity, frequency plan, and AppKey matching.
- **LED flashing Red + Yellow (alternating)?** Configuration corrupt. Re-apply device settings using [**HARDWARIO Manager**](hardwario-manager) over NFC.
- **No uplinks received?** Verify that the payload decoder is properly assigned in ChirpStack or TTS.