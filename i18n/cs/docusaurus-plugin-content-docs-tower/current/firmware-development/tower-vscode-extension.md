---
slug: tower-vscode-extension
title: Rozšíření TOWER pro VSCode
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Pokud narazíte na potíže s rozšířením nebo přenosnou verzí, dejte nám prosím vědět na [**našem fóru**](https://forum.hardwario.com/) nebo přímo na [**GitHubu**](https://github.com/hardwario/hardwario-tower-vscode-extension/issues).

:::

Tato kapitola se věnuje rozšíření HARDWARIO TOWER pro Visual Studio Code. Aby rozšíření plně fungovalo, musíte si doinstalovat několik nástrojů. Pokud se s tím nechcete zdržovat, nainstalujte si samostatnou aplikaci HARDWARIO Code; jak na to, popisuje kapitola [**O aplikaci HARDWARIO Code**](./about-hardwario-code.md).

## Instalace {#installation}

Rozšíření nainstalujete tak, že otevřete **Visual Studio Code**, přejdete na záložku rozšíření v levém panelu, do vyhledávacího pole napíšete `HARDWARIO TOWER` a u prvního nalezeného rozšíření kliknete na **Install**.

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

Aby rozšíření fungovalo, jak má, potřebuje několik závislostí:

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
  - Nainstalujte si git a složku `\usr\bin\` přidejte do proměnné PATH. Cesta ke složce by měla vypadat přibližně takto: `C:\Program Files\Git\usr\bin\`

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

Teď už můžete ve **Visual Studio Code** vyvíjet firmware pro HARDWARIO TOWER. Základy práce s rozšířením popisuje [**Návod k rozšíření TOWER**](./hardwario-extension-tutorial.md), případně rovnou přejděte na kapitolu **Rychlý start s firmwarem**.

:::
