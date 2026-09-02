---
slug: chester-x10
title: CHESTER-X10 (nabíječ Li-Po)
description: Rozšiřující modul se záložním napájením a nabíječem jednočlánkové Li-Po baterie pro platformu CHESTER, založený na step-down TPS62933, nabíječi MCP73833 a ADC TLA2024 pro měření napětí.
keywords: [CHESTER-X10, nabíječ Li-Po, nabíječ Li-Ion, záložní napájení, napájení, baterie, TPS62933, MCP73833, TLA2024, step-down, monitorování baterie, CHESTER]
---

# CHESTER-X10 {#chester-x10}

**CHESTER-X10** je rozšiřující modul se **záložním napájením** a integrovaným **nabíječem jednočlánkové Li-Po baterie** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">

![Fotografie červené desky CHESTER-X10 s tlumivkou step-down převodníku, nabíječem MCP73833, ADC TLA2024 a Schottkyho diodami napájecí cesty](../../../../../chester/extension-modules/images/chester-x10-top.png)

</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X10 napájí základní desku CHESTER z externího vedení **5-28 VDC** na svorce **VIN** a udrží ji v chodu, když toto napájení vypadne. Integrovaný step-down převodník **TPS62933** vytváří pevnou větev **5 V**, která napájí základní desku i nabíječ **MCP73833** pro jednočlánkovou baterii Li-Po / Li-Ion. Výstup step-down převodníku a baterie jsou přes **diodové OR** (Schottky **PMEG6010ELR**) spojeny na napájení základní desky, takže dokud je přítomno VIN, běží základní deska z větve 5 V a baterie se nabíjí; při ztrátě VIN plynule převezme napájení baterie. Stejnosměrný vstup chrání Schottkyho dioda (**PMEG060T030ELPEZ**).

Integrované 12bitové ADC **TLA2024**, čtené přes **I²C**, měří přes přesné děliče vstupní napětí (VIN) a napětí baterie (BAT+), takže firmware může sledovat stejnosměrný vstup i stav nabití baterie. Modul se dodává s chráněnou jednočlánkovou Li-Po baterií a nabíjí ji proudem **450 mA**.

## Klíčové vlastnosti {#key-features}

* **Záložní napájení:** Diodové OR mezi stejnosměrným vstupem a baterií udrží základní desku CHESTER napájenou i při výpadku externího zdroje.
* **Široký stejnosměrný vstup:** Externí **5-28 VDC** na VIN přes integrovaný step-down převodník TPS62933.
* **Nabíjení Li-Po:** Integrovaný nabíječ MCP73833 pro jednočlánkovou baterii Li-Po / Li-Ion proudem 450 mA.
* **Baterie v balení:** Chráněná jednočlánková Li-Po baterie **3,7 V / 2000 mAh**.
* **Integrované měření napětí:** 12bitové I²C ADC (TLA2024) měří vstupní napětí a napětí baterie.
* **Ochrana vstupu:** Schottkyho dioda na stejnosměrném vstupu.
* **Rozhraní k hostiteli I²C:** Připojení k základní desce CHESTER přes standardní sběrnici I²C.

## Typické aplikace {#typical-applications}

* **Nepřerušovaný provoz:** Udržení jednotky CHESTER v chodu při výpadcích sítě nebo stejnosměrného zdroje.
* **Odlehlé a off-grid lokality:** Vyrovnání nestálého stejnosměrného zdroje, například solárního nebo z energy harvestingu.
* **Instalace s externím napájením:** Provoz zařízení CHESTER z průmyslového stejnosměrného vedení se záložní baterií.
* **Monitorování se záložní baterií:** Aplikace, které potřebují sledovat vstupní napětí i stav nabití baterie.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | Záložní napájení s nabíječem jednočlánkové Li-Po baterie |
| **Napájecí vstup (VIN)** | 5-28 VDC |
| **Napájecí výstup** | Pevných 5 V, napájí základní desku CHESTER |
| **Typ baterie** | Jednočlánková Li-Po / Li-Ion, 3,7 V, s integrovaným ochranným obvodem |
| **Nabíjecí proud** | 450 mA |
| **Min. doporučená kapacita baterie** | 1000 mAh |
| **Měření napětí** | Integrované 12bitové I²C ADC (TLA2024), měří VIN a napětí baterie |
| **Rozhraní k hostiteli** | I²C |
| **Přiložená baterie** | LP103454-PCM-LD, 3,7 V / 2000 mAh (56.0 × 34.5 × 10.3 mm) |
| **Konektor** | Standardní header s roztečí 2,54 mm (pájený) |
| **Revize hardwaru** | R1.1 |

## Klíčové součástky {#key-components}

| Součástka | Označení | Popis |
| :--- | :--- | :--- |
| **Step-down převodník** | TPS62933 | Step-down převodník, vstup 5-28 VDC, výstup 5 V |
| **Nabíječ baterie** | MCP73833 | Lineární nabíječ jednočlánkové baterie Li-Po / Li-Ion (450 mA) |
| **ADC pro měření napětí** | TLA2024 | 12bitové 4kanálové I²C ADC (adresa 0x49); měří VIN a napětí baterie |
| **Ochrana vstupu** | PMEG060T030ELPEZ / PMEG6010ELR | Schottkyho diody (ochrana vstupu a OR-ování napájecí cesty) |

