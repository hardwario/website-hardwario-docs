---
slug: host-management
title: Host Management
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

You will need Mosquitto MQTT Broker installed and running on your machine for this to work

How to install Mosquitto:
<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

You can follow [**How to Install The Mosquitto MQTT Broker on Windows**](http://www.steves-internet-guide.com/install-mosquitto-broker/) tutorial to install and run mosquitto on your Windows system

</TabItem>
<TabItem value="linux" label="Linux">

You can follow [**Install Mosquitto MQTT Broker On Ubuntu 20.04 Server**](https://www.vultr.com/docs/install-mosquitto-mqtt-broker-on-ubuntu-20-04-server/) tutorial to install and run mosquitto on your Ubuntu system

</TabItem>
<TabItem value="macOS" label="macOS">

To install on macOS you can run command:

```
brew install mosquitto
```

After the installation, you need to run `mosquitto` in your terminal

</TabItem>
</Tabs>

Also you will need our [**Gateway Service installed and running**](./gateway-service.md)

:::

This **multi-platform** Python tool is used to control the **radio** and **nodes**.

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

You need [**Python and pip installed and in system PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows) on your device for you to be able to get the **Host Management Tool**

</TabItem>
<TabItem value="linux" label="Linux">

You need [**Python**](https://www.python.org/downloads/) and [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/) installed and in system **PATH** on your device for you to be able to get the **Host Management Tool**

</TabItem>
<TabItem value="macOS" label="macOS">

You need [**Python**](https://www.python.org/downloads/) and [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/) installed and in system **PATH** on your device for you to be able to get the **Host Management Tool**

</TabItem>
</Tabs>

:::

## Installation

To install the **Host Management Tool** you just need to open your systems **CLI** and run the following command:

:::tip

You can use the same command to upgrade **Host Management Tool** to the latest version

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

```bash
pip install --upgrade --no-cache-dir bch
```

</TabItem>
<TabItem value="linux" label="Linux">

```bash
sudo pip install --upgrade --no-cache-dir bch
```

</TabItem>
<TabItem value="macOS" label="macOS">

```bash
pip install --upgrade --no-cache-dir bch
```

</TabItem>
</Tabs>

:::tip

To get all available commands just type **`bch --help`** to your **CLI**

<details>
<summary>
<b>
bch --help output
</b>
</summary>
<p>

  ``` showLineNumbers
  Usage: bch [OPTIONS] COMMAND [ARGS]...

  Options:
  --gateway TEXT                 Gateway name [default: usb-dongle].
  -H, --mqtt-host TEXT           MQTT host to connect to [default: 127.0.0.1].
  -P, --mqtt-port INTEGER RANGE  MQTT port to connect to [default: 1883].
  --mqtt-username TEXT           MQTT username.
  --mqtt-password TEXT           MQTT password.
  --mqtt-cafile PATH             MQTT cafile.
  --mqtt-certfile PATH           MQTT certfile.
  --mqtt-keyfile PATH            MQTT keyfile.
  -v, --verbosity LVL            Either CRITICAL, ERROR, WARNING, INFO or
                                  DEBUG

  --version                      Show the version and exit.
  -h, --help                     Show this message and exit.

  Commands:
  gw       Gateway
  node
  pairing
  pub
  sub      Subscribe topic.
  ```

</p>
</details>

:::

## Usage Example

:::info

You need to run `mosquitto` and `bcg --device YOUR_RADIO_DONGLE` in another terminal or in the background

:::

#### Subscribe to all MQTT topics (#)

```
bch sub
```

#### If you have [your own server](../server-raspberry-pi/index.md), you can run following command with a server hostname or IP Address (example is `hub.local`)

```
bch -H hub.local sub
```

#### Subscribe to specific topics

```
bch sub node/kitchen/#
```

#### Publish MQTT message on MQTT broker running localhost

```
bch pub node/kitchen/thermometer/0:0/temperature 21.70
```

#### Start pairing mode

```
bch pairing --start
bch -H hub.local pairing --start
```

#### Stop pairing mode

```
bch pairing --stop
bch -H hub.local pairing --stop
```

#### List paired nodes

```
bch node list
```
