---
slug: /api-spec
title: Specifikace MQTT API
description: "Zařízení TAPPER může komunikovat přes MQTT pomocí JSON zpráv."
---

import Image from '@theme/IdealImage';

# Specifikace MQTT API {#mqtt-api-specification}

Zařízení TAPPER může komunikovat přes MQTT pomocí JSON zpráv.

## Topic {#topic}

Každý MQTT Topic začíná `tapper/$id/`, kde `id` je hardwarová adresa zařízení TAPPER.

## Payload {#payload}

TAPPER používá payloady ve formátu JSON.

Každý payload obsahuje časovou značku.

## Události {#events}

TAPPER má v API definováno několik událostí.

|           Topic           |                         Payload                         |
| :-----------------------: | :-----------------------------------------------------: |
|  `tapper/$id/event/boot`  |                 `{"timestamp": float}`                  |
| `tapper/$id/event/tamper` | `{"timestamp": float, "state": "active" \| "inactive"}` |
|  `tapper/$id/event/tag`   |            `{"timestamp": float, "id": str}`            |

:::info[Tagy]

TAPPER odesílá UID NFC tagu jako hexadecimální řetězec v pořadí big-endian.

:::

## Rozhraní {#interfaces}

TAPPER má RGB LED a bzučák pro interakci s uživatelem.

Ty lze aktivovat požadavkem odeslaným přes MQTT podle této specifikace.

## Požadavek {#request}

Topic požadavku je `tapper/$id/control/request`.

Payload požadavku:

```json
{
    "timestamp": 1747951200,
    "id": 1,
    "output": {
            "command": "activate"|"deactivate"|"pulse",
            "duration": int
        },
    "visual": {
            "state": "off" | "on/red" | "on/green" | "on/blue" | "on/yellow",
            "pattern":  "p1/red"    | "p2/red"    | "p3/red"    | "p4/red"   |
                        "p1/green"  | "p2/green"  | "p3/green"  | "p4/green" |
                        "p1/blue"   | "p2/blue"   | "p3/blue"   | "p4/blue"  |
                        "p1/yellow" | "p2/yellow" | "p3/yellow" | "p4/yellow"
        },
    "acoustic": {
            "pattern": "p1" | "p2" | "p3" | "p4"
        }
}
```

### Timestamp {#timestamp}

Toto je unixová časová značka požadavku, očekává se float/integer.

### ID {#id}

Toto je ID požadavku, očekává se integer.

### Output {#output}



Tato sekce se týká reléového výstupu.

- Command může být: `activate`, `deactivate` nebo `pulse`
    - Příkaz `pulse` vyžaduje také nastavení prvku `duration` (v sekundách), očekává se integer.

```json
"output": {
            "command": "activate"|"deactivate"|"pulse",
            "duration": int
}
```

:::info

Relé přichází s hardwarem r2.

:::

### Visual {#visual}

Tato sekce se týká LED na desce.

Může obsahovat buď prvek `state"`, nebo `"pattern`.

- State může mít následující hodnoty: `off`, nebo `on/` s následující barvou `red`/`green`/`blue`/`yellow`.  
  Příklad: `on/red`
  ```json
  "visual": {
            "state": "off" | "on/red" | "on/green" | "on/blue" | "on/yellow",
  }
  ```

- Prvek `pattern` je velmi podobný, s možnostmi `p1/`, `p2/`, `p3/` nebo `p4/` s následující barvou `red`/`green`/`blue`/`yellow`.  
  Příklad: `p4/blue`
  | Vzor |      Popis       |
  | :-----: | :---------------: |
  |  `p1`   |  jedno dlouhé bliknutí   |
  |  `p2`   |  dvě dlouhá bliknutí  |
  |  `p3`   | tři dlouhá bliknutí |
  |  `p4`   | čtyři dlouhá bliknutí  |

  ```json
  "visual": {
            "pattern":  "p1/red"    | "p2/red"    | "p3/red"    | "p4/red"   |
                        "p1/green"  | "p2/green"  | "p3/green"  | "p4/green" |
                        "p1/blue"   | "p2/blue"   | "p3/blue"   | "p4/blue"  |
                        "p1/yellow" | "p2/yellow" | "p3/yellow" | "p4/yellow"
  }
  ```

### Acoustic {#acoustic}

Tato sekce se týká bzučáku.

Jediným prvkem je `pattern`, který může mít hodnotu `p1`, `p2`, `p3` nebo `p4`.

| Vzor |      Popis       |
| :-----: | :--------------: |
|  `p1`   |  jedno dlouhé pípnutí   |
|  `p2`   |  dvě dlouhá pípnutí  |
|  `p3`   | tři dlouhá pípnutí |
|  `p4`   | čtyři dlouhá pípnutí  |

```json
"acoustic": {
            "pattern": "p1" | "p2" | "p3" | "p4"
}
```

### Příklad {#example}

```json
{
    "timestamp": 1747951200,
    "id": 1,
    "output": {
            "command": "pulse",
            "duration": 2
        },
    "visual": {
            "pattern": "p4/blue" 
        },
    "acoustic": {
            "pattern": "p1"
        }
}
```

## Odpověď {#response}

Topic pro odpověď je `tapper/$id/control/response`.

Payloady odpovědi jsou:

|               Výsledek               |                              Payload                               |
| :--------------------------------: | :----------------------------------------------------------------: |
| <font color="green">Úspěch</font> |       `{"timestamp": float, "id": int, "result": "success"}`       |
|   <font color="red">Chyba</font>   | `{"timestamp": float, "id": int, "result": "error", "error": str}` |

### Příklad {#example-1}

```json
{
    "timestamp": 1747951200,
    "id": 1,
    "result": "success"
}
```
