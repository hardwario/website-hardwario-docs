---
title: Nastavení firmwaru
---
import Image from '@theme/IdealImage';

# Nastavení firmwaru {#firmware-setup}

Tento návod popisuje, jak si na svém počítači připravit repozitář firmwaru STICKER, sestavit binární soubory, nahrát image **debug** (ten zapíná interaktivní konzoli shellu) a otevřít konzoli. Odtud začíná práce popsaná v části [**Přístup pro vývojáře**](../developer-mode.md).

:::info Firmware v1.4.0
Firmware zařízení STICKER je postavený na **Zephyr RTOS**. Návod popisuje přípravu vývojového prostředí (workspace), kompilaci binárních souborů release a debug, nahrání přes SWD a bezpečnostní model.
:::

---

## Bezpečnostní model a architektura firmwaru {#security-model--firmware-architecture}

Zařízení STICKER používá **plochý aplikační image** linkovaný přímo od začátku flash paměti:
- **Žádný vzdálený bootloader ani FUOTA:** Zařízení neobsahuje MCUboot ani oddíl DFU. Firmware nelze aktualizovat bezdrátově (FUOTA) ani přes NFC. Původní příkaz `enter_dfu` byl záměrně odstraněn.
- **Žádná vzdálená útočná plocha:** Image firmwaru nelze přes LoRaWAN ani NFC vyměnit, vrátit na starší verzi ani jinak upravit.
- **Pouze fyzický přístup přes SWD:** Přeprogramování nebo aktualizace firmwaru v terénu vyžaduje vždy fyzický přístup k programovacím ploškám SWD a sondu SEGGER J-Link (`make flash`).

---

## Co budete potřebovat {#what-you-need}

- **Zařízení STICKER** s fyzickým přístupem k SWD.
- **Ladicí sonda SEGGER J-Link** (připojení SWD) pro nahrání firmwaru a výstup konzole RTT.
- **Hostitelský systém:** Linux nebo macOS s nástroji Python 3, Git a CMake.
  - *Uživatelé NixOS / Nix:* V kořeni repozitáře je soubor `shell.nix`, který přes `nix-shell` automaticky připraví toolchain ARM, J-Link a prostředí Pythonu.

---

## Příprava vývojového prostředí na počítači {#local-development-workspace-setup}

Repozitář firmwaru je na [**github.com/hardwario/sticker-firmware**](https://github.com/hardwario/sticker-firmware) a spravuje se nástrojem **West** (metanástroj projektu Zephyr).

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

Všechny příkazy pro kompilaci a nahrání firmwaru se spouštějí z adresáře `app` ve workspace firmwaru:

```bash
cd sticker/app
```

### Cíle sestavení {#build-targets}

| Příkaz | Popis |
|---|---|
| `make` | Sestaví **produkční image release**; konzole shellu je kvůli maximální úspoře energie vypnutá. |
| `make debug` | Sestaví image **debug** se zapnutou interaktivní konzolí shellu. |
| `make flash` | Nahraje zkompilovaný binární soubor do zařízení přes J-Link SWD. |
| `make clean` | Smaže výstupy sestavení a cache CMake. |
| `make rttt` | Spustí interaktivní terminálovou konzoli RTT. |
| `make format` | Naformátuje zdrojový kód pomocí `clang-format`. |

**Sestavení a nahrání image debug:**

```bash
make debug
make flash
```

:::caution Chraňte úložiště NVS a klíče zařízení
Příkaz `make flash` spustí standardní `west flash`, který přepíše jen aplikační oddíl flash paměti. **Nikdy nespouštějte úplné smazání čipu** (`west flash --erase` ani J-Link mass erase), protože to vymaže nevolatilní úložiště (NVS) se sériovým číslem, secret key, claim tokenem a přístupovými údaji LoRaWAN.
:::

---

## Otevření konzole {#opening-the-console}

Jakmile je nahraný image debug a připojená sonda J-Link, spusťte terminál RTT z adresáře `app`:

```bash
make rttt
```

Otevře se interaktivní příkazový řádek shellu, ve kterém můžete spouštět příkazy `config`, `alarm`, `history`, `clock` a `ats`.

:::info Automatické uspání konzole
V sestavení debug zůstává MCU aktivní, aby konzole RTT pohotově reagovala, a to zvyšuje odběr z baterie. Pokud na konzoli po dobu `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (výchozí: 2 hodiny) neprobíhá žádná aktivita, zařízení přejde do hlubokého spánku. Konzoli znovu zpřístupníte resetem MCU nebo odpojením a připojením napájení. Produkčních sestavení release se to netýká; mezi intervaly měření přecházejí do hlubokého spánku okamžitě.
:::
