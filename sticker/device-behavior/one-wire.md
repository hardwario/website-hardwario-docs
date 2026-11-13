---
slug: one-wire
title: 1-Wire probes
description: How STICKER finds DS18B20 and MACHINE PROBE sensors and what happens when a probe is disconnected, reconnected or replaced.
---
import LedPattern from '@site/src/components/LedPattern';

# 1-Wire probes

This page explains how STICKER Input finds its 1-Wire probes and what you see when a probe is disconnected, reconnected or replaced.

## Supported probes

STICKER supports DS18B20 temperature probes and the [**MACHINE PROBE**](../sticker-input-wiring/machine-probe.md). It has four slots for probes (`s1` to `s4`) and uses at most two probes of each type, so in practice 2 DS18B20 plus 2 MACHINE PROBE. Wiring and setup are on [**1-Wire temperature probes (Dallas)**](../sticker-input-wiring/one-wire-dallas.md).

Each slot remembers the serial number (ROM) of its probe and gives its values their name in telemetry (the regular measurement messages), history and alarm rules. Keep the slot order the same across your devices.

## How STICKER finds probes

STICKER looks for probes on the bus:

- **at startup,** if a slot is set up with a stored probe or an expected probe type (`sensor1-type` to `sensor4-type`);
- **in the background,** while a set-up slot waits for its probe: about 2, 7, 17 and 32 min after startup, then every 15 min;
- **when you read the slots** in HARDWARIO Manager (**Tools → 1-Wire sensors**) or send the `w1_scan` command.

A probe that STICKER finds is used at once, without a restart. A new probe that no slot claims goes into the lowest free slot; save the settings to keep it there after a restart.

A new device has no slot set up, so set up the first probes in HARDWARIO Manager, see [**1-Wire sensors**](/apps/hardwario-manager/sticker/one-wire-sensors).

## When a probe is disconnected or reconnected

When a probe is unplugged or fails, you see this from the next sensor reading:

- its values are `null` in telemetry and in the history;
- its slot is `absent` in the Info uplink (device information, sent after every join and once a day);
- STICKER raises one no-data alarm for the whole probe and ends any active threshold alarm on it;
- <LedPattern pattern="red" /> a very short red flash every 3 s while the alarm is active and the device is Connected.

When the probe answers again, the slot returns to `ok`, the values come back and the alarm ends, without a restart. If the device restarted while the probe was unplugged, it finds the probe at a background check or when you read the slots.

## Replacing a probe

A new probe has a different serial number, so STICKER never moves it into the slot of the old probe by itself. To make STICKER find the new probe, read the slots in HARDWARIO Manager or restart the device. STICKER then puts the probe into a free slot, if there is one.

To put the new probe into the old slot, so that its values keep their name:

1. Plug the new probe into the input of the old one.
2. In HARDWARIO Manager go to **STICKER → Tools → 1-Wire sensors**, choose **Read slots & scan the 1-Wire bus** and hold the phone to the device.
3. Assign the new probe to the slot of the old one. To tell probes apart, warm one in your hand and watch which reading moves.
4. Clear every slot that no longer has a probe.
5. Choose **Save to device** and hold the phone to the device. STICKER saves the slots and restarts.
6. Check that the next Info uplink shows the slot as `ok` and that telemetry has its values.

If the new probe is of another type, set up the alarm rules of the slot again, because rules for the old type stay inactive. If the slot is recorded in the history, the history starts again.

## Slot states in the Info uplink

The Info uplink shows the state of each slot:

| State | Meaning | What to do |
|---|---|---|
| `ok` | The probe answers | Nothing |
| `absent` | The probe is missing | Check the probe and its cable |
| `replaced` | The probe is missing and a new probe of the same type is connected | Assign the new probe to the slot |
| `mismatch` | The probe is missing and a probe of another type is connected that no free slot can take | Connect the right probe type or set up the slot again |

An unused slot shows `none`. In `mismatch` the slot raises the wrong 1-Wire probe alarm instead of the no-data alarm. Its alarm rules stay inactive.
