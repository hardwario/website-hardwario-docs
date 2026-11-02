---
slug: battery
title: Battery and power
description: How STICKER uses its batteries, what drives consumption, how it reports the battery voltage and what happens at low battery or a battery swap.
---

# Battery and power

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

STICKER runs on two AA batteries. This page explains what uses their energy, how the device measures and reports the battery voltage, how it warns you before the batteries run out and what happens when you replace them.

## Batteries and battery life

- STICKER takes **2× AA** cells.
- STICKER runs **2+ years on 2× AA**. The real battery life depends on the configuration and on the radio conditions at the site, see What drives consumption below.
- The recommended cell type still needs confirmation **[ověřit]**. The [**Quick start guide**](../first-steps.md) allows 1.5 V alkaline or lithium cells, and the [**Hardware description**](../hardware-description.md) lists a nominal capacity of 3000 mAh.
- The specified operating range is 1.8–3.6 V. Below 1.8 V the device does not start, see Startup check below 1.8 V.

## What drives consumption

The device sleeps most of the time. Its batteries are used mainly by the radio and by anything that keeps the device awake. These factors make the biggest difference:

- **Report interval.** Each report (`interval-report`, default 900 s) wakes the device and transmits. A shorter interval means more transmissions.
- **Data rate.** Far from a gateway the device has to use a low data rate (DR): a slower, more robust radio setting with a higher spreading factor (SF). A report at SF12 (DR0 in EU868) needs many times the energy of a report at SF7 (DR5). With ADR (adaptive data rate) on, which is the default, the network moves the device to the fastest data rate that still works, so good gateway coverage saves energy.
- **Joins and rejoins.** A device that cannot reach the network keeps sending join requests, with pauses that grow from 1 min to 1 h. In the bench test each join request went out at SF12, the slowest setting. See [**Network connection**](network-connection.md).
- **LED while the device is not connected.** While the device joins or rejoins, its yellow and red heartbeat every 3 s uses about as much energy as the whole normal idle operation, so a unit without network coverage drains its batteries faster. With `radio-mode off` the device sends nothing and its yellow flash is very short.
- **Hall sensors.** On units with the two Hall sensors fitted, the sensors draw current all the time, because they cannot be switched off. When they are enabled, the device also checks them every 100 ms.
- **Sampling interval.** By default (`interval-sample` 0) the device reads its sensors once per report. A separate sampling interval adds wake-ups.
- **A connected J-Link.** A J-Link on the SWD pads keeps part of the processor powered and adds a constant load until you unplug it. Measure consumption only with the probe disconnected.
- **Debug firmware.** Debug firmware keeps the processor awake so that its console stays reachable, and it draws much more current. It goes into deep sleep after 2 h without console activity. Use release firmware in the field, see [**Firmware setup**](../developer-access/firmware-setup.md).

### Measured values

HARDWARIO measured the values below on bench units. They show where the energy goes and are not guaranteed figures. The whole table still needs confirmation **[ověřit]**, because the values come from two test campaigns with different firmware builds and settings:

- **Idle test:** radio off, bench supply 3.3 V.
- **Radio test:** LoRaWAN EU868, ADR on, a report every 120 s, bench supply 3.0 V.

A charge in mC (millicoulomb) is current multiplied by time: 1 mC is 1 mA for 1 s. After each transmission the device listens for an answer in two receive windows, which also costs energy.

| What | Measured | Test |
|---|---|---|
| Idle, no Hall sensors | about 74 µA average | Idle test |
| Idle, two Hall sensors fitted | about 119 µA average | Idle test |
| The two Hall sensors alone | about 20–28 µA, all the time | Idle test |
| Deepest sleep between wake-ups | about 3.7 µA | Idle test |
| One sensor reading | about 27 mA for about 45 ms | Idle test |
| Connected J-Link | adds about 60–100 µA | Idle test |
| Normal operation, joined | about 155.6 µA average | Radio test |
| Idle between transmissions, joined | about 67.7–76 µA | Radio test |
| Radio part of one report at SF7 (DR5) | about 1.7 mC, plus about 8–11 mC for the receive windows | Radio test |
| Radio part of one report at SF12 (DR0) | about 85 mC, plus about 8–11 mC for the receive windows | Radio test |
| One join request at SF12 | about 87 mC, plus about 12 mC for its receive windows | Radio test |
| Joining heartbeat, yellow and red every 3 s | raises the idle current from about 76 µA to about 149 µA, about 1.75 mAh per day | Radio test |
| Green heartbeat | about 6 µA on average | Other bench test |
| Switched off by the low-battery check | about 145 µA, cause not found yet | Other bench test |

## How the battery is measured and reported

The device measures the battery voltage each time it reads its sensors: once right after startup and then once per report, or at every `interval-sample` when you set a sampling interval. You find the value in the places below. An uplink is a message from the device to the network, and its fPort is the LoRaWAN port number that tells the receiver what the message contains.

| Where | What you get |
|---|---|
| Telemetry uplink on fPort 2, field `voltage` | In every report, in steps of 20 mV, decoded in volts, for example `3.36`. `null` means that no measurement exists yet. |
| **Info** uplink on fPort 85, field `battery` | The last measurement in mV. The field is missing when no measurement is available. |
| LoRaWAN DevStatusAns | The battery level in the answer to the status request of the network server (DevStatusReq): 1 at 2.4 V or less, rising evenly to 254 at 3.6 V or more. 255 means that no measurement is available. ChirpStack, for example, shows it as the battery of the device. |
| Sensor history | The channel `battery-voltage`, stored in mV and decoded in volts, if you add it to `history-channels`. See [**Sensor history**](../developer-access/sensor-history.md). |
| HARDWARIO Manager | **Battery** in [**Device info**](/apps/hardwario-manager/sticker/device-info), read over NFC. |

