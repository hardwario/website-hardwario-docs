---
slug: design-principles
title: Principy návrhu
---
import Image from '@theme/IdealImage';

Snažíme se dělat věci pořádně, a proto jsme při návrhu platformy zvolili následující řešení.

## Rádiová frekvence {#radio-frequency}

Pro rádiovou komunikaci používáme frekvenci 868/915 MHz. Jde o bezlicenční pásmo určené pro krátké signální zprávy.

Zatěžovat IoT zařízení pásmem 2,4 GHz a přetahovat se o něj se streamováním po Wi-Fi, s Bluetooth, ZigBee a dalšími protokoly spolehlivosti systému nepomůže.

Jde také o základní fyziku: čím vyšší frekvence, tím hůř signál prochází zdmi a dalšími překážkami. Nižší frekvence je navíc energeticky účinnější. A jak už jsme uvedli, naším cílem je nízká spotřeba.

## Programovací jazyk {#programming-language}

Většina vývojářů má ke svému oblíbenému programovacímu jazyku vyhraněný vztah a my to plně chápeme. Ve světě embedded systémů však platí, že pokud chcete vytěžit maximum z platformy, která musí běžet několik let bez restartu a s co nejnižší spotřebou energie, musíte se držet nástrojů, které takové požadavky prostě splňují.

Proto jsme pro vývoj firmwaru zvolili jazyk C. Díky spolehlivému, v praxi prověřenému toolchainu GCC a tradičnímu sestavování pomocí Makefile obstojí vaše projekty i v budoucnu.

Jakkoli lákavé může být použít vysokoúrovňový interpretovaný jazyk, jako je Python nebo JavaScript, ve spotřebě prostředků i v rychlosti běhu vždy dopadnete hůř než s dobře napsaným kódem v C.

Na druhou stranu jsme vytvořili framework (firmware SDK), který vývoj firmwaru usnadňuje: s jeho API se pracuje podobně jako ve vysokoúrovňovém jazyce.

## Asynchronní architektura {#asynchronous-architecture}

Do embedded úrovně jsme přenesli několik inovativních technik. Nejvýraznější z nich je programovací vzor podobný asynchronnímu přístupu. Vestavěný plánovač (scheduler) vám zjednoduší práci s úlohami i správu napájení platformy. Děje se to automaticky, takže se můžete soustředit na vývoj aplikace místo nízkoúrovňových detailů.

Asynchronní koncept používá i MQTT na straně hubu. Celý svůj systém IoT tak můžete navrhnout podle jednoho jednotného asynchronního konceptu.

## Přístup „CLI first“ {#cli-first-approach}

Rozhraní příkazové řádky (CLI) má v systému TOWER přednostní postavení. Tím se lišíme od většiny ostatních embedded platforem IoT: příkazovou řádku stavíme na první místo. Má to řadu výhod. Především můžete všechny operace provádět na takzvaných „headless“ strojích, jako jsou servery nebo embedded počítače. Dále můžete snadno zapojit služby průběžné integrace, které vaši práci zautomatizují.

Ve spojení s Gitem, klientskými nástroji MQTT, logováním apod. navíc brzy zjistíte, že práce jde plynule a efektivně.
