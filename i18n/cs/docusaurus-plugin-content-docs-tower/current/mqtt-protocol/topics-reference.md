---
slug: topics-reference
title: Přehled topiců
description: "Hodnoty jako 0:0 nebo 0:2 ve výše uvedených topicích popisují, kterou sběrnici I2C senzor používá a jaká je jeho revize. První hodnota před : označuje sběrnici I2C0 (výchozí) nebo I2C1."
---
import Image from '@theme/IdealImage';

## Topicy uzlů {#node-topics}

### Firmware {#firmware}

|  Vysvětlení  |    MQTT topic    |                        Payload                         |
| :-----------: | :--------------: | :----------------------------------------------------: |
| Informace o firmwaru | `node/{id}/info` | `{"firmware": "motion-detector", "version": "v1.3.0"`} |

### Baterie {#battery}

|         Vysvětlení         |              MQTT topic              | Payload |
| :-------------------------: | :----------------------------------: | :-----: |
|   Napětí modulu Battery Module    | `node/{id}/battery/standard/voltage` |  6.21   |
| Napětí modulu Mini Battery Module |   `node/{id}/battery/mini/voltage`   |  3.12   |

### Senzory {#sensors}

|            Vysvětlení            |                  MQTT topic                  |
| :-------------------------------: | :------------------------------------------: |
|            Osvětlení            |    `node/{id}/lux-meter/0:0/illuminance`     |
|         Relativní vlhkost         | `node/{id}/hygrometer/0:2/relative-humidity` |
|             Tlak              |      `node/{id}/barometer/0:0/pressure`      |
|             Nadmořská výška              |      `node/{id}/barometer/0:0/altitude`      |
|     Teplota (Core Module)     |   `node/{id}/thermometer/0:1/temperature`    |
| Teplota (Climate Module, Tag) |   `node/{id}/thermometer/0:0/temperature`    |
|             Měřič CO2             |    `node/{id}/co2-meter/-/concentration`     |

:::info

Hodnoty jako `0:0` nebo `0:2` ve výše uvedených topicích popisují, kterou sběrnici **I2C** senzor používá a jaká je jeho revize. První hodnota před `:` označuje sběrnici **I2C0** (výchozí) nebo **I2C1**.

