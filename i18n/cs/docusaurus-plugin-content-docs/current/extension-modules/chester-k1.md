---
slug: chester-k1
title: CHESTER-K1 (4kanálový diferenciální vstup)
---
import Image from '@theme/IdealImage';

# CHESTER-K1 {#chester-k1}

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-k1-top.png')} alt="Rozšiřující modul CHESTER-K1, červená deska s operačními zesilovači a půlenými prokovenými otvory (castellated) pro oba sloty" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Schéma zapojení pinů zařízení CHESTER {#chester-pin-configuration-diagram}

<Image img={require('../../../../../chester/extension-modules/images/tb-chester-k1.png')} alt="Svorkovnice modulu CHESTER-K1: slot A obsahuje GND, INP1, INM1, VOUT1, GND, INP2, INM2, VOUT2; slot B totéž pro kanály 3 a 4" />

<br />

Rozšiřující modul **CHESTER-K1** zabírá oba sloty, **A** i **B**, a používá tedy svorky **A1** až **A8** (levá svorkovnice na obrázku výše) a **B1** až **B8** (pravá svorkovnice na obrázku výše).

## Signály proudového transformátoru {#current-transformer-signals}

| Signál | Barva vodiče |
| ------ | ---------- |
| GND    | Černá      |
| INP    | Bílá       |
| INM    | Žlutá      |
| VOUT   | Červená    |

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-k1-r1.4.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů na PCB](pathname:///download/ibom/hio-chester-k1-r1.4.html)

![Schéma CHESTER-K1, list 1: expandér TCA9534A, napájení se zvyšujícím měničem a LDO a čtyři zátěžové spínače TPS22917](../../../../../chester/extension-modules/images/hio-chester-k1-r1.4-1.png)
![Schéma CHESTER-K1, list 2: obvody diferenciálních zesilovačů pro vstupní kanály 1 a 2](../../../../../chester/extension-modules/images/hio-chester-k1-r1.4-2.png)
![Schéma CHESTER-K1, list 3: obvody diferenciálních zesilovačů pro vstupní kanály 3 a 4](../../../../../chester/extension-modules/images/hio-chester-k1-r1.4-3.png)
