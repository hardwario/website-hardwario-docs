---
title: CBOR payload
sidebar_position: 7
description: "GLIDER posílá naměřené hodnoty do HARDWARIO Cloud v binárním formátu CBOR (RFC 8949)."
---
import Image from '@theme/IdealImage';

# Struktura payloadu CBOR {#cbor-payload-structure}

GLIDER posílá naměřené hodnoty do **HARDWARIO Cloud** v binárním formátu **CBOR** (RFC 8949). Aby zprávy zůstaly malé, používá schéma místo textových klíčů **číselné klíče**, takže se každý payload při přenosu obvykle vejde do **70 až 150 bajtů**.

Schéma definuje soubor [`application/codec/cbor-decoder.yaml`](https://github.com/hardwario/) ve firmwaru zařízení GLIDER a cloud k němu automaticky použije odpovídající dekodér.

Jak často se zprávy odesílají, určuje `app config interval-send` (výchozí **300 s** = 5 minut).

## Struktura nejvyšší úrovně {#top-level-structure}

Po dekódování obsahuje každá zpráva pět objektů nejvyšší úrovně:

| Klíč | Popis |
| :--- | :--- |
| `message` | Metadata: verze schématu, sekvenční číslo, časová značka. |
| `system` | Systémové informace: doba běhu zařízení. |
| `thermometers` | Pole naměřených teplot, jedna položka pro každý obsazený slot DS18B20. |
| `alarms` | Historie aktivací / deaktivací alarmů od předchozí zprávy. |
| `inputs` | Čítače digitálních vstupů a poslední události pro CH1 / CH2. |

## `message` {#message}

Hlavička zprávy. Klíč CBOR: `0`.

| Pole | Typ | Jednotka | Popis |
| :--- | :--- | :--- | :--- |
| `version` | uint | - | Verze schématu, aktuálně **`1`**. Slouží pro dopřednou kompatibilitu. |
| `sequence` | uint32 | - | Postupně narůstající sekvenční číslo. Po každém restartu začíná na `0`. Podle mezer v číslování cloud pozná ztracené uplinky. |
| `timestamp` | int64 | Unix epoch (s) | Čas odeslání podle RTC. |

## `system` {#system}

Klíč CBOR: `4`.

| Pole | Typ | Jednotka | Popis |
| :--- | :--- | :--- | :--- |
| `uptime` | uint64 | sekundy | Doba od posledního startu. |

## `thermometers` {#thermometers}

Pole map s jednou položkou pro každý nakonfigurovaný slot DS18B20. **Prázdné sloty** (bez přiřazeného kódu ROM nebo dosud neověřené) se do payloadu **nezahrnují**.

Klíč CBOR: `6`.

| Pole | Typ | Jednotka | Popis |
| :--- | :--- | :--- | :--- |
| `slot` | uint (1-8) | - | Číslo slotu (`APP_W1_THERM_MAX_SLOTS = 8`). |
| `temperature` | int (×0,01 °C) nebo `null` | °C | Hodnota z posledního úspěšného čtení. Kóduje se jako `temperature × 100`; dekodér hodnotu přepočítá (`$div: 100`, `$fpp: 2`). `null` = NaN (neúspěšné čtení). |

:::info
Za každý slot se odesílá jen **nejnovější vzorek**, ne celá historie od posledního uplinku. Pokud potřebujete časovou řadu, vzorkujte častěji a počítejte s úměrně vyššími náklady na přenos dat, nebo požádejte o novou funkci (feature request).
:::

#### Příklad {#example}

```yaml
thermometers:
 - slot: 1
 temperature: 22.68 # encoded on the wire as 2268
 - slot: 2
 temperature: 23.62
```

## `alarms` {#alarms}

Klíč CBOR: `9`.

| Pole | Typ | Popis |
| :--- | :--- | :--- |
| `events` | TSO list | Události aktivace / deaktivace alarmů nasbírané od posledního úspěšného uplinku. Buffer se po odeslání vymaže. |

#### `events` – formát Time-Series Object (TSO) {#events---time-series-object-tso-format}

Hodnota `events` je **plochý seznam** v tomto pořadí:

```text
[timestamp_abs, offset_1, alarm_1, active_1, offset_2, alarm_2, active_2, …]
```

- `timestamp_abs`: Unix epoch (s) **první** události v seznamu (výchozí bod).
- `offset_N`: počet sekund od `timestamp_abs`.
- `alarm_N`: číslo pravidla (číslováno od 1, 1-32).
- `active_N`: `1` = aktivováno, `0` = deaktivováno.

Buffer pojme až **100 událostí** (`APP_ALARM_MAX_EVENTS`).

#### Příklad {#example-1}

```yaml
alarms:
 events:
 - 1747142400 # timestamp_abs
 - 0 # offset → alarm 1 activated at 1747142400
 - 1
 - 1
 - 120 # offset → alarm 1 deactivated at 1747142520
 - 1
 - 0
```

## `inputs` {#inputs}

Pole map, jedna položka pro každý kanál digitálního vstupu (`APP_INPUTS_NUM_CHANNELS = 2`).

Klíč CBOR: `11`.

| Pole | Typ | Popis |
| :--- | :--- | :--- |
| `channel` | uint (1 / 2) | Číslo kanálu. |
| `counter_rising` | uint64 | Celkový počet vzestupných hran od startu. Restart ho vynuluje. |
| `counter_falling` | uint64 | Celkový počet sestupných hran od startu. |
| `events` | TSO list | Časová osa hran (plní se pouze tehdy, je-li kanál v režimu **event**). Po každém odeslání se vymaže. |

#### `events` – formát TSO {#events---tso-format}

```text
[timestamp_abs, offset_1, active_1, offset_2, active_2, …]
```

- `timestamp_abs`: Unix epoch (s) první události.
- `offset_N`: počet sekund od `timestamp_abs`.
- `active_N`: `1` = aktivace (vzestupná hrana), `0` = deaktivace (sestupná hrana).

Buffer pojme až **64 událostí na kanál** (`APP_INPUTS_MAX_EVENTS`).

Režim kanálu (`disabled` / `counter` / `event`) se nastavuje v konfiguraci, viz [**Konfigurace → Digitální vstupy**](configuration.md#digital-inputs).

#### Příklad {#example-2}

```yaml
inputs:
 - channel: 1
 counter_rising: 142
 counter_falling: 141
 events:
 - 1747142400 # timestamp_abs
 - 0 # active=1
 - 1
 - 30 # active=0
 - 0
 - channel: 2
 counter_rising: 0
 counter_falling: 0
 events: []
```

## Kompletní příklad {#complete-example}

Typický dekódovaný payload ze zařízení GLIDER se dvěma sondami DS18B20, bez nových událostí alarmů a s jedním vstupem, který čítá impulzy:

```yaml
message:
 version: 1
 sequence: 33
 timestamp: 1747142400
system:
 uptime: 2772
thermometers:
 - slot: 1
 temperature: 22.68
 - slot: 2
 temperature: 23.62
alarms:
 events: [] # no alarm transitions since the last uplink
inputs:
 - channel: 1
 counter_rising: 142
 counter_falling: 141
 events: []
 - channel: 2
 counter_rising: 0
 counter_falling: 0
 events: []
```

Při přenosu má tento payload v CBOR **~95 bajtů**.

## Hash kodeku {#codec-hash}

Aby cloud ke každému firmwaru použil správný dekodér, má každé schéma 64bitový hash, který je pevně zakompilovaný ve firmwaru:

```c
#define CODEC_CLOUD_DECODER_HASH ((uint64_t)0xcfef6b4543a9ddb7)
```

Při změně schématu se hash vygeneruje znovu a v cloudu je nutné nasadit odpovídající dekodér. Generátor spustíte příkazem:

```bash
west gen-codec
```

Příkaz přečte `application/codec/cbor-decoder.yaml`, zapíše `application/src/app_codec.h` s novým hashem a vytvoří binární buffer dekodéru, který se vloží do obrazu firmwaru.

## Související {#related}

- **Specifikace CBOR:** [RFC 8949](https://www.rfc-editor.org/rfc/rfc8949)
- **Zdrojový kód enkodéru:** `application/src/app_cbor.c`
- **Zdrojový soubor schématu:** `application/codec/cbor-decoder.yaml`
