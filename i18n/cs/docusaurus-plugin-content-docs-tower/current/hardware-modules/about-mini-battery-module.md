---
slug: about-mini-battery-module
title: O modulu Mini Battery Module
description: "Obvod pro odpojení zátěže umí odpojit baterie, pokud je k systému připojen jakýkoli jiný zdroj napájení (např. síťový adaptér nebo kabel USB). Napětí baterie lze měřit na jednom z analogových vstupů standardizovaného konektoru (P0/A0/TXD0)."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/mini-battery-module.png')} alt="Pohled na Mini Battery Module shora s vyznačením dvou alkalických článků AAA 1,5 V; držáky jsou na spodní straně" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Mini Battery Module</b> je navržen jako zdroj napájení pro <b>bateriově napájené jednotky</b>. Integrovaný nízkopříkonový zvyšující převodník poskytuje vynikající účinnost <b>ze dvou alkalických článků AAA 1,5 V</b>. Má patici s vývody na spodní straně, takže celkový profil jednotky, kterou postavíte, zůstává nízký.
      </p>
      <p>
        Obvod pro odpojení zátěže umí <b>odpojit baterie, pokud je k systému připojen jakýkoli jiný zdroj napájení</b> (např. síťový adaptér nebo kabel USB). Napětí baterie lze měřit na jednom z analogových vstupů standardizovaného konektoru (<b>P0/A0/TXD0</b>).
      </p>
    </div>
  </div>
</div>

:::tip

Pokud chcete, aby vaše zařízení vydrželo ještě delší dobu, a nezáleží vám na zástavbových rozměrech, můžete použít [**Standard Battery Module**](about-battery-module.md).

:::

## Vlastnosti {#features}
- Vysoce účinný **DC/DC převodník TPS61099 (TI)**
- Velmi nízký klidový proud &lt;5 μA
- Účinnost až 93 % při 10 mA
- Doporučené typy baterií:
  - **2x AAA 1,5 V alkalické**
  - **2x AAA Eneloop NiMH**
- Jmenovité výstupní napětí 3,1 V
- Obvod pro odpojení baterie
- Ochrana proti přepólování
- Měření vstupního napětí přes vstup ADC
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/mini-battery-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-battery-mini)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__battery)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_battery.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_battery.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73682)
