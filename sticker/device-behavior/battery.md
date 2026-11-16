---
slug: battery
title: Battery and power
description: How long the STICKER batteries last, how the device reports the battery level and what happens at low battery and after a battery swap.
---

# Battery and power

This page explains how long the STICKER batteries last, how the device reports their level and what happens when they run low or you replace them.

## Battery life

STICKER runs **2+ years on 2× AA**. The real battery life depends on the settings and on the radio conditions at the site. It gets shorter with:

- **A shorter report interval** (`interval-report`, default 15 min). Every report wakes the device and transmits.
- **Poor coverage and frequent rejoins.** Far from a gateway, each report needs a slower radio setting and many times more energy. A device without coverage keeps trying to join.
- **The Hall sensor variant.** Its two Hall sensors draw current all the time.

## How the battery level is reported

The device measures the battery with every sensor reading, by default once per report. You find the value here:

- **Telemetry** (the regular measurement report): `voltage` in volts. Use it to follow the battery over time.
- **Info uplink** (a message with device information): `battery` in mV.
- **Network server:** on request, a battery level from 1 (2.4 V or less) to 254 (3.6 V or more). 255 means unknown. ChirpStack, for example, shows it as the device battery.

## Low battery

When the voltage drops below the low-battery threshold (`battery-level`, default 2.4 V), the device sends an alarm report (a message about the alarm) and a telemetry report within about 10 s. While it is Connected, its LED adds a red flash every 3 s. The alarm is built in and needs no alarm rule. It clears when the voltage rises more than 0.3 V above the threshold (above 2.7 V by default), with a second alarm report. The threshold is configurable, see [**Alarms**](alarms.md).

A separate check runs only at startup: below 1.8 V the device does not start, blinks red and switches itself off until you replace the batteries. See [**Startup and initialization**](startup.md).

## Replacing the batteries

With new batteries the device starts as usual and joins the network again. A LoRa P2P device keeps its pairing.

- **Kept:** settings, network keys, Hall and input counter totals and sensor history. Only the most recent unsaved pulses and history records can be lost.
- **Set again:** the clock, from the network after the join or with **Sync time** in [**Tools**](/apps/hardwario-manager/sticker/tools) of HARDWARIO Manager. History records from before that then get their correct time.
- **Cleared:** active alarms, without a clearing report (those that still apply are raised again), messages waiting to be sent and the PIR and accelerometer motion counts.

More detail is in [**History and counters**](history-and-counters.md).
