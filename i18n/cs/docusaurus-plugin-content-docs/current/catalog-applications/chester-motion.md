---
slug: chester-motion
title: CHESTER Motion
---
import Image from '@theme/IdealImage';

# CHESTER Motion {#chester-motion}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Motion**, její hardware a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Zařízení **CHESTER Motion** rozpoznává pohyb včetně jeho směru: dvěma senzory PIR zjistí, zda se něco pohybuje zleva doprava, nebo zprava doleva. Aplikace počítá události pohybu se směrem a agregovaná telemetrická data odesílá přes LTE do HARDWARIO Cloud.

Zařízení **CHESTER Motion** sleduje dvěma senzory PIR průchod osob kolem sebe, a hodí se proto ke sledování pohybu lidí v továrnách, na nádražích nebo v prodejnách. Díky bezdrátovému připojení a dlouhé výdrži baterie ho snadno nainstalujete kdekoli, i na odlehlých místech, například v chráněných přírodních oblastech.

Typické využití:
- Sledování pohybu osob v uličkách továrních hal, na nádražích nebo v prodejnách
- Sledování pohybu osob v chráněných přírodních oblastech
- Vyšší bezpečnost a efektivnější provoz díky sledování přítomnosti osob v různých prostředích
- Snadná instalace na odlehlých nebo obtížně přístupných místech díky bezdrátovému provedení a dlouhé výdrži baterie

## Popis hardwaru {#chester-motion}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: základní deska CHESTER s držákem baterie typu C
* `CHESTER-E23-LP`: krabička se dvěma otvory pro senzory PIR, anténním pigtailem SMA a světlovodem
* `CHESTER-S3`: rozšiřující deska se dvěma senzory PIR
* `Battery SAFT LS26500`

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

### Technická specifikace {#technical-specification}

| Parametr | Hodnota |
| :--- | :--- |
| Materiál krabičky | ASA |
| Rozměry | 130×175×45 mm |
| Provozní teplota | -20 až +60 °C |
| Skladovací teplota | -30 až +70 °C |
| Krytí krabičky | IP67 |
| Jmenovité napětí baterie | 3,6 V |
| Jmenovitá kapacita baterie | 7700 mAh |
| Klidová spotřeba | < 180 µA |
| Špičková spotřeba | < 250 mA |

### Senzor PIR (CHESTER-S3) {#pir-sensor-chester-s3}

| Parametr | Hodnota |
| :--- | :--- |
| Dosah detekce | Až 3 metry |
| Úhel měření | Max. 80° |

## Měření a chování {#measurement-and-behavior}

Aplikace zpracovává data ve třech fázích:

1. **Vzorkování** (parametr `interval-sample`, výchozí hodnota 60 sekund):
   - Přečte vnitřní teploměr (teplota)
   - Přečte akcelerometr (osy X, Y, Z a orientace)
   - Uloží počty pohybů zachycené od posledního vzorku do bufferu vzorků pohybu
   - Po každém vzorku vynuluje čítače pohybu pro daný cyklus

2. **Detekce pohybu** (nepřetržitá, řízená přerušením):
   - Modul CHESTER-S3 má dva kanály senzorů PIR: **levý** (L) a **pravý** (R)
   - Když jeden kanál zachytí pohyb, otevře se **okno 750 ms**, během kterého se čeká na druhý kanál
   - Pokud se druhý kanál aktivuje do 750 ms, zaznamená se událost pohybu se směrem:
     - L pak R = pohyb zleva doprava (`motion_right`)
     - R pak L = pohyb zprava doleva (`motion_left`)
   - Pokud se druhý kanál do 750 ms neaktivuje, započítá se jen detekce jedním senzorem (`detect_left` nebo `detect_right`)

3. **Odesílání** (parametr `interval-report`, výchozí hodnota 1800 sekund):
   - Zakóduje všechna nasbíraná data do formátu CBOR
   - Odešle hlášení přes LTE do HARDWARIO Cloud
   - Za jeden interval hlášení se do bufferu vejde až **30 vzorků pohybu**
   - Čítače vzorků pohybu se po úspěšném odeslání vynulují
   - Totalizéry (čítače za celou dobu provozu) se mezi hlášeními zachovávají a nikdy se nenulují

