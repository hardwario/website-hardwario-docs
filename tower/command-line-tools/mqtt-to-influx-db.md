---
slug: mqtt-to-influx-db
title: MQTT Storage
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

For storing data from our sensors we like to use **InfluxDB - a time-series database**. As a bridge between **MQTT** and **InfluxDB**, we created a `mqtt2influxdb`. A tool that connects to **InfluxDB** and **MQTT broker** and by user-defined config subscribes to MQTT topics and stores data from messages.

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

You need [**Python and pip installed and in system PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows) on your device for you to be able to get the **Gateway Service**

</TabItem>
<TabItem value="linux" label="Linux">

You need [**Python**](https://www.python.org/downloads/) and [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/) installed and in system **PATH** on your device for you to be able to get the **Gateway Service**

</TabItem>
<TabItem value="macOS" label="macOS">

You need [**Python**](https://www.python.org/downloads/) and [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/) installed and in system **PATH** on your device for you to be able to get the **Gateway Service**

</TabItem>
</Tabs>

:::

## Set Up MQTT to InfluxDb

To install `mqtt2influxdb` you will just need to put the next command to your command line

```bash
sudo pip3 install --upgrade mqtt2influxdb
```

Next, you will have to create the directory where you will save the config files. To do that, just run the command:

```
sudo mkdir /etc/hardwario
```

To create the configuration file, you can use any text editor, in this tutorial we will use `nano`:

```bash
sudo nano /etc/hardwario/mqtt2influxdb.yml
```

:::tip

In `nano`, you can save changes by pressing the key combination `Ctrl + O` and exit editor by pressing `Ctrl + X`.

:::

<details>
<summary>
<b>
Configuration File Snippet
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

In the section `tags`, you can use identifiers, e.g.: `tags: room: bedroom`

:::

To test if your configuration file works, you can paste the command:

```
mqtt2influxdb -c /etc/hardwario/mqtt2influxdb.yml --test
```

If everything is ok, you can also run the MQTT to InfluxDB as a service, so it runs in the background and after reboot

```
pm2 start `which python3` --name "mqtt2influxdb" -- `which mqtt2influxdb` -c /etc/hardwario/mqtt2influxdb.yml
pm2 save
```


{/* TODO (maintainer note, hidden from rendered page): document the mqtt2influxdb.yml config file. */}
