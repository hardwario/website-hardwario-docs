---
slug: power-management
title: Správa napájení
description: "Tento článek přináší užitečné informace o různých možnostech napájení zařízení CHESTER, což je nízkopříkonové zařízení s typickým klidovým proudem v rozsahu 100–200 µA. Díky tomu může být v mnoha aplikacích napájeno z baterií po dobu 3 a více let."
title_meta: "Správa napájení (CHESTER)"
---
import Image from '@theme/IdealImage';

# Správa napájení {#power-management}

Tento článek přináší užitečné informace o různých možnostech napájení zařízení CHESTER, což je nízkopříkonové zařízení s typickým klidovým proudem v rozsahu 100–200 µA. Díky tomu může být v mnoha aplikacích napájeno z baterií po dobu 3 a více let.

:::info

Protože CHESTER je univerzální platforma s velmi širokým spektrem aplikací, které na ní běží, musí být spotřeba energie charakterizována pro každou konkrétní implementaci aplikace. Průměrný proud za delší časové období snadno zjistíte pomocí CHESTER DevKit + Power Profiler Kit II od Nordic Semiconductor.

:::

## Možnosti baterií {#battery-options}

Když je požadována dlouhá životnost baterie nebo venkovní použití (široký provozní teplotní rozsah), je zásadní správný výběr chemického složení baterie. Zařízení CHESTER jsme navrhli tak, aby bylo kompatibilní s chemií LiSoCl<sub>2</sub>. Tento typ baterie poskytuje nejvyšší hustotu energie mezi lithiovými bateriemi, zanedbatelný samovybíjecí proud (tj. kolik procent kapacity se ztratí, když baterie leží ve skladu) a funguje v teplotním rozsahu od -60 do +85 °C (údaje byly převzaty z katalogového listu Saft LS 26500).

:::caution

Chemie LiSoCl<sub>2</sub> má velmi plochou vybíjecí křivku. To znamená, že napětí na svorkách baterie je po celou dobu její životnosti velmi stabilní. I když se to na první pohled jeví jako výhoda, komplikuje to odhad zbývající kapacity.

:::

Další nevýhodou chemie LiSoCl<sub>2</sub> je její relativně vyšší cena.

:::tip

Ve svých projektech nezapomeňte zohlednit náklady na výměnu baterie – jak samotnou baterii, tak i samotnou operaci výměny.

:::

## Integrovaný zdroj napájení z baterie {#integrated-battery-source}

Základní deska CHESTER (CHESTER-M) je z pohledu bateriového držáku dodávána ve 3 variantách:

1. Osazená jedním držákem baterie velikosti „C".

   Tato varianta se používá společně s primárním článkem Saft LS 26500 (chemie LiSoCl<sub>2</sub>) s jmenovitým napětím 3,6 V a kapacitou článku 7 700 mAh. Článek poskytuje celkovou energetickou zásobu 27 Wh.

   :::tip

   Toto je nejběžnější varianta. Tato baterie Saft je široce dostupná; při hledání distributora baterií se můžete obrátit na HARDWARIO s žádostí o pomoc.

   :::

1. Osazená dvěma držáky baterií velikosti „AA".

   Tato varianta se používá společně s primárním článkem Saft LS 14500 (chemie LiSoCl<sub>2</sub>) s jmenovitým napětím 3,6 V a kapacitou článku 2 600 mAh. Články jsou zapojeny paralelně a celková energetická zásoba je 18 Wh. Výhodou této varianty je nižší výškový profil.

   :::tip

   Tato varianta není příliš běžná, ale je nezbytná vždy, když potřebujete interní primární baterii a zároveň jakýkoli krycí modul instalovaný v horní části krabičky. Například rozšiřující modul CHESTER-Z1-F (který nabízí čtyři podsvícená tlačítka) se dvěma primárními bateriemi AA tvoří robustní tlačítkové a signalizační zařízení vhodné pro venkovní provoz.

   :::

1. Bez jakéhokoli držáku baterie.

   Tato varianta je použitelná při provozu s externími zdroji napájení z rozšiřujících modulů, jako jsou CHESTER-Z1, CHESTER-X4, CHESTER-X10 nebo nosná deska CHESTER-B1.

## Rozšiřující moduly s bateriemi {#battery-extension-modules}

