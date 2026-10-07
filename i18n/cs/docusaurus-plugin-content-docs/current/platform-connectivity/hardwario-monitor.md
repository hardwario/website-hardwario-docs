---
slug: hardwario-monitor
title: HARDWARIO Monitor
---
import Image from '@theme/IdealImage';

# HARDWARIO Monitor {#hardwario-monitor}

**HARDWARIO Monitor** je multiplatformní grafický program pro počítač, kterým **konfigurujete** a **spravujete** zařízení CHESTER.

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

Po spuštění najdete na **levé straně** aplikace tyto způsoby připojení k zařízení CHESTER:

## Console {#console}

Tato možnost vyžaduje programátor **J-Link**. Logy a shell se ze zařízení **CHESTER** přenášejí přes **J-Link RTT** (Real Time Transfer).

Připojte programátor **J-Link** ke [**konektoru APP/BLE SWD**](/chester/developer-tools/segger-j-link/#segger-j-link-to-app-port-connection) zařízení **CHESTER**.

Poté klikněte na tlačítko **Attach** na pravé straně okna.

Tlačítkem 📄 **Batch** na pravé straně okna můžete načíst dávku příkazů konzole: vyberte textový soubor s příkazy a ty se pošlou do zařízení CHESTER řádek po řádku. Hodí se to například k nahrání stejné konfigurace do více zařízení.

### Funkce a klávesové zkratky konzole {#console-functions-and-shortcuts}

* šipky ꜛ nahoru a ꜜ dolů: procházení historie příkazů
* `Ctrl` + `R`: otevře seznam posledních použitých příkazů. Když začnete psát část příkazu, seznam se podle ní vyfiltruje.
* Vyhledávání: v pravém dolním rohu klikněte na 🔍, zadejte hledaný text a stiskněte Enter. Klávesa `n` hledá dopředu, `Shift` + `n` hledá dozadu, F5 nebo kliknutí na tlačítko `Undo` v pravém sloupci režim vyhledávání vypne.

## Bluetooth {#bluetooth}

Ke **CHESTER Shell** se můžete připojit i přes Bluetooth. Hodí se to například pro příkaz `info show`, kterým zjistíte verzi firmwaru, nebo pro zobrazení a změnu konfigurace zařízení příkazy `app config show`.

Pokud se zařízení z aplikace **HARDWARIO Monitor** spárovat nepodaří, spárujte ho nejprve v systémovém dialogu Bluetooth. Poté se vraťte do aplikace **HARDWARIO Monitor**
a připojte se k zařízení znovu.

## Flash {#flash}

Firmware nahrajete přes konektor **APP** na základní desce zařízení **CHESTER** programátorem **J-Link** připojeným přes USB. Stačí zkopírovat **unikátní ID** vydaného firmwaru a aplikace firmware sama stáhne a nahraje.

## Logy {#logs}

**HARDWARIO Monitor** ukládá záznam veškeré komunikace na disk. Hodí se to, když při řešení problémů chcete poslat HARDWARIO kompletní logy.

Kam se logy ukládají, závisí na typu a verzi operačního systému:

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
