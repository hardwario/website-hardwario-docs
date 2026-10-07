---
slug: firmware-quick-start
title: Rychlý start s firmwarem
---
import Image from '@theme/IdealImage';

Vlastní firmware pro modul [**TOWER Core Module**](../hardware-modules/about-core-module.md) můžete snadno upravovat nebo vytvářet ve všech běžných operačních systémech.

## Získání prvního firmwaru TOWER {#getting-your-first-tower-firmware}

:::tip

Pokud se k projektu vracíte, použijte ve VSCode volbu **Open folder**. Zvolte `File -> Open Folder...` nebo stiskněte `Ctrl + K` a pak `Ctrl + O`.

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
- Zadejte název složky; výchozí **twr-skeleton** zatím stačí
- Počkejte, až se firmware stáhne
- Visual Studio Code se znovu otevře s novým firmwarem

:::info

Firmware můžete stáhnout i **příkazem git**.

```bash
git clone --recursive https://github.com/hardwario/twr-skeleton.git
```

:::

:::tip

Místo **From Skeleton Project...** můžete vybrat **From Existing Project...** a naklonovat tak jakýkoli jiný projekt z [**GitHubu**](https://github.com/hardwario).

:::

## Struktura projektu {#project-structure}

Toto je struktura souborů **projektu twr-skeleton**, který jste právě naklonovali. Jde o repozitář inicializovaný v Gitu, připravený k použití *bez dalších úprav*.

Projekt můžete hned **zkompilovat a nahrát** do modulu [**Core Module**](../hardware-modules/about-core-module.md) nebo do zařízení [**Radio Dongle**](../hardware-modules/about-radio-dongle.md).

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

Svůj kód upravujte v adresáři `src`.
Jiné soubory obvykle upravovat nemusíte.

Nejspíš tedy nejdřív otevřete soubor src/application.c.

:::note

Pokud používáte [**rozšíření HARDWARIO Code pro Visual Studio Code**](./about-hardwario-code.md), soubor `src/application.c` se otevře automaticky.

:::

:::info

Příklady firmwaru najdete v našich repozitářích na [**GitHubu**](https://github.com/hardwario) nebo v kapitolách **„Jak na:“** v [**sekci Firmware SDK**](../firmware-sdk/index.md).

:::

## Vývojový cyklus {#development-cycle}

Vývojový cyklus obvykle spočívá v opakování **těchto 3 kroků**:

- Upravte `src/application.c` a uložte změny pomocí **Ctrl + S**
- Kliknutím na [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console) firmware **zkompilujete**, **nahrajete** a **otevřete sériovou konzoli s logem**.
  - Můžete také pracovat s [**CLI Tools**](./development-with-cli-tools.md)
- Otestujte svůj firmware
  - Pokud potřebujete svoji aplikaci debugovat, postupujte podle [**kapitoly Debugování**](./firmware-debugging.md).

## Programovací jazyk {#programming-language}

Firmware je napsaný v **čistém jazyce C**, který se v průmyslu běžně používá pro embedded zařízení a zařízení s nízkou spotřebou.

Tuto technologii jsme zvolili z těchto hlavních důvodů:

- Efektivní využití hardwarových prostředků
- Stabilní a dlouhodobě dostupné vývojové prostředí
- Jednoduchá a pochopitelná syntaxe

Můžete používat všechny známé konstrukce jazyka C a také [**naše SDK**](../firmware-sdk/index.md), se kterým vlastní firmware vytvoříte rychle, snadno a bez problémů s kompatibilitou.

## Řešení problémů {#troubleshooting}

Pokud počítač nerozpozná **Radio Dongle** nebo **Core Module**, nebo do nich nejde nahrát firmware, může jít o problém s ovladači nebo operačním systémem. Vyzkoušejte řešení pro svůj systém:

- Ve **Windows** a **macOS** nainstalujte [**ovladače FTDI VCP**](https://ftdichip.com/drivers/vcp-drivers/)
- V **Ubuntu** musíte být ve skupině uživatelů `dialout`. Spusťte příkaz `sudo usermod -a -G dialout $USER` a restartujte počítač

## Další kroky {#next-steps}

Teď už byste měli umět **vytvářet firmware** a **aktualizovat ten stávající**.

Více o našich modulech i příklady najdete v sekci [**Hardwarové moduly**](../hardware-modules/index.md) nebo v [**sekci Firmware SDK**](../firmware-sdk/index.md).
