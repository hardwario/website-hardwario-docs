---
title: Nastavení firmwaru
description: "Nastavte si lokálně repozitář firmwaru pro zařízení STICKER, sestavte binární soubory, nahrajte debug image (který zapne interaktivní shell konzoli) a otevřete konzoli. Toto je vstupní bod pro workflow Developer Access."
---
import Image from '@theme/IdealImage';

# Nastavení firmwaru {#firmware-setup}

Nastavte si lokálně repozitář firmwaru pro zařízení STICKER, sestavte binární soubory, nahrajte **debug** image (který zapne interaktivní shell konzoli) a otevřete konzoli. Toto je vstupní bod pro workflow [**Developer Access**](../developer-mode.md).

:::info Firmware v1.4.0
Firmware pro zařízení STICKER je postaven na **Zephyr RTOS**. Tento návod popisuje nastavení vývojového workspace, kompilaci release/debug binárek, nahrání přes SWD a bezpečnostní model.
:::

---

## Bezpečnostní model a architektura firmwaru {#security-model--firmware-architecture}

Zařízení STICKER používá **plochý aplikační image** linkovaný přímo od začátku flash paměti:
- **Žádný vzdálený bootloader ani FUOTA:** Zařízení neobsahuje MCUboot ani DFU partition. Není zde možnost aktualizace firmwaru přes vzduch (FUOTA) ani přes NFC. Původní příkaz `enter_dfu` byl záměrně odstraněn.
- **Nulová vzdálená plocha pro útok:** Image firmwaru nelze přes LoRaWAN ani NFC vyměnit, downgradovat ani jinak upravit.
- **Pouze fyzický přístup přes SWD:** Přeprogramování nebo aktualizace firmwaru v terénu vyžaduje striktně fyzický přístup k SWD programovacím ploškám pomocí sondy SEGGER J-Link (`make flash`).

---

## Co budete potřebovat {#what-you-need}

- **Zařízení STICKER** s fyzickým přístupem k SWD.
- **Debug sonda SEGGER J-Link** (připojení SWD) pro nahrání firmwaru a výstup RTT konzole.
- **Hostitelský systém:** Linux nebo macOS s Python 3, Git a CMake.
  - *Uživatelé NixOS / Nix:* V rootu repozitáře je připraven soubor `shell.nix`, který automaticky nastaví ARM toolchain, J-Link a Python prostředí pomocí `nix-shell`.

---

## Nastavení lokálního vývojového workspace {#local-development-workspace-setup}

Repozitář firmwaru je hostován na [**github.com/hardwario/sticker-firmware**](https://github.com/hardwario/sticker-firmware) a spravován pomocí nástroje **West** (Zephyr meta-tool).

### 1. Vytvoření workspace a virtuálního prostředí {#1-create-a-workspace--virtual-environment}

```bash
mkdir sticker && cd sticker
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install west
```

### 2. Stažení firmwaru a modulů Zephyr SDK {#2-fetch-firmware--zephyr-sdk-modules}

```bash
west init -m https://github.com/hardwario/sticker-firmware.git
west update
west zephyr-export
west packages pip --install
```

### 3. Instalace doplňujících závislostí {#3-install-supporting-dependencies}

```bash
pip install rttt
pip install protobuf grpcio-tools
west sdk install
```

---

## Sestavení a nahrání firmwaru {#building-and-flashing}

Všechny příkazy pro kompilaci a nahrání firmwaru se spouští z adresáře `app` ve workspace firmwaru:

```bash
cd sticker/app
```

### Build cíle {#build-targets}

| Příkaz | Popis |
|---|---|
| `make` | Sestaví **produkční release** image (shell konzole vypnuta pro maximální úsporu energie). |
| `make debug` | Sestaví **debug** image (interaktivní shell konzole zapnuta). |
| `make flash` | Nahraje zkompilovanou binárku do zařízení přes J-Link SWD. |
| `make clean` | Vymaže build artefakty a CMake cache. |
| `make rttt` | Spustí interaktivní terminálovou konzoli RTT. |
| `make format` | Naformátuje zdrojový kód pomocí `clang-format`. |

**Sestavení a nahrání debug image:**

```bash
make debug
make flash
```

:::caution Chraňte NVS úložiště a provisioning klíče
Příkaz `make flash` spustí standardní `west flash`, který přepíše pouze aplikační flash partition. **Nikdy nespouštějte úplné smazání čipu** (`west flash --erase` ani J-Link mass erase), protože to vymaže nevolatilní úložiště (NVS) obsahující sériové číslo, tajný klíč, claim token a přihlašovací údaje LoRaWAN.
:::

---

## Otevření konzole {#opening-the-console}

Jakmile je nahrán debug image a připojena sonda J-Link, spusťte RTT terminál z adresáře `app`:

```bash
make rttt
```

Otevře se interaktivní shell prompt, kde můžete spouštět příkazy `config`, `alarm`, `history`, `clock` a `ats`.

:::info Automatické uspání konzole
V debug buildech zůstává MCU aktivní, aby byla RTT konzole responzivní, což zvyšuje odběr z baterie. Pokud není po dobu `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (výchozí: 2 hodiny) detekována žádná aktivita na konzoli, zařízení přejde do hlubokého spánku. Pro opětovné zpřístupnění konzole resetujte MCU nebo odpojte a znovu připojte napájení. Produkční release buildy se takto nechovají a mezi intervaly měření přecházejí do hlubokého spánku okamžitě.
:::
