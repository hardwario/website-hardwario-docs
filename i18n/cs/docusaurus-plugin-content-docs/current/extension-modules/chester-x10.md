---
slug: chester-x10
title: CHESTER-X10 (nabíječka Li-Po)
description: Rozšiřující modul se záložním napájením a nabíječkou jednoho článku Li-Po pro platformu CHESTER, založený na step-down převodníku TPS62933, nabíječce MCP73833 a monitorovacím ADC TLA2024.
keywords: [CHESTER-X10, nabíječka Li-Po, nabíječka Li-Ion, záložní napájení, napájení, baterie, TPS62933, MCP73833, TLA2024, step-down, monitorování baterie, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X10 {#chester-x10}

**CHESTER-X10** je rozšiřující modul se **záložním napájením** a **nabíječkou jednoho článku Li-Po** na desce pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x10-top.png')} alt="Fotografie červené desky CHESTER-X10 s tlumivkou step-down převodníku, nabíječkou MCP73833, ADC TLA2024 a Schottkyho diodami napájecí cesty"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X10 napájí základní desku CHESTER z externí linky **5-28 V DC** na **VIN** a udrží ji v provozu, když toto napájení vypadne. Step-down převodník **TPS62933** na desce vytváří pevnou větev **5 V**, která napájí základní desku i nabíječku **MCP73833** pro jeden článek Li-Po / Li-Ion. Výstup step-down převodníku a baterie jsou k napájení základní desky spojené **diodovým OR** (Schottkyho **PMEG6010ELR**), takže dokud je VIN přítomné, běží základní deska z větve 5 V a baterie se nabíjí, a při ztrátě VIN baterie plynule převezme napájení. Stejnosměrný vstup chrání Schottkyho dioda (**PMEG060T030ELPEZ**).

12bitový ADC **TLA2024** na desce, čtený po **I²C**, měří přes přesné děliče vstupní napětí (VIN) a napětí baterie (BAT+), takže firmware může sledovat stejnosměrný vstup i stav nabití baterie. Modul se dodává s chráněným jednočlánkovým akumulátorem Li-Po a nabíjí ho proudem **450 mA**.

## Klíčové vlastnosti {#key-features}

* **Záložní napájení:** Diodové OR mezi stejnosměrným vstupem a baterií udrží základní desku CHESTER napájenou i při výpadku externího zdroje.
* **Široký stejnosměrný vstup:** Externích **5-28 V DC** na VIN přes step-down převodník TPS62933 na desce.
* **Nabíjení Li-Po:** Nabíječka MCP73833 na desce pro jeden článek Li-Po / Li-Ion proudem 450 mA.
* **Baterie v balení:** Chráněný jednočlánkový akumulátor Li-Po **3,7 V / 2000 mAh** je součástí balení.
* **Monitorování napětí na desce:** 12bitový ADC na I²C (TLA2024) měří vstupní napětí a napětí baterie.
* **Ochrana vstupu:** Schottkyho dioda na stejnosměrném vstupu.
* **Rozhraní k hostu po I²C:** K základní desce CHESTER se připojuje standardní sběrnicí I²C.

## Typické aplikace {#typical-applications}

* **Nepřerušovaný provoz:** Udržet uzel CHESTER v běhu i při výpadku sítě nebo stejnosměrného napájení.
* **Odlehlé a mimosíťové lokality:** Vyrovnat nestálý stejnosměrný zdroj, například solární napájení nebo sběr energie.
* **Instalace s externím napájením:** Provoz zařízení CHESTER z průmyslové stejnosměrné linky se zálohou z baterie.
* **Monitorování se záložní baterií:** Aplikace, které potřebují sledovat vstupní napětí i stav nabití baterie.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | Záložní napájení s nabíječkou jednoho článku Li-Po |
| **Napájecí vstup (VIN)** | 5-28 V DC |
| **Napájecí výstup** | Pevných 5 V, napájí základní desku CHESTER |
| **Typ baterie** | Jeden článek Li-Po / Li-Ion, 3,7 V, s integrovaným ochranným obvodem |
| **Nabíjecí proud** | 450 mA |
| **Min. doporučená kapacita baterie** | 1000 mAh |
| **Monitorování napětí** | 12bitový ADC na I²C (TLA2024) na desce, měří VIN a napětí baterie |
| **Rozhraní k hostu** | I²C |
| **Přiložená baterie** | LP103454-PCM-LD, 3,7 V / 2000 mAh (56.0 × 34.5 × 10.3 mm) |
| **Rozhraní desky** | Castellated otvory na dvou protilehlých hranách, připájené k základní desce CHESTER |
| **Revize hardwaru** | R1.1 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Step-down převodník** | TPS62933 | Snižující převodník, vstup 5-28 V DC, výstup 5 V |
| **Nabíječka baterie** | MCP73833 | Lineární nabíječka jednoho článku Li-Po / Li-Ion (450 mA) |
| **ADC pro monitorování napětí** | TLA2024 | 12bitový 4kanálový ADC na I²C (adresa 0x49); měří VIN a napětí baterie |
| **Ochrana vstupu** | PMEG060T030ELPEZ / PMEG6010ELR | Schottkyho diody (ochrana vstupu a spojení napájecích cest) |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X10 {#chester-x10-connector-pinout}

![Zapojení svorkovnice CHESTER-X10: GND, BAT-, BAT-, BAT+, BAT+, GND, GND, VIN na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x10.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | GND | Zem | Systémová zemní reference |
| 2 | BAT- | Baterie | Záporný pól baterie (*) |
| 3 | BAT- | Baterie | Záporný pól baterie (*) |
| 4 | BAT+ | Baterie | Kladný pól baterie (*) |
| 5 | BAT+ | Baterie | Kladný pól baterie (*) |
| 6 | GND | Zem | Systémová zemní reference |
| 7 | GND | Zem | Systémová zemní reference |
| 8 | VIN | Napájecí vstup | Vstup externího stejnosměrného napájení (5-28 V DC) |

*Poznámka: Používejte pouze jednočlánkovou baterii Li-Po (nebo Li-Ion) 3,7 V s integrovaným ochranným obvodem. Baterii nezkratujte! Oba piny BAT- i oba piny BAT+ jsou vnitřně spojené (zdvojené kvůli proudové zatížitelnosti).

:::info
CHESTER-X10 napájí základní desku CHESTER přes slot modulu. Externí napájení **5-28 V DC** na **VIN** (pin 8) přivádí energii do step-down převodníku TPS62933 na desce, jehož pevný výstup **5 V** napájí základní desku a nabíjí baterii připojenou na **BAT+** / **BAT-**. Při ztrátě externího napájení drží základní desku v provozu baterie.
:::

### Rozhraní k hostu (I²C) {#host-interface-ic}

CHESTER-X10 komunikuje se základní deskou CHESTER po standardní sběrnici **I²C**. ADC **TLA2024** na desce sedí na adrese I²C **0x49** a umožňuje firmwaru číst vstupní napětí a napětí baterie:

| Kanál ADC | Měřený signál | Dělič |
| :--- | :--- | :--- |
| AIN0 | VIN (vstupní napětí) | 330 kΩ / 22 kΩ |
| AIN1 | BAT+ (napětí baterie) | 1 MΩ / 1 MΩ |

## Připojení baterie a napájení {#battery--power-connection}

Externí stejnosměrné napájení připojte na **VIN** (pin 8) a **GND** (pin 1, 6 nebo 7) a chráněnou jednočlánkovou baterii Li-Po / Li-Ion na **BAT+** (pin 4 nebo 5) a **BAT-** (pin 2 nebo 3).

:::warning
Používejte pouze jednočlánkovou baterii Li-Po / Li-Ion **3,7 V** s **integrovaným ochranným obvodem** a baterii nikdy nezkratujte. Doporučená kapacita baterie je alespoň **1000 mAh**.
:::

Dokud je připojené externí napájení, běží základní deska z výstupu 5 V step-down převodníku a baterie se nabíjí proudem 450 mA. Když se externí napájení odpojí nebo vypadne, napájí baterie základní desku dál přes diody napájecí cesty modulu a poskytuje tak nepřerušené záložní napájení.

### Průchod krabičkou {#enclosure-feed-through}

Kabel stejnosměrného napájení lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče protáhnete vývodkou ve stěně krabičky a zapojíte na VIN a GND.
- **Konektor do panelu (na vyžádání):** externí konektor ve stěně krabičky umožní uživateli napájení zapojit, bez volné kabeláže vevnitř. Na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X10 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x10-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x10-c4.png)

</div>
</div>
</div>

## Použití s CHESTER SDK {#chester-sdk-usage}

CHESTER-X10 lze v rámci CHESTER SDK použít přes shield `ctr_x10`, případně přes funkci [Project Generatoru](/chester/firmware-sdk/how-to-project-generator) `hardware-chester-x10`.

- [Ukázka použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x10)

## Schémata {#schematic-diagrams}

Kompletní schéma — napájení a nabíječka i ADC pro monitorování napětí — je k dispozici jako PDF:

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x10-r1.1.pdf)
- [Interaktivní prohlížeč CHESTER-X10](pathname:///download/ibom/hio-chester-x10-r1.1.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X10 se signály na hranách: +V, GP0-GP3, SDA, SCL, VDD, GND nahoře; VIN, GND, BAT+, BAT- na svorkovnici](../../../../../chester/extension-modules/images/pc-chester-x10.png)

</div>
