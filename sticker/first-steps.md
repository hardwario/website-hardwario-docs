---
slug: first-steps
title: Quick Start Guide
description: "Quick start guide for STICKER: power up, provision over NFC with HARDWARIO Manager and connect to ChirpStack, The Things Stack or another LoRaWAN server."
title_meta: "Quick Start Guide (STICKER)"
---
import Image from '@theme/IdealImage';

# STICKER Quick Start Guide

Welcome! This page helps you **power up, provision, and activate** your STICKER device and connect it to your preferred LoRaWAN Network Server (ChirpStack, The Things Stack, or custom backend).

---

## Before You Start

#### What STICKER Is

**STICKER** is an open IoT platform based on the STM32WL SoC with integrated LoRaWAN connectivity and software-selectable proprietary **LoRa P2P** mode. It is a compact, battery-powered sensor platform built on Zephyr RTOS, running catalog applications like STICKER Clime, Input, and Motion.

For technical details, see the [**Hardware Description**](/sticker/hardware-description/).

#### You Will Need
- **STICKER device** (Clime / Input / Motion variant)
- **2× AA batteries** (1.5V alkaline or lithium)
- A **LoRaWAN Gateway** within range
- A **LoRaWAN Network Server** (ChirpStack / TTS / custom LNS)
- A smartphone with **NFC** and the [**HARDWARIO Manager**](/sticker/hardwario-manager/) app installed

