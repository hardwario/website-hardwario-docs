---
slug: chester-k1
title: CHESTER-K1 (4-ch diff input)
---
import Image from '@theme/IdealImage';

# CHESTER-K1

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/chester-k1-top.png')} alt="CHESTER-K1 extension module, a red PCB with operational amplifiers and castellated edges for both slots" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## CHESTER Pin Configuration Diagram

<Image img={require('./images/tb-chester-k1.png')} alt="CHESTER-K1 terminal blocks: slot A carries GND, INP1, INM1, VOUT1, GND, INP2, INM2, VOUT2; slot B the same for channels 3 and 4" />

<br />

The extension module **CHESTER-K1** use both slots **A** and **B**. So you use the corresponding terminals **A1** to **A8** (left terminal block in the picture above) and **B1** to **B8** (right terminal block in the picture above).

## Current Transformer Signals

| Signal | Wire color |
| ------ | ---------- |
| GND    | Black      |
| INP    | White      |
| INM    | Yellow     |
| VOUT   | Red        |

## Schematic diagram

A schematic diagram is useful if you program low-level hardware-related code or if you're just curious about how the system is designed.

- [Schematic (PDF)](schematics/hio-chester-k1-r1.4.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-k1-r1.4.html)

![CHESTER-K1 schematic sheet 1: TCA9534A expander, step-up and LDO supply, and four TPS22917 load switches](images/hio-chester-k1-r1.4-1.png)
![CHESTER-K1 schematic sheet 2: differential amplifier circuits for input channels 1 and 2](images/hio-chester-k1-r1.4-2.png)
![CHESTER-K1 schematic sheet 3: differential amplifier circuits for input channels 3 and 4](images/hio-chester-k1-r1.4-3.png)
