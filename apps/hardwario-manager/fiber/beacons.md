---
slug: beacons
title: Connect Beacons
title_meta: "Connect Beacons to FIBER (HARDWARIO Manager)"
---

# Connect Beacons to a FIBER

Beacons are Bluetooth sensor tags (for example temperature and humidity) that a
FIBER monitors directly. The app finds them over Bluetooth and adds them to the
FIBER.

Open **FIBER → Connected Beacons** and tap **+** (or **Connect Beacon**). The
setup wizard offers the same step, see [**Set up a FIBER**](./setup.md).

---

## Find and connect

The app scans for Beacons nearby and lists them with their signal strength.
A Beacon advertises only every few seconds, so it can take a moment to appear;
bring it closer to the phone if it does not. Filter the list by address or
name, and use **Scan again** to repeat the scan.

| Way to add | How |
|---|---|
| **One Beacon** | Tap it in the list. |
| **Connect all nearby Beacons** | Adds, one at a time, every Beacon in range whose signal is strong enough. Move away any Beacon you do not want before you start, because a stray one is added too. The app reports how many were added and how many refused. |
| **Add by address** | Type the Beacon's Bluetooth address (12 hex digits, for example `C0:FF:EE:00:00:01`) from its label. |
| **Add by QR code** | Scan the QR code on the Beacon. |

:::info Address not visible on iPhone
iOS does not reveal a Beacon's Bluetooth address to apps. If a Beacon shows
**Address not visible on this phone**, read the address off its label and use
**Add by address**.
:::

---

## Manage connected Beacons

| Action | What it does |
|---|---|
| **Rename** | Give the Beacon a name. Leave it blank to use its Bluetooth address. |
| **Disconnect** | Remove the Beacon. With current FIBER firmware it is removed from the FIBER, which stops monitoring it. With older firmware it is only removed from the list on the phone. |
| **Disconnect all Beacons** | The same for every Beacon in the list. |

---

## If it does not work

| Message | What to do |
|---|---|
| **This FIBER's firmware can't add Beacons yet** | The list is view-only. Update the FIBER firmware. |
| **The FIBER refused the Beacon** | Check that the FIBER has a free Beacon slot, then try again. |
| **Bluetooth permission needed** | Grant the Nearby devices permission in the app settings, then scan again. |
| **No Beacons nearby** | Bring the Beacon closer, wait a few seconds, or add it by address. |
