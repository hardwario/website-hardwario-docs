---
title: CHESTER Clime IAQ
description: "CHESTER Clime IAQ firmware: what it changes against the main CHESTER Clime firmware for the CHESTER-S1 multisensor and the CHESTER-X10 power input."
---

# CHESTER Clime IAQ

**CHESTER Clime IAQ** is the CHESTER Clime firmware built for the **CHESTER-S1** indoor air quality multisensor and the **CHESTER-X10** external power input. Everything this page does not mention works as described for [**CHESTER Clime**](index.md).

## Differences from CHESTER Clime

### Hardware

- Adds **CHESTER-S1**, which measures temperature, humidity, illuminance, CO₂ concentration and atmospheric pressure, detects motion with a PIR sensor and has a push button with an acoustic buzzer.
- Adds **CHESTER-X10**: external power 6–28 V with a Li-Ion backup battery.
- Does not support the **CHESTER-S2** hygrometer.

### Behavior

- When the button is pressed, the blue LED turns on for a second and the buzzer beeps.
- The button color shows the CO₂ level: **green** (levels are ok), **orange** (warning) and **red** (alarm). The button blinks shortly every 5 seconds when powered from a battery and it is permanently on when external power on CHESTER-X10 is applied.

:::caution

CHESTER Clime IAQ sends about 800 bytes of data in the default configuration. If you increase the report interval without also increasing the aggregation interval,
the data buffer might be bigger than the UDP MTU and the packet will not be sent. The device then appears not to send at all or to send only a fraction of packets.

:::

### Configuration Parameters

Added parameters for the button LED:

| Parameter | Values | Default | Meaning |
| :--- | :--- | :--- | :--- |
| `iaq-led-thr-warning` | `<-40.0..5000.0>` | `800.0` | CO₂ concentration in ppm at which the button turns orange |
| `iaq-led-thr-alarm` | `<-40.0..5000.0>` | `1600.0` | CO₂ concentration in ppm at which the button turns red |
| `iaq-led-hst` | `<-40.0..125.0>` | `50.0` | Hysteresis of both thresholds in ppm |

The `hygro-t-alarm-*` parameters are not available. The `event-report-*` and `backup-report-*` parameters also apply to the external power on CHESTER-X10.

### Data

