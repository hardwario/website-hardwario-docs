---
slug: advanced-debugging
title: Pokročilé debugování
description: "Tato kapitola se věnuje debugování pomocí JLink, pokud jej nemáte, můžete vždy debugovat pomocí výpisů do konzole."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

Tato kapitola se věnuje debugování pomocí [**JLink**](https://www.segger.com/products/debug-probes/j-link/), pokud jej nemáte, můžete vždy [**debugovat pomocí výpisů do konzole**](./firmware-debugging.md).

:::

Pokud máte [**sondu JLink**](https://www.segger.com/products/debug-probes/j-link/), můžete pomocí ní debugovat svůj firmware s využitím HARDWARIO Code nebo rozšíření pro Visual Studio Code. Nejprve je potřeba rozšíření nainstalovat, k tomu máme [**speciální kapitolu v této dokumentaci**](./about-hardwario-code.md).

Mezi instalací s portable verzí a samostatným rozšířením je malý rozdíl.

## Debugování s portable verzí {#debugging-with-portable-version}

Pokud jste si stáhli [**HARDWARIO Code**](./about-hardwario-code.md#installation), měli byste mít všechny potřebné závislosti ve složce `/data` (Windows/Linux) nebo `code-portable-data` (macOS).

:::info

Jediné, co je potřeba nainstalovat, jsou ovladače JLink, pokud je ještě nemáte.

:::

### Instalace ovladačů {#driver-installation}

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

Přejděte do `%USERPROFILE%/AppData/Local/Programs/HARDWARIO Code/data/tower/toolchain/SEGGER/JLink/USBDriver/` a spusťte binárku `InstDrivers.exe`.

Poté byste měli mít vše připravené.

</TabItem>
<TabItem value="linux" label="Linux">

Pro funkčnost sondy **JLink** je potřeba aktualizovat **pravidla UDEV**. Stačí zkopírovat příkaz níže a nahradit `PATH_TO_HARDWARIO_CODE` skutečnou cestou ke složce `harwdario-code`.

```bash
sudo cp PATH_TO_HARDWARIO_CODE/hardwario-code/data/tower/toolchain/SEGGER/JLink/99-jlink.rules /etc/udev/rules.d/99-jlink.rule
```

:::info

Po vykonání příkazu je potřeba sondu JLink odpojit a znovu připojit a restartovat systém.

Poté byste měli být schopni začít debugovat pomocí JLink.

:::

</TabItem>
<TabItem value="macOS" label="macOS">

Na macOS by měla být sonda JLink detekována automaticky.

Nejsou potřeba žádné další kroky.

</TabItem>
</Tabs>

## Debugování s rozšířením pro Visual Studio Code {#debugging-with-visual-studio-code-extension}

Pokud jste se rozhodli používat vlastní **Visual Studio Code** s [**naším nainstalovaným rozšířením**](./tower-vscode-extension.md), musíte postupovat podle [**instalace JLink pro váš systém**](https://eclipse-embed-cdt.github.io/debug/jlink/install/).
