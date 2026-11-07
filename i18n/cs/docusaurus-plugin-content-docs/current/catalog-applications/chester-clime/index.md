---
title: CHESTER Clime
description: "CHESTER Clime je katalogová aplikace pro sledování teploty a vlhkosti: varianty, hardware, nastavení a přesný formát odesílaných dat."
---

# CHESTER Clime {#chester-clime}

![CHESTER Clime s průchodkou externího vlhkoměru](/img/chester/catalog-applications/chester-clime.webp)

Zařízení **CHESTER Clime** je senzor prostředí. Měří teplotu a vlhkost a výsledky odesílá do HARDWARIO Cloud: přes NB-IoT/LTE jako minimum, maximum, průměr a medián každého intervalu, přes LoRaWAN jako poslední naměřené hodnoty.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Clime](../../firmware/chester-clime/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří teplotu a vlhkost externím vlhkoměrem **CHESTER-S2**.
- Čte několik teplotních sond **DS18B20** 1-Wire a půdní senzory 1-Wire.
- Při překročení nastavené prahové hodnoty hlásí teplotní alarm.
- Při výpadku externího napájení běží dál na záložním modulu **CHESTER-Z** a změnu napájení nahlásí.
- Sbírá hodnoty z bluetoothových senzorových tagů.
- Ve variantách měří kvalitu vnitřního ovzduší multisenzorem **CHESTER-S1** nebo teplotu dvěma sondami Pt1000 či dvěma termočlánky typu K.

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Clime**](#model-chester-clime) | Základní model: externí vlhkoměr CHESTER-S2 | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime Z**](#chester-clime-z) | Záložní modul CHESTER-Z1 | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime IAQ**](#chester-clime-iaq) | Kvalita vnitřního ovzduší: CO₂, tlak, osvětlenost, pohyb | [CHESTER Clime IAQ](../../firmware/chester-clime/chester-clime-iaq.md) |
| [**CHESTER Clime 1W**](#chester-clime-1w) | Sondy DS18B20 | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime 1WH**](#chester-clime-1wh) | Sondy DS18B20 i vlhkoměr | [CHESTER Clime](../../firmware/chester-clime/index.md) |
| [**CHESTER Clime RTD**](#chester-clime-rtd) | Dvě sondy Pt1000 | [CHESTER Clime RTD](../../firmware/chester-clime/chester-clime-rtd.md) |
| [**CHESTER Clime TC**](#chester-clime-tc) | Dva termočlánky typu K | [CHESTER Clime TC](../../firmware/chester-clime/chester-clime-tc.md) |
| [**CHESTER Clime SPS30**](#chester-clime-sps30) | Senzor prachových částic Sensirion SPS30; samostatné sestavení firmwaru | [CHESTER Clime SPS30](../../firmware/chester-clime/chester-clime-sps30.md) |
| [**CHESTER Clime Radon**](#chester-clime-radon) | Radonová sonda Piketronic RPP-R na modulu CHESTER-X2; samostatné sestavení firmwaru | [CHESTER Clime Radon](../../firmware/chester-clime/chester-clime-radon.md) |

## CHESTER Clime {#model-chester-clime}

Základní model měří externím vlhkoměrem **CHESTER-S2** a používá hlavní [firmware CHESTER Clime](../../firmware/chester-clime/index.md).

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Tato nastavení u zařízení CHESTER Clime měníte nejčastěji. Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Všechny parametry včetně síťových najdete na stránce firmwaru v části [**Konfigurační parametry**](../../firmware/chester-clime/index.md#configuration-parameters).

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | Mode | `none`, `lte`, `lrw` | `none` | Síť: `lte` pro NB-IoT/LTE, `lrw` pro LoRaWAN; v režimu `none` zůstane zařízení mimo síť (viz [Konfigurace režimu sítě](../common-functionality.md#network-mode-configuration)) |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Jak často se senzory vzorkují, v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace v sekundách; každá položka v `measurements` pokrývá jeden interval a vznikne nejvýše z 32 vzorků (u bluetoothových tagů z 16) |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `hygro-t-alarm-hi-report` | Hygro t alarm hi report | `true`, `false` | `false` | Odeslat hlášení navíc, když teplota na vlhkoměru překročí horní prahovou hodnotu jedním či druhým směrem |
| `hygro-t-alarm-hi-thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | Horní prahová hodnota teploty v °C |
| `hygro-t-alarm-hi-hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | Hystereze horní prahové hodnoty v °C: alarm se zapne nad prahovou hodnotou zvýšenou o polovinu hystereze a vypne se pod prahovou hodnotou sníženou o polovinu |
| `hygro-t-alarm-lo-report` | Hygro t alarm lo report | `true`, `false` | `false` | Odeslat hlášení navíc, když teplota na vlhkoměru překročí dolní prahovou hodnotu jedním či druhým směrem |
| `hygro-t-alarm-lo-thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Dolní prahová hodnota teploty v °C |
| `hygro-t-alarm-lo-hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Hystereze dolní prahové hodnoty v °C: alarm se zapne pod prahovou hodnotou sníženou o polovinu hystereze a vypne se nad prahovou hodnotou zvýšenou o polovinu |

Hlášení navíc kvůli alarmu nebo změně napájení odejde `event-report-delay` sekund po změně (výchozí hodnota 1), a to nejvýše tolikrát za hodinu, kolik určuje `event-report-rate` (výchozí hodnota 30; firmware v4.0.1 jich pošle až o jedno víc).

### Data přes LTE {#data-over-lte}

Přes NB-IoT/LTE zařízení odesílá hlášení každých `interval-report` sekund s náhodnou odchylkou až ±20 % (viz [Rozptyl intervalu hlášení](../common-functionality.md#report-interval-jitter)); první hlášení odejde 10 s po startu. Alarm nebo změna napájení odešle hlášení navíc. Každý senzor se vzorkuje každých `interval-sample` sekund a na konci každého intervalu `interval-aggreg` se jeho vzorky spojí do jedné položky v `measurements`: časové značky `timestamp` (unixový čas konce intervalu) a hodnot `min`, `max`, `avg` (průměr) a `mdn` (medián) ze vzorků. Hlášení nese položky nasbírané od posledního úspěšného hlášení, ve výchozím nastavení přibližně 6; buffer pojme prvních 32 položek na senzor (16 na bluetoothový tag) a každé úspěšné hlášení ho vyprázdní. Při chybě čtení je hodnota `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Clime posílá `message.version` `2`.

Kromě společných dat odesílá aplikace CHESTER Clime:

- [`hygrometer`](#hygrometer): teplota a vlhkost z modulu CHESTER-S2 s událostmi alarmu
- [`w1_thermometers`](#w1-thermometers): teplota každé sondy DS18B20 1-Wire
- [`soil_sensors`](#soil-sensors): teplota a vlhkost každého půdního senzoru 1-Wire
- [`ble_tags`](#ble-tags): hodnoty každého zaregistrovaného bluetoothového tagu

Čím se od aplikace CHESTER Clime liší ostatní modely, popisují jejich vlastní oddíly; přehled je v části [Modely](#variants).

#### Vlhkoměr {#hygrometer}

Struktura se odesílá v každém hlášení.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `hygrometer.temperature.measurements[]` | Teplota vzduchu (SHT30 v modulu CHESTER-S2): `min`, `max`, `avg`, `mdn` | °C | −40 až 125 | 0,01 °C |
| `hygrometer.humidity.measurements[]` | Relativní vlhkost: `min`, `max`, `avg`, `mdn` | % | 0–100 | 0,01 % |
| `hygrometer.temperature.events[].type` | Změna alarmu se svou časovou značkou `timestamp`: `alarm_hi_activated`, `alarm_hi_deactivated`, `alarm_lo_activated` nebo `alarm_lo_deactivated` | | | |
| `hygrometer.temperature.events[].value` | Teplota na vlhkoměru, která změnu vyvolala | °C | −40 až 125 | 0,01 °C |

Seznam `events` obsahuje změny alarmu od předchozího hlášení, nejvýše 32: změny horního alarmu, když je `hygro-t-alarm-hi-report` nastavený na `true`, a změny dolního alarmu, když je `hygro-t-alarm-lo-report` nastavený na `true`.

#### Teploměry 1-Wire {#w1-thermometers}

Struktura se odesílá v každém hlášení každého firmwaru CHESTER Clime jako seznam 0–10 položek: jedna pro každou sondu DS18B20, kterou zařízení při startu najde na sběrnici 1-Wire.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Sériové číslo sondy | | | |
| `w1_thermometers[].measurements[]` | Teplota: `min`, `max`, `avg`, `mdn` | °C | −55 až 125 | 0,01 °C |

#### Půdní senzory {#soil-sensors}

Struktura se odesílá v každém hlášení každého firmwaru CHESTER Clime jako seznam 0–10 položek: jedna pro každý půdní senzor 1-Wire, který zařízení při startu najde.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `soil_sensors[].serial_number` | Sériové číslo senzoru | | | |
| `soil_sensors[].temperature.measurements[]` | Teplota v horní části senzoru nad půdou: `min`, `max`, `avg`, `mdn` | °C | −40 až 85 | 0,01 °C |
| `soil_sensors[].moisture.measurements[]` | Vlhkost půdy jako surová hodnota kapacitního senzoru, zhruba 6500 v suchu a 13000 ve vodě: `min`, `max`, `avg`, `mdn` | | 0–16383 | 1 |

#### Bluetoothové tagy {#ble-tags}

Struktura se odesílá v každém hlášení každého firmwaru CHESTER Clime jako seznam 0–8 položek: jedna pro každý zaregistrovaný tag Teltonika EYE Sensor (viz [Bluetooth tagy](../ble-tags.md)).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetoothová adresa tagu, 12 šestnáctkových číslic | | | |
| `ble_tags[].rssi` | Síla signálu tagu při posledním vzorku | dBm | −128 až −1 | 1 dBm |
| `ble_tags[].voltage` | Napětí baterie tagu při posledním vzorku | V | 2,00–4,55 | 0,01 V |
| `ble_tags[].temperature.measurements[]` | Teplota: `min`, `max`, `avg`, `mdn` | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity.measurements[]` | Relativní vlhkost: `min`, `max`, `avg`, `mdn` | % | 0–100 | 0,01 % |

### Data přes LoRaWAN {#data-over-lorawan}

Každá zpráva obsahuje společná pole LoRaWAN popsaná v článku [**Společné funkce**](../common-functionality.md#common-data-lorawan) a pole z tabulky níže.

Přes LoRaWAN zařízení odesílá uplink každých `interval-report` sekund se stejnou náhodnou odchylkou a po alarmu nebo změně napájení uplink navíc. Uplink nese poslední vzorek každého senzoru. Uplink pojme nejvýše 51 bajtů a odejde, když se do nich hodnoty připojených senzorů vejdou. Dekodér `codec/cs-decoder.js` ze SDK CHESTER vrací pro aplikaci CHESTER Clime tato pole:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `hygro_temperature` | Teplota vzduchu z modulu CHESTER-S2 | °C | −40 až 125 | 0,01 °C |
| `hygro_humidity` | Relativní vlhkost z modulu CHESTER-S2 | % | 0–100 | 0,5 % |
| `w1_thermometers[]` | Teplota každé sondy DS18B20 v pořadí, v jakém je zařízení našlo | °C | −55 až 125 | 0,01 °C |
| `soil_sensors[].temperature` | Teplota každého půdního senzoru | °C | −40 až 85 | 0,01 °C |
| `soil_sensors[].moisture` | Vlhkost půdy z každého půdního senzoru, surová hodnota | | 0–16383 | 1 |
| `ble_tags[].temperature` | Teplota každého zaregistrovaného bluetoothového tagu | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity` | Relativní vlhkost každého zaregistrovaného bluetoothového tagu | % | 0–100 | 0,5 % |

## CHESTER Clime Z {#chester-clime-z}

Aplikace CHESTER Clime se záložním modulem **CHESTER-Z1**. Při výpadku externího napájení běží dál na záložní baterii a výpadek i obnovení externího napájení okamžitě nahlásí.

Používá hlavní [firmware CHESTER Clime](../../firmware/chester-clime/index.md), který záložní modul rozpozná za běhu.

### Hardware {#chester-clime-z-hardware}

Hardware tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-Z1`: Záložní modul
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

### Nastavení {#chester-clime-z-settings}

Varianta CHESTER Clime Z používá všechna nastavení aplikace [CHESTER Clime](#settings) a přidává tato:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Odeslat hlášení navíc, když se externí napájení obnoví |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Odeslat hlášení navíc, když externí napájení vypadne |

Úplný seznam najdete na stránce [firmwaru CHESTER Clime](../../firmware/chester-clime/index.md#configuration-parameters).

### Data {#chester-clime-z-data}

Varianta CHESTER Clime Z odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`backup`](#backup), [`hygrometer`](#hygrometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags).

#### Záložní modul {#backup}

Struktura se odesílá v každém hlášení každého firmwaru CHESTER Clime, když zařízení při startu rozpoznalo záložní modul CHESTER-Z, jako u varianty CHESTER Clime Z. Firmware CHESTER Clime IAQ ji odesílá v každém hlášení a plní ji ze záložního modulu CHESTER-Z; se samotným modulem CHESTER-X10 jsou obě napětí `0` a `state` je `disconnected`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí na vstupu externího napájení při posledním vzorku: s připojeným externím napájením 6–26 V, po jeho odpojení blízko 0 | V | 0–26 | 0,01 V |
| `backup.batt_voltage` | Napětí záložní baterie při posledním vzorku | V | 3,2–4,2 | 0,01 V |
| `backup.state` | Externí napájení: `connected` nebo `disconnected` | | | |
| `backup.events[].type` | Změna externího napájení se svou časovou značkou `timestamp`: `connected` nebo `disconnected` | | | |

Seznam `events` obsahuje každý výpadek a obnovení externího napájení od předchozího hlášení, nejvýše 32. Dokud jsou `backup-report-disconnected` a `backup-report-connected` nastavené na `true` (výchozí stav), odešle každá změna i hlášení navíc.

#### Přes LoRaWAN {#chester-clime-z-data-lorawan}

Uplink nese [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan) a pole aplikace [CHESTER Clime](#data-over-lorawan): `hygro_temperature`, `hygro_humidity`, `w1_thermometers[]`, `soil_sensors[]` a `ble_tags[]`. Změna napájení odešle uplink navíc.

## CHESTER Clime IAQ {#chester-clime-iaq}

![CHESTER Clime IAQ: bílá krabička s tlačítkem a čočkou senzoru PIR ve víku a s napájecím konektorem na boku](/img/chester/catalog-applications/chester-clime-iaq.webp)

Varianta pro měření kvality vnitřního ovzduší. Integrovaný multisenzor **CHESTER-S1** měří teplotu, vlhkost, osvětlenost, koncentraci CO₂ a atmosférický tlak a senzorem PIR detekuje pohyb. Zařízení hlásí stisky tlačítka se zvukovou a světelnou odezvou a barva LED v tlačítku ukazuje úroveň CO₂. Napájí se externě 6–28 V přes modul **CHESTER-X10** se záložní baterií Li-Ion.

Používá [firmware CHESTER Clime IAQ](../../firmware/chester-clime/chester-clime-iaq.md).

### Hardware {#chester-clime-iaq-hardware}

Hardware tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S1-BCMP`: Integrovaný multisenzor
* `CHESTER-X10`: Externí napájení 6–28 V s baterií Li-Ion
* `CHESTER-E7-LP`: Krabička s pigtailem SMA

### Nastavení {#chester-clime-iaq-settings}

Varianta CHESTER Clime IAQ používá tato nastavení aplikace [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` a `interval-report`. Přidává tato nastavení:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `iaq-led-thr-warning` | IAQ LED threshold warning | `<-40.0..5000.0>` | `800.0` | Koncentrace CO₂ v ppm, při které se tlačítko rozsvítí oranžově |
| `iaq-led-thr-alarm` | IAQ LED threshold alarm | `<-40.0..5000.0>` | `1600.0` | Koncentrace CO₂ v ppm, při které se tlačítko rozsvítí červeně |
| `iaq-led-hst` | IAQ LED hysteresis | `<-40.0..125.0>` | `50.0` | Hystereze obou prahových hodnot v ppm: barva se posune výš při prahové hodnotě zvýšené o hysterezi a zpět při prahové hodnotě snížené o hysterezi |

Se záložním modulem CHESTER-Z používá také nastavení `backup-report-*` varianty [CHESTER Clime Z](#chester-clime-z-settings). Úplný seznam najdete na stránce [firmwaru CHESTER Clime IAQ](../../firmware/chester-clime/chester-clime-iaq.md#configuration-parameters).

### Data {#chester-clime-iaq-data}

Varianta CHESTER Clime IAQ odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`iaq_sensor`](#iaq-sensor), [`backup`](#backup), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags). Struktura `backup` je v každém hlášení a plní se ze záložního modulu CHESTER-Z; se samotným modulem CHESTER-X10 jsou obě napětí `0` a `state` je `disconnected`.

#### Senzor kvality vnitřního ovzduší {#iaq-sensor}

Struktura se odesílá v každém hlášení firmwaru CHESTER Clime IAQ, s multisenzorem CHESTER-S1.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `iaq_sensor.temperature.measurements[]` | Teplota vzduchu: `min`, `max`, `avg`, `mdn` | °C | −40 až 125 | 0,01 °C |
| `iaq_sensor.humidity.measurements[]` | Relativní vlhkost: `min`, `max`, `avg`, `mdn` | % | 0–100 | 0,01 % |
| `iaq_sensor.illuminance.measurements[]` | Osvětlenost: `min`, `max`, `avg`, `mdn` | lx | neuvedeno | 1 lx |
| `iaq_sensor.altitude.measurements[]` | Nadmořská výška odvozená z tlaku vzduchu: `min`, `max`, `avg`, `mdn` | m | neuvedeno | 1 m |
| `iaq_sensor.pressure.measurements[]` | Atmosférický tlak: `min`, `max`, `avg`, `mdn` | Pa | 20000–110000 | 1 Pa |
| `iaq_sensor.co2_conc.measurements[]` | Koncentrace CO₂: `min`, `max`, `avg`, `mdn` | ppm | 0–10000 | 1 ppm |
| `iaq_sensor.motion_count.measurements[].value` | Počet pohybů zachycených senzorem PIR od startu zařízení, odečtený na konci každého intervalu agregace | | 0–2147483647 | 1 |
| `iaq_sensor.press_count.measurements[].value` | Počet stisků tlačítka od startu zařízení; každý stisk přidá položku a okamžitě odešle hlášení | | 0–2147483647 | 1 |

#### Přes LoRaWAN {#chester-clime-iaq-data-lorawan}

S firmwarem v4.0.1 nese uplink [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan) a tato pole aplikace [CHESTER Clime](#data-over-lorawan): `w1_thermometers[]`, `soil_sensors[]` a `ble_tags[]`.

## CHESTER Clime 1W {#chester-clime-1w}

Teplotu měří několika sondami **DS18B20** 1-Wire. Krabička má 8 kabelových průchodek pro kabely sond.

Používá hlavní [firmware CHESTER Clime](../../firmware/chester-clime/index.md), který podporu sond DS18B20 1-Wire obsahuje.

### Hardware {#chester-clime-1w-hardware}

Hardware tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-E8-LP`: Krabička s 8 kabelovými průchodkami (RM8L-4S)

### Nastavení {#chester-clime-1w-settings}

Varianta CHESTER Clime 1W používá tato nastavení aplikace [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` a `interval-report`.

### Data {#chester-clime-1w-data}

Varianta CHESTER Clime 1W odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`hygrometer`](#hygrometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags). Struktura `hygrometer` nese hodnoty `null`; struktura `w1_thermometers` má jednu položku pro každou připojenou sondu DS18B20, nejvýše 10.

#### Přes LoRaWAN {#chester-clime-1w-data-lorawan}

Uplink nese [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan) a pole aplikace [CHESTER Clime](#data-over-lorawan): `hygro_temperature` a `hygro_humidity` s hodnotou `null`, `w1_thermometers[]` s jednou hodnotou pro každou sondu, `soil_sensors[]` a `ble_tags[]`.

## CHESTER Clime 1WH {#chester-clime-1wh}

K vlhkoměru **CHESTER-S2** přidává několik teplotních sond **DS18B20** 1-Wire. Krabička má 8 kabelových průchodek pro kabely sond.

Používá hlavní [firmware CHESTER Clime](../../firmware/chester-clime/index.md), který podporu sond DS18B20 1-Wire i modulu CHESTER-S2 obsahuje.

### Hardware {#chester-clime-1wh-hardware}

Hardware tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-S2`: Externí vlhkoměr
* `CHESTER-E8-LP`: Krabička s 8 kabelovými průchodkami (RM8L-4S)

### Nastavení {#chester-clime-1wh-settings}

Varianta CHESTER Clime 1WH používá všechna nastavení aplikace [CHESTER Clime](#settings).

### Data {#chester-clime-1wh-data}

Varianta CHESTER Clime 1WH odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`hygrometer`](#hygrometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags); struktura `w1_thermometers` má jednu položku pro každou připojenou sondu DS18B20, nejvýše 10. Přes LoRaWAN odesílá uplink aplikace [CHESTER Clime](#data-over-lorawan).

## CHESTER Clime RTD {#chester-clime-rtd}

Teplotu měří dvěma čtyřvodičovými sondami Pt1000 na modulu **CHESTER-X3A**. Krabička má 2 kabelové průchodky PG7 pro kabely sond.

Používá [firmware CHESTER Clime RTD](../../firmware/chester-clime/chester-clime-rtd.md).

### Hardware {#chester-clime-rtd-hardware}

Hardware tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X3A:A`: Rozhraní pro 2x Pt100/Pt1000
* `CHESTER-E13-LP`: Krabička s pigtailem SMA a 2 kabelovými průchodkami PG7

### Nastavení {#chester-clime-rtd-settings}

Varianta CHESTER Clime RTD používá tato nastavení aplikace [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` a `interval-report`. Úplný seznam najdete na stránce [firmwaru CHESTER Clime RTD](../../firmware/chester-clime/chester-clime-rtd.md#configuration-parameters).

### Data {#chester-clime-rtd-data}

Varianta CHESTER Clime RTD odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`rtd_thermometer`](#rtd-thermometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags).

#### Odporové teploměry {#rtd-thermometer}

Struktura se odesílá v každém hlášení firmwaru CHESTER Clime RTD: dvě položky, pro vstupy 1 a 2 modulu CHESTER-X3A ve slotu A.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `rtd_thermometer[].channel` | Vstup modulu CHESTER-X3A | | 1–2 | 1 |
| `rtd_thermometer[].measurements[]` | Teplota sondy Pt1000: `min`, `max`, `avg`, `mdn` | °C | neuvedeno | 0,01 °C |

#### Přes LoRaWAN {#chester-clime-rtd-data-lorawan}

Uplink nese [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan), pole `w1_thermometers[]`, `soil_sensors[]` a `ble_tags[]` aplikace [CHESTER Clime](#data-over-lorawan) a toto pole:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `rtd_thermometers[]` | Teplota obou sond Pt1000 | °C | neuvedeno | 0,01 °C |

## CHESTER Clime TC {#chester-clime-tc}

Teplotu měří dvěma termočlánky **typu K** na modulu **CHESTER-X3B**. Krabička má 2 kabelové průchodky PG7 pro kabely termočlánků.

Používá [firmware CHESTER Clime TC](../../firmware/chester-clime/chester-clime-tc.md).

### Hardware {#chester-clime-tc-hardware}

Hardware tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X3B:A`: Rozhraní pro 2x termočlánek typu K
* `CHESTER-E13-LP`: Krabička s pigtailem SMA a 2 kabelovými průchodkami PG7

### Nastavení {#chester-clime-tc-settings}

Varianta CHESTER Clime TC používá tato nastavení aplikace [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` a `interval-report`. Úplný seznam najdete na stránce [firmwaru CHESTER Clime TC](../../firmware/chester-clime/chester-clime-tc.md#configuration-parameters).

### Data {#chester-clime-tc-data}

Varianta CHESTER Clime TC odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`tc_thermometer`](#tc-thermometer), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags).

#### Termočlánky {#tc-thermometer}

Struktura se odesílá v každém hlášení firmwaru CHESTER Clime TC: dvě položky, pro vstupy 1 a 2 modulu CHESTER-X3B ve slotu A.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `tc_thermometer[].channel` | Vstup modulu CHESTER-X3B | | 1–2 | 1 |
| `tc_thermometer[].measurements[]` | Teplota na termočlánku typu K se studeným koncem kompenzovaným teploměrem na základní desce: `min`, `max`, `avg`, `mdn` | °C | neuvedeno | 0,01 °C |

#### Přes LoRaWAN {#chester-clime-tc-data-lorawan}

Uplink nese [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan), pole `w1_thermometers[]`, `soil_sensors[]` a `ble_tags[]` aplikace [CHESTER Clime](#data-over-lorawan) a toto pole:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `tc_thermometers[]` | Teplota obou termočlánků typu K | °C | neuvedeno | 0,01 °C |

## CHESTER Clime SPS30 {#chester-clime-sps30}

CHESTER Clime SPS30 je samostatné sestavení firmwaru pro senzor prachových částic **Sensirion SPS30**; jeho hardware a parametry popisuje stránka [firmwaru CHESTER Clime SPS30](../../firmware/chester-clime/chester-clime-sps30.md).

### Data {#data-chester-clime-sps30}

Firmware CHESTER Clime SPS30 odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`sps30`](#sps30), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags).

#### Senzor prachových částic {#sps30}

Struktura se odesílá v každém hlášení firmwaru CHESTER Clime SPS30, se senzorem Sensirion SPS30.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `sps30.pm1`, `sps30.pm2_5`, `sps30.pm4`, `sps30.pm10` | Hmotnostní koncentrace částic do 1, 2,5, 4 a 10 µm, každá s `measurements[]`: `min`, `max`, `avg`, `mdn` | µg/m³ | 0–1000 | 0,01 µg/m³ |
| `sps30.num_pm0_5`, `sps30.num_pm1`, `sps30.num_pm2_5`, `sps30.num_pm4`, `sps30.num_pm10` | Početní koncentrace částic do 0,5, 1, 2,5, 4 a 10 µm, každá s `measurements[]`: `min`, `max`, `avg`, `mdn` | #/cm³ | 0–3000 | 0,01 #/cm³ |

#### Přes LoRaWAN {#chester-clime-sps30-data-lorawan}

S firmwarem v4.0.1 nese uplink [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan) a tato pole aplikace [CHESTER Clime](#data-over-lorawan): `w1_thermometers[]`, `soil_sensors[]` a `ble_tags[]`.

## CHESTER Clime Radon {#chester-clime-radon}

CHESTER Clime Radon je samostatné sestavení firmwaru pro radonovou sondu **Piketronic RPP-R** na modulu CHESTER-X2; jeho hardware a parametry popisuje stránka [firmwaru CHESTER Clime Radon](../../firmware/chester-clime/chester-clime-radon.md).

### Nastavení {#settings-chester-clime-radon}

Firmware CHESTER Clime Radon používá tato nastavení aplikace [CHESTER Clime](#settings): `mode`, `interval-sample`, `interval-aggreg` a `interval-report`. Přidává nastavení připojení sondy přes Modbus; nastavíte je příkazem `radon config <parametr> <hodnota>` a uplatníte příkazem `config save`:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `19200` | Přenosová rychlost |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | Adresa sondy na sběrnici Modbus |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even` | `even` | Parita |
| `modbus-stop-bits` | Modbus stop bits | `1`, `2` | `1` | Počet stop bitů |

Hodnoty musí odpovídat přepínačům DIP na sondě. Úplný seznam najdete na stránce [firmwaru CHESTER Clime Radon](../../firmware/chester-clime/chester-clime-radon.md#configuration-parameters).

### Data {#data-chester-clime-radon}

Firmware CHESTER Clime Radon odesílá [společná data](../common-functionality.md#common-data-lte) a tyto struktury: [`radon_probe`](#radon-probe), [`w1_thermometers`](#w1-thermometers), [`soil_sensors`](#soil-sensors) a [`ble_tags`](#ble-tags).

#### Radonová sonda {#radon-probe}

Struktura se odesílá v každém hlášení firmwaru CHESTER Clime Radon, se sondou Piketronic RPP-R na modulu CHESTER-X2.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `radon_probe.concentration_hourly.measurements[].value` | Koncentrace radonu, klouzavý průměr za poslední hodinu, odečtená na konci každého intervalu agregace | Bq/m³ | 100–500000 | 1 Bq/m³ |
| `radon_probe.concentration_daily.measurements[].value` | Koncentrace radonu, klouzavý průměr za poslední den, odečtená na konci každého intervalu agregace | Bq/m³ | 20–500000 | 1 Bq/m³ |
| `radon_probe.chamber_temperature.measurements[]` | Teplota v měřicí komoře: `min`, `max`, `avg`, `mdn` | °C | −40 až 125 | 1 °C |
| `radon_probe.chamber_humidity.measurements[]` | Relativní vlhkost v měřicí komoře: `min`, `max`, `avg`, `mdn` | % | 0–100 | 1 % |

#### Přes LoRaWAN {#chester-clime-radon-data-lorawan}

S firmwarem v4.0.1 nese uplink [společná pole LoRaWAN](../common-functionality.md#common-data-lorawan) a tato pole aplikace [CHESTER Clime](#data-over-lorawan): `w1_thermometers[]`, `soil_sensors[]` a `ble_tags[]`.

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
