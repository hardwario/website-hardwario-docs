---
slug: host-management
title: Správa hostitele
description: "Aby to fungovalo, budete potřebovat nainstalovaný a běžící Mosquitto MQTT Broker na svém počítači"
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Aby to fungovalo, budete potřebovat nainstalovaný a běžící Mosquitto MQTT Broker na svém počítači

Jak nainstalovat Mosquitto:
<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Pro instalaci a spuštění mosquitto na systému Windows můžete postupovat podle návodu [**How to Install The Mosquitto MQTT Broker on Windows**](http://www.steves-internet-guide.com/install-mosquitto-broker/)

</TabItem>
<TabItem value="linux" label="Linux">

Pro instalaci a spuštění mosquitto na systému Ubuntu můžete postupovat podle návodu [**Install Mosquitto MQTT Broker On Ubuntu 20.04 Server**](https://www.vultr.com/docs/install-mosquitto-mqtt-broker-on-ubuntu-20-04-server/)

</TabItem>
<TabItem value="macOS" label="macOS">

Na macOS provedete instalaci příkazem:

```
brew install mosquitto
```

Po instalaci je potřeba v terminálu spustit `mosquitto`

</TabItem>
</Tabs>

Dále budete potřebovat [**nainstalovanou a běžící službu Gateway Service**](./gateway-service.md)

:::

Tento **multiplatformní** nástroj v Pythonu slouží k ovládání **rádia** a **uzlů**.

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Abyste mohli získat **Host Management Tool**, potřebujete mít na zařízení [**nainstalovaný Python a pip a v systémové PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows)

</TabItem>
<TabItem value="linux" label="Linux">

Abyste mohli získat **Host Management Tool**, potřebujete mít na zařízení nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/) a mít je v systémové **PATH**

</TabItem>
<TabItem value="macOS" label="macOS">

Abyste mohli získat **Host Management Tool**, potřebujete mít na zařízení nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/) a mít je v systémové **PATH**

</TabItem>
</Tabs>

:::

## Instalace {#installation}

Pro instalaci nástroje **Host Management Tool** stačí otevřít **CLI** vašeho systému a spustit následující příkaz:

:::tip

Stejným příkazem můžete **Host Management Tool** aktualizovat na nejnovější verzi

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

Všechny dostupné příkazy zobrazíte zadáním **`bch --help`** do **CLI**

<details>
<summary>
<b>
výstup bch --help
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

## Příklad použití {#usage-example}

:::info

V dalším terminálu nebo na pozadí je potřeba spustit `mosquitto` a `bcg --device YOUR_RADIO_DONGLE`

:::

#### Přihlášení ke všem MQTT tématům (#) {#subscribe-to-all-mqtt-topics-}

```
bch sub
```

#### Pokud máte [vlastní server](../server-raspberry-pi/index.md), můžete spustit následující příkaz s hostname nebo IP adresou serveru (v příkladu `hub.local`) {#if-you-have-your-own-server-you-can-run-following-command-with-a-server-hostname-or-ip-address-example-is-hublocal}

```
bch -H hub.local sub
```

#### Přihlášení ke konkrétním tématům {#subscribe-to-specific-topics}

```
bch sub node/kitchen/#
```

#### Publikování MQTT zprávy na MQTT brokeru běžícím na localhostu {#publish-mqtt-message-on-mqtt-broker-running-localhost}

```
bch pub node/kitchen/thermometer/0:0/temperature 21.70
```

#### Spuštění režimu párování {#start-pairing-mode}

```
bch pairing --start
bch -H hub.local pairing --start
```

#### Ukončení režimu párování {#stop-pairing-mode}

```
bch pairing --stop
bch -H hub.local pairing --start
```

#### Výpis spárovaných uzlů {#list-paired-nodes}

```
bch node list
```
