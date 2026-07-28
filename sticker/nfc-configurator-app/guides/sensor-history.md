---
slug: hm-guide-sensor-history
title: Sensor history
---

# Read sensor history

STICKER can store measurements on the device (store-and-forward), so readings taken while it was offline aren't lost. Read those stored records back over NFC.

1. Open **HARDWARIO Manager** and go to **STICKER → Tools → Sensor history**.
2. Hold the phone against the STICKER and keep still.
3. The stored records are read into a **table** for review.

Because an NFC tap exchanges one page at a time, a large buffer is read in **pages** — keep tapping to pull the next page until everything is loaded.

:::info History must be enabled first
Records are only kept when history is turned on. Enable it and pick which channels to store under **Configuration → History** (see the [**Configuration**](../config.md) guide), or over the shell with `config history-enable` / `config history-sensors` — see [**Sensor History (Developer Access)**](../../developer-access/sensor-history.md).
:::

To take a fresh reading instead of reading stored data, use [**Sample sensor data**](./sample-data.md).
