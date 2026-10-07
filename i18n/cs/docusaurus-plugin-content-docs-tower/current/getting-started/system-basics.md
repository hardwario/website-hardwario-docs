---
slug: system-basics
title: Základy systému
---
import Image from '@theme/IdealImage';

TOWER je platforma navržená speciálně pro internet věcí. Rychle si s ní postavíte vlastní elektronická zařízení.

Díky otevřenému přístupu máte plnou kontrolu nad svými zařízeními, nad tím, jak komunikují, i nad tím, jak se propojují s komponentami třetích stran. Později je tak můžete volně upravovat a rozšiřovat.

S platformou TOWER **nenarazíte** na **neprůhlednou černou skříňku** ani na **závislost na jednom dodavateli** (vendor lock-in).

Platforma TOWER nabízí **jedinečnou sadu vlastností**, kterými se liší od ostatních platforem.

## Open source {#open-source}

Open source je naše vášeň, a proto všechno, co děláme, sdílíme na [**našem GitHubu**](https://github.com/orgs/hardwario/repositories).

Nemáme rádi skryté háčky ani implementaci schovanou pod pokličkou. Každý den tvrdě pracujeme na tom, abychom si vaši důvěru v naše produkty zasloužili, a kdykoli se sami můžete přesvědčit, kolik péče, nadšení a kvality vkládáme do návrhu i kódu.

Rosteme, budujeme komunitu a upřímně si vážíme každého příspěvku od jejích členů.

:::tip

  Přispět můžete i vy, a to na [**našem GitHubu**](https://github.com/orgs/hardwario/repositories) nebo na [**hackster.io**](https://www.hackster.io/hardwario/projects).

:::

## Bezdrátová komunikace {#wireless}

S platformou TOWER si můžete postavit **rádiovou síť pro svá zařízení**. Síť komunikuje v pásmu sub-GHz (868/915 MHz), které se skvěle hodí pro domácí automatizaci, zabezpečovací systémy apod.

Zařízení v síti spolu dokážou komunikovat na vzdálenost až **500 metrů při přímé viditelnosti**.

Uvnitř budov ve většině případů pokryjete celý dům z jediného místa.

## Modularita {#modular}

Proč pořád znovu vynalézat kolo? V modularitě a znovupoužitelnosti neděláme žádné kompromisy.

Hardware skládáte podobně jako kostky LEGO®. Až začnete stavět víc zařízení, oceníte, že nepotřebujete žádné kabely ani pájení. Používáme standardizovaný formát pinových lišt, kompatibilní v celém ekosystému našich hardwarových produktů.

Stejně modulární je i software. Na straně zařízení zvládne tvorbu firmwaru každý díky řádně zdokumentovaným API a příkladům, na straně hubu systém stojí na distribuovaném přístupu se zprávami MQTT.

## Nízká spotřeba {#low-power}

Platforma HARDWARIO TOWER je od samého začátku optimalizovaná pro dlouhý provoz na baterie. Většina zařízení vydrží bez výměny baterií déle než 2 roky.

Dosáhli jsme toho díky dlouholetým zkušenostem s návrhem zařízení s ultranízkou spotřebou a díky moderním součástkám s velmi nízkým klidovým nebo provozním proudem.

## Bezpečnost {#secure}

Platforma TOWER šifruje a autentizuje rádiovou komunikaci jednoduchými, ale prověřenými bezpečnostními mechanismy.

V každém zařízení TOWER je také speciální hardwarový bezpečnostní prvek, takzvaný kryptočip. Do této malé paměti se bezpečně ukládají klíče, kterými se autentizují zprávy. Klíče z ní nikdo nevytáhne, ani když má k zařízení fyzický přístup.

Všichni víme, že přístup „bezpečnost skrze utajení“ z dlouhodobého hlediska nefunguje, a přesto ho najdete v tolika proprietárních produktech.

## Koncept systému {#system-concept}

<Image img={require('../../../../../tower/getting-started/images/system-concept.png')} alt="Koncept systému: uzly TOWER se připojují rádiem 868/915 MHz k bráně, službám hubu, cloudovým platformám a uživatelským aplikacím" />

<br />

:::note

Více o návrhu platformy TOWER najdete v [**kapitole Principy návrhu**](./design-principles.md).

:::
