---
slug: system-basics
title: Základy systému
description: "TOWER je platforma zařízení navržená speciálně pro internet věcí. S platformou TOWER si můžete rychle postavit vlastní elektronická zařízení."
---
import Image from '@theme/IdealImage';

TOWER je platforma zařízení navržená speciálně pro internet věcí. S platformou TOWER si můžete rychle postavit vlastní elektronická zařízení.

Díky otevřenému přístupu budete mít plnou kontrolu nad svými zařízeními, nad tím, jak komunikují a jak se integrují s komponentami třetích stran. To vám dá volnost pro budoucí úpravy a rozšiřitelnost.

S platformou TOWER **nenarazíte** na věci jako **magie černé skříňky** nebo **vendor lock-in**.

TOWER nabízí **jedinečnou sadu vlastností**, které ji odlišují od ostatních platforem.

## Open-source {#open-source}

Open-source je naše vášeň, takže všechno, co děláme, sdílíme na [**našem GitHubu**](https://github.com/orgs/hardwario/repositories)

Obecně nemáme rádi skryté háčky ani schovávání implementace pod pokličkou. Každý den tvrdě pracujeme, abychom si zasloužili vaši důvěru v naše produkty, takže kdykoli máte možnost vidět, kolik péče, vášně a kvality vkládáme do návrhu a kódu.

Jak rosteme a budujeme komunitu, upřímně si vážíme každého jednotlivého příspěvku z ní

:::tip

  Přispívat můžete i vy, na stránkách [**našeho GitHubu**](https://github.com/orgs/hardwario/repositories) nebo [**hackster.io**](https://www.hackster.io/hardwario/projects).

:::

## Bezdrátovost {#wireless}

S platformou TOWER si můžete postavit **rádiovou síť pro svá zařízení**. Rádiová síť využívá komunikační technologii v pásmu Sub-GHz (868/915 MHz), což je skvělá volba pro aplikace domácí automatizace, bezpečnostní alarmy atd.

Zařízení ve vaší síti spolu budou schopna komunikovat na vzdálenost až **500 metrů na přímou viditelnost**.

Pokud jde o dosah uvnitř budov, ve většině případů dosáhnete pokrytí celého domu z jediného místa.

## Modularita {#modular}

Proč byste měli neustále znovu vynalézat kolo? V oblasti modularity a znovupoužitelnosti neděláme žádné kompromisy.

Svůj hardware budete moci skládat podobně jako kostky LEGO®. Až začnete stavět více zařízení, velmi oceníte fakt, že není potřeba žádné kabeláže ani pájení. Používáme standardizovaný formát pinových lišt, který je kompatibilní napříč celým ekosystémem hardwarových produktů.

Stejná úroveň modularity byla uplatněna i na softwarové úrovni. Ať už na straně zařízení, kde si kdokoli může osvojit tvorbu firmwaru díky řádně zdokumentovaným API a příkladům, nebo v přístupu distribuovaného systému MQTT zpráv na straně hubu.

## Nízká spotřeba {#low-power}

HARDWARIO TOWER je od samého začátku optimalizována pro dlouhou dobu provozu z baterií. Většina zařízení dokáže fungovat bez nutnosti výměny baterií déle než 2 roky.

Toho jsme dosáhli díky našim dlouholetým zkušenostem s návrhem zařízení s ultranízkou spotřebou a využitím moderních hardwarových komponent, které nabízejí velmi nízké klidové a/nebo provozní proudy.

## Bezpečnost {#secure}

TOWER používá jednoduché, ale prověřené bezpečnostní mechanismy pro šifrování dat a autentizaci v rádiové komunikaci.

V každém zařízení TOWER najdete také speciální hardwarový bezpečnostní prvek – takzvaný kryptočip. Tato speciální malá paměť umožňuje bezpečně uložit bezpečnostní klíče používané při autentizaci zpráv. Klíče z paměti nedostanete, ani když získáte fyzický přístup k zařízení.

Všichni víme, že přístup „bezpečnost skrze utajení“ z dlouhodobého hlediska nefunguje, a přesto ho najdete v tolika proprietárních produktech.

## Koncept systému {#system-concept}

<Image img={require('../../../../../tower/getting-started/images/system-concept.png')} alt="Koncept systému: uzly TOWER se připojují rádiem 868/915 MHz k bráně, službám hubu, cloudovým platformám a uživatelským aplikacím" />

<br />

:::note

Chcete-li se dozvědět více o návrhu platformy TOWER, můžete navštívit [**kapitolu Principy návrhu**](./design-principles.md).

:::
