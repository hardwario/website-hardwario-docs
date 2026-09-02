---
slug: tower-vscode-extension
title: Rozšíření TOWER pro VSCode
description: "Pokud narazíte na jakékoli problémy nebo potíže s rozšířením či přenosnou verzí, dejte nám vědět na našem fóru nebo přímo na GitHubu."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Pokud narazíte na jakékoli problémy nebo potíže s rozšířením či přenosnou verzí, dejte nám vědět na [**našem fóru**](https://forum.hardwario.com/) nebo přímo na [**GitHubu**](https://github.com/hardwario/hardwario-tower-vscode-extension/issues).

:::

Tato kapitola se věnuje rozšíření HARDWARIO TOWER pro Visual Studio Code. Aby rozšíření fungovalo plně, budete si muset nainstalovat několik nástrojů. Pokud se s tím nechcete zdržovat, můžete si nainstalovat samostatnou aplikaci HARDWARIO Code — jak na to, se dozvíte v kapitole [**O aplikaci HARDWARIO Code**](./about-hardwario-code.md).

## Instalace {#installation}

Rozšíření nainstalujete tak, že otevřete **Visual Studio Code**, přejdete na kartu rozšíření v levém panelu, do vyhledávacího pole napíšete `HARDWARIO TOWER` a u prvního nalezeného rozšíření kliknete na **Install**.

:::tip

Po chvíli by mělo být rozšíření nainstalované a připravené k použití.

:::

<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('../../../../../tower/firmware-development/images/extension-install-guide.png')} alt="Marketplace rozšíření ve VS Code s vyhledaným rozšířením HARDWARIO TOWER připraveným k instalaci" /></div>
    </div>
    <div class="col col--4">
    </div>
  </div>
</div>

### Nastavení nástrojů {#tools-setup}

Aby rozšíření fungovalo tak, jak má, budete potřebovat několik závislostí:

:::tip

Rozšíření vás upozorní, že některé z nich chybí, a v pravém dolním rohu vám nabídne odpovídající odkaz.

:::

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 nebo novější**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **Linuxové příkazy**
  - Na počítač musíte nainstalovat git a poté přidat složku `\usr\bin\` do PATH. Cesta ke složce by měla vypadat přibližně takto: `C:\Program Files\Git\usr\bin\`

</TabItem>
<TabItem value="linux" label="Linux">

- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 nebo novější**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

</TabItem>
<TabItem value="macOS" label="macOS">

- [**CMake**](https://cmake.org/install/)
- [**Ninja**](https://github.com/ninja-build/ninja/releases)
- [**arm-none-eabi-gcc 12.2 nebo novější**](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)
- [**git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

</TabItem>
</Tabs>

:::tip

Nyní můžete začít používat **Visual Studio Code** pro vývoj firmwaru HARDWARIO TOWER. Základní informace o práci s rozšířením najdete v [**tutoriálu k aplikaci HARDWARIO Code**](./hardwario-extension-tutorial.md), případně můžete přejít přímo na kapitolu **Rychlý start s firmwarem**.

:::
