---
title: CHESTER Clime IAQ
description: "CHESTER Clime IAQ firmware: what it changes against the main CHESTER Clime firmware for the CHESTER-S1 multisensor and the CHESTER-X10 power input."
---

# CHESTER Clime IAQ

**CHESTER Clime IAQ** is the CHESTER Clime firmware built for the **CHESTER-S1** indoor air quality multisensor and the **CHESTER-X10** external power input. Everything this page does not mention works as described for [**CHESTER Clime**](index.md).

## Differences from CHESTER Clime

### Hardware

- Adds **CHESTER-S1**, which measures temperature, humidity, illuminance, CO₂ concentration and atmospheric pressure, detects motion with a PIR sensor and has a push button with an acoustic buzzer.
- Adds **CHESTER-X10**: external power 6–28 V with a Li-Ion backup battery. Firmware v4.0.1 reads from it only whether external power is present, which sets how the button shows the CO₂ level.
- Does not support the **CHESTER-S2** hygrometer.

### Behavior

- When the button is pressed, the blue LED turns on for a second, the buzzer beeps and the device sends a report at once.
- The button color shows the CO₂ level: **green** (levels are ok), **orange** (warning) and **red** (alarm). The button blinks shortly every 5 seconds when powered from a battery and it is permanently on when external power on CHESTER-X10 is applied.

:::caution

CHESTER Clime IAQ sends about 800 bytes of data in the default configuration. If you increase the report interval without also increasing the aggregation interval,
the data buffer might be bigger than the UDP MTU and the packet will not be sent. The device then appears not to send at all or to send only a fraction of packets.

:::

### Configuration Parameters

Added parameters for the button LED:

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `iaq-led-thr-warning` | IAQ LED threshold warning | `<-40.0..5000.0>` | `800.0` | CO₂ concentration in ppm at which the button turns orange |
| `iaq-led-thr-alarm` | IAQ LED threshold alarm | `<-40.0..5000.0>` | `1600.0` | CO₂ concentration in ppm at which the button turns red |
| `iaq-led-hst` | IAQ LED hysteresis | `<-40.0..125.0>` | `50.0` | Hysteresis of both thresholds in ppm |

The `hygro-t-alarm-*` parameters are not available. The `event-report-*` and `backup-report-*` parameters take effect only with a CHESTER-Z backup module: firmware v4.0.1 does not report changes of the external power on CHESTER-X10.

### Data

The fields of `iaq_sensor` and `backup`, with their units, ranges and resolutions, are described on the catalog page under [**CHESTER Clime IAQ**](../../catalog-applications/chester-clime/index.md#chester-clime-iaq).

Compared with the main firmware, the report has an `iaq_sensor` structure with the CHESTER-S1 readings (temperature, humidity, illuminance, altitude, pressure, CO₂ concentration, motion count and button press count) and no `hygrometer` structure. The `backup` structure is in every report; firmware v4.0.1 fills it only from a CHESTER-Z backup module, so without one it shows 0 V and `disconnected`. `motion_count` and `press_count` count from the start of the device, and `press_count` gets an entry only when the button is pressed. Over LoRaWAN the firmware sends no CHESTER-S1 values, only the values of the mainboard, the 1-Wire probes, the soil sensors and the Bluetooth tags.

The example shows only these two structures from a periodic report without a button press, shortened to two aggregated values:

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
  "backup": {
    "line_voltage": 0,
    "batt_voltage": 0,
    "state": "disconnected",
    "events": []
  },
  "iaq_sensor": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 22.47,
          "max": 22.54,
          "avg": 22.5,
          "mdn": 22.5
        },
        {
          "timestamp": 1793953200,
          "min": 22.45,
          "max": 22.51,
          "avg": 22.48,
          "mdn": 22.48
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 55.19,
          "max": 55.91,
          "avg": 55.52,
          "mdn": 55.53
        },
        {
          "timestamp": 1793953200,
          "min": 55.84,
          "max": 56.5,
          "avg": 56.14,
          "mdn": 56.07
        }
      ]
    },
    "illuminance": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 312,
          "max": 348,
          "avg": 331,
          "mdn": 333
        },
        {
          "timestamp": 1793953200,
          "min": 305,
          "max": 341,
          "avg": 322,
          "mdn": 320
        }
      ]
    },
    "altitude": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 244
        },
        {
          "timestamp": 1793953200,
          "min": 244,
          "max": 245,
          "avg": 244,
          "mdn": 245
        }
      ]
    },
    "pressure": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 98419,
          "max": 98425,
          "avg": 98422,
          "mdn": 98423
        },
        {
          "timestamp": 1793953200,
          "min": 98415,
          "max": 98418,
          "avg": 98416,
          "mdn": 98416
        }
      ]
    },
    "co2_conc": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "min": 612,
          "max": 655,
          "avg": 634,
          "mdn": 636
        },
        {
          "timestamp": 1793953200,
          "min": 648,
          "max": 701,
          "avg": 672,
          "mdn": 669
        }
      ]
    },
    "motion_count": {
      "measurements": [
        {
          "timestamp": 1793952900,
          "value": 1287
        },
        {
          "timestamp": 1793953200,
          "value": 1293
        }
      ]
    },
    "press_count": {
      "measurements": []
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
