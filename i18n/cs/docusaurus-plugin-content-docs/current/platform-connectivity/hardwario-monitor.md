---
slug: hardwario-monitor
title: HARDWARIO Monitor
description: "Stáhněte si HARDWARIO Monitor na stránce projektu na GitHubu."
---
import Image from '@theme/IdealImage';

# HARDWARIO Monitor {#hardwario-monitor}

**HARDWARIO Monitor** je grafický multiplatformní počítačový program pro **konfiguraci** a **správu** zařízení CHESTER.

 [**Stáhněte si HARDWARIO Monitor**](https://github.com/hardwario/hio-monitor/releases) na stránce projektu na GitHubu.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../chester/platform-connectivity/images/hardwario-monitor.png')} alt="Okno aplikace HARDWARIO Monitor s panely Interactive shell a Device Log a volbami Console, Bluetooth, Flash na levé straně" /></div>
    </div>
    <div class="col col--12">
    </div>
  </div>
</div>

Po spuštění aplikace máte na **levé straně** aplikace k dispozici možnosti připojení k zařízení CHESTER pomocí:

## Console {#console}

Pro tuto možnost potřebujete programátor **J-Link**. Pro přenos logů a shellu ze zařízení **CHESTER** používáme **J-Link RTT** (Real Time Transfer).

Připojte **J-Link** k zařízení **CHESTER** pomocí J-Link připojeného ke [**konektoru APP/BLE SWD**](../../chester/developer-tools/segger-j-link#segger-j-link-to-app-port-connection).

Poté klikněte na tlačítko **Attach** na pravé straně okna.

Dávku konzolových příkazů můžete importovat tlačítkem 📄 **Batch** na pravé straně okna a vybrat textový soubor s příkazy, které se budou do zařízení CHESTER posílat řádek po řádku. Dá se to využít například pro nasazení konfigurace na více jednotek.

### Funkce a klávesové zkratky konzole {#console-functions-and-shortcuts}

* ꜛ nahoru a ꜜ dolů: procházení historie příkazů
* `Ctrl` + `R` – otevře seznam posledních použitých příkazů. Zapisováním částí příkazů můžete v tomto seznamu vyhledávat.
* Vyhledávání: v pravém dolním rohu klikněte na 🔍, zadejte hledaný text a stiskněte enter. Klávesa `n` hledá dopředu, `Shift` + `n` hledá dozadu, F5 nebo kliknutí na tlačítko `Undo` v pravém sloupci režim vyhledávání vypne.

## Bluetooth {#bluetooth}

K **CHESTER Shell** se můžete připojit přes Bluetooth. To je užitečné pro použití příkazu `info show` pro zjištění verze firmwaru nebo pro zobrazení/změnu konfigurace zařízení pomocí příkazů `app config show`.

Pokud se vám nepodaří zařízení spárovat z aplikace **HARDWARIO Monitor**, musíte ho nejprve spárovat pomocí systémového dialogu Bluetooth. Poté se vraťte do aplikace **HARDWARIO Monitor**
a připojte se k zařízení znovu.

## Flash {#flash}

Firmware můžete nahrát přes konektor **APP** na základní desce zařízení **CHESTER** pomocí USB zařízení **J-Link**. Stačí zkopírovat **unikátní ID** z vydaného firmwaru a firmware se stáhne a nahraje.

## Logy {#logs}

**HARDWARIO Monitor** zaznamenává veškerou komunikaci na váš disk. To je užitečné, pokud byste chtěli při řešení problémů sdílet kompletní logy s HARDWARIO.

Kam se logy ukládají, závisí na typu a verzi vašeho operačního systému:

### Windows {#windows}
```
C:/Users/<USER>/AppData/Roaming/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
C:/ProgramData/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
```

### Linux {#linux}

```
~/.local/share/HARDWARIO/AppRun.wrapped/hardwario-monitor-console.log
~/.local/share/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
/usr/local/share/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
/usr/share/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
```

### macOS {#macos}

```
~/Library/Application Support/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
/Library/Application Support/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
```
