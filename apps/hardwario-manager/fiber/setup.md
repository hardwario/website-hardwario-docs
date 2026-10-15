---
slug: setup
title: Set up a FIBER
title_meta: "Set up a FIBER (HARDWARIO Manager)"
---

# Set up a FIBER

The setup wizard takes a new FIBER from power-on to collecting data. Open
**FIBER → Provisioning** to start it. You can go back to any step you have
completed, but not skip ahead.

:::info Before you start
Power the FIBER on and have it within Bluetooth range of the phone. Turn on the
phone's Bluetooth, and allow the **Nearby devices** and **Camera** permissions
when the app asks.
:::

---

## 1. Scan QR

**Long-press ENTER** on the FIBER to show its QR code, then choose
**Scan device QR** and point the camera at it. The app connects over Bluetooth;
this can take up to a minute. See
[**How the phone gets access**](./index.md#how-the-phone-gets-access).

## 2. Set device name

Give the FIBER a name, for example `fiber-warehouse-1`. The name is stored on the
device and is how it identifies itself, so pick something recognisable.

## 3. Connect to Wi-Fi

The app asks the FIBER which Wi-Fi networks it can see and lists them. Your
phone's own network is marked **Recommended**.

1. Tap a network, enter its password, and confirm.
2. Wait until the app reports **Connected to "…"** with the address the FIBER
   received.

Instead of typing, you can use the **Scan Wi-Fi QR** button and scan the Wi-Fi
QR code on the router label, or one shared from another phone. Use **Rescan** if
your network is missing; a network that only runs on 5 GHz may be out of reach.

If the FIBER is connected by an Ethernet cable, choose **Skip Wi-Fi for now**. A
FIBER on a cable gets its address from DHCP before the wizard starts. Ethernet
settings, including a static address, are under
[**Network connection**](./network.md).

## 4. Role

Choose how this FIBER will run:

| Role | Use it when |
|---|---|
| **Server** | The FIBER runs on its own. Connect STICKERs and Beacons to it, and it collects their data. |
| **Client** | The FIBER reports to another FIBER that is set up as the server. |

The rest of the wizard depends on the role.

## 5a. Server: connect STICKERs and Beacons

Two optional steps follow:

- **Connect STICKERs**: add STICKERs now, see [**Connect STICKERs**](./stickers.md).
- **Connect Beacons**: add Beacons now, see [**Connect Beacons**](./beacons.md).

Both can be skipped with **Skip & continue** or **Skip & finish** and done later
from the FIBER home page.

## 5b. Client: connect to a server

A client FIBER publishes its data over MQTT to the FIBER you set up as the
server. Enter:

| Field | Value |
|---|---|
| **Server address** | The server's hostname or IP address, for example `192.168.1.42`. MQTT runs on port **8883** over TLS, so do not add a port. |
| **MQTT username** | The username the server expects |
| **MQTT password** | Its password |

Choose **Save to the FIBER**. If the FIBER's firmware cannot receive a server
address over Bluetooth yet, the app keeps the address on the phone and says so.

## 6. Finish

Choose **Finish setup**. The app records on the FIBER that setup is complete
and switches to the FIBER home page.
