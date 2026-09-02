---
slug: one-wire-bus
title: "Sběrnice 1-Wire"
description: 1-Wire je sériová sběrnice, která používá pouze dva vodiče pro poloduplexní dvousměrnou komunikaci s více zařízeními typu slave na sběrnici 1-Wire.
---
import Image from '@theme/IdealImage';

1-Wire je sériová sběrnice, která používá pouze **dva vodiče** (datovou linku a zem) pro **poloduplexní dvousměrnou komunikaci** master zařízení 1-Wire s jedním nebo více slave zařízeními 1-Wire.

:::info

Pro identifikaci zařízení na sběrnici má každé zařízení jedinečné 64bitové identifikační číslo (ID).

:::

1-Wire je zvláštní tím, že pokud některé zařízení ztratí kontakt nebo se odpojí od sběrnice, je uvedeno do výchozího resetovaného stavu. Po opětovném připojení se zařízení probudí a ohlásí svou přítomnost.

## Použití sběrnice 1-Wire v TOWER {#1-wire-bus-usage-in-tower}

Připojení zařízení 1-Wire k zařízení TOWER jsme našim uživatelům usnadnili. Za tímto účelem jsme vyvinuli [**Sensor Module**](../hardware-modules/about-sensor-module.md), pomocí kterého můžete jednoduše připojit například jedno z následujících zařízení.

- [**Soil Sensor**](https://www.hardwario.store/p/soil-sensor)
- [**Machine Probe**](https://www.hardwario.store/p/machine-probe)
- [**Teplotní senzor DS18B20**](https://www.hardwario.store/p/temperature-sensor-ds18b20-10m)