Use the telemetry `voltage` to follow the battery over time: it comes with every report, while the low-battery alarm only marks the moment when the voltage crosses the threshold.

:::note Firmware v1.4.x
Firmware v1.4.x missed a DevStatusReq that arrives together with an ADR command (LinkADRReq), which is how ChirpStack sends it, so ChirpStack showed no battery level for the device.
:::

## Low-battery alarm

While the device runs, it warns you before the batteries are empty. When the measured voltage drops below `battery-level` (default 2400 mV, range 1000–3600 mV), the device raises a low-battery alarm:

- It sends an alarm uplink on fPort 3 with the channel `battery-voltage`, the type `low` and the measured voltage. Like other alarms, it goes out at the end of the `alarm-limit` window, 10 s by default. The alarm is built in and is not one of the 16 alarm rules, so the decoded event has no rule number (`rule` is `null`).
- It sends a telemetry report within about 10 s.
- The status LED adds a red flash every 3 s, unless a network pattern has priority.
- The **Info** reports the status flag `alarm_low_battery` and lists the alarm among the active alarms.

The alarm clears when the voltage rises more than 0.3 V above the threshold, so above 2.7 V at the default. The device then sends a second alarm uplink with the event `deactivate`. The 0.3 V gap keeps the alarm from switching on and off while the voltage hovers around the threshold.

The device compares the latest measurement with the threshold every 3 s, so in practice the alarm follows the measurement schedule described above. Alarm states are held only in memory: after a battery swap the device starts without the alarm and sends no `deactivate` event. The new voltage shows in the next telemetry report and **Info**.

Battery voltage does not fall evenly, especially with lithium cells, so the threshold is configurable. The default leaves a wide margin above the voltage at which the device stops working. Change it with HARDWARIO Manager over NFC, with a `set_param` downlink (a command from the network to the device) or with `config battery-level` in the console. The new value applies after a save, which restarts the device, see [**Configuration**](../developer-access/configuration.md). How alarms are collected and sent is described in [**Alarms**](alarms.md) and [**Alarm rules**](../developer-access/alarm-rules.md).

<details>
<summary><b>Decoded low-battery alarm (fPort 3)</b></summary>

Decoded with the firmware v2.0.0 `ttn.js`. `value` is the measured battery voltage in volts, and `time` is a Unix time in seconds.

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "battery-voltage",
      "rule": null,
      "event": "activate",
      "type": "low",
      "value": 2.15,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

</details>

:::note Firmware v1.4.x
Firmware v1.4.x sends this alarm in an older format: its decoder shows it with slot 254, the `source` `battery` and the `quantity` `voltage` instead of the channel `battery-voltage`.
:::

## Startup check below 1.8 V

The low-battery alarm warns while the device runs. A second, independent check runs at every startup: below 1.8 V the device plays the boot light sequence, blinks red for 5 s, lights red for 1 s and switches itself off. Only a reset through the NRST pin or a power cycle, such as new batteries, wakes it again. The full sequence is in [**Startup and initialization**](startup.md).

- **The check runs only at startup.** A running device keeps working below 1.8 V. On the bench with firmware v1.4, the radio kept working down to about 1.30–1.35 V **[ověřit]**. Below about 1.3 V the device can stop without a clean restart and recovers only after a power cycle **[ověřit]**.
- **Switched off still draws current.** In this state the device draws about 145 µA, and the cause has not been found yet **[ověřit]**. The batteries keep discharging, so replace them soon.
- **Test without a J-Link.** A connected J-Link powers the processor through the SWD pins and hides a low battery, so test low-battery behavior with the probe disconnected **[ověřit]**.

:::note Firmware v1.4.x
Firmware v1.4.x has no battery check at startup. With a nearly empty battery the device can restart over and over until you replace the batteries.
:::

## Replacing the batteries

When you remove the batteries, the device loses power at once. When you insert new ones, it goes through a normal startup: the boot light sequence, the battery check and the radio join. Once joined, it sends the **Info**, the **settings-info** and the first telemetry report. See [**Startup and initialization**](startup.md).

| What | After the swap |
|---|---|
| Configuration and keys | Kept, because they are stored in flash |
| Hall and input counter totals | Kept. Pulses counted since the last save are lost, at most one report interval at the default settings |
| Sensor history | Kept. At most the last one or two records, not yet written to flash, are lost |
| Clock | Lost. The device asks the network for the time after the join, or you set it over NFC with **Sync time** in [**Tools**](/apps/hardwario-manager/sticker/tools) of HARDWARIO Manager. History records taken before that get their correct time once the clock is set |
| Network session | LoRaWAN: a new join. The device keeps its join counter (DevNonce), so the network accepts the new join. LoRa P2P: the pairing is kept |
| Active alarms | Cleared. Conditions that still apply are raised again |
| PIR and accelerometer motion counts | Start again from 0 |
| Uplinks waiting to be sent | Lost |

A unit that went silent because its battery fell too low recovers with new batteries, because the swap is a power cycle. The counters, the history and the clock are described in [**History and counters**](history-and-counters.md), and the uplinks after the join in [**Messages and timing**](messages.md).
