---
slug: sensor-history
title: Sensor history
description: "Read the measurements a STICKER stored on the device over NFC in HARDWARIO Manager and review them as a summary, charts and per-day tables."
---

# Read sensor history

STICKER can store measurements on the device (store-and-forward), so readings
taken while it was offline are not lost. Read those stored records back over NFC.

1. Open **HARDWARIO Manager** and go to **STICKER → Sensors → Sensor history**.
2. Hold the phone against the STICKER and keep still.
3. The stored records are read in and shown for review.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-sensor-history.png" alt="The Sensor history screen after a read: the Stored history summary with 12 records, a 15 min interval, the time span and 2 channels, and the Temperature chart below it" width="320" />

A large buffer is transferred in several pages. The app reads them one after
another while you hold the phone still and shows the progress. If the read is
interrupted, the screen says how many records it has so far: hold the phone
steady and read again for the rest.

---

## What you get

The screen is a data view, not a raw dump:

- a **Stored history** summary: how many records, the report interval, the time
  span and the channels,
- **Charts** of the stored values, where you can hide a channel from its chart,
- **per-day tables** you can expand for the individual records.

A long history shows the newest records and says how many of the total it shows.

Timestamps depend on the device clock. If the device's time has been
synchronized, records carry absolute UTC timestamps; if it has not, they are
grouped as *Day 1*, *Day 2* and so on, relative to the read. Use
**Tools → Sync time** to set the clock, see [**Tools**](./tools.md).

<img className="app-screenshot" src="/img/hw-manager/hw-manager-sensor-history-table.png" alt="The expanded Day 1 table with 12 records: time relative to the read, temperature in °C and humidity in %" width="320" />

---

## History has to be enabled first

Records are only kept when history is turned on. Enable it and choose which
channels to store under **Configuration → History** (see
[**Configuration**](./configuration.md)) or over the shell with
`config history-enable` / `config history-channels`, described in
[**Sensor History (Developer Access)**](/sticker/developer-access/sensor-history).
The **History** section also estimates how much time fits in the buffer for the
channels and report interval you pick.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-configuration-history.png" alt="The History section of the configuration: Store-and-forward history switched on, Temperature and Humidity selected as recorded channels, and the estimate About 3 months of history" width="320" />

If the device has no records, the screen tells you which case it is:

- **History is off**: turn it on, then the device stores a record at every
  report. **Open history settings** takes you there.
- **No records yet**: history is on, and the first record appears after the
  next report. Updating the firmware or changing the recorded channels starts
  the buffer over.

To take a fresh reading instead of reading stored data, use
[**Sample sensor data**](./sample-data.md).
