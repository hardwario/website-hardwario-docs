---
slug: messages
title: Messages and timing
description: Which messages STICKER sends after a join and in normal operation, how often it sends them and how it sets its clock.
---
import StickerTimeline from '@site/src/components/StickerTimeline';

# Messages and timing

This page shows which messages STICKER sends, in which order and how often. Use it to check whether what you see in your network server is expected.

<StickerTimeline variant="messages" />

## Message types

Every uplink (a message from the device to the network) has a port number, the fPort, that tells which kind of message it carries:

| Message | fPort | What it carries |
|---|---|---|
| **Telemetry** | 2 | The regular measurements, battery voltage and alarm state |
| **Alarm report** | 3 | Which alarms started or ended and when |
| **Info uplink** and **settings uplink** | 85 | Device information and key settings |
| **Command answers** | 85 | The answer to a command sent in a downlink (a message to the device), marked with the command's sequence number (`seq`) |

The fields of each message are described in [**Payload and decoder**](payload.md).

## After every join

After every join, that is at every startup and after every rejoin, STICKER introduces itself before it sends data. The order is always the same:

1. the **Info uplink**;
2. the **settings uplink**;
3. any **alarm reports** that waited while the device was offline;
4. the first **telemetry** report.

The sequence starts after a random delay of up to 30 s, so devices that restart together do not transmit at once. With ABP (no join), it follows every startup.

## Info and settings every 24 h

STICKER repeats the Info and settings uplinks every 24 h by default, so your application keeps a current copy even if a device runs for months without a restart. The repeat comes 21.6–24 h after the previous one, only while the device is connected. The announce interval (`interval-announce`, 1–168 h, `0` for off) changes the period.

<details>
<summary><b>What the Info and settings uplinks contain</b></summary>

| Uplink | Content |
|---|---|
| **Info** (decoded as `info`) | Firmware version, serial number, time since startup, current time (once the clock is set), battery voltage, reason for the last restart, active alarms, state of the 1-Wire slots and, after a firmware fault, details for HARDWARIO support |
| **Settings** (decoded as `config_dump`) | Report and sample interval, sensor history on or off, enabled sensors and inputs, detected 1-Wire sensor type in each slot |

To get them at any time, send `get_info` or `get_settings`; see [**Downlink commands**](../connectivity/downlink-commands.md).

</details>

## Regular reports

STICKER sends telemetry every report interval (`interval-report`, default 15 min, 60 s to 24 h), counted from startup. Each device adds its own fixed offset of up to 1 min and a random delay of up to 10 s, so that many devices do not transmit at once.

The sample interval (`interval-sample`) sets how often the sensors are read, the report interval how often the values are sent. By default (`0`) the sensors are read right before each report; a sample interval of 5–3600 s lets alarms react to every sample but uses more energy.

When an alarm starts or ends, STICKER also sends an alarm report and an extra telemetry report, both within about 10 s. These extra reports do not shift the regular timing and are not stored in the sensor history; see [**Alarms**](alarms.md).

## Time synchronization

STICKER's clock dates the sensor history and the alarm events. The device asks the network for the time after the join and then every 7 days, with a small request on a normal uplink, so you will not see a separate time message.

- To sync the clock now, send the `clock_sync` command. The device answers with an Info uplink once the time has arrived.
- Over NFC, HARDWARIO Manager can set the clock to the time of the phone.
- If your network server does not answer time requests, the clock stays unset and `clock_sync` gets no answer.
- The clock is lost when the batteries are removed. The device asks for the time again at the next join.

More detail: [**Real-time clock**](../developer-access/clock.md).
