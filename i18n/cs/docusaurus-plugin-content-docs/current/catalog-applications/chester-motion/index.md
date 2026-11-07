---
title: CHESTER Motion
description: "CHESTER Motion dvěma senzory PIR počítá procházející osoby a směr jejich pohybu: hardware, nastavení a přesný formát odesílaných dat."
---

# CHESTER Motion {#chester-motion}

![CHESTER Motion při pohledu zprava, s okénky obou senzorů PIR ve víku](/img/chester/catalog-applications/chester-motion.webp)

Zařízení **CHESTER Motion** rozpoznává pohyb včetně jeho směru: dvěma senzory PIR zjistí, zda se něco pohybuje zleva doprava, nebo zprava doleva. Aplikace počítá události pohybu se směrem a odesílá je přes LTE do HARDWARIO Cloud.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Motion](../../firmware/chester-motion/index.md)**.

:::

## Co umí {#what-it-can-do}

- Dvěma senzory PIR detekuje pohyb a rozliší průchod zleva doprava od průchodu zprava doleva.
- Počítá detekce na každé straně a průchody v každém směru, za každý interval vzorkování i celkově.
- Citlivost detekce zvolíte jednou ze tří předvoleb, nebo ji nastavíte po jednotlivých parametrech.
- V servisním režimu blikne LED při každé detekci, což usnadní instalaci a testování.

## Technická specifikace {#technical-specification}

| Parametr | Hodnota |
| :--- | :--- |
| Materiál krabičky | ASA |
| Rozměry | 130×175×45 mm |
| Provozní teplota | -30 až +70 °C |
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

## CHESTER Motion {#model-chester-motion}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: základní deska CHESTER s držákem baterie typu C
* `CHESTER-E23-LP`: krabička se dvěma otvory pro senzory PIR, anténním pigtailem SMA a světlovodem
* `CHESTER-S3`: rozšiřující deska se dvěma senzory PIR
* `Battery SAFT LS26500`

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Tato nastavení u zařízení CHESTER Motion měníte nejčastěji. Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Všechny parametry najdete na stránce firmwaru v části [**Konfigurační parametry**](../../firmware/chester-motion/index.md#configuration-parameters).

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Délka jednoho vzorku pohybu v sekundách; každá položka v `motion.samples` počítá detekce a průchody za jeden interval |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `sensitivity` | Sensitivity | `low`, `medium`, `high`, `individual` | `medium` | Předvolba citlivosti PIR; `individual` použije čtyři parametry `motion-*` níže (viz [Režimy citlivosti PIR](../../firmware/chester-motion/index.md#pir-sensitivity-modes)) |
| `motion-sens` | Motion sens | `<1-255>` | `64` | Prahová hodnota detekce senzorů PIR; nižší hodnota znamená vyšší citlivost |
| `motion-blind` | Motion blind | `<0-10>` | `2` | Slepá doba po detekci, během které se další detekce ignorují: 0,5 s + 0,5 s × hodnota (výchozí 1,5 s) |
| `motion-pulse` | Motion pulse | `<1-10>` | `2` | Počet impulzů v okně, který spustí detekci: 1 + hodnota (výchozí 3) |
| `motion-window` | Motion window | `<0-10>` | `2` | Časové okno, během kterého musí impulzy přijít: 2 s + 2 s × hodnota (výchozí 6 s) |
| `service-mode-enabled` | Service mode enabled | `true`, `false` | `false` | Servisní režim pro instalaci a testování: LED blikne při každé detekci (zeleně pro levý senzor, červeně pro pravý) a každých 5 s |

Čtyři parametry `motion-*` platí jen tehdy, když je `sensitivity` nastavené na `individual`. Ovladač modulu CHESTER-S3 předává senzorům jen dva nejnižší bity parametrů `motion-pulse` a `motion-window`, takže hodnoty od 4 výš přetečou (4 se chová jako 0, 5 jako 1). Vzorce pocházejí z datasheetu Excelitas PYQ 1648.

### Data přes LTE {#data-over-lte}

Zařízení odesílá hlášení přes NB-IoT/LTE každých `interval-report` sekund s náhodnou odchylkou až ±20 % (viz [Rozptyl intervalu hlášení](../common-functionality.md#report-interval-jitter)); první hlášení odejde 10 s po startu. Detekce se započítají a odejdou s nejbližším pravidelným hlášením. Každých `interval-sample` sekund zařízení uzavře jeden vzorek pohybu s detekcemi a průchody, které napočítalo od předchozího vzorku. Hlášení nese vzorky odebrané od posledního úspěšného hlášení, nejvýše prvních 30; celkové součty započítávají každou detekci a každý průchod. Ve výchozím nastavení může interval hlášení prodloužený odchylkou zahrnout až 36 vzorků, z nichž `samples` nese prvních 30. Při chybě čtení je hodnota `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Motion posílá `message.version` `2`.

Kromě společných dat odesílá aplikace CHESTER Motion:

- [`motion`](#motion): detekce obou senzorů PIR a průchody v každém směru, celkově i za každý interval vzorku

#### Pohyb {#motion}

Struktura se odesílá v každém hlášení. Když jeden senzor PIR zachytí pohyb, otevře se okno 750 ms; detekce druhého senzoru během okna se navíc započítá jako průchod: zleva doprava je `motion_right`, zprava doleva je `motion_left`. Během okna se od každého senzoru započítá nejvýše jedna detekce.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `motion.totalizer.detect_left` | Detekce levého senzoru PIR od startu zařízení | | 0–2147483647 | 1 |
| `motion.totalizer.detect_right` | Detekce pravého senzoru PIR od startu zařízení | | 0–2147483647 | 1 |
| `motion.totalizer.motion_left` | Průchody zprava doleva od startu zařízení | | 0–2147483647 | 1 |
| `motion.totalizer.motion_right` | Průchody zleva doprava od startu zařízení | | 0–2147483647 | 1 |
| `motion.samples[].timestamp` | Konec intervalu vzorku (unixový čas) | s | | 1 s |
| `motion.samples[].detect_left` | Detekce levého senzoru PIR v intervalu vzorku | | 0–2147483647 | 1 |
| `motion.samples[].detect_right` | Detekce pravého senzoru PIR v intervalu vzorku | | 0–2147483647 | 1 |
| `motion.samples[].motion_left` | Průchody zprava doleva v intervalu vzorku | | 0–2147483647 | 1 |
| `motion.samples[].motion_right` | Průchody zleva doprava v intervalu vzorku | | 0–2147483647 | 1 |

Celkové součty se počítají od startu zařízení a sčítají se napříč hlášeními; restart je vynuluje.

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
