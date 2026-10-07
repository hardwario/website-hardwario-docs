---
slug: advanced-debugging
title: Pokročilé debugování
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

Tato kapitola se věnuje debugování se sondou [**JLink**](https://www.segger.com/products/debug-probes/j-link/). Pokud ji nemáte, můžete vždycky [**debugovat pomocí výpisů do konzole**](./firmware-debugging.md).

:::

Pokud máte [**sondu JLink**](https://www.segger.com/products/debug-probes/j-link/), můžete s ní debugovat svůj firmware v HARDWARIO Code nebo v rozšíření pro Visual Studio Code. Rozšíření je nejdřív potřeba nainstalovat; popisuje to [**samostatná kapitola této dokumentace**](./about-hardwario-code.md).

Postup se trochu liší podle toho, jestli používáte přenosnou verzi, nebo samostatné rozšíření.

## Debugování s přenosnou verzí {#debugging-with-portable-version}

Pokud jste si stáhli [**HARDWARIO Code**](./about-hardwario-code.md#installation), měli byste mít všechny potřebné závislosti ve složce `/data` (Windows/Linux) nebo `code-portable-data` (macOS).

:::info

Nainstalovat musíte jen ovladače JLink, pokud je ještě nemáte.

:::

### Instalace ovladačů {#driver-installation}

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Přejděte do `%USERPROFILE%/AppData/Local/Programs/HARDWARIO Code/data/tower/toolchain/SEGGER/JLink/USBDriver/` a spusťte program `InstDrivers.exe`.

Pak je vše připravené.

</TabItem>
<TabItem value="linux" label="Linux">

Aby sonda **JLink** fungovala, musíte aktualizovat **pravidla UDEV**. Zkopírujte příkaz níže a `PATH_TO_HARDWARIO_CODE` nahraďte skutečnou cestou ke složce `hardwario-code`.

```bash
sudo cp PATH_TO_HARDWARIO_CODE/hardwario-code/data/tower/toolchain/SEGGER/JLink/99-jlink.rules /etc/udev/rules.d/99-jlink.rule
```

:::info

Po spuštění příkazu sondu JLink odpojte, znovu připojte a restartujte systém.

Pak už můžete začít debugovat se sondou JLink.

:::

</TabItem>
<TabItem value="macOS" label="macOS">

V macOS by se sonda JLink měla rozpoznat automaticky.

Žádné další kroky nejsou potřeba.

</TabItem>
</Tabs>

## Debugování s rozšířením pro Visual Studio Code {#debugging-with-visual-studio-code-extension}

Pokud jste se rozhodli používat vlastní **Visual Studio Code** s [**naším rozšířením**](./tower-vscode-extension.md), nainstalujte JLink podle [**návodu pro svůj systém**](https://eclipse-embed-cdt.github.io/debug/jlink/install/).
