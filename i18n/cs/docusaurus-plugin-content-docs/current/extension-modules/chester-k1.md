---
slug: chester-k1
title: CHESTER-K1 (4kanálový diferenciální vstup)
description: "Rozšiřující modul CHESTER-K1 využívá oba sloty A a B. Používají se tedy odpovídající svorky A1 až A8 (levá svorkovnice na obrázku výše) a B1 až B8 (pravá svorkovnice na obrázku výše)."
---
import Image from '@theme/IdealImage';

# CHESTER-K1 {#chester-k1}

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-k1-top.png')} alt="Rozšiřující modul CHESTER-K1, červená deska s operačními zesilovači a zubatými kontakty pro oba sloty" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

<Image img={require('../../../../../chester/extension-modules/images/tb-chester-k1.png')} alt="Svorkovnice modulu CHESTER-K1: slot A obsahuje GND, INP1, INM1, VOUT1, GND, INP2, INM2, VOUT2; slot B totéž pro kanály 3 a 4" />

<br />

Rozšiřující modul **CHESTER-K1** využívá oba sloty **A** a **B**. Používají se tedy odpovídající svorky **A1** až **A8** (levá svorkovnice na obrázku výše) a **B1** až **B8** (pravá svorkovnice na obrázku výše).

## Signály proudového transformátoru {#current-transformer-signals}

| Signál | Barva vodiče |
| ------ | ---------- |
| GND    | Černá      |
| INP    | Bílá       |
| INM    | Žlutá      |
| VOUT   | Červená    |

## Schéma {#schematic-diagram}

Schéma je užitečné, pokud programujete nízkoúrovňový kód související s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-k1-r1.4.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-k1-r1.4.html)

![Schéma CHESTER-K1, list 1: expandér TCA9534A, step-up a LDO napájení a čtyři zátěžové přepínače TPS22917](../../../../../chester/extension-modules/images/hio-chester-k1-r1.4-1.png)
![Schéma CHESTER-K1, list 2: obvody diferenciálních zesilovačů pro vstupní kanály 1 a 2](../../../../../chester/extension-modules/images/hio-chester-k1-r1.4-2.png)
![Schéma CHESTER-K1, list 3: obvody diferenciálních zesilovačů pro vstupní kanály 3 a 4](../../../../../chester/extension-modules/images/hio-chester-k1-r1.4-3.png)
