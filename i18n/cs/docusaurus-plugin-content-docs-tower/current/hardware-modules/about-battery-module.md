---
slug: about-battery-module
title: O modulu Battery Module
description: "Pokud pro vaši aplikaci nejsou baterie AAA vhodné, můžete využít externí napěťový vstup, který zvládne až 10 V. Externí vstup najdete na dvou pinech v prostředku. Tyto piny jsou kompatibilní s populárním konektorem JST používaným pro lithiové…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/battery-module.png')} alt="Pohled na Battery Module zeshora s popsanými konektory; držáky pro čtyři články AAA jsou na spodní straně" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Battery Module</b> je navržen jako zdroj napájení pro bateriově napájené jednotky. Integrovaný nízkoodběrový buck převodník poskytuje vynikající účinnost při napájení ze <b>čtyř alkalických článků AAA 1,5 V</b>. Obsahuje také <b>5pinovou patici, do které lze připojit tag HARDWARIO TOWER</b>.
      </p>
      <p>
        Pokud pro vaši aplikaci nejsou baterie AAA vhodné, můžete využít <b>externí napěťový vstup</b>, který zvládne až 10 V. Externí vstup najdete na dvou pinech v prostředku. Tyto piny jsou kompatibilní s populárním <b>konektorem JST používaným pro lithiové baterie</b>.
      </p>
    </div>
  </div>
</div>

:::tip

Pokud chcete, aby vaše zařízení zabíralo méně místa, můžete použít [**Mini Battery Module**](about-mini-battery-module.md).
Vydrží samozřejmě kratší dobu, protože obsahuje jen **2 baterie**.

:::

## Vlastnosti {#features}
- Vysoce účinný buck převodník **TPS62745 (TI)**
- Extrémně nízký klidový proud: 400 nA
- Doporučené typy baterií:
  - **4x AAA 1,5 V alkalické**
  - **4x AAA Eneloop NiMH**
- Výstupní napájecí napětí: 3,1 V
- Obvod pro odpojení baterie
- Měření napětí baterie pomocí vstupu ADC
- <b>Prototypovací plocha pro pájení</b> vlastních obvodů
- Jedna doplňková **pozice pro tag HARDWARIO******
- Rozsah provozního napětí: 3,3 až 10 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 88 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/battery-module)
- [**Schéma**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-battery)
- [**SDK knihovna**](https://sdk.hardwario.com/group__twr__module__battery)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_battery.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_battery.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73734)
