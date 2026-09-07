---
slug: topics-reference
title: Topics Reference
---
import Image from '@theme/IdealImage';

## Node Topics

### Firmware

|  Explanation  |    MQTT Topic    |                        Payload                         |
| :-----------: | :--------------: | :----------------------------------------------------: |
| Firmware info | `node/{id}/info` | `{"firmware": "motion-detector", "version": "v1.3.0"`} |

### Battery

|         Explanation         |              MQTT Topic              | Payload |
| :-------------------------: | :----------------------------------: | :-----: |
|   Battery Module Voltage    | `node/{id}/battery/standard/voltage` |  6.21   |
| Mini Battery Module Voltage |   `node/{id}/battery/mini/voltage`   |  3.12   |

### Sensors

|            Explanation            |                  MQTT Topic                  |
| :-------------------------------: | :------------------------------------------: |
|            Illuminance            |    `node/{id}/lux-meter/0:0/illuminance`     |
|         Relative Humidity         | `node/{id}/hygrometer/0:2/relative-humidity` |
|             Pressure              |      `node/{id}/barometer/0:0/pressure`      |
|             Altitude              |      `node/{id}/barometer/0:0/altitude`      |
|     Temperature (Core Module)     |   `node/{id}/thermometer/0:1/temperature`    |
| Temperature (Climate Module, Tag) |   `node/{id}/thermometer/0:0/temperature`    |
|             CO2 Meter             |    `node/{id}/co2-meter/-/concentration`     |

:::info

Values like `0:0` or `0:2` in the topics above describe which **I2C** bus the sensor is using and which revision the sensor is. The first value before `:` describes **I2C0** (default) or **I2C1** bus.

