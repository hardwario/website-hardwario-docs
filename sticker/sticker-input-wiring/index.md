---
slug: sticker-input-wiring
title: STICKER Input Wiring
sidebar_label: Wiring
description: "Wiring guide for STICKER Input: DIP switch settings and connections for 1-Wire, pulse, contact and analog inputs, with diagrams."
---
import Image from '@theme/IdealImage';

# STICKER Input Wiring

## DIP Switch Legend

- |🟥←| **ON**: DIP switch in the ON position (red)
- |→⬛| **OFF**: DIP switch in the OFF position (black)

## DIP Switch S1 Settings

The external connector reaches the inputs or the 1-Wire bus only through the 8-way DIP switch **S1** of STICKER Input. Switches 1–4 belong to input **A** (`DQ1`), switches 5–8 to input **B** (`DQ2`):

| S1 switch (A / B) | Connects |
|:-:|---|
| 1 / 8 | 1 kΩ shunt to GND |
| 2 / 7 | 33 kΩ series resistor from the connector to the input |
| 3 / 6 | Connector to the 1-Wire bus |
| 4 / 5 | 560 kΩ pull-up to VDD |

Set the switch and the firmware configuration together. Turn ON only the switches listed for the input, keep the rest OFF:

| Use of the input | Configuration | S1 ON for A / B |
|---|---|---|
| 1-Wire (Dallas, MACHINE PROBE) | `cap-w1-sensors true`, `cap-gpio-input-x none` | 3 / 6 |
| Analog 0–24 V | `cap-gpio-mode inputs`, `cap-gpio-input-x analog` | 1+2 / 7+8 |
| Dry contact or S0 pulse output | `cap-gpio-mode inputs`, `cap-gpio-input-x digital` or `pulse` | 2+4 / 5+7 |

`cap-gpio-input-x` stands for `cap-gpio-input-a` or `cap-gpio-input-b`.

:::warning

The firmware cannot read the DIP switch. If an input is set to `analog` while its switch is in the 1-Wire position, the input floats and the readings are meaningless: the value is reported as `null` and a no-data alarm is raised. On a unit that uses only 1-Wire, set `cap-gpio-mode none`.

:::

## 1-Wire Input
Wiring for 1-Wire (Dallas, ...):
- DIP switches enable the data lines (DQ1/DQ2).

![STICKER 1-Wire](images/sticker-1w.png)

---

## Dry Contact Input
Wiring for a dry contact:  
- 560 kΩ pull-up and grounded through 33 kΩ.  

![STICKER Dry Contact](images/sticker-dry-contact.png)

---

## Analog Input (0–24 V)
Analog input 0–24 V:  
- Divider 1 kΩ / 33 kΩ.

![STICKER Analog Input](images/sticker-analog-input.png)

## S0 Sensor {#so-sensor}

S0 pulse output of an energy or utility meter, counted with `cap-gpio-input-x pulse`. For the configuration and counting behavior see [S0 interface](./s0-interface.md).

![STICKER S0 sensor](images/sticker-so-sensor.png)
