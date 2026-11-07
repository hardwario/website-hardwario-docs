---
title: CHESTER Push FM
description: "CHESTER Push FM firmware: what it changes against the main CHESTER Push firmware to keep the LED of the last pressed button lit."
---

# CHESTER Push FM

**CHESTER Push FM** (Flip Mode) is the CHESTER Push firmware built for a different button LED behavior: the LED of the last pressed button stays lit. Everything this page does not mention works as described for [**CHESTER Push**](index.md).

## Differences from CHESTER Push

### Hardware

The hardware is the same as for the main firmware.

### Behavior

- The firmware reacts as soon as a button goes down, without waiting for its release, and does not tell a short press from a long press.
- The red LED of the pressed button lights up and stays lit until another button is pressed; the LED of the previous button turns off. The buzzer beeps once.

:::caution

This variant is not suitable for low-power operation as the constantly activated LED quickly discharges the battery.

:::

### Configuration Parameters

All parameters are the same.

### Data

Every press counts as a short press. In LTE reports, the `buttons` entry of the pressed button increases `count_click` and lists the press as a `clicked` event; `count_hold` stays `0` and no `held` event appears. In LoRaWAN messages, `press_count` grows, `hold_count` stays `0` and `hold_event` is always `false`. Every field, with its unit, range and resolution, is described on the catalog page under [**CHESTER Push FM**](../../catalog-applications/chester-push/index.md#data-chester-push-fm).

## Firmware Build

- **Firmware:** [hio-chester-push-fm:v4.0.1](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `001543e218a04ffdbf65082532202736`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736/hex), SHA256 `0c7a2286d945c1e12bf9b4f0620beff519a8ade36f98c1da33527d18fa568f5a`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736/bin), SHA256 `7bdd6299de06d490cc2a17f49a506061e2e802f4be8d4235631e1087df6af2cf`
- **Build from the SDK:** `west chester-update push --variant "CHESTER Push FM"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
