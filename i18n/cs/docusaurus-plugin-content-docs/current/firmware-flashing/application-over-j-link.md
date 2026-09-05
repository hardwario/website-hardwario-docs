---
slug: application-over-j-link
title: Aplikace přes J-Link
description: "Tento článek popisuje, jak nahrát firmware aplikace do zařízení CHESTER pomocí SEGGER J-Link."
---
import Image from '@theme/IdealImage';

# Aplikace přes J-Link {#application-over-j-link}

Tento článek popisuje, jak nahrát firmware aplikace do zařízení CHESTER pomocí SEGGER J-Link.

## Požadavky {#requirements}

Budete potřebovat následující hardwarové a softwarové nástroje:

* Jeden z těchto operačních systémů:

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12 (s nainstalovaným Homebrew)
  * Windows 10 / Windows 11

* Distribuci **Python 3** nainstalovanou ve vašem systému:

  * Na Ubuntu spusťte tento příkaz v aplikaci **Terminal**:

    ```
    sudo apt install python3
    ```

  * Na macOS spusťte tento příkaz v aplikaci **Terminal**:

    ```
    brew install python3
    ```

  * Na Windows si stáhněte nejnovější stabilní instalátor z [**tohoto odkazu**](https://www.python.org/downloads/windows/).

    :::caution

    Zajistěte, aby instalátor pro Windows mohl upravit proměnnou `PATH`, aby byl spustitelný soubor Pythonu dostupný z jakéhokoli místa.

    :::


* Zařízení HARDWARIO CHESTER (bude potřeba otevřít horní kryt krabičky se šesti šroubky)

* USB debugger/programátor SEGGER J-Link (včetně 10pinového SWD adaptéru + plochého kabelu)

  :::tip

  HARDWARIO na požádání dodává J-Link i veškeré potřebné příslušenství.

  :::

* Kabel Micro-USB s vhodným typem konektoru pro váš počítač

  :::danger

  Některé kabely Micro-USB poskytují pouze napájení a žádné datové signály. Pokud spojení mezi J-Link a vaším systémem nefunguje, zkontrolujte v první řadě typ kabelu.

  :::

* Balíček aplikací v Pythonu **HARDWARIO Command Line Tools**

## Instalace {#installation}

Nástroje **HARDWARIO Command Line Tools** nainstalujete takto:

1. Pouze na Windows: nainstalujte ovladače SEGGER J-Link:

   * Stáhněte [**64bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)
   * Stáhněte [**32bitový instalátor Intel/AMD**](https://www.segger.com/downloads/jlink/JLink_Windows.exe)
   * Stáhněte [**64bitový instalátor ARM**](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

1. Otevřete aplikaci **Terminal** (Ubuntu nebo macOS) nebo **Command Prompt** (Windows).

1. Inicializujte virtuální prostředí Pythonu:

   ```
   python3 -m venv hardwario-venv
   ```

1. Aktivujte virtuální prostředí Pythonu:

   ```
   source hardwario-venv/bin/activate
   ```

   :::caution

   Když zavřete **Terminal** nebo **Command Prompt**, musíte virtuální prostředí Pythonu znovu aktivovat. Stačí zavolat příkaz z výše uvedeného postupu: `source hardwario-venv/bin/activate`.

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
   hardwario.chester v1.19.0
   hardwario.cloud v1.4.1
   hardwario.common v1.7.1
   hardwario.hardwario v1.2.0
   ```

## Postup nahrání firmwaru {#flashing-procedure}

Než začnete, zkontrolujte, že máte v systému stažený HEX soubor aplikace; nebo že máte k dispozici 128bitový unikátní ID firmwaru.

:::tip

Aplikační firmware se obvykle distribuuje přes **HARDWARIO Cloud** a funkci nazvanou **Shareable Firmware Link**, z níž získáte jak HEX soubor, tak 128bitový unikátní ID. S unikátním ID nemusíte posílat žádné přílohy – stačí zadat identifikátor a nástroj si firmware stáhne automaticky.

:::

Při nahrávání firmwaru aplikace do zařízení CHESTER postupujte takto:

1. Připojte 10pinový plochý kabel ke konektoru označenému [**APP**](../../chester/developer-tools/segger-j-link#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

1. Druhou stranu 10pinového plochého kabelu připojte k adaptérové desce SEGGER J-Link (a adaptérovou desku zapojte do zařízení SEGGER J-Link).

1. Připojte kabel Micro-USB k SEGGER J-Link a k počítači.

1. Otevřete aplikaci **Terminal** (Ubuntu nebo macOS) nebo **Command Prompt** (Windows).

1. Aktivujte virtuální prostředí Pythonu, do kterého jste nainstalovali **HARDWARIO Command Line Tools** (viz předchozí kapitola).

1. Další operace závisí na scénáři:

   * Pokud máte **HEX soubor aplikace**, můžete firmware nahrát tímto příkazem:

     ```
     hardwario chester app flash <PATH-TO-APPLICATION-HEX-FILE>
     ```

     Příklad: `hardwario chester app flash ~/Downloads/hio-chester-clime-v1.0.0.hex`

   * Pokud máte **unikátní ID aplikace**, můžete firmware nahrát tímto příkazem:

     ```
     hardwario chester app flash <APPLICATION-UNIQUE-ID>
     ```

     Příklad: `hardwario chester app flash 071ea903ae29053ee96e0124c3454238`

1. Odpojte adaptér SEGGER J-Link.
