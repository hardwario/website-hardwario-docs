---
title: Nastavení firmwaru
---
import Image from '@theme/IdealImage';

# Nastavení firmwaru {#firmware-setup}

Tento návod popisuje, jak si na svém počítači připravit repozitář firmwaru STICKER, sestavit binární soubory, nahrát image **debug** (ten zapíná interaktivní konzoli shellu) a otevřít konzoli. Odtud začíná práce popsaná v části [**Přístup pro vývojáře**](../developer-mode.md).

:::info Firmware v2.0.0
Firmware zařízení STICKER je postavený na **Zephyr RTOS**. Návod popisuje přípravu vývojového prostředí (workspace), kompilaci image release, debug a provisioning, nahrání přes SWD a bezpečnostní model. Firmware v2.0.0 se sestavuje proti forku projektu Zephyr od HARDWARIO a po každém `west update` potřebuje aplikovat patch (viz krok 2).
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
west patch apply
west zephyr-export
west packages pip --install
```

Manifest (`west.yml`) připíná fork projektu Zephyr od HARDWARIO, [**hardwario/sticker-zephyr**](https://github.com/hardwario/sticker-zephyr), na pevnou revizi. `west patch apply` aplikuje patche STICKER na moduly spravované nástrojem West (stack LoRaWAN `loramac-node`). **Spusťte ho znovu po každém `west update`**; bez patche odmítne sestavení s LoRaWAN konfiguraci dokončit.

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

Zdrojový kód naformátujete pomocí `clang-format` příkazem `make format` spuštěným z kořene repozitáře (ne z adresáře `app`).

**Sestavení a nahrání image debug:**

```bash
make debug
make flash
```

### Varianty sestavení {#build-variants}

| | Release | Debug | Provisioning |
|---|---|---|---|
| Příkaz pro sestavení (v `app`) | `make` | `make debug` | `west build -p always -b sticker -- -DEXTRA_CONF_FILE="debug.conf;provisioning.conf"` |
| Shell a konzole RTT | ne | ano | ano |
| Výpis logu | žádný | varování a chyby | žádný |
| Senzory | všechny | bez 1-Wire, akcelerometru, PIR a bzučáku | všechny |
| Regiony LoRaWAN | EU868, US915, AU915, AS923 | EU868 | EU868 |
| Rádio P2P | ano | ne | ne |
| Historie senzorů | kruhový buffer 32 KB ve flash | kruhový buffer 992 B v RAM, při startu se vyprázdní | minimální buffer v RAM |
| Řízení spotřeby | zapnuté | vypnuté (automatické uspání po 2 h) | vypnuté (automatické uspání po 2 h) |

- **Release** je produkční image: bez konzole, se všemi senzory a regiony, s rádiem P2P a historií ve flash paměti.
- **Debug** (`debug.conf`) přidává shell a log přes RTT a dělá jim místo tím, že vynechá některé senzory, rádio P2P a jiné regiony než EU868. Senzor pro testování na stole zapnete na příkazové řádce, například `west build -p always -b sticker -- -DEXTRA_CONF_FILE=debug.conf -DCONFIG_W1=y`. Image debug je blízko limitu flash paměti; pokud se sestavení s dalším podsystémem nevejde, přidejte `-DCONFIG_SHELL_HELP=n`.
- **Provisioning** (`debug.conf` + `provisioning.conf`) je image pro výrobní linku: se všemi senzory a se shellem pro zápis identity, klíčů a konfigurace, bez výpisu logu. Potom se **bez mazání** nahraje image release, který nastartuje se zapsanými hodnotami. Během zprovoznění nastavte `config radio-mode lorawan` a `settings save`, aby se image release při prvním startu připojil k síti. Oba image sestavte ze stejného commitu, aby se shodovalo rozvržení nastavení.

Každé vydání s tagem na GitHubu obsahuje tři image, `hio-sticker-<version>-release.hex`, `hio-sticker-<version>-debug.hex` a `hio-sticker-<version>-provisioning.hex`, a soubor `SHA256SUMS` pro kontrolu stažených souborů (`sha256sum -c SHA256SUMS`).

:::caution Chraňte úložiště NVS a klíče zařízení
Příkaz `make flash` spustí standardní `west flash`, který přepíše jen aplikační oddíl flash paměti. **Nikdy nespouštějte úplné smazání čipu** (`west flash --erase` ani J-Link mass erase), protože to vymaže nevolatilní úložiště (NVS) se sériovým číslem, secret key, claim tokenem a přístupovými údaji LoRaWAN.
:::

---

## Otevření konzole {#opening-the-console}

Jakmile je nahraný image debug a připojená sonda J-Link, spusťte terminál RTT z adresáře `app`:

```bash
make rttt
```

Otevře se interaktivní příkazový řádek shellu, ve kterém můžete spouštět příkazy `config`, `alarm`, `sensor`, `history`, `clock`, `settings` a `ats`.

:::info Automatické uspání konzole
V sestavení debug zůstává MCU aktivní, aby konzole RTT pohotově reagovala, a to zvyšuje odběr z baterie. Pokud na konzoli po dobu `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (výchozí: 2 hodiny) neprobíhá žádná aktivita, zařízení přejde do hlubokého spánku. Konzoli znovu zpřístupníte resetem MCU nebo odpojením a připojením napájení. Produkčních sestavení release se to netýká; mezi intervaly měření přecházejí do hlubokého spánku okamžitě.
:::
