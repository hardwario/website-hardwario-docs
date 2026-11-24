---
slug: ble-tags
title: BLE tags
description: "Bind external Bluetooth sensor tags to CHESTER slots in HARDWARIO Manager, read their temperature, humidity, battery and signal, and save or clear the slots."
---

# Bind BLE sensor tags

CHESTER can read external **Bluetooth sensor tags** and report their values
alongside its own. Each tag occupies a **slot** on the device; binding a tag to a
slot is what tells the CHESTER to watch for it. The slot number is also what
names the tag's readings in telemetry, so moving a tag to another slot changes
how its readings are labelled.

Open **CHESTER → BLE tags**. The app reads the slots (**Reading the BLE
tags…**).

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-ble-tags.png" alt="The BLE tags screen with the device name, Slots with 2 of 8 in use, one slot card not reporting and one with its readings, the free slots count with Show, and the Nearby, not in a slot section with Scan" width="320" />

:::info Opening the screen can switch the tag scanner on
Reading tags needs the device's tag scanner. If it is off, the app switches it
on for this session and says so: *The tag scanner was off, so it was turned on
for this session. Save the configuration to keep it on across reboots.* Until
you save, the scanner goes back off at the device's next restart.
:::

If the device's firmware has no tag slots, the screen says **No BLE tag slots**.

---

## The slots

The page is headed with the device name. **Slots** shows how many are in use,
for example **2 of 8 in use**.

Each filled slot is a card with its number, a status light and its latest
readings: temperature, humidity, battery voltage and signal strength in dBm,
whichever the tag reports, plus **magnet**, **moving** or **low battery** when
the tag says so. A tag that has not reported yet shows **No reading yet**; one
that has stopped shows **Not reporting**, with when it was last seen if known.

The **⋮** menu on a slot (**Slot 1 options**) shows the tag's Bluetooth address
and acts on that slot alone: **Clear slot**, or **Swap with slot 2** and so on.

Empty slots are hidden behind a count, for example **6 free slots**; **Show**
lists them and **Hide** folds them away. A slot with a change you have not
saved stays visible either way.

The refresh button in the top bar (**Read again**) re-reads the slots and their
stored values. **More actions → Read tag values** waits up to a minute for fresh
values from every bound tag and then says how many it read.

---

## Bind a tag

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-ble-tags-nearby.png" alt="The Nearby, not in a slot section listing tags found by a scan, each with its Bluetooth address, signal strength, readings and an Assign button" width="320" />

1. Under **Nearby, not in a slot**, tap **Scan**. The scan runs for about 20
   seconds, a little longer for each new tag it finds, 30 seconds at most, and
   counts down beside the heading. **Cancel** stops it. While it runs the
   device's tag scanner is busy and collects no readings of its own.
2. The tags found and not yet in a slot are listed with their address, signal
   strength and readings. Tap **Assign** and pick a slot: **Slot 2 (empty)**,
   or a filled one, which asks **Replace slot 2?** first.
3. Tap **Save to device**. The app asks **Save the tag slots?** *The device
   restarts to apply them, which drops the Bluetooth connection.* Choose
   **Save**.

**Assign**, **Clear slot** and **Swap with slot** only stage the change. Nothing
reaches the CHESTER until you save, and **Save to device** stays disabled until
you have changed something. **More actions → Revert changes** discards what is
staged, and leaving the screen with staged changes asks **Discard changes?**
first.

After the save the device restarts, and the app waits for it and reconnects on
its own, as after a [**configuration save**](./configuration.md#saving).

### Other ways to add a tag

**More actions** below **Save to device** holds three more ways in. Unlike
**Assign**, these **apply on the device at once**, without **Save to device**:

| Action | What it does |
|---|---|
| **Enroll every nearby tag** | After a confirmation, the device binds every tag it hears stronger than −70 dBm to a free slot, one at a time, until the slots are full or nothing new answers. Move the tags you do not want away first: a stray tag takes a slot |
| **Add by address** | Type the tag's Bluetooth address, for example `C0:FF:EE:00:00:01`. The tag goes into the first free slot |
| **Add by QR code** | Scan the QR code on the tag. The tag goes into the first free slot; a tag that already has one is reported as **Already bound** |

On older firmware, which cannot write a chosen slot, **Assign** also puts the
tag straight into the first free slot, the **⋮** menu offers **Remove from
device** instead of **Clear slot**, and there is no **Save to device**. Firmware
that cannot list unbound tags says *This firmware cannot list unenrolled tags.
Add one by address or by scanning its QR code instead.*

---

## Clear the slots

**Clear slot** in a slot's **⋮** menu empties that slot when you save.

**More actions → Remove all tags** empties every slot at once. The app asks
**Remove all tags?** *Every slot is cleared on the device. This cannot be
undone.* With **Remove all** the slots are cleared on the device straight away,
without **Save to device**.

---

## Related settings

The tag scanner has its own configuration, which sits in the **BLE tags** group
under [**Advanced configuration**](./configuration.md): whether it is enabled
and, depending on the firmware, how often it scans, for how long, and the slot
values. In the shell these are the `tag config` commands, for example
`tag config enabled`, `tag config scan-interval`, `tag config scan-duration` and
`tag config slot-<n>`. See [**Terminal**](./terminal.md).
