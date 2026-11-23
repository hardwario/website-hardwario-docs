---
slug: startup
title: Startup and initialization
description: What STICKER does when it starts, what its LED shows and how it handles a low battery, calibration mode and a failed start.
---
import LedPattern from '@site/src/components/LedPattern';

# Startup and initialization

This page explains what STICKER does when it starts, what its LED shows and what to do when the start fails.

## What happens at startup

The device starts when you insert the batteries and after every restart, for example after you save a new configuration. It checks the battery, plays the boot light sequence (red, yellow and green once, about 3 s) and meanwhile starts its sensors, radio and NFC. Then it joins the network as set by the radio mode (`radio-mode`).

An unexpected boot light sequence means that the device has restarted.

## Status LED

Unless the table says otherwise, the LED repeats its pattern every 3 s. Most flashes are very short to save energy, so look closely.

| LED | What it means |
|---|---|
| <LedPattern pattern="red yellow green" /> once | **Startup:** the device has just started. |
| <LedPattern pattern="yellow red" /> | **Joining:** the device is joining or rejoining the network. If the LED never turns green, check the gateway coverage, the region and the network keys. |
| <LedPattern pattern="green" /> | **Connected:** on the network, no alarm active. |
| <LedPattern pattern="yellow yellow" /> | **Weak signal:** connected, but the network stopped confirming that it hears the device. The device tries a more robust radio setting and rejoins only if that fails. |
| <LedPattern pattern="yellow" /> | **Radio off:** the radio is switched off or cannot start with the saved settings, so the device measures but sends nothing. |
| <LedPattern pattern="red" /> | **Alarm active**, shown only while Connected. |
| <LedPattern pattern="orange" /> every second | **Calibration mode**, see below. |
| <LedPattern pattern="green orange" /> or <LedPattern pattern="orange green" /> once | **Input changed** (first hour after startup only): a Hall sensor, an input or a motion sensor switched on (green first) or off (orange first). |
| <LedPattern pattern="green" /> solid, up to 5 s | **NFC:** phone detected. |
| <LedPattern pattern="green yellow" /> 2 s | **NFC:** exchange worked. |
| <LedPattern pattern="red" /> 2 s | **NFC:** exchange failed. |

To switch the radio on, set the radio mode and the network settings in [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration). Joining and Weak signal are explained in [**Network connection**](network-connection.md).

## Low battery at startup

At every startup the device measures the battery first. Below 1.8 V it does not start:

- <LedPattern pattern="red red red" /> After the boot light sequence, the LED blinks red fast for 5 s, stays red for 1 s and goes dark.

The device has switched itself off and stays off even if the battery recovers. **Replace the batteries** to start it again. The 1.8 V limit is fixed. The low-battery alarm, which warns you earlier, is described in [**Battery and power**](battery.md).

## Calibration mode

Calibration mode is a service mode for factory tests, not for normal use.

- **How it starts:** magnets on both Hall sensors while the device starts, or **Tools → Calibration mode** in HARDWARIO Manager.
- **What you see:** five fast orange blinks, then a short orange flash every second.
- **What it does:** it sends its sensor values every 30 s, unless the radio mode is off. Normal reports, alarms, history and NFC are off.
- **How it ends:** after 120 min the device restarts normally. To end it sooner, remove and reinsert the batteries.

:::caution
Magnets on both Hall sensors at the same time during the first 30 min after startup also start calibration mode. Remove the magnets once it runs. Otherwise it starts again at the next restart.
:::

## When startup fails

If an optional part such as a sensor or NFC fails, the device starts without it. If an essential part fails, usually the radio, the device waits about 60 s with the LED dark and restarts. If the problem persists, the boot light sequence repeats about once a minute and nothing is sent. Return such a device for service.

If the firmware stops responding, a built-in watchdog restarts the device, so a stuck unit recovers on its own.
