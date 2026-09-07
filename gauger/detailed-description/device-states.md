---
slug: device-states
title: Device States
---

# Device States

Through its runtime, the device can get into multiple states, each of which is indicated by the green status LED.

The first state, entered right after booting the device, is initialization. In this state, all the device subsystems are being sequentially initialized. In the init state, the LED is constantly on.

After successfull initialization, the device will enter the running state. This state is indicated by occasional short blinks of the status LED. Additionally, while the device is in this state, it will broadcast info about itself (see [Device Discovery](../operation-instructions/device-discovery.md)).

If the device encounters an error, most likely during initialization (there are also other sources of errors like failing to connect to Wi-Fi), it will enter the error state. In this state, the LED will blink in fixed intervals of 500 ms. The error is logged every second and is included in the broadcast messages. If enabled in the firmware build, the device will automatically reboot after being in the error state for 60 seconds. It is possible to trigger a firmware rollback from this state (see [Firmware Management](../operation-instructions/firmware-management.md)).

Table of LED behavior per state:

| LED State      | Device State   |
| :------------- | :------------- |
| on             | initialization |
| short blinks   | running        |
| rapid blinking | error          |
