---
slug: sample-data
title: Sample sensor data
---

# Sample sensor data

Read every sensor on a STICKER right now and see the values — the quickest
end-to-end test that a device is working.

1. Open **HARDWARIO Manager** and go to **STICKER → Tools → Sample data**.
2. Hold the phone against the STICKER and keep still.
3. The app reads the sensors and shows the current values.

<img src="/img/hw-manager/hw-manager-sample.png" alt="Sample data readings taken over NFC and transmitted over LoRaWAN" width="320" />

:::info Sampling also sends an uplink
On STICKER, sampling reads the sensors **and** transmits the values in a single
firmware step, so it also produces a **LoRaWAN uplink** — there is no NFC-only
read. The app reports whether that transmission was delivered, so one tap
confirms the whole path from sensor to network server.
:::

Sampling takes longer than most NFC actions because it waits for the sensors and
the radio. Keep the phone against the device until the result appears.

To read measurements the device stored earlier instead of taking a fresh reading,
use [**Sensor history**](./sensor-history.md).