:::info

K intervalu hlášení se přičítá náhodný rozptyl 0–20 %, aby více zařízení nevysílalo současně.

:::

- Citlivost detekce pohybu nastavíte přednastaveným režimem (**low**, **medium**, **high**) nebo vlastními parametry v režimu **individual**.

### Režimy citlivosti PIR {#pir-sensitivity-modes}

Aplikace nabízí tři přednastavené režimy citlivosti a jeden vlastní režim:

**Low**: nejvyšší odolnost proti falešným poplachům za cenu pomalejší detekce:
- `motion-sens`: 32, `motion-blind`: 3 s, `motion-pulse`: 3, `motion-window`: 4 s

**Medium** (výchozí): vyvážený poměr mezi rychlostí detekce a odolností proti falešným poplachům:
- `motion-sens`: 64, `motion-blind`: 2 s, `motion-pulse`: 2, `motion-window`: 2 s

**High**: nejrychlejší detekce s nejvyšší citlivostí. Detekci okamžitě spustí jediný impulz. Hodí se pro zabezpečovací systémy nebo dveřní senzory, kde je potřeba okamžitá reakce:
- `motion-sens`: 128, `motion-blind`: 1 s, `motion-pulse`: 1, `motion-window`: 0 s

**Individual**: ruční nastavení všech čtyř parametrů pro pokročilé ladění.

:::tip

Parametr `motion-sens` určuje, jak silně senzor reaguje na podnět. Čím vyšší hodnota, tím citlivější reakce.

:::

### Chování LED {#led-behavior}

| LED | Podmínka | Chování |
| :--- | :--- | :--- |
| Červená | Inicializace | Svítí během startu, zhasne po dokončení inicializace |
| Zelená | Servisní režim + režim LTE | Krátké bliknutí každých 5 sekund |
| Žlutá | Servisní režim + nenastavený režim | Krátké bliknutí každých 5 sekund |
| Zelená | Servisní režim + aktivace levého PIR | Bliknutí 100 ms při detekci levým senzorem |
| Červená | Servisní režim + aktivace pravého PIR | Bliknutí 100 ms při detekci pravým senzorem |
| Žlutá | Stisk tlačítka | Blikne N-krát (N = počet rozpoznaných kliknutí) |
| LOAD | Akce tlačítka na 5 kliknutí | Svítí 2 minuty |

:::info

Indikace servisního režimu na LED funguje jen tehdy, když je `service-mode-enabled` nastavené na `true`.

:::

### Chování tlačítka {#button-behavior}

Tlačítko INT spouští akce podle počtu kliknutí:

| Kliknutí | Akce |
| :--- | :--- |
| 1x | Okamžité odeslání dat do cloudu |
| 2x | Okamžité navzorkování všech senzorů |
| 3x | Navzorkování všech senzorů + odeslání dat |
| 4x | Restart zařízení |
| 5x | Rozsvícení LED LOAD na 2 minuty (indikace zátěže) |

Zařízení každý stisk potvrdí žlutou LED, která blikne tolikrát, kolik kliknutí rozpoznalo.

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-sample 60
app config interval-report 1800
app config interval-poll 0
app config sensitivity medium
app config motion-sens 64
app config motion-blind 2
app config motion-pulse 2
app config motion-window 2
app config service-mode-enabled false
app config mode lte
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

:::caution

Novou konfiguraci uplatníte příkazem `config save`, který uloží nové parametry a restartuje zařízení.

:::

Tímto příkazem nastavíte **provozní režim**:

```
app config mode <none|lte>
```

Tímto příkazem nastavíte **interval vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Tímto příkazem nastavíte **interval hlášení** v sekundách:

```
app config interval-report <30-86400>
```

Tímto příkazem nastavíte **interval dotazování** v sekundách (0 dotazování vypne):

```
app config interval-poll <0-86400>
```

Tímto příkazem zvolíte přednastavenou **citlivost PIR**:

```
app config sensitivity <low|medium|high|individual>
```

:::tip

