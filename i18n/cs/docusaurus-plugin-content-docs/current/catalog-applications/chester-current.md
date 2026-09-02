# CHESTER Current {#chester-current}

Tento článek popisuje základní funkce, popis hardwaru, výchozí konfiguraci, ukázkovou JSON zprávu a kalibraci kanálů katalogové aplikace **CHESTER Current**.

> **Pozor:** Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:
> - [**První kroky**](https://docs.hardwario.com/chester/first-steps) – jak připojit zařízení do Cloudu.
> - [**Společná funkcionalita**](https://docs.hardwario.com/chester/catalog-applications/common-functionality) – jak fungují LED, tlačítko a konfigurace sítě.
> - [**Správa platformy**](https://docs.hardwario.com/chester/category/platform-connectivity) – jak pracovat s interaktivní konzolí.

## Přehled aplikace {#application-overview}

Aplikace cílí především na neinvazivní měření proudu pomocí takzvaného **DC Current "Transformer"** (DCCT). Umí měřit až 4 kanály střídavého i stejnosměrného proudu. Proudové sondy jsou kleště kolem měřeného vodiče, které převádějí magnetický tok (úměrný elektrickému proudu) na diferenciální výstupní napětí.

> **Tip:** Proudové sondy vyžadují během měřicího cyklu napájení 5 V (generované pomocí boost měniče na modulu **CHESTER-K1**). Boost měnič i napájecí větve jednotlivých kanálů jsou softwarově řízené, takže zařízení **CHESTER Current** může fungovat jako nízkopříkonové zařízení napájené z baterie. Interval měření pochopitelně hraje klíčovou roli v životnosti baterie.

Kromě měření proudu lze zařízení nakonfigurovat (na vyžádání) i pro měření až 4 napěťových kanálů (v single-ended režimu). Měření proudu a napětí lze kombinovat (celkový počet kanálů nikdy nepřesáhne 4).

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Current** lze objednat v jedné z těchto variant:

### CHESTER Current {#chester-current-1}

Katalogový hardware **CHESTER Current** se skládá z těchto objednacích kódů:

- `CHESTER-M-CGLS` - Standardní základní deska
- `CHESTER-K1-C1-C2-C3-C4` - 4x diferenciální vstup + 5 V boost
- `CHESTER-E2-LP` - Krabička s SMA pigtailem

Více informací najdete v kapitole [**Objednací kódy**](https://docs.hardwario.com/chester/ordering-codes).

Varianta sestavení firmwaru: `west chester-update current --variant "CHESTER Current"`

### CHESTER Current Z {#chester-current-z}

Katalogový hardware **CHESTER Current Z** se skládá z těchto objednacích kódů:

- `CHESTER-M-CGLS` - Standardní základní deska
- `CHESTER-K1-C1-C2-C3-C4` - 4x diferenciální vstup + 5 V boost
- `CHESTER-Z1` - Zálohovací modul
- `CHESTER-E2-LP` - Krabička s SMA pigtailem

Více informací najdete v kapitole [**Objednací kódy**](https://docs.hardwario.com/chester/ordering-codes).

Varianta sestavení firmwaru: `west chester-update current --variant "CHESTER Current Z"`

### CHESTER Current 1W {#chester-current-1w}

Katalogová aplikace **CHESTER Current 1W** podporuje více externích teplotních senzorů DS18B20 na sběrnici 1-Wire.

Hardware této aplikace se skládá z těchto objednacích kódů:

- `CHESTER-M-CGLS` - Standardní základní deska
- `CHESTER-K1-C1-C2-C3-C4` - 4x diferenciální vstup + 5 V boost
- `CHESTER-E2-LP` - Krabička s SMA pigtailem

Více informací najdete v kapitole [**Objednací kódy**](https://docs.hardwario.com/chester/ordering-codes).

Varianta sestavení firmwaru: `west chester-update current --variant "CHESTER Current"` (podpora DS18B20 1-Wire je součástí základního firmwaru **CHESTER Current**)

### Sondy {#probes}

Můžete zvolit až 4 proudové sondy s následujícími proudovými rozsahy:

- Maximální proud **10 A**
- Maximální proud **100 A**
- Maximální proud **300 A**
- Maximální proud **1 000 A**
- Maximální proud **1 500 A**

> **Pozor:** Proudový rozsah je uveden pro stejnosměrný proud. Pokud navrhujete systém pro střídavý proud, musíte maximální očekávaný střídavý proud vynásobit koeficientem `1.42` (druhá odmocnina ze dvou), abyste zjistili, zda se proudová sonda vejde do limitu.

## Chování aplikace {#application-behavior}

Schéma zapojení pro **CHESTER Current** najdete v [**popisu svorkovnice**](https://docs.hardwario.com/chester/extension-modules/chester-k1) rozšiřujícího modulu **CHESTER-K1**. Rozšiřující modul **CHESTER-K1** využívá oba sloty **A** i **B**. Používáte tedy odpovídající svorky **A1** až **A8** a **B1** až **B8**.

### Analogové vstupy {#analog}

- Analogové hodnoty se vzorkují periodicky (parametr `interval-sample`). Tyto hodnoty se ukládají do **bufferu vzorků**.
- Nasbírané vzorky se periodicky **agregují** (parametr `interval-aggreg`). Z uložených vzorků se vypočítá minimum, maximum, průměr a medián. Tyto agregované výsledky se označují jako **měření**.
- Každé **měření** má přiřazenou časovou značku. Buffer **měření** se pravidelně přenáší jako časová řada (parametr `interval-report`).

### Zálohování {#backup}

Zařízení **CHESTER Current Z** (vybavené modulem **CHESTER-Z1**) může navíc hlásit informace o záložní baterii a stavu externího DC napájení.

- Aktuální **napětí baterie** a **externí DC napětí** se odesílají v každém reportu.
- Při změně stavu DC napájecího vstupu se uloží časová značka události spolu se stavem **připojeno**/**odpojeno**, tato informace se ukládá do bufferu a buffer událostí se odešle (nejpozději) s pravidelným reportem (parametr `interval-report`).
- Volitelně lze změny DC napájecího vstupu na stav **připojeno** (parametr `backup-report-connected`) nebo **odpojeno** (parametr `backup-report-disconnected`) hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), což umožňuje zachytit více po sobě jdoucích změn vstupu.
- Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`). Omezení událostí šetří komunikační pásmo a prodlužuje životnost baterie.

> **Pozor:** Interval dalšího reportu se počítá na začátku vysílacího cyklu jako parametr `interval-report` (zadaný v sekundách) ±20 % rozptyl. Tento rozptyl je záměrně náhodný, aby se zabránilo překrývání vysílání více zařízení provozovaných na stejném místě (např. napájených z místní DC linky). Kdyby takový rozptyl nebyl implementován, mohlo by se vysílání zařízení synchronně překrývat.

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná pomocí příkazu `app config show`):

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

## Specifické příkazy {#specific-commands}

> **Info:** Celou stromovou strukturu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

### Příkazy {#commands}

Příkaz pro **okamžité spuštění vzorkování** (a uložení výsledku do bufferu vzorků):

```
sample
```

Příkaz pro **okamžité odeslání dat** (a vyprázdnění agregovaných měření):

```
send
```

### Reportování {#reporting}

Tímto příkazem nastavíte **interval reportu** (v sekundách):

```
app config interval-report <value>
```

### Zálohování {#backup-1}

Tímto příkazem nastavíte krátké zpoždění (v sekundách) mezi událostí **zálohování** a jejím reportováním:

```
app config event-report-delay <value>
```

> **Tip:** Tato funkce je užitečná v systémech, kde může krátce po první změně přijít další.

Tímto příkazem omezíte počet asynchronních reportů událostí **zálohování** v jednohodinovém okně:

```
app config event-report-rate <value>
```

> **Tip:** Tato funkce pomáhá šetřit energii u zařízení napájeného z baterie a optimalizuje objem přenesených dat. Pravidelné (periodické) reporty nastavené parametrem `interval-report` se do tohoto limitu nepočítají.

Těmito příkazy zapnete/vypnete reportování událostí připojení/odpojení napájecího vstupu zálohovacího modulu:

```
app config backup-report-connected <true/false>
app config backup-report-disconnected <true/false>
```

### Analogové kanály {#analog-channels}

Příkaz pro **zapnutí/vypnutí** kanálu `n` (index 1-4):

```
app config channel-active-<n> <true/false>
```

Příkaz pro přepnutí mezi režimy **single-ended/diferenciální** na kanálu `n` (index 1-4):

```
app config channel-differential-<n> <true/false>
```

Příkaz pro nastavení **kalibračního bodu X0** (vstup) na kanálu `n` (index 1-4):

```
app config channel-calib-x0-<n> <value>
```

Příkaz pro nastavení **kalibračního bodu Y0** (výstup) na kanálu `n` (index 1-4):

```
app config channel-calib-y0-<n> <value>
```

Příkaz pro nastavení **kalibračního bodu X1** (vstup) na kanálu `n` (index 1-4):

```
app config channel-calib-x1-<n> <value>
```

Příkaz pro nastavení **kalibračního bodu Y1** (výstup) na kanálu `n` (index 1-4):

```
app config channel-calib-y1-<n> <value>
```

Příkaz pro nastavení **kalibračního režimu** na kanálu `n` (index 1-4):

```
app config channel-calib-mode-<n> <avg/rms>
```

| Režim | Popis | Použití |
|------|-------------|----------|
| `avg` | Střední (průměrná) hodnota | Stejnosměrné signály, pomalu se měnící hodnoty |
| `rms` | Efektivní hodnota (Root Mean Square) | Střídavé signály, proudové transformátory |

### Příkazy kanálů {#channel-commands}

Následující shell příkazy umožňují interaktivní kalibraci a čtení kanálů. `<n>` je číslo kanálu 1-4.

| Příkaz | Popis |
|---------|-------------|
| `current channel-<n> read` | Načtení surové a kalibrované hodnoty |
| `current channel-<n> calib set-0 <value>` | Zachytí aktuální surovou hodnotu jako X0, nastaví Y0 na `<value>` |
| `current channel-<n> calib set-1 <value>` | Zachytí aktuální surovou hodnotu jako X1, nastaví Y1 na `<value>` |
| `current channel-<n> calib show` | Zobrazí kalibrační parametry |
| `current channel-<n> calib reset` | Obnoví výchozí kalibraci |
| `current channel-<n> calib mode [avg\|rms]` | Načte/nastaví kalibrační režim |

### Teploměr 1-Wire {#1-wire-thermometer}

Příkaz pro nastavení **intervalu vzorkování teploměru 1-Wire** v sekundách:

```
app config w1-therm-interval-sample <1-86400>
```

Příkaz pro nastavení **intervalu agregace teploměru 1-Wire** v sekundách:

```
app config w1-therm-interval-aggreg <1-86400>
```

## Firmware {#firmware}

Nejnovější firmware je k dispozici v kapitole [Firmware](https://docs.hardwario.com/chester/catalog-applications/catalog-applications#application-firmware) katalogových aplikací.

### Firmware v3.5.1 {#firmware-v351}

| Varianta | Verze | Odkaz |
|---------|---------|------|
| **CHESTER Current** | v3.5.1 | [Stáhnout](https://firmware.hardwario.com/chester/c2ac3f9d94194573b43c56f54962e672) |
| **CHESTER Current Z** | v3.5.1 | [Stáhnout](https://firmware.hardwario.com/chester/627823995dc34c4a9336d0534ce3e418) |

## Ukázková JSON zpráva {#example-json-message}

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
> - `raw_rms` - Obsahuje měření efektivní hodnoty v mV
> - `raw_mean` - Obsahuje měření střední (průměrné) hodnoty v mV
> - `calibration` - Obsahuje kalibrované hodnoty podle zvoleného režimu (0=avg, 1=rms)

### LoRaWAN {#lorawan}

Zařízení **CHESTER Current** podporuje binární kódování LoRaWAN payloadu. Příklad s baterií + teploměrem + aktivním kanálem 1:

**Hlavička:** `0x25 0x00` (bity: BATT=1, ACCEL=0, THERM=1, W1=0, BACKUP=0, CH1=1)

**Surové bajty (hex):**

```
25 00 45 0E 5A 0D 1C 29 09 00 47 00 48 E4 49
```

**Dekódováno:**

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

> **Nebezpečí:** Při aktualizaci firmwaru z verze **v1.x.x** na verzi **v2.0.0 a novější** je nutné [**zálohovat konfiguraci**](https://docs.hardwario.com/chester/catalog-applications/common-functionality#configuration-backup). V případě zařízení **CHESTER Current** také kalibrační data.

> **Pozor:** Následující sekce je uvedena pouze pro referenci. Zařízení **CHESTER Current** se obvykle objednávají společně s proudovými sondami a **HARDWARIO** v takovém případě provádí kalibraci kanálů za zákazníka.

### Přehled kalibračního systému {#calibration-system-overview}

Kalibrační systém používá **dvoubodovou lineární interpolaci** pro převod surových hodnot v mV na kalibrované hodnoty (např. ampéry, watty nebo jakoukoli fyzikální jednotku).

> **Tip:** Lineární interpolace je pro výpočet výstupu definována tímto vzorcem:
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

1. Připojte proudový senzor (např. CT kleště) ke kanálu CHESTER-K1
2. Připojte se k zařízení CHESTER přes RTT shell nebo USB konzoli
3. Mějte připravené referenční měřidlo (multimetr, klešťový ampérmetr)

#### Kalibrace krok za krokem {#step-by-step-calibration}

##### 1. Zapnutí kanálu {#1-enable-the-channel}

```
app config channel-active-1 true
```

##### 2. Nastavení kalibračního režimu {#2-set-calibration-mode}

Zvolte `rms` pro střídavé proudové transformátory nebo `avg` pro stejnosměrné senzory:

```
current channel-1 calib mode rms
```

##### 3. Ověření surové hodnoty {#3-verify-raw-reading}

Načtěte aktuální surovou hodnotu v mV:

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

Tím se aktuální surová hodnota v mV zachytí jako `x0` a nastaví se `y0 = 0`.

Výstup:

```
Channel 1: avg=0.5 rms=1.2 (using rms), point 0 set (x0=1.20, y0=0.00)
```

##### 5. Kalibrační bod 1 (vysoký bod) {#5-calibration-point-1-high-point}

Přiveďte známý **vysoký** proud (např. 10 A) a nastavte kalibraci:

```
current channel-1 calib set-1 10
```

Tím se aktuální surová hodnota v mV zachytí jako `x1` a nastaví se `y1 = 10`.

Výstup:

```
Channel 1: avg=50.3 rms=71.5 (using rms), point 1 set (x1=71.50, y1=10.00)
```

##### 6. Ověření kalibrace {#6-verify-calibration}

Načtěte kanál a zkontrolujte kalibrovaný výstup:

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

Pro vymazání kalibrace a návrat k surovému výstupu v mV:

```
current channel-1 calib reset
```
### Kalibrace Hallova senzoru {#hall-effect-sensor-calibration}

Tato sekce popisuje, jak nakonfigurovat firmware pro měření proudu pro Hallovy senzory (např. **YHDC HSTS30**). Pro zajištění přesných hodnot musí být systém nastaven na lineární aproximaci a diferenciální režim vstupu.

#### Logika kalibrace {#calibration-logic}

Standardní senzor (300 A / 2,5 V ± 0,625 V) používá referenční střed 2,5 V. Při jmenovitém proudu 300 A se výstupní napětí od tohoto středu vychýlí o 625 mV.

Zapnutím **diferenciálního režimu** (měření INP proti INM, kde INM je referenční napětí senzoru 2,5 V) izolujeme relevantní signál a odstraníme stejnosměrný offset.

**Výpočet citlivosti:**

```
Sensitivity = 625 mV / 300 A = 2.0833 mV/A
```

#### Teoretické parametry {#theoretical-parameters}

Firmware CHESTER používá pro definici lineárního škálování dva body [x, y], kde **x** je napětí (mV) a **y** je fyzikální hodnota (A).

| Parametr | Hodnota | Popis |
| :--- | :--- | :--- |
| **x0** | 0 | Vstup 0 mV (nulový offset) |
| **y0** | 0 | Naměřeno 0 A |
| **x1** | 625 | Vstup 625 mV (plný rozkmit) |
| **y1** | 300 | Naměřeno 300 A |

:::info

Před použitím této konfigurace se ujistěte, že fyzikální hodnoty na štítku senzoru odpovídají výše uvedeným teoretickým hodnotám.

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

Pokud má váš senzor jiný rozsah (např. 100 A / 1 V), musíte pro zachování přesnosti nastavit `x1` na `1000` a `y1` na `100`.

:::

### Původní metoda kalibrace {#legacy-calibration-method}

Ve firmě **HARDWARIO** máme kalibrační sadu pro **CHESTER Current** složenou z několika vzduchových cívek s 10/50/100 závity.

#### Příklad kalibrace proudu (původní metoda) {#example-current-calibration-legacy}

1. Změřte **offsety při nulovém proudu** a zapište je pro každý kanál jako parametr `x0`.

   > **Tip:** Pro spuštění měření použijte příkaz `sample`.

2. Předpokládejme kalibraci proudové sondy **100 A** a zvolme **cívku se 100 závity**.
3. Nastavte proudové omezení laboratorního zdroje na **900 mA** a zdroj připojte k cívce.
4. **Nasaďte proudovou sondu** na kalibrační cívku.
5. Ověřte proud protékající cívkou pomocí **multimetru** zapojeného do série.
6. Změřte kanál a naměřenou hodnotu zapište jako hodnotu `x1`.
7. Nastavte parametr `y1` na hodnotu `90000`.

   > **Info:** Hodnota představuje součin počtu závitů cívky a proudového omezení zdroje – v tomto příkladu `90000`.

8. Protože jsme předpokládali bod s nulovým proudovým offsetem, můžeme parametr `x0` ponechat nastavený na `0`.
9. Uložte konfigurační data (příkazem `config save`) a ověřte použité kalibrované hodnoty.

---

## Seznam změn {#changelog}

### v3.5.1 — 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Shell příkazy pro kalibraci jednotlivých kanálů v reálném čase – interaktivní nastavení nulového bodu a rozsahu
- **Přidáno**: Downlink watchdog – detekuje ztrátu komunikace s cloudem
- **Vylepšeno**: Spolehlivost a kódování LoRaWAN
- **Opraveno**: Validace kalibračního rozsahu

### v3.5.0 — 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nové varianty – **CHESTER Current Z** (se zálohovacím modulem CHESTER-Z1) a **CHESTER Current 1W** (s externími teplotními senzory DS18B20 na 1-Wire)
- **Přidáno**: Podpora LoRaWAN – jediný binární firmware pro LTE i LoRaWAN; režim se volí pomocí `app config mode lte` / `app config mode lrw`
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové API endpointy); předchozí firmware pro Cloud v1 zůstává k dispozici samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn CHESTER**](/chester/changelog).

:::
