---
title: CHESTER Scale
description: "CHESTER Scale je katalogová aplikace pro bezdrátové měření hmotnosti tenzometrickými snímači: co umí, jaký má hardware, jaké varianty a jaký firmware."
---

# CHESTER Scale {#chester-scale}

![Krabička CHESTER Scale se dvěma kabelovými průchodkami](/img/chester/catalog-applications/chester-scale.webp)

Zařízení **CHESTER Scale** slouží k bezdrátovému měření hmotnosti tenzometrickými snímači. Měří až čtyři kanály tenzometrických snímačů a naměřené hodnoty odesílá do HARDWARIO Cloud přes NB-IoT/LTE-M nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Scale](../../firmware/chester-scale/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří hmotnost až čtyřmi tenzometrickými snímači, dvěma na každém modulu **CHESTER-X3C**.
- Funguje s jedním i dvěma moduly CHESTER-X3C: modul ve slotu B firmware rozpozná při startu.
- Každý kanál lze zapnout nebo vypnout samostatně.
- Sbírá teplotu a vlhkost z bluetoothových senzorových tagů (Teltonika EYE Sensor).
- Při výpadku externího napájení běží dál na záložním modulu **CHESTER-Z1** a změnu napájení nahlásí (varianta **CHESTER Scale Z**).

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B`: Rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E5-P`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Použití {#use-cases}

Zařízení se hodí například pro:
- **Sledování průmyslových zásobníků**: stav naplnění nádrží, sil nebo kontejnerů
- **Sledování palet a zboží**: změny hmotnosti v logistice a ve skladech
- **Sledování hmotnosti hospodářských zvířat**: lepší plánování krmení a kontrola zdraví zvířat
- **Zemědělství**: sledování úlů, zásob krmiva atd.

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Scale Z**](chester-scale-z.md) | Záložní modul CHESTER-Z1 | [CHESTER Scale Z](../../firmware/chester-scale/chester-scale-z.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
