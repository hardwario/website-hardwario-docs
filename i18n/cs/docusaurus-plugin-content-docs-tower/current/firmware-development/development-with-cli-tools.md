---
slug: development-cli-tools
title: Vývoj s nástroji příkazové řádky
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Pokud chcete vyvíjet v grafickém nástroji, přejděte na kapitolu [**O aplikaci HARDWARIO Code**](./about-hardwario-code.md) nebo [**Rozšíření TOWER pro VSCode**](./tower-vscode-extension.md).

:::

Tato kapitola popisuje vývoj firmwaru výhradně pomocí nástrojů příkazové řádky.

:::caution

Kapitola pracuje s několika nástroji, například **CMake** a **ninja**, a také s naším nástrojem pro nahrávání firmwaru z příkazové řádky. Jak ho nainstalovat, popisuje samostatná kapitola [**Nástroj pro nahrávání firmwaru**](../command-line-tools/firmware-tool.md).

:::

## Instalace {#installation}

K sestavení projektu musíte nainstalovat několik nástrojů:

:::note

Všechny musí být v proměnné **PATH**.

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

- Nejdřív naklonujte některý firmware z [**našeho GitHubu**](https://github.com/hardwario). Pro začátek od nuly je připravený firmware [**twr-skeleton**](https://github.com/hardwario/twr-skeleton)
  - Firmware naklonujete příkazem:
    ```
    git clone https://github.com/hardwario/twr-skeleton.git --recursive
    ```
    :::note

    Přepínač `--recursive` je potřeba k naklonování všech submodulů, především submodulu SDK.

    :::
- Otevřete projekt ve svém oblíbeném editoru
- Upravte kód
- Spuštěním **CMake** vygenerujte soubory pro sestavení:
  ```
  cmake -B obj/debug . -G Ninja -DTYPE=debug -DCMAKE_TOOLCHAIN_FILE=sdk/toolchain/toolchain.cmake
  ```
- Nástrojem ninja vygenerujte výsledný binární soubor firmwaru:
  ```
  ninja -C obj/debug
  ```
- Nahrajte firmware do zařízení nástrojem `bcf` (nástroj se zeptá, do kterého zařízení má firmware nahrát)
  ```
  bcf flash
  ```
- Pokud chcete k zařízení kvůli debugování připojit konzoli, spusťte `bcf` s přepínačem `--log`, nebo jen `bcf log`:
  ```
  bcf flash --log
  ```
  **NEBO**
  ```
  bcf log
  ```
- Výstup sestavení vyčistíte, abyste mohli vše zkompilovat znovu od začátku, tímto příkazem:
  ```
  ninja -t clean
  ```
- **Tyto kroky opakujte, dokud nezískáte výsledný firmware, který chcete**
