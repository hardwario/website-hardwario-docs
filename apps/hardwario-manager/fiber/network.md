---
slug: network
title: Network connection
title_meta: "FIBER network connection (HARDWARIO Manager)"
---

# FIBER network connection

Change how the FIBER reaches the network after setup: join another Wi-Fi network,
disconnect from Wi-Fi, or configure Ethernet with DHCP or a static address.

Open **FIBER → Network → Manage Connection**. Changing the network needs a live
connection, so the app asks you to scan the FIBER again: **long-press ENTER** on
the device and choose **Scan device QR**.

---

## Wi-Fi

The current network is highlighted at the top of the list.

| Action | How |
|---|---|
| Join another network | Tap it, enter the password, and confirm. The password is saved only once the FIBER accepts it. |
| Leave the current network | **Disconnect from Wi-Fi** |
| Look again | **Rescan** |
| Check the live state | **Refresh status** |

If joining fails, the app says why and what to try:

| Message | What to do |
|---|---|
| **Wrong Wi-Fi password.** | Re-enter the password. |
| **The device cannot see that network.** | Move the FIBER closer to the access point, or rescan. A 5 GHz-only network may be out of reach. |
| **The device timed out joining the network.** | Check that the access point is up and try again. |
| **…the device didn't come online.** | The FIBER joined but got no address. Check the password and the network's DHCP, then try again. |

---

## Ethernet

Choose how the FIBER gets its Ethernet address:

| Mode | Settings |
|---|---|
| **DHCP** | None. The FIBER gets its address automatically from the network. |
| **Static IP** | **IP address**, **Subnet mask**, **Gateway** and, optionally, **DNS server**. The gateway must be in the same subnet. |

Choose **Apply Ethernet config**. The app then reports the result:

| Result | Meaning |
|---|---|
| **Ethernet online (…)** | The FIBER is on the network at that address. |
| **Configuration saved. Plug in the Ethernet cable.** | No cable is connected yet. |
| **No DHCP lease** | The FIBER did not get an address. Check the cable and the DHCP server. |
| **The FIBER did not take … it is on …** | The address may already be in use. Try another. |
| **The FIBER could not bring up Ethernet on …** | The address may be in use on the network, or was refused. Try a different one. |

Use **Skip Ethernet for now** to leave Ethernet unconfigured.
