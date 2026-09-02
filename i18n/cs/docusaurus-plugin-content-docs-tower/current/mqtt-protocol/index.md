---
title: Protokol MQTT
description: "Zástupný znak # lze použít pouze na konci názvu topicu"
---
import Image from '@theme/IdealImage';

- MQTT je otevřený, jednoduchý a nenáročný komunikační protokol pro posílání zpráv mezi mnoha klienty, kteří jsou připojeni k centrálnímu MQTT brokeru.
- Každá **zpráva** se skládá ze dvou částí – **topicu** a **payloadu**
- **Topic** popisuje obsah zprávy a identifikuje ji
- Název **topicu** má **adresářovou strukturu** – jednotlivé úrovně jsou oddělené symbolem `/`
  - Topic může být `bedroom/temperature`, `kitchen/light/set` atd.
- MQTT server se nazývá **broker** a klienti mohou **publikovat zprávy** a **odebírat topicy**
- Úkolem MQTT brokeru je **doručovat zprávy** od **publisherů** k **odběratelům**
- Při odebírání MQTT topicu můžete použít dva takzvané **zástupné znaky** (wildcards)
  - Zástupný znak `+` přihlásí odběr všech topiců v zadaném topicu
    - např. `+/light/set` přihlásí odběr `bedroom/light/set`, `kitchen/light/set` atd.
  - Zástupný znak `#` přihlásí odběr všech podřízených topiců zadaného topicu
    - např. `kitchen/#` přihlásí odběr `kitchen/light/set`, `kitchen/light/get`, `kitchen/temperature/get` atd.
      :::caution

      Zástupný znak **#** lze použít pouze na **konci názvu topicu**

      :::

:::tip

Můžete si přečíst [**více o MQTT topicech a o tom, jak je používat**](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/).

:::

## MQTT broker Mosquitto {#mosquitto-mqtt-broker}

IoT Kit používá open-source [**MQTT broker Mosquitto**](https://mosquitto.org). Všechny zprávy jsou směrovány přes MQTT broker. To umožňuje další rozšiřování systému IoT Kit.

Když připojíte **Radio Dongle** s připojeným vzdáleným uzlem, můžete zobrazit všechny příchozí zprávy pomocí balíčku mosquitto-cli zadáním:

:::note

Jak nainstalovat MQTT broker Mosquitto si můžete přečíst na odkazu výše, nebo můžete [**spustit vlastní server na Raspberry Pi**](../server-raspberry-pi/index.md).

:::

```bash
mosquitto_sub -t "#" -v
```

Odpověď:

```bash
pi@hub:~ $ mosquitto_sub -t "#" -v
node/836d19821664/thermometer/0:1/temperature 24.69
node/836d19821664/thermometer/0:1/temperature 24.94
node/836d19821664/push-button/-/event-count 5
```

:::info

Můžete použít **HARDWARIO Playground** ke [**správě rádiových zařízení**](../desktop-programming/radio-network-management.md), [**čtení a odesílání MQTT zpráv**](../desktop-programming/mqtt-messages-management.md) a jejich zpracování pomocí [**Node-RED**](../desktop-programming/node-red-programming.md).

:::
