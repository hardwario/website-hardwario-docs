---
slug: about-power-module
title: O modulu Power Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/power-module.png')} alt="Power Module s výkonovým relé, souosým DC konektorem a svorkovnicí pro digitální LED pásek" /></div>
    </div>
    <div class="col col--6">
      <p>
        K modulu <b>Power Module</b> připojíte napájecí adaptér 5 V DC přes standardní napájecí konektor 2,1 mm. Má <b>výkonové relé</b> (230 V AC / 16 A) pro ovládání spotřebičů a můžete s ním řídit i <b>digitální LED pásek</b> (kompatibilní s WS2812B).
      </p>
      <p>
        Díky integrovanému regulátoru LDO napájí modul i uzel sady HARDWARIO TOWER Industrial IoT Kit. Regulátor LDO vyrábí ze vstupních 5 V výstupní napětí 3,3 V.
      </p>
      <p>
        Na spolehlivosti záleží, a proto má vstup napájecího konektoru inteligentní ochranu proti přepětí, podpětí a přepólování. Vstupní napětí tak vždy zůstane ve správných mezích.
      </p>
    </div>
  </div>
</div>

:::caution

Maximální dovolený proud je **6 A**.

:::


## Vlastnosti {#features}
- Vstup pro 5 V DC napájecí adaptér (konektor 2,1 mm)
- Rozsah vstupního napětí: 4,2 V až 5,8 V
- **Výkonový výstup relé** (230 V AC / 16 A)
- Integrovaný LDO s výstupním napětím 3,3 V
- **Výstup pro adresovatelný/digitální RGB(W) LED pásek**
- Integrovaný převodník napěťových úrovní (3,3 V na 5 V)
- 2x pozice pro tag HARDWARIO TOWER
- Ochrana proti **přepětí**, **podpětí** a přepólování
- Odnímatelná 3pinová svorkovnice pro výstup relé
- Odnímatelná 3pinová svorkovnice pro digitální LED pásek
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 88 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/power-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-power)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__power)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_power.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_power.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73717)
