---
slug: first-steps
title: Quick Start Guide
description: "Quick start guide for FIBER: bring up the gateway, install the LoRaWAN stack and join your first LoRaWAN device."
---

# FIBER Quick Start Guide

Thank you for choosing FIBER.

Follow these steps to bring it up and get your first LoRaWAN device joined.

For more detailed information, see [**Installation**](/fiber/installation/) for the full walkthrough
with screenshots, and [**Hardware Description**](/fiber/category/hardware-description/) for the platform specs.

---

## Step 1: Flash Raspberry Pi OS

:::tip

**Have a FIBER Lite (Raspberry Pi 5)?** The 4 steps below are for the CM4-based FIBER and don't
apply to you: no BOOT jumper, no `rpiboot`, no PoE adapter on your board. Skip straight to the
[FIBER Lite Variant](#fiber-lite-variant) chapter at the end of this guide instead.

:::

1. Open the top cover (four screws under the rubber feet), put the jumper to the **BOOT**
   position, connect the PoE adapter and a USB-B cable HOST↔TARGET, see
   [Connect Target to Host](/fiber/installation/flash/) for the full walkthrough.
1. Install and run **rpiboot** ([raspberrypi/usbboot](https://github.com/raspberrypi/usbboot))
   to switch the TARGET into bootloader mode. It then appears as a USB mass-storage device on
   your HOST.
1. Flash it with Raspberry Pi Imager (Device: **Raspberry Pi 4**, Storage:
   **RPi-MSD-0001 Media**), setting a hostname, username/password, and enabling SSH in the
   Customisation step.
1. Press **RESET** on the TARGET, wait for it to boot, and find its IP address from your DHCP
   server's leases.

---

## Step 2: Install the Software Stack

```sh
ssh fiber@<TARGET IP ADDRESS>
```

Then, in order (see [Installation](/fiber/installation/) for the full commands and configs):

1. [Update System](/fiber/installation/update-system/)
1. [Configure Hardware](/fiber/installation/configure-hardware/): I2C bus + RTC
1. [Install ChirpStack](/fiber/installation/chirpstack/)
1. [Install ChirpStack Concentratord](/fiber/installation/concentratord/): USB-connected RAK5146
1. [Install ChirpStack MQTT Forwarder](/fiber/installation/mqtt-forwarder/)
1. [Install Node-RED](/fiber/installation/node-red/)
1. [Install InfluxDB](/fiber/installation/influxdb/)
1. [Install Grafana](/fiber/installation/grafana/)
1. [Dashboard](/fiber/installation/dashboard/)

---

## Step 3: Register a Gateway and a Device

Nothing joins the network until a gateway and a device are registered in ChirpStack. See
[Register a Gateway and a Device](/fiber/installation/register-device/) for the full UI
walkthrough: add the gateway using the ID from the Concentratord logs, create a device profile
and application, then add your STICKER or CHESTER's DevEUI and OTAA keys.

---

## Step 4: Power On Your Test Device

Power on the physical LoRaWAN device. Watch ChirpStack's **LoRaWAN frames** tab (live view). A
join-request followed by a join-accept should appear within seconds if the gateway is in range
and everything above is configured correctly.

If nothing appears at all, check the gateway's **Last seen at** timestamp first, because no traffic
reaching the gateway means the problem is on the radio/concentrator side, not the device
registration.

---

## Step 5: Access Your Services

| Service | URL |
|---|---|
| ChirpStack | `http://[TARGET IP ADDRESS]:8080/` |
| Node-RED | `http://[TARGET IP ADDRESS]:1880/` |
| InfluxDB | `http://[TARGET IP ADDRESS]:8086/` |
| Grafana | `http://[TARGET IP ADDRESS]:3000/` |
| Dashboard | `http://[TARGET IP ADDRESS]/` |

:::danger

Change **ChirpStack's default `admin`/`admin` login** before exposing the device on any shared
network. Nothing in the install steps rotates it automatically.

:::

---

✅ **That's it!**
Your FIBER is flashed, running ChirpStack, and receiving real LoRaWAN uplinks.

---

## FIBER Lite Variant

**FIBER Lite** (Raspberry Pi 5) runs the exact same software stack as FIBER: ChirpStack,
Node-RED, InfluxDB, Grafana, and the Dashboard are all installed the same way, no extra steps.
The only differences are hardware:

- **Flashing**: no BOOT jumper, no `rpiboot`, no bootloader activation at all. Flash a plain
  microSD card directly with Raspberry Pi Imager and insert it. See
  [Flash Raspberry Pi OS](/fiber/installation/flash/) (FIBER Lite tab) for IP-discovery
  methods, a static-IP recipe, and the SSH-in step.
- **Configure Hardware**: skip the RTC overlay line entirely, because the Pi 5 has a built-in RTC.
- **Concentratord**: the RAK5146 connects via **SPI** through a RAK2287 HAT, not USB, a
  different config and install procedure (see the FIBER Lite tab in
  [Install ChirpStack Concentratord](/fiber/installation/concentratord/)). Follow that tab exactly: the
  channel plan and the two service-permission lines are both mandatory, and omitting either one
  fails silently rather than reporting an error.
- FIBER Lite has no display or 1-Wire sensors: full FIBER Lite specifics (BOM, hardware
  differences): see [FIBER Lite Introduction](/fiber/fiber-lite/introduction/) in the sidebar. Have a
  classic FIBER instead? See [**FIBER Hardware Guides**](/fiber/category/fiber-hardware-guides/) in the
  sidebar for what to do with its display and 1-Wire sensors.

If anything doesn't behave as expected, see **Troubleshooting** under FIBER Lite in the sidebar.
