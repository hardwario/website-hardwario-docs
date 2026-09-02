---
slug: build-and-deploy
title: Build a nasazení
description: "Tento článek vysvětluje, jak sestavit, nasadit a nahrát firmware aplikace do HARDWARIO Cloud."
---
import Image from '@theme/IdealImage';

# Build a nasazení {#build-and-deploy}

Tento článek vysvětluje, jak sestavit, nasadit a nahrát firmware aplikace do **HARDWARIO Cloud**.

## Build {#build}

1. Přejděte do složky aplikace. Může to být:
    - Vaše složka `application/` ve vašem projektu.
    - Katalogová aplikace ze složky `chester/applications/`.
    - Ukázky kódu ve složce `chester/samples/`.

2. Sestavte aplikaci příkazem `west build`.

   :::tip

   Ujistěte se, že je `build.board` nastaven pomocí `west config build.board chester`, viz předchozí kapitola **Instalace**

   :::

## Nasazení {#deploy}

Pro finální build firmwaru budete chtít sestavit firmware s názvem a verzí. Verze a název firmwaru budou vidět v aplikaci **HADRWARIO Manager** a v shellu zařízení po zadání příkazu `info show`. Verze firmwaru se také odesílá v NB-IoT paketu.

1. Vyčistěte předchozí build příkazem `rm -rf build/`.

2. Přidejte do příkazu pro build proměnné prostředí `FW_NAME` a `FW_VERSION`:
     - Linux a macOS: `FW_NAME="CHESTER Input Z" FW_VERSION="v1.5.0" west build`.
     - Windows: `cmd /C "set FW_NAME=CHESTER Input Z && set FW_VERSION=v1.5.0 && west build"`.

:::tip

HARDWARIO používá [Semantic Versioning](https://semver.org/). Nezapomeňte, že ve verzi firmwaru musí být i písmeno **v**, například `v1.2.0`.

:::

Nyní můžete binární nebo ZIP soubor distribuovat pro **DFU update**. Nebo jej můžete nahrát do **HARDWARIO Cloud**. Viz následující kapitola.

:::tip

Název a verzi firmwaru můžete také zapsat přímo do svého projektu. Do souboru projektu `CMakeLists.txt` můžete před příkaz `project` přidat tyto řádky:

```
set(ENV{FW_NAME} "CHESTER Input Z")
set(ENV{FW_VERSION} "v1.5.0")

project(input)
```

:::

## Nahrání firmwaru {#firmware-upload}

Můžete také použít funkci upload v **HARDWARIO CLI**, díky které se firmware nahraje na váš účet v **HARDWARIO Cloud** a můžete jej sdílet se svými zákazníky pomocí **QR kódu**, **URL** nebo **e-mailem**.

:::tip

Svůj tajný token pro **HARDWARIO Cloud** musíte mít v proměnné prostředí `HARDWARIO_CLOUD_TOKEN`, nebo jej musíte předat v parametru `--token`. Tento parametr je nutné umístit přesně mezi parametry `fw` a `list`.

Potřebný token najdete v [HARDWARIO Cloud v1 ve svém profilu](https://hardwario.cloud/#/profile) jako `API token`.

:::

Až bude firmware sestavený, zavolejte ze stejné složky projektu:

`hardwario chester app fw upload --name="hio-chester-input-z" --version="v1.5.0"`

Poté obdržíte e-mail s **odkazy na firmware** a **QR kódem**, který lze naskenovat v mobilní aplikaci **HADRWARIO Manager** pro aktualizaci firmwaru.
