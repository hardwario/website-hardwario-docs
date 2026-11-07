---
title: CHESTER Control
description: "Zařízení CHESTER Control sleduje vstupy a spíná výstupy: hardware, zapojení, varianta, nastavení, která obvykle měníte, a přesná data, která odesílá."
---

# CHESTER Control {#chester-control}

![Zařízení CHESTER Control zepředu s anténním konektorem nahoře a čtyřmi kabelovými průchodkami dole](/img/chester/catalog-applications/chester-control.webp)

Zařízení **CHESTER Control** sleduje digitální a analogové vstupy a na pokyn z HARDWARIO Cloud spíná výstupy. Zaznamenává změny vstupů, počítá impulzy, měří napětí a proud a data odesílá přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Control](../../firmware/chester-control/index.md)**.

:::

## Co umí {#what-it-can-do}

- Čte čtyři vstupy modulu **CHESTER-X0**, každý nastavený jako vstup trigger, counter, voltage nebo current.
- Každou změnu digitálního vstupu zaznamená s časovou značkou a umí ji nahlásit okamžitě.
- Počítá impulzy, například z výstupu S0 měřiče energie.
- Měří napětí 0–26 V a proud 0–24 mA, což pokrývá proudové smyčky 4–20 mA.
- Na dálku z HARDWARIO Cloud spíná čtyři výstupy modulu **CHESTER-X4**, které přivádějí napětí ze vstupu VIN.
- Čte teplotní sondy **DS18B20** 1-Wire, půdní senzory 1-Wire a bluetoothové senzorové tagy.
- Se záložním modulem **CHESTER-Z1** (CHESTER Control Z) při výpadku externího napájení běží dál a změnu napájení nahlásí.

## Vstupy a výstupy {#inputs-and-outputs}

Zařízení **CHESTER Control** má tyto čtyři vstupy:

| **Typ**  | **Kanál**   | **Svorka**   | **Typ vstupu**    | **Rozsah vstupu** | **Typické použití**                   |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digitální (NPN/PNP) | 0 až 28 V      | Spínač, tlačítko, relé, senzor PLC    |
| Counter  | CH2         | A4           | Digitální (NPN/PNP) | 0 až 28 V      | Impulzní výstupy měřičů energie (např. S0) |
| Voltage  | CH3         | A5           | Analogový (napětí) | 0 až 26 V       | Různé napěťové převodníky             |
| Current  | CH4         | A7           | Analogový (proud) | 0 až 24 mA      | Různé proudové převodníky             |

