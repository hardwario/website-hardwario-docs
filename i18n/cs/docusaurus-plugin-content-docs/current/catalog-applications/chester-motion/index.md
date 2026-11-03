---
title: CHESTER Motion
description: "CHESTER Motion je katalogová aplikace, která dvěma senzory PIR počítá procházející osoby a směr jejich pohybu: co umí, jaký má hardware a firmware."
---

# CHESTER Motion {#chester-motion}

![CHESTER Motion při pohledu zprava, s okénky obou senzorů PIR ve víku](/img/chester/catalog-applications/chester-motion.webp)

Zařízení **CHESTER Motion** rozpoznává pohyb včetně jeho směru: dvěma senzory PIR zjistí, zda se něco pohybuje zleva doprava, nebo zprava doleva. Aplikace počítá události pohybu se směrem a odesílá je přes LTE do HARDWARIO Cloud.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Motion](../../firmware/chester-motion/index.md)**.

:::

## Co umí {#what-it-can-do}

- Dvěma senzory PIR detekuje pohyb a rozliší průchod zleva doprava od průchodu zprava doleva.
- Počítá detekce na každé straně a průchody v každém směru, za každý interval vzorkování i celkově.
- Citlivost detekce zvolíte jednou ze tří předvoleb, nebo ji nastavíte po jednotlivých parametrech.
- V servisním režimu blikne LED při každé detekci, což usnadní instalaci a testování.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: základní deska CHESTER s držákem baterie typu C
* `CHESTER-E23-LP`: krabička se dvěma otvory pro senzory PIR, anténním pigtailem SMA a světlovodem
* `CHESTER-S3`: rozšiřující deska se dvěma senzory PIR
* `Battery SAFT LS26500`

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Technická specifikace {#technical-specification}

| Parametr | Hodnota |
| :--- | :--- |
| Materiál krabičky | ASA |
| Rozměry | 130×175×45 mm |
| Provozní teplota | -20 až +60 °C |
| Skladovací teplota | -30 až +70 °C |
| Krytí krabičky | IP67 |
| Jmenovité napětí baterie | 3,6 V |
| Jmenovitá kapacita baterie | 7700 mAh |
| Klidová spotřeba | < 180 µA |
| Špičková spotřeba | < 250 mA |

### Senzor PIR (CHESTER-S3) {#pir-sensor-chester-s3}

| Parametr | Hodnota |
| :--- | :--- |
| Dosah detekce | Až 3 metry |
| Úhel měření | Max. 80° |

## Typické využití {#typical-use-cases}

Zařízení **CHESTER Motion** sleduje dvěma senzory PIR průchod osob kolem sebe, a hodí se proto ke sledování pohybu lidí v továrnách, na nádražích nebo v prodejnách. Díky bezdrátovému připojení a dlouhé výdrži baterie ho snadno nainstalujete kdekoli, i na odlehlých místech, například v chráněných přírodních oblastech.

- Sledování pohybu osob v uličkách továrních hal, na nádražích nebo v prodejnách
- Sledování pohybu osob v chráněných přírodních oblastech
- Vyšší bezpečnost a efektivnější provoz díky sledování přítomnosti osob v různých prostředích
- Snadná instalace na odlehlých nebo obtížně přístupných místech díky bezdrátovému provedení a dlouhé výdrži baterie

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
