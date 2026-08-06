---
slug: wm-bus_sensors
title: wM-Bus Sensors
---

import Image from '@theme/IdealImage';

# wM-Bus Sensors

**CHESTER wM-Bus supports all wM-Bus meters of the T1 and C1 classes, regardless of manufacturer.** It works as a **pass-thru gateway** — it forwards the received telegrams as they are, and the decoding into meaningful units happens in the end IoT application.

:::info
The list below is therefore not a compatibility list. It contains the meters we have tested in-house and documented; any other T1/C1 wM-Bus device on the market works with the gateway as well.
:::

### BMeters

| Name                                                                 | Type                   | Resources                                                                                                  |
|----------------------------------------------------------------------|------------------------|------------------------------------------------------------------------------------------------------------|
| BMeters RFM-TX1.1 | Watermeter             | [Documentation](./wm-bus/bmeters-rfm-tx1.1.md) · [Web](https://www.bmeters.com/en/products/rfm-tx1/) |
| BMeters IWM-TX3   | Watermeter             | [Documentation](./wm-bus/bmeters_iwm-tx3.md) · [Web](https://www.bmeters.com/en/products/iwm-tx3/) |
| BMeters IWM-TX5   | Watermeter             | [Documentation](./wm-bus/bmeters_iwm-tx5.md) · [Web](https://www.bmeters.com/en/products/iwm-tx5/) |
| BMeters HYDROCAL-M4 | Thermal energy meter | [Documentation](./wm-bus/bmeters-hydrocal-m4.md) · [Web](https://www.bmeters.com/en/products/hydrocal-m4/) |
| BMeters HYDROCLIMA-2 | Heat cost allocator   | [Documentation](./wm-bus/bmeters-hydroclima-2.md) · [Web](https://www.bmeters.com/en/products/hydroclima-2/) |

### Zenner

| Name                                                                 | Type                 | Resources                                                                                                  |
|----------------------------------------------------------------------|----------------------|------------------------------------------------------------------------------------------------------------|
| Zenner C5-ISF        | Thermal energy meter | [Documentation](./wm-bus/zenner-c5-isf.md) · [Web](https://zenner.com/products/wmz_zelsius_c5_isf-2/) |
| Zenner caltos-E | Heat cost allocator  | [Documentation](./wm-bus/zenner-caltos-e.md) · [Web](https://zenner.com/products/hkv_caltos_e/) |
| Zenner Minomess | Watermeter           | [Documentation](./wm-bus/zenner-minomess.md) · [Web](https://zenner.com/products/wwz_minomess_lorawan_wm-bus-2/) |