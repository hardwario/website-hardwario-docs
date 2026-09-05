---
slug: installation-on-macos
title: Instalace na macOS
description: "Následující článek vás provede instalací CHESTER SDK na macOS. Tento návod byl otestován na verzích macOS 12 (Monterey) a macOS 13 (Ventura)."
---
import Image from '@theme/IdealImage';

# Instalace na macOS {#installation-on-macos}

Následující článek vás provede instalací **CHESTER SDK** na **macOS**. Tento návod byl otestován na verzích **macOS 12 (Monterey)** a **macOS 13 (Ventura)**.

:::caution

Než začnete, ujistěte se, že splňujete požadavky uvedené v článku [Požadavky](./requirements.md).

:::

## Postup instalace {#installation-steps}

Kroky instalace jsou rozděleny do několika sekcí. Na konci budete schopni sestavit ukázku `blinky` z **CHESTER SDK**.

### Instalace správce balíčků {#install-package-manager}

:::tip

Tento krok můžete přeskočit, pokud již máte v systému nainstalovaný **Homebrew**.

:::

1. Otevřete aplikaci **Terminál**.

1. Nainstalujte správce balíčků **Homebrew** (pokud ještě není ve vašem systému nainstalován):

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

1. Vytvořte adresář pro svou aplikaci a přepněte se do něj:

   ```
   mkdir chester-app && cd chester-app
   ```

   :::tip

   Parametr `chester-app` změňte na libovolný požadovaný název adresáře vašeho projektu.

   :::

1. Inicializujte virtuální prostředí **Pythonu**:

   ```
   python3 -m venv .venv
   ```

1. Aktivujte virtuální prostředí **Pythonu**:

   ```
   source .venv/bin/activate
   ```

   :::caution

   Když zavřete shell (nebo svůj textový editor s integrovaným terminálem), musíte virtuální prostředí Pythonu znovu aktivovat. Zadejte tento příkaz (použitý v postupu výše): `source .venv/bin/activate`. V budoucnu můžete mít různé pracovní prostory **West** s odlišnými verzemi balíčků **Pythonu** a díky konceptu virtuálního prostředí nebudou trpět konflikty verzí.

   :::

1. Aktualizujte balíček **pip**:

   ```
   pip install --upgrade pip
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

1. Nainstalujte závislosti **Pythonu**:

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

## Testovací build a nahrání firmwaru {#test-build-and-flash}

1. Přejděte do adresáře ukázky `blinky`:

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

1. Pokud je vaše zařízení CHESTER APP/BLE [**připojeno**](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) k J-Link, jsou nainstalovány [**ovladače**](/chester/developer-tools/segger-j-link/) a [**je zapnuté napájení**](../developer-tools/power-profiler-kit-ii.md#basic-usage), můžete zkompilovaný kód blinky nahrát zadáním

   ```
   west flash
   ```
