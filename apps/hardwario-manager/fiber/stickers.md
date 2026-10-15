---
slug: stickers
title: Connect STICKERs
title_meta: "Connect STICKERs to FIBER (HARDWARIO Manager)"
---

# Connect STICKERs to a FIBER

A FIBER collects data from the STICKERs registered on it. The app registers a
STICKER in one pass: it reads the STICKER's LoRaWAN keys over **NFC** and hands
them to the FIBER over **Bluetooth**.

Open **FIBER → Connected STICKERs** and tap **+** (or **Connect STICKER**). The
setup wizard offers the same step, see [**Set up a FIBER**](./setup.md).

:::info You need a phone with NFC
The keys are read by holding the phone against the STICKER, so the phone needs
NFC switched on. See [**Install the app**](../install.md).
:::

---

## Connect a STICKER

1. If the app is not authorized, it asks you to scan the FIBER first:
   **long-press ENTER** on the FIBER and scan the QR code it shows.
2. **Hold the phone against the STICKER.** The app reads its serial number and
   LoRaWAN keys.
3. If the STICKER has not been claimed yet, the app claims it in ATELOS on the
   way, see [**ATELOS account**](../atelos.md#claim-a-sticker).
4. The FIBER registers the STICKER over Bluetooth.
5. When asked, **hold the phone against the STICKER again**. The app starts the
   STICKER's LoRaWAN join, so it reports to the FIBER straight away.

The app confirms that the STICKER is connected and its LoRaWAN join has started.
Use **Connect another STICKER** to continue with the next one.

---

## Manage connected STICKERs

The list shows each STICKER by name, or by serial number if it has no name.

| Action | What it does |
|---|---|
| **Rename** | Give the STICKER a name. Leave it blank to use the serial number. |
| **Disconnect** | Remove the STICKER. With current FIBER firmware it is removed from the FIBER, which stops accepting its data. With older firmware it is only removed from the list on the phone, and the FIBER keeps its own registration. |
| **Disconnect all STICKERs** | The same for every STICKER in the list. |

---

## If it does not work

| Message | What to do |
|---|---|
| **This STICKER belongs to another account.** | Its owner has to hand it over first, see [**Hand a device on**](../sticker/saved-stickers.md#hand-a-device-on). |
| **This STICKER has already been claimed, so it carries no claim code…** | Sign in to the account that owns it, then try again. |
| **The STICKER did not expose its OTAA keys over NFC.** | The firmware withholds them. Get the keys from ATELOS instead. |
| **The STICKER didn't respond.** | Hold the phone against it again, and check it is powered. |
| **Authorization was lost.** | Scan the FIBER QR again (long-press ENTER). |
| **The FIBER rejected the STICKER.** | Try again. If it keeps happening, check the FIBER. |
| **…connected, but its LoRaWAN join could not be started.** | The STICKER is registered. Open it in the list and tap it again to retry the join. |
