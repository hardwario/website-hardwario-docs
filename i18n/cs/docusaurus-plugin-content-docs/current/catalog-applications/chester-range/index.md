---
title: CHESTER Range
description: "Zařízení CHESTER Range měří vzdálenost ultrazvukovým senzorem: hardware, zapojení, varianta, nastavení, která obvykle měníte, a přesná data, která odesílá."
---

# CHESTER Range {#chester-range}

![Krabička zařízení CHESTER Range s jednou kabelovou průchodkou, pohled zešikma](/img/chester/catalog-applications/chester-range.webp)

Zařízení **CHESTER Range** měří vzdálenost ultrazvukovým senzorem [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor). Pro každý interval spočítá minimum, maximum, průměr a medián a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Range](../../firmware/chester-range/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří vzdálenost od 0,20 m do 10,68 m ultrazvukovým senzorem MaxBotix MB7066.
- Měří teplotu sondami **DS18B20** 1-Wire.
- Sbírá hodnoty z bluetoothových senzorových tagů.
- Se záložním modulem **CHESTER-Z1** (CHESTER Range Z) při výpadku externího napájení běží dál a změnu napájení nahlásí.

## Svorkovnice {#terminal-blocks}

Senzor připojte k **levé svorkovnici A**:

| [**CHESTER-X0**](../../extension-modules/chester-x0.md) v levém slotu A | Barva vodiče Maxbotix | Signál |
| ------------------------------------------------------------------- | -------------------- | ------ |
| A2 (CH1)                                                            | červená              | Napájení |
| A3 (GND)                                                            | černá                | GND    |
| A4 (CH2)                                                            | žlutá                | Impulz |

![Rozložení svorek CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../../chester/extension-modules/images/tb-chester-x0.png)

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Range**](#model-chester-range) | Základní model | [CHESTER Range](../../firmware/chester-range/index.md) |
| [**CHESTER Range Z**](#chester-range-z) | Záložní modul CHESTER-Z1 | [CHESTER Range Z](../../firmware/chester-range/chester-range-z.md) |

## CHESTER Range {#model-chester-range}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0A:A`: Vstupní modul (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Toto jsou nastavení, která u zařízení CHESTER Range obvykle měníte. Parametr nastavíte příkazem `app config <parameter> <value>` a změny uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Úplný seznam najdete v [**konfiguračních parametrech**](../../firmware/chester-range/index.md#configuration-parameters) firmwaru.

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování všech senzorů v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |

Firmware startuje v režimu `lte`, připravený posílat data přes NB-IoT/LTE.

Intervaly volte tak, aby stačily buffery. Mezi dvěma agregacemi si každý senzor uchová nejvýše 32 vzorků a každý bluetoothový tag 16; mezi dvěma hlášeními si každý senzor uchová nejvýše 32 agregovaných hodnot a každý bluetoothový tag 16. Další hodnoty se zahazují.

### Data přes LTE {#data-over-lte}

Zařízení CHESTER Range odesílá hlášení přes NB-IoT/LTE každých `interval-report` sekund, náhodně posunuté nejvýše o ±20 % intervalu (viz [**Rozptyl intervalu hlášení**](../common-functionality.md#report-interval-jitter)); varianta CHESTER Range Z hlásí také změnu externího napájení. Hlášení nese vše, co zařízení od předchozího hlášení nasbíralo. Zařízení CHESTER Range posílá data přes NB-IoT/LTE.

Senzory se vzorkují každých `interval-sample` sekund. Každá položka seznamu `measurements` pokrývá jeden interval agregace dlouhý `interval-aggreg` sekund: `timestamp` je konec intervalu (unixový čas) a `min`, `max`, `avg` a `mdn` jsou minimum, maximum, průměr a medián vzorků z tohoto intervalu. Hodnoty `thermometer` a `accelerometer` pocházejí z posledního vzorku; hodnoty baterie ve struktuře `system` pocházejí z testu baterie, který běží každých 12 hodin. Při chybě čtení je hodnota `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Range posílá `message.version` `2`.

Kromě společných dat posílá zařízení CHESTER Range:

- [`ultrasonic_ranger`](#ultrasonic-ranger): vzdálenost ze senzoru MaxBotix MB7066
- [`w1_thermometers`](#w1-thermometers): teploměry DS18B20 1-Wire
- [`ble_tags`](#ble-tags): bluetoothové tagy

#### Ultrazvukový senzor vzdálenosti {#ultrasonic-ranger}

Struktura `ultrasonic_ranger` nese vzdálenost od senzoru MaxBotix MB7066 k nejbližšímu cíli:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ultrasonic_ranger.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `ultrasonic_ranger.measurements[].min`, `max`, `avg`, `mdn` | Vzdálenost k nejbližšímu cíli; cíl blíž než 0,20 m se změří jako 0,20 m a volná dráha jako 10,68 m | m | 0,20–10,68 | 0,01 m |

Rozsah vychází z produktového listu senzoru MB7066: senzor měří 20–1068 cm po krocích 1 cm.

#### Teploměry 1-Wire {#w1-thermometers}

Seznam `w1_thermometers` má jednu položku pro každý teploměr DS18B20 nalezený při startu, nejvýše deset. Seznam je v každém hlášení a naplní se, jakmile zařízení při startu najde teploměr.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Sériové číslo teploměru (48 bitů jeho kódu ROM 1-Wire) | | | |
| `w1_thermometers[].measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `w1_thermometers[].measurements[].min`, `max`, `avg`, `mdn` | Teplota | °C | −55 až 125 | 0,01 °C |

#### Bluetoothové tagy {#ble-tags}

Seznam `ble_tags` má jednu položku pro každý spárovaný [**bluetoothový tag**](../ble-tags.md), nejvýše osm. Seznam je v každém hlášení a naplní se, jakmile spárujete tag.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetoothová adresa tagu, 12 šestnáctkových číslic | | | |
| `ble_tags[].rssi` | Síla signálu tagu | dBm | −127 až −1 | 1 dBm |
| `ble_tags[].voltage` | Napětí baterie tagu | V | 2,0–4,55 | 0,01 V |
| `ble_tags[].temperature.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `ble_tags[].temperature.measurements[].min`, `max`, `avg`, `mdn` | Teplota | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `ble_tags[].humidity.measurements[].min`, `max`, `avg`, `mdn` | Relativní vlhkost | % | 0–100 | 0,01 % |

## CHESTER Range Z {#chester-range-z}

Varianta **CHESTER Range Z** je zařízení CHESTER Range se záložním modulem **CHESTER-Z1**:

- Při výpadku externího napájení běží dál na záložní baterii.
- Hlásí napětí externího napájení a záložní baterie a výpadek i obnovení externího napájení nahlásí okamžitě.

Tato varianta používá [**firmware CHESTER Range Z**](../../firmware/chester-range/chester-range-z.md).

### Hardware {#chester-range-z-hardware}

Hardware této varianty tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0A:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Záložní modul

### Nastavení {#chester-range-z-settings}

Varianta CHESTER Range Z používá nastavení zařízení [CHESTER Range](#settings) a tyto parametry:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Prodleva mezi změnou externího napájení a hlášením v sekundách; změny během prodlevy se odešlou ve stejném hlášení |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); limit počítá jen hlášení událostí |

### Data {#chester-range-z-data}

Varianta CHESTER Range Z posílá data zařízení [CHESTER Range](#data-over-lte) a strukturu [`backup`](#backup).

#### Záložní modul {#backup}

Varianta CHESTER Range Z přidává strukturu `backup`:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí na vstupu VIN modulu CHESTER-Z1: s připojeným externím napájením 6–26 V, po jeho odpojení blízko 0 | V | 0–26 | 0,01 V |
| `backup.batt_voltage` | Napětí záložní baterie; ochrana článek odpojí pod 3,2 V a nabíječka ho nabíjí na 4,2 V | V | 3,2–4,2 | 0,01 V |
| `backup.state` | Stav externího napájení | | `disconnected`, `connected` | |
| `backup.events[].timestamp` | Čas změny externího napájení (unixový čas); seznam obsahuje změny od předchozího hlášení, nejvýše 32 | s | | 1 s |
| `backup.events[].type` | Směr změny | | `disconnected`, `connected` | |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
