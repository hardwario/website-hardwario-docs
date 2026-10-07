---
slug: build-and-deploy
title: Sestavení a nasazení
---
import Image from '@theme/IdealImage';

# Sestavení a nasazení {#build-and-deploy}

Tento článek vysvětluje, jak sestavit, nasadit a nahrát firmware aplikace do **HARDWARIO Cloud**.

## Sestavení {#build}

1. Přejděte do složky aplikace. Může to být:
    - Složka `application/` ve vašem projektu.
    - Katalogová aplikace ze složky `chester/applications/`.
    - Ukázky kódu ve složce `chester/samples/`.

2. Sestavte aplikaci příkazem `west build`.

   :::tip

   Ověřte, že je `build.board` nastavený příkazem `west config build.board chester` (viz předchozí kapitola **Instalace**).

   :::

## Nasazení {#deploy}

Ve finálním sestavení by firmware měl obsahovat svůj název a verzi. Obojí pak uvidíte v aplikaci **HARDWARIO Manager** i v shellu zařízení po zadání příkazu `info show`. Verze firmwaru se odesílá i v paketech NB-IoT.

1. Smažte předchozí sestavení příkazem `rm -rf build/`.

2. Přidejte do příkazu pro sestavení proměnné prostředí `FW_NAME` a `FW_VERSION`:
     - Linux a macOS: `FW_NAME="CHESTER Input Z" FW_VERSION="v1.5.0" west build`.
     - Windows: `cmd /C "set FW_NAME=CHESTER Input Z && set FW_VERSION=v1.5.0 && west build"`.

:::tip

HARDWARIO používá [sémantické verzování](https://semver.org/). Verze firmwaru musí obsahovat i písmeno **v**, například `v1.2.0`.

:::

Binární soubor nebo soubor ZIP teď můžete distribuovat pro **aktualizaci DFU**, nebo ho nahrát do **HARDWARIO Cloud**, jak popisuje následující kapitola.

:::tip

Název a verzi firmwaru můžete zapsat i napevno do projektu. Stačí do souboru projektu `CMakeLists.txt` před příkaz `project` přidat tyto řádky:

```
set(ENV{FW_NAME} "CHESTER Input Z")
set(ENV{FW_VERSION} "v1.5.0")

project(input)
```

:::

## Nahrání firmwaru {#firmware-upload}

Funkcí upload v **HARDWARIO CLI** můžete firmware nahrát do svého účtu v **HARDWARIO Cloud** a sdílet ho se zákazníky přes **QR kód**, **URL** nebo **e-mailem**.

:::tip

Tajný token pro **HARDWARIO Cloud** musí být v proměnné prostředí `HARDWARIO_CLOUD_TOKEN`, nebo ho předejte v parametru `--token`. Ten musí stát přesně mezi parametry `fw` a `upload`.

Potřebný token najdete v [HARDWARIO Cloud v1 ve svém profilu](https://hardwario.cloud/#/profile) jako `API token`.

:::

Po sestavení firmwaru spusťte ve stejné složce projektu:

`hardwario chester app fw upload --name="hio-chester-input-z" --version="v1.5.0"`

Pak vám přijde e-mail s **odkazy na firmware** a **QR kódem**, který naskenujete v mobilní aplikaci **HARDWARIO Manager** a firmware aktualizujete.
