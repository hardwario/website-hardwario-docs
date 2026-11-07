---
title: CHESTER Motion
description: "Firmware katalogové aplikace CHESTER Motion: jak počítá průchody dvěma senzory PIR, nastavení citlivosti, příkazy a formát dat."
---

# CHESTER Motion {#chester-motion}

Firmware **CHESTER Motion** udělá ze zařízení CHESTER detektor pohybu, který rozpozná i jeho směr. Sleduje dva senzory PIR, počítá detekce na každé straně a průchody v každém směru (zleva doprava a zprava doleva) a počty odesílá do HARDWARIO Cloud přes NB-IoT/LTE.

Firmware má pro celou aplikaci jediné sestavení. Síťový režim, tlačítko a konfigurační příkazy, které mají katalogové aplikace společné, popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware a jeho technickou specifikaci najdete na stránce katalogové aplikace [**CHESTER Motion**](../../catalog-applications/chester-motion/index.md).

## Podporovaný hardware {#supported-hardware}

Firmware podporuje:

- rozšiřující desku **CHESTER-S3** se dvěma senzory PIR, levým (L) a pravým (R)
- teploměr a akcelerometr na základní desce CHESTER

Komunikuje jen přes NB-IoT/LTE.

## Měření a chování {#measurement-and-behavior}

Aplikace zpracovává data ve třech fázích:

1. **Vzorkování** (parametr `interval-sample`, výchozí hodnota 60 sekund, první vzorek hned po startu):
   - Přečte vnitřní teploměr (teplota)
   - Přečte akcelerometr (osy X, Y, Z a orientace)
   - Uloží počty pohybů zachycené od posledního vzorku s časovou značkou do bufferu vzorků pohybu
   - Vynuluje čítače pohybu pro další vzorek

2. **Detekce pohybu** (nepřetržitá, řízená přerušením):
   - Modul CHESTER-S3 má dva kanály senzorů PIR: **levý** (L) a **pravý** (R)
   - Každá aktivace kanálu se započítá jako detekce na jeho straně (`detect_left` nebo `detect_right`)
   - Když jeden kanál zachytí pohyb, otevře se **okno 750 ms**, během kterého se čeká na druhý kanál
   - Pokud se druhý kanál aktivuje do 750 ms, dvojice se navíc započítá jako pohyb se směrem:
     - L pak R = pohyb zleva doprava (`motion_right`)
     - R pak L = pohyb zprava doleva (`motion_left`)
   - Další aktivace prvního kanálu během okna se nezapočítá

3. **Odesílání** (parametr `interval-report`, výchozí hodnota 1800 sekund, první hlášení 10 sekund po startu):
   - Zakóduje všechna nasbíraná data do formátu CBOR
   - Odešle hlášení přes LTE do HARDWARIO Cloud
   - Za jeden interval hlášení se do bufferu vejde až **30 vzorků pohybu**; další vzorky se až do příštího úspěšného hlášení zahazují, jejich počty se ale do celkových součtů započítají
   - Vzorky pohybu se po úspěšném odeslání vymažou
   - Celkové součty (`totalizer`) se počítají od startu zařízení: hlášení je nenulují, restart ano

:::info

