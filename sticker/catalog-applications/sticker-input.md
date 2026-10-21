---
slug: sticker-input
title: STICKER Input
---
import Image from '@theme/IdealImage';

# STICKER Input

**STICKER Input** is a compact, wireless LoRaWAN module for connecting external sensors and reading digital or analog signals. Powered by two AA batteries, it supports 1-Wire temperature probes and the MACHINE PROBE, and its two external inputs work as digital inputs, 0–24 V analog inputs or S0 pulse counters, making it a versatile tool for industrial and monitoring applications.

![STICKER Input](images/sticker-input-top.png)

## Quick Links

* [**Getting Started Guide**](/sticker/first-steps): Step-by-step setup guide.
* [**Buy STICKER Input**](https://www.hardwario.store/p/sticker-input): Purchase from our store.
* [**Ordering Codes**](/sticker/ordering-codes): List of components and part numbers.
* [**Hardware Description**](/sticker/hardware-description): Technical details and hardware overview.
* [**Official Product Page**](https://www.hardwario.com/products/sticker/): Features and overview.

## Typical use cases

#### Smart temperature monitoring
- Some manufacturing processes require temperature monitoring across extreme ranges that conventional electronics can’t handle. External sensors, like 1-Wire temperature probes, are essential in such cases. A single data line can connect up to four sensors, enabling detailed and scalable monitoring.

#### Digitizing legacy machines
- Digitizing older machines can be tricky, even if they still run reliably. Many offer a 24 V digital output, or you can add an inductive sensor near the output mechanism to detect each produced item. This enables simple piece counting via digital signals.

#### Smart open/close detection
- Door and window detection isn’t just for security: it’s also key for smart heating and cooling. Traditional systems can be costly due to strict certification standards. STICKER Input offers a simple and affordable alternative with a built-in magnetic field sensor or digital inputs for standard switches.

## Configuration and Wiring of External Inputs

Documentation → [**STICKER Input Wiring**](/sticker/sticker-input-wiring/sticker-input-wiring)

Here you can find information about STICKER input wiring, including DIP switch settings and supported modes such as 1-Wire sensors, dry contact inputs, S0 pulse counters and 0–24 V analog inputs.

## Example JSON Message

A periodic report as decoded by the v2.0.0 `ttn.js` decoder (fPort 2). In this example input A is a `digital` input with its pulse count, input B is an `analog` input (voltage in V) and 1-Wire slot 1 holds a Dallas DS18B20 probe. An input in `pulse` mode sends `input_a_count` / `input_b_count` only, its `*_is_active` value is always `false`.

<details>
<summary><b>Show JSON Example</b></summary>
<p>

```json
{
  "voltage": 3.01,
  "boot": false,
  "alarm_status": 0,
  "alarm_status_flags": [],
  "temperature": 23.65,
  "humidity": 54,
  "input_a_count": 120,
  "input_a_is_active": true,
  "input_b_voltage": 12.35,
  "w1_sensors": [
    {
      "slot": 1,
      "type": 2,
      "type_name": "dallas",
      "values": { "temperature": 21.5 },
      "units": { "temperature": "degC" }
    }
  ]
}
```

</p>
</details>

## Status LED

STICKER Input uses the standard status LED patterns described in [**LED Indication**](/sticker/hardware-description#led-indication). The boot carousel, the status heartbeat every 3 seconds, and the NFC and alarm patterns are identical across all STICKER applications.

Because this application is the one that actually uses the digital inputs and Hall sensors, it is where the **input activation** indication matters most. These inputs report both directions, so the color order tells you which edge occurred:

| Event | Pattern |
|---|---|
| Input becomes active (contact closes, magnet approaches) | Green, then orange |
| Input returns to inactive (contact opens, magnet leaves) | Orange, then green |

This makes it possible to verify wiring and DIP switch settings on site without a console or a network connection: trigger the input and watch the order of the two colors.

An input in `pulse` mode (S0) has no state, so each counted pulse shows only the green-then-orange sequence. An `analog` input does not blink at all.

:::warning
Input blinking is a commissioning aid and **stops one hour after power-up**. Counting and reporting continue as normal. Power-cycle the unit if you need the visual confirmation back while testing.
:::

## Changelog

### 2026-10-19 – v2.0.0

- `cap-gpio-mode inputs` together with `cap-gpio-input-a` / `cap-gpio-input-b` selects the mode of each external input: `digital`, `analog` or `pulse`; they replace the old `cap-input-a/-b` flags, which are not carried over by the upgrade
- `analog` measures 0–24 V on the input; the value can be sent in telemetry, recorded in the history and used in threshold alarms
- `pulse` is a pulse counter for S0 meter outputs (either polarity, 20 ms debounce)
- Each 1-Wire slot stores the sensor type it expects (`sensor1-type`…`sensor4-type`: `2` Dallas, `3` MACHINE PROBE); a different sensor in the slot raises a `sensor_mismatch` alarm
- A 1-Wire probe plugged in after power-up is found automatically: the bus is checked 2, 5, 10 and 15 minutes after boot, then every 15 minutes
- Every channel of a 1-Wire probe can be used in alarm rules and recorded in the history; a MACHINE PROBE with a failed accelerometer still measures temperature

### 2025-11-23 – v1.0.0

- Initial release: digital inputs, pulse counting, 1-Wire temperature probes, and analog measurement via LoRaWAN

:::info

For a complete overview of all platform changes, see the [**STICKER Changelog**](/sticker/changelog).

:::
