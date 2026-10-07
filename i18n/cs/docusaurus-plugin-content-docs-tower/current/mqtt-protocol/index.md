---
title: Protokol MQTT
description: "Protokol MQTT v HARDWARIO TOWER: broker Mosquitto, struktura topiců a formáty zpráv, přes které spolu komunikují všechny uzly a aplikace."
---
import Image from '@theme/IdealImage';

- MQTT je otevřený, jednoduchý a nenáročný komunikační protokol pro posílání zpráv mezi mnoha klienty připojenými k centrálnímu brokeru MQTT.
- Každá **zpráva** se skládá ze dvou částí: **topicu** a **payloadu**
- **Topic** popisuje obsah zprávy a identifikuje ji
- Název **topicu** má **adresářovou strukturu**: jednotlivé úrovně jsou oddělené symbolem `/`
  - Topic může být `bedroom/temperature`, `kitchen/light/set` atd.
- Server MQTT se nazývá **broker** a klienti mohou **publikovat zprávy** a **odebírat topicy**
- Úkolem brokeru MQTT je **doručovat zprávy** od **vydavatelů** k **odběratelům**
- Při odebírání topicu MQTT můžete použít dva takzvané **zástupné znaky** (wildcards)
  - Zástupný znak `+` přihlásí odběr všech topiců v zadaném topicu
    - např. `+/light/set` přihlásí odběr `bedroom/light/set`, `kitchen/light/set` atd.
  - Zástupný znak `#` přihlásí odběr všech podřízených topiců zadaného topicu
    - např. `kitchen/#` přihlásí odběr `kitchen/light/set`, `kitchen/light/get`, `kitchen/temperature/get` atd.
      :::caution

      Zástupný znak **#** lze použít pouze na **konci názvu topicu**

      :::

:::tip

Přečtěte si [**více o topicech MQTT a o tom, jak je používat**](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/).

:::

## Broker MQTT Mosquitto {#mosquitto-mqtt-broker}

Sada IoT Kit používá open-source [**broker MQTT Mosquitto**](https://mosquitto.org). Všechny zprávy procházejí přes broker MQTT, takže systém IoT Kit lze dál rozšiřovat.

Když připojíte **Radio Dongle**, ke kterému je připojený vzdálený uzel, zobrazíte všechny příchozí zprávy pomocí balíčku mosquitto-cli tímto příkazem:

:::note

Jak nainstalovat broker MQTT Mosquitto, najdete na odkazu výše, případně můžete [**spustit vlastní server na Raspberry Pi**](../server-raspberry-pi/index.md).

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

V aplikaci **HARDWARIO Playground** můžete [**spravovat rádiová zařízení**](../desktop-programming/radio-network-management.md), [**číst a odesílat zprávy MQTT**](../desktop-programming/mqtt-messages-management.md) a zpracovávat je v [**Node-RED**](../desktop-programming/node-red-programming.md).

:::
