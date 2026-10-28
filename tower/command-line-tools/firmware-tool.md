---
slug: firmware-tool
title: Firmware Flashing Tool
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This **multi-platform** Python tool can flash [**Radio Dongle**](../hardware-modules/about-radio-dongle.md) and [**Core Module**](../hardware-modules/about-core-module.md) with local binary or the latest released firmware from [**our GitHub**](https://github.com/orgs/hardwario/repositories?q=twr-&type=all&language=&sort=).

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

You need [**Python and pip installed and in system PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows) on your device for you to be able to get the **Firmware Flashing Tool**

</TabItem>
<TabItem value="linux" label="Linux">

You need [**Python**](https://www.python.org/downloads/) and [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/) installed and in system **PATH** on your device for you to be able to get the **Firmware Flashing Tool**

</TabItem>
<TabItem value="macOS" label="macOS">

You need [**Python**](https://www.python.org/downloads/) and [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/) installed and in system **PATH** on your device for you to be able to get the **Firmware Flashing Tool**

</TabItem>
</Tabs>

:::

## Installation

To install the **Firmware Flashing Tool** you just need to open your systems **CLI** and run the following command:

:::tip

You can use the same command to upgrade **Firmware Flashing Tool** to the latest version

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

```bash
pip install --upgrade --no-cache-dir bcf
```

</TabItem>
<TabItem value="linux" label="Linux">

```bash
sudo pip install --upgrade --no-cache-dir bcf
```

You can also turn on autocomplete by adding this line to **`~/.bashrc`**

```bash
eval "$(_BCF_COMPLETE=source bcf)"
```

And then reload **`~/.bashrc`** by:

```bash
source ~/.bashrc
```

Thanks to this, you can use a **TAB key** to autocomplete commands for **Firmware Flashing Tool**

</TabItem>
<TabItem value="macOS" label="macOS">

```bash
pip install --upgrade --no-cache-dir bcf
```

</TabItem>
</Tabs>

:::tip

To get all available commands just type **`bcf --help`** to your **CLI**

<details>
<summary>
<b>
bcf --help output
</b>
</summary>

  ``` showLineNumbers
  Usage: bcf [OPTIONS] COMMAND [ARGS]...

  HARDWARIO Firmware Tool.

  Options:
  -d, --device TEXT  Device path.
  --version          Show the version and exit.
  --help             Show this message and exit.

  Commands:
  clean    Clean cache.
  create   Create new firmware.
  devices  Print available devices.
  eeprom   Work with EEPROM.
  flash    Flash firmware.
  help     Show help.
  list     List firmware.
  log      Show log.
  pull     Pull firmware to cache.
  read     Download firmware to file.
  reset    Reset core module.
  search   Search in firmware names and descriptions.
  source   Firmware source.
  test     Test firmware source.
  update   Update list of available firmware.
  ```

</details>

:::

## Workflow Example

#### Update the list of firmware from [our GitHub](https://github.com/orgs/hardwario/repositories?q=twr-&type=all&language=&sort=)

```bash
bcf update
```

#### List all firmware

```bash
bcf list
```

#### Search for specific firmware

:::info

You will get all firmware with the search term in it

:::

```bash
bcf search button
```

#### Flash firmware to the device

:::info

You will be prompted to select to which device should the firmware be flashed

:::

```bash
bcf flash hardwario/twr-radio-push-button:latest
```

:::tip

If you are flashing multiple times in a row you can use a **`--device`** flag to skip the prompt for selecting the device every time

```bash
bcf flash --device /dev/ttyUSB0 hardwario/twr-radio-push-button:latest
```

:::

## More About Firmware Flashing Tool

You can use **Firmware Flashing Tool** for logging messages from the device. Visit [**Development With Command Line Tools chapter**](../firmware-development/development-with-cli-tools.md) to get more info about this.






