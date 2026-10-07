---
slug: segger-j-link
title: SEGGER J-Link
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SEGGER J-Link {#segger-j-link}

Tento článek popisuje ladicí nástroj **SEGGER J-Link**.

## Požadavky {#requirements}

Budete potřebovat tento hardware a software:

* Jeden z těchto operačních systémů:

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12 (s nainstalovaným Homebrew)
  * Windows 10 / Windows 11

* Nainstalovanou distribuci **Python 3**:

  <Tabs groupId="operating-system">
  <TabItem value="windows" label="Windows" default>

  Stáhněte si nejnovější stabilní instalátor z [**tohoto odkazu**](https://www.python.org/downloads/windows/).

  :::caution

  V instalátoru zaškrtněte **_Add Python x.x to PATH_**, aby šel Python spustit z libovolného umístění.

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

* Zařízení **HARDWARIO CHESTER** (budete muset povolit šest šroubů a sejmout horní kryt krabičky)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového adaptéru SWD a plochého kabelu)

  :::tip

  Programátor **SEGGER J-Link** i veškeré potřebné příslušenství vám **HARDWARIO** na vyžádání dodá.

  :::

* Kabel Micro-USB s konektorem odpovídajícím vašemu počítači

  :::danger

  Některé kabely Micro-USB vedou jen napájení, ne data. Pokud spojení mezi programátorem J-Link a počítačem nefunguje, zkontrolujte nejdřív kabel.

  :::

* Balík aplikací pro Python **HARDWARIO Command Line Tools**

## Instalace {#instalation}

**HARDWARIO Command Line Tools** nainstalujete takto:

1. Pouze na Windows: nainstalujte ovladače SEGGER J-Link:

   * Stáhněte [**64bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)

   * Stáhněte [**32bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows.exe)

   * Stáhněte [**64bitový instalátor ARM**](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

   :::caution

   Pokud se objeví chyba **_An error was reported by NRFJPROG DLL: -101 JLINKARM_DLL_COULD_NOT_BE_OPENED_**, postupujte podle [této](/chester/firmware-sdk/installation-on-ubuntu/#set-up-device-rules) stránky.

   :::

1. Otevřete aplikaci **Terminál** (Ubuntu nebo macOS) nebo **Příkazový řádek** (Windows).

1. Vytvořte virtuální prostředí pro Python:

   ```
   python3 -m venv hardwario-venv
   ```

1. Aktivujte virtuální prostředí pro Python:

   ```
   source hardwario-venv/bin/activate
   ```

   :::caution

   Po zavření aplikace **Terminál** nebo **Příkazový řádek** musíte virtuální prostředí Pythonu znovu aktivovat. Stačí zadat příkaz z postupu výše: `source hardwario-venv/bin/activate`.

   :::

1. Nainstalujte **HARDWARIO Command Line Tools**:

   ```
   pip install hardwario
   ```

1. Instalaci ověříte tímto příkazem:

   ```
   hardwario --version
   ```

   Výstup by měl vypadat zhruba takto:

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
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-segger-app.png')} alt="Detail základní desky zařízení CHESTER s plochým kabelem zapojeným do ladicího konektoru APP na levém okraji"/></div>
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
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-segger-lte.png')} alt="Detail základní desky zařízení CHESTER s plochým kabelem zapojeným do ladicího konektoru LTE na pravé straně"/></div>
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
      <div><Image img={require('../../../../../chester/developer-tools/images/chester-segger-lrw.png')} alt="Detail základní desky zařízení CHESTER s plochým kabelem zapojeným do ladicího konektoru LRW"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />
