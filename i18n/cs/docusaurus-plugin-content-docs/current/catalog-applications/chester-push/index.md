---
title: CHESTER Push
description: "CHESTER Push je katalogová aplikace pro hlášení stiskem tlačítka: její hardware, šablona krabičky, nastavení, která měníte, a přesný formát odesílaných dat."
---

# CHESTER Push {#chester-push}

![Zařízení CHESTER Push se čtyřmi tlačítky na barevných štítcích (Production, Warning, Failure, Help), pohled shora](/img/chester/catalog-applications/chester-push.webp)

Zařízení **CHESTER Push** je tlačítkový terminál. Jakmile stisknete kterékoli z jeho tlačítek, odešle hlášení do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Push](../../firmware/chester-push/index.md)**.

:::

## Co umí {#what-it-can-do}

- Okamžitě odešle data, jakmile stisknete kterékoli tlačítko.
- Rozliší krátký a dlouhý stisk a u každého tlačítka počítá obojí.
- Každý stisk potvrdí rozsvícením LED v tlačítku a pípnutím.
- Běží z baterie Li-Ion a okamžitě hlásí výpadek i obnovení externího napájení, takže poslouží i ke sledování výpadků napájení.
- V každé zprávě hlásí teplotu a orientaci zařízení.
- Má dvě sestavení firmwaru: hlavní je vhodné pro provoz na baterii, [**CHESTER Push FM**](../../firmware/chester-push/chester-push-fm.md) nechává svítit naposledy stisknuté tlačítko.

## Tlačítka {#push-buttons}

Zařízení **CHESTER Push** má na krabičce tlačítka. U větších objednávek lze počet tlačítek přizpůsobit. Standardní provedení má čtyři tlačítka na levé straně, dodat můžeme i verzi s jedním tlačítkem uprostřed krabičky. Na přání zákazníka také upravíme potisk krabičky a vedle jednotlivých tlačítek doplníme textové popisky (nebo symboly).

Každé tlačítko má také **indikační LED**, takže obsluha vidí, že zařízení stisk zaznamenalo. Stisk navíc slyšitelně potvrdí **pípnutí** z vestavěného bzučáku.

## Napájení {#power-supply}

Aplikace **CHESTER Push** využívá rozšiřující modul **CHESTER-Z1-F** s dobíjecí baterií **Li-Ion** a napájecím zdrojem DC/DC (rozsah vstupního napětí 6 VDC až 26 VDC), který nabíjí baterii a zajišťuje stabilní napájení. Zpráva obsahuje také informaci, zda je připojené externí napájení, napětí na externím vstupu DC a napětí baterie. Díky tomu lze zařízení **CHESTER Push** použít i ke sledování výpadků napájení. Modul popisuje stránka [**CHESTER-Z1**](../../extension-modules/chester-z1.md).

## Šablona krabičky {#enclosure-template}

Pro vlastní návrh krabičky můžete použít [**šablonu předního krytu**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf).

## Modely {#variants}

