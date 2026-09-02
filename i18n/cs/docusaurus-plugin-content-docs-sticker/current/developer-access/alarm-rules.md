---
slug: alarm-rules
title: Pravidla alarmů
description: "Engine alarmů zařízení STICKER průběžně vyhodnocuje měření senzorů a stavy systému proti aktivním pravidlům. Když je podmínka pravidla splněna nebo zrušena, vznikne okamžitý uplink payload a odešle se na fPort 3."
---
import Image from '@theme/IdealImage';

# Engine a pravidla alarmů (`alarm`) {#alarm-engine--rules-alarm}

Engine alarmů zařízení STICKER průběžně vyhodnocuje měření senzorů a stavy systému proti aktivním pravidlům. Když je podmínka pravidla splněna nebo zrušena, vznikne okamžitý uplink payload a odešle se na **fPort 3**.

Pravidla se spravují z vývojářské konzole příkazem `alarm` (viz [**Nastavení firmwaru**](firmware-setup.md)) nebo se konfigurují na dálku přes NFC a downlinky LoRaWAN (`set_param` na fPort 85).

:::info Firmware v1.4.0
Engine alarmů popsaný na této stránce je základní schopnost představená ve **firmwaru STICKER v1.4.0**. Podporuje dynamická prahová pravidla v několika slotech, stavové přechody, limity rychlosti pulzů, monitorování zdraví systému (nízká baterie, watchdog) a okamžité hlášení událostí uplinkem na **fPort 3**.
:::

---

## Globální omezení frekvence a systémové alarmy {#global-rate-limiting--system-alarms}

Globální omezení frekvence alarmů se řídí parametrem `config alarm-limit`:

| Příkaz | Argument | Popis |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (sekundy) | Minimální interval mezi po sobě jdoucími alarmovými uplinky. První událost vyvolá okamžitý uplink; další alarmy v tomto okně se zařadí do fronty nebo potlačí. `0` = omezení frekvence vypnuto. Výchozí `0`. |

### Vestavěné systémové alarmy {#built-in-system-alarms}
Kromě dynamických pravidel nastavených uživatelem spravuje firmware v1.4.0 automaticky dvě systémové podmínky zdraví:
- **Alarm nízké baterie:** Vyvolá se, když napětí baterie pod zatížením klesne pod kritickou provozní hranici. Hlásí se na fPort 3.
- **Watchdog alarm bez dat:** Sleduje vnitřní vzorkování senzorů. Pokud fyzický senzor neodpovídá nebo vynechá několik vzorkovacích oken za sebou, vyvolá se watchdog alarm na fPort 3.

---

## Dynamická pravidla alarmů {#dynamic-alarm-rules}

Prahy pro jednotlivé senzory jsou drženy v 16 fixních slotech (`0`-`15`). Index slotu slouží jako stabilní identifikátor pravidla, takže tentýž slot senzoru může sledovat víc pravidel současně (například úroveň varování a kritickou úroveň).

| Příkaz | Popis |
|---|---|
| `alarm list [<index>]` | Vypíše všechna aktivní pravidla alarmů nebo zobrazí konkrétní slot. |
| `alarm set <index> <source> <quantity> <args>` | Zapíše pravidlo do určeného slotu (`0`-`15`). |
| `alarm new <source> <quantity> <args>` | Přiřadí pravidlo prvnímu volnému slotu. |
| `alarm clear <index>` / `alarm clear all` | Smaže jeden slot s pravidlem nebo vyprázdní všechna aktivní pravidla. |
| `alarm poll` | Vynutí okamžité vzorkování a vyhodnocení všech aktivních pravidel (užitečné při testování na stole). |

### Zdroje pravidel {#rule-sources}

