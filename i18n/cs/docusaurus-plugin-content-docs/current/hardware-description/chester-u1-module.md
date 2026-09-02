---
slug: chester-u1-module
title: Modul CHESTER-U1
description: "Místo použití zařízení CHESTER-M a vkládání rozšiřujících modulů do něj navrhnete nosnou desku (carrier board) a vložíte do ní CHESTER-U1."
---
import Image from '@theme/IdealImage';

# Modul CHESTER-U1 {#chester-u1-module}

**CHESTER-U1** je nákladově optimalizovaná základní deska **CHESTER-M** zhuštěná do **malého modulu 38x38 mm**.

Místo použití zařízení **CHESTER-M** a vkládání rozšiřujících modulů do něj navrhnete nosnou desku (carrier board) a vložíte do ní **CHESTER-U1**.

**CHESTER-U1** má tyto vlastnosti:

- Elektricky identický s **CHESTER-M** (stejný binární firmware může běžet bez jakýchkoli změn)
- Nákladově optimalizovaný
- Nosná deska může být jen **dvouvrstvá deska**
- Obsahuje stejné **aplikační MCU** (APP/BLE nRF52840) a **LTE** (nRF9160)
- Lze jej zakomponovat do **menších krabiček**
- Lze jej připojit k [**rozšiřujícím modulům CHESTER-X**](../extension-modules/index.md) stejným způsobem jako CHESTER-M
- Obsahuje **držák nano SIM karty** přímo na desce
- Připojte pouze **baterii** a **u.Fl antenu**

![Rozložení CHESTER-U1](../../../../../chester/hardware-description/images/chester-u1-description.png)

## E-CAD knihovna {#e-cad-library}

HARDWARIO může poskytnout ECAD footprinty pro vaši integraci.

- [**KiCad symbol, footprint, 3D model**](pathname:///download/kicad-hardwario-lib.zip)
- Eagle CAD

## Rozložení {#layout}

![Rozložení CHESTER-U1](../../../../../chester/hardware-description/images/chester-u1-layout.png)

## Schémata {#schematics}

- [Schéma R1.1 (PDF)](../../../../../chester/hardware-description/hio-chester-u1-r1.1.pdf)

[comment]: # (PDF to PNG convert command: pdftoppm hio-chester-u1-r1.1.pdf hio-chester-u1-r1.1 -png)

### Rozhraní {#interface}

V tomto zobrazení jsou signály umístěny přesně tak, jak se na modul díváte z horní strany. Rozmístění signálů bylo optimalizováno tak, abyste mohli snadno vést své spoje na dvouvrstvé desce plošných spojů.

![Schéma 1/4: Pinout rozhraní CHESTER-U1 se signály JP1–JP38 umístěnými podle pohledu z horní strany modulu](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-1.png)

### MCU {#mcu}
![Schéma 2/4: MCU/BLE MDBT50Q, senzory teploty a náklonu, NOR flash, 1-Wire master a budiče LED](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-2.png)

### LTE {#lte}
![Schéma 3/4: LTE modem nRF9160, rozhraní SIM, anténní konektory a spínač napájení GPS](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-3.png)

### Napájení {#power}
![Schéma 4/4: Zvyšující převodník TPS61023, LDO, LED napájení, spínání zátěže a ADC TLA2021](../../../../../chester/hardware-description/images/hio-chester-u1-r1.1-4.png)

## Nosná deska CHESTER-C4 {#chester-c4-carrier-board}

Máme nosné desky, které lze použít přímo ve vašem produktu se zařízením **CHESTER-U1**, nebo na nich můžete založit vlastní návrh. **Ozvěte se nám, můžeme vám poskytnout více informací.**

Jednou z nosných desek je **CHESTER-C4**, obsahuje slot pro dva [**rozšiřující moduly**](../extension-modules/index.md) a může mít několik variant baterie nebo externího napájení.

### Spodní strana {#bottom-side}

![Spodní strana CHESTER-C4](../../../../../chester/hardware-description/images/chester-c4-bottom.png)

### Horní strana {#top-side}

S variantou článku „D“.

![Horní strana CHESTER-C4](../../../../../chester/hardware-description/images/chester-c4-d-top-white.png)
