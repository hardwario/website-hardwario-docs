---
slug: installation-on-windows
title: Instalace na Windows
description: "Následující článek vás provede instalací CHESTER SDK na systému Windows. Tento návod byl otestován na Windows verze 10 a 11."
---
import Image from '@theme/IdealImage';

# Instalace na Windows {#installation-on-windows}

Následující článek vás provede instalací **CHESTER SDK** na systému **Windows**. Tento návod byl otestován na **Windows verze 10 a 11**.

:::caution

Než začnete, ujistěte se, že splňujete požadavky v článku [**Požadavky**](./requirements.md).

:::

## Kroky instalace {#installation-steps}

Kroky instalace jsou rozděleny do několika sekcí. Na konci budete schopni sestavit ukázku `blinky` z **CHESTER SDK**.

### Instalace Pythonu {#install-python}

:::tip

Tento krok můžete přeskočit, pokud už máte **Python** v systému nainstalovaný.

:::

Stáhněte si nejnovější stabilní instalátor z [**tohoto odkazu**](https://www.python.org/downloads/windows/).

:::caution

Zajistěte, aby instalátor pro Windows mohl upravit proměnnou `PATH`, aby byl spustitelný soubor **Python** dostupný odkudkoliv.

:::

### Instalace správce balíčků {#install-package-manager}

:::tip

Tento krok můžete přeskočit, pokud už máte **Chocolatey** v systému nainstalovaný.

:::

1. Otevřete aplikaci **Windows PowerShell** s právy administrátora.

   :::info

   **Windows PowerShell** můžete rychle spustit jako administrátor z vyhledávacího pole **Windows Search**. Do vyhledávacího pole napište `Windows PowerShell`, klikněte pravým tlačítkem na aplikaci **Windows PowerShell** ve výsledcích hledání a v nabídce zvolte **Spustit jako správce**.

   :::

1. Spusťte tento příkaz:

   ```
   Get-ExecutionPolicy
   ```

1. Pokud předchozí příkaz vrátí `Restricted`, spusťte následující příkaz:

   ```
   Set-ExecutionPolicy AllSigned
   ```

   :::info

   Při dotazu zvolte možnost `A`.

   :::

1. Spusťte následující příkaz:

   ```
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

1. Počkejte několik sekund, než se předchozí příkaz dokončí.

1. Pokud nevidíte žádné chyby, můžete **Chocolatey** začít používat.

1. Zavřete aplikaci **Windows Powershell**.

   :::caution

   Je lepší ji zavřít nyní, i když ji v další sekci znovu otevřeme. Některé důležité změny se projeví až v nové relaci aplikace.

   :::

### Instalace balíčků {#install-packages}

1. Otevřete aplikaci **Windows PowerShell** s právy administrátora.

   :::info

   **Windows PowerShell** můžete rychle spustit jako administrátor z vyhledávacího pole **Windows Search**. Do vyhledávacího pole napište `Windows PowerShell`, klikněte pravým tlačítkem na aplikaci **Windows PowerShell** ve výsledcích hledání a v nabídce zvolte **Spustit jako správce**.

   :::

1. Vypněte globální potvrzování, abyste nemuseli potvrzovat instalaci jednotlivých programů:

   ```
   choco feature enable -n allowGlobalConfirmation
   ```

1. Nainstalujte balíček **CMake**:

   ```
   choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
   ```

1. Nainstalujte zbývající balíčky:

   ```
   choco install ninja gperf git dtc-msys2 wget 7zip
   ```

1. Zavřete aplikaci **Windows Powershell**.

## Vytvoření aplikace {#create-application}

:::caution

Zavřete předchozí PowerShell a otevřete nový s uživatelskými právy. **Nepokračujte s právy administrátora.**

:::

Nyní byste měli být ve svém domovském adresáři. Následující kroky ale můžete provádět i v jiném adresáři, kde chcete mít projekt.

Nepoužívejte složku, která má kdekoliv v cestě mezery.

1. Otevřete aplikaci **Windows PowerShell** s **uživatelskými** právy.

1. Přejděte do svého domovského adresáře:

   ```
   Set-Location ~
   ```

1. Vytvořte adresář pro svou aplikaci:

   ```
   mkdir chester-app
   ```

   :::tip

   Změňte parametr `chester-app` na libovolný požadovaný název adresáře vašeho projektu.

   :::

   :::danger

   Na platformě Windows musíte použít cestu k adresáři bez jakýchkoliv mezer. V cestě rovněž ponechte pouze ASCII písmena a číslice. Jinak můžete narazit na problémy s toolchainem.

   :::

1. Přejděte do adresáře své aplikace:

   ```
   cd chester-app
   ```

1. Inicializujte virtuální prostředí **Python**:

   ```
   python -m venv .venv
   ```

1. Aktivujte virtuální prostředí **Python**:

   ```
   .\.venv\Scripts\Activate.ps1
   ```

   :::caution

   Když zavřete shell (nebo textový editor s integrovaným terminálem), musíte virtuální prostředí Pythonu znovu aktivovat. Zavolejte tento příkaz (použitý v postupu výše): `.\.venv\Scripts\Activate.ps1`. Do budoucna můžete mít různé pracovní prostory **West** s odlišnými verzemi balíčků **Python** a díky konceptu virtuálního prostředí nebudou trpět konflikty verzí.

   :::

1. Aktualizujte balíček **pip**:

   ```
   python -m pip install --upgrade pip
   ```

1. Nainstalujte nástroj **West**:

   ```
   pip install west
   ```

1. Inicializujte pracovní prostor **West** tam, kde chcete začít svůj projekt:

   ```
   west init -m https://github.com/hardwario/chester-skeleton.git --manifest-rev main
   ```

1. Nastavte výchozí desku na **CHESTER (nRF52840)**:

   ```
   west config build.board chester
   ```

1. Synchronizujte pracovní prostor **West**:

   ```
   west update
   ```

1. Nainstalujte závislosti **Python**:

   ```
   west packages pip --install
   ```

1. Exportujte prostředí **Zephyr**:

   ```
   west zephyr-export
   ```

1. Nainstalujte **Zephyr SDK**:

   ```
   west sdk install -t arm-zephyr-eabi
   ```

## Testovací sestavení a nahrání {#test-build-and-flash}

1. Přejděte do adresáře ukázky `blinky`:

   ```
   cd chester/samples/blinky
   ```

1. Ověřte, že ukázku dokážete sestavit:

   ```
   west build
   ```

   Výsledek sestavení by měl vypadat takto:

   ```
   Memory region         Used Size  Region Size  %age Used
           FLASH:      112320 B         1 MB     10.71%
            SRAM:       60576 B       256 KB     23.11%
        IDT_LIST:          0 GB         2 KB      0.00%
   ```

1. Pokud je vaše zařízení CHESTER APP/BLE [**připojeno**](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) k J-Link, jsou nainstalovány [**ovladače**](../developer-tools/segger-j-link) a je [**zapnuté napájení**](../developer-tools/power-profiler-kit-ii.md#basic-usage), můžete zkompilovaný kód blinky nahrát příkazem

   ```
   west flash
   ```
