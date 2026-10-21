---
slug: hardware-description
title: Hardware Description
description: "STICKER is a compact IoT device built on the STM32WL System-on-Chip with an integrated LoRa radio and ARM Cortex-M4F core."
title_meta: "Hardware Description (STICKER)"
---
import Image from '@theme/IdealImage';

# Hardware Description

STICKER is a compact IoT device built on the **STM32WL System-on-Chip** with an integrated **LoRa radio** and ARM Cortex-M4F core.  
It is powered by two AA batteries, with battery voltage monitoring and efficient power management (boost converter and LDO).

The device includes **NFC memory and antenna** for simple configuration from a phone. Since firmware v2.0.0 the phone talks to the firmware through the NFC chip's mailbox, so the device must be powered while it is configured.

---

## Sensors & Peripherals

### Built-in Sensors

Depending on the specific assembly variant, STICKER includes:
- **Temperature & Humidity:** Sensirion SHT43 sensor for high-accuracy ambient measurement.
- **Light Intensity:** Texas Instruments OPT3001 ambient light sensor.
- **Atmospheric Pressure:** NXP MPL3115A2 pressure sensor.
- **PIR Motion:** Excelitas PYD1698 passive infrared motion sensor for presence detection (up to 5 m, ≥ 50°).
- **3-axis Accelerometer:** STMicroelectronics LIS2DH12 accelerometer for tilt, vibration, and orientation tracking.
- **Door Opening Detection:** Dual Allegro A1266 Hall-effect sensors.

### Physical Interfaces & External Connectivity

- **SWD Interface:** Physical SWD programming pads for firmware flashing and debugging using J-Link (`make flash`). Required for image flashing as the firmware deliberately omits a bootloader and over-the-air updates.
- **1-Wire Bus Master:** Dedicated 1-Wire interface supporting external digital temperature probes (e.g., Dallas DS18B20) and HARDWARIO Machine Probe sensors.
- **External Inputs A/B:** Two inputs, each configured as a **digital** input (industrial logic up to 30 V DC, for direct PLC or machine status integration), a **0–24 V analog** voltage input, or an **S0 pulse** counter compatible with standard S0 outputs from electricity, gas, and water meters. The mode is set with `cap-gpio-mode inputs` and `cap-gpio-input-a` / `cap-gpio-input-b` (`digital` / `analog` / `pulse`).

