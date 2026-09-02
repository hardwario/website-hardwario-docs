---
slug: about-hardwario-code
title: O aplikaci HARDWARIO Code
description: "Pokud narazíte na potíže s rozšířením nebo přenosnou verzí, dejte nám prosím vědět na našem fóru nebo přímo na GitHubu."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Pokud narazíte na potíže s rozšířením nebo přenosnou verzí, dejte nám prosím vědět na [**našem fóru**](https://forum.hardwario.com/) nebo přímo na [**GitHubu**](https://github.com/hardwario/hardwario-tower-vscode-extension/issues).

:::

Tato kapitola se věnuje aplikaci **HARDWARIO Code**, což je naše mírně upravená verze [**Visual Studio Code**](https://code.visualstudio.com). Obsahuje všechny nástroje, které jsou potřeba k vývoji firmwaru pro HARDWARIO TOWER.

:::note

Pokud už máte **Visual Studio Code** a nechcete instalovat novou verzi, je k dispozici rozšíření, které si můžete nainstalovat.

Všechny potřebné nástroje si budete muset nainstalovat sami; jak na to, se dozvíte v [**kapitole o rozšíření TOWER pro VSCode**](./tower-vscode-extension.md).

:::

## Instalace {#installation}

Verze je k dispozici pro každý hlavní operační systém. Instalace se mírně liší.

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

- Stáhněte si [**instalátor HARDWARIO Code pro Windows**](https://github.com/hardwario/hardwario-code/releases)
- Dokončete instalaci
  :::info

    Při volbě umístění doporučujeme ponechat **výchozí cestu**, která vede do vaší **uživatelské složky AppData** (přenosná verze Visual Studio Code nepodporuje instalaci pro více uživatelů).

  :::
- Na ploše byste měli mít ikonu **HARDWARIO Code**
- Vyčkejte, než se **HARDWARIO Code** otevře
- V bočním panelu byste měli vidět logo HARDWARIO a v horní části okna nápis HARDWARIO Code

</TabItem>
<TabItem value="linux" label="Linux">

- Stáhněte si [**HARDWARIO Code**](https://github.com/hardwario/hardwario-code/releases)
- Rozbalte archiv kamkoli chcete
- Pokud chcete mít k dispozici **zástupce** a nainstalovat **další ovladače**, můžete z rozbalené složky spustit skript `install.sh`
- Spusťte binárku **code** z terminálu nebo najděte **HARDWARIO Code** pomocí vyhledávání
- Vyčkejte, než se **HARDWARIO Code** otevře
- V bočním panelu byste měli vidět logo HARDWARIO a v horní části okna nápis **HARDWARIO Code**

:::info

Možná bude potřeba nainstalovat doplňkovou knihovnu příkazem `sudo apt-get install libncurses*` (pro ladění pomocí JLink).

:::

:::caution

Pokud nemáte v systému nainstalovaný **git**, budete jej muset [**nainstalovat**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), aby rozšíření fungovalo plně.

:::

</TabItem>
<TabItem value="macOS" label="macOS">

- Stáhněte si [**instalační balíček HARDWARIO Code**](https://github.com/hardwario/hardwario-code/releases) pro macOS
  - Je potřeba vybrat správnou verzi pro vaši architekturu
- Spusťte instalátor dvojklikem
- Postupujte podle pokynů instalátoru
- Ve složce ~/Applications svého uživatele byste měli vidět složku **hardwario-code**
- Spusťte `~Applications/hardwario-code/Visual Studio Code`
- Vyčkejte, než se **HARDWARIO Code** otevře
- V bočním panelu byste měli vidět logo HARDWARIO a v horní části okna nápis **HARDWARIO Code**

</TabItem>
</Tabs>

<Image img={require('../../../../../tower/firmware-development/images/hardwario-code.png')} alt="VS Code se zvýrazněnou ikonou HARDWARIO v levém bočním panelu a nápisem HARDWARIO Code v záhlaví okna" />
<br />

:::tip

Nyní můžete začít používat **HARDWARIO Code** k vývoji firmwaru pro HARDWARIO TOWER. Základní informace o používání rozšíření najdete v [**tutoriálu k HARDWARIO Code**](./hardwario-extension-tutorial.md), nebo můžete přejít přímo na **kapitolu s rychlým startem firmwaru**.

:::