V režimu `individual` můžete doladit všechny čtyři níže uvedené parametry detekce pohybu. V ostatních režimech je nastaví zvolená předvolba automaticky.

:::

Tímto příkazem nastavíte **citlivost senzoru pohybu** (vyšší hodnota = citlivější reakce):

```
app config motion-sens <1-255>
```

Tímto příkazem nastavíte **slepou dobu pohybu** v sekundách (doba po detekci, během které se další detekce ignorují):

```
app config motion-blind <0-10>
```

Tímto příkazem nastavíte **počet impulzů pohybu** (minimální počet detekčních impulzů, který spustí událost pohybu):

```
app config motion-pulse <1-10>
```

Tímto příkazem nastavíte **okno detekce pohybu** v sekundách (časové okno, během kterého musí přijít požadovaný počet impulzů):

```
app config motion-window <0-10>
```

Tímto příkazem zapnete nebo vypnete **servisní režim** pro sledování pohybu v reálném čase:

```
app config service-mode-enabled <true|false>
```

### Příkazy akcí {#action-commands}

Okamžité navzorkování všech senzorů:

```
sample
```

Okamžité odeslání dat do cloudu:

```
send
```

Sledování událostí detekce pohybu v reálném čase (výchozí časový limit 60 sekund, max. 1800 sekund):

```
motion detection [timeout_s]
```

Zobrazení vzorků pohybu z bufferu a totalizérů:

```
motion samples
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](index.md#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

```json
{
  "message": {
    "version": 2,
    "sequence": 42,
    "timestamp": 1736942400
  },
  "system": {
    "uptime": 86400,
    "voltage_load": 3.21,
    "voltage_rest": 3.65,
    "current_load": 38
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -87,
      "rsrq": -6,
      "snr": 12,
      "plmn": 23003,
      "cid": 2851843,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.02,
    "accel_y": -0.01,
    "accel_z": 9.81,
    "orientation": 2
  },
  "motion": {
    "totalizer": {
      "detect_left": 1250,
      "detect_right": 1180,
      "motion_left": 485,
      "motion_right": 520
    },
    "samples": [
      1736942400,
      [0, 3, 2, 1, 2],
      [60, 5, 4, 2, 3],
      [120, 2, 1, 0, 1],
      [180, 4, 3, 1, 2],
      [240, 6, 5, 3, 4]
    ]
  }
}
```

### Popis polí zprávy {#message-fields-description}

- **message**: Metadata (verze, pořadové číslo, časová značka).
- **system**: Stav napájení (doba běhu, napětí, proud).
- **network.parameter**: Podrobnosti o připojení LTE (RSRP, SNR, Cell ID atd.).
- **thermometer**: Vnitřní teplota v °C.
- **accelerometer**: Zrychlení v m/s² a orientace.
- **motion**:
  - **totalizer**: Čítače událostí za celou dobu provozu (nikdy se nenulují).
  - **samples**: Pole událostí pohybu s časy zakódovanými jako offsety. První prvek je výchozí časová značka, každý další prvek je pole: `[offset, detect_left, detect_right, motion_left, motion_right]`.

:::info

Kterákoli hodnota může být `null`, pokud se čtení příslušného senzoru nezdařilo.

:::

---

## Seznam změn {#changelog}

### v1.0.0 – 2026-02-11 {#v100--2026-02-11}

- **Přidáno**: První vydání aplikace: detekce pohybu dvěma senzory PIR na modulu CHESTER-S3
- **Přidáno**: Sledování směru pohybu: rozlišuje průchod zleva doprava (`motion_right`) a zprava doleva (`motion_left`)
- **Přidáno**: Nastavitelné předvolby citlivosti PIR: `low`, `medium` (výchozí), `high` a `individual` pro ruční ladění parametrů
- **Přidáno**: Totalizéry pohybu za celou dobu provozu, které se zachovají i po odeslání hlášení a restartu zařízení
- **Přidáno**: Servisní režim (`service-mode-enabled`) s okamžitou indikací na LED pro testování senzorů a instalaci
- **Přidáno**: Akce tlačítka s více kliknutími pro okamžité vzorkování, odesílání a restart zařízení

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
