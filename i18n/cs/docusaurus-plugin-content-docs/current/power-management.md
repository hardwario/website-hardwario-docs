---
slug: power-management
title: Správa napájení
description: "Možnosti napájení zařízení CHESTER: bateriové sady, externí zdroj, klidový odběr, režimy spánku a odhad výdrže baterie."
title_meta: "Správa napájení (CHESTER)"
---
import Image from '@theme/IdealImage';

# Správa napájení {#power-management}

Tento článek popisuje možnosti napájení zařízení CHESTER. CHESTER má nízkou spotřebu s typickým klidovým proudem v rozsahu 100–200 µA, a v mnoha aplikacích proto vydrží na baterie 3 roky i déle.

:::info

CHESTER je univerzální platforma, na které běží velmi různé aplikace, a proto je potřeba spotřebu změřit pro každou konkrétní aplikaci zvlášť. Průměrný proud za delší dobu snadno zjistíte se sadou CHESTER DevKit a přístrojem Power Profiler Kit II od Nordic Semiconductor.

:::

## Možnosti baterií {#battery-options}

Pokud potřebujete dlouhou výdrž baterie nebo venkovní provoz (široký rozsah provozních teplot), je zásadní zvolit správnou chemii článků. Zařízení CHESTER jsme navrhli pro články s chemií LiSoCl<sub>2</sub>. Ty mají ze všech lithiových baterií nejvyšší hustotu energie, zanedbatelné samovybíjení (tedy kolik procent kapacity baterie ztratí, když leží ve skladu) a fungují v rozsahu teplot od -60 do +85 °C (údaje pocházejí z katalogového listu Saft LS 26500).

:::caution

Články LiSoCl<sub>2</sub> mají velmi plochou vybíjecí křivku: napětí na svorkách baterie zůstává po celou dobu její životnosti téměř stejné. Na první pohled je to výhoda, jenže odhad zbývající kapacity je pak obtížnější.

:::

Další nevýhodou článků LiSoCl<sub>2</sub> je jejich poměrně vyšší cena.

:::tip

Při plánování projektu nezapomeňte na náklady na výměnu baterie: na baterii samotnou i na práci spojenou s výměnou.

:::

## Vestavěný bateriový zdroj {#integrated-battery-source}

Základní deska CHESTER (CHESTER-M) se podle osazení držákem baterie dodává ve 3 variantách:

1. Osazená jedním držákem baterie velikosti „C“.

   Tato varianta se používá s primárním článkem Saft LS 26500 (chemie LiSoCl<sub>2</sub>) se jmenovitým napětím 3,6 V a kapacitou 7 700 mAh. Článek uchová celkem 27 Wh energie.

   :::tip

   Jde o nejběžnější variantu. Tato baterie Saft je běžně dostupná, a pokud hledáte jejího distributora, obraťte se na HARDWARIO.

   :::

1. Osazená dvěma držáky baterií velikosti „AA“.

   Tato varianta se používá s primárními články Saft LS 14500 (chemie LiSoCl<sub>2</sub>) se jmenovitým napětím 3,6 V a kapacitou 2 600 mAh. Články jsou zapojené paralelně a celkem uchovají 18 Wh energie. Výhodou této varianty je menší výška.

   :::tip

   Tato varianta není příliš běžná, ale neobejdete se bez ní, kdykoli potřebujete vnitřní primární baterii a zároveň krycí modul v horní části krabičky. Například rozšiřující modul CHESTER-Z1-F se čtyřmi podsvícenými tlačítky tvoří spolu se dvěma primárními bateriemi AA odolné tlačítkové a signalizační zařízení pro venkovní provoz.

   :::

1. Bez držáku baterie.

   Tato varianta se používá s externím napájením z rozšiřujících modulů, jako jsou CHESTER-Z1, CHESTER-X4 a CHESTER-X10, nebo z nosné desky CHESTER-B1.

## Rozšiřující moduly s bateriemi {#battery-extension-modules}