Každý kanál lze v konfiguraci firmwaru přepnout na kterýkoli ze čtyř typů; tabulka ukazuje typické přiřazení. Vstupy a jejich možnosti podrobně popisuje stránka [**Firmware CHESTER Control**](../../firmware/chester-control/index.md#measurement-and-behavior).

Zařízení **CHESTER Control** navíc umí na dálku ovládat 4 digitální výstupy (6–28 V).

## Svorkovnice {#terminal-blocks}

| CHESTER-X0B v levém slotu A (signály A1–A8) | CHESTER-X4 v pravém slotu B (signály B1–B8)                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Použijte vstupy **CH1** až **CH4** a **GND** | Externí napájení připojte na **VIN** a **GND**.                                              |
|                                             | Použijte výstupy **CH1** až **CH4**; zapnutý výstup přivádí napětí z **VIN**                 |
| ![Rozložení svorek CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../../chester/extension-modules/images/tb-chester-x0.png) | ![Rozložení svorek CHESTER-X4: GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../../../../../chester/extension-modules/images/tb-chester-x4.png)                                                  |

Schéma zapojení zařízení **CHESTER Control** najdete v [**popisu svorkovnice**](../../extension-modules/chester-x0.md) rozšiřujícího modulu **CHESTER-X0**.
Rozšiřující modul **CHESTER-X0** je osazený v levém slotu **A**, takže použijte odpovídající svorky **A1** až **A8**.

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Control**](#model-chester-control) | Základní model | [CHESTER Control](../../firmware/chester-control/index.md) |
| [**CHESTER Control Z**](#chester-control-z) | Záložní modul CHESTER-Z1 | [CHESTER Control Z](../../firmware/chester-control/chester-control-z.md) |
| [**CHESTER Control 8Ch Z**](#chester-control-8ch-z) | Moduly CHESTER-X0 ve slotech A a B, záložní modul CHESTER-Z; samostatné sestavení firmwaru (viz jeho stránka firmwaru) | [CHESTER Control 8Ch Z](../../firmware/chester-control/chester-control-8ch-z.md) |

## CHESTER Control {#model-chester-control}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down měnič a výstupy (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Toto jsou nastavení, která u zařízení CHESTER Control obvykle měníte. Parametr nastavíte příkazem `app config <parameter> <value>` a změny uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Úplný seznam najdete v [**konfiguračních parametrech**](../../firmware/chester-control/index.md#configuration-parameters) firmwaru.

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | Mode | `none`, `lte`, `lrw` | `none` | Síť: `lte` pro NB-IoT/LTE, `lrw` pro LoRaWAN, `none` nechá rádio vypnuté; síť nastavte jako první |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `channel-mode-1` | Channel mode 1 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 1 (svorka A2) |
| `channel-mode-2` | Channel mode 2 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 2 (svorka A4) |
| `channel-mode-3` | Channel mode 3 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 3 (svorka A5) |
| `channel-mode-4` | Channel mode 4 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 4 (svorka A7) |
| `trigger-input-type` | Trigger input type | `npn`, `pnp` | `npn` | Vstupní logika kanálů typu trigger |
| `trigger-duration-active` | Trigger duration active | `<0-60000>` | `100` | Minimální trvání aktivní úrovně na vstupu trigger v milisekundách |
| `trigger-duration-inactive` | Trigger duration inactive | `<0-60000>` | `100` | Minimální trvání neaktivní úrovně na vstupu trigger v milisekundách |
| `trigger-report-active` | Trigger report active | `true`, `false` | `false` | Hlásit okamžitě, když vstup trigger přejde do stavu active |
| `trigger-report-inactive` | Trigger report inactive | `true`, `false` | `false` | Hlásit okamžitě, když vstup trigger přejde do stavu inactive |
| `event-report-delay` | Event report delay | `<1-86400>` | `5` | Prodleva mezi událostí a hlášením v sekundách; změny během prodlevy se odešlou ve stejném hlášení |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); limit počítá jen hlášení událostí |
| `counter-input-type` | Counter input type | `npn`, `pnp` | `npn` | Vstupní logika kanálů typu counter |
| `counter-duration-active` | Counter duration active | `<0-60000>` | `2` | Minimální trvání aktivní úrovně na vstupu counter v milisekundách |
| `counter-duration-inactive` | Counter duration inactive | `<0-60000>` | `2` | Minimální trvání neaktivní úrovně na vstupu counter v milisekundách |
| `counter-interval-aggreg` | Counter interval aggreg | `<1-86400>` | `300` | Interval agregace kanálů typu counter v sekundách |
| `analog-interval-sample` | Analog interval sample | `<1-86400>` | `60` | Interval vzorkování kanálů typu voltage a current a bluetoothových tagů v sekundách |
| `analog-interval-aggreg` | Analog interval aggreg | `<1-86400>` | `300` | Interval agregace kanálů typu voltage a current a bluetoothových tagů v sekundách |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Interval vzorkování teploměrů DS18B20 a půdních senzorů v sekundách |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Interval agregace teploměrů DS18B20 a půdních senzorů v sekundách |

Parametry pro trigger, counter a analogové vstupy platí pro kanály v odpovídajícím režimu. Síťový režim popisuje článek [**Konfigurace režimu sítě**](../common-functionality.md#network-mode-configuration).

Intervaly volte tak, aby stačily buffery. Mezi dvěma agregacemi si každý kanál typu voltage nebo current uchová nejvýše 64 vzorků, každý senzor 1-Wire 32 a každý bluetoothový tag 16. Mezi dvěma hlášeními si každý kanál typu counter, voltage a current a každý teploměr DS18B20 uchová nejvýše 64 agregovaných hodnot, každý půdní senzor 32, každý bluetoothový tag 16 a každý kanál typu trigger 128 událostí. Další hodnoty se zahazují.

### Data přes LTE {#data-over-lte}

Zařízení CHESTER Control odesílá hlášení každých `interval-report` sekund, náhodně posunuté nejvýše o ±20 % intervalu. Změna vstupu trigger přidá samostatné hlášení, když je zapnutý parametr `trigger-report-active` nebo `trigger-report-inactive`, a varianta CHESTER Control Z hlásí také změnu externího napájení. Přes NB-IoT/LTE nese hlášení vše, co zařízení od předchozího hlášení nasbíralo; přes LoRaWAN jen poslední hodnoty.

Každá položka seznamu `measurements` pokrývá jeden interval agregace: `timestamp` je konec intervalu (unixový čas) a `min`, `max`, `avg` a `mdn` jsou minimum, maximum, průměr a medián vzorků z tohoto intervalu. Hodnoty `thermometer` a `accelerometer` pocházejí z posledního vzorku, který zařízení odebírá každých 60 sekund; hodnoty baterie ve struktuře `system` pocházejí z testu baterie, který běží každých 12 hodin. Při chybě čtení je hodnota `null`. Výstupy modulu CHESTER-X4 se řídí downlinky popsanými v části [**Řízení výstupů**](../../firmware/chester-control/index.md#output-control).

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Control posílá `message.version` `1`.

Kromě společných dat posílá zařízení CHESTER Control:

- [`trigger`](#trigger): kanály v režimu trigger
- [`counter`](#counter): kanály v režimu counter
- [`voltage`](#voltage): kanály v režimu voltage
- [`current`](#current): kanály v režimu current
- [`w1_thermometers`](#w1-thermometers): teploměry DS18B20 1-Wire
- [`soil_sensors`](#soil-sensors): půdní senzory 1-Wire
- [`ble_tags`](#ble-tags): bluetoothové tagy

Každý vstupní kanál se objeví v seznamu svého režimu: `trigger`, `counter`, `voltage` nebo `current`. Všechny čtyři seznamy jsou v každém hlášení; seznam se naplní, jakmile do jeho režimu přepnete kanál.

#### Kanály v režimu trigger {#trigger}

Kanály v režimu `trigger`:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `trigger[].channel` | Číslo kanálu (1 = svorka A2, 2 = A4, 3 = A5, 4 = A7) | | 1–4 | |
| `trigger[].state` | Stav vstupu v okamžiku hlášení | | `inactive`, `active` | |
| `trigger[].events[].timestamp` | Čas změny vstupu (unixový čas); seznam obsahuje změny od předchozího hlášení, nejvýše 128 | s | | 1 s |
| `trigger[].events[].type` | Směr změny | | `deactivated`, `activated` | |

#### Kanály v režimu counter {#counter}

Kanály v režimu `counter`; položky seznamu `measurements` vznikají každých `counter-interval-aggreg` sekund:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `counter[].channel` | Číslo kanálu | | 1–4 | |
| `counter[].value` | Počet impulzů od startu zařízení | | 0–18446744073709551615 | 1 |
| `counter[].delta` | Počet impulzů od předchozího hlášení | | 0–18446744073709551615 | 1 |
| `counter[].measurements[].timestamp` | Čas měření (unixový čas) | s | | 1 s |
| `counter[].measurements[].value` | Počet impulzů od startu zařízení v okamžiku měření | | 0–18446744073709551615 | 1 |
| `counter[].measurements[].delta` | Počet impulzů od předchozího měření | | 0–18446744073709551615 | 1 |

#### Kanály v režimu voltage {#voltage}

Kanály v režimu `voltage`, agregované za interval `analog-interval-aggreg`:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `voltage[].channel` | Číslo kanálu | | 1–4 | |
| `voltage[].measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `voltage[].measurements[].min`, `max`, `avg`, `mdn` | Napětí na vstupu | V | 0–26 | 0,01 V |

#### Kanály v režimu current {#current}

Kanály v režimu `current`, agregované za interval `analog-interval-aggreg`:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `current[].channel` | Číslo kanálu | | 1–4 | |
| `current[].measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `current[].measurements[].min`, `max`, `avg`, `mdn` | Proud v proudové smyčce | mA | 0–24 | 0,01 mA |

Rozsah napětí odpovídá modulu [**CHESTER-X0**](../../extension-modules/chester-x0.md). Proudový vstup měří 0–24 mA, což pokrývá proudovou smyčku 4–20 mA; hodnota blízko 0 mA znamená přerušenou smyčku.

#### Teploměry 1-Wire {#w1-thermometers}

Seznam `w1_thermometers` má jednu položku pro každý teploměr DS18B20 nalezený při startu, nejvýše pět; hodnoty se agregují za interval `w1-therm-interval-aggreg`. Seznam je v každém hlášení a naplní se, jakmile zařízení při startu najde teploměr.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Sériové číslo teploměru (48 bitů jeho kódu ROM 1-Wire) | | | |
| `w1_thermometers[].measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `w1_thermometers[].measurements[].min`, `max`, `avg`, `mdn` | Teplota | °C | −55 až 125 | 0,01 °C |

#### Půdní senzory {#soil-sensors}

Seznam `soil_sensors` má jednu položku pro každý [**půdní senzor**](/tower/hardware-modules/about-soil-sensor) nalezený při startu, nejvýše tři; hodnoty se agregují za interval `w1-therm-interval-aggreg`. Seznam je v každém hlášení a naplní se, jakmile zařízení při startu najde půdní senzor.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `soil_sensors[].serial_number` | Sériové číslo senzoru (48 bitů jeho kódu ROM 1-Wire) | | | |
| `soil_sensors[].temperature.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `soil_sensors[].temperature.measurements[].min`, `max`, `avg`, `mdn` | Teplota v horní části senzoru nad půdou | °C | −40 až 85 | 0,01 °C |
| `soil_sensors[].moisture.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `soil_sensors[].moisture.measurements[].min`, `max`, `avg`, `mdn` | Vlhkost půdy jako relativní hodnota: v suché půdě přibližně 6500, ve vodě přibližně 13000 | | 0–16383 | 1 |

#### Bluetoothové tagy {#ble-tags}

Seznam `ble_tags` má jednu položku pro každý spárovaný [**bluetoothový tag**](../ble-tags.md), nejvýše osm; hodnoty se agregují za interval `analog-interval-aggreg`. Seznam je v každém hlášení a naplní se, jakmile spárujete tag.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetoothová adresa tagu, 12 šestnáctkových číslic | | | |
| `ble_tags[].rssi` | Síla signálu tagu | dBm | −127 až −1 | 1 dBm |
| `ble_tags[].voltage` | Napětí baterie tagu | V | 2,0–4,55 | 0,01 V |
| `ble_tags[].temperature.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `ble_tags[].temperature.measurements[].min`, `max`, `avg`, `mdn` | Teplota | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity.measurements[].timestamp` | Konec intervalu agregace (unixový čas) | s | | 1 s |
| `ble_tags[].humidity.measurements[].min`, `max`, `avg`, `mdn` | Relativní vlhkost | % | 0–100 | 0,01 % |

### Data přes LoRaWAN {#data-over-lorawan}

V režimu `lrw` je každé hlášení jedna zpráva LoRaWAN s posledními hodnotami. Pole v tabulce vrací dekodér pro ChirpStack [**cs-decoder.js**](https://github.com/hardwario/chester-sdk/blob/v4.0.1/applications/control/codec/cs-decoder.js) ze SDK CHESTER v4.0.1. Při chybě čtení je hodnota `null`.

Každá zpráva obsahuje společná pole LoRaWAN popsaná v článku [**Společné funkce**](../common-functionality.md#common-data-lorawan) a pole z tabulky níže.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[]` | Poslední teplota každého teploměru DS18B20 | °C | −55 až 125 | 0,01 °C |
| `ble_tags[].temperature` | Poslední teplota každého spárovaného bluetoothového tagu | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity` | Poslední relativní vlhkost každého spárovaného bluetoothového tagu | % | 0–100 | 0,5 % |
| `inputs_a[].type` | Režim kanálu; jedna položka pro každý z kanálů 1 až 4, v tomto pořadí | | `trigger`, `counter`, `voltage`, `current`, `disabled` | |
| `inputs_a[].state` | Trigger: stav vstupu v okamžiku hlášení, `true` znamená aktivní | | `true`, `false` | |
| `inputs_a[].trigger_active` | Trigger: první změna od předchozího hlášení byla aktivace | | `true`, `false` | |
| `inputs_a[].trigger_inactive` | Trigger: první změna od předchozího hlášení byla deaktivace | | `true`, `false` | |
| `inputs_a[].count` | Counter: počet impulzů od startu zařízení; vyšší počet se odešle jako maximum | | 0–4294967295 | 1 |
| `inputs_a[].delta` | Counter: počet impulzů od předchozího hlášení; vyšší počet se odešle jako maximum | | 0–65535 | 1 |
| `inputs_a[].voltage` | Voltage: poslední vzorek | V | 0–26 | 0,01 V |
| `inputs_a[].current` | Current: poslední vzorek | mA | 0–24 | 0,01 mA |

Zpráva LoRaWAN pojme nejvýše 51 bajtů: 11 bajtů pevných polí, 2 bajty na každý teploměr DS18B20, 3 bajty na každý bluetoothový tag a na každý kanál 2 bajty (trigger), 7 bajtů (counter), 3 bajty (voltage, current) nebo 1 bajt (disabled). Zařízení zprávu LoRaWAN odešle, jen když se do těchto 51 bajtů vejdou všechna její pole.

## CHESTER Control Z {#chester-control-z}

Varianta **CHESTER Control Z** je zařízení CHESTER Control se záložním modulem **CHESTER-Z1**:

- Při výpadku externího napájení běží dál na záložní baterii.
- Hlásí napětí externího napájení a záložní baterie a výpadek i obnovení externího napájení nahlásí okamžitě.
- Spínání výstupů modulu CHESTER-X4:B downlinky s `output_X_state` a šesti stisky tlačítka je součástí [**firmwaru CHESTER Control**](../../firmware/chester-control/index.md#output-control); firmware v4.0.1 této varianty čte vstupy a hlásí záložní napájení.

Tato varianta používá [**firmware CHESTER Control Z**](../../firmware/chester-control/chester-control-z.md).

### Hardware {#chester-control-z-hardware}

Hardware této varianty tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down měnič a výstupy (4 kanály)

* `CHESTER-Z1`: Záložní modul

### Nastavení {#chester-control-z-settings}

Varianta CHESTER Control Z používá nastavení zařízení [CHESTER Control](#settings) a tyto parametry:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Parametry `event-report-delay` a `event-report-rate` platí i pro události záložního napájení.

### Data {#chester-control-z-data}

Varianta CHESTER Control Z posílá data zařízení [CHESTER Control](#data-over-lte) a strukturu [`backup`](#backup).

#### Záložní modul {#backup}

Varianta CHESTER Control Z přidává strukturu `backup`:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí na vstupu VIN modulu CHESTER-Z1: s připojeným externím napájením 6–26 V, po jeho odpojení blízko 0 | V | 0–26 | 0,01 V |
| `backup.batt_voltage` | Napětí záložní baterie; ochrana článek odpojí pod 3,2 V a nabíječka ho nabíjí na 4,2 V | V | 3,2–4,2 | 0,01 V |
| `backup.state` | Stav externího napájení | | `disconnected`, `connected` | |
| `backup.events` | Změny externího napájení od předchozího hlášení, nejvýše 64, jako seznam čísel | | | |

Dekodér aplikace CHESTER Control předává seznam `backup.events` jako prostý seznam čísel: unixový čas první změny a pak dvě čísla pro každou změnu, její odstup od tohoto času v sekundách a `1` pro připojené nebo `0` pro odpojené napájení. Například `[1705328233, 0, 0, 95, 1]` znamená, že externí napájení vypadlo v čase 1705328233 a o 95 sekund později se obnovilo.

#### Přes LoRaWAN {#chester-control-z-data-lorawan}

Uplink nese pole zařízení [CHESTER Control](#data-over-lorawan): společná pole LoRaWAN, `w1_thermometers`, `ble_tags` a `inputs_a`.

## CHESTER Control 8Ch Z {#chester-control-8ch-z}

Firmware [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) čte osm vstupů ze dvou modulů CHESTER-X0 ve slotech A a B a podporuje záložní modul CHESTER-Z. Jde o samostatné sestavení firmwaru, které popisuje jeho stránka firmwaru.

### Nastavení {#settings-chester-control-8ch-z}

Firmware [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) používá nastavení zařízení [CHESTER Control](#settings) a tyto parametry:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `channel-mode-5` | Channel mode 5 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 5 (modul CHESTER-X0 ve slotu B, svorka B2) |
| `channel-mode-6` | Channel mode 6 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 6 (svorka B4) |
| `channel-mode-7` | Channel mode 7 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 7 (svorka B5) |
| `channel-mode-8` | Channel mode 8 | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 8 (svorka B7) |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Parametry pro trigger, counter a analogové vstupy platí pro všech osm kanálů a parametry `event-report-delay` a `event-report-rate` i pro události záložního napájení.

### Data {#data-chester-control-8ch-z}

Firmware [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) pro dva moduly CHESTER-X0 a záložní modul CHESTER-Z posílá data zařízení [CHESTER Control](#data-over-lte) s těmito doplňky:

- Seznamy `trigger`, `counter`, `voltage` a `current` obsahují i kanály 5 až 8: `channel` je 1–8 a kanály 5 až 8 odpovídají svorkám B2, B4, B5 a B7.
- Přidává strukturu `backup` popsanou v části [**Záložní modul**](#backup).

#### Přes LoRaWAN {#chester-control-8ch-z-data-lorawan}

Uplink nese pole zařízení [CHESTER Control](#data-over-lorawan) a navíc `inputs_b` s kanály 5 až 8 ve stejném formátu jako `inputs_a`. Osm kanálů se započítává do limitu 51 bajtů, takže šest kanálů v režimu `counter` ho už překročí.

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
