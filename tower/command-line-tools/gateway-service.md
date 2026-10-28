---
slug: gateway-service
title: Gateway Service
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This **multi-platform** Python tool connects the **radio gateway** to the MQTT.
The radio gateway is communicating over a virtual USB serial port with the use of JSON files.

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

## Installation

To install the **Gateway Service** you just need to open your systems **CLI** and run the following command:

:::tip

You can use the same command to upgrade **Gateway Service** to the latest version

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

```bash
pip install --upgrade --no-cache-dir bcg
```

</TabItem>
<TabItem value="linux" label="Linux">

```bash
sudo pip install --upgrade --no-cache-dir bcg
```

</TabItem>
<TabItem value="macOS" label="macOS">

```bash
pip install --upgrade --no-cache-dir bcg
```

</TabItem>
</Tabs>

:::tip

To get all available commands just type **`bcg --help`** to your **CLI**

<details>
<summary>
<b>
bcg --help output
</b>
</summary>

  ``` showLineNumbers
  Usage: bcg [OPTIONS] COMMAND [ARGS]...

  HARDWARIO gateway between USB serial port and MQTT broker

  Options:
  -c, --config FILENAME  configuration file (YAML format).
  -d, --device TEXT      device
  -H, --mqtt-host TEXT   MQTT host to connect to (default is 127.0.0.1)
  -P, --mqtt-port TEXT   MQTT port to connect to (default is 1883)
  --no-wait              no wait on connect or reconnect serial port
  --mqtt-username TEXT   MQTT username
  --mqtt-password TEXT   MQTT password
  --mqtt-cafile TEXT     MQTT cafile
  --mqtt-certfile TEXT   MQTT certfile
  --mqtt-keyfile TEXT    MQTT keyfile
  -v, --verbosity LVL    Either CRITICAL, ERROR, WARNING, INFO or DEBUG
  -D, --debug            Print debug messages, same as --verbosity DEBUG.
  --version              Show the version and exit.
  --help                 Show this message and exit.

  Commands:
  devices  Print available devices.
  help     Show help.
  ```

</details>

:::

## Usage Example

