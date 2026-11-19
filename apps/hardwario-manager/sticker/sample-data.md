---
slug: sample-data
title: Sample sensor data
description: "Read all STICKER sensors with one NFC tap in HARDWARIO Manager and send the values over the radio at the same time, a quick end-to-end test."
---

# Sample sensor data

Read every sensor on a STICKER right now and see the values, the quickest
end-to-end test that a device is working.

1. Open **HARDWARIO Manager** and go to **STICKER → Sensors → Sample data**.
2. Hold the phone against the STICKER and keep still.
3. The app reads the sensors and shows the current values.

<img src="/img/hw-manager/hw-manager-sample.png" alt="Sample data read over NFC: the note that the readings were also sent over the radio, temperature and humidity, the Device group with the supply voltage, and the Sample again button" width="320" />

The values are grouped: the measurements first (temperature, humidity and the
other enabled sensors), then **Device** (supply voltage and the like),
**Counters** and **1-Wire** with one row per slot. Only enabled sensors report a
value; if none does, the screen says *The device reported no sensor values.*

:::info Sampling also sends an uplink
On STICKER, sampling reads the sensors **and** transmits the values in a single
firmware step, so the screen notes: *These readings were also sent over the
radio.* The uplink goes out over LoRaWAN or P2P, whichever
[**radio mode**](./radio.md) the device runs. The app reports that the values
were sent, not whether the network received them; check that on your network
server.
:::

Sampling takes longer than most NFC actions because it waits for the sensors and
the radio. Keep the phone against the device until the result appears.
**Sample again** takes another reading.

To read measurements the device stored earlier instead of taking a fresh reading,
use [**Sensor history**](./sensor-history.md).
