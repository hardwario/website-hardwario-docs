---
slug: origin-plus
title: "ORIGIN+"
description: Nexelec ORIGIN+ multi-sensor LoRaWAN fire detector with smoke, heat, and CO detection. NF and CE certified.
---

# Nexelec ORIGIN+

![Nexelec ORIGIN+](/img/smart-devices/nexelec-origin-plus.webp)

The **ORIGIN+** is a multi-sensor LoRaWAN fire detector from [Nexelec](https://nexelec.fr/), combining smoke, heat, and CO detection in a single certified device. It is designed for building fire safety monitoring with remote alarm management via LoRaWAN.

## Key Specifications

| Parameter | Value |
|---|---|
| Detection | Optical smoke (EN 14604), heat, CO |
| Connectivity | LoRaWAN Class A (EU868) |
| Battery | 10-year battery life (non-replaceable) |
| Alarm Output | Local buzzer + LoRaWAN uplink |
| Certifications | NF (French standard), CE, EN 14604 |
| Mounting | Ceiling-mount (magnetic or screw) |
| Dimensions | Compact round form factor |

## LoRaWAN Data

The ORIGIN+ sends uplinks on alarm events and periodic status reports containing:

- **Alarm status**: Smoke / heat / CO alarm state
- **Battery level**: Remaining battery percentage
- **Self-test result**: Periodic automatic self-test status
- **Temperature**: Ambient temperature reading

## HARDWARIO Integration

The ORIGIN+ integrates with HARDWARIO deployments via LoRaWAN:

1. **LoRaWAN Network Server**: Register the ORIGIN+ in [ChirpStack](/apps/chirpstack/index) or [The Things Stack](/apps/the-things-stack/index).
2. **HARDWARIO Cloud**: Forward decoded payloads to HARDWARIO Cloud for alarm management and reporting.
3. **Multi-building deployment**: Monitor ORIGIN+ devices across multiple floors or buildings from a single dashboard.

## Resources

- [Nexelec ORIGIN+ product page](https://nexelec.fr/)
- [Nexelec products in HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [ChirpStack integration](/apps/chirpstack/index)
- [The Things Stack integration](/apps/the-things-stack/index)