## Konfigurace pinů {#pin-configuration}

Modul používá standardizované rozložení headeru kompatibilní s rozšiřujícími sloty CHESTER.

:::note
Uvedená konfigurace pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X10 {#chester-x10-connector-pinout}

![Zapojení svorkovnice CHESTER-X10: GND, BAT-, BAT-, BAT+, BAT+, GND, GND, VIN na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x10.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | GND | Zem | Referenční zem systému |
| 2 | BAT- | Baterie | Negativní pól baterie (*) |
| 3 | BAT- | Baterie | Negativní pól baterie (*) |
| 4 | BAT+ | Baterie | Pozitivní pól baterie (*) |
| 5 | BAT+ | Baterie | Pozitivní pól baterie (*) |
| 6 | GND | Zem | Referenční zem systému |
| 7 | GND | Zem | Referenční zem systému |
| 8 | VIN | Napájecí vstup | Vstup externího stejnosměrného napájení (5-28 VDC) |

*Poznámka: Používejte pouze jednočlánkovou baterii 3,7 V Li-Po (nebo Li-Ion) s integrovaným ochranným obvodem. Baterii nezkratujte! Oba piny BAT- i oba piny BAT+ jsou interně spojeny (zdvojeny kvůli proudové zatížitelnosti).

:::info
CHESTER-X10 napájí základní desku CHESTER přes slot modulu. Externí napájení **5-28 VDC** na **VIN** (pin 8) přivádí energii do integrovaného step-down převodníku TPS62933, jehož pevný výstup **5 V** napájí základní desku a nabíjí baterii připojenou na **BAT+** / **BAT-**. Pokud externí napájení vypadne, udrží baterie základní desku napájenou.
:::

### Rozhraní k hostiteli (I²C) {#host-interface-ic}

CHESTER-X10 komunikuje se základní deskou CHESTER přes standardní sběrnici **I²C**. Integrované ADC **TLA2024** je na I²C adrese **0x49** a umožňuje firmwaru odečítat vstupní napětí a napětí baterie:

| Kanál ADC | Měřený signál | Dělič |
| :--- | :--- | :--- |
| AIN0 | VIN (vstupní napětí) | 330 kΩ / 22 kΩ |
| AIN1 | BAT+ (napětí baterie) | 1 MΩ / 1 MΩ |

## Připojení baterie a napájení {#battery--power-connection}

Připojte externí stejnosměrné napájení na **VIN** (pin 8) a **GND** (pin 1, 6 nebo 7) a chráněnou jednočlánkovou baterii Li-Po / Li-Ion na **BAT+** (pin 4 nebo 5) a **BAT-** (pin 2 nebo 3).

:::warning
Používejte pouze jednočlánkovou baterii **3,7 V** Li-Po / Li-Ion s **integrovaným ochranným obvodem** a baterii nikdy nezkratujte. Doporučená kapacita baterie je alespoň **1000 mAh**.
:::

Dokud je připojeno externí napájení, běží základní deska z výstupu 5 V step-down převodníku a baterie se nabíjí proudem 450 mA. Pokud je externí napájení odpojeno nebo vypadne, baterie dál napájí základní desku přes diody napájecí cesty modulu a zajišťuje nepřerušované záložní napájení.

### Průchod do krabičky {#enclosure-feed-through}

Kabel stejnosměrného vstupu lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče stejnosměrného napájení protáhněte kabelovou vývodkou ve stěně krabičky a zapojte je na VIN a GND.
- **Konektor do panelu (na vyžádání):** externí konektor ve stěně krabičky umožňuje uživateli připojit stejnosměrné napájení bez volného vedení uvnitř. Dostupné na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X10 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií typu D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x10-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií typu D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x10-c4.png)

</div>
</div>
</div>

## Použití v CHESTER SDK {#chester-sdk-usage}

CHESTER-X10 lze v rámci CHESTER SDK použít pomocí shieldu `ctr_x10` nebo funkce `hardware-chester-x10` v [Project Generatoru](/chester/firmware-sdk/how-to-project-generator).

- [Příklad použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x10)

## Schémata {#schematic-diagrams}

Následující schémata ukazují vnitřní zapojení modulu na dvou listech: napájení a nabíječ, a ADC pro měření napětí.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x10-r1.1.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-x10-r1.1.html)

### Napájení a nabíječ {#power--charger}

![Schéma napájení CHESTER-X10: step-down převodník TPS62933 (výstup 5 V) a nabíječ jednočlánkové Li-Po baterie MCP73833 nastavený na 450 mA se Schottkyho diodami PMEG v napájecí cestě](../../../../../chester/extension-modules/images/hio-chester-x10-r1.1-1.png)

### Měření napětí {#voltage-monitoring}

![Schéma ADC CHESTER-X10: 12bitové I²C ADC TLA2024 měřící vstupní napětí a napětí baterie přes přesné děliče](../../../../../chester/extension-modules/images/hio-chester-x10-r1.1-2.png)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozložení desky CHESTER-X10 se signály na hranách: +V, GP0-GP3, SDA, SCL, VDD, GND nahoře; VIN, GND, BAT+, BAT- na svorkovnici](../../../../../chester/extension-modules/images/pc-chester-x10.png)

</div>
