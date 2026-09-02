---
slug: firmware-tool
title: Nástroj pro nahrávání firmwaru
description: "Tento multiplatformní Python nástroj umí nahrát firmware do zařízení Radio Dongle a Core Module, a to buď z lokálního binárního souboru, nebo z posledního vydaného firmwaru z našeho GitHubu."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tento **multiplatformní** Python nástroj umí nahrát firmware do zařízení [**Radio Dongle**](../hardware-modules/about-radio-dongle.md) a [**Core Module**](../hardware-modules/about-core-module.md), a to buď z lokálního binárního souboru, nebo z posledního vydaného firmwaru z [**našeho GitHubu**](https://github.com/orgs/hardwario/repositories?q=twr-&type=all&language=&sort=).

:::caution

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Abyste mohli **Nástroj pro nahrávání firmwaru** získat, musíte mít na svém zařízení [**nainstalovaný Python a pip a mít je v systémové PATH**](https://www.tutorialspoint.com/how-to-install-python-in-windows)

</TabItem>
<TabItem value="linux" label="Linux">

Abyste mohli **Nástroj pro nahrávání firmwaru** získat, musíte mít na svém zařízení nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-linux/) a mít je v systémové **PATH**

</TabItem>
<TabItem value="macOS" label="macOS">

Abyste mohli **Nástroj pro nahrávání firmwaru** získat, musíte mít na svém zařízení nainstalovaný [**Python**](https://www.python.org/downloads/) a [**pip**](https://www.geeksforgeeks.org/how-to-install-pip-in-macos/) a mít je v systémové **PATH**

</TabItem>
</Tabs>

:::

## Instalace {#installation}

Pro instalaci **Nástroje pro nahrávání firmwaru** stačí otevřít **CLI** vašeho systému a spustit následující příkaz:

:::tip

Stejný příkaz můžete použít i pro aktualizaci **Nástroje pro nahrávání firmwaru** na nejnovější verzi

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

Automatické doplňování můžete zapnout přidáním tohoto řádku do **`~/.bashrc`**

```bash
eval "$(_BCF_COMPLETE=source bcf)"
```

A poté **`~/.bashrc`** znovu načtěte pomocí:

```bash
source ~/.bashrc
```

Díky tomu můžete pro doplňování příkazů **Nástroje pro nahrávání firmwaru** používat klávesu **TAB**

</TabItem>
<TabItem value="macOS" label="macOS">

```bash
pip install --upgrade --no-cache-dir bcf
```

</TabItem>
</Tabs>

:::tip

Všechny dostupné příkazy zobrazíte zadáním **`bcf --help`** do svého **CLI**

<details>
<summary>
<b>
Výstup bcf --help
</b>
</summary>
<p>

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

</p>
</details>

:::

## Ukázka pracovního postupu {#workflow-example}

#### Aktualizace seznamu firmwaru z [našeho GitHubu](https://github.com/orgs/hardwario/repositories?q=twr-&type=all&language=&sort=) {#update-the-list-of-firmware-from-our-github}

```bash
bcf update
```

#### Výpis veškerého firmwaru {#list-all-firmware}

```bash
bcf list
```

#### Vyhledání konkrétního firmwaru {#search-for-specific-firmware}

:::info

Získáte veškerý firmware, který obsahuje hledaný výraz

:::

```bash
bcf search button
```

#### Nahrání firmwaru do zařízení {#flash-firmware-to-the-device}

:::info

Budete vyzváni k výběru zařízení, do kterého se má firmware nahrát

:::

```bash
bcf flash hardwario/twr-radio-push-button:latest
```

:::tip

Pokud nahráváte firmware několikrát za sebou, můžete použít přepínač **`--device`** a přeskočit tak výzvu k výběru zařízení pokaždé znovu

```bash
bcf flash --device /dev/ttyUSB0 hardwario/twr-radio-push-button:latest
```

:::

## Více o Nástroji pro nahrávání firmwaru {#more-about-firmware-flashing-tool}

**Nástroj pro nahrávání firmwaru** můžete použít i k výpisu logovacích zpráv ze zařízení. Více informací najdete v kapitole [**Vývoj pomocí nástrojů příkazové řádky**](../firmware-development/development-with-cli-tools.md).
