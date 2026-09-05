---
title: AT konzole (USB-C)
sidebar_position: 2
description: "Tato stránka popisuje, jak komunikovat se zařízením GLIDER přes jeho konektor USB-C pomocí AT příkazů. AT konzole je doporučené rozhraní pro každodenní práci – zprovoznění, konfiguraci, aktualizace firmwaru – a nevyžaduje žádný speciální ladicí…"
---
import Image from '@theme/IdealImage';

# AT konzole přes USB-C {#at-console-over-usb-c}

Tato stránka popisuje, jak komunikovat se zařízením GLIDER přes jeho konektor **USB-C** pomocí **AT příkazů**. AT konzole je doporučené rozhraní pro každodenní práci – zprovoznění, konfiguraci, aktualizace firmwaru – a nevyžaduje žádný speciální ladicí hardware.

:::tip
Hledáte živé logy a plný Zephyr shell? Použijte místo toho [**RTT konzoli (J-Link)**](rtt-jlink.md).
:::

## Jak to funguje {#how-it-works}

Interně zařízení GLIDER propojuje UART0 čipu nRF9151 s převodníkem **FT234XD USB-UART**. Ve chvíli, kdy zapojíte kabel USB-C, firmware převodník napájí a začne přijímat AT příkazy.

| Signál | Pin nRF9151 | Funkce |
| :--- | :--- | :--- |
| `UART0 TX` | `P0.25` | nRF91 → FT234XD RXD |
| `UART0 RX` | `P0.24` | nRF91 ← FT234XD TXD |
| `USB_EN` | `P0.00` | Napájí FT234XD (aktivní v log. 1) |
| `USB_DETECT` | `P0.26` | Detekuje kabel (aktivní v log. 0) |

UART0 pracuje na **1 000 000 baud** (nastaveno v `gauger_lte_nrf9151_common.dtsi`).

Když zapojíte kabel USB-C, firmware:

1. Detekuje kabel na `USB_DETECT` (P0.26).
2. Po 50 ms zákmitové prodlevě zapne `USB_EN` (P0.00) – FT234XD se nastartuje.
3. Aktivuje UART0 RX a začne zpracovávat AT příkazy.

## Předpoklady {#prerequisites}

#### Systémové balíčky {#system-packages}

```bash
sudo apt update
sudo apt install python3 python3-venv git
```

#### Členství ve skupině `dialout` {#membership-in-the-dialout-group}

Linux omezuje přístup k sériovým portům na členy skupiny `dialout`. Přidejte se jednorázově:

```bash
sudo usermod -aG dialout $USER
```

:::caution
Aby se změna skupiny projevila, musíte se **odhlásit a znovu přihlásit**. Ověření:

```bash
groups | grep -o dialout
# should print: dialout
```
:::

#### Ověření, že se kabel USB-C zaregistruje {#verify-the-usb-c-cable-enumerates}

Zapojte zařízení GLIDER a zkontrolujte:

```bash
ls -l /dev/ttyUSB0
# crw-rw---- 1 root dialout ... /dev/ttyUSB0
```

Pokud se `/dev/ttyUSB0` neobjeví, zkontrolujte `dmesg | tail -20` – měli byste vidět něco jako:

```text
usb 1-2: new full-speed USB device
ftdi_sio 1-2:1.0: FTDI USB Serial Device converter detected
usb 1-2: FTDI USB Serial Device converter now attached to ttyUSB0
```

Pokud místo toho vidíte chyby, je problém na straně hardwaru (nesprávný kabel, vadný konektor, FT234XD není napájen).

## Kompletní nastavení s virtuálním prostředím Pythonu {#full-setup-with-a-python-virtual-environment}

Doporučený způsob instalace nástrojů HARDWARIO pro příkazovou řádku je uvnitř **virtualenv** Pythonu. Tím se balíčky izolují od systémového Pythonu a funguje to na každé moderní distribuci Linuxu.

#### Krok 1 – Ověřte, že je nainstalován `python3-venv` {#step-1---verify-python3-venv-is-installed}

```bash
dpkg -l python3-venv | tail -1
# expect a line starting with "ii"
```

Pokud chybí:

```bash
sudo apt install python3-venv
```

#### Krok 2 – Vytvořte virtualenv {#step-2---create-the-virtualenv}

Ve složce svého projektu:

```bash
python3 -m venv .venv
```

#### Krok 3 – Aktivujte virtualenv {#step-3---activate-the-virtualenv}

```bash
source .venv/bin/activate
```

Výzva vašeho shellu by nyní měla mít předponu `(.venv)`.

#### Krok 4 – Nainstalujte potřebné balíčky {#step-4---install-the-required-packages}

```bash
pip install --upgrade pip
pip install west pyserial loguru rttt
```

Co jste právě nainstalovali:

| Balíček | Účel |
| :--- | :--- |
| `west` | Meta-build nástroj používaný Zephyr / nRF Connect SDK |
| `pyserial` | Knihovna pro komunikaci po UART |
| `loguru` | Strukturované logování |
| `rttt` | Knihovna konzolového UI od HARDWARIO – zpracovává rámování `@LOG:` |

#### Krok 5 – Ověřte instalaci {#step-5---verify-the-installation}

