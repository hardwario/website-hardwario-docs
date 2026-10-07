---
title: Příkazy AT
sidebar_position: 1
---
import Image from '@theme/IdealImage';

# Přehled příkazů AT {#at-commands-reference}

Na této stránce najdete všechny příkazy AT, které firmware zařízení GLIDER implementuje. Zadávají se v [**konzoli USB-C**](../console/usb-at.md).

:::tip
Odpovídající příkazy shellu Zephyr (pro J-Link nebo pro `AT$SHELL="…"` v konzoli AT) popisuje stránka [**Příkazy shellu**](shell-commands.md).
:::

Příkazy zpracovává parser **ATCI** (AT Command Interpreter) od HARDWARIO. Každý příkaz začíná předponou `AT`; některé z nich podporují čtyři různé operace popsané níže.

## 1. Syntaxe ATCI {#1-atci-syntax}

Parser ATCI rozlišuje u každého příkazu `AT<CMD>` čtyři operace:

| Typ | Tvar | Význam |
| :--- | :--- | :--- |
| **Akce** | `AT<CMD>` | Spustí akci bez parametrů. |
| **Nastavení** | `AT<CMD>=<value>` | Zápis / konfigurace. |
| **Čtení** | `AT<CMD>?` | Přečte aktuální hodnotu. |
| **Test** | `AT<CMD>=?` | Vrátí metadata: rozsah, typ, výchozí hodnotu, nápovědu. |

#### Asynchronní zprávy {#asynchronous-broadcasts}

Zařízení občas vysílá nevyžádané zprávy, například po startu:

| Zpráva | Kdy |
| :--- | :--- |
| `@BOOT` | Odešle se po dokončení `app_init`. |
| `@LOG:<level>:<message>` | Řádky logu z firmwaru. |

## 2. Katalog příkazů {#2-command-catalogue}

### 2.1 Systém / správa relace {#21-system--session-management}

| Příkaz | Operace | Popis |
| :--- | :--- | :--- |
| `AT+CLAC` | akce | Vypíše všechny registrované příkazy AT. |
| `AT$HELP` | akce | Totéž jako `AT+CLAC`, ale s nápovědou. |
| `AT$CRC=<0\|1\|2>` | nastavení | Režim CRC: `0` vypnuto, `1` striktní, `2` volitelné. |
| `AT$CRC?` | čtení | Aktuální režim CRC. |
| `AT$SHELL="<command>"` | nastavení | Spustí libovolný příkaz shellu Zephyr a jeho výstup průběžně vrací jako `$SHELL: "<line>"`. |
| `AT$REBOOT` | akce | Restartuje zařízení (vyžaduje `CONFIG_HIO_ATCI_CMD_REBOOT=y`). |

### 2.2 Informace o zařízení (`hio_info`) {#22-device-information-hioinfo}

| Příkaz | Operace | Odpověď / popis |
| :--- | :--- | :--- |
| `ATI` | akce | `"<product-name>[-<hw-variant>]-<hw-revision>"` |
| `AT+CGMI` | akce | `+CGMI: "<vendor-name>"` |
| `AT+CGMM` | akce | `+CGMM: "<product-name>"` |
| `AT+CGMR` | akce | `+CGMR: "<hw-revision>"` |
| `AT+CGSN` | akce | `+CGSN: "<serial-number>"` |
| `AT$INFO?` | čtení | Vypíše všechny informační položky jako `$INFO: "<key>","<value>"`. |
| `AT$INFO="<key>"` | nastavení | Přečte jednu položku podle klíče. |
| `AT$INFO=?` | test | Vypíše schéma informací (klíče, typy, popisy). |

### 2.3 Konfigurace (`hio_config`) {#23-configuration-hioconfig}

