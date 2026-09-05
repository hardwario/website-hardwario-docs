---
slug: one-wire-sensors
title: 1-Wire sensors
---

# Set up 1-Wire sensors

Assign the external 1-Wire temperature sensors connected to a **STICKER Input**
to the device's sensor slots.

1. Wire the sensors to the STICKER first: see
   [**STICKER Input wiring**](/sticker/sticker-input-wiring/external-sensors).
2. Open **HARDWARIO Manager** and go to **STICKER → Tools → 1-Wire sensors**.
3. Choose **Read slots & scan the 1-Wire bus** and hold the phone against the
   device. Each sensor found reports its unique ROM address.
4. **Assign** each sensor to one of the four slots. You can **clear** a slot, or
   **swap** two sensors between slots.
5. Tap **Save to device** and hold the phone against the STICKER again.

<img src="/img/hw-manager/hw-manager-1w-sensors.png" alt="The four 1-Wire slots with the sensors discovered on the bus" width="320" />

Live readings are shown next to the sensors as you work, which is the quickest
way to tell which physical probe is which: warm one in your hand and watch which
row moves.

**Revert to read values** puts the slots back to what the device reported, if you
change your mind before saving.

:::info Slot order decides the channels
The slot order sets which channel each sensor reports over LoRaWAN, so keep it
consistent across a fleet, otherwise the same channel means a different probe on
different devices.
:::
