---
title: MQTT Protocol
---
import Image from '@theme/IdealImage';

- MQTT is an open, simple and low overhead communication protocol for sending messages between many clients which are connected to the central MQTT broker.
- Every **message** consists of two parts: **topic** and **payload**
- The **Topic** describes the content of the message and identifies it
- The **Topic** name has a **directory structure**: each level is divided with a symbol `/`
  - Topic can be `bedroom/temperature`, `kitchen/light/set`, etc.
- MQTT server is called the **broker** and clients can p**ublish messages** and **subscribe to topics**
- The task of the MQTT broker is to **deliver messages** from **publishers** to **subscribers**
- You can use two so-called **wildcards** while subscribing to the MQTT topic
  - `+` wildcard will subscribe to all topics in the specified topic
    - e.g. `+/light/set` will subscribe to `bedroom/light/set`, `kitchen/light/set`, etc.
  - `#` wildcard will subscribe to all sub-topics of a specified topic
    - e.g. `kitchen/#` will subscribe to `kitchen/light/set`, `kitchen/light/get`, `kitchen/temperature/get`, etc.
      :::caution

      The wildcard **#** can be used only at the **end of the topic** name

      :::

:::tip

You can read [**more about the MQTT topics and how to use them**](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/).

:::

## Mosquitto MQTT broker

IoT Kit uses the open-source [**Mosquitto MQTT broker**](https://mosquitto.org). All messages are routed through the MQTT broker. This allows further expansion of the IoT Kit system.

When you connect the **Radio Dongle** with the connected remote node, you can display all incoming messages using mosquitto-cli package by typing:

:::note

You can read how to install Mosquitto MQTT broker on the link above or you can [**start your server on Raspberry Pi**](../server-raspberry-pi/index.md).

:::

```bash
mosquitto_sub -t "#" -v
```

Response:

```bash
pi@hub:~ $ mosquitto_sub -t "#" -v
node/836d19821664/thermometer/0:1/temperature 24.69
node/836d19821664/thermometer/0:1/temperature 24.94
node/836d19821664/push-button/-/event-count 5
```

:::info

You can use **HARDWARIO Playground** to [**manage the radio devices**](../desktop-programming/radio-network-management.md), [**read and send MQTT messages**](../desktop-programming/mqtt-messages-management.md) and process them with [**Node-RED**](../desktop-programming/node-red-programming.md).

:::
