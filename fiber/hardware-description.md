---
slug: hardware-description
title: Hardware Description
---
import Image from '@theme/IdealImage';

# Hardware Description

## Processing Platform

**FIBER** is built on the **Raspberry Pi Compute Module 4 (CM4)**, providing a reliable ARM-based processing platform with extensive Linux ecosystem support. This enables long-term maintenance, broad application compatibility, and flexibility in custom firmware development.

Key characteristics:

* Quad-core Cortex-A72 (ARMv8, 64-bit) @ 1.8 GHz
* Memory options: 1/2/4/8 GB RAM, and 8/16/32 GB eMMC storage
* Industrial temperature options
* Compatible with upstream Linux packages and standard development workflows

## Sensor Interfaces

### 1-Wire Inputs

* **Eight fully isolated, independent 1-Wire ports**
* Designed for digital temperature probes and similar 1-Wire sensors
* Per-channel LEDs indicate input activity and sensor status

### 868 MHz ISM Radio

* Integrated long-range ISM radio (LoRa-capable) for communication with wireless sensors
* Compatibility with **HARDWARIO STICKER** sensor nodes (temperature, humidity, motion, etc.)
* Suitable for distributed sensing across buildings or facilities

### Display & Local Interaction

* **Backlit graphic LCD**
* Physical buttons for basic navigation and device control
* Suitable for viewing instantaneous sensor values, system states, or diagnostics

## Acoustic & Visual Signaling

* **Piezo buzzer** for alerts or diagnostic feedback
* **Status LEDs** for each 1-Wire input, providing immediate hardware-level insight

## Power System

* Supports **Power-over-Ethernet (PoE)**
* Integrated **3.6 V Li-Ion backup battery**
* Ensures stable operation during power interruptions

## Connectivity

**FIBER** provides multiple communication interfaces suitable for a wide range of installations:

* **Ethernet (LAN)**
  Reliable wired networking for industrial environments.

* **WiFi**
  For wireless deployments without physical cabling.

* **Bluetooth Low Energy (BLE)**
  Useful for commissioning, diagnostics, or peripheral connectivity.

* **LTE (optional)**
  LTE Cat 4 module available for remote or mobile deployments.

* **868 MHz ISM Radio**
  Enables communication with remote STICKER-based wireless sensors.

These interfaces allow **FIBER** to integrate into both existing industrial networks and modern distributed IoT architectures.

## User Interface

**FIBER** offers several local interfaces designed for clarity and quick diagnostics:

### LCD Display

* Backlit graphical display
* Shows real-time sensor values and device diagnostics

### Buttons

* Navigation and confirmation controls
* Suitable for on-site interactions without external tools

### Status LEDs

* One LED per 1-Wire port
* Visual feedback for sensor presence, activity, and errors

### Acoustic Buzzer

* Provides audible alerts
* Useful for alarms or feedback during configuration

## Technical Specifications

| Category                  | Specification                             |
| ------------------------- | ----------------------------------------- |
| **Power**                 | PoE with integrated Li-Ion backup battery |
| **DC Input**              | 36 V to 57 V (IEEE 802.3af compliant)     |
| **Backup Battery**        | Nominal voltage 3.6 V                     |
| **Sensor Inputs**         | 8× independent 1-Wire ports               |
| **Wireless Radio**        | 868 MHz ISM band                          |
| **Connectivity**          | Ethernet, WiFi, BLE, optional LTE         |
| **Dimensions**            | 175 × 120 × 35 mm                         |
| **Operating Temperature** | –20 °C to +60 °C                          |
| **Storage Temperature**   | –20 °C to +60 °C                          |
