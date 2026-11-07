---
title: CHESTER Scale
description: "CHESTER Scale měří hmotnost až čtyřmi tenzometrickými snímači: hardware, varianta Z, nastavení, která měníte, a přesný formát odesílaných dat."
---

# CHESTER Scale {#chester-scale}

![Krabička CHESTER Scale se dvěma kabelovými průchodkami](/img/chester/catalog-applications/chester-scale.webp)

Zařízení **CHESTER Scale** slouží k bezdrátovému měření hmotnosti tenzometrickými snímači. Měří až čtyři kanály tenzometrických snímačů a naměřené hodnoty odesílá do HARDWARIO Cloud přes NB-IoT/LTE-M nebo LoRaWAN.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Scale](../../firmware/chester-scale/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří hmotnost až čtyřmi tenzometrickými snímači, dvěma na každém modulu **CHESTER-X3C**.
- Funguje s jedním i dvěma moduly CHESTER-X3C: modul ve slotu B firmware rozpozná při startu.
- Každý kanál lze zapnout nebo vypnout samostatně.
- Posílá surové hodnoty tenzometrických snímačů, které na hmotnost převedete ve své aplikaci.
- Sbírá teplotu a vlhkost z bluetoothových senzorových tagů (Teltonika EYE Sensor).
- Při výpadku externího napájení běží dál na záložním modulu **CHESTER-Z1** a změnu napájení nahlásí (varianta **CHESTER Scale Z**).

## Použití {#use-cases}

Zařízení se hodí například pro:
- **Sledování průmyslových zásobníků**: stav naplnění nádrží, sil nebo kontejnerů
- **Sledování palet a zboží**: změny hmotnosti v logistice a ve skladech
- **Sledování hmotnosti hospodářských zvířat**: lepší plánování krmení a kontrola zdraví zvířat
- **Zemědělství**: sledování úlů, zásob krmiva atd.

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Scale**](#model-chester-scale) | Základní model | [CHESTER Scale](../../firmware/chester-scale/index.md) |
| [**CHESTER Scale Z**](#chester-scale-z) | Záložní modul CHESTER-Z1 | [CHESTER Scale Z](../../firmware/chester-scale/chester-scale-z.md) |

## CHESTER Scale {#model-chester-scale}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B`: Rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E5-LP`: Krabička se dvěma kabelovými průchodkami a pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Tato nastavení u zařízení CHESTER Scale obvykle měníte. Parametr nastavíte příkazem `app config <parameter> <value>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Úplný seznam najdete v části [**Konfigurační parametry**](../../firmware/chester-scale/index.md#configuration-parameters) na stránce firmwaru.

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `weight-measurement-interval` | Weight measurement interval | `<30-86400>` | `60` | Interval měření hmotnosti v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `900` | Interval hlášení v sekundách; každý interval se náhodně mění až o ±20 % |
| `channel-a1-active` | Channel a1 active | `true`, `false` | `true` | Měřit a hlásit kanál A1 |
| `channel-a2-active` | Channel a2 active | `true`, `false` | `true` | Měřit a hlásit kanál A2 |
| `channel-b1-active` | Channel b1 active | `true`, `false` | `true` | Měřit a hlásit kanál B1; vyžaduje modul CHESTER-X3C ve slotu B |
| `channel-b2-active` | Channel b2 active | `true`, `false` | `true` | Měřit a hlásit kanál B2; vyžaduje modul CHESTER-X3C ve slotu B |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval čtení bluetoothových tagů, vnitřního teploměru a akcelerometru v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace vzorků z bluetoothových tagů v sekundách |

### Data přes LTE {#data-over-lte}

Zařízení CHESTER Scale odesílá hlášení každých `interval-report` sekund, ve výchozím nastavení 900 s; každý interval se náhodně mění až o ±20 %. Varianta CHESTER Scale Z navíc hlásí výpadek a obnovení externího napájení (parametry `backup-report-disconnected` a `backup-report-connected`).

Hlášení nese každé měření hmotnosti od předchozího hlášení, jedno každých `weight-measurement-interval` sekund, každé s vlastní časovou značkou. Ve výchozím nastavení je to přibližně 15 měření; buffer drží prvních 128 měření až do příštího hlášení. Bluetoothové tagy posílají agregované hodnoty: každá položka seznamu `measurements` má časovou značku `timestamp` (unixový čas v sekundách) a hodnoty `min`, `max`, `avg` a `mdn` (medián) ze vzorků jednoho intervalu agregace (`interval-aggreg`), pro každý tag nejvýše 16 položek. Chyba čtení se odešle jako `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Scale posílá `message.version` `1`.

Kromě společných dat posílá zařízení CHESTER Scale:

- [`attribute`](#device-attributes): identifikace zařízení v textové podobě
- [`weight`](#weight): surové hodnoty tenzometrických snímačů ze všech měření hmotnosti od předchozího hlášení
- [`ble_tags`](#ble-tags): teplota, vlhkost a napětí baterie zaregistrovaných bluetoothových tagů

Varianta CHESTER Scale Z navíc posílá [`backup`](#backup) se stavem externího napájení.

#### Údaje o zařízení {#device-attributes}

`attribute`: textové hodnoty v každém hlášení.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `attribute.vendor_name` | Název výrobce, `HARDWARIO` | | | |
| `attribute.product_name` | Název produktu, například `CHESTER-M` | | | |
| `attribute.hw_variant` | Hardwarová varianta, například `CGLS` | | | |
| `attribute.hw_revision` | Revize hardwaru, například `R3.4` | | | |
| `attribute.fw_version` | Verze firmwaru, například `v4.0.1` | | | |
| `attribute.serial_number` | Sériové číslo zařízení | | | |

#### Hmotnost {#weight}

`weight`: odesílá se, když je aktivní aspoň jeden kanál; jedna položka pro každé měření hmotnosti od předchozího hlášení.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `weight[].timestamp` | Čas měření (unixový čas) | s | | 1 s |
| `weight[].raw_result_a1`, `raw_result_a2`, `raw_result_b1`, `raw_result_b2` | Surová hodnota kanálu A1, A2, B1 nebo B2: výstupní kód 24bitového převodníku na modulu CHESTER-X3C (TI ADS122C04), průměr prostředních 16 z 32 odečtů; `null`, když je kanál vypnutý, jeho modul chybí nebo měření selhalo | | −8388608 až 8388607 | 1 |

Hodnoty jsou surové jednotky převodníku. S nastavením převodníku ve firmwaru v4.0.1 (zesílení 1, vnitřní reference 2,048 V) odpovídá jedna jednotka přibližně 0,244 µV signálu tenzometrického snímače; hmotnost spočítáte z hodnoty při nulovém zatížení a z hodnoty se známým závažím. Hodnota, která se ještě po pěti měřeních mění o 100 jednotek nebo víc, se odešle s invertovaným bitem 30 jako příznakem chyby: kladná hodnota je pak o 1073741824 vyšší (1073741824 až 1082130431) a záporná o 1073741824 nižší (−1082130432 až −1073741825). Opětovnou inverzí bitu 30 (XOR s 1073741824) získáte původní hodnotu.

#### Bluetoothové tagy {#ble-tags}

`ble_tags`: jedna položka pro každý zaregistrovaný tag, nejvýše 8 (viz [**Tagy BLE**](../ble-tags.md)).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetooth adresa tagu, 12 šestnáctkových číslic | | | |
| `ble_tags[].rssi` | Síla signálu tagu | dBm | −128 až −1 | 1 dBm |
| `ble_tags[].voltage` | Napětí baterie tagu | V | 2,00–4,55 | 0,01 V |
| `ble_tags[].temperature.measurements[]` | Teplota: `min`, `max`, `avg`, `mdn` | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity.measurements[]` | Relativní vlhkost: `min`, `max`, `avg`, `mdn`; tag ji hlásí v celých procentech | % | 0–100 | 0,01 % |

### Data přes LoRaWAN {#data-over-lorawan}

Každá zpráva obsahuje společná pole LoRaWAN popsaná v článku [**Společné funkce**](../common-functionality.md#common-data-lorawan) a pole z tabulky níže.

V režimu LoRaWAN posílá zařízení každých `interval-report` sekund binární uplink o 26 bajtech s posledním měřením hmotnosti. Dekodér pro ChirpStack a TTN (soubor `codec/cs-decoder.js` aplikace v CHESTER SDK) vrací společná pole a tato:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `scale.channel_a1_active`, `channel_a2_active`, `channel_b1_active`, `channel_b2_active` | Zda je kanál zapnutý (parametry `channel-a1-active` až `channel-b2-active`) | | `true`, `false` | |
| `scale.raw_a1`, `raw_a2`, `raw_b1`, `raw_b2` | Surová hodnota kanálu z posledního měření hmotnosti, se stejným příznakem chyby v bitu 30; `null`, když je kanál vypnutý, jeho modul chybí, měření selhalo nebo od předchozího hlášení žádné měření neproběhlo | | −8388608 až 8388607 | 1 |

## CHESTER Scale Z {#chester-scale-z}

Varianta **CHESTER Scale Z** je zařízení CHESTER Scale se záložním modulem **CHESTER-Z1** pro trvalý provoz:

- Při výpadku externího napájení běží dál na záložní baterii.
- V každém hlášení přes LTE posílá napětí baterie a napětí externího zdroje DC.
- Výpadek i obnovení externího napájení okamžitě nahlásí.

Tato varianta používá **[firmware CHESTER Scale Z](../../firmware/chester-scale/chester-scale-z.md)**.

### Hardware {#chester-scale-z-hardware}

Hardware této varianty tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-Z1`: Záložní modul
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B`: Rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E5-LP`: Krabička se dvěma kabelovými průchodkami a pigtailem SMA

### Nastavení {#chester-scale-z-settings}

Varianta CHESTER Scale Z používá nastavení zařízení [CHESTER Scale](#settings) se stejnými výchozími hodnotami a navíc tato:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Hlášení navíc o změně napájení odejde `event-report-delay` sekund po změně (výchozí 1), a to nejvýše tolikrát za hodinu, kolik určuje `event-report-rate` (výchozí 30; firmware v4.0.1 pošle až o jedno hlášení víc).

### Data {#chester-scale-z-data}

Varianta CHESTER Scale Z posílá data zařízení [CHESTER Scale](#data-over-lte) a v každém hlášení přes LTE strukturu [`backup`](#backup). Výpadek a obnovení externího napájení odešlou hlášení navíc (parametry `backup-report-disconnected` a `backup-report-connected`).

#### Záložní modul {#backup}

`backup`: v každém hlášení přes LTE. Tato napětí jsou v mV (napětí baterie ve struktuře `system` jsou ve V).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí externího vstupu DC: 6–26 V s připojeným externím napájením, téměř 0 po jeho odpojení | mV | 0–26000 | 1 mV |
| `backup.batt_voltage` | Napětí záložní baterie (Li-Ion, jmenovitě 3,7 V) | mV | 3200–4200 | 1 mV |
| `backup.state` | `connected`, když je externí napájení připojené, jinak `disconnected` | | `connected`, `disconnected` | |
| `backup.events[].timestamp` | Čas změny napájení od posledního hlášení (unixový čas), nejvýše 32 změn | s | | 1 s |
| `backup.events[].type` | Druh změny napájení | | `connected`, `disconnected` | |

#### Přes LoRaWAN {#chester-scale-z-data-lorawan}

Uplink nese pole zařízení [CHESTER Scale](#data-over-lorawan).

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
