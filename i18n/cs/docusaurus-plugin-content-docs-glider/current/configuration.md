---
title: Konfigurace
sidebar_position: 5
description: "GLIDER ukládá konfiguraci do nevolatilní paměti (NVS), takže nastavení přežije odpojení napájení i restart. Konfiguraci lze měnit přes kteroukoli konzoli:"
---
import Image from '@theme/IdealImage';

# Přehled konfigurace {#configuration-reference}

GLIDER ukládá konfiguraci do nevolatilní paměti (NVS), takže nastavení přežije odpojení napájení i restart. Konfiguraci lze měnit přes kteroukoli konzoli:

- **Konzole AT:** `AT$CONFIG="<module>","<key>",<value>`
- **Konzole RTT (Zephyr shell):** `<module> config <key> <value>`

Po provedení změn je vždy uložte do flash paměti:

```text
AT&W
```

Tím se nové hodnoty uloží **a zařízení se restartuje**. Pro návrat všeho na výchozí nastavení z výroby:

```text
AT&F
```

## Výpis konfigurace {#listing-configuration}

| Cíl | Příkaz AT | Příkaz shellu |
| :--- | :--- | :--- |
| Vypsat všechny moduly | `AT$CONFIG?` | `config show` |
| Vypsat jeden modul | `AT$CONFIG="<module>"` | `<module> config show` |
| Přečíst jeden klíč | `AT$CONFIG="<module>","<key>"` | `<module> config show <key>` |
| Zobrazit celé schéma | `AT$CONFIG=?` | - |

Schéma (`AT$CONFIG=?`) uvádí u každého klíče typ, rozsah, výchozí hodnotu a jednořádkový popis – hodí se pro orientaci.

## Globální nastavení `app` {#global-app-settings}

Tyto klíče se vztahují na celé zařízení.

| Klíč | Typ | Rozsah | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | int (s) | 5–3600 | **60** | Jak často firmware čte senzory a vyhodnocuje alarmy. |
| `interval-send` | int (s) | 30–86400 | **300** | Jak často firmware zakóduje payload CBOR a odešle uplink. |
| `downlink-wdg-interval` | int (s) | 0–1209600 | **129600** (36 h) | Watchdog downlinku. Pokud cloud v této době nepošle žádný downlink, zařízení se restartuje. `0` watchdog vypne. |

#### Příklad {#example}

```text
app config interval-sample 30
app config interval-send 120
AT&W
```

## Digitální vstupy {#digital-inputs}

GLIDER má **dva galvanicky oddělené** kanály digitálních vstupů (**CH1** a **CH2**). Každý kanál může pracovat v jednom ze tří režimů:

| Režim | Chování |
| :--- | :--- |
| `disabled` | Kanál je vypnutý – žádné počítání, žádné události. |
| `counter` | Vybrané hrany (vzestupná / klesající / obě) inkrementují počítadla. Počítadla se posílají v každém payloadu CBOR. |
| `event` | Každá hrana vytvoří událost s časovou značkou. Události se odešlou v následujícím payloadu CBOR (až 64 na kanál a odesílací cyklus). |

#### Klíče pro jednotlivé kanály {#per-channel-keys}

Stejné klíče existují pro oba kanály, s předponou `1-` (CH1) nebo `2-` (CH2):

| Klíč | Typ | Rozsah | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `<n>-mode` | enum | `disabled` / `counter` / `event` | `disabled` | Režim kanálu. |
| `<n>-active-duration` | int (ms) | 0–60000 | **100** | Minimální doba, po kterou musí vstup zůstat aktivní (potlačení zákmitů vzestupné hrany). |
| `<n>-inactive-duration` | int (ms) | 0–60000 | **100** | Minimální doba, po kterou musí vstup zůstat neaktivní (potlačení zákmitů klesající hrany). |
| `<n>-cooldown-time` | int (ms) | 0–60000 | **10** | Minimální doba mezi dvěma zaregistrovanými přechody. |
| `<n>-counter-edge` | enum | `rising` / `falling` / `both` | `both` | Které hrany inkrementují počítadlo (použije se jen v režimu `counter`). |
| `<n>-event-type` | enum | `activation` / `deactivation` / `both` | `both` | Které přechody vytvářejí události (použije se jen v režimu `event`). |

#### Příklad – počítání pulzů na CH1 {#example---count-pulses-on-ch1}

```text
inputs config 1-mode counter
inputs config 1-counter-edge rising
inputs config 1-active-duration 5
inputs config 1-inactive-duration 5
AT&W
```

Tímto se počítá každá vzestupná hrana na CH1, pokud vstup zůstane v logické jedničce alespoň 5 ms (a mezi pulzy v nule alespoň 5 ms).

## Slot pro termometry (`therm`) {#thermometer-slots-therm}

Osm nezávislých slotů, jeden ROM kód na slot. Prázdné sloty se v payloadu do cloudu vynechávají.

| Klíč | Typ | Velikost | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `1` … `8` | hex | 8 bytes | `0x00…` | Sériové číslo ROM senzoru DS18B20 přiřazené danému slotu. `0x00…` = prázdný. |

:::tip
V praxi byste tyto hodnoty neměli upravovat ručně – použijte `therm scan --save` pro automatické nalezení a přiřazení senzorů. Viz [**Externí teplotní senzory**](external-sensors/temperature.md).
:::

## Alarmy {#alarms}

Nakonfigurovat lze až **32 nezávislých pravidel alarmu**. Každé pravidlo sleduje jeden slot termometru a přepíná mezi stavem **aktivní** a **neaktivní** podle prahové hodnoty s hysterezí:

- Pravidlo se **aktivuje**, když `teplota ≥ prahová hodnota`.
- Pravidlo se **deaktivuje**, když `teplota ≤ prahová hodnota − hystereze`.

Každý přechod se zaznamená do bufferu událostí alarmu a odešle se s následujícím payloadem CBOR.

Stejné čtyři klíče existují pro každé pravidlo, s předponou `<n>-` (1-32):

| Klíč | Typ | Rozsah | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `<n>-enabled` | bool | - | `false` | Hlavní vypínač pravidla. Je-li `false`, ostatní klíče tohoto pravidla jsou skryté. |
| `<n>-therm` | int | 1–8 | **1** | Který slot termometru pravidlo sleduje. |
| `<n>-threshold` | float (°C) | −55–125 | **50** | Prahová hodnota aktivace. |
| `<n>-hysteresis` | float (°C) | 0–50 | **5** | Odchylka deaktivace pod prahovou hodnotou. |

#### Příklad – alarm na slotu 1 při překročení 30 °C {#example---alarm-on-slot-1-if-it-exceeds-30-c}

```text
alarm config 1-enabled true
alarm config 1-therm 1
alarm config 1-threshold 30
alarm config 1-hysteresis 5
AT&W
```

Když slot 1 naměří ≥ 30 °C, firmware vyvolá alarm; ten se zruší, jakmile hodnota klesne na ≤ 25 °C.

## Ukládání a resetování {#saving-and-resetting}

| Akce | Příkaz |
| :--- | :--- |
| Uložit a restartovat | `AT&W` |
| Reset do výrobního nastavení (smaže vše) | `AT&F` |
| Restart bez uložení | `AT$REBOOT` |

:::caution
`AT&F` je destruktivní – každý nakonfigurovaný slot, pravidlo alarmu a interval se vrátí na výchozí hodnoty z výroby. Akci nelze vzít zpět.
:::
