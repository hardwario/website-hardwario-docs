---
slug: hardwario-tower-console
title: Konzole TOWER
---
import Image from '@theme/IdealImage';

:::info

Tento návod předpokládá, že máte spuštěné Visual Studio Code s nainstalovaným rozšířením HARDWARIO TOWER. Pokud ne, přečtěte si kapitolu [**O aplikaci HARDWARIO Code**](./about-hardwario-code.md).

:::

Logování má v **HARDWARIO Code** vlastní záložku ve spodním panelu.

<Image img={require('../../../../../tower/firmware-development/images/hardwario-console-showcase.png')} alt="Zvýrazněná záložka TOWER ve spodním panelu VS Code se zprávou NO DEVICE ATTACHED" />
<br />

V této konzoli se budou zobrazovat logy z připojeného zařízení.

:::info

Aby firmware do konzole něco vypisoval, musí obsahovat logovací zprávy. Více se dozvíte v [**kapitole Debugování**](./firmware-debugging.md).

:::

## Ovládání {#controls}

V otevřené konzoli HARDWARIO TOWER najdete vpravo několik tlačítek. Popisujeme je zleva doprava:

<div class="container">
  <div class="row">
    <div class="col col--3">
      <h4>Není připojeno žádné zařízení</h4>
      <div><Image img={require('../../../../../tower/firmware-development/images/console-commands-disconnected.png')} alt="Ikony na liště konzole TOWER dostupné, když není připojeno žádné zařízení" /></div>
    </div>
    <div class="col col--3">
      <h4>Připojeno zařízení TOWER</h4>
      <div><Image img={require('../../../../../tower/firmware-development/images/console-commands-connected.png')} alt="Ikony na liště konzole TOWER dostupné s připojeným zařízením TOWER, včetně restartu zařízení" /></div>
    </div>
  </div>
</div>


- **Clear console**: vymaže všechny přijaté logovací zprávy.
- **Connect/Disconnect console**: připojí konzoli k zařízení vybranému ve spodním panelu. Pokud je konzole již připojená, odpojí ji. Toto tlačítko nemusíte používat, pokud používáte příkazy rozšíření [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console) nebo [**Attach console**](./hardwario-extension-tutorial.md#attach-console).
- **Restart device**: restartuje připojené zařízení, takže program na něm poběží znovu od začátku.
- **Scroll to bottom**: ve výchozím nastavení konzole automaticky roluje spolu se zprávami. Když se posunete k nějaké starší zprávě, automatické rolování se vypne. Znovu ho zapnete tímto tlačítkem.
- **Save Log**: uloží zobrazený log.
- **Allow Input**: zapne odesílání vstupu do zařízení. [**Hodí se pro příkazy AT**](../radio-communication/lora-at-commands.md).
- **Maximize window**: zvětší konzoli. Jde o standardní tlačítko Visual Studio Code dostupné na většině panelů.
- **Close panel**: zavře celý panel, nejen konzoli HARDWARIO TOWER.
