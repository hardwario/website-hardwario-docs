---
slug: development-cli-tools
title: Vývoj s nástroji příkazové řádky
description: "Pokud chcete vyvíjet pomocí grafického nástroje, přejděte na kapitolu O aplikaci HARDWARIO Code nebo Rozšíření TOWER VSCode."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Pokud chcete vyvíjet pomocí grafického nástroje, přejděte na kapitolu [**O aplikaci HARDWARIO Code**](./about-hardwario-code.md) nebo [**Rozšíření TOWER VSCode**](./tower-vscode-extension.md).

:::

Tato kapitola se zaměřuje na vývoj firmwaru výhradně pomocí nástrojů příkazové řádky.

:::caution

V této kapitole si projdeme použití několika nástrojů jako **CMake** a **ninja** a také náš nástroj pro nahrávání firmwaru z příkazové řádky. Samostatná kapitola [**Nástroj pro nahrání firmwaru**](../command-line-tools/firmware-tool.md) popisuje, jak jej nainstalovat.

:::

## Instalace {#installation}

Abyste mohli svůj projekt sestavit, budete potřebovat nainstalovat několik nástrojů:

:::note

Všechny musí být v **PATH**.

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- [**bcf**](../command-line-tools/firmware-tool.md)
- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 nebo novější**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**make**](https://www.technewstoday.com/install-and-use-make-in-windows/) (**LEGACY**)

</TabItem>
<TabItem value="linux" label="Linux">

- [**bcf**](../command-line-tools/firmware-tool.md)
- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 nebo novější**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**make**](https://linuxhint.com/install-make-ubuntu/) (**LEGACY**)

</TabItem>
<TabItem value="macOS" label="macOS">

- [**bcf**](../command-line-tools/firmware-tool.md)
- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 nebo novější**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**make**](https://formulae.brew.sh/formula/make) (**LEGACY**)

</TabItem>
</Tabs>

## Vývojový cyklus {#development-cycle}

- Nejprve je potřeba naklonovat některý firmware z [**našeho GitHubu**](https://github.com/hardwario). Pro start z čistého listu je k dispozici firmware [**twr-skeleton**](https://github.com/hardwario/twr-skeleton)
  - Pro naklonování firmwaru použijte:
    ```
    git clone https://github.com/hardwario/twr-skeleton.git --recursive
    ```
    :::note

    Přepínač `--recursive` je potřeba k naklonování všech submodulů, především submodulu SDK.

    :::
- Otevřete projekt ve svém oblíbeném editoru
- Proveďte v kódu nějaké změny
- Spuštěním **CMake** vygenerujte soubory pro sestavení:
  ```
  cmake -B obj/debug . -G Ninja -DTYPE=debug -DCMAKE_TOOLCHAIN_FILE=sdk/toolchain/toolchain.cmake
  ```
- Spuštěním ninja vygenerujte výsledný binární soubor firmwaru:
  ```
  ninja -C obj/debug
  ```
- Nahrajte firmware do svého zařízení pomocí `bcf` (budete vyzváni k výběru zařízení, do kterého chcete firmware nahrát)
  ```
  bcf flash
  ```
- Pokud chcete k zařízení připojit konzoli pro ladění, spusťte `bcf` s přepínačem `--log` nebo jen spusťte `bcf log`:
  ```
  bcf flash --log
  ```
  **NEBO**
  ```
  bcf log
  ```
- Pro vyčištění výstupu, abyste mohli vše zkompilovat od začátku, stačí spustit:
  ```
  ninja -t clean
  ```
- **Tyto kroky opakujte, dokud nezískáte výsledný firmware, který chcete**