Device status is indicated by a **multi-color LED (R/G/Y)** (see [**LED Indication**](#led-indication) for details), and wireless communication is handled via an **internal 868/915 MHz antenna**.

---

## Block Diagram

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/block-diagram-sticker.png')} alt="STICKER block diagram: STM32WLE5CC LoRa SoC with sensors, NFC memory, 2x AA power chain, and status LED" />
      </div>
    </div>
    <div class="col col--24">
    </div>
  </div>
</div>
<br />

---

### NFC Configuration Architecture

![STICKER - NFC Configuration Architecture](images/sticker-nfc.drawio.png)

---

## LED Indication

STICKER has one status LED with three independently driven channels: **red**, **green** and **yellow**. The firmware also lights red and green together to produce **orange**, which it reserves for service modes. The LED is the only feedback the device gives locally, so these patterns are the fastest way to tell what a unit is doing before it appears on the network.

:::note
The patterns and timings below apply to **firmware v2.0.0**. Most status blinks are deliberately very short, 5 to 10 ms, to save battery. Expect a brief blip rather than a comfortable blink.
:::

### Boot sequence

Every power-up runs a fixed carousel that also confirms all three channels work:

| Step | Color | Duration |
|---|---|---|
| 1 | Red | 0.5 s |
| 2 | *(off)* | 0.25 s |
| 3 | Yellow | 0.5 s |
| 4 | *(off)* | 0.25 s |
| 5 | Green | 1.5 s |

The carousel takes about 3 seconds. It plays while the device keeps starting up, so it does not delay the boot, and an NFC tap cuts it short. If you see it unexpectedly, the device has rebooted.

### Low battery at power-up

At every power-up the firmware measures the battery before it starts anything else. If the voltage is **below 1.8 V**, the device does not start:

| Step | Pattern |
|---|---|
| 1 | The boot carousel |
| 2 | Red blink every 200 ms for 5 s |
| 3 | Red, solid, for 1 s |
| 4 | Off |

The device then stays switched off until the batteries are replaced (a power cycle) or it is reset with NRST, and runs the check again on the next power-up. This keeps a depleted cell from boot-looping on brownout.

### Status heartbeat

Once running, the device shows its status every **3 seconds**. Only one pattern is ever displayed. The firmware checks the conditions below in order and the **first match wins**, so a more serious condition always hides a less serious one:

| Priority | Device state | LED pattern |
|---|---|---|
| 1 | NFC exchange in progress | The LED is handed over to the [NFC patterns](#nfc-interaction) below |
| 2 | **Configuration could not be loaded**: stored settings are corrupt | Red and yellow alternating, twice, ~60 ms each |
| 3 | **Joining or rejoining** the network (LoRaWAN or P2P) | One yellow flash, then one red flash ~200 ms later |
| 4 | **Link degraded** (LoRaWAN or P2P): link checks are failing but the session is still alive | Two yellow flashes, ~200 ms apart |
| 5 | **Radio switched off**: `radio-mode off`, P2P without its keys, or an unsupported LoRaWAN region | One yellow flash |
| 6 | **An alarm is active** | One red flash |
| 7 | Normal operation | One green flash |

The three yellow states form a deliberate severity scale, so you can read the seriousness of a network problem from the flash count alone:

**radio off (1× yellow)** → **link degraded (2× yellow)** → **joining / rejoining (yellow + red)**

Priority 2 sits above all of them: a device flashing red/yellow has lost its stored identity and provisioning, and is running on factory defaults. That needs a technician, not a network check.

:::note
A device with no green flash is not necessarily faulty. It may simply be busy showing something with a higher priority. Note also that alarms are always evaluated even while a higher-priority pattern owns the LED. Only the red alarm flash is hidden; the alarm itself still triggers and still sends its uplink.
:::

Debug firmware builds replace the single green flash with a green flash followed by a yellow one, which is a quick way to tell a debug unit from a release unit.

### NFC interaction

While a phone is held against the device, the LED tracks the exchange step by step:

| What is happening | LED |
|---|---|
| Phone detected in the NFC field, no session started yet | Green, solid (at most 5 s) |
| Session running: commands being exchanged | Green, blinking (~90 ms) |
| Session ended, the last exchange succeeded | Green **and** yellow, 2 s |
| Session ended, the last exchange **failed**: request refused (wrong key or token, replayed or malformed request; nothing is written then) or its reply did not reach the phone | Red, 2 s |
| Exchange finished | Off |

The red result is worth knowing: without it, a failed exchange looks exactly like a successful one to whoever is holding the phone. A command that reboots the device shows its result first; the boot carousel follows.

### Input activation

On units with Hall sensors or external inputs configured, the LED confirms each input change. The **color order encodes the direction**, so an activation cannot be confused with a release:

| Event | Pattern |
|---|---|
| Input becomes active | Green, then orange, 50 ms each |
| Input returns to inactive | Orange, then green, 50 ms each |

Repeated changes are limited to one indication per 500 ms.

:::warning Commissioning aid only
This indication **switches itself off one hour after power-up**. The cutoff is measured from boot, not from the last event, because once a unit is installed the blinking is no longer wanted. If you need it back while testing, power-cycle the device.
:::

PIR and accelerometer are momentary sensors that only ever report an activation, so on those inputs you will only ever see the green-then-orange sequence.

### Calibration mode

| State | Pattern |
|---|---|
| Entering calibration | Five fast orange blinks, 100 ms on / 100 ms off |
| Calibration running | One orange flash every second |

Calibration is entered by holding a magnet to **both** Hall sensors within **30 minutes** of power-up. It runs for **120 minutes** and then the device reboots on its own. Orange is used for both states so calibration is never mistaken for one of the yellow network warnings.

### Deep sleep

When the device is put into deep sleep, all three channels are switched off. A completely dark LED on a sleeping device is expected and is not a fault.

### Testing the LED

The LED can be driven directly over the developer console with the `ats led` commands, useful for checking a suspect unit. See [**Diagnostics**](developer-access/diagnostics.md).

---

## Overview

#### STICKER Clime - Enclosure, Mainboard, and Battery Holder

![STICKER Clime](images/sticker-clime-overview.png)

#### STICKER Input - Enclosure, Mainboard, and Battery Holder

![STICKER Input](images/sticker-input-overview.png)

#### STICKER Motion - Enclosure, Mainboard, and Battery Holder

![STICKER Motion](images/sticker-motion-overview.png)

---

## Hardware Schematics

### Power

**[Download Power Schematic (PDF)](pathname:///sticker/hardware-diagrams/power.pdf)**
![STICKER - Power](images/power.png)

### Antenna

**[Download Antenna Schematic (PDF)](pathname:///sticker/hardware-diagrams/antenna.pdf)**
![STICKER - Antenna](images/antenna.png)

### MCU

**[Download MCU Schematic (PDF)](pathname:///sticker/hardware-diagrams/mcu.pdf)**
![STICKER - MCU](images/mcu.png)

### Sensors

**[Download Sensors Schematic (PDF)](pathname:///sticker/hardware-diagrams/sensors.pdf)**
![STICKER - Sensors](images/sensors.png)

### NFC

**[Download NFC Schematic (PDF)](pathname:///sticker/hardware-diagrams/nfc.pdf)**
![STICKER - NFC](images/nfc.png)

---

## Technical Specification

| **Category** | **Parameter** | **Value** |
|-------------------|---------------------------|------------------------------------|
| **Structure** | Enclosure material        | ABS                                |
|                   | Dimension                 | 91 × 36.5 × 33.3 mm                |
| **Power** | Nominal cell voltage      | 1.5 V                              |
|                   | Nominal battery capacity  | 3000 mAh                           |
|                   | Operating voltage range   | 1.8 V to 3.6 V (below 1.8 V at power-up the device stays off) |
|                   | Idle power consumption    | < 80 µA                            |
|                   | Peak power consumption    | < 100 mA                           |
| **Environment** | Operating temperature     | -30 °C to +70 °C                   |
|                   | Storage temperature       | -30 °C to +70 °C                   |
|                   | Enclosure protection      | IP30                               |
| **Sensors** | Integrated thermometer: measurement range   | -20 °C to +60 °C     |
|                   | Integrated thermometer: measurement accuracy| ±0.2 °C (0 °C to 65 °C) |
|                   | Integrated hygrometer: measurement range    | 0 % to 100 %           |
|                   | Integrated hygrometer: measurement accuracy | ±2 % (from 10 % to 90 %) |
|                   | PIR: detection range     | 5 m                                |
|                   | PIR: viewing angle       | ≥ 50°                              |

![STICKER - Catalog](images/sticker.png)