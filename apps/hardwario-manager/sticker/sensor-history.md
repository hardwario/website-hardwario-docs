---
slug: sensor-history
title: Sensor history
---

# Read sensor history

STICKER can store measurements on the device (store-and-forward), so readings
taken while it was offline are not lost. Read those stored records back over NFC.

1. Open **HARDWARIO Manager** and go to **STICKER → Tools → Sensor history**.
2. Hold the phone against the STICKER and keep still.
3. The stored records are read in and shown for review.

Because an NFC tap exchanges one page at a time, a large buffer is read in
**pages** — keep tapping to pull the next page until everything is loaded.

---

## What you get

The screen is a data view, not a raw dump:

- a **summary** of what was read,
- **charts** of the stored values,
- **per-day tables** you can expand for the individual records.

Timestamps depend on the device clock. If the device's time has been
synchronised, records carry absolute UTC timestamps; if it has not, they are
shown relative to the read instead. Use **Tools → Sync time** to set the clock —
see [**Tools**](./tools.md).

---

## History has to be enabled first

Records are only kept when history is turned on. Enable it and choose which
channels to store under **Configuration → History** — see
[**Configuration**](./configuration.md) — or over the shell with
`config history-enable` / `config history-sensors`, described in
[**Sensor History (Developer Access)**](/sticker/developer-access/sensor-history).

:::info Firmware v1.4.0
Reading sensor history over NFC requires **STICKER firmware v1.4.0 or newer**.
:::

To take a fresh reading instead of reading stored data, use
[**Sample sensor data**](./sample-data.md).
