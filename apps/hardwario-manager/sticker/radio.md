---
slug: radio
title: Radio
description: "Switch a STICKER's radio between Off, LoRaWAN and P2P, read and share its radio link keys and start a network join over NFC in HARDWARIO Manager."
title_meta: "Radio (HARDWARIO Manager for STICKER)"
---

# Radio

**STICKER → Radio** holds everything about the device's radio link:

| Entry | What it does |
|---|---|
| **Radio mode** | Switch the radio between **LoRaWAN**, **P2P** and **Off** |
| **Radio link keys** | Read the DevEUI and the keys needed to register the device on a network, and share them |
| **Join radio network** | Join the network now instead of waiting for the next attempt |

All three use the encrypted channel, so the device must be saved with its
**secret key**. See [**Saved STICKER devices**](./saved-stickers.md).

---

## Radio mode

STICKER runs one radio at a time. A device from the factory has its radio
**Off** and transmits nothing until you choose a mode.

1. Go to **STICKER → Radio → Radio mode** and choose **Read radio mode**.
2. Hold the phone against the STICKER. The screen shows the three modes, marks
   the one the device runs as **Current** and shows the link state as
   *Link: …*, using the [**radio states**](./device-info.md#radio-states) of
   Device info.
3. Tap the mode you want and choose **Save radio mode**, then hold the phone
   against the device again. The button stays disabled until you pick a mode
   other than the current one.

<img src="/img/hw-manager/hw-manager-radio-mode.png" alt="The Radio mode screen: the help line, Link: Reconnecting, the LoRaWAN card marked Current and checked, the P2P and Off cards, and the Save radio mode button" width="320" />

| Mode | What the app says |
|---|---|
| **LoRaWAN** | *Joins a LoRaWAN network through its gateways.* |
| **P2P** | *Talks straight to a FIBER, with no LoRaWAN network in between.* See [**LoRa P2P mode**](/sticker/connectivity/lora-p2p). |
| **Off** | *Radio-silent. Sensors and history keep running.* |

Saving restarts the device in the new mode, and the app confirms with
**Radio mode saved**. To read the device again from the mode screen, use
**Read radio mode** under **More actions**.

**P2P** is offered only when the device can run it. Otherwise its card says why:

- *Needs firmware 2.0.0 or newer.*
- *Needs a DevEUI and an AppKey, and this STICKER has none set.* P2P identifies
  the device by its DevEUI and secures the link with its AppKey, so set both in
  [**Configuration**](./configuration.md) first.

When you pick **P2P**, a note reminds you that the P2P frequency and spreading
factor must match the FIBER's. The defaults do; they can be changed only from
the device shell.

---

## Radio link keys

Read the keys you need to register the device on a network server.

1. Go to **STICKER → Radio → Radio link keys** and choose
   **Read radio link keys**.
2. Hold the phone against the STICKER.

<img src="/img/hw-manager/hw-manager-radio-link-keys.png" alt="The Radio link keys screen for one STICKER in OTAA activation: SN, Activation, DevEUI, JoinEUI and AppKey, with the Share, Scan next STICKER and Clear all buttons" width="320" />

The card shows the serial number (**SN**), the **Activation** and the keys that
apply to the device:

| Device uses | Keys shown |
|---|---|
| **OTAA** activation | DevEUI, JoinEUI, AppKey |
| **ABP** activation | DevEUI, DevAddr, NwkSKey, AppSKey |
| **P2P** radio mode | DevEUI, AppKey |

The firmware may withhold a key over NFC. A key it did not return is left out of
the screen and of the export; the app never fills one in.

### Read several devices

The screen keeps a list rather than replacing the last reading. Choose
**Scan next STICKER** to add another device and step through the captured
devices with the arrows. **Clear all** empties the list; the app also forgets it
when it closes. This is the quick way to collect the keys of a batch of devices
before registering them.

### Share the keys

Choose **Share** (with several devices, **Share all**) and pick a format:

| Option | What you get |
|---|---|
| **Share as JSON** | A .json file with the full radio configuration and keys |
| **Share as CSV** | A spreadsheet with the full radio configuration and keys |
| **Share as text** | Text to paste straight into a message or note |

With several devices captured, every option exports all of them at once.

<img src="/img/hw-manager/hw-manager-radio-link-keys-share.png" alt="The share sheet of Radio link keys with Share as JSON, Share as CSV and Share as text" width="320" />

Use the keys to register the device in
[**ChirpStack**](/sticker/connectivity/lorawan-chirpstack) or
[**The Things Stack**](/sticker/connectivity/lorawan-tts).

:::caution A key export is complete
Unlike a configuration export, a key export strips nothing. The AppKey and
session keys the device returned are included in full so the file can be used to
register the device. Treat it accordingly.
:::

---

## Join radio network

A device keeps trying to join the network on its own schedule. **Join radio
network** asks it to try now.

1. Go to **STICKER → Radio → Join radio network**.
2. Hold the phone against the STICKER.

The app confirms with **Join started**. The device sends a join request and
keeps retrying by itself if the network does not answer, so there is no need to
send the command again. Nothing is erased and the device does not restart.

To check the result, open [**Device info**](./device-info.md): the **Radio**
row shows *Joining* while the device waits and *Healthy* once the network has
accepted it.
