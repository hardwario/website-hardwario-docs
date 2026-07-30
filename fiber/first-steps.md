---
slug: first-steps
title: Quick Start Guide
---

# FIBER Quick Start Guide

Thank you for choosing FIBER.

Follow these steps to bring it up and get your first LoRaWAN device joined.

For more detailed information, see [**Installation**](installation) for the full walkthrough
with screenshots, and [**Hardware Description**](category/hardware-description) for the platform specs.

---

## Step 1: Flash Raspberry Pi OS

:::tip

**Have a FIBER Lite (Raspberry Pi 5)?** The 4 steps below are for the CM4-based FIBER and don't
apply to you — no BOOT jumper, no `rpiboot`, no PoE adapter on your board. Skip straight to the
[FIBER Lite Variant](#fiber-lite-variant) chapter at the end of this guide instead.

:::

1. Open the top cover (four screws under the rubber feet), put the jumper to the **BOOT**
   position, connect the PoE adapter and a USB-B cable HOST↔TARGET — see
   [Connect Target to Host](installation/flash) for the full walkthrough.
1. Install and run **rpiboot** ([raspberrypi/usbboot](https://github.com/raspberrypi/usbboot))
   to switch the TARGET into bootloader mode — it then appears as a USB mass-storage device on
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

Then, in order (see [Installation](installation) for the full commands and configs):

1. [Update System](installation/update-system)
1. [Configure Hardware](installation/configure-hardware) — I2C bus + RTC
1. [Install ChirpStack](installation/chirpstack)
1. [Install ChirpStack Concentratord](installation/concentratord) — USB-connected RAK5146
1. [Install ChirpStack MQTT Forwarder](installation/mqtt-forwarder)
1. [Install Node-RED](installation/node-red)

---

## Step 3: Register a Gateway and a Device

Nothing joins the network until a gateway and a device are registered in ChirpStack. See
[Register a Gateway and a Device](installation/register-device) for the full UI
walkthrough: add the gateway using the ID from the Concentratord logs, create a device profile
and application, then add your STICKER or CHESTER's DevEUI and OTAA keys.

---

## Step 4: Power On Your Test Device

Power on the physical LoRaWAN device. Watch ChirpStack's **LoRaWAN frames** tab (live view) — a
join-request followed by a join-accept should appear within seconds if the gateway is in range
and everything above is configured correctly.

If nothing appears at all, check the gateway's **Last seen at** timestamp first — no traffic
reaching the gateway means the problem is on the radio/concentrator side, not the device
registration.

---

## Step 5: Access Your Services

| Service | URL |
|---|---|
| ChirpStack | `http://[TARGET IP ADDRESS]:8080/` |
| Node-RED | `http://[TARGET IP ADDRESS]:1880/` |

:::danger

Change **ChirpStack's default `admin`/`admin` login** before exposing the device on any shared
network — nothing in the install steps rotates it automatically.

:::

---

✅ **That's it!**
Your FIBER is flashed, running ChirpStack, and receiving real LoRaWAN uplinks.

---

## FIBER Lite Variant

**FIBER Lite** (Raspberry Pi 5) runs the same core stack, but with a different flashing
procedure and a larger, pre-integrated software stack on top. Only what's different from the
steps above:

- **Flashing**: no BOOT jumper, no `rpiboot`, no bootloader activation at all — flash a plain
  microSD card directly with Raspberry Pi Imager and insert it. See
  [Flash Raspberry Pi OS](installation/flash) (FIBER Lite tab) for IP-discovery
  methods, a static-IP recipe, and the SSH-in step.
- **Configure Hardware**: skip the RTC overlay line entirely — the Pi 5 has a built-in RTC.
- **Concentratord**: the RAK5146 connects via **SPI** through a RAK2287 HAT, not USB — a
  different config and install procedure (see the FIBER Lite tab in
  [Install ChirpStack Concentratord](installation/concentratord)),
  currently **not yet verified on real hardware**.
- **Additional services**: install [Docker](fiber-lite/docker), then continue with
  [InfluxDB](fiber-lite/influxdb), [Grafana](fiber-lite/grafana), and the branded
  [Dashboard](fiber-lite/dashboard) under **FIBER Lite** in the sidebar — its complete pipeline
  beyond what FIBER ships by default. See [Ports & Default Credentials](installation/ports-and-credentials)
  for the full list of services and ports once everything is running.
- Full FIBER Lite specifics (BOM, hardware differences): see
  [FIBER Lite Introduction](fiber-lite/introduction) in the sidebar.

If anything doesn't behave as expected, see **Troubleshooting** under FIBER Lite in the sidebar.
