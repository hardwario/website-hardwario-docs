---
slug: gateway-service
title: Gateway Service
description: "Tento multiplatformní nástroj v Pythonu propojuje rádiovou bránu s MQTT."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tento **multiplatformní** nástroj v Pythonu propojuje **rádiovou bránu** s MQTT.
Rádiová brána komunikuje přes virtuální USB sériový port pomocí souborů JSON.

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

## Instalace {#installation}

Pro instalaci **Gateway Service** stačí otevřít **CLI** vašeho systému a spustit následující příkaz:

:::tip

Stejný příkaz můžete použít i k aktualizaci **Gateway Service** na nejnovější verzi

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

Seznam všech dostupných příkazů získáte zadáním **`bcg --help`** do svého **CLI**

<details>
<summary>
<b>
výstup bcg --help
</b>
</summary>
<p>

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

</p>
</details>

:::

## Příklad použití {#usage-example}