| Zdroj | Cílový senzor |
|---|---|
| `onboard` | Senzory na desce (teplota, vlhkost, atmosférický tlak) |
| `s1` - `s4` | Kanály senzorů 1-Wire 1 až 4 |
| `hall-left`, `hall-right` | Integrované magnetické dveřní kontakty |
| `input-a`, `input-b` | Externí průmyslové vstupy |
| `pir` | Detektor pohybu PIR |
| `accel` | Tříosý akcelerometr |

### Veličiny a typy pravidel {#quantities--rule-types}

| Veličina | Druh | Argumenty | Podporované zdroje |
|---|---|---|---|
| `temperature`, `humidity`, `pressure` | prahové | `<lo> <hi> [dwell]` | `onboard`; `temperature`/`humidity` také na `s1`-`s4` |
| `illuminance`, `magnetic-field` | prahové | `<lo> <hi> [dwell]` | `s1`-`s4` |
| `tilt` | stavové | `<from> <to> [dwell]` | `s1`-`s4` |
| `state` | stavové | `<from> <to> [dwell]` | `hall-*`, `input-*`, `pir`, `accel` |
| `count` | frekvenční | `<N> [dwell]` | `hall-*`, `input-*`, `pir`, `accel` |

- **Prahová pravidla:** Alarm se vyvolá, když měřená hodnota vystoupí mimo okno `[lo, hi]`.
- **Stavová pravidla:** Vyhodnocují digitální úrovně `<from> <to>` (`0`/`1`). `from != to` znamená **hranu** (vyvolá se jednou při přechodu); `from == to` znamená **úroveň** (aktivní, dokud se linka rovná `to`). Momentové zdroje (`pir`, `accel`) přijímají pouze pravidla na hranu.
- **Frekvenční pravidla:** Vyvolají se, pokud načítaný čítač překročí `<N>` událostí v jednom reportovacím intervalu.

---

## Parametr `dwell` {#the-dwell-parameter}

Volitelná doba **`dwell`** (v sekundách, výchozí `0`) zajišťuje integrované filtrování šumu a hysterezi. Zabraňuje falešným poplachům z krátkých špiček signálu nebo rychlého zakmitávání vstupu.

| Druh pravidla | Chování `dwell` |
|---|---|
| **Prahové** | Hodnota musí zůstat mimo `[lo, hi]` nepřerušeně `dwell` sekund, než se pravidlo aktivuje. Návrat do pásma alarm okamžitě deaktivuje. |
| **Stavové (hrana)** | Přechod linky musí být stabilní `dwell` sekund, než se pravidlo vyvolá. Po vyvolání pravidlo drží klidové okno `dwell` sekund, než se může vyvolat znovu. |
| **Stavové (úroveň)** | Linka musí zůstat ve stavu `to` nepřerušeně `dwell` sekund, než se pravidlo vyvolá. |
| **Momentové (`pir`, `accel`)** | Drží klidové okno `dwell` sekund, než může novou událost pohybu vyvolat alarm. |
| **Frekvenční** | Doba blokování, která vynucuje minimální rozestup mezi po sobě jdoucími hlášeními o překročení frekvence. |

---

## Příklady příkazů {#command-examples}

```
alarm set 0 onboard temperature 5 30     # Alarm below 5 °C or above 30 °C (immediate)
alarm set 1 onboard temperature 5 30 60  # Alarm below 5 °C or above 30 °C (must hold for 60 seconds)
alarm set 2 input-a state 0 1            # Fire on rising edge (0 to 1) on External Input A
alarm set 3 input-a state 0 1 5          # Rising edge on Input A must hold for 5 seconds
alarm new hall-left count 10             # Alarm when left hall sensor exceeds 10 counts per interval
alarm list                               # Review all programmed alarm rules
alarm clear 1                            # Erase rule in slot 1
```

:::info Správa na dálku
Pravidla alarmů lze také vytvářet a aktualizovat přes LoRaWAN nebo NFC binárními downlink payloady na fPort 85. Pro sestavení binárních downlink řetězců pro váš síťový server použijte [**generátor downlink příkazů**](../connectivity/downlink-commands-generator.mdx).
:::
