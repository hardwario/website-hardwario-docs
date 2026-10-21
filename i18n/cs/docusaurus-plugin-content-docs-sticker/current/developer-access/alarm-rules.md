---
slug: alarm-rules
title: Pravidla alarmů
title_meta: "Pravidla alarmů (STICKER)"
---
import Image from '@theme/IdealImage';

# Systém alarmů a jeho pravidla (`alarm`) {#alarm-engine--rules-alarm}

Systém alarmů zařízení STICKER průběžně porovnává měření senzorů a stavy systému s aktivními pravidly. Jakmile se podmínka pravidla splní nebo pomine, zařízení odešle alarmový uplink na **fPort 3**, přes LoRaWAN nebo P2P.

Pravidla se spravují z vývojářské konzole příkazem `alarm` (viz [**Nastavení firmwaru**](firmware-setup.md)) nebo se nastavují na dálku přes NFC a downlinky přes rádio (`set_param` na fPort 85).

:::info Firmware v2.0.0
Ve **firmwaru STICKER v2.0.0** určuje pravidlo hodnotu senzoru **slotem a kanálem**. Každá hodnota každého senzoru je kanál, který lze hlídat alarmem, například obě teploty z machine probe, teplota z barometru nebo napětí na analogovém vstupu. Podle toho se změnila i syntaxe v shellu.

Pravidla alarmů z v1.4.x se **nepřevádějí**. Po aktualizaci se stará pravidla smažou; zapište je znovu v nové syntaxi.
:::

---

## Alarmové uplinky a omezení frekvence {#alarm-uplinks-and-rate-limiting}

| Příkaz | Argument | Popis |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (sekundy) | Okno pro sběr alarmových uplinků. První alarmová událost otevře okno této délky; události v něm se sbírají a odešlou se společně na jeho konci, nebo hned, jakmile se jich nasbírá 16. Jedno hlášení zabere nejvýš 4 rámce; co se nevejde, odejde v dalším hlášení. `0` = každá událost se odešle okamžitě. Výchozí `10`. |