| Příkaz | Operace | Popis |
| :--- | :--- | :--- |
| `AT$CONFIG?` | čtení | Vypíše všechny konfigurační položky ze všech modulů. |
| `AT$CONFIG="<module>"` | nastavení | Vypíše všechny položky daného modulu. |
| `AT$CONFIG="<module>","<key>"` | nastavení | Přečte jednu položku. |
| `AT$CONFIG="<module>","<key>",<value>` | nastavení | Zapíše položku (řetězce musí být v uvozovkách). |
| `AT$CONFIG=?` | test | Vypíše schéma konfigurace: modul, klíč, typ, rozsah, výchozí hodnotu, popis. |
| `AT&W` | akce | Uloží konfiguraci do flash paměti a restartuje zařízení. |
| `AT&F` | akce | Vrátí celou konfiguraci na tovární nastavení a restartuje zařízení. |

#### Příklad – změna intervalu odesílání {#example---change-the-send-interval}

```text
AT$CONFIG="app","interval-send",60
AT&W
```

### 2.4 Aktualizace firmwaru / DFU (`hio_atci_cmd_fw`) {#24-firmware-update--dfu-hioatcicmdfw}

| Příkaz | Operace | Popis |
| :--- | :--- | :--- |
| `AT$FW?` | čtení | Vypíše `confirmed`, `version` a `swap type` aktivního obrazu. |
| `AT$FW="info"` | nastavení | Podrobný výpis primárního a sekundárního slotu (verze, magic, stav swapu, image-ok, …). |
| `AT$FW="start",<size>` | nastavení | Zahájí relaci DFU pro obraz o velikosti `<size>` bajtů. |
| `AT$FW="chunk",<offset>,"<hex>"` | nastavení | Zapíše blok hexadecimálně zakódovaných dat na daný offset (hex payload je v uvozovkách). |
| `AT$FW="done"` | nastavení | Dokončí přenos a naplánuje swap při dalším startu. |
| `AT$FW="confirm"` | nastavení | Po úspěšném testovacím startu označí běžící obraz jako funkční. |

Proud DFU obvykle **nesestavujete** ručně, ale pomocným nástrojem `west bin-to-at`:

```bash
west bin-to-at --output-file update.at
```

Bez parametru `--input-file` nástroj automaticky použije `build/*/zephyr/zephyr.signed.bin`. Výsledný soubor pošlete do konzole AT příkazem:

```bash
west serial-console --input update.at
```

Celý postup krok za krokem (včetně `AT$FW="confirm"` po restartu) najdete na stránce [**Aplikace přes AT (USB-C)**](../firmware-flashing/application-over-at.md).

## 3. Chybové kódy {#3-error-codes}

| Kód | Význam |
| :--- | :--- |
| `ERROR: "Invalid command"` | Příkaz nezačíná na `AT` (`-ENOMSG`). |
| `ERROR: "Command not found"` | Neznámý příkaz AT (`-ENOEXEC`). |
| `ERROR: "Command not supported"` | Příkaz nepodporuje požadovaný typ operace (`-ENOTSUP`). |
| `ERROR: "Invalid argument"` | Chybný formát argumentu (`-EINVAL`). |
| `ERROR: "Permission denied"` | Nedostatečné oprávnění (`-EACCES`). |
| `ERROR: "Out of memory"` | `-ENOMEM`. |
| `ERROR: "I/O error"` | `-EIO`. |
| `ERROR: "Invalid CRC format"` | Přípona CRC má chybný formát. |
| `ERROR: "CRC mismatch"` | CRC neodpovídá zprávě. |

## 4. Spouštění příkazů shellu z AT {#4-running-shell-commands-from-at}

`AT$SHELL` propojuje konzoli AT se shellem Zephyr. Cokoli, co můžete zadat do [**konzole RTT**](../console/rtt-jlink.md), spustíte i přes `AT$SHELL`:

```text
AT$SHELL="therm state"
AT$SHELL="therm scan"
AT$SHELL="therm scan --save"
AT$SHELL="kernel reboot cold"
AT$SHELL="log disable"
AT$SHELL="log enable wrn"
```

Standardní výstup shellu se průběžně vrací jako řádky `$SHELL: "<line>"`, za nimi následuje `OK` (nebo `ERROR`).

Všechny příkazy shellu popisuje stránka [**Příkazy shellu**](shell-commands.md).