#### Useful Links
- NFC Mobile App Guide: [**HARDWARIO Manager**](/sticker/hardwario-manager/)
- STICKER Decoder: [ttn.js on GitHub](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
- HARDWARIO Datasheets Hub: [hardwario.com/resources/datasheets](https://www.hardwario.com/resources/datasheets)

---

## Step 1: Identify Your STICKER Variant

STICKER comes pre-flashed with one of the catalog applications:

- **STICKER Clime**: Temperature, humidity, light & barometric pressure monitoring.  
  [Documentation →](/sticker/catalog-applications/sticker-clime/)
- **STICKER Input**: External sensors (1-Wire, Machine Probe) and industrial inputs (S0 pulse, 0–30 V logic).  
  [Documentation →](/sticker/catalog-applications/sticker-input/)
- **STICKER Motion**: Ultra-low-power PIR motion detection and 3-axis acceleration tracking.  
  [Documentation →](/sticker/catalog-applications/sticker-motion/)

---

## Step 2: Power Up & Understand Factory Defaults (v1.4.0+)

1. **Open the enclosure** and insert two AA batteries according to the polarity markings.
2. Observe the **LED Boot Sequence**: Red (0.5 s) → Yellow (0.5 s) → Green (1.5 s).

:::info Radio-silent factory default
Starting with firmware **v1.4.0**, STICKER ships with the radio switched off (`radio-mode` disabled) to prevent battery drain during shipping. The device will **not** attempt a LoRaWAN Join when the batteries go in. It stays silent until it is activated over NFC in Step 3.
:::

3. **Status LED Indication:** After boot, the LED will flash **1× Yellow every 3 seconds**, indicating that the device is running normally but the radio is switched off.

---

## Step 3: Configure & Activate via NFC

STICKER is configured by **holding the phone against it**, with no cable, no
programmer, no desktop software. It works even with **no batteries inserted**:
the NFC field powers the device long enough to store the settings.

:::tip New to the app?
Start with the [**HARDWARIO Manager Quick Start Guide**](/apps/hardwario-manager/first-steps), which covers installing the app, switching NFC on, and making the first tap.
:::

1. **Install the app** and switch **NFC** on. STICKER is configured from an Android phone.
2. **Add the device** to your saved STICKERs, so the app has its **secret key**, because STICKER only answers over an encrypted channel.
3. **Read the keys.** Open **STICKER → LoRaWAN keys** and tap the device. Note the **DevEUI**, **JoinEUI (AppEUI)** and **AppKey** for OTAA, or the **DevAddr** and session keys for ABP.
4. **Write the configuration.** Open **STICKER → Configuration**, set the region, activation mode and keys in the **LoRaWAN** section, switch **`radio-mode`** to LoRaWAN, then tap again to write it back.

### Where each step is documented

| What you are doing | Guide |
|---|---|
| Installing the app and switching NFC on | [**Install the app**](/apps/hardwario-manager/install) |
| Holding the phone right (and the extra lift-and-tap step on iOS) | [**STICKER over NFC**](/apps/hardwario-manager/sticker) |
| Adding a device and its secret key | [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers) |
| Reading device info and LoRaWAN keys | [**Device info and LoRaWAN keys**](/apps/hardwario-manager/sticker/device-info) |
| Reading, editing and writing the configuration | [**Configuration**](/apps/hardwario-manager/sticker/configuration) |
| Configuring a device with no batteries in it | [**Configure a powered-off device**](/apps/hardwario-manager/sticker/offline-configuration) |
| Giving a whole batch the same settings | [**Templates**](/apps/hardwario-manager/sticker/templates) |

### What the LED tells you after the tap

| LED | Meaning | What to do |
|---|---|---|
| **Ten green blinks** | The configuration was applied | Nothing. The write succeeded |
| **Fast red blink for about 2 seconds** | **The tap was refused.** The app used the wrong **secret key** or token, or the request was replayed or malformed. **nothing was written** to the device | Check the device is saved with the right secret key in [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers), then tap again |
| Heartbeat changes from **1× yellow** to **yellow + red** | The radio is on and the device is joining | Wait. A join can take several attempts |
| Heartbeat settles to **1× green** | Joined. The device sends its **Device Info on Join** payload | Nothing. The device is live |

---

## Step 4: Register on your LoRaWAN Network Server

### ChirpStack v4
1. Register the device using the DevEUI, JoinEUI, and AppKey obtained via [**HARDWARIO Manager**](/sticker/hardwario-manager/).
2. Assign the STICKER payload decoder script.
3. Follow the full setup guide: [ChirpStack LNS Integration](/sticker/connectivity/lorawan-chirpstack/).

### The Things Stack (TTS / TTN)
1. Add a new end device using OTAA or ABP provisioning keys obtained via [**HARDWARIO Manager**](/sticker/hardwario-manager/).
2. Import the payload decoder.
3. Follow the full setup guide: [The Things Stack Integration](/sticker/connectivity/lorawan-tts/).

---

## Step 5: Post-Commissioning Verification

Once registered and connected:

- **Verify Uplinks:** Confirm that the initial **Device Info** uplink (firmware version, battery status, reset cause) and regular sensor data packets arrive at your LNS dashboard.
- **Check LED Status:** A single green flash every 3 seconds confirms optimal network link and healthy operation.
- **Adjust Schedules:** Use NFC via [**HARDWARIO Manager**](/sticker/hardwario-manager/) or LoRaWAN Downlink commands (fPort 85) to fine-tune sampling and uplink intervals.

:::info STICKER Input Wiring
If using **STICKER Input**, review the terminal block and DIP switch instructions before connecting external probes: [STICKER Input Wiring Guide](sticker-input-wiring/index.md).
:::

---

## Troubleshooting Checklist

The LED is the only feedback STICKER gives locally, so it is the fastest way to
tell what a unit is doing. The tables below list every pattern in **firmware
v1.4.0**. Most blinks are deliberately very short (5–10 ms) to save battery, so
expect a blip rather than a comfortable blink. The full reference, with timings,
is in [**LED Indication**](/sticker/hardware-description/#led-indication).

### Status heartbeat – one pattern every 3 seconds

Only one pattern is ever shown. The firmware checks these conditions in order and
the **first match wins**, so a more serious condition hides a less serious one.

| LED pattern | What it means | What to do |
|---|---|---|
| **1× green** | Normal operation, joined and healthy | Nothing. This is the target state |
| **Green, then yellow** | The same, but the unit runs a **debug** firmware build | Expected on development units; flash a release build for deployment |
| **1× red** | An **alarm is active** | Read the active alarms in [**Device info**](/apps/hardwario-manager/sticker/device-info), then review the [**alarm rules**](developer-access/alarm-rules.md) |
| **1× yellow** | **Radio switched off** by `radio-mode`. The factory default | Write a LoRaWAN configuration with the radio enabled (Step 3) |
| **2× yellow**, ~200 ms apart | **Link degraded**. Link checks are failing, but the session is still alive | Check gateway coverage and antenna placement; the device recovers on its own once the link returns |
| **1× yellow, then 1× red** ~200 ms later | **Joining or rejoining** and getting no answer from the network | Check gateway proximity, frequency plan / region, and that DevEUI, JoinEUI and AppKey match the network server |
| **Red and yellow alternating, twice** | **Stored configuration could not be loaded**. Identity and provisioning are gone, and the device is running on factory defaults | Re-apply the full configuration over NFC with [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration); if it comes back, the unit needs service |
| **Nothing at all** | Either the device is in **deep sleep** (all channels off. Expected, not a fault), or it has no power | If it is not sleeping, check battery polarity and replace the batteries |

### During an NFC tap

While the phone is held against the device, the LED tracks the exchange step by
step.

| LED | What it means | What to do |
|---|---|---|
| **Green, solid** | Phone detected in the NFC field | Keep the phone still |
| **Fast green blink** (~90 ms) | The command is being processed | Keep the phone still |
| **Fast red blink for 2 s, then off** | **Command rejected**: wrong secret key or vendor token, a replayed request, or a malformed one. **Nothing was written** to the device | Check the device is saved with the right secret key, see [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers), then tap again |
| **Green and yellow, solid** | The reply is written and the device is waiting for the phone to read it | Keep the phone still; on **iOS**, lift and tap again when the scan sheet asks |
| **Ten green blinks**, 100 ms on / 100 ms off | The configuration was applied successfully | Nothing |
| **Off** | Exchange finished, phone removed | Nothing |

The red rejection blink is worth knowing: without it, a refused command would look
exactly like a successful one to whoever is holding the phone. **A red blink during
a tap always means nothing was written.**

### Boot, inputs and calibration

| When | LED pattern | What it means |
|---|---|---|
| Power-up | **Red 0.5 s → yellow 0.5 s → green 1.5 s** (~5 s carousel) | Normal boot; it also proves all three channels work. Seeing it unexpectedly means the device rebooted |
| Input becomes active | **Green, then orange**. 50 ms each | An input on STICKER Input, or a Hall sensor, switched on |
| Input returns to inactive | **Orange, then green**. 50 ms each | The same input switched off again |
| No input indication at all | *(dark)* | This commissioning aid **switches itself off one hour after power-up**; power-cycle the device to get it back while testing |
| Entering calibration | **Five fast orange blinks** | Calibration mode is starting |
| Calibration running | **1× orange every second** | It runs for 120 minutes, then the device reboots on its own |

### Problems the LED does not show

| Symptom | What to check |
|---|---|
| **No uplinks at the network server**, but the heartbeat is 1× green | The device is joined and running. Check that the uplink reaches your application, and that the payload decoder is assigned in [ChirpStack](connectivity/lorawan-chirpstack.md) or [The Things Stack](connectivity/lorawan-tts.md) |
| **Uplinks arrive but decode as raw bytes** | The `ttn.js` codec is missing, or assigned to the wrong direction, see the setup guide for your network server |
| **The phone never reads the device** | Move the phone slowly around its NFC antenna (usually near the top back of the phone), and confirm NFC is switched on, see [**Install the app**](/apps/hardwario-manager/install) |
| **Uplinks are too frequent or too sparse** | Adjust the sample and report intervals over NFC, or with a [**downlink command**](connectivity/downlink-commands.md) on fPort 85 |
