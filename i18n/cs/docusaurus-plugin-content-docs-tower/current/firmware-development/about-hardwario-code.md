---
slug: about-hardwario-code
title: O aplikaci HARDWARIO Code
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Pokud narazíte na potíže s rozšířením nebo přenosnou verzí, dejte nám prosím vědět na [**našem fóru**](https://forum.hardwario.com/) nebo přímo na [**GitHubu**](https://github.com/hardwario/hardwario-tower-vscode-extension/issues).

:::

Tato kapitola se věnuje aplikaci **HARDWARIO Code**, naší mírně upravené verzi editoru [**Visual Studio Code**](https://code.visualstudio.com). Obsahuje všechny nástroje potřebné k vývoji firmwaru pro HARDWARIO TOWER.

:::note

Pokud už **Visual Studio Code** máte a nechcete instalovat novou verzi, můžete si do něj nainstalovat rozšíření.

Všechny potřebné nástroje si pak ale musíte nainstalovat sami; jak na to, popisuje [**kapitola Rozšíření TOWER pro VSCode**](./tower-vscode-extension.md).

:::

## Instalace {#installation}

K dispozici je verze pro každý hlavní operační systém, instalace se mezi nimi mírně liší.

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- Stáhněte si [**instalátor HARDWARIO Code pro Windows**](https://github.com/hardwario/hardwario-code/releases)
- Projděte instalačním průvodcem
  :::info

    Při volbě umístění doporučujeme ponechat **výchozí cestu**, která vede do vaší **uživatelské složky AppData** (přenosná verze Visual Studio Code nepodporuje instalaci pro více uživatelů).

  :::
- Na ploše byste měli mít ikonu **HARDWARIO Code**
- Počkejte, až se **HARDWARIO Code** otevře
- V bočním panelu byste měli vidět logo HARDWARIO a v horní části okna nápis HARDWARIO Code

</TabItem>
<TabItem value="linux" label="Linux">

- Stáhněte si [**HARDWARIO Code**](https://github.com/hardwario/hardwario-code/releases)
- Rozbalte archiv, kam chcete
- Pokud chcete mít k dispozici **zástupce** a nainstalovat **další ovladače**, můžete z rozbalené složky spustit skript `install.sh`
- Spusťte z terminálu binární soubor **code**, nebo **HARDWARIO Code** najděte přes vyhledávání
- Počkejte, až se **HARDWARIO Code** otevře
- V bočním panelu byste měli vidět logo HARDWARIO a v horní části okna nápis **HARDWARIO Code**

:::info

Možná bude potřeba doinstalovat knihovnu příkazem `sudo apt-get install libncurses*` (pro debugování se sondou JLink).

:::

:::caution

Pokud nemáte v systému nainstalovaný **git**, musíte ho [**nainstalovat**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), aby rozšíření plně fungovalo.

:::

</TabItem>
<TabItem value="macOS" label="macOS">

- Stáhněte si [**instalační balíček HARDWARIO Code**](https://github.com/hardwario/hardwario-code/releases) pro macOS
  - Vyberte verzi pro architekturu svého počítače
- Spusťte instalátor dvojklikem
- Postupujte podle pokynů instalátoru
- Ve složce ~/Applications ve svém uživatelském adresáři byste měli najít složku **hardwario-code**
- Spusťte `~Applications/hardwario-code/Visual Studio Code`
- Počkejte, až se **HARDWARIO Code** otevře
- V bočním panelu byste měli vidět logo HARDWARIO a v horní části okna nápis **HARDWARIO Code**

</TabItem>
</Tabs>

<Image img={require('../../../../../tower/firmware-development/images/hardwario-code.png')} alt="VS Code se zvýrazněnou ikonou HARDWARIO v levém bočním panelu a nápisem HARDWARIO Code v záhlaví okna" />
<br />

:::tip

Teď už můžete v **HARDWARIO Code** vyvíjet firmware pro HARDWARIO TOWER. Základy práce s rozšířením popisuje [**Návod k rozšíření TOWER**](./hardwario-extension-tutorial.md), případně rovnou přejděte na **kapitolu Rychlý start s firmwarem**.

:::
