---
slug: gateway-service
title: Služba brány
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tento **multiplatformní** nástroj v Pythonu propojuje **rádiovou bránu** s MQTT.
Rádiová brána komunikuje přes virtuální sériový port USB pomocí souborů JSON.

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Abyste mohli službu **Gateway Service** nainstalovat, musíte mít v počítači [**nainstalovaný Python a pip, oba v systémové proměnné PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows).

</TabItem>
<TabItem value="linux" label="Linux">

Abyste mohli službu **Gateway Service** nainstalovat, musíte mít v počítači nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/), oba v systémové proměnné **PATH**.

</TabItem>
<TabItem value="macOS" label="macOS">

Abyste mohli službu **Gateway Service** nainstalovat, musíte mít v počítači nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/), oba v systémové proměnné **PATH**.

</TabItem>
</Tabs>

:::

## Instalace {#installation}

Službu **Gateway Service** nainstalujete tak, že otevřete příkazovou řádku (**CLI**) a spustíte tento příkaz:

:::tip

Stejným příkazem službu **Gateway Service** také aktualizujete na nejnovější verzi.

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

Všechny dostupné příkazy zobrazíte zadáním **`bcg --help`** do příkazové řádky (**CLI**).

<details>
<summary>
<b>
Výstup bcg --help
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
