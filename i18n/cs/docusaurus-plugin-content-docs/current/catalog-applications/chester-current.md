# CHESTER Current {#chester-current}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Current**, její hardware, výchozí konfiguraci, ukázkovou zprávu JSON a kalibraci kanálů.

> **Pozor:** Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:
> - [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
> - [**Společné funkce**](/chester/catalog-applications/common-functionality): jak fungují LED, tlačítko a nastavení sítě.
> - [**Konektivita platformy**](/chester/category/platform-connectivity): jak pracovat s interaktivní konzolí.

## Přehled aplikace {#application-overview}

Aplikace je určená hlavně k neinvazivnímu měření proudu pomocí takzvaného **DC Current "Transformer"** (DCCT). Měří střídavý i stejnosměrný proud až na 4 kanálech. Proudové sondy jsou kleště, které se nasadí na měřený vodič a převádějí magnetický tok (úměrný elektrickému proudu) na diferenciální výstupní napětí.

> **Tip:** Proudové sondy potřebují během měřicího cyklu napájení 5 V, které vyrábí zvyšující měnič (boost) na modulu **CHESTER-K1**. Měnič i napájecí větve jednotlivých kanálů řídí software, takže zařízení **CHESTER Current** může běžet na baterii jako zařízení s nízkou spotřebou. Na výdrž baterie má samozřejmě zásadní vliv interval měření.

Kromě proudu může zařízení na přání měřit i napětí, a to až na 4 kanálech (v režimu single-ended). Měření proudu a napětí lze kombinovat, celkový počet kanálů ale nikdy nepřesáhne 4.

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Current** lze objednat v jedné z těchto variant:

### CHESTER Current {#chester-current-1}

Hardware katalogové aplikace **CHESTER Current** tvoří tyto položky (objednací kódy):

- `CHESTER-M-CGLS`: Standardní základní deska
- `CHESTER-K1-C1-C2-C3-C4`: 4x diferenciální vstup + 5 V boost
- `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Varianta sestavení firmwaru: `west chester-update current --variant "CHESTER Current"`

### CHESTER Current Z {#chester-current-z}

Hardware katalogové aplikace **CHESTER Current Z** tvoří tyto položky (objednací kódy):

- `CHESTER-M-CGLS`: Standardní základní deska
- `CHESTER-K1-C1-C2-C3-C4`: 4x diferenciální vstup + 5 V boost
- `CHESTER-Z1`: Záložní modul
- `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Varianta sestavení firmwaru: `west chester-update current --variant "CHESTER Current Z"`

### CHESTER Current 1W {#chester-current-1w}

Katalogová aplikace **CHESTER Current 1W** podporuje více externích teplotních senzorů DS18B20 na sběrnici 1-Wire.

Hardware této aplikace tvoří tyto položky (objednací kódy):

- `CHESTER-M-CGLS`: Standardní základní deska
- `CHESTER-K1-C1-C2-C3-C4`: 4x diferenciální vstup + 5 V boost
- `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Varianta sestavení firmwaru: `west chester-update current --variant "CHESTER Current"` (podpora senzorů DS18B20 1-Wire je součástí základního firmwaru **CHESTER Current**)

### Sondy {#probes}

Vybrat si můžete až 4 proudové sondy s těmito rozsahy:

- Maximální proud **10 A**
- Maximální proud **100 A**
- Maximální proud **300 A**
- Maximální proud **1 000 A**
- Maximální proud **1 500 A**

> **Pozor:** Proudový rozsah je uveden pro stejnosměrný proud. Při návrhu systému pro střídavý proud vynásobte maximální očekávaný střídavý proud koeficientem `1.42` (druhá odmocnina ze dvou) a ověřte, že výsledek nepřekročí rozsah sondy.

## Chování aplikace {#application-behavior}

Schéma zapojení zařízení **CHESTER Current** najdete v [**popisu svorkovnice**](/chester/extension-modules/chester-k1) rozšiřujícího modulu **CHESTER-K1**. Modul **CHESTER-K1** zabírá oba sloty **A** i **B**, takže používáte svorky **A1** až **A8** a **B1** až **B8**.

### Analogové vstupy {#analog}

- Analogové hodnoty se pravidelně vzorkují (parametr `interval-sample`) a ukládají do **bufferu vzorků**.
- Nasbírané vzorky se pravidelně **agregují** (parametr `interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.
- Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

### Záložní napájení {#backup}

Zařízení **CHESTER Current Z** (s modulem **CHESTER-Z1**) navíc hlásí stav záložní baterie a externího napájení DC.

- Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.
- Při změně na napájecím vstupu DC se do bufferu uloží časová značka změny spolu se stavem **connected**/**disconnected** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).
- Změny napájecího vstupu DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.
- Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

> **Pozor:** Interval do dalšího hlášení se počítá na začátku vysílacího cyklu jako hodnota parametru `interval-report` (v sekundách) s rozptylem ±20 %. Rozptyl je záměrně náhodný: zařízení provozovaná na stejném místě (např. napájená ze stejného vedení DC) tak nevysílají souběžně. Bez rozptylu by se jejich vysílání mohlo pravidelně překrývat.

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 900
app config interval-poll 0
app config downlink-wdg-interval 129600
app config event-report-delay 1
app config event-report-rate 30
app config backup-report-connected true
app config backup-report-disconnected true
app config channel-active-1 false
app config channel-active-2 false
app config channel-active-3 false
app config channel-active-4 false
app config channel-differential-1 false
app config channel-differential-2 false
app config channel-differential-3 false
app config channel-differential-4 false
app config channel-calib-x0-1 0.00
app config channel-calib-x0-2 0.00
app config channel-calib-x0-3 0.00
app config channel-calib-x0-4 0.00
app config channel-calib-x1-1 0.00
app config channel-calib-x1-2 0.00
app config channel-calib-x1-3 0.00
app config channel-calib-x1-4 0.00
app config channel-calib-y0-1 0.00
app config channel-calib-y0-2 0.00
app config channel-calib-y0-3 0.00
app config channel-calib-y0-4 0.00
app config channel-calib-y1-1 0.00
app config channel-calib-y1-2 0.00
app config channel-calib-y1-3 0.00
app config channel-calib-y1-4 0.00
app config channel-calib-mode-1 "rms"
app config channel-calib-mode-2 "rms"
app config channel-calib-mode-3 "rms"
app config channel-calib-mode-4 "rms"
app config w1-therm-interval-sample 60
app config w1-therm-interval-aggreg 300
app config mode "lte"
```

## Příkazy aplikace {#specific-commands}

> **Info:** Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

### Příkazy {#commands}

Tímto příkazem **okamžitě spustíte vzorkování** (výsledek se uloží do bufferu vzorků):

```
sample
```

Tímto příkazem **okamžitě odešlete data** (a vyprázdníte buffer agregovaných měření):

```
send
```

### Hlášení {#reporting}

Tímto příkazem nastavíte **interval hlášení** (v sekundách):

```
app config interval-report <value>
```

### Záložní napájení {#backup-1}

Tímto příkazem nastavíte krátké zpoždění (v sekundách) mezi událostí **backup** a jejím nahlášením:

```
app config event-report-delay <value>
```

> **Tip:** Tato funkce je užitečná v systémech, kde může krátce po první změně přijít další.

Tímto příkazem omezíte počet asynchronních hlášení událostí **backup** za hodinu:

```
app config event-report-rate <value>
```

> **Tip:** Limit šetří baterii zařízení a snižuje objem přenášených dat. Pravidelná hlášení podle parametru `interval-report` se do něj nepočítají.

Těmito příkazy zapnete nebo vypnete hlášení připojení a odpojení napájení na vstupu záložního modulu:

```
app config backup-report-connected <true/false>
app config backup-report-disconnected <true/false>
```

### Analogové kanály {#analog-channels}

Tímto příkazem **zapnete nebo vypnete** kanál `n` (index 1–4):

```
app config channel-active-<n> <true/false>
```

Tímto příkazem přepnete kanál `n` (index 1–4) mezi režimy **single-ended/diferenciální**:

```
app config channel-differential-<n> <true/false>
```

Tímto příkazem nastavíte **kalibrační bod X0** (vstup) kanálu `n` (index 1–4):

```
app config channel-calib-x0-<n> <value>
```

Tímto příkazem nastavíte **kalibrační bod Y0** (výstup) kanálu `n` (index 1–4):

```
app config channel-calib-y0-<n> <value>
```

Tímto příkazem nastavíte **kalibrační bod X1** (vstup) kanálu `n` (index 1–4):

```
app config channel-calib-x1-<n> <value>
```

Tímto příkazem nastavíte **kalibrační bod Y1** (výstup) kanálu `n` (index 1–4):

```
app config channel-calib-y1-<n> <value>
```

Tímto příkazem nastavíte **kalibrační režim** kanálu `n` (index 1–4):

```
app config channel-calib-mode-<n> <avg/rms>
```

| Režim | Popis | Použití |
|------|-------------|----------|
| `avg` | Střední (průměrná) hodnota | Stejnosměrné signály, pomalu se měnící hodnoty |
| `rms` | Efektivní hodnota (Root Mean Square) | Střídavé signály, proudové transformátory |

### Příkazy kanálů {#channel-commands}

Následujícími příkazy shellu kanály interaktivně kalibrujete a čtete. `<n>` je číslo kanálu 1–4.

| Příkaz | Popis |
|---------|-------------|
| `current channel-<n> read` | Přečte surovou a kalibrovanou hodnotu |
| `current channel-<n> calib set-0 <value>` | Zachytí aktuální surovou hodnotu jako X0, nastaví Y0 na `<value>` |
| `current channel-<n> calib set-1 <value>` | Zachytí aktuální surovou hodnotu jako X1, nastaví Y1 na `<value>` |
| `current channel-<n> calib show` | Zobrazí kalibrační parametry |
| `current channel-<n> calib reset` | Obnoví výchozí kalibraci |
| `current channel-<n> calib mode [avg\|rms]` | Načte/nastaví kalibrační režim |

### Teploměr 1-Wire {#1-wire-thermometer}

Tímto příkazem nastavíte **interval vzorkování teploměru 1-Wire** v sekundách:

```
app config w1-therm-interval-sample <1-86400>
```

Tímto příkazem nastavíte **interval agregace teploměru 1-Wire** v sekundách:

```
app config w1-therm-interval-aggreg <1-86400>
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](/chester/catalog-applications/catalog-applications#application-firmware).

### Firmware v3.5.1 {#firmware-v351}

| Varianta | Verze | Odkaz |
|---------|---------|------|
| **CHESTER Current** | v3.5.1 | [Stáhnout](https://firmware.hardwario.com/chester/c2ac3f9d94194573b43c56f54962e672) |
| **CHESTER Current Z** | v3.5.1 | [Stáhnout](https://firmware.hardwario.com/chester/627823995dc34c4a9336d0534ce3e418) |

## Ukázková zpráva JSON {#example-json-message}

### LTE {#lte}

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 42,
    "timestamp": 1738627200
  },
  "system": {
    "uptime": 86400,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 28
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -89,
      "rsrq": -10,
      "snr": 12,
      "plmn": 23003,
      "cid": 1234567,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.012,
    "accel_y": -0.008,
    "accel_z": 1.002,
    "orientation": 2
  },
  "analog_channels": [
    {
      "channel": 1,
      "raw_rms": {
        "measurements": [
          { "timestamp": 1738627200, "period": 300 },
          { "min": 70.12, "max": 72.45, "avg": 71.28, "mdn": 71.30 },
          { "min": 69.88, "max": 73.01, "avg": 71.45, "mdn": 71.42 }
        ]
      },
      "raw_mean": {
        "measurements": [
          { "timestamp": 1738627200, "period": 300 },
          { "min": 49.50, "max": 51.20, "avg": 50.35, "mdn": 50.32 },
          { "min": 49.22, "max": 51.55, "avg": 50.38, "mdn": 50.40 }
        ]
      },
      "calibration": {
        "mode": 1,
        "measurements": [
          { "timestamp": 1738627200, "period": 300 },
          { "min": 9.85, "max": 10.18, "avg": 10.01, "mdn": 10.02 },
          { "min": 9.82, "max": 10.25, "avg": 10.03, "mdn": 10.04 }
        ]
      }
    }
  ]
}
```

</details>

> **Info:** Struktura payloadu pro analogové kanály se ve verzi **v3.5.1** změnila:
> - `raw_rms`: Obsahuje měření efektivní hodnoty v mV
> - `raw_mean`: Obsahuje měření střední (průměrné) hodnoty v mV
> - `calibration`: Obsahuje kalibrované hodnoty podle zvoleného režimu (0=avg, 1=rms)

### LoRaWAN {#lorawan}

Zařízení **CHESTER Current** kóduje payload LoRaWAN binárně. Příklad s baterií, teploměrem a aktivním kanálem 1:

**Hlavička:** `0x25 0x00` (bity: BATT=1, ACCEL=0, THERM=1, W1=0, BACKUP=0, CH1=1)

**Surové bajty (hex):**

```
25 00 45 0E 5A 0D 1C 29 09 00 47 00 48 E4 49
```

**Dekódované hodnoty:**

| Offset | Bajty | Pole | Hodnota |
|--------|-------|-------|-------|
| 0-1 | `25 00` | Hlavička | 0x0025 (BATT + THERM + CH1) |
| 2-3 | `45 0E` | voltage_rest | 3653 mV |
| 4-5 | `5A 0D` | voltage_load | 3418 mV |
| 6 | `1C` | current_load | 28 mA |
| 7-8 | `29 09` | temperature | 23.45 °C (2345 / 100) |
| 9-10 | `00 47` | ch1_rms | 71.5 mV (float16) |
| 11-12 | `00 48` | ch1_mean | 50.3 mV (float16) |
| 13-14 | `E4 49` | ch1_calib | 10.02 A (float16) |

**Celkem:** 15 bajtů

## Kalibrace kanálů {#channel-calibration}

> **Nebezpečí:** Při aktualizaci firmwaru z verze **v1.x.x** na verzi **v2.0.0 a novější** je nutné [**zálohovat konfiguraci**](/chester/catalog-applications/common-functionality#configuration-backup), u zařízení **CHESTER Current** včetně kalibračních dat.

> **Pozor:** Následující část slouží jen pro informaci. Zařízení **CHESTER Current** se obvykle objednávají společně s proudovými sondami a kanály pak zákazníkovi zkalibruje **HARDWARIO**.

### Přehled kalibračního systému {#calibration-system-overview}

Kalibrace převádí surové hodnoty v mV na kalibrované hodnoty (např. v ampérech, wattech nebo jiné fyzikální jednotce) **dvoubodovou lineární interpolací**.

> **Tip:** Výstup lineární interpolace se vypočítá podle tohoto vzorce:
>
> `calibrated = (y0 × (x1 - raw) + y1 × (raw - x0)) / (x1 - x0)`
>
> Kde:
> - `x0`, `x1` = Surové hodnoty v mV v kalibračních bodech
> - `y0`, `y1` = Skutečné fyzikální hodnoty v kalibračních bodech
> - `raw` = Aktuální surová hodnota v mV

### Konfigurační parametry {#configuration-parameters}

| Parametr | Typ | Rozsah | Výchozí | Popis |
|-----------|------|-------|---------|-------------|
| `channel-active-<1..4>` | bool | true/false | false | Zapnutí kanálu |
| `channel-differential-<1..4>` | bool | true/false | false | Diferenciální režim |
| `channel-calib-x0-<1..4>` | float | -10000..10000 | 0.00 | Surové mV v bodě 0 |
| `channel-calib-x1-<1..4>` | float | -10000..10000 | 0.00 | Surové mV v bodě 1 |
| `channel-calib-y0-<1..4>` | float | -10000..10000 | 0.00 | Skutečná hodnota v bodě 0 |
| `channel-calib-y1-<1..4>` | float | -10000..10000 | 0.00 | Skutečná hodnota v bodě 1 |
| `channel-calib-mode-<1..4>` | enum | avg/rms | rms | Kalibrační režim |

### Postup kalibrace {#calibration-procedure}

#### Předpoklady {#prerequisites}

1. Připojte proudový senzor (např. CT kleště) ke kanálu modulu CHESTER-K1
2. Připojte se k zařízení CHESTER přes shell RTT nebo konzoli USB
3. Mějte připravené referenční měřidlo (multimetr, klešťový ampérmetr)

#### Kalibrace krok za krokem {#step-by-step-calibration}

##### 1. Zapnutí kanálu {#1-enable-the-channel}

```
app config channel-active-1 true
```

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

Kalibraci vymažete a vrátíte se k surovému výstupu v mV takto:

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
app config channel-calib-x0 <n> 0
app config channel-calib-y0 <n> 0
app config channel-calib-x1 <n> 625
app config channel-calib-y1 <n> 300

# Set measurement mode to RMS (Root Mean Square)
app config channel-calib-mode <n> rms

# Enable differential input mode
app config channel-differential <n> true
```

:::caution

Pokud má senzor jiné jmenovité hodnoty (např. 100 A / 1 V), nastavte kvůli přesnosti `x1` na `1000` a `y1` na `100`.

:::

### Původní metoda kalibrace {#legacy-calibration-method}

Pro zařízení **CHESTER Current** máme v **HARDWARIO** kalibrační sadu z několika vzduchových cívek s 10, 50 a 100 závity.

#### Příklad kalibrace proudu (původní metoda) {#example-current-calibration-legacy}

1. Změřte **offsety při nulovém proudu** a zapište je pro každý kanál jako parametr `x0`.

   > **Tip:** Měření spustíte příkazem `sample`.

2. Předpokládejme kalibraci proudové sondy **100 A** a zvolme **cívku se 100 závity**.
3. Nastavte proudové omezení laboratorního zdroje na **900 mA** a zdroj připojte k cívce.
4. **Nasaďte proudovou sondu** na kalibrační cívku.
5. Proud protékající cívkou ověřte **multimetrem** zapojeným do série.
6. Změřte kanál a hodnotu zapište jako `x1`.
7. Nastavte parametr `y1` na hodnotu `90000`.

   > **Info:** Hodnota je součin počtu závitů cívky a proudového omezení zdroje, v tomto příkladu `90000`.

8. Protože jsme předpokládali nulový offset při nulovém proudu, může parametr `x0` zůstat na hodnotě `0`.
9. Uložte konfiguraci příkazem `config save` a ověřte výsledné kalibrované hodnoty.

---

## Seznam změn {#changelog}

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Příkazy shellu pro kalibraci jednotlivých kanálů v reálném čase: interaktivní nastavení nulového bodu a rozsahu
- **Přidáno**: Downlink watchdog: detekuje ztrátu komunikace s cloudem
- **Vylepšeno**: Spolehlivost a kódování LoRaWAN
- **Opraveno**: Kontrola kalibračního rozsahu

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nové varianty: **CHESTER Current Z** (se záložním modulem CHESTER-Z1) a **CHESTER Current 1W** (s externími teplotními senzory DS18B20 na sběrnici 1-Wire)
- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud v1 zůstává k dispozici samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
