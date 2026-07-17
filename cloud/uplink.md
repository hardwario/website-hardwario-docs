---
slug: uplink
title: Uplink
---

# Uplink

An **uplink** is a message sent **from the device to the Cloud** — the counterpart to a
[**downlink**](/cloud/downlink). Uplinks carry the data a CHESTER reports: sensor measurements, along
with status, session, and codec information.

## Reporting Schedule

A device reports on a schedule set by its configuration:

- **`interval-sample`** — how often the device samples its sensors
- **`interval-aggreg`** — how often those samples are aggregated
- **`interval-report`** — how often the aggregated data is sent to the Cloud as an uplink

You can change these remotely with a [**Config downlink**](/cloud/downlink#config).

## Payload and Decoding

To save power and airtime, a device encodes its data compactly (**CBOR**) using its **codec**. The
Cloud decodes it into readable JSON with the matching decoder, which the device uploads automatically
whenever its codec changes. The decoded JSON is what you see and inspect in the device's
[**Messages**](/cloud/messages).

## Message Types

Uplink messages have the direction **up**. For the full list of message types (Data, Session, Config,
Encoder, Decoder, …) and how to browse and filter them, see the [**Messages**](/cloud/messages) page.