Pokud potřebujete primární (nedobíjecí) články a větší kapacitu, než nabízejí varianty z předchozí části, použijte tyto rozšiřující moduly:

* Rozšiřující modul CHESTER-B1 (ve formátu nosné desky) lze osadit:

  * Šesti držáky baterií velikosti „D“ pro primární články Saft LS 33600 (chemie LiSoCl<sub>2</sub>) se jmenovitým napětím 3,6 V a kapacitou 17 000 mAh. Plně osazená sada uchová celkem 367 Wh energie. Tato varianta se vejde do krabičky s vysokým profilem o rozměrech 200 x 280 x 65 mm.

    :::caution

    U varianty základní desky CHESTER bez superkondenzátorů musí být osazené alespoň tři tyto články.

    :::

  * Osmi držáky baterií velikosti „C“ pro primární články Saft LS 26500 (chemie LiSoCl<sub>2</sub>) se jmenovitým napětím 3,6 V a kapacitou 7 700 mAh. Plně osazená sada uchová celkem 201 Wh energie. Tato varianta se vejde do krabičky s nízkým profilem o rozměrech 200 x 280 x 45 mm.

    :::caution

    U varianty základní desky CHESTER bez superkondenzátorů musí být osazené alespoň čtyři tyto články.

    :::

  * Šesti držáky baterií velikosti „D“ pro alkalické (alkalicko-manganové) články se jmenovitým napětím 1,5 V a kapacitou 17 000 mAh. Plně osazená sada uchová celkem 122 Wh energie. Vždy dva články jsou zapojené v sérii, takže vzniknou tři paralelní větve. Toto řešení se hodí pro projekty s teplotním rozsahem -10 až +50 °C. Tato varianta se vejde do krabičky s vysokým profilem o rozměrech 200 x 280 x 65 mm.

    :::caution

    U varianty základní desky CHESTER bez superkondenzátorů musí být osazených všech šest článků.

    :::

  * Osmi držáky baterií velikosti „C“ pro alkalické (alkalicko-manganové) články se jmenovitým napětím 1,5 V a kapacitou 7 700 mAh. Plně osazená sada uchová celkem 74 Wh energie. Vždy dva články jsou zapojené v sérii, takže vzniknou čtyři paralelní větve. Toto řešení se hodí pro projekty s teplotním rozsahem -10 až +50 °C. Tato varianta se vejde do krabičky s nízkým profilem o rozměrech 200 x 280 x 45 mm.

* Rozšiřující modul CHESTER-Z1 s dobíjecí (a vyměnitelnou) lithium-iontovou baterií typu 18650 se jmenovitým napětím 3,7 V a kapacitou 2 000 mAh. Toto řešení se hodí pro projekty, kde je k dispozici síťové napájení (nebo DC linka), ale zařízení musí při výpadku napájení dlouho fungovat dál. Místo napájecího adaptéru nebo DC linky můžete na vstupní svorky modulu CHESTER-Z1 připojit i fotovoltaické panely.

  :::caution

  V HARDWARIO používáme speciální model lithium-iontové baterie 18650 s rozšířeným rozsahem provozních teplot -20 °C až +50 °C. Pokud potřebujete širší rozsah, zvolte některý z napájecích zdrojů s články LiSoCl<sub>2</sub> popsaných výše.

  :::

## Externí zdroje napájení {#external-power-sources}

Zařízení CHESTER lze napájet z DC linky (nebo napájecího adaptéru) pomocí těchto modulů:

* Zadní modul CHESTER-X4

  CHESTER-X4 je DC/DC měnič s napěťovým rozsahem 6 až 28 VDC (bez integrované nabíječky baterií).

* Zadní modul CHESTER-X10

  CHESTER-X10 je DC/DC měnič s napěťovým rozsahem 6 až 28 VDC + nabíječka lithium-polymerových baterií.

* Krycí modul CHESTER-Z1

  CHESTER-Z1 je DC/DC měnič s napěťovým rozsahem 6–28 VDC + nabíječka lithium-iontových baterií.
