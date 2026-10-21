---
slug: power-management
title: Power Management
description: "STICKER is engineered for ultra-low power operation to enable multi-year field deployments without external power supplies."
title_meta: "Power Management (STICKER)"
---
import Image from '@theme/IdealImage';

# Power Management

STICKER is engineered for ultra-low power operation to enable multi-year field deployments without external power supplies. It is powered by **2× standard AA batteries** (1.5 V alkaline or lithium cells).

:::tip NFC Provisioning & Radio Activation
Device parameters, keys, and `radio-mode` activation are managed wirelessly using an NFC-enabled smartphone running [**HARDWARIO Manager**](/sticker/hardwario-manager/). Since firmware v2.0.0 the device must be powered for this: insert the batteries first.
:::

---

## Battery Architecture & Power Monitoring

- **Operating Voltage:** Powered by 2× AA batteries with a wide input voltage range of **1.8 V to 3.6 V**.
- **Ultra-Low Idle Current:** Achieves an idle sleep consumption of **< 80 µA** using Zephyr RTOS deep-sleep states on the STM32WL SoC.
- **Dynamic Voltage Measurement:** Battery voltage is sampled under load during active sensor sampling and radio transmission cycles, ensuring accurate telemetry and triggering **Low-Battery Alarms** on **fPort 3**.
- **Battery Check at Power-Up (v2.0.0+):** The firmware measures the battery before it starts anything else. Below **1.8 V** the device does not start: after the boot carousel the LED blinks red every 200 ms for 5 s, stays red for 1 s, and the device switches itself off. It stays off until the batteries are replaced or it is reset with NRST, so a depleted cell no longer boot-loops on brownout.

---

## Factory Default: Radio-Silent Mode (v1.4.0+)

Starting with firmware **v1.4.0**, STICKER ships from the factory in **Radio-Silent Mode** (`radio-mode off`):

- **Zero Transmission in Transit:** The radio transceiver remains completely inactive out of the box to prevent battery drain from un-gatewayed Join attempts during shipping or storage. Sensor sampling and history still run.
- **Field Activation:** Radio transmission is enabled on-site during commissioning by setting `radio-mode` to `lorawan` or `p2p`, either by tapping the powered unit with [**HARDWARIO Manager**](/sticker/hardwario-manager/) over NFC or via shell commands (`config radio-mode lorawan`). The new mode takes effect after a reboot.