The report has an `iaq_sensor` structure with the CHESTER-S1 readings (temperature, humidity, illuminance, altitude, pressure, CO₂ concentration, motion count and button press count) and no `hygrometer` structure.

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "iaq_sensor": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 22.5,
          "max": 22.54,
          "avg": 22.51,
          "mdn": 22.52
        },
        {
          "timestamp": 1668858042,
          "min": 22.49,
          "max": 22.5,
          "avg": 22.49,
          "mdn": 22.49
        },
        {
          "timestamp": 1668858342,
          "min": 22.47,
          "max": 22.48,
          "avg": 22.47,
          "mdn": 22.47
        },
        {
          "timestamp": 1668858642,
          "min": 22.47,
          "max": 22.49,
          "avg": 22.48,
          "mdn": 22.48
        },
        {
          "timestamp": 1668858942,
          "min": 22.46,
          "max": 22.5,
          "avg": 22.48,
          "mdn": 22.48
        },
        {
          "timestamp": 1668859242,
          "min": 22.45,
          "max": 22.47,
          "avg": 22.46,
          "mdn": 22.47
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 55.19,
          "max": 55.91,
          "avg": 55.52,
          "mdn": 55.53
        },
        {
          "timestamp": 1668858042,
          "min": 55.84,
          "max": 56.5,
          "avg": 56.14,
          "mdn": 56.07
        },
        {
          "timestamp": 1668858342,
          "min": 56.01,
          "max": 56.2,
          "avg": 56.09,
          "mdn": 56.07
        },
        {
          "timestamp": 1668858642,
          "min": 55.55,
          "max": 56.1,
          "avg": 55.79,
          "mdn": 55.74
        },
        {
          "timestamp": 1668858942,
          "min": 55.39,
          "max": 55.86,
          "avg": 55.6,
          "mdn": 55.59
        },
        {
          "timestamp": 1668859242,
          "min": 55.1,
          "max": 56.29,
          "avg": 55.69,
          "mdn": 55.61
        }
      ]
    },
    "illuminance": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 4,
          "max": 5,
          "avg": 4,
          "mdn": 4
        },
        {
          "timestamp": 1668858042,
          "min": 4,
          "max": 6,
          "avg": 4,
          "mdn": 5
        },
        {
          "timestamp": 1668858342,
          "min": 5,
          "max": 5,
          "avg": 5,
          "mdn": 5
        },
        {
          "timestamp": 1668858642,
          "min": 4,
          "max": 6,
          "avg": 5,
          "mdn": 5
        },
        {
          "timestamp": 1668858942,
          "min": 5,
          "max": 7,
          "avg": 5,
          "mdn": 6
        },
        {
          "timestamp": 1668859242,
          "min": 4,
          "max": 5,
          "avg": 4,
          "mdn": 5
        }
      ]
    },
    "altitude": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668858042,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        },
        {
          "timestamp": 1668858342,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        },
        {
          "timestamp": 1668858642,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668858942,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1668859242,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        }
      ]
    },
    "pressure": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 98419,
          "max": 98425,
          "avg": 98422,
          "mdn": 98423
        },
        {
          "timestamp": 1668858042,
          "min": 98415,
          "max": 98418,
          "avg": 98416,
          "mdn": 98416
        },
        {
          "timestamp": 1668858342,
          "min": 98412,
          "max": 98417,
          "avg": 98414,
          "mdn": 98415
        },
        {
          "timestamp": 1668858642,
          "min": 98417,
          "max": 98422,
          "avg": 98419,
          "mdn": 98418
        },
        {
          "timestamp": 1668858942,
          "min": 98416,
          "max": 98421,
          "avg": 98419,
          "mdn": 98421
        },
        {
          "timestamp": 1668859242,
          "min": 98416,
          "max": 98422,
          "avg": 98419,
          "mdn": 98420
        }
      ]
    },
    "co2_conc": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 400
        },
        {
          "timestamp": 1668858042,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        },
        {
          "timestamp": 1668858342,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 400
        },
        {
          "timestamp": 1668858642,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        },
        {
          "timestamp": 1668858942,
          "min": 398,
          "max": 399,
          "avg": 398,
          "mdn": 399
        },
        {
          "timestamp": 1668859242,
          "min": 399,
          "max": 400,
          "avg": 399,
          "mdn": 399
        }
      ]
    },
    "motion_count": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "value": 0
        },
        {
          "timestamp": 1668858042,
          "value": 0
        },
        {
          "timestamp": 1668858342,
          "value": 0
        },
        {
          "timestamp": 1668858642,
          "value": 0
        },
        {
          "timestamp": 1668858942,
          "value": 0
        },
        {
          "timestamp": 1668859242,
          "value": 0
        }
      ]
    },
    "press_count": {
      "measurements": [
        {
          "timestamp": 1668857742,
          "value": 0
        },
        {
          "timestamp": 1668858042,
          "value": 0
        },
        {
          "timestamp": 1668858342,
          "value": 0
        },
        {
          "timestamp": 1668858642,
          "value": 0
        },
        {
          "timestamp": 1668858942,
          "value": 0
        },
        {
          "timestamp": 1668859242,
          "value": 0
        }
      ]
    }
  }
}
```

</details>

## Firmware Build

- **Firmware:** [hio-chester-clime-iaq:v4.0.1](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `5dc54c6153974e879f5499d2483433c9`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9/hex), SHA256 `9dda0b0c7c625b6d66599d5ccb614fc73de5cd7968fd458c558b9971c51b2b46`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9/bin), SHA256 `38a047c8e7864e46737766a86ff7e3e9fed703b2346c5d34b3cbcf8a7455dda1`
- **Build from the SDK:** `west chester-update clime --variant "CHESTER Clime IAQ"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).
