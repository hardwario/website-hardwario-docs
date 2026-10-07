---
slug: /api-spec
title: Specifikace MQTT API
description: "Zařízení TAPPER může komunikovat přes MQTT pomocí zpráv JSON."
---

import Image from '@theme/IdealImage';

# Specifikace MQTT API {#mqtt-api-specification}

Zařízení TAPPER může komunikovat přes MQTT pomocí zpráv JSON.

## Topic {#topic}

Každý topic MQTT začíná na `tapper/$id/`, kde `id` je hardwarová adresa zařízení TAPPER.

## Payload {#payload}

TAPPER používá payloady ve formátu JSON.

Každý payload obsahuje časovou značku.

## Události {#events}

API definuje pro TAPPER několik událostí.

|           Topic           |                         Payload                         |
| :-----------------------: | :-----------------------------------------------------: |
|  `tapper/$id/event/boot`  |                 `{"timestamp": float}`                  |
| `tapper/$id/event/tamper` | `{"timestamp": float, "state": "active" \| "inactive"}` |
|  `tapper/$id/event/tag`   |            `{"timestamp": float, "id": str}`            |

:::info[Tagy]

TAPPER odesílá UID NFC tagu jako hexadecimální řetězec v pořadí big-endian.

:::

## Rozhraní {#interfaces}

Pro komunikaci s uživatelem má TAPPER RGB LED a bzučák.

Obojí aktivujete požadavkem přes MQTT podle této specifikace.

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

Unixová časová značka požadavku; očekává se float nebo integer.

### ID {#id}

ID požadavku; očekává se integer.

### Output {#output}



Tato část ovládá výstup relé.

- Command může mít hodnotu `activate`, `deactivate` nebo `pulse`.
    - Příkaz `pulse` vyžaduje i prvek `duration` (doba v sekundách jako integer).

```json
"output": {
            "command": "activate"|"deactivate"|"pulse",
            "duration": int
}
```

:::info

Relé přibude v hardwarové revizi r2.

:::

### Visual {#visual}

Tato část ovládá LED na desce.

Může obsahovat buď prvek `"state"`, nebo `"pattern"`.

- State může mít hodnotu `off`, nebo `on/`, za kterým následuje barva `red`/`green`/`blue`/`yellow`.  
  Příklad: `on/red`
  ```json
  "visual": {
            "state": "off" | "on/red" | "on/green" | "on/blue" | "on/yellow",
  }
  ```

- Prvek `pattern` funguje podobně: `p1/`, `p2/`, `p3/` nebo `p4/`, za kterým následuje barva `red`/`green`/`blue`/`yellow`.  
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

Tato část ovládá bzučák.

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

Odpověď může mít tyto payloady:

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
