---
slug: application-over-j-link
title: Aplikace přes J-Link
title_meta: "Aplikace přes J-Link (CHESTER)"
---
import Image from '@theme/IdealImage';

# Aplikace přes J-Link {#application-over-j-link}

Tento článek popisuje, jak nahrát firmware aplikace do zařízení CHESTER programátorem SEGGER J-Link.

## Požadavky {#requirements}

Budete potřebovat tento hardware a software:

* Jeden z těchto operačních systémů:

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12 (s nainstalovaným Homebrew)
  * Windows 10 / Windows 11

* Nainstalovaný **Python 3**:

  * Na Ubuntu spusťte tento příkaz v aplikaci **Terminál**:

    ```
    sudo apt install python3
    ```

  * Na macOS spusťte tento příkaz v aplikaci **Terminál**:

    ```
    brew install python3
    ```

  * Na Windows si stáhněte nejnovější stabilní instalátor z [**tohoto odkazu**](https://www.python.org/downloads/windows/).

    :::caution

    Povolte instalátoru úpravu proměnné `PATH`, aby byl Python dostupný z libovolného adresáře.

    :::


* Zařízení HARDWARIO CHESTER (bude potřeba otevřít horní kryt krabičky, který drží šest šroubů)

* USB debugger/programátor SEGGER J-Link (včetně 10pinového adaptéru SWD a plochého kabelu)

  :::tip

  HARDWARIO na požádání dodává J-Link i veškeré potřebné příslušenství.

  :::

* Kabel Micro-USB s vhodným typem konektoru pro váš počítač

  :::danger

  Některé kabely Micro-USB vedou jen napájení, a ne data. Pokud spojení mezi programátorem J-Link a počítačem nefunguje, zkontrolujte nejdřív kabel.

  :::

* Sada nástrojů **HARDWARIO Command Line Tools** pro Python

## Instalace {#installation}

Nástroje **HARDWARIO Command Line Tools** nainstalujete takto:

1. Pouze na Windows: nainstalujte ovladače SEGGER J-Link:

   * Stáhněte [**64bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)
   * Stáhněte [**32bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows.exe)
   * Stáhněte [**64bitový instalátor ARM**](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

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

   Když zavřete **Terminál** nebo **Příkazový řádek**, musíte virtuální prostředí Pythonu znovu aktivovat. Stačí znovu spustit příkaz z postupu výše: `source hardwario-venv/bin/activate`.

   :::

1. Nainstalujte **HARDWARIO Command Line Tools**:

   ```
   pip install hardwario
   ```

1. Instalaci ověříte tímto příkazem:

   ```
   hardwario --version
   ```

   Výstup by měl vypadat přibližně takto:

   ```
   hardwario.chester v1.19.0
   hardwario.cloud v1.4.1
   hardwario.common v1.7.1
   hardwario.hardwario v1.2.0
   ```

## Postup nahrání firmwaru {#flashing-procedure}

Než začnete, ověřte, že máte stažený soubor HEX aplikace, nebo 128bitové unikátní ID firmwaru.

:::tip

Aplikační firmware se obvykle distribuuje přes **HARDWARIO Cloud** a funkci **Shareable Firmware Link**, ze které získáte soubor HEX i 128bitové unikátní ID. S unikátním ID nemusíte posílat žádné přílohy: stačí zadat identifikátor a nástroj si firmware stáhne sám.

:::

Firmware aplikace nahrajete do zařízení CHESTER takto:

1. Připojte 10pinový plochý kabel ke konektoru označenému [**APP**](/chester/developer-tools/segger-j-link/#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

1. Druhý konec plochého kabelu připojte k desce adaptéru SEGGER J-Link (a adaptér zapojte do programátoru SEGGER J-Link).

1. Kabelem Micro-USB propojte programátor SEGGER J-Link s počítačem.

1. Otevřete aplikaci **Terminál** (Ubuntu nebo macOS) nebo **Příkazový řádek** (Windows).

1. Aktivujte virtuální prostředí Pythonu, do kterého jste nainstalovali **HARDWARIO Command Line Tools** (viz předchozí kapitola).

1. Další postup závisí na tom, co máte k dispozici:

   * Pokud máte **soubor HEX aplikace**, nahrajte firmware tímto příkazem:

     ```
     hardwario chester app flash <PATH-TO-APPLICATION-HEX-FILE>
     ```

     Příklad: `hardwario chester app flash ~/Downloads/hio-chester-clime-v1.0.0.hex`

   * Pokud máte **unikátní ID aplikace**, nahrajte firmware tímto příkazem:

     ```
     hardwario chester app flash <APPLICATION-UNIQUE-ID>
     ```

     Příklad: `hardwario chester app flash 071ea903ae29053ee96e0124c3454238`

1. Odpojte adaptér SEGGER J-Link.
