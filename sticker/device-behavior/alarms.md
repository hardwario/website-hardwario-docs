---
slug: alarms
title: Alarms
description: Which alarms STICKER has, how the three kinds of alarm rules work and what you get when an alarm starts or ends.
---
import LedPattern from '@site/src/components/LedPattern';

# Alarms

This page explains the built-in alarms, the three kinds of alarm rules and what you get when an alarm starts or ends.

## Built-in alarms and alarm rules

Three alarms work without any setup:

| Built-in alarm | Starts when | Ends when |
|---|---|---|
| Low battery | The battery voltage drops below the low-battery threshold (`battery-level`, default 2.4 V) | The voltage rises 0.3 V above the threshold |
| No data | A switched-on sensor or a 1-Wire probe stops delivering values | Values arrive again |
| Wrong 1-Wire probe | The probe of a 1-Wire slot is missing and a probe of another type is connected that no free slot can take, see [**1-Wire probes**](one-wire.md) | The right probe is back or the slot is set up again |

You can also create up to 16 alarm rules. Each rule watches one value of the STICKER board or of a 1-Wire probe. Several rules can watch the same value, for example a warning and a critical level. A rule stays inactive while its sensor or input is off.

## Three kinds of rules

### Threshold rules

A threshold rule watches a measured value such as temperature, humidity or an input voltage. The alarm starts when a reading leaves the range between the low and the high limit. It ends only when the reading is back inside by more than the hysteresis, so a value hovering at a limit does not start and end the alarm again and again.

Example: room temperature 5–30 °C with a hysteresis of 1 °C.

| Reading | What happens |
|---|---|
| 30.4 °C | High alarm starts |
| 29.5 °C | Alarm continues, still above 29 °C |
| 28.9 °C | High alarm ends |
| 4.6 °C | Low alarm starts |
| 6.2 °C | Low alarm ends, above 6 °C |

By default STICKER reads its sensors once per report interval (`interval-report`, default 15 min), so a threshold alarm can start up to 15 min late. To react faster, set a shorter sample interval (`interval-sample`, 5–3600 s).

### State rules

A state rule watches something that is on or off: a Hall switch, a digital input, PIR or accelerometer motion or the tilt alert of a MACHINE PROBE. You choose the state that raises the alarm and how long it must hold, up to 3600 s.

Example: a door contact on input A may open briefly. With a hold time of 5 s, the alarm starts once input A has been active for 5 s and ends as soon as the input is inactive again. If it becomes inactive sooner, nothing is sent.

Other variants fire once on a change or watch for motion or stillness, see [**Alarm rules**](../developer-access/alarm-rules.md).

### Rate rules

A rate rule watches a counter, such as a Hall switch, input, PIR or accelerometer count. You choose how many counts start the alarm and the length of the counting window, up to 3600 s.

Example: a flow meter on input A must not deliver 100 pulses within 15 s. The alarm starts as soon as 100 pulses are counted in one window, checked every 3 s. It stays one alarm while each following window reaches 100 pulses and ends after the first window with fewer.

## When an alarm starts or ends

- **Alarm report:** STICKER collects alarm changes during a collection time (`alarm-limit`, default 10 s) after the first change and sends them in one alarm report, the message listing alarms that started or ended.
- **Extra telemetry:** the first change also triggers a telemetry report (the regular measurement message) with the current values, within 10 s.
- **Alarm status:** every telemetry report carries the alarm status, so your backend learns the state even when an alarm report is lost.
- <LedPattern pattern="red" /> **LED:** a very short red flash every 3 s while any alarm is active and the device is Connected.
- **Buzzer:** on the buzzer variant, the buzzer mode (`alarm-buzzer-mode`, default off) plays a short melody when an alarm starts, once or repeated until the last alarm ends.

## Reliability

- **No repeats by default:** a lost alarm report is not sent again. With confirmed alarms switched on (`radio-alarm-ack`, default off), the network confirms each alarm report and STICKER repeats an unconfirmed one up to 3 times.
- **Offline:** without a connection, STICKER holds the alarm report, collects up to 16 changes and sends them right after it joins the network again.
- **After a restart:** STICKER starts without active alarms. Conditions that still hold, such as a temperature out of range, are reported again once the device is connected. Close the open alarms in your backend when the first telemetry report after a restart carries `boot: true`.

## Setting up rules

- **HARDWARIO Manager:** **Configuration → Alarms**, see [**Alarm rules**](/apps/hardwario-manager/sticker/alarms) in the HARDWARIO Manager guide.
- **Downlink** (a message from the network to the device): the `set_param` command with the rules `alarm_0` to `alarm_15`, built for you by the [**Downlink commands generator**](../connectivity/downlink-commands-generator.mdx).
- **Shell:** the `alarm` commands, see [**Alarm rules**](../developer-access/alarm-rules.md).

A rule sent over a downlink or NFC works at once, but it survives a restart only after you save it. Saving restarts the device. Rules set in the shell are saved at once.

<details>
<summary><b>The examples as rule commands</b></summary>

The three examples in the shell, as rules 0 to 2 on the STICKER board (`mb`):

```text
alarm set 0 mb temperature lo 5 hi 30 dwell 1
alarm set 1 mb input-a-state from 1 to 1 dwell 5
alarm set 2 mb input-a-count hi 100 dwell 15
```

`dwell` is the hysteresis, the hold time or the counting window, depending on the kind of rule.

Over a downlink, the temperature rule is the 18-byte value `0300000100000000a0400000f0410000803f`. As JSON on fPort 85 (the LoRaWAN port for commands), written as rule 0 and saved:

```json
{ "seq": 1, "command": "set_param", "set_param": { "alarms": { "alarm_0": "0300000100000000a0400000f0410000803f" }, "save": true } }
```

To write several rules, send them without `save` and set it on the last one only. If the device rejects one rule, it applies nothing from that message.

</details>
