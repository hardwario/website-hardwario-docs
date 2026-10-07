---
title: Konfigurace
sidebar_position: 5
description: "Přehled konfigurace zařízení GLIDER: nastavení uložená v nevolatilní paměti a jejich změna přes rozhraní konzolí."
title_meta: "Konfigurace (GLIDER)"
---
import Image from '@theme/IdealImage';

# Přehled konfigurace {#configuration-reference}

GLIDER ukládá konfiguraci do nevolatilní paměti (NVS), takže nastavení vydrží odpojení napájení i restart. Měnit ji můžete v kterékoli z obou konzolí:

- **Konzole AT:** `AT$CONFIG="<module>","<key>",<value>`
- **Konzole RTT (shell Zephyr):** `<module> config <key> <value>`

Změny vždy uložte do flash paměti:

```text
AT&W
```

Příkaz nové hodnoty uloží **a zařízení restartuje**. Celou konfiguraci vrátíte na tovární nastavení příkazem:

```text
AT&F
```

## Výpis konfigurace {#listing-configuration}

| Úkol | Příkaz AT | Příkaz shellu |
| :--- | :--- | :--- |
| Vypsat všechny moduly | `AT$CONFIG?` | `config show` |
| Vypsat jeden modul | `AT$CONFIG="<module>"` | `<module> config show` |
| Přečíst jeden klíč | `AT$CONFIG="<module>","<key>"` | `<module> config show <key>` |
| Zobrazit celé schéma | `AT$CONFIG=?` | - |

Schéma (`AT$CONFIG=?`) uvádí u každého klíče typ, rozsah, výchozí hodnotu a jednořádkový popis, takže se v klíčích snadno zorientujete.

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
| `disabled` | Kanál je vypnutý: nic nepočítá a nevytváří události. |
| `counter` | Vybrané hrany (vzestupná / sestupná / obě) zvyšují čítače. Stav čítačů se odesílá v každém payloadu CBOR. |
| `event` | Každá hrana vytvoří událost s časovou značkou. Události se odešlou v následujícím payloadu CBOR (až 64 na kanál a odesílací cyklus). |

#### Klíče pro jednotlivé kanály {#per-channel-keys}

Oba kanály mají stejné klíče s předponou `1-` (CH1) nebo `2-` (CH2):

| Klíč | Typ | Rozsah | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `<n>-mode` | enum | `disabled` / `counter` / `event` | `disabled` | Režim kanálu. |
| `<n>-active-duration` | int (ms) | 0–60000 | **100** | Minimální doba, po kterou musí vstup zůstat aktivní (potlačení zákmitů vzestupné hrany). |
| `<n>-inactive-duration` | int (ms) | 0–60000 | **100** | Minimální doba, po kterou musí vstup zůstat neaktivní (potlačení zákmitů sestupné hrany). |
| `<n>-cooldown-time` | int (ms) | 0–60000 | **10** | Minimální doba mezi dvěma zaregistrovanými přechody. |
| `<n>-counter-edge` | enum | `rising` / `falling` / `both` | `both` | Které hrany zvyšují čítač (použije se jen v režimu `counter`). |
| `<n>-event-type` | enum | `activation` / `deactivation` / `both` | `both` | Které přechody vytvářejí události (použije se jen v režimu `event`). |

#### Příklad – čítání impulzů na CH1 {#example---count-pulses-on-ch1}

```text
inputs config 1-mode counter
inputs config 1-counter-edge rising
inputs config 1-active-duration 5
inputs config 1-inactive-duration 5
AT&W
```

Takto nastavený kanál započítá každou vzestupnou hranu na CH1, pokud vstup zůstane v logické jedničce alespoň 5 ms (a mezi impulzy v nule alespoň 5 ms).

## Sloty pro teploměry (`therm`) {#thermometer-slots-therm}

Osm nezávislých slotů, v každém jeden kód ROM. Prázdné sloty se do payloadu pro cloud nezahrnují.

| Klíč | Typ | Velikost | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `1` … `8` | hex | 8 bajtů | `0x00…` | Sériové číslo ROM senzoru DS18B20 přiřazené danému slotu. `0x00…` = prázdný. |

:::tip
V praxi tyto hodnoty ručně neupravujte. Senzory automaticky vyhledá a přiřadí příkaz `therm scan --save`, viz [**Externí teplotní senzory**](external-sensors/temperature.md).
:::

## Alarmy {#alarms}

Nakonfigurovat lze až **32 nezávislých pravidel alarmu**. Každé pravidlo sleduje jeden slot teploměru a přepíná mezi stavem **aktivní** a **neaktivní** podle prahové hodnoty s hysterezí:

- Pravidlo se **aktivuje**, když `teplota ≥ prahová hodnota`.
- Pravidlo se **deaktivuje**, když `teplota ≤ prahová hodnota − hystereze`.

Každý přechod se zaznamená do bufferu událostí alarmu a odešle se s následujícím payloadem CBOR.

Každé pravidlo má stejné čtyři klíče s předponou `<n>-` (1-32):

| Klíč | Typ | Rozsah | Výchozí | Popis |
| :--- | :--- | :--- | :--- | :--- |
| `<n>-enabled` | bool | - | `false` | Hlavní vypínač pravidla. Je-li `false`, ostatní klíče tohoto pravidla jsou skryté. |
| `<n>-therm` | int | 1–8 | **1** | Který slot teploměru pravidlo sleduje. |
| `<n>-threshold` | float (°C) | −55–125 | **50** | Prahová hodnota aktivace. |
| `<n>-hysteresis` | float (°C) | 0–50 | **5** | O kolik musí teplota klesnout pod prahovou hodnotu, aby se pravidlo deaktivovalo. |

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
| Obnovení továrního nastavení (smaže vše) | `AT&F` |
| Restart bez uložení | `AT$REBOOT` |

:::caution
`AT&F` maže data: všechny nakonfigurované sloty, pravidla alarmů a intervaly se vrátí na tovární hodnoty. Akci nelze vzít zpět.
:::