The second number after `:` describes the **revision of the sensor**. These numbers are fixed and never change. This corresponds with [**firmware SDK values**](https://sdk.hardwario.com/group__twr__radio.html#gga99fb83031ce9923c84392b4e92f956b5aaf5134d4153977e4b88c6e20ceccfafd).

:::

### Relays

:::info

Only allowed values for payload are `true/false`.

:::

|      Explanation       |           MQTT Topic            |               Response               |
| :--------------------: | :-----------------------------: | :----------------------------------: |
| Power Module Relay Set |  `node/{id}/relay/-/state/set`  |      `node/{id}/relay/-/state`       |
| Power Module Relay Get |  `node/{id}/relay/-/state/get`  |      `node/{id}/relay/-/state`       |
| Relay Module Relay Set | `node/{id}/relay/0:0/state/set` |     `node/{id}/relay/0:0/state`      |
| Relay Module Relay Get | `node/{id}/relay/0:0/state/get` |     `node/{id}/relay/0:0/state`      |
|   Relay Module Pulse   | `node/{id}/relay/0:0/pulse/set` | `{"duration":200, "direction":true}` |


### LED

|      Explanation       |         MQTT Topic          |
| :--------------------: | :-------------------------: |
| LED on the Core Module | `node/{id}/led/-/state/set` |

### Button

|     Explanation      |               MQTT Topic                |
| :------------------: | :-------------------------------------: |
|     Button Press     |  `node/{id}/push-button/-/event-count`  |
|     Button Hold      |  `node/{id}/push-button/-/hold-count`   |
| Button Hold Duration | `node/{id}/push-button/-/hold-duration` |

### PIR Motion Detector

|        Explanation        |          MQTT Topic           |
| :-----------------------: | :---------------------------: |
| Object Movement Detection | `node/{id}/pir/-/event-count` |

### LED Strip

|                Explanation                |        MQTT Topic / explanation         | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|           Set brightness 0-100%           | `node/{id}/led-strip/-/brightness/set`  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Set color *#250000* or RGBW *#250000(80)* |    `node/{id}/led-strip/-/color/set`    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|      Set compound(part of LED Strip)      |  `node/{id}/led-strip/-/compound/set`   | `[20, "#ff0000", 20, "#00ff00"]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                Set effect                 |   `node/{id}/led-strip/-/effect/set`    | <ul><li>`{"type":"test"}`</li><li>`{"type":"rainbow", "wait":50}`</li><li>`{"type":"rainbow-cycle", "wait":50}`</li><li>`{"type":"theater-chase-rainbow", "wait":50}`</li><li>`{"type":"color-wipe", "wait":50, "color":"#800000"}`</li><li>`{"type":"theater-chase", "wait":50, "color":"#008000"}`</li><li>`{"type":"stroboscope", "wait":50, "color":"#0000ff"}`</li><li>`{"type":"icicle", "wait":50, "color":"#ff0000"}`</li><li>`{"type":"pulse-color", "wait":200, "color":"#ff0000"}`</li></ul> |
|            Thermometer effect             | `node/{id}/led-strip/-/thermometer/set` | <ul><li>`{"temperature": 22.5, "min":-20, "max": 50}`</li><li>`{"temperature": 22.5, "min":-20, "max": 50, "white-dots": 10}`</li><li>`{"temperature": 22.5, "min":-20, "max": 50, "set-point": 30, "color":"#ff0000"}`</li><li>`{"temperature": 22.5, "min":-20, "max": 50, "white-dots": 10, "set-point": 30, "color":"#ff0000"}`</li><li>`{"temperature": -20, "min":-20, "max": 50, "set-point": 30, "color":"#00ff00"}`</li></ul>                                                                  |

### LCD Module

| Explanation  |                  MQTT Topic                  |                 Example                  |
| :----------: | :------------------------------------------: | :--------------------------------------: |
| Left Button  | `node/{id}/push-button/lcd:left/event-count` |                                          |
| Right Button | `node/{id}/push-button/lcd:right/event-count` |                                          |
| Clear Screen | `node/{id}/lcd/-/screen/clear`               |                                          |
|  Write Text  | `node/{id}/lcd/-/text/set`                   | `{"x": 5, "y": 10, "text": "HARDWARIO"}` |


## Gateway Topics

:::tip

  All these commands are build into the HARDWARIO Playground and you can do all this in the [**Devices Tab**](../desktop-programming/radio-network-management.md).

:::

### Pairing

| Explanation |            MQTT Topic             |               Response                |
| :---------: | :-------------------------------: | :-----------------------------------: |
|    Start    | `gateway/{id}/pairing-mode/start` | `gateway/{id}/pairing-mode` `"start"` |
|    Stop     | `gateway/{id}/pairing-mode/stop`  | `gateway/{id}/pairing-mode` `"stop"`  |

### Paired Nodes

|   Explanation   |         MQTT Topic         |                                                             Response                                                             |
| :-------------: | :------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
|      List       |  `gateway/{id}/nodes/get`  | `gateway/{id}/nodes` `[{"id": "a7c8b05762dd", "alias": "generic-node:0"},  {"id": "836d1983718a", "alias": "lcd-thermostat:0"}]` |
| Purge All Nodes | `gateway/{id}/nodes/purge` |                                                    `gateway/{id}/nodes` `[]`                                                     |

### Manual Add/Remove

| Explanation |                MQTT Topic                 |              Response               |
| :---------: | :---------------------------------------: | :---------------------------------: |
|     Add     |  `gateway/{id}/nodes/add` `"{id-node}"`   | `gateway/{id}/attach` `"{id-node}"` |
|   Remove    | `gateway/{id}/nodes/remove` `"{id-node}"` | `gateway/{id}/detach` `"{id-node}"` |


### Aliases

| Explanation  |                            MQTT Topic                             |
| :----------: | :---------------------------------------------------------------: |
|     Set      | `gateway/{id}/alias/set` `{"id": "id-node", "alias": "new-name"}` |
|    Remove    |             `gateway/{id}/alias/remove` `"{id-node}"`             |
| Remove Alias |    `gateway/{id}/alias/set` `{"id": "id-node", "alias": null}`    |

### Scan Wireless

| Explanation |        MQTT Topic         |           Response            |
| :---------: | :-----------------------: | :---------------------------: |
|    Start    | `gateway/{id}/scan/start` | `gateway/{id}/scan` `"start"` |
|    Stop     | `gateway/{id}/scan/stop`  | `gateway/{id}/scan` `"stop"`  |
