---
title: CHESTER Current
description: "Firmware katalogové aplikace CHESTER Current: jak měří proudové kanály, všechny konfigurační parametry, kalibrace kanálů a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Current {#chester-current}

Firmware **CHESTER Current** udělá ze zařízení CHESTER měřič proudu. Měří až čtyři analogové kanály modulu **CHESTER-K1**, vzorky agreguje, převádí je na kalibrované hodnoty a výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Tato stránka popisuje hlavní firmware. Varianta sestavená pro záložní modul CHESTER-Z1 má vlastní stránku, která uvádí jen to, co mění: [**CHESTER Current Z**](chester-current-z.md).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware, proudové sondy a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Current**](../../catalog-applications/chester-current/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- modul **CHESTER-K1**: čtyři diferenciální vstupy a zvyšující měnič 5 V pro proudové sondy (viz [**CHESTER-K1**](../../ordering-codes.md#chester-k1))
- teploměry **DS18B20** 1-Wire, nejvýše 10
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../../catalog-applications/ble-tags.md))

Záložní modul **CHESTER-Z1** hlavní firmware nepodporuje; s ním použijte sestavení [**CHESTER Current Z**](chester-current-z.md).

## Měření a chování {#measurement-and-behavior}

### Analogové kanály {#analog-channels}

- Každý aktivní kanál se **vzorkuje** každých `interval-sample` sekund. Firmware kanálu zapne napájení 5 V, počká 100 ms, kanál změří a napájení zase vypne.
- Každý vzorek obsahuje dvě surové hodnoty v mV: **střední** (průměrnou) a **efektivní** (RMS) hodnotu vstupu.
- Vzorky se **agregují** každých `interval-aggreg` sekund. Z uložených vzorků se pro obě surové hodnoty spočítá minimum, maximum, průměr a medián a k nim **kalibrované** hodnoty (viz [**Kalibrace kanálů**](#channel-calibration)). Těmto agregovaným výsledkům říkáme **měření**.
- Každé měření má svou časovou značku. Měření se odesílají jako časové řady každých `interval-report` sekund.

Kanál měří buď v režimu single-ended, nebo v diferenciálním režimu (parametr `channel-differential-<n>`).

### Teploměry 1-Wire {#1-wire-thermometers}

Teploměry DS18B20 se vzorkují každých `w1-therm-interval-sample` sekund a agregují každých `w1-therm-interval-aggreg` sekund, nezávisle na analogových kanálech. Každé hlášení obsahuje minimum, maximum, průměr a medián teploty každého teploměru.

### Ostatní senzory {#other-sensors}

Vnitřní teploměr a akcelerometr se čtou každých 60 sekund a hlášení nese jejich poslední hodnoty. Bluetoothové tagy se vzorkují každých `interval-sample` sekund a agregují každých `interval-aggreg` sekund.

Hlášení se odesílá každých `interval-report` sekund. Firmware CHESTER Current v4.0.1 nezapíná náhodný [**rozptyl intervalu hlášení**](../../catalog-applications/common-functionality.md#report-interval-jitter), takže hlášení chodí v pevném intervalu.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování analogových kanálů a tagů BLE v sekundách |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace analogových kanálů a tagů BLE v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `900` | Interval hlášení v sekundách |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `channel-active-1` až `channel-active-4` | Channel active 1 až Channel active 4 | `true`, `false` | `false` | Měřit a hlásit kanál |
| `channel-differential-1` až `channel-differential-4` | Channel differential 1 až Channel differential 4 | `true`, `false` | `false` | Měřit kanál v diferenciálním režimu místo režimu single-ended |
| `channel-calib-x0-1` až `channel-calib-x0-4` | Channel calib x0 1 až Channel calib x0 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 0: surová hodnota v mV |
| `channel-calib-x1-1` až `channel-calib-x1-4` | Channel calib x1 1 až Channel calib x1 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 1: surová hodnota v mV |
| `channel-calib-y0-1` až `channel-calib-y0-4` | Channel calib y0 1 až Channel calib y0 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 0: skutečná hodnota (například v A) |
| `channel-calib-y1-1` až `channel-calib-y1-4` | Channel calib y1 1 až Channel calib y1 4 | `<-1000000.0..1000000.0>` | `0.0` | Kalibrační bod 1: skutečná hodnota |
| `channel-calib-mode-1` až `channel-calib-mode-4` | Channel calib mode 1 až Channel calib mode 4 | `mean`, `rms` | `rms` | Surová hodnota, kterou kalibrace převádí (viz tabulka níže) |
| `w1-therm-interval-sample` | W1 therm interval sample | `<1-86400>` | `60` | Interval vzorkování teploměrů DS18B20 v sekundách |
| `w1-therm-interval-aggreg` | W1 therm interval aggreg | `<1-86400>` | `300` | Interval agregace teploměrů DS18B20 v sekundách |

Kalibrační režim určuje, kterou surovou hodnotu kalibrace převádí:

| Režim | Popis | Použití |
| :--- | :--- | :--- |
| `mean` | Střední (průměrná) hodnota; příkazy `current` tento režim označují `avg` | Stejnosměrné signály, pomalu se měnící hodnoty |
| `rms` | Efektivní hodnota (Root Mean Square) | Střídavé signály, proudové transformátory |

Parametry `channel-*` patří ke čtyřem vstupům modulu CHESTER-K1 a parametry `w1-therm-*` k teploměrům DS18B20. Parametry záložního modulu přidává sestavení [**CHESTER Current Z**](chester-current-z.md).

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje senzory; vzorky se uloží do bufferu vzorků |
| `aggreg` | Okamžitě agreguje vzorky |
| `send` | Okamžitě odešle data a vyprázdní buffer odeslaných měření |
| `current channel-<n> read` | Přečte surovou a kalibrovanou hodnotu kanálu `<n>` (1–4) |
| `current channel-<n> calib set-0 <value>` | Zachytí aktuální surovou hodnotu jako X0 a nastaví Y0 na `<value>` |
| `current channel-<n> calib set-1 <value>` | Zachytí aktuální surovou hodnotu jako X1 a nastaví Y1 na `<value>` |
| `current channel-<n> calib show` | Zobrazí kalibrační parametry |
| `current channel-<n> calib reset` | Vrátí kalibrační body na výchozí hodnotu `0` |
| `current channel-<n> calib mode [avg\|rms]` | Zobrazí nebo nastaví kalibrační režim |

Příkazy `current` ukládají kalibraci okamžitě; nepotřebují `config save` ani restart.

## Kalibrace kanálů {#channel-calibration}

:::danger

Při aktualizaci firmwaru z verze **v1.x.x** na verzi **v2.0.0 a novější** je nutné [**zálohovat konfiguraci**](../../catalog-applications/common-functionality.md#configuration-backup), u zařízení **CHESTER Current** včetně kalibračních dat.

:::

:::caution

Následující část slouží jen pro informaci. Zařízení **CHESTER Current** se obvykle objednávají společně s proudovými sondami a kanály pak zákazníkovi zkalibruje **HARDWARIO**.

:::

### Přehled kalibračního systému {#calibration-system-overview}

Kalibrace převádí surové hodnoty v mV na kalibrované hodnoty (např. v ampérech, wattech nebo jiné fyzikální jednotce) **dvoubodovou lineární interpolací**.

:::tip

Výstup lineární interpolace se vypočítá podle tohoto vzorce:

`calibrated = (y0 × (x1 - raw) + y1 × (raw - x0)) / (x1 - x0)`

Kde:
- `x0`, `x1` = Surové hodnoty v mV v kalibračních bodech
- `y0`, `y1` = Skutečné fyzikální hodnoty v kalibračních bodech
- `raw` = Aktuální surová hodnota v mV

:::

Kalibrační body jsou parametry `channel-calib-*` v části [**Konfigurační parametry**](#configuration-parameters). Dokud se `x0` rovná `x1` (výchozí stav), nemá kanál kalibrovanou hodnotu.

### Postup kalibrace {#calibration-procedure}

#### Předpoklady {#prerequisites}

1. Připojte proudový senzor (např. CT kleště) ke kanálu modulu CHESTER-K1
2. Připojte se ke shellu zařízení CHESTER přes J-Link RTT nebo Bluetooth
3. Mějte připravené referenční měřidlo (multimetr, klešťový ampérmetr)

#### Kalibrace krok za krokem {#step-by-step-calibration}

##### 1. Zapnutí kanálu {#1-enable-the-channel}

```
app config channel-active-1 true
```

Změnu uplatněte příkazem `config save`, který zařízení restartuje.

##### 2. Nastavení kalibračního režimu {#2-set-calibration-mode}

Pro proudové transformátory na střídavý proud zvolte `rms`, pro stejnosměrné senzory `avg`:

```
current channel-1 calib mode rms
```

##### 3. Ověření surové hodnoty {#3-verify-raw-reading}

Přečtěte aktuální surovou hodnotu v mV:

```
current channel-1 read
```

Ukázka výstupu:

```
Channel 1: avg=0.5 rms=1.2 mV (mode=rms, no calibration)
```

##### 4. Kalibrační bod 0 (nulový/nízký bod) {#4-calibration-point-0-zerolow-point}

Přiveďte známý **nízký** proud (např. 0 A) a nastavte kalibraci:

```
current channel-1 calib set-0 0
```

Příkaz uloží aktuální surovou hodnotu v mV jako `x0` a nastaví `y0 = 0`.

Výstup:

```
Channel 1: avg=0.5 rms=1.2 (using rms), point 0 set (x0=1.20, y0=0.00)
```

##### 5. Kalibrační bod 1 (vysoký bod) {#5-calibration-point-1-high-point}

Přiveďte známý **vysoký** proud (např. 10 A) a nastavte kalibraci:

```
current channel-1 calib set-1 10
```

Příkaz uloží aktuální surovou hodnotu v mV jako `x1` a nastaví `y1 = 10`.

Výstup:

```
Channel 1: avg=50.3 rms=71.5 (using rms), point 1 set (x1=71.50, y1=10.00)
```

##### 6. Ověření kalibrace {#6-verify-calibration}

Přečtěte hodnotu kanálu a zkontrolujte kalibrovaný výstup:

```
current channel-1 read
```

Výstup:

```
Channel 1: avg=50.3 rms=71.5 mV (mode=rms, calibrated: 10.00)
```

##### 7. Zobrazení kalibračních parametrů {#7-show-calibration-parameters}

```
current channel-1 calib show
```

Výstup:

```
Channel 1 calibration: x0=1.20 y0=0.00, x1=71.50 y1=10.00, mode=rms
```

#### Reset kalibrace {#reset-calibration}

Následující příkaz nastaví všechny čtyři kalibrační body na `0`. Kanál pak nemá kalibrovanou hodnotu (v hlášení `null`); jeho surové hodnoty se odesílají dál:

```
current channel-1 calib reset
```

### Kalibrace Hallova senzoru {#hall-effect-sensor-calibration}

Tato část popisuje, jak nastavit firmware pro měření proudu Hallovými senzory (např. **YHDC HSTS30**). Aby byly hodnoty přesné, musí systém používat lineární aproximaci a diferenciální režim vstupu.

#### Logika kalibrace {#calibration-logic}

Standardní senzor (300 A / 2,5 V ± 0,625 V) používá referenční střed 2,5 V. Při jmenovitém proudu 300 A se výstupní napětí od tohoto středu vychýlí o 625 mV.

Zapnutím **diferenciálního režimu** (měření INP proti INM, kde INM je referenční napětí senzoru 2,5 V) oddělíme užitečný signál a odstraníme stejnosměrný offset.

**Výpočet citlivosti:**

```
Sensitivity = 625 mV / 300 A = 2.0833 mV/A
```

#### Teoretické parametry {#theoretical-parameters}

Firmware zařízení CHESTER definuje lineární škálování dvěma body [x, y], kde **x** je napětí (mV) a **y** je fyzikální hodnota (A).

| Parametr | Hodnota | Popis |
| :--- | :--- | :--- |
| **x0** | 0 | Vstup 0 mV (nulový offset) |
| **y0** | 0 | Naměřeno 0 A |
| **x1** | 625 | Vstup 625 mV (plný rozkmit) |
| **y1** | 300 | Naměřeno 300 A |

:::info

Než konfiguraci použijete, ověřte, že hodnoty na štítku senzoru odpovídají teoretickým hodnotám výše.

:::

#### Konfigurační příkazy CLI {#cli-configuration-commands}

Nahraďte `<n>` číslem cílového kanálu (1–4):

```shell
# Define linear approximation points
app config channel-calib-x0-<n> 0
app config channel-calib-y0-<n> 0
app config channel-calib-x1-<n> 625
app config channel-calib-y1-<n> 300

# Set measurement mode to RMS (Root Mean Square)
app config channel-calib-mode-<n> rms

# Enable differential input mode
app config channel-differential-<n> true
```

Konfiguraci uplatněte příkazem `config save`.

:::caution

Pokud má senzor jiné jmenovité hodnoty (např. 100 A / 1 V), nastavte kvůli přesnosti `x1` na `1000` a `y1` na `100`.

:::

### Původní metoda kalibrace {#legacy-calibration-method}

Pro zařízení **CHESTER Current** máme v **HARDWARIO** kalibrační sadu z několika vzduchových cívek s 10, 50 a 100 závity.

#### Příklad kalibrace proudu (původní metoda) {#example-current-calibration-legacy}

1. Změřte **offsety při nulovém proudu** a zapište je pro každý kanál jako parametr `x0`. Měření spustíte příkazem `sample`.
2. Předpokládejme kalibraci proudové sondy **100 A** a zvolme **cívku se 100 závity**.
3. Nastavte proudové omezení laboratorního zdroje na **900 mA** a zdroj připojte k cívce.
4. **Nasaďte proudovou sondu** na kalibrační cívku.
5. Proud protékající cívkou ověřte **multimetrem** zapojeným do série.
6. Změřte kanál a hodnotu zapište jako `x1`.
7. Nastavte parametr `y1` na hodnotu `90000`. Hodnota je součin počtu závitů cívky a proudového omezení zdroje, v tomto příkladu `90000`.
8. Bod 0 je bod při nulovém proudu, proto parametr `y0` ponechte na hodnotě `0`.
9. Uložte konfiguraci příkazem `config save` a ověřte výsledné kalibrované hodnoty.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-current:v4.0.1](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `98f42b431dfb4ba681abfea1958f0ef9`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9/hex), SHA256 `d5e679a4118aac2a013663b11e300dc2afbf395bc8d13ba9e3949878d96ab0c4`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9/bin), SHA256 `8223cf0a4fbfc0bc8890f914e40c4cd9632446475c6b9475f4a0ce8ef97c1c54`
- **Sestavení ze SDK:** `west chester-update current --variant "CHESTER Current"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Každé pole včetně jednotky, rozsahu a rozlišení popisuje katalogová stránka v části [**Data**](../../catalog-applications/chester-current/index.md#data-over-lte).

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení hlavního firmwaru s výchozími intervaly: kanál 1 je aktivní a zkalibrovaný pro proudovou sondu (`x0` = 1,20 mV pro 0 A, `x1` = 71,50 mV pro 10 A, režim `rms`); zařízení má připojený jeden teploměr DS18B20 a jeden bluetoothový tag. Seznam `analog_channels` má jednu položku pro každý aktivní kanál a každý seznam `measurements` jednu položku pro každý interval agregace od předchozího hlášení.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 96,
    "timestamp": 1793961010
  },
  "system": {
    "uptime": 86410,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 34
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -10,
      "snr": 12,
      "plmn": 23003,
      "cid": 26853412,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.12,
    "accel_y": -0.08,
    "accel_z": 9.83,
    "orientation": 2
  },
  "analog_channels": [
    {
      "channel": 1,
      "raw_rms": {
        "measurements": [
          { "timestamp": 1793960400, "min": 70.12, "max": 72.45, "avg": 71.28, "mdn": 71.3 },
          { "timestamp": 1793960700, "min": 69.88, "max": 73.01, "avg": 71.45, "mdn": 71.42 },
          { "timestamp": 1793961000, "min": 70.4, "max": 72.1, "avg": 71.12, "mdn": 71.09 }
        ]
      },
      "raw_mean": {
        "measurements": [
          { "timestamp": 1793960400, "min": -0.42, "max": 0.61, "avg": 0.08, "mdn": 0.07 },
          { "timestamp": 1793960700, "min": -0.55, "max": 0.48, "avg": -0.03, "mdn": -0.02 },
          { "timestamp": 1793961000, "min": -0.37, "max": 0.52, "avg": 0.05, "mdn": 0.06 }
        ]
      },
      "calibration": {
        "mode": "rms",
        "measurements": [
          { "timestamp": 1793960400, "min": 9.8, "max": 10.13, "avg": 9.96, "mdn": 9.97 },
          { "timestamp": 1793960700, "min": 9.76, "max": 10.21, "avg": 9.99, "mdn": 9.98 },
          { "timestamp": 1793961000, "min": 9.84, "max": 10.08, "avg": 9.94, "mdn": 9.94 }
        ]
      }
    }
  ],
  "w1_thermometers": [
    {
      "serial_number": 1207863897645,
      "measurements": [
        { "timestamp": 1793960400, "min": 21.06, "max": 21.12, "avg": 21.1, "mdn": 21.12 },
        { "timestamp": 1793960700, "min": 21.12, "max": 21.18, "avg": 21.15, "mdn": 21.12 },
        { "timestamp": 1793961000, "min": 21.18, "max": 21.25, "avg": 21.22, "mdn": 21.25 }
      ]
    }
  ],
  "ble_tags": [
    {
      "addr": "7cd9f413e360",
      "rssi": -77,
      "voltage": 3.03,
      "temperature": {
        "measurements": [
          { "timestamp": 1793960400, "min": 22.31, "max": 22.38, "avg": 22.34, "mdn": 22.35 },
          { "timestamp": 1793960700, "min": 22.36, "max": 22.44, "avg": 22.4, "mdn": 22.41 },
          { "timestamp": 1793961000, "min": 22.4, "max": 22.47, "avg": 22.44, "mdn": 22.45 }
        ]
      },
      "humidity": {
        "measurements": [
          { "timestamp": 1793960400, "min": 45, "max": 46, "avg": 45.6, "mdn": 46 },
          { "timestamp": 1793960700, "min": 46, "max": 47, "avg": 46.4, "mdn": 46 },
          { "timestamp": 1793961000, "min": 46, "max": 47, "avg": 46.8, "mdn": 47 }
        ]
      }
    }
  ]
}
```

</details>

:::info

Struktura payloadu pro analogové kanály se ve verzi **v3.5.1** změnila:
- `raw_rms`: Obsahuje měření efektivní hodnoty v mV
- `raw_mean`: Obsahuje měření střední (průměrné) hodnoty v mV
- `calibration`: Obsahuje kalibrované hodnoty podle zvoleného režimu (`mode` je `avg` nebo `rms`)

:::

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Zařízení **CHESTER Current** kóduje payload LoRaWAN binárně. Příklad uplinku firmwaru v4.0.1 ze stejného zařízení s aktivním kanálem 1 a jedním teploměrem DS18B20. Uplink nese poslední vzorek každé hodnoty, ne agregovaná měření.

**Hlavička:** `0x2F 0x00` (bity: BATT=1, ACCEL=1, THERM=1, W1=1, BACKUP=0, CH1=1)

**Surové bajty (hex):**

```
2F 00 45 0E 5A 0D 22 02 29 09 01 4D 08 71 54 00 30 F8 48
```

**Dekódované hodnoty:**

| Offset | Bajty | Pole | Hodnota |
| :--- | :--- | :--- | :--- |
| 0–1 | `2F 00` | Hlavička | 0x002F (BATT + ACCEL + THERM + W1 + CH1) |
| 2–3 | `45 0E` | `voltage_rest` | 3653 mV |
| 4–5 | `5A 0D` | `voltage_load` | 3418 mV |
| 6 | `22` | `current_load` | 34 mA |
| 7 | `02` | `orientation` | 2 |
| 8–9 | `29 09` | `therm_temperature` | 23,45 °C (2345 / 100) |
| 10 | `01` | Počet teploměrů DS18B20 | 1 |
| 11–12 | `4D 08` | `w1_thermometers` | 21,25 °C (2125 / 100) |
| 13–14 | `71 54` | `raw_rms` kanálu 1 | 71,0625 mV (float16) |
| 15–16 | `00 30` | `raw_mean` kanálu 1 | 0,125 mV (float16) |
| 17–18 | `F8 48` | `calibrated` kanálu 1 | 9,9375 A (float16) |

**Celkem:** 19 bajtů

Dekodér pro ChirpStack a TTN (soubor `codec/cs-decoder.js` aplikace v CHESTER SDK) vrátí:

```json
{
  "voltage_rest": 3.653,
  "voltage_load": 3.418,
  "current_load": 34,
  "orientation": 2,
  "therm_temperature": 23.45,
  "w1_thermometers": [21.25],
  "analog_channels": [
    {
      "channel": 1,
      "raw_rms": 71.0625,
      "raw_mean": 0.125,
      "calibrated": 9.9375
    }
  ]
}
```

Firmware v4.0.1 nastavuje příznaky BATT, ACCEL, THERM a W1 vždy. Každý teploměr DS18B20 přidá za bajt s počtem dva bajty (teplota × 100) a každý další aktivní kanál šest bajtů. Uplink pojme nejvýše 51 bajtů; hlášení, které se nevejde, se neodešle.

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Příkazy shellu pro kalibraci jednotlivých kanálů v reálném čase: interaktivní nastavení nulového bodu a rozsahu
- **Přidáno**: Downlink watchdog: detekuje ztrátu komunikace s cloudem
- **Vylepšeno**: Spolehlivost a kódování LoRaWAN
- **Opraveno**: Kontrola kalibračního rozsahu

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nové varianty: **CHESTER Current Z** (se záložním modulem CHESTER-Z1) a **CHESTER Current 1W** (s externími teplotními senzory DS18B20 na sběrnici 1-Wire)
- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud Legacy zůstává k dispozici samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
