---
title: CHESTER Meteo
description: "CHESTER Meteo je katalogová aplikace pro sledování počasí: její hardware, varianty, nastavení, která měníte, a přesný formát odesílaných dat."
---

# CHESTER Meteo {#chester-meteo}

![CHESTER Meteo s externím vlhkoměrem a čtyřmi kabelovými průchodkami](/img/chester/catalog-applications/chester-meteo.webp)

Zařízení **CHESTER Meteo** měří vítr a další podmínky prostředí: rychlost a směr větru, srážky, atmosférický tlak, teplotu a vlhkost. Naměřené veličiny vzorkuje, za každý interval je agreguje a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Meteo](../../firmware/chester-meteo/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří rychlost větru (m/s), směr větru (0–360°) a srážky (mm) meteorologickými senzory připojenými ke vstupnímu modulu **CHESTER-X0B**.
- Měří atmosférický tlak (Pa) externím barometrem.
- Měří teplotu (°C) a vlhkost (%RH) externím vlhkoměrem **CHESTER-S2**.
- Čte teplotní sondy **DS18B20** 1-Wire a půdní senzory 1-Wire.
- Při překročení nastavené prahové hodnoty hlásí teplotní alarm.
- Sbírá hodnoty z bluetoothových senzorových tagů.
- Jiná sestavení firmwaru čtou pyranometr ([**CHESTER Meteo P**](../../firmware/chester-meteo/chester-meteo-p.md)) nebo meteostanici SenseCAP a senzor prachových částic Cubic přes Modbus ([**CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md)).

## Modely {#variants}

Aplikace CHESTER Meteo má základní model, katalogovou variantu CHESTER Meteo Z a dvě samostatná sestavení firmwaru, CHESTER Meteo P a CHESTER Meteo M (viz jejich stránky firmwaru). Každý model popisuje vlastní oddíl níže.

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Meteo**](#model-chester-meteo) | Základní model | [CHESTER Meteo](../../firmware/chester-meteo/index.md) |
| [**CHESTER Meteo Z**](#chester-meteo-z) | Záložní modul CHESTER-Z1 | [CHESTER Meteo Z](../../firmware/chester-meteo/chester-meteo-z.md) |
| [**CHESTER Meteo P**](#chester-meteo-p) | Samostatné sestavení firmwaru: pyranometr ve slotu B | [CHESTER Meteo P](../../firmware/chester-meteo/chester-meteo-p.md) |
| [**CHESTER Meteo M**](#chester-meteo-m) | Samostatné sestavení firmwaru: meteostanice SenseCAP a senzor prachových částic Cubic přes Modbus | [CHESTER Meteo M](../../firmware/chester-meteo/chester-meteo-m.md) |

## CHESTER Meteo {#model-chester-meteo}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X0B:A`: Vstupní modul (4 kanály)
* `CHESTER-S2`: Externí vlhkoměr
* Externí barometr
* `CHESTER-E10-LP`: Krabička se čtyřmi kabelovými průchodkami, průchodkou PG9, větrací membránou, držákem na sloup a pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Tyto parametry u zařízení CHESTER Meteo obvykle měníte. Parametr nastavíte příkazem `app config <parameter> <value>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Úplný seznam najdete na stránce [**Firmware CHESTER Meteo**](../../firmware/chester-meteo/index.md#configuration-parameters).

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `hygro_t_alarm_hi_report` | Hygro t alarm hi report | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru překročí horní prahovou hodnotu |
| `hygro_t_alarm_hi_thr` | Hygro t alarm hi threshold | `<-40.0..125.0>` | `0.0` | Horní prahová hodnota teploty v °C |
| `hygro_t_alarm_hi_hst` | Hygro t alarm hi hysteresis | `<0.0..100.0>` | `0.0` | Hystereze horní prahové hodnoty v °C |
| `hygro_t_alarm_lo_report` | Hygro t alarm lo report | `true`, `false` | `false` | Hlásit, když teplota na vlhkoměru klesne pod dolní prahovou hodnotu |
| `hygro_t_alarm_lo_thr` | Hygro t alarm lo threshold | `<-40.0..125.0>` | `0.0` | Dolní prahová hodnota teploty v °C |
| `hygro_t_alarm_lo_hst` | Hygro t alarm lo hysteresis | `<0.0..100.0>` | `0.0` | Hystereze dolní prahové hodnoty v °C |

Teplotní alarm sleduje teplotu vlhkoměru CHESTER-S2. Aplikace CHESTER Meteo píše jeho parametry s podtržítky (`hygro_t_alarm_hi_thr`). Horní alarm se zapne, když teplota vystoupí nad prahovou hodnotu zvýšenou o polovinu hystereze, a vypne se, když klesne pod prahovou hodnotu sníženou o polovinu hystereze. Dolní alarm se zapne pod prahovou hodnotou sníženou o polovinu hystereze a vypne se nad prahovou hodnotou zvýšenou o polovinu hystereze. Jak brzy a jak často hlášení alarmů odcházejí, určují parametry `event-report-delay` a `event-report-rate` popsané na stránce firmwaru.

### Data přes LTE {#data-over-lte}

Zařízení odesílá hlášení každých `interval-report` sekund; ve firmwaru v4.0.1 se doba mezi dvěma hlášeními náhodně mění až o ±20 %. Teplotní alarm vlhkoměru a u varianty CHESTER Meteo Z také výpadek nebo obnovení externího napájení odešlou hlášení navíc, pokud je jejich hlášení zapnuté. Většina hodnot je agregovaná: každá položka v `measurements` má časovou značku `timestamp` a hodnoty `min`, `max`, `avg` (průměr) a `mdn` (medián) ze vzorků odebíraných každých `interval-sample` sekund během jednoho intervalu `interval-aggreg`, takže hlášení obsahuje jednu položku za každou agregaci od předchozího hlášení. Směr větru a srážky mají místo toho za každý interval jedinou hodnotu `value`. Když čtení senzoru selže, je hodnota `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Meteo posílá `message.version` `1` a zrychlení jako `accelerometer.acceleration_x`, `acceleration_y` a `acceleration_z`.

Kromě společných dat posílá aplikace CHESTER Meteo:

- [`weather_station`](#weather-station): srážkoměr, anemometr a směrovka větru
- [`barometer`](#barometer): atmosférický tlak
- [`hygrometer`](#hygrometer): teplota, vlhkost a teplotní alarmy z vlhkoměru CHESTER-S2
- [`w1_thermometers`](#w1-thermometers): teploměry DS18B20
- [`soil_sensors`](#soil-sensors): vlhkost a teplota z půdních senzorů 1-Wire
- [`ble_tags`](#ble-tags): bluetoothové tagy

#### Meteorologické senzory {#weather-station}

`weather_station` obsahuje hodnoty srážkoměru, anemometru a směrovky větru na modulu CHESTER-X0 ve slotu A. Je v každém hlášení.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `weather_station.wind_speed.measurements[]` | Rychlost větru (min, max, avg, mdn); každý vzorek je průměrná rychlost od předchozího vzorku | m/s | neuvedeno | 0,01 m/s |
| `weather_station.wind_direction.measurements[].value` | Směr větru ve stupních od severu (90° je východ), vektorový průměr vzorků; `0` i tehdy, když se směr nepodařilo přečíst | ° | 0–359 | 1° |
| `weather_station.rainfall.measurements[].value` | Srážky za interval agregace; srážkoměr čítá po 0,2794 mm | mm | neuvedeno | 0,01 mm |

#### Barometr {#barometer}

`barometer` obsahuje atmosférický tlak z externího barometru (NXP MPL3115A2). Je v každém hlášení; odpojený barometr dává hodnoty `null`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `barometer.pressure.measurements[]` | Atmosférický tlak (min, max, avg, mdn) | Pa | 20000–110000 | 1 Pa |

#### Vlhkoměr {#hygrometer}

`hygrometer` obsahuje hodnoty vlhkoměru CHESTER-S2 (Sensirion SHT30). Je v každém hlášení; odpojený vlhkoměr CHESTER-S2 dává hodnoty `null`. Seznam `events` obsahuje teplotní alarmy od předchozího hlášení, nejvýše 32.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `hygrometer.temperature.measurements[]` | Teplota (min, max, avg, mdn) | °C | −40 až 125 | 0,01 °C |
| `hygrometer.temperature.events[].timestamp` | Čas události alarmu (unixový čas) | s | | 1 s |
| `hygrometer.temperature.events[].type` | `alarm_hi_activated`, `alarm_hi_deactivated`, `alarm_lo_activated` nebo `alarm_lo_deactivated` | | | |
| `hygrometer.humidity.measurements[]` | Relativní vlhkost (min, max, avg, mdn) | % | 0–100 | 0,01 % |

#### Teploměry 1-Wire {#w1-thermometers}

`w1_thermometers` má jednu položku pro každý teploměr DS18B20 nalezený na sběrnici 1-Wire, nejvýše 10.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Sériové číslo teploměru, 48 bitů z jeho paměti ROM 1-Wire | | | |
| `w1_thermometers[].measurements[]` | Teplota (min, max, avg, mdn) | °C | −55 až 125 | 0,01 °C |

#### Půdní senzory {#soil-sensors}

`soil_sensors` má jednu položku pro každý půdní senzor nalezený na sběrnici 1-Wire, nejvýše 10. Půdní senzor měří vlhkost kapacitně (ZSSC3123) a teplotu ve své horní části nad půdou (TMP112).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `soil_sensors[].serial_number` | Sériové číslo senzoru, 48 bitů z jeho paměti ROM 1-Wire | | | |
| `soil_sensors[].temperature.measurements[]` | Teplota v horní části senzoru (min, max, avg, mdn) | °C | −40 až 85 | 0,01 °C |
| `soil_sensors[].moisture.measurements[]` | Vlhkost jako surová hodnota kapacitního senzoru, zhruba 6500 na suchu a 13000 zcela ve vodě (min, max, avg, mdn) | | 0–16383 | 1 |

#### Bluetoothové tagy {#ble-tags}

`ble_tags` má jednu položku pro každý spárovaný bluetoothový tag (Teltonika EYE Sensor), nejvýše 8; viz [**Tagy BLE**](../ble-tags.md).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Adresa MAC tagu, 12 šestnáctkových číslic | | | |
| `ble_tags[].rssi` | Síla signálu tagu při posledním vzorku | dBm | −128 až −1 | 1 dBm |
| `ble_tags[].voltage` | Napětí baterie tagu při posledním vzorku | V | 2,00–4,55 | 0,01 V |
| `ble_tags[].temperature.measurements[]` | Teplota (min, max, avg, mdn) | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity.measurements[]` | Relativní vlhkost (min, max, avg, mdn) | % | 0–100 | 0,01 % |

### Data přes LoRaWAN {#data-over-lorawan}

Každá zpráva obsahuje společná pole LoRaWAN popsaná v článku [**Společné funkce**](../common-functionality.md#common-data-lorawan) a pole z tabulky níže.

V režimu LoRaWAN nese zpráva místo agregovaných hodnot poslední vzorek každé hodnoty. Dekodér vrací tato pole:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `wind_speed` | Rychlost větru, průměr od předchozího vzorku | m/s | neuvedeno | 0,01 m/s |
| `wind_direction` | Směr větru ve stupních od severu, jeden z 16 směrů | ° | 0–337 | 1° |
| `rainfall` | Srážky za poslední dokončený interval agregace | mm | neuvedeno | 0,01 mm |
| `hygro_temperature` | Teplota z vlhkoměru CHESTER-S2 | °C | −40 až 125 | 0,01 °C |
| `hygro_humidity` | Relativní vlhkost z vlhkoměru CHESTER-S2 | % | 0–100 | 0,5 % |
| `w1_thermometers[]` | Teplota každého teploměru DS18B20 | °C | −55 až 125 | 0,01 °C |
| `ble_tags[].temperature` | Teplota každého bluetoothového tagu | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity` | Relativní vlhkost každého bluetoothového tagu | % | 0–100 | 0,5 % |
| `barometer` | Atmosférický tlak | kPa | 20–110 | 0,001 kPa |
| `soil_sensors[].temperature` | Teplota každého půdního senzoru | °C | −40 až 85 | 0,01 °C |
| `soil_sensors[].moisture` | Vlhkost každého půdního senzoru, surová hodnota | | 0–16383 | 1 |

Zpráva má nejvýše 51 bajtů: 26 bajtů a k tomu 2 za každý teploměr DS18B20, 3 za každý bluetoothový tag a 4 za každý půdní senzor. Firmware v4.0.1 zprávu odešle, když se připojené senzory do tohoto limitu vejdou.

## CHESTER Meteo Z {#chester-meteo-z}

**CHESTER Meteo Z** je aplikace CHESTER Meteo se záložním modulem **CHESTER-Z1**. Při výpadku externího napájení běží dál na záložní baterii a výpadek i obnovení externího napájení okamžitě nahlásí.

Tato varianta používá [**firmware CHESTER Meteo Z**](../../firmware/chester-meteo/chester-meteo-z.md).

### Hardware {#chester-meteo-z-hardware}

Hardware této varianty tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X0B:A`: Vstupní modul (4 kanály)
* `CHESTER-Z1`: Záložní modul
* `CHESTER-S2`: Externí vlhkoměr
* Externí barometr
* `CHESTER-E10-LP`: Krabička se čtyřmi kabelovými průchodkami, průchodkou PG9, větrací membránou, držákem na sloup a pigtailem SMA

### Nastavení {#chester-meteo-z-settings}

Varianta CHESTER Meteo Z používá nastavení aplikace [CHESTER Meteo](#settings) a tyto parametry:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Okamžitě hlásit obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Okamžitě hlásit výpadek externího napájení |

Na hlášení o napájení se vztahují také parametry `event-report-delay` a `event-report-rate` popsané na stránce firmwaru.

### Data {#chester-meteo-z-data}

Varianta CHESTER Meteo Z posílá data aplikace [CHESTER Meteo](#data-over-lte) a navíc:

- strukturu `backup` popsanou níže, v každém hlášení
- hlášení navíc při výpadku nebo obnovení externího napájení, pokud je zapnutý odpovídající parametr `backup-report-*`

#### Záložní modul {#backup}

`backup` popisuje napájecí vstup modulu CHESTER-Z1. Seznam `events` obsahuje výpadky a obnovení externího napájení od předchozího hlášení, nejvýše 32.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí na vstupu DC modulu CHESTER-Z1: 6–26 V s připojeným externím napájením, při odpojeném blízko 0 | mV | 0–26000 | 1 mV |
| `backup.batt_voltage` | Napětí záložní baterie Li-Ion v modulu CHESTER-Z1 | mV | 3200–4200 | 1 mV |
| `backup.state` | Externí napájení: `connected` nebo `disconnected` | | | |
| `backup.events[].timestamp` | Čas změny (unixový čas) | s | | 1 s |
| `backup.events[].type` | `connected` (napájení se obnovilo) nebo `disconnected` (napájení vypadlo) | | | |

#### Přes LoRaWAN {#chester-meteo-z-data-lorawan}

Zpráva LoRaWAN nese stejná pole jako u aplikace [CHESTER Meteo](#data-over-lorawan).

## CHESTER Meteo P {#chester-meteo-p}

**CHESTER Meteo P** je samostatné sestavení firmwaru CHESTER Meteo pro pyranometr na analogových vstupech slotu B (viz jeho [stránku firmwaru](../../firmware/chester-meteo/chester-meteo-p.md)).

### Data {#data-chester-meteo-p}

Firmware [**CHESTER Meteo P**](../../firmware/chester-meteo/chester-meteo-p.md) posílá data aplikace [CHESTER Meteo](#data-over-lte) a navíc:

- strukturu `pyranometer` popsanou níže, v každém hlášení

#### Pyranometr {#pyranometer}

`pyranometer` obsahuje hodnoty pyranometru na analogových vstupech B0 a B1 slotu B; firmware odesílá změřené napětí. Firmware v4.0.1 bere časovou značku těchto položek z poslední agregace hlášení místo z první, takže dekódované časové značky jsou pozdější než skutečné.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `pyranometer.irradiance_1.measurements[]` | Napětí na analogovém vstupu B0 (min, max, avg, mdn) | mV | 0–3600 | 1 mV |
| `pyranometer.irradiance_2.measurements[]` | Napětí na analogovém vstupu B1 (min, max, avg, mdn) | mV | 0–3600 | 1 mV |

#### Přes LoRaWAN {#chester-meteo-p-data-lorawan}

Zpráva LoRaWAN nese stejná pole jako u aplikace [CHESTER Meteo](#data-over-lorawan).

## CHESTER Meteo M {#chester-meteo-m}

**CHESTER Meteo M** je samostatné sestavení firmwaru CHESTER Meteo pro meteostanici SenseCAP a senzor prachových částic Cubic na sběrnici Modbus (RS-485) modulu CHESTER-X2 (viz jeho [stránku firmwaru](../../firmware/chester-meteo/chester-meteo-m.md)).

### Nastavení {#settings-chester-meteo-m}

Firmware [**CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md) používá nastavení aplikace [CHESTER Meteo](#settings) a tyto parametry:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `meteo-type` | Meteo type | `none`, `lambrecht`, `sensecap-s1000`, `sensecap-s500` | `none` | Typ meteostanice na sběrnici Modbus |
| `meteo-addr` | Meteo addr | `<1-247>` | `1` | Adresa meteostanice na sběrnici Modbus |
| `pm-type` | Pm type | `none`, `cubic-6303` | `none` | Typ senzoru prachových částic |
| `pm-addr` | Pm addr | `<1-247>` | `1` | Adresa senzoru prachových částic na sběrnici Modbus |

Nastavení linky Modbus popisuje stránka [**Firmware CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md#configuration-parameters). Firmware v4.0.1 čte meteostanice SenseCAP S500 a S1000 a senzor Cubic; zařízení Modbus čte při každém vzorku dvakrát, proto nastavte `interval-aggreg` na méně než 16násobek `interval-sample`.

### Data {#data-chester-meteo-m}

Firmware [**CHESTER Meteo M**](../../firmware/chester-meteo/chester-meteo-m.md) posílá data aplikace [CHESTER Meteo](#data-over-lte) a navíc:

- struktury `sensecap` a `cubic_pm` popsané níže, každou, když je vybrané její zařízení Modbus

Ve struktuře `weather_station` posílá zástupné hodnoty, protože místo modulu CHESTER-X0 zabírá slot A modul CHESTER-X2.

#### Meteostanice SenseCAP {#sensecap}

`sensecap` se posílá, když má `meteo-type` hodnotu `sensecap-s500` nebo `sensecap-s1000`; klíče označené S1000 přicházejí jen s hodnotou `sensecap-s1000`. Firmware v4.0.1 vloží za každou skutečnou položku ještě jednu s hodnotami `null` a dekódované časové značky rozprostře na dvojnásobek skutečné doby (viz stránka firmwaru).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `sensecap.air_temperature.measurements[]` | Teplota vzduchu (min, max, avg, mdn) | °C | −40 až 85 | 0,01 °C |
| `sensecap.air_humidity.measurements[]` | Relativní vlhkost (min, max, avg, mdn) | % | 0–100 | 0,01 % |
| `sensecap.barometric_pressure.measurements[]` | Atmosférický tlak (min, max, avg, mdn) | Pa | 30000–125000 | 0,01 Pa |
| `sensecap.wind_direction_avg.measurements[]` | Průměrný směr větru podle meteostanice (min, max, avg, mdn) | ° | 0–360 | 0,1° |
| `sensecap.wind_speed_avg.measurements[]` | Průměrná rychlost větru podle meteostanice (min, max, avg, mdn) | m/s | 0–60 | 0,01 m/s |
| `sensecap.light_intensity.measurements[]` | Jen S1000: osvětlenost (min, max, avg, mdn) | lx | 0–188000 | 1 lx |
| `sensecap.accumulated_rainfall.measurements[]` | Jen S1000: úhrn srážek podle meteostanice (min, max, avg, mdn) | mm | 0–80000 | 0,01 mm |
| `sensecap.pm2_5.measurements[]`, `sensecap.pm10.measurements[]` | Jen S1000: prachové částice PM2,5 a PM10 (min, max, avg, mdn) | µg/m³ | 0–1000 | 0,1 µg/m³ |
| `sensecap.co2.measurements[]` | Jen S1000: koncentrace CO₂ (min, max, avg, mdn) | ppm | 400–5000, rozšířený rozsah do 10000 | 1 ppm |

#### Senzor prachových částic Cubic {#cubic-pm}

`cubic_pm` se posílá, když má `pm-type` hodnotu `cubic-6303`; přibývají v něm stejné položky s hodnotami `null` jako ve struktuře `sensecap`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `cubic_pm.tsp.measurements[]` | Celkový polétavý prach, TSP (min, max, avg, mdn) | µg/m³ | 0–1000 (zobrazí až 30000) | 1 µg/m³ |
| `cubic_pm.pm1_0.measurements[]`, `cubic_pm.pm2_5.measurements[]`, `cubic_pm.pm10.measurements[]` | Prachové částice PM1,0, PM2,5 a PM10 (min, max, avg, mdn) | µg/m³ | 0–1000 (zobrazí až 30000) | 1 µg/m³ |
| `cubic_pm.gas_flow.measurements[]` | Průtok vzorkovaného plynu senzorem, jmenovitě 1 L/min (min, max, avg, mdn) | L/min | neuvedeno | 0,01 L/min |

#### Přes LoRaWAN {#chester-meteo-m-data-lorawan}

Zpráva LoRaWAN nese stejná pole jako u aplikace [CHESTER Meteo](#data-over-lorawan); `wind_speed`, `wind_direction` a `rainfall` mají zástupné hodnoty, protože místo modulu CHESTER-X0 zabírá slot A modul CHESTER-X2.

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
