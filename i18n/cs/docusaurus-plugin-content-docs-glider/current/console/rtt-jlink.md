---
title: RTT konzole (J-Link)
sidebar_position: 1
description: "RTT konzole vám dává Zephyr shell a živý tok logů firmwaru – je to doporučená konzole pro vývoj a ladění. Pro běžnou konfiguraci použijte raději AT konzoli přes USB-C – není potřeba žádný speciální hardware."
---
import Image from '@theme/IdealImage';

# RTT konzole přes J-Link {#rtt-console-over-j-link}

:::tip
RTT konzole vám dává **Zephyr shell** a živý tok logů firmwaru – je to doporučená konzole pro **vývoj a ladění**. Pro běžnou konfiguraci použijte raději [**AT konzoli přes USB-C**](usb-at.md) – není potřeba žádný speciální hardware.
:::

Tato stránka ukazuje, jak se připojit k zařízení GLIDER pomocí ladicí sondy **Segger J-Link** protokolem **RTT (Real-Time Transfer)**. RTT poskytuje plný **Zephyr shell** plus živé logy firmwaru – je to doporučená konzole pro vývoj a ladění.

## Kdy tuto konzoli použít {#when-to-use-this-console}

| | **RTT (`rttt`)** | **AT přes USB-C (`west serial-console`)** |
| :--- | :--- | :--- |
| Cesta | J-Link → SWD → RTT | USB-C → FT234XD → UART0 |
| Co uvidíte | Zephyr shell + logy | AT příkazy + zprávy `@LOG:` |
| Potřebný hardware | Sonda J-Link + vodiče SWD | Jen kabel USB-C |
| Nejlepší pro | Vývoj, ladění, nahrání firmwaru, reset | Běžné zprovoznění |

:::info
Pokud nepotřebujete plný vývojářský přístup, použijte raději [**AT konzoli přes USB-C**](usb-at.md) – nevyžaduje žádný speciální hardware.
:::

## Předpoklady {#prerequisites}

Na počítači potřebujete tři věci:

1. **Systémové balíčky** (Python, venv, Git):

 ```bash
 sudo apt update
 sudo apt install python3 python3-venv git
 ```

2. Nainstalovaný **softwarový balík Segger J-Link**. Ověřte příkazem:

 ```bash
 which JLinkExe
 # /usr/bin/JLinkExe
 ```

 Pokud `JLinkExe` chybí, stáhněte software J-Link ze [stránek Segger](https://www.segger.com/downloads/jlink/) a nainstalujte jej.

3. **CLI nástroj `rttt`** dostupný v aktivním virtuálním prostředí Pythonu:

 ```bash
 source .venv/bin/activate
 which rttt
 rttt --version
 ```

 Pokud `rttt` ve venv chybí, nainstalujte jej:

 ```bash
 pip install rttt
 ```

## Hardware {#hardware}

- **Sonda J-Link** (externí sonda Segger nebo integrovaný J-Link na vývojovém kitu Nordic).
- **USB kabel** ze sondy J-Link do počítače.
- **Vodiče SWD** připojené k ladicímu konektoru zařízení GLIDER: `SWDIO`, `SWCLK`, `GND`, `VTref`.
- **Napájené zařízení GLIDER** (z vlastního napájení nebo přes `VTref` ze sondy).

## Spuštění konzole {#launching-the-console}

S aktivním venv:

```bash
rttt --device nRF9151_xxCA
```

:::caution
Identifikátor zařízení musí být **`nRF9151_xxCA`** – malými písmeny `xx`, velkými `CA`. Výchozí identifikátor `xxAA` koliduje s verzemi J-Link DLL ≥ V9.42 a připojení tiše selže.
:::

Pokud máte připojeno více sond J-Link, vyberte jednu podle sériového čísla:

```bash
rttt --device nRF9151_xxCA --serial 123456789
```

Pro reset zařízení při připojení (užitečné, pokud firmware spadl):

```bash
rttt --device nRF9151_xxCA --reset
```

## Co získáte {#what-you-get}

Interaktivní **Zephyr shell** s promptem `uart:~$`:

- **Živé logy** proudí tak, jak vznikají.
- **Příkazy shellu** lze psát a přímo spouštět.

Několik užitečných příkazů na začátek:

```text
help # list all commands
device list # list Zephyr devices
kernel uptime # time since last boot
kernel reboot cold # cold restart
log disable # silence logs for a clean shell
log enable wrn # show only warnings and above
info show # device info: serial number, claim token, version
```

Mezi příkazy specifické pro GLIDER patří `app`, `inputs`, `therm`, `alarm`, `modbus` a `led` – úplný seznam najdete v referenci [**Příkazy shellu**](../commands/shell-commands.md).

## Ukončení {#exiting}

Stiskněte **`Ctrl+C`** nebo prostě zavřete okno terminálu.

## Řešení problémů {#troubleshooting}

#### `Failed to open J-Link` {#failed-to-open-j-link}

Sondu drží jiný proces (`nrfjprog`, jiná relace `rttt`, Segger Ozone, debugger ve VS Code apod.). Najděte jej a ukončete:

```bash
ps aux | grep -i jlink
```

#### `Could not find requested device` {#could-not-find-requested-device}

- Zkontrolujte identifikátor zařízení – musí být `nRF9151_xxCA` (malými písmeny `xx`, velkými `CA`).
- Ověřte, že je zařízení GLIDER napájené.
- Ověřte, že jsou vodiče SWD (`SWDIO`, `SWCLK`, `GND`, `VTref`) správně připojené.
- Spusťte `JLinkExe` interaktivně a příkazem `connect` ověřte, že sonda vidí cílové zařízení.

#### Konzole se připojí, ale prompt `uart:~$` se nikdy neobjeví {#console-attaches-but-the-prompt-uart-never-appears}

Firmware neběží nebo spadl. Resetujte zařízení při připojení:

```bash
rttt --device nRF9151_xxCA --reset
```

#### `pylink-square` hlásí problém s `libjlinkarm.so.X` {#pylink-square-complains-about-libjlinkarmsox}

Nainstalovaná verze softwarového balíku J-Link neodpovídá verzi knihovny, kterou `pylink-square` očekává. Přeinstalujte nejnovější balík J-Link nebo na něj nasměrujte `LD_LIBRARY_PATH`:

```bash
export LD_LIBRARY_PATH=/opt/SEGGER/JLink:$LD_LIBRARY_PATH
```
