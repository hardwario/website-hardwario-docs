---
slug: hm-guide-1wire
title: 1-Wire sensors
---

# Set up 1-Wire sensors

Assign the external 1-Wire temperature sensors connected to a **STICKER Input** to the device's sensor slots.

1. Wire the sensors to the STICKER first — see [**STICKER Input wiring**](../../sticker-input-wiring/external-sensors.md).
2. Open **Hardwario Manager** and go to **Sticker → Tools → 1-Wire sensors**.
3. **Scan the bus** to discover the connected sensors (each reports its unique ROM address).
4. **Assign** each sensor to one of the four slots. You can **clear** a slot or **reorder** the slots.

<img src="/img/hw-manager/hw-manager-1w-sensors.png" alt="1-Wire slots and sensors discovered on the bus" width="320" />

The slot order sets which channel each sensor reports over LoRaWAN, so keep it consistent across your fleet.
