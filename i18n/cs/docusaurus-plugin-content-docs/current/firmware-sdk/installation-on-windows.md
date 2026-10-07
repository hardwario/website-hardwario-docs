---
slug: installation-on-windows
title: Instalace na Windows
---
import Image from '@theme/IdealImage';

# Instalace na Windows {#installation-on-windows}

Tento článek vás provede instalací **CHESTER SDK** v systému **Windows**. Postup je otestovaný na **Windows 10 a 11**.

:::caution

Než začnete, ověřte, že splňujete vše, co uvádí článek [**Požadavky**](./requirements.md).

:::

## Postup instalace {#installation-steps}

Instalace je rozdělená do několika částí. Na konci sestavíte ukázku `blinky` z **CHESTER SDK**.

### Instalace Pythonu {#install-python}

:::tip

Pokud už máte v systému nainstalovaný **Python**, tento krok přeskočte.

:::

Stáhněte si nejnovější stabilní instalátor z [**tohoto odkazu**](https://www.python.org/downloads/windows/).

:::caution

Povolte instalátoru úpravu proměnné `PATH`, aby šel **Python** spustit z libovolného umístění.

:::

### Instalace správce balíčků {#install-package-manager}

:::tip

Pokud už máte v systému nainstalovaný **Chocolatey**, tento krok přeskočte.

:::

1. Otevřete aplikaci **Windows PowerShell** s právy administrátora.

   :::info

   **Windows PowerShell** rychle spustíte jako správce přes vyhledávání **Windows Search**: napište `Windows PowerShell`, ve výsledcích hledání klikněte pravým tlačítkem na aplikaci **Windows PowerShell** a v nabídce zvolte **Spustit jako správce**.

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

1. Počkejte několik sekund, než příkaz doběhne.

1. Pokud nevidíte žádné chyby, můžete **Chocolatey** začít používat.

1. Zavřete aplikaci **Windows Powershell**.

   :::caution

   Aplikaci zavřete hned teď, i když ji v další části znovu otevřete: některé důležité změny se projeví až po jejím novém spuštění.

   :::

### Instalace balíčků {#install-packages}

1. Otevřete aplikaci **Windows PowerShell** s právy administrátora.

   :::info

   **Windows PowerShell** rychle spustíte jako správce přes vyhledávání **Windows Search**: napište `Windows PowerShell`, ve výsledcích hledání klikněte pravým tlačítkem na aplikaci **Windows PowerShell** a v nabídce zvolte **Spustit jako správce**.

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

Teď byste měli být ve svém domovském adresáři. Další kroky ale můžete dělat i v jiném adresáři, kde chcete mít projekt.

Cesta ke složce nesmí nikde obsahovat mezery.

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

   Místo `chester-app` můžete adresář projektu pojmenovat libovolně.

   :::

   :::danger

   Ve Windows nesmí cesta k adresáři obsahovat žádné mezery a smí obsahovat jen písmena a číslice ASCII. Jinak můžete narazit na problémy s toolchainem.

   :::

1. Přejděte do adresáře své aplikace:

   ```
   cd chester-app
   ```

1. Vytvořte virtuální prostředí pro **Python**:

   ```
   python -m venv .venv
   ```

1. Aktivujte virtuální prostředí pro **Python**:

   ```
   .\.venv\Scripts\Activate.ps1
   ```

   :::caution

   Po zavření shellu (nebo textového editoru s integrovaným terminálem) musíte virtuální prostředí Pythonu znovu aktivovat příkazem z postupu výše: `.\.venv\Scripts\Activate.ps1`. Časem můžete mít několik pracovních prostorů **West** s různými verzemi balíčků pro **Python**; díky virtuálním prostředím mezi nimi nevzniknou konflikty verzí.

   :::

1. Aktualizujte balíček **pip**:

   ```
   python -m pip install --upgrade pip
   ```

1. Nainstalujte nástroj **West**:

   ```
   pip install west
   ```

1. Inicializujte pracovní prostor **West** ve složce, kde chcete projekt založit:

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

1. Nainstalujte závislosti pro **Python**:

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

## Testovací sestavení a nahrání firmwaru {#test-build-and-flash}

1. Přejděte do adresáře s ukázkou `blinky`:

   ```
   cd chester/samples/blinky
   ```

1. Zkontrolujte, že ukázku dokážete sestavit:

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

1. Pokud je port APP/BLE zařízení CHESTER [**připojený**](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) k programátoru J-Link, [**ovladače**](/chester/developer-tools/segger-j-link/) jsou nainstalované a [**napájení je zapnuté**](../developer-tools/power-profiler-kit-ii.md#basic-usage), nahrajete zkompilovanou ukázku blinky příkazem:

   ```
   west flash
   ```
