---
slug: chester-x5
title: CHESTER-X5 (2kanálový izolovaný vstup 50 V)
description: Dvoukanálový rozšiřující modul s izolovaným napěťovým vstupem pro platformu CHESTER. Každý kanál měří ±50 V přes zesilovač se zesílenou izolací (AMC3330) a 24bitový I²C ADC ADS122C04.
keywords: [CHESTER-X5, izolovaný vstup, izolované měření napětí, 50V, AMC3330, ADS122C04, 24bitový ADC, zesílená izolace, I2C, galvanické oddělení, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X5 {#chester-x5}

**CHESTER-X5** je rozšiřující modul s **dvěma izolovanými napěťovými vstupy** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x5-top.png')} alt="Pohled na desku CHESTER-X5 shora se dvěma izolovanými zesilovači AMC3330 a ADC ADS122C04"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X5 poskytuje **dva izolované napěťové vstupy**, každý s rozsahem **−50 V až +50 V**. Každý kanál používá zesilovač se zesílenou izolací (**AMC3330**) s integrovaným izolovaným DC-DC převodníkem, takže je vstup **galvanicky oddělený** od elektroniky zařízení CHESTER i od druhého kanálu. Přesný dělič s tolerancí 0,1 % převádí vstupních ±50 V na úroveň zesilovače a jeho diferenciální výstup digitalizuje společný 24bitový I²C ADC **ADS122C04**, kanál 1 na AIN0/AIN1 a kanál 2 na AIN2/AIN3.

Izolovaný zesilovač každého kanálu je napájený vlastním load switchem (**TPS22917**), takže firmware může kanály zapínat nezávisle a v nečinnosti je nechat vypnuté a šetřit energii. Nové vzorky ADC signalizuje na lince data-ready, která je vyvedená na pin GP0 slotu.

## Klíčové vlastnosti {#key-features}

* **Dva izolované vstupy:** Dva nezávislé napěťové kanály, každý se zesílenou galvanickou izolací.
* **Rozsah ±50 V:** Každý kanál měří −50 V až +50 V.
* **Přesné měření:** Izolované zesilovače AMC3330 s vstupními děliči 0,1 % a 24bitovým ADC ADS122C04.
* **Rozhraní I²C:** ADC se čte přes I²C; data-ready se signalizuje na GP0/A0.
* **Přepínání napájení po kanálech:** Každý kanál je napájený vlastním load switchem (zapíná se přes GP2 pro kanál 1 a GP1 pro kanál 2) kvůli nízké spotřebě.

## Typická použití {#typical-applications}

* **Izolované měření napětí:** Měření napětí, která musí být galvanicky oddělená od logiky.
* **Plovoucí napětí a napětí na horní straně:** Měření signálů, které nejsou vztažené k systémové zemi.
* **Monitorování baterií a článků:** Sledování napětí baterií, článků nebo modulů.
* **Měření průmyslových signálů:** Průmyslová napětí, kde je izolace potřeba z důvodu bezpečnosti nebo přesnosti.
* **Měření bez zemních smyček:** Vyloučení zemních smyček mezi měřeným obvodem a uzlem CHESTER.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | 2kanálový izolovaný napěťový vstup |
| **Kanály** | 2 (nezávislé), zesílená galvanická izolace |
| **Vstupní rozsah** | −50 V až +50 V na kanál |
| **Izolovaný zesilovač** | AMC3330DWE (integrovaný izolovaný DC-DC), jeden na kanál |
| **ADC** | ADS122C04 (24bitový, 4kanálový, I²C) |
| **Mapování kanálů** | Ch1 → AIN0/AIN1, Ch2 → AIN2/AIN3 |
| **Rozhraní k hostu** | I²C; data-ready (DRDY) na GP0/A0 |
| **Adresa I²C** | 0x40 (výchozí); 0x41 pomocí pájecí propojky S1 |
| **Zapnutí napájení kanálu** | GP2/A2 (kanál 1), GP1/A1 (kanál 2) |
| **Napájení logiky (VDD)** | 3.0 V |
| **Rozhraní desky** | Castellated otvory na dvou protilehlých hranách, připájené k základní desce CHESTER |
| **Revize hardwaru** | R2.1 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Izolovaný zesilovač (×2)** | AMC3330DWE | Zesilovač se zesílenou izolací a integrovaným izolovaným DC-DC; jeden na kanál |
| **ADC** | ADS122C04IPW | 24bitový 4kanálový I²C ADC digitalizující oba kanály |
| **Load switch (×2)** | TPS22917DBV | Napájecí přepínač izolovaných zesilovačů pro každý kanál |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X5 {#chester-x5-connector-pinout}

![Zapojení svorkovnice CHESTER-X5: INP1 na pinu 2, INM1 na pinu 3, INM2 na pinu 6, INP2 na pinu 7; piny 1, 4, 5, 8 nezapojeny](../../../../../chester/extension-modules/images/tb-chester-x5.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | DNC | — | Nezapojovat (izolační odstup) |
| 2 | INP1 | Izolovaný vstup | Kladný vstup kanálu 1 |
| 3 | INM1 | Izolovaný vstup | Záporný vstup kanálu 1 |
| 4 | DNC | — | Nezapojovat (izolační odstup) |
| 5 | DNC | — | Nezapojovat (izolační odstup) |
| 6 | INM2 | Izolovaný vstup | Záporný vstup kanálu 2 |
| 7 | INP2 | Izolovaný vstup | Kladný vstup kanálu 2 |
| 8 | DNC | — | Nezapojovat (izolační odstup) |

:::info
Každý kanál měří **−50 V až +50 V** a je **galvanicky oddělený** od elektroniky zařízení CHESTER i od druhého kanálu. Piny **DNC** (1, 4, 5, 8) nemají nic připojené. Nechte je nezapojené; vytvářejí odstup, který zachovává izolaci mezi kanály a logickou stranou.
:::

### Rozhraní k hostu (I²C) {#host-interface-ic}

CHESTER-X5 se čte po standardní sběrnici **I²C** přes ADC **ADS122C04** na desce, který digitalizuje oba izolované kanály (kanál 1 na AIN0/AIN1, kanál 2 na AIN2/AIN3). Piny slotu se používají takto:

| Pin CHESTER-X | Směr | Funkce |
| :--- | :--- | :--- |
| SDA / SCL | I²C | Komunikace s ADS122C04 |
| GP0 / A0 | Vstup | Data-ready (DRDY) ADS122C04 |
| GP1 / A1 | Výstup | Zapíná napájení kanálu 2 (load switch) |
| GP2 / A2 | Výstup | Zapíná napájení kanálu 1 (load switch) |

Adresa ADC na I²C je ve výchozím stavu **0x40**; nastavením pájecí propojky **S1** se změní na **0x41**, takže lze na jednom zařízení CHESTER použít dva moduly CHESTER-X5 bez konfliktu. GP3/A3 se nepoužívá.

## Připojení vstupu {#input-connection}

Zdroj napětí pro **kanál 1** připojte na **INP1** (pin 2) a **INM1** (pin 3), pro **kanál 2** na **INP2** (pin 7) a **INM2** (pin 6).

Protože jsou vstupy galvanicky oddělené, měřený obvod **nemusí** mít společnou zem s uzlem CHESTER a oba kanály jsou oddělené i mezi sebou. Piny **DNC** (1, 4, 5, 8) nechte nezapojené. Před měřením zapněte z firmwaru napájení kanálu (kanál 1 přes GP2, kanál 2 přes GP1).

:::warning
Nepřekračujte na žádném kanálu vstupní rozsah **−50 V až +50 V**.
:::

### Průchod krabičkou {#enclosure-feed-through}

Vstupní kabeláž lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Konektor do panelu (na vyžádání):** externí konektor ve stěně krabičky umožní uživateli kabel zapojit, bez volné kabeláže vevnitř. Na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X5 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x5-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x5-c4.png)

</div>
</div>
</div>

## Schémata {#schematic-diagrams}

Kompletní schéma (dva izolované vstupní kanály AMC3330, jejich load switche TPS22917 a ADC ADS122C04) je k dispozici jako PDF:

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x5-r2.1.pdf)
- [Interaktivní prohlížeč CHESTER-X5](pathname:///download/ibom/hio-chester-x5-r2.1.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X5 R2.1 se signály slotu nahoře a izolovanými vstupními svorkami dole](../../../../../chester/extension-modules/images/pc-chester-x5.png)

</div>
