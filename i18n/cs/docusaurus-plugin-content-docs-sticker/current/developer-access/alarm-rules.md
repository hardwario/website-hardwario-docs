---
slug: alarm-rules
title: Pravidla alarmů
title_meta: "Pravidla alarmů (STICKER)"
---
import Image from '@theme/IdealImage';

# Systém alarmů a jeho pravidla (`alarm`) {#alarm-engine--rules-alarm}

Systém alarmů zařízení STICKER průběžně porovnává měření senzorů a stavy systému s aktivními pravidly. Jakmile se podmínka pravidla splní nebo pomine, zařízení okamžitě vytvoří payload a odešle ho uplinkem na **fPort 3**.

Pravidla se spravují z vývojářské konzole příkazem `alarm` (viz [**Nastavení firmwaru**](firmware-setup.md)) nebo se nastavují na dálku přes NFC a downlinky LoRaWAN (`set_param` na fPort 85).

:::info Firmware v1.4.0
Systém alarmů popsaný na této stránce je základní funkce, kterou přinesl **firmware STICKER v1.4.0**. Podporuje dynamická prahová pravidla v několika slotech, stavové přechody, limity četnosti impulzů, hlídání stavu systému (slabá baterie, watchdog) a okamžité hlášení událostí uplinkem na **fPort 3**.
:::

---

## Globální omezení frekvence a systémové alarmy {#global-rate-limiting--system-alarms}

Globální omezení frekvence alarmů nastavuje parametr `config alarm-limit`:

| Příkaz | Argument | Popis |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (sekundy) | Minimální odstup mezi dvěma po sobě jdoucími uplinky s alarmem. První událost se odešle uplinkem okamžitě; další alarmy v tomto okně se zařadí do fronty, nebo se potlačí. `0` = omezení vypnuté. Výchozí hodnota `0`. |

### Vestavěné systémové alarmy {#built-in-system-alarms}
Kromě dynamických pravidel, která nastavuje uživatel, hlídá firmware v1.4.0 automaticky dva systémové stavy:
- **Alarm slabé baterie:** Vyvolá se, když napětí baterie pod zátěží klesne pod kritickou provozní mez. Hlásí se na fPort 3.
- **Watchdog alarm chybějících dat:** Hlídá interní vzorkování senzorů. Pokud fyzický senzor neodpoví nebo vynechá několik vzorkovacích oken za sebou, zařízení vyvolá watchdog alarm na fPort 3.

---

## Dynamická pravidla alarmů {#dynamic-alarm-rules}

Prahy pro jednotlivé senzory se ukládají do 16 pevných slotů (`0`-`15`). Index slotu je stálý identifikátor pravidla, takže tentýž senzor může současně hlídat několik pravidel (například pro varovnou a kritickou úroveň).

| Příkaz | Popis |
|---|---|
| `alarm list [<index>]` | Vypíše všechna aktivní pravidla alarmů nebo zobrazí konkrétní slot. |
| `alarm set <index> <source> <quantity> <args>` | Zapíše pravidlo do zadaného slotu (`0`-`15`). |
| `alarm new <source> <quantity> <args>` | Uloží pravidlo do prvního volného slotu. |
| `alarm clear <index>` / `alarm clear all` | Smaže jeden slot s pravidlem nebo všechna aktivní pravidla. |
| `alarm poll` | Vynutí okamžité vzorkování a vyhodnocení všech aktivních pravidel (hodí se při testování na stole). |

### Zdroje pravidel {#rule-sources}

| Zdroj | Senzor |
|---|---|
| `onboard` | Senzory na desce (teplota, vlhkost, atmosférický tlak) |
| `s1`–`s4` | Kanály senzorů 1-Wire 1 až 4 |
| `hall-left`, `hall-right` | Vestavěné magnetické dveřní spínače |
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
| `count` | četnostní | `<N> [dwell]` | `hall-*`, `input-*`, `pir`, `accel` |

- **Prahová pravidla:** Alarm se vyvolá, když měřená hodnota opustí okno `[lo, hi]`.
- **Stavová pravidla:** Vyhodnocují digitální úrovně `<from> <to>` (`0`/`1`). `from != to` znamená **hranu** (pravidlo se vyvolá jednou při přechodu), `from == to` znamená **úroveň** (pravidlo je aktivní, dokud má linka hodnotu `to`). Okamžikové zdroje (`pir`, `accel`) přijímají jen pravidla na hranu.
- **Četnostní pravidla:** Vyvolají se, když čítač během jednoho intervalu hlášení napočítá víc než `<N>` událostí.

---

## Parametr `dwell` {#the-dwell-parameter}

Volitelná doba **`dwell`** (v sekundách, výchozí `0`) slouží jako vestavěný filtr šumu a hystereze. Brání planým poplachům z krátkých špiček signálu nebo zákmitů vstupu.

| Druh pravidla | Chování `dwell` |
|---|---|
| **Prahové** | Hodnota musí zůstat mimo `[lo, hi]` nepřetržitě `dwell` sekund, než se alarm aktivuje. Po návratu do pásma se alarm okamžitě deaktivuje. |
| **Stavové (hrana)** | Přechod linky musí stabilně trvat `dwell` sekund, než se pravidlo vyvolá. Po vyvolání pravidlo čeká ochrannou dobu `dwell` sekund, než se může vyvolat znovu. |
| **Stavové (úroveň)** | Linka musí zůstat ve stavu `to` nepřetržitě `dwell` sekund, než se pravidlo vyvolá. |
| **Okamžikové (`pir`, `accel`)** | Nová událost pohybu může vyvolat alarm až po ochranné době `dwell` sekund. |
| **Četnostní** | Ochranná doba, která určuje minimální odstup mezi dvěma hlášeními o překročení četnosti. |

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

:::info Bezdrátová správa
Pravidla alarmů lze vytvářet a měnit i přes LoRaWAN nebo NFC binárními payloady downlinku na fPort 85. Binární řetězce downlinku pro svůj síťový server sestavíte v [**generátoru příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx).
:::
