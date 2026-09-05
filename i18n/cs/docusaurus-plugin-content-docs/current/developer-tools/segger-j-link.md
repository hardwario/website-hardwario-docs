---
slug: segger-j-link
title: SEGGER J-Link
description: "Tento článek poskytuje informace o debuggeru SEGGER J-Link."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SEGGER J-Link {#segger-j-link}

Tento článek poskytuje informace o debuggeru **SEGGER J-Link**.

## Požadavky {#requirements}

Budete potřebovat následující hardwarové a softwarové nástroje:

* Jeden z těchto operačních systémů:

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12 (s nainstalovaným Homebrew)
  * Windows 10 / Windows 11

* Distribuci **Python 3** nainstalovanou ve vašem systému:

  <Tabs groupId="operating-system">
  <TabItem value="windows" label="Windows" default>

  Stáhněte si nejnovější stabilní instalátor z [**tohoto odkazu**](https://www.python.org/downloads/windows/).

  :::caution

  V instalátoru zaškrtněte **_Add Python x.x to PATH_**, aby byl spustitelný soubor Pythonu dostupný z jakéhokoli umístění.

  :::

  </TabItem>
  <TabItem value="linux" label="Linux">

  Spusťte tento příkaz v aplikaci **Terminál**:

  ```
  sudo apt install python3
  ```

  </TabItem>
  <TabItem value="macOS" label="macOS">

  Spusťte tento příkaz v aplikaci **Terminál**:

  ```
  brew install python3
  ```

  </TabItem>
  </Tabs>

* Zařízení **HARDWARIO CHESTER** (bude potřeba otevřít horní kryt krabičky se šesti šrouby)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového SWD adaptéru + plochého kabelu)

  :::tip

  **HARDWARIO** dodává **SEGGER J-Link** + veškeré potřebné příslušenství na vyžádání.

  :::

* Micro-USB kabel s odpovídajícím typem konektoru pro váš počítač

  :::danger

  Některé Micro-USB kabely poskytují pouze napájení a žádné datové signály. Pokud spojení mezi J-Link a vaším systémem nefunguje, zkontrolujte v první řadě typ kabelu.

  :::

* Python aplikační balík **HARDWARIO Command Line Tools**

## Instalace {#instalation}

**HARDWARIO Command Line Tools** můžete nainstalovat těmito kroky:

1. Pouze na Windows: nainstalujte ovladače SEGGER J-Link:

   * Stáhněte [**64bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)

   * Stáhněte [**32bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows.exe)

   * Stáhněte [**64bitový instalátor ARM**](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

   :::caution

   Pokud narazíte na **_An error was reported by NRFJPROG DLL: -101 JLINKARM_DLL_COULD_NOT_BE_OPENED_**, navštivte [tuto](/chester/firmware-sdk/installation-on-ubuntu/#set-up-device-rules) stránku.

   :::

1. Otevřete aplikaci **Terminál** (Ubuntu nebo macOS) nebo **Příkazový řádek** (Windows).

1. Inicializujte virtuální prostředí Pythonu:

   ```
   python3 -m venv hardwario-venv
   ```

1. Aktivujte virtuální prostředí Pythonu:

   ```
   source hardwario-venv/bin/activate
   ```

   :::caution

   Když zavřete **Terminál** nebo **Příkazový řádek**, musíte virtuální prostředí Pythonu znovu aktivovat. Stačí zavolat příkaz z výše uvedeného postupu: `source hardwario-venv/bin/activate`.

   :::

1. Nainstalujte **HARDWARIO Command Line Tools**:

   ```
   pip install hardwario
   ```

1. Instalaci můžete ověřit následujícím příkazem:

   ```
   hardwario --version
   ```

   Měl by vypsat výstup podobný tomuto:

   ```
   hardwario.chester v1.23.0
   hardwario.cloud v1.4.2
   hardwario.common v1.7.2
   hardwario.hardwario v1.3.1
   ```
## Připojení SEGGER J-Link k portu APP {#segger-j-link-to-app-port-connection}

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-app-flash-jlink-olimex-white.png')} alt="SEGGER J-Link PLUS Compact s adaptérem Olimex a plochým kabelem připojený k portu APP na základní desce zařízení CHESTER"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-segger-app.png')} alt="Detail základní desky zařízení CHESTER s plochým kabelem zapojeným do debug konektoru APP na levém okraji"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## Připojení SEGGER J-Link k portu LTE {#segger-j-link-to-lte-port-connection}

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-lte-flash-jlink-olimex-white.png')} alt="SEGGER J-Link PLUS Compact s adaptérem Olimex a plochým kabelem připojený k portu LTE na základní desce zařízení CHESTER"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-segger-lte.png')} alt="Detail základní desky zařízení CHESTER s plochým kabelem zapojeným do debug konektoru LTE na pravé straně"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## Připojení SEGGER J-Link k portu LRW {#segger-j-link-to-lrw-port-connection}

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-lrw-flash-jlink-olimex-white.png')} alt="SEGGER J-Link PLUS Compact s adaptérem Olimex a plochým kabelem připojený k portu LRW na základní desce zařízení CHESTER"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-segger-lrw.png')} alt="Detail základní desky zařízení CHESTER s plochým kabelem zapojeným do debug konektoru LRW"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />
