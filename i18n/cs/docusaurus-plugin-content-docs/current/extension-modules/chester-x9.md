---
slug: chester-x9
title: CHESTER-X9 (4kanálový výstup)
description: "Tento článek popisuje rozšiřující modul CHESTER-X9."
---
import Image from '@theme/IdealImage';

# CHESTER-X9 {#chester-x9}

Tento článek popisuje rozšiřující modul CHESTER-X9.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-x9-top.png')} alt="Pohled shora na modul CHESTER-X9 se čtyřmi obvody low-side spínačů"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

CHESTER-X9 poskytuje 4 low-side spínače s proudovým omezením, které umožňují ovládat zátěž z externího zdroje napětí.

## Elektrická specifikace {#electrical-specification}

* Maximální napětí: 28 V
* Trvalý proud zátěže: 2 A
* Špičkové proudové omezení: 5 A

## Schéma zapojení spínané zátěže {#switch-load-connection-diagram}

Zátěž musí být připojena mezi externí zdroj napětí a výstup low-side spínače (kanál 1–4) podle schématu:

![Schéma zapojení: zátěž připojená mezi externí zdroj 3–28 V a výstup spínače kanálu modulu CHESTER-X9](../../../../../chester/extension-modules/images/sc-chester-x9.png)

## Schéma konfigurace pinů CHESTER {#chester-pin-configuration-diagram}

![Piny svorkovnice 1–8 střídající GND s výstupy spínačů CH1, CH2, CH3, CH4](../../../../../chester/extension-modules/images/tb-chester-x9.png)

## Konfigurace pinů a jejich funkce {#pin-configuration-and-functions}

| Pozice   | Název signálu | Popis signálu           |
| -------- | ----------- | ----------------------- |
| 1        | GND         | Signál zemního potenciálu |
| 2        | CH1         | Výstup spínače kanálu 1 |
| 3        | GND         | Signál zemního potenciálu |
| 4        | CH2         | Výstup spínače kanálu 1 |
| 5        | GND         | Signál zemního potenciálu |
| 6        | CH3         | Výstup spínače kanálu 1 |
| 7        | GND         | Signál zemního potenciálu |
| 8        | CH4         | Výstup spínače kanálu 1 |

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód pracující přímo s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x9-r1.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-x9-r1.0.html)

![Schéma CHESTER-X9 R1.0: čtyři low-side spínače NCV8412 řízené signály GP0–GP3](../../../../../chester/extension-modules/images/hio-chester-x9-r1.0-1.png)

## Výkres modulu {#module-drawing}

![Osazovací výkres CHESTER-X9 se signály slotu nahoře a svorkami GND/CH1–CH4 dole](../../../../../chester/extension-modules/images/pc-chester-x9.png)
