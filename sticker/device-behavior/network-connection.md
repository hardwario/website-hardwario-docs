---
slug: network-connection
title: Network connection
description: How STICKER joins the network, notices a lost radio link and recovers from it.
---
import LedPattern from '@site/src/components/LedPattern';
import StickerTimeline from '@site/src/components/StickerTimeline';

# Network connection

This page explains how STICKER joins the network and what it does when the link is lost. Read it when a device does not appear in your network server or its data stopped arriving.

## Radio mode

The radio mode (`radio-mode`) decides whether and how STICKER sends data:

| Radio mode | What the device does |
|---|---|
| **Off** | Measures and evaluates alarms but sends nothing. |
| **LoRaWAN** | Sends over a LoRaWAN network in the region you set: EU868, US915, AU915 or AS923. |
| **LoRa P2P** | Sends directly to a ProXimos Hub, without a LoRaWAN network. |

Set the radio mode over NFC in [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration). It takes effect after you save, which restarts the device. A downlink (a message from the network to the device) cannot change it or any other network setting.

## Joining the network

With **OTAA** (over-the-air activation: the device gets its session keys in a join), STICKER joins at every startup, even if it was connected right before. If the network does not answer, the device tries again after about 1 min, then with a pause that doubles every time, up to 1 h, to save the batteries. After you fix the cause, restart the device to join at once.

With **ABP** (activation by personalization), the session keys are stored in the device, so it needs no join.

## Connection states

The status LED shows the connection state every 3 s:

| State | Status LED | What it means |
|---|---|---|
| **Joining** | <LedPattern pattern="yellow red" /> yellow, then red | Joining or waiting for the next attempt |
| **Connected** | <LedPattern pattern="green" /> very short green | On the network and the link checks pass |
| **Weak signal** | <LedPattern pattern="yellow yellow" /> two yellow | Still on the network, but the link checks fail |
| **Radio off** | <LedPattern pattern="yellow" /> very short yellow | The radio mode is off or the radio cannot start with the saved settings |

## When the link is lost

The network does not confirm STICKER's reports, so the device checks the link itself: every 5th report carries a link check, which the network answers if a gateway heard it. Any downlink also proves that the link works.

<StickerTimeline variant="link-loss" />

**Weak signal.** After 3 failed checks in a row, the device switches to Weak signal. It now adds a link check to every report. With each failed check, it steps down to a slower data rate (how fast a message goes on air) at full transmit power. A slower data rate reaches farther, so the device often gets through again. One successful check or any downlink brings it back to Connected.

**Rejoin.** If even the slowest data rate does not help, an OTAA device tries to join again after about 1 min, then with doubling pauses up to 1 h. With the default settings this starts about 4–5 h after the link was lost. Once the network is back, the next attempt can be up to about 1 h away; restart the device to join at once.

An ABP device cannot rejoin. It stays in Weak signal and keeps sending. Its data arrives as soon as the network is back.

<details>
<summary><b>Link check settings and state names</b></summary>

| Setting | Default | Meaning |
|---|---|---|
| Link check interval (`radio-link-check-interval`) | 5 | Every 5th report and the first report after a join carry a link check. `0` turns off link checks, which also disables Weak signal and the rejoin that follows it. |
| Failed checks before a rejoin (`radio-link-check-fail-rejoin`) | 5 | Failed checks in Weak signal before an OTAA device rejoins; it rejoins only when the slowest data rate has also been reached |
| Failed checks before Weak signal | 3 | Fixed |

The answer to the `get_radio_state` command (see [**Downlink commands**](../connectivity/downlink-commands.md)) shows the state as `healthy` (Connected), `warning` (Weak signal), `joining` (Joining), `reconnect` (waiting for the next join attempt, LED as Joining) or `disabled` (Radio off).

</details>

## Data that could not be sent

While the device is not connected, it keeps measuring but sends nothing.

- **Measurements** that did not arrive are not sent again on their own. If sensor history (`history-enable`, off by default) is on, you can read the missing values out afterwards; see [**History and counters**](history-and-counters.md).
- **Alarm reports** wait and are sent after the next join. A restart clears the waiting reports, but alarms that are still active are reported again.

In the EU868 band a message can also be delayed by the legal airtime limit of 1 % (36 s per hour); regular reports at the default interval stay well below it.

## LoRa P2P

In LoRa P2P mode, STICKER sends to a ProXimos Hub through a HARDWARIO FIBER modem instead of a LoRaWAN network. States, LED patterns and link checks work as on LoRaWAN, but every report is acknowledged and a restart keeps the pairing with the Hub. The data rate is fixed, so Weak signal cannot step down before the device pairs again. Setup: [**LoRa P2P mode**](../connectivity/lora-p2p.md).
