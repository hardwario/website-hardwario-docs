---
slug: /api-spec
title: MQTT API Specification
description: "TAPPER can communicate over MQTT using JSON messages."
---

import Image from '@theme/IdealImage';

# MQTT API Specification

TAPPER can communicate over MQTT using JSON messages.

## Topic

Every MQTT Topic starts with `tapper/$id/`, where `id` is the hardware address of TAPPER.

## Payload

TAPPER uses JSON-formatted payloads.

Each Payload includes a timestamp.

## Events

TAPPER has multiple events defined in the API.

|           Topic           |                         Payload                         |
| :-----------------------: | :-----------------------------------------------------: |
|  `tapper/$id/event/boot`  |                 `{"timestamp": float}`                  |
| `tapper/$id/event/tamper` | `{"timestamp": float, "state": "active" \| "inactive"}` |
|  `tapper/$id/event/tag`   |            `{"timestamp": float, "id": str}`            |

:::info[Tags]

TAPPER sends the NFC tag UID as a big-endian hex string.

:::

## Interfaces

TAPPER has an RGB LED and a Buzzer for interaction with the user.

These can be activated using a request sent through MQTT following this specification.

## Request

The request topic is `tapper/$id/control/request`.

Request payload:

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

### Timestamp

This is the unix timestamp of the request, expected as a float/integer.

### ID

This is the ID of the request, an integer is expected.

### Output



This section is for the relay output.

- Command can be: `activate`, `deactivate`, or `pulse`
    - The `pulse` command requires the `duration` element to be set as well (in seconds), an integer is expected.

```json
"output": {
            "command": "activate"|"deactivate"|"pulse",
            "duration": int
}
```

:::info

Relay is coming in hardware r2.

:::

### Visual

This section is for the on-board LED.

It can either have a `state"` or a `"pattern` element.

- State can have the following values: `off`, or `on/` with the color `red`/`green`/`blue`/`yellow` following.  
  Example: `on/red`
  ```json
  "visual": {
            "state": "off" | "on/red" | "on/green" | "on/blue" | "on/yellow",
  }
  ```

- The `pattern` is very similar, with the options `p1/`, `p2/`, `p3/`, or `p4/` with the color `red`/`green`/`blue`/`yellow` following.  
  Example: `p4/blue`
  | Pattern |    Description    |
  | :-----: | :---------------: |
  |  `p1`   |  one long blink   |
  |  `p2`   |  two long blinks  |
  |  `p3`   | three long blinks |
  |  `p4`   | four long blinks  |

  ```json
  "visual": {
            "pattern":  "p1/red"    | "p2/red"    | "p3/red"    | "p4/red"   |
                        "p1/green"  | "p2/green"  | "p3/green"  | "p4/green" |
                        "p1/blue"   | "p2/blue"   | "p3/blue"   | "p4/blue"  |
                        "p1/yellow" | "p2/yellow" | "p3/yellow" | "p4/yellow"
  }
  ```

### Acoustic

This section is for the buzzer.

The only element is `pattern`, which can have the value `p1`, `p2`, `p3`, or `p4`.

| Pattern |   Description    |
| :-----: | :--------------: |
|  `p1`   |  one long beep   |
|  `p2`   |  two long beeps  |
|  `p3`   | three long beeps |
|  `p4`   | four long beeps  |

```json
"acoustic": {
            "pattern": "p1" | "p2" | "p3" | "p4"
}
```

### Example

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

## Response

The topic for the response is `tapper/$id/control/response`.

The Response payloads are:

|               Result               |                              Payload                               |
| :--------------------------------: | :----------------------------------------------------------------: |
| <font color="green">Success</font> |       `{"timestamp": float, "id": int, "result": "success"}`       |
|   <font color="red">Error</font>   | `{"timestamp": float, "id": int, "result": "error", "error": str}` |

### Example

```json
{
    "timestamp": 1747951200,
    "id": 1,
    "result": "success"
}
```