Aplikace CHESTER Push má základní model a samostatné sestavení firmwaru CHESTER Push FM (viz jeho stránku firmwaru). Každý model popisuje vlastní oddíl níže.

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Push**](#model-chester-push) | Základní model | [CHESTER Push](../../firmware/chester-push/index.md) |
| [**CHESTER Push FM**](#chester-push-fm) | Samostatné sestavení firmwaru: LED naposledy stisknutého tlačítka zůstává svítit | [CHESTER Push FM](../../firmware/chester-push/chester-push-fm.md) |

## CHESTER Push {#model-chester-push}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: základní deska CHESTER
* `CHESTER-Z1-F`: čtyři tlačítka (další varianty viz [**Objednací kódy**](../../ordering-codes.md#chester-z))
* `CHESTER-E4-FP`: krabička s víkem pro tlačítka, napájecím konektorem Weipu, anténním pigtailem SMA a světlovodem

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Tyto parametry u zařízení CHESTER Push obvykle měníte. Parametr nastavíte příkazem `app config <parameter> <value>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Úplný seznam najdete na stránce [**Firmware CHESTER Push**](../../firmware/chester-push/index.md#configuration-parameters).

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval pravidelného hlášení v sekundách |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Prodleva mezi stiskem tlačítka nebo změnou externího napájení a hlášením v sekundách; stisky během prodlevy odejdou v jednom hlášení |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); události nad limit počkají na další pravidelné hlášení |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Okamžitě hlásit obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Okamžitě hlásit výpadek externího napájení |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování bluetoothových tagů v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace vzorků z bluetoothových tagů v sekundách |

### Data přes LTE {#data-over-lte}

Zařízení odesílá pravidelné hlášení každých `interval-report` sekund a hlášení navíc `event-report-delay` sekund po stisku tlačítka nebo, pokud je zapnutý odpovídající parametr `backup-report-*`, po výpadku či obnovení externího napájení, nejvýše `event-report-rate` takových hlášení za hodinu (firmware v4.0.1 jich pošle až o jedno víc). Každé hlášení nese čítače všech pěti pozic tlačítek a události tlačítek od předchozího hlášení. Hodnoty bluetoothových tagů jsou agregované: každá položka v `measurements` má časovou značku `timestamp` a hodnoty `min`, `max`, `avg` (průměr) a `mdn` (medián) ze vzorků odebíraných každých `interval-sample` sekund během jednoho intervalu `interval-aggreg`. Když čtení selže, je hodnota `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Push posílá `message.version` `1`.

Kromě společných dat posílá aplikace CHESTER Push:

- [`backup`](#backup): vstup DC a baterie Li-Ion modulu CHESTER-Z1
- [`buttons`](#buttons): čítače a události stisků pěti pozic tlačítek
- [`ble_tags`](#ble-tags): bluetoothové tagy

#### Záložní modul {#backup}

`backup` popisuje napájecí vstup modulu CHESTER-Z1 a je v každém hlášení. Seznam `events` obsahuje výpadky a obnovení externího napájení od předchozího hlášení, nejvýše 32.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí na vstupu DC modulu CHESTER-Z1: 6–26 V s připojeným externím napájením, při odpojeném blízko 0 | mV | 0–26000 | 1 mV |
| `backup.batt_voltage` | Napětí baterie Li-Ion v modulu CHESTER-Z1 | mV | 3200–4200 | 1 mV |
| `backup.state` | Externí napájení: `connected` nebo `disconnected` | | | |
| `backup.events[].timestamp` | Čas změny (unixový čas) | s | | 1 s |
| `backup.events[].type` | `connected` (napájení se obnovilo) nebo `disconnected` (napájení vypadlo) | | | |

#### Tlačítka {#buttons}

`buttons` má v každém hlášení pět položek, jednu pro každou z pěti pozic tlačítek modulu CHESTER-Z1: `button_x` (prostřední tlačítko) a `button_1` až `button_4`. Seznam `events` se objeví u každého tlačítka stisknutého od předchozího hlášení; firmware mezi dvěma hlášeními zapíše a započítá až 8 stisků každého tlačítka.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `buttons[].button` | Tlačítko, ke kterému položka patří: `button_x`, `button_1`, `button_2`, `button_3` nebo `button_4` | | | |
| `buttons[].count_click` | Počet krátkých stisků od spuštění zařízení | | 0–2147483647 | 1 |
| `buttons[].count_hold` | Počet dlouhých stisků od spuštění zařízení | | 0–2147483647 | 1 |
| `buttons[].events[].timestamp` | Čas stisku (unixový čas) | s | | 1 s |
| `buttons[].events[].type` | `clicked` (krátký stisk) nebo `held` (dlouhý stisk) | | | |

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

V režimu LoRaWAN nese zpráva hodnoty napájení, čítače tlačítek a u každého tlačítka informaci, zda bylo od předchozí zprávy stisknuto. Dekodér vrací tato pole:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí na vstupu DC modulu CHESTER-Z1: 6–26 V s připojeným externím napájením, při odpojeném blízko 0 | V | 0–26 | 0,001 V |
| `backup.battery_voltage` | Napětí baterie Li-Ion v modulu CHESTER-Z1 | V | 3,2–4,2 | 0,001 V |
| `backup.backup_state` | Externí napájení: `connected` nebo `disconnected` | | | |
| `button_x.press_count` až `button_4.press_count` | Počet krátkých stisků tlačítka od spuštění zařízení; po 65535 čítá znovu od 0 | | 0–65535 | 1 |
| `button_x.hold_count` až `button_4.hold_count` | Počet dlouhých stisků tlačítka od spuštění zařízení; po 65535 čítá znovu od 0 | | 0–65535 | 1 |
| `button_x.press_event` až `button_4.press_event` | `true`, když bylo tlačítko od předchozí zprávy krátce stisknuto, jinak `false` | | | |
| `button_x.hold_event` až `button_4.hold_event` | `true`, když bylo tlačítko od předchozí zprávy dlouze stisknuto, jinak `false` | | | |

## CHESTER Push FM {#chester-push-fm}

**CHESTER Push FM** je samostatné sestavení firmwaru CHESTER Push, které nechává svítit LED naposledy stisknutého tlačítka (viz jeho [stránku firmwaru](../../firmware/chester-push/chester-push-fm.md)).

### Data {#data-chester-push-fm}

Firmware [**CHESTER Push FM**](../../firmware/chester-push/chester-push-fm.md) posílá data aplikace [CHESTER Push](#data-over-lte) s touto změnou:

- Každý stisk se počítá jako krátký: v `buttons` roste `count_click`, všechny události jsou `clicked` a `count_hold` zůstává `0`.

#### Přes LoRaWAN {#chester-push-fm-data-lorawan}

Roste `press_count`, `hold_count` zůstává `0` a `hold_event` je vždy `false`.

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
