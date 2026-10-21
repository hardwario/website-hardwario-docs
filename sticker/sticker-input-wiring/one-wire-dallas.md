---
slug: one-wire-dallas
title: 1-Wire temperature probes (Dallas)
---

# 1-Wire temperature probes (Dallas)

STICKER Input supports standard **1-Wire (Dallas) temperature probes** (e.g. the DS18B20 family). The sensors connect to a single data wire, and thanks to the addressability of the 1-Wire bus, multiple probes can be wired to one data line at the same time. This interface is well suited to distributed temperature measurement over longer distances and in harsh conditions.

## Wiring

Connect the probe to input A or B and set DIP switch S1 to the 1-Wire position: switch **3** for input A or **6** for input B (see [STICKER Input Wiring](./index.md#dip-switch-s1-settings)).

## Configuration

Enable the 1-Wire bus with `config cap-w1-sensors true` and keep the input mode of the pin used by the bus at `none` (`cap-gpio-input-a` / `cap-gpio-input-b`).

## Slots and sensor types

STICKER keeps up to **four** 1-Wire sensors in slots 1–4. When the bus is scanned, a sensor that no slot claims is assigned to a free slot automatically, and the slot remembers its ROM and the sensor type it expects: `sensor1-type`…`sensor4-type`, where `2` is a Dallas thermometer and `3` is a [MACHINE PROBE](./machine-probe.md). The type can also be set in advance, before the probe is plugged in. The bus is scanned at boot only when at least one slot is set up (a stored ROM or a `sensorN-type`): on a new unit, set `sensorN-type` in advance, or bind the first probe with the `w1 enroll` shell command and save the settings.

- **Probe plugged in after power-up:** while a slot is waiting for its probe, the bus is checked 2 minutes after boot, then after another 5 and 10 minutes, then every 15 minutes. A probe that appears is bound to its slot without a reboot.
- **Wrong sensor type:** if the expected sensor is missing and a sensor of another type is on the bus, the slot raises a `sensor_mismatch` alarm. Until the right type is back, the slot's alarm rules are inactive and its values are `null`.
- **Missing sensor:** a probe that stops answering raises a no-data alarm.

A Dallas probe has one channel, `temperature` (°C). It arrives in telemetry in the `w1_sensors` list, for example `{"slot": 1, "type": 2, "type_name": "dallas", "values": {"temperature": 21.5}, "units": {"temperature": "degC"}}`, and it can be used in alarm rules and recorded in the history.
