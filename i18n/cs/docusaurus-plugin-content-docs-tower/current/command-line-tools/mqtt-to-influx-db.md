---
slug: mqtt-to-influx-db
title: Ukládání zpráv MQTT
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

K ukládání dat z našich senzorů rádi používáme **InfluxDB, databázi pro časové řady**. Jako most mezi **MQTT** a **InfluxDB** jsme vytvořili nástroj `mqtt2influxdb`. Připojí se k **InfluxDB** i k **brokeru MQTT**, podle uživatelské konfigurace odebírá topicy MQTT a ukládá data ze zpráv.

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Abyste mohli nástroj **mqtt2influxdb** nainstalovat, musíte mít v počítači [**nainstalovaný Python a pip, oba v systémové proměnné PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows).

</TabItem>
<TabItem value="linux" label="Linux">

Abyste mohli nástroj **mqtt2influxdb** nainstalovat, musíte mít v počítači nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/), oba v systémové proměnné **PATH**.

</TabItem>
<TabItem value="macOS" label="macOS">

Abyste mohli nástroj **mqtt2influxdb** nainstalovat, musíte mít v počítači nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/), oba v systémové proměnné **PATH**.

</TabItem>
</Tabs>

:::

## Nastavení přenosu z MQTT do InfluxDB {#set-up-mqtt-to-influxdb}

Nástroj `mqtt2influxdb` nainstalujete tímto příkazem:

```bash
sudo pip3 install --upgrade mqtt2influxdb
```

Dále vytvořte adresář, do kterého budete ukládat konfigurační soubory. Stačí spustit příkaz:

```
sudo mkdir /etc/hardwario
```

Konfigurační soubor vytvoříte v libovolném textovém editoru; v tomto návodu použijeme `nano`:

```bash
sudo nano /etc/hardwario/mqtt2influxdb.yml
```

:::tip

V editoru `nano` uložíte změny klávesovou zkratkou `Ctrl + O` a editor ukončíte zkratkou `Ctrl + X`.

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

Jestli konfigurační soubor funguje, otestujete tímto příkazem:

```
mqtt2influxdb -c /etc/hardwario/mqtt2influxdb.yml --test
```

Pokud je vše v pořádku, můžete nástroj mqtt2influxdb spustit také jako službu, která poběží na pozadí a spustí se i po restartu:

```
pm2 start `which python3` --name "mqtt2influxdb" -- `which mqtt2influxdb` -c /etc/hardwario/mqtt2influxdb.yml
pm2 save
```


{/* TODO (maintainer note, hidden from rendered page): document the mqtt2influxdb.yml config file. */}
