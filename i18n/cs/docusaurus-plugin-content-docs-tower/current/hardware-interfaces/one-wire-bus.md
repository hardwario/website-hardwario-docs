---
slug: one-wire-bus
title: "Sběrnice 1-Wire"
description: 1-Wire je sériová sběrnice, po které master komunikuje s více podřízenými zařízeními obousměrně a poloduplexně přes pouhé dva vodiče.
---
import Image from '@theme/IdealImage';

1-Wire je sériová sběrnice, po které řídicí zařízení (master) 1-Wire komunikuje s jedním nebo více podřízenými zařízeními (slave) 1-Wire. Stačí jí jen **dva vodiče** (datový a zem) a komunikace je **poloduplexní a obousměrná**.

:::info

Každé zařízení na sběrnici má pro identifikaci jedinečné 64bitové číslo (ID).

:::

1-Wire je zvláštní tím, že pokud některé zařízení ztratí kontakt nebo se odpojí od sběrnice, přejde do výchozího stavu po resetu. Po opětovném připojení se zařízení probudí a ohlásí svou přítomnost.

## Sběrnice 1-Wire na platformě TOWER {#1-wire-bus-usage-in-tower}

Zařízení 1-Wire k platformě TOWER připojíte snadno: vyvinuli jsme modul [**Sensor Module**](../hardware-modules/about-sensor-module.md), ke kterému jednoduše připojíte například některé z těchto zařízení:

- [**Soil Sensor**](https://www.hardwario.store/p/soil-sensor)
- [**Machine Probe**](https://www.hardwario.store/p/machine-probe)
- [**Teplotní senzor DS18B20**](https://www.hardwario.store/p/temperature-sensor-ds18b20-10m)
