---
slug: chester-motion
title: CHESTER Motion
description: "Tento článek popisuje základní funkcionalitu, popis hardwaru a ukázkovou JSON zprávu katalogové aplikace CHESTER Motion."
---
import Image from '@theme/IdealImage';

# CHESTER Motion {#chester-motion}

Tento článek popisuje základní funkcionalitu, popis hardwaru a ukázkovou **JSON** zprávu katalogové aplikace **CHESTER Motion**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](common-functionality.md): jak funguje LED, tlačítko a konfigurace sítě.
- [**Platform Management**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

**CHESTER Motion** je zařízení pro směrovou detekci pohybu, které pomocí dvou PIR senzorů detekuje a sleduje směr pohybu (zleva doprava a zprava doleva). Aplikace počítá pohybové události včetně informace o směru a odesílá agregovaná telemetrická data přes LTE do HARDWARIO Cloud.

Zařízení **CHESTER Motion** je vybaveno dvěma PIR senzory pro sledování průchodu osob kolem zařízení, což z něj dělá ideální řešení pro sledování pohybu osob v továrnách, na nádražích nebo v maloobchodních prostorách. Díky bezdrátové konektivitě a dlouhé výdrži baterie lze zařízení snadno nainstalovat kdekoliv, včetně odlehlých míst pro monitorování chráněných přírodních oblastí.

Typické případy použití:
- Sledování pohybu osob v továrních uličkách, na nádražích nebo v obchodních prostorách
- Sledování pohybu osob v chráněných přírodních oblastech
- Zvýšení bezpečnosti a optimalizace provozu díky monitorování přítomnosti osob v různých prostředích
- Snadná instalace na odlehlých nebo obtížně přístupných místech díky bezdrátovému designu a dlouhé životnosti baterie

## Popis hardwaru {#chester-motion}

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS`: základní deska CHESTER s držákem baterie typu C
* `CHESTER-E23-LP`: krabička se dvěma otvory pro PIR senzory, SMA anténním pigtailem a světlovodem
* `CHESTER-S3`: rozšiřující deska se dvěma PIR senzory
* `Battery SAFT LS26500`

Více podrobností najdete v kapitole [**Objednací kódy**](../ordering-codes.md).

### Technická specifikace {#technical-specification}

| Parametr | Hodnota |
| :--- | :--- |
| Materiál krabičky | ASA |
| Rozměry | 130×175×45 mm |
| Provozní teplota | -20 až +60 °C |
| Skladovací teplota | -30 až +70 °C |
| Krytí krabičky | IP67 |
| Nominální napětí baterie | 3.6 V |
| Nominální kapacita baterie | 7700 mAh |
| Klidová spotřeba | < 180 µA |
| Špičková spotřeba | < 250 mA |

### PIR senzor (CHESTER-S3) {#pir-sensor-chester-s3}

| Parametr | Hodnota |
| :--- | :--- |
| Dosah detekce | Až 3 metry |
| Úhel měření | Max 80° |

## Měření a chování {#measurement-and-behavior}

Aplikace pracuje ve třístupňovém řetězci:

1. **Vzorkování** (řízeno parametrem `interval-sample`, výchozí 60 sekund):
   - Čte interní teploměr (teplota)
   - Čte akcelerometr (osy X, Y, Z a orientace)
   - Zachytává nashromážděné počty pohybů od posledního vzorku do bufferu pohybových vzorků
   - Po každém vzorku resetuje čítače pohybu pro daný cyklus

2. **Detekce pohybu** (kontinuální, řízená přerušením):
   - Modul CHESTER-S3 má dva kanály PIR senzorů: **levý** (L) a **pravý** (R)
   - Když jeden kanál detekuje pohyb, otevře se **okno 750 ms** pro detekci protilehlého kanálu
   - Pokud se protilehlý kanál aktivuje do 750 ms, zaznamená se směrová pohybová událost:
     - L pak R = pohyb zleva doprava (`motion_right`)
     - R pak L = pohyb zprava doleva (`motion_left`)
   - Pokud se protilehlý kanál do 750 ms neaktivuje, započítá se pouze detekce jedním senzorem (`detect_left` nebo `detect_right`)

3. **Reportování** (řízeno parametrem `interval-report`, výchozí 1800 sekund):
   - Zakóduje všechna nasbíraná data do formátu CBOR
   - Odešle report do HARDWARIO Cloud přes LTE
   - Za jedno reportovací období lze uložit do bufferu až **30 pohybových vzorků**
   - Čítače pohybových vzorků se po úspěšném odeslání resetují
   - Totalizéry (celoživotní čítače) přetrvávají napříč reporty a nikdy se neresetují

:::info

K intervalu reportování se přidává náhodný rozptyl 0-20 %, aby se zabránilo současnému vysílání více zařízení.

:::

- Citlivost detekce pohybu lze nakonfigurovat pomocí přednastavených režimů (**low**, **medium**, **high**) nebo **individual** vlastními parametry.

### Režimy citlivosti PIR {#pir-sensitivity-modes}

Aplikace nabízí tři přednastavené režimy citlivosti a jeden vlastní režim:

**Low**: Poskytuje nejvyšší odolnost proti falešným poplachům s pomalejší detekcí:
- `motion-sens`: 32, `motion-blind`: 3 s, `motion-pulse`: 3, `motion-window`: 4 s

**Medium** (výchozí): Vyvážený poměr mezi rychlostí detekce a odolností proti falešným poplachům:
- `motion-sens`: 64, `motion-blind`: 2 s, `motion-pulse`: 2, `motion-window`: 2 s

**High**: Nejrychlejší detekce s nejvyšší citlivostí. Jediný pulz spustí detekci okamžitě. Nejvhodnější pro bezpečnostní systémy nebo dveřní senzory, kde je vyžadována okamžitá reakce:
- `motion-sens`: 128, `motion-blind`: 1 s, `motion-pulse`: 1, `motion-window`: 0 s

**Individual**: Umožňuje ruční nastavení všech čtyř parametrů pro pokročilé řízení.

:::tip

Parametr `motion-sens` řídí, jak silně senzor reaguje na vstup. Vyšší hodnoty znamenají vyšší citlivost reakce.

:::

### Chování LED {#led-behavior}

| LED | Podmínka | Chování |
| :--- | :--- | :--- |
| Červená | Inicializace | Svítí během startu, zhasne po dokončení inicializace |
| Zelená | Servisní režim + režim LTE | Krátké bliknutí každých 5 sekund |
| Žlutá | Servisní režim + žádný režim | Krátké bliknutí každých 5 sekund |
| Zelená | Servisní režim + spuštění levého PIR | Bliknutí 100 ms při detekci levým senzorem |
| Červená | Servisní režim + spuštění pravého PIR | Bliknutí 100 ms při detekci pravým senzorem |
| Žlutá | Stisk tlačítka | Pulzuje N krát (N = počet detekovaných kliknutí) |
| LOAD | Akce 5 kliknutí tlačítkem | Svítí po dobu 2 minut |

:::info

LED indikátory servisního režimu jsou aktivní pouze tehdy, když je `service-mode-enabled` nastaveno na `true`.

:::

### Chování tlačítka {#button-behavior}

Tlačítko INT podporuje akce s více kliknutími:

| Kliknutí | Akce |
| :--- | :--- |
| 1x | Okamžité odeslání dat do cloudu |
| 2x | Okamžité navzorkování všech senzorů |
| 3x | Navzorkování všech senzorů + odeslání dat |
| 4x | Restart zařízení |
| 5x | Rozsvícení LED LOAD na 2 minuty (indikace zátěže) |

Každý stisk tlačítka je potvrzen bliknutími žluté LED odpovídajícími počtu detekovaných kliknutí.

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná pomocí příkazu `app config show`):

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

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu stromu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

:::caution

Pro uplatnění nové konfigurace je potřeba zavolat `config save`, který aplikuje nové konfigurační parametry a restartuje zařízení.

:::

Příkaz pro nastavení **provozního režimu**:

```
app config mode <none|lte>
```

Příkaz pro nastavení **intervalu vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Příkaz pro nastavení **intervalu reportování** v sekundách:

```
app config interval-report <30-86400>
```

Příkaz pro nastavení **intervalu dotazování** v sekundách (0 pro vypnutí):

```
app config interval-poll <0-86400>
```

Příkaz pro nastavení přednastavené **citlivosti PIR**:

```
app config sensitivity <low|medium|high|individual>
```

:::tip

Při nastavení na `individual` můžete doladit všechny čtyři parametry detekce pohybu uvedené níže. V ostatních režimech jsou tyto parametry nastaveny automaticky podle přednastavení.

:::

Příkaz pro nastavení **citlivosti senzoru pohybu** (vyšší hodnota = vyšší citlivost reakce):

```
app config motion-sens <1-255>
```

Příkaz pro nastavení **slepé doby pohybu** v sekundách (doba po detekci, během které jsou další detekce ignorovány):

```
app config motion-blind <0-10>
```

Příkaz pro nastavení **počtu pulzů pohybu** (minimální počet detekčních pulzů potřebný ke spuštění pohybové události):

```
app config motion-pulse <1-10>
```

Příkaz pro nastavení **okna detekce pohybu** v sekundách (časové okno, během kterého musí být zaznamenán požadovaný počet pulzů):

```
app config motion-window <0-10>
```

Příkaz pro zapnutí/vypnutí **servisního režimu** pro monitorování pohybu v reálném čase:

```
app config service-mode-enabled <true|false>
```

### Akční příkazy {#action-commands}

Okamžité navzorkování všech senzorů:

```
sample
```

Okamžité odeslání dat do cloudu:

```
send
```

Sledování událostí detekce pohybu v reálném čase (výchozí timeout 60 sekund, max 1800 sekund):

```
motion detection [timeout_s]
```

Zobrazení uložených pohybových vzorků a totalizérů:

```
motion samples
```

## Firmware {#firmware}

Nejnovější firmware je k dispozici v [kapitole Firmware](index.md#application-firmware) katalogových aplikací.

## Ukázková JSON zpráva {#example-json-message}

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
- **network.parameter**: Detaily LTE připojení (RSRP, SNR, Cell ID atd.).
- **thermometer**: Interní teplota ve °C.
- **accelerometer**: Zrychlení v m/s² a orientace.
- **motion**:
  - **totalizer**: Celoživotní čítače událostí (nikdy se neresetují).
  - **samples**: Pole pohybových událostí kódované jako časová posloupnost offsetů. První prvek je základní časová značka. Každý další prvek je pole: `[offset, detect_left, detect_right, motion_left, motion_right]`.

:::info

Jakákoliv hodnota může být `null`, pokud čtení odpovídajícího senzoru selhalo.

:::

---

## Seznam změn {#changelog}

### v1.0.0 – 2026-02-11 {#v100--2026-02-11}

- **Přidáno**: Prvotní vydání aplikace: detekce pohybu dvěma PIR senzory pomocí modulu CHESTER-S3
- **Přidáno**: Sledování směru pohybu: rozlišuje průchod zleva doprava (`motion_right`) a zprava doleva (`motion_left`)
- **Přidáno**: Konfigurovatelná přednastavení citlivosti PIR: `low`, `medium` (výchozí), `high` a `individual` pro ruční ladění parametrů
- **Přidáno**: Celoživotní totalizéry pohybu, které přetrvávají napříč reporty a restarty zařízení
- **Přidáno**: Servisní režim (`service-mode-enabled`) se zpětnou vazbou LED v reálném čase pro testování senzorů a instalaci
- **Přidáno**: Akce tlačítka s více kliknutími pro okamžité vzorkování, odesílání a restart zařízení

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn CHESTER**](/chester/changelog).

:::
