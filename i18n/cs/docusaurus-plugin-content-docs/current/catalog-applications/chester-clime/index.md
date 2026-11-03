---
title: CHESTER Clime
description: "CHESTER Clime je katalogová aplikace pro sledování teploty a vlhkosti: co měří, jaký má hardware, jaké varianty a jaký firmware."
---

# CHESTER Clime {#chester-clime}

![CHESTER Clime s průchodkou externího vlhkoměru](/img/chester/catalog-applications/chester-clime.webp)

Zařízení **CHESTER Clime** je senzor prostředí. Měří teplotu a vlhkost, pro každý interval spočítá minimum, maximum, průměr a medián a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Clime](../../firmware/chester-clime/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří teplotu a vlhkost externím vlhkoměrem **CHESTER-S2**.
- Čte několik teplotních sond **DS18B20** 1-Wire.
- Při překročení nastavené prahové hodnoty hlásí teplotní alarm.
- Při výpadku externího napájení běží dál na záložním modulu **CHESTER-Z** a změnu napájení nahlásí.
- Sbírá hodnoty z bluetoothových senzorových tagů.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Clime Z**](chester-clime-z.md) | Záložní modul CHESTER-Z1 | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime IAQ**](chester-clime-iaq.md) | Kvalita vnitřního ovzduší: CO₂, tlak, osvětlenost, pohyb | [CHESTER Clime IAQ](../../firmware/chester-clime/chester-clime-iaq.md) |
| [**CHESTER Clime 1W**](chester-clime-1w.md) | Sondy DS18B20 místo vlhkoměru | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime 1WH**](chester-clime-1wh.md) | Sondy DS18B20 i vlhkoměr | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime RTD**](chester-clime-rtd.md) | Dvě sondy Pt1000 | [CHESTER Clime RTD](../../firmware/chester-clime/chester-clime-rtd.md) |
| [**CHESTER Clime TC**](chester-clime-tc.md) | Dva termočlánky typu K | [CHESTER Clime TC](../../firmware/chester-clime/chester-clime-tc.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
