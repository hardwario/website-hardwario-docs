---
title: CHESTER Current
description: "CHESTER Current měří střídavý i stejnosměrný proud klešťovými sondami: hardware, varianty, nastavení, která měníte, a přesný formát odesílaných dat."
---

# CHESTER Current {#chester-current}

![CHESTER Current se dvěma klešťovými proudovými sondami](/img/chester/catalog-applications/chester-current.webp)

Zařízení **CHESTER Current** měří střídavý i stejnosměrný proud klešťovými sondami nasazenými na vodič: k modulu **CHESTER-K1** se jich připojují až čtyři. Výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Current](../../firmware/chester-current/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří střídavý i stejnosměrný proud až na čtyřech kanálech klešťovými proudovými sondami.
- Na kanálech v režimu single-ended měří napětí; proudových a napěťových kanálů je dohromady nejvýše čtyři.
- Běží na baterii: sondy dostávají napájení jen během měření.
- Dvoubodovou kalibrací každého kanálu převádí hodnoty na ampéry nebo jiné jednotky.
- Čte několik teplotních sond **DS18B20** 1-Wire.
- Sbírá hodnoty z bluetoothových senzorových tagů.
- Při výpadku externího napájení běží dál na záložním modulu **CHESTER-Z1** a změnu napájení nahlásí (varianta **CHESTER Current Z**).

## Princip měření {#measurement-principle}

Aplikace je určená hlavně k neinvazivnímu měření proudu pomocí takzvaného **DC Current „Transformer“** (DCCT). Měří střídavý i stejnosměrný proud až na 4 kanálech. Proudové sondy jsou kleště, které se nasadí na měřený vodič a převádějí magnetický tok (úměrný elektrickému proudu) na diferenciální výstupní napětí.

:::tip

Proudové sondy potřebují během měřicího cyklu napájení 5 V, které vyrábí zvyšující měnič (boost) na modulu **CHESTER-K1**. Měnič i napájecí větve jednotlivých kanálů řídí software, takže zařízení **CHESTER Current** může běžet na baterii jako zařízení s nízkou spotřebou. Na výdrž baterie má zásadní vliv interval měření.

:::

Kromě proudu může zařízení na přání měřit i napětí, a to až na 4 kanálech (v režimu single-ended). Měření proudu a napětí lze kombinovat, celkem na nejvýše 4 kanálech.

## Proudové sondy {#current-probes}

Vybrat si můžete až 4 proudové sondy s těmito rozsahy:

- Maximální proud **10 A**
- Maximální proud **100 A**
- Maximální proud **300 A**
- Maximální proud **1 000 A**
- Maximální proud **1 500 A**

:::caution

Proudový rozsah je uveden pro stejnosměrný proud. Při návrhu systému pro střídavý proud vynásobte maximální očekávaný střídavý proud koeficientem `1.414` (druhá odmocnina ze dvou) a ověřte, že výsledek leží v rozsahu sondy.

:::

## Zapojení {#wiring}

Schéma zapojení zařízení **CHESTER Current** najdete v [**popisu svorkovnice**](../../extension-modules/chester-k1.md) rozšiřujícího modulu **CHESTER-K1**. Modul **CHESTER-K1** zabírá oba sloty **A** i **B**, takže používáte svorky **A1** až **A8** a **B1** až **B8**.

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Current**](#model-chester-current) | Základní model | [CHESTER Current](../../firmware/chester-current/index.md) |
| [**CHESTER Current Z**](#chester-current-z) | Záložní modul CHESTER-Z1 | [CHESTER Current Z](../../firmware/chester-current/chester-current-z.md) |
| [**CHESTER Current 1W**](#chester-current-1w) | Teplotní sondy DS18B20 1-Wire | [CHESTER Current](../../firmware/chester-current/index.md) |

## CHESTER Current {#model-chester-current}

### Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-K1-1C-2C-3C-4C`: 4x diferenciální vstup + 5 V boost
* `CHESTER-E3-LP`: Krabička se čtyřmi kabelovými průchodkami, napájecím konektorem Weipu, pigtailem SMA a světlovodem

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

### Nastavení {#settings}

Tato nastavení u zařízení CHESTER Current obvykle měníte. Parametr nastavíte příkazem `app config <parameter> <value>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Úplný seznam najdete v části [**Konfigurační parametry**](../../firmware/chester-current/index.md#configuration-parameters) na stránce firmwaru.

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování analogových kanálů a bluetoothových tagů v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace analogových kanálů a bluetoothových tagů v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `900` | Interval hlášení v sekundách |
| `channel-active-1` až `channel-active-4` | Channel active 1 až Channel active 4 | `true`, `false` | `false` | Měřit a hlásit kanál |
| `channel-differential-1` až `channel-differential-4` | Channel differential 1 až Channel differential 4 | `true`, `false` | `false` | Měřit kanál v diferenciálním režimu (proudová sonda, `C` v objednacím kódu modulu CHESTER-K1) místo režimu single-ended (napětí, `V`) |
| `channel-calib-mode-1` až `channel-calib-mode-4` | Channel calib mode 1 až Channel calib mode 4 | `mean`, `rms` | `rms` | Surová hodnota, kterou kalibrace převádí: `rms` pro střídavý proud, `mean` pro stejnosměrný |
| `channel-calib-x0-1` až `channel-calib-x0-4` | Channel calib x0 1 až Channel calib x0 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 0: surová hodnota v mV |
| `channel-calib-y0-1` až `channel-calib-y0-4` | Channel calib y0 1 až Channel calib y0 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 0: skutečná hodnota (například v A) |
| `channel-calib-x1-1` až `channel-calib-x1-4` | Channel calib x1 1 až Channel calib x1 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 1: surová hodnota v mV |
| `channel-calib-y1-1` až `channel-calib-y1-4` | Channel calib y1 1 až Channel calib y1 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 1: skutečná hodnota |

Kalibrovanou hodnotu má kanál, jakmile se `channel-calib-x0-<n>` a `channel-calib-x1-<n>` liší; s výchozími hodnotami (obojí `0.0`) je kalibrovaná hodnota `null`. Příkazy `current channel-<n> calib` zachytí kalibrační body z aktuálního odečtu a hned je uloží, zatímco zařízení běží dál; viz [**Kalibrace kanálů**](../../firmware/chester-current/index.md#channel-calibration).

### Data přes LTE {#data-over-lte}

Zařízení CHESTER Current odesílá hlášení každých `interval-report` sekund, ve výchozím nastavení 900 s, a to v pevném intervalu. Varianta CHESTER Current Z navíc hlásí výpadek a obnovení externího napájení (parametry `backup-report-disconnected` a `backup-report-connected`).

Analogové kanály, teploměry DS18B20 a bluetoothové tagy posílají agregované hodnoty. Každá položka seznamu `measurements` má časovou značku `timestamp` (unixový čas v sekundách) a hodnoty `min`, `max`, `avg` a `mdn` (medián) ze vzorků jednoho intervalu agregace: `interval-aggreg`, u teploměrů `w1-therm-interval-aggreg`. Ve výchozím nastavení nese hlášení přibližně tři položky; pojme nejvýše 32 položek pro každý kanál a teploměr a 16 pro každý bluetoothový tag. Chyba čtení se odešle jako `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Current posílá `message.version` `1`.

Kromě společných dat posílá zařízení CHESTER Current:

- [`analog_channels`](#analog-channels): proud nebo napětí každého aktivního kanálu, surově i po kalibraci
- [`w1_thermometers`](#w1-thermometers): teplota každého připojeného teploměru DS18B20
- [`ble_tags`](#ble-tags): teplota, vlhkost a napětí baterie zaregistrovaných bluetoothových tagů

Varianta CHESTER Current Z navíc posílá [`backup`](#backup) se stavem externího napájení.

#### Analogové kanály {#analog-channels}

`analog_channels`: jedna položka pro každý aktivní kanál (`channel-active-<n>`).

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `analog_channels[].channel` | Číslo kanálu | | 1–4 | 1 |
| `analog_channels[].raw_rms.measurements[]` | Efektivní (RMS) napětí kanálu před kalibrací: `min`, `max`, `avg`, `mdn` | mV | 0–3600 | 0,01 mV |
| `analog_channels[].raw_mean.measurements[]` | Střední napětí kanálu před kalibrací: `min`, `max`, `avg`, `mdn` | mV | 0–3600 v režimu single-ended, −3600 až 3600 v diferenciálním režimu | 0,01 mV |
| `analog_channels[].calibration.mode` | Surová hodnota, kterou kalibrace převádí (`channel-calib-mode-<n>`; `avg` znamená `mean`) | | `avg`, `rms` | |
| `analog_channels[].calibration.measurements[]` | Hodnota po dvoubodové kalibraci kanálu: `min`, `max`, `avg`, `mdn`; `null`, dokud kanál nemá kalibraci | jednotka kalibrace, například A | do maxima sondy: 10, 100, 300, 1000 nebo 1500 A | 0,01 |

Rozsahy surových hodnot odpovídají plnému rozsahu analogově-digitálního převodníku, který čte kanály modulu CHESTER-K1 (12 bitů, 3600 mV). Kalibrovaná hodnota má jednotku kalibračních bodů `channel-calib-y0-<n>` a `channel-calib-y1-<n>`; u proudové sondy zůstává v rozsahu sondy podle části [**Proudové sondy**](#current-probes).

#### Teploměry 1-Wire {#w1-thermometers}

`w1_thermometers`: jedna položka pro každý teploměr DS18B20 nalezený na sběrnici, nejvýše 10.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers[].serial_number` | Sériové číslo teploměru z jeho kódu ROM 1-Wire | | | |
| `w1_thermometers[].measurements[]` | Teplota: `min`, `max`, `avg`, `mdn` | °C | −55 až 125 | 0,01 °C |

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

V režimu LoRaWAN posílá zařízení každých `interval-report` sekund binární uplink s posledním vzorkem každé hodnoty. Dekodér pro ChirpStack a TTN (soubor `codec/cs-decoder.js` aplikace v CHESTER SDK) vrací společná pole a tato:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `w1_thermometers` | Teplota každého teploměru DS18B20 | °C | −55 až 125 | 0,01 °C |
| `analog_channels[].channel` | Číslo kanálu, jedna položka pro každý aktivní kanál | | 1–4 | 1 |
| `analog_channels[].raw_rms` | Efektivní (RMS) napětí kanálu před kalibrací | mV | 0–3600 | float16 |
| `analog_channels[].raw_mean` | Střední napětí kanálu před kalibrací | mV | 0–3600 v režimu single-ended, −3600 až 3600 v diferenciálním režimu | float16 |
| `analog_channels[].calibrated` | Hodnota po kalibraci kanálu; `null`, dokud kanál nemá kalibraci | jednotka kalibrace, například A | do maxima sondy: 10, 100, 300, 1000 nebo 1500 A | float16 |

Hodnoty ve formátu float16 jsou čísla s plovoucí řádovou čárkou v poloviční přesnosti s 11 platnými bity: krok je 0,05 až 0,1 % hodnoty, například 2 mV při 3600 mV. Firmware zbylé bity odřízne, takže hodnota může být až o jeden krok nižší, a největší hodnota, kterou uplink přenese, je 65504.

Uplink pojme nejvýše 51 bajtů: 11 bajtů systémových hodnot a počtu teploměrů, 2 bajty na každý teploměr DS18B20 a 6 bajtů na každý aktivní kanál. Firmware v4.0.1 odešle hlášení jako uplink, když se do těchto 51 bajtů vejde; se všemi čtyřmi aktivními kanály to znamená až osm teploměrů.

## CHESTER Current Z {#chester-current-z}

Varianta **CHESTER Current Z** je zařízení CHESTER Current se záložním modulem **CHESTER-Z1**:

- Při výpadku externího napájení běží dál na záložní baterii.
- V každém hlášení posílá napětí baterie a napětí externího zdroje DC.
- Výpadek i obnovení externího napájení okamžitě nahlásí.

Tato varianta používá **[firmware CHESTER Current Z](../../firmware/chester-current/chester-current-z.md)**.

### Hardware {#chester-current-z-hardware}

Hardware této varianty tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-K1-1C-2C-3C-4C`: 4x diferenciální vstup + 5 V boost
* `CHESTER-Z1`: Záložní modul
* `CHESTER-E3-LP`: Krabička se čtyřmi kabelovými průchodkami, napájecím konektorem Weipu, pigtailem SMA a světlovodem

### Nastavení {#chester-current-z-settings}

Varianta CHESTER Current Z používá nastavení zařízení [CHESTER Current](#settings) se stejnými výchozími hodnotami a navíc tato:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Hlášení navíc o změně napájení odejde `event-report-delay` sekund po změně (výchozí 1), a to nejvýše tolikrát za hodinu, kolik určuje `event-report-rate` (výchozí 30; firmware v4.0.1 pošle až o jedno hlášení víc).

### Data {#chester-current-z-data}

Varianta CHESTER Current Z posílá data zařízení [CHESTER Current](#data-over-lte) a v každém hlášení strukturu [`backup`](#backup). Výpadek a obnovení externího napájení odešlou hlášení navíc (parametry `backup-report-disconnected` a `backup-report-connected`).

#### Záložní modul {#backup}

`backup`: v každém hlášení.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí externího vstupu DC: 6–26 V s připojeným externím napájením, téměř 0 po jeho odpojení | V | 0–26 | 0,01 V |
| `backup.batt_voltage` | Napětí záložní baterie (Li-Ion, jmenovitě 3,7 V) | V | 3,2–4,2 | 0,01 V |
| `backup.state` | `connected`, když je externí napájení připojené, jinak `disconnected` | | `connected`, `disconnected` | |
| `backup.events[].timestamp` | Čas změny napájení od posledního hlášení (unixový čas), nejvýše 32 změn | s | | 1 s |
| `backup.events[].type` | Druh změny napájení | | `connected`, `disconnected` | |

#### Přes LoRaWAN {#chester-current-z-data-lorawan}

Hlavička má nastavený příznak BACKUP (bit 4) a uplink navíc obsahuje 5 bajtů hodnot záložního napájení mezi teploměry a kanály, takže při všech čtyřech aktivních kanálech se vejde nejvýše pět teploměrů DS18B20. Dekodér přidává tato pole:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `backup.line_voltage` | Napětí externího vstupu DC: 6–26 V s připojeným externím napájením, téměř 0 po jeho odpojení | V | 0–26 | 0,001 V |
| `backup.battery_voltage` | Napětí záložní baterie | V | 3,2–4,2 | 0,001 V |
| `backup.backup_state` | Stav externího napájení | | `connected`, `disconnected` | |

## CHESTER Current 1W {#chester-current-1w}

Varianta **CHESTER Current 1W** kromě proudu měří teplotu několika externími sondami **DS18B20** 1-Wire. Sondy mají vlastní interval vzorkování a agregace (parametry `w1-therm-interval-sample` a `w1-therm-interval-aggreg`).

Tato varianta používá hlavní **[firmware CHESTER Current](../../firmware/chester-current/index.md)**, který podporu sond DS18B20 1-Wire obsahuje. Samostatné sestavení CHESTER Current 1W existuje jen pro Cloud Legacy, v části [**Firmware aplikací pro Cloud Legacy**](../../firmware/index.md#application-firmware-cloud-v1).

### Hardware {#chester-current-1w-hardware}

Hardware této varianty tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-K1-1C-2C-3C-4C`: 4x diferenciální vstup + 5 V boost
* `CHESTER-E3-LP`: Krabička se čtyřmi kabelovými průchodkami, napájecím konektorem Weipu, pigtailem SMA a světlovodem

### Nastavení {#chester-current-1w-settings}

Varianta CHESTER Current 1W používá nastavení zařízení [CHESTER Current](#settings) se stejnými výchozími hodnotami a navíc tato:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Interval vzorkování teploměrů DS18B20 v sekundách |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Interval agregace teploměrů DS18B20 v sekundách |

Hlavní firmware má tyto dva parametry u každého zařízení CHESTER Current; uplatní se, když jsou připojené sondy DS18B20.

### Data {#chester-current-1w-data}

Varianta CHESTER Current 1W posílá data zařízení [CHESTER Current](#data-over-lte) a její seznam `w1_thermometers` má jednu položku pro každou připojenou sondu DS18B20, nejvýše 10 (viz [Teploměry 1-Wire](#w1-thermometers)).

#### Přes LoRaWAN {#chester-current-1w-data-lorawan}

Seznam `w1_thermometers` nese teplotu každé sondy, po 2 bajtech; limit 51 bajtů na uplink popisuje část [Data přes LoRaWAN](#data-over-lorawan).

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
