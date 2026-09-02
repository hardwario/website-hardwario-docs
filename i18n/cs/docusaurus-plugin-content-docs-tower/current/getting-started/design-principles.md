---
slug: design-principles
title: Principy návrhu
description: "Věříme, že se věci mají dělat správně, a proto jsme přijali následující návrhová rozhodnutí."
---
import Image from '@theme/IdealImage';

Věříme, že se věci mají dělat správně, a proto jsme přijali následující návrhová rozhodnutí.

## Radiová frekvence {#radio-frequency}

Pro radiovou komunikaci používáme frekvenci 868/915 MHz. Jde o bezlicenční pásmo určené pro krátké signální zprávy.

Zatěžovat vaše IoT zařízení pásmem 2,4 GHz a bojovat se streamováním po Wi-Fi, Bluetooth, ZigBee a dalšími protokoly spolehlivosti systému nepomůže.

Jde také o základní fyzikální pravidla – s vyšší frekvencí získáte horší prostupnost skrz zdi a další překážky. Také energetická účinnost je lepší na nižší frekvenci. Jak už bylo řečeno – nízkoodběrové návrhy jsou náš cíl!

## Programovací jazyk {#programming-language}

Většina vývojářů má poněkud zaujaté názory na svůj oblíbený programovací jazyk a my jim plně rozumíme. Ve světě embedded systémů však platí, že pokud chcete ze své platformy vytěžit maximum a ta musí běžet několik let bez restartu a s co nejnižší spotřebou energie, musíte se držet nástrojů, které takové požadavky prostě splňují.

Proto jsme jako technologii pro vývoj firmwaru zvolili jazyk C. Se solidním, v praxi prověřeným toolchainem GCC a tradičním buildem založeným na Makefile budou vaše projekty zajištěny do budoucna.

Ať už se použití vysokoúrovňového interpretovaného jazyka jako Python, Javascript apod. může zdát jakkoli lákavé, z hlediska spotřebovaných zdrojů a doby vykonávání si vždy povedete horší než s dobře napsaným kódem v C.

Na druhou stranu jsme vytvořili framework – firmware SDK – který vám vývoj firmwaru usnadní, a práce s API působí jako práce ve vysokoúrovňovém jazyce.

## Asynchronní architektura {#asynchronous-architecture}

Do embedded úrovně jsme přenesli několik inovativních technik – nejvýraznější z nich je programovací vzor podobný asynchronnímu přístupu. Vestavěný scheduler vám zjednoduší život s úlohami a se správou napájení platformy – vše se provádí automaticky za vás a vy se soustředíte na vývoj aplikace místo nízkoúrovňových detailů.

Také na straně hubu se MQTT drží asynchronních konceptů. To je skvělá příležitost navrhnout vlastní IoT systém v jednom, jednotném, asynchronním konceptu.

## Přístup „CLI first" {#cli-first-approach}

Command Line Interface (CLI) je v systému TOWER občan první kategorie. Právě tím se odlišujeme od většiny ostatních embedded IoT platforem. Přístup přes CLI zdůrazňujeme na prvním místě. Má řadu výhod – především můžete všechny operace provádět na takzvaných „headless" strojích – jako jsou servery, embedded počítače apod. Dále můžete snadno zapojit služby průběžné integrace, které dokážou automatizovat váš pracovní postup.

Navíc ve spojení s Gitem, klientskými nástroji MQTT, logovacím mechanismem apod. rychle uvidíte, že váš pracovní postup je poměrně plynulý a efektivní.
