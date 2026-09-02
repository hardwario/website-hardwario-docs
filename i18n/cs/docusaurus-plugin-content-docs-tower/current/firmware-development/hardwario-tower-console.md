---
slug: hardwario-tower-console
title:  TOWER Console
description: "Tento návod předpokládá, že máte spuštěné Visual Studio Code s nainstalovaným rozšířením HARDWARIO TOWER. Pokud ne, navštivte prosím O HARDWARIO Code."
---
import Image from '@theme/IdealImage';

:::info

Tento návod předpokládá, že máte spuštěné Visual Studio Code s nainstalovaným rozšířením HARDWARIO TOWER. Pokud ne, navštivte prosím [**O HARDWARIO Code**](./about-hardwario-code.md).

:::

Pro logování v **HARDWARIO Code** je k dispozici záložka ve spodním panelu.

<Image img={require('../../../../../tower/firmware-development/images/hardwario-console-showcase.png')} alt="Zvýrazněná záložka TOWER ve spodním panelu VS Code se zprávou NO DEVICE ATTACHED" />
<br />

V této konzoli se budou zobrazovat logy z připojeného zařízení.

:::info

Aby firmware do této konzole něco vypisoval, musíte do něj zahrnout nějaké logovací zprávy. Více si o tom můžete přečíst v [**kapitole Ladění**](./firmware-debugging.md).

:::

## Ovládání {#controls}

Pokud otevřete konzoli HARDWARIO TOWER, najdete na pravé straně několik tlačítek. Uvádíme je zleva doprava

<div class="container">
  <div class="row">
    <div class="col col--3">
      <h4>Není připojeno žádné zařízení</h4>
      <div><Image img={require('../../../../../tower/firmware-development/images/console-commands-disconnected.png')} alt="Ikony na liště konzole TOWER dostupné, když není připojeno žádné zařízení" /></div>
    </div>
    <div class="col col--3">
      <h4>Připojené zařízení TOWER</h4>
      <div><Image img={require('../../../../../tower/firmware-development/images/console-commands-connected.png')} alt="Ikony na liště konzole TOWER dostupné s připojeným zařízením TOWER, včetně restartu zařízení" /></div>
    </div>
  </div>
</div>


- **Clear console** – vymaže všechny přijaté logovací zprávy.
- **Connect/Disconnect console** – připojí konzoli k zařízení vybranému ve spodním panelu. Pokud je konzole již připojená, odpojí ji. Toto tlačítko nemusíte používat, pokud používáte příkazy rozšíření [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console) nebo [**Attach console**](./hardwario-extension-tutorial.md#attach-console).
- **Restart device** – tento příkaz restartuje připojené zařízení a spustí program na zařízení od začátku.
- **Scroll to bottom** – ve výchozím nastavení konzole automaticky roluje spolu se zprávami. Pokud odrolujete, abyste si prohlédli nějakou zprávu, automatické rolování se vypne. Pro jeho opětovné spuštění stačí kliknout na toto tlačítko.
- **Save Log** – uloží zobrazený log.
- **Allow Input** – umožní odesílat vstup do zařízení. [**Použitelné pro AT příkazy**](../radio-communication/lora-at-commands.md).
- **Maximize window** – zvětší konzoli. Jde o standardní tlačítko Visual Studio Code dostupné na většině panelů.
- **Close panel** – zavře celý panel, nejen konzoli HARDWARIO TOWER.
