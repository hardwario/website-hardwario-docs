---
slug: troubleshooting
title: Troubleshooting
description: Common situations with STICKER, what usually causes them and what to do.
---
import LedPattern from '@site/src/components/LedPattern';

# Troubleshooting

Start from what you see. Each answer names the usual cause and what to do, and links to the page with more detail.

## Connection and data

### The device sends nothing after you insert the batteries

Watch the LED for 10 s after the boot sequence ends.

- <LedPattern pattern="yellow" /> **One short yellow flash every 3 s:** the radio is off. The device measures but sends nothing. Switch the radio on in HARDWARIO Manager and save; the device restarts and joins.
- <LedPattern pattern="yellow red" /> **Yellow and red every 3 s:** the device tries to join but gets no answer. Check that the device is registered in the network server with the right keys and region, that a gateway is in range and, for US915 and AU915, that the gateway listens on the sub-band of the device (`lrw-sub-band`, default 2). Join attempts slow down to once an hour, so after a fix restart the device to join at once.
- **No light at all:** the batteries are flat or inserted the wrong way, or the battery was too low at startup and the device switched itself off. Insert fresh batteries.

More: [**Startup and initialization**](startup.md), [**Network connection**](network-connection.md).

### The boot sequence repeats about once a minute

A part of the device failed to start, so it restarts every 60 s and sends nothing. Return the device for service.

### Data arrived for a while and then stopped

The device most likely lost the radio link. It notices this through regular link checks, shows **Weak signal** (<LedPattern pattern="yellow yellow" />) and tries a more robust data rate. If that does not help, an OTAA device joins the network again, about 4–5 h after the link was lost; an ABP device stays in Weak signal. Check the gateway and its internet connection first. Measurements taken while the device was offline are not sent later on their own; if sensor history is on, you can read them out afterwards.

More: [**Network connection**](network-connection.md), [**History and counters**](history-and-counters.md).

### The network server rejects the join requests

After a factory reset or a vendor reset, the device counts its join requests from zero again, and a network server that remembers the values it has already seen refuses the join. In the network server, clear the join counter values (nonces) that it stored for the device. Both resets also erase the network keys, so write them again first.

### Can STICKER use a private LoRaWAN network?

Yes, any LoRaWAN 1.0.x network server works, including your own ChirpStack. The **private network** setting (`lrw-network`) only changes the sync word, a radio marker that gateways listen for. Most gateways use the public one, so keep the default unless your gateways are set to private.

### Can the report interval be one minute?

Yes, the shortest report interval is 60 s. The batteries run down sooner, and in the EU868 band the radio may transmit only for a limited time per hour, so far from the gateway some reports may be delayed or skipped.

## Battery

### One device drains its batteries much faster than others

Compare it with a device that works well:

1. **Radio state:** a device that keeps joining or shows Weak signal transmits much more.
2. **Distance to the gateway:** a far device sends at a slow data rate, and each report then costs many times more energy.
3. **Report and sample interval:** shorter intervals mean more work.
4. **Hardware variant:** variants with Hall sensors draw more current all the time.

If none of these explains it, return the device for service.

More: [**Battery and power**](battery.md).

## Settings and commands

### A changed setting did not take effect

Most settings apply only after you save them, and saving restarts the device. Network settings, including the radio mode, can be changed only over NFC, never by a downlink. Alarm rules are the exception: they apply at once but are lost at the next restart unless saved.

More: [**Configuration**](configuration.md).

### A downlink is answered with an error

The answer carries an error code that gives the reason, for example a setting that cannot be changed over the radio or a value out of range. The table of error codes is on [**Downlink processing**](downlinks.md).

### The phone cannot read the device over NFC

The device must have working batteries. Hold the phone on the device during the whole exchange and use the latest HARDWARIO Manager.

## Sensor values

### The decoded data shows `null`

The sensor is switched on but has no valid reading: a probe is disconnected or a sensor failed. If a value is missing completely, that sensor is switched off in the settings.

### A replaced 1-Wire probe shows no values

The device never moves a new probe into the old probe's place by itself. Follow the replacement steps on [**1-Wire probes**](one-wire.md).

### Counters went back to zero

Motion counts from the PIR sensor and the accelerometer start from zero after every restart. Hall and input counters are kept across restarts and battery changes and are cleared only by a counter reset, a factory reset or a vendor reset.

More: [**History and counters**](history-and-counters.md).

### An alarm report is missing

Alarm reports are not repeated by default, so a lost uplink means a lost report. The alarm state still arrives with every telemetry report. Switch on confirmed alarms if you need every report, and make sure the alarm rules were saved.

More: [**Alarms**](alarms.md).

## Time and version

### History records have no time

The clock stops when the batteries are removed and is set again from the network after the next join. Records taken in between get their time once the clock is set; records from a startup that never got the time stay without it.

### Which firmware version runs on the device?

The Info uplink contains it, and HARDWARIO Manager shows it in the device information. See [**Firmware versions and updates**](firmware.md).
