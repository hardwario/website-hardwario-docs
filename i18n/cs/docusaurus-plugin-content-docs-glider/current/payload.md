---
title: CBOR Payload
sidebar_position: 7
description: "GLIDER hlásí měření do HARDWARIO Cloud pomocí binárního formátu CBOR (RFC 8949). Aby byly zprávy malé, používá schéma numerické klíče místo textových – každý payload se typicky vejde do 70 až 150 bajtů na lince."
---
import Image from '@theme/IdealImage';

# Struktura CBOR payloadu {#cbor-payload-structure}

GLIDER hlásí měření do **HARDWARIO Cloud** pomocí binárního formátu **CBOR** (RFC 8949). Aby byly zprávy malé, používá schéma **numerické klíče** místo textových – každý payload se typicky vejde do **70 až 150 bajtů** na lince.

Schéma je definováno v souboru [`application/codec/cbor-decoder.yaml`](https://github.com/hardwario/) firmwaru zařízení GLIDER a cloud automaticky použije odpovídající dekodér.

Frekvenci odesílání řídí `app config interval-send` (výchozí **300 s** = 5 minut).

## Struktura nejvyšší úrovně {#top-level-structure}

Po dekódování obsahuje každá zpráva pět objektů nejvyšší úrovně:

| Klíč | Popis |
| :--- | :--- |
| `message` | Metadata: verze schématu, sekvenční číslo, časová značka. |
| `system` | Systémové informace: doba běhu zařízení. |
| `thermometers` | Pole měřených teplot, jedna položka pro každý obsazený slot DS18B20. |
| `alarms` | Historie aktivací / deaktivací alarmů od předchozí zprávy. |
| `inputs` | Počítadla digitálních vstupů a nedávné události pro CH1 / CH2. |

## `message` {#message}

Hlavička zprávy. CBOR klíč: `0`.

| Pole | Typ | Jednotka | Popis |
| :--- | :--- | :--- | :--- |
| `version` | uint | - | Verze schématu, aktuálně **`1`**. Slouží pro dopřednou kompatibilitu. |
| `sequence` | uint32 | - | Postupně narůstající sekvenční číslo. Po každém restartu začíná na `0` – cloud podle mezer detekuje ztracené uplinky. |
| `timestamp` | int64 | Unix epoch (s) | Čas odeslání, získaný z RTC. |

## `system` {#system}

CBOR klíč: `4`.

| Pole | Typ | Jednotka | Popis |
| :--- | :--- | :--- | :--- |
| `uptime` | uint64 | sekundy | Doba od posledního startu. |

## `thermometers` {#thermometers}

Pole map – jedna položka pro každý nakonfigurovaný slot DS18B20. **Prázdné sloty** (bez přiřazeného ROM nebo dosud neověřené) jsou z payloadu **vynechány**.

CBOR klíč: `6`.

| Pole | Typ | Jednotka | Popis |
| :--- | :--- | :--- | :--- |
| `slot` | uint (1-8) | - | Číslo slotu (`APP_W1_THERM_MAX_SLOTS = 8`). |
| `temperature` | int (×0.01 °C) nebo `null` | °C | Poslední úspěšné čtení. Kóduje se jako `temperature × 100`; dekodér hodnotu přepočítá (`$div: 100`, `$fpp: 2`). `null` = NaN (neúspěšné čtení). |

:::info
Na každý slot se odesílá pouze **nejnovější vzorek**, nikoli celá historie mezi uplinky. Pokud potřebujete časovou řadu, vzorkujte častěji a smiřte se s proporcionálně vyššími náklady na data – nebo založte feature request.
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

CBOR klíč: `9`.

| Pole | Typ | Popis |
| :--- | :--- | :--- |
| `events` | TSO list | Události aktivace / deaktivace alarmů nasbírané od posledního úspěšného uplinku. Buffer se po odeslání vymaže. |

#### `events` – formát Time-Series Object (TSO) {#events---time-series-object-tso-format}

Hodnota `events` je **plochý seznam** v tomto pořadí:

```text
[timestamp_abs, offset_1, alarm_1, active_1, offset_2, alarm_2, active_2, …]
```

- `timestamp_abs` – Unix epoch (s) **první** události v seznamu (kotva).
- `offset_N` – sekundy relativně k `timestamp_abs`.
- `alarm_N` – číslo pravidla (od 1, tedy 1-32).
- `active_N` – `1` = aktivováno, `0` = deaktivováno.

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

CBOR klíč: `11`.

| Pole | Typ | Popis |
| :--- | :--- | :--- |
| `channel` | uint (1 / 2) | Číslo kanálu. |
| `counter_rising` | uint64 | Kumulativní počet nástupných hran od startu. Při restartu se nuluje. |
| `counter_falling` | uint64 | Kumulativní počet sestupných hran od startu. |
| `events` | TSO list | Časová osa hran (plní se pouze tehdy, je-li kanál v režimu **event**). Po každém odeslání se vymaže. |

#### `events` – formát TSO {#events---tso-format}

```text
[timestamp_abs, offset_1, active_1, offset_2, active_2, …]
```

- `timestamp_abs` – Unix epoch (s) první události.
- `offset_N` – sekundy relativně k `timestamp_abs`.
- `active_N` – `1` = aktivace (nástupná hrana), `0` = deaktivace (sestupná hrana).

Buffer pojme až **64 událostí na kanál** (`APP_INPUTS_MAX_EVENTS`).

Režim kanálu (`disabled` / `counter` / `event`) se nastavuje konfigurací – viz [**Konfigurace → Digitální vstupy**](configuration.md#digital-inputs).

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

Typický dekódovaný payload ze zařízení GLIDER, které monitoruje dvě sondy DS18B20, bez nedávných alarmových událostí a s jedním vstupem počítajícím pulzy:

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

Na lince má tento payload **~95 bajtů** CBOR.

## Hash kodeku {#codec-hash}

Aby cloud použil správný dekodér pro správný firmware, má každé schéma 64bitový hash zapečený ve firmwaru:

```c
#define CODEC_CLOUD_DECODER_HASH ((uint64_t)0xcfef6b4543a9ddb7)
```

Změna schématu hash přegeneruje a v cloudu je nutné aktualizovat odpovídající dekodér. Příkaz generátoru je:

```bash
west gen-codec
```

Přečte `application/codec/cbor-decoder.yaml`, zapíše `application/src/app_codec.h` s novým hashem a vytvoří binární buffer dekodéru, který se vloží do obrazu firmwaru.

## Související {#related}

- **Specifikace CBOR:** [RFC 8949](https://www.rfc-editor.org/rfc/rfc8949)
- **Zdroj enkodéru:** `application/src/app_cbor.c`
- **Zdroj schématu:** `application/codec/cbor-decoder.yaml`
