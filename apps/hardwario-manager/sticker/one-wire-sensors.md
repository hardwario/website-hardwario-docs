---
slug: one-wire-sensors
title: 1-Wire sensors
description: "Scan the 1-Wire bus of a STICKER Input over NFC and assign external temperature sensors to its four slots, which set the LoRaWAN channel of each probe."
---

# Set up 1-Wire sensors

Assign the external 1-Wire temperature sensors connected to a **STICKER Input**
to the device's four sensor slots.

1. Wire the sensors to the STICKER first: see
   [**STICKER Input wiring**](/sticker/sticker-input-wiring/external-sensors).
2. Open **HARDWARIO Manager** and go to **STICKER → Sensors → 1-Wire sensors**.
3. Choose **Read slots & scan the 1-Wire bus** and hold the phone against the
   device. The app reads the slots and lists every sensor found on the bus.
4. Put each sensor in a slot (see below).
5. Tap **Save to device** and hold the phone against the STICKER again.

<img src="/img/hw-manager/hw-manager-1w-sensors.png" alt="The 1-Wire sensors screen with the 1-Wire bus switched on, the hint to long-press a sensor and drop it on a slot, and the four slots, all empty" width="320" />

The **1-Wire bus** switch at the top turns the bus and the reading of the slots
on or off. With the bus off, the screen shows only the switch.

---

## Assign, move and clear

- **Assign a sensor.** A sensor that no slot holds is listed under **Not in a
  slot**. Tap its **Assign** button and pick the slot, or long-press the sensor
  and drop it on a slot. If the slot is taken, the app asks before it replaces
  the sensor there.
- **Move or swap.** Long-press a slot and drop it on another slot: the two swap,
  and an empty slot simply takes the sensor.
- **Clear a slot.** Open the slot's **⋮** menu and choose **Clear slot**.

While you drag, the list scrolls when you hold the sensor near its top or
bottom edge.

Each slot shows the state of its sensor: **Present**, **Not on the bus**,
**Replaced by another sensor** or **Wrong sensor type on the bus**.

---

## Check which probe is which

Tap a sensor, in a slot or not, to open its page: type, serial number, slot,
status, the type the slot expects, and the values from the last read.

The values come from the read, not live. To tell two probes apart, warm one in
your hand, choose **More actions → Read & scan again**, and see which value
rose.

---

## Sensor type of a slot

On firmware v2.0.0, each slot also records the sensor type it expects. Change it
with **Set sensor type…** in the slot's **⋮** menu. A new type restarts the
history recording, so the records stored on the device are lost, and the device
refuses the change while alarm rules target the slot: remove them first. The
expected type moves with its sensor, so swapping two slots that expect different
types asks you to confirm for the same reason.

---

## Undo before saving

**More actions → Revert to read values** puts the slots back to what the device
reported, if you change your mind before saving.

:::info Slot order decides the channels
The slot order sets which channel each sensor reports over LoRaWAN, so keep it
consistent across a fleet, otherwise the same channel means a different probe on
different devices.
:::
