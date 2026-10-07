---
slug: about-battery-module
title: O modulu Battery Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/battery-module.png')} alt="Pohled na Battery Module zeshora s popsanými konektory; držáky pro čtyři články AAA jsou na spodní straně" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Battery Module</b> slouží jako zdroj napájení pro jednotky na baterie. Integrovaný snižující převodník (buck) s nízkou spotřebou dosahuje vynikající účinnosti při napájení ze <b>čtyř alkalických článků AAA 1,5 V</b>. Má také <b>5pinovou patici, do které připojíte tag HARDWARIO TOWER</b>.
      </p>
      <p>
        Pokud se baterie AAA pro vaše použití nehodí, využijte <b>externí napěťový vstup</b>, který snese až 10 V. Najdete ho na dvou prostředních pinech, které jsou kompatibilní s oblíbeným <b>konektorem JST pro lithiové baterie</b>.
      </p>
    </div>
  </div>
</div>

:::tip

Pokud chcete menší zařízení, použijte [**Mini Battery Module**](about-mini-battery-module.md).
Se **2 bateriemi** ovšem vydrží kratší dobu.

:::

## Vlastnosti {#features}
- Vysoce účinný snižující převodník (buck) **TPS62745 (TI)**
- Extrémně nízký klidový proud: 400 nA
- Doporučené typy baterií:
  - **4x AAA 1,5 V alkalické**
  - **4x AAA Eneloop NiMH**
- Výstupní napájecí napětí: 3,1 V
- Obvod pro odpojení baterie
- Měření napětí baterie pomocí vstupu ADC
- <b>Prototypovací plocha pro pájení</b> vlastních obvodů
- Jedna doplňková **pozice pro tag HARDWARIO**
- Rozsah provozního napětí: 3,3 až 10 V
- Rozsah provozních teplot: -20 až 70 °C
- Mechanické rozměry: 88 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/battery-module)
- [**Schéma**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-battery)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__battery)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_battery.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_battery.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73734)
