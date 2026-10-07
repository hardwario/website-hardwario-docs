---
slug: about-co2-module
title: O modulu CO₂ Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/co2-module.png')} alt="CO2 Module s NDIR senzorem oxidu uhličitého SenseAir a záložním superkondenzátorem" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>CO₂ Module</b> je plynový senzor, který měří <b>koncentraci oxidu uhličitého (CO₂)</b> s přesností ±50 ppm. Používá <a href="https://en.wikipedia.org/wiki/Carbon_dioxide_sensor"><b>nedisperzní infračervený (NDIR) senzor</b></a> vyrobený ve Švédsku. Díky <b>nízké spotřebě energie</b> vydrží na baterie celé roky.
      </p>
      <p>
        <b>Senzor LP8</b> jsme doplnili o obvody pro efektivní správu napájení a <b>komunikaci pouze přes I²C</b>. Modul má také tři 5pinové patice, do kterých <b>připojíte tagy HARDWARIO</b>.
      </p>
    </div>
  </div>
</div>

:::info

Oxid uhličitý (CO₂) je bezbarvý plyn bez zápachu, který je nezbytný pro život na Zemi. Jeho běžná koncentrace v ovzduší je asi **400 ppm (0,04 %)**. V přírodě vzniká mnoha způsoby, například **lidé CO₂ vydechují**.

:::

## Vlastnosti {#features}
- **Senzor LP8 (SenseAir)** pro oxid uhličitý (CO₂)
- [**Nedisperzní infračervená (NDIR) technologie**](https://en.wikipedia.org/wiki/Carbon_dioxide_sensor)
- Rozsah měření CO₂: **0 až 10 000 ppm**
- Přesnost měření: ±50 ppm CO₂ ±3 % z naměřené hodnoty (poznámka 1)
- Pouze rozhraní I²C (integrovaný převodník UART a expandér I/O)
- Zdroj konstantního proudu pro superkondenzátor 470 mF
- 3 patice pro tagy HARDWARIO TOWER
- Nízká spotřeba energie:
  - **6 µA (6 měření za hodinu)**
  - **61 µA (1 měření za minutu)**
- Rozsah provozního napětí: 3 V až 3,6 V
- Rozsah provozních teplot: 0 až 50 °C
- Mechanické rozměry: 88 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/co2-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-co2)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__co2)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_co2.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_co2.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73699)
