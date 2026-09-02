---
slug: hardwario-extension-tutorial
title: Návod k rozšíření TOWER Extension
description: "Tento návod předpokládá, že máte nainstalované a funkční Visual Studio Code s naším rozšířením HARDWARIO TOWER nebo HARDWARIO Code."
---
import Image from '@theme/IdealImage';

:::info

Tento návod předpokládá, že máte nainstalované a funkční [**Visual Studio Code s naším rozšířením HARDWARIO TOWER**](./tower-vscode-extension.md) nebo [**HARDWARIO Code**](./about-hardwario-code.md).

:::

Toto rozšíření umožňuje jednoduše **vyvíjet**, **nahrávat** a **debugovat firmware** pro **HARDWARIO TOWER**.

Rozšíření má dva režimy provozu:

:::info

V obou režimech byste měli vidět **logo HARDWARIO v postranním panelu**.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div>
        <Image img={require('../../../../../tower/firmware-development/images/hardwario-sidebar-icon.png')} alt="Levý postranní panel VS Code se šipkou ukazující na ikonu HARDWARIO" />
      </div>
    </div>
    <div class="col col--6">
    </div>
  </div>
</div>

:::

- Pokud máte otevřený nějaký firmware pro HARDWARIO TOWER ([**režim Firmware Mode**](#firmware-mode))
<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/firmware-development/images/firmware-mode.png')} alt="Paleta TOWER v režimu Firmware Mode se sekcemi Start, Commands, Maintenance a Resources" /></div>
    </div>
    <div class="col col--6">
    </div>
  </div>
</div>

- Pokud máte otevřeno cokoli jiného nebo nic ([**režim Basic Mode**](#basic-mode))
  <div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/firmware-development/images/basic-mode.png')} alt="Paleta TOWER v režimu Basic Mode pouze se sekcemi Start a Resources" /></div>
    </div>
    <div class="col col--6">
    </div>
  </div>
  </div>

## Basic Mode {#basic-mode}

Pokud jste neotevřeli složku s firmwarem pro HARDWARIO TOWER, rozšíření se aktivuje, ale **nabídne méně možností**.

Získáte přístup k několika základním příkazům, které vás dovedou na naše webové stránky, a dále ke dvěma příkazům pro **klonování firmwaru z našeho [GitHubu](https://github.com/hardwario)**.

Tyto příkazy můžete použít, když začínáte s vývojem firmwaru.

### From Skeleton Project… {#from-skeleton-project}

Budete vyzváni k výběru složky, do které se má naklonovat [**firmware twr-skeleton**](https://github.com/hardwario/twr-skeleton) (**vytvoří se nová složka pro firmware**).

Po výběru složky byste **měli svou složku s firmwarem pojmenovat**, abyste nenarazili na kolize s jinými složkami firmwaru.

### From Existing Project… {#from-existing-project}

Zobrazí se vám seznam existujícího firmwaru pro HARDWARIO TOWER dostupného na našem [**GitHubu**](https://github.com/hardwario). Kterýkoli z nich můžete vybrat podle **názvu** a **popisu** firmwaru.

Budete vyzváni k výběru složky, do které se má vybraný firmware naklonovat (**vytvoří se nová složka pro firmware**). Po výběru složky můžete **svou složku s firmwarem pojmenovat**, abyste nenarazili na kolize s jinými složkami firmwaru.

:::note

Po naklonování firmwaru se okno **znovu otevře již se složkou firmwaru**.

:::

## Firmware Mode {#firmware-mode}

:::tip

Pokud používáte standardní firmware, měl by se na začátku otevřít soubor `/src/application.c`, takže můžete rovnou začít vyvíjet.

:::

V tomto režimu získáte několik dalších ovládacích prvků ve **spodním panelu** a v **postranním panelu**.

Ve **spodním panelu** jsou důležité ovládací prvky, které můžete rychle použít bez nutnosti sahat po **ovládacích prvcích v postranním panelu**

<Image img={require('../../../../../tower/firmware-development/images/bottom-panel.png')} alt="Stavový řádek VS Code s ovládacími prvky rozšíření HARDWARIO: build, flash, typ firmwaru a zařízení" />

#### Výběr zařízení `Device: COM3 - bc-core-module` {#device-selection-device-com3---bc-core-module}

Tímto vyberete zařízení, se kterým chcete pracovat. Pokud nemáte připojené **žádné zařízení HARDWARIO**, zobrazí se výzva `No Device found!`. Pokud máte připojeno více zařízení, můžete je **procházet klikáním na text**.

#### Výběr typu firmwaru `Firmware type: Debug` {#firmware-type-selection-firmware-type-debug}

Můžete zvolit, zda chcete sestavovat v režimu `Debug` nebo `Release`. Pro běžný vývoj doporučujeme výchozí nastavení `debug`, protože zapíná logování.

:::info

Jsou zde i další ikony, které můžete použít; budou popsány dále společně s **příkazy, které vyvolávají**.

:::

### Build + Flash (Console) {#build--flash-console}

Tento příkaz provede **celý** cyklus, který můžete při vývoji používat. **Sestaví firmware**, **nahraje jej** do vybraného zařízení a poté **připojí konzoli** k zařízení, abyste viděli logovací zprávy.

:::note

Tohle budete při vývoji používat většinu času.

:::

:::info

Pro [**konzoli TOWER Console**](./hardwario-tower-console.md) existuje samostatná kapitola.

:::

### Build + Flash (Debugger) {#build--flash-debugger}

:::caution

Aby to fungovalo správně, budete potřebovat [**sondu JLink**](https://www.segger.com/products/debug-probes/j-link/). Tohle je určeno pro **pokročilé debugování**. Musíte mít `arm-none-eabi-gdb` a `JLinkGDBServerCL` v **PATH**. Pokud používáte naši přenosnou verzi, nemusíte se tím zabývat a potřebujete jen sondu JLink.

:::

Tento příkaz nepřipojí konzoli jako ten **předchozí**, ale místo toho se pokusí připojit k **debuggeru JLink** pro **pokročilé debugování**. Více o debugování přes JLink si můžete přečíst v [**kapitole Pokročilé debugování**](./advanced-debugging.md).

### Clean All Outputs {#clean-all-outputs}

Tento příkaz vyčistí všechny výstupy, takže můžete **vše zkompilovat od začátku**.

### Build Firmware {#build-firmware}

Tento příkaz spustí nad kódem **CMake** a **ninja**. Můžete tak zkontrolovat, zda v kódu nemáte nějaké **chyby** nebo **varování**, ještě než jej nahrajete do zařízení.

### Flash Firmware {#flash-firmware}

Tento příkaz **nahraje** firmware do **vybraného zařízení**. Zároveň spustí **příkaz pro sestavení**, pokud jste to předtím neudělali nebo jste zapomněli změny znovu sestavit.

### Attach Console {#attach-console}

Tento příkaz připojí konzoli k **vybranému zařízení**, takže můžete zobrazit **logovací zprávy**.

:::info

Pro [**konzoli TOWER Console**](./hardwario-tower-console.md) existuje samostatná kapitola.

:::

### Attach Debugger {#attach-debugger}

:::caution

Aby to fungovalo správně, budete potřebovat [**sondu JLink**](https://www.segger.com/products/debug-probes/j-link/). Tohle je určeno pro pokročilé debugování. Musíte mít `arm-none-eabi-gdb` a `JLinkGDBServerCL` v **PATH**. Pokud používáte naši přenosnou verzi, nemusíte se tím zabývat a potřebujete jen sondu JLink.

:::

Tento příkaz se pokusí připojit k JLink pro pokročilé debugování.

Více o debugování přes JLink si můžete přečíst v [**kapitole Pokročilé debugování**](./advanced-debugging.md).

Debugování lze spustit **několika způsoby**:

#### Stiskněte klávesu F5, když je aktivní nějaký soubor *.c nebo *.h {#press-the-f5-button-with-some-c-or-h-file-in-focus}

:::info

Ve složce `.vscode` by neměl být přítomen soubor `launch.json`.

:::

Pokud chcete jen spustit debugování a nic v `launch.json` neměnit, stačí stisknout **F5** a vybrat TOWER Debugger. Debugování by mělo bez problémů začít
<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../tower/firmware-development/images/start-debugger.png')} alt="Rozbalovací nabídka výběru debuggeru se zvýrazněnou položkou TOWER: Debugger" /></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
  </div>

#### Přejděte do Run and Debug a vytvořte `launch.json` {#go-to-the-run-and-debug-and-create-launchjson}

Pokud chcete mít vlastní `launch.json`, přejděte do okna **Run and Debug** v **postranním panelu**, klikněte na **create a launch.json** a vyberte TOWER Debugger. Nebo přidejte tuto konfiguraci do již existujícího souboru.

```json showLineNumbers
{
    "name": "HARDWARIO TOWER Debug",
    "request": "launch",
    "type": "cortex-debug",
    "cwd": "${workspaceFolder}",
    "device": "STM32L083CZ",
    "servertype": "jlink",
    "jlinkscript": "./sdk/tools/jlink/flash.jlink",
    "interface": "swd",
    "serverpath": "${command:hardwario-tower.locate_jlink}",
    "svdFile": "./sdk/sys/svd/stm32l0x3.svd",
    "gdbPath": "${command:hardwario-tower.locate_toolchain}",
    "runToEntryPoint": "application_init",
    "executable": "${workspaceFolder}/out/debug/firmware.elf",
    "windows": {
        "gdbPath": "${command:hardwario-tower.locate_toolchain}.exe",
        "serverpath": "${command:hardwario-tower.locate_jlink}.exe"
    }
}
```
#### Stiskněte Attach Debugger v paletě příkazů rozšíření HARDWARIO {#press-attach-debugger-in-the-hardwario-extension-command-palette}

Tuto možnost použijte, pokud se nechcete zabývat souborem `launch.json` ani žádnými dalšími dříve zmíněnými možnostmi. Stačí vybrat **logo HARDWARIO v postranním panelu** a zvolit možnost **Attach Debugger** nebo **Build + Flash (Debugger)**.
