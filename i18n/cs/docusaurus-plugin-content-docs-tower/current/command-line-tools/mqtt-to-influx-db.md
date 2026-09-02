---
slug: mqtt-to-influx-db
title: MQTT Storage
description: "Pro ukládání dat z našich senzorů rádi používáme InfluxDB – databázi pro časové řady. Jako most mezi MQTT a InfluxDB jsme vytvořili nástroj mqtt2influxdb. Ten se připojí k InfluxDB a MQTT brokeru a podle uživatelem definované konfigurace se přihlásí…"
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Pro ukládání dat z našich senzorů rádi používáme **InfluxDB – databázi pro časové řady**. Jako most mezi **MQTT** a **InfluxDB** jsme vytvořili nástroj `mqtt2influxdb`. Ten se připojí k **InfluxDB** a **MQTT brokeru** a podle uživatelem definované konfigurace se přihlásí k MQTT tématům a ukládá data ze zpráv.

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Aby bylo možné získat **Gateway Service**, musíte mít na svém zařízení [**nainstalovaný Python a pip a mít je v systémové PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows)

</TabItem>
<TabItem value="linux" label="Linux">

Aby bylo možné získat **Gateway Service**, musíte mít na svém zařízení nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/) a mít je v systémové **PATH**

</TabItem>
<TabItem value="macOS" label="macOS">

Aby bylo možné získat **Gateway Service**, musíte mít na svém zařízení nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/) a mít je v systémové **PATH**

</TabItem>
</Tabs>

:::

## Nastavení MQTT do InfluxDb {#set-up-mqtt-to-influxdb}

Pro instalaci `mqtt2influxdb` stačí zadat do příkazové řádky následující příkaz

```bash
sudo pip3 install --upgrade mqtt2influxdb
```

Dále bude potřeba vytvořit adresář, do kterého budete ukládat konfigurační soubory. To provedete příkazem:

```
sudo mkdir /etc/hardwario
```

Pro vytvoření konfiguračního souboru můžete použít jakýkoli textový editor, v tomto návodu použijeme `nano`:

```bash
sudo nano /etc/hardwario/mqtt2influxdb.yml
```

:::tip

V editoru `nano` uložíte změny stisknutím kombinace klávesy `Ctrl + O` a editor ukončíte stisknutím `Ctrl + X`.

:::

<details>
<summary>
<b>
Ukázka konfiguračního souboru
</b>
</summary>
<p>

```bash
mqtt:
  host: 127.0.0.1
  port: 1883

influxdb:
  host: 127.0.0.1
  port: 8086
  database: node

points:
  - measurement: temperature
    topic: node/+/thermometer/+/temperature
    fields:
      value: $.payload
    tags:
      id: $.topic[1]
      channel: $.topic[3]

  - measurement: relative-humidity
    topic: node/+/hygrometer/+/relative-humidity
    fields:
      value: $.payload
    tags:
      id: $.topic[1]
      channel: $.topic[3]

  - measurement: illuminance
    topic: node/+/lux-meter/0:0/illuminance
    fields:
      value: $.payload
    tags:
      id: $.topic[1]

  - measurement: pressure
    topic: node/+/barometer/0:0/pressure
    fields:
      value: $.payload
    tags:
      id: $.topic[1]

  - measurement: co2
    topic: node/+/co2-meter/-/concentration
    fields:
      value: $.payload
    tags:
      id: $.topic[1]

  - measurement: voltage
    topic: node/+/battery/+/voltage
    fields:
      value: $.payload
    tags:
      id: $.topic[1]

  - measurement: button
    topic: node/+/push-button/+/event-count
    fields:
      value: $.payload
    tags:
      id: $.topic[1]
      channel: $.topic[3]

  - measurement: tvoc
    topic: node/+/voc-lp-sensor/0:0/tvoc
    fields:
      value: $.payload
    tags:
      id: $.topic[1]

  - measurement: tvoc
    topic: node/+/voc-sensor/0:0/tvoc
    fields:
      value: $.payload
    tags:
      id: $.topic[1]
  ```
</p>
</details>

:::note

V sekci `tags` můžete použít vlastní identifikátory, např.: `tags: room: bedroom`

:::

Chcete-li otestovat, zda váš konfigurační soubor funguje, můžete vložit příkaz:

```
mqtt2influxdb -c /etc/hardwario/mqtt2influxdb.yml --test
```

Pokud je vše v pořádku, můžete MQTT to InfluxDB spustit také jako službu, takže poběží na pozadí i po restartu

```
pm2 start `which python3` --name "mqtt2influxdb" -- `which mqtt2influxdb` -c /etc/hardwario/mqtt2influxdb.yml
pm2 save
```


{/* TODO (maintainer note, hidden from rendered page): document the mqtt2influxdb.yml config file. */}
