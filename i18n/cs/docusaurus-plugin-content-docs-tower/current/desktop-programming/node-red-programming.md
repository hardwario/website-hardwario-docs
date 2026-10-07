---
slug: node-red-programming
title: Programování v Node-RED
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

V této kapitole si projdeme **záložku Functions** aplikace HARDWARIO Playground.

:::info

Na **záložce Functions** běží nástroj [**Node-RED**](https://nodered.org/about/), ve kterém pracujete se zařízeními TOWER i s dalšími zařízeními.

Tento návod nemůže popsat všechno, co Node-RED umí. Pokud se chcete dozvědět víc, podívejte se do [**dokumentace Node-RED**](https://nodered.org/docs/).

:::


## Záložka Functions {#functions-tab}

Měli byste vidět tuto obrazovku:

<Image img={require('../../../../../tower/desktop-programming/images/playground-functions.png')} alt="Záložka Functions s vloženým editorem Node-RED: paleta uzlů, prázdný Flow 1 a informační panel" />

### Uzly {#nodes}

Na levé straně obrazovky je seznam uzlů, které můžete při programování v Node-RED použít k nejrůznějším akcím.

:::info

Pro Node-RED si můžete doinstalovat spoustu dalších uzlů, pro práci se zařízeními TOWER by vám ale měly stačit uzly předinstalované.

:::

<div class="container">
  <div class="row">
    <div class="col col--2">
      <div><Image img={require('../../../../../tower/desktop-programming/images/node-red-mqtt-node.png')} alt="Uzel mqtt in z palety Node-RED" /></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>

<br />

Uzly slouží k nejrůznějším účelům. Příkladem je **vizualizace dat**, která úzce souvisí se [**záložkou Dashboard**](./data-visualization.md).

:::info

Více o flow v Node-RED najdete v [**našich projektech na hackster.io**](https://www.hackster.io/hardwario/projects?part_id=73696). Každý projekt, který Node-RED používá, podrobně popisuje, jak s ním pracovat.

:::

:::tip

O další záložce se dozvíte v kapitole [**Vizualizace dat**](./data-visualization.md).

:::

## Videonávod {#video-tutorial}

Pokud dáváte přednost videonávodu, podívejte se na toto video. Je natočené ve starší verzi aplikace Playground, postup je ale stejný.

<ReactPlayer controls src='https://youtu.be/VW_-RCIZ9rY' />
