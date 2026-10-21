---
slug: s0-interface
title: S0 interface (pulse output)
---

# S0 interface (pulse output)

The **S0 interface** is a standardized pulse output used by many **energy and utility meters**: electricity meters, gas meters, water meters and heat meters. Each pulse corresponds to a defined amount of consumed energy or medium, and STICKER Input counts these pulses, enabling remote consumption readout over the LoRaWAN network.

## Wiring

Connect the S0 output of the meter to input A or B as a dry contact: DIP switch S1 positions **2+4** for input A or **5+7** for input B (see [STICKER Input Wiring](./index.md#dip-switch-s1-settings)).

## Configuration

Firmware v2.0.0 and later counts S0 pulses with the `pulse` input mode:

```
config cap-gpio-mode inputs
config cap-gpio-input-a pulse
```

Use `cap-gpio-input-b pulse` for input B.

## How pulses are counted

- S0 pulses are at least 30 ms long, so a `pulse` input counts them in an interrupt instead of the regular 100 ms input poll.
- Either polarity works: the level of the input at start-up is taken as the idle level, and every move away from it counts as one pulse, whether the meter pulls the line low or drives it high.
- An edge counts only when the input was stable for 20 ms before it, so contact bounce counts once.
- A `pulse` input always counts: the `input-a-counter` / `input-b-counter` setting is ignored.
- A `pulse` input has no state: no state alarm is raised and `input_a_is_active` / `input_b_is_active` stays `false`.

The total arrives in telemetry as `input_a_count` / `input_b_count`. The counter channel (`input-a-count` / `input-b-count`) can also be recorded in the history and used in a RATE alarm rule, for example *100 pulses within 15 seconds* (`hi 100 dwell 15`).

:::warning Known limitation

The pulse counter is not tested on hardware yet in firmware v2.0.0 (pulse timing and bounce in both polarities).

:::
