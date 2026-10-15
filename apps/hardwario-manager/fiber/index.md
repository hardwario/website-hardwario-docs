---
slug: /hardwario-manager/fiber
title: FIBER
description: "Set up a FIBER gateway over Bluetooth with HARDWARIO Manager: network, role, and the STICKERs and Beacons it collects data from."
title_meta: "FIBER (HARDWARIO Manager)"
---

# FIBER over Bluetooth

HARDWARIO Manager sets up a **FIBER** gateway over **Bluetooth**: give it a name,
connect it to Wi-Fi or Ethernet, choose its role, and connect the STICKERs and
Beacons it collects data from. No cable, keyboard or laptop is needed at the
gateway.

:::info Which builds include FIBER
FIBER setup is part of the **ProXimos App**, the ProXimos build of this app,
where FIBER is called **Hub** and STICKER is called **Node**. The public release
of HARDWARIO Manager does not include FIBER yet. The screens and steps are the
same in both; this guide uses the HARDWARIO names.
:::

---

## How the phone gets access

FIBER has no static PIN or pairing code. Instead, it shows a **one-time QR
code** on its display:

1. **Long-press ENTER** on the FIBER until the QR code appears.
2. In the app, choose **Scan device QR** and point the camera at the code.
3. The app connects over Bluetooth. This can take up to a minute.

Scanning the code proves you are standing at the device, and the token it
carries is valid for one session only. The session ends when you leave the FIBER
screens, when the Bluetooth link drops, or after about **5 minutes** without
use. When that happens the app shows **Authorization expired**: long-press
ENTER again and choose **Reauthorize**.

---

## The FIBER home page

Open **FIBER** from the home screen. The home page always opens first, whether
or not a FIBER is connected. With none connected, it offers **Connect a FIBER**.

<img src="/img/hw-manager/hw-manager-fiber-home.png" alt="The FIBER home page with Connect a FIBER, Provisioning, Network, Connected STICKERs and Connected Beacons" width="320" />

| Section | What it shows |
|---|---|
| **Connected FIBER** | The FIBER's name and whether the app is **Authorized**. **Show details** adds the hostname, firmware, IP address, MAC and uptime (as of the last connection). Actions: **Authorize** / **Unauthorize**, **Rename**, **Close connection** |
| **Provisioning** | **Run the FIBER setup wizard**, see [**Set up a FIBER**](./setup.md) |
| **Network** | Wi-Fi and Ethernet status, with **Manage Connection**, see [**Network connection**](./network.md) |
| **Connected STICKERs** | How many STICKERs are connected, **+** to connect another, see [**Connect STICKERs**](./stickers.md) |
| **Connected Beacons** | How many Beacons are connected, **+** to connect another, see [**Connect Beacons**](./beacons.md) |

In the ProXimos App the home page also offers **View in ProXimos Portal**. It
opens the portal running on the FIBER; if the phone is not on the FIBER's
network, the app shows the address to open on a computer that is.

:::caution Close connection forgets the FIBER
**Close connection** removes the FIBER from the app, so you will need to set it
up again to work with it. Its STICKERs are kept and reappear when you reconnect
to it.
:::

---

## In this section

1. [**Set up a FIBER**](./setup.md): the first-run wizard.
2. [**Network connection**](./network.md): Wi-Fi and Ethernet, DHCP or static IP.
3. [**Connect STICKERs**](./stickers.md): register STICKERs on the FIBER over NFC
   and Bluetooth.
4. [**Connect Beacons**](./beacons.md): add Bluetooth Beacons to the FIBER.