Druhé číslo za `:` označuje **revizi senzoru**. Tato čísla jsou fixní a nikdy se nemění. Odpovídá to [**hodnotám ve firmware SDK**](https://sdk.hardwario.com/group__twr__radio.html#gga99fb83031ce9923c84392b4e92f956b5aaf5134d4153977e4b88c6e20ceccfafd).

:::

### Relé {#relays}

:::info

Jediné povolené hodnoty payloadu jsou `true/false`.

:::

|      Vysvětlení       |           MQTT topic            |               Odpověď               |
| :--------------------: | :-----------------------------: | :----------------------------------: |
| Nastavení relé modulu Power Module |  `node/{id}/relay/-/state/set`  |      `node/{id}/relay/-/state`       |
| Čtení relé modulu Power Module |  `node/{id}/relay/-/state/get`  |      `node/{id}/relay/-/state`       |
| Nastavení relé modulu Relay Module | `node/{id}/relay/0:0/state/set` |     `node/{id}/relay/0:0/state`      |
| Čtení relé modulu Relay Module | `node/{id}/relay/0:0/state/get` |     `node/{id}/relay/0:0/state`      |
|   Pulz modulu Relay Module   | `node/{id}/relay/0:0/pulse/set` | `{"duration":200, "direction":true}` |


### LED {#led}

|      Vysvětlení       |         MQTT topic          |
| :--------------------: | :-------------------------: |
| LED na modulu Core Module | `node/{id}/led/-/state/set` |

### Tlačítko {#button}

|     Vysvětlení      |               MQTT topic                |
| :------------------: | :-------------------------------------: |
|     Stisk tlačítka     |  `node/{id}/push-button/-/event-count`  |
|     Podržení tlačítka      |  `node/{id}/push-button/-/hold-count`   |
| Doba podržení tlačítka | `node/{id}/push-button/-/hold-duration` |

### PIR detektor pohybu {#pir-motion-detector}

|        Vysvětlení        |          MQTT topic           |
| :-----------------------: | :---------------------------: |
| Detekce pohybu objektu | `node/{id}/pir/-/event-count` |

### LED pásek {#led-strip}

|                Vysvětlení                |        MQTT topic / vysvětlení         | Příklad                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|           Nastavení jasu 0-100 %           | `node/{id}/led-strip/-/brightness/set`  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Nastavení barvy *#250000* nebo RGBW *#250000(80)* |    `node/{id}/led-strip/-/color/set`    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|      Nastavení kompozice (části LED pásku)      |  `node/{id}/led-strip/-/compound/set`   | `[20, "#ff0000", 20, "#00ff00"]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                Nastavení efektu                 |   `node/{id}/led-strip/-/effect/set`    | <ul><li>`{"type":"test"}`</li><li>`{"type":"rainbow", "wait":50}`</li><li>`{"type":"rainbow-cycle", "wait":50}`</li><li>`{"type":"theater-chase-rainbow", "wait":50}`</li><li>`{"type":"color-wipe", "wait":50, "color":"#800000"}`</li><li>`{"type":"theater-chase", "wait":50, "color":"#008000"}`</li><li>`{"type":"stroboscope", "wait":50, "color":"#0000ff"}`</li><li>`{"type":"icicle", "wait":50, "color":"#ff0000"}`</li><li>`{"type":"pulse-color", "wait":200, "color":"#ff0000"}`</li></ul> |
|            Efekt teploměru             | `node/{id}/led-strip/-/thermometer/set` | <ul><li>`{"temperature": 22.5, "min":-20, "max": 50}`</li><li>`{"temperature": 22.5, "min":-20, "max": 50, "white-dots": 10}`</li><li>`{"temperature": 22.5, "min":-20, "max": 50, "set-point": 30, "color":"#ff0000"}`</li><li>`{"temperature": 22.5, "min":-20, "max": 50, "white-dots": 10, "set-point": 30, "color":"#ff0000"}`</li><li>`{"temperature": -20, "min":-20, "max": 50, "set-point": 30, "color":"#00ff00"}`</li></ul>                                                                  |

### LCD Module {#lcd-module}

| Vysvětlení  |                  MQTT topic                  |                 Příklad                  |
| :----------: | :------------------------------------------: | :--------------------------------------: |
| Levé tlačítko  | `node/{id}/push-button/lcd:left/event-count` |                                          |
| Pravé tlačítko | `node/{id}/push-button/lcd:left/event-count` |                                          |
| Smazání obrazovky | `node/{id}/push-button/lcd:left/event-count` |                                          |
|  Vypsání textu  | `node/{id}/push-button/lcd:left/event-count` | `{"x": 5, "y": 10, "text": "HARDWARIO"}` |


## Topicy brány {#gateway-topics}

:::tip

  Všechny tyto příkazy jsou zabudované v aplikaci HARDWARIO Playground a všechno tohle můžete udělat v [**záložce Devices**](../desktop-programming/radio-network-management.md).

:::

### Párování {#pairing}

| Vysvětlení |            MQTT topic             |               Odpověď                |
| :---------: | :-------------------------------: | :-----------------------------------: |
|    Start    | `gateway/{id}/pairing-mode/start` | `gateway/{id}/pairing-mode` `"start"` |
|    Stop     | `gateway/{id}/pairing-mode/stop`  | `gateway/{id}/pairing-mode` `"stop"`  |

### Spárované uzly {#paired-nodes}

|   Vysvětlení   |         MQTT topic         |                                                             Odpověď                                                             |
| :-------------: | :------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
|      Výpis       |  `gateway/{id}/nodes/get`  | `gateway/{id}/nodes` `[{"id": "a7c8b05762dd", "alias": "generic-node:0"},  {"id": "836d1983718a", "alias": "lcd-thermostat:0"}]` |
| Smazání všech uzlů | `gateway/{id}/nodes/purge` |                                                    `gateway/{id}/nodes` `[]`                                                     |

### Ruční přidání/odebrání {#manual-addremove}

| Vysvětlení |                MQTT topic                 |              Odpověď               |
| :---------: | :---------------------------------------: | :---------------------------------: |
|     Přidání     |  `gateway/{id}/nodes/add` `"{id-node}"`   | `gateway/{id}/attach` `"{id-node}"` |
|   Odebrání    | `gateway/{id}/nodes/remove` `"{id-node}"` | `gateway/{id}/detach` `"{id-node}"` |


### Aliasy {#aliases}

| Vysvětlení  |                            MQTT topic                             |
| :----------: | :---------------------------------------------------------------: |
|     Nastavení      | `gateway/{id}/alias/set` `{"id": "id-node", "alias": "new-name"}` |
|    Odebrání    |             `gateway/{id}/alias/remove` `"{id-node}"`             |
| Odebrání aliasu |    `gateway/{id}/alias/set` `{"id": "id-node", "alias": null}`    |

### Bezdrátové skenování {#scan-wireless}

| Vysvětlení |        MQTT topic         |           Odpověď            |
| :---------: | :-----------------------: | :---------------------------: |
|    Start    | `gateway/{id}/scan/start` | `gateway/{id}/scan` `"start"` |
|    Stop     | `gateway/{id}/scan/stop`  | `gateway/{id}/scan` `"stop"`  |
