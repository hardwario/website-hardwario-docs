---
slug: installation-on-ubuntu
title: Instalace na Ubuntu
description: "Následující článek vás provede instalací CHESTER SDK na systému Ubuntu. Byla otestována na verzi Ubuntu 22.04 LTS."
---
import Image from '@theme/IdealImage';

# Instalace na Ubuntu {#installation-on-ubuntu}

Následující článek vás provede instalací **CHESTER SDK** na systému **Ubuntu**. Byla otestována na verzi **Ubuntu 22.04 LTS**.

:::caution

Než začnete, ujistěte se, že splňujete požadavky uvedené v článku [**Požadavky**](./requirements.md).

:::

## Postup instalace {#installation-steps}

Kroky instalace jsou rozdělené do několika sekcí. Na konci budete schopni sestavit ukázku `blinky` z **CHESTER SDK**.

### Aktualizace systému {#update-your-system}

1. Otevřete aplikaci **Terminál**.

1. Aktualizujte seznamy balíčků:

   ```
   sudo apt update
   ```

1. Aktualizujte balíčky:

   ```
   sudo apt upgrade
   ```

1. Restartujte systém:

   ```
   sudo reboot
   ```

### Nastavení pravidel pro zařízení {#set-up-device-rules}

1. Otevřete aplikaci **Terminál**.

1. Stáhněte balíček s pravidly **udev**:

   ```
   wget https://github.com/NordicSemiconductor/nrf-udev/releases/download/v1.0.1/nrf-udev_1.0.1-all.deb
   ```

1. Nainstalujte balíček s pravidly **udev**:

   ```
   sudo dpkg -i nrf-udev_1.0.1-all.deb
   ```

1. Odstraňte balíček s pravidly **udev**:

   ```
   rm nrf-udev_1.0.1-all.deb
   ```

### Instalace balíčků {#install-packages}

Nainstalujte následující balíčky **APT**:

```
sudo apt install --no-install-recommends git cmake ninja-build gperf ccache dfu-util device-tree-compiler wget python3-dev python3-pip python3-setuptools python3-tk python3-wheel xz-utils file make gcc gcc-multilib g++-multilib libsdl2-dev libmagic1
```

Nainstalujte balíček **python3-venv**:

```
sudo apt install python3-venv
```

## Vytvoření aplikace {#create-application}

1. Vytvořte adresář pro svou aplikaci a přejděte do něj:

   ```
   mkdir chester-app && cd chester-app
   ```

   :::tip

   Parametr `chester-app` změňte na libovolný název adresáře vašeho projektu.

   :::

1. Inicializujte virtuální prostředí **Python**:

   ```
   python3 -m venv .venv
   ```

1. Aktivujte virtuální prostředí **Python**:

   ```
   source .venv/bin/activate
   ```

   :::caution

   Když zavřete shell (nebo textový editor s integrovaným terminálem), musíte virtuální prostředí Pythonu znovu aktivovat. Použijte tento příkaz (uvedený v postupu výše): `source .venv/bin/activate`. V budoucnu můžete mít různé pracovní prostory **West** s odlišnými verzemi balíčků **Python** a díky konceptu virtuálního prostředí nebudou trpět konflikty verzí.

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

## Testovací build a nahrání firmwaru {#test-build-and-flash}

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

1. Pokud je vaše zařízení CHESTER APP/BLE [**připojeno**](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) k J-Link, [**ovladače**](../developer-tools/segger-j-link) jsou nainstalované a [**napájení je zapnuté**](../developer-tools/power-profiler-kit-ii.md#basic-usage), můžete zkompilovaný kód blinky nahrát příkazem

   ```
   west flash
   ```
