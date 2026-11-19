---
slug: device-info
title: Device info
description: "Read a STICKER's firmware, uptime, battery, active alarms, health flags and radio state over NFC in HARDWARIO Manager."
---

# Device info

**Device info** reads a STICKER's state over NFC in a few seconds: which
firmware it runs, how long it has been up, its battery, its alarms, its health
and the state of its radio link.

:::info Save the device first
The read uses the encrypted channel, so the device must be saved with its
**secret key**. See [**Saved STICKER devices**](./saved-stickers.md).
:::

---

## Read device info

1. Open **HARDWARIO Manager** and go to **STICKER → Device info**.
2. Hold the phone against the STICKER and keep still.

<img src="/img/hw-manager/hw-manager-device-info.png" alt="Device info read over NFC: STICKER and its serial number at the top, then Firmware, Uptime, Battery, Active alarms, Health and Radio, the collapsed Advanced section and the Read again button" width="320" />

The screen opens with **STICKER** and the serial number, the number printed on
the device. Below it:

| Row | Meaning |
|---|---|
| **Firmware** | The running firmware version, with *(debug)* on a debug build |
| **Uptime** | How long since the last boot |
| **Battery** | The measured supply voltage. Shown when the device reports it |
| **Active alarms** | *None*, or how many alarm rules are tripped; tap the row to list them, see [**Alarm rules**](./alarms.md) |
| **Health** | *OK* when the device reports no problem, otherwise how many flags are set; tap the row to list them |
| **Radio** | The state of the radio link, see [**Radio states**](#radio-states) |
| **1-Wire sensors** | *OK*, or how many slots need attention; tap the row to see each slot. Shown when 1-Wire slots are configured |
| **Last fault** | Why the firmware last crashed. Shown only after a crash |

**Advanced** expands the diagnostic detail:

| Row | Meaning |
|---|---|
| **Last downlink** | Signal strength, signal-to-noise ratio and age of the last downlink, when the device has received one |
| **Time (UTC)** | The device clock, *not set* until the time is synchronized, see [**Tools**](./tools.md) |
| **DevEUI** | The device's identifier on the radio network |
| **Build** | The firmware build, for example *main* or *custom* |
| **Reset cause** | Why the device last restarted |

**Read again** repeats the read without leaving the screen. Hold the phone
against the device again.

If the device runs firmware older than v2.0.0, the screen adds a notice:
*Updating this device to firmware 2.0 erases its stored history and invalidates
its alarm rules.*

---

## Radio states

The **Radio** row shows what the radio link is doing. Only **Healthy** is
green.

| State | Meaning |
|---|---|
| **Healthy** | The device is on the network and its link checks pass |
| **Joining** | The device is trying to join the network |
| **Reconnecting** | The device lost the network and is joining it again |
| **Warning (link check failing)** | The device is joined, but the network stopped answering its link checks |
| **Idle** | The radio is on but not transmitting |
| **Disabled (radio-silent)** | The radio is configured off and the device transmits nothing |
| **Off** | The radio is switched off, for example in **Radio mode** or after a factory reset |

To switch the radio on or start a join, see [**Radio**](./radio.md).

---

## Health flags

When **Health** shows flags, tap it to see which. The names come from the
device's own status report:

| Flag | Meaning |
|---|---|
| **Low battery** | The device reports a low battery. Trust this over the voltage, because the firmware knows the cell |
| **Time unsynced** | The clock has not been set, see [**Tools**](./tools.md) |
| **History down** | Sensor history is not recording |
| **NFC down**, **NFC mailbox down** | Part of the NFC interface failed |
| **I2C wedged** | The internal sensor bus is stuck |
| **Claim window open** | The device is waiting to be claimed |

Radio problems are not listed here: they show on the **Radio** row.