Pokud potřebujete použít primární (nedobíjecí) články a větší bateriovou kapacitu, než nabízejí možnosti zmíněné v předchozí části, můžete použít tyto rozšiřující moduly:

* Rozšiřující modul CHESTER-B1 (ve formátu nosné desky) může být osazen:

  * Šesti držáky baterií velikosti „D" pro primární článek Saft LS 33600 (chemie LiSoCl<sub>2</sub>) s jmenovitým napětím 3,6 V a kapacitou článku 17 000 mAh. Všechny instalované články poskytnou celkovou energetickou zásobu 367 Wh. Tato varianta se vejde do vysokoprofilové krabičky o rozměrech 200 x 280 x 65 mm.

    :::caution

    Pro variantu základní desky CHESTER bez superkondenzátorů musí být nainstalovány alespoň tři tyto bateriové články.

    :::

  * Osmi držáky baterií velikosti „C" pro primární článek Saft LS 26500 (chemie LiSoCl<sub>2</sub>) s jmenovitým napětím 3,6 V a kapacitou článku 7 700 mAh. Všechny instalované články poskytnou celkovou energetickou zásobu 201 Wh. Tato varianta se vejde do nízkoprofilové krabičky o rozměrech 200 x 280 x 45 mm.

    :::caution

    Pro variantu základní desky CHESTER bez superkondenzátorů musí být nainstalovány alespoň čtyři tyto bateriové články.

    :::

  * Šesti držáky baterií velikosti „D" pro alkalické články (alkalicko-manganové) s jmenovitým napětím 1,5 V a kapacitou článku 17 000 mAh. Všechny instalované články poskytnou celkovou energii 122 Wh. V této konfiguraci jsou vždy dva články v sérii, což tvoří tři paralelní větve. Toto řešení je vhodné pro projekty s teplotním rozsahem -10 až +50 °C. Tato varianta se vejde do vysokoprofilové krabičky o rozměrech 200 x 280 x 65 mm.

    :::caution

    Pro variantu základní desky CHESTER bez superkondenzátorů musí být nainstalováno všech šest těchto bateriových článků.

    :::

  * Osmi držáky baterií velikosti „D" pro alkalické články (alkalicko-manganové) s jmenovitým napětím 1,5 V a kapacitou článku 7 700 mAh. Všechny instalované články poskytnou celkovou energii 74 Wh. V této konfiguraci jsou vždy dva články v sérii, což tvoří tři paralelní větve. Toto řešení je vhodné pro projekty s teplotním rozsahem -10 až +50 °C. Tato varianta se vejde do nízkoprofilové krabičky o rozměrech 200 x 280 x 45 mm.

* Rozšiřující modul CHESTER-Z1 s dobíjecí (a vyměnitelnou) lithium-iontovou baterií (typ 18650) s jmenovitým napětím 3,7 V a kapacitou 2 000 mAh. Toto řešení je vhodné pro projekty, kde je k dispozici síťové napájení (nebo DC linka), ale je požadován dlouhodobý provoz zařízení v případě výpadku napájení. Případně můžete ke vstupním svorkám CHESTER-Z1 připojit fotovoltaické solární panely místo napájecího adaptéru nebo napětí z DC linky.

  :::caution

  Ve firmě HARDWARIO používáme speciální model lithium-iontové baterie 18650 s rozšířeným provozním teplotním rozsahem -20 °C až +50 °C. Pokud je vyžadován větší rozsah, prostudujte možnosti napájecích zdrojů založených na LiSoCl<sub>2</sub> popsané výše.

  :::

## Externí zdroje napájení {#external-power-sources}

Zařízení CHESTER lze napájet z DC linky (nebo napájecího adaptéru) pomocí těchto modulů:

* Zadní modul CHESTER-X4

  CHESTER-X4 je DC/DC měnič s napěťovým rozsahem 6 až 28 VDC (bez integrované nabíječky baterií).

* Zadní modul CHESTER-X10

  CHESTER-X10 je DC/DC měnič s napěťovým rozsahem 6 až 28 VDC + nabíječka lithium-polymerových baterií.

* Krycí modul CHESTER-Z1

  CHESTER-Z1 je DC/DC měnič s napěťovým rozsahem 6–28 VDC + nabíječka lithium-iontových baterií.
