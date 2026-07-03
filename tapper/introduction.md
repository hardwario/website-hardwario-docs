---
slug: /
title: Introduction
---

import Image from '@theme/IdealImage';

# TAPPER

**TAPPER** is a secure NFC tag reader powered by a Raspberry Pi Zero 2 W and the PN532 module. It was designed to communicate over MQTT for systems requiring reliable tag verification.

## Quick Links

* [**Client Installation**](installation) – Install the TAPPER client on TAPPER.
* [**Hardware Description**](hardware) – Power connections, operating conditions specification.
* [**Client Usage**](usage) – Usage of the TAPPER Client.
* [**Security Enhancements**](security) – Tips for improved security.
* [**MQTT over TLS**](tls-setup) – Setup guide for MQTT over TLS.
* [**MQTT Specification**](api-spec) – MQTT API Specification.
* [**Changelog**](changelog) – Latest firmware and platform changes.

## Typical Use Cases

- Access control and secure entry verification
- Asset or equipment check-in/check-out tracking
- Attendance tracking for events or facilities
- Tamper-evident tag verification in secure environments

## Key Features

| Feature | Description |
|---|---|
| **NFC Tag Detection** | Verified with MIFARE Classic 1k tags. |
| **Secure MQTT Communication** | Reliable messaging with TLS support. |
| **Tamper Detection** | Mechanical switch detects enclosure tampering. |
| **Visual & Acoustic Feedback** | Integrated RGB LED and buzzer for status indication. |