```bash
west --version
python3 -c "import serial, loguru, rttt; print('OK')"
```

Oba příkazy by měly proběhnout úspěšně.

## Spuštění konzole {#launching-the-console}

V terminálu, kde je virtualenv aktivní:

```bash
source .venv/bin/activate
west serial-console
```

Výchozí hodnoty, které `west serial-console` používá:

- `--port /dev/ttyUSB0`
- `--baudrate 1000000`

Pokud máte více zařízení, zadejte port explicitně:

```bash
west serial-console --port /dev/ttyUSB1 --baudrate 1000000
```

Konzole udržuje dva oddělené proudy:

- **AT příkazy a odpovědi**: co napíšete a co zařízení GLIDER odpoví.
- **Zprávy `@LOG:`**: živé řádky logu, které projdou po obrazovce, aniž by rušily příkazovou řádku.

Užitečné soubory, které `west serial-console` spravuje:

- Historie příkazů: `~/.serial_console_history`
- Kompletní záznam sezení: `~/.serial_console_console`
- Trasování modemu: `~/.serial_console.mtrace`

## Rychlá kontrola funkčnosti {#a-quick-sanity-check}

```text
AT
# OK

ATI
# "GLIDER-R1.1"
```

Pokud se objeví `OK`, komunikujete se zařízením.

## Základní AT příkazy {#basic-at-commands}

| Příkaz | Co dělá |
| :--- | :--- |
| `AT` | Test připojení – vrací `OK` |
| `AT+CLAC` | Vypíše všechny registrované AT příkazy |
| `AT$HELP` | Stejné jako `+CLAC`, ale s nápovědou |
| `ATI` | Identifikace zařízení |
| `AT+CGMI` | Název výrobce |
| `AT+CGMM` | Název produktu |
| `AT+CGMR` | Revize firmwaru |
| `AT+CGSN` | Sériové číslo |
| `AT$INFO?` | Výpis všech informačních polí (sériové číslo, claim token, …) |
| `AT$REBOOT` | Restartuje zařízení |
| `AT&W` | Uloží konfiguraci do flash |
| `AT&F` | Obnovení výchozího nastavení (vymaže celou konfiguraci) |

#### Konfigurace přes AT {#configuration-over-at}

```text
AT$CONFIG=? # list every configurable key
AT$CONFIG="therm config show" # current thermometer slot bindings
AT$CONFIG="therm config 1 28ab12cd…" # bind slot 1 to a specific DS18B20
AT&W # save and reboot
```

#### Spouštění shell příkazů z AT konzole {#running-shell-commands-from-the-at-console}

AT konzole umí také vykonat jakýkoli **příkaz Zephyr shellu** přes `AT$SHELL`:

```text
AT$SHELL="therm state"
AT$SHELL="therm scan"
AT$SHELL="therm scan --save"
AT$SHELL="kernel reboot cold"
AT$SHELL="log disable"
AT$SHELL="log enable wrn"
```

#### Aktualizace firmwaru {#firmware-update}

Pro programovou aktualizaci firmwaru viz referenci [**AT příkazy**](../commands/at-commands.md) (`AT$FW`).

## Údržba {#maintenance}

| Akce | Příkaz |
| :--- | :--- |
| Opuštění virtualenv | `deactivate` |
| Aktualizace nástrojů | `pip install --upgrade west pyserial loguru rttt` |
| Odstranění virtualenv | `rm -rf .venv` |
| Výpis nainstalovaných balíčků | `pip list` |

## Řešení problémů {#troubleshooting}

#### `Permission denied` na `/dev/ttyUSB0` {#permission-denied-on-devttyusb0}

```bash
ls -l /dev/ttyUSB0
# crw-rw---- 1 root dialout ...

groups | grep dialout
# if "dialout" is missing:
sudo usermod -aG dialout $USER
# then log out / log in (or run: newgrp dialout)
```

#### Port je obsazený {#the-port-is-busy}

Jiný terminál (`screen`, `minicom`, `picocom`, `tio`, …) jej již drží:

```bash
sudo lsof /dev/ttyUSB0
screen -ls && screen -wipe
killall screen minicom picocom tio 2>/dev/null
```

#### Logy přicházejí, ale AT příkazy se nevracejí zpět {#logs-arrive-but-at-commands-are-not-echoed-back}

Váš terminál posílá **pouze CR** místo `LF` nebo `CRLF`. `west serial-console` řeší konce řádků automaticky, jiné terminály ale nemusí. Například při použití `tio`:

```bash
tio -b 1000000 -m INLCRNL,OCRNL /dev/ttyUSB0
```

`OCRNL` mapuje odchozí CR na LF.

## Alternativní terminály {#alternative-terminals}

Pokud `west serial-console` není k dispozici, funguje jakýkoli terminál, který zvládne **1 000 000 baud**:

```bash
# tio (recommended alternative)
tio -b 1000000 -m INLCRNL,OCRNL /dev/ttyUSB0
# exit: Ctrl-T Q

# picocom
picocom -b 1000000 --omap crlf /dev/ttyUSB0
# exit: Ctrl-A Ctrl-X

# pyserial miniterm
python3 -m serial.tools.miniterm /dev/ttyUSB0 1000000
# exit: Ctrl-]
```
