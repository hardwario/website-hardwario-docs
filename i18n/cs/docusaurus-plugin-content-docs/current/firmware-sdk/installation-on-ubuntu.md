---
slug: installation-on-ubuntu
title: Instalace na Ubuntu
---
import Image from '@theme/IdealImage';

# Instalace na Ubuntu {#installation-on-ubuntu}

Tento článek vás provede instalací **CHESTER SDK** v systému **Ubuntu**. Postup je otestovaný na verzi **Ubuntu 22.04 LTS**.

:::caution

Než začnete, ověřte, že splňujete vše, co uvádí článek [**Požadavky**](./requirements.md).

:::

## Postup instalace {#installation-steps}

Instalace je rozdělená do několika částí. Na konci sestavíte ukázku `blinky` z **CHESTER SDK**.

### Aktualizace systému {#update-your-system}

1. Otevřete aplikaci **Terminál**.

1. Aktualizujte seznamy balíčků:

   ```
   sudo apt update
   ```

1. Nainstalujte novější verze balíčků:

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

1. Smažte stažený soubor balíčku s pravidly **udev**:

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
