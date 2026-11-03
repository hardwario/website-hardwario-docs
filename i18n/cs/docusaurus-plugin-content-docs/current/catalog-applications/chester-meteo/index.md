---
title: CHESTER Meteo
description: "CHESTER Meteo je katalogová aplikace pro sledování počasí: co měří, jaký má hardware, jaké varianty a jaký firmware."
---

# CHESTER Meteo {#chester-meteo}

![CHESTER Meteo s externím vlhkoměrem a čtyřmi kabelovými průchodkami](/img/chester/catalog-applications/chester-meteo.webp)

Zařízení **CHESTER Meteo** měří vítr a další podmínky prostředí: rychlost a směr větru, srážky, atmosférický tlak, teplotu a vlhkost. Naměřené veličiny vzorkuje, za každý interval je agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Meteo](../../firmware/chester-meteo/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří rychlost větru (m/s), směr větru (0–360°) a srážky (mm) meteorologickými senzory připojenými ke vstupnímu modulu **CHESTER-X0B**.
- Měří atmosférický tlak (Pa) externím barometrem.
- Měří teplotu (°C) a vlhkost (%RH) externím vlhkoměrem **CHESTER-S2**.
- Čte teplotní sondy **DS18B20** 1-Wire a půdní senzory 1-Wire.
- Při překročení nastavené prahové hodnoty hlásí teplotní alarm.
- Sbírá hodnoty z bluetoothových senzorových tagů.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X0B:A`: Vstupní modul (4 kanály)
* `CHESTER-S2`: Externí vlhkoměr
* Externí barometr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Meteo Z**](chester-meteo-z.md) | Záložní modul CHESTER-Z1 | [CHESTER Meteo Z](../../firmware/chester-meteo/chester-meteo-z.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
