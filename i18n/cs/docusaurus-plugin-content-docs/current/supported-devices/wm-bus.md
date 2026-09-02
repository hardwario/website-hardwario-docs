---
slug: wm-bus_sensors
title: Senzory wM-Bus
description: "Následující seznam proto není seznamem kompatibility. Obsahuje měřiče, které jsme sami otestovali a zdokumentovali; s bránou funguje i jakékoli jiné zařízení wM-Bus T1/C1 dostupné na trhu."
---

import Image from '@theme/IdealImage';

# Senzory wM-Bus {#wm-bus-sensors}

**CHESTER wM-Bus podporuje všechny měřiče wM-Bus tříd T1 a C1 bez ohledu na výrobce.** Funguje jako **průchozí brána (pass-thru gateway)** — přijaté telegramy přeposílá tak, jak jsou, a jejich dekódování do smysluplných jednotek probíhá až v koncové IoT aplikaci.

:::info
Následující seznam proto není seznamem kompatibility. Obsahuje měřiče, které jsme sami otestovali a zdokumentovali; s bránou funguje i jakékoli jiné zařízení wM-Bus T1/C1 dostupné na trhu.
:::

### BMeters {#bmeters}

| Název                                                                 | Typ                   | Zdroje                                                                                                  |
|----------------------------------------------------------------------|------------------------|------------------------------------------------------------------------------------------------------------|
| BMeters RFM-TX1.1 | Vodoměr             | [Dokumentace](./wm-bus/bmeters-rfm-tx1.1.md) · [Web](https://www.bmeters.com/en/products/rfm-tx1/) |
| BMeters IWM-TX3   | Vodoměr             | [Dokumentace](./wm-bus/bmeters_iwm-tx3.md) · [Web](https://www.bmeters.com/en/products/iwm-tx3/) |
| BMeters IWM-TX5   | Vodoměr             | [Dokumentace](./wm-bus/bmeters_iwm-tx5.md) · [Web](https://www.bmeters.com/en/products/iwm-tx5/) |
| BMeters HYDROCAL-M4 | Měřič tepelné energie | [Dokumentace](./wm-bus/bmeters-hydrocal-m4.md) · [Web](https://www.bmeters.com/en/products/hydrocal-m4/) |
| BMeters HYDROCLIMA-2 | Indikátor topných nákladů   | [Dokumentace](./wm-bus/bmeters-hydroclima-2.md) · [Web](https://www.bmeters.com/en/products/hydroclima-2/) |

### Zenner {#zenner}

| Název                                                                 | Typ                 | Zdroje                                                                                                  |
|----------------------------------------------------------------------|----------------------|------------------------------------------------------------------------------------------------------------|
| Zenner C5-ISF        | Měřič tepelné energie | [Dokumentace](./wm-bus/zenner-c5-isf.md) · [Web](https://zenner.com/products/wmz_zelsius_c5_isf-2/) |
| Zenner caltos-E | Indikátor topných nákladů  | [Dokumentace](./wm-bus/zenner-caltos-e.md) · [Web](https://zenner.com/products/hkv_caltos_e/) |
| Zenner Minomess | Vodoměr           | [Dokumentace](./wm-bus/zenner-minomess.md) · [Web](https://zenner.com/products/wwz_minomess_lorawan_wm-bus-2/) |