Interval hlášení má náhodný rozptyl až ±20 % (viz [**Rozptyl intervalu hlášení**](../../catalog-applications/common-functionality.md#report-interval-jitter)), aby více zařízení nevysílalo současně.

:::

- Citlivost detekce pohybu nastavíte přednastaveným režimem (**low**, **medium**, **high**) nebo vlastními parametry v režimu **individual**.

### Režimy citlivosti PIR {#pir-sensitivity-modes}

Aplikace nabízí tři přednastavené režimy citlivosti a jeden vlastní režim. Oba senzory PIR mají vždy stejné nastavení:

**Low**: nejvyšší odolnost proti falešným poplachům za cenu pomalejší detekce:
- `motion-sens`: 32, `motion-blind`: 3, `motion-pulse`: 3, `motion-window`: 4 (v senzorech: slepá doba 2 s, 4 impulzy, okno 2 s)

**Medium** (výchozí): vyvážený poměr mezi rychlostí detekce a odolností proti falešným poplachům:
- `motion-sens`: 64, `motion-blind`: 2, `motion-pulse`: 2, `motion-window`: 2 (v senzorech: slepá doba 1,5 s, 3 impulzy, okno 6 s)

**High**: nejrychlejší detekce s nejvyšší citlivostí. Hodí se pro zabezpečovací systémy nebo dveřní senzory, kde je potřeba okamžitá reakce:
- `motion-sens`: 32, `motion-blind`: 1, `motion-pulse`: 1, `motion-window`: 0 (v senzorech: slepá doba 1 s, 2 impulzy, okno 2 s)

**Individual**: ruční nastavení všech čtyř parametrů pro pokročilé ladění.

Firmware zapisuje hodnoty `motion-blind`, `motion-pulse` a `motion-window` beze změny do konfiguračního registru senzorů PIR a ty z nich odvodí časy a počet impulzů (datasheet Excelitas PYQ 1648, číslo dílu 7052):

- slepá doba po detekci = 0,5 s + 0,5 s × `motion-blind`, tedy 0,5–5,5 s pro hodnoty 0–10
- počet impulzů potřebný k detekci = 1 + `motion-pulse`, 1 až 4
- okno, během kterého musí impulzy přijít = 2 s + 2 s × `motion-window`, 2–8 s

:::tip

Parametr `motion-sens` je prahová hodnota detekce senzorů PIR. Čím nižší hodnota, tím slabší signál senzory zachytí, takže jsou citlivější.

:::

:::caution

Ovladač modulu CHESTER-S3 předává senzorům jen dva nejnižší bity parametrů `motion-pulse` a `motion-window`, takže hodnoty od 4 výš přetečou (4 funguje jako 0, 5 jako 1). Jediný impulz proto nastavíte hodnotou `motion-pulse` 4 nebo 8. Týká se to i předvolby `low`: její okno 4 dorazí do senzorů jako 0, tedy okno 2 s.

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

Indikace servisního režimu na LED funguje jen tehdy, když je `service-mode-enabled` nastavené na `true`. Bez servisního režimu LED každých 5 sekund nebliká, což šetří baterii.

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

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-report` | Report interval | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | Poll interval | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `sensitivity` | Sensitivity | `low`, `medium`, `high`, `individual` | `medium` | Předvolba citlivosti PIR (viz [Režimy citlivosti PIR](#pir-sensitivity-modes)) |
| `motion-sens` | Motion sens | `<1-255>` | `64` | Prahová hodnota detekce senzorů PIR; nižší hodnota znamená vyšší citlivost |
| `motion-blind` | Motion blind | `<0-10>` | `2` | Slepá doba po detekci, během které se další detekce ignorují: 0,5 s + 0,5 s × hodnota (výchozí 1,5 s) |
| `motion-pulse` | Motion pulse | `<1-10>` | `2` | Počet impulzů v okně, který spustí událost pohybu: 1 + hodnota, platí jen dva nejnižší bity (výchozí 3 impulzy) |
| `motion-window` | Motion window | `<0-10>` | `2` | Časové okno, během kterého musí impulzy přijít: 2 s + 2 s × hodnota, platí jen dva nejnižší bity (výchozí 6 s) |
| `service-mode-enabled` | Service mode enabled | `true`, `false` | `false` | Servisní režim: indikace každé detekce a síťového režimu na LED pro instalaci a testování |

Čtyři parametry `motion-*` platí jen tehdy, když je `sensitivity` nastavené na `individual`; v ostatních režimech je nastaví zvolená předvolba a příkaz `app config show` je nevypisuje.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration). Aplikace CHESTER Motion nabízí jen režimy `none` a `lte` a startuje v režimu `lte`.

## Příkazy {#commands}

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje všechny senzory a vypíše nový vzorek pohybu |
| `send` | Okamžitě odešle data |
| `motion detection [timeout_s]` | Po dobu `timeout_s` sekund (výchozí 60, nejvýše 1800) vypisuje každý zachycený pohyb se směrem a stavem čítačů hned, jak nastane |
| `motion samples` | Vypíše vzorky pohybu z bufferu a celkové součty |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-motion:v4.0.1](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `56cbeef2fcae46bcb69e76025800a33b`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b/hex), SHA256 `cdb3d71768b8ab93a73f1265c7c863917088065e7f791b4a9e27c229d79c4d15`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b/bin), SHA256 `65c2304a07f759c5f1de436323712b2d6f0dbd5b6d45c63f2a995fe8e1a4a82b`
- **Sestavení ze SDK:** `west chester-update motion --variant "CHESTER Motion"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Všechna pole s jednotkami, rozsahy a rozlišením popisuje stránka katalogové aplikace v části [**Data**](../../catalog-applications/chester-motion/index.md#data-over-lte).

Ukázka je zkrácená na čtyři vzorky pohybu; ve výchozí konfiguraci jich hlášení nese až 30.

```json
{
  "message": {
    "version": 2,
    "sequence": 42,
    "timestamp": 1793953210
  },
  "system": {
    "uptime": 86412,
    "voltage_load": 3.44,
    "voltage_rest": 3.65,
    "current_load": 34
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
      {
        "timestamp": 1793953020,
        "detect_left": 3,
        "detect_right": 2,
        "motion_left": 1,
        "motion_right": 1
      },
      {
        "timestamp": 1793953080,
        "detect_left": 5,
        "detect_right": 4,
        "motion_left": 2,
        "motion_right": 2
      },
      {
        "timestamp": 1793953140,
        "detect_left": 0,
        "detect_right": 0,
        "motion_left": 0,
        "motion_right": 0
      },
      {
        "timestamp": 1793953200,
        "detect_left": 2,
        "detect_right": 3,
        "motion_left": 0,
        "motion_right": 2
      }
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
  - **totalizer**: Čítače událostí od startu zařízení (hlášení je nenulují, restart ano).
  - **samples**: Vzorky pohybu od posledního úspěšného hlášení, nejvýše 30. Každý má časovou značku `timestamp` (unixový čas konce intervalu vzorku) a počty za tento interval: `detect_left`, `detect_right`, `motion_left` (průchody zprava doleva) a `motion_right` (průchody zleva doprava).

:::info

Hodnoty ve strukturách `system`, `network`, `thermometer` a `accelerometer` jsou `null`, když se jejich čtení nezdařilo.

:::

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
