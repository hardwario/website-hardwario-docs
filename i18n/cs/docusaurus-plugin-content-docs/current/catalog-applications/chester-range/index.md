---
title: CHESTER Range
description: "CHESTER Range je katalogová aplikace pro ultrazvukové měření vzdálenosti: co měří, jaký má hardware, zapojení, varianty a firmware."
---

# CHESTER Range {#chester-range}

![Krabička zařízení CHESTER Range s jednou kabelovou průchodkou, pohled zešikma](/img/chester/catalog-applications/chester-range.webp)

Zařízení **CHESTER Range** měří vzdálenost ultrazvukovým senzorem [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor). Pro každý interval spočítá minimum, maximum, průměr a medián a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Range](../../firmware/chester-range/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří vzdálenost ultrazvukovým senzorem MaxBotix MB7066.
- Měří teplotu sondami **DS18B20** 1-Wire.
- Sbírá hodnoty z bluetoothových senzorových tagů.
- Se záložním modulem **CHESTER-Z1** (CHESTER Range Z) při výpadku externího napájení běží dál a změnu napájení nahlásí.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0A:A`: Vstupní modul (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Svorkovnice {#terminal-blocks}

Senzor připojte k **levé svorkovnici A**:

| [**CHESTER-X0**](../../extension-modules/chester-x0.md) v levém slotu A | Barva vodiče Maxbotix | Signál |
| ------------------------------------------------------------------- | -------------------- | ------ |
| A2 (CH1)                                                            | červená              | Napájení |
| A3 (GND)                                                            | černá                | GND    |
| A4 (CH2)                                                            | žlutá                | Impulz |

![Rozložení svorek CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../../chester/extension-modules/images/tb-chester-x0.png)

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Range Z**](chester-range-z.md) | Záložní modul CHESTER-Z1 | [CHESTER Range Z](../../firmware/chester-range/chester-range-z.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
