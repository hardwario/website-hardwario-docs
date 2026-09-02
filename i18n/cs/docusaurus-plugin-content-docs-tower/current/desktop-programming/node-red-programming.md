---
slug: node-red-programming
title: Programování v Node-RED
description: "V této kapitole si projdeme záložku Functions v Playgroundu"
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

V této kapitole si projdeme **záložku Functions** v Playgroundu

:::info

**Záložka Functions** používá nástroj [**Node-RED**](https://nodered.org/about/) pro práci s bránou TOWER a dalšími zařízeními.

V tomto tutoriálu nemůžeme pokrýt vše o tomto nástroji, takže pokud se chcete dozvědět více, můžete navštívit [**dokumentaci Node-RED**](https://nodered.org/docs/).

:::


## Záložka Functions {#functions-tab}

Měli byste vidět obrazovku, která vypadá takto

<Image img={require('../../../../../tower/desktop-programming/images/playground-functions.png')} alt="Záložka Functions s vloženým editorem Node-RED: paleta nodů, prázdný Flow 1 a informační panel" />

### Nody {#nodes}

Na levé straně obrazovky je seznam nodů, které můžete použít pro různé akce při programování v Node-RED.

:::info

Pro Node-RED je k dispozici mnoho nodů, které si můžete nainstalovat, ale se zařízeními TOWER byste měli být schopni pracovat i s dostupnými přeinstalovanými nody.

:::

<div class="container">
  <div class="row">
    <div class="col col--2">
      <div><Image img={require('../../../../../tower/desktop-programming/images/node-red-mqtt-node.png')} alt="Node mqtt in z palety Node-RED" /></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>

<br />

Nody můžete použít pro různé funkce. Například existuje **vizualizace dat**, která je úzce propojena se [**záložkou Dashboard**](./data-visualization.md).

:::info

Chcete-li se dozvědět více o flow v Node-RED, navštivte [**naše projekty na hackster.io**](https://www.hackster.io/hardwario/projects?part_id=73696). Každý projekt, který používá Node-RED, obsahuje mnoho informací o tom, jak s ním pracovat.

:::

:::tip

O další záložce se dozvíte v části [**Vizualizace dat**](./data-visualization.md).

:::

## Videotutoriál {#video-tutorial}

Pokud dáváte přednost videoprůvodci, můžete si pustit toto video pro starší verzi Playgroundu, funguje to ale stejně.

<ReactPlayer controls src='https://youtu.be/VW_-RCIZ9rY' />
