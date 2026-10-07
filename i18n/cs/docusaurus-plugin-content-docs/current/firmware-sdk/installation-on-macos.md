---
slug: installation-on-macos
title: Instalace na macOS
---
import Image from '@theme/IdealImage';

# Instalace na macOS {#installation-on-macos}

Tento článek vás provede instalací **CHESTER SDK** v systému **macOS**. Postup je otestovaný na verzích **macOS 12 (Monterey)** a **macOS 13 (Ventura)**.

:::caution

Než začnete, ověřte, že splňujete vše, co uvádí článek [Požadavky](./requirements.md).

:::

## Postup instalace {#installation-steps}

Instalace je rozdělená do několika částí. Na konci sestavíte ukázku `blinky` z **CHESTER SDK**.

### Instalace správce balíčků {#install-package-manager}

:::tip

Pokud už máte v systému nainstalovaný **Homebrew**, tento krok přeskočte.

:::

1. Otevřete aplikaci **Terminál**.

1. Nainstalujte správce balíčků **Homebrew** (pokud ho v systému ještě nemáte):

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

1. Restartujte systém:

   ```
   sudo reboot
   ```

### Instalace balíčků {#install-packages}

Nainstalujte následující balíčky **Homebrew**:

```
brew install cmake ninja gperf python3 ccache qemu dtc wget libmagic
```

## Vytvoření aplikace {#create-application}

1. Vytvořte adresář pro svou aplikaci a přejděte do něj:

   ```
   mkdir chester-app && cd chester-app
   ```

   :::tip

   Místo `chester-app` můžete adresář projektu pojmenovat libovolně.

   :::

1. Vytvořte virtuální prostředí pro **Python**:

   ```
   python3 -m venv .venv
   ```

1. Aktivujte virtuální prostředí pro **Python**:

   ```
   source .venv/bin/activate
   ```

   :::caution

   Po zavření shellu (nebo textového editoru s integrovaným terminálem) musíte virtuální prostředí Pythonu znovu aktivovat příkazem z postupu výše: `source .venv/bin/activate`. Časem můžete mít několik pracovních prostorů **West** s různými verzemi balíčků pro **Python**; díky virtuálním prostředím mezi nimi nevzniknou konflikty verzí.

   :::

1. Aktualizujte balíček **pip**:

   ```
   pip install --upgrade pip
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