- **Stav alarmů v každém telemetrickém rámci:** každý pravidelný telemetrický rámec nese aktuální stav alarmů, takže se stav do sítě dostane, i když se alarmový rámec cestou ztratí.
- **Potvrzované alarmy:** s `config radio-alarm-ack true` jsou alarmové uplinky na obou rádiích potvrzované a opakují se až třikrát (viz [**Konfigurace**](configuration.md#alarms-buzzer-and-battery)).
- **Bzučák:** na variantě s bzučákem hraje `config alarm-buzzer-mode` melodii, dokud je alarm aktivní.

### Vestavěné systémové alarmy {#built-in-system-alarms}
Kromě nastavených pravidel vyvolává firmware sám tyto alarmy:
- **Alarm slabé baterie:** napětí baterie klesne pod `config battery-level` (výchozí `2400` mV). Zruší se, jakmile se napětí vrátí o 0,3 V nad práh.
- **Alarm chybějících dat:** senzor, který má hlásit, přestane dodávat hodnoty. Jediné nepovedené čtení senzoru na desce si ponechá předchozí hodnotu a nic nevyvolá. U senzoru 1-Wire vyvolá čip, který přestal odpovídat, jeden alarm na svém prvním kanálu; když přestane odpovídat celý senzor, nahradí je jeden alarm za celé zařízení.
- **Alarm nesouhlasu senzoru:** slot 1-Wire, který očekává jeden typ senzoru (`config sensorN-type`), uvidí senzor jiného typu. Alarm (`sensor_mismatch`) nese zjištěný typ; pravidla slotu se přestanou vyhodnocovat a jeho hodnoty se hlásí jako chybějící, dokud se správný senzor nevrátí nebo se slot znovu nepřiřadí.

---

## Dynamická pravidla alarmů {#dynamic-alarm-rules}

Pravidla se ukládají do 16 pevných indexů (`0`-`15`). Index je stálý identifikátor pravidla a tentýž kanál může hlídat několik pravidel (například pro varovnou a kritickou úroveň).

| Příkaz | Popis |
|---|---|
| `alarm list [<rule>]` | Vypíše všechna pravidla, nebo pravidlo se zadaným indexem. |
| `alarm set <rule> <slot> <channel> <key> <value> ...` | Zapíše pravidlo na index `<rule>` (`0`-`15`). |
| `alarm new <slot> <channel> <key> <value> ...` | Zapíše pravidlo na první volný index. |
| `alarm clear <rule>` / `alarm clear all` | Smaže jedno pravidlo nebo všechna pravidla. |
| `alarm poll` | Vynutí okamžité vzorkování a vyhodnocení všech aktivních pravidel (hodí se při testování na stole). |
| `sensor types [<type>]` | Vypíše typy senzorů a jejich kanály s čísly a druhy pravidel. |

`alarm list` vypíše u každého pravidla slot, kanál, typ senzoru, hodnoty a stav. Pravidlo zapsané pro typ senzoru, který slot už neočekává, je označené **`STALE`**: zůstane uložené, ale nevyhodnocuje se. Pravidlo pro kanál, jehož schopnost je vypnutá (například `cap-barometer false`), se uloží a zůstane neaktivní, dokud schopnost nezapnete.

### Sloty {#slots}

| Slot | Senzor |
|---|---|
| `mb` | Základní deska zařízení STICKER: senzory na desce, Hallovy spínače, vstupy A/B, PIR a akcelerometr. |
| `s1`–`s4` | Sloty 1-Wire 1 až 4. Než do slotu zapíšete pravidlo, musí mít nastavený typ senzoru (`config sensor1-type` … `sensor4-type`, nastaví se při přiřazení senzoru). |

### Kanály {#channels}

Kanál se zadává názvem nebo číslem; seznam vypíše `sensor types`. Kanály označené „—“ nemohou být cílem pravidla.

**Základní deska (`mb`)**

| Kan. | Název | Druh | Jednotka | Dostupný s |
|:-:|---|---|---|---|
| 0 | `temperature` | prahový | °C | `cap-sht` |
| 1 | `humidity` | prahový | %RH | `cap-sht` |
| 2 | `pressure` | prahový | hPa | `cap-barometer` |
| 3 | `illuminance` | prahový | lx | `cap-light-sensor` |
| 4 | `temperature-baro` | prahový | °C | `cap-barometer` |
| 5 | `hall-left-state` | stavový | 0/1 | `cap-hall-left` |
| 6 | `hall-left-count` | četnostní | impulzy | `cap-hall-left` |
| 7 | `hall-right-state` | stavový | 0/1 | `cap-hall-right` |
| 8 | `hall-right-count` | četnostní | impulzy | `cap-hall-right` |
| 9 | `input-a-state` | stavový | 0/1 | vstup A `digital` |
| 10 | `input-a-count` | četnostní | impulzy | vstup A `digital` nebo `pulse` |
| 11 | `input-a-voltage` | prahový | V | vstup A `analog` |
| 12 | `input-b-state` | stavový | 0/1 | vstup B `digital` |
| 13 | `input-b-count` | četnostní | impulzy | vstup B `digital` nebo `pulse` |
| 14 | `input-b-voltage` | prahový | V | vstup B `analog` |
| 15 | `pir-motion` | stavový (okamžikový) | 0/1 | `cap-gpio-mode pir` |
| 16 | `pir-count` | četnostní | události | `cap-gpio-mode pir` |
| 17 | `accel-motion` | stavový (okamžikový) | 0/1 | `cap-accelerometer` |
| 18 | `accel-count` | četnostní | události | `cap-accelerometer` |
| 19 | `accel-orientation` | — | 1–6 | `cap-accelerometer` |
| 20 | `battery-voltage` | — (jen alarm slabé baterie) | V | vždy |
| 21 | `altitude` | — | m | `cap-barometer` |

**1-Wire `dallas` (DS18B20, typ `2`)**

| Kan. | Název | Druh | Jednotka |
|:-:|---|---|---|
| 0 | `temperature` | prahový | °C |

**1-Wire `machine-probe` (typ `3`)**

| Kan. | Název | Druh | Jednotka |
|:-:|---|---|---|
| 0 | `temperature` | prahový | °C |
| 1 | `humidity` | prahový | %RH |
| 2 | `temperature-aux` | prahový | °C |
| 3 | `illuminance` | prahový | lx |
| 4 | `magnetic-field` | prahový | mT |
| 5 | `tilt` | stavový | 0/1 |
| 6 | `accel-x` | prahový | m/s² |
| 7 | `accel-y` | prahový | m/s² |
| 8 | `accel-z` | prahový | m/s² |

### Druhy pravidel {#rule-kinds}

Druh pravidla určuje kanál. Každý druh má vlastní klíče, které se zadávají jako dvojice `<key> <value>`:

| Druh | Klíče |
|---|---|
| prahový | `lo <lo> hi <hi> [dwell <deadband>]` (`hi` musí být větší než `lo`, hodnoty v jednotkách kanálu) |
| stavový | `from <0\|1> to <0\|1> [dwell <seconds>]` |
| četnostní | `hi <N> [dwell <seconds>]` |

- **Prahová pravidla:** alarm se aktivuje okamžitě, když hodnota opustí `[lo, hi]`: pod `lo` jako alarm LOW, nad `hi` jako alarm HIGH. Když hodnota přeskočí rovnou na druhou stranu, starý alarm skončí a začne nový.
- **Stavová pravidla:** `from != to` znamená **hranu** (pravidlo se vyvolá jednou při přechodu), `from == to` znamená **úroveň** (pravidlo je aktivní, dokud má linka hodnotu `to`).
- **Pohyb a klid:** okamžikové kanály `pir-motion` a `accel-motion` přijímají tři tvary. Hrana `from 0 to 1` se vyvolá při pohybu. Úroveň `from 1 to 1` znamená „pohyb začal / skončil“: první událost alarm aktivuje, každá další znovu spustí klidové okno `dwell` a alarm skončí, jakmile `dwell` uplyne bez události. Úroveň `from 0 to 0` znamená „klid“: aktivuje se, jakmile `dwell` uplyne bez události, a skončí při další události, například u stroje, který musí nahlásit, že přestal vibrovat.
- **Četnostní pravidla:** alarm se vyvolá, jakmile čítač během `dwell` sekund vzroste aspoň o `hi`. Trvale vysoká četnost zůstává jedním alarmem; skončí v prvním okně, které hodnoty `hi` nedosáhne.

---

## Parametr `dwell` {#the-dwell-parameter}

Volitelný parametr **`dwell`** (výchozí `0`) filtruje šum a zákmity. Jeho význam závisí na druhu pravidla: u prahových pravidel je to hodnota v jednotkách kanálu, u ostatních druhů čas v sekundách (`0`-`3600`).

| Druh pravidla | Chování `dwell` |
|---|---|
| **Prahové** | Pásmo necitlivosti (hystereze) v jednotkách kanálu. Alarm HIGH se zruší, jakmile hodnota klesne pod `hi - dwell`, alarm LOW, jakmile vystoupí nad `lo + dwell`; mezi mezí a okrajem pásma alarm trvá. `0` alarm zruší hned po návratu do pásma. Platný rozsah `0` až `hi - lo`. |
| **Stavové (hrana)** | Přechod musí trvat `dwell` sekund, než se pravidlo vyvolá. Po vyvolání pravidlo čeká `dwell` sekund, než se může vyvolat znovu. |
| **Stavové (úroveň)** | Linka musí zůstat ve stavu `to` po dobu `dwell` sekund, než se alarm aktivuje. Deaktivuje se okamžitě. |
| **Okamžikové (`pir-motion`, `accel-motion`)** | Pravidlo na hranu: nová událost pohybu může alarm vyvolat znovu až po `dwell` sekundách. Pravidla na úroveň: klidové okno popsané výše. |
| **Četnostní** | Okno pro počítání v sekundách. `0` = interval hlášení (`interval-report`). |

---

## Příklady příkazů {#command-examples}

```
sensor types motherboard                          # List the motherboard channels
alarm set 0 mb temperature lo 5 hi 30             # Alarm below 5 °C or above 30 °C
alarm set 1 mb humidity lo 0 hi 55 dwell 5        # Active above 55 %RH, clears below 50 %RH
alarm set 2 mb input-a-state from 0 to 1          # Rising edge on input A
alarm set 3 mb input-a-state from 0 to 1 dwell 5  # Rising edge on input A must hold for 5 seconds
alarm set 4 mb accel-motion from 0 to 0 dwell 300 # No motion for 5 minutes
alarm new mb hall-left-count hi 10 dwell 60       # 10 or more pulses within 60 seconds
alarm new s1 temperature lo 2 hi 8 dwell 0.5      # 1-Wire slot 1: LOW clears above 2.5 °C, HIGH below 7.5 °C
alarm list                                        # Review all programmed alarm rules
alarm clear 1                                     # Erase rule 1
```

:::info Bezdrátová správa
Pravidla alarmů lze zapisovat i přes rádio nebo NFC binárními payloady na fPort 85. Příkaz `set_param` s `alarms_replace` udělá z jedné zprávy kompletní tabulku alarmů, takže pravidla smazaná na hostiteli zmizí i ze zařízení. Na odmítnuté pravidlo zařízení odpoví `fault_field` = 400 + tag pole daného pravidla, takže hostitel ví, které pravidlo neprošlo. Binární řetězce downlinku pro svůj síťový server sestavíte v [**generátoru příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx).
:::
