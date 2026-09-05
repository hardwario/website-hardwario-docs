---
title: Temperature Sensors
sidebar_position: 1
---
import Image from '@theme/IdealImage';

# External Temperature Sensors (1-Wire / DS18B20)

GLIDER supports up to **8 DS18B20** digital thermometers connected over the **1-Wire** bus. The sensors connect to one of the two 1-Wire ports on the GLIDER terminal block (**W1** or **W2**).

This page explains how to wire the probes, scan them in, and read out temperatures.

:::tip
For the alarm configuration tied to these sensors, see [**Configuration → Alarms**](../configuration.md#alarms).
:::

## Hardware

GLIDER exposes the 1-Wire bus through two physical ports, both electrically equivalent and sharing the same internal Maxim DS2484 1-Wire master:

| Port | Power | Data | Ground |
| :--- | :--- | :--- | :--- |
| **W1** | `W1V` | `W1D` | `W1G` |
| **W2** | `W2V` | `W2D` | `W2G` |

Standard HARDWARIO DS18B20 cable assemblies have three wires:

| Wire color | Function | Connect to |
| :--- | :--- | :--- |
| 🔴 **Red** | VCC (power) | `W1V` or `W2V` |
| 🟡 **Yellow** | Data | `W1D` or `W2D` |
| ⚫ **Black** | GND | `W1G` or `W2G` |

:::tip
Both ports share the same logical 1-Wire bus inside GLIDER. The 8 logical "slots" the firmware tracks are independent of which physical port the probe is plugged into. Bind by ROM code, not by port.
:::

## Step 1 - Wire the probes

1. Power the GLIDER **off** before wiring.
2. Strip the three wires of each DS18B20 cable and connect them to either `W1` or `W2` as shown above.
3. Power the device back on.

You may mix probes across `W1` and `W2` freely, because both ports drive the same bus. The 8 slots are software-defined and bind to the **ROM serial number** of each DS18B20.

## Step 2 - Scan the bus

Once the device is powered, ask the firmware to discover the connected sensors.

#### Via RTT console

```text
therm scan
```

#### Via AT console

```text
AT$SHELL="therm scan"
```

Example output:

```text
Found 1 sensor(s):
 [1] 28ff12b05316031d <- NEW
 Slot 2: (empty)
 Slot 3: (empty)
 Slot 4: (empty)
 Slot 5: (empty)
 Slot 6: (empty)
 Slot 7: (empty)
 Slot 8: (empty)

Save changes? [y/N]
```

The `<- NEW` annotation marks a ROM code that the firmware has not seen before. Press **`y`** + **Enter** to bind the new sensor(s) to the proposed slots and reboot.

To skip the confirmation step (useful for scripts or factory provisioning):

```text
therm scan --save
```

This binds and reboots in one shot.

To also **delete** slots whose ROM codes are no longer on the bus:

```text
therm scan --clear-missing
```

## Step 3 - Read a temperature

Once a sensor is bound to a slot, read its temperature with:

```text
therm read 1
```

(replace `1` with the slot number 1-8). To read every populated slot at once:

```text
therm readall
```

Example output:

```text
Slot 1: 23.50 °C
Slot 2: 24.62 °C
```

The temperature is reported in **°C with 0.01 °C resolution**. Unsuccessful reads (probe disconnected, CRC error, …) return `NaN` and are sent as `null` in the cloud payload.

## Step 4 - Inspect slot state

```text
therm state
```

Shows the current slot bindings, the most recently measured temperature, and read/error counters.

## Manually binding a sensor to a slot

If you know the ROM code of the probe (for example from a label), you can bind it directly without scanning:

```text
therm config 1 28ff12b05316031d
```

…and then save:

```text
AT&W
```

## How temperatures appear in the cloud

Each populated slot is included in the **`thermometers`** array of the CBOR payload:

```yaml
thermometers:
 - slot: 1
 temperature: 23.50
 - slot: 2
 temperature: 24.62
```

Empty slots are **omitted** from the payload (they do not appear as `null`). A failed read is sent as `temperature: null`.

For the full schema, see [**CBOR Payload**](../payload.md).

## Combining with alarms

Each thermometer slot can be tied to one or more **alarm rules** that trigger when the temperature crosses a configurable threshold:

```text
alarm config 1-enabled true
alarm config 1-therm 1 # watch slot 1
alarm config 1-threshold 30 # trigger at 30 °C
alarm config 1-hysteresis 5 # release at 30 − 5 = 25 °C
AT&W
```

For the full alarm reference see [**Configuration**](../configuration.md) and the [**Shell Commands**](../commands/shell-commands.md) page.
