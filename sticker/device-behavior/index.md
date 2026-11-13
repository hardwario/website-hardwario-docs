---
slug: /device-behavior
title: Device behavior
description: How STICKER behaves from power-up to daily operation, what its LED tells you and where to look when something does not work.
---
import StickerDeviceStates from '@site/src/components/StickerDeviceStates';

# Device behavior

This chapter explains what STICKER does in everyday situations and what you see when it happens. It describes STICKER firmware v2.0.0.

## Device states

The status LED shows what the device is doing. Most flashes are very short and repeat every 3 s, so watch the device for a few seconds.

<StickerDeviceStates />

## A normal day

With the default settings, a connected STICKER:

- joins the network at startup and again after a lost connection;
- sends its measurements every 15 min;
- sends device information and its key settings after every join and once a day;
- checks the radio link with every 5th report;
- sets its clock from the network after the join and then once a week;
- sends an alarm report about 10 s after an alarm starts or ends.

## Find the right page

| Situation | Page |
|---|---|
| The LED does something unexpected after you insert the batteries | [**Startup and initialization**](startup.md) |
| The device does not appear in the network server, or data stopped arriving | [**Network connection**](network-connection.md) |
| You want to know which messages to expect and how often | [**Messages and timing**](messages.md) |
| You sent a command and nothing changed | [**Downlink processing**](downlinks.md) |
| You need measurements from a period when the device was offline | [**History and counters**](history-and-counters.md) |
| You want to set up alarms | [**Alarms**](alarms.md) |
| A 1-Wire probe was disconnected or replaced | [**1-Wire probes**](one-wire.md) |
| You change settings with a phone | [**Configuration**](configuration.md) |
| You have a question about the batteries | [**Battery and power**](battery.md) |
| You decode the data in your own system | [**Payload and decoder**](payload.md) |
| You need the firmware version or an update | [**Firmware versions and updates**](firmware.md) |
| You start from a problem you see | [**Troubleshooting**](troubleshooting.md) |
