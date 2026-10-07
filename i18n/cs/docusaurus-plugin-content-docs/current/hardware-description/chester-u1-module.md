---
slug: chester-u1-module
title: Modul CHESTER-U1
---
import Image from '@theme/IdealImage';

# Modul CHESTER-U1 {#chester-u1-module}

**CHESTER-U1** je cenově optimalizovaná základní deska **CHESTER-M** zmenšená do **malého modulu 38x38 mm**.

Místo abyste do zařízení **CHESTER-M** vkládali rozšiřující moduly, navrhnete dvouvrstvou nosnou desku (carrier board) a osadíte na ni modul **CHESTER-U1**.

**CHESTER-U1** má tyto vlastnosti:

- Elektricky shodný s deskou **CHESTER-M** (poběží na něm stejný binární soubor firmwaru beze změn)
- Cenově optimalizovaný
- Nosná deska může být jen **dvouvrstvá**
- Obsahuje stejný **aplikační MCU** (APP/BLE nRF52840) a modem **LTE** (nRF9160)
- Vejde se i do **menších krabiček**
- K [**rozšiřujícím modulům CHESTER-X**](../extension-modules/index.md) se připojuje stejně jako deska CHESTER-M
- Má **držák nano SIM karty** přímo na desce
- Stačí připojit **baterii** a **anténu u.FL**

![Rozložení CHESTER-U1](../../../../../chester/hardware-description/images/chester-u1-description.png)

## Knihovna E-CAD {#e-cad-library}

Pro integraci do vašeho návrhu vám HARDWARIO poskytne footprinty ECAD.

- [**Symbol, footprint a 3D model pro KiCad**](pathname:///download/kicad-hardwario-lib.zip)
- Eagle CAD

## Rozložení {#layout}

![Rozložení CHESTER-U1](../../../../../chester/hardware-description/images/chester-u1-layout.png)

## Schémata {#schematics}

- [Schéma R1.1 (PDF)](pathname:///chester/hardware-description/hio-chester-u1-r1.1.pdf)

[comment]: # (PDF to PNG convert command: pdftoppm hio-chester-u1-r1.1.pdf hio-chester-u1-r1.1 -png)

### Rozhraní {#interface}

Signály jsou v tomto zobrazení rozmístěné přesně tak, jak modul vidíte shora. Rozmístění je navržené tak, abyste spoje snadno vedli i na dvouvrstvé desce plošných spojů.

![Schéma 1/4: rozmístění vývodů rozhraní CHESTER-U1 se signály JP1–JP38 při pohledu na modul shora](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-1.png)

### MCU {#mcu}
![Schéma 2/4: MCU/BLE MDBT50Q, senzory teploty a náklonu, NOR flash, 1-Wire master a budiče LED](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-2.png)

### LTE {#lte}
![Schéma 3/4: modem LTE nRF9160, rozhraní SIM, anténní konektory a spínač napájení GPS](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-3.png)

### Napájení {#power}
![Schéma 4/4: zvyšující měnič TPS61023, LDO, LED napájení, spínání zátěže a ADC TLA2021](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-4.png)

## Nosná deska CHESTER-C4 {#chester-c4-carrier-board}

Máme hotové nosné desky, které můžete s modulem **CHESTER-U1** použít přímo ve svém produktu, nebo z nich vyjít při vlastním návrhu. **Ozvěte se nám a pošleme vám podrobnosti.**

Jednou z nich je **CHESTER-C4**: má slot pro dva [**rozšiřující moduly**](../extension-modules/index.md) a dodává se v několika variantách bateriového nebo externího napájení.

### Spodní strana {#bottom-side}

![Spodní strana CHESTER-C4](../../../../../chester/hardware-description/images/chester-c4-bottom.png)

### Horní strana {#top-side}

Varianta s článkem „D“.

![Horní strana CHESTER-C4](../../../../../chester/hardware-description/images/chester-c4-d-top-white.png)
