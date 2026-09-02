---
slug: firmware-quick-start
title: Rychlý start s firmwarem
description: "Vlastní firmware pro TOWER Core Module můžete snadno upravovat nebo vytvářet na každém hlavním operačním systému."
---
import Image from '@theme/IdealImage';

Vlastní firmware pro [**TOWER Core Module**](../hardware-modules/about-core-module.md) můžete snadno upravovat nebo vytvářet na každém hlavním operačním systému.

## Získání prvního firmwaru TOWER {#getting-your-first-tower-firmware}

:::tip

Pokud se k projektu vracíte, použijte ve VSCode volbu **Open folder**. Přejděte na `File -> Open Folder...` nebo použijte `Ctrl + K` a pak `Ctrl + O`.

:::

- Otevřete **VSCode** a klikněte na **ikonu HARDWARIO** v levém panelu

<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('../../../../../tower/firmware-development/images/hardwario-code-sidebar-icon.png')} alt="Levý panel VS Code se šipkou ukazující na ikonu HARDWARIO" /></div>
    </div>
    <div class="col col--4">
    </div>
  </div>
</div>

- V sekci **TOWER: Start** vyberte **From Skeleton Project...**
- Vyberte **složku**, ve které se má vytvořit nová složka s projektem firmwaru
- Budete vyzváni k pojmenování složky, výchozí **twr-skeleton** je zatím dostačující
- Vyčkejte, než se firmware dokončí stahovat
- Visual Studio Code se znovu otevře s novým firmwarem

:::info

Firmware si můžete stáhnout také pomocí **příkazu git**.

```bash
git clone --recursive https://github.com/hardwario/twr-skeleton.git
```

:::

:::tip

Místo **From Skeleton Project...** můžete vybrat **From Existing Project...** a naklonovat tak jakýkoliv jiný projekt z [**GitHubu**](https://github.com/hardwario).

:::

## Struktura projektu {#project-structure}

Toto je struktura souborů **projektu twr-skeleton**, který jste právě naklonovali. Jde o repozitář inicializovaný v Gitu, připravený k použití *bez dalších úprav*.

Tento projekt lze okamžitě **zkompilovat a nahrát** do [**Core Module**](../hardware-modules/about-core-module.md) nebo [**Radio Dongle**](../hardware-modules/about-core-module.md)

```
.
├── .git
│   └── ...skipped
├── .github
│   └── CI files, you can put some workflow for GitHub Actions here
├── .vscode
│   └── ...skipped
├── sdk
│   └── a lot of files (mostly not important for normal user)
├── src
│   └── application.c
|   └── application.h
|   └── CMakeLists.txt
├── .editorconfig
├── .gitignore
├── .gitmodules
├── CMakeLists.txt
├── LICENSE
└── README.md
```

Místo, kde byste měli upravovat svůj kód, je adresář `src`.
Obvykle nebudete potřebovat upravovat jiné soubory než tyto.

Vaším prvním krokem tedy bude nejspíš otevření souboru src/application.c.

:::note

Pokud používáte [**rozšíření HARDWARIO Code pro Visual Studio Code**](./about-hardwario-code.md), soubor `src/application.c` se otevře automaticky.

:::

:::info

Pokud si chcete prohlédnout nějaké příklady firmwaru, můžete navštívit náš repozitář na [**GitHubu**](https://github.com/hardwario) nebo některou z **kapitol How to:** v [**sekci Firmware SDK**](../firmware-sdk/index.md).

:::

## Vývojový cyklus {#development-cycle}

Vývojový cyklus je běžně opakováním **následujících 4 kroků**.

- Upravte `src/application.c` a uložte změny pomocí **Ctrl + S**
- Klikněte na [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console) pro **kompilaci**, **nahrání** a **otevření sériové konzole pro logování**.
  - Můžete také pracovat s [**CLI Tools**](./development-with-cli-tools.md)
- Otestujte svůj firmware
  - Pokud potřebujete svoji aplikaci debugovat, postupujte podle [**kapitoly Debugování**](./firmware-debugging.md).

## Programovací jazyk {#programming-language}

Firmware je implementován v **čistém jazyce C**, což je průmyslově uznávaný jazyk pro embedded zařízení a zařízení s nízkou spotřebou.

Pro volbu této technologie existují následující hlavní důvody.

- Efektivní využití hardwarových prostředků
- Stabilní a dlouhodobě dostupné vývojové prostředí
- Jednoduchá a pochopitelná syntaxe

Můžete používat všechny známé struktury jazyka C a také [**naše SDK**](../firmware-sdk/index.md), které je implementováno tak, abyste mohli rychle a snadno, bez jakýchkoliv problémů s kompatibilitou, vytvořit svůj vlastní firmware.

## Řešení problémů {#troubleshooting}

Pokud se vám nedaří detekovat nebo naprogramovat **Radio Dongle** nebo **Core Module**, může jít o problém s ovladači nebo operačním systémem. Podle svého systému můžete vyzkoušet některá řešení

- Na **Windows** a **macOS** nainstalujte [**FTDI VCP ovladače**](https://ftdichip.com/drivers/vcp-drivers/)
- Na **Ubuntu** musíte být v uživatelské skupině `dialout`. Použijte příkaz `sudo usermod -a -G dialout $USER` a restartujte počítač

## Další kroky {#next-steps}

Od této chvíle byste měli být schopni **vytvářet firmware** a **aktualizovat existující**.

Pokud chcete vědět více o našich modulech a podívat se na příklady, přečtěte si sekci [**Hardwarové moduly**](../hardware-modules/index.md) nebo [**sekci Firmware SDK**](../firmware-sdk/index.md